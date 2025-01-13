import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'http://62.113.105.104:8080', // Адрес вашего бэкенда
        changeOrigin: true, // Изменяет заголовок Origin для обхода CORS
        rewrite: (path) => path.replace(/^\/api/, '/api'), 
      },
    },
  },
});