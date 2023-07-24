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
import type { TideGrantHeader } from '../types'
import type { TideImageField } from '@dpc-sdp/ripple-tide-api/types'

defineProps<{
  header: TideGrantHeader
  hasBreadcrumbs: boolean
  cornerTop?: TideImageField
  cornerBottom?: TideImageField
}>()
</script>
