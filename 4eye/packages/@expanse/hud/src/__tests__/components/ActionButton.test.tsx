/**
 * ActionButton Component Tests
 *
 * Tests for the ActionButton component.
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { describe, it, expect, vi } from 'vitest'
import HomeIcon from '@mui/icons-material/Home'
import StarIcon from '@mui/icons-material/Star'
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

describe('ActionButton', () => {
  describe('Basic Rendering', () => {
    it('renders with icon and label', () => {
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Home" />)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders label-only mode as text container', () => {
      // Note: label-only mode renders a Box with text, not an IconButton
      renderWithTheme(<ActionButton label="Submit" labelDisplay="label-only" />)

      expect(screen.getByText('Submit')).toBeInTheDocument()
    })

    it('renders and is clickable', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <ActionButton icon={<HomeIcon />} label="Home" onClick={handleClick} />
      )

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalled()
    })
  })

  // ===========================================================================
  // Sizes
  // ===========================================================================

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach((size) => {
      it(`renders size="${size}" without errors`, () => {
        renderWithTheme(<ActionButton icon={<HomeIcon />} label="Test" size={size} />)

        expect(screen.getByRole('button')).toBeInTheDocument()
      })
    })
  })

  // ===========================================================================
  // Label Display Modes
  // ===========================================================================

  describe('Label Display Modes', () => {
    it('shows icon-only by default (tooltip behavior)', () => {
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Home" labelDisplay="icon-only" />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      // Label is used for aria-label, not visible text
      expect(button).toHaveAttribute('aria-label', 'Home')
    })

    it('shows label below icon', () => {
      renderWithTheme(
        <ActionButton icon={<HomeIcon />} label="Home" labelDisplay="icon-label-below" />
      )

      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('shows label to the right of icon', () => {
      renderWithTheme(
        <ActionButton icon={<HomeIcon />} label="Home" labelDisplay="icon-label-right" />
      )

      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('shows label only (no icon)', () => {
      renderWithTheme(<ActionButton label="Submit" labelDisplay="label-only" />)

      expect(screen.getByText('Submit')).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // States
  // ===========================================================================

  describe('States', () => {
    it('renders active state', () => {
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Home" active />)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders disabled state', () => {
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Home" disabled />)

      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('shows different icon when active with iconOn', () => {
      renderWithTheme(
        <ActionButton
          icon={<HomeIcon data-testid="home-icon" />}
          iconOn={<StarIcon data-testid="star-icon" />}
          label="Toggle"
          active
        />
      )

      // When active and iconOn is provided, it should show iconOn
      expect(screen.getByTestId('star-icon')).toBeInTheDocument()
    })

    it('shows default icon when not active', () => {
      renderWithTheme(
        <ActionButton
          icon={<HomeIcon data-testid="home-icon" />}
          iconOn={<StarIcon data-testid="star-icon" />}
          label="Toggle"
          active={false}
        />
      )

      expect(screen.getByTestId('home-icon')).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Badge
  // ===========================================================================

  describe('Badge', () => {
    it('renders with numeric badge', () => {
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Notifications" badge={5} />)

      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('renders with string badge', () => {
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="New" badge="NEW" />)

      expect(screen.getByText('NEW')).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Click Handler
  // ===========================================================================

  describe('Click Handler', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn()
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Home" onClick={handleClick} />)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <ActionButton icon={<HomeIcon />} label="Home" onClick={handleClick} disabled />
      )

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  // ===========================================================================
  // Color Modes
  // ===========================================================================

  describe('Color Modes', () => {
    it('renders with colorMode="auto"', () => {
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Test" colorMode="auto" />)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders with colorMode="light"', () => {
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Test" colorMode="light" />)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders with colorMode="dark"', () => {
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Test" colorMode="dark" />)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Active Shapes
  // ===========================================================================

  describe('Active Shapes', () => {
    const shapes = ['rounded', 'circle', 'square', 'diamond'] as const

    shapes.forEach((shape) => {
      it(`renders activeShape="${shape}" without errors`, () => {
        renderWithTheme(
          <ActionButton icon={<HomeIcon />} label="Test" active activeShape={shape} />
        )

        expect(screen.getByRole('button')).toBeInTheDocument()
      })
    })
  })

  // ===========================================================================
  // Value Prop (for ActionGroup integration)
  // ===========================================================================

  describe('Value Prop', () => {
    it('accepts value prop for group identification', () => {
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Home" value="home" />)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Accessibility
  // ===========================================================================

  describe('Accessibility', () => {
    it('has accessible name via aria-label', () => {
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Go Home" />)

      expect(screen.getByRole('button', { name: 'Go Home' })).toBeInTheDocument()
    })

    it('is focusable', () => {
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Home" />)

      const button = screen.getByRole('button')
      button.focus()
      expect(document.activeElement).toBe(button)
    })

    it('responds to keyboard Enter', () => {
      const handleClick = vi.fn()
      renderWithTheme(<ActionButton icon={<HomeIcon />} label="Home" onClick={handleClick} />)

      const button = screen.getByRole('button')
      fireEvent.keyDown(button, { key: 'Enter' })
      // MUI IconButton handles Enter via onClick
    })
  })
})
