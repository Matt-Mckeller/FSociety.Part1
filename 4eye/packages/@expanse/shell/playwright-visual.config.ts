import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for visual regression testing.
 * 
 * All screenshots are stored LOCALLY in __screenshots__/ directory.
 * No external services or data sharing.
 * 
 * Usage:
 *   pnpm test:visual           - Run visual tests
 *   pnpm test:visual:update    - Update baseline screenshots
 */
export default defineConfig({
  testDir: './visual-tests',
  
  // Fail fast on CI
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Local HTML reporter
  reporter: [
    ['html', { outputFolder: 'visual-test-report', open: 'never' }],
    ['list']
  ],
  
  // Shared settings
  use: {
    // Base URL for Storybook
    baseURL: 'http://localhost:6006',
    
    // Capture screenshot on failure
    screenshot: 'only-on-failure',
    
    // Collect trace on failure
    trace: 'on-first-retry',
  },

  // Screenshot comparison settings
  expect: {
    toHaveScreenshot: {
      // Allow minor anti-aliasing differences
      maxDiffPixelRatio: 0.01,
      
      // Local storage only
      snapshotDir: './__screenshots__',
    },
  },

  // Test projects for different viewports
  projects: [
    {
      name: 'desktop-chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'mobile',
      use: { 
        ...devices['iPhone 14'],
      },
    },
  ],

  // Ensure Storybook is running before tests
  webServer: {
    command: 'pnpm storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
