<template>
  <h4
    :class="{
      'tide-vic-pol-table-heading': true,
      'tide-vic-pol-table-heading--dupe': duplicated
    }"
    :aria-hidden="duplicated"
  >
    <slot></slot>
  </h4>
</template>

<script setup lang="ts">
interface Props {
  duplicated?: boolean
}

withDefaults(defineProps<Props>(), {
  duplicated: false
})
</script>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-vic-pol-table-heading {
  font-weight: bold;
}

.tide-vic-pol-table-heading--dupe {
  display: none;

  @media (--rpl-bp-s) {
    display: block;
  }
}
</style>
