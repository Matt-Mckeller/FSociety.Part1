// Primary export - simplified wrapper with refined settings
export { ExpanseLogo } from "./ExpanseLogo"
export type {
  ExpanseLogoProps,
  LogoSize,
  LogoTheme,
  LogoVariant,
} from "./types"
export { LOGO_SIZE_MAP } from "./types"

// Legacy component (original ExpanseLogo)
export { ExpanseLogo as ExpanseLogoLegacy } from "./ExpanseLogo.component"

// Base configurable component for full customization
export {
  ExpanseLogoV3,
  ExpanseLogoV3_3D,
  type ExpanseLogoV3Props,
  type RingExtent,
  RING_EXTENT_PRESETS,
} from "./ExpanseLogoV3.component"

// V4 component with shape variants and mirroring
export {
  ExpanseLogoV4,
  ExpanseLogoV4_3D,
  type ExpanseLogoV4Props,
} from "./ExpanseLogoV4.component"

// V5 component - modular, configurable (latest)
export {
  ExpanseLogoV5,
  type ExpanseLogoV5Props,
  // Sub-components for composition
  Shape,
  OrbitalRings,
  DualOrbitalRings,
  BorderArcs,
  LogoCanvas,
  LogoCanvasProvider,
  // Types
  type ShapeType,
  type ShapeProps,
  type OrbitalRingsProps,
  type BorderArcsProps,
  type LogoCanvasProps,
  type VariantConfig,
  // Variants and constants
  LOGO_VARIANTS,
  RING_EXTENT_PRESETS as V5_RING_EXTENT_PRESETS,
  DEFAULTS as V5_DEFAULTS,
  // Context
  LogoSettingsProvider,
  useLogoSettings,
} from "./v5"

// Shape utilities for V4
export {
  type LogoShape,
  type TriangleOrientation,
  type ShapeRenderContext,
  type ShapeRenderResult,
  SHAPE_RENDERERS,
  SHAPE_DEFAULTS,
  getShapeRenderer,
  calculateTrianglePoints,
  calculateTriangleCentroid,
} from "./shapes"

// Geometry utilities
export {
  PUPIL_GAZE_DIRECTIONS,
  LIGHT_DIRECTIONS,
  positionFromAngle,
  angleToPoint,
  lightAngleToGradientPosition,
  type PupilGazePreset,
  type LightDirectionPreset,
} from "./utils/geometry"
