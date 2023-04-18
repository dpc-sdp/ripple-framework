import 'dotenv/config'
import { defineNuxtConfig } from 'nuxt/config'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)
const assetCacheTime = 31536000 // 1 year

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      tide: {
        baseUrl: 'https://develop.content.reference.sdp.vic.gov.au',
        site: '8888',
        config: {
          apiPrefix: '/api/v1',
          auth: {
            username: 'dpc',
            password: 'sdp'
          }
        }
      },
      API_URL: ''
    }
  },
  robots: {
    configPath: resolve('./robots.config.ts')
  },
  nitro: {
    routeRules: {
      '/_nuxt/**': {
        headers: {
          'cache-control': `public,max-age=${assetCacheTime},s-maxage=${assetCacheTime}`
        }
      }
    }
  },
  modules: [
    'nuxt-proxy',
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt',
    '@nuxtjs/robots'
  ]
})
