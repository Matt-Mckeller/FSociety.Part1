"use client"

import React, { useCallback, type ReactNode } from "react"
import type { SxProps, Theme } from "@mui/material"
import {
  MinimapFullViewShell,
  type MinimapFullViewShellProps,
  MinimapFullGrid,
  type PlayerBlipVariant,
  MinimapFullLegend,
  useFullMapEscape,
  type FullMapEntrance,
} from "@expanse/map"
import { useRegisterHudChromeHide } from "../../hud/slots"
import type { MinimapTileVariant } from "@expanse/theme"

/**
 * Sizing/density presets for `MinimapFullView`. Each preset is a partial
 * defaults bag — explicit props on `MinimapFullView` always override.
 */
const PRESETS: Record<
  "hero" | "large" | "medium" | "small" | "thumbnail",
  {
    density: "comfortable" | "compact"
    tileContent: "iconOnly" | "iconAndLabel" | "titleOnTile"
    minTileSize: number
    maxTileSize: number
  }
> = {
  hero:      { density: "comfortable", tileContent: "titleOnTile",  minTileSize: 72, maxTileSize: 200 },
  large:     { density: "comfortable", tileContent: "iconAndLabel", minTileSize: 56, maxTileSize: 120 },
  medium:    { density: "compact",     tileContent: "iconAndLabel", minTileSize: 40, maxTileSize: 88  },
  small:     { density: "compact",     tileContent: "iconAndLabel", minTileSize: 28, maxTileSize: 56  },
  thumbnail: { density: "compact",     tileContent: "iconOnly",     minTileSize: 20, maxTileSize: 40  },
}

export interface MinimapFullViewProps {
  // ── lifecycle ─────────────────────────────────────────────
  /** Whether the view is mounted/visible. Fully controlled. */
  open: boolean
  /** Called when open should change (Esc, host control). */
  onOpenChange: (open: boolean) => void
  /**
   * Called when the user invokes Return / Esc. Defaults to
   * `onOpenChange(false)` when omitted.
   */
  onExit?: () => void

  // ── chrome ────────────────────────────────────────────────
  title?: ReactNode
  flat?: boolean
  navigationActions?: ReactNode
  roleActions?: ReactNode
  contextBar?: ReactNode

  // ── content slots ─────────────────────────────────────────
  // Chat is intentionally NOT a slot — it lives at the HUD layer (§5.4)
  // and overlays this surface from outside.
  footer?: ReactNode
  topChromeInset?: number
  leftChromeInset?: number
  rightChromeInset?: number
  bottomChromeInset?: number

  // ── grid behavior ─────────────────────────────────────────
  // Wired to `MinimapFullGrid`. List-view props remain accepted for API
  // stability; host integration ships in Phase 4.
  tileContent?: "iconOnly" | "iconAndLabel" | "titleOnTile"
  /**
   * Chip shape, forwarded to `MinimapFullGrid`. @default "default"
   */
  tileVariant?: MinimapTileVariant
  tileSize?: number | "responsive"
  /**
   * Floor tile size when responsive. Forwarded to `MinimapFullGrid`.
   * Lower this when embedding the surface in a height-constrained card
   * (e.g. an inline marketing preview) so tiles can shrink to fit.
   */
  minTileSize?: number
  /** Cap tile size when responsive. Forwarded to `MinimapFullGrid`. */
  maxTileSize?: number
  /** Per-instance category color overrides for tiles + auto legend. */
  categoryColors?: Record<string, string>
  showLegend?: boolean
  showListView?: boolean
  defaultListViewOpen?: boolean
  listViewOpen?: boolean
  onListViewOpenChange?: (open: boolean) => void

  // ── motion ────────────────────────────────────────────────
  entrance?: FullMapEntrance

  /** Visual density preset, forwarded to the shell. */
  density?: "comfortable" | "compact"

  /**
   * Sizing preset that bakes in defaults for `density`, `tileContent`,
   * `minTileSize`, and `maxTileSize`. Explicit props always win.
   *
   * - `hero`      — full-screen overlay (responsive 48–200, comfortable)
   * - `large`     — large inline card  (responsive 56–120, comfortable)
   * - `medium`    — standard inline    (responsive 40–88,  compact)
   * - `small`     — sidebar embed      (responsive 28–56,  compact)
   * - `thumbnail` — preview chip       (responsive 20–40,  compact, iconOnly)
   */
  preset?: "hero" | "large" | "medium" | "small" | "thumbnail"

  /**
   * Show directional chevrons around the active tile to indicate
   * navigation. Forwarded to `MinimapFullGrid`. @default true
   */
  showNavigationChevrons?: boolean

  /**
   * Surface a hover preview card (icon + label + description + Go button)
   * on non-active tiles. Forwarded to `MinimapFullGrid`. @default true
   */
  showHoverPreview?: boolean
  /**
   * Which chevron on the active tile is emphasised (1.5× size, lifted
   * offset, animated pulse). Other chevrons render at the baseline
   * size with no animation. Pass `null` to disable emphasis.
   * Forwarded to `MinimapFullGrid`. @default "up"
   */
  emphasisDirection?: "up" | "down" | "left" | "right" | null
  // ── player blip ───────────────────────────────────────────
  /**
   * Show an animated "you are here" indicator on the active tile.
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
   * Grid coordinates of the destination tile. Renders a `DestinationDot`
   * below that tile and biases the origin beacon rings toward it.
   */
  destinationPosition?: { x: number; y: number }
  /**
   * Per-tile visit progress map, keyed `"${x},${y}"`, value 0–1.
   * Shown in the `DestinationDot` progress ring.
   */
  tileProgress?: Record<string, number>
  // ── styling escape hatches ────────────────────────────────
  sx?: SxProps<Theme>
  className?: string
}

/**
 * Public full-viewport map experience.
 *
 * Composes `MinimapFullViewShell` with `MinimapFullGrid` and (optionally)
 * `MinimapFullLegend`. Esc routes through `onExit` (defaults to
 * `onOpenChange(false)`); focus is restored to the previously focused
 * element on close.
 *
 * Must be rendered inside a `NavigationProvider` so the grid can read the
 * tile registry and dispatch navigation.
 */
export function MinimapFullView({
  open,
  onOpenChange,
  onExit,
  title = "Map",
  flat = true,
  navigationActions,
  roleActions,
  contextBar,
  footer,
  topChromeInset,
  leftChromeInset,
  rightChromeInset,
  bottomChromeInset,
  tileContent,
  tileVariant = "default",
  tileSize = "responsive",
  minTileSize,
  maxTileSize,
  categoryColors,
  showLegend = true,
  showListView: _showListView,
  defaultListViewOpen: _defaultListViewOpen,
  listViewOpen: _listViewOpen,
  onListViewOpenChange: _onListViewOpenChange,
  entrance = "from-top-right",
  density,
  preset,
  showNavigationChevrons = true,
  showHoverPreview = true,
  emphasisDirection = "up",
  showPlayerBlip = true,
  playerBlipVariant,
  playerBlipColor,
  destinationPosition,
  tileProgress,
  sx,
  className,
}: MinimapFullViewProps) {
  const handleExit = useCallback(() => {
    if (onExit) onExit()
    else onOpenChange(false)
  }, [onExit, onOpenChange])

  useFullMapEscape({ active: open, onExit: handleExit })

  // Hide the default bottom orb bar while the map is open — the
  // MapActionBar provides its own directional nav orbs at this layer.
  useRegisterHudChromeHide({
    id: "minimap-full-view-hide-orb-bar",
    hide: ["bottomOrbBar"],
    enabled: open,
  })

  if (!open) return null

  // Resolve preset defaults; explicit props win.
  const presetDefaults = preset ? PRESETS[preset] : undefined
  const effectiveDensity     = density     ?? presetDefaults?.density
  const effectiveTileContent = (tileContent ?? presetDefaults?.tileContent ?? "iconAndLabel") as
    | "iconOnly"
    | "iconAndLabel"
    | "titleOnTile"
  const effectiveMinTileSize = minTileSize ?? presetDefaults?.minTileSize
  const effectiveMaxTileSize = maxTileSize ?? presetDefaults?.maxTileSize

  const shellProps: MinimapFullViewShellProps = {
    title,
    flat,
    navigationActions,
    roleActions,
    contextBar,
    footer,
    topChromeInset,
    leftChromeInset,
    rightChromeInset,
    bottomChromeInset,
    entrance,
    density: effectiveDensity,
    sx,
    className,
    legend: showLegend ? (
      <MinimapFullLegend categoryColors={categoryColors} />
    ) : undefined,
  }

  return (
    <MinimapFullViewShell {...shellProps}>
      <MinimapFullGrid
        tileSize={tileSize}
        {...(effectiveMinTileSize !== undefined ? { minTileSize: effectiveMinTileSize } : {})}
        {...(effectiveMaxTileSize !== undefined ? { maxTileSize: effectiveMaxTileSize } : {})}
        content={effectiveTileContent}
        tileVariant={tileVariant}
        categoryColors={categoryColors}
        showNavigationChevrons={showNavigationChevrons}
        showHoverPreview={showHoverPreview}
        emphasisDirection={emphasisDirection}
        showPlayerBlip={showPlayerBlip}
        {...(playerBlipVariant !== undefined ? { playerBlipVariant } : {})}
        {...(playerBlipColor !== undefined ? { playerBlipColor } : {})}
        {...(destinationPosition !== undefined ? { destinationPosition } : {})}
        {...(tileProgress !== undefined ? { tileProgress } : {})}
      />
    </MinimapFullViewShell>
  )
}
