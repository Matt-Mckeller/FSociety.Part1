"use client"

import React from "react"
import { Box, Tooltip } from "@mui/material"
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded"
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded"
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded"
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded"
import { useMinimapTileContext } from "../context/MinimapTileContext"

const ARROW_GLYPHS = { up: "↑", down: "↓", left: "←", right: "→" } as const
const STAGGER = { up: "0s", right: "0.4s", down: "0.8s", left: "1.2s" } as const

/** Max animation travel in px (pulse = 4 px, drift = 2 px). Used to size the halo. */
const ANIM_TRAVEL = 4

type Direction = "up" | "down" | "left" | "right"

function ChevronIcon({ direction }: { direction: Direction }) {
  const {
    size,
    tileGap,
    emphasisDirection,
    activeTileColor,
    neighborColors,
  } = useMinimapTileContext()

  // Icon size — proportional, capped smaller than tile so it sits in the gap
  const chevronSize = Math.max(16, Math.round(size * 0.4))
  const gapHalf = Math.round(tileGap / 2)

  const isPrimary = emphasisDirection === direction

  const IconCmp =
    direction === "up"   ? KeyboardDoubleArrowUpRoundedIcon
    : direction === "down"  ? KeyboardDoubleArrowDownRoundedIcon
    : direction === "left"  ? KeyboardDoubleArrowLeftRoundedIcon
    : KeyboardDoubleArrowRightRoundedIcon

  // Neighbor color previews the destination; falls back to active tile accent
  const color = neighborColors?.[direction] ?? activeTileColor

  // With halo = ceil(chevronSize/2) + gapHalf + ANIM_TRAVEL, the formula
  // pos = ANIM_TRAVEL guarantees:
  //   icon_center distance from chip edge = gapHalf (halfway into the inter-tile gap)
  const pos = ANIM_TRAVEL

  const isHorizontal = direction === "left" || direction === "right"
  const baseTransform = isHorizontal ? "translateY(-50%)" : "translateX(-50%)"

  const positionSx =
    direction === "up"    ? { top: pos,    left: "50%",  transform: baseTransform }
    : direction === "down"  ? { bottom: pos, left: "50%",  transform: baseTransform }
    : direction === "left"  ? { left: pos,   top: "50%",   transform: baseTransform }
    :                         { right: pos,  top: "50%",   transform: baseTransform }

  // Drift (all chevrons, subtle) and pulse (emphasis direction, stronger)
  const drift50 =
    direction === "up"    ? `${baseTransform} translateY(-2px)`
    : direction === "down"  ? `${baseTransform} translateY(2px)`
    : direction === "left"  ? `${baseTransform} translateX(-2px)`
    :                         `${baseTransform} translateX(2px)`

  const pulse50 =
    direction === "up"    ? `${baseTransform} translateY(-4px)`
    : direction === "down"  ? `${baseTransform} translateY(4px)`
    : direction === "left"  ? `${baseTransform} translateX(-4px)`
    :                         `${baseTransform} translateX(4px)`

  const driftName = `chevron-drift-${direction}`
  const pulseName = `chevron-pulse-${direction}`
  const animName  = isPrimary ? pulseName : driftName
  const animDur   = isPrimary ? "1.6s" : "2.8s"

  const tooltipLabel = `Move ${direction} (${ARROW_GLYPHS[direction]})`
  const tooltipPlacement = direction === "up" ? "top"
    : direction === "down" ? "bottom"
    : direction as "left" | "right"

  return (
    <Tooltip title={tooltipLabel} placement={tooltipPlacement} arrow enterDelay={300}>
      <Box
        aria-label={tooltipLabel}
        sx={{
          position: "absolute",
          ...positionSx,
          display: "flex",
          flexDirection: isHorizontal ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "default",
          // Emphasis = full brightness + color glow; others = dimmed + white halo
          opacity: isPrimary ? 1 : 0.7,
          filter: isPrimary
            ? `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 2px rgba(255,255,255,0.5))`
            : "drop-shadow(0 0 2px rgba(255,255,255,0.35))",
          animation: `${animName} ${animDur} ease-in-out infinite`,
          animationDelay: STAGGER[direction],
          // Keyframes: drift (2 px) and pulse (4 px) per direction
          [`@keyframes ${driftName}`]: {
            "0%, 100%": { transform: baseTransform },
            "50%":      { transform: drift50 },
          },
          [`@keyframes ${pulseName}`]: {
            "0%, 100%": { transform: baseTransform },
            "50%":      { transform: pulse50 },
          },
          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
          },
        }}
      >
        <IconCmp sx={{ fontSize: chevronSize, color }} />
      </Box>
    </Tooltip>
  )
}

/**
 * Wraps the chip with N/S/E/W dual-directional chevrons for the active tile.
 *
 * Each chevron:
 * - Uses `KeyboardDoubleArrow*` (built-in double-glyph) pointing toward the neighbor
 * - Is colored with the adjacent tile's accent color, previewing the destination
 * - Sits halfway between the current and adjacent tile (gapHalf from chip edge)
 * - All four drift continuously ±2 px; the emphasis direction pulses ±4 px
 * - Respects `prefers-reduced-motion`
 */
export function TileChevrons({ children }: { children: React.ReactNode }) {
  const { size, tileGap, canMoveUp, canMoveDown, canMoveLeft, canMoveRight } =
    useMinimapTileContext()

  const chevronSize = Math.max(16, Math.round(size * 0.4))
  const gapHalf = Math.round(tileGap / 2)
  // Halo = space reserved outside the chip so absolute-positioned chevrons
  // aren't clipped. Must accommodate: icon half-size + gap-half + animation travel.
  const halo = Math.ceil(chevronSize / 2) + gapHalf + ANIM_TRAVEL

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        p: `${halo}px`,
        m: `-${halo}px`,
      }}
    >
      {children}
      {canMoveUp    && <ChevronIcon direction="up"    />}
      {canMoveDown  && <ChevronIcon direction="down"  />}
      {canMoveLeft  && <ChevronIcon direction="left"  />}
      {canMoveRight && <ChevronIcon direction="right" />}
    </Box>
  )
}
