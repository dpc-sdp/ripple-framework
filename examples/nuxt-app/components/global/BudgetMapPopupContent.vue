<template>
  <RplDescriptionList variant="compact">
    <RplDescriptionListItem term="Project location" variant="compact">{{
      locationText
    }}</RplDescriptionListItem>
    <RplDescriptionListItem term="Estimated investment" variant="compact">{{
      feature.investment
    }}</RplDescriptionListItem>
    <RplDescriptionListItem term="Project type" variant="compact">{{
      feature.type
    }}</RplDescriptionListItem>
  </RplDescriptionList>

  <RplContent class="rpl-u-margin-t-4">
    <p class="rpl-type-p-small">{{ feature.description }}</p>
    <p v-if="showDisclaimer" class="rpl-type-p-small">
      * This figure denotes the total provided funding for this initiative
    </p>
  </RplContent>
</template>

<script setup lang="ts">
interface Props {
  feature: any
}
const props = withDefaults(defineProps<Props>(), {})

const locationText = computed(() => {
  return getLocationTextFromResult(props.feature)
})

const showDisclaimer = computed(() => {
  return shouldShowFundingDisclaimer(props.feature)
})
</script>

<style>
.vic-pol-map-popup-content {
  margin: 0;
  font-size: var(--rpl-type-size-1);
  line-height: var(--rpl-type-lh-3);
  letter-spacing: var(--rpl-type-ls-1);
}
</style>
