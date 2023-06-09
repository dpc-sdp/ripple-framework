<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  id: string
  field: string
  placeholder: string
  label: string
  staticFacetOptions: any
  options?: any[]
}
const props = defineProps<Props>()

const resolvedOptions = computed(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'string') {
      return {
        id: opt,
        label: opt,
        value: opt
      }
    }
    return opt
  })
})
</script>

<template>
  <FormKit
    :id="id"
    :name="id"
    type="RplFormDropdown"
    :multiple="true"
    :label="label"
    :placeholder="placeholder"
    :options="resolvedOptions"
  />
</template>
