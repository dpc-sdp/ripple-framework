import {
  FilterType,
  Filter,
  FacetConfiguration,
  SearchFieldConfiguration,
  AutocompleteQueryConfig
} from '@elastic/search-ui'
import type { TidePageBase } from '@dpc-sdp/ripple-tide-api/types'
export interface MappedSearchResult<T> {
  id: string
  component: string
  props: T
}

export interface FilterConfigItem {
  component: string
  facets: Record<string, FacetConfiguration>
  props?: {
    label?: string
    field?: string
    filterType?: FilterType
    placeholder?: string
    type?: string
  }
}

export type FilterFormModel = Record<string, Filter>

export type TideSearchListingResultConfig = {
  /**
   * @description name of Vue component (globally imported) to render result
   */
  component: string
  /**
   * @description optionally pass props to component (useful for configuring an existing component)
   */
  props?: {
    [key: string]: unknown
  }
}

export type TideSearchListingResult = {
  /**
   * @description search result key
   */
  id: string
  /**
   * @description name of Vue component (globally imported) to render result
   */
  component: string
  /**
   * @description optionally pass props to component (useful for configuring an existing component)
   */
  props?: {
    [key: string]: unknown
  }
}

export interface TideSearchListingPage extends TidePageBase {
  summary: string
  searchConfig: {
    /**
     * @description Configuration for search query fields - See https://docs.elastic.co/search-ui/api/core/configuration#search_fields
     */
    searchFields: Record<string, SearchFieldConfiguration>
    /**
     * @description Global filters to scope all results to (applied separately to user defined filters). See https://docs.elastic.co/search-ui/api/core/configuration#filters-global-filters
     */
    globalFilters: Filter[]
    filterConfig: {
      /**
       * @description Whether to hide filters behind toggle button on load
       */
      hideFilters?: boolean
      labels?: {
        /**
         * @description Label for submit button
         */
        submit?: string
        /**
         * @description Label for reset button
         */
        reset?: string
      }
    }
    /**
     * @description Filter config for the user facing filter controls
     */
    filterInputs: FilterConfigItem[]
    /**
     * @description Search listing page level configuration
     */
    pageConfig?: {
      /**
       * @description String for search input placeholder
       */
      searchPlaceholder?: string
      /**
       * @description Label for search query submit button
       */
      searchLabel?: string
      /**
       * @description Toggle grid and list view of results, cards need to be a grid view
       */
      resultsLayout: 'grid' | 'list'
      /**
       * @description Whether to hide filters behind toggle button on load
       */
      hideFilters?: boolean
      /**
       * @description How many results to display per page
       */
      resultsPerPage?: number
    }
    /**
     * @description Result item configuration
     */
    resultsConfig: {
      [key: string]: TideSearchListingResultConfig
    }
  }
}
