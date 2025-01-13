import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  // target: "http://billing-core-api:8080",
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/api": {
        //target: "http://billing-core-api:8080", // Адрес вашего бэкенда
        target: "http://billing-core-api:8080", // Адрес вашего бэкенда
        changeOrigin: true, // Изменяет заголовок Origin для обхода CORS
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
