<template>
  <ol-vector-tile-layer>
    <ol-source-vector-tile :url="url" :format="mvtFormat">
    </ol-source-vector-tile>
  </ol-vector-tile-layer>
</template>
<script setup lang="ts">
import { ref, inject } from 'vue'

interface Props {
  initialZoom?: number
  initialCenter?: [number, number]
}

const props = withDefaults(defineProps<Props>(), {
  initialZoom: 8,
  initialCenter: () => [144.9631, -37.8136]
})

const tileset_id = `mapbox.mapbox-streets-v8`
const zoom = ref(props.initialZoom)

const format = inject('ol-format')
const mvtFormat = new format.MVT()

const access_token = `pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g`

const style = `mapbox://styles/mapbox/streets-v12`

const url = `https://api.mapbox.com/v4/${tileset_id}/${zoom.value}/{x}/{y}.vector.pbf?access_token=${access_token}&style=${style}`
</script>
