import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import loadVersion from "vite-plugin-package-version"
import svgrPlugin from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    loadVersion(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  server: { port: 1338 },
})
