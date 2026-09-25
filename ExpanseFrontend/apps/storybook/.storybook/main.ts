import type { StorybookConfig } from "@storybook/react-vite"
import path from "path"

const config: StorybookConfig = {
  /*
    Spelled out rather than one `../src/**` sweep, for one reason:
    `stories/PersonalNext/Resume` imports
    `apps/personalNext/src/modules/content/resume/resume.component`, which no
    longer exists — the resume module was removed from personalNext and the
    story was left behind. Rollup cannot resolve it, so `storybook build` fails
    outright rather than skipping the story.

    Storybook's `stories` does not accept `!`-prefixed exclusions, so the way to
    leave one directory out is to stop globbing over it. Excluded rather than
    deleted because the real fix is to restore or retire the component, and that
    is personalNext's call. Collapse these back into `../src/**` once it is.
  */
  stories: [
    "../src/components/**/*.stories.@(ts|tsx|mdx)",
    "../src/stories/*.stories.@(ts|tsx|mdx)",
    "../src/stories/!(PersonalNext)/**/*.stories.@(ts|tsx|mdx)",
    "../src/stories/PersonalNext/!(Resume)/**/*.stories.@(ts|tsx|mdx)",
    // Discover stories from packages
    "../../../packages/dynamicAssets/**/*.stories.@(ts|tsx)",
    "../../../packages/ui/**/*.stories.@(ts|tsx)",
    "../../../packages/brandCore/**/*.stories.@(ts|tsx)",
    // 4up stories (migrated to core storybook)
    "../src/stories/4up/**/*.stories.@(ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  /*
    The Node `global` shim, moved out of `viteFinal`'s `define`.

    It used to be `define: { global: "globalThis" }`, which is a *textual*
    substitution — and it did not stop at identifiers. Every occurrence of the
    token was rewritten, including the one inside the import specifier
    "@storybook/global" in addon-backgrounds, which became "@storybook/globalThis"
    and failed to resolve. That broke `storybook build` outright.

    Injecting the alias at runtime achieves the same thing for the libraries
    that expect a Node `global` object, and cannot rewrite anyone's source.
  */
  previewHead: (head) => `${head}\n<script>window.global = window;</script>`,
  staticDirs: [
    // Serve the font directory so @font-face urls resolve correctly
    { from: "../../../packages/ui/theme/font", to: "/font" },
    // Serve static assets from expanse.staticAssets package
    { from: "../../../packages/staticAssets/images", to: "/assets/images" },
    { from: "../../../packages/staticAssets/vectors", to: "/assets/vectors" },
    { from: "../../../packages/staticAssets/favicon", to: "/assets/favicon" },
    {
      from: "../../../packages/staticAssets/openGraph",
      to: "/assets/openGraph",
    },
  ],
  viteFinal: async (viteConfig) => {
    // Ensure packages are resolved correctly
    viteConfig.resolve = viteConfig.resolve || {}
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      "expanse.ui": path.resolve(__dirname, "../../../packages/ui"),
      "expanse.dynamicAssets": path.resolve(
        __dirname,
        "../../../packages/dynamicAssets",
      ),
      "expanse.staticAssets": path.resolve(
        __dirname,
        "../../../packages/staticAssets",
      ),
      "@expanse/brand-core": path.resolve(
        __dirname,
        "../../../packages/brandCore",
      ),
      // ExpanseEdu modules for storybook integration
      "@expanseEdu": path.resolve(__dirname, "../../expanseEdu/src"),
      // PersonalNext path aliases
      "@personalNext/modules": path.resolve(
        __dirname,
        "../../personalNext/src/modules",
      ),
      "@personalNext/content": path.resolve(
        __dirname,
        "../../personalNext/src/modules/content",
      ),
      // 4up app aliases
      "@4up": path.resolve(__dirname, "../../4up/app/src"),
      "@4up-components": path.resolve(
        __dirname,
        "../../4up/app/src/components",
      ),
      "@4up-ui": path.resolve(__dirname, "../../4up/app/src/components/ui"),
      "@4up-features": path.resolve(
        __dirname,
        "../../4up/app/src/components/features",
      ),
      "@4up-layout": path.resolve(
        __dirname,
        "../../4up/app/src/components/layout",
      ),
      "@4up-shared": path.resolve(
        __dirname,
        "../../4up/app/src/components/shared",
      ),
      "@data-types": path.resolve(__dirname, "../../4up/app/src/data-types"),
      "@seed": path.resolve(__dirname, "../../4up/app/src/seedData"),
      // Match 4up app's @/* path alias from tsconfig.json
      "@": path.resolve(__dirname, "../../4up/app/src"),
      // Stub out Node.js-only modules that don't work in browsers
      jsonwebtoken: path.resolve(__dirname, "../src/mocks/jsonwebtoken.ts"),
      // Mock Next.js modules for Storybook
      "next/navigation": path.resolve(
        __dirname,
        "../src/mocks/next-navigation.ts",
      ),
      "next/link": path.resolve(__dirname, "../src/mocks/next-link.tsx"),
      "next/router": path.resolve(__dirname, "../src/mocks/next-router.tsx"),
      "next/script": path.resolve(__dirname, "../src/mocks/next-script.tsx"),
      "next/image": path.resolve(__dirname, "../src/mocks/next-image.tsx"),
    }

    // Fix for Node.js modules used in browser.
    // `global` is deliberately NOT defined here — see `previewHead` above.
    viteConfig.define = {
      ...viteConfig.define,
      "process.env": {},
    }

    // Fix MUI/Emotion compatibility with Vite - force all emotion packages to resolve to same version
    viteConfig.resolve.dedupe = [
      ...(viteConfig.resolve.dedupe || []),
      "@emotion/react",
      "@emotion/styled",
      "@emotion/cache",
      "react",
      "react-dom",
    ]

    // Prebundle these dependencies to avoid ESM issues
    viteConfig.optimizeDeps = viteConfig.optimizeDeps || {}
    viteConfig.optimizeDeps.include = [
      ...(viteConfig.optimizeDeps.include || []),
      "@emotion/react",
      "@emotion/styled",
      "@mui/material",
      "@mui/material/styles",
      "@mui/system",
    ]

    // Exclude Node.js-only modules from optimization
    viteConfig.optimizeDeps.exclude = [
      ...(viteConfig.optimizeDeps.exclude || []),
      "jsonwebtoken",
    ]

    return viteConfig
  },
}

export default config
