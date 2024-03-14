<template>
  <ol-vector-layer
    v-if="lgaGeoJSON?.length"
    :title="layerIdentifier"
    :zIndex="1"
  >
    <ol-source-vector :zIndex="0" :features="lgaGeoJSON"> </ol-source-vector>
    <ol-style :overrideStyleFunction="defaultStyleFn">
      <ol-style-stroke :color="lineColor" width="2"></ol-style-stroke>
      <ol-style-fill :color="fillColor"></ol-style-fill>
    </ol-style>
  </ol-vector-layer>
</template>

<script setup lang="ts">
import { GeoJSON } from 'ol/format'
import { Style, Fill, Stroke } from 'ol/style'
// IMPORTANT: Need to use useRoute from vue-router here instead of the nuxt one from #imports after nuxt 3.6.5
// The nuxt version of the route stopped being watchable after the update.
// See this issue for details: https://github.com/nuxt/nuxt/issues/14595
import { useRoute, RouteLocation } from 'vue-router'
import { computed, onMounted } from 'vue'
interface Props {
  results: any[]
  lineColor?: string | Number[]
  fillColor?: string | Number[]
  areaDataKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  results: () => [],
  lineColor: () => [102, 102, 102, 1],
  fillColor: () => [255, 255, 255, 0.1],
  areaDataKey: 'field_postcode'
})

const route: RouteLocation = useRoute()

const lgaGeoJSON = ref()

const shapeFormat = new GeoJSON()

const areaUrlOthers = computed(() => {
  const baseArcGISURL =
    'https://services6.arcgis.com/GB33F62SbDxJjwEL/ArcGIS/rest/services/Vicmap_Admin/FeatureServer/9/query'
  const query = `1=1`
  const inSR = '4326'
  return `${baseArcGISURL}?where=${query}&geometryType=esriGeometryEnvelope&inSR=${inSR}&spatialRel=esriSpatialRelIntersects&units=esriSRUnit_Meter&returnGeodetic=false&returnGeometry=true&returnCentroid=false&f=pgeojson&featureEncoding=esriCompressedShapeBuffer&geometryPrecision=4&outFields=lga_code,lga_name&token=`
})

onMounted(async () => {
  if (process.client) {
    await fetch(areaUrlOthers.value)
      .then((response) => response.json())
      .then((data) => {
        lgaGeoJSON.value = shapeFormat.readFeatures(data, {
          featureProjection: 'EPSG:3857'
        })
      })

    await nextTick()

    updateStyles(route.query['location[lga_code]'])
  }
})

const defaultStyleFn = (feature, style) => {
  style.getFill().setColor([255, 255, 255, 0.5])
}

const activeStyleFn = new Style({
  fill: new Fill({
    color: [255, 255, 255, 0]
  }),
  stroke: new Stroke({
    color: props.lineColor,
    width: 4
  })
})

const layerIdentifier = 'shapeLayer'

const updateStyles = (newLGACode: string, oldLGACode: string = '') => {
  if (newLGACode) {
    lgaGeoJSON.value
      .find((f) => {
        return f.get('lga_code') === newLGACode
      })
      .setStyle(activeStyleFn)
  }

  if (oldLGACode) {
    lgaGeoJSON.value
      .find((f) => {
        return f.get('lga_code') === oldLGACode
      })
      .setStyle(null)
  }
}

watch(() => route.query['location[lga_code]'], updateStyles)
</script>
