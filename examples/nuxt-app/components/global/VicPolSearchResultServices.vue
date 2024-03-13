<template>
  <div v-if="item.field_specialty_services_or_faci_name?.length">
    <VicPolSearchResultTableHeading :duplicated="true"
      >Specialty service</VicPolSearchResultTableHeading
    >
    <RplContent>
      <ul>
        <li
          v-for="(service, i) in item.field_specialty_services_or_faci_name"
          :key="i"
        >
          {{ service }}
        </li>
      </ul>
    </RplContent>
  </div>
</template>

<script setup lang="ts">
interface Props {
  item: {
    field_specialty_services_or_faci_name?: string[]
  }
}

defineProps<Props>()
</script>
