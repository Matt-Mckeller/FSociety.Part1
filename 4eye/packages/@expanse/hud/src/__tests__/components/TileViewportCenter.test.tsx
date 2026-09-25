/**
 * TileViewportCenter tests — verify offset math and reactivity to
 * asymmetric top / bottom HUD insets.
 */

import React from "react"
import { render, act } from "@testing-library/react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { describe, it, expect } from "vitest"

import { TileViewportCenter } from "../../hud/tiles/TileViewportCenter"
import {
  HudInsetsProvider,
  useRegisterHudInset,
} from "../../hud/slots/HudInsetsProvider"
import type { HudInsetEdge } from "../../hud/slots/HudInsetsProvider"

// =============================================================================
// Test scaffolding
// =============================================================================

const theme = createTheme({ palette: { mode: "light" } })

function InsetClaim({
  edge,
  size,
  id,
}: {
  edge: HudInsetEdge
  size: number
  id: string
}) {
  useRegisterHudInset({ id, edge, size, label: `test ${edge}` })
  return null
}

function renderWithInsets(
  ui: React.ReactElement,
  { top = 0, bottom = 0 }: { top?: number; bottom?: number } = {},
) {
  return render(
    <ThemeProvider theme={theme}>
      <HudInsetsProvider>
        <InsetClaim id="t" edge="top" size={top} />
        <InsetClaim id="b" edge="bottom" size={bottom} />
        {ui}
      </HudInsetsProvider>
    </ThemeProvider>,
  )
}

function getCenterer(): HTMLElement {
  const el = document.querySelector<HTMLElement>("[data-tile-viewport-center]")
  if (!el) throw new Error("TileViewportCenter not in document")
  return el
}

// =============================================================================
// Tests
// =============================================================================

describe("TileViewportCenter", () => {
  it("applies zero translation when insets are equal", () => {
    renderWithInsets(
      <TileViewportCenter>
        <div>child</div>
      </TileViewportCenter>,
      { top: 50, bottom: 50 },
    )

    const el = getCenterer()
    expect(el.style.transform).toBe("translateY(0px)")
    expect(el.dataset.vpOffset).toBe("0")
  })

  it("applies zero translation when there are no insets", () => {
    renderWithInsets(
      <TileViewportCenter>
        <div>child</div>
      </TileViewportCenter>,
    )

    const el = getCenterer()
    expect(el.style.transform).toBe("translateY(0px)")
  })

  it("translates content downward when bottom inset > top inset", () => {
    // bottom 100, top 20 → offset = (100 - 20) / 2 = 40
    renderWithInsets(
      <TileViewportCenter>
        <div>child</div>
      </TileViewportCenter>,
      { top: 20, bottom: 100 },
    )

    const el = getCenterer()
    expect(el.style.transform).toBe("translateY(40px)")
    expect(el.dataset.vpOffset).toBe("40")
  })

  it("translates content upward when top inset > bottom inset", () => {
    // bottom 20, top 100 → offset = (20 - 100) / 2 = -40
    renderWithInsets(
      <TileViewportCenter>
        <div>child</div>
      </TileViewportCenter>,
      { top: 100, bottom: 20 },
    )

    const el = getCenterer()
    expect(el.style.transform).toBe("translateY(-40px)")
  })

  it("establishes a full-bleed absolute centering surface", () => {
    renderWithInsets(
      <TileViewportCenter>
        <div>child</div>
      </TileViewportCenter>,
      { top: 0, bottom: 80 },
    )

    const el = getCenterer()
    expect(el.style.position).toBe("absolute")
    expect(el.style.top).toBe("0px")
    expect(el.style.left).toBe("0px")
    expect(el.style.right).toBe("0px")
    expect(el.style.bottom).toBe("0px")
    expect(el.style.display).toBe("flex")
    expect(el.style.alignItems).toBe("center")
    expect(el.style.justifyContent).toBe("center")
  })

  it("reacts to chrome inset changes", () => {
    // Start symmetric, then grow the bottom chrome (e.g. AI chat opens).
    function Harness({
      top,
      bottom,
    }: {
      top: number
      bottom: number
    }) {
      return (
        <ThemeProvider theme={theme}>
          <HudInsetsProvider>
            <InsetClaim id="t" edge="top" size={top} />
            <InsetClaim id="b" edge="bottom" size={bottom} />
            <TileViewportCenter>
              <div>child</div>
            </TileViewportCenter>
          </HudInsetsProvider>
        </ThemeProvider>
      )
    }

    const { rerender } = render(<Harness top={40} bottom={40} />)
    expect(getCenterer().style.transform).toBe("translateY(0px)")

    act(() => {
      rerender(<Harness top={40} bottom={200} />)
    })
    // (200 - 40) / 2 = 80
    expect(getCenterer().style.transform).toBe("translateY(80px)")
  })
})
