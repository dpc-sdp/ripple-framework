<script lang="ts">
export default { name: 'TidePublicationHeader' }
</script>

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
import type { TidePublicationHeader } from '../types'
import type { TideImageField } from '@dpc-sdp/ripple-tide-api/types'

interface Props {
  header: TidePublicationHeader
  hasBreadcrumbs: boolean
  cornerTop?: TideImageField
  cornerBottom?: TideImageField
}

defineProps<Props>()
</script>
