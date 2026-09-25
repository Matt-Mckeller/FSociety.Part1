"use client"

import React, { createContext, useContext, useMemo, type ReactNode } from "react"
import { useTheme, useMediaQuery } from "@mui/material"
import {
  HUD_ACTION_BAR_SIZE,
  HUD_EDGE_PADDING,
  HUD_HEADER_BAR_SIZE,
  type HudBarBreakpoint,
} from "@expanse/brand-core"

/**
 * Resolves the active HUD breakpoint from the MUI theme breakpoints.
 *
 * - `desktop`: viewport ≥ 1024px
 * - `tablet`:  viewport ≥ 768px
 * - `mobile`:  everything below
 *
 * SSR-safe via `noSsr: true` (consumers see the resolved client value
 * on first render after hydration; SSR uses mobile defaults).
 */
export function useHudBreakpoint(): HudBarBreakpoint {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up(1024), { noSsr: true })
  const isTablet = useMediaQuery(theme.breakpoints.up(768), { noSsr: true })
  return isDesktop ? "desktop" : isTablet ? "tablet" : "mobile"
}

export interface HudBarSizes {
  /** Header chrome height (CompactStatusBar, ContextBar, minimap pill). */
  header: number
  /** Inline action element size (FAB triggers, action buttons inside pills). */
  action: number
  /** Viewport-edge padding and inter-chrome gap. */
  edge: number
  /** The breakpoint these values were resolved for. */
  breakpoint: HudBarBreakpoint
}

/**
 * Computes the default HUD chrome sizes from the brand-core tokens at
 * the active breakpoint. This is the value used when no
 * `HudChromeSizesProvider` is present higher in the tree.
 */
function useComputedHudBarSizes(): HudBarSizes {
  const breakpoint = useHudBreakpoint()
  return {
    header: HUD_HEADER_BAR_SIZE[breakpoint],
    action: HUD_ACTION_BAR_SIZE[breakpoint],
    edge: HUD_EDGE_PADDING[breakpoint],
    breakpoint,
  }
}

const HudChromeSizesContext = createContext<HudBarSizes | null>(null)

export interface HudChromeSizesProviderProps {
  /**
   * Partial overrides merged on top of the breakpoint-resolved defaults.
   * Pass `{ header: 56 }` for a compact HUD, etc. Only the supplied
   * fields override; the rest fall through to the computed values.
   */
  overrides?: Partial<HudBarSizes>
  children: ReactNode
}

/**
 * Provides HUD chrome sizing to the subtree. Mount this above `FullHud`
 * (or any chrome composition) to override `header` / `action` / `edge`
 * sizes without forking the chrome components.
 */
export function HudChromeSizesProvider({ overrides, children }: HudChromeSizesProviderProps) {
  const computed = useComputedHudBarSizes()
  const value = useMemo<HudBarSizes>(() => ({ ...computed, ...overrides }), [computed, overrides])
  return <HudChromeSizesContext.Provider value={value}>{children}</HudChromeSizesContext.Provider>
}

/**
 * Single source of truth for HUD chrome sizing. All chrome components
 * call this so header bars, FABs, and edge padding scale consistently
 * across mobile, tablet, and desktop.
 *
 * Returns the value from `HudChromeSizesProvider` if present, otherwise
 * falls back to the brand-core token defaults at the active breakpoint.
 */
export function useHudBarSizes(): HudBarSizes {
  const ctx = useContext(HudChromeSizesContext)
  const computed = useComputedHudBarSizes()
  return ctx ?? computed
}
