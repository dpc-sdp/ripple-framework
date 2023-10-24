<template>
  <TideBaseLayout id="123" :site="site" :page="{}" pageTitle="test page">
    <template #body>
      <div data-component-id="ddm">
        <TideDataDrivenMapNewNew id="ddm" v-bind="data">
        </TideDataDrivenMapNewNew>
      </div>
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import { useTideSite } from '#imports'
const site = await useTideSite()

const data = {
  searchListingConfig: {
    searchProvider: 'elasticsearch',
    // index: 'sdp_data_pipelines_scl',
    index: 'a83890f7a31dea14e1ae83c6f0afacca--sdp_data_pipelines_scl',
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
  resultsConfig: {
    layout: {
      component: 'TideSearchResultsTable',
      props: {
        columns: [
          { label: 'Suburb', objectKey: 'suburb' },
          { label: 'Location', objectKey: 'street' },
          {
            label: 'Last annual test',
            objectKey: 'last_annual_test'
          },
          {
            label: 'Certificate',
            component: 'CSLCertificateLink'
          }
        ]
      }
    }
  },
  mapConfig: {
    dslTransformFn: 'testingfn',
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
