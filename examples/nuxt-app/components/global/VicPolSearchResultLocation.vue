<template>
  <div class="tide-vic-pol-cell">
    <div>
      <RplTextLink
        :url="url"
        class="tide-vic-pol-location-title"
        target="_blank"
      >
        {{ title }}
      </RplTextLink>
      <address class="tide-vic-pol-location-address">
        {{ `${getSingleResultValue(item.field_street_address)}` }}<br />
        {{
          `${getSingleResultValue(item.field_suburb)} ${getSingleResultValue(
            item.field_state_name
          )} ${getSingleResultValue(item.field_postcode)}`
        }}
      </address>
      <RplTextLink :url="getSingleResultValue(item.field_google_maps_url)"
        >Get directions</RplTextLink
      >
    </div>

    <div v-if="item.field_accessibility_name?.length">
      <VicPolSearchResultTableHeading
        >Accessibility features</VicPolSearchResultTableHeading
      >
      <RplContent>
        <ul>
          <li
            v-for="(a11yFeature, i) in item.field_accessibility_name"
            :key="i"
          >
            {{ a11yFeature }}
          </li>
        </ul>
      </RplContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchResult, getSingleResultValue } from '#imports'

interface Props {
  item: {
    field_street_address?: string[]
    field_suburb?: string[]
    field_state_name?: string[]
    field_postcode?: string[]
    field_google_maps_url?: string[]
    field_accessibility_name?: string[]
  }
}

const props = defineProps<Props>()

const { title, url } = useSearchResult(props.item)
</script>

<style>
.tide-vic-pol-cell {
  display: flex;
  flex-direction: column;
  gap: var(--rpl-sp-3);
}

.tide-vic-pol-location-title {
  font-weight: bold;
}

.tide-vic-pol-location-address {
  font-style: normal;
}
</style>
