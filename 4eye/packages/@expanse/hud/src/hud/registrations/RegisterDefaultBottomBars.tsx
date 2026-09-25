"use client";
import { useMemo } from "react"
import { useMediaQuery, useTheme } from "@mui/material"

import { useRegisterBottomBar } from "../slots"
import { AIInputBar } from "../../hud-components/ai-input-bar"
import { OrbBar } from "../../hud-components/orb-bar"
import { DEFAULT_BOTTOM_BAR_ORDER } from "../slots/slot-orders"
import { useRailPreferences } from "../overlay-state"

/**
 * Responsive orb bar — picks orb size + spacing based on viewport width
 * so 4 chips stay on a single row across mobile and desktop.
 */
function ResponsiveOrbBar() {
  const theme = useTheme()
  const isMobile = !useMediaQuery(theme.breakpoints.up(768), { noSsr: true })
  const { chromeGuideVisible } = useRailPreferences()
  return (
    <OrbBar
      context="default"
      showOrbLabels
      orbLabelPosition="below"
      labelMode={chromeGuideVisible ? "always" : "none"}
      orbSize={isMobile ? "sm" : "lg"}
      spacing={isMobile ? 6 : 12}
    />
  )
}

/**
 * Registers the two built-in bottom bars (OrbBar above, AIInputBar below).
 * Each bar opts into the existing chrome-visibility flag so descendants
 * can hide them via `useRegisterHudChromeHide`.
 */
export function RegisterDefaultBottomBars() {
  const orbsNode = useMemo(() => <ResponsiveOrbBar />, [])
  const aiNode = useMemo(() => <AIInputBar minWidth={320} />, [])

  useRegisterBottomBar({
    id: "fullhud-orbs",
    order: DEFAULT_BOTTOM_BAR_ORDER.orbs,
    node: orbsNode,
    hideKey: "bottomOrbBar",
    label: "OrbBar",
  })
  useRegisterBottomBar({
    id: "fullhud-ai-input",
    order: DEFAULT_BOTTOM_BAR_ORDER.aiInput,
    node: aiNode,
    hideKey: "aiInputBar",
    label: "AIInputBar",
  })
  return null
}
