import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from '@jest/globals'
import { navigationCardMapping, ITideNavCard } from './navigation-card-mapping'

const rawData = {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/navigation_card/55e1fee6-993a-4fbc-9173-40da96243484'
    }
  },
  meta: {
    target_revision_id: 2314
  },
  drupal_internal__id: 1910,
  drupal_internal__revision_id: 2314,
  langcode: 'en',
  status: true,
  created: '2022-11-14T02:58:10+00:00',
  parent_id: '65',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: true,
  field_customise: true,
  field_nav_card_display_style: 'featured',
  field_paragraph_link: {
    uri: 'entity:node/63',
    title: '',
    options: [],
    pid: '413',
    alias: '/demo-event',
    url: '/demo-event',
    image: {
      data: [
        {
          target_id: '44',
          alt: 'Demo: Melbourne tram',
          title: 'Demo: Melbourne tram',
          width: '1413',
          height: '785',
          _loaded: true,
          _accessCacheability: {}
        }
      ],
      url: '/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
      meta: {}
    },
    internal_node_fields: {
      title: 'Demo Event',
      node_type: 'Event',
      topic: 'Demo Topic',
      tags: ['Demo Tag', 'Another Demo Tag'],
      summary: 'Demo event summary',
      date: {
        value: '2019-07-02 09:00:00',
        end_value: '2019-07-07 10:00:00'
      }
    },
    origin_alias: '/demo-event',
    origin_url: '/demo-event'
  },
  field_paragraph_summary: null,
  field_paragraph_title: null,
  id: '55e1fee6-993a-4fbc-9173-40da96243484',
  type: 'paragraph--navigation_card'
}

describe('navigationCardMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    const result: TideDynamicPageComponent<ITideNavCard> = {
      id: '1910',
      component: 'TideLandingPageNavCard',
      props: {
        displayStyle: 'featured',
        title: 'Demo Event',
        summary: 'Demo event summary',
        image: {
          alt: 'Demo: Melbourne tram',
          focalPoint: undefined,
          height: 785,
          src: '/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
          title: 'Demo: Melbourne tram',
          width: 1413
        },
        url: '/demo-event',
        showMetadata: true,
        metadata: {
          dateStart: '2019-07-02 09:00:00',
          dateEnd: '2019-07-07 10:00:00',
          topic: 'Demo Topic',
          contentType: 'Event',
          fvRecommendationStatus: '',
          inductionYear: '',
          isGrantOngoing: false
        }
      }
    }

    expect(navigationCardMapping(rawData)).toEqual(result)
  })
})
