<template>
  <div class="rpl-page">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { provide } from 'vue'
import { rplEventBus } from '@dpc-sdp/ripple-ui-core'

provide('$rplEvent', rplEventBus)

window.$rplEvent = rplEventBus
window.$rplFeatureFlags = window.$rplFeatureFlags || {}
provide('featureFlags', window.$rplFeatureFlags)
</script>
