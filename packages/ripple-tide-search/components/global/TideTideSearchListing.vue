<script setup lang="ts">
import { computed } from '#imports'
import { MappedSearchResult } from '@dpc-sdp/ripple-tide-search/types'
import { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type { TideSearchListingPage } from './../../types'

interface Props {
  site: TideSiteData
  page: TideSearchListingPage
}

const props = defineProps<Props>()

const searchDriverOptions = {
  initialState: {
    resultsPerPage: props.page.searchConfig?.pageConfig?.resultsPerPage || 10
  },
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    filters: props.page.searchConfig?.globalFilters,
    search_fields: props.page.searchConfig?.searchFields
  }
}

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
  <TideSearchPage
    :title="page.title"
    :summary="page.summary"
    :filterConfig="page.searchConfig?.filterConfig || undefined"
    :filterInputs="page.searchConfig?.filterInputs"
    :pageConfig="page.searchConfig?.pageConfig"
    :searchDriverOptions="searchDriverOptions"
    :searchResultsMappingFn="searchResultsMappingFn"
  />
</template>
