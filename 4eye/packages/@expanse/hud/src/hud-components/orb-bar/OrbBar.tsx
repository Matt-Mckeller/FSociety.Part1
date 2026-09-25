"use client"

import React, { useId } from "react"
import { Box, Typography, useTheme } from "@mui/material"
import { ActionBar } from "../action-bars"
import type { ActionBarProps } from "../action-bars"
import { OrbCluster } from "../orbs"
import type { OrbItem, OrbSize, OrbVariant, OrbColorMode } from "../orbs"
import { ORB_BAR_PRESETS, type OrbBarContext } from "./presets"

// =============================================================================
// Types
// =============================================================================

export type OrbBarLabelMode = "none" | "always" | "hover"

export interface OrbBarProps
  extends Omit<ActionBarProps, "children" | "orientation" | "thickness" | "length"> {
  /** Context preset — supplies default items + label. @default "default" */
  context?: OrbBarContext
  /** Override the items (defaults to the context preset's items) */
  items?: OrbItem[]
  /** Override the label (defaults to the context preset's label) */
  label?: string
  /** When to show the label. @default "hover" */
  labelMode?: OrbBarLabelMode
  /** Orb size (default: "lg") */
  orbSize?: OrbSize
  /** Orb variant (default: "glow") */
  orbVariant?: OrbVariant
  /** Orb color mode (default: "auto") */
  orbColorMode?: OrbColorMode
  /**
   * Show each orb's label inline inside the orb (next to the icon),
   * turning every orb into a labeled chip.
   * @default false
   */
  showOrbLabels?: boolean
  /**
   * Where the inline label appears relative to the icon.
   * Only applies when showOrbLabels is true.
   * - "right" (default): icon + label side-by-side pill chip
   * - "below": label beneath icon (taller orb)
   */
  orbLabelPosition?: "right" | "below"
  /** Spacing between orbs in px (default: 12) */
  spacing?: number
}

// =============================================================================
// Component
// =============================================================================

/**
 * OrbBar — labeled cluster of action orbs.
 *
 * Wraps `OrbCluster` in a minimal `ActionBar` container with an optional
 * label that can show always, on hover, or never. Context presets supply
 * sensible defaults for common screens (default web, game HUD, learning).
 *
 * Position with `ActionDock` or absolute placement.
 *
 * @example
 * ```tsx
 * <ActionDock position="bottom-center">
 *   <OrbBar context="default" labelMode="hover" />
 * </ActionDock>
 *
 * // Custom items, always-shown label
 * <OrbBar
 *   label="My tools"
 *   items={[{ id: "x", icon: <X />, label: "X" }]}
 *   labelMode="always"
 * />
 * ```
 */
export function OrbBar({
  context = "default",
  items: itemsOverride,
  label: labelOverride,
  labelMode = "hover",
  orbSize = "lg",
  orbVariant = "glow",
  orbColorMode = "auto",
  showOrbLabels = true,
  orbLabelPosition = "below",
  spacing = 12,
  variant = "minimal",
  shape = "pill",
  padding = 8,
  ...rest
}: OrbBarProps) {
  const theme = useTheme()
  const preset = ORB_BAR_PRESETS[context]
  const items = itemsOverride ?? preset.items
  const label = labelOverride ?? preset.label
  const labelId = useId()

  const showLabel = labelMode !== "none"

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        // Hover trigger for label
        "&:hover .OrbBar-label, &:focus-within .OrbBar-label": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
      aria-label={label}
    >
      {showLabel && (
        <Typography
          id={labelId}
          className="OrbBar-label"
          variant="caption"
          sx={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            px: 1,
            py: 0.25,
            borderRadius: 999,
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "common.white",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.3,
            textTransform: "uppercase",
            backdropFilter: "blur(8px)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            transition: theme.transitions.create(["opacity", "transform"], {
              duration: theme.transitions.duration.shorter,
            }),
            opacity: labelMode === "always" ? 1 : 0,
            transform: labelMode === "always" ? "translateY(0)" : "translateY(4px)",
          }}
        >
          {label}
        </Typography>
      )}

      <ActionBar
        variant={variant}
        shape={shape}
        orientation="horizontal"
        padding={padding}
        thickness="auto"
        {...rest}
      >
        <OrbCluster
          items={items}
          pattern="bottom-row"
          size={orbSize}
          variant={orbVariant}
          colorMode={orbColorMode}
          showInlineLabel={showOrbLabels}
          labelPosition={orbLabelPosition}
          spacing={spacing}
        />
      </ActionBar>
    </Box>
  )
}
