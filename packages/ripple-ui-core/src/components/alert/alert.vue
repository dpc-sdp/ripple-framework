<script setup lang="ts">
import { PropType, ref, computed } from 'vue'
import { RplAlertTypes } from './constants'
import { RplIconNames } from './../icon/constants'
import RplIcon from './../icon/icon.vue'
import RplTextLink from './../text-link/text-link.vue'
import { rplEventBus } from '../../index'
rplEventBus.register('rpl-alert/close')
const emit = defineEmits(['dismiss'])

const props = defineProps({
  type: {
    type: String as PropType<typeof RplAlertTypes[number]>,
    default: 'info'
  },
  iconName: {
    type: String as PropType<typeof RplIconNames[number]>,
    default: 'icon-information-circle-filled'
  },
  message: {
    type: String,
    default: ''
  },
  linkText: {
    type: String,
    default: undefined
  },
  linkUrl: {
    type: String,
    default: undefined
  },
  dismissed: {
    type: Boolean,
    default: false
  },
  alertId: {
    type: String
  }
})

const onClose = (payload?: any) => {
  rplEventBus.emit('rpl-button/click', payload)
  emit('dismiss', props.alertId)
}
const classes = computed(() => {
  return {
    'rpl-alert': true,
    [`rpl-alert--${props.type}`]: props.type,
    'rpl-alert--closed': props.dismissed
  }
})
</script>

<template>
  <div :class="classes">
    <div className="rpl-alert__inner">
      <rpl-icon
        class="rpl-alert__icon-info"
        size="m"
        nopad
        :name="iconName"
      ></rpl-icon>
      <div className="rpl-alert__message-wrap">
        <div className="rpl-alert__message rpl-text-cmp-default-bold">
          {{ message }}
        </div>
        <rpl-text-link
          v-if="linkText && linkUrl"
          class="rpl-alert__link"
          :to="linkUrl"
        >
          <span>{{ linkText }}</span>
          <rpl-icon size="s" nopad name="icon-chevron-right"></rpl-icon>
        </rpl-text-link>
      </div>
      <button className="rpl-alert__btn-close rpl-u-btn-reset" @click="onClose">
        <rpl-icon class="" size="s" name="icon-cancel" nopad></rpl-icon>
      </button>
    </div>
  </div>
</template>

<style src="./alert.css" />
