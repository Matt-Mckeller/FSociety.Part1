"use client"

import { Box, Typography, type SxProps, type Theme } from "@mui/material"
import { Z_INDEX } from "@expanse/theme"

// =============================================================================
// Types
// =============================================================================

export interface HeaderProps {
  /** Edge position (typically "top" or "bottom") */
  edge?: "top" | "bottom"
  /** Content alignment */
  alignment?: "start" | "center" | "end" | "space-between"
  /** Header height in pixels (default: 56 for top, 64 for bottom) */
  height?: number
  /** Brand/logo element */
  logo?: React.ReactNode
  /** Title text */
  title?: string
  /** Subtitle text */
  subtitle?: string
  /** Main content */
  children?: React.ReactNode
  /** Action elements (buttons, menus) */
  actions?: React.ReactNode
  /** Glass morphism effect */
  glassEffect?: boolean
  /** Elevated style with shadow */
  elevated?: boolean
  /** Custom styles */
  sx?: SxProps<Theme>
}

// =============================================================================
// Component
// =============================================================================

/**
 * Header component for basic web layouts.
 * Full-width bar with title, logo, navigation, and actions.
 * 
 * Used in traditional web page structures (not HUD/spatial layouts).
 * 
 * @example
 * ```tsx
 * <Header
 *   edge="top"
 *   logo={<Logo />}
 *   title="My App"
 *   subtitle="Dashboard"
 *   actions={<ProfileMenu />}
 * />
 * ```
 */
export function Header({
  edge = "top",
  alignment = "space-between",
  height,
  logo,
  title,
  subtitle,
  children,
  actions,
  glassEffect = false,
  elevated = false,
  sx,
}: HeaderProps) {
  const defaultHeight = edge === "top" ? 56 : 64
  const barHeight = height ?? defaultHeight

  const glassStyles: SxProps<Theme> = glassEffect
    ? {
        bgcolor: "rgba(20, 20, 30, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: edge === "top" ? "1px solid" : undefined,
        borderTop: edge === "bottom" ? "1px solid" : undefined,
        borderColor: "divider",
      }
    : {
        bgcolor: "background.paper",
      }

  const elevationStyles: SxProps<Theme> = elevated
    ? {
        boxShadow: 2,
      }
    : {}

  return (
    <Box
      sx={{
        position: "fixed",
        [edge]: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: barHeight,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: alignment === "space-between" ? "space-between" : alignment === "center" ? "center" : alignment === "end" ? "flex-end" : "flex-start",
        gap: 2,
        px: 3,
        zIndex: Z_INDEX.BARS,
        ...glassStyles,
        ...elevationStyles,
        ...sx,
      }}
    >
      {/* Logo */}
      {logo && (
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {logo}
        </Box>
      )}
      {/* Title/Subtitle */}
      {(title || subtitle) && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
          {title && (
            <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="caption" sx={{
              color: "text.secondary"
            }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      {/* Main content */}
      {children && (
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, overflow: "hidden" }}>
          {children}
        </Box>
      )}
      {/* Actions */}
      {actions && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
          {actions}
        </Box>
      )}
    </Box>
  );
}
