import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
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
    // All visual testing is done locally via Playwright - no external services
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
        // Exclude props from node_modules except @mui
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
          '@expanse/i18n': join(__dirname, '../../i18n/src'),
          '@expanse/hud': join(__dirname, '../src'),
          '@expanse/shell': join(__dirname, '../../shell/src'),
          '@expanse/map': join(__dirname, '../../map/src'),
          '@4eye/features': join(__dirname, '../../../@4eye/features/src'),
          '@4eye/types': join(__dirname, '../../../@4eye/types/src'),
          'framer-motion': join(__dirname, '../../../@4eye/features/node_modules/framer-motion'),
        },
      },
    });
  },
};

export default config;
