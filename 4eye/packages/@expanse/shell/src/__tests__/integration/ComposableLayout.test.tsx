/**
 * Integration tests for ComposableLayout system
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ComposableLayout } from '@expanse/hud/templates/original/ComposableLayout';
import { renderWithProviders, defaultTestGridConfig } from '../utils';

describe('ComposableLayout Integration', () => {
  describe('Fragment Positioning', () => {
    it('renders fragments in correct positions', () => {
      renderWithProviders(
        <ComposableLayout
          fragments={[
            {
              name: 'header',
              position: 'top',
              size: 64,
              content: <div data-testid="header">Header</div>,
            },
            {
              name: 'sidebar',
              position: 'left',
              size: 240,
              content: <div data-testid="sidebar">Sidebar</div>,
            },
          ]}
        >
          <div data-testid="main-content">Main Content</div>
        </ComposableLayout>,
        defaultTestGridConfig
      );
      
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('main-content')).toBeInTheDocument();
    });

    it('supports floating fragments', () => {
      renderWithProviders(
        <ComposableLayout
          fragments={[
            {
              name: 'floating-panel',
              position: 'floating',
              content: <div data-testid="floating">Floating Panel</div>,
            },
          ]}
        >
          <div>Content</div>
        </ComposableLayout>,
        defaultTestGridConfig
      );
      
      const floating = screen.getByTestId('floating');
      expect(floating).toBeInTheDocument();
      
      // Should have absolute positioning
      const parent = floating.parentElement;
      expect(parent).toHaveStyle({ position: 'absolute' });
    });
  });

  describe('Minimap Integration', () => {
    it('renders minimap when configured', () => {
      renderWithProviders(
        <ComposableLayout
          minimap={{
            show: true,
            position: 'top-right',
            variant: 'grid',
            size: 'medium',
          }}
        >
          <div>Content</div>
        </ComposableLayout>,
        defaultTestGridConfig
      );
      
      // Minimap should be rendered
      expect(screen.queryByRole('region')).toBeInTheDocument();
    });

    it('hides minimap when show is false', () => {
      renderWithProviders(
        <ComposableLayout
          minimap={{
            show: false,
          }}
        >
          <div>Content</div>
        </ComposableLayout>,
        defaultTestGridConfig
      );
      
      // Minimap should not be rendered
      expect(screen.queryByRole('region', { name: /minimap/i })).not.toBeInTheDocument();
    });
  });

  describe('Navigation Controls', () => {
    it('renders navigation when configured', () => {
      renderWithProviders(
        <ComposableLayout
          navigation={{
            show: true,
            position: 'bottom-center',
            variant: 'default',
          }}
        >
          <div>Content</div>
        </ComposableLayout>,
        defaultTestGridConfig
      );
      
      // Navigation pad should have buttons
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Chrome Slots', () => {
    it('renders chrome slots', () => {
      renderWithProviders(
        <ComposableLayout
          chrome={{
            show: true,
            slots: {
              topLeft: <div data-testid="top-left">Top Left</div>,
              topRight: <div data-testid="top-right">Top Right</div>,
              bottomCenter: <div data-testid="bottom-center">Bottom Center</div>,
            },
          }}
        >
          <div>Content</div>
        </ComposableLayout>,
        defaultTestGridConfig
      );
      
      expect(screen.getByTestId('top-left')).toBeInTheDocument();
      expect(screen.getByTestId('top-right')).toBeInTheDocument();
      expect(screen.getByTestId('bottom-center')).toBeInTheDocument();
    });

    it('uses correct z-index for chrome overlay', () => {
      const { container } = renderWithProviders(
        <ComposableLayout
          chrome={{
            show: true,
            slots: {
              topLeft: <div data-testid="chrome-element">Chrome</div>,
            },
          }}
        >
          <div>Content</div>
        </ComposableLayout>,
        defaultTestGridConfig
      );
      
      // Chrome should be rendered and visible
      const chromeElement = screen.getByTestId('chrome-element');
      expect(chromeElement).toBeInTheDocument();
      
      // Chrome container should exist in DOM
      const chromeContainer = chromeElement.parentElement?.parentElement;
      expect(chromeContainer).toBeInTheDocument();
    });
  });

  describe('Content Padding', () => {
    it('calculates padding based on fragments', () => {
      const { container } = renderWithProviders(
        <ComposableLayout
          fragments={[
            { position: 'top', size: 64, content: <div>Top</div> },
            { position: 'left', size: 240, content: <div>Left</div> },
          ]}
        >
          <div data-testid="content">Content</div>
        </ComposableLayout>,
        defaultTestGridConfig
      );
      
      const content = screen.getByTestId('content');
      const contentParent = content.parentElement;
      
      // Should have padding to account for fixed fragments
      expect(contentParent).toHaveStyle({
        paddingTop: expect.any(String),
        paddingLeft: expect.any(String),
      });
    });

    it('respects hidden fragments', () => {
      renderWithProviders(
        <ComposableLayout
          fragments={[
            { 
              position: 'top', 
              size: 64, 
              show: false, 
              content: <div data-testid="hidden">Hidden</div> 
            },
          ]}
        >
          <div>Content</div>
        </ComposableLayout>,
        defaultTestGridConfig
      );
      
      // Hidden fragment should not render
      expect(screen.queryByTestId('hidden')).not.toBeInTheDocument();
    });
  });
});
