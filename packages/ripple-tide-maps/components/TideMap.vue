<template>
  <ClientOnly>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 600px"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />
      <ol-tile-layer>
        <ol-source-wmts
          :url="url"
          :params="requestParams"
          format="image/png"
          :layer="layer"
          :styles="styles"
        ></ol-source-wmts>
      </ol-tile-layer>

      <ol-vector-layer>
        <ol-source-vector>
          <tide-map-feature
            v-for="feature in features"
            :key="`${feature.id}-feature`"
            :coordinate="[feature.longitude, feature.latitude]"
          ></tide-map-feature>
        </ol-source-vector>
      </ol-vector-layer>
    </ol-map>
    <template #fallback> ...loading </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type TideMapFeature = {
  id: string
  latitude: number | string
  longitude: number | string
}

interface Props {
  projection?: 'EPSG:4326' | 'EPSG:3857'
  baseUrl?: string
  requestParams?: Record<string, any>
  layer?: string
  format?: string
  features: TideMapFeature[]
  styles?: string | string[]
  initialZoom?: number
  initialCenter?: [number, number]
}

const props = withDefaults(defineProps<Props>(), {
  baseUrl: `https://base.maps.vic.gov.au/service`,
  requestParams: () => ({
    tilematrixset: 'EPSG%3A3857%3A256',
    version: '1.0.0',
    request: 'GetTile'
  }),
  format: 'image/png',
  layer: 'CARTO_WM_256',
  projection: 'EPSG:4326',
  styles: 'default',
  features: () => [],
  initialZoom: 8,
  initialCenter: () => [144.9631, -37.8136]
})

const center = ref([144.9631, -37.8136])
const zoom = ref()
const rotation = ref(0)

onMounted(() => {
  center.value = props.initialCenter
  zoom.value = props.initialZoom
})

const token = `AAPKb4288179ee4c40c99fedf129bcf74633RxWXGuVkAefFF0Iz0GGNu8wjowjpR3YNV9kzJ5W8AIC3pO4xhbIjLWomfgdFebeS`

const url = ref(`${props.baseUrl}?tilematrixset=EPSG%3A3857%3A256`)
</script>
