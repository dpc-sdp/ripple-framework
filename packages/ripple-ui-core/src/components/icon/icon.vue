<script lang="ts">
export default {
  name: 'RplIcon'
}
import customIconImports from './../../assets/icons/custom.js'
</script>

<script setup lang="ts">
import { PropType, ref, computed, defineAsyncComponent } from 'vue'
import { RplIconSizes, RplCoreIconNames } from './constants'
import { RplColorThemes } from './../../lib/constants'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  theme: {
    type: [String, undefined] as PropType<
      typeof RplColorThemes[number] | undefined
    >,
    default: undefined
  },
  size: {
    type: String as PropType<typeof RplIconSizes[number]>,
    default: 's'
  },
  title: {
    type: String,
    default: undefined
  },
  nopad: {
    type: Boolean,
    default: false
  }
})

const inSprite = ref(RplCoreIconNames.find((key) => key === props.name))
const asyncIcon = computed(() => {
  if (!inSprite.value) {
    return defineAsyncComponent(customIconImports[props.name])
  }
  return false
})
const classes = computed(() => {
  return {
    'rpl-icon': true,
    [`rpl-icon--size-${props.size}`]: props.size,
    [`rpl-icon--${props.name}`]: props.name,
    [`rpl-icon--theme-${props.theme}`]: props.theme,
    [`rpl-icon--no-padding`]: props.nopad
  }
})
</script>

<template>
  <span :class="classes">
    <component :is="asyncIcon" v-if="name && !inSprite && asyncIcon" />
    <svg v-else-if="name" :role="title ? undefined : 'presentation'">
      <title v-if="title">{{ title }}</title>
      <use :xlink:href="`#${name}`"></use>
    </svg>
    <slot v-else></slot>
  </span>
</template>

<style>
@import './icon.css';
</style>
