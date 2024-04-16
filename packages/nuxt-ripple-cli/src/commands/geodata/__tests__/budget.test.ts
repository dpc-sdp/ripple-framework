import { describe, it, expect } from '@jest/globals'
import * as testData from './data/budget.json'
import * as geoserverData from './data/geoserver.json'

function findMissingItems(
  firstArray: string[],
  secondArray: string[]
): string[] {
  // Convert arrays to sets for efficient comparison
  const firstSet = new Set(firstArray)
  const secondSet = new Set(secondArray)

  // Find the items that are in the first set but not in the second set
  const missingItems = new Set(
    [...firstSet].filter((item) => !secondSet.has(item))
  )

  return Array.from(missingItems)
}

describe('budget data script', () => {
  describe('Localities', () => {
    const testLocalities = testData.filter(
      (itm) => itm.area_type === 'locality'
    )
    const geoserverDataLocalities = geoserverData.features.filter(
      (itm) => itm.properties.type === 'locality'
    )

    it('should have the same count of localities as the geoserver data', () => {
      const testLocalitiesPairs = testLocalities.map(
        (itm) =>
          `${itm.name.toUpperCase()} - ${itm.lga_official_name.toUpperCase()}`
      )
      const geoServerLocalitiesPairs = geoserverDataLocalities.map(
        (itm) => `${itm.properties.name} - ${itm.properties.lga_official_name}`
      )
      const missingInTestData: string[] = findMissingItems(
        geoServerLocalitiesPairs,
        testLocalitiesPairs
      )
      expect(missingInTestData).toMatchInlineSnapshot(`
        [
          "AREEGRA - BULOKE SHIRE",
          "ATHLONE - SOUTH GIPPSLAND SHIRE",
          "BALMORAL - HORSHAM RURAL CITY",
          "BARINGHUP WEST - CENTRAL GOLDFIELDS SHIRE",
          "BARWON DOWNS - SURF COAST SHIRE",
          "BAYNTON - MITCHELL SHIRE",
          "BAYSWATER NORTH - KNOX CITY",
          "BEACONSFIELD UPPER - CASEY CITY",
          "BENGWORDEN - WELLINGTON SHIRE",
          "BERWICK - CARDINIA SHIRE",
          "BLACKBURN NORTH - MANNINGHAM CITY",
          "BULLEEN - BOROONDARA CITY",
          "BULLENGAROOK - MOORABOOL SHIRE",
          "CALLIGNEE - WELLINGTON SHIRE",
          "CALLIGNEE NORTH - LATROBE CITY",
          "CHERRYPOOL - NORTHERN GRAMPIANS SHIRE",
          "COLDSTREAM - NILLUMBIK SHIRE",
          "CONDAH - MOYNE SHIRE",
          "DEER PARK - MELTON CITY",
          "DIMBOOLA - HORSHAM RURAL CITY",
          "DROPMORE - MITCHELL SHIRE",
          "DROPMORE - STRATHBOGIE SHIRE",
          "EDGECOMBE - MOUNT ALEXANDER SHIRE",
          "EILDON - YARRA RANGES SHIRE",
          "ELIZABETH ISLAND - FRENCH-ELIZABETH-SANDSTONE ISLANDS (UNINC)",
          "ESSENDON - MERRI-BEK CITY",
          "FRENCH ISLAND - FRENCH-ELIZABETH-SANDSTONE ISLANDS (UNINC)",
          "GISBORNE - MELTON CITY",
          "GLENORCHY - HORSHAM RURAL CITY",
          "HARKAWAY - CARDINIA SHIRE",
          "HAWTHORN - STONNINGTON CITY",
          "INDIGO VALLEY - WODONGA CITY",
          "KANGAROO GROUND - MANNINGHAM CITY",
          "KEW - YARRA CITY",
          "KINGLAKE WEST - MITCHELL SHIRE",
          "KOOYONG - BOROONDARA CITY",
          "LORNE - COLAC OTWAY SHIRE",
          "LOWER PLENTY - MANNINGHAM CITY",
          "MARYSVILLE - YARRA RANGES SHIRE",
          "MIGA LAKE - HORSHAM RURAL CITY",
          "MINCHA WEST - LODDON SHIRE",
          "MINYIP - BULOKE SHIRE",
          "MONT ALBERT NORTH - MANNINGHAM CITY",
          "MURCHISON - CAMPASPE SHIRE",
          "NARRE WARREN EAST - CARDINIA SHIRE",
          "OFFICER SOUTH - CASEY CITY",
          "POINT COOK - HOBSONS BAY CITY",
          "REDESDALE - MITCHELL SHIRE",
          "RINGWOOD - KNOX CITY",
          "TOOBORAC - MACEDON RANGES SHIRE",
          "WAIL - HINDMARSH SHIRE",
          "WAL WAL - HORSHAM RURAL CITY",
          "WANTIRNA - MAROONDAH CITY",
          "WONNANGATTA - WELLINGTON SHIRE",
        ]
      `)
      const missingInGeoData: string[] = findMissingItems(
        testLocalitiesPairs,
        geoServerLocalitiesPairs
      )
      expect(missingInGeoData).toMatchInlineSnapshot(`
        [
          "ELIZABETH ISLAND - FRENCH-ELIZABETH-SANDSTONE ISLANDS (UNINCORPO",
          "FRENCH ISLAND - FRENCH-ELIZABETH-SANDSTONE ISLANDS (UNINCORPO",
          "WARRANWOOD - MANNINGHAM CITY",
          "WATTLE HILL - COLAC OTWAY SHIRE",
        ]
      `)
    })
  })
  describe('LGAs', () => {
    it('should have the correct number of LGAs', () => {
      const testLGAs = testData.filter((itm) => itm.area_type === 'lga')
      expect(testLGAs.length).toEqual(79)
    })
  })
  describe('Postcodes', () => {
    it('should have the correct number of Postcodes', () => {
      const postcodes = testData.filter((itm) => itm.area_type === 'postcode')
      expect(postcodes.length).toEqual(1424)
    })
    it('should have no null lga values', () => {
      const postcodes = testData.filter((itm) => itm.area_type === 'postcode')
      expect(postcodes.every((itm) => itm.lga_code !== null)).toBeTruthy()
    })
    it('should have a bbox for each LGA', () => {
      const postcodes = testData.filter((itm) => itm.area_type === 'postcode')
      expect(
        postcodes.every((itm) => itm.lga_bbox && Array.isArray(itm.lga_bbox))
      ).toBeTruthy()
    })
    it('should have the same number of postcode / lga pairs as geoserver dataset', () => {
      const postcodes = testData.filter((itm) => itm.area_type === 'postcode')
      const geoserverDataPostcodes = geoserverData.features.filter(
        (itm) => itm.properties.type === 'postcode'
      )

      const testPostcodes = postcodes.map(
        (itm) =>
          `${itm.name.toUpperCase()} - ${itm.lga_official_name.toUpperCase()}`
      )
      const geoServerPostcodes = geoserverDataPostcodes.map(
        (itm) => `${itm.properties.name} - ${itm.properties.lga_official_name}`
      )

      const missing: string[] = findMissingItems(
        geoServerPostcodes,
        testPostcodes
      )
      expect(missing).toMatchInlineSnapshot(`
        [
          "3030 - HOBSONS BAY CITY",
          "3134 - KNOX CITY",
          "3551 - LODDON SHIRE",
          "3559 - GREATER BENDIGO CITY",
          "3646 - STRATHBOGIE SHIRE",
          "3691 - ALPINE SHIRE",
          "3691 - INDIGO SHIRE",
          "3691 - WODONGA CITY",
          "3701 - EAST GIPPSLAND SHIRE",
          "3713 - YARRA RANGES SHIRE",
          "3722 - MOUNT BULLER ALPINE RESORT (UNINCORPORATED)",
          "3722 - MOUNT STIRLING ALPINE RESORT (UNINCORPORATED)",
          "3921 - FRENCH-ELIZABETH-SANDSTONE ISLANDS (UNINC)",
          "3951 - BASS COAST SHIRE",
        ]
      `)
    })
  })
})
