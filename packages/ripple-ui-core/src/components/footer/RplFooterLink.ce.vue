<template>
  <li>
    <a class="rpl-type-p-small" :href="url">
      <slot></slot>
    </a>
  </li>
</template>

<script setup lang="ts">
interface Props {
  url: string
}

withDefaults(defineProps<Props>(), {
  url: '#'
})
</script>
