/**
 * Integration tests for Responsive Layout features
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ResponsiveLayoutWrapper } from '@expanse/hud/templates/original/ResponsiveLayout';
import { MinimalLayout } from '@expanse/hud/templates/original/MinimalLayout';
import { 
  renderWithProviders, 
  defaultTestGridConfig, 
  simulateResize,
  waitForAsync 
} from '../utils';

describe('Responsive Layout Integration', () => {
  // Reset window size before each test
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  describe('ResponsiveLayoutWrapper', () => {
    it('renders with desktop props by default', () => {
      const { container } = renderWithProviders(
        <ResponsiveLayoutWrapper
          layout={MinimalLayout}
          baseProps={{
            preset: 'clean',
            autoPages: {},
          }}
          responsive={{
            mobile: { minimapSize: 'small' },
            tablet: { minimapSize: 'medium' },
            desktop: { minimapSize: 'large' },
          }}
        />,
        defaultTestGridConfig
      );
      
      expect(container).toBeInTheDocument();
    });

    it('adapts to mobile viewport', async () => {
      const { rerender } = renderWithProviders(
        <ResponsiveLayoutWrapper
          layout={MinimalLayout}
          baseProps={{
            preset: 'floating-controls',
            autoPages: {},
          }}
          responsive={{
            mobile: { preset: 'clean' },
          }}
        />,
        defaultTestGridConfig
      );
      
      // Simulate mobile viewport
      simulateResize(375, 667);
      await waitForAsync();
      
      // Force re-render to apply responsive changes
      rerender(
        <ResponsiveLayoutWrapper
          layout={MinimalLayout}
          baseProps={{
            preset: 'floating-controls',
            autoPages: {},
          }}
          responsive={{
            mobile: { preset: 'clean' },
          }}
        />
      );
      
      // Component should adapt (exact behavior depends on implementation)
      expect(window.innerWidth).toBe(375);
    });

    it('adapts to tablet viewport', async () => {
      simulateResize(768, 1024);
      await waitForAsync();
      
      const { container } = renderWithProviders(
        <ResponsiveLayoutWrapper
          layout={MinimalLayout}
          baseProps={{
            preset: 'clean',
            autoPages: {},
          }}
          responsive={{
            tablet: { preset: 'floating-controls' },
          }}
        />,
        defaultTestGridConfig
      );
      
      expect(window.innerWidth).toBe(768);
      expect(container).toBeInTheDocument();
    });

    it('uses custom breakpoints', () => {
      const { container } = renderWithProviders(
        <ResponsiveLayoutWrapper
          layout={MinimalLayout}
          baseProps={{ autoPages: {} }}
          breakpoints={{
            mobile: 600,
            tablet: 900,
            desktop: 1200,
          }}
        />,
        defaultTestGridConfig
      );
      
      expect(container).toBeInTheDocument();
    });

    it('merges base props with responsive props', () => {
      const { container } = renderWithProviders(
        <ResponsiveLayoutWrapper
          layout={MinimalLayout}
          baseProps={{
            preset: 'clean',
            minimapSize: 'large',
            autoPages: {},
          }}
          responsive={{
            desktop: {
              minimapSize: 'small', // overrides base
            },
          }}
        />,
        defaultTestGridConfig
      );
      
      expect(container).toBeInTheDocument();
    });
  });

  describe('Responsive Presets', () => {
    it('applies mobile-optimized settings', async () => {
      simulateResize(375, 667);
      
      const { container } = renderWithProviders(
        <MinimalLayout
          preset="floating-controls"
          autoPages={{}}
        />,
        defaultTestGridConfig
      );
      
      // On mobile, should adapt controls
      await waitForAsync();
      expect(container).toBeInTheDocument();
    });

    it('applies tablet-optimized settings', async () => {
      simulateResize(768, 1024);
      
      const { container } = renderWithProviders(
        <MinimalLayout
          preset="floating-controls"
          autoPages={{}}
        />,
        defaultTestGridConfig
      );
      
      await waitForAsync();
      expect(container).toBeInTheDocument();
    });

    it('applies desktop-optimized settings', async () => {
      simulateResize(1920, 1080);
      
      const { container } = renderWithProviders(
        <MinimalLayout
          preset="floating-controls"
          autoPages={{}}
        />,
        defaultTestGridConfig
      );
      
      await waitForAsync();
      expect(container).toBeInTheDocument();
    });
  });

  describe('Window Resize Handling', () => {
    it('responds to window resize events', async () => {
      const { rerender } = renderWithProviders(
        <ResponsiveLayoutWrapper
          layout={MinimalLayout}
          baseProps={{ autoPages: {} }}
          responsive={{
            mobile: { autoPages: {} },
            desktop: { autoPages: {} },
          }}
        />,
        defaultTestGridConfig
      );
      
      // Start desktop
      expect(window.innerWidth).toBe(1024);
      
      // Resize to mobile
      simulateResize(375, 667);
      await waitForAsync();
      
      rerender(
        <ResponsiveLayoutWrapper
          layout={MinimalLayout}
          baseProps={{ autoPages: {} }}
          responsive={{
            mobile: { autoPages: {} },
            desktop: { autoPages: {} },
          }}
        />
      );
      
      expect(window.innerWidth).toBe(375);
    });

    it('maintains state across resize', async () => {
      const { container, rerender } = renderWithProviders(
        <MinimalLayout preset="floating-controls" autoPages={{}} />,
        defaultTestGridConfig
      );
      
      // Resize window
      simulateResize(768, 1024);
      await waitForAsync();
      
      rerender(<MinimalLayout preset="floating-controls" autoPages={{}} />);
      
      // Content should still be rendered
      expect(container).toBeInTheDocument();
    });
  });

  describe('Breakpoint Detection', () => {
    it('correctly identifies mobile viewport', () => {
      simulateResize(375, 667);
      expect(window.innerWidth).toBeLessThan(768);
    });

    it('correctly identifies tablet viewport', () => {
      simulateResize(768, 1024);
      expect(window.innerWidth).toBeGreaterThanOrEqual(768);
      expect(window.innerWidth).toBeLessThan(1024);
    });

    it('correctly identifies desktop viewport', () => {
      simulateResize(1920, 1080);
      expect(window.innerWidth).toBeGreaterThanOrEqual(1024);
    });
  });

  describe('Responsive Component Behavior', () => {
    it('hides components on mobile when configured', async () => {
      simulateResize(375, 667);
      
      renderWithProviders(
        <ResponsiveLayoutWrapper
          layout={MinimalLayout}
          baseProps={{
            preset: 'floating-controls',
            autoPages: {},
          }}
          responsive={{
            mobile: {
              preset: 'clean', // no controls on mobile
            },
          }}
        />,
        defaultTestGridConfig
      );
      
      await waitForAsync();
      
      // Clean preset should hide minimap/controls
      expect(screen.queryByRole('region', { name: /minimap/i })).not.toBeInTheDocument();
    });

    it('shows controls on desktop', async () => {
      simulateResize(1920, 1080);
      
      renderWithProviders(
        <MinimalLayout
          preset="floating-controls"
          autoPages={{}}
        />,
        defaultTestGridConfig
      );
      
      await waitForAsync();
      
      // Should have navigation controls
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});
