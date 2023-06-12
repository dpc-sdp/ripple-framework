<script setup lang="ts">
import { MappedSearchResult } from '@dpc-sdp/ripple-tide-search/types'
import { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type { TideSearchListingPage } from './../../types'

interface Props {
  site: TideSiteData
  page: TideSearchListingPage
}

const props = defineProps<Props>()

const searchResultsMappingFn = (item): MappedSearchResult<any> => {
  for (const key in props.page.searchConfig?.resultsConfig) {
    const mapping = props.page.searchConfig?.resultsConfig[key]
    if (item.type?.raw[0] === key || key === '*') {
      return {
        id: item._meta.id,
        component: mapping.component,
        props: {
          result: item
        }
      }
    } else {
      /* Add default search result mapping if none provided */
      return {
        id: item._meta.id,
        component: 'TideSearchResult',
        props: {
          result: item
        }
      }
    }
  }
}
</script>

<template>
  <TideSearchListing
    :title="page.title"
    :queryConfig="page.searchConfig.query"
    :globalFilters="page.searchConfig.globalFilters"
    :pageConfig="page.searchConfig.pageConfig"
    :userFilters="page.userFilters"
  />
</template>
