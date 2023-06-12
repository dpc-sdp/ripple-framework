<script setup lang="ts">
const page = {
  title: 'Grants',
  query: [
    {
      multi_match: {
        query: '{{query}}',
        fields: [
          'title^3',
          'field_landing_page_summary^2',
          'body',
          'field_paragraph_body',
          'summary_processed'
        ]
      }
    }
  ],
  pageConfig: {
    resultsLayout: 'TideSearchListingLayoutList',
    searchPlaceholder: 'Search grants'
  },
  globalFilters: [
    {
      term: {
        type: 'grant'
      }
    },
    {
      exists: {
        field: 'nid'
      }
    },
    {
      term: {
        field_node_site: '4'
      }
    }
  ],
  userFilters: [
    {
      id: 'topic',
      filter: `[
        {
          "terms": {
            "field_topic_name.keyword": {{value}}
          }
        }
      ]`,
      taxonomy: 'field_topic_name',
      component: 'TideSearchFilterDropdown',
      props: {
        label: 'View those relevant to me',
        placeholder: 'Individuals and organisation types',
        options: ['Business', 'Education']
      }
    },
    {
      id: 'audience',
      filter: `[
        {
          "terms": {
            "field_topic_name.keyword": {{value}}
          }
        }
      ]`,
      taxonomy: '',
      component: 'TideSearchFilterDropdown',
      props: {
        label: 'View those relevant to me',
        placeholder: 'Individuals and organisation types',
        options: ['Business', 'Education']
      }
    },
    {
      id: 'status',
      filterFn: ['grantStatus'],
      component: 'TideSearchFilterDropdown',
      props: {
        label: 'Status',
        placeholder: 'Select grant status',
        options: ['Open', 'Closed', 'Ongoing']
      }
    }
  ]
}
</script>

<template>
  <TideSearchListing
    :title="page.title"
    :queryConfig="page.query"
    :globalFilters="page.globalFilters"
    :pageConfig="page.pageConfig"
    :userFilters="page.userFilters"
  />
</template>
