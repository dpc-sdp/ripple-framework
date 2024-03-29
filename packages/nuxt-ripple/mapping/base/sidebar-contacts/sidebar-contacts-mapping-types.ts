export interface TideAddress {
  countryCode: string
  administrativeArea: string
  locality: string
  postalCode: string
  addressLine1: string
  addressLine2: string
}

export interface TidePhone {
  id: string
  title: string
  number: string
}

export interface TideSocialMediaLink {
  id: string
  type: string
  text: string
  url: string
}

export interface TideContact {
  id: string
  contactTitle: string
  contactName: string
  department: string
  email: string
  locationAddress: TideAddress | null
  postalAddress: TideAddress | null
  phones: TidePhone[]
  socialMedia: TideSocialMediaLink[]
}
