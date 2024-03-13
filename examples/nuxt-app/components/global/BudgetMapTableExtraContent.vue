<template>
  <RplContent>
    <p>{{ item.description }}</p>
    <p v-if="showDisclaimer">
      * This figure denotes the total provided funding for this initiative
    </p>
  </RplContent>
</template>

<script setup lang="ts">
import { shouldShowFundingDisclaimer } from '#imports'

interface Props {
  item: any
}
const props = withDefaults(defineProps<Props>(), {})

const showDisclaimer = computed(() => {
  return shouldShowFundingDisclaimer(props.item)
})
</script>
