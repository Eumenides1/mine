// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
    // 其他插件...
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // 在这里添加assetsDir配置
    assetsDir: 'assets' // 静态资源将被输出到dist/assets目录
    // ...其他构建配置...
    // 例如，你可以配置rollupOptions来进一步自定义构建过程
    // rollupOptions: {
    //   // ...Rollup配置...
    // },
  }
  // ...其他Vite配置...
})
