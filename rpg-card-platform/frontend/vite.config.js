import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/empireyoncarsistemaeducativo/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/empireyoncarsistemaeducativo/api": {
        target: "http://backend:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/empireyoncarsistemaeducativo/, ""),
      },
      "/api": {
        target: "http://backend:8000",
        changeOrigin: true,
      },
    },
  },
});
