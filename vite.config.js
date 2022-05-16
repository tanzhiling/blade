import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import legacy from '@vitejs/plugin-legacy'

// 路径查找
const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@mall-activity': pathResolve('src/mall-activity'),
      '@mall-auth': pathResolve('src/mall-auth'),
      '@mall-common': pathResolve('src/mall-common'),
    },
  },
  server: {
    host: true,
    port: 3000,
    open: true,
    proxy: {
      '^/blade-*': {
        target: 'http://localhost:8099',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'chrome63',
    cssTarget: 'chrome63',
    outDir: 'dist',
    terserOptions: {
      compress: {
        keep_infinity: true,
        // Used to delete console in production environment
        // drop_console: VITE_DROP_CONSOLE,
      },
    },
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // 定义全局常量
  define: {},
});
