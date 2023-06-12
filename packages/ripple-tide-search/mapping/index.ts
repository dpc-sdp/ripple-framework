import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'
import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'

const getSearchConfig = (src) =>
  src.hasOwnProperty('field_search_configuration') &&
  JSON.parse(src.field_search_configuration)

const tideCollectionModule: IRplTideModuleMapping = {
  mapping: {
    ...tidePageBaseMapping({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: false
    }),
    searchConfig: (src) => getSearchConfig(src),
    userFilters: async (src, tidePageApi) => {
      const config = getSearchConfig(src)
      if (config.userFilters) {
        for (let i = 0; i < config.userFilters.length; i++) {
          const uiFilter = config.userFilters[i]
          if (uiFilter.hasOwnProperty('taxonomy')) {
            const taxonomyResults = await tidePageApi.getTaxonomy(
              uiFilter.taxonomy
            )
            if (taxonomyResults && taxonomyResults.length > 0) {
              uiFilter.props.options = [
                ...new Set(taxonomyResults.map((tax) => tax.name))
              ]
            }
          }
        }
        return config.userFilters
      }
    }
  },
  includes: [
    ...tidePageBaseIncludes({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: false
    })
  ]
}

export default tideCollectionModule
