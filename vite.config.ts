import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    host: '0.0.0.0',
  },
  // TODO
  // css: {
  //   preprocessorOptions: {
  //     sass: {
  //       additionalData: '@import "@/styles/main.scss"'
  //     }
  //   }
  // }
});
