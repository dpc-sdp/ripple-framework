<template>
  <ol-feature>
    <ol-geom-point :coordinates="coordinate"></ol-geom-point>
    <ol-style>
      <ol-style-icon src="map-icon16.svg" :scale="1.8"> </ol-style-icon>
      <!-- <ol-style-circle :radius="radius">
        <ol-style-fill :color="fillColor"></ol-style-fill>
        <ol-style-stroke
          :color="strokeColor"
          :width="strokeWidth"
        ></ol-style-stroke>
      </ol-style-circle> -->
    </ol-style>
  </ol-feature>
</template>

<script setup lang="ts">
interface Props {
  coordinate: [number, number]
  radius: number
  fillColor?: string
  strokeColor?: string
  strokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  fillColor: 'blue',
  strokeColor: 'white',
  strokeWidth: 1,
  radius: 8
})
</script>
