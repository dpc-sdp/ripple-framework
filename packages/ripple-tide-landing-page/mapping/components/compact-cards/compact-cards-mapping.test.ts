import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from '@jest/globals'
import { compactCardsMapping, ITideCompactCards } from './compact-cards-mapping'
import rawData from './compact-cards'

const result: TideDynamicPageComponent<ITideCompactCards> = {
  component: 'TideLandingPageCategoryGrid',
  id: '7052',
  title: 'Compact Cards',
  props: {
    items: [
      {
        title: 'Card one',
        summary: 'Card one summary',
        image: {
          src: 'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/2023-08/Image2.jpg',
          alt: '',
          focalPoint: undefined,
          height: 667,
          title: '',
          width: 1000
        },
        url: '/landing-page-cc-2'
      },
      {
        title: 'Card two',
        summary: 'Card two summary',
        image: null,
        url: '/tav2-social-sharing-exists-landing-page-fe827f16'
      }
    ]
  }
}

describe('compactCardsMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    expect(compactCardsMapping(rawData)).toEqual(result)
  })
})
