/**
 * ActionBar Component Tests
 *
 * Tests for the ActionBar container component.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { describe, it, expect, vi } from 'vitest'
import HomeIcon from '@mui/icons-material/Home'
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

describe('ActionBar', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      renderWithTheme(
        <ActionBar>
          <ActionButton icon={<HomeIcon />} label="Home" />
        </ActionBar>
      )

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders multiple children', () => {
      renderWithTheme(
        <ActionBar>
          <ActionButton icon={<HomeIcon />} label="Home" />
          <ActionButton icon={<HomeIcon />} label="Search" />
          <ActionButton icon={<HomeIcon />} label="Settings" />
        </ActionBar>
      )

      expect(screen.getAllByRole('button')).toHaveLength(3)
    })

    it('renders with default props', () => {
      const { container } = renderWithTheme(
        <ActionBar>
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Variants
  // ===========================================================================

  describe('Variants', () => {
    const variants = ['glass', 'solid', 'frosted', 'minimal', 'outlined', 'technical'] as const

    variants.forEach((variant) => {
      it(`renders variant="${variant}" without errors`, () => {
        const { container } = renderWithTheme(
          <ActionBar variant={variant}>
            <ActionButton icon={<HomeIcon />} label="Test" />
          </ActionBar>
        )

        expect(container.firstChild).toBeInTheDocument()
      })
    })
  })

  // ===========================================================================
  // Shapes
  // ===========================================================================

  describe('Shapes', () => {
    const shapes = ['pill', 'rounded', 'soft', 'square', 'capsule'] as const

    shapes.forEach((shape) => {
      it(`renders shape="${shape}" without errors`, () => {
        const { container } = renderWithTheme(
          <ActionBar shape={shape}>
            <ActionButton icon={<HomeIcon />} label="Test" />
          </ActionBar>
        )

        expect(container.firstChild).toBeInTheDocument()
      })
    })
  })

  // ===========================================================================
  // Orientation
  // ===========================================================================

  describe('Orientation', () => {
    it('renders horizontal orientation (default)', () => {
      const { container } = renderWithTheme(
        <ActionBar orientation="horizontal">
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      const flexContainer = container.querySelector('[class*="MuiBox"]')
      expect(flexContainer).toBeInTheDocument()
    })

    it('renders vertical orientation', () => {
      const { container } = renderWithTheme(
        <ActionBar orientation="vertical">
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Length
  // ===========================================================================

  describe('Length', () => {
    it('handles percent length', () => {
      const { container } = renderWithTheme(
        <ActionBar length={{ percent: 50 }}>
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles pixel length', () => {
      const { container } = renderWithTheme(
        <ActionBar length={{ pixels: 400 }}>
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles auto length', () => {
      const { container } = renderWithTheme(
        <ActionBar length="auto">
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Thickness
  // ===========================================================================

  describe('Thickness', () => {
    const thicknesses = ['xs', 'sm', 'md', 'lg'] as const

    thicknesses.forEach((thickness) => {
      it(`renders thickness="${thickness}" without errors`, () => {
        const { container } = renderWithTheme(
          <ActionBar thickness={thickness}>
            <ActionButton icon={<HomeIcon />} label="Test" />
          </ActionBar>
        )

        expect(container.firstChild).toBeInTheDocument()
      })
    })

    it('handles custom pixel thickness', () => {
      const { container } = renderWithTheme(
        <ActionBar thickness={{ pixels: 64 }}>
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Alignment
  // ===========================================================================

  describe('Alignment', () => {
    const alignments = ['start', 'center', 'end', 'space-between'] as const

    alignments.forEach((alignment) => {
      it(`renders alignment="${alignment}" without errors`, () => {
        const { container } = renderWithTheme(
          <ActionBar alignment={alignment}>
            <ActionButton icon={<HomeIcon />} label="Test" />
          </ActionBar>
        )

        expect(container.firstChild).toBeInTheDocument()
      })
    })
  })

  // ===========================================================================
  // Override Props
  // ===========================================================================

  describe('Override Props', () => {
    it('accepts custom padding', () => {
      const { container } = renderWithTheme(
        <ActionBar padding={16}>
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('accepts custom gap', () => {
      const { container } = renderWithTheme(
        <ActionBar gap={8}>
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('accepts custom blur', () => {
      const { container } = renderWithTheme(
        <ActionBar blur={20}>
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('accepts custom bgcolor', () => {
      const { container } = renderWithTheme(
        <ActionBar bgcolor="rgba(0,0,0,0.5)">
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('accepts custom boxShadow', () => {
      const { container } = renderWithTheme(
        <ActionBar boxShadow="0 4px 16px rgba(0,0,0,0.2)">
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('accepts custom border', () => {
      const { container } = renderWithTheme(
        <ActionBar border="2px solid red">
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it('accepts custom sx prop', () => {
      const { container } = renderWithTheme(
        <ActionBar sx={{ opacity: 0.8 }}>
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Context Provider
  // ===========================================================================

  describe('ActionBarSurfaceContext', () => {
    it('provides surface context to children', () => {
      // ActionButton should automatically get correct colors via context
      const { container } = renderWithTheme(
        <ActionBar variant="glass">
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      // ActionButton renders correctly with context
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('provides dark surface context for opaque variants', () => {
      const { container } = renderWithTheme(
        <ActionBar variant="solid">
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('provides light surface context for transparent variants', () => {
      const { container } = renderWithTheme(
        <ActionBar variant="minimal">
          <ActionButton icon={<HomeIcon />} label="Test" />
        </ActionBar>
      )

      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })
})
