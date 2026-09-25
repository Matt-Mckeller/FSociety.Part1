/**
 * ActionBar Types
 *
 * Types for the ActionBar container component.
 * ActionBar is a pure visual container - it handles styling and layout,
 * not selection behavior (that's ActionGroup's job).
 */

import type { SxProps, Theme } from "@mui/material"
import type { ReactNode } from "react"

// =============================================================================
// Variant & Shape Types
// =============================================================================

/**
 * Visual style variant - controls background, blur, shadow
 * Uses theme.palette.surface for colors
 */
export type ActionBarVariant = 
  | "glass"      // Translucent with blur - default
  | "solid"      // Opaque surface, no blur
  | "frosted"    // Heavy blur, elevated
  | "minimal"    // No background
  | "outlined"   // Transparent with border
  | "technical"  // Sharp, accent border
  | "orbs"       // Transparent, no surface — floating orb rows

/**
 * Shape preset - controls border radius
 */
export type ActionBarShape = 
  | "pill"      // Full rounded (28px) - default
  | "rounded"   // Medium rounded (12px)
  | "soft"      // Subtle rounded (6px)
  | "square"    // Sharp corners (0px)
  | "capsule"   // Elongated (16px)

/**
 * Shape to border radius mapping
 */
export const ACTION_BAR_SHAPE_RADIUS: Record<ActionBarShape, number> = {
  pill: 28,
  rounded: 12,
  soft: 6,
  square: 0,
  capsule: 16,
}

// =============================================================================
// Asymmetric Shape Types
// =============================================================================

/**
 * Asymmetric shape - different radius per edge
 * Used for ActionBars attached to edges
 */
export interface ActionBarAsymmetricShape {
  topLeft?: number
  topRight?: number
  bottomLeft?: number
  bottomRight?: number
}

/**
 * Preset asymmetric shapes for edge-attached bars
 */
export type ActionBarEdgeShape =
  | "pill-top"      // Rounded top, flat bottom (attach to bottom edge)
  | "pill-bottom"   // Rounded bottom, flat top (attach to top edge)
  | "pill-left"     // Rounded left, flat right (attach to right edge)
  | "pill-right"    // Rounded right, flat left (attach to left edge)
  | "beveled-tl"    // Top-left corner only
  | "beveled-tr"    // Top-right corner only
  | "beveled-bl"    // Bottom-left corner only
  | "beveled-br"    // Bottom-right corner only

/**
 * Extended shape that can be a preset, edge preset, or custom asymmetric config
 */
export type ActionBarShapeConfig = ActionBarShape | ActionBarEdgeShape | ActionBarAsymmetricShape

/**
 * Edge shape to border radius mapping
 */
export const ACTION_BAR_EDGE_SHAPE_RADIUS: Record<ActionBarEdgeShape, ActionBarAsymmetricShape> = {
  "pill-top": { topLeft: 28, topRight: 28, bottomLeft: 0, bottomRight: 0 },
  "pill-bottom": { topLeft: 0, topRight: 0, bottomLeft: 28, bottomRight: 28 },
  "pill-left": { topLeft: 28, topRight: 0, bottomLeft: 28, bottomRight: 0 },
  "pill-right": { topLeft: 0, topRight: 28, bottomLeft: 0, bottomRight: 28 },
  "beveled-tl": { topLeft: 28, topRight: 0, bottomLeft: 0, bottomRight: 0 },
  "beveled-tr": { topLeft: 0, topRight: 28, bottomLeft: 0, bottomRight: 0 },
  "beveled-bl": { topLeft: 0, topRight: 0, bottomLeft: 28, bottomRight: 0 },
  "beveled-br": { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 28 },
}

// =============================================================================
// Color Mode Types
// =============================================================================

/**
 * Color mode determines the ActionBar's color scheme
 * - "surface": Default dark glass appearance
 * - "primary": Uses theme.palette.primary
 * - "secondary": Uses theme.palette.secondary
 * - "custom": Uses provided gradient or bgcolor
 */
export type ActionBarColorMode = "surface" | "primary" | "secondary" | "custom"

// =============================================================================
// Gradient Types
// =============================================================================

/**
 * Gradient direction for ActionBar backgrounds
 */
export type ActionBarGradientDirection =
  | "horizontal"     // Left to right
  | "vertical"       // Top to bottom
  | "diagonal"       // Top-left to bottom-right
  | "diagonal-rev"   // Top-right to bottom-left
  | "radial"         // Center outward
  | "radial-corner"  // Corner radial (spotlight effect)

/**
 * Gradient configuration for ActionBar
 */
export interface ActionBarGradient {
  /** Direction of gradient */
  direction?: ActionBarGradientDirection
  /** Start color (CSS color, theme token like "primary.main", or "transparent") */
  from: string
  /** End color */
  to: string
  /** Middle color (optional for 3-stop gradients) */
  via?: string
  /** Start position as percentage (0-100) */
  fromPosition?: number
  /** End position as percentage (0-100) */
  toPosition?: number
}

/**
 * Preset gradient names for quick use
 */
export type ActionBarGradientPreset =
  | "primary-blend"      // Primary light → dark
  | "secondary-blend"    // Secondary light → dark
  | "primary-glow"       // Transparent → primary → transparent
  | "glass-primary"      // Glass with primary tint
  | "glass-secondary"    // Glass with secondary tint
  | "dark-fade"          // Dark → transparent (for edge attachment)
  | "light-fade"         // Light → transparent

// =============================================================================
// Attached Mode Types
// =============================================================================

/**
 * Which edge the ActionBar is attached to (affects visual styling)
 */
export type ActionBarAttachedEdge = "top" | "bottom" | "left" | "right" | "none"

/**
 * Attached mode configuration
 */
export interface ActionBarAttachedConfig {
  /** Which edge is attached */
  edge: ActionBarAttachedEdge
  /** Remove shadow on attached edge */
  noShadowOnEdge?: boolean
  /** Use fade gradient toward attached edge */
  fadeToEdge?: boolean
}

// =============================================================================
// Layered Variant Types (3-layer SVG stroke system)
// =============================================================================

/**
 * Triple-Layer Stroke Pattern
 * 
 * Creates the distinctive Expanse "glow" effect matching the LighteningCloud
 * and brand-core ExpandingBar patterns. Three overlapping strokes create depth:
 * 
 * ┌─────────────────────────────────────┐
 * │ OUTER STROKE (widest, 15-20% opacity)   │ ← Diffuse glow/halo
 * │ ┌─────────────────────────────────┐ │
 * │ │ CENTER STROKE (medium, 40-50%)    │ │ ← Transition zone  
 * │ │ ┌─────────────────────────────┐ │ │
 * │ │ │ INNER STROKE (thin, 85-100%)  │ │ │ ← Sharp definition
 * │ │ │ ┌─────────────────────────┐ │ │ │
 * │ │ │ │        [CONTENT]          │ │ │ │
 * │ │ │ └─────────────────────────┘ │ │ │
 * │ │ └─────────────────────────────┘ │ │
 * │ └─────────────────────────────────┘ │
 * └─────────────────────────────────────┘
 */

/**
 * Stroke width ratio presets - how the 3 stroke widths relate
 * 
 * - standard (1:2:3): Brand default - balanced growth progression
 * - cloud (2:5:12): LighteningCloud style - dramatic outer glow
 * - dramatic (2:6:14): Maximum glow effect (legacy 7:3:1)
 * - balanced (2:4:2): Symmetric edges, center emphasis
 * - centerFocus (2:6:2): Strong center stroke
 * - thin (1:2:3 at smaller scale): Minimal/delicate
 */
export type TripleLayerPreset =
  | "standard"      // 1:2:3 ratio (2/4/6) - brand default
  | "cloud"         // Cloud style (2/5/12) - LighteningCloud match
  | "dramatic"      // Heavy glow (2/6/14) - 7:3:1 legacy
  | "balanced"      // Symmetric (2/4/2) - 1:2:1 ratio
  | "centerFocus"   // Center emphasis (2/6/2) - 1:3:1 ratio
  | "thin"          // Minimal (1/2/3) - delicate

/**
 * Stroke width values for each preset
 * Values are: { inner, center, outer } in pixels
 */
export const TRIPLE_LAYER_STROKE_WIDTHS: Record<TripleLayerPreset, { inner: number; center: number; outer: number }> = {
  standard: { inner: 2, center: 4, outer: 6 },
  cloud: { inner: 2, center: 5, outer: 12 },
  dramatic: { inner: 2, center: 6, outer: 14 },
  balanced: { inner: 2, center: 4, outer: 2 },
  centerFocus: { inner: 2, center: 6, outer: 2 },
  thin: { inner: 1, center: 2, outer: 3 },
}

/**
 * Color/opacity presets for the 3 stroke layers
 * 
 * Opacities create the "concentration" effect - outer diffuse, inner crisp:
 * - cloudStyle: 20%/50%/100% - prominent definition (LighteningCloud)
 * - brand: 15%/40%/90% - standard brand glow
 * - subtle: 10%/30%/70% - understated for light backgrounds
 * - bold: 25%/60%/100% - maximum visual impact
 */
export type TripleLayerColorPreset =
  | "cloudStyle"    // 20%/50%/100% - LighteningCloud match
  | "brand"         // 15%/40%/90% - standard
  | "subtle"        // 10%/30%/70% - understated
  | "bold"          // 25%/60%/100% - maximum impact

/**
 * Opacity values for each color preset
 * Values are: { outer, center, inner } as 0-1 decimals
 */
export const TRIPLE_LAYER_OPACITIES: Record<TripleLayerColorPreset, { outer: number; center: number; inner: number }> = {
  cloudStyle: { outer: 0.2, center: 0.5, inner: 1.0 },
  brand: { outer: 0.15, center: 0.4, inner: 0.9 },
  subtle: { outer: 0.1, center: 0.3, inner: 0.7 },
  bold: { outer: 0.25, center: 0.6, inner: 1.0 },
}

/**
 * Inner fill mode - what fills the center of the layered bar
 * - "none": Transparent inner (strokes only)
 * - "solid": Solid color (theme primary/secondary)
 * - "gradient": Gradient fill (darkness-to-light brand pattern)
 */
export type TripleLayerFillMode = "none" | "solid" | "gradient"

/**
 * Visual state for layered bar - affects opacity and saturation
 * - "active": Full color and opacity (default)
 * - "inactive": Muted/desaturated appearance
 * - "hovered": Slightly enhanced (subtle glow increase)
 */
export type TripleLayerVisualState = "active" | "inactive" | "hovered"

/**
 * Configuration for the 3-layer stroke pattern
 * Based on brand-core's TripleLayerPath and LighteningCloud patterns
 */
export interface ActionBarLayerConfig {
  // ===== Stroke Width =====
  /** Preset stroke width ratio */
  preset?: TripleLayerPreset
  /** Override outer stroke width (px) */
  outerWidth?: number
  /** Override center stroke width (px) */
  centerWidth?: number
  /** Override inner stroke width (px) */
  innerWidth?: number

  // ===== Stroke Colors/Opacity =====
  /** Preset opacity/color progression */
  colorPreset?: TripleLayerColorPreset
  /** Color scheme source */
  colorScheme?: "primary" | "secondary" | "custom"
  /** Override outer stroke opacity (0-1) */
  outerOpacity?: number
  /** Override center stroke opacity (0-1) */
  centerOpacity?: number
  /** Override inner stroke opacity (0-1) */
  innerOpacity?: number
  /** Custom base color (when colorScheme is "custom") */
  customBaseColor?: string

  // ===== Inner Fill =====
  /** How to fill the inner content area */
  fill?: TripleLayerFillMode
  /** Offset the fill inward from inner stroke (px) */
  fillInset?: number

  // ===== Visual State & Animation =====
  /** Visual state affecting opacity/saturation */
  visualState?: TripleLayerVisualState
  /** Color intensity progression (0=lighter, 1=normal) for GSAP animation */
  colorProgress?: number
}

// =============================================================================
// Size Types
// =============================================================================

/**
 * Thickness/depth of the bar
 */
export type ActionBarThickness = "xs" | "sm" | "md" | "lg" | "auto" | { pixels: number }

/**
 * Thickness to pixels mapping
 */
export const ACTION_BAR_THICKNESS_PX: Record<Exclude<ActionBarThickness, "auto" | { pixels: number }>, number> = {
  xs: 40,
  sm: 48,
  md: 56,
  lg: 72,
}

/**
 * Length of bar
 * - Percent of container
 * - Fixed pixel value
 * - Auto (fit content)
 */
export type ActionBarLength =
  | { percent: number }
  | { pixels: number }
  | "auto"

// =============================================================================
// Orientation
// =============================================================================

/**
 * Content layout direction
 */
export type ActionBarOrientation = "horizontal" | "vertical"

/**
 * Alignment of content within bar
 */
export type ActionBarAlignment = "start" | "center" | "end" | "space-between"

// =============================================================================
// Component Props
// =============================================================================

/**
 * ActionBar Props - Pure visual container
 *
 * ActionBar is a styled container for ActionButtons and ActionGroups.
 * It handles appearance (skin, shape) and layout (orientation, gap, padding).
 * 
 * Positioning (where on screen) is handled by ActionDock.
 * Selection behavior is handled by ActionGroup.
 */
export interface ActionBarProps {
  // ===== Content =====

  /** Content - typically ActionButtons and ActionGroups */
  children?: ReactNode

  // ===== Visual Styling =====

  /**
   * Visual style variant - theme-aware presets
   * @default "glass"
   */
  variant?: ActionBarVariant

  /**
   * Shape preset for border radius
   * Accepts: preset name, edge preset, or custom asymmetric config
   * @default "pill"
   */
  shape?: ActionBarShapeConfig

  /**
   * Color mode determines the color scheme
   * - "surface": Default dark glass appearance
   * - "primary": Uses theme.palette.primary
   * - "secondary": Uses theme.palette.secondary  
   * - "custom": Uses provided gradient or bgcolor
   * @default "surface"
   */
  colorMode?: ActionBarColorMode

  /**
   * Gradient configuration for background
   * Can be a preset name or custom gradient config
   * Only applied when colorMode is "custom" or gradient is explicitly provided
   */
  gradient?: ActionBarGradient | ActionBarGradientPreset

  /**
   * Attached mode - indicates the bar is attached to an edge
   * Affects visual styling (shadows, fade effects)
   */
  attached?: ActionBarAttachedEdge | ActionBarAttachedConfig | boolean

  /**
   * Enable 3-layer expanding style (SVG-based)
   * When true, uses brand-aligned layered rendering
   */
  layered?: boolean | ActionBarLayerConfig

  // ===== Style Overrides (take precedence over variant) =====

  /** Background color override */
  bgcolor?: string

  /** Backdrop blur amount in pixels */
  blur?: number

  /** Border radius override (pixels or CSS value) */
  borderRadius?: number | string

  /** Box shadow override */
  boxShadow?: string

  /** Border override (CSS value, e.g. "1px solid red") */
  border?: string

  // ===== Size =====

  /**
   * Thickness/depth of bar
   * @default "md"
   */
  thickness?: ActionBarThickness

  /** Length constraint */
  length?: ActionBarLength

  // ===== Layout =====

  /**
   * Content direction
   * @default "horizontal"
   */
  orientation?: ActionBarOrientation

  /**
   * Alignment of content within bar
   * @default "center"
   */
  alignment?: ActionBarAlignment

  /**
   * Gap between items in pixels
   * @default 4
   */
  gap?: number

  /**
   * Inner padding in pixels
   * @default 8
   */
  padding?: number

  // ===== Behavior =====

  /** Disable all interactions */
  disabled?: boolean

  /** Custom styles */
  sx?: SxProps<Theme>
}

// =============================================================================
// Default Values
// =============================================================================

/** Default thickness */
export const DEFAULT_THICKNESS: ActionBarThickness = "md"

/** Default gap between items */
export const DEFAULT_GAP = 4

/** Default padding */
export const DEFAULT_PADDING = 8

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Resolve shape config to CSS border-radius string
 */
export function resolveActionBarShape(shape: ActionBarShapeConfig | undefined): string | number {
  if (!shape) return ACTION_BAR_SHAPE_RADIUS.pill

  // Preset shape name
  if (typeof shape === "string") {
    // Check if it's an edge shape
    if (shape in ACTION_BAR_EDGE_SHAPE_RADIUS) {
      const asymmetric = ACTION_BAR_EDGE_SHAPE_RADIUS[shape as ActionBarEdgeShape]
      return `${asymmetric.topLeft}px ${asymmetric.topRight}px ${asymmetric.bottomRight}px ${asymmetric.bottomLeft}px`
    }
    // Regular shape preset
    return ACTION_BAR_SHAPE_RADIUS[shape as ActionBarShape] ?? ACTION_BAR_SHAPE_RADIUS.pill
  }

  // Custom asymmetric shape object
  const { topLeft = 0, topRight = 0, bottomLeft = 0, bottomRight = 0 } = shape
  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`
}

/**
 * Resolve thickness to pixels
 */
export function resolveActionBarThickness(thickness: ActionBarThickness): number | undefined {
  if (thickness === "auto") return undefined
  if (typeof thickness === "object") return thickness.pixels
  return ACTION_BAR_THICKNESS_PX[thickness]
}

/**
 * Resolve length to CSS value
 */
export function resolveActionBarLength(length: ActionBarLength): string | undefined {
  if (length === "auto") return undefined
  if ("percent" in length) return `${length.percent}%`
  if ("pixels" in length) return `${length.pixels}px`
  return undefined
}

/**
 * Resolve attached config to normalized form
 */
export function resolveActionBarAttached(
  attached: ActionBarAttachedEdge | ActionBarAttachedConfig | boolean | undefined
): ActionBarAttachedConfig | undefined {
  if (!attached) return undefined
  if (attached === true) return { edge: "bottom", noShadowOnEdge: true }
  if (typeof attached === "string") return { edge: attached, noShadowOnEdge: true }
  return attached
}

/**
 * Get gradient CSS from gradient config
 */
export function resolveActionBarGradient(
  gradient: ActionBarGradient | ActionBarGradientPreset | undefined,
  theme: { palette: { primary: { main: string; light: string; dark: string }; secondary: { main: string; light: string; dark: string } } }
): string | undefined {
  if (!gradient) return undefined

  // Resolve preset to config
  let config: ActionBarGradient
  if (typeof gradient === "string") {
    config = GRADIENT_PRESETS[gradient](theme)
  } else {
    config = gradient
  }

  const { direction = "horizontal", from, to, via, fromPosition = 0, toPosition = 100 } = config

  // Resolve theme tokens in colors
  const resolveColor = (color: string): string => {
    if (color.startsWith("primary.")) {
      const key = color.split(".")[1] as "main" | "light" | "dark"
      return theme.palette.primary[key] || theme.palette.primary.main
    }
    if (color.startsWith("secondary.")) {
      const key = color.split(".")[1] as "main" | "light" | "dark"
      return theme.palette.secondary[key] || theme.palette.secondary.main
    }
    return color
  }

  const fromColor = resolveColor(from)
  const toColor = resolveColor(to)
  const viaColor = via ? resolveColor(via) : undefined

  // Build gradient based on direction
  const stops = viaColor
    ? `${fromColor} ${fromPosition}%, ${viaColor} 50%, ${toColor} ${toPosition}%`
    : `${fromColor} ${fromPosition}%, ${toColor} ${toPosition}%`

  switch (direction) {
    case "horizontal":
      return `linear-gradient(90deg, ${stops})`
    case "vertical":
      return `linear-gradient(180deg, ${stops})`
    case "diagonal":
      return `linear-gradient(135deg, ${stops})`
    case "diagonal-rev":
      return `linear-gradient(225deg, ${stops})`
    case "radial":
      return `radial-gradient(circle, ${stops})`
    case "radial-corner":
      return `radial-gradient(ellipse at top left, ${stops})`
    default:
      return `linear-gradient(90deg, ${stops})`
  }
}

/**
 * Gradient preset factory functions
 */
const GRADIENT_PRESETS: Record<
  ActionBarGradientPreset,
  (theme: { palette: { primary: { main: string; light: string; dark: string }; secondary: { main: string; light: string; dark: string } } }) => ActionBarGradient
> = {
  "primary-blend": (theme) => ({
    direction: "horizontal",
    from: theme.palette.primary.light,
    to: theme.palette.primary.dark,
  }),
  "secondary-blend": (theme) => ({
    direction: "horizontal",
    from: theme.palette.secondary.light,
    to: theme.palette.secondary.dark,
  }),
  "primary-glow": (theme) => ({
    direction: "horizontal",
    from: "transparent",
    via: theme.palette.primary.main,
    to: "transparent",
    fromPosition: 0,
    toPosition: 100,
  }),
  "glass-primary": (theme) => ({
    direction: "diagonal",
    from: `${theme.palette.primary.main}40`,
    to: `${theme.palette.primary.dark}80`,
  }),
  "glass-secondary": (theme) => ({
    direction: "diagonal",
    from: `${theme.palette.secondary.main}40`,
    to: `${theme.palette.secondary.dark}80`,
  }),
  "dark-fade": () => ({
    direction: "vertical",
    from: "rgba(0,0,0,0.9)",
    to: "transparent",
  }),
  "light-fade": () => ({
    direction: "vertical",
    from: "rgba(255,255,255,0.9)",
    to: "transparent",
  }),
}
