import { default as VueGtag, useGtag } from 'vue-gtag-next'

/* @ts-ignore imported from nuxt */
import eventListeners from '#build/analytics.eventListeners.js'
/* @ts-ignore imported from nuxt */
import { useRuntimeConfig } from '#app'

/* @ts-ignore */
export default defineNuxtPlugin((nuxtApp) => {
  const gtag = useGtag()
  const config = useRuntimeConfig()
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: config.public?.GA
    }
  })
  /* @ts-ignore */
  if (process.client) {
    nuxtApp.vueApp.use({
      install(app: any) {
        const rplEventBus = app._context?.provides?.$rplEvent
        if (rplEventBus) {
          if (eventListeners) {
            const evtKeys = Object.keys(eventListeners)
            if (evtKeys.length > 0) {
              evtKeys.forEach((key) => {
                rplEventBus.on(key, eventListeners[key](gtag))
              })
            }
          }
        } else {
          console.error(
            'Error: (ripple-analytics) could not instantiate rplEvent Bus for analytics'
          )
        }
      }
    })
  }
})
