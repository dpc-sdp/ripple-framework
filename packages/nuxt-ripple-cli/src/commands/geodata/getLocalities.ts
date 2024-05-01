import type { ILocalityVicMapData, ILocalitySearchData } from './types'
import { convertToTitleCase, writeFile } from './utilities'
import {
  vicMapFeatureServerIds,
  fetchData,
  fetchUsingSimplifiedGeometry,
  fetchPostCodesMatchingGeometry,
  fetchLGAsMatchingGeometry,
  fetchBboxForFeature,
  fetchLocalityData
} from './arcGisApi'

async function getLgaName(itm) {
  const lga = await fetchUsingSimplifiedGeometry(
    itm.geometry.rings,
    fetchLGAsMatchingGeometry
  )
  if (lga === 'error') {
    return Promise.resolve('error')
  }
  return Promise.resolve(lga.map((itm) => itm.lga_official_name))
}

/**
 * @description Fetches list of localities, then queries postcode and LGA datasets by each localities geometry to build a combined response
 */
async function getLocalities(
  savePath: string,
  options: {
    where: string
    initialOffset: number
    delay: number
    perPage: number
  }
): Promise<void> {
  let hasData = true
  let data: ILocalityVicMapData | null = null
  let offset = options.initialOffset || 0 // starting offset to make requests, can use this to resume interupted requests
  let delay = options.delay || 1000 // add delay between requests to prevent flooding API
  const perPage = options.perPage || 2000 // number of localities to return per request
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
      // backoff after error
      delay = delay * 2
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  if (localities && localities.length > 0) {
    await writeFile(savePath, `[ \n`, false, false)
    for (let index = 0; index < localities.length; index++) {
      const itm = localities[index]
      itm.bbox = await fetchBboxForFeature(`LOCALITY_NAME='${itm.name}'`)
      if (itm.centroid) {
        itm.postcode = await fetchPostCodesMatchingGeometry(
          `${itm.centroid.x},${itm.centroid.y}`
        )
      }
      itm.lga = await getLgaName(itm)
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
