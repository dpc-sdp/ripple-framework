import { join } from 'pathe'
import 'dotenv/config'
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      tide: {
        contentApi: {
          baseUrl: 'https://develop.content.reference.sdp.vic.gov.au',
          site: '8888',
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
  proxy: {
    options: {
      target: 'https://develop.content.reference.sdp.vic.gov.au',
      changeOrigin: true,
      pathRewrite: {
        '^/api/tide/': '/api/v1/'
      },
      pathFilter: ['/api/tide/webform_submission/**']
    }
  },
  image: {
    providers: {
      optidash: {
        provider: join(__dirname, './providers/optidash'),
        options: {}
      }
    },
    provider: 'optidash'
  },
  modules: [
    '@nuxt/image-edge',
    'nuxt-proxy',
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt'
  ]
})
