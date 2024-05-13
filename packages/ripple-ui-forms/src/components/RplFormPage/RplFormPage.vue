<template>
  <FormKit type="step"
           :name="name"
           :label="title"
  >
    <FormKitSchema
      v-if="schema"
      :schema="schema"
      :data="data"
    ></FormKitSchema>
  </FormKit>
</template>

<script setup lang="ts">
import {FormKitSchemaCondition, FormKitSchemaNode} from "@formkit/core";

interface Props {
  name: string,
  title: string,
  schema?: FormKitSchemaCondition | FormKitSchemaNode[] | undefined,
  data?: object
}

const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
})
</script>
