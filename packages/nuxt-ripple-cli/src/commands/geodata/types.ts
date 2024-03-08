export type LocalityFeature = {
  attributes: {
    LOCALITY_NAME: string
  }
  geometry?: {
    rings: []
  }
  centroid: {
    x: string
    y: string
  }
}

export interface ILocalityVicMapData {
  features: LocalityFeature[]
  exceededTransferLimit: boolean
}

export interface ILocalitySearchData {
  name: string
  areaType: string
  center: string
  geometry?: any
  lga?: string[]
  centroid?: {
    x: string
    y: string
  }
  postcode?: string[] | string
  bbox?: number[] | []
}
