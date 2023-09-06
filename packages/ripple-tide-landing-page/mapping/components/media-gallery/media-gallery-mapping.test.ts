import { expect, describe, it } from '@jest/globals'
import { mediaGalleryMapping } from './media-gallery-mapping'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { rawData } from './test-data'
import { ITideMediaGallery } from './media-gallery-mapping'

describe('mediaGalleryMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    const result: TideDynamicPageComponent<ITideMediaGallery> = {
      component: 'TideLandingPageMediaGallery',
      id: '975',
      props: {
        id: '975',
        items: [
          {
            title: 'Demo: 2018-19 State Budget',
            caption: '2018-19 State Budget caption',
            alt: 'Demo: 2018-19 State Budget',
            thumbnail:
              'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/2018-19-State-Budget.jpg',
            image:
              'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/2018-19-State-Budget.jpg'
          },
          {
            title: 'Demo: Aerial shot of new housing development',
            caption: 'An aerial shot of new housing development caption',
            alt: 'Demo: Aerial shot of new housing development',
            thumbnail:
              'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Aerial-shot-of-new-housing-development.jpg',
            image:
              'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Aerial-shot-of-new-housing-development.jpg'
          },
          {
            title: 'Demo: Bendigo Hospital',
            caption: null,
            alt: 'Demo: Bendigo Hospital',
            thumbnail:
              'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Bendigo-Hospital.jpg',
            image:
              'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Bendigo-Hospital.jpg'
          },
          {
            title: 'Demo: Covid Primary Campaign',
            caption: null,
            alt: 'Demo: Covid Primary Campaign',
            thumbnail:
              'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/covid_primarycampaign.png',
            image:
              'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/covid_primarycampaign.png'
          },
          {
            title: 'Demo: Engage Vic Hero',
            caption: null,
            alt: 'Demo: Engage Vic Hero',
            thumbnail:
              'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Engage-Vic-photo-hero.jpeg',
            image:
              'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Engage-Vic-photo-hero.jpeg'
          }
        ]
      }
    }

    expect(mediaGalleryMapping(rawData)).toEqual(result)
  })
})
