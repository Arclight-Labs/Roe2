import { UserConfigExport } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
const config: UserConfigExport = {
  plugins: [react()],
}

export default config
