<script lang="ts">
export default { name: 'RplIconAndText' }
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import {
  RplIconAndTextThemes,
  RplIconAndTextColours,
  RplIconAndTextPositions,
  RplIconAndTextWeights,
  RplIconAndTextSizes,
  RplIconAndTextStyles,
  RplIconAndTextDecorations
} from './constants'
import { RplIconNames } from '../icon/constants'

import RplIcon from '../icon/icon.vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  iconName: {
    type: String as PropType<typeof RplIconNames[number]>,
    required: true
  },
  iconPosition: {
    type: String as PropType<typeof RplIconAndTextPositions[number]>,
    default: RplIconAndTextPositions[0]
  },
  theme: {
    type: String as PropType<typeof RplIconAndTextThemes[number]>,
    default: RplIconAndTextThemes[0]
  },
  textColour: {
    type: String as PropType<typeof RplIconAndTextColours[number]>,
    default: RplIconAndTextColours[0]
  },
  textWeight: {
    type: String as PropType<typeof RplIconAndTextWeights[number]>,
    default: RplIconAndTextWeights[0]
  },
  textSize: {
    type: String as PropType<typeof RplIconAndTextSizes[number]>,
    default: RplIconAndTextSizes[0]
  },
  textDecoration: {
    type: String as PropType<typeof RplIconAndTextDecorations[number]>,
    default: RplIconAndTextDecorations[0]
  },
  textStyle: {
    type: String as PropType<typeof RplIconAndTextStyles[number]>,
    default: RplIconAndTextStyles[0]
  }
})

const containerClasses = computed(() => {
  const classes = [
    'rpl-icon-and-text',
    `rpl-icon-and-text--${props.textColour}`
  ]
  if (props.iconPosition === 'left') {
    classes.push('rpl-icon-and-text--reverse')
  }
  if (props.textSize === 'small') {
    classes.push('rpl-type-p-small')
  } else {
    classes.push('rpl-type-p')
  }

  return classes.join(' ')
})

const labelClasses = computed(() => {
  const classes = ['rpl-icon-and-text__label']
  if (props.textWeight === 'bold') {
    classes.push('rpl-type-weight-bold')
  }
  if (props.textDecoration === 'underline') {
    classes.push('rpl-icon-and-text__label--underline')
  }
  if (props.textStyle === 'underline') {
    classes.push('rpl-icon-and-text__label--underline')
  }

  return classes.join(' ')
})
</script>

<template>
  <div v-if="label && iconName" :class="containerClasses">
    <span :class="labelClasses">
      {{ label }}
    </span>
    <span class="rpl-icon-and-text__icon">
      <RplIcon :name="iconName"></RplIcon>
    </span>
  </div>
</template>

<style src="./icon-and-text.css" />
