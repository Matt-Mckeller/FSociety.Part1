/**
 * TileContainer tests — verify fit vs scroll layout semantics and
 * reactivity to bottom-chrome inset changes (e.g. AI chat opening).
 */

import React from "react"
import { render, screen, act } from "@testing-library/react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { describe, it, expect } from "vitest"

import { TileContainer } from "../../hud/tiles/TileContainer"
import {
  HudInsetsProvider,
  useRegisterHudInset,
} from "../../hud/slots/HudInsetsProvider"

// =============================================================================
// Test scaffolding
// =============================================================================

const theme = createTheme({ palette: { mode: "light" } })

/**
 * Test harness that registers a configurable bottom inset before rendering
 * the container. Lets us simulate "chrome takes 80px" without standing up
 * the whole BottomChromeStack.
 */
function BottomInsetClaim({ size }: { size: number }) {
  useRegisterHudInset({
    id: "test-bottom-chrome",
    edge: "bottom",
    size,
    label: "test bottom chrome",
  })
  return null
}

function renderWithProviders(
  ui: React.ReactElement,
  { bottomInset = 0 }: { bottomInset?: number } = {},
) {
  return render(
    <ThemeProvider theme={theme}>
      <HudInsetsProvider>
        <BottomInsetClaim size={bottomInset} />
        {ui}
      </HudInsetsProvider>
    </ThemeProvider>,
  )
}

function getContainer(): HTMLElement {
  const el = document.querySelector<HTMLElement>("[data-tile-container]")
  if (!el) throw new Error("TileContainer not in document")
  return el
}

// =============================================================================
// Tests
// =============================================================================

describe("TileContainer", () => {
  describe("fit mode (default)", () => {
    it("renders children", () => {
      renderWithProviders(
        <TileContainer>
          <div>hello</div>
        </TileContainer>,
      )
      expect(screen.getByText("hello")).toBeInTheDocument()
    })

    it("disables overflow on both axes", () => {
      renderWithProviders(<TileContainer mode="fit" />)
      const el = getContainer()
      expect(el.style.overflowY).toBe("hidden")
      expect(el.style.overflowX).toBe("hidden")
    })

    it("bounds bottom edge at the registered chrome inset", () => {
      renderWithProviders(<TileContainer mode="fit" />, { bottomInset: 80 })
      const el = getContainer()
      expect(el.style.bottom).toBe("80px")
    })

    it("uses zero bottom when no chrome is claimed", () => {
      renderWithProviders(<TileContainer mode="fit" />)
      const el = getContainer()
      expect(el.style.bottom).toBe("0px")
    })

    it("tags the DOM with the active mode", () => {
      renderWithProviders(<TileContainer mode="fit" />)
      expect(getContainer().dataset.tileContainer).toBe("fit")
    })
  })

  describe("scroll mode", () => {
    it("enables vertical scroll only", () => {
      renderWithProviders(<TileContainer mode="scroll" />)
      const el = getContainer()
      expect(el.style.overflowY).toBe("auto")
      expect(el.style.overflowX).toBe("hidden")
    })

    it("runs to viewport bottom (bottom: 0)", () => {
      renderWithProviders(<TileContainer mode="scroll" />, {
        bottomInset: 80,
      })
      const el = getContainer()
      expect(el.style.bottom).toBe("0px")
    })

    it("adds bottom padding equal to the chrome inset so content can scroll clear", () => {
      renderWithProviders(<TileContainer mode="scroll" />, {
        bottomInset: 120,
      })
      const el = getContainer()
      expect(el.style.paddingBottom).toBe("120px")
    })

    it("tags the DOM with the active mode", () => {
      renderWithProviders(<TileContainer mode="scroll" />)
      expect(getContainer().dataset.tileContainer).toBe("scroll")
    })
  })

  describe("reactivity", () => {
    it("fit-mode bottom updates when bottom chrome size changes", () => {
      function Harness({ size }: { size: number }) {
        return (
          <ThemeProvider theme={theme}>
            <HudInsetsProvider>
              <BottomInsetClaim size={size} />
              <TileContainer mode="fit" />
            </HudInsetsProvider>
          </ThemeProvider>
        )
      }
      const { rerender } = render(<Harness size={40} />)
      expect(getContainer().style.bottom).toBe("40px")
      act(() => {
        rerender(<Harness size={200} />)
      })
      expect(getContainer().style.bottom).toBe("200px")
    })

    it("scroll-mode padding updates when bottom chrome size changes", () => {
      function Harness({ size }: { size: number }) {
        return (
          <ThemeProvider theme={theme}>
            <HudInsetsProvider>
              <BottomInsetClaim size={size} />
              <TileContainer mode="scroll" />
            </HudInsetsProvider>
          </ThemeProvider>
        )
      }
      const { rerender } = render(<Harness size={64} />)
      expect(getContainer().style.paddingBottom).toBe("64px")
      act(() => {
        rerender(<Harness size={240} />)
      })
      expect(getContainer().style.paddingBottom).toBe("240px")
    })
  })
})
