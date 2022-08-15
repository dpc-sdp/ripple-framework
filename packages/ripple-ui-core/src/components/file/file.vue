<script lang="ts"> export default { name: 'RplFile' }</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/icon.vue'
import { epochToText, isExternalLink } from '../../lib/helpers'

const props = defineProps({
  name: {
    type: String,
    default: '',
    required: true
  },
  url: {
    type: String,
    default: '',
    required: true
  },
  extension: {
    type: String,
    default: '',
    required: true
  },
  size: {
    type: String,
    default: '',
    required: true
  },
  updated: {
    type: Number,
    default: null
  },
  caption: {
    type: String,
    default: ''
  },
})

const isExternal = computed(() => isExternalLink(props.url))
const updatedAt = computed(() => epochToText(props.updated))
</script>

<template>
  <figure class="rpl-file">
    <a
      tabindex="-1"
      class="rpl-file__link"
     :aria-label="`${name} File type: ${extension}. Size: ${size}. ${isExternal ? 'Opens in new tab.' : ''}`"
     :href="url"
     :download="isExternal ? false : ''"
     :target="isExternal ? '_blank' : false">
      <RplIcon name="icon-document-lined" class="rpl-file__icon" size="l" colour="default"></RplIcon>
      <div class="rpl-file__info">
        <span class="rpl-file__name rpl-type-label rpl-type-weight-bold rpl-u-focusable rpl-u-focusable--inline" tabindex="0">{{ name }}</span>
        <div class="rpl-file__meta rpl-type-p-small">
          <span v-if="extension" class="rpl-file__type">{{ extension }}</span>
          <span v-if="size" class="rpl-file__size">{{ size }}</span>
          <div v-if="updatedAt" class="rpl-file__updated">Updated {{ updatedAt }}</div>
        </div>
      </div>
    </a>
    <figcaption v-if="caption" class="rpl-file__caption rpl-type-p" v-html="caption"></figcaption>
  </figure>
</template>
