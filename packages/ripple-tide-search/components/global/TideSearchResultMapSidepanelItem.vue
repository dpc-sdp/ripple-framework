<script setup lang="ts">
import {
  useSearchResult,
  getLocationTextFromResult,
  getBudgetMapPinColour
} from '#imports'

interface Props {
  result: any
}

const props = defineProps<Props>()

const { updated, summary } = useSearchResult(props.result)

const pinColour = computed(() => {
  return getBudgetMapPinColour(props.result)
})

const locationText = computed(() => {
  return getLocationTextFromResult(props.result)
})
</script>

<template>
  <RplMapSidePanelItem
    class="tide-search-result"
    :title="result.name"
    :content="summary"
    :updated="updated"
  >
    <template #meta>
      <span class="rpl-map-side-panel__item-marker"
        ><RplIcon
          name="icon-pin"
          colour="pinColour"
          class="budget-map-sidepanel-icon"
          :style="{ color: pinColour }"
        />{{ result.theme }}</span
      >
    </template>

    <RplDescriptionList variant="compact">
      <RplDescriptionListItem term="Estimated investment" variant="compact">{{
        result.investment
      }}</RplDescriptionListItem>
    </RplDescriptionList>

    <template #footer>
      {{ locationText }}
    </template>
  </RplMapSidePanelItem>
</template>

<style>
.budget-map-sidepanel-icon {
  color: var(--local-pin-colour);
}
</style>
