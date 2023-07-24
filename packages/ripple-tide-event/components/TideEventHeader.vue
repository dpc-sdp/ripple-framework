<template>
  <RplHeroHeader
    :cornerTop="cornerTop?.src || true"
    :cornerBottom="cornerBottom?.src || true"
    :behind-nav="true"
    :breadcrumbs="hasBreadcrumbs"
    :title="header.title"
  >
    {{ header.summary }}
  </RplHeroHeader>
</template>

<script setup lang="ts">
import type { TideEventHeader } from '../types'
import type { TideImageField } from '@dpc-sdp/ripple-tide-api/types'

interface Props {
  header: TideEventHeader
  hasBreadcrumbs: boolean
  cornerTop?: TideImageField
  cornerBottom?: TideImageField
}

defineProps<Props>()
</script>
