<script setup lang="ts">
interface Props {
  id: string
  field: string
  placeholder: string
  label: string
  staticFacetOptions: any
  options?: any[]
}
const props = defineProps<Props>()

function getFilterOptions(field) {
  if (!props.staticFacetOptions) {
    return []
  }
  if (!props.staticFacetOptions[field]) {
    return []
  }

  return props.staticFacetOptions[field].map((item) => ({
    id: item,
    label: item,
    value: item
  }))
}
</script>

<template>
  <FormKit
    :id="id"
    :name="id"
    type="RplFormDropdown"
    :multiple="true"
    :label="label"
    :placeholder="placeholder"
    :options="options || getFilterOptions(field)"
  />
</template>
