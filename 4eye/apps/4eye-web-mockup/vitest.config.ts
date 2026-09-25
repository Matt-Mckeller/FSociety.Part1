import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const reactDir = dirname(require.resolve("react/package.json"));
const reactDomDir = dirname(require.resolve("react-dom/package.json"));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@expanse/theme": resolve(__dirname, "../../packages/@expanse/theme/src"),
      "@expanse/shell": resolve(__dirname, "../../packages/@expanse/shell/src"),
      "@expanse/map": resolve(__dirname, "../../packages/@expanse/map/src"),
      "@expanse/hud": resolve(__dirname, "../../packages/@expanse/hud/src"),
      "@expanse/brand-core": resolve(__dirname, "../../packages/@expanse/brand-core/src"),
      "@expanse/character": resolve(__dirname, "../../packages/@expanse/character/src"),
      "@expanse/scoring": resolve(__dirname, "../../packages/@expanse/scoring/src"),
      "@4eye/types": resolve(__dirname, "../../packages/@4eye/types/src"),
      "@4eye/features": resolve(__dirname, "../../packages/@4eye/features/src"),
      "@4eye/ai-sdk": resolve(__dirname, "../../packages/@4eye/ai-sdk/src"),
      "@4eye/core": resolve(__dirname, "../../packages/@4eye/core/src"),
      react: reactDir,
      "react-dom": reactDomDir,
    },
    dedupe: ["react", "react-dom", "@emotion/react", "@emotion/styled"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.vitest.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    exclude: ["**/node_modules/**", "**/.next/**", "**/*.stories.tsx"],
  },
});
