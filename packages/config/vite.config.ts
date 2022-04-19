import { UserConfigExport } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default {
  plugins: [react()],
  server: { host: "0.0.0.0" },
} as UserConfigExport
