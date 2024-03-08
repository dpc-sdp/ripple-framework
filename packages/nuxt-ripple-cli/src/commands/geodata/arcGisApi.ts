import { buffer, polygon, truncate, simplify } from '@turf/turf'
import type { Position } from '@turf/turf'
import { convertToTitleCase } from './utilities'

export const baseArcGISURL =
  'https://services6.arcgis.com/GB33F62SbDxJjwEL/ArcGIS/rest/services/Vicmap_Admin/FeatureServer'

export const vicMapFeatureServerIds = {
  localities: '11',
  postcodes: '14',
  lgas: '9'
}

export const defaultGeometryPrecision = 7

/**
 * @description Fetch dataform the VicMap API - https://services6.arcgis.com/GB33F62SbDxJjwEL/ArcGIS/rest/services/Vicmap_Admin/FeatureServer
 * @param Layer id of featureserver to use
 */
export async function fetchData(layer: string, options): Promise<any> {
  const defaultOptions = {
    spatialRel: 'esriSpatialRelIntersects',
    units: 'esriSRUnit_Meter',
    inSR: '4326',
    outSR: '4326',
    f: 'json'
  }
  const formData = new URLSearchParams({
    ...defaultOptions,
    ...options
  })
  return fetch(`${baseArcGISURL}/${layer}/query`, {
    method: 'POST', // API supports both POST and GET interchangebly but POST allows you to pass more data
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

/**
 * @description Here we use turf (https://turfjs.org/docs) buffer, tuncate and simplify to reduce the size of the polygon. Some areas have complex geometry that cannot be queried for directly without simplifying
 */
export function simplifyGeometry(
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

/**
 * @description Makes a request using geometry that has been simplified to the amount required to work with ArcGIS API. For every request that returns an error, we decrease the precision and buffer values until we get a simpler geometry that returns a valid response.
 */
export async function fetchUsingSimplifiedGeometry(
  geometry,
  fetchFn,
  options = {
    geometryPrecision: defaultGeometryPrecision,
    bufferVal: -40,
    maxTries: 4
  }
): Promise<any> {
  let bufferVal = options.bufferVal
  let precision = options.geometryPrecision
  let hasResponse = false
  const maxTries = options.maxTries
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

/**
 * @description Fetch a postcode for a specific Polygon geometry
 */
export async function fetchPostCodesMatchingPolygonGeometry(
  geometry,
  options: {
    geometryType: 'esriGeometryPolygon'
    spatialRel: 'esriSpatialRelIntersects'
    units: 'esriSRUnit_Meter'
    where: '1=1'
    defaultSR: '4326'
    returnGeometry: false
    outFields: 'postcode'
  }
): Promise<string[] | 'error'> {
  return fetchData(vicMapFeatureServerIds.postcodes, {
    geometry: `{"rings": ${JSON.stringify(geometry)} }`,
    ...options
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

/**
 * @description Fetch a postcode for a specific Point geometry
 */
export async function fetchPostCodesMatchingPointGeometry(
  geometry,
  options = {
    geometryType: 'esriGeometryPoint',
    spatialRel: 'esriSpatialRelIntersects',
    units: 'esriSRUnit_Meter',
    where: '1=1',
    defaultSR: '4326',
    returnGeometry: false,
    outFields: 'postcode'
  }
): Promise<string[] | 'error'> {
  return fetchData(vicMapFeatureServerIds.postcodes, {
    geometry: geometry,
    ...options
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

/**
 * @description Fetches LGAs that match a given Polygon geometry
 */
export async function fetchLGAsMatchingGeometry(
  geometry,
  options = {
    spatialRel: 'esriSpatialRelIntersects',
    units: 'esriSRUnit_Meter',
    defaultSrt: '4326',
    geometryType: 'esriGeometryPolygon',
    returnGeometry: false,
    outFields: 'lga_official_name,lga_name,lga_code',
    returnCentroid: true
  }
) {
  return fetchData(vicMapFeatureServerIds.lgas, {
    geometry: `{"rings": ${JSON.stringify(geometry)} }`,
    ...options
  })
    .then((response) => {
      if (response.features && response.features.length > 0) {
        return response.features.map((feature) => ({
          lga_official_name: convertToTitleCase(
            feature.attributes.lga_official_name
          ),
          lga_name: feature.attributes.lga_name,
          lga_code: feature.attributes.lga_code
        }))
      }
      return 'error'
    })
    .catch((err) => {
      console.log(err)
      return 'error'
    })
}

/**
 * @description Fetch a bounding box extent for a feature matching a where clause
 * @param featureServer ID of feature server to query
 * @param where SQL query to match feature on
 */
export async function fetchBboxForFeature(
  where: string,
  featureServer = vicMapFeatureServerIds.localities
): Promise<number[] | []> {
  return fetchData(featureServer, {
    where,
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
