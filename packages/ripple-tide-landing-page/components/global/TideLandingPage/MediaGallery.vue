<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: string
  title?: string
  items: Array<any>
}>()

const skipText = computed(() =>
  props.title ? `Skip ${props.title} gallery` : null
)
</script>

<template>
  <RplMediaGallery :id="id" :items="items" :skip-text="skipText" />
</template>
