"use client"

import React, { useRef, useState, type ReactNode } from "react"
import {
  Box,
  Paper,
  Popper,
  Fade,
  ClickAwayListener,
  Tooltip,
  Typography,
} from "@mui/material"
import GridViewIcon from "@mui/icons-material/GridView"
import ViewListIcon from "@mui/icons-material/ViewList"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import PushPinIcon from "@mui/icons-material/PushPin"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlined"
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates"
import LabelIcon from "@mui/icons-material/Label"
import KeyboardIcon from "@mui/icons-material/Keyboard"
import CheckIcon from "@mui/icons-material/Check"
import { ActionBar } from "../action-bars"
import type { ActionBarProps } from "../action-bars"
import { ActionButton } from "../action-button"
import { ActionGroup } from "../action-group"
import { LiddedColorPicker } from "../color-picker"
import {
  useHudHints,
  useHasHudHintsProvider,
  ALL_HUD_HINTS,
  type HudHint,
} from "../../hud/slots"

// =============================================================================
// Types
// =============================================================================

export type SettingsBarViewMode = "grid" | "list"
export type SettingsBarThemeMode = "light" | "dark"

export interface SettingsBarToggle {
  /** Stable key for this toggle */
  id: string
  /** Tooltip / aria label */
  label: string
  /** Icon shown when inactive */
  icon: ReactNode
  /** Optional alternate icon shown when active */
  iconOn?: ReactNode
  /** Whether the toggle is currently on */
  active?: boolean
  /** Click handler */
  onClick?: () => void
}

export type SettingsBarLayout = "basic" | "full" | "plus"

export interface SettingsBarProps
  extends Omit<ActionBarProps, "children" | "orientation"> {
  /** Orientation — vertical fits the right rail above minimap. @default "vertical" */
  orientation?: "horizontal" | "vertical"
  /**
   * Layout preset.
   * - `"basic"` — minimal HUD: theme toggle + accessibility only.
   *   Other controls are hidden even if their props are passed.
   * - `"full"` (default) — render every control whose props are supplied
   *   (view mode, theme, a11y, zoom, pin, extras).
   * - `"plus"` — compact action bar: prominent Add (+) button, then theme + a11y.
   *   Ideal for a quick-create HUD rail.
   * @default "full"
   */
  layout?: SettingsBarLayout
  /**
   * Callback for the Add (+) button shown in `layout="plus"` mode.
   * If omitted, the Add button is still rendered but non-functional.
   */
  onAddClick?: () => void
  /** Current view mode (grid/list). Omit to hide this control. */
  viewMode?: SettingsBarViewMode
  onViewModeChange?: (mode: SettingsBarViewMode) => void
  /** Current theme mode. Omit to hide this control. */
  themeMode?: SettingsBarThemeMode
  onThemeModeChange?: (mode: SettingsBarThemeMode) => void
  /** Show accessibility / a11y button. @default false */
  showAccessibility?: boolean
  onAccessibilityClick?: () => void
  /** Show zoom button. @default false */
  showZoom?: boolean
  onZoomClick?: () => void
  /** Pin state. Omit to hide. */
  pinned?: boolean
  onPinToggle?: (pinned: boolean) => void
  /**
   * Currently selected accent / paint color. Provide together with
   * `onColorChange` and `colorOptions` to render the lidded color picker.
   */
  color?: string
  onColorChange?: (color: string) => void
  /** Color choices revealed when the lid lifts. Required to show the picker. */
  colorOptions?: string[]
  /**
   * Called when the user *clicks* the eye (vs hovering). Use this to open
   * a full color-picker surface (e.g. drawer with HSL controls / presets).
   * If omitted the picker falls back to a sticky inline preview on click.
   */
  onColorPickerActivate?: () => void
  /**
   * Active HUD hints (labels / hotkeys). Multi-select — both can be on.
   *
   * - If both `hints` and `onHintsChange` are provided, the toggle is
   *   controlled by the parent.
   * - Otherwise, the toggle reads/writes the surrounding `HudHintsProvider`
   *   if one is mounted.
   * - With neither, the toggle is hidden.
   */
  hints?: HudHint[]
  onHintsChange?: (hints: HudHint[]) => void
  /**
   * Force the hint toggle on even without a controlled prop pair, so it
   * mutates the surrounding `HudHintsProvider`. Has no effect outside one.
   * @default true when a provider is detected
   */
  showHintToggle?: boolean
  /** Custom additional toggles appended to the bar */
  extraToggles?: SettingsBarToggle[]
}

// =============================================================================
// Component
// =============================================================================

/**
 * SettingsBar — view & accessibility controls.
 *
 * Hosts toggles for grid/list, theme, a11y, zoom, and pin. Designed for the
 * right rail above the minimap, but works in any orientation.
 *
 * @example
 * ```tsx
 * <SettingsBar
 *   viewMode={mode}
 *   onViewModeChange={setMode}
 *   themeMode={theme}
 *   onThemeModeChange={setTheme}
 *   showAccessibility
 * />
 * ```
 */
export function SettingsBar({
  orientation = "vertical",
  layout = "full",
  viewMode,
  onViewModeChange,
  themeMode,
  onThemeModeChange,
  showAccessibility = false,
  onAccessibilityClick,
  showZoom = false,
  onZoomClick,
  pinned,
  onPinToggle,
  color,
  onColorChange,
  colorOptions,
  onColorPickerActivate,
  hints: hintsProp,
  onHintsChange,
  showHintToggle,
  extraToggles,
  onAddClick,
  variant = "minimal",
  shape = "pill",
  thickness = "sm",
  ...rest
}: SettingsBarProps) {
  // Basic layout: only theme + a11y, ignore everything else.
  const isBasic = layout === "basic"
  const isPlus  = layout === "plus"
  const showAdd     = isPlus
  const showViewMode = !isBasic && !isPlus && viewMode !== undefined && !!onViewModeChange
  const showTheme = themeMode !== undefined && !!onThemeModeChange
  const showA11y = isBasic || isPlus ? true : showAccessibility
  const showZoomBtn = !isBasic && !isPlus && showZoom
  const showPin = !isBasic && !isPlus && pinned !== undefined && !!onPinToggle
  const showColorPicker =
    !isBasic &&
    color !== undefined &&
    !!onColorChange &&
    !!colorOptions &&
    colorOptions.length > 0

  // Hint toggle: controlled by props OR by surrounding HudHintsProvider.
  const hasHintProvider = useHasHudHintsProvider()
  const hintCtx = useHudHints()
  const hintControlled = hintsProp !== undefined && !!onHintsChange
  const effectiveHints: HudHint[] = hintControlled ? hintsProp! : hintCtx.hints
  const showHintToggleResolved =
    !isBasic && (hintControlled || (hasHintProvider && (showHintToggle ?? true)))
  const setHints = (next: HudHint[]) => {
    if (hintControlled) onHintsChange!(next)
    else hintCtx.setHints(next)
  }
  const toggleHint = (kind: HudHint) => {
    const next = effectiveHints.includes(kind)
      ? effectiveHints.filter((h) => h !== kind)
      : [...effectiveHints, kind]
    setHints(next)
  }

  const showExtras = !isBasic && !isPlus && extraToggles && extraToggles.length > 0

  return (
    <ActionBar
      variant={variant}
      shape={shape}
      thickness={thickness}
      orientation={orientation}
      {...rest}
    >
      {showAdd && (
        <ActionButton
          icon={<AddCircleOutlineIcon />}
          label="Add"
          onClick={onAddClick}
        />
      )}

      {showViewMode && (
        <ActionGroup
          mode="radio"
          value={viewMode}
          onChange={(v) => onViewModeChange!(v as SettingsBarViewMode)}
          indicator="circle"
        >
          <ActionButton icon={<GridViewIcon />} label="Grid view" value="grid" />
          <ActionButton icon={<ViewListIcon />} label="List view" value="list" />
        </ActionGroup>
      )}

      {showTheme && (
        <ActionButton
          icon={themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          label={themeMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => onThemeModeChange!(themeMode === "dark" ? "light" : "dark")}
        />
      )}

      {showA11y && (
        <ActionButton
          icon={<AccessibilityNewIcon />}
          label="Accessibility"
          onClick={onAccessibilityClick}
        />
      )}

      {showZoomBtn && (
        <ActionButton icon={<ZoomInIcon />} label="Zoom" onClick={onZoomClick} />
      )}

      {showPin && (
        <ActionButton
          icon={<PushPinIcon />}
          label={pinned ? "Unpin" : "Pin"}
          active={!!pinned}
          onClick={() => onPinToggle!(!pinned)}
        />
      )}

      {showColorPicker && (
        <LiddedColorPicker
          value={color!}
          onChange={onColorChange!}
          colors={colorOptions!}
          onActivate={onColorPickerActivate}
          size={32}
        />
      )}

      {showHintToggleResolved && (
        <HintsMultiToggle
          hints={effectiveHints}
          onToggle={toggleHint}
          // The bar lives on the right rail; popper opens toward the screen interior.
          placement={orientation === "vertical" ? "left" : "top"}
        />
      )}

      {showExtras && extraToggles!.map((t) => (
        <ActionButton
          key={t.id}
          icon={t.icon}
          iconOn={t.iconOn}
          label={t.label}
          active={t.active}
          onClick={t.onClick}
        />
      ))}
    </ActionBar>
  )
}

// =============================================================================
// HintsMultiToggle (internal)
// =============================================================================

const HINT_META: Record<
  HudHint,
  { label: string; description: string; icon: ReactNode }
> = {
  labels: {
    label: "Labels",
    description: "Show text labels on action buttons",
    icon: <LabelIcon fontSize="small" />,
  },
  hotkeys: {
    label: "Hotkeys",
    description: "Show keyboard shortcuts on action buttons",
    icon: <KeyboardIcon fontSize="small" />,
  },
}

interface HintsMultiToggleProps {
  hints: HudHint[]
  onToggle: (kind: HudHint) => void
  /** Direction the popover pulls out toward. @default "left" */
  placement?: "left" | "right" | "top" | "bottom"
}

/**
 * Trigger button that opens a small multi-select popover.
 *
 * The popover lists each `HudHint` (labels, hotkeys) as an independently
 * checkable row — multiple can be active at once. Lives on the SettingsBar
 * right rail and pulls out toward the screen interior (left, by default).
 */
function HintsMultiToggle({
  hints,
  onToggle,
  placement = "left",
}: HintsMultiToggleProps) {
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const anyActive = hints.length > 0
  const summary =
    hints.length === 0
      ? "Hints: off"
      : `Hints: ${hints.map((h) => HINT_META[h].label.toLowerCase()).join(" + ")}`

  return (
    <>
      <Box ref={anchorRef} sx={{ display: "inline-flex" }}>
        <ActionButton
          icon={<TipsAndUpdatesIcon />}
          label={`${summary} (click to choose)`}
          active={anyActive}
          onClick={() => setOpen((o) => !o)}
        />
      </Box>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement={placement}
        transition
        modifiers={[{ name: "offset", options: { offset: [0, 10] } }]}
        sx={{ zIndex: (t) => t.zIndex.tooltip }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={160}>
            <Box>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Paper
                  elevation={0}
                  sx={{
                    minWidth: 200,
                    p: 0.5,
                    bgcolor: "rgba(255, 255, 255, 0.96)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0, 0, 0, 0.30)",
                    boxShadow: "0 12px 36px rgba(0, 0, 0, 0.35)",
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      px: 1,
                      pt: 0.5,
                      pb: 0.75,
                      fontSize: 11,
                      letterSpacing: 0.6,
                      fontWeight: 600,
                      color: "rgba(0,0,0,0.55)",
                      textTransform: "uppercase",
                    }}
                  >
                    Show on buttons
                  </Box>
                  {ALL_HUD_HINTS.map((kind) => {
                    const isOn = hints.includes(kind)
                    const meta = HINT_META[kind]
                    return (
                      <Tooltip
                        key={kind}
                        title={meta.description}
                        placement={placement === "left" ? "left" : "right"}
                        arrow
                      >
                        <Box
                          role="menuitemcheckbox"
                          aria-checked={isOn}
                          tabIndex={0}
                          onClick={() => onToggle(kind)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              onToggle(kind)
                            }
                          }}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            px: 1,
                            py: 0.75,
                            borderRadius: 1.5,
                            cursor: "pointer",
                            color: isOn
                              ? "rgba(0,0,0,0.92)"
                              : "rgba(0,0,0,0.65)",
                            bgcolor: isOn ? "rgba(0,0,0,0.06)" : "transparent",
                            "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                            "&:focus-visible": {
                              outline: "2px solid #000",
                              outlineOffset: 2,
                            },
                          }}
                        >
                          <Box sx={{ display: "inline-flex", color: "inherit" }}>
                            {meta.icon}
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              flex: 1,
                              fontWeight: isOn ? 600 : 500,
                              fontSize: 13,
                            }}
                          >
                            {meta.label}
                          </Typography>
                          <Box
                            sx={{
                              width: 18,
                              height: 18,
                              borderRadius: 0.5,
                              border: "1px solid rgba(0,0,0,0.35)",
                              bgcolor: isOn ? "primary.main" : "transparent",
                              color: "#fff",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isOn && <CheckIcon sx={{ fontSize: 14 }} />}
                          </Box>
                        </Box>
                      </Tooltip>
                    )
                  })}
                </Paper>
              </ClickAwayListener>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  )
}
