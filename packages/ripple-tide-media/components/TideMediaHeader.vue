<script lang="ts">
export default { name: 'TideMediaHeader' }
</script>

<template>
  <RplHeroHeader
    :cornerTop="cornerTop?.src || true"
    :cornerBottom="cornerBottom?.src || true"
    :behind-nav="true"
    :breadcrumbs="hasBreadcrumbs"
    :title="header.title"
  />
</template>

<script setup lang="ts">
import type { TideMediaHeader } from '../../types'
import type { TideImageField } from '@dpc-sdp/ripple-tide-api/types'

defineProps<{
  header: TideMediaHeader
  hasBreadcrumbs: boolean
  cornerTop?: TideImageField
  cornerBottom?: TideImageField
}>()
</script>
