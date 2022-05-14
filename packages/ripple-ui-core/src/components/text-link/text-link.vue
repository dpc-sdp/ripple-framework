<script lang="ts">
export default { name: 'RplTextLink' }
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import type { RplTheme } from './../../types/ripple'

import { rplEventBus } from '../../index'
rplEventBus.register('rpl-text-link/click')

const props = defineProps({
  theme: {
    type: String as PropType<RplTheme>,
    default: 'primary'
  },
  url: {
    type: String,
    default: '#'
  },
  inactive: {
    type: Boolean,
    default: false
  }
})

const classes = computed(() => ({
  'rpl-text-link': true,
  'rpl-type-body-link': true,
  [`rpl-text-link--${props.theme}`]: props.theme,
  'rpl-text-link--inactive': props.inactive
}))

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-text-link/click', payload)
}
</script>

<template>
  <a :class="classes" :href="url" @click="onClick()">
    <slot></slot>
  </a>
</template>

<style src="./text-link.css" />
