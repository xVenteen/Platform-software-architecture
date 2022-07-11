import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { truncate } from 'fs'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  })],
  server: {
    //服务器主机名
    host: '0.0.0.0',
    //端口号
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://192.168.101.39:9021',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')

      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('src'),

    }
  },
  // proxy: {
  //   // 选项写法
  //   '/api': {
  //     target: 'http://192.168.101.39:9021',
  //     changeOrigin: true,
  //     rewrite: (path) => {
  //       console.log('代理了');
  //       path.replace(/^\/api/, '')
  //     }
  //   }
  // },


})
