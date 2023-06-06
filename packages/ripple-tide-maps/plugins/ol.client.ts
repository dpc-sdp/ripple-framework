// plugins/vue3-openlayers.client.js
import { defineNuxtPlugin } from '#app'
import OpenLayers from 'vue3-openlayers'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(OpenLayers)
  console.log(nuxtApp.vueApp)
})
