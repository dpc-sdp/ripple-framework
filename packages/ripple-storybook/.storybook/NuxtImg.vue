<script setup lang="ts">
/*
 * Placeholder for nuxt-img override
 */
interface Props {
  src: string
  alt?: string
  title?: string
  width?: number
  height?: number
  sizes?: string
  srcSet?: string
  circle?: boolean
  focalPoint?: any
  aspect?: string
  fit?: string
  priority?: string
}

const props = defineProps<Props>()
</script>

<template>
  <img data-place="nuxt-img" v-bind="props" />
</template>
