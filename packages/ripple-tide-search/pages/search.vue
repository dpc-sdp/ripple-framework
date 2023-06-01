<script setup lang="ts">
const searchConfig = {
  globalFilters: [
    { field: 'type', values: ['landing_page', 'grant', 'event', 'news'] },
    { field: 'field_node_site', values: [4] }
  ],
  searchFields: {
    title: {
      weight: 10
    },
    field_landing_page_summary: {},
    summary_processed: {}
  },
  filterInputs: [
    {
      id: 'topic',
      component: 'TideSearchFilterDropdown',
      facets: {
        field_topic_name: {
          type: 'value',
          size: 30
        }
      },
      filterType: 'any',
      filterUpdateHook: ['singleFieldSelect', 'field_topic_name', 'any'],
      props: {
        label: 'Select a topic',
        field: 'field_topic_name',
        placeholder: 'Select',
        type: 'RplFormDropdown',
        multiple: true
      }
    }
  ],
  pageConfig: {
    searchPlaceholder: 'Start typing...',
    resultsLayout: 'TideSearchList',
    resultsPerPage: 9,
    hideFilters: false
  },
  resultsConfig: {
    '*': {
      component: 'TideSearchResult'
    }
  }
}

const searchDriverOptions = {
  initialState: {
    resultsPerPage: searchConfig.pageConfig?.resultsPerPage
  },
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    filters: searchConfig.globalFilters,
    search_fields: searchConfig.searchFields
  }
}
</script>

<template>
  <TideSearchPage
    title="Search"
    :filterInputs="searchConfig?.filterInputs"
    :pageConfig="searchConfig?.pageConfig"
    :searchDriverOptions="searchDriverOptions"
  />
</template>
