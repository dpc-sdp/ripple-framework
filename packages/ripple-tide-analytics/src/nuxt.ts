import { resolve } from 'pathe'
import { defineNuxtModule, addPluginTemplate } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    addPluginTemplate({
      filename: 'analytics.js',
      src: resolve(__dirname, '../dist', './plugin.js'),
      options: {
        ID: 'UA-120824569-44'
      }
    })
  }
})
