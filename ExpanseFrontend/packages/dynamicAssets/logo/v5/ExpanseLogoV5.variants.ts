/**
 * ExpanseLogo V5 Variants and Constants
 */

import type {
  RingExtent,
  LogoVariant,
  VariantConfig,
} from "./ExpanseLogoV5.types"

// ============================================================
// RING EXTENT PRESETS
// ============================================================

/**
 * Ring extent preset values
 * Each preset defines outer rx and ry (inner/middle calculated with spacing)
 */
export const RING_EXTENT_PRESETS: Record<
  RingExtent,
  { rx: number; ry: number }
> = {
  compact: { rx: 123, ry: 30.75 },
  arcEdge: { rx: 128, ry: 32 },
  innerArc: { rx: 130, ry: 32.5 },
  arcCenter: { rx: 145, ry: 36.25 },
  outerArc: { rx: 165, ry: 41.25 },
  moonCenter: { rx: 231, ry: 57.75 },
}

// ============================================================
// DEFAULT VALUES
// ============================================================

export const DEFAULT_SQUARE_CORNER_RADIUS = 20
export const DEFAULT_TRIANGLE_CORNER_RADIUS = 0

export const DEFAULTS = {
  // Shape
  shape: "circle" as const,
  squareCornerRadius: DEFAULT_SQUARE_CORNER_RADIUS,
  triangleCornerRadius: DEFAULT_TRIANGLE_CORNER_RADIUS,
  triangleOrientation: "left" as const,

  // Rings
  orbitalRotation: -33,
  ringStrokeWidth: 4,
  orbitalOpacity: 1,
  backRingOpacity: 0.3,
  ringExtent: "arcEdge" as const,

  // Secondary shape
  secondaryShapeSizePercent: 33,

  // Eye mode
  pupilDirection: 240, // Toward moon
  pupilOffset: 0,
  interactivePupilOffset: 0.33,
  pupilSize: 0.28,
  pupilColor: "#1a1a1a",
  pupilInnerColor: "#f5f5f5",
  pupilInnerSize: 0.6,
  initialPupilScale: 0.65,

  // Arcs
  arcStyle: "filled" as const,
  arcStrokeWidth: 8,
  arc1Opacity: 0.21,
  arc2Opacity: 0.33,
  arc3Opacity: 0,
  interactiveArcOpacity: 0.45,

  // 3D and lighting
  lightDirection: 45,
  lightAngle: 45, // Alias for lightDirection
  highlightIntensity: 0.15,
  pupilContrast: 0.71,

  // Core dimensions (from V4)
  mainCircleRadius: 99,
  primaryRadius: 99, // Alias for mainCircleRadius
  secondaryRadius: 33, // Moon radius (33% of primary)
  orbitalCenterX: 165,
  orbitalCenterY: 165,
  centerX: 165, // Alias for orbitalCenterX
  centerY: 165, // Alias for orbitalCenterY
  viewBoxWidth: 409,
  viewBoxHeight: 409,
}

// ============================================================
// PUPIL GAZE DIRECTIONS
// ============================================================

export const PUPIL_GAZE_DIRECTIONS = {
  right: 0,
  upRight: 45,
  up: 90,
  upLeft: 135,
  left: 180,
  downLeft: 225,
  down: 270,
  downRight: 315,
  moon: 240, // Default: looking toward moon position
}

// ============================================================
// LOGO VARIANTS
// ============================================================

/**
 * Predefined logo variants
 */
export const LOGO_VARIANTS: Record<LogoVariant, VariantConfig> = {
  default: {
    shape: "circle",
    is3D: true,
    showOrbitalRings: true,
    showSecondaryShape: true,
    showBorderArcs: true,
    showHaloPortal: false,
    orbitalRingsConfig: {
      showPrimarySet: false,
      showMirroredSet: true,
      extent: "arcEdge",
    },
    interactive: true,
    pupilFollowCursor: false,
    animated: false,
    useThemeColors: true,
    themeColorMapping: {
      primary: "text",
      secondary: "text",
      rings: "text",
    },
  },

  minimal: {
    shape: "circle",
    is3D: true,
    showOrbitalRings: false,
    showSecondaryShape: true,
    showBorderArcs: false,
    showHaloPortal: false,
    interactive: false,
    pupilFollowCursor: false,
    animated: false,
    useThemeColors: true,
  },

  saturn: {
    shape: "circle",
    is3D: true,
    showOrbitalRings: true,
    showSecondaryShape: true,
    showBorderArcs: false,
    showHaloPortal: false,
    orbitalRingsConfig: {
      showPrimarySet: true,
      showMirroredSet: true,
      extent: "moonCenter",
    },
    interactive: false,
    pupilFollowCursor: false,
    animated: true,
    animationConfig: {
      target: "orbitalRings",
      type: "rotate",
      speed: 0.05,
    },
    useThemeColors: true,
  },

  portal: {
    shape: "circle",
    is3D: true,
    showOrbitalRings: false,
    showSecondaryShape: false,
    showBorderArcs: false,
    showHaloPortal: true,
    haloPortalConfig: {
      variant: "groundPortal",
      animated: true,
      animationSpeed: 0.5,
    },
    interactive: false,
    pupilFollowCursor: false,
    animated: true,
    useThemeColors: true,
  },

  halo: {
    shape: "circle",
    is3D: true,
    showOrbitalRings: false,
    showSecondaryShape: false,
    showBorderArcs: false,
    showHaloPortal: true,
    haloPortalConfig: {
      variant: "halo",
      animated: true,
      animationSpeed: 0.3,
      pulseAnimation: true,
    },
    interactive: false,
    pupilFollowCursor: false,
    animated: true,
    useThemeColors: true,
  },

  coin: {
    shape: "circle",
    is3D: false,
    showOrbitalRings: false,
    showSecondaryShape: false,
    showBorderArcs: true,
    showHaloPortal: false,
    borderArcsConfig: {
      expanding: true,
      layers: 3,
    },
    interactive: false,
    pupilFollowCursor: false,
    animated: false,
    useThemeColors: true,
  },

  eye: {
    shape: "circle",
    is3D: true,
    showOrbitalRings: true,
    showSecondaryShape: true,
    showBorderArcs: true,
    showHaloPortal: false,
    interactive: true,
    pupilFollowCursor: true,
    animated: false,
    useThemeColors: true,
  },

  interactive: {
    shape: "circle",
    is3D: true,
    showOrbitalRings: true,
    showSecondaryShape: true,
    showBorderArcs: true,
    showHaloPortal: false,
    interactive: true,
    pupilFollowCursor: true,
    interactionConfig: {
      mergeRingsOnHover: true,
      hoverScale: 1.05,
    },
    animated: false,
    useThemeColors: true,
  },
}

// ============================================================
// SHAPE DEFAULTS
// ============================================================

/**
 * Default settings per shape type
 */
export const SHAPE_DEFAULTS: Record<string, { showArcs: boolean }> = {
  circle: { showArcs: true },
  square: { showArcs: true },
  triangle: { showArcs: false },
}
