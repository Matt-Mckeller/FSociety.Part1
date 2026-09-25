import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  server: { port: 5173, open: true },
  build: {
    // Inline EVERYTHING (images, css, js) into a single index.html
    assetsInlineLimit: 100 * 1024 * 1024,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 100 * 1024,
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
