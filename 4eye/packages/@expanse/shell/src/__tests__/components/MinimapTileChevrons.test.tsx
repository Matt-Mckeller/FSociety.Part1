/**
 * MinimapTile — chevron rendering tests
 *
 * Verifies that all four directional chevrons appear in the DOM when the tile
 * is active and navigation is enabled in each direction.
 */

import React from "react"
import { render, screen } from "@testing-library/react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { describe, it, expect } from "vitest"
import { MinimapTile } from "@expanse/map/minimap/components/MinimapTile"
import { createMinimapTileConfig } from "@expanse/theme/component-themes/factories"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const theme = createTheme({
  palette: { mode: "light" },
  components: {
    ExpanseMinimapTile: createMinimapTileConfig(createTheme().palette),
  },
})

const renderTile = (props: Partial<React.ComponentProps<typeof MinimapTile>> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <MinimapTile
        size={48}
        label="Test"
        category="primary"
        isActive
        showNavigationChevrons
        canMoveUp
        canMoveDown
        canMoveLeft
        canMoveRight
        onClick={() => undefined}
        {...props}
      />
    </ThemeProvider>,
  )

// ---------------------------------------------------------------------------
// Aria-label helpers — MUI KeyboardArrow* icons render SVG with a data-testid
// from MUI, so we query by title or by svg role.
// ---------------------------------------------------------------------------

/** Returns all SVG elements inside a rendered MinimapTile. */
const getAllSvgs = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("svg"))

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("MinimapTile — chevron rendering", () => {
  it("renders exactly 4 chevron icons when isActive=true and all canMove* are true", () => {
    const { container } = renderTile()
    // The chip itself has 1 SVG (the icon slot — but category=primary has no icon set,
    // so with no Icon prop and a firstLetter fallback, there are no SVGs from the chip).
    // The 4 chevrons each render a MUI SvgIcon → 4 SVG elements.
    const svgs = getAllSvgs(container)
    expect(svgs).toHaveLength(4)
  })

  it("renders 0 chevrons when isActive=false", () => {
    const { container } = renderTile({ isActive: false })
    const svgs = getAllSvgs(container)
    expect(svgs).toHaveLength(0)
  })

  it("renders 0 chevrons when showNavigationChevrons=false", () => {
    const { container } = renderTile({ showNavigationChevrons: false })
    const svgs = getAllSvgs(container)
    expect(svgs).toHaveLength(0)
  })

  it("renders only 2 chevrons (up+down) when canMoveLeft=false and canMoveRight=false", () => {
    const { container } = renderTile({ canMoveLeft: false, canMoveRight: false })
    const svgs = getAllSvgs(container)
    expect(svgs).toHaveLength(2)
  })

  it("renders only 2 chevrons (left+right) when canMoveUp=false and canMoveDown=false", () => {
    const { container } = renderTile({ canMoveUp: false, canMoveDown: false })
    const svgs = getAllSvgs(container)
    expect(svgs).toHaveLength(2)
  })

  it("renders all 4 chevrons even when isEmpty=false and no category", () => {
    const { container } = renderTile({ category: undefined, color: "#3b82f6" })
    const svgs = getAllSvgs(container)
    expect(svgs).toHaveLength(4)
  })

  it("renders 0 chevrons when isEmpty=true (no chevrons on empty tiles)", () => {
    const { container } = renderTile({ isEmpty: true })
    const svgs = getAllSvgs(container)
    expect(svgs).toHaveLength(0)
  })

  it("all 4 chevrons render in iconAndLabel mode with a label", () => {
    const { container } = renderTile({ content: "iconAndLabel", label: "Strategy" })
    const svgs = getAllSvgs(container)
    expect(svgs).toHaveLength(4)
  })
})
