import { SearchDriver, SearchResult, SearchState } from '@elastic/search-ui'
import type { SearchDriverOptions } from '@elastic/search-ui'
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector'
import ElasticsearchAPIConnector from '@elastic/search-ui-elasticsearch-connector'
import { useAppConfig } from '#imports'
import { ref, computed } from 'vue'
import { FilterConfigItem, MappedSearchResult } from 'ripple-tide-search/types'

const getSearchDriver = (
  apiConnectorOptions,
  config: Omit<SearchDriverOptions, 'apiConnector'>
) => {
  const ApiConnector =
    apiConnectorOptions?.type === 'elasticsearch'
      ? ElasticsearchAPIConnector
      : AppSearchAPIConnector

  return new SearchDriver({
    apiConnector: new ApiConnector(apiConnectorOptions),
    ...config
  })
}

export default async (
  apiConnectorOptions,
  config: Omit<SearchDriverOptions, 'apiConnector'>,
  filterConfig: FilterConfigItem[],
  resultsMapFn: (result: SearchResult) => MappedSearchResult<any>
) => {
  const staticSearchDriver = getSearchDriver(apiConnectorOptions, {
    ...config,
    trackUrlState: false,
    searchQuery: {
      ...config.searchQuery,
      facets: filterConfig.reduce((result, filter) => {
        if (filter.facets) {
          return {
            ...result,
            ...filter.facets
          }
        }
        return result
      }, {})
    }
  })
  const searchDriver = getSearchDriver(apiConnectorOptions, config)
  const searchState = ref(searchDriver.getState())
  const appConfig = useAppConfig()
  const filterUpdateHooks = appConfig.ripple?.search?.filterUpdateHooks || {}

  const staticFacetOptions = ref(null)
  staticSearchDriver.setSearchTerm('')
  staticSearchDriver.subscribeToStateChanges((state: SearchState) => {
    staticFacetOptions.value = Object.entries(state.facets).reduce(
      (result, [fieldKey, facet]) => {
        return {
          ...(result || {}),
          [fieldKey]: facet[0].data.map((item) => item.value)
        }
      },
      null
    )
  })

  const filterFormValues = ref(
    searchState.value.filters.reduce((result, curr) => {
      return {
        ...result,
        [curr.field]: curr.values
      }
    }, {})
  )

  searchDriver.subscribeToStateChanges((state: SearchState) => {
    searchState.value = state
  })

  const results = computed(() => {
    if (!searchState.value?.results) {
      return []
    }

    return searchState.value?.results?.map(resultsMapFn)
  })

  const searchTermSuggestions = computed(() => {
    if (!searchState.value?.autocompletedSuggestions) {
      return []
    }

    return (searchState.value.autocompletedSuggestions.documents || []).map(
      (d) => d.suggestion
    )
  })

  function updateSearchTerm(value) {
    // This query will only get the autocomplete suggestions
    const searchTermOptions = {
      refresh: false,
      autocompleteSuggestions: true,
      autocompleteMinimumCharacters: 3,
      debounce: 100
    }
    searchDriver.getActions().setSearchTerm(value, searchTermOptions)
  }

  const goToPage = (page: number) => {
    searchDriver.getActions().setCurrent(page)
    window.scrollTo(0, 0)
  }

  const doSearch = () => {
    searchDriver.getActions().setSearchTerm(searchDriver.getState().searchTerm)
    applyFilters()
  }

  const applyFilters = () => {
    searchDriver.clearFilters()
    filterConfig.forEach((config) => {
      const key = config.id
      const val = filterFormValues.value[config.id]

      if (val && val.length) {
        if (
          config &&
          config.hasOwnProperty('filterUpdateHook') &&
          Array.isArray(config.filterUpdateHook)
        ) {
          const filterUpdateHook = filterUpdateHooks[config.filterUpdateHook[0]]
          if (filterUpdateHook && typeof filterUpdateHook === 'function') {
            const args = config.filterUpdateHook.slice(1)
            filterUpdateHook(key, val, searchDriver, ...args)
          }
        } else {
          // Generic behaviour when no filterUpdateHook provided
          searchDriver.addFilter(key, val, config.filterType)
        }
      }
    })
  }

  return {
    updateSearchTerm,
    doSearch,
    goToPage,
    searchState,
    searchTermSuggestions,
    results,
    staticFacetOptions,
    filterFormValues
  }
}
