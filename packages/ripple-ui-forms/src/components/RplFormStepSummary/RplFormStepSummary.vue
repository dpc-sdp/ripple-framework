<template>
  <div class="rpl-form-step-summary">
    <div>
      <span class="rpl-form-step-summary__current">
        {{ index1 }}
      </span>
      of {{ total }}
    </div>

    <div class="rpl-form-step-summary__name">
      <!-- @todo Should this be a heading? -->
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  index1: number
  total: number
}

defineProps<Props>()
</script>

<style src="./RplFormStepSummary.css"></style>
