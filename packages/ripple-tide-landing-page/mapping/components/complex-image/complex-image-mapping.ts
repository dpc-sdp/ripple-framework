import { getBody } from '@dpc-sdp/ripple-tide-api'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'

export interface ITideComplexImage {
  title: string
  sourceCaption: string
  dataContent: string | null
  src: string
  downloadUrl: string
  type: string
  variant: string
  allowFullscreen: boolean
  showTitle: boolean
}

export const complexImageMapping = (
  field: any
): TideDynamicPageComponent<ITideComplexImage> => {
  return {
    component: 'TideLandingPageMediaEmbed',
    id: `${field.drupal_internal__id}`,
    props: {
      title: field.field_complex_image_title,
      sourceCaption: field.field_complex_image_source,
      dataContent: getBody(field.field_complex_image_data?.processed),
      src: field.field_complex_image_media.field_media_image.url,
      downloadUrl: field.field_complex_image_media.field_media_image.url,
      type: 'image',
      variant: 'complex',
      allowFullscreen: true,
      showTitle: true
    }
  }
}

export const complexImageIncludes = [
  'field_landing_page_component.field_complex_image_media.field_media_image'
]

export default {
  includes: complexImageIncludes,
  mapping: complexImageMapping,
  contentTypes: ['landing_page']
}
