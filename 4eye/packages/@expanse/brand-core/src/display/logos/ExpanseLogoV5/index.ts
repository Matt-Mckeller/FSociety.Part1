/**
 * ExpanseLogo V5
 *
 * Modular, configurable logo component with improved organization.
 * Maintains all V4 features with better component decomposition.
 */

// Main component
export { ExpanseLogoV5, default as default } from "./ExpanseLogoV5.component"
export type { ExpanseLogoV5Props } from "./ExpanseLogoV5.types"

// Sub-components (for advanced composition)
export { Shape, getShapeMask } from "./components/Shape"
export { OrbitalRings, DualOrbitalRings } from "./components/OrbitalRings"
export { BorderArcs, V4_FILLED_ARC_PATHS } from "./components/BorderArcs"
export {
  LogoCanvas,
  LogoCanvasProvider,
  useLogoCanvas,
  DEFAULT_GRADIENTS,
} from "./components/LogoCanvas"

// Types
export type {
  ShapeType,
  ShapeProps,
  TriangleOrientation,
  FillMode,
  ShapeGeometry,
  OrbitalRingsProps,
  RingExtent,
  RingStyleVariant,
  RingSpacingMode,
  BorderArcsProps,
  ArcConfig,
  ArcStyle,
  LogoVariant,
  VariantConfig,
  LogoSettings,
  GradientConfig,
  GradientStop,
  LogoCanvasProps,
} from "./ExpanseLogoV5.types"

// Variants and constants
export {
  LOGO_VARIANTS,
  RING_EXTENT_PRESETS,
  DEFAULTS,
  PUPIL_GAZE_DIRECTIONS,
} from "./ExpanseLogoV5.variants"

// Context (for settings/theming)
export {
  LogoSettingsProvider,
  useLogoSettings,
  useReducedMotion,
} from "./ExpanseLogoV5.context"

// Utilities
export {
  positionFromAngle,
  lightAngleToGradientPosition,
  generateArcPath,
  generateStrokeArcPath,
  calculateTrianglePoints,
  generateRoundedTrianglePath,
  generateRoundedSquarePath,
} from "./utils/geometry"
