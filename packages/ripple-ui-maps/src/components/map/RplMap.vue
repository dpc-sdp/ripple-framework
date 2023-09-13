<script setup lang="ts">
import { useRippleEvent, rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import type { IRplMapFeature } from './../../types'
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { Overlay, Map } from 'ol'
import RplMapProviderMapbox from './RplMapProviderMapbox.vue'
import RplMapProviderArcVector from './RplMapProviderArcVector.vue'
import RplMapProviderVicMap from './RplMapProviderVicMap.vue'
import RplMapProviderGoogle from './RplMapProviderGoogle.vue'
import RplMapFeaturePin from './../feature-pin/RplMapFeaturePin.vue'
import RplMapPopUp from './../popup/RplMapPopUp.vue'

interface Props {
  id: string
  features?: IRplMapFeature[]
  projection?: 'EPSG:4326' | 'EPSG:3857'
  baseUrl?: string
  requestParams?: Record<string, any>
  layer?: string
  format?: string
  styles?: string | string[]
  initialZoom?: number
  initialCenter?: [number, number]
  closeOnMapClick: boolean
}

const props = withDefaults(defineProps<Props>(), {
  baseUrl: `https://base.maps.vic.gov.au/service`,
  requestParams: () => ({
    tilematrixset: 'EPSG%3A3857%3A256',
    version: '1.0.0',
    request: 'GetTile'
  }),
  closeOnMapClick: true,
  format: 'image/png',
  layer: 'CARTO_WM_256',
  projection: 'EPSG:4326',
  styles: 'default',
  features: () => [],
  initialZoom: 7,
  initialCenter: () => [144.9631, -37.8136] // melbourne
})

const center = ref(props.initialCenter)
const zoom = ref(props.initialZoom)
const rotation = ref(0)
const view = ref(null)

const emit = defineEmits<{
  (
    e: 'toggleAll',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
}>()

// Example of using event bus
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { emitRplEvent } = useRippleEvent('rpl-map', emit)

// Define a popup overlay.
const mapRef = ref<{ map: Map } | null>(null)

const popupIsOpen = ref(false)

function onPopUpClose() {
  popupIsOpen.value = false
}
const selectedFeature = ref(null)

onMounted(() => {
  const map = mapRef.value?.map
  if (map) {
    map.on('singleclick', function (evt) {
      // IF evt.cordinates match a pin then show
      const feature = map.forEachFeatureAtPixel(
        evt.pixel,
        (feature) => {
          return feature
        },
        { hitTolerance: 5 }
      )
      if (feature) {
        selectedFeature.value = feature
        popupIsOpen.value = true
      } else {
        if (props.closeOnMapClick) {
          selectedFeature.value = feature
          popupIsOpen.value = false
        }
      }
    })
  }
})
</script>

<template>
  <div class="rpl-map">
    <slot
      name="popup"
      :is-open="popupIsOpen"
      :selectedFeature="selectedFeature"
    >
      <RplMapPopUp :is-open="popupIsOpen" @close="onPopUpClose">
        <template v-if="selectedFeature && selectedFeature?.values_" #header>
          {{ selectedFeature.values_?.title }}
        </template>
        <template v-if="selectedFeature && selectedFeature?.values_">
          <p class="rpl-type-p-small">
            {{ selectedFeature.values_?.description }}
          </p>
        </template>
      </RplMapPopUp>
    </slot>
    <ol-map
      ref="mapRef"
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 600px"
      :controls="[]"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :projection="projection"
        :zoom="zoom"
      />
      <slot name="map-provider">
        <rpl-map-provider-google />
      </slot>
      <!-- <rpl-map-provider-vic-map /> -->
      <!-- <rpl-map-provider-map-box /> -->

      <ol-vector-layer v-if="features && features.length > 0">
        <slot name="features">
          <ol-source-vector>
            <ol-feature
              v-for="feature in features"
              :key="feature.id"
              :properties="feature"
            >
              <ol-geom-point
                :coordinates="[feature.lng, feature.lat]"
              ></ol-geom-point>
              <ol-style>
                <slot name="pin">
                  <RplMapFeaturePin />
                </slot>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </slot>
      </ol-vector-layer>
      <ol-zoom-control className="rpl-map__control rpl-map__control-zoom" />
      <ol-fullscreen-control
        className="rpl-map__control rpl-map__control-fullscreen"
      />
    </ol-map>
  </div>
</template>

<style src="./RplMap.css" />
