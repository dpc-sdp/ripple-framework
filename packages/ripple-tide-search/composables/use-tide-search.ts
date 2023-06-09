import { ref, computed } from 'vue'

export default (
  queryConfig: Record<string, any>,
  searchResultsMappingFn: (item: any) => any,
  globalFilters: any[],
  userFilterConfig: any[],
  customIndex?: string
) => {
  const appConfig = useAppConfig()
  const { public: config } = useRuntimeConfig()
  const route = useRoute()

  const index = customIndex || config.tide.appSearch.engineName

  const processTemplate = (
    obj: Record<string, any>,
    key: string,
    value: string
  ) => {
    const re = new RegExp(key, 'g')
    return JSON.parse(JSON.stringify(obj).replace(re, value))
  }

  const searchTerm = ref('')
  const results = ref()
  const suggestions = ref([])
  const size = ref(10)
  const from = ref(0)
  const filterForm = ref([])

  const getQueryClause = () => {
    if (searchTerm.value) {
      return processTemplate(queryConfig, '{{query}}', searchTerm.value)
    }
    return [{ match_all: {} }]
  }

  const getFilterClause = () => {
    const _filters = [] as any[]
    if (globalFilters && globalFilters.length > 0) {
      _filters.push(...globalFilters)
    }
    if (userFilters.value.length > 0) {
      _filters.push(...userFilters.value)
    }
    return _filters
  }

  const getSortClause = () => {
    return [
      {
        _score: 'desc'
      },
      {
        _doc: 'desc'
      }
    ]
  }

  const getEmptySortClause = () => {
    return ['title.keyword']
  }

  const userFilters = computed(() => {
    let final = [] as any[]
    Object.keys(filterForm.value).map((key: string) => {
      const itm = userFilterConfig.find((itm) => itm.id === key)
      const filterVal =
        filterForm.value[key] && Array.from(filterForm.value[key])
      if (itm.filter && filterVal && filterVal.length > 0) {
        const re = new RegExp('{{value}}', 'g')
        const result = itm.filter.replace(re, JSON.stringify(filterVal))
        final = JSON.parse(result)
      }
    })
    return final
  })

  const getQueryDSL = () => {
    if (
      searchTerm.value.length > 0 ||
      userFilters.value.length > 0 ||
      globalFilters.length > 0
    ) {
      return {
        query: {
          bool: {
            must: getQueryClause(),
            filter: getFilterClause()
          }
        },
        size: size.value,
        from: from.value,
        sort: getSortClause()
      }
    } else {
      return {
        query: {
          match_all: {}
        },
        size: size.value,
        from: from.value,
        sort: getEmptySortClause()
      }
    }
  }

  const getSearchResults = async () => {
    const body = getQueryDSL()
    console.log(JSON.stringify(body, null, 2))
    results.value = await $fetch(
      `/api/tide/search/${index}/elasticsearch/_search`,
      {
        method: 'POST',
        body
      }
    ).then((res) => {
      return res.hits && res.hits?.hits.map(searchResultsMappingFn)
    })
  }

  const getSuggestions = async () => {
    suggestions.value = await $fetch(
      `/api/tide/search/${index}/query_suggestion`,
      {
        method: 'POST',
        body: {
          query: searchTerm.value,
          types: {
            documents: {
              fields: ['title']
            }
          },
          size: 4
        }
      }
    ).then((res) => {
      return res.results?.documents.map(
        (doc: { suggestion: string }) => doc.suggestion
      )
    })
  }

  onMounted(() => {
    getSearchResults()
  })

  return {
    getSearchResults,
    getSuggestions,
    searchTerm,
    results,
    suggestions,
    filterForm
  }
}
