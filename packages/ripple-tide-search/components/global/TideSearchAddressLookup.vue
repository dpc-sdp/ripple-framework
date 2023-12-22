<template>
  <div class="tide-search-address-lookup">
    <RplSearchBar
      id="tide-address-lookup"
      inputLabel="Search by postcode or suburb"
      :showLabel="true"
      variant="reverse"
      :submitLabel="false"
      :inputValue="searchTerm"
      :suggestions="results"
      :showNoResults="true"
      :debounce="5000"
      placeholder="Search by postcode or suburb"
      :getOptionId="(itm:any) => itm.id"
      :getSuggestionVal="(itm:any) => itm?.locality || ''"
      @submit="submitAction"
      @update:input-value="onUpdate"
    >
      <template #suggestion="{ option: { option } }">
        <span>{{ option?.locality }}</span>
        <RplTag
          v-if="option?.postcode"
          :label="option?.postcode"
          variant="dark"
          class="rpl-u-margin-l-3"
        />
      </template>
    </RplSearchBar>
    <button
      v-if="!waitingForGeolocation"
      class="tide-search-address-lookup__locate rpl-u-margin-t-5"
      @click="onGeoLocateClick"
    >
      <span>USE MY CURRENT LOCATION (PLACEHOLDER)</span>
      <RplIcon name="icon-chevron-down"></RplIcon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'
import { useDebounceFn } from '@vueuse/core'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import { fromLonLat } from 'ol/proj'

interface Props {
  inputValue?: any
}

const props = withDefaults(defineProps<Props>(), {
  inputValue: null
})

const results = ref([])
const searchTerm = ref(props.inputValue)

type addressResultType = {
  name: string
  latitude: number
  longitude: number
}

const emit = defineEmits<{
  (e: 'update', payload: addressResultType): void
}>()

const { rplMapRef } = inject('rplMapInstance')

const pendingZoomAnimation = ref(false)

async function submitAction(e: any) {
  const item = e.value
  // The search bar component sometimes returns a string, sometimes an object, we just ignore the non-empty strings
  if (item && typeof item === 'string') {
    return
  }

  emit('update', item || null)

  // Because this was a user initiated action, we want to animate the zoom
  pendingZoomAnimation.value = true
}

const fetchVicPostcodes = async (query: string) => {
  const searchUrl = `/api/tide/app-search/vic-postcode-localities/search`
  const queryDSL = {
    query,
    search_fields: {
      locality: {},
      postcode: {}
    }
  }

  try {
    const response = await $fetch(searchUrl, {
      method: 'POST',
      body: {
        ...queryDSL
      }
    })
    if (response && response.meta.page.total_results > 0) {
      return response.results.map((itm) => ({
        id: itm.id.raw,
        locality: itm.locality.raw,
        postcode: itm.postcode.raw,
        location: itm.location.raw
      }))
    }
  } catch (e) {
    console.error(e)
  }
}

const onUpdate = useDebounceFn(async (q: string): Promise<void> => {
  if (!q || typeof q !== 'string') {
    results.value = []
    return
  }

  const res = await fetchVicPostcodes(q)

  if (!res || res.length === 0) {
    results.value = []
  } else {
    results.value = res
  }
}, 300)

// Center the map on the location when the map is ready
// It can take a while for the map to be ready, so we need to watch for it
// We don't animate the zoom here, because it's the initial load or a tab change
watch(
  () => rplMapRef.value,
  (newMap, oldMap) => {
    if (!oldMap && newMap) {
      centerMapOnLocation(newMap, props.inputValue.location, false)
    }
  }
)

// Center the map on the location when the location changes
// We look for the value of pendingZoomAnimation to determine if we should animate the zoom
watch(
  () => props.inputValue?.location,
  (newLoc) => {
    centerMapOnLocation(rplMapRef.value, newLoc, pendingZoomAnimation.value)
    pendingZoomAnimation.value = false
  }
)

function centerMapOnLocation(map, location, animate: false) {
  if (map && location) {
    const targetZoom = 13
    const duration = animate ? 800 : 0

    const locationArr = location.split(',')
    const lat = parseFloat(locationArr[0])
    const lng = parseFloat(locationArr[1])
    const center = fromLonLat([lng, lat], 'EPSG:3857')

    map.getView().animate({ center, zoom: targetZoom, duration })
  }
}

async function queryClosestPostcode(location) {
  const searchUrl = `/api/tide/app-search/vic-postcode-localities/search`
  const queryDSL = {
    query: '',
    page: {
      size: 1
    },
    sort: [
      {
        location: {
          center: [location.lat, location.lng],
          order: 'asc'
        }
      }
    ]
  }

  try {
    const response = await $fetch(searchUrl, {
      method: 'POST',
      body: {
        ...queryDSL
      }
    })
    if (response && response.meta.page.total_results > 0) {
      return response.results.map((itm: any) => ({
        id: itm.id.raw,
        locality: itm.locality.raw,
        postcode: itm.postcode.raw,
        location: itm.location.raw
      }))[0]
    }
  } catch (e) {
    console.error(e)
  }
}

function showPosition(position) {
  const lat = parseFloat(position.coords.latitude)
  const lng = parseFloat(position.coords.longitude)
  const location = fromLonLat([lng, lat], 'EPSG:4326')
  console.log(location)
  return location
}

function handleError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log('User denied the request for Geolocation.')
      break
    case error.POSITION_UNAVAILABLE:
      console.log('Location information is unavailable.')
      break
    case error.TIMEOUT:
      console.log('The request to get user location timed out.')
      break
    case error.UNKNOWN_ERROR:
      console.log('An unknown error occurred.')
      break
  }
}
const getCoords = async () => {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })

  return {
    lng: parseFloat(pos.coords.longitude),
    lat: parseFloat(pos.coords.latitude)
  }
}

const waitingForGeolocation = ref(false)

async function onGeoLocateClick() {
  waitingForGeolocation.value = true
  if (navigator.geolocation) {
    const location = await getCoords()
    const result = await queryClosestPostcode(location)
    searchTerm.value = { locality: result.locality }
    submitAction({ value: result })
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
  waitingForGeolocation.value = false
}
</script>

<style>
.tide-search-address-lookup {
  position: relative;
}
.tide-search-address-lookup__locate {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--rpl-sp-2);
  box-sizing: border-box;
  text-decoration: none;
  color: var(--rpl-clr-link);
}
</style>
