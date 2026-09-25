/**
 * ExpanseLogo V5 Type Definitions
 */

import React from "react"

// ============================================================
// SHAPE TYPES
// ============================================================

/**
 * Available shape types for the logo
 */
export type ShapeType = "circle" | "square" | "triangle"

/**
 * Triangle orientation options
 */
export type TriangleOrientation = "up" | "down" | "left" | "right"

/**
 * Fill mode for shapes
 */
export type FillMode = "solid" | "gradient"

/**
 * Props for the Shape component
 */
export interface ShapeProps {
  /** Unique name for this shape instance (e.g., "primary", "secondary") */
  name: string

  /** Shape type */
  shape: ShapeType

  /** Center X coordinate */
  centerX: number

  /** Center Y coordinate */
  centerY: number

  /** Shape radius (for circle) or size basis (for square/triangle) */
  radius: number

  /** Fill color */
  fill?: string

  /** Fill mode */
  fillMode?: FillMode

  /** Gradient ID to use (when fillMode is "gradient") */
  gradientId?: string

  /** Shadow filter ID */
  shadowFilterId?: string

  // Shape-specific options
  /** Corner radius for square shape */
  squareCornerRadius?: number

  /** Corner radius for triangle vertices */
  triangleCornerRadius?: number

  /** Triangle orientation */
  triangleOrientation?: TriangleOrientation

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
 * Result from shape geometry calculation
 */
export interface ShapeGeometry {
  /** Main shape SVG element */
  mainShape: React.ReactNode
  /** Mask shape for clipping (slightly larger) */
  maskShape: React.ReactNode
  /** Center point for pupil positioning */
  pupilCenter: { x: number; y: number }
}

// ============================================================
// ORBITAL RINGS TYPES
// ============================================================

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

/**
 * Ring style variant
 */
export type RingStyleVariant = "ellipse" | "circular" | "comet"

/**
 * Ring spacing mode
 */
export type RingSpacingMode = "proportional" | "fixed"

/**
 * Props for the OrbitalRings component
 */
export interface OrbitalRingsProps {
  /** Ring set identifier */
  name?: string

  /** Center X coordinate */
  centerX: number

  /** Center Y coordinate */
  centerY: number

  /** Ring style variant */
  variant?: RingStyleVariant

  /** Ring extent preset or custom values */
  extent?: RingExtent | { rx: number; ry: number }

  /** Rotation angle in degrees */
  rotation?: number

  /** Number of rings (1-3) */
  ringCount?: 1 | 2 | 3

  /** Ring spacing mode */
  ringSpacing?: RingSpacingMode

  /** Fixed gap between rings (when ringSpacing is "fixed") */
  fixedGap?: number

  /** Stroke width */
  strokeWidth?: number

  /** Stroke color */
  strokeColor?: string

  /** Use gradient for stroke */
  useGradient?: boolean

  /** Gradient ID to use */
  gradientId?: string

  // Opacity controls
  /** Base opacity (0-1) */
  opacity?: number

  /** Inner ring opacity override */
  innerOpacity?: number

  /** Middle ring opacity override */
  middleOpacity?: number

  /** Outer ring opacity override */
  outerOpacity?: number

  /** Opacity scale multiplier to boost all opacities */
  opacityScale?: number

  // Ring sets
  /** Show this ring set */
  visible?: boolean

  /** Transform string for rotation */
  transform?: string

  /** Transition style */
  transitionStyle?: string

  // Animation
  /** Enable animation */
  animated?: boolean

  /** Animation ref for GSAP */
  animationRef?: React.RefObject<SVGGElement>
}

// ============================================================
// BORDER ARCS TYPES
// ============================================================

/**
 * Arc style
 */
export type ArcStyle = "filled" | "stroke"

/**
 * Configuration for a single arc
 */
export interface ArcConfig {
  /** Arc identifier */
  id?: string | number

  /** Start angle in degrees (0 = right, 90 = up) */
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
 * Props for the BorderArcs component
 */
export interface BorderArcsProps {
  /** Center X coordinate */
  centerX: number

  /** Center Y coordinate */
  centerY: number

  /** Base radius */
  radius: number

  /** Arc configurations */
  arcs?: ArcConfig[]

  /** Arc style */
  style?: ArcStyle

  /** Stroke width (for stroke style) */
  strokeWidth?: number

  /** Default color for arcs */
  defaultColor?: string

  /** Default opacity for arcs */
  defaultOpacity?: number

  /** SVG path data for filled arcs (from V4) */
  filledArcPaths?: {
    arc1?: string
    arc2?: string
    arc3?: string
  }

  // Interactivity
  /** Arc opacity when interacting */
  interactiveOpacity?: number

  /** Is currently interacting */
  isInteracting?: boolean
}

// ============================================================
// LOGO COMPONENT TYPES
// ============================================================

/**
 * Logo variant names
 */
export type LogoVariant =
  | "default"
  | "minimal"
  | "saturn"
  | "portal"
  | "halo"
  | "coin"
  | "eye"
  | "interactive"
  | "comet"

/**
 * Variant configuration
 */
export interface VariantConfig {
  // Visual
  shape: ShapeType
  is3D: boolean
  showOrbitalRings: boolean
  showSecondaryShape: boolean
  showBorderArcs: boolean
  showHaloPortal: boolean

  // Ring config
  orbitalRingsConfig?: {
    showPrimarySet?: boolean
    showMirroredSet?: boolean
    extent?: RingExtent
    variant?: RingStyleVariant
  }

  // Border arcs config
  borderArcsConfig?: {
    style?: ArcStyle
    expanding?: boolean
    layers?: number
  }

  // Behavior
  interactive: boolean
  pupilFollowCursor: boolean

  // Interaction config
  interactionConfig?: {
    mergeRingsOnHover?: boolean
    hoverScale?: number
    hoverCornerRadiusDelta?: number
  }

  // Animation
  animated: boolean
  animationConfig?: {
    target: string
    type: string
    speed?: number
    duration?: number
  }

  // Theme
  useThemeColors: boolean
  themeColorMapping?: {
    primary?: "primary" | "secondary" | "text"
    secondary?: "primary" | "secondary" | "text"
    rings?: "primary" | "secondary" | "text"
  }

  // Halo/Portal (future)
  haloPortalConfig?: {
    variant: string
    animated?: boolean
    animationSpeed?: number
    pulseAnimation?: boolean
  }
}

/**
 * Main ExpanseLogoV5 Props
 */
export interface ExpanseLogoV5Props {
  /** Unique ID for the SVG */
  id?: string

  /** Logo variant preset */
  variant?: LogoVariant

  // Sizing
  /** Height */
  height?: string | number

  /** Max width */
  maxWidth?: string | number

  /** Max height */
  maxHeight?: string | number

  // Colors
  /** Main fill color */
  fill?: string

  /** Ring stroke color */
  ringFill?: string

  /** Orbital ring color */
  orbitalFill?: string

  // Shape
  /** Primary shape type */
  shape?: ShapeType

  /** Horizontal mirror */
  horizontalMirror?: boolean

  /** Square corner radius */
  squareCornerRadius?: number

  /** Triangle corner radius */
  triangleCornerRadius?: number

  /** Triangle orientation */
  triangleOrientation?: TriangleOrientation

  // 2D/3D Mode
  /** Enable 3D rendering (gradients, highlights) */
  is3D?: boolean

  /** Light direction for 3D mode (degrees) */
  lightDirection?: number

  /** Highlight intensity (0-1) */
  highlightIntensity?: number

  // Orbital Rings
  /** Show orbital rings */
  showOrbitalRings?: boolean

  /** Show primary ring set */
  showPrimaryRings?: boolean

  /** Show mirrored ring set */
  mirroredRings?: boolean

  /** Ring extent preset */
  ringExtent?: RingExtent

  /** Ring rotation (degrees) */
  orbitalRotation?: number

  /** Ring stroke width */
  ringStrokeWidth?: number

  /**
   * Ring rendering style.
   * - "ellipse" (default): three constant-stroke ellipses (V4-style)
   * - "comet": tapered curved sliver with rounded caps (one wide head, thin tail)
   */
  ringStyle?: "ellipse" | "comet"

  /** Comet head width (thick end). Defaults to ringStrokeWidth * 4. */
  cometHeadWidth?: number

  /** Comet tail width (thin end). Defaults to ringStrokeWidth * 0.6. */
  cometTailWidth?: number

  /** Comet head angle in degrees (0 = right, 90 = up). Default 60. */
  cometStartAngle?: number

  /** Comet sweep span in degrees. Default 280. */
  cometArcSpan?: number

  /** Comet sweep direction. Default "cw". */
  cometSweepDirection?: "cw" | "ccw"

  /** Comet width taper curve. Default "easeOut". */
  cometTaper?: "linear" | "easeOut" | "easeIn"

  /** Base orbital opacity */
  orbitalOpacity?: number

  /** Opacity scale (multiplier) */
  orbitalOpacityScale?: number

  /** Individual ring opacities */
  innerRingOpacity?: number
  middleRingOpacity?: number
  outerRingOpacity?: number

  /** Back ring opacity (behind shape) */
  backRingOpacity?: number

  /** Ring spacing mode */
  ringSpacing?: RingSpacingMode

  /** Fixed gap between rings */
  fixedGap1?: number
  fixedGap2?: number

  /** Make rings circular */
  circular?: boolean

  // Secondary Shape (Moon)
  /** Show secondary shape */
  showSecondaryShape?: boolean

  /** Secondary shape size (% of primary radius) */
  secondaryShapeSizePercent?: number

  /** Secondary shape offset X */
  secondaryShapeOffsetX?: number

  /** Secondary shape offset Y */
  secondaryShapeOffsetY?: number

  // Border Arcs
  /** Show border arcs */
  showBorderArcs?: boolean

  /** Arc style */
  arcStyle?: ArcStyle

  /** Arc stroke width */
  arcStrokeWidth?: number

  /** Arc colors */
  arc1Color?: string
  arc2Color?: string
  arc3Color?: string

  /** Arc opacities */
  arc1Opacity?: number
  arc2Opacity?: number
  arc3Opacity?: number

  // Eye/Pupil Mode
  /** Enable eye mode */
  eyeMode?: boolean

  /** Pupil direction (degrees) */
  pupilDirection?: number

  /** Pupil offset from center */
  pupilOffset?: number

  /** Interactive pupil offset */
  interactivePupilOffset?: number

  /** Pupil size (fraction of radius) */
  pupilSize?: number

  /** Pupil colors */
  pupilColor?: string
  pupilInnerColor?: string
  pupilInnerSize?: number

  /** Pupil contrast (3D mode) */
  pupilContrast?: number

  /** Initial pupil scale */
  initialPupilScale?: number

  /** Outline color drawn around the outer pupil circle. Omit for no outline (default). */
  pupilStrokeColor?: string

  /** Outline width for `pupilStrokeColor`. Default `0`. */
  pupilStrokeWidth?: number

  // Interactivity
  /** Enable interactivity */
  interactive?: boolean

  /** Arc opacity when interacting */
  interactiveArcOpacity?: number

  /** Merge rings on interaction */
  mergeRingsOnInteraction?: boolean

  /** Hover scale */
  hoverScale?: number

  /** Hover corner radius delta */
  hoverCornerRadiusDelta?: number

  // Animation (GSAP)
  /** Enable animations */
  animated?: boolean

  /** Animation config */
  animationConfig?: {
    target: string
    type: string
    speed?: number
    duration?: number
  }

  // Callbacks
  /** Called on hover state change */
  onHoverChange?: (isHovered: boolean) => void

  /** Called on active state change */
  onActiveChange?: (isActive: boolean) => void
}

// ============================================================
// CONTEXT TYPES
// ============================================================

/**
 * Logo settings for context provider
 */
export interface LogoSettings {
  /** Default shape */
  defaultShape: ShapeType

  /** Default 3D mode */
  default3DMode: boolean

  /** Default interactivity */
  defaultInteractive: boolean

  /** Theme colors */
  primaryColor?: string
  secondaryColor?: string

  /** Feature flags */
  enableAnimations: boolean
  enable3DTransforms: boolean

  /** Performance */
  reduceMotion: boolean
}

// ============================================================
// GRADIENT TYPES
// ============================================================

/**
 * Gradient stop definition
 */
export interface GradientStop {
  offset: string
  color: string
  opacity?: number
}

/**
 * Gradient configuration
 */
export interface GradientConfig {
  type: "radial" | "linear"
  stops: GradientStop[]
  direction?: {
    x1?: string
    y1?: string
    x2?: string
    y2?: string
  }
}

// ============================================================
// LOGO CANVAS TYPES
// ============================================================

/**
 * Props for the LogoCanvas component
 */
export interface LogoCanvasProps extends React.SVGAttributes<SVGSVGElement> {
  /** SVG width */
  width?: number | string

  /** SVG height */
  height?: number | string

  /** SVG viewBox */
  viewBox?: string

  /** Custom gradients */
  gradients?: Record<string, GradientConfig>

  /** Light angle for radial gradients */
  lightAngle?: number

  /** Children elements */
  children?: React.ReactNode

  /** CSS class name */
  className?: string

  /** Inline styles */
  style?: React.CSSProperties
}
