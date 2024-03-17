import { defineNuxtConfig } from 'nuxt/config'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)
const assetCacheTime = 31536000 // 1 year

export default defineNuxtConfig({
  runtimeConfig: {
    basicAuth: 0,
    tide: {
      config: {
        apiPrefix: '/api/v1',
        auth: {
          username: 'dpc',
          password: 'sdp'
        }
      }
    },
    public: {
      siteUrl: '',
      apiUrl: '',
      isProduction: process.env?.LAGOON_ENVIRONMENT_TYPE === 'production',
      tide: {
        baseUrl: 'https://develop.content.reference.sdp.vic.gov.au',
        site: '8888'
      }
    }
  },
  experimental: {
    inlineSSRStyles: (id) => !id?.includes('entry'),
    externalVue: false // See https://github.com/nuxt/nuxt/issues/14820
  },
  // A change in nuxt 3.8.0 means we were getting errors whenever a type was imported without the 'type' keyword
  // This is a temporary workaround until we can fix all the types
  // TODO: Add 'type' keyword to all type imports
  // https://github.com/nuxt/nuxt/releases/tag/v3.8.0
  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false
      }
    }
  },
  // @ts-ignore TS2345 adding to runtimeConfig
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
