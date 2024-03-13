<template>
  {{ locationText }}
</template>

<script setup lang="ts">
import { getLocationTextFromResult } from '#imports'

interface Props {
  item: any
}
const props = withDefaults(defineProps<Props>(), {})

const locationText = computed(() => {
  return getLocationTextFromResult(props.item)
})
</script>
