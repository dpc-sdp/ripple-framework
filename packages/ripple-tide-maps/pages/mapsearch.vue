<template>
  <TideBaseLayout :site="site">
    <template #aboveBody>
      <RplHeroHeader
        title="Location search"
        :behind-nav="true"
        :breadcrumbs="true"
        :full-width="true"
        :corner-top="true"
        :corner-bottom="false"
      >
        <div class="tide-search-header">
          <RplSearchBar
            id="tide-search-bar"
            variant="default"
            input-label="Search locations"
            :input-value="searchTerm"
            placeholder="Search..."
            @on-submit="doSearch"
            @update:input-value="updateSearchTerm"
          />

          <div class="rpl-u-margin-t-4">
            <TideSearchFilters
              :filter-form-values="filterFormValues"
              :filterInputs="filterInputs"
              @reset="handleFilterReset"
              @submit="handleFilterSubmit"
            >
            </TideSearchFilters>
          </div>
        </div>
      </RplHeroHeader>
    </template>
    <template #body>
      <RplPageComponent>
        <TideMap :features="results"></TideMap>
        <RplDataTable
          v-if="tableRows.length > 0"
          :columns="tableColumns"
          :items="tableRows"
        />
      </RplPageComponent>
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { $fetch } from '#imports'

const results = ref([])

const searchTerm = ref('')

const filterFormValues = ref({})

const suburbFilterVal = computed(
  () => filterFormValues.value?.suburb && filterFormValues.value?.suburb[0]
)

const handleFilterReset = () => {
  console.log('FilterReset')
}
const handleFilterSubmit = () => {
  doSearch(searchTerm.value)
}

const filterInputs = [
  {
    id: 'suburb',
    component: 'TideSearchFilterDropdown',
    props: {
      label: 'Suburb',
      field: 'suburb',
      placeholder: 'Select',
      type: 'RplFormDropdown',
      options: [
        {
          id: 'Templestowe Lower',
          label: 'Templestowe Lower',
          value: 'Templestowe Lower'
        },
        {
          id: 'Yarraville',
          label: 'Yarraville',
          value: 'Yarraville'
        },
        {
          id: 'Altona North',
          label: 'Altona North',
          value: 'Altona North'
        },
        {
          id: 'Footscray',
          label: 'Footscray',
          value: 'Footscray'
        },
        {
          id: 'Wantirna',
          label: 'Wantirna',
          value: 'Wantirna'
        }
      ]
    }
  }
]

const queryDSL = computed(() => {
  if (searchTerm.value.length > 3 || suburbFilterVal.value) {
    const query = {
      bool: {
        filter: []
      }
    }

    if (searchTerm.value.length > 3) {
      query.bool['should'] = {
        match_phrase: {
          title: {
            query: `${searchTerm.value}`,
            boost: 2
          }
        }
      }
      query.bool['must'] = {
        multi_match: {
          query: `${searchTerm.value}`,
          fields: ['suburb', 'postcode', 'street', 'offence_location']
        }
      }
    }

    if (suburbFilterVal.value) {
      query.bool.filter.push({ term: { suburb: suburbFilterVal.value } })
    }
    return {
      query,
      sort: [],
      aggs: {},
      size: 100
    }
  }
  return {
    size: 100
  }
})

const doSearch = async (term) => {
  searchTerm.value = term

  const { hits } = await $fetch(
    'https://a83890f7a31dea14e1ae83c6f0afacca.sdp2-b.elastic.sdp.vic.gov.au/sdp_data_pipelines_scl/_search',
    {
      method: 'POST',
      body: queryDSL.value
    }
  ).catch((error) => error.data)

  const locations = hits.hits.map((hit) => ({
    id: hit._source.camera_id,
    latitude: hit._source.latitude,
    longitude: hit._source.longitude,
    suburb: hit._source.suburb,
    location: hit._source.offence_location
  }))

  results.value = locations
}

const updateSearchTerm = (term) => {
  console.log(term)
}

const tableColumns = ref(['ID', 'Suburb', 'Location'])

const tableRows = computed(() => {
  return results.value.map((result) => {
    return [
      result.id,
      result.suburb,
      result.location,
      ['<p><strong>R2 test heading</strong></p><p>R2 test content</p>']
    ]
  })
})
</script>
