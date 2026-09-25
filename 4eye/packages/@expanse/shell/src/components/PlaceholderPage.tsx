"use client"

import { Box, Typography, type SxProps, type Theme } from "@mui/material"
import type { Position, TileConfig } from "@expanse/map"

// =============================================================================
// Types
// =============================================================================

export interface PlaceholderPageProps {
  /** Current grid position */
  position: Position
  /** Tile configuration (if defined) */
  tile?: TileConfig | null
  /** Custom title override */
  title?: string
  /** Custom description */
  description?: string
  /** Show position coordinates */
  showPosition?: boolean
  /** Background pattern */
  pattern?: "dots" | "grid" | "none"
  /** Custom content */
  children?: React.ReactNode
  /** Custom styles */
  sx?: SxProps<Theme>
}

// =============================================================================
// Background Patterns
// =============================================================================

const PATTERNS = {
  dots: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
  grid: `
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
  `,
  none: "none",
}

const PATTERN_SIZES = {
  dots: "20px 20px",
  grid: "40px 40px, 40px 40px",
  none: "auto",
}

// =============================================================================
// PlaceholderPage Component
// =============================================================================

/**
 * Generic placeholder page for grid positions without custom content.
 * 
 * Shows position info and tile metadata if available.
 * Can be customized with patterns and custom content.
 * 
 * @example
 * ```tsx
 * // In page renderer
 * const pageRegistry = {
 *   default: (position, tile) => (
 *     <PlaceholderPage 
 *       position={position} 
 *       tile={tile}
 *       pattern="grid"
 *     />
 *   ),
 * };
 * ```
 */
export function PlaceholderPage({
  position,
  tile,
  title,
  description,
  showPosition = true,
  pattern = "grid",
  children,
  sx,
}: PlaceholderPageProps) {
  const displayTitle = title ?? tile?.display.label ?? `Position (${position.x}, ${position.y})`
  const displayDescription = description ?? tile?.seo.description ?? "This page is a placeholder"

  const bgColor = tile?.display.colors.inactive ?? "rgba(30, 30, 40, 0.5)"

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: bgColor,
        backgroundImage: PATTERNS[pattern],
        backgroundSize: PATTERN_SIZES[pattern],
        color: "text.primary",
        p: 4,
        ...sx,
      }}
    >
      {/* Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          mb: 2,
          textAlign: "center",
          background: tile?.display.colors.active
            ? `linear-gradient(135deg, ${tile.display.colors.active}, ${tile.display.colors.inactive})`
            : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {displayTitle}
      </Typography>
      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 4,
          textAlign: "center",
          maxWidth: 500
        }}>
        {displayDescription}
      </Typography>
      {/* Position Badge */}
      {showPosition && (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.1)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="caption" sx={{
            color: "text.secondary"
          }}>
            Position:
          </Typography>
          <Typography variant="body2" sx={{
            fontWeight: 600
          }}>
            ({position.x}, {position.y})
          </Typography>
        </Box>
      )}
      {/* Custom Content */}
      {children && (
        <Box sx={{ mt: 4, width: "100%", maxWidth: 600 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

export default PlaceholderPage
