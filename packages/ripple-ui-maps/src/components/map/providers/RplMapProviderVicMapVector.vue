<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue'
import { applyStyle } from 'ol-mapbox-style'
interface Props {
  baseUrl?: string
  theme: 'Colour' | 'Dark_Grey' | 'Hybrid' | 'Greyscale'
}

const props = withDefaults(defineProps<Props>(), {
  baseUrl: `https://vicmap.land.vic.gov.au`,
  theme: 'Colour'
})

const stylesApplied = ref(false)
const layerRef = ref(null)

const format = inject('ol-format')
const mvtFormat = new format.MVT()

const themeName = computed(() => {
  return `Vicmap_Vector_Tile_Basemap_${props.theme}_WM`
})

const tileURL = computed(
  () =>
    `${props.baseUrl}/hosting/rest/services/${themeName.value}/VectorTileServer/tile/{z}/{y}/{x}.pbf`
)

const styleURL = computed(
  () =>
    `${props.baseUrl}/hosting/rest/services/${themeName.value}/VectorTileServer/resources/styles/root.json`
)

watch(
  () => layerRef.value,
  () => {
    // Apply the style to the map when it is ready, but only once
    if (!stylesApplied.value && layerRef.value) {
      stylesApplied.value = true

      applyStyle(layerRef.value.vectorTileLayer, styleURL.value)
    }
  }
)

const handleEvent = (event: any) => {
  console.error('Error loading vector tile layer', event)
}
</script>

<template>
  <ol-vector-tile-layer ref="layerRef" :declutter="true" renderMode="hybrid">
    <ol-source-vector-tile
      :url="tileURL"
      :format="mvtFormat"
      @error="handleEvent"
    >
    </ol-source-vector-tile>
  </ol-vector-tile-layer>
</template>
