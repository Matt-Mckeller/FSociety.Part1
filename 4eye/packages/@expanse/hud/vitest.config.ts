import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Get the directory where React is installed (for deduplication)
const reactDir = dirname(require.resolve('react/package.json'));
const reactDomDir = dirname(require.resolve('react-dom/package.json'));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@expanse/hud': resolve(__dirname, './src'),
      '@expanse/map': resolve(__dirname, '../map/src'),
      '@expanse/shell': resolve(__dirname, '../shell/src'),
      '@expanse/theme': resolve(__dirname, '../theme/src'),
      '@expanse/ui': resolve(__dirname, '../ui/src'),
      // Point to React package directories, not individual files
      react: reactDir,
      'react-dom': reactDomDir,
    },
    dedupe: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.vitest.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.stories.tsx'],
    // Force deps to go through Vite transform for consistent React
    server: {
      deps: {
        inline: [/@mui/, /@emotion/, /@storybook/],
      },
    },
  },
});
