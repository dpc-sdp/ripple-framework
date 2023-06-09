<template>
  <RplForm
    id="tide-search-filter-form"
    class="rpl-u-margin-t-6"
    @submit="handleFilterSubmit"
  >
    <div class="rpl-grid rpl-grid--no-row-gap tide-search-filters">
      <div
        v-for="filter in filterInputs"
        :key="filter.id"
        class="rpl-col-12 rpl-col-6-m"
      >
        <component
          :is="filter.component"
          :id="filter.id"
          v-bind="filter.props"
        ></component>
      </div>
    </div>
    <RplFormActions
      v-if="submitLabel"
      :label="submitLabel"
      :resetLabel="resetLabel"
      :displayResetButton="resetLabel"
      @reset="handleFilterReset"
    />
  </RplForm>
</template>

<script setup lang="ts">
import type { FilterFormModel as FilterFormModelType } from './../types'

type CollectionFilter = {
  id: string
  component: string
  props: Record<string, any>
}

interface Props {
  filterInputs: CollectionFilter[]
  submitLabel?: string | boolean
  resetLabel?: string | boolean
}

const emit = defineEmits<{
  (e: 'submit', payload: FilterFormModelType[]): void
  (e: 'reset'): void
}>()

withDefaults(defineProps<Props>(), {
  submitLabel: 'Apply search filters',
  resetLabel: 'Clear search filters'
})

function handleFilterReset() {
  emit('reset')
}

function handleFilterSubmit(formVal) {
  emit('submit', formVal)
}
</script>
