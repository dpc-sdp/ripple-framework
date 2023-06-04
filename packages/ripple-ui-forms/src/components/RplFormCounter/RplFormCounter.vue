<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value?: string
  type: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'character',
  value: ''
})

const pluralize = (count: number) => (!count || count > 1 ? 's' : '')

const counterMessage = computed(() => {
  let value = props.value
  let length = value?.length || 0

  if (value && props.type === 'word') {
    length = value.trim().split(/\s+/).length
  }

  return `You have ${length} ${props.type}${pluralize(length)}`
})
</script>

<template>
  <div
    class="rpl-form__counter rpl-type-label-small"
    data-cy="counter"
  >
    {{ counterMessage }}
  </div>
</template>

<style src="./RplFormCounter.css"></style>
