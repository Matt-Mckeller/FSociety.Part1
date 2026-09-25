"use client"

import React, { useMemo, useCallback, type ComponentType } from "react"
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Zoom,
  alpha,
  useTheme,
  type SxProps,
  type Theme,
} from "@mui/material"
import ViewListIcon from "@mui/icons-material/ViewList"
import MapIcon from "@mui/icons-material/Map"
import { useNavigation } from "../../navigation"
import type {
  MinimapPanelVariant,
  MinimapPanelThemeProps,
  MinimapPanelVariantProps,
} from "@expanse/theme"

// =============================================================================
// Fallback variants (kept in sync with MinimapPanel for visual parity)
// =============================================================================

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
// Types
// =============================================================================

export interface TileListPanelProps {
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean
  /** Open-state change callback (controlled mode) */
  onOpenChange?: (open: boolean) => void
  /** Header title. @default "Tile List" */
  title?: string
  /** Surface variant; mirrors MinimapPanel tokens. @default "frosted" */
  variant?: MinimapPanelVariant
  /**
   * Render the close button + sibling minimap toggle in the header.
   * @default true
   */
  showToggleButton?: boolean
  /**
   * Render the sibling minimap toggle in the header (only relevant when
   * `showToggleButton` is true).
   * @default true
   */
  showMinimapButton?: boolean
  /** Called when the user clicks the header minimap button */
  onMinimapButtonClick?: () => void
  /** Fixed panel width in px. @default 280 */
  width?: number
  /** Max height of the scrolling row container. @default 360 */
  maxHeight?: number | string
  /** Optional category color overrides applied per-row */
  categoryColors?: Record<string, string>
  /**
   * How rows are organized.
   * - "category" (default): grouped under category headers
   * - "row":      grouped by Y row
   * - "none":     flat list, ordered top-to-bottom, left-to-right
   * @default "category"
   */
  groupBy?: "category" | "row" | "none"
  /** Anchor mode. "static" inside a dock, "fixed" for stand-alone. @default "static" */
  positioning?: "fixed" | "static"
  /** Corner placement when `positioning === "fixed"`. @default "top-right" */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  /** Extra styles applied to the Paper */
  sx?: SxProps<Theme>
}

interface RowData {
  x: number
  y: number
  id: string
  label: string
  category?: string
  icon?: ComponentType<{ sx?: object }>
  inactiveColor: string
  activeColor: string
}

const POSITION_STYLES: Record<
  NonNullable<TileListPanelProps["position"]>,
  { wrapper: SxProps<Theme>; transformOrigin: string }
> = {
  "top-right":    { wrapper: { top: 16, right: 16 },    transformOrigin: "top right" },
  "top-left":     { wrapper: { top: 16, left: 16 },     transformOrigin: "top left" },
  "bottom-right": { wrapper: { bottom: 16, right: 16 }, transformOrigin: "bottom right" },
  "bottom-left":  { wrapper: { bottom: 16, left: 16 },  transformOrigin: "bottom left" },
}

// =============================================================================
// TileListPanel
// =============================================================================

/**
 * Vertical list of all configured tiles, an alternative to `MinimapPanel`.
 * Reads navigation state from the same `useNavigation()` context so the list
 * is always perfectly in sync with the minimap. Clicking a row navigates to
 * that tile.
 *
 * Visual language matches `MinimapPanel`: frosted/solid/default surfaces,
 * per-tile color swatches with optional icons, active-tile accent, hover state.
 */
export function TileListPanel({
  open,
  onOpenChange,
  title = "Tile List",
  variant = "frosted",
  showToggleButton = true,
  showMinimapButton = true,
  onMinimapButtonClick,
  width = 280,
  maxHeight = 360,
  categoryColors,
  groupBy = "category",
  positioning = "static",
  position = "top-right",
  sx,
}: TileListPanelProps) {
  const theme = useTheme()
  const { position: currentPosition, gridSize, navigateTo, getTileAt } = useNavigation()

  const themeVariants = (theme.components as { ExpanseMinimapPanel?: MinimapPanelThemeProps } | undefined)
    ?.ExpanseMinimapPanel?.variants
  const v: MinimapPanelVariantProps = themeVariants?.[variant] ?? FALLBACK_VARIANTS[variant]

  const isOpen = open ?? false
  const handleClose = useCallback(() => onOpenChange?.(false), [onOpenChange])

  // Collect every configured tile in reading order (y, x).
  const rows: RowData[] = useMemo(() => {
    const out: RowData[] = []
    for (let y = 0; y < gridSize.height; y++) {
      for (let x = 0; x < gridSize.width; x++) {
        const tile = getTileAt(x, y)
        if (!tile) continue
        const cat = tile.display.category
        const inactive = (cat && categoryColors?.[cat]) ?? tile.display.colors.inactive
        out.push({
          x,
          y,
          id: tile.id,
          label: tile.display.label ?? tile.seo?.title ?? `(${x + 1}, ${y + 1})`,
          category: cat,
          icon: tile.display.icon as ComponentType<{ sx?: object }> | undefined,
          inactiveColor: inactive,
          activeColor: tile.display.colors.active,
        })
      }
    }
    return out
  }, [gridSize.height, gridSize.width, getTileAt, categoryColors])

  // Group rows for rendering.
  const groups: { key: string; label: string | null; items: RowData[] }[] = useMemo(() => {
    if (groupBy === "none") {
      return [{ key: "all", label: null, items: rows }]
    }
    const map = new Map<string, RowData[]>()
    const order: string[] = []
    for (const r of rows) {
      const key = groupBy === "category" ? (r.category ?? "Uncategorized") : `Row ${r.y + 1}`
      if (!map.has(key)) {
        map.set(key, [])
        order.push(key)
      }
      map.get(key)!.push(r)
    }
    return order.map((key) => ({ key, label: key, items: map.get(key)! }))
  }, [rows, groupBy])

  const positionConfig = POSITION_STYLES[position]

  return (
    <Box
      sx={{
        ...(positioning === "fixed"
          ? { position: "fixed", zIndex: 1200, ...positionConfig.wrapper }
          : {}),
      }}
    >
      <Zoom in={isOpen} unmountOnExit style={{ transformOrigin: positionConfig.transformOrigin }}>
        <Paper
          role="region"
          aria-label={title}
          elevation={0}
          sx={{
            p: 2.25,
            borderRadius: `${v.borderRadius}px`,
            width,
            bgcolor: v.bgcolor,
            ...(v.contentColor ? { color: v.contentColor } : {}),
            backdropFilter: v.backdropFilter,
            border: v.border,
            boxShadow: v.boxShadow,
            display: "flex",
            flexDirection: "column",
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

            {showToggleButton && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
                {showMinimapButton && (
                  <Tooltip title="Map" placement="left">
                    <IconButton size="small" onClick={onMinimapButtonClick}>
                      <MapIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Close list" placement="left">
                  <IconButton size="small" onClick={handleClose}>
                    <ViewListIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>

          {/* Body */}
          <Box
            sx={{
              maxHeight,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1.25,
              pr: 0.5,
              mr: -0.5,
            }}
          >
            {rows.length === 0 ? (
              <Typography
                variant="body2"
                sx={{ color: v.secondaryContentColor ?? "text.secondary", fontStyle: "italic", py: 1 }}
              >
                No tiles configured
              </Typography>
            ) : (
              groups.map((group) => (
                <Box key={group.key} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  {group.label && (
                    <Box
                      sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        bgcolor: v.bgcolor,
                        backdropFilter: v.backdropFilter,
                        py: 0.25,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.6,
                          color: v.secondaryContentColor ?? "text.secondary",
                        }}
                      >
                        {group.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ fontSize: "0.65rem", color: v.secondaryContentColor ?? "text.secondary" }}
                      >
                        {group.items.length}
                      </Typography>
                    </Box>
                  )}

                  {group.items.map((row) => {
                    const isActive =
                      currentPosition.x === row.x && currentPosition.y === row.y
                    return (
                      <TileListRow
                        key={row.id}
                        row={row}
                        isActive={isActive}
                        previewBgcolor={v.previewBgcolor}
                        previewBorder={v.previewBorder}
                        onClick={() => navigateTo(row.x, row.y)}
                      />
                    )
                  })}
                </Box>
              ))
            )}
          </Box>
        </Paper>
      </Zoom>
    </Box>
  )
}

// =============================================================================
// Row
// =============================================================================

interface TileListRowProps {
  row: RowData
  isActive: boolean
  previewBgcolor: string
  previewBorder: string
  onClick: () => void
}

function TileListRow({ row, isActive, previewBgcolor, previewBorder, onClick }: TileListRowProps) {
  const accent = row.activeColor

  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      aria-current={isActive ? "page" : undefined}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        px: 1,
        py: 0.75,
        borderRadius: 1.5,
        border: previewBorder,
        bgcolor: isActive ? alpha(accent, 0.10) : previewBgcolor,
        cursor: "pointer",
        outline: "none",
        transition: "background-color 120ms ease, transform 120ms ease",
        // Left accent stripe on the active row.
        "&::before": isActive
          ? {
              content: '""',
              position: "absolute",
              left: 0,
              top: 4,
              bottom: 4,
              width: 3,
              borderRadius: 1,
              bgcolor: accent,
            }
          : undefined,
        "&:hover": {
          bgcolor: isActive ? alpha(accent, 0.16) : alpha(accent, 0.06),
        },
        "&:focus-visible": {
          boxShadow: `0 0 0 2px ${alpha(accent, 0.45)}`,
        },
      }}
    >
      {/* Color swatch w/ icon */}
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: row.inactiveColor,
          flexShrink: 0,
        }}
      >
        {row.icon && <row.icon sx={{ fontSize: 16, color: "white" }} />}
      </Box>

      {/* Text block */}
      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="body2"
          noWrap
          sx={{ fontWeight: isActive ? 700 : 600, lineHeight: 1.2 }}
        >
          {row.label}
        </Typography>
        {row.category && (
          <Typography
            variant="caption"
            noWrap
            sx={{ color: "text.secondary", lineHeight: 1.2, fontSize: "0.7rem" }}
          >
            {row.category}
          </Typography>
        )}
      </Box>

      {/* Coords */}
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontSize: "0.65rem",
          fontVariantNumeric: "tabular-nums",
          flexShrink: 0,
        }}
      >
        [{row.x + 1}, {row.y + 1}]
      </Typography>
    </Box>
  )
}
