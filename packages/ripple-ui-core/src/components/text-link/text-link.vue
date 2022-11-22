<script lang="ts">
export default { name: 'RplTextLink' }
</script>

<script setup lang="ts">
import { ref } from 'vue'

import useRippleEvent from './../../composables/useRippleEvent'

const emit = defineEmits(['click'])
const { emitRplEvent } = useRippleEvent('rpl-text-link', emit)

interface Props {
  url: string
}

defineProps<Props>()

const onClick = (payload?: any) => {
  emitRplEvent('rpl-text-link/click', payload)
}

const link = ref(null)
const triggerClick = () => {
  link.value.click()
}

defineExpose({ triggerClick })
</script>

<template>
  <a ref="link" class="rpl-text-link rpl-u-focusable-inline" :href="url" @click="onClick()">
    <slot />
  </a>
</template>



<style src="./text-link.css" />
