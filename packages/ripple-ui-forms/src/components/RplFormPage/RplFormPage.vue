<template>
  <FormKit
    :type="'step' as any"
    :name="name"
    :label="title"
    :nextAttrs="{ inputClass: 'rpl-button rpl-button--outlined rpl-button--default rpl-u-focusable-block rpl-u-margin-t-8' }"
    :previousAttrs="{ inputClass: 'rpl-button rpl-button--outlined rpl-button--default rpl-u-focusable-block rpl-u-margin-t-8' }"
  >
    <FormKitSchema v-if="schema" :schema="schema" :data="data"></FormKitSchema>
  </FormKit>
</template>

<script setup lang="ts">
import { FormKitSchemaCondition, FormKitSchemaNode } from '@formkit/core'

interface Props {
  name: string
  title: string
  schema?: FormKitSchemaCondition | FormKitSchemaNode[] | undefined
  data?: object
}

withDefaults(defineProps<Props>(), {
  schema: undefined,
  data: () => ({})
})
</script>
