<template>
  <RplTabs :tabs="tabs" :activeTab="activeTab" @toggleTab="switchTab" />
  <TideSearchResultsTable
    v-if="activeTab === 'list'"
    :results="results"
    :columns="columns"
  ></TideSearchResultsTable>
  <TideSearchListingResultsMap
    v-if="activeTab === 'map'"
    :results="results"
    :popup="popup"
    v-bind="map.props"
  >
  </TideSearchListingResultsMap>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TideSearchListingResultItem } from './../../types'

type tableColumnConfig = {
  key: string
  label: string
  component?: string
  props?: any
}

interface Props {
  results: TideSearchListingResultItem[]
  columns: tableColumnConfig[]
  map: {
    props: any
  }
  popup: {
    title: string
    content: {
      component: string
    }
  }
}

const props = defineProps<Props>()

const tabs = [
  {
    title: 'Map',
    key: 'map',
    icon: 'pin'
  },
  {
    title: 'List',
    key: 'list',
    icon: 'list'
  }
]
const activeTab = ref('map')

function switchTab(tab: string) {
  activeTab.value = tab.id
}
</script>
