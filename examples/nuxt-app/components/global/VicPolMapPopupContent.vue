<template>
  <div class="vicpol-map-popup-content">
    <RplContent>
      <VicPolLocationFormatter :item="feature"></VicPolLocationFormatter>
    </RplContent>
  </div>
</template>

<script setup lang="ts">
interface Props {
  feature: any
}
const props = withDefaults(defineProps<Props>(), {})

const formatUrl = (str) => str.replace(/\/site-(\d+)/, '')
</script>

<style>
.vicpol-map-popup-content {
  display: flex;
  flex-direction: column;
  padding: var(--rpl-sp-4);
}
</style>
