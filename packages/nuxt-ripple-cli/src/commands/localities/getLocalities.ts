import type { ILocalityVicMapData, ILocalitySearchData } from './types'
import { convertToTitleCase, writeFile } from './utilities'
import { buffer, polygon, truncate, simplify } from '@turf/turf'
import type { Position } from '@turf/turf'
const baseArcGISURL =
  'https://services6.arcgis.com/GB33F62SbDxJjwEL/ArcGIS/rest/services/Vicmap_Admin/FeatureServer'

const localityServerID = '11'
const postcodeServerID = '14'
const lgaServerID = '9'

const geometryPrecision = 7

const defaultOptions = {
  spatialRel: 'esriSpatialRelIntersects',
  units: 'esriSRUnit_Meter',
  inSR: '4326',
  outSR: '4326',
  f: 'json'
}

async function fetchData(layer: string, options): Promise<any> {
  const formData = new URLSearchParams({
    ...defaultOptions,
    ...options
  })
  return fetch(`${baseArcGISURL}/${layer}/query`, {
    method: 'POST',
    body: formData,
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .catch((error) => {
      console.error('There was a problem fetching data:', error)
    })
}

async function fetchLocalityData(
  offset: number,
  where = '1=1'
): Promise<ILocalityVicMapData> {
  return fetchData(localityServerID, {
    where,
    returnGeometry: true,
    geometryPrecision,
    returnCentroid: true,
    orderByFields: 'LOCALITY_NAME',
    resultOffset: offset
  })
}

async function fetchPostCodeForLocality(geometry): Promise<string | 'error'> {
  return fetchData(postcodeServerID, {
    geometry: `{"rings": ${JSON.stringify(geometry)} }`,
    geometryType: 'esriGeometryPolygon',
    spatialRel: 'esriSpatialRelIntersects',
    units: 'esriSRUnit_Meter',
    where: '1=1',
    defaultSR: '4326',
    returnGeometry: false,
    outFields: 'postcode'
  })
    .then((response) => {
      if (response.features && response.features.length > 0) {
        return response.features.map((feature) => feature.attributes.postcode)
      }
      return 'error'
    })
    .catch((error) => {
      console.error('There was a problem fetching data:', error)
      return 'error'
    })
}

async function fetchLGAFromGeometry(geometry) {
  return fetchData(lgaServerID, {
    geometry: `{"rings": ${JSON.stringify(geometry)} }`,
    spatialRel: 'esriSpatialRelIntersects',
    units: 'esriSRUnit_Meter',
    defaultSrt: '4326',
    geometryType: 'esriGeometryPolygon',
    returnGeometry: false,
    outFields: 'lga_official_name',
    returnCentroid: true
  })
    .then((response) => {
      if (response.features && response.features.length > 0) {
        return response.features.map((feature) =>
          convertToTitleCase(feature.attributes.lga_official_name)
        )
      }
      return 'error'
    })
    .catch((err) => {
      console.log(err)
      return 'error'
    })
}

/*
 * Here we use turf (https://turfjs.org/docs) buffer, tuncate and simplify to reduce the size of the polygon.
 * Some areas have complex geometry that cannot be queried for directly without simplifying
 */
function simplifyGeometry(
  geometry,
  bufferValue = -40,
  precision = 0
): Position[][] | 'error' {
  const steps = 2
  let geometryToSimplify = polygon(geometry)
  try {
    if (bufferValue === 0) {
      return geometryToSimplify.geometry?.coordinates
    }
    geometryToSimplify = truncate(polygon(geometry), {
      precision,
      coordinates: 2
    })

    if (geometryToSimplify.geometry.coordinates[0].length > 10000) {
      geometryToSimplify = simplify(geometryToSimplify, {
        tolerance: 0.1,
        highQuality: false
      })
    }

    const buffered = buffer(geometryToSimplify, bufferValue, {
      units: 'meters',
      steps
    })

    return buffered.geometry?.coordinates
  } catch (error) {
    console.log(`Error simplifying geometry`, bufferValue)
    return 'error'
  }
}
/*
 * Makes a request using geometry that has been simplified to the amount required to work with ArcGIS API. For every request that returns an error, we decrease the precision and buffer values until we get a simpler geometry that returns a valid response.
 */
async function fetchUsingSimplifiedGeometry(geometry, fetchFn): Promise<any> {
  let bufferVal = -40
  let precision = geometryPrecision
  let hasResponse = false
  const maxTries = 4
  let tries = 0
  while (!hasResponse) {
    tries = tries + 1
    const simplifedGeometry = simplifyGeometry(geometry, bufferVal, precision)
    const response = await fetchFn(simplifedGeometry)
    bufferVal = bufferVal + 10
    precision = precision - 1
    if (response !== 'error') {
      hasResponse = true
      return response
    } else if (tries > maxTries) {
      return 'error'
    }
  }
}
/*
 * Fetch the bounding box BBOX for a locality as we cant return the extent and geometry at the same time.
 */
async function fetchBboxForLocality(
  locality: ILocalitySearchData
): Promise<number[] | []> {
  if (!locality.centroid) return Promise.resolve([])
  return fetchData(localityServerID, {
    where: `LOCALITY_NAME='${locality.name}'`,
    returnGeometry: false,
    returnExtentOnly: true
  })
    .then((response) => {
      if (response.extent) {
        return [
          response.extent.xmin,
          response.extent.ymin,
          response.extent.xmax,
          response.extent.ymax
        ]
      }
      return []
    })
    .catch((err) => {
      console.log(err)
      return []
    })
}
/*
 * Fetchs list of localities, then queries postcode and LGA datasets by each localities geometry to build a combined response
 */
async function getLocalities(
  savePath: string,
  options: { where: string; initialOffset: number }
): Promise<void> {
  let hasData = true
  let data: ILocalityVicMapData | null = null
  let offset = options.initialOffset || 0 // starting offset to make requests, can use this to resume interupted requests
  let delay = 1000 // add delay between requests to prevent flooding API
  const perPage = 2000 // number of localities to return per request
  const localities: ILocalitySearchData[] = []
  while (hasData) {
    try {
      data = await fetchLocalityData(offset, options.where)
      if (!data) {
        break
      } else if (data.features?.length > 0) {
        const results = data.features.map((itm) => ({
          name: convertToTitleCase(itm.attributes.LOCALITY_NAME),
          areaType: 'locality',
          center: `${itm.centroid.y},${itm.centroid.x}`,
          geometry: itm.geometry,
          centroid: itm.centroid
        }))
        localities.push(...results)
        offset = offset + perPage
        continue
      }
      if (data.exceededTransferLimit) {
        await new Promise((resolve) => setTimeout(resolve, delay))
        continue
      } else {
        hasData = false
        break
      }
    } catch (error) {
      console.log('error', error)
      // backoff error
      delay = delay * 2
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  if (localities && localities.length > 0) {
    await writeFile(savePath, `[ \n`, false, false)
    for (let index = 0; index < localities.length; index++) {
      const itm = localities[index]
      itm.bbox = await fetchBboxForLocality(itm)
      itm.postcode = await fetchUsingSimplifiedGeometry(
        itm.geometry.rings,
        fetchPostCodeForLocality
      )
      itm.lga = await fetchUsingSimplifiedGeometry(
        itm.geometry.rings,
        fetchLGAFromGeometry
      )
      delete itm.centroid
      delete itm.geometry
      await writeFile(savePath, itm, true, true)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
    await writeFile(savePath, `]`, false, true)
    console.log('complete')
    console.log('count of records: ', localities.length)
  }
}

export default getLocalities
