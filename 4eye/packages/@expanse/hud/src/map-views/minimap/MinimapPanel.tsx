"use client"

import React, { useState, useMemo, useCallback, type ComponentType, type ReactNode } from "react"
import {
  Box,
  Fab,
  Paper,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Zoom,
  useTheme,
  type SxProps,
  type Theme,
} from "@mui/material"
import MapIcon from "@mui/icons-material/Map"
import ViewListIcon from "@mui/icons-material/ViewList"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { PlusCloseGlyph } from "../../hud-components/primitives/PlusCloseGlyph"
import { useHudStateOptional } from "../../hud/overlay-state"
import {
  ExpandingBarTripleLayer,
} from "@expanse/brand-core"
import { useNavigation } from "@expanse/map"
import { useHudBarSizes } from "../../hud/slots"
import { ActionButton } from "../../hud-components/action-button"
import { ActionGroup } from "../../hud-components/action-group"
import { MinimapTile, type MinimapTileHoverInfo } from "@expanse/map"
import { MinimapTileGrid, MinimapCategoryLegend, useMinimapLegendItems, type MinimapTileGridHoverInfo, type MinimapPanelLegendItem } from "@expanse/map"
import type {
  MinimapTileVariant,
  MinimapPanelVariant,
  MinimapPanelThemeProps,
  MinimapPanelVariantProps,
} from "@expanse/theme"

// Re-export so consumers only need to import from the minimap barrel
export type { MinimapTileVariant as MinimapPanelTileVariant }
export type { MinimapPanelVariant }
export type { MinimapPanelLegendItem }

// =============================================================================
// Types
// =============================================================================

export interface MinimapPanelProps {
  /**
   * Controlled open state.
   * When provided, `onOpenChange` must also be provided.
   */
  open?: boolean
  /** Called when the open state should change (controlled mode) */
  onOpenChange?: (open: boolean) => void
  /** Initial open state for uncontrolled mode. @default false */
  defaultOpen?: boolean
  /** Panel header title. @default "Navigation Map" */
  title?: string
  /**
   * Whether to render the built-in toggle button.
   * When false, open state must be managed externally via `open` + `onOpenChange`.
   * @default true
   */
  showToggleButton?: boolean
  /**
   * Whether to render the list-view toggle button as a sibling of the map toggle.
   * When the panel is collapsed, the button sits next to the map IconButton in
   * the corner stack. When expanded, it joins the panel header.
   * @default true
   */
  showListViewButton?: boolean
  /** Controlled open state for the list view (paired with `onListViewOpenChange`). */
  listViewOpen?: boolean
  /** Called when the list-view open state should change. */
  onListViewOpenChange?: (open: boolean) => void
  /**
   * Position of the panel + toggle button group on screen.
   * @default "top-right"
   */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  /**
   * Size of each grid cell in pixels.
   * @default 22
   */
  tileSize?: number
  /**
   * Gap between grid cells in pixels.
   * @default 3
   */
  gap?: number
  /**
   * Visual style variant for all tiles in this panel.
   * @default "default"
   */
  tileVariant?: MinimapTileVariant
  /**
   * Surface variant for the panel + toggle button chrome.
   * Reads from `theme.components.ExpanseMinimapPanel.variants[variant]`.
   * @default "frosted"
   */
  variant?: MinimapPanelVariant
  /**
   * Category color overrides applied to every tile in this panel.
   * Merged on top of theme and tile-level defaults.
   */
  categoryColors?: Record<string, string>
  /**
   * Show pulse animation on the active tile.
   * @default true
   */
  animateActive?: boolean
  /**
   * Legend items shown below the grid.
   * Auto-derived from tile categories when omitted.
   * Pass an empty array to hide the legend entirely.
   */
  legend?: MinimapPanelLegendItem[]
  /**
   * Optional content rendered inside the panel header, between the title and
   * the close/toggle button. Use this to surface companion controls (e.g.
   * inventory slot buttons) inline when the panel is expanded so they don't
   * consume extra screen space.
   */
  headerSlot?: ReactNode
  /** Additional styles applied to the panel Paper */
  sx?: SxProps<Theme>
  /**
   * When set, a full-screen map control is shown in the panel header
   * (e.g. host opens an immersive map surface).
   */
  onFullScreenRequest?: () => void
  /**
   * When true, the full-screen-request button morphs into a close
   * (rounded frame → plus) button and routes its click to
   * {@link onFullScreenClose}. Lets the dock double as the canonical
   * "return" affordance while a host-owned full-screen overlay is mounted.
   *
   * Has no effect unless {@link onFullScreenRequest} is also provided
   * (the button slot is gated on the request handler).
   * @default false
   */
  isFullScreenOpen?: boolean
  /**
   * Click handler for the morphed close button (only consulted when
   * {@link isFullScreenOpen} is true).
   */
  onFullScreenClose?: () => void
  /**
   * How the panel anchors itself.
   * - "fixed" (default): renders `position: fixed` at the configured corner.
   *   Use this when MinimapPanel is the sole owner of its viewport corner.
   * - "static": renders inline with no fixed positioning. Use this when an
   *   outer container (e.g. `MinimapDock`) controls placement.
   * @default "fixed"
   */
  positioning?: "fixed" | "static"
}

// =============================================================================
// Internal
// =============================================================================

interface CellData {
  x: number
  y: number
  label: string
  icon?: ComponentType<{ sx?: object }>
  category?: string
  color?: string
  isEmpty: boolean
}

const POSITION_STYLES: Record<
  NonNullable<MinimapPanelProps["position"]>,
  { wrapper: SxProps<Theme>; panelAlign: "flex-start" | "flex-end"; transformOrigin: string }
> = {
  "top-right":    { wrapper: { top: 16, right: 16 },    panelAlign: "flex-end",   transformOrigin: "top right" },
  "top-left":     { wrapper: { top: 16, left: 16 },     panelAlign: "flex-start", transformOrigin: "top left" },
  "bottom-right": { wrapper: { bottom: 16, right: 16 }, panelAlign: "flex-end",   transformOrigin: "bottom right" },
  "bottom-left":  { wrapper: { bottom: 16, left: 16 },  panelAlign: "flex-start", transformOrigin: "bottom left" },
}

// =============================================================================
// Fallback variants
// =============================================================================
// Used when `theme.components.ExpanseMinimapPanel` is not configured.
// Mirrors the values produced by `createMinimapPanelConfig` so the visual
// stays identical to the shipped frosted look without theme registration.

const FALLBACK_VARIANTS: Record<MinimapPanelVariant, MinimapPanelVariantProps> = {
  frosted: {
    bgcolor: "rgba(255, 255, 255, 0.94)",
    border: "1px solid rgba(0, 0, 0, 0.30)",
    borderRadius: 8,
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
    dividerColor: "rgba(0, 0, 0, 0.15)",
    previewBgcolor: "rgba(0, 0, 0, 0.04)",
    previewBorder: "1px solid rgba(0, 0, 0, 0.15)",
    badgeBgcolor: "rgba(0, 0, 0, 0.08)",
    badgeBorder: "1px solid rgba(0, 0, 0, 0.12)",
    legendSwatchBorder: "1px solid rgba(0, 0, 0, 0.10)",
    toggleBgcolor: "rgba(255, 255, 255, 0.94)",
    toggleHoverBgcolor: "rgba(255, 255, 255, 1)",
    toggleBorder: "1px solid rgba(0, 0, 0, 0.30)",
    toggleBoxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
  },
  default: {
    bgcolor: "rgba(255, 255, 255, 0.94)",
    border: "1px solid rgba(0, 0, 0, 0.20)",
    borderRadius: 8,
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.20)",
    dividerColor: "rgba(0, 0, 0, 0.15)",
    previewBgcolor: "rgba(0, 0, 0, 0.04)",
    previewBorder: "1px solid rgba(0, 0, 0, 0.15)",
    badgeBgcolor: "rgba(0, 0, 0, 0.08)",
    badgeBorder: "1px solid rgba(0, 0, 0, 0.12)",
    legendSwatchBorder: "1px solid rgba(0, 0, 0, 0.10)",
    toggleBgcolor: "rgba(255, 255, 255, 0.94)",
    toggleHoverBgcolor: "rgba(255, 255, 255, 1)",
    toggleBorder: "1px solid rgba(0, 0, 0, 0.20)",
    toggleBoxShadow: "0 4px 16px rgba(0, 0, 0, 0.20)",
  },
  solid: {
    bgcolor: "#ffffff",
    border: "1px solid rgba(0, 0, 0, 0.30)",
    borderRadius: 8,
    backdropFilter: "none",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
    dividerColor: "rgba(0, 0, 0, 0.15)",
    previewBgcolor: "rgba(0, 0, 0, 0.04)",
    previewBorder: "1px solid rgba(0, 0, 0, 0.15)",
    badgeBgcolor: "rgba(0, 0, 0, 0.08)",
    badgeBorder: "1px solid rgba(0, 0, 0, 0.12)",
    legendSwatchBorder: "1px solid rgba(0, 0, 0, 0.10)",
    toggleBgcolor: "#ffffff",
    toggleHoverBgcolor: "#ffffff",
    toggleBorder: "1px solid rgba(0, 0, 0, 0.30)",
    toggleBoxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
  },
  // Dark panel-blue surface — matches the CompactStatusBar’s inner fill (#2C4F76).
  dark: {
    bgcolor: "#2C4F76",
    border: "1px solid rgba(255, 255, 255, 0.20)",
    borderRadius: 8,
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
    dividerColor: "rgba(255, 255, 255, 0.15)",
    previewBgcolor: "rgba(0, 0, 0, 0.20)",
    previewBorder: "1px solid rgba(255, 255, 255, 0.12)",
    badgeBgcolor: "rgba(255, 255, 255, 0.12)",
    badgeBorder: "1px solid rgba(255, 255, 255, 0.15)",
    legendSwatchBorder: "1px solid rgba(255, 255, 255, 0.12)",
    toggleBgcolor: "#2C4F76",
    toggleHoverBgcolor: "rgba(255, 255, 255, 0.08)",
    toggleBorder: "1px solid rgba(255, 255, 255, 0.20)",
    toggleBoxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
    contentColor: "#FFFFFF",
    secondaryContentColor: "rgba(255, 255, 255, 0.60)",
  },
}

// =============================================================================
// MinimapPanel
// =============================================================================

/**
 * Rich minimap overlay panel for spatial navigation.
 *
 * Features:
 * - Animated open/close via MUI Zoom
 * - Hover preview: icon, title, coordinates
 * - Current position chip
 * - Row + column axis labels
 * - Per-category colored cells via MinimapTile
 * - Active position indicator (border + optional pulse animation)
 * - Auto-derived category legend (tooltip labels by default)
 * - Controllable open state (controlled or uncontrolled)
 *
 * Uses `MinimapTile` for every grid cell — all tile theming is centralized there.
 *
 * @example
 * // Uncontrolled — self-contained toggle button
 * <MinimapPanel defaultOpen title="Site Map" />
 *
 * @example
 * // Controlled by parent
 * const [open, setOpen] = useState(false)
 * <MinimapPanel open={open} onOpenChange={setOpen} showToggleButton={false} />
 */
export function MinimapPanel({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  title = "Navigation Map",
  showToggleButton = true,
  showListViewButton = true,
  listViewOpen,
  onListViewOpenChange,
  position = "top-right",
  tileSize = 22,
  gap = 3,
  tileVariant = "default",
  variant = "frosted",
  categoryColors,
  animateActive = true,
  legend: legendProp,
  headerSlot,
  sx,
  onFullScreenRequest,
  isFullScreenOpen = false,
  onFullScreenClose,
  positioning = "fixed",
}: MinimapPanelProps) {
  const theme = useTheme()
  const barSizes = useHudBarSizes()
  const mapClosing = Boolean(useHudStateOptional()?.isMapViewClosing)
  const { position: currentPosition, gridSize, getTileAt } = useNavigation()
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [hoveredInfo, setHoveredInfo] = useState<MinimapTileGridHoverInfo | null>(null)

  // ---- Zoom (internal state; clamped). ----
  const ZOOM_MIN = 16
  const ZOOM_MAX = 40
  const ZOOM_STEP = 4
  const [zoomDelta, setZoomDelta] = useState(0)
  const effectiveTileSize = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, tileSize + zoomDelta))
  const canZoomIn  = effectiveTileSize < ZOOM_MAX
  const canZoomOut = effectiveTileSize > ZOOM_MIN
  const handleZoomIn  = useCallback(() => setZoomDelta(d => Math.min(ZOOM_MAX - tileSize, d + ZOOM_STEP)), [tileSize])
  const handleZoomOut = useCallback(() => setZoomDelta(d => Math.max(ZOOM_MIN - tileSize, d - ZOOM_STEP)), [tileSize])

  // ---- Resolve theme variant config (with fallback) ----
  const themeVariants = (theme.components as { ExpanseMinimapPanel?: MinimapPanelThemeProps } | undefined)
    ?.ExpanseMinimapPanel?.variants
  const v: MinimapPanelVariantProps = themeVariants?.[variant] ?? FALLBACK_VARIANTS[variant]

  const panelWidth = useMemo(() => {
    const gridPx = effectiveTileSize * gridSize.width + gap * (gridSize.width - 1)
    const labelPx = Math.max(18, Math.ceil(effectiveTileSize * 0.75))
    // Hug the grid: row label + grid + horizontal padding (p: 2.25 → ~36px)
    return gridPx + labelPx + 36
  }, [effectiveTileSize, gridSize.width, gap])

  const rowLabelWidth = useMemo(() => Math.max(14, Math.ceil(effectiveTileSize * 0.65)), [effectiveTileSize])
  const iconSize      = useMemo(() => Math.max(10, Math.min(16, Math.ceil(effectiveTileSize * 0.55))), [effectiveTileSize])

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? (controlledOpen ?? false) : internalOpen

  const handleToggle = useCallback(() => {
    const next = !isOpen
    if (isControlled) onOpenChange?.(next)
    else setInternalOpen(next)
  }, [isOpen, isControlled, onOpenChange])

  const handleClose = useCallback(() => {
    if (isControlled) onOpenChange?.(false)
    else setInternalOpen(false)
  }, [isControlled, onOpenChange])

  const handleListViewToggle = useCallback(() => {
    onListViewOpenChange?.(!(listViewOpen ?? false))
  }, [listViewOpen, onListViewOpenChange])

  // Current active tile info for preview default state
  const currentTileInfo = useMemo(() => {
    const tile = getTileAt(currentPosition.x, currentPosition.y)
    if (!tile) return null
    return {
      x: currentPosition.x,
      y: currentPosition.y,
      label: tile.display.label ?? `(${currentPosition.x + 1}, ${currentPosition.y + 1})`,
      icon: tile.display.icon as ComponentType<{ sx?: object }> | undefined,
      category: tile.display.category,
      color: tile.display.colors.inactive,
    }
  }, [getTileAt, currentPosition])

  // Show current tile by default; override with hover when present
  const displayedInfo = hoveredInfo ?? currentTileInfo
  const isPreviewing = hoveredInfo !== null

  const autoLegend = useMinimapLegendItems(categoryColors)

  const legend          = legendProp ?? autoLegend
  const positionConfig  = POSITION_STYLES[position]
  const isBottomPosition = position.startsWith("bottom")
  const flexDirection   = isBottomPosition ? "column-reverse" : "column"

  return (
    <Box
      sx={{
        ...(positioning === "fixed"
          ? { position: "fixed", zIndex: 1200, ...positionConfig.wrapper }
          : {}),
        display: "flex",
        flexDirection,
        alignItems: positionConfig.panelAlign,
        gap: 1.5,
      }}
    >
      {/* Toggle buttons — only visible when panel is CLOSED.
          Rendered as a single 3-layer pill (matching CompactStatusBar /
          ContextBar) containing two ActionButtons. When open, the panel's
          header close button (also a MapIcon) acts as the toggle, creating
          a morph effect from pill → panel. */}
      {!isOpen && (showToggleButton || showListViewButton) && (() => {
        const buttonCount = (showListViewButton ? 1 : 0) + (showToggleButton ? 1 : 0)
        // Match CompactStatusBar's collapsed dims (header × 2.6) when both
        // toggle buttons are visible. Shrink by one action width per missing
        // button so the visual rim stays constant on each side.
        const STANDARD_BUTTONS = 2
        const COMPACT_STATUS_RATIO = 2.6
        const matchedWidth = Math.round(barSizes.header * COMPACT_STATUS_RATIO)
        const sideRim = (matchedWidth - STANDARD_BUTTONS * barSizes.action) / 2
        const pillHeight = barSizes.header
        const pillWidth = Math.round(buttonCount * barSizes.action + 2 * sideRim)
        const pillAspectRatio = pillWidth / pillHeight
        // Map responsive action px → ActionButton size token.
        const actionSizeToken =
          barSizes.action <= 28 ? "xxs" :
          barSizes.action <= 32 ? "xs"  :
          barSizes.action <= 36 ? "sm"  :
          barSizes.action <= 40 ? "md"  :
          "lg"
        return (
          <Box
            sx={{
              width: pillWidth,
              height: pillHeight,
              display: "inline-flex",
            }}
          >
            <ExpandingBarTripleLayer preset="cloud" variant="default" aspectRatio={pillAspectRatio}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0,
                  px: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <ActionGroup mode="buttons" indicator="none">
                  {showListViewButton && !isFullScreenOpen && (
                    <ActionButton
                      icon={<ViewListIcon fontSize="small" />}
                      label="Tile List"
                      size={actionSizeToken}
                      colorMode="dark"
                      onClick={handleListViewToggle}
                    />
                  )}
                  {showToggleButton && (
                    <ActionButton
                      icon={
                        isFullScreenOpen ? (
                          <PlusCloseGlyph plus={mapClosing} fontSize="small" />
                        ) : (
                          <MapIcon fontSize="small" />
                        )
                      }
                      label={isFullScreenOpen ? "Return to game" : "Open map"}
                      size={actionSizeToken}
                      colorMode="dark"
                      onClick={
                        isFullScreenOpen
                          ? onFullScreenClose ?? handleToggle
                          : handleToggle
                      }
                    />
                  )}
                </ActionGroup>
              </Box>
            </ExpandingBarTripleLayer>
          </Box>
        )
      })()}

      <Zoom in={isOpen} unmountOnExit style={{ transformOrigin: positionConfig.transformOrigin }}>
        <Box
          sx={{
            display: "flex",
            // Fab column sits on the inboard side (toward viewport center):
            // right-anchored panels -> Fabs on the left; left-anchored -> right.
            flexDirection: positionConfig.panelAlign === "flex-end" ? "row" : "row-reverse",
            alignItems: "flex-start",
            gap: 1,
          }}
        >
          {/* Map action Fab column — Full Screen / Zoom In / Zoom Out.
              Icon-only with tooltips; sits adjacent to the open panel. */}
          <Stack direction="column" spacing={1} sx={{ pt: 0.5, flexShrink: 0 }}>
            {onFullScreenRequest && (
              <Tooltip
                title={isFullScreenOpen ? "Return to game (Esc)" : "Full screen map"}
                placement={positionConfig.panelAlign === "flex-end" ? "left" : "right"}
              >
                <Fab
                  size="small"
                  color="primary"
                  onClick={
                    isFullScreenOpen
                      ? onFullScreenClose ?? onFullScreenRequest
                      : onFullScreenRequest
                  }
                  aria-label={isFullScreenOpen ? "Return to game" : "Open full screen map"}
                >
                  {isFullScreenOpen ? (
                    <FullscreenExitIcon fontSize="small" />
                  ) : (
                    <FullscreenIcon fontSize="small" />
                  )}
                </Fab>
              </Tooltip>
            )}
            <Tooltip title="Zoom in" placement={positionConfig.panelAlign === "flex-end" ? "left" : "right"}>
              <span>
                <Fab
                  size="small"
                  onClick={handleZoomIn}
                  disabled={!canZoomIn}
                  aria-label="Zoom in"
                >
                  <AddIcon fontSize="small" />
                </Fab>
              </span>
            </Tooltip>
            <Tooltip title="Zoom out" placement={positionConfig.panelAlign === "flex-end" ? "left" : "right"}>
              <span>
                <Fab
                  size="small"
                  onClick={handleZoomOut}
                  disabled={!canZoomOut}
                  aria-label="Zoom out"
                >
                  <RemoveIcon fontSize="small" />
                </Fab>
              </span>
            </Tooltip>
          </Stack>

          <Paper
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: `${v.borderRadius}px`,
              width: panelWidth,
              bgcolor: v.bgcolor,
              ...(v.contentColor ? { color: v.contentColor } : {}),
              backdropFilter: v.backdropFilter,
              border: v.border,
              boxShadow: v.boxShadow,
              ...sx,
            }}
          >
          {/* Header */}
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              pt: 1,
              mb: 1.25,
              pb: 1.25,
              borderBottom: `1px solid ${v.dividerColor}`,
            }}
          >
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 700, 
                fontSize: "0.95rem",
                letterSpacing: "-0.01em",
                flexShrink: 0,
              }}
            >
              {title}
            </Typography>

            {/* Companion controls (e.g. game slot buttons) injected by MinimapDock when expanded */}
            {headerSlot && (
              <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", mx: 0.5, gap: 0.25, overflow: "visible" }}>
                {headerSlot}
              </Box>
            )}

            {showToggleButton && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
                {showListViewButton && (
                  <Tooltip title="Tile List" placement="left">
                    <IconButton size="small" onClick={handleListViewToggle}>
                      <ViewListIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Close map" placement="left">
                  <IconButton size="small" onClick={handleClose}>
                    <MapIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>

          {/* Page Preview Card — defaults to current page, hover overrides.
              Fixed height (32px content + 8px*2 padding) so the panel does not
              resize when there is no tile at the current position. */}
          <Box
            sx={{
              mb: 1.25,
              p: 1,
              bgcolor: v.previewBgcolor,
              borderRadius: 1.5,
              border: v.previewBorder,
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              overflow: "hidden",
              position: "relative",
              height: 48,
            }}
          >
            {displayedInfo ? (
              <>
                {/* Color swatch with icon */}
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: displayedInfo.color,
                    flexShrink: 0,
                  }}
                >
                  {displayedInfo.icon && (
                    <displayedInfo.icon sx={{ fontSize: iconSize + 2, color: "white" }} />
                  )}
                </Box>

                {/* Text block */}
                <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", height: 32 }}>
                  <Typography 
                    variant="body2" 
                    noWrap 
                    sx={{ fontWeight: 600, lineHeight: 1.2, fontStyle: isPreviewing ? "italic" : "normal" }}
                  >
                    {displayedInfo.label}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    noWrap 
                    sx={{ color: v.secondaryContentColor ?? "text.secondary", lineHeight: 1.2 }}
                  >
                    [{displayedInfo.x + 1}, {displayedInfo.y + 1}]
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                {/* Empty placeholder swatch keeps row height consistent */}
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    bgcolor: v.badgeBgcolor,
                    border: v.badgeBorder,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" sx={{ color: v.secondaryContentColor ?? "text.secondary", fontStyle: "italic" }}>
                  No page at current position
                </Typography>
              </>
            )}
          </Box>

          {/* Grid */}
          <MinimapTileGrid
            tileSize={effectiveTileSize}
            gap={gap}
            tileVariant={tileVariant}
            animateActive={animateActive}
            categoryColors={categoryColors}
            iconSize={iconSize}
            onTileHoverChange={setHoveredInfo}
          />

          {/* Legend */}
          {legend.length > 0 && (
            <Box
              sx={{
                mt: 1.5,
                pt: 1.25,
                borderTop: `1px solid ${v.dividerColor}`,
              }}
            >
              <MinimapCategoryLegend
                items={legend}
                swatchBorder={v.legendSwatchBorder}
              />
            </Box>
          )}
        </Paper>
        </Box>
      </Zoom>
    </Box>
  )
}

