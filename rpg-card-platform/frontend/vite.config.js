import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/empireyoncarsistemaeducativo/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3005,
    allowedHosts: ["empireyoncar.duckdns.org"],
    proxy: {
      "/empireyoncarsistemaeducativo/api": {
        target: "http://backend:6801",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/empireyoncarsistemaeducativo/, ""),
      },
      "/empireyoncarsistemaeducativo/constructor-rpg": {
        target: "http://card-builder:3006",
        changeOrigin: true,
      },
      "/api": {
        target: "http://backend:6801",
        changeOrigin: true,
      },
    },
  },
});
