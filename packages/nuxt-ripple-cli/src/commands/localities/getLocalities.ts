import * as fs from 'fs'
import * as path from 'path'

const baseArcGISURL =
  'https://services6.arcgis.com/GB33F62SbDxJjwEL/ArcGIS/rest/services/Vicmap_Admin/FeatureServer'
const localityServerID = '11'
const postcodeServerID = '14'

type LocalityFeature = {
  attributes: {
    LOCALITY_NAME: string
  }
  centroid: {
    x: string
    y: string
  }
}

interface IVicMapResponse {
  features: LocalityFeature[]
  exceededTransferLimit: boolean
}

interface ILocalitySearchData {
  locality: string
  center: string
  centroid?: {
    x: string
    y: string
  }
  postcode?: string
  bbox?: string
}

const defaultOptions = {
  spatialRel: 'esriSpatialRelIntersects',
  units: 'esriSRUnit_Meter',
  inSR: '4326',
  outSR: '4326',
  f: 'json'
}

async function fetchData(layer: string, options) {
  const params = new URLSearchParams({
    ...defaultOptions,
    ...options
  })
  return fetch(`${baseArcGISURL}/${layer}/query?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => response.json())
}

const fetchLocalityData = async (offset: number) => {
  return fetchData(localityServerID, {
    where: `1=1`,
    returnGeometry: false,
    returnCentroid: true,
    orderByFields: 'LOCALITY_NAME',
    resultOffset: offset
  })
}

const fetchPostCodeForLocality = async (locality: ILocalitySearchData) => {
  if (!locality.centroid) return Promise.resolve('error')
  return fetchData(postcodeServerID, {
    geometry: `{ x: ${locality.centroid.x}, y: ${locality.centroid.y} }`,
    geometryType: 'esriGeometryPoint',
    returnGeometry: false,
    outFields: 'postcode',
    returnCentroid: true
  }).then((response) => {
    if (response.features && response.features.length > 0) {
      return response.features[0].attributes.postcode
    }
    return 'error'
  })
}

const fetchBboxForLocality = async (locality: ILocalitySearchData) => {
  if (!locality.centroid) return Promise.resolve('error')
  return fetchData(localityServerID, {
    where: `LOCALITY_NAME='${locality.locality}'`,
    returnGeometry: false,
    returnExtentOnly: true
  }).then((response) => {
    if (response.extent) {
      return [
        response.extent.xmin,
        response.extent.ymin,
        response.extent.xmax,
        response.extent.ymax
      ]
    }
    return 'error'
  })
}

function onWriteError(err) {
  if (err) {
    console.error('Error writing to file', err)
  }
}

async function writeFileAppend(filePath: string, data: any) {
  try {
    await fs.writeFile(
      path.join('./', filePath),
      JSON.stringify(data) + ',' + '\n',
      { flag: 'a+' },
      onWriteError
    )
    console.log(`Data written :  ${JSON.stringify(data)}`)
  } catch (err) {
    console.error('Error writing to file:', err)
  }
}

async function getLocalities(savePath: string) {
  let hasData = true
  let data: IVicMapResponse | null = null
  let offset = 0
  let delay = 1000
  const perPage = 2000
  const localities: ILocalitySearchData[] = []
  while (hasData) {
    try {
      // wait 5 seconds before trying again
      data = await fetchLocalityData(offset)
      if (!data) {
        break
      } else if (data.features?.length > 0) {
        const results = data.features.map((itm) => ({
          locality: itm.attributes.LOCALITY_NAME,
          center: `${itm.centroid.x},${itm.centroid.y}`,
          centroid: itm.centroid
        }))
        localities.push(...results)
        offset = offset + perPage
        continue
      }
      if (data.exceededTransferLimit) {
        // add delay between requests to prevent flooding API
        await new Promise((resolve) => setTimeout(resolve, delay))
        continue
      } else {
        hasData = false
        break
      }
    } catch (error) {
      console.log('error', error)
      delay = delay * 2
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  if (localities && localities.length > 0) {
    await fs.writeFile(path.join('./', savePath), '[' + '\n', {}, onWriteError)
    for (let index = 0; index < localities.length; index++) {
      const itm = localities[index]
      itm.bbox = await fetchBboxForLocality(itm)
      itm.postcode = await fetchPostCodeForLocality(itm)
      delete itm.centroid
      await writeFileAppend(savePath, itm)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
    await fs.writeFile(
      path.join('./', savePath),
      ']' + '\n',
      { flag: 'a+' },
      onWriteError
    )
    console.log('complete')
    console.log('count of records: ', localities.length)
    console.log('count of records: ', localities[0])
  }
}

export default getLocalities
