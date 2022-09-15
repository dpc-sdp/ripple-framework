<script lang="ts">
export default { name: 'RplProgressiveImage' }
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  RplImagePriority,
  RplImageFit,
  RplImageFocalPoint,
  RplImageAspect,
} from './constants'
import RplImage from './image.vue'
import useImageLoader from '../../composables/useImageLoader'

interface Props {
  src: string
  preview: string
  alt?: string
  width: number
  height: number
  sizes?: string
  srcSet?: string
  circle?: boolean
  focalPoint?: RplImageFocalPoint
  aspect?: RplImageAspect
  fit?: typeof RplImageFit[number]
  priority?: typeof RplImagePriority[number]
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  sizes: undefined,
  srcSet: undefined,
  circle: false,
  focalPoint: undefined,
  aspect: undefined,
  fit: 'cover',
  priority: 'auto'
})

const image = ref()
const loaded = useImageLoader(props.src, image)

const classes = computed(() => ({
  ['rpl-progressive-image']: true,
  ['rpl-progressive-image--loaded']: loaded.value
}))

const source = computed(() => loaded.value ? props.src : props.preview)
</script>

<template>
  <figure ref="image" :class="classes">
    <RplImage v-bind="$props" :src="source" />
    <RplImage v-bind="$props" :src="preview" class="rpl-progressive-image__preview" />
  </figure>
</template>

<style src="./progressive-image.css" />
