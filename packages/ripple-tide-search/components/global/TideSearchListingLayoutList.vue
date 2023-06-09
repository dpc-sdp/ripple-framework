<template>
  <RplResultListing class="tide-search-result">
    <RplResultListingItem
      v-for="(result, idx) in results"
      :key="`result-${idx}-${result.id}`"
    >
      <component :is="result.component" v-bind="result.props" />
    </RplResultListingItem>
  </RplResultListing>
</template>

<script setup lang="ts">
import type { TideSearchListingResult } from './../../types'

interface Props {
  results: TideSearchListingResult[]
}

defineProps<Props>()
</script>

<style>
.tide-search-result {
  max-width: var(--rpl-content-max-width);
}
</style>
