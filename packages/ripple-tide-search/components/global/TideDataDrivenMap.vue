<script setup lang="ts">
import { getActiveFilterURL, ref } from '#imports'
import { submitForm } from '@formkit/vue'
import useTideSearch from './../../composables/useTideSearch'
import type {
  TideSearchListingPage,
  TideSearchListingResultItem
} from './../../types'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { get } from 'lodash'

interface Props {
  id: string
  title: string
  introText?: string
  searchListingConfig?: TideSearchListingPage['searchListingConfig']
  autocompleteQuery?: boolean
  queryConfig: Record<string, any>
  globalFilters?: any[]
  userFilters?: any[]
  tableConfig: {
    props: {
      columns: any[]
    }
  }
  mapConfig: {
    props?: {}
  }
  index: string
}

const props = withDefaults(defineProps<Props>(), {
  id: 'tide-search-listing',
  title: 'Search',
  introText: '',
  autocompleteQuery: false,
  globalFilters: () => [],
  userFilters: () => [],
  queryConfig: () => ({
    multi_match: {
      query: '{{query}}',
      fields: [
        'title^3',
        'field_landing_page_summary^2',
        'body',
        'field_paragraph_body',
        'summary_processed'
      ]
    }
  }),
  searchListingConfig: () => ({
    searchProvider: 'app-search',
    resultsPerPage: 9,
    labels: {
      submit: 'Submit',
      reset: 'Reset',
      placeholder: 'Enter a search term'
    }
  }),
  tableConfig: () => ({
    props: {
      columns: []
    }
  }),
  mapConfig: () => ({
    props: {}
  })
})

const emit = defineEmits<{
  (e: 'submit', payload: rplEventPayload & { action: 'search' }): void
  (e: 'results', payload: rplEventPayload & { action: 'view' }): void
  (
    e: 'paginate',
    payload: rplEventPayload & { action: 'prev' | 'next' | 'page' }
  ): void
  (
    e: 'toggleFilters',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
}>()

const { emitRplEvent } = useRippleEvent('tide-search', emit)

const searchResultsMappingFn = (item): TideSearchListingResultItem => {
  return item
}

const {
  isBusy,
  searchError,
  getSuggestions,
  searchTerm,
  results,
  filterForm,
  submitSearch,
  goToPage,
  page,
  totalResults,
  totalPages,
  pagingStart,
  pagingEnd,
  onAggregationUpdateHook,
  searchUrl,
  getQueryDSL
} = useTideSearch(
  props.queryConfig,
  props.userFilters,
  props.globalFilters,
  searchResultsMappingFn,
  props.searchListingConfig
)

const mapResults = ref([])
const mapResultsMappingFn = (result) => {
  if (props.mapConfig) {
    return {
      ...result._source,
      title: get(result, props.mapConfig.props.titleObjPath),
      lat: parseFloat(get(result, props.mapConfig.props.latObjPath)),
      lng: parseFloat(get(result, props.mapConfig.props.lngObjPath)),
      id: result._id
    }
  }
}
const getMapSearchResults = async () => {
  try {
    const queryDSL = getQueryDSL()

    const mapResponse = await $fetch(searchUrl, {
      method: 'POST',
      body: {
        ...queryDSL,
        size: 1000
      }
    })
    console.log({
      ...queryDSL,
      size: 1000
    })
    mapResults.value = mapResponse.hits?.hits.map(mapResultsMappingFn)
    console.log(mapResults.value[0])
  } catch (error) {
    console.error(error)
  }
}

const cachedSubmitEvent = ref({})

const baseEvent = () => ({
  contextId: props.id,
  name: props.title,
  index: page.value,
  label: searchTerm.value,
  value: totalResults.value,
  options: getActiveFilterURL(filterForm.value)
})
const uiFilters = ref(props.userFilters)
// Updates filter options with aggregation value
onAggregationUpdateHook.value = (aggs) => {
  const updateTimestamp = Date.now()

  Object.keys(aggs).forEach((key) => {
    uiFilters.value.forEach((uiFilter, idx) => {
      if (uiFilter.id === key) {
        const getDynamicOptions = () => {
          const mappedOptions = aggs[key].map((item) => ({
            id: item,
            label: item,
            value: item
          }))

          if (uiFilters.value[idx].props.hasOwnProperty('options')) {
            return [
              ...toRaw(uiFilters.value[idx].props.options),
              ...mappedOptions
            ]
          }

          return mappedOptions
        }

        uiFilters.value[idx] = {
          ...uiFilters.value[idx],
          props: {
            ...uiFilters.value[idx].props,
            timestamp: updateTimestamp,
            dynamicOptions: getDynamicOptions()
          }
        }
      }
    })
  })
}

const emitSearchEvent = (event) => {
  emitRplEvent(
    'submit',
    {
      ...event,
      ...baseEvent(),
      action: 'search'
    },
    { global: true }
  )
}

const handleSearchSubmit = (event) => {
  if (props.userFilters && props.userFilters.length) {
    cachedSubmitEvent.value = event
    // Submitting the search term should also 'apply' the filters, but the filters live in a seperate form.
    // To solve this, when the search term form is submitted, we trigger a submission of the filters form,
    // it is there where the actual search request will be triggered.
    // This will only work if there is an actual filter form to submit.
    submitForm('tide-search-filter-form')
  } else {
    // If there's no filters in the form, we need to just do the search without submitting the filter form
    submitSearch()
    emitSearchEvent({ ...event, ...baseEvent() })
  }
}

const handleFilterSubmit = (event) => {
  filterForm.value = event.value
  submitSearch()
  getMapSearchResults()
  emitSearchEvent({ ...event, ...cachedSubmitEvent.value, ...baseEvent() })

  cachedSubmitEvent.value = {}
}

const handleFilterReset = () => {
  searchTerm.value = ''
  filterForm.value = {}
  submitSearch()
}

const handleUpdateSearchTerm = (term) => {
  searchTerm.value = term
  if (props.autocompleteQuery) {
    getSuggestions()
  }
}

const handlePageChange = (event) => {
  goToPage(event.value)
  emitRplEvent(
    'paginate',
    {
      ...event,
      ...baseEvent(),
      index: event.value
    },
    { global: true }
  )
}

const tabs = [
  {
    title: 'Map',
    key: 'map',
    icon: 'pin'
  },
  {
    title: 'List',
    key: 'list',
    icon: 'list'
  }
]
const activeTab = ref('map')

onMounted(() => {
  getMapSearchResults()
})

function switchTab(tab: string) {
  activeTab.value = tab.id
  if (activeTab.value === 'map') {
    getMapSearchResults()
  }
}
</script>

<template>
  <div class="rpl-u-margin-t-8">
    <RplSearchBar
      id="custom-collection-search-bar"
      variant="default"
      :input-label="searchListingConfig.labels?.submit"
      :inputValue="searchTerm"
      :placeholder="searchListingConfig.labels?.placeholder"
      :global-events="false"
      @submit="handleSearchSubmit"
      @update:input-value="handleUpdateSearchTerm"
    />
    <TideSearchFilters
      v-if="userFilters && userFilters.length > 0"
      :title="title"
      :filter-form-values="filterForm"
      :filterInputs="userFilters"
      @reset="handleFilterReset"
      @submit="handleFilterSubmit"
    />
    <TideSearchResultsCount
      v-if="results?.length"
      :pagingStart="pagingStart + 1"
      :pagingEnd="pagingEnd + 1"
      :totalResults="totalResults"
    />

    <div class="rpl-u-margin-t-8">
      <TideSearchError v-if="searchError" />
      <TideSearchNoResults v-else-if="!isBusy && !results?.length" />
    </div>

    <template v-if="results && results.length > 0">
      <RplTabs :tabs="tabs" :activeTab="activeTab" @toggleTab="switchTab" />
      <template v-if="activeTab === 'list' && results && results.length > 0">
        <TideSearchResultsTable
          :results="results"
          v-bind="tableConfig.props"
        ></TideSearchResultsTable>
        <TideSearchPagination
          :currentPage="page"
          :totalPages="totalPages"
          @paginate="handlePageChange"
        ></TideSearchPagination>
      </template>
      <template
        v-if="activeTab === 'map' && mapResults && mapResults.length > 0"
      >
        <TideSearchListingResultsMap
          :results="mapResults"
          v-bind="mapConfig.props"
        >
        </TideSearchListingResultsMap>
      </template>
    </template>
  </div>
</template>
