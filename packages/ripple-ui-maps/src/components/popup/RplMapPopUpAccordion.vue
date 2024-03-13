<template>
  <RplMapPopUpAccordionItem
    v-for="(feature, i) in features"
    :key="i"
    :title="getTitle(feature)"
  >
    <slot name="feature" :feature="feature" />
  </RplMapPopUpAccordionItem>
</template>

<script setup lang="ts">
import RplMapPopUpAccordionItem from './RplMapPopUpAccordionItem.vue'

interface Props {
  features: any[]
  getTitle: (feature: any) => string
}

withDefaults(defineProps<Props>(), {
  features: () => [],
  getTitle: (feature: any) => feature.title[0]
})
</script>
<style src="./RplMapPopUp.css" />
