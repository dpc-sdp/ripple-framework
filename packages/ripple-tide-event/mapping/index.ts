import {
  drupalField,
  getField,
  getBodyFromField,
  getLinkFromField,
  formatPriceRange
} from '@dpc-sdp/ripple-tide-api'
import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'
import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'

const getAddress = (field: drupalField) => `
 ${field.address_line1}${field.address_line1 ? ', ' : ''}
 ${field.address_line2}${field.address_line2 ? ', ' : ''}
 ${field.locality}${field.address_line2 || field.locality ? ', ' : ''}
 ${field.administrative_area} ${field.postal_code}
`

const tideEventModule: RplTideMapping = {
  component: '@dpc-sdp/ripple-tide-event/component',
  schema: '@dpc-sdp/ripple-tide-event/types',
  mapping: {
    ...tidePageBaseMapping({
      withSidebarContacts: true,
      withSidebarRelatedLinks: true,
      withSidebarSocialShare: true
    }),
    url: 'path.url',
    summary: 'field_landing_page_summary',
    showInPageNav: 'field_show_table_of_content',
    inPageNavHeadingLevel: (src) => {
      if (src.field_node_display_headings === 'showH2AndH3') {
        return 'h3'
      }
      return 'h2'
    },
    header: {
      title: 'title',
      summary: 'field_news_intro_text'
    },
    breadcrumbs: (src: string) => {
      return {
        items: [
          { label: 'Home', url: '/' },
          {
            label: getField(src, 'publication_navigation_root.meta.title'),
            url: getField(src, 'publication_navigation_root.meta.url')
          },
          { label: getField(src, 'title') }
        ]
      }
    },
    date: {
      from: 'field_event_details[0].field_paragraph_date_range.value',
      to: 'field_event_details[0].field_paragraph_date_range.end_value'
    },
    showTime: 'field_event_details[0].field_show_time',
    overview: (src: string) =>
      getField(src, 'field_event_details').map((node: any) => [
        {
          term: 'Price:',
          description: formatPriceRange({
            from: node.field_paragraph_event_price_from,
            to: node.field_paragraph_event_price_to
          })
        },
        {
          term: 'Location:',
          description: getAddress(node.field_paragraph_location)
        }
      ])[0],
    details: (src: string) =>
      getField(src, 'field_event_details[0].field_event_requirements').map(
        (node: any) => node.name
      ),
    description: 'field_event_description.processed',
    body: (src: string) => getBodyFromField(src, 'body'),
    link: (src: string) =>
      getLinkFromField(src, 'field_event_details[0].field_paragraph_link'),
    showLastUpdated: () => true
  },
  includes: [
    ...tidePageBaseIncludes({
      withSidebarContacts: true,
      withSidebarRelatedLinks: true,
      withSidebarSocialShare: true
    }),
    'field_event_details',
    'field_featured_image',
    'field_event_details.field_event_requirements'
  ]
}

export default tideEventModule
