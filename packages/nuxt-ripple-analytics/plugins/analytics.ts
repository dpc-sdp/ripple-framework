import { defineNuxtPlugin, useAppConfig, useRuntimeConfig } from '#app'
import { DataLayerObject, loadScript } from '@gtm-support/core'
import { trackEvent } from '../lib/tracker'
import routeChange from '../lib/routeChange'
import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'

declare global {
  interface Window {
    dataLayer?: DataLayerObject[]
  }
}

interface IPackages {
  [key: string]: string
}

const setupDataLayer = (featureFlags: IRplFeatureFlags) => {
  const production = useRuntimeConfig()?.public?.isProduction
  const packages: IPackages = useAppConfig()?.ripple?.packages

  /*eslint-disable no-prototype-builtins */
  if (typeof window !== undefined) {
    if (!window.hasOwnProperty('dataLayer')) {
      window.dataLayer = []
    }

    window.dataLayer?.push({
      production,
      google_analytics: {
        prod_measurement_id: featureFlags?.prodMeasurementID,
        uat_measurement_id: featureFlags?.uatMeasurementID
      },
      release:
        packages &&
        packages.hasOwnProperty('nuxt-ripple') &&
        packages['nuxt-ripple'] !== 'workspace:*'
          ? packages['nuxt-ripple']
          : '2.x'
    })
  }
}

const setupGTM = (GTM_ID: string) => {
  if (GTM_ID) {
    // Add tracking code to page with loadScript
    loadScript(GTM_ID, { defer: true, compatibility: false })
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()?.ripple
  const runtimeConfig = useRuntimeConfig()?.public?.tide
  const eventListeners: Record<string, any> =
    appConfig?.analytics?.eventListeners

  /* @ts-ignore process is extended by webpack */
  if (process.client) {
    nuxtApp.hook('tide:page', ({ page, site }) => {
      const route = useRoute()

      if (appConfig?.analytics?.routeChange === false) return

      let payload = routeChange({ route, site, page })

      // let the main nuxt app and layers extend or override the payload
      if (typeof appConfig?.analytics?.routeChange === 'object') {
        Object.values(appConfig?.analytics?.routeChange).forEach((callback) => {
          if (typeof callback === 'function') {
            payload = callback({ payload, route, site, page })
          }
        })
      }

      trackEvent(payload)
    })

    nuxtApp.vueApp.use({
      install(app: any) {
        const rplEventBus = app._context?.provides?.$rplEvent
        const site = nuxtApp?.payload.data?.[`site-${runtimeConfig.site}`]
        setupDataLayer(site?.featureFlags)
        setupGTM(runtimeConfig?.analytics?.GTM)
        // Check for site-specific GTM container
        if (site?.featureFlags?.gtmContainerID) {
          setupGTM(site?.featureFlags?.gtmContainerID)
        }
        if (rplEventBus && eventListeners) {
          /* Here we iterate over all imported events and add listeners to Mitt event bus */
          const evtKeys = Object.keys(eventListeners)
          if (evtKeys.length > 0) {
            evtKeys.forEach((key) => {
              rplEventBus.on(key, eventListeners[key]())
            })
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
