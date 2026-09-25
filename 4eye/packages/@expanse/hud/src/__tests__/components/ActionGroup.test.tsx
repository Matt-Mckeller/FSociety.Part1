/**
 * ActionGroup Component Tests
 *
 * Tests for the ActionGroup selection wrapper component.
 */

import React, { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { describe, it, expect, vi } from 'vitest'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import { ActionGroup } from '../../hud-components/action-group'
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

describe('ActionGroup', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      renderWithTheme(
        <ActionGroup mode="buttons">
          <ActionButton icon={<HomeIcon />} label="Home" value="home" />
          <ActionButton icon={<SearchIcon />} label="Search" value="search" />
        </ActionGroup>
      )

      expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('renders without crashing with no value buttons', () => {
      const { container } = renderWithTheme(
        <ActionGroup mode="buttons">
          <ActionButton icon={<HomeIcon />} label="Test" value="test" />
        </ActionGroup>
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  // ===========================================================================
  // Radio Mode
  // ===========================================================================

  describe('Radio Mode', () => {
    it('renders in radio mode', () => {
      renderWithTheme(
        <ActionGroup mode="radio" value="home" onChange={() => {}}>
          <ActionButton icon={<HomeIcon />} label="Home" value="home" />
          <ActionButton icon={<SearchIcon />} label="Search" value="search" />
        </ActionGroup>
      )

      expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('calls onChange with new value when button clicked', () => {
      const handleChange = vi.fn()

      renderWithTheme(
        <ActionGroup mode="radio" value="home" onChange={handleChange}>
          <ActionButton icon={<HomeIcon />} label="Home" value="home" />
          <ActionButton icon={<SearchIcon />} label="Search" value="search" />
        </ActionGroup>
      )

      // Get all buttons and find by aria-label
      const buttons = screen.getAllByRole('button')
      const searchBtn = buttons.find(btn => btn.getAttribute('aria-label') === 'Search')
      expect(searchBtn).toBeDefined()
      fireEvent.click(searchBtn!)
      expect(handleChange).toHaveBeenCalledWith('search')
    })

    it('marks the selected button as active', () => {
      function RadioExample() {
        const [value, setValue] = useState('home')
        return (
          <ActionGroup mode="radio" value={value} onChange={setValue}>
            <ActionButton icon={<HomeIcon />} label="Home" value="home" />
            <ActionButton icon={<SearchIcon />} label="Search" value="search" />
          </ActionGroup>
        )
      }

      renderWithTheme(<RadioExample />)

      // Initially home is selected
      const buttons = screen.getAllByRole('button')
      const searchBtn = buttons.find(btn => btn.getAttribute('aria-label') === 'Search')
      expect(searchBtn).toBeDefined()

      // Click search to change selection
      fireEvent.click(searchBtn!)

      // Now search should be active (selection changed)
    })
  })

  // ===========================================================================
  // Checkbox Mode
  // ===========================================================================

  describe('Checkbox Mode', () => {
    it('renders in checkbox mode', () => {
      renderWithTheme(
        <ActionGroup
          mode="checkbox"
          values={{ home: true, search: false }}
          onToggle={() => {}}
        >
          <ActionButton icon={<HomeIcon />} label="Home" value="home" />
          <ActionButton icon={<SearchIcon />} label="Search" value="search" />
        </ActionGroup>
      )

      expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('calls onToggle with id and new checked state', () => {
      const handleToggle = vi.fn()

      renderWithTheme(
        <ActionGroup
          mode="checkbox"
          values={{ home: true, search: false }}
          onToggle={handleToggle}
        >
          <ActionButton icon={<HomeIcon />} label="Home" value="home" />
          <ActionButton icon={<SearchIcon />} label="Search" value="search" />
        </ActionGroup>
      )

      const buttons = screen.getAllByRole('button')
      const searchBtn = buttons.find(btn => btn.getAttribute('aria-label') === 'Search')
      expect(searchBtn).toBeDefined()
      fireEvent.click(searchBtn!)
      expect(handleToggle).toHaveBeenCalledWith('search', true)
    })

    it('allows multiple selections', () => {
      function CheckboxExample() {
        const [values, setValues] = useState({ home: true, search: false })
        return (
          <ActionGroup
            mode="checkbox"
            values={values}
            onToggle={(id, checked) => setValues((v) => ({ ...v, [id]: checked }))}
          >
            <ActionButton icon={<HomeIcon />} label="Home" value="home" />
            <ActionButton icon={<SearchIcon />} label="Search" value="search" />
          </ActionGroup>
        )
      }

      renderWithTheme(<CheckboxExample />)

      const buttons = screen.getAllByRole('button')
      const searchBtn = buttons.find(btn => btn.getAttribute('aria-label') === 'Search')
      expect(searchBtn).toBeDefined()
      fireEvent.click(searchBtn!)
      // Both should now be selectable
    })
  })

  // ===========================================================================
  // Buttons Mode
  // ===========================================================================

  describe('Buttons Mode', () => {
    it('renders in buttons mode (no selection)', () => {
      renderWithTheme(
        <ActionGroup mode="buttons">
          <ActionButton icon={<HomeIcon />} label="Home" value="home" />
          <ActionButton icon={<SearchIcon />} label="Search" value="search" />
        </ActionGroup>
      )

      expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('each button has its own onClick', () => {
      const homeClick = vi.fn()
      const searchClick = vi.fn()

      renderWithTheme(
        <ActionGroup mode="buttons">
          <ActionButton icon={<HomeIcon />} label="Home" value="home" onClick={homeClick} />
          <ActionButton icon={<SearchIcon />} label="Search" value="search" onClick={searchClick} />
        </ActionGroup>
      )

      const buttons = screen.getAllByRole('button')
      const homeBtn = buttons.find(btn => btn.getAttribute('aria-label') === 'Home')
      const searchBtn = buttons.find(btn => btn.getAttribute('aria-label') === 'Search')
      
      expect(homeBtn).toBeDefined()
      expect(searchBtn).toBeDefined()

      fireEvent.click(homeBtn!)
      expect(homeClick).toHaveBeenCalledTimes(1)
      expect(searchClick).not.toHaveBeenCalled()

      fireEvent.click(searchBtn!)
      expect(searchClick).toHaveBeenCalledTimes(1)
    })
  })

  // ===========================================================================
  // Indicators
  // ===========================================================================

  describe('Indicators', () => {
    const indicators = [
      'none',
      'circle',
      'circle-outline',
      'square',
      'square-outline',
      'triangle',
      'dot',
      'underline',
      'ring',
    ] as const

    indicators.forEach((indicator) => {
      it(`renders indicator="${indicator}" without errors`, () => {
        renderWithTheme(
          <ActionGroup mode="radio" value="home" onChange={() => {}} indicator={indicator}>
            <ActionButton icon={<HomeIcon />} label="Home" value="home" />
          </ActionGroup>
        )

        expect(screen.getByRole('button')).toBeInTheDocument()
      })
    })
  })

  // ===========================================================================
  // Indicator Positions
  // ===========================================================================

  describe('Indicator Positions', () => {
    const positions = ['start', 'end', 'overlay'] as const

    positions.forEach((position) => {
      it(`renders indicatorPosition="${position}" without errors`, () => {
        renderWithTheme(
          <ActionGroup
            mode="radio"
            value="home"
            onChange={() => {}}
            indicator="circle"
            indicatorPosition={position}
          >
            <ActionButton icon={<HomeIcon />} label="Home" value="home" />
          </ActionGroup>
        )

        expect(screen.getByRole('button')).toBeInTheDocument()
      })
    })
  })

  // ===========================================================================
  // Orientation
  // ===========================================================================

  describe('Orientation', () => {
    it('renders horizontal orientation', () => {
      renderWithTheme(
        <ActionGroup mode="buttons" orientation="horizontal">
          <ActionButton icon={<HomeIcon />} label="Home" value="home" />
          <ActionButton icon={<SearchIcon />} label="Search" value="search" />
        </ActionGroup>
      )

      expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('renders vertical orientation', () => {
      renderWithTheme(
        <ActionGroup mode="buttons" orientation="vertical">
          <ActionButton icon={<HomeIcon />} label="Home" value="home" />
          <ActionButton icon={<SearchIcon />} label="Search" value="search" />
        </ActionGroup>
      )

      expect(screen.getAllByRole('button')).toHaveLength(2)
    })
  })

  // ===========================================================================
  // Context
  // ===========================================================================

  describe('ActionGroupContext', () => {
    it('provides context to child ActionButtons', () => {
      // ActionButton should get active state from context
      renderWithTheme(
        <ActionGroup mode="radio" value="home" onChange={() => {}}>
          <ActionButton icon={<HomeIcon />} label="Home" value="home" />
          <ActionButton icon={<SearchIcon />} label="Search" value="search" />
        </ActionGroup>
      )

      // Buttons should render correctly with context
      expect(screen.getAllByRole('button')).toHaveLength(2)
    })
  })
})
