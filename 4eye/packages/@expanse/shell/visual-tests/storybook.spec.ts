import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for @expanse/shell Storybook components.
 * 
 * These tests capture screenshots and compare against baselines.
 * All screenshots are stored locally in __screenshots__/.
 * 
 * To update baselines: pnpm test:visual:update
 */

// Story paths to test - maps to Storybook's URL structure
const STORIES = {
  // Feature: Minimap
  minimap: [
    { name: 'default', path: 'components-minimap--default' },
    { name: 'grid-variant', path: 'components-minimap--grid-variant' },
    { name: 'dots-variant', path: 'components-minimap--dots-variant' },
    { name: 'blocks-variant', path: 'components-minimap--blocks-variant' },
    { name: 'all-variants', path: 'components-minimap--all-variants' },
  ],
  
  // Feature: NavigationPad
  navigationPad: [
    { name: 'default', path: 'components-navigationpad--default' },
    { name: 'with-hints', path: 'components-navigationpad--with-hints' },
    { name: 'compact', path: 'components-navigationpad--compact' },
    { name: 'expanded', path: 'components-navigationpad--expanded' },
    { name: 'all-variants', path: 'components-navigationpad--all-variants' },
  ],
  
  // Feature: ActionBar
  actionBar: [
    { name: 'simple-top', path: 'features-actionbar--simple-top' },
    { name: 'rich-top', path: 'features-actionbar--rich-top' },
    { name: 'simple-bottom', path: 'features-actionbar--simple-bottom' },
    { name: 'rich-bottom', path: 'features-actionbar--rich-bottom' },
    { name: 'collapsible-left', path: 'features-actionbar--collapsible-left' },
    { name: 'simple-right', path: 'features-actionbar--simple-right' },
  ],
  
  // Feature: FloatingToolbar
  floatingToolbar: [
    { name: 'icon-buttons', path: 'features-floatingtoolbar--icon-buttons' },
    { name: 'with-zoom', path: 'features-floatingtoolbar--with-zoom-controls' },
    { name: 'with-toggle', path: 'features-floatingtoolbar--with-toggle-buttons' },
    { name: 'with-layout-switcher', path: 'features-floatingtoolbar--with-layout-switcher' },
    { name: 'with-minimap-toggle', path: 'features-floatingtoolbar--with-minimap-toggle' },
  ],
  
  // Feature: BoardChrome
  boardChrome: [
    { name: 'top-bar', path: 'features-boardchrome--top-bar' },
    { name: 'bottom-bar', path: 'features-boardchrome--bottom-bar' },
    { name: 'corner-controls', path: 'features-boardchrome--corner-controls' },
    { name: 'complete-layout', path: 'features-boardchrome--complete-layout' },
  ],
  
  // Feature: Tile
  tile: [
    { name: 'default', path: 'features-tile--default' },
    { name: 'active', path: 'features-tile--active' },
    { name: 'loading', path: 'features-tile--loading' },
    { name: 'disabled', path: 'features-tile--disabled' },
    { name: 'with-card', path: 'features-tile--with-card-content' },
  ],
  
  // Primitives
  primitives: [
    { name: 'loading-spinner', path: 'primitives-primitives--loading-spinner-demo' },
    { name: 'max-width-container', path: 'primitives-primitives--max-width-container-demo' },
    { name: 'section-spacer', path: 'primitives-primitives--section-spacer-demo' },
  ],
  
  // Template: MinimalLayout
  minimalLayout: [
    { name: 'overlay-navigation', path: 'templates-minimallayout--overlay-navigation' },
    { name: 'floating-controls', path: 'templates-minimallayout--floating-controls' },
    { name: 'sidebar-minimap', path: 'templates-minimallayout--sidebar-minimap' },
  ],
  
  // Template: FullScreenLayout
  fullScreenLayout: [
    { name: 'default', path: 'templates-fullscreenlayout--default' },
    { name: 'with-minimap', path: 'templates-fullscreenlayout--with-minimap' },
    { name: 'with-nav-controls', path: 'templates-fullscreenlayout--with-nav-controls' },
    { name: 'complete', path: 'templates-fullscreenlayout--complete' },
  ],
  
  // Template: DashboardLayout
  dashboardLayout: [
    { name: 'default', path: 'templates-dashboardlayout--default' },
    { name: 'with-top-bar', path: 'templates-dashboardlayout--with-top-bar' },
    { name: 'with-left-sidebar', path: 'templates-dashboardlayout--with-left-sidebar' },
    { name: 'complete-layout', path: 'templates-dashboardlayout--complete-layout' },
  ],
  
  // Template: PanelLayout
  panelLayout: [
    { name: 'default', path: 'templates-panellayout--default' },
    { name: 'with-top-bar', path: 'templates-panellayout--with-top-bar' },
    { name: 'with-left-sidebar', path: 'templates-panellayout--with-left-sidebar' },
    { name: 'complete-layout', path: 'templates-panellayout--complete-layout' },
  ],
  
  // Template: DocumentationLayout
  documentationLayout: [
    { name: 'preset-default', path: 'templates-documentationlayout--preset-default' },
    { name: 'preset-minimal', path: 'templates-documentationlayout--preset-minimal' },
    { name: 'preset-clean', path: 'templates-documentationlayout--preset-clean' },
    { name: 'with-custom-positions', path: 'templates-documentationlayout--custom-minimap-position' },
  ],
  
  // Template: ComposableLayout
  composableLayout: [
    { name: 'default', path: 'templates-composablelayout--default' },
    { name: 'with-top-bar', path: 'templates-composablelayout--with-top-bar' },
    { name: 'with-sidebar', path: 'templates-composablelayout--with-sidebar' },
    { name: 'complete-framework', path: 'templates-composablelayout--complete-framework' },
  ],
  
  // Template: ResponsiveLayout
  responsiveLayout: [
    { name: 'minimal-responsive', path: 'templates-responsivelayout--minimal-layout-responsive' },
    { name: 'conditional-features', path: 'templates-responsivelayout--conditional-features' },
  ],
};

// Helper function to create visual tests for a component category
function createVisualTests(categoryName: string, stories: Array<{ name: string; path: string }>, options: { fullPage?: boolean; timeout?: number } = {}) {
  test.describe(`${categoryName} Visual Tests`, () => {
    for (const story of stories) {
      test(`${categoryName.toLowerCase()}-${story.name}`, async ({ page }) => {
        await page.goto(`/iframe.html?viewMode=story&id=${story.path}`);
        
        // Wait for story to render
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(options.timeout || 500);
        
        // Take screenshot
        await expect(page).toHaveScreenshot(`${categoryName.toLowerCase()}-${story.name}.png`, {
          fullPage: options.fullPage || false,
        });
      });
    }
  });
}

// Component Visual Tests
createVisualTests('Minimap', STORIES.minimap);
createVisualTests('NavigationPad', STORIES.navigationPad);
createVisualTests('ActionBar', STORIES.actionBar);
createVisualTests('FloatingToolbar', STORIES.floatingToolbar);
createVisualTests('BoardChrome', STORIES.boardChrome, { timeout: 800 });
createVisualTests('Tile', STORIES.tile);
createVisualTests('Primitives', STORIES.primitives, { timeout: 1000 });

// Template Visual Tests (use fullPage for layouts)
createVisualTests('MinimalLayout', STORIES.minimalLayout, { fullPage: true, timeout: 1000 });
createVisualTests('FullScreenLayout', STORIES.fullScreenLayout, { fullPage: true, timeout: 1000 });
createVisualTests('DashboardLayout', STORIES.dashboardLayout, { fullPage: true, timeout: 1000 });
createVisualTests('PanelLayout', STORIES.panelLayout, { fullPage: true, timeout: 1000 });
createVisualTests('DocumentationLayout', STORIES.documentationLayout, { fullPage: true, timeout: 1000 });
createVisualTests('ComposableLayout', STORIES.composableLayout, { fullPage: true, timeout: 1000 });
createVisualTests('ResponsiveLayout', STORIES.responsiveLayout, { fullPage: true, timeout: 1000 });


// Test hover states for interactive components
test.describe('Interactive States', () => {
  test('navigationpad-hover-state', async ({ page }) => {
    await page.goto('/iframe.html?viewMode=story&id=components-navigationpad--default');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Find any visible button and hover
    const buttons = page.locator('button:visible');
    const count = await buttons.count();
    if (count > 0) {
      await buttons.first().hover();
      await page.waitForTimeout(300);
    }
    
    await expect(page).toHaveScreenshot('navigationpad-hover.png');
  });
  
  test('minimap-hover-state', async ({ page }) => {
    await page.goto('/iframe.html?viewMode=story&id=components-minimap--default');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Hover over the minimap container itself
    const minimap = page.locator('[data-testid="minimap"]').first();
    if ((await minimap.count()) > 0) {
      await minimap.hover();
      await page.waitForTimeout(300);
    }
    
    await expect(page).toHaveScreenshot('minimap-hover.png');
  });
  
  test('actionbar-hover-state', async ({ page }) => {
    await page.goto('/iframe.html?viewMode=story&id=features-actionbar--rich-top');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    const buttons = page.locator('button:visible');
    const count = await buttons.count();
    if (count > 0) {
      await buttons.first().hover();
      await page.waitForTimeout(300);
    }
    
    await expect(page).toHaveScreenshot('actionbar-hover.png');
  });
});

// Responsive viewport tests
test.describe('Responsive Tests', () => {
  test('navigationpad-mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?viewMode=story&id=components-navigationpad--compact');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('navigationpad-mobile.png');
  });
  
  test('minimallayout-tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/iframe.html?viewMode=story&id=templates-minimallayout--floating-controls');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('minimallayout-tablet.png', {
      fullPage: true,
    });
  });
  
  test('responsive-layout-mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?viewMode=story&id=templates-responsivelayout--minimal-layout-responsive');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('responsivelayout-mobile.png', {
      fullPage: true,
    });
  });
});
