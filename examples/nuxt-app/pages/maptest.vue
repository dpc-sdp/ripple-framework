<template>
  <TideBaseLayout :id="123" :site="site" :page="{}" pageTitle="test page">
    <template #body>
      <TideDataDrivenMap v-bind="data"> </TideDataDrivenMap>
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import { useTideSite } from '#imports'
const site = await useTideSite()

const data = {
  searchListingConfig: {
    searchProvider: 'elasticsearch',
    index: 'sdp_data_pipelines_scl',
    resultsPerPage: 20,
    labels: {
      submit: 'Search',
      placeholder: 'Enter suburb, postcode, streetname or offence location'
    }
  },
  queryConfig: {
    multi_match: {
      query: '{{query}}',
      fields: ['suburb^3', 'street^2', 'offence_location']
    }
  },
  globalFilters: [],
  userFilters: [
    {
      id: 'postcode',
      component: 'TideSearchFilterDropdown',
      filter: {
        type: 'terms',
        value: 'postcode'
      },
      aggregations: {
        field: 'postcode',
        source: 'taxonomy'
      },
      props: {
        id: 'postcode',
        label: 'Postcode',
        placeholder: 'Select a postcode',
        multiple: true,
        options: [
          {
            id: '1',
            label: '3551',
            value: '3551'
          },
          {
            id: '2',
            label: '3146',
            value: '3146'
          }
        ]
      }
    }
  ],
  tableConfig: {
    props: {
      columns: [
        {
          label: 'Suburb',
          key: 'suburb',
          isArray: false
        },
        {
          label: 'Location',
          key: 'street',
          isArray: false
        },
        {
          label: 'Last annual test',
          key: 'last_annual_test',
          isArray: false
        }
      ]
    }
  },
  mapConfig: {
    props: {
      popup: {
        title: {
          objKey: 'suburb'
        },
        content: {
          objKey: 'suburb'
        }
      },
      latObjPath: '_source.latitude',
      lngObjPath: '_source.longitude',
      titleObjPath: '_source.suburb'
    }
  }
}
</script>
