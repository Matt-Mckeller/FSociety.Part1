/**
 * Brand Core Type Definitions
 *
 * Shared types for all brand primitives and composites.
 */

import React from "react"

// ============================================================
// COMMON TYPES
// ============================================================

/**
 * Common props for all SVG-based components
 */
export interface SVGElementProps {
  /** Unique identifier */
  id?: string
  /** CSS class name */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * Position in 2D space
 */
export interface Point {
  x: number
  y: number
}

/**
 * Basic size definition
 */
export interface Size {
  width: number
  height: number
}

/**
 * Center position for SVG elements
 */
export interface CenterPosition {
  centerX: number
  centerY: number
}

// ============================================================
// SHAPE TYPES
// ============================================================

/**
 * Available shape types
 */
export type ShapeType =
  | "circle"
  | "square"
  | "triangle"
  | "hexagon"
  | "pentagon"
  | "star"

/**
 * Triangle orientation options
 */
export type TriangleOrientation = "up" | "down" | "left" | "right"

/**
 * Fill mode for shapes
 */
export type FillMode = "solid" | "gradient" | "none"

/**
 * Stroke configuration
 */
export interface StrokeConfig {
  color?: string
  width?: number
  linecap?: "butt" | "round" | "square"
  linejoin?: "miter" | "round" | "bevel"
  dasharray?: string
}

/**
 * Common shape props shared across all shape primitives
 */
export interface BaseShapeProps extends SVGElementProps, CenterPosition {
  /** Shape radius or size basis */
  radius: number
  /** Fill color */
  fill?: string
  /** Fill mode */
  fillMode?: FillMode
  /** Gradient ID reference (when fillMode is "gradient") */
  gradientId?: string
  /** Stroke configuration */
  stroke?: StrokeConfig
  /** Opacity (0-1) */
  opacity?: number
  /** Shadow filter ID */
  shadowFilterId?: string
  /** Transform string */
  transform?: string
  /** Transition style for animations */
  transitionStyle?: string
}

/**
 * Circle shape props
 */
export interface CircleProps extends BaseShapeProps {
  // Eye/Pupil options
  /** Show pupil/eye */
  showPupil?: boolean
  /** Direction pupil looks (degrees, 0 = right, 90 = up) */
  pupilDirection?: number
  /** Pupil offset from center (0-1 fraction of radius) */
  pupilOffset?: number
  /** Pupil size (0-1 fraction of radius) */
  pupilSize?: number
  /** Pupil outer color */
  pupilColor?: string
  /** Pupil inner (iris) color */
  pupilInnerColor?: string
  /** Pupil inner size ratio */
  pupilInnerSize?: number
  /** Pupil gradient ID (for 3D mode) */
  pupilGradientId?: string
  // 3D Lighting
  /** Show 3D highlight */
  show3DHighlight?: boolean
  /** Light direction (degrees) */
  lightDirection?: number
  /** Highlight intensity (0-1) */
  highlightIntensity?: number
}

/**
 * Triangle shape props
 */
export interface TriangleProps extends BaseShapeProps {
  /** Triangle orientation */
  orientation?: TriangleOrientation
  /** Corner radius for vertices */
  cornerRadius?: number
}

/**
 * Square shape props
 */
export interface SquareProps extends BaseShapeProps {
  /** Corner radius */
  cornerRadius?: number
}

/**
 * Polygon shape props (hexagon, pentagon, star)
 */
export interface PolygonProps extends BaseShapeProps {
  /** Number of sides/points */
  sides?: number
  /** Rotation offset in degrees */
  rotationOffset?: number
  /** For star: inner radius ratio (0-1) */
  innerRadiusRatio?: number
}

// ============================================================
// ARC TYPES
// ============================================================

/**
 * Arc style
 */
export type ArcStyle = "filled" | "stroke"

/**
 * Single arc segment configuration
 */
export interface ArcSegment {
  /** Segment identifier */
  id?: string | number
  /** Start angle in degrees (0 = right, counterclockwise) */
  startAngle: number
  /** End angle in degrees */
  endAngle: number
  /** Override radius */
  radius?: number
  /** Arc color */
  color?: string
  /** Arc opacity */
  opacity?: number
}

/**
 * Border arc props
 */
export interface BorderArcProps extends SVGElementProps, CenterPosition {
  /** Base radius */
  radius: number
  /** Start angle in degrees */
  startAngle: number
  /** End angle in degrees */
  endAngle: number
  /** Arc render style (filled or stroke) */
  arcStyle?: ArcStyle
  /** Stroke width (for stroke style) */
  strokeWidth?: number
  /** Color */
  color?: string
  /** Opacity */
  opacity?: number
  /** Pre-computed SVG path (for filled style using V4 paths) */
  pathData?: string
  /** Transition style */
  transitionStyle?: string
}

/**
 * Ring extent preset names
 */
export type RingExtent =
  | "compact"
  | "arcEdge"
  | "innerArc"
  | "arcCenter"
  | "outerArc"
  | "moonCenter"
  | { rx: number; ry: number }

/**
 * Ring style variant
 */
export type RingStyleVariant = "ellipse" | "circular" | "comet"

/**
 * Orbital ring props
 */
export interface OrbitalRingProps extends SVGElementProps, CenterPosition {
  /** Ring style variant */
  variant?: RingStyleVariant
  /** Ring extent (preset name or custom values) */
  extent?: RingExtent
  /** Rotation angle in degrees */
  rotation?: number
  /** Stroke width */
  strokeWidth?: number
  /** Stroke color */
  color?: string
  /** Use gradient for stroke */
  useGradient?: boolean
  /** Gradient ID */
  gradientId?: string
  /** Opacity (0-1) */
  opacity?: number
  /** Visible state */
  visible?: boolean
  /** Transition style */
  transitionStyle?: string
}

// ============================================================
// EFFECT TYPES
// ============================================================

/**
 * Glow effect configuration
 */
export interface GlowConfig {
  /** Filter ID */
  id: string
  /** Blur radius */
  blur?: number
  /** Glow color */
  color?: string
  /** Spread amount */
  spread?: number
  /** Intensity (0-1) */
  intensity?: number
}

/**
 * Gradient stop definition
 */
export interface GradientStop {
  offset: string | number
  color: string
  opacity?: number
}

/**
 * Linear gradient configuration
 */
export interface LinearGradientConfig {
  id: string
  x1?: string
  y1?: string
  x2?: string
  y2?: string
  stops: GradientStop[]
}

/**
 * Radial gradient configuration
 */
export interface RadialGradientConfig {
  id: string
  cx?: string
  cy?: string
  r?: string
  fx?: string
  fy?: string
  stops: GradientStop[]
}

// ============================================================
// COMPOSITE TYPES
// ============================================================

/**
 * Comet props (circle head + triangle tail)
 */
export interface CometProps extends SVGElementProps {
  /** Size of the comet head */
  size: number
  /** Tail length relative to head size (0-1) */
  tailLength?: number
  /** Tail width at base relative to head diameter (0-1) */
  tailWidth?: number
  /** Color */
  color?: string
  /** Direction the comet faces (degrees) */
  direction?: number
  /** Center X position */
  centerX?: number
  /** Center Y position */
  centerY?: number
  /** Show glow effect */
  glow?: boolean
  /** Glow intensity (0-1) */
  glowIntensity?: number
  /** Stroke style instead of fill */
  strokeStyle?: boolean
  /** Stroke width (when strokeStyle is true) */
  strokeWidth?: number
  /** Softness of curves (0-1) */
  softness?: number
  /** Opacity */
  opacity?: number
}

/**
 * Halo props (tilted orbital ring for character accessories)
 */
export interface HaloProps extends SVGElementProps {
  /** Center X position */
  centerX?: number
  /** Center Y position */
  centerY?: number
  /** Ring radius */
  radius?: number
  /** Tilt angle (perspective) */
  tilt?: number
  /** Rotation around center */
  rotation?: number
  /** Stroke color */
  color?: string
  /** Stroke width */
  strokeWidth?: number
  /** Number of rings */
  ringCount?: 1 | 2 | 3
  /** Ring spacing */
  ringSpacing?: number
  /** Show glow effect */
  glow?: boolean
  /** Glow intensity */
  glowIntensity?: number
  /** Opacity */
  opacity?: number
}

/**
 * Portal variant types
 */
export type PortalVariant = "ground" | "wall" | "floating"

/**
 * Portal props (perspective ellipse for teleportation effects)
 */
export interface PortalProps extends SVGElementProps {
  /** Center X position */
  centerX?: number
  /** Center Y position (or bottom Y for ground portal) */
  centerY?: number
  /** Portal width */
  width?: number
  /** Portal depth (perspective squish) */
  depth?: number
  /** Portal variant */
  variant?: PortalVariant
  /** Number of concentric rings */
  rings?: number
  /** Ring spacing */
  ringSpacing?: number
  /** Primary color */
  primaryColor?: string
  /** Secondary color (for gradient) */
  secondaryColor?: string
  /** Show inner vortex effect */
  showVortex?: boolean
  /** Show glow effect */
  glow?: boolean
  /** Glow intensity */
  glowIntensity?: number
  /** Opacity */
  opacity?: number
  /** Animated (CSS animation) */
  animated?: boolean
  /** Animation speed multiplier */
  animationSpeed?: number
}

/**
 * CoinIcon props
 */
export interface CoinIconProps extends SVGElementProps {
  /** Size (diameter) */
  size?: number
  /** Fill color */
  color?: string
  /** Stroke/border color */
  borderColor?: string
  /** Show border arcs */
  showArcs?: boolean
  /** Arc opacity */
  arcOpacity?: number
  /** Show orbital rings */
  showRings?: boolean
  /** Ring opacity */
  ringOpacity?: number
}

// ============================================================
// CONTEXT TYPES
// ============================================================

/**
 * Brand configuration options
 */
export interface BrandConfig {
  // Colors
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string

  // Effects
  glowEnabled?: boolean
  glowIntensity?: number
  shadowEnabled?: boolean

  // Animation
  animationsEnabled?: boolean
  defaultAnimationSpeed?: number

  // Theme integration
  useThemeColors?: boolean
  themeColorMapping?: {
    primary?: "primary" | "secondary" | "text" | "background"
    secondary?: "primary" | "secondary" | "text" | "background"
  }
}

/**
 * Brand context value
 */
export interface BrandContextValue {
  config: BrandConfig
  setConfig: (config: Partial<BrandConfig>) => void
  resolveColor: (colorKey: keyof BrandConfig | string) => string
}
