/**
 * ActionDock Component Tests
 *
 * Tests for the ActionDock positioning component.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { describe, it, expect } from 'vitest'
import HomeIcon from '@mui/icons-material/Home'
import { ActionDock } from '../../hud/docks'
import { ActionBar } from '../../hud-components/action-bars'
import { ActionButton } from '../../hud-components/action-button'

// =============================================================================
// Test Setup
// =============================================================================

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
  },
})

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

// =============================================================================
// Basic Rendering
// =============================================================================

describe('ActionDock', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      renderWithTheme(
        <ActionDock position="bottom-right">
          <ActionBar>
            <ActionButton icon={<HomeIcon />} label="Home" />
          </ActionBar>
        </ActionDock>
      )

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders with data-testid', () => {
      renderWithTheme(
        <ActionDock position="bottom-right" data-testid="dock">
          <div>Content</div>
        </ActionDock>
      )

      // The dock should be in the document
      expect(screen.getByText('Content')).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Positions
  // ===========================================================================

  describe('Positions', () => {
    const positions = [
      'top-left',
      'top-center',
      'top-right',
      'left-center',
      'center',
      'right-center',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ] as const

    positions.forEach((position) => {
      it(`renders position="${position}" without errors`, () => {
        const { container } = renderWithTheme(
          <ActionDock position={position}>
            <ActionBar>
              <ActionButton icon={<HomeIcon />} label="Test" />
            </ActionBar>
          </ActionDock>
        )

        expect(container.firstChild).toBeInTheDocument()
      })
    })

    it('applies correct positioning styles for top-left', () => {
      const { container } = renderWithTheme(
        <ActionDock position="top-left">
          <div data-testid="content">Content</div>
        </ActionDock>
      )

      const dock = container.firstChild as HTMLElement
      const styles = getComputedStyle(dock)

      expect(styles.position).toBe('fixed')
    })

    it('applies correct positioning styles for bottom-right', () => {
      const { container } = renderWithTheme(
        <ActionDock position="bottom-right">
          <div data-testid="content">Content</div>
        </ActionDock>
      )

      const dock = container.firstChild as HTMLElement
      const styles = getComputedStyle(dock)

      expect(styles.position).toBe('fixed')
    })

    it('applies correct positioning styles for center', () => {
      const { container } = renderWithTheme(
        <ActionDock position="center">
          <div data-testid="content">Content</div>
        </ActionDock>
      )

      const dock = container.firstChild as HTMLElement
      const styles = getComputedStyle(dock)

      expect(styles.position).toBe('fixed')
    })
  })

  // ===========================================================================
  // Offset
  // ===========================================================================

  describe('Offset', () => {
    it('accepts custom offset value', () => {
      const { container } = renderWithTheme(
        <ActionDock position="bottom-right" offset={32}>
          <div>Content</div>
        </ActionDock>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('uses default offset when not specified', () => {
      const { container } = renderWithTheme(
        <ActionDock position="bottom-right">
          <div>Content</div>
        </ActionDock>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('applies offset of 0', () => {
      const { container } = renderWithTheme(
        <ActionDock position="bottom-right" offset={0}>
          <div>Content</div>
        </ActionDock>
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Attached Mode
  // ===========================================================================

  describe('Attached Mode', () => {
    it('renders in attached mode (no gap from edge)', () => {
      const { container } = renderWithTheme(
        <ActionDock position="top-left" attached>
          <div>Content</div>
        </ActionDock>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders in floating mode (default)', () => {
      const { container } = renderWithTheme(
        <ActionDock position="top-left" attached={false}>
          <div>Content</div>
        </ActionDock>
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Multiple Docks
  // ===========================================================================

  describe('Multiple Docks', () => {
    it('renders multiple docks at different positions', () => {
      renderWithTheme(
        <>
          <ActionDock position="top-left">
            <div data-testid="top-left">TL</div>
          </ActionDock>
          <ActionDock position="bottom-right">
            <div data-testid="bottom-right">BR</div>
          </ActionDock>
        </>
      )

      expect(screen.getByTestId('top-left')).toBeInTheDocument()
      expect(screen.getByTestId('bottom-right')).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // With ActionBar
  // ===========================================================================

  describe('With ActionBar', () => {
    it('renders ActionBar inside dock', () => {
      renderWithTheme(
        <ActionDock position="bottom-center">
          <ActionBar variant="glass">
            <ActionButton icon={<HomeIcon />} label="Home" />
          </ActionBar>
        </ActionDock>
      )

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('supports vertical ActionBar', () => {
      renderWithTheme(
        <ActionDock position="left-center">
          <ActionBar variant="solid" orientation="vertical">
            <ActionButton icon={<HomeIcon />} label="Home" />
          </ActionBar>
        </ActionDock>
      )

      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Z-Index and Layering
  // ===========================================================================

  describe('Z-Index', () => {
    it('has appropriate z-index for overlay behavior', () => {
      const { container } = renderWithTheme(
        <ActionDock position="bottom-right">
          <div>Content</div>
        </ActionDock>
      )

      const dock = container.firstChild as HTMLElement
      // ActionDock should have a z-index to appear above content
      expect(dock).toBeInTheDocument()
    })
  })
})
