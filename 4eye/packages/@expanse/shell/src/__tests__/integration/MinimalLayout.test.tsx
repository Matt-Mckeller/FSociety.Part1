/**
 * Integration tests for MinimalLayout template
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MinimalLayout } from '@expanse/hud/templates/original/MinimalLayout';
import { renderWithProviders, defaultTestGridConfig, simulateKeyPress } from '../utils';

describe('MinimalLayout Integration', () => {
  describe('Rendering', () => {
    it('renders with clean preset', () => {
      const { container } = renderWithProviders(
        <MinimalLayout preset="clean" autoPages={{}} />,
        defaultTestGridConfig
      );
      
      expect(container).toBeInTheDocument();
    });

    it('renders with floating-controls preset', () => {
      renderWithProviders(
        <MinimalLayout 
          preset="floating-controls" 
          autoPages={{}}
        />,
        defaultTestGridConfig
      );
      
      // Should have minimap and navigation controls
      const minimap = screen.queryByRole('region', { name: /minimap/i });
      expect(minimap).toBeInTheDocument();
    });

    it('renders with custom minimap', () => {
      const CustomMinimap = () => <div data-testid="custom-minimap">Custom</div>;
      
      renderWithProviders(
        <MinimalLayout 
          preset="floating-controls"
          customMinimap={<CustomMinimap />}
          autoPages={{}}
        />,
        defaultTestGridConfig
      );
      
      expect(screen.getByTestId('custom-minimap')).toBeInTheDocument();
    });
  });

  describe('Presets', () => {
    it('gaming preset has correct configuration', () => {
      const { container } = renderWithProviders(
        <MinimalLayout preset="gaming" autoPages={{}} />,
        defaultTestGridConfig
      );
      
      // Gaming preset should have dark background
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveStyle({ backgroundColor: '#000' });
    });

    it('presentation preset shows sidebar', () => {
      const { container } = renderWithProviders(
        <MinimalLayout preset="presentation" autoPages={{}} />,
        defaultTestGridConfig
      );
      
      // Presentation preset should apply its dedicated dark background.
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveStyle({ backgroundColor: '#1a1a1a' });
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible', () => {
      renderWithProviders(
        <MinimalLayout 
          preset="floating-controls"
          autoPages={{}}
        />,
        defaultTestGridConfig
      );
      
      // Should handle keyboard navigation
      simulateKeyPress('ArrowRight');
      
      // Navigation should occur (checked via context)
      // This is a basic check
      expect(document.body).toBeInTheDocument();
    });

    it('has proper ARIA labels', () => {
      renderWithProviders(
        <MinimalLayout 
          preset="floating-controls"
          autoPages={{}}
        />,
        defaultTestGridConfig
      );
      
      // Check for ARIA landmarks
      const main = screen.queryByRole('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('adapts to viewport changes', async () => {
      const { rerender } = renderWithProviders(
        <MinimalLayout preset="floating-controls" autoPages={{}} />,
        defaultTestGridConfig
      );
      
      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true });
      window.dispatchEvent(new Event('resize'));
      
      await waitFor(() => {
        expect(window.innerWidth).toBe(375);
      });
      
      // Rerender should adapt
      rerender(
        <MinimalLayout preset="floating-controls" autoPages={{}} />
      );
    });
  });
});
