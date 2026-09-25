import type { StorybookConfig } from "@storybook/react-vite"
import path from "path"

/** Resolve an absolute package directory path from this config file's location.
 *  Necessary in a mixed-version pnpm workspace: storybook core resolves package
 *  names from its own virtual-store context (which finds the hoisted v10 build).
 *  Passing an absolute path bypasses that re-resolution entirely. */
function getAbsolutePath(value: string): string {
  return path.dirname(require.resolve(path.join(value, "package.json")))
}

const config: StorybookConfig = {
  stories: [
    // Core design system
    "../src/primitives/**/*.stories.@(ts|tsx|mdx)",
    "../src/composites/**/*.stories.@(ts|tsx|mdx)",
    "../src/shapes/**/*.stories.@(ts|tsx|mdx)",
    
    // Vector graphics & character system
    "../src/vector-graphics/**/*.stories.@(ts|tsx|mdx)",
    
    // UI components
    "../src/components/**/*.stories.@(ts|tsx|mdx)",
    "../src/display/**/*.stories.@(ts|tsx|mdx)",
    "../src/status/**/*.stories.@(ts|tsx|mdx)",
    
    // Game Components
    "../src/game/**/*.stories.@(ts|tsx|mdx)",
    
    // EXCLUDED Example: game folder (pending @expanse/game and @expanse/points migration)
    // "../src/private/**/*.stories.@(ts|tsx|mdx)",
  ],
  addons: [getAbsolutePath("@storybook/addon-essentials")],
  framework: {
    name: getAbsolutePath("@storybook/react-vite") as any,
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve || {}
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      "@expanse/brand-core": path.resolve(__dirname, "../src"),
      "@expanse/character": path.resolve(__dirname, "../../character/src"),
      "@expanse/theme": path.resolve(__dirname, "../../theme/src"),
      // Local stubs for not-yet-migrated `expanse.ui/points` package.
      // Remove when the real package is ported (see src/index.ts TODO).
      "expanse.ui/points/components": path.resolve(
        __dirname,
        "../src/game/points/_stub/components.ts",
      ),
      "expanse.ui/points": path.resolve(
        __dirname,
        "../src/game/points/_stub/points.ts",
      ),
    }
    return viteConfig
  },
}

export default config
