import {
  fetchLocalityData,
  fetchPaginatedCollection,
  fetchPostCodeData,
  fetchLGAsMatchingGeometry,
  fetchBboxForFeature,
  vicMapFeatureServerIds,
  fetchLGAData,
  bufferPolygon,
  defaultGeometryPrecision
} from './arcGisApi'
import { convertToTitleCase, writeFile } from './utilities'

async function getAllLocalities() {
  const allLocalities = await fetchPaginatedCollection(
    vicMapFeatureServerIds.localities,
    {
      where: `1=1`,
      returnGeometry: true,
      geometryPrecision: defaultGeometryPrecision,
      returnCentroid: true,
      orderByFields: 'LOCALITY_NAME'
    }
  )
  const localitiesWithLGAs = await fetchConcurrently(
    allLocalities,
    fetchLGAsFromLocalityGeometry
  )
  const flattenedLocalitiesByLga = [].concat(...localitiesWithLGAs)

  return flattenedLocalitiesByLga
}

async function fetchLGAsFromLocalityGeometry(feature) {
  const simplifedGeometry = bufferPolygon(feature.geometry.rings)
  const matchingLGAs = await fetchLGAsMatchingGeometry(simplifedGeometry)

  const localitiesWithLGAData: any[] = []
  for (let i = 0; i < matchingLGAs.length; i++) {
    const itm = matchingLGAs[i]
    const lga_bbox = await fetchLgaBbox(itm.lga_code)
    if (itm.hasOwnProperty('lga_code')) {
      localitiesWithLGAData.push({
        name: convertToTitleCase(feature.attributes.LOCALITY_NAME),
        area_type: 'locality',
        lga_bbox,
        ...itm
      })
    }
  }
  return Promise.resolve(localitiesWithLGAData)
}

async function fetchConcurrently(
  array: any[],
  asyncFunction: (item: any) => Promise<any>
) {
  const concurrency = 5 // number of concurrent requests to make to API
  const results: any[] = []

  for (let i = 0; i < array.length; i += concurrency) {
    const promises: Promise<any>[] = []

    for (let j = i; j < Math.min(i + concurrency, array.length); j++) {
      promises.push(asyncFunction(array[j]))
    }

    results.push(...(await Promise.all(promises)))
  }

  return results
}

async function fetchLgaBbox(lga_code) {
  const lgaBBOX = await fetchBboxForFeature(
    `lga_code = '${lga_code}'`,
    vicMapFeatureServerIds.lgas
  )
  return lgaBBOX
}

async function fetchLGAWithBBOX(feature) {
  const bbox = await fetchLgaBbox(feature.attributes.lga_code)
  return {
    name: convertToTitleCase(feature.attributes.lga_official_name),
    area_type: 'lga',
    bbox,
    lga_official_name: feature.attributes.lga_official_name,
    lga_code: feature.attributes.lga_code,
    lga_name: feature.attributes.lga_official_name
  }
}

async function getAllLGAs() {
  const lgas = await fetchLGAData(0, '1=1', {
    returnGeometry: false,
    returnCentroid: false,
    orderByFields: 'lga_code',
    outFields: 'lga_official_name,lga_name,lga_code'
  })
  return fetchConcurrently(lgas.features, fetchLGAWithBBOX)
}

async function getAllPostCodes() {
  const postcodes = await fetchPostCodeData(0, `1=1`, {
    returnGeometry: true,
    returnCentroid: false,
    orderByFields: 'postcode',
    outFields: 'postcode'
  })
  const withLGAData = await fetchConcurrently(
    postcodes.features,
    fetchLGAsFromPostcodeGeometry
  )
  return [].concat(...withLGAData)
}

async function fetchLGAsFromPostcodeGeometry(feature) {
  const simplifedGeometry = bufferPolygon(feature.geometry.rings)
  const matchingLGAs = await fetchLGAsMatchingGeometry(simplifedGeometry)

  const postcodesWithLGAData: any[] = []
  for (let i = 0; i < matchingLGAs.length; i++) {
    const itm = matchingLGAs[i]
    const lga_bbox = await fetchLgaBbox(itm.lga_code)
    if (itm.hasOwnProperty('lga_code')) {
      postcodesWithLGAData.push({
        name: feature.attributes.postcode,
        area_type: 'postcode',
        lga_bbox,
        ...itm
      })
    }
  }
  return Promise.resolve(postcodesWithLGAData)
}

async function getBudgetData(
  savePath: string,
  options: {
    where: string
    initialOffset: number
    delay: number
    perPage: number
  }
): Promise<void> {
  const results: any[] = []
  const localities = await getAllLocalities()
  const lgas = await getAllLGAs()
  const postcodes = await getAllPostCodes()
  results.push(...localities, ...lgas, ...postcodes)
  await writeFile(savePath, JSON.stringify(results, null, 2), false, false)
  console.log(`wrote ${results.length} items to ${savePath}`)
}

export default getBudgetData
