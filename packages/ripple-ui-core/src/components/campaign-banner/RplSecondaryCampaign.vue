<script setup lang="ts">
import RplCampaignBanner from './RplCampaignBanner.vue'
import RplResponsiveImage from '../image/RplResponsiveImage.vue'
import RplButton from '../button/RplButton.vue'
import { RplLink } from '../../lib/constants'
import type { IRplImageType } from '../image/constants'

interface Props {
  title: string
  image?: IRplImageType
  link?: RplLink
}

withDefaults(defineProps<Props>(), {
  image: undefined,
  link: undefined
})
</script>

<template>
  <RplCampaignBanner class="rpl-campaign-banner--secondary">
    <template v-if="image" #media>
      <RplResponsiveImage
        v-bind="image"
        :aspect="{ xs: 'wide', s: 'ultrawide', l: 'wide' }"
        data-cy="image"
      />
    </template>
    <template #title>
      <h2 class="rpl-campaign-banner__title rpl-type-h2" data-cy="title">
        {{ title }}
      </h2>
    </template>
    <slot></slot>
    <div class="rpl-campaign-banner__action">
      <RplButton v-if="link" el="a" :url="link.url" data-cy="cta">{{
        link.text
      }}</RplButton>
    </div>
  </RplCampaignBanner>
</template>
