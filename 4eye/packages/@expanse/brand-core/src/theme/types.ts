/**
 * @expanse/brand-core Theme Types
 * 
 * Component theme type definitions for brand-core graphics components:
 * - ProgressBar
 * - Gem
 * - ExperienceIcon
 * - ExpanseCharacter
 * - ExpandingBorderBox
 */

// =============================================================================
// ProgressBar
// =============================================================================

/**
 * ProgressBar default variant configuration
 */
export interface ProgressBarDefaultVariant {
  outerDecorativeLayerStrokeColor: string
  outerDecorativeLayerFillColor: string
  innerBackgroundLayerFillColor: string
  innerProgressLayerFillColor: string
  textColor: string
}

/**
 * ProgressBar filled variant configuration
 */
export interface ProgressBarFilledVariant {
  outerDecorativeLayerStrokeColor: string
  outerDecorativeLayerFillColor: string
  innerBackgroundLayerFillColor: string
  innerProgressLayerFillColor: string
  textColor: string
}

/**
 * ProgressBar component theme configuration
 */
export interface ProgressBarThemeProps {
  variants?: {
    default?: ProgressBarDefaultVariant
    defaultFilled?: ProgressBarFilledVariant
  }
}

// =============================================================================
// Gem
// =============================================================================

/**
 * Gem variant configuration (shared structure)
 */
export interface GemVariantProps {
  strokeColor: string
  fillColor: string
}

/**
 * Gem component theme configuration
 */
export interface GemThemeProps {
  variants?: {
    default?: GemVariantProps
    contrastBG?: GemVariantProps
  }
}

// =============================================================================
// ExperienceIcon
// =============================================================================

/**
 * ExperienceIcon variant configuration (shared structure)
 */
export interface ExperienceIconVariantProps {
  fillColor: string
}

/**
 * ExperienceIcon component theme configuration
 */
export interface ExperienceIconThemeProps {
  variants?: {
    default?: ExperienceIconVariantProps
    contrast?: ExperienceIconVariantProps
  }
}

// =============================================================================
// ExpanseCharacter
// =============================================================================

/**
 * ExpanseCharacter face configuration
 */
export interface ExpanseCharacterFaceProps {
  mouthStrokeColor: string
  eyePrimaryColor: string
  eyeSecondaryColor: string
}

/**
 * ExpanseCharacter default variant configuration
 */
export interface ExpanseCharacterDefaultVariant {
  headColor?: string
  limbColor?: string
  bodyColor?: string
  altLimbColor?: string
  altColor?: string
  face?: ExpanseCharacterFaceProps
}

/**
 * ExpanseCharacter component theme configuration
 */
export interface ExpanseCharacterThemeProps {
  variants?: {
    default?: ExpanseCharacterDefaultVariant
  }
}

// =============================================================================
// ExpandingBorderBox
// =============================================================================

/**
 * ExpandingBorderBox variant configuration (shared structure)
 */
export interface ExpandingBorderBoxVariantProps {
  outerBorderColor: string
  middleBorderColor: string
  innerBorderColor: string
}

/**
 * ExpandingBorderBox component theme configuration
 */
export interface ExpandingBorderBoxThemeProps {
  variants?: {
    default?: ExpandingBorderBoxVariantProps
    subtle?: ExpandingBorderBoxVariantProps
    primary?: ExpandingBorderBoxVariantProps
    highContrast?: ExpandingBorderBoxVariantProps
  }
}

// =============================================================================
// TripleLayerPill (used by ExpandingBarTripleLayer + status TripleLayer bars)
// =============================================================================

/**
 * One identity for a triple-layer pill: the resting palette plus a couple of
 * state modifiers. States (active / inactive) are derived by the component
 * applying these modifiers to the resting values — variants describe what the
 * thing IS, states describe how it BEHAVES.
 */
export interface TripleLayerPillVariantProps {
  /** Outer (widest) halo stroke color. */
  outerStrokeColor: string
  /** Center stroke color. */
  centerStrokeColor: string
  /** Inner (thinnest) defining stroke color. */
  innerStrokeColor: string
  /**
   * Inner-pill fill paint. Accepts a color, a CSS gradient, or `url(#id)`
   * referencing a `<defs>` gradient defined inside the SVG host.
   */
  innerFillColor: string
  /** Default text/icon color rendered inside the pill. */
  contentColor: string
  /** Group opacity applied when `visualState === "inactive"`. @default 0.5 */
  inactiveOpacity?: number
  /** SVG `saturate()` applied when `visualState === "inactive"`. @default 0.4 */
  inactiveSaturation?: number
}

/**
 * TripleLayerPill component theme configuration.
 *
 * `default` is the original brand-loud look; `quiet` is HUD-friendly chrome
 * that defers to surrounding content; `ghost` is the absolute-minimum
 * neutral chrome with no halo.
 */
export interface TripleLayerPillThemeProps {
  variants?: {
    default?: TripleLayerPillVariantProps
    quiet?: TripleLayerPillVariantProps
    primary?: TripleLayerPillVariantProps
    ghost?: TripleLayerPillVariantProps
  }
}

// =============================================================================
// Aggregate Type
// =============================================================================

/**
 * All brand-core component theme properties
 */
export interface BrandCoreComponentsThemeProps {
  ProgressBar?: ProgressBarThemeProps
  Gem?: GemThemeProps
  ExperienceIcon?: ExperienceIconThemeProps
  ExpanseCharacter?: ExpanseCharacterThemeProps
  ExpandingBorderBox?: ExpandingBorderBoxThemeProps
  TripleLayerPill?: TripleLayerPillThemeProps
}
