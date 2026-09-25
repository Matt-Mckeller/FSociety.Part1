"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { Box, useTheme, type SxProps, type Theme } from "@mui/material"
import { useNavigation } from "../navigation"
import {
  MinimapTileGrid,
  type MinimapTileGridProps,
} from "../minimap/shared"
import { MINIMAP_TILE_LABEL_OVERHEAD } from "../minimap/components/MinimapTile"
import { PlayerLocationBlip, type PlayerBlipVariant } from "./PlayerLocationBlip"
import { DestinationDot } from "./DestinationDot"

export interface MinimapFullGridProps {
  /**
   * Tile size in px, or `"responsive"` to fill the available container.
   * When responsive, the grid measures its container and picks the largest
   * square tile size that fits both axes (clamped between `minTileSize`
   * and `maxTileSize`).
   * @default "responsive"
   */
  tileSize?: number | "responsive"
  /** Minimum tile size when `tileSize="responsive"`. @default 48 */
  minTileSize?: number
  /** Maximum tile size when `tileSize="responsive"`. @default 200 */
  maxTileSize?: number
  /** Cell-to-cell gap in px. @default 12 */
  gap?: number
  /**
   * What each cell renders. The full view defaults to `"iconAndLabel"` per
   * the plan (each cell shows its own label, no hover preview chip).
   * @default "iconAndLabel"
   */
  content?: MinimapTileGridProps["content"]
  /** Forwarded to `MinimapTileGrid`. */
  tileVariant?: MinimapTileGridProps["tileVariant"]
  /** Forwarded to `MinimapTileGrid`. @default true */
  animateActive?: boolean
  /** Forwarded to `MinimapTileGrid`. */
  categoryColors?: Record<string, string>
  /**
   * Inactive tile background opacity. Defaults to a richer value than
   * the small panel so tiles read clearly at hero size.
   * @default 0.5
   */
  inactiveColorOpacity?: number
  /** Render row + column axis labels. @default false in the full view. */
  showAxisLabels?: boolean
  /**
   * Render directional chevrons around the active tile to hint at
   * navigation. The grid handles boundary suppression.
   * @default true in the full view
   */
  showNavigationChevrons?: boolean
  /**
   * Surface a hover preview card (icon + label + description + Go button)
   * when the user hovers a non-active, non-empty tile.
   * @default true in the full view
   */
  showHoverPreview?: boolean
  /**
   * Which chevron on the active tile is emphasised (size + pulse).
   * Forwarded to `MinimapTileGrid`. @default "up"
   */
  emphasisDirection?: "up" | "down" | "left" | "right" | null
  /**
   * Show an animated "you are here" blip on the active tile.
   * @default true
   */
  showPlayerBlip?: boolean
  /**
   * Visual style of the player location blip.
   * @default "targetLock"
   */
  playerBlipVariant?: PlayerBlipVariant
  /**
   * Color override for the blip. Defaults to `theme.palette.primary.main`.
   */
  playerBlipColor?: string
  /**
   * Grid coordinates of the destination tile (where the user is heading).
   * When provided, a `DestinationDot` is rendered below that tile and the
   * origin beacon rings are directionally clipped toward it.
   */
  destinationPosition?: { x: number; y: number }
  /**
   * Per-tile visit progress map, keyed `"${x},${y}"`, value 0–1.
   * When provided, the `DestinationDot` shows the destination tile's
   * progress ring.
   */
  tileProgress?: Record<string, number>
  sx?: SxProps<Theme>
}

/**
 * Hero-sized grid for `MinimapFullView`.
 *
 * Wraps the shared `MinimapTileGrid` with full-view defaults
 * (`content="iconAndLabel"`, no axis labels) and adds responsive sizing
 * via `ResizeObserver`. Navigation, click, and keyboard behavior all
 * come from `useNavigation()` — no fork.
 */
export function MinimapFullGrid({
  tileSize = "responsive",
  minTileSize = 48,
  maxTileSize = 200,
  gap = 12,
  content = "iconAndLabel",
  tileVariant,
  animateActive = true,
  categoryColors,
  inactiveColorOpacity = 0.5,
  showAxisLabels = false,
  showNavigationChevrons = true,
  showHoverPreview = true,
  emphasisDirection = "up",
  showPlayerBlip = true,
  playerBlipVariant = "targetLock",
  playerBlipColor,
  destinationPosition,
  tileProgress,
  sx,
}: MinimapFullGridProps) {
  const { gridSize, position } = useNavigation()
  const theme = useTheme()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [measuredSize, setMeasuredSize] = useState<number | null>(null)
  const [containerDims, setContainerDims] = useState<{ w: number; h: number } | null>(null)

  const isResponsive = tileSize === "responsive"

  useEffect(() => {
    if (!isResponsive) return
    const el = containerRef.current
    if (!el || typeof ResizeObserver === "undefined") return

    // In `iconAndLabel` mode each cell renders both a chip (size × size) and
    // a label below it. The label has its own width floor, so the rendered
    // cell width is `max(size + 8, MINIMAP_TILE_LABEL_MIN_WIDTH)` and the
    // rendered cell height is `size + MINIMAP_TILE_LABEL_OVERHEAD`. The
    // responsive math below reserves space for both.
    const isLabeled = content === "iconAndLabel"
    const labelOverhead = isLabeled ? MINIMAP_TILE_LABEL_OVERHEAD : 0
    // Chip extends 8 px less than the cell width when the label-extension
    // path wins (size ≥ 56). When the label-floor wins (size < 56) the
    // cell is exactly `MINIMAP_TILE_LABEL_MIN_WIDTH` wide and we'd
    // overflow horizontally anyway in a too-narrow shell — clamping
    // tile size up to `minTileSize` is the right behavior either way.
    const chipWidthSlack = isLabeled ? 8 : 0

    const compute = () => {
      const rect = el.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      if (w <= 0 || h <= 0) return
      setContainerDims({ w, h })
      const cellWidthBudget =
        (w - gap * (gridSize.width - 1)) / Math.max(1, gridSize.width) -
        chipWidthSlack
      const cellHeightBudget =
        (h - gap * (gridSize.height - 1)) / Math.max(1, gridSize.height) -
        labelOverhead
      const candidate = Math.floor(Math.min(cellWidthBudget, cellHeightBudget))
      const next = Math.max(minTileSize, Math.min(maxTileSize, candidate))
      setMeasuredSize((prev) => (prev === next ? prev : next))
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [
    isResponsive,
    gridSize.width,
    gridSize.height,
    gap,
    minTileSize,
    maxTileSize,
    content,
  ])

  const effectiveSize = useMemo(() => {
    if (typeof tileSize === "number") return tileSize
    return measuredSize ?? minTileSize
  }, [tileSize, measuredSize, minTileSize])

  // Icon scales with chip size.
  const iconSize = Math.max(16, Math.round(effectiveSize * 0.45))

  // ------------------------------------------------------------------
  // Blip position — pixel center of the active tile's chip within the
  // container. Computed from known grid math so we don't need DOM refs.
  // ------------------------------------------------------------------
  const blipPosition = useMemo(() => {
    if (!showPlayerBlip || !containerDims) return null
    const { w: cw, h: ch } = containerDims
    // In iconAndLabel mode each row is tileSize + label overhead; for
    // iconOnly / titleOnTile the row is just tileSize.
    const cellH =
      content === "iconAndLabel"
        ? effectiveSize + MINIMAP_TILE_LABEL_OVERHEAD
        : effectiveSize
    const totalGridW =
      gridSize.width  * effectiveSize + (gridSize.width  - 1) * gap
    const totalGridH =
      gridSize.height * cellH          + (gridSize.height - 1) * gap
    // Grid is centered in the flex container.
    const gridLeft = (cw - totalGridW) / 2
    const gridTop  = (ch - totalGridH) / 2
    // 8 px below the chip bottom edge (chip occupies 0..effectiveSize within the cell).
    const BELOW_CHIP = 8
    const bx = gridLeft + position.x * (effectiveSize + gap) + effectiveSize / 2
    const by = gridTop  + position.y * (cellH          + gap) + effectiveSize + BELOW_CHIP
    return { x: bx, y: by }
  }, [
    showPlayerBlip,
    containerDims,
    effectiveSize,
    gap,
    gridSize.width,
    gridSize.height,
    content,
    position.x,
    position.y,
  ])

  /** Pixel coords for the destination dot (same offset formula as origin). */
  const destinationBlipPosition = useMemo(() => {
    if (!destinationPosition || !containerDims) return null
    const { w: cw, h: ch } = containerDims
    const isDestSameAsOrigin =
      destinationPosition.x === position.x && destinationPosition.y === position.y
    if (isDestSameAsOrigin) return null
    const cellH =
      content === "iconAndLabel"
        ? effectiveSize + MINIMAP_TILE_LABEL_OVERHEAD
        : effectiveSize
    const totalGridW = gridSize.width  * effectiveSize + (gridSize.width  - 1) * gap
    const totalGridH = gridSize.height * cellH          + (gridSize.height - 1) * gap
    const gridLeft = (cw - totalGridW) / 2
    const gridTop  = (ch - totalGridH) / 2
    const BELOW_CHIP = 8
    const dx = gridLeft + destinationPosition.x * (effectiveSize + gap) + effectiveSize / 2
    const dy = gridTop  + destinationPosition.y * (cellH           + gap) + effectiveSize + BELOW_CHIP
    return { x: dx, y: dy }
  }, [
    destinationPosition,
    containerDims,
    effectiveSize,
    gap,
    gridSize.width,
    gridSize.height,
    content,
    position.x,
    position.y,
  ])

  /** Stringified position — changing it triggers the Target Lock intro replay. */
  const blipTriggerKey = `${position.x},${position.y}`

  return (
    <Box
      ref={containerRef}
      sx={[
        {
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // overflow: visible so absolutely-positioned chevrons on the active
          // tile can paint outside the chip's layout bounds without being
          // clipped. The ResizeObserver already sizes tiles to fit the
          // container, so no scrollable overflow is created.
          overflow: "visible",
          position: "relative",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <MinimapTileGrid
        tileSize={effectiveSize}
        gap={gap}
        tileVariant={tileVariant}
        animateActive={animateActive}
        categoryColors={categoryColors}
        inactiveColorOpacity={inactiveColorOpacity}
        showAxisLabels={showAxisLabels}
        showNavigationChevrons={showNavigationChevrons}
        showHoverPreview={showHoverPreview}
        emphasisDirection={emphasisDirection}
        content={content}
        iconSize={iconSize}
      />

      {/* Player location blip — origin dot, rendered above tiles */}
      {blipPosition && (
        <PlayerLocationBlip
          x={blipPosition.x}
          y={blipPosition.y}
          tileSize={effectiveSize}
          color={playerBlipColor ?? theme.palette.primary.main}
          destinationPx={destinationBlipPosition ?? undefined}
          triggerKey={blipTriggerKey}
        />
      )}

      {/* Destination dot — static marker below the destination tile */}
      {destinationBlipPosition && (
        <DestinationDot
          x={destinationBlipPosition.x}
          y={destinationBlipPosition.y}
          tileSize={effectiveSize}
          color={playerBlipColor ?? theme.palette.primary.main}
          progress={tileProgress?.[`${destinationPosition!.x},${destinationPosition!.y}`] ?? 0}
        />
      )}
    </Box>
  )
}
