"use client"
import { Box, ButtonBase, alpha, useTheme } from "@mui/material"
import React from "react"
import { useExpanseTheme } from "../../hooks/useExpanseTheme"

export interface LightDarkModeToggleProps {
  /** Size variant */
  size?: "small" | "medium" | "large"
  /** Show text labels */
  showLabels?: boolean
  /** Custom aria-label */
  "aria-label"?: string
}

// Size configurations
const SIZES = {
  small: { width: 40, height: 20, thumb: 18, track: 10, iconSize: 8 },
  medium: { width: 54, height: 28, thumb: 26, track: 13, iconSize: 11 },
  large: { width: 68, height: 36, thumb: 34, track: 17, iconSize: 14 },
} as const

/**
 * Toggle switch for light/dark mode.
 *
 * @example
 * ```tsx
 * <LightDarkModeToggle />
 * <LightDarkModeToggle size="small" />
 * <LightDarkModeToggle showLabels />
 * ```
 */
export function LightDarkModeToggle({
  size = "medium",
  showLabels = false,
  "aria-label": ariaLabel = "Toggle light/dark mode",
}: LightDarkModeToggleProps) {
  const muiTheme = useTheme()
  const { themeMode, toggleThemeMode } = useExpanseTheme()

  const isDark = themeMode === "dark"
  const { width, height, thumb, track, iconSize } = SIZES[size]

  // Colors
  const thumbColor = muiTheme.palette.text.primary
  const iconColor = muiTheme.palette.background.default
  const borderColor = alpha(muiTheme.palette.text.primary, 0.66)

  // SVG icons embedded as data URIs
  const moonIcon = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="${iconSize}" width="${iconSize}" viewBox="0 0 20 20"><path fill="${encodeURIComponent(iconColor)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`

  const sunIcon = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="${iconSize}" width="${iconSize}" viewBox="0 0 20 20"><path fill="${encodeURIComponent(iconColor)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {showLabels && (
        <Box
          component="span"
          sx={{
            fontSize: size === "small" ? "0.75rem" : size === "large" ? "1rem" : "0.875rem",
            color: !isDark ? muiTheme.palette.text.primary : muiTheme.palette.text.secondary,
            fontWeight: !isDark ? 600 : 400,
            transition: "color 0.2s, font-weight 0.2s",
          }}
        >
          Light
        </Box>
      )}

      <Box
        role="switch"
        aria-checked={isDark}
        aria-label={ariaLabel}
        tabIndex={0}
        onClick={toggleThemeMode}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggleThemeMode()
          }
        }}
        sx={{
          width,
          height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          cursor: "pointer",
          "&:focus-visible": {
            outline: `2px solid ${muiTheme.palette.primary.main}`,
            outlineOffset: 2,
            borderRadius: 1,
          },
        }}
      >
        {/* Track */}
        <Box
          sx={{
            width: "100%",
            height: track,
            border: `1px solid ${borderColor}`,
            borderRadius: track,
            transition: "border-color 0.2s",
          }}
        />

        {/* Thumb */}
        <ButtonBase
          tabIndex={-1}
          sx={{
            width: thumb,
            height: thumb,
            position: "absolute",
            backgroundColor: thumbColor,
            borderRadius: "50%",
            left: !isDark ? 0 : "auto",
            right: isDark ? 0 : "auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: isDark ? moonIcon : sunIcon,
            transition: "left 0.2s, right 0.2s, background-color 0.2s",
          }}
          TouchRippleProps={{ center: true }}
        />
      </Box>

      {showLabels && (
        <Box
          component="span"
          sx={{
            fontSize: size === "small" ? "0.75rem" : size === "large" ? "1rem" : "0.875rem",
            color: isDark ? muiTheme.palette.text.primary : muiTheme.palette.text.secondary,
            fontWeight: isDark ? 600 : 400,
            transition: "color 0.2s, font-weight 0.2s",
          }}
        >
          Dark
        </Box>
      )}
    </Box>
  )
}
