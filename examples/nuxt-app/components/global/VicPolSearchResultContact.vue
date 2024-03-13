<template>
  <div class="tide-vic-pol-cell">
    <div>
      <VicPolSearchResultTableHeading>General</VicPolSearchResultTableHeading>

      <div>
        Phone:
        <RplTextLink :url="getSingleResultValue(item.field_phone)">
          {{ getSingleResultValue(item.field_phone_title) }}
        </RplTextLink>
      </div>

      <div>Fax: {{ getSingleResultValue(item.field_fax) }}</div>
      <div>
        Email:
        <RplTextLink :url="getSingleResultValue(item.field_email)">
          {{ getSingleResultValue(item.field_email_title) }}
        </RplTextLink>
      </div>

      <div>
        Station code: {{ getSingleResultValue(item.field_station_code) }}
      </div>
    </div>

    <div
      v-if="
        hasProsecutionUnitGeneral ||
        hasCaseConference ||
        hasProsecutionUnitNotice
      "
      class="tide-vic-pol-cell"
    >
      <VicPolSearchResultTableHeading
        >Prosecution unit</VicPolSearchResultTableHeading
      >

      <div v-if="hasProsecutionUnitGeneral">
        <VicPolSearchResultTableHeading
          >General enquiries</VicPolSearchResultTableHeading
        >
        <div>
          Phone:
          <RplTextLink
            :url="getSingleResultValue(item.field_prosecution_unit_phone)"
          >
            {{ getSingleResultValue(item.field_prosecution_unit_phone_title) }}
          </RplTextLink>
        </div>

        <div>
          Fax: {{ getSingleResultValue(item.field_prosecution_unit_fax) }}
        </div>
        <div>
          Email:
          <RplTextLink
            :url="getSingleResultValue(item.field_prosecution_unit_email)"
          >
            {{ getSingleResultValue(item.field_prosecution_unit_email_title) }}
          </RplTextLink>
        </div>
      </div>

      <div v-if="hasCaseConference">
        <VicPolSearchResultTableHeading
          >Case conference enquiries</VicPolSearchResultTableHeading
        >

        <div>
          Phone:
          <RplTextLink
            :url="getSingleResultValue(item.field_case_conference_phone)"
          >
            {{ getSingleResultValue(item.field_case_conference_phone_title) }}
          </RplTextLink>
        </div>

        <div>
          Email:
          <RplTextLink
            :url="getSingleResultValue(item.field_case_conference_email)"
          >
            {{ getSingleResultValue(item.field_case_conference_email_title) }}
          </RplTextLink>
        </div>
      </div>

      <div v-if="hasProsecutionUnitNotice">
        <VicPolSearchResultTableHeading
          >Prosecution Unit notice:</VicPolSearchResultTableHeading
        >

        <ul>
          <li
            v-for="(notice, i) in item.field_prosecution_unit_notice"
            :key="i"
          >
            {{ notice }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSingleResultValue } from '#imports'

interface Props {
  item: {
    field_phone?: string[]
    field_phone_title?: string[]
    field_fax?: string[]
    field_email?: string[]
    field_email_title?: string[]
    field_station_code?: string[]
    field_prosecution_unit_phone?: string[]
    field_prosecution_unit_phone_title?: string[]
    field_prosecution_unit_fax?: string[]
    field_prosecution_unit_email?: string[]
    field_prosecution_unit_email_title?: string[]
    field_case_conference_phone?: string[]
    field_case_conference_phone_title?: string[]
    field_case_conference_email?: string[]
    field_case_conference_email_title?: string[]
    field_prosecution_unit_notice?: string[]
  }
}

const props = defineProps<Props>()

const hasProsecutionUnitGeneral = computed(() => {
  return (
    props.item.field_prosecution_unit_email ||
    props.item.field_prosecution_unit_fax ||
    props.item.field_prosecution_unit_phone
  )
})
const hasCaseConference = computed(() => {
  return (
    props.item.field_case_conference_email ||
    props.item.field_case_conference_phone
  )
})

const hasProsecutionUnitNotice = computed(() => {
  return props.item.field_prosecution_unit_notice?.length
})
</script>
