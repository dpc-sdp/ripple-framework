import { join } from 'pathe'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  hooks: {
    'build:before'(_builder, buildOptions) {
      const plugins = buildOptions.postcss.postcssOptions.plugins
      buildOptions.postcss.postcssOptions.plugins = {
        ...plugins,
        autoprefixer: {},
        'postcss-nested': {}
      }
    },
    'components:dirs'(dirs) {
      // Add ./components dir to the list
      console.log('Added Ripple UI components')
      dirs.push({
        path: join(__dirname, './../src/components'),
        prefix: 'rpl'
      })
    }
  },
  setup(_options, nuxt) {
    nuxt.options.css.push('@dpc-sdp/ripple-ui-core/style/global')
  }
})
