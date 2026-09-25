import type { SxProps, Theme } from "@mui/material"
import type { Position, TileConfig } from "../navigation/types"

// =============================================================================
// Variant Types
// =============================================================================

/** Visual rendering style for the minimap */
export type MinimapVariant = "grid" | "dots" | "blocks"

/** Size presets for minimap dimensions */
export type MinimapSize = "small" | "medium" | "large"

/** Position when minimap is floating */
export type MinimapPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "inline"

/** Color scheme presets */
export type MinimapColorScheme = "default" | "monochrome" | "vibrant" | "custom"

// =============================================================================
// Color Types
// =============================================================================

/** Custom color mapping for minimap tiles */
export interface MinimapCustomColors {
  /** Active/current tile color */
  active?: string
  /** Inactive tile color */
  inactive?: string
  /** Hover state color */
  hover?: string
  /** Disabled tile color */
  disabled?: string
  /** Hidden tile background */
  hidden?: string
  /** Grid lines color (grid variant only) */
  gridLines?: string
}

// =============================================================================
// Component Props
// =============================================================================

/** Main minimap component props */
export interface MinimapProps {
  /** Visual rendering style */
  variant?: MinimapVariant
  /** Size preset */
  size?: MinimapSize
  /** Color scheme */
  colorScheme?: MinimapColorScheme
  /** Custom color mapping (when colorScheme="custom") */
  customColors?: MinimapCustomColors
  /** Position when floating */
  position?: MinimapPosition
  /** Show tile labels on hover */
  showLabels?: boolean
  /** Show position indicator (current tile highlight) */
  showIndicator?: boolean
  /** Disable click navigation */
  disabled?: boolean
  /** Custom tile size (overrides size preset) */
  tileSize?: number
  /** Gap between tiles */
  gap?: number
  /** Custom click handler (overrides default navigation) */
  onClick?: (position: Position) => void
  /** Custom styles */
  sx?: SxProps<Theme>
}

// =============================================================================
// Tile Props
// =============================================================================

/** Props for individual minimap tiles */
export interface MinimapTileProps {
  /** Tile configuration */
  tile: TileConfig | null
  /** X position */
  x: number
  /** Y position */
  y: number
  /** Is this the active/current position */
  isActive: boolean
  /** Tile size in pixels */
  tileSize: number
  /** Gap between tiles in pixels */
  gap?: number
  /** Show label on hover */
  showLabel: boolean
  /** Disable interactions */
  disabled: boolean
  /** Color scheme */
  colors: MinimapCustomColors
  /** Click handler */
  onClick: () => void
}

// =============================================================================
// Variant Component Props
// =============================================================================

/** Props passed to variant implementations */
export interface MinimapVariantProps {
  /** Grid data */
  grid: Array<Array<{ x: number; y: number; tile: TileConfig | null }>>
  /** Current position */
  currentPosition: Position
  /** Grid size */
  gridSize: { width: number; height: number }
  /** Tile size in pixels */
  tileSize: number
  /** Gap between tiles */
  gap: number
  /** Show labels */
  showLabels: boolean
  /** Show indicator */
  showIndicator: boolean
  /** Disabled state */
  disabled: boolean
  /** Color mapping */
  colors: MinimapCustomColors
  /** Click handler for tile */
  onTileClick: (x: number, y: number) => void
  /** Custom styles */
  sx?: SxProps<Theme>
}

// =============================================================================
// Size Presets
// =============================================================================

/** Size preset configurations */
export interface MinimapSizePreset {
  tileSize: number
  gap: number
}

export const SIZE_PRESETS: Record<MinimapSize, MinimapSizePreset> = {
  small: { tileSize: 12, gap: 2 },
  medium: { tileSize: 20, gap: 3 },
  large: { tileSize: 32, gap: 4 },
}

// =============================================================================
// Color Scheme Presets
// =============================================================================

export const COLOR_SCHEMES: Record<MinimapColorScheme, MinimapCustomColors> = {
  default: {
    active: "#2196f3",
    inactive: "#424242",
    hover: "#64b5f6",
    disabled: "#1a1a1a",
    gridLines: "#616161",
  },
  monochrome: {
    active: "#ffffff",
    inactive: "#666666",
    hover: "#aaaaaa",
    disabled: "#333333",
    gridLines: "#888888",
  },
  vibrant: {
    active: "#e91e63",
    inactive: "#1a237e",
    hover: "#f48fb1",
    disabled: "#0d1321",
    gridLines: "#9c27b0",
  },
  custom: {}, // Filled by user-provided customColors
}
