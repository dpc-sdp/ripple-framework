<template>
  <div class="vic-pol-map-popup-content tide-vic-pol-cell">
    <div>
      <address class="tide-vic-pol-location-address">
        {{ `${getSingleResultValue(feature.field_street_address)}` }}<br />
        {{
          `${getSingleResultValue(feature.field_suburb)} ${getSingleResultValue(
            feature.field_state_name
          )} ${getSingleResultValue(feature.field_postcode)}`
        }}
      </address>
      <RplTextLink :url="getSingleResultValue(feature.field_google_maps_url)"
        >Get directions</RplTextLink
      >
    </div>

    <div>
      <VicPolSearchResultTableHeading
        >Contact details</VicPolSearchResultTableHeading
      >

      <div>
        Phone:
        <RplTextLink :url="getSingleResultValue(feature.field_phone)">
          {{ getSingleResultValue(feature.field_phone_title) }}
        </RplTextLink>
      </div>

      <div>Fax: {{ getSingleResultValue(feature.field_fax) }}</div>
      <div>
        Email:
        <RplTextLink :url="getSingleResultValue(feature.field_email)">
          {{ getSingleResultValue(feature.field_email_title) }}
        </RplTextLink>
      </div>
    </div>

    <div>
      <VicPolSearchResultTableHeading
        >Station code</VicPolSearchResultTableHeading
      >
      {{ getSingleResultValue(feature.field_station_code) }}
    </div>

    <div>
      <VicPolSearchResultTableHeading
        >Opening hours</VicPolSearchResultTableHeading
      >
      <p>{{ getSingleResultValue(feature.field_opening_hours) }}</p>
      <p>{{ getSingleResultValue(feature.field_opening_hours_notice) }}</p>
    </div>

    <div v-if="feature.field_specialty_services_or_faci_name?.length">
      <VicPolSearchResultTableHeading
        >Specialty services or facilities</VicPolSearchResultTableHeading
      >

      <RplContent>
        <ul>
          <li
            v-for="(
              service, i
            ) in feature.field_specialty_services_or_faci_name"
            :key="i"
          >
            {{ service }}
          </li>
        </ul>
      </RplContent>
    </div>

    <div v-if="feature.field_accessibility_name?.length">
      <VicPolSearchResultTableHeading
        >Accessibility</VicPolSearchResultTableHeading
      >

      <RplContent>
        <ul>
          <li
            v-for="(a11yFeature, i) in feature.field_accessibility_name"
            :key="i"
          >
            {{ a11yFeature }}
          </li>
        </ul>
      </RplContent>
    </div>

    <div v-if="hasProsecutionUnitGeneral">
      <VicPolSearchResultTableHeading
        >Prosecution unit - General</VicPolSearchResultTableHeading
      >
      <div>
        Phone:
        <RplTextLink
          :url="getSingleResultValue(feature.field_prosecution_unit_phone)"
        >
          {{ getSingleResultValue(feature.field_prosecution_unit_phone_title) }}
        </RplTextLink>
      </div>

      <div>
        Fax: {{ getSingleResultValue(feature.field_prosecution_unit_fax) }}
      </div>
      <div>
        Email:
        <RplTextLink
          :url="getSingleResultValue(feature.field_prosecution_unit_email)"
        >
          {{ getSingleResultValue(feature.field_prosecution_unit_email_title) }}
        </RplTextLink>
      </div>
    </div>

    <div v-if="hasCaseConference">
      <VicPolSearchResultTableHeading
        >Prosecution unit - Case conference</VicPolSearchResultTableHeading
      >

      <div>
        Phone:
        <RplTextLink
          :url="getSingleResultValue(feature.field_case_conference_phone)"
        >
          {{ getSingleResultValue(feature.field_case_conference_phone_title) }}
        </RplTextLink>
      </div>

      <div>
        Email:
        <RplTextLink
          :url="getSingleResultValue(feature.field_case_conference_email)"
        >
          {{ getSingleResultValue(feature.field_case_conference_email_title) }}
        </RplTextLink>
      </div>
    </div>

    <RplTextLink :url="formatUrl(feature.url[0])"
      >View {{ getSingleResultValue(feature.title) }}</RplTextLink
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  feature: any
}
const props = withDefaults(defineProps<Props>(), {})

const formatUrl = (str) => str.replace(/\/site-(\d+)/, '')

const hasProsecutionUnitGeneral = computed(() => {
  return (
    props.feature.field_prosecution_unit_email ||
    props.feature.field_prosecution_unit_fax ||
    props.feature.field_prosecution_unit_phone
  )
})
const hasCaseConference = computed(() => {
  return (
    props.feature.field_case_conference_email ||
    props.feature.field_case_conference_phone
  )
})
</script>

<style>
.vic-pol-map-popup-content {
  margin: 0;
  font-size: var(--rpl-type-size-1);
  line-height: var(--rpl-type-lh-3);
  letter-spacing: var(--rpl-type-ls-1);
}
</style>
