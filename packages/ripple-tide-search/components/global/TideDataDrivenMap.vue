<script setup lang="ts">
import { getActiveFilterURL, ref, provide } from '#imports'
import { submitForm } from '@formkit/vue'
import useTideSearch from './../../composables/useTideSearch'
import type {
  TideSearchListingPage,
  TideSearchListingResultItem
} from './../../types'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import { Fill, Stroke, Style } from 'ol/style'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { getCenter } from 'ol/extent'
import EsriJSON from 'ol/format/EsriJSON'

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
        size: 100
      }
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

const rplMapRef = ref(null)
provide('rplMapInstance', {
  rplMapRef,
  setRplMapRef
})

const removeMapLayers = (map) => {
  map.getLayers().forEach((layer) => {
    // If it's a vector layer with a source, clear the source and dispose of the layer
    if (layer instanceof VectorLayer) {
      const layerType = layer.get('layerType')
      if (layerType === 'lga') {
        map.removeLayer(layer)
        const source = layer.getSource()
        // Clear the source's features
        source.clear()
        // Dispose of the source
        source.dispose()
        // Dispose of the layer
        layer.dispose()
      }
    }
  })
}

function drawVectorLayer(lgaKey) {
  const style = new Style({
    stroke: new Stroke({
      color: [0, 0, 0, 1],
      width: 5.5
    })
  })
  const vectorSource = new VectorSource({
    format: new EsriJSON(),
    url: function (extent, resolution, projection) {
      // ArcGIS Server only wants the numeric portion of the projection ID.
      const srid = projection
        .getCode()
        .split(/:(?=\d+$)/)
        .pop()

      const serviceUrl = `https://services6.arcgis.com/GB33F62SbDxJjwEL/arcgis/rest/services/Vicmap_Admin/FeatureServer`
      const layer = '9'
      const format = 'json'
      const query = encodeURIComponent(`LGA_NAME='${lgaKey}'`)
      const url = `${serviceUrl}/${layer}/query/?where=${query}&f=${format}&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometryType=esriGeometryEnvelope&inSR=${srid}&outFields=*&outSR=${srid}`

      return url
    }
  })

  function isExtentValid(extent) {
    return extent[0] < extent[2] && extent[1] < extent[3]
  }

  vectorSource.on('change', function () {
    if (vectorSource.getState() === 'ready') {
      // Get the extent of the features in the vector source
      const extent = vectorSource.getExtent()
      if (isExtentValid(extent)) {
        // Calculate the center of the extent
        const view = rplMapRef.value.getView()
        const padding = 60
        view.fit(extent, {
          padding: [padding, padding, padding, padding], // Optional padding in pixels
          duration: 1000 // Optional animation duration in milliseconds
        })
      }
    }
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: function () {
      return style
    },
    opacity: 0.7
  })
  vectorLayer.set('layerType', 'lga')

  // remove existing layers
  removeMapLayers(rplMapRef.value)
  // Add the vector layer to the existing map
  rplMapRef.value.addLayer(vectorLayer)
}

async function onAddressSearch(payload: any) {
  if (!payload.council) {
    // for point locations just center on the point
    if (activeTab.value === 'map') {
      centerMap([payload.longitude, payload.latitude])
    }
  } else {
    if (payload.lga_key) {
      if (activeTab.value === 'map') {
        drawVectorLayer(payload.lga_key)
      }
    }

    // center map on shape center
  }
}

function centerMap(center: [number, number]) {
  const map = rplMapRef.value
  if (map) {
    map.getView().setCenter(center)
    map.getView().setZoom(14)
  }
}

function setRplMapRef(mapInstance: any) {
  rplMapRef.value = mapInstance
}
</script>

<template>
  <div class="rpl-u-margin-t-8">
    <TideSearchAddressLookup @update="onAddressSearch" :addresses="false">
    </TideSearchAddressLookup>

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
