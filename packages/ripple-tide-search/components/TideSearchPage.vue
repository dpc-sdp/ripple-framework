<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRuntimeConfig, useFetch, useRoute } from '#imports'
import useTideSearch from './../composables/use-tide-search'
import { MappedSearchResult } from 'ripple-tide-search/types'
import { SearchDriverOptions } from '@elastic/search-ui'
import type { TideSearchListingPage } from './../types'

interface Props {
  title: string
  summary: string
  filterInputs: TideSearchListingPage['filterInputs']
  filterConfig: TideSearchListingPage['filterConfig']
  pageConfig: TideSearchListingPage['pageConfig']
  searchDriverOptions: Omit<SearchDriverOptions, 'apiConnector'>
  searchResultsMappingFn: (item: any) => MappedSearchResult<any>
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Search',
  filterInputs: () => [],
  filterConfig: () => {
    return {
      hideFilters: false,
      labels: {
        submit: 'Submit',
        reset: 'Reset'
      }
    }
  },
  pageConfig: () => ({
    results: 'grid'
  }),
  searchDriverOptions: () => ({
    initialState: { resultsPerPage: 10 },
    alwaysSearchOnInitialLoad: true,
    searchQuery: {
      search_fields: {
        title: {
          weight: 10
        },
        body: {},
        field_paragraph_body: {}
      }
    },
    autocompleteQuery: {
      suggestions: {
        types: {
          documents: { fields: ['title'] }
        },
        size: 8
      }
    }
  }),
  searchResultsMappingFn: (item): MappedSearchResult<any> => {
    return {
      id: item._meta.id,
      component: 'TideSearchResult',
      props: {
        result: item
      }
    }
  }
})

const route = useRoute()
const { public: config } = useRuntimeConfig()
const siteId = config.tide?.site

const { data: site } = useFetch('/api/tide/site', {
  baseURL: config.API_URL || '',
  params: {
    id: siteId
  }
})

const apiConnectorOptions = {
  ...config.tide?.appSearch,
  // The search request is proxied through the API to avoid CORS issues
  endpointBase: '/api/tide/search'
}

const {
  updateSearchTerm,
  doSearch,
  goToPage,
  searchState,
  searchTermSuggestions,
  results,
  staticFacetOptions,
  filterFormValues
} = await useTideSearch(
  apiConnectorOptions,
  props.searchDriverOptions,
  props.filterInputs,
  props.searchResultsMappingFn
)

const filtersExpanded = ref(false)

const prevLink = computed(() => {
  if (searchState.value.current <= 1) {
    return null
  }

  const searchParams = new URLSearchParams({
    ...route.query,
    current: `n_${searchState.value.current - 1}_n`
  })

  return {
    url: `${route.path}?${searchParams.toString()}`,
    description: `${searchState.value.current - 1} of ${
      searchState.value.totalPages
    }`
  }
})

const nextLink = computed(() => {
  if (searchState.value.current === searchState.value.totalPages) {
    return null
  }

  const searchParams = new URLSearchParams({
    ...route.query,
    current: `n_${searchState.value.current + 1}_n`
  })

  return {
    url: `${route.path}?${searchParams.toString()}`,
    description: `${searchState.value.current + 1} of ${
      searchState.value.totalPages
    }`
  }
})

const handlePrevClick = () => {
  goToPage(searchState.value.current - 1)
}

const handleNextClick = () => {
  goToPage(searchState.value.current + 1)
}

const handleFilterSubmit = (formValue) => {
  doSearch(formValue)
}

const handleFilterReset = () => {
  filterFormValues.value = {}
  doSearch([])
}

const toggleFilters = () => {
  filtersExpanded.value = !filtersExpanded.value
}
</script>

<template>
  <TideBaseLayout :site="site">
    <template #aboveBody>
      <RplHeroHeader
        :title="title"
        :behind-nav="true"
        :breadcrumbs="true"
        :full-width="true"
        :corner-top="true"
        :corner-bottom="false"
      >
        <p class="rpl-type-p-large" v-if="summary">{{ summary }}</p>
        <div class="tide-search-header">
          <RplSearchBar
            id="tide-search-bar"
            variant="default"
            :input-label="pageConfig.searchLabel"
            :inputValue="searchState.searchTerm"
            :suggestions="searchTermSuggestions"
            :placeholder="pageConfig.searchPlaceholder"
            @on-submit="doSearch"
            @update:input-value="updateSearchTerm"
          />
          <RplSearchBarRefine
            v-if="pageConfig.hideFilters"
            class="tide-search-refine-btn"
            :expanded="filtersExpanded"
            @click="toggleFilters"
          />

          <RplExpandable v-if="filterConfig.hideFilters">
            <TideSearchFilters
              :staticFacetOptions="staticFacetOptions"
              :filter-form-values="filterFormValues"
              :filterInputs="filterInputs"
              :submitLabel="filterConfig.labels.submit"
              :resetLabel="filterConfig.labels.submit"
              @reset="handleFilterReset"
              @submit="handleFilterSubmit"
            >
            </TideSearchFilters>
          </RplExpandable>
          <div v-else class="rpl-u-margin-t-4">
            <TideSearchFilters
              :staticFacetOptions="staticFacetOptions"
              :filter-form-values="filterFormValues"
              :filterInputs="filterInputs"
              :filters-config="filterConfig.inputs"
              @reset="handleFilterReset"
              @submit="handleFilterSubmit"
            >
            </TideSearchFilters>
          </div>
        </div>
      </RplHeroHeader>
    </template>
    <template #body>
      <RplPageComponent v-if="!searchState.error && searchState.totalResults">
        <p class="rpl-type-label rpl-u-padding-b-6">
          Displaying {{ searchState.pagingStart }}-{{
            searchState.pagingEnd
          }}
          of {{ searchState.totalResults }} results
        </p>
      </RplPageComponent>
      <RplPageComponent>
        <div
          :class="{
            'tide-search-results': true,
            'tide-search-results--loading':
              searchState.isLoading && !searchState.error
          }"
        >
          <div v-if="searchState.error">
            <slot name="error">
              <RplContent>
                <p class="rpl-type-h3">
                  Sorry! Something went wrong. Please try again later.
                </p>
              </RplContent>
            </slot>
          </div>
          <div v-else-if="!searchState.isLoading && !searchState.totalResults">
            <slot
              name="noresults"
              :resultSearchTerm="searchState.resultSearchTerm"
            >
              <RplContent>
                <p class="rpl-type-h3">
                  Sorry! We couldn't find any matches for '{{
                    searchState.resultSearchTerm
                  }}'.
                </p>
                <p>To improve your search results:</p>
                <ul>
                  <li>use different or fewer keywords</li>
                  <li>check spelling.</li>
                </ul>
              </RplContent>
            </slot>
          </div>
          <slot v-else name="results" :results="results">
            <component :is="pageConfig.resultsLayout" :results="results" />
          </slot>
        </div>
      </RplPageComponent>
      <RplPageComponent>
        <slot
          name="pagination"
          :results="results"
          :hasError="searchState.error"
        >
          <!-- TODO: Replace this with numbered pagination -->
          <RplPageLinks v-if="results && results.length && !searchState.error">
            <RplPageLinksItem
              v-if="prevLink"
              :url="prevLink.url"
              label="Previous"
              direction="prev"
              @click.prevent="handlePrevClick"
            >
              {{ prevLink.description }}
            </RplPageLinksItem>
            <RplPageLinksItem
              v-if="nextLink"
              :url="nextLink.url"
              label="Next"
              direction="next"
              @click.prevent="handleNextClick"
            >
              {{ nextLink.description }}
            </RplPageLinksItem></RplPageLinks
          >
        </slot>
      </RplPageComponent>
    </template>
  </TideBaseLayout>
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
