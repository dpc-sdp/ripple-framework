import {
  defineNuxtModule,
  addPluginTemplate,
  addTemplate,
  createResolver
} from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'ripple-analytics'
  },
  async setup() {
    const resolver = createResolver(import.meta.url)
    // event listeners
    addTemplate({
      filename: 'analytics.eventListeners.js',
      src: resolver.resolve('./../dist/events.js')
    })
    addPluginTemplate(resolver.resolve('./plugin.ts'), { append: true })
  }
})
