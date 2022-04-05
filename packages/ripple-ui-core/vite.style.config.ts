import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src')
    }
  },
  build: {
    emptyOutDir: false,
    outDir: 'dist/global',
    lib: {
      entry: path.resolve(__dirname, 'src/assets/css/global.css'),
      name: 'rpl',
      fileName: (f) => `rpl-lib.${f}.js`
    },
    sourcemap: false,
    // Reduce bloat from legacy polyfills.
    target: 'esnext',
    // Leave minification for now whilst we are non prod
    minify: false
  }
})
