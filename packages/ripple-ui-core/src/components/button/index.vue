<script lang="ts">
export default { name: 'RplButton' }
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { rplEventBus } from './../../index'
rplEventBus.register('rpl-button/click')

const props = defineProps({
  theme: {
    type: String as PropType<'primary' | 'secondary' | 'tertiary'>,
    default: 'primary'
  },
  iconName: {
    type: String,
    default: ''
  },
  iconPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'right'
  },
  size: {
    type: String as PropType<'default' | 'large'>,
    default: 'default'
  },
  label: {
    type: String,
    required: false,
    default: 'Submit'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const directionClass = computed(() => {
  return props.iconPosition === 'left' ? 'rpl-button--reverse' : ''
})

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-button/click', payload)
}

// There's probably a more elegant way to do this
const spriteExists =
  typeof document !== 'undefined' &&
  document.querySelectorAll('#__svg__icons__button__').length === 1
</script>

<template>
  <button
    type="button"
    :className="`rpl-button  rpl-button--${theme}  ${directionClass}`"
    :disabled="disabled"
    @click="onClick()"
  >
    <span v-if="label" className="rpl-button__label">
      {{ label }}
    </span>
    <span v-if="iconName" className="rpl-button__icon">
      <svg
        class="rpl-icon"
        :class="`rpl-button-icon--${iconName}`"
        aria-hidden="true"
      >
        <use :xlink:href="`#rpl-button-icon--${iconName}`" />
      </svg>
    </span>
  </button>
  <svg
    v-if="!spriteExists"
    id="__svg__icons__button__"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    style="position: absolute; width: 0px; height: 0px"
  >
    <symbol id="rpl-button-icon--download" viewBox="0 0 28 32">
      <path
        d="M26.25 32H1.75C.78 32 0 31.236 0 30.286V28.57c0-.95.78-1.714 1.75-1.714h24.5c.97 0 1.75.764 1.75 1.714v1.715c0 .95-.78 1.714-1.75 1.714ZM9.333 1.714v9.715H2.938c-1.297 0-1.946 1.535-1.028 2.435l11.098 10.872a1.434 1.434 0 0 0 1.99 0l11.099-10.872c.919-.9.27-2.435-1.028-2.435h-6.402V1.714c0-.95-.78-1.714-1.75-1.714h-5.834c-.97 0-1.75.764-1.75 1.714Z"
      ></path>
    </symbol>
    <symbol id="rpl-button-icon--home" viewBox="0 0 32 32">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.97 32c-1.167 0-1.985-.923-1.985-2.286L18 22h-3.97l-.015 7.714c-.01 1.352-.82 2.286-1.986 2.286H6.073c-1.163 0-1.976-.934-1.985-2.286V19.557l-1.852-.083c-.874 0-1.804-.244-2.118-1.188-.32-.95.044-2.407.688-3.092L14.51.644c.807-.858 2.044-.858 2.854-.002l13.825 14.635c.651.685 1.012 2.06.693 3.009-.319.944-1.113 1.27-1.985 1.27h-1.985v10.158c0 1.363-.816 2.286-1.986 2.286"
      ></path>
    </symbol>
  </svg>
</template>

<style src="./button.css" />
