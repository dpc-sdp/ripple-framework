import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
// import dts from 'vite-dts'
import dts from 'vite-plugin-dts'
import vitePlugins from './src/vite.plugins'

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  plugins: [vue(), dts()].concat(vitePlugins)
})
