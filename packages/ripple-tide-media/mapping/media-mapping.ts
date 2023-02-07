import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'

// Shared mapping between media types
export const tideMediaBaseMapping = {
  ...tidePageBaseMapping(),
  type: (data) => data.type,
  title: 'name',
  header: {
    title: 'name'
  },
  media: {
    summary: 'field_media_summary',
    content: 'field_media_transcript.processed'
  }
}

export const tideMediaBaseIncludes = tidePageBaseIncludes()
