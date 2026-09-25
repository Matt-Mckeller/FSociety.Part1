"use client"

import React, { useMemo, useRef, useState, useCallback, type ComponentType } from "react"
import { Box, Typography, type SxProps, type Theme } from "@mui/material"
import { useNavigation } from "../../navigation"
import { MinimapTile, resolveTileAccent, type MinimapTileHoverInfo } from "../components/MinimapTile"
import { MinimapTileHoverCard } from "./MinimapTileHoverCard"
import type { MinimapTileVariant } from "@expanse/theme"

interface CellData {
  x: number
  y: number
  label: string
  icon?: ComponentType<{ sx?: object }>
  category?: string
  color?: string
  ringColor?: string
  chip?: "filled" | "outline"
  isEmpty: boolean
  disabled: boolean
}

export type MinimapTileGridHoverInfo = MinimapTileHoverInfo & { x: number; y: number }

export interface MinimapTileGridProps {
  /** Tile width & height in pixels. @default 22 */
  tileSize?: number
  /** Gap between cells in pixels. @default 3 */
  gap?: number
  /** Visual style variant for every tile. @default "default" */
  tileVariant?: MinimapTileVariant
  /** Pulse animation on the active tile. @default true */
  animateActive?: boolean
  /** Per-instance category color overrides. */
  categoryColors?: Record<string, string>
  /** Render row + column axis labels. @default true */
  showAxisLabels?: boolean
  /**
   * What each tile renders.
   * - `"iconOnly"` (panel default): icon chip only.
   * - `"iconAndLabel"` (full-view default): icon chip + label below, with
   *   a first-letter chip when the tile has no icon.
   * - `"titleOnTile"`: icon + page title rendered INSIDE the chip face
   *   (vertical stack). No under-tile label strip is reserved.
   * @default "iconOnly"
   */
  content?: "iconOnly" | "iconAndLabel" | "titleOnTile"
  /**
   * Optional explicit per-tile icon size in px. When omitted, sized
   * relative to `tileSize`.
   */
  iconSize?: number
  /**
   * Background fill opacity for inactive tiles. Forwarded to each
   * `MinimapTile`. @default 0.18
   */
  inactiveColorOpacity?: number
  /**
   * Hover info for the active row/col. The panel wires this into its
   * preview card; the full view ignores it (each cell shows its own label).
   */
  onTileHoverChange?: (info: MinimapTileGridHoverInfo | null) => void
  /**
   * When true, the active tile renders directional chevrons around its
   * chip to hint at navigation. The grid handles boundary awareness so
   * arrows pointing off the grid (e.g. Up at row 0) are suppressed.
   * @default false
   */
  showNavigationChevrons?: boolean
  /**
   * When true, hovering over a non-active, non-empty tile surfaces a
   * preview card (icon + label + description + Go button).
   * The Go button navigates to the tile via `useNavigation().navigateTo`.
   * @default false
   */
  showHoverPreview?: boolean
  /**
   * Which directional chevron is emphasised on the active tile
   * (1.5× size + lifted offset + animated pulse). Forwarded to
   * `MinimapTile`. @default "up"
   */
  emphasisDirection?: "up" | "down" | "left" | "right" | null
  sx?: SxProps<Theme>
}

/**
 * Shared row/column grid of `MinimapTile`s, driven by `useNavigation`.
 *
 * Extracted from `MinimapPanel` so that `MinimapFullView` can render the
 * same grid at hero size with `content="iconAndLabel"`. Both consumers
 * use the same hook, the same tile component, and the same color
 * derivation — no fork.
 */
export function MinimapTileGrid({
  tileSize = 22,
  gap = 3,
  tileVariant = "default",
  animateActive = true,
  categoryColors,
  showAxisLabels = true,
  content = "iconOnly",
  iconSize: iconSizeOverride,
  inactiveColorOpacity,
  onTileHoverChange,
  showNavigationChevrons = false,
  showHoverPreview = false,
  emphasisDirection = "up",
  sx,
}: MinimapTileGridProps) {
  const { position: currentPosition, gridSize, navigateTo, getTileAt, config } = useNavigation()
  // When the navigation config wraps around the grid edges, every
  // direction is a valid move from every cell — boundary suppression
  // must not hide chevrons. Otherwise fall back to per-edge boundary
  // checks below.
  const wrapAround = config.dimensions.wrapAround === true

  const rowLabelWidth = useMemo(
    () => (showAxisLabels ? Math.max(14, Math.ceil(tileSize * 0.65)) : 0),
    [tileSize, showAxisLabels],
  )
  const iconSize = useMemo(
    () => iconSizeOverride ?? Math.max(10, Math.min(16, Math.ceil(tileSize * 0.55))),
    [iconSizeOverride, tileSize],
  )

  const gridData: CellData[][] = useMemo(() => {
    const rows: CellData[][] = []
    for (let y = 0; y < gridSize.height; y++) {
      const row: CellData[] = []
      for (let x = 0; x < gridSize.width; x++) {
        const tile = getTileAt(x, y)
        row.push({
          x,
          y,
          label:    tile?.display.label ?? `(${x + 1}, ${y + 1})`,
          icon:     tile?.display.icon as ComponentType<{ sx?: object }> | undefined,
          category: tile?.display.category,
          // Color resolution is delegated to MinimapTile + theme
          // (theme.components.ExpanseMinimapTile.categoryColors). Per-tile
          // `display.colors` are no longer authoritative — the theme owns
          // both inactive (per-category) and active (canonical) colors.
          color:    undefined,
          ringColor: tile?.display.ring,
          chip:     tile?.display.chip,
          isEmpty:  !tile,
          disabled: Boolean(tile?.behavior?.disabled),
        })
      }
      rows.push(row)
    }
    return rows
  }, [gridSize, getTileAt])

  // ----------------------------------------------------------
  // Hover preview state — single Popper anchored to the
  // currently-hovered cell. Hover bridge keeps the card open
  // briefly when the cursor leaves the tile so the user can
  // reach the Go button.
  // ----------------------------------------------------------
  const cellRefs = useRef<Map<string, HTMLDivElement | null>>(new Map())
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null)

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimerRef.current = setTimeout(() => {
      setHoveredCell(null)
      closeTimerRef.current = null
    }, 120)
  }, [cancelClose])

  const handleTileEnter = useCallback(
    (x: number, y: number, isActive: boolean, isEmpty: boolean, isDisabled: boolean) => {
      if (!showHoverPreview) return
      if (isActive || isEmpty || isDisabled) {
        setHoveredCell(null)
        return
      }
      cancelClose()
      setHoveredCell({ x, y })
    },
    [showHoverPreview, cancelClose],
  )

  const handleTileLeave = useCallback(() => {
    if (!showHoverPreview) return
    scheduleClose()
  }, [showHoverPreview, scheduleClose])

  // Resolve hover-card data for the currently-hovered cell.
  const hoverCardData = useMemo(() => {
    if (!hoveredCell) return null
    const tile = getTileAt(hoveredCell.x, hoveredCell.y)
    if (!tile) return null
    const cell = gridData[hoveredCell.y]?.[hoveredCell.x]
    if (!cell) return null
    return {
      anchorEl: cellRefs.current.get(`${hoveredCell.x}-${hoveredCell.y}`) ?? null,
      label: cell.label,
      category: cell.category,
      description: tile.seo?.description,
      icon: cell.icon,
      // Resolve color via the same fallback used by MinimapTile so the
      // card accent matches the chip color exactly.
      color: resolveTileAccent(cell.category, categoryColors),
      x: hoveredCell.x,
      y: hoveredCell.y,
    }
  }, [hoveredCell, getTileAt, gridData, categoryColors])

  return (
    <Box
      sx={[
        {
          display: "grid",
          // Optional axis label gutter, then one column per tile.
          gridTemplateColumns: showAxisLabels
            ? `${rowLabelWidth + 4}px repeat(${gridSize.width}, ${tileSize}px)`
            : `repeat(${gridSize.width}, ${tileSize}px)`,
          // Optional axis label header row, then one row per grid row.
          // `auto` for the label row keeps it tight; tile rows are sized
          // by content so iconAndLabel can extend below the chip without
          // distorting alignment of chips across the row.
          gridTemplateRows: showAxisLabels
            ? `auto repeat(${gridSize.height}, auto)`
            : `repeat(${gridSize.height}, auto)`,
          columnGap: `${gap}px`,
          rowGap: `${gap}px`,
          // Center the grid within its container.
          justifyContent: "center",
          alignContent: "center",
          // Each cell aligns its chip to the top so labels hang below
          // chips uniformly across the row.
          justifyItems: "center",
          alignItems: content === "iconAndLabel" ? "start" : "center",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {/* Column header row */}
      {showAxisLabels && (
        <>
          {/* Top-left corner spacer */}
          <Box />
          {Array.from({ length: gridSize.width }, (_, i) => (
            <Box
              key={`col-${i}`}
              sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "0.7rem", color: "text.primary", opacity: 0.75, fontWeight: 600 }}
              >
                {i + 1}
              </Typography>
            </Box>
          ))}
        </>
      )}

      {/* Body rows */}
      {gridData.map((row, rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          {showAxisLabels && (
            <Box
              sx={{
                width: rowLabelWidth,
                height: tileSize,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "0.7rem", color: "text.primary", opacity: 0.75, fontWeight: 600 }}
              >
                {rowIndex + 1}
              </Typography>
            </Box>
          )}
          {row.map((cell) => {
            const isActive = currentPosition.x === cell.x && currentPosition.y === cell.y
            const cellKey = `${cell.x}-${cell.y}`

            // Compute neighbor tile colors for the active tile only.
            // These tint the directional chevrons with a destination-color
            // preview. Resolved via the same theme-driven category accent as
            // the hover card above, not the legacy per-tile `display.colors`
            // (which the location bar still owns — see MinimapTileGrid's
            // module comment for why tile fill no longer reads it). A
            // missing neighbor stays `undefined` so TileChevrons falls back
            // to the live themed `activeTileColor` from context, rather than
            // resolveTileAccent's own (unthemed) fallback constant.
            const neighborAccent = (tile: ReturnType<typeof getTileAt>): string | undefined =>
              tile ? resolveTileAccent(tile.display.category, categoryColors) : undefined

            const neighborColors = (isActive && showNavigationChevrons)
              ? {
                  up: (wrapAround || cell.y > 0)
                    ? neighborAccent(getTileAt(cell.x, ((cell.y - 1 + gridSize.height) % gridSize.height)))
                    : undefined,
                  down: (wrapAround || cell.y < gridSize.height - 1)
                    ? neighborAccent(getTileAt(cell.x, (cell.y + 1) % gridSize.height))
                    : undefined,
                  left: (wrapAround || cell.x > 0)
                    ? neighborAccent(getTileAt(((cell.x - 1 + gridSize.width) % gridSize.width), cell.y))
                    : undefined,
                  right: (wrapAround || cell.x < gridSize.width - 1)
                    ? neighborAccent(getTileAt((cell.x + 1) % gridSize.width, cell.y))
                    : undefined,
                }
              : undefined
            return (
              <Box
                key={`cell-${cellKey}`}
                ref={(el: HTMLDivElement | null) => {
                  if (el) cellRefs.current.set(cellKey, el)
                  else cellRefs.current.delete(cellKey)
                }}
                onMouseEnter={() => handleTileEnter(cell.x, cell.y, isActive, cell.isEmpty, cell.disabled)}
                onMouseLeave={handleTileLeave}
                sx={{
                  display: "inline-flex",
                  alignItems: content === "iconAndLabel" ? "flex-start" : "center",
                  justifyContent: "center",
                }}
              >
                <MinimapTile
                  variant={tileVariant}
                  size={tileSize}
                  iconSize={iconSize}
                  label={cell.label}
                  content={content}
                  category={cell.category}
                  color={cell.color}
                  ringColor={cell.ringColor}
                  chip={cell.chip}
                  icon={cell.icon}
                  isActive={isActive}
                  isEmpty={cell.isEmpty}
                  disabled={cell.disabled}
                  animateActive={animateActive}
                  inactiveColorOpacity={inactiveColorOpacity}
                  categoryColors={categoryColors}
                  showNavigationChevrons={showNavigationChevrons}
                  emphasisDirection={emphasisDirection}
                  canMoveUp={wrapAround || cell.y > 0}
                  canMoveDown={wrapAround || cell.y < gridSize.height - 1}
                  canMoveLeft={wrapAround || cell.x > 0}
                  canMoveRight={wrapAround || cell.x < gridSize.width - 1}
                  tileGap={gap}
                  neighborColors={neighborColors}
                  onClick={cell.isEmpty || cell.disabled ? undefined : () => navigateTo(cell.x, cell.y)}
                  onHoverChange={(info) => {
                    if (!onTileHoverChange) return
                    if (info) onTileHoverChange({ ...info, x: cell.x, y: cell.y })
                    else onTileHoverChange(null)
                  }}
                />
              </Box>
            )
          })}
        </React.Fragment>
      ))}

      {/* Hover preview card — single instance shared across all tiles. */}
      {showHoverPreview && hoverCardData && (
        <MinimapTileHoverCard
          open={Boolean(hoverCardData.anchorEl)}
          anchorEl={hoverCardData.anchorEl}
          label={hoverCardData.label}
          category={hoverCardData.category}
          description={hoverCardData.description}
          icon={hoverCardData.icon}
          color={hoverCardData.color}
          onGo={() => {
            navigateTo(hoverCardData.x, hoverCardData.y)
            setHoveredCell(null)
          }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        />
      )}
    </Box>
  )
}
