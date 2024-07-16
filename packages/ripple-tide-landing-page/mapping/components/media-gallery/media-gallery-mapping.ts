import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { getMediaPath } from '@dpc-sdp/ripple-tide-api'

export interface ITideMediaGallery {
  id: string
  items: Array<{
    title: string
    caption: string | null
    alt: string | null
    thumbnail: string
    image: string
  }>
}

export const mediaGalleryMapping = (
  field
): TideDynamicPageComponent<ITideMediaGallery> => {
  return {
    component: 'TideLandingPageMediaGallery',
    id: field.drupal_internal__id.toString(),
    props: {
      id: field.drupal_internal__id.toString(),
      items: field.field_paragraph_media_gallery.field_gallery_media.map(
        (item) => {
          return {
            title: item.name,
            caption: item.field_media_caption,
            alt: item.field_media_image.meta.alt,
            thumbnail: getMediaPath(item.field_media_image),
            image: getMediaPath(item.field_media_image)
          }
        }
      )
    }
  }
}

export const mediaGalleryIncludes = [
  'field_landing_page_component.field_paragraph_media_gallery.field_gallery_media.field_media_image'
]

export default {
  includes: mediaGalleryIncludes,
  mapping: mediaGalleryMapping,
  contentTypes: ['landing_page']
}
