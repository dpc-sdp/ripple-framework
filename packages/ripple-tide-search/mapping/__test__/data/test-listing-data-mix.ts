export default {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/tide_search_listing/d86052a5-2ffd-441b-be5f-dfa998c28839?resourceVersion=id%3A388'
    }
  },
  meta: {},
  drupal_internal__nid: 290,
  drupal_internal__vid: 388,
  langcode: 'en',
  revision_timestamp: '2024-03-17T22:00:56+00:00',
  revision_log: null,
  status: true,
  title: 'TEST: SLM',
  created: '2024-03-17T21:50:54+00:00',
  changed: '2024-03-17T22:00:56+00:00',
  promote: true,
  sticky: false,
  default_langcode: true,
  revision_translation_affected: true,
  moderation_state: 'published',
  metatag: [
    {
      tag: 'meta',
      attributes: {
        name: 'title',
        content: 'TEST: SLM | Single Digital Presence Content Management System'
      }
    },
    {
      tag: 'link',
      attributes: {
        rel: 'canonical',
        href: 'https://develop.content.reference.sdp.vic.gov.au/test-slm'
      }
    },
    { tag: 'meta', attributes: { property: 'og:locale', content: 'en-AU' } }
  ],
  path: { alias: '/site-8888/test-slm', pid: 2000, langcode: 'en' },
  field_above_results_content: null,
  field_below_results_content: null,
  field_custom_sort_configuration: '[{ "title.keyword": "asc" }]',
  field_landing_page_intro_text: null,
  field_landing_page_summary: null,
  field_listing_query_config:
    '{\r\n    "multi_match": {\r\n      "query": "{{query}}",\r\n      "fields": [\r\n        "title",\r\n        "body"\r\n      ]\r\n    }\r\n  }',
  field_listing_results_config: null,
  field_listing_results_per_page: 15,
  field_metatags: null,
  field_search_configuration:
    '{\r\n  "searchListingConfig": {\r\n    "resultsPerPage": 12,\r\n    "formTheme": "default",\r\n    "labels": {\r\n      "submit": "Submit search",\r\n      "placeholder": "Start typing search term..."\r\n    },\r\n    "customSort": [\r\n      { "created": "desc" }\r\n    ]\r\n  },\r\n  "queryConfig": {\r\n    "multi_match": {\r\n      "query": "{{query}}",\r\n      "fields": [\r\n        "field_landing_page_summary^2",\r\n        "field_paragraph_body",\r\n        "summary_processed"\r\n      ]\r\n    }\r\n  },\r\n  "globalFilters": [\r\n    {\r\n      "terms": {\r\n        "status": [\r\n          true\r\n        ]\r\n      }\r\n    }\r\n  ],\r\n  "userFilters": [\r\n    {\r\n      "id": "department",\r\n      "component": "TideSearchFilterDropdown",\r\n      "filter": {\r\n        "type": "terms",\r\n        "value": "field_department_name"\r\n      },\r\n      "aggregations": {\r\n        "field": "department",\r\n        "source": "taxonomy"\r\n      },\r\n      "props": {\r\n        "id": "department",\r\n        "label": "Departments",\r\n        "placeholder": "Select a department",\r\n        "type": "RplFormDropdown",\r\n        "multiple": true\r\n      }\r\n    }\r\n  ],\r\n  "results": {\r\n    "layout": {\r\n      "component": "TideSearchResultsList",\r\n      "props": {\r\n        "customProp": true\r\n      }\r\n    }\r\n  },\r\n  "layoutConfig": {\r\n    "belowFilter": { "component": "TideCustomBelowFilterComponent" }\r\n  }\r\n}\r\n',
  field_search_input_placeholder: 'Search me....',
  field_search_submit_label: 'Submit',
  field_show_content_rating: true,
  node_type: {
    type: 'node_type--node_type',
    id: '717687af-b1eb-49cb-8a2e-2b23a19551b6',
    meta: { drupal_internal__target_id: 'tide_search_listing' }
  },
  field_header_components: [],
  field_layout_component: {
    links: {
      self: {
        href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/listing_layout_comp_taxonomy/4ce52903-da74-4f18-88b9-8e9b396e3bf9?resourceVersion=id%3A159'
      }
    },
    meta: { drupal_internal__target_id: 9020 },
    drupal_internal__tid: 9020,
    drupal_internal__revision_id: 159,
    langcode: 'en',
    revision_created: '2023-09-04T06:17:35+00:00',
    revision_log_message: null,
    status: true,
    name: 'TideSearchResultsList',
    description: null,
    weight: 0,
    changed: '2023-09-04T06:17:35+00:00',
    default_langcode: true,
    revision_translation_affected: true,
    metatag: [
      {
        tag: 'meta',
        attributes: {
          name: 'title',
          content:
            'TideSearchResultsList | Single Digital Presence Content Management System'
        }
      },
      {
        tag: 'link',
        attributes: {
          rel: 'canonical',
          href: 'https://develop.content.reference.sdp.vic.gov.au/listinglayoutcomptaxonomy/tidesearchresultslist'
        }
      },
      { tag: 'meta', attributes: { property: 'og:locale', content: 'en-AU' } }
    ],
    path: {
      alias: '/listinglayoutcomptaxonomy/tidesearchresultslist',
      pid: 827,
      langcode: 'en'
    },
    vid: {
      type: 'taxonomy_vocabulary--taxonomy_vocabulary',
      id: 'd0bee75b-f7f2-4405-9935-030d5e172548',
      meta: { drupal_internal__target_id: 'listing_layout_comp_taxonomy' }
    },
    parent: [
      {
        type: 'taxonomy_term--listing_layout_comp_taxonomy',
        id: 'virtual',
        meta: {
          links: {
            help: {
              href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
              meta: {
                about: "Usage and meaning of the 'virtual' resource identifier."
              }
            }
          }
        }
      }
    ],
    id: '4ce52903-da74-4f18-88b9-8e9b396e3bf9',
    type: 'taxonomy_term--listing_layout_comp_taxonomy'
  },
  field_listing_global_filters: [
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/listing_site/e1251779-062f-4ef7-8bda-ed43781f5b49?resourceVersion=id%3A2325'
        }
      },
      meta: { target_revision_id: 2325, drupal_internal__target_id: 1917 },
      drupal_internal__id: 1917,
      drupal_internal__revision_id: 2325,
      langcode: 'en',
      status: true,
      created: '2024-03-17T21:39:40+00:00',
      parent_id: '290',
      parent_type: 'node',
      parent_field_name: 'field_listing_global_filters',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: true,
      field_listing_site_site: [
        {
          type: 'taxonomy_term--sites',
          id: '11dede11-10c0-111e1-1100-000000000040',
          meta: { drupal_internal__target_id: 8888 }
        }
      ],
      id: 'e1251779-062f-4ef7-8bda-ed43781f5b49',
      type: 'paragraph--listing_site'
    },
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/listing_content_type/48d4721f-d75e-44db-b3ec-361a8869807a?resourceVersion=id%3A2326'
        }
      },
      meta: { target_revision_id: 2326, drupal_internal__target_id: 1918 },
      drupal_internal__id: 1918,
      drupal_internal__revision_id: 2326,
      langcode: 'en',
      status: true,
      created: '2024-03-17T21:39:49+00:00',
      parent_id: '290',
      parent_type: 'node',
      parent_field_name: 'field_listing_global_filters',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: true,
      field_listing_global_contenttype: [
        {
          type: 'node_type--node_type',
          id: '50c73204-2077-4d2f-82b5-a62b3c6a3f50',
          meta: { drupal_internal__target_id: 'news' }
        }
      ],
      id: '48d4721f-d75e-44db-b3ec-361a8869807a',
      type: 'paragraph--listing_content_type'
    },
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/listing_custom_filter/ca8fce1c-5e9a-486d-930d-1272d40b2d71?resourceVersion=id%3A2327'
        }
      },
      meta: { target_revision_id: 2327, drupal_internal__target_id: 1919 },
      drupal_internal__id: 1919,
      drupal_internal__revision_id: 2327,
      langcode: 'en',
      status: true,
      created: '2024-03-17T21:39:58+00:00',
      parent_id: '290',
      parent_type: 'node',
      parent_field_name: 'field_listing_global_filters',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: true,
      field_listing_custom_filter_conf:
        '{ "terms": { "field_topic_name": ["Demo Topic"] } }',
      id: 'ca8fce1c-5e9a-486d-930d-1272d40b2d71',
      type: 'paragraph--listing_custom_filter'
    }
  ],
  field_listing_user_filters: [
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/searchable_fields/2fa3c2d2-b62c-4e5e-b4ce-6f1fbe81eae3?resourceVersion=id%3A2328'
        }
      },
      meta: { target_revision_id: 2328, drupal_internal__target_id: 1920 },
      drupal_internal__id: 1920,
      drupal_internal__revision_id: 2328,
      langcode: 'en',
      status: true,
      created: '2024-03-17T21:40:33+00:00',
      parent_id: '290',
      parent_type: 'node',
      parent_field_name: 'field_listing_user_filters',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: true,
      field_input_label: 'Topic',
      field_placeholder: 'Select a topic',
      field_field: {
        links: {
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/searchable_fields/c63158a6-8c1b-4195-843c-02e7d95d209c?resourceVersion=id%3A168'
          }
        },
        meta: { drupal_internal__target_id: 9029 },
        drupal_internal__tid: 9029,
        drupal_internal__revision_id: 168,
        langcode: 'en',
        revision_created: '2023-09-04T06:17:35+00:00',
        revision_log_message: null,
        status: true,
        name: 'Topic',
        description: null,
        weight: 0,
        changed: '2023-09-04T06:17:35+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Topic | Single Digital Presence Content Management System'
            }
          },
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/searchablefields/topic'
            }
          },
          {
            tag: 'meta',
            attributes: { property: 'og:locale', content: 'en-AU' }
          }
        ],
        path: { alias: '/searchablefields/topic', pid: 836, langcode: 'en' },
        field_elasticsearch_field: 'field_topic_name',
        field_taxonomy_machine_name: 'topic',
        vid: {
          type: 'taxonomy_vocabulary--taxonomy_vocabulary',
          id: 'aaa39ae4-5009-4045-a830-70272b2d2ffa',
          meta: { drupal_internal__target_id: 'searchable_fields' }
        },
        parent: [
          {
            type: 'taxonomy_term--searchable_fields',
            id: 'virtual',
            meta: {
              links: {
                help: {
                  href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
                  meta: {
                    about:
                      "Usage and meaning of the 'virtual' resource identifier."
                  }
                }
              }
            }
          }
        ],
        id: 'c63158a6-8c1b-4195-843c-02e7d95d209c',
        type: 'taxonomy_term--searchable_fields'
      },
      id: '2fa3c2d2-b62c-4e5e-b4ce-6f1fbe81eae3',
      type: 'paragraph--searchable_fields'
    },
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/listing_user_custom_filter/44ad0499-824a-4484-9ff4-ba8314b5a412?resourceVersion=id%3A2329'
        }
      },
      meta: { target_revision_id: 2329, drupal_internal__target_id: 1921 },
      drupal_internal__id: 1921,
      drupal_internal__revision_id: 2329,
      langcode: 'en',
      status: true,
      created: '2024-03-17T21:40:53+00:00',
      parent_id: '290',
      parent_type: 'node',
      parent_field_name: 'field_listing_user_filters',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: true,
      field_user_filter_configuration:
        '{\r\n      "id": "tags",\r\n      "component": "TideSearchFilterCheckbox",\r\n      "filter": {\r\n        "type": "terms",\r\n        "value": "field_tags_name",\r\n        "multiple": false\r\n      },\r\n      "props": {\r\n        "id": "tags",\r\n        "label": "Tags",\r\n        "checkboxLabel": "Only show demo tag",\r\n        "onValue": "Demo Tag"\r\n      }\r\n    }',
      id: '44ad0499-824a-4484-9ff4-ba8314b5a412',
      type: 'paragraph--listing_user_custom_filter'
    }
  ],
  field_node_primary_site: {
    type: 'taxonomy_term--sites',
    id: '11dede11-10c0-111e1-1100-000000000040',
    meta: { drupal_internal__target_id: 8888 }
  },
  field_node_site: [
    {
      type: 'taxonomy_term--sites',
      id: '11dede11-10c0-111e1-1100-000000000040',
      meta: { drupal_internal__target_id: 8888 }
    }
  ],
  field_results_component: {
    links: {
      self: {
        href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/listing_results_comp_taxonomy/998de0a1-c300-4c75-838e-805cba6a18a3?resourceVersion=id%3A161'
      }
    },
    meta: { drupal_internal__target_id: 9022 },
    drupal_internal__tid: 9022,
    drupal_internal__revision_id: 161,
    langcode: 'en',
    revision_created: '2023-09-04T06:17:35+00:00',
    revision_log_message: null,
    status: true,
    name: 'TideSearchResult',
    description: null,
    weight: 0,
    changed: '2023-09-04T06:17:35+00:00',
    default_langcode: true,
    revision_translation_affected: true,
    metatag: [
      {
        tag: 'meta',
        attributes: {
          name: 'title',
          content:
            'TideSearchResult | Single Digital Presence Content Management System'
        }
      },
      {
        tag: 'link',
        attributes: {
          rel: 'canonical',
          href: 'https://develop.content.reference.sdp.vic.gov.au/listingresultscomptaxonomy/tidesearchresult'
        }
      },
      { tag: 'meta', attributes: { property: 'og:locale', content: 'en-AU' } }
    ],
    path: {
      alias: '/listingresultscomptaxonomy/tidesearchresult',
      pid: 829,
      langcode: 'en'
    },
    vid: {
      type: 'taxonomy_vocabulary--taxonomy_vocabulary',
      id: 'c1ba4250-7a1a-4660-9ecc-854e09be6723',
      meta: { drupal_internal__target_id: 'listing_results_comp_taxonomy' }
    },
    parent: [
      {
        type: 'taxonomy_term--listing_results_comp_taxonomy',
        id: 'virtual',
        meta: {
          links: {
            help: {
              href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
              meta: {
                about: "Usage and meaning of the 'virtual' resource identifier."
              }
            }
          }
        }
      }
    ],
    id: '998de0a1-c300-4c75-838e-805cba6a18a3',
    type: 'taxonomy_term--listing_results_comp_taxonomy'
  },
  field_tags: [],
  id: 'd86052a5-2ffd-441b-be5f-dfa998c28839',
  type: 'node--tide_search_listing',
  _sectionId: '8888'
}
