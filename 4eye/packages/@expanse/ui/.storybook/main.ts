import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Resolve the absolute path of a package (needed in monorepos).
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: getAbsolutePath('@storybook/react-vite'),

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        if (prop.parent) {
          const parentFileName = prop.parent.fileName;
          if (parentFileName.includes('node_modules') && !parentFileName.includes('@mui')) {
            return false;
          }
        }
        return true;
      },
    },
  },

  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': join(__dirname, '../src'),
          '@expanse/ui': join(__dirname, '../src'),
          '@expanse/theme': join(__dirname, '../../theme/src'),
        },
      },
    });
  },
};

export default config;
