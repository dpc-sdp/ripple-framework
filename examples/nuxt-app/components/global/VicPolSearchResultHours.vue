<template>
  <div class="tide-vic-pol-cell">
    <div v-if="item.field_opening_hours?.length">
      <VicPolSearchResultTableHeading :duplicated="true"
        >Opening hours</VicPolSearchResultTableHeading
      >
      <p>{{ getSingleResultValue(item.field_opening_hours) }}</p>
    </div>
    <div v-if="item.field_opening_hours_notice?.length">
      <VicPolSearchResultTableHeading>Notice</VicPolSearchResultTableHeading>
      <p>{{ getSingleResultValue(item.field_opening_hours_notice) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSingleResultValue } from '#imports'

interface Props {
  item: {
    field_opening_hours?: string[]
    field_opening_hours_notice?: string[]
  }
}

defineProps<Props>()
</script>
