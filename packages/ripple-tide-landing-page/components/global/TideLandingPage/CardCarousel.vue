<script setup lang="ts">
import { computed } from 'vue'
import { ITideCardCarouselItem } from '../../../mapping/components/card-carousel/card-carousel-mapping'

const props = defineProps<{
  id: string
  title?: string
  items: ITideCardCarouselItem[]
  hasSidebar: boolean
}>()

const perView = computed(() => {
  if (props.hasSidebar) {
    return { xs: 1, l: 2 }
  }

  return { xs: 1, m: 2, l: 3 }
})

const skipText = computed(() =>
  props.title ? `Skip ${props.title} carousel` : null
)
</script>

<template>
  <RplCardCarousel
    :id="id"
    :items="items"
    :per-view="perView"
    :skip-text="skipText"
  />
</template>
