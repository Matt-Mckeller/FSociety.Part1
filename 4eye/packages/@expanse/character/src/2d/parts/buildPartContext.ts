/**
 * Shared variant configuration + context builder for the 4eye character
 * decorations (eye, strap, antenna, etc.).
 *
 * Both `Character4eye` (static, reactive) and `AnimatedCharacter` (dynamic
 * pose-driven) need to render the same set of part components. This helper
 * lets them share the variant sizing math and the `CharacterPartContext`
 * assembly without duplicating constants.
 */

import type {
  Character4eyeMood,
  Character4eyeVariant,
  EyeDesign,
  StrapStyle,
} from "../figure/Character4eye"
import type { CharacterPartContext, CharacterVariantConfig } from "./CharacterPartContext"

/**
 * Per-variant sizing + flags, expressed as multipliers of `headLength`.
 * Pulled out of `Character4eye.tsx` so multiple character renderers
 * (e.g. `AnimatedCharacter` + `Character4eye`) can reuse the same map.
 */
export const VARIANT_CONFIG: Record<
  Character4eyeVariant,
  (headLength: number) => CharacterVariantConfig
> = {
  minimal: (headLength) => ({
    eyeOuterRadius: headLength * 0.12,
    eyeInnerRadius: headLength * 0.06,
    strapWidth: headLength * 0.08,
    strapExtend: headLength * 0.15,
    showNodes: false,
    glowIntensity: 0.4,
  }),
  tech: (headLength) => ({
    eyeOuterRadius: headLength * 0.14,
    eyeInnerRadius: headLength * 0.07,
    strapWidth: headLength * 0.1,
    strapExtend: headLength * 0.2,
    showNodes: true,
    glowIntensity: 0.6,
  }),
  friendly: (headLength) => ({
    eyeOuterRadius: headLength * 0.16,
    eyeInnerRadius: headLength * 0.09,
    strapWidth: headLength * 0.12,
    strapExtend: headLength * 0.18,
    showNodes: true,
    glowIntensity: 0.7,
  }),
  sleek: (headLength) => ({
    eyeOuterRadius: headLength * 0.11,
    eyeInnerRadius: headLength * 0.055,
    strapWidth: headLength * 0.05,
    strapExtend: headLength * 0.12,
    showNodes: false,
    glowIntensity: 0.5,
  }),
}

/** Strap wrap angle (degrees from horizontal). Matches `Character4eye`. */
const STRAP_WRAP_ANGLE_DEG = 25

export interface BuildPartContextOptions {
  /** Horizontal center of the character (px in viewBox units). */
  centerX: number
  /** Vertical center of the head circle. */
  headCenterY: number
  /** Diameter of the head, used to scale most decorative elements. */
  headLength: number
  /** Variant — selects sizing + flags. Defaults to `"friendly"`. */
  variant?: Character4eyeVariant
  /** Eye design renderer key. */
  eyeDesign?: EyeDesign
  /** Strap style renderer key — `"none"` skips the strap entirely. */
  strapStyle?: StrapStyle
  /** Effective mood passed to renderers. */
  effectiveMood?: Character4eyeMood
  /** Number of aperture blades (only used by the aperture eye). */
  apertureBlades?: number
  /** Primary glow color used by every renderer. */
  glowColor: string
  /** Secondary accent color (defaults to `glowColor`). */
  accent?: string
  /** Stable gradient ID prefix. */
  gradientId: string
  /** CSS animation style applied to "pulsing" elements (eye, antenna). */
  pulseStyles?: React.CSSProperties

  // Decoration toggles
  showAntenna?: boolean
  showStatusLEDs?: boolean
  statusLEDCount?: number
  statusLEDColors?: string[]
  showEarSensors?: boolean
  showForeheadMark?: boolean
  showDataFlow?: boolean
}

/**
 * Build a `CharacterPartContext` for a head positioned at `(centerX, headCenterY)`
 * with a head diameter of `headLength`. This is the same calculation
 * `Character4eye` does inline, factored out for reuse.
 */
export function buildPartContext(opts: BuildPartContextOptions): CharacterPartContext {
  const {
    centerX,
    headCenterY,
    headLength,
    variant = "friendly",
    eyeDesign = "default",
    strapStyle = "default",
    effectiveMood = "neutral",
    apertureBlades = 6,
    glowColor,
    accent,
    gradientId,
    pulseStyles = {},
    showAntenna = true,
    showStatusLEDs = false,
    statusLEDCount = 2,
    statusLEDColors,
    showEarSensors = false,
    showForeheadMark = false,
    showDataFlow = false,
  } = opts

  const headRadius = headLength / 2
  const config = VARIANT_CONFIG[variant](headLength)

  const strapY = headCenterY
  const strapHalfWidth = config.strapWidth / 2
  const strapWrapRad = (STRAP_WRAP_ANGLE_DEG * Math.PI) / 180
  const wrapX = headRadius * Math.cos(strapWrapRad)
  const wrapYOffset = headRadius * Math.sin(strapWrapRad)

  return {
    centerX,
    headCenterY,
    headLength,
    headRadius,
    strapY,
    strapHalfWidth,
    wrapX,
    wrapYOffset,
    config,
    glowColor,
    accent: accent ?? glowColor,
    gradientId,
    pulseStyles,
    eyeDesign,
    strapStyle,
    effectiveMood,
    apertureBlades,
    showAntenna,
    showStatusLEDs,
    statusLEDCount,
    statusLEDColors,
    showEarSensors,
    showForeheadMark,
    showDataFlow,
  }
}
