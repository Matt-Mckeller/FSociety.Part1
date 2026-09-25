"use client"

import { useState } from "react"
import { Box } from "@mui/material"

import { HudFabPanelProvider } from "../../hud-components/fab-cluster-bar"
import { HudContentArea } from "../tiles/HudContentArea"
import { HudLeftRail } from "../rails/HudLeftRail"
import { HudRightRail } from "../rails/HudRightRail"

import { BottomChromeStack, ChromeGate, HudTopRow } from "../renderers"
import { NextRouterBridges } from "./bridges"
import { FullHudProviders } from "./FullHudProviders"
import { resolveHudContent } from "./resolveHudContent"
import { RegisterDefaultBottomBars } from "../registrations"
import type { FullHudProps } from "./types"

/**
 * Pre-composed full HUD: navigation, status bar, current-location bar,
 * minimap dock, left rail, orb bar, AI input bar, and an inset-aware
 * content area driven by the same navigation context.
 *
 * Use this when you want the standard Expanse HUD layout out of the box.
 * Drop in your `pages` map (tile id -> page node) and you're running.
 *
 * For finer control over chrome composition, use the underlying primitives
 * directly (`HudInsetsProvider`, `HudContentArea`, `MinimapDock`, etc.).
 */
export function FullHud({
  navigationConfig,
  pages,
  children,
  contentSlot,
  themeMode,
  onThemeModeChange,
  context: _context,
  onContextChange: _onContextChange,
  onMinimapFullScreenRequest,
  isMinimapFullScreenOpen = false,
  onMinimapFullScreenClose,
  centerLocationOverride,
  playerStatus = { currency: 1280, xp: 4250, xpProgress: 62, level: 12 },
  debugInsets = false,
  reserveMinimap = false,
  defaultMinimapOpen = false,
  wrapWithProviders = true,
  nextRouter,
  pathname,
  routerMethod = "push",
  leftRailPosition,
  rightRailPosition,
  gamePanel,
  initialLabelsVisible = false,
  sx,
}: FullHudProps) {
  const [internalMode, setInternalMode] = useState<"light" | "dark">("dark")
  const mode = themeMode ?? internalMode
  const handleModeChange = onThemeModeChange ?? setInternalMode

  const resolvedContent = resolveHudContent({ pages, children, contentSlot })

  const body = (
    <>
      {/* Optional Next.js bridges — no-ops in demo / storybook */}
      <NextRouterBridges
        nextRouter={nextRouter}
        pathname={pathname}
        routerMethod={routerMethod}
      />

      {/* Page content fills the inset-aware safe area, behind the
          floating chrome. Edge insets are self-registered by each
          chrome component (HudTopRow, rails, BottomChromeStack). */}
      <HudContentArea debug={debugInsets} reserveMinimap={reserveMinimap}>
        {resolvedContent}
      </HudContentArea>

      <ChromeGate id="topRow">
        <HudTopRow
          centerLocationOverride={centerLocationOverride}
          defaultMinimapOpen={defaultMinimapOpen}
          onMinimapFullScreenRequest={onMinimapFullScreenRequest}
          isMinimapFullScreenOpen={isMinimapFullScreenOpen}
          onMinimapFullScreenClose={onMinimapFullScreenClose}
        />
      </ChromeGate>

      <HudFabPanelProvider>
        <ChromeGate id="leftRail">
          <HudLeftRail
            position={leftRailPosition}
            gamePanel={gamePanel}
          />
        </ChromeGate>
        <ChromeGate id="rightRail">
          <HudRightRail
            position={rightRailPosition}
            mode={mode}
            onThemeModeChange={handleModeChange}
          />
        </ChromeGate>
      </HudFabPanelProvider>

      <BottomChromeStack />
      <RegisterDefaultBottomBars />
    </>
  )

  const stage = (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#ffffff",
        overflow: "hidden",
        color: "text.primary",
        ...sx,
      }}
    >
      {body}
    </Box>
  )

  if (!wrapWithProviders) return stage

  return (
    <FullHudProviders
      navigationConfig={navigationConfig}
      playerStatus={playerStatus}
      initialLabelsVisible={initialLabelsVisible}
    >
      {stage}
    </FullHudProviders>
  )
}
