"use client"

/**
 * OrbHotkey — small overlay that renders a keyboard hotkey indicator on an
 * ActionOrb. Supports four display styles:
 *
 *   - `badge`     : Small chip in the top-right corner.
 *   - `overlay`   : Centered letter on a dim scrim covering the orb.
 *   - `underline` : Chip below the orb.
 *   - `ring`      : Filled disc clipped to the top-right of the orb.
 */

import { Box } from "@mui/material"
import type { OrbColorConfig } from "./orbColors"
import type { HotkeyDisplayStyle, OrbShape } from "./types"
import { getShapeBorderRadius } from "./actionOrb.layout"

export interface OrbHotkeyProps {
  hotkey: string
  display: Exclude<HotkeyDisplayStyle, "none">
  /** "dark" | "light" — used to pick contrasting chrome. */
  mode: "dark" | "light"
  /** Resolved orb colors (used for the `ring` variant background). */
  colors: OrbColorConfig
  /** Outer shape of the orb (used to clip the `overlay` scrim). */
  shape: OrbShape
  /** Outer button height in px (used for shape border-radius math). */
  buttonHeight: number
  /** Pre-computed glyph font size for `badge` / `underline`. */
  hotkeyFontSize: number
  /** Pre-computed glyph font size for the centered `overlay` style. */
  overlayFontSize: number
}

export function OrbHotkey({
  hotkey,
  display,
  mode,
  colors,
  shape,
  buttonHeight,
  hotkeyFontSize,
  overlayFontSize,
}: OrbHotkeyProps) {
  const textColor = mode === "dark" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)"
  const bgColor = mode === "dark" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)"
  const borderColor = mode === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"

  const baseStyles = {
    fontFamily: "monospace",
    fontWeight: 600,
    fontSize: hotkeyFontSize,
    lineHeight: 1,
    color: textColor,
    textTransform: "uppercase" as const,
    pointerEvents: "none" as const,
  }

  switch (display) {
    case "badge":
      return (
        <Box
          sx={{
            position: "absolute",
            top: -4,
            right: -4,
            minWidth: 16,
            height: 16,
            px: 0.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: bgColor,
            border: `1px solid ${borderColor}`,
            borderRadius: "4px",
            zIndex: 1,
            ...baseStyles,
          }}
        >
          {hotkey}
        </Box>
      )

    case "overlay":
      return (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(0,0,0,0.5)",
            borderRadius: getShapeBorderRadius(shape, buttonHeight),
            ...baseStyles,
            fontSize: overlayFontSize,
            color: "#ffffff",
          }}
        >
          {hotkey}
        </Box>
      )

    case "underline":
      return (
        <Box
          sx={{
            position: "absolute",
            bottom: -20,
            left: "50%",
            transform: "translateX(-50%)",
            px: 0.75,
            py: 0.25,
            bgcolor: bgColor,
            border: `1px solid ${borderColor}`,
            borderRadius: "3px",
            whiteSpace: "nowrap",
            ...baseStyles,
          }}
        >
          {hotkey}
        </Box>
      )

    case "ring":
      return (
        <Box
          sx={{
            position: "absolute",
            top: -2,
            right: -2,
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: colors.border,
            borderRadius: "50%",
            border: `2px solid ${mode === "dark" ? "#1a1a1a" : "#ffffff"}`,
            ...baseStyles,
            color: mode === "dark" ? "#ffffff" : "#1a1a1a",
          }}
        >
          {hotkey}
        </Box>
      )

    default:
      return null
  }
}
