import {
  fetchPaginatedCollection,
  fetchPostCodeData,
  fetchLGAsMatchingGeometry,
  fetchBboxForFeature,
  vicMapFeatureServerIds,
  fetchLGAData,
  bufferPolygon,
  defaultGeometryPrecision
} from './arcGisApi'
import { convertToTitleCase, writeFile, uniqBy } from './utilities'

async function getAllLocalities() {
  const allLocalities = await fetchPaginatedCollection(
    vicMapFeatureServerIds.localities,
    {
      where: `state = 'VIC' AND name <> 'vic'`,
      returnGeometry: true,
      geometryPrecision: defaultGeometryPrecision,
      returnCentroid: true,
      orderByFields: 'NAME'
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
  let bufferVal = -20
  const difficultLocalities = {
    DONVALE: -200,
    DRUMMARTIN: -200,
    EAGLEMONT: -200,
    GEMBROOK: -500,
    'GRAND RIDGE': -500,
    'MOUNT BRUNO': -500,
    'NORTH MELBOURNE': -300,
    'POMBORNEIT EAST': -500,
    'SOUTH WHARF': -200,
    TREMONT: -200
  }

  if (difficultLocalities[feature.attributes.NAME]) {
    bufferVal = difficultLocalities[feature.attributes.NAME]
  }

  const simplifedGeometry = bufferPolygon(feature.geometry.rings, bufferVal)
  const matchingLGAs = await fetchLGAsMatchingGeometry(simplifedGeometry)

  const localitiesWithLGAData: any[] = []
  for (let i = 0; i < matchingLGAs.length; i++) {
    const itm = matchingLGAs[i]
    const lga_bbox = await fetchLgaBbox(itm.lga_code)
    if (itm.lga_code) {
      localitiesWithLGAData.push({
        name: convertToTitleCase(feature.attributes.NAME),
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

function isLgaUninc(name) {
  return name.includes('(UNINC')
}

async function fetchLGAWithBBOX(feature) {
  const bbox = await fetchLgaBbox(feature.attributes.lga_code)
  return {
    name: convertToTitleCase(feature.attributes.official_name),
    area_type: isLgaUninc(feature.attributes.official_name)
      ? 'unincorporated'
      : 'lga',
    bbox,
    lga_official_name: feature.attributes.official_name,
    lga_code: feature.attributes.lga_code,
    lga_name: feature.attributes.official_name
  }
}

async function getAllLGAs() {
  const lgas = await fetchLGAData(0, `STATE='VIC'`, {
    returnGeometry: false,
    returnCentroid: false,
    orderByFields: 'lga_code',
    outFields: 'official_name,name,lga_code'
  })
  const allLGAs = await fetchConcurrently(lgas.features, fetchLGAWithBBOX)
  // only return unique lgas, there are duplicates in the Vicmap data for some ungodly reason
  // also filter out unincorporated LGA areas
  return allLGAs
    .filter((v, i, a) => a.findIndex((v2) => v2.lga_code === v.lga_code) === i)
    .filter((itm) => itm.area_type !== 'unincorporated')
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

const difficultPostcodes = {
  '3139': -500,
  '3237': null,
  '3243': null,
  '3283': null,
  '3340': -400,
  '3351': null,
  '3352': null,
  '3364': null,
  '3401': null,
  '3463': null,
  '3478': null,
  '3685': null
}

async function fetchLGAsFromPostcodeGeometry(feature) {
  let bufferVal = -1
  if (difficultPostcodes.hasOwnProperty(feature.attributes.postcode)) {
    bufferVal = difficultPostcodes[feature.attributes.postcode]
  }
  // we skip buffer step for items that have multiple polygon shapes
  const simplifedGeometry =
    bufferVal !== null
      ? bufferPolygon(feature.geometry.rings, bufferVal)
      : feature.geometry.rings
  const matchingLGAs = await fetchLGAsMatchingGeometry(simplifedGeometry)
  const postcodesWithLGAData: any[] = []
  if (matchingLGAs !== 'error') {
    const matchingLGAsClean: any[] = uniqBy(matchingLGAs, (itm) => itm.lga_code)
    for (let i = 0; i < matchingLGAsClean.length; i++) {
      const itm = matchingLGAsClean[i]
      const lga_bbox = await fetchLgaBbox(itm.lga_code)
      if (itm.hasOwnProperty('lga_code') && itm['lga_code']) {
        postcodesWithLGAData.push({
          name: feature.attributes.postcode,
          area_type: 'postcode',
          lga_bbox,
          ...itm
        })
      }
    }
  }
  return Promise.resolve(postcodesWithLGAData)
}

async function getBudgetData(savePath: string): Promise<void> {
  const results: any[] = []
  const localities = await getAllLocalities()
  const lgas = await getAllLGAs()
  const postcodes = await getAllPostCodes()
  results.push(...localities, ...lgas, ...postcodes)
  await writeFile(savePath, JSON.stringify(results, null, 2), false, false)
  console.log(`wrote ${results.length} items to ${savePath}`)
}

export default getBudgetData
