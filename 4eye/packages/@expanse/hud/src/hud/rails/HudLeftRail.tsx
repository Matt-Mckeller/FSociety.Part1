"use client"

import React, { useState, useEffect, useRef, type ReactNode, type ElementType } from "react"
import SportsEsportsIcon from "@mui/icons-material/SportsEsportsRounded"
import BoltIcon from "@mui/icons-material/Bolt"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import BackpackIcon from "@mui/icons-material/Backpack"
import AssignmentIcon from "@mui/icons-material/Assignment"
import Box from "@mui/material/Box"

import { Z_INDEX } from "@expanse/theme"
import { ActionDock } from "../docks"
import type { ActionDockPosition } from "../docks"
import { RAIL_PILL_SIZE, RAIL_PILL_BACKGROUND, RAIL_ITEM_GAP } from "./railPillStyle"
import { GameActionBar } from "../../hud-components/action-bars"
import { FabCluster, FabTrigger } from "../../hud-components/fab-cluster-bar"
import {
  useHudBarSizes,
  useHudChromeVisibility,
  useLeftRailItems,
  useRegisterHudInset,
} from "../slots"
import { useRailPreferences } from "../overlay-state"

export interface HudLeftRailProps {
  /** Where the rail docks. @default "left-center" */
  position?: ActionDockPosition
  /**
   * Override the panel rendered when the gamepad trigger is active.
   * Defaults to a bare `<GameActionBar />`. Pass a customized
   * `<GameActionBar items={...} />` to wire `onClick` handlers / dynamic
   * badges onto specific items (e.g. Quests) without forking the rail.
   */
  gamePanel?: ReactNode
}

// =============================================================================
// GameControllerIcon — animated cycling icon for the game FAB
// =============================================================================

/**
 * Sub-item icons that peek in/out of the game controller button, matching the
 * GAME_ITEMS catalogue (Spellbook, Achievements, Inventory, Quests).
 * Tints drive a brief chromatic accent so each item feels distinct.
 */
const GAME_PEEK_ITEMS: ReadonlyArray<{ Icon: ElementType; color: string; label: string }> = [
  { Icon: BoltIcon,         color: "#3b82f6", label: "Spellbook"    },
  { Icon: EmojiEventsIcon,  color: "#f59e0b", label: "Achievements" },
  { Icon: BackpackIcon,     color: "#10b981", label: "Inventory"    },
  { Icon: AssignmentIcon,   color: "#ef4444", label: "Quests"       },
]

const PEEK_INTERVAL_MS = 5000   // how often a sub-icon peeks
const PEEK_HOLD_MS    = 900     // how long the sub-icon stays visible

/**
 * Renders the SportsEsports controller icon as the default state, but every
 * ~5 s briefly swaps in one of the four game sub-item icons (cycling in order),
 * then snaps back. This creates a subtle "hint" animation that communicates
 * panel depth without requiring a click.
 *
 * Must be used inside a `FabCluster` context tree (same pattern as
 * `ProfileLensIcon` in HudRightRail) because it reads `useFabCluster`.
 */
function GameControllerIcon({ size }: { size: number }) {
  const [peekIdx, setPeekIdx] = useState<number | null>(null)
  const seqRef = useRef(0)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Stagger the first peek so it doesn't fire instantly on mount
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        const idx = seqRef.current % GAME_PEEK_ITEMS.length
        seqRef.current += 1
        setPeekIdx(idx)
        hideTimerRef.current = setTimeout(() => setPeekIdx(null), PEEK_HOLD_MS)
      }, PEEK_INTERVAL_MS)
      return () => {
        clearInterval(interval)
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      }
    }, 1500)
    return () => {
      clearTimeout(initialDelay)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  const peek = peekIdx !== null ? GAME_PEEK_ITEMS[peekIdx] : null
  const isShowing = peek !== null

  const iconSizePx = Math.round(size * 0.55)

  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Main controller icon */}
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: isShowing ? "scale(0) rotate(-25deg)" : "scale(1) rotate(0deg)",
          opacity: isShowing ? 0 : 1,
          transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease",
          "& .MuiSvgIcon-root": { fontSize: iconSizePx },
        }}
      >
        <SportsEsportsIcon />
      </Box>

      {/* Peek sub-icon — only the active one renders */}
      {isShowing && peek && (
        <Box
          key={peekIdx}
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "scale(1) rotate(0deg)",
            opacity: 1,
            color: peek.color,
            "@keyframes peekIn": {
              "0%":   { transform: "scale(0) rotate(20deg)", opacity: 0 },
              "60%":  { transform: "scale(1.18) rotate(-4deg)", opacity: 1 },
              "100%": { transform: "scale(1) rotate(0deg)", opacity: 1 },
            },
            animation: "peekIn 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards",
            "& .MuiSvgIcon-root": { fontSize: iconSizePx },
          }}
        >
          <peek.Icon />
        </Box>
      )}
    </Box>
  )
}

export function HudLeftRail({
  position = "left-center",
  gamePanel,
}: HudLeftRailProps) {
  const barSizes = useHudBarSizes()
  useRegisterHudInset({
    id: "hud-left-rail",
    edge: "left",
    size: barSizes.header,
    label: "HudLeftRail",
  })
  // When the rail docks on a right-edge position, panels need to open
  // toward screen interior (left) so they don't slide off the viewport.
  const panelSide: "left" | "right" = position.startsWith("right") ? "left" : "right"
  const { labelsVisible, chromeGuideVisible } = useRailPreferences()
  const labelMode = labelsVisible || chromeGuideVisible ? "always" : "none"
  const { entries: leftRailEntries } = useLeftRailItems()
  const { hidden } = useHudChromeVisibility()
  const visibleRailItems = leftRailEntries.filter(
    (e) => !e.hideKey || !hidden[e.hideKey],
  )
  return (
    <ActionDock position={position} offset={barSizes.edge} zIndex={Z_INDEX.PERSISTENT_RAILS}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: `${RAIL_ITEM_GAP}px`,
        }}
      >
        <FabCluster>
          <FabTrigger
            id="game"
            icon={<GameControllerIcon size={RAIL_PILL_SIZE} />}
            label="Game Bar"
            panel={gamePanel ?? <GameActionBar />}
            size={RAIL_PILL_SIZE}
            shape="square"
            background={RAIL_PILL_BACKGROUND}
            panelSide={panelSide}
            labelMode={labelMode}
          />
        </FabCluster>
        {visibleRailItems.length > 0 && (
          <Box
            data-testid="hud-left-rail-items"
            sx={{ display: "contents" }}
          >
            {visibleRailItems.map((entry) => (
              <React.Fragment key={entry.id}>{entry.node}</React.Fragment>
            ))}
          </Box>
        )}
      </Box>
    </ActionDock>
  )
}
