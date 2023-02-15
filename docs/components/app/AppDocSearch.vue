<template>
  <div id="docsearch">
    <button
      type="button"
      class="DocSearch DocSearch-Button"
      aria-label="Search"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { withoutTrailingSlash } from 'ufo'
import type { DocSearchOptions } from '../../types'
// @ts-ignore - These are Nuxt3 aliases
import {
  useRuntimeConfig,
  useRoute,
  useRouter,
  onMounted,
  watch,
  computed
} from '#imports'
import { tr } from 'date-fns/locale'
const route = useRoute()
const router = useRouter()
const props = defineProps({
  options: {
    type: [Object, undefined] as PropType<DocSearchOptions | undefined>,
    required: false,
    default: undefined
  }
})
/**
 * Try to grab options from runtimeConfig.
 *
 * If not found, fallback on props.
 */
const options = computed<DocSearchOptions>(() => {
  if (props.options) {
    return props.options
  }
  const { algolia } = useRuntimeConfig()
  if (algolia && algolia.docSearch) {
    return algolia.docSearch
  }
  return {}
})
/**
 * Check if event is special click to avoid closing the DocSearch too soon.
 */
const isSpecialClick = (event: MouseEvent) =>
  event.button === 1 ||
  event.altKey ||
  event.ctrlKey ||
  event.metaKey ||
  event.shiftKey
/**
 * Gets the relative path from an absolute URL provided by the DocSearch instance.
 */
const getRelativePath = (absoluteUrl: string) => {
  const { pathname, hash } = new URL(absoluteUrl)
  const url = window.location.origin
  const relativeUrl = pathname.replace(url, '/') + hash
  return withoutTrailingSlash(relativeUrl)
}
/**
 * Initialize the DocSearch instance.
 * @param userOptions
 */
const initialize = async (userOptions: DocSearchOptions) => {
  // Import @docsearch at runtime
  const docsearch = await Promise.all([
    // @ts-ignore
    import(/* webpackChunkName: "docsearch" */ '@docsearch/js'),
    // @ts-ignore
    process.client &&
      import(/* webpackChunkName: "docsearch" */ '@docsearch/css')
  ]).then(([docsearch]) => docsearch.default)
  // TODO: Maybe bind this with @nuxt/i18n ?
  // Resolve lang
  const lang = userOptions?.lang || 'en'
  // Generate lang prefix
  const langPrefix = `${userOptions.langAttribute || 'language'}:${lang}`
  // Get facet filters
  const userFacetFilters = userOptions.facetFilters || []
  // Create DocSearch instance
  docsearch({
    /**
     * Local implementation of this DocSearch box uses a local element with an `docsearch` id.
     */
    container: '#docsearch',
    appId: userOptions.applicationId,
    apiKey: userOptions.apiKey,
    indexName: userOptions.indexName,
    searchParameters: {
      ...// Prefix facetFilters with langAttribute, otherwise use raw facetFilters
      (!lang
        ? {
            facetFilters: userFacetFilters
          }
        : {
            facetFilters: [langPrefix].concat(userFacetFilters)
          }),
      ...userOptions.searchParameters
    },
    // transformSearchClient: (client) => {
    //   const transformHierarchy = (hit) => {
    //     const section = hit.url.startsWith('/framework/')
    //       ? 'framework'
    //       : 'design-system'

    //     const sectionName =
    //       section === 'design-system'
    //         ? 'Ripple design system'
    //         : 'Modules Ecosystem'

    //     return {
    //       ...hit,
    //       type: {
    //         lvl0: 'lvl1',
    //         lvl1: 'lvl2',
    //         lvl2: 'lvl3',
    //         lvl3: 'lvl4',
    //         lvl4: 'lvl5',
    //         lvl5: 'lvl6',
    //         lvl6: ''
    //       }[hit.type],
    //       hierarchy: {
    //         lvl0: sectionName,
    //         lvl1: hit.hierarchy.lvl0,
    //         lvl2: hit.hierarchy.lvl1,
    //         lvl3: hit.hierarchy.lvl2,
    //         lvl4: hit.hierarchy.lvl3,
    //         lvl5: hit.hierarchy.lvl4,
    //         lvl6: hit.hierarchy.lvl5
    //       },
    //       _highlightResult: {
    //         ...hit._highlightResult,
    //         hierarchy: {
    //           lvl0: {
    //             value: sectionName,
    //             matchLevel: 'full',
    //             fullyHighlighted: true,
    //             matchedWords: [sectionName]
    //           },
    //           lvl1: hit._highlightResult.hierarchy.lvl0,
    //           lvl2: hit._highlightResult.hierarchy.lvl1,
    //           lvl3: hit._highlightResult.hierarchy.lvl2,
    //           lvl4: hit._highlightResult.hierarchy.lvl3,
    //           lvl5: hit._highlightResult.hierarchy.lvl4,
    //           lvl6: hit._highlightResult.hierarchy.lvl5
    //         }
    //       },
    //       _snippetResult: {
    //         ...hit._snippetResult,
    //         hierarchy: hit._snippetResult.hierarchy
    //           ? {
    //               lvl0: 'Wow',
    //               lvl1: hit._snippetResult.hierarchy.lvl0,
    //               lvl2: hit._snippetResult.hierarchy.lvl1,
    //               lvl3: hit._snippetResult.hierarchy.lvl2,
    //               lvl4: hit._snippetResult.hierarchy.lvl3,
    //               lvl5: hit._snippetResult.hierarchy.lvl4,
    //               lvl6: hit._snippetResult.hierarchy.lvl5
    //             }
    //           : undefined
    //       }
    //     }
    //   }

    //   return {
    //     ...client,
    //     search: async (...args) => {
    //       console.log('askjdnakjsdnkajsnd')
    //       const response = await client.search(...args)
    //       console.log(response)
    //       const transformed = {
    //         ...response,
    //         results: response.results.map((result) => {
    //           return {
    //             ...result,
    //             hits: result.hits.map(transformHierarchy)
    //           }
    //         })
    //       }

    //       console.log('asd', transformed)
    //       return transformed
    //     }
    //   }
    // },
    navigator: userOptions.navigator
      ? userOptions.navigator
      : {
          navigate: ({ itemUrl }) => {
            const { pathname: hitPathname } = new URL(
              window.location.origin + itemUrl
            )
            // Vue Router doesn't handle same-page navigation so we use
            // the native browser location API for anchor navigation.
            if (route.path === hitPathname) {
              window.location.assign(window.location.origin + itemUrl)
            } else {
              router.push(itemUrl)
            }
          }
        },
    hitComponent: userOptions.hitComponent
      ? userOptions.hitComponent
      : ({ hit, children }) => {
          return {
            type: 'a',
            constructor: undefined,
            __v: 1,
            props: {
              href: hit.url,
              children,
              onClick: (event: MouseEvent) => {
                if (isSpecialClick(event)) {
                  return
                }
                // We rely on the native link scrolling when user is
                // already on the right anchor because Vue Router doesn't
                // support duplicated history entries.
                if (route.fullPath === hit.url) {
                  return
                }
                const { pathname: hitPathname } = new URL(
                  window.location.origin + hit.url
                )
                // If the hits goes to another page, we prevent the native link behavior
                // to leverage the Vue Router loading feature.
                if (route.path !== hitPathname) {
                  event.preventDefault()
                }
                router.push(hit.url)
              }
            }
          }
        },
    // Spread user options, except the ones that are already used in the instance.
    ...Object.entries(userOptions)
      // Skip already used keys
      .filter(
        ([key]) =>
          ![
            'applicationId',
            'apiKey',
            'indexName',
            'transformItems',
            'navigator',
            'hitComponent',
            'facetFilters',
            'langAttribute',
            'lang'
          ].includes(key)
      )
      // Recompose options
      .reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
      }, {})
  })
}
// Initialize when mounted.
onMounted(() => initialize(options.value))
// Watch options and restart the instance if needed.
watch(options, (n: any) => initialize(n))
</script>

<style>
.DocSearch {
  font-size: 16px;

  --docsearch-primary-color: var(--rpl-clr-primary);
  --docsearch-text-color: var(--rpl-clr-dark);
  --docsearch-spacing: 12px;
  --docsearch-icon-stroke-width: 1.4;
  --docsearch-highlight-color: var(--rpl-clr-primary);
  --docsearch-muted-color: var(--rpl-clr-neutral-600);
  --docsearch-container-background: var(--rpl-clr-neutral-alpha-700);
  --docsearch-logo-color: #5468ff;
  --docsearch-modal-width: 560px;
  --docsearch-modal-height: 600px;
  --docsearch-modal-background: #f5f6f7;
  --docsearch-modal-shadow: none;
  --docsearch-searchbox-height: 56px;
  --docsearch-searchbox-background: #ebedf0;
  --docsearch-searchbox-focus-background: #fff;
  --docsearch-searchbox-shadow: inset 0 0 0 2px var(--docsearch-primary-color);
  --docsearch-hit-height: 56px;
  --docsearch-hit-color: var(--rpl-clr-dark);
  --docsearch-hit-active-color: #fff;
  --docsearch-hit-background: #fff;
  --docsearch-hit-shadow: 0 1px 3px 0 #d4d9e1;
  --docsearch-key-gradient: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
  --docsearch-key-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
    0 1px 2px 1px rgba(30, 35, 90, 0.4);
  --docsearch-footer-height: 44px;
  --docsearch-footer-background: #fff;
  --docsearch-footer-shadow: none;
}
</style>
