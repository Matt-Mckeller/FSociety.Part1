/**
 * Logo Components
 */

export * from './FourUpLogo';

// ExpanseLogoV5 — re-export the component, settings provider, and types.
//
// Constants that already live at higher levels of brand-core (specifically
// `RING_EXTENT_PRESETS`, `PUPIL_GAZE_DIRECTIONS` in `../../constants`,
// and `generateArcPath` in `../../utils/geometry`) are intentionally NOT
// re-exported here to avoid star-export name collisions when the brand-core
// barrel mounts `display`, `constants`, and `utils` side-by-side.
//
// Consumers that specifically want the V5-flavored constants should import
// them directly from the V5 sub-package:
//   import { LOGO_VARIANTS } from "@expanse/brand-core/display/logos/ExpanseLogoV5"
export {
  ExpanseLogoV5,
  LOGO_VARIANTS,
  DEFAULTS as EXPANSE_LOGO_V5_DEFAULTS,
  LogoSettingsProvider,
  useLogoSettings,
  useReducedMotion,
} from './ExpanseLogoV5';
export type {
  ExpanseLogoV5Props,
  LogoVariant,
  VariantConfig,
  LogoSettings,
  ShapeType,
  GradientConfig,
  GradientStop,
} from './ExpanseLogoV5';
