import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtlabs/github-module',
    '@nuxtjs/algolia'
  ],
  github: {
    repo: 'dpc-sdp/ripple-framework'
  },
  // https://content.nuxtjs.org
  content: {
    navigation: {
      fields: ['icon']
    },
    documentDriven: {
      layoutFallbacks: ['page']
    },
    highlight: {
      preload: ['vue', 'bash']
    }
  },
  algolia: {
    apiKey: '573b9cb4031d10782d274c20b71168a2',
    applicationId: '8NUUSIN20F',
    docSearch: {
      indexName:
        'netlify_48c69791-3a9e-4b59-9916-2c457bc5ba4b_feature-docs-site_all',
      langAttribute: 'lang'
    }
  }
})
