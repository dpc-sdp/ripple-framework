<template>
  <RplImage
    :src="selectedFeature.image[0]"
    :alt="selectedFeature.description[0]"
  ></RplImage>
  <h4 class="rpl-type-h5 rpl-u-margin-t-2 rpl-u-margin-b-2">Description</h4>
  {{ selectedFeature.description[0] }}
</template>

<script setup lang="ts">
interface Props {
  selectedFeature: any
}

const props = defineProps<Props>()
</script>
