import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3341,
    fs: {
      // Allow serving files from the packages directory
      allow: ["..", "../../packages"],
    },
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "../../packages/staticAssets"),
    },
  },
})
