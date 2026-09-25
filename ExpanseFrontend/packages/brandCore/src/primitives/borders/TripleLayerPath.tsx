/**
 * TripleLayerPath - Multi-layer border stroke pattern primitive
 *
 * Creates the distinctive Expanse "glow" effect on SVG paths by rendering
 * multiple overlapping strokes with progressively different widths.
 *
 * ## How It Works
 *
 * This component takes an SVG path `d` attribute as input and renders it
 * multiple times with different stroke widths stacked on top of each other.
 * The widest stroke renders first (at the back), creating a "halo" effect,
 * with progressively thinner strokes on top for definition.
 *
 * ```
 * Input: d="M161.17,57.06A61.79..." (any SVG path)
 * Output: 3 (or 6) <path> elements with different stroke widths
 * ```
 *
 * ## Design Rationale
 *
 * The multi-layer stroke pattern creates depth and luminosity:
 * - **Outer layers**: Wide, diffuse strokes create glow/depth
 * - **Center layers**: Transition zone for smooth blending
 * - **Inner layers**: Crisp, thin strokes define sharp edges
 *
 * ## Stroke Width Ratios
 *
 * ### 7:3:1 Ratio (Legacy "default" preset)
 * - Widths: 14px / 6px / 2px (outer/center/inner)
 * - Creates dramatic depth with heavy outer glow
 * - Originally used in LighteningCloud and other graphics
 * - NOT related to golden ratio; chosen for visual impact
 *
 * ### 1:2:3 Ratio (Brand "standard" preset)
 * - Widths: 2px / 4px / 6px (inner/center/outer)
 * - Represents Expanse brand growth/progression theme
 * - Balanced, equal-step progression
 *
 * ### 1:2:1 Ratio ("balanced" preset)
 * - Widths: 2px / 4px / 2px
 * - Center-heavy, symmetric edges
 *
 * ### 1:3:1 Ratio ("centerFocus" preset)
 * - Widths: 2px / 6px / 2px
 * - Strong center emphasis
 *
 * ## Direction Modes
 *
 * - `outward`: Strokes expand outward from path (default, 3 layers)
 * - `inward`: Strokes contract inward from path (3 layers)
 * - `both`: Creates 6-layer effect with 3 inward + 3 outward strokes
 *
 * ## Size Scales
 *
 * Presets come in multiple scales:
 * - `xs` / `sm` / `md` / `lg` / `xl` / `xxl`
 *
 * ## Usage
 *
 * ```tsx
 * // Takes any SVG path as input!
 * <TripleLayerPath
 *   d="M161.17,57.06A61.79,61.79,0,0,0,45.65,40.56..."
 *   fill="url(#myGradient)"
 * />
 *
 * // With cloud preset and gradient fill (4-layer visual effect)
 * <TripleLayerPath
 *   d={EXPANSE_CLOUD_PATH}
 *   preset="cloud"
 *   colorPreset="cloudStyle"
 *   fill="url(#cloudGradient)"
 * />
 *
 * // 6-layer glow (inward + outward)
 * <TripleLayerPath
 *   d={cloudPath}
 *   direction="both"
 *   preset="standard"
 * />
 * ```
 *
 * ## Implementation in Components
 *
 * Used in: LighteningCloud, ContactUsGraphic, SpiralBrowserScreen
 * The cloud shape demonstrates the pattern at its best with gradient fill.
 */

"use client"

import React from "react"
import { useVectorGraphicColors } from "../../utils/useVectorGraphicColors"

// ============================================================
// TYPES & INTERFACES
// ============================================================

export type StrokeDirection = "outward" | "inward" | "both"

export interface TripleLayerPathProps extends React.SVGProps<SVGGElement> {
  /** SVG path data (d attribute) - This is the path that will be rendered with multiple strokes */
  d: string

  /** Fill color for the path (applied to all layers) */
  fill?: string

  /**
   * Stroke direction mode:
   * - "outward": Strokes expand outward (default)
   * - "inward": Strokes contract inward
   * - "both": 6 layers total (3 inward + 3 outward)
   */
  direction?: StrokeDirection

  /**
   * Preset configuration name for stroke widths.
   * Use preset OR individual width props (widths override preset).
   */
  preset?: TripleLayerPreset

  /** Stroke width for outer layer (default: 12, cloud style) */
  outerWidth?: number

  /** Stroke width for center layer (default: 5, cloud style) */
  centerWidth?: number

  /** Stroke width for inner layer (default: 2, cloud style) */
  innerWidth?: number

  /** Override outer stroke color */
  outerStroke?: string

  /** Override center stroke color */
  centerStroke?: string

  /** Override inner stroke color */
  innerStroke?: string

  /**
   * Color preset for quick styling.
   * cloudStyle is the default (higher opacity matching LighteningCloud)
   */
  colorPreset?: ColorPreset

  /** Stroke linecap for all layers (default: round) */
  strokeLinecap?: "butt" | "round" | "square" | "inherit"

  /** Stroke miterlimit for all layers (default: 10) */
  strokeMiterlimit?: number

  /** Additional class for the outer path */
  outerClassName?: string

  /** Additional class for the center path */
  centerClassName?: string

  /** Additional class for the inner path */
  innerClassName?: string

  /** Name prefix for data-name attributes */
  namePrefix?: string
}

// ============================================================
// PRESET CONFIGURATIONS
// ============================================================

/**
 * Stroke width presets following various design ratios
 *
 * ## Ratio Types:
 * - **1:2:3** - Brand standard, balanced growth
 * - **7:3:1** - Legacy, dramatic outer glow
 * - **1:2:1** - Balanced, symmetric emphasis
 * - **1:3:1** - Strong center focus
 *
 * ## Size Scales:
 * Each ratio has size variants (xs → xxl) for different use cases.
 */
export const TRIPLE_LAYER_PRESETS = {
  // ============================================================
  // CLOUD STYLE (Default - matches LighteningCloud)
  // ============================================================

  /**
   * Cloud preset - Optimized for cloud shapes (12/5/2px)
   * Default preset. Matches the original LighteningCloud component.
   * Creates fluffy, soft glow effect.
   */
  cloud: { outerWidth: 12, centerWidth: 5, innerWidth: 2 },

  // ============================================================
  // 1:2:3 RATIO (Brand Standard - Growth/Progression)
  // ============================================================

  /**
   * Standard 1:2:3 - Base size (2/4/6px)
   * True 1:2:3 ratio. Balanced depth, equal visual weight steps.
   */
  standard: { outerWidth: 6, centerWidth: 4, innerWidth: 2 },

  /** 1:2:3 Extra Small (1/2/3px) */
  "1-2-3_xs": { outerWidth: 3, centerWidth: 2, innerWidth: 1 },

  /** 1:2:3 Small (1.5/3/4.5px) */
  "1-2-3_sm": { outerWidth: 4.5, centerWidth: 3, innerWidth: 1.5 },

  /** 1:2:3 Medium (2/4/6px) - Same as standard */
  "1-2-3_md": { outerWidth: 6, centerWidth: 4, innerWidth: 2 },

  /** 1:2:3 Large (3/6/9px) */
  "1-2-3_lg": { outerWidth: 9, centerWidth: 6, innerWidth: 3 },

  /** 1:2:3 Extra Large (4/8/12px) */
  "1-2-3_xl": { outerWidth: 12, centerWidth: 8, innerWidth: 4 },

  /** 1:2:3 2X Large (5/10/15px) */
  "1-2-3_xxl": { outerWidth: 15, centerWidth: 10, innerWidth: 5 },

  // ============================================================
  // 7:3:1 RATIO (Legacy - Dramatic Outer Glow)
  // ============================================================

  /**
   * Legacy 7:3:1 - Original sizes (14/6/2px)
   * Heavy outer glow, thin crisp edge. Used in original graphics.
   * NOT golden ratio - chosen for visual dramatic effect.
   */
  "7-3-1": { outerWidth: 14, centerWidth: 6, innerWidth: 2 },

  /** 7:3:1 Small (7/3/1px) */
  "7-3-1_sm": { outerWidth: 7, centerWidth: 3, innerWidth: 1 },

  /** 7:3:1 Medium (14/6/2px) - Same as 7-3-1 */
  "7-3-1_md": { outerWidth: 14, centerWidth: 6, innerWidth: 2 },

  /** 7:3:1 Large (21/9/3px) */
  "7-3-1_lg": { outerWidth: 21, centerWidth: 9, innerWidth: 3 },

  /** Legacy alias for backwards compatibility */
  default: { outerWidth: 14, centerWidth: 6, innerWidth: 2 },

  // ============================================================
  // 1:2:1 RATIO (Balanced - Symmetric Emphasis)
  // ============================================================

  /**
   * Balanced 1:2:1 - Symmetric edges (2/4/2px)
   * Center-heavy design with matching inner/outer widths.
   */
  balanced: { outerWidth: 2, centerWidth: 4, innerWidth: 2 },

  /** 1:2:1 Small (1/2/1px) */
  "1-2-1_sm": { outerWidth: 1, centerWidth: 2, innerWidth: 1 },

  /** 1:2:1 Medium (2/4/2px) */
  "1-2-1_md": { outerWidth: 2, centerWidth: 4, innerWidth: 2 },

  /** 1:2:1 Large (3/6/3px) */
  "1-2-1_lg": { outerWidth: 3, centerWidth: 6, innerWidth: 3 },

  /** 1:2:1 Extra Large (4/8/4px) */
  "1-2-1_xl": { outerWidth: 4, centerWidth: 8, innerWidth: 4 },

  // ============================================================
  // 1:3:1 RATIO (Strong Center Focus)
  // ============================================================

  /**
   * Center Focus 1:3:1 - Maximum center emphasis (2/6/2px)
   * Very prominent middle stroke with thin edges.
   */
  centerFocus: { outerWidth: 2, centerWidth: 6, innerWidth: 2 },

  /** 1:3:1 Small (1/3/1px) */
  "1-3-1_sm": { outerWidth: 1, centerWidth: 3, innerWidth: 1 },

  /** 1:3:1 Medium (2/6/2px) */
  "1-3-1_md": { outerWidth: 2, centerWidth: 6, innerWidth: 2 },

  /** 1:3:1 Large (3/9/3px) */
  "1-3-1_lg": { outerWidth: 3, centerWidth: 9, innerWidth: 3 },

  // ============================================================
  // UTILITY PRESETS
  // ============================================================

  /** Thin preset - Minimal depth (3/2/1px) for fine details */
  thin: { outerWidth: 3, centerWidth: 2, innerWidth: 1 },

  /** Small preset - Subtle depth (4.5/3/1.5px) for UI elements */
  small: { outerWidth: 4.5, centerWidth: 3, innerWidth: 1.5 },

  /** Medium preset - Moderate depth (9/6/3px) for graphics */
  medium: { outerWidth: 9, centerWidth: 6, innerWidth: 3 },
} as const

export type TripleLayerPreset = keyof typeof TRIPLE_LAYER_PRESETS

/**
 * Color presets for consistent styling
 *
 * ## Opacity Progressions:
 * - **cloudStyle** (default): 20% → 50% → 100% - Matches LighteningCloud, prominent definition
 * - **glow**: 15% → 40% → 90% - Soft glow effect
 * - **subtle**: 10% → 30% → 70% - Understated for light backgrounds
 * - **bold**: 25% → 60% → 100% - Maximum impact
 */
export const COLOR_PRESETS = {
  // ============================================================
  // CLOUD STYLE (Default - Higher opacity matching LighteningCloud)
  // ============================================================

  /** Cloud style cyan - Default, matches LighteningCloud (20/50/100%) */
  cloudStyle: {
    outer: "rgba(0, 212, 255, 0.2)",
    center: "rgba(0, 212, 255, 0.5)",
    inner: "rgba(0, 212, 255, 1)",
  },

  // ============================================================
  // BRAND COLORS - Standard glow opacity (15/40/90%)
  // ============================================================

  /** Brand cyan - Primary Expanse color (#00D4FF) */
  brand: {
    outer: "rgba(0, 212, 255, 0.15)",
    center: "rgba(0, 212, 255, 0.4)",
    inner: "rgba(0, 212, 255, 0.9)",
  },

  /** Gold - Achievement/success accent (#FFD700) */
  gold: {
    outer: "rgba(255, 215, 0, 0.15)",
    center: "rgba(255, 215, 0, 0.4)",
    inner: "rgba(255, 215, 0, 0.9)",
  },

  /** Purple - Secondary brand accent (#C792EA) */
  purple: {
    outer: "rgba(199, 146, 234, 0.15)",
    center: "rgba(199, 146, 234, 0.4)",
    inner: "rgba(199, 146, 234, 0.9)",
  },

  /** Coral - Warm accent for highlights (#FF6B6B) */
  coral: {
    outer: "rgba(255, 107, 107, 0.15)",
    center: "rgba(255, 107, 107, 0.4)",
    inner: "rgba(255, 107, 107, 0.9)",
  },

  /** Success green - Positive feedback (#4CAF50) */
  success: {
    outer: "rgba(76, 175, 80, 0.15)",
    center: "rgba(76, 175, 80, 0.4)",
    inner: "rgba(76, 175, 80, 0.9)",
  },

  // ============================================================
  // OPACITY VARIANTS
  // ============================================================

  /** Subtle cyan - Low opacity for light backgrounds (10/30/70%) */
  subtle: {
    outer: "rgba(0, 212, 255, 0.1)",
    center: "rgba(0, 212, 255, 0.3)",
    inner: "rgba(0, 212, 255, 0.7)",
  },

  /** Bold cyan - Maximum impact (25/60/100%) */
  bold: {
    outer: "rgba(0, 212, 255, 0.25)",
    center: "rgba(0, 212, 255, 0.6)",
    inner: "rgba(0, 212, 255, 1)",
  },

  /** Bold gold - Maximum impact gold variant */
  boldGold: {
    outer: "rgba(255, 215, 0, 0.25)",
    center: "rgba(255, 215, 0, 0.6)",
    inner: "rgba(255, 215, 0, 1)",
  },

  /** Bold purple - Maximum impact purple variant */
  boldPurple: {
    outer: "rgba(199, 146, 234, 0.25)",
    center: "rgba(199, 146, 234, 0.6)",
    inner: "rgba(199, 146, 234, 1)",
  },
} as const

export type ColorPreset = keyof typeof COLOR_PRESETS

// ============================================================
// CLOUD PATH CONSTANT
// ============================================================

/**
 * The official LighteningCloud path data.
 * This is the canonical cloud shape used throughout Expanse brand graphics.
 * ViewBox: 0 0 220 160 (adjusted from original 251.15 x 197.16)
 *
 * Use with gradient fill for the 4-layer visual effect:
 * 3 stroke layers + gradient fill creates the complete cloud appearance.
 */
export const EXPANSE_CLOUD_PATH =
  "M161.17,57.06A61.79,61.79,0,0,0,45.65,40.56,49.46,49.46,0,0,0,51,139.19H158.29a41.39,41.39,0,0,0,41.26-41.27A40.76,40.76,0,0,0,161.17,57.06Z"

// ============================================================
// MAIN COMPONENT
// ============================================================

/**
 * Multi-layer border stroke pattern component
 *
 * Takes any SVG path as input and renders it with multiple overlapping
 * strokes to create a glow/depth effect.
 *
 * Uses theme-aware colors from useVectorGraphicColors hook when no
 * colorPreset is specified.
 *
 * @example
 * ```tsx
 * // Basic - just pass a path, get the cloud-style glow
 * <TripleLayerPath d="M10,10 Q50,5 90,10" />
 *
 * // Cloud with gradient fill (the 4-layer look)
 * <svg viewBox="0 0 220 160">
 *   <defs>
 *     <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
 *       <stop offset="0%" stopColor="#1a1a2e" />
 *       <stop offset="100%" stopColor="#2a2a4e" />
 *     </linearGradient>
 *   </defs>
 *   <TripleLayerPath
 *     d={EXPANSE_CLOUD_PATH}
 *     fill="url(#grad)"
 *     preset="cloud"
 *     colorPreset="cloudStyle"
 *   />
 * </svg>
 *
 * // Custom everything
 * <TripleLayerPath
 *   d={myPath}
 *   outerWidth={10}
 *   centerWidth={5}
 *   innerWidth={2}
 *   outerStroke="rgba(255, 0, 100, 0.2)"
 *   centerStroke="rgba(255, 0, 100, 0.5)"
 *   innerStroke="#ff0064"
 * />
 * ```
 */
export function TripleLayerPath({
  d,
  fill,
  direction = "outward",
  preset = "cloud",
  outerWidth,
  centerWidth,
  innerWidth,
  outerStroke,
  centerStroke,
  innerStroke,
  colorPreset = "cloudStyle",
  strokeLinecap = "round",
  strokeMiterlimit = 10,
  outerClassName,
  centerClassName,
  innerClassName,
  namePrefix = "Layer",
  ...groupProps
}: TripleLayerPathProps) {
  const themeColors = useVectorGraphicColors()

  // Resolve widths: props > preset > cloud default
  const presetConfig = TRIPLE_LAYER_PRESETS[preset]
  const finalOuterWidth = outerWidth ?? presetConfig.outerWidth
  const finalCenterWidth = centerWidth ?? presetConfig.centerWidth
  const finalInnerWidth = innerWidth ?? presetConfig.innerWidth

  // Resolve colors: props > colorPreset > theme
  const colorConfig = COLOR_PRESETS[colorPreset]
  const finalOuterStroke = outerStroke ?? colorConfig?.outer ?? themeColors.threeLayerOuterStroke
  const finalCenterStroke = centerStroke ?? colorConfig?.center ?? themeColors.threeLayerCenterStroke
  const finalInnerStroke = innerStroke ?? colorConfig?.inner ?? themeColors.threeLayerInnerStroke

  const commonPathProps = {
    d,
    fill,
    strokeLinecap,
    strokeMiterlimit,
  }

  // Render outward layers (strokes expand from path outward)
  const renderOutwardLayers = () => (
    <>
      {/* LAYER: Outer stroke - depth/glow (widest) */}
      <path
        {...commonPathProps}
        stroke={finalOuterStroke}
        strokeWidth={finalOuterWidth}
        data-name={`${namePrefix} Outer`}
        className={outerClassName}
      />
      {/* LAYER: Center stroke - transition (medium) */}
      <path
        {...commonPathProps}
        stroke={finalCenterStroke}
        strokeWidth={finalCenterWidth}
        data-name={`${namePrefix} Center`}
        className={centerClassName}
      />
      {/* LAYER: Inner stroke - definition (thinnest) */}
      <path
        {...commonPathProps}
        stroke={finalInnerStroke}
        strokeWidth={finalInnerWidth}
        data-name={`${namePrefix} Inner`}
        className={innerClassName}
      />
    </>
  )

  // Render inward layers (conceptually strokes would contract from path)
  // Note: SVG strokes always center on path, so we render in reverse order
  // with fill="none" to create the inward visual effect
  const renderInwardLayers = () => (
    <>
      {/* LAYER: Inner stroke first (will be overlapped by center/outer) */}
      <path
        {...commonPathProps}
        fill="none"
        stroke={finalInnerStroke}
        strokeWidth={finalInnerWidth}
        data-name={`${namePrefix} Inward Inner`}
        className={innerClassName}
      />
      {/* LAYER: Center stroke */}
      <path
        {...commonPathProps}
        fill="none"
        stroke={finalCenterStroke}
        strokeWidth={finalCenterWidth}
        data-name={`${namePrefix} Inward Center`}
        className={centerClassName}
      />
      {/* LAYER: Outer stroke (innermost visually on inward) */}
      <path
        {...commonPathProps}
        fill="none"
        stroke={finalOuterStroke}
        strokeWidth={finalOuterWidth}
        data-name={`${namePrefix} Inward Outer`}
        className={outerClassName}
      />
    </>
  )

  return (
    <g data-component="TripleLayerPath" data-direction={direction} data-preset={preset} {...groupProps}>
      {direction === "both" && (
        <>
          {/* 6-layer mode: inward + outward */}
          <g data-layers="inward">{renderInwardLayers()}</g>
          <g data-layers="outward">{renderOutwardLayers()}</g>
        </>
      )}
      {direction === "inward" && renderInwardLayers()}
      {direction === "outward" && renderOutwardLayers()}
    </g>
  )
}
