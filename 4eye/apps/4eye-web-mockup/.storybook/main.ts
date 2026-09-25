import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const STORIES_GLOB = "/**/*.stories.@(js|jsx|mjs|ts|tsx)";
const MDX_GLOB = "/**/*.mdx";
const PKG = "../../../packages/@expanse";

const config: StorybookConfig = {
  stories: [
    // App
    `../src${MDX_GLOB}`,
    `../src${STORIES_GLOB}`,

    // Packages — add or remove packages here to control what loads
    `${PKG}/character/src${STORIES_GLOB}`,
    `${PKG}/hud/src${STORIES_GLOB}`,
    `${PKG}/lens/src${STORIES_GLOB}`,
    `${PKG}/shell/src${STORIES_GLOB}`,
    `${PKG}/brand-core/src${STORIES_GLOB}`,
    `${PKG}/ui/src${STORIES_GLOB}`,
    `${PKG}/map/src${STORIES_GLOB}`,
    `${PKG}/i18n/src${STORIES_GLOB}`,
    `../../../packages/@4eye/features/src${STORIES_GLOB}`,
  ],
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
  ],
  framework: getAbsolutePath("@storybook/react-vite"),

  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        if (prop.parent) {
          const parentFileName = prop.parent.fileName;
          if (
            parentFileName.includes("node_modules") &&
            !parentFileName.includes("@mui")
          ) {
            return false;
          }
        }
        return true;
      },
    },
  },

  viteFinal: async (config) => {
    return mergeConfig(config, {
      // Override Next.js's `jsx: preserve` setting — Storybook's Vite
      // pipeline needs JSX transformed to runtime calls.
      esbuild: {
        jsx: "automatic",
        jsxDev: true,
      },
      resolve: {
        alias: {
          "@": join(__dirname, "../src"),
          "@expanse/theme": join(
            __dirname,
            "../../../packages/@expanse/theme/src",
          ),
          "@expanse/shell": join(
            __dirname,
            "../../../packages/@expanse/shell/src",
          ),
          "@expanse/map": join(
            __dirname,
            "../../../packages/@expanse/map/src",
          ),
          "@expanse/hud": join(
            __dirname,
            "../../../packages/@expanse/hud/src",
          ),
          "@expanse/brand-core": join(
            __dirname,
            "../../../packages/@expanse/brand-core/src",
          ),
          "@expanse/character": join(
            __dirname,
            "../../../packages/@expanse/character/src",
          ),
          "@expanse/i18n": join(
            __dirname,
            "../../../packages/@expanse/i18n/src",
          ),
          "@4eye/types": join(
            __dirname,
            "../../../packages/@4eye/types/src",
          ),
          "@4eye/features": join(
            __dirname,
            "../../../packages/@4eye/features/src",
          ),
          "@expanse/scoring": join(
            __dirname,
            "../../../packages/@expanse/scoring/src",
          ),
          "@expanse/ui": join(
            __dirname,
            "../../../packages/@expanse/ui/src",
          ),
          "@expanse/lens": join(
            __dirname,
            "../../../packages/@expanse/lens/src",
          ),
          "@4eye/icons": join(
            __dirname,
            "../../../packages/@4eye/icons/src",
          ),
          // Stub for not-yet-migrated expanse.ui/points (matches tsconfig paths)
          "expanse.ui/points": join(
            __dirname,
            "../../../packages/@expanse/brand-core/src/game/points/_stub/points.ts",
          ),
          // Storybook runs on Vite (not @storybook/nextjs), so the App
          // Router hooks (`useRouter` / `usePathname` / `redirect`) need
          // a no-op stub. Stories that need a real router can wrap
          // their decorator in a custom NavigationProvider.
          "next/navigation": join(
            __dirname,
            "./stubs/nextNavigation.ts",
          ),
        },
      },
    });
  },
};

export default config;
