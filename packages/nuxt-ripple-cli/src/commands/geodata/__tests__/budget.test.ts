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
          "COBURG - DAREBIN CITY",
          "COBURG NORTH - DAREBIN CITY",
          "COLDSTREAM - NILLUMBIK SHIRE",
          "CONDAH - MOYNE SHIRE",
          "DEER PARK - MELTON CITY",
          "DIMBOOLA - HORSHAM RURAL CITY",
          "DROPMORE - MITCHELL SHIRE",
          "DROPMORE - STRATHBOGIE SHIRE",
          "EDGECOMBE - MOUNT ALEXANDER SHIRE",
          "EILDON - YARRA RANGES SHIRE",
          "ELIZABETH ISLAND - FRENCH-ELIZABETH-SANDSTONE ISLANDS (UNINC)",
          "ELTHAM - BANYULE CITY",
          "ESSENDON - MERRI-BEK CITY",
          "FRENCH ISLAND - FRENCH-ELIZABETH-SANDSTONE ISLANDS (UNINC)",
          "GISBORNE - MELTON CITY",
          "GLENORCHY - HORSHAM RURAL CITY",
          "HARKAWAY - CARDINIA SHIRE",
          "HAWTHORN - STONNINGTON CITY",
          "INDIGO VALLEY - WODONGA CITY",
          "KANGAROO GROUND - MANNINGHAM CITY",
          "KENSINGTON - MOONEE VALLEY CITY",
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
          "ELIZABETH ISLAND - FRENCH-ELIZABETH-SANDSTONE ISLANDS (UNINCORPORATED)",
          "FRENCH ISLAND - FRENCH-ELIZABETH-SANDSTONE ISLANDS (UNINCORPORATED)",
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
      expect(postcodes.length).toEqual(1098)
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

      const missingInTestData: string[] = findMissingItems(
        geoServerPostcodes,
        testPostcodes
      )
      expect(missingInTestData).toMatchInlineSnapshot(`
        [
          "3030 - HOBSONS BAY CITY",
          "3040 - MERRI-BEK CITY",
          "3058 - DAREBIN CITY",
          "3093 - MANNINGHAM CITY",
          "3097 - MANNINGHAM CITY",
          "3101 - YARRA CITY",
          "3105 - BOROONDARA CITY",
          "3122 - STONNINGTON CITY",
          "3129 - MANNINGHAM CITY",
          "3130 - MANNINGHAM CITY",
          "3133 - KNOX CITY",
          "3134 - KNOX CITY",
          "3144 - BOROONDARA CITY",
          "3152 - MAROONDAH CITY",
          "3414 - HORSHAM RURAL CITY",
          "3437 - MELTON CITY",
          "3437 - MOORABOOL SHIRE",
          "3551 - LODDON SHIRE",
          "3559 - GREATER BENDIGO CITY",
          "3610 - CAMPASPE SHIRE",
          "3646 - STRATHBOGIE SHIRE",
          "3691 - ALPINE SHIRE",
          "3691 - INDIGO SHIRE",
          "3691 - WODONGA CITY",
          "3701 - EAST GIPPSLAND SHIRE",
          "3713 - YARRA RANGES SHIRE",
          "3722 - MOUNT BULLER ALPINE RESORT (UNINCORPORATED)",
          "3722 - MOUNT STIRLING ALPINE RESORT (UNINCORPORATED)",
          "3737 - WELLINGTON SHIRE",
          "3770 - NILLUMBIK SHIRE",
          "3804 - CARDINIA SHIRE",
          "3808 - CASEY CITY",
          "3809 - CASEY CITY",
          "3818 - SOUTH GIPPSLAND SHIRE",
          "3921 - FRENCH-ELIZABETH-SANDSTONE ISLANDS (UNINC)",
          "3951 - BASS COAST SHIRE",
        ]
      `)

      const missingInGeoData: string[] = findMissingItems(
        testPostcodes,
        geoServerPostcodes
      )
      expect(missingInGeoData).toMatchInlineSnapshot(`
        [
          "3108 - WHITEHORSE CITY",
          "3351 - CORANGAMITE SHIRE",
          "3352 - CENTRAL GOLDFIELDS SHIRE",
          "3379 - SOUTHERN GRAMPIANS SHIRE",
          "3415 - HINDMARSH SHIRE",
          "3418 - HORSHAM RURAL CITY",
          "3431 - HUME CITY",
          "3442 - MOORABOOL SHIRE",
          "3462 - CENTRAL GOLDFIELDS SHIRE",
          "3463 - GREATER BENDIGO CITY",
          "3478 - LODDON SHIRE",
          "3546 - MILDURA RURAL CITY",
          "3566 - LODDON SHIRE",
          "3567 - CAMPASPE SHIRE",
          "3570 - CAMPASPE SHIRE",
          "3575 - CAMPASPE SHIRE",
          "3612 - GREATER SHEPPARTON CITY",
          "3638 - GREATER SHEPPARTON CITY",
          "3638 - CAMPASPE SHIRE",
          "3639 - CAMPASPE SHIRE",
          "3658 - WHITTLESEA CITY",
          "3678 - ALPINE SHIRE",
          "3678 - MANSFIELD SHIRE",
          "3678 - WELLINGTON SHIRE",
          "3678 - BENALLA RURAL CITY",
          "3678 - INDIGO SHIRE",
          "3685 - MOIRA SHIRE",
          "3697 - TOWONG SHIRE",
          "3723 - BAW BAW SHIRE",
          "3730 - WANGARATTA RURAL CITY",
          "3730 - INDIGO SHIRE",
          "3735 - ALPINE SHIRE",
          "3737 - WANGARATTA RURAL CITY",
          "3747 - ALPINE SHIRE",
          "3749 - WODONGA CITY",
          "3775 - MURRINDINDI SHIRE",
          "3783 - BAW BAW SHIRE",
          "3783 - YARRA RANGES SHIRE",
          "3797 - BAW BAW SHIRE",
          "3799 - BAW BAW SHIRE",
          "3815 - BAW BAW SHIRE",
          "3825 - MANSFIELD SHIRE",
          "3825 - YARRA RANGES SHIRE",
          "3844 - BAW BAW SHIRE",
          "3851 - EAST GIPPSLAND SHIRE",
          "3858 - ALPINE SHIRE",
          "3858 - WANGARATTA RURAL CITY",
          "3858 - BAW BAW SHIRE",
          "3921 - FRENCH-ELIZABETH-SANDSTONE ISLANDS (UNINCORPORATED)",
          "3960 - WELLINGTON SHIRE",
        ]
      `)
    })
  })
})
