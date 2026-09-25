/**
 * UI Constants - Standardized design tokens for consistency
 *
 * NOTE: Where possible, prefer using MUI's theme system directly:
 * - theme.palette.* for colors
 * - theme.spacing() for spacing
 * - theme.shape.borderRadius for border radius
 *
 * These constants are for cases where theme access isn't available
 * or for semantic opacity/alpha values.
 */

// ==================================================
// ALPHA/OPACITY VALUES
// ==================================================

/**
 * Standardized alpha (opacity) values for background colors.
 * Use with MUI's alpha() function: `alpha(theme.palette.primary.main, ALPHA.subtle)`
 */
export const ALPHA = {
  /** Very subtle tint, barely visible. Use for large container backgrounds. */
  subtle: 0.02,
  /** Light tint for section backgrounds and cards. */
  light: 0.05,
  /** Soft accent for hover states and light highlights. */
  soft: 0.1,
  /** Medium accent for badges and chips. */
  medium: 0.15,
  /** Notable accent for active states and indicators. */
  accent: 0.2,
  /** Strong accent for important UI elements. */
  strong: 0.3,
  /** Very strong, approaching solid. Use for overlays. */
  heavy: 0.5,
  /** Nearly opaque overlay. Use for modal backdrops. */
  overlay: 0.7,
} as const

// ==================================================
// SEMANTIC COLORS (use theme.palette when possible)
// ==================================================

/**
 * Semantic status colors - matches MUI theme palette
 * Prefer using theme.palette.success.main, theme.palette.error.main, etc.
 */
export const STATUS_COLORS = {
  success: "#10B981", // theme.palette.success.light
  warning: "#F59E0B", // theme.palette.warning.light
  error: "#EF4444", // theme.palette.error.light
  info: "#3B82F6", // theme.palette.info.light
  neutral: "#6B7280", // theme.palette.text.secondary
} as const

/**
 * Priority colors for P1-P4 levels
 */
export const PRIORITY_COLORS = {
  P1: "#EF4444", // Critical - error
  P2: "#F59E0B", // High - warning
  P3: "#6B7280", // Normal - neutral
  P4: "#9CA3AF", // Low - disabled
} as const

// ==================================================
// SIZES (prefer MUI's sizing system)
// ==================================================

/**
 * Standardized icon sizes for CircularProgress and icons.
 * Consider using MUI's fontSize prop: "small" | "medium" | "large"
 */
export const ICON_SIZE = {
  /** 16px - Inline indicators */
  xs: 16,
  /** 18px - Button icons */
  sm: 18,
  /** 20px - Default inline */
  md: 20,
  /** 24px - Default standalone */
  lg: 24,
  /** 32px - Feature icons */
  xl: 32,
} as const

/**
 * Standardized input widths (in pixels).
 */
export const INPUT_WIDTH = {
  /** Small search fields: 150px */
  sm: 150,
  /** Medium search fields: 200px */
  md: 200,
  /** Large search fields: 300px */
  lg: 300,
} as const

// ==================================================
// TRANSITIONS
// ==================================================

/**
 * Standard transition durations.
 * Consider using theme.transitions.duration.* instead.
 */
export const TRANSITION = {
  /** Fast: 150ms - Hover states */
  fast: "0.15s",
  /** Normal: 200ms - Default */
  normal: "0.2s",
  /** Slow: 300ms - Complex animations */
  slow: "0.3s",
} as const
