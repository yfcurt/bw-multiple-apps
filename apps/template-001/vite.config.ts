import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { normalizeConfigs, siteEnvConfigs } from './configs/index'

// https://vitejs.dev/config/
export default defineConfig((ctx) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: './types/auto-imports.d.ts',
      }),
      Components({
        dirs: ['src/components'],
        dts: './types/components.d.ts',
      })
    ],
    define: {
      ...normalizeConfigs(siteEnvConfigs, 'import.meta.env.')
    },
    base: './',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
