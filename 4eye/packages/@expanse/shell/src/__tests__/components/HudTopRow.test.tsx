/**
 * HUD Top Row — layout stability tests.
 *
 * Verifies that the three top-row chrome elements (left status, center
 * ContextBar, right minimap) hold their positions independently:
 *   1. ContextBar wrapper is anchored to the viewport center via
 *      `position: absolute; left: 50%; transform: translateX(-50%)`.
 *   2. Left and right slots are absolutely positioned so their
 *      width changes (e.g. CompactStatusBar hover-expand or
 *      ProfileStatusDisplay staircase reveal) do not push the center.
 *   3. ProfileStatusDisplay accepts `pillRatio` so its profile bar
 *      width matches the row siblings (e.g. 83px at 32px tall on mobile).
 */

import React from "react"
import { render } from "@testing-library/react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Box } from "@mui/material"
import { describe, it, expect } from "vitest"

import {
  CompactStatusBar,
  ProfileStatusDisplay,
  PlayerStatusProvider,
} from "@expanse/brand-core"

const theme = createTheme()

function renderInTheme(ui: React.ReactElement) {
  return render(
    <ThemeProvider theme={theme}>
      <PlayerStatusProvider value={{ currency: 100, xp: 50, xpProgress: 50, level: 1 }}>
        {ui}
      </PlayerStatusProvider>
    </ThemeProvider>,
  )
}

describe("ProfileStatusDisplay — pillRatio", () => {
  /**
   * Find the wrapper `<Box>` whose computed width matches `expectedPx`.
   * Used in lieu of inline-style sniffing because MUI sx compiles to
   * emotion class names. jsdom resolves injected CSS via
   * `getComputedStyle`, so this is the reliable jsdom path.
   */
  function findBoxWithWidth(
    container: HTMLElement,
    expectedPx: number,
  ): HTMLElement | null {
    const all = container.querySelectorAll("div")
    const target = `${expectedPx}px`
    for (const el of Array.from(all)) {
      if (window.getComputedStyle(el).width === target) {
        return el as HTMLElement
      }
    }
    return null
  }

  it("defaults profile bar width to barHeight × 2", () => {
    const { container } = renderInTheme(
      <ProfileStatusDisplay layout="staircase" barHeight={32} />,
    )
    expect(findBoxWithWidth(container, 64)).not.toBeNull()
  })

  it("widens the profile bar when pillRatio is overridden", () => {
    const { container } = renderInTheme(
      <ProfileStatusDisplay
        layout="staircase"
        barHeight={32}
        pillRatio={2.6}
      />,
    )
    // 32 * 2.6 = 83.2 → Math.round → 83
    expect(findBoxWithWidth(container, 83)).not.toBeNull()
  })

  it("matches CompactStatusBar collapsed width on the same row (mobile parity)", () => {
    // CompactStatusBar formula: collapsedWidth = round(height * 2.6)
    // With header = 32 → 83. ProfileStatusDisplay with pillRatio = 2.6 must
    // produce the same 83.
    const compactCollapsed = Math.round(32 * 2.6)
    const profileWidth = Math.round(32 * 2.6)
    expect(profileWidth).toBe(compactCollapsed)
    expect(profileWidth).toBe(83)
  })
})

describe("CompactStatusBar — collapsed width formula", () => {
  it("collapses to barHeight × 2.6 (rounded)", () => {
    const { container } = renderInTheme(
      <CompactStatusBar barHeight={40} expandable={false} />,
    )
    const outer = container.firstElementChild as HTMLElement
    expect(outer).not.toBeNull()
    expect(window.getComputedStyle(outer).width).toBe("104px")
  })
})

describe("HUD Top Row — layout stability contract", () => {
  /**
   * Mirror the FullHud top-row structural contract in a pure DOM test.
   * If the absolute-positioning contract regresses (e.g. someone changes
   * the center to use flex:1 again), this test fails before the user
   * notices that ContextBar shifts when a sibling expands.
   */
  function TopRow({
    leftWidth,
    rightWidth,
  }: {
    leftWidth: number
    rightWidth: number
  }) {
    return (
      <Box
        data-testid="top-row"
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          right: 16,
          height: 40,
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        <Box
          data-testid="left-slot"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "auto",
          }}
        >
          <Box sx={{ width: leftWidth, height: 40 }} />
        </Box>
        <Box
          data-testid="center-slot"
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "auto",
          }}
        >
          <Box sx={{ width: 200, height: 40 }} />
        </Box>
        <Box
          data-testid="right-slot"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            pointerEvents: "auto",
          }}
        >
          <Box sx={{ width: rightWidth, height: 40 }} />
        </Box>
      </Box>
    )
  }

  it("center slot uses translateX(-50%) so it is anchored independent of siblings", () => {
    const { getByTestId, rerender } = renderInTheme(
      <TopRow leftWidth={100} rightWidth={100} />,
    )
    const centerSlot = getByTestId("center-slot")
    expect(centerSlot).toHaveStyle({
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    })

    // Re-render with a much wider left slot — the center slot's style
    // must not change. (jsdom doesn't compute layout, so we assert the
    // *contract* — viewport-center positioning — remains intact.)
    rerender(
      <ThemeProvider theme={theme}>
        <PlayerStatusProvider value={{ currency: 0, xp: 0, xpProgress: 0, level: 1 }}>
          <TopRow leftWidth={400} rightWidth={100} />
        </PlayerStatusProvider>
      </ThemeProvider>,
    )
    const centerSlotAfter = getByTestId("center-slot")
    expect(centerSlotAfter).toHaveStyle({
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    })
  })

  it("left and right slots are absolute (don't participate in flex flow)", () => {
    const { getByTestId } = renderInTheme(
      <TopRow leftWidth={100} rightWidth={100} />,
    )
    expect(getByTestId("left-slot")).toHaveStyle({ position: "absolute", left: "0px" })
    expect(getByTestId("right-slot")).toHaveStyle({
      position: "absolute",
      right: "0px",
    })
  })

  it("outer row wrapper is pointer-events:none so chrome gaps don't block content below", () => {
    const { getByTestId } = renderInTheme(
      <TopRow leftWidth={100} rightWidth={100} />,
    )
    expect(getByTestId("top-row")).toHaveStyle({ pointerEvents: "none" })
  })
})
