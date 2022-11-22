import 'dotenv/config'
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      // Placeholder - Set via NUXT_PUBLIC_API_URL env var
      API_URL: '',
      // Placeholder - Set via NUXT_PUBLIC_GA env var
      GA: 'G-12345678',
      tide: {
        contentApi: {
          // Placeholder - Set via NUXT_PUBLIC_TIDE_CONTENT_API_BASE_URL env var
          baseUrl: 'https://develop.content.reference.sdp.vic.gov.au',
          // Placeholder - Set via NUXT_PUBLIC_TIDE_CONTENT_API_SITE env var
          site: '8888'
        }
      },
      ripple: {
        hostname: ''
      }
    }
  },
  tide: {
    mapping: {
      content: {
        event: '@dpc-sdp/ripple-tide-event',
        grant: '@dpc-sdp/ripple-tide-grant',
        landing_page: '@dpc-sdp/ripple-tide-landing-page',
        media: '@dpc-sdp/ripple-tide-media',
        news: '@dpc-sdp/ripple-tide-news',
        publication: '@dpc-sdp/ripple-tide-publication',
        publication_page: '@dpc-sdp/ripple-tide-publication-page'
      },
      site: '@dpc-sdp/ripple-tide-api/mapping/site'
    },
    debug: false
  },
  modules: [
    '@dpc-sdp/ripple-tide-api/nuxt',
    '@dpc-sdp/ripple-tide-grant/nuxt',
    '@dpc-sdp/ripple-tide-landing-page/nuxt',
    '@dpc-sdp/ripple-tide-media/nuxt',
    '@dpc-sdp/ripple-tide-news/nuxt',
    '@dpc-sdp/ripple-tide-publication/nuxt',
    '@dpc-sdp/ripple-tide-publication-page/nuxt',
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt',
    '@dpc-sdp/ripple-analytics/nuxt'
  ]
})
