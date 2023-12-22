<template>
  <div>
    <p class="rpl-type-p rpl-type-weight-bold">{{ item.title[0] }}</p>
    <p class="rpl-type-p">{{ item.field_street_address[0] }}</p>
    <p class="rpl-type-p">
      {{ item.field_suburb[0] }} {{ item.field_state_name[0] }}
      {{ item.field_postcode[0] }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  item: any
}
const props = withDefaults(defineProps<Props>(), {})
</script>
