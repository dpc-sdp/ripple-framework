import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'
import {
  getImageFromField,
  getBodyFromField,
  getField
} from '@dpc-sdp/ripple-tide-api'
import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'

const tideNewsModule: RplTideMapping = {
  mapping: {
    ...tidePageBaseMapping({
      withSidebarContacts: true,
      withSidebarRelatedLinks: true,
      withSidebarSiteSectionNav: true,
      withSidebarSocialShare: true
    }),
    showTopicTags: 'field_show_topic_term_and_tags',
    header: {
      title: 'title',
      summary: 'field_news_intro_text'
    },
    details: {
      published: 'field_news_date',
      location: (src) =>
        getField(src, 'field_location')
          .map(({ name }) => name)
          .join(', '),
      department: (src) => getField(src, 'field_node_department.name')
    },
    body: {
      image: (src) =>
        getImageFromField(src, 'field_featured_image.field_media_image'),
      caption: (src) =>
        getField(src, 'field_featured_image.field_media_caption'),
      content: (src) => getBodyFromField(src, 'body')
    }
  },
  includes: [
    ...tidePageBaseIncludes({
      withTopicTags: true,
      withSidebarSiteSectionNav: true,
      withSidebarContacts: true,
      withSidebarRelatedLinks: true,
      withSidebarSocialShare: true
    }),
    'field_location',
    'field_node_department',
    'field_featured_image',
    'field_featured_image.field_media_image'
  ]
}

export default tideNewsModule
