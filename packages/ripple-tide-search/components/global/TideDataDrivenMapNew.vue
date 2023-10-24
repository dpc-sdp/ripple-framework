<script setup lang="ts">
import { getActiveFilterURL, useRoute, ref, toRaw } from '#imports'
import { submitForm } from '@formkit/vue'
import useTideSearch from './../../composables/useTideSearch'
import type {
  TideSearchListingPage,
  TideSearchListingResultLayout,
  TideSearchListingResultItem
} from './../../types'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

interface Props {
  id: string
  title: string
  introText?: string
  searchListingConfig?: TideSearchListingPage['searchListingConfig']
  autocompleteQuery?: boolean
  queryConfig: Record<string, any>
  globalFilters?: any[]
  userFilters?: any[]
  resultsConfig?: {
    layout?: TideSearchListingResultLayout
    item?: Record<string, { component: string }>
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
  resultsConfig: () => ({
    layout: {
      component: 'TideSearchResultsList'
    }
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
  if (props.resultsConfig.item) {
    for (const key in props.resultsConfig.item) {
      const mapping = props.resultsConfig.item[key]
      if (!item._source?.type || item._source?.type[0] === key || key === '*') {
        /* If there is no type, a component will be required */
        return {
          id: item._id,
          component: mapping.component,
          props: {
            result: item._source
          }
        }
      } else {
        /* Add default search result mapping if none provided */
        return {
          id: item._id,
          component: 'TideSearchResult',
          props: {
            result: item._source
          }
        }
      }
    }
  }
  return item
}

const filtersExpanded = ref(false)

const {
  isBusy,
  searchError,
  getSuggestions,
  searchTerm,
  results,
  filterForm,
  appliedFilters,
  submitSearch,
  goToPage,
  page,
  totalResults,
  totalPages,
  pagingStart,
  pagingEnd,
  onAggregationUpdateHook
} = useTideSearch(
  props.queryConfig,
  props.userFilters,
  props.globalFilters,
  searchResultsMappingFn,
  props.searchListingConfig
)

const cachedSubmitEvent = ref({})

const baseEvent = () => ({
  contextId: props.id,
  name: props.title,
  index: page.value,
  label: searchTerm.value,
  value: totalResults.value,
  options: getActiveFilterURL(filterForm.value)
})

// Updates filter options with aggregation value
onAggregationUpdateHook.value = (aggs) => {}

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

const handleToggleFilters = () => {
  filtersExpanded.value = !filtersExpanded.value

  emitRplEvent(
    'toggleFilters',
    {
      ...baseEvent(),
      action: filtersExpanded.value ? 'open' : 'close',
      text: toggleFiltersLabel.value
    },
    { global: true }
  )
}

const numAppliedFilters = computed(() => {
  return Object.values(appliedFilters.value).filter((value) => {
    if (!value) {
      return false
    }

    if (Array.isArray(value) && !value.length) {
      return false
    }

    return true
  }).length
})

const toggleFiltersLabel = computed(() => {
  let label = 'Refine search'

  return numAppliedFilters.value
    ? `${label} (${numAppliedFilters.value})`
    : label
})

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

const handleTabChange = (tab: string) => {
  activeTab.value = tab.id
  // if (activeTab.value === 'map') {
  //   getMapSearchResults()
  // }
}
</script>

<template>
  <div class="rpl-u-margin-t-8">
    <!-- <TideSearchFilters
      v-if="userFilters && userFilters.length > 0"
      :title="title"
      :filter-form-values="filterForm"
      :filterInputs="userFilters"
      @reset="handleFilterReset"
      @submit="handleFilterSubmit"
    /> -->

    <div class="tide-search-header">
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
      <RplSearchBarRefine
        v-if="userFilters && userFilters.length > 0"
        class="tide-search-refine-btn"
        :expanded="filtersExpanded"
        @click="handleToggleFilters"
        >{{ toggleFiltersLabel }}</RplSearchBarRefine
      >
      <RplExpandable
        v-if="userFilters && userFilters.length > 0"
        :expanded="filtersExpanded"
        class="rpl-u-margin-t-4"
      >
        <TideSearchFilters
          :title="title"
          :filter-form-values="filterForm"
          :filterInputs="userFilters"
          @reset="handleFilterReset"
          @submit="handleFilterSubmit"
        >
        </TideSearchFilters>
      </RplExpandable>
    </div>

    <RplTabs :tabs="tabs" :activeTab="activeTab" @toggleTab="handleTabChange" />

    <template v-if="activeTab === 'list'">
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

      <component
        :is="resultsConfig.layout?.component"
        v-if="results && results.length > 0"
        :key="`TideSearchListingResultsLayout${resultsConfig.layout?.component}`"
        v-bind="resultsConfig.layout?.props"
        :results="results"
      />

      <RplPageComponent>
        <TideSearchPagination
          :currentPage="page"
          :totalPages="totalPages"
          @paginate="handlePageChange"
        ></TideSearchPagination>
      </RplPageComponent>
    </template>

    <template v-if="activeTab === 'map'">
      <TideSearchListingResultsMap
        :results="mapResults"
        v-bind="mapConfig.props"
      >
      </TideSearchListingResultsMap>
    </template>
  </div>
</template>

<style>
.tide-search-header {
  display: flex;
  flex-direction: column;
  margin-top: var(--rpl-sp-6);
}

.tide-search-filters.rpl-grid {
  row-gap: var(--rpl-sp-6);
}

.tide-search-filters .rpl-form__outer {
  margin: 0;
}

.tide-search-refine-btn {
  align-self: flex-end;
  padding: 0;
  margin-top: var(--rpl-sp-5);
}

.tide-search-results--loading {
  opacity: 0.5;
  pointer-events: none;
}
</style>
