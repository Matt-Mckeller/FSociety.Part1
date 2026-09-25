import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { dirname } from "path"
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const reactDir = dirname(require.resolve("react/package.json"))
const reactDomDir = dirname(require.resolve("react-dom/package.json"))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: reactDir,
      "react-dom": reactDomDir,
    },
    dedupe: ["react", "react-dom", "@emotion/react", "@emotion/styled"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    exclude: ["**/node_modules/**", "**/*.stories.tsx"],
  },
})
