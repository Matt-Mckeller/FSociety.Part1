/**
 * Shared render context for `Character4eye` part components.
 *
 * The 4eye SVG is composed of many small renderers (eye designs,
 * strap styles, antenna, status LEDs, etc.) that all close over the
 * same set of geometry + style values computed in the parent. Rather
 * than threading 15 props through each one, we pack everything into
 * a single immutable context object and pass it as one prop.
 *
 * Anything renderer-specific (e.g. an eye design that needs a unique
 * `apertureBlades` count) is exposed here too — these are computed
 * once in the parent so renderers stay pure.
 */

import type { Character4eyeMood, EyeDesign, StrapStyle } from "../figure/Character4eye"

/** Numeric variant config — sizes for eye, strap, glow per variant. */
export interface CharacterVariantConfig {
  eyeOuterRadius: number
  eyeInnerRadius: number
  strapWidth: number
  strapExtend: number
  showNodes: boolean
  glowIntensity: number
}

export interface CharacterPartContext {
  // ---------- Geometry ----------
  /** Horizontal center of the character (px in viewBox units). */
  centerX: number
  /** Vertical center of the head circle. */
  headCenterY: number
  /** Diameter of the head, used to scale most decorative elements. */
  headLength: number
  /** Half of `headLength`. */
  headRadius: number

  // ---------- Strap geometry (precomputed once in parent) ----------
  /** Y coordinate of the strap centerline. */
  strapY: number
  /** Half the strap's stroke height — many renderers use this. */
  strapHalfWidth: number
  /**
   * X distance from the head center to where the strap meets the head
   * (computed from the wrap angle).
   */
  wrapX: number
  /** Y offset from `strapY` where the strap exits the head. */
  wrapYOffset: number

  // ---------- Style ----------
  /** Variant-specific sizing config (eye + strap dimensions). */
  config: CharacterVariantConfig
  /** Primary glow color used by every renderer. */
  glowColor: string
  /** Secondary accent color (defaults to `glowColor` in the parent). */
  accent: string
  /**
   * Stable gradient ID prefix. Renderers append `-eyeGlow`, `-strap`,
   * `-orbGradient`, `-strapEdge`. Computed once per mount in the parent
   * to avoid SVG `<defs>` collisions when multiple characters render.
   */
  gradientId: string
  /** CSS animation style applied to "pulsing" elements (eye, antenna). */
  pulseStyles: React.CSSProperties

  // ---------- Props passed through to renderers ----------
  /** Selected eye design — picks which eye renderer runs. */
  eyeDesign: EyeDesign
  /** Selected strap style — picks which strap renderer runs. */
  strapStyle: StrapStyle
  /** Effective mood (post reaction-mood mapping). */
  effectiveMood: Character4eyeMood
  /** Number of aperture blades (only used by the aperture eye design). */
  apertureBlades: number
  showAntenna: boolean
  showStatusLEDs: boolean
  statusLEDCount: number
  statusLEDColors: string[] | undefined
  showEarSensors: boolean
  showForeheadMark: boolean
  showDataFlow: boolean
}
