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
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
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
      "@expanse/character": path.resolve(__dirname, "../src"),
      "@expanse/theme": path.resolve(__dirname, "../../theme/src"),
    }
    return viteConfig
  },
}

export default config
