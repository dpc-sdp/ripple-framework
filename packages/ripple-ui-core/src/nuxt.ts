import { join } from 'pathe'
import {
  defineNuxtModule,
  addPluginTemplate,
  addComponentsDir,
  createResolver
} from '@nuxt/kit'
import vitePlugins from './vite.plugins'

export default defineNuxtModule({
  meta: {
    name: 'ripple-ui-core',
    configKey: 'ripple'
  },
  hooks: {
    'vite:extendConfig'(viteInlineConfig) {
      if (Array.isArray(viteInlineConfig.plugins)) {
        viteInlineConfig.plugins?.push(vitePlugins)
      } else {
        viteInlineConfig.plugins = vitePlugins
      }
    }
  },
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)
    // Adds all ripple Vue components to autoimports in Nuxt
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './../src/components'),
      prefix: 'rpl',
      global: true
    })

    // Add Ripple UI plugins
    addPluginTemplate(resolver.resolve('./plugins/nuxt.js'))

    // Adds required PostCss plugins
    nuxt.options.postcss.plugins = {
      ...nuxt.options.postcss.plugins,
      autoprefixer: {},
      'postcss-nested': {},
      'postcss-normalize': {},
      'postcss-preset-env': {
        features: {
          'custom-properties': false
        }
      },
      'postcss-for': {},
      'postcss-each': {}
    }
    // Adds Ripple UI Core global styles
    nuxt.options.css.push('@dpc-sdp/ripple-ui-core/style')
  }
})
