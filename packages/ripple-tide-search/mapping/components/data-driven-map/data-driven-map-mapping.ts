import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'

export const dataDrivenMapMapping = (field): TideDynamicPageComponent<any> => {
  return {
    component: 'TideDataDrivenMap',
    id: field.drupal_internal__id.toString(),
    props: {
      ...field.field_content_collection_config
    }
  }
}

export const dataDrivenMapIncludes = []

export default {
  includes: dataDrivenMapIncludes,
  mapping: dataDrivenMapMapping,
  contentTypes: ['landing_page']
}
