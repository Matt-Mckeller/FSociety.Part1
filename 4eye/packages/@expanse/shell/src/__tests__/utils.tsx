/**
 * Test Utilities
 * 
 * Reusable helpers for testing layout components
 */

import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { NavigationProvider } from '@expanse/map/navigation';
import type { MapGridNavigationConfig } from '@expanse/map/navigation/types';
import { vi, Mock } from 'vitest';

// =============================================================================
// Default Test Configuration
// =============================================================================

/**
 * Default map grid configuration for tests
 */
export const defaultTestGridConfig: MapGridNavigationConfig = {
  dimensions: {
    width: 5,
    height: 5,
    wrapAround: false,
  },
  tiles: [
    {
      id: 'home',
      position: { x: 0, y: 0 },
      seo: { title: 'Home' },
      display: { label: 'Home', colors: { inactive: '#ccc', active: '#00f' } },
    },
    {
      id: 'test1',
      position: { x: 1, y: 0 },
      seo: { title: 'Test 1' },
      display: { label: 'Test 1', colors: { inactive: '#ccc', active: '#00f' } },
    },
    {
      id: 'test2',
      position: { x: 0, y: 1 },
      seo: { title: 'Test 2' },
      display: { label: 'Test 2', colors: { inactive: '#ccc', active: '#00f' } },
    },
  ],
};

/**
 * Default MUI theme for tests
 */
export const defaultTestTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// =============================================================================
// Custom Render Functions
// =============================================================================

/**
 * Render with NavigationProvider wrapper
 */
export function renderWithNavigation(
  ui: ReactElement,
  config: MapGridNavigationConfig = defaultTestGridConfig,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult {
  return render(ui, {
    wrapper: ({ children }) => (
      <NavigationProvider config={config}>
        {children}
      </NavigationProvider>
    ),
    ...options,
  });
}

/**
 * Render with ThemeProvider wrapper
 */
export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult {
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={defaultTestTheme}>
        {children}
      </ThemeProvider>
    ),
    ...options,
  });
}

/**
 * Render with both NavigationProvider and ThemeProvider
 */
export function renderWithProviders(
  ui: ReactElement,
  config: MapGridNavigationConfig = defaultTestGridConfig,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult {
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={defaultTestTheme}>
        <NavigationProvider config={config}>
          {children}
        </NavigationProvider>
      </ThemeProvider>
    ),
    ...options,
  });
}

// =============================================================================
// Mock Helpers
// =============================================================================

interface MockNavigation {
  position: { x: number; y: number };
  currentTile: null;
  grid: MapGridNavigationConfig;
  navigateTo: Mock;
  navigateRelative: Mock;
  canNavigate: Mock;
  getRelativePosition: Mock;
  isHome: boolean;
}

/**
 * Mock navigation hook return value
 */
export function createMockNavigation(): MockNavigation {
  return {
    position: { x: 0, y: 0 },
    currentTile: null,
    grid: defaultTestGridConfig,
    navigateTo: vi.fn(),
    navigateRelative: vi.fn(),
    canNavigate: vi.fn(() => true),
    getRelativePosition: vi.fn(),
    isHome: true,
  };
}

/**
 * Create mock map grid config with custom dimensions
 */
export function createMockGrid(width: number, height: number): MapGridNavigationConfig {
  const tiles = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tiles.push({
        id: `tile-${x}-${y}`,
        position: { x, y },
        seo: { title: `Tile ${x},${y}` },
        display: { label: `${x},${y}`, colors: { inactive: '#ccc', active: '#00f' } },
      });
    }
  }

  return {
    dimensions: {
      width,
      height,
      wrapAround: false,
    },
    tiles,
  };
}

// =============================================================================
// Assertion Helpers
// =============================================================================

/**
 * Check if an element has proper ARIA attributes
 */
export function expectAccessibleElement(element: HTMLElement) {
  expect(element).toBeInTheDocument();
  
  // Should have either role or aria-label
  const hasRole = element.getAttribute('role');
  const hasAriaLabel = element.getAttribute('aria-label') || element.getAttribute('aria-labelledby');
  
  expect(hasRole || hasAriaLabel).toBeTruthy();
}

/**
 * Check if element is keyboard accessible
 */
export function expectKeyboardAccessible(element: HTMLElement) {
  // Should be focusable (has tabindex >= 0 or is naturally focusable)
  const tabIndex = element.getAttribute('tabindex');
  const naturallyFocusable = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName);
  
  expect(
    naturallyFocusable || (tabIndex !== null && parseInt(tabIndex) >= 0)
  ).toBeTruthy();
}

/**
 * Simulate keyboard event
 */
export function simulateKeyPress(key: string, element: HTMLElement = document.body) {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
}

/**
 * Simulate viewport resize
 */
export function simulateResize(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
}

/**
 * Wait for async updates
 */
export function waitForAsync() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}
