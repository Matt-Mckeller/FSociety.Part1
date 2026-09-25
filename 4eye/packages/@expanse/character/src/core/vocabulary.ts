/**
 * Character Vocabulary — Platform-Neutral
 * =======================================
 * Shared unions describing a 4eye's appearance and behavior. Identical on
 * web (2D SVG) and native (3D R3F) so both renderers speak the same language.
 * Mirrors the canonical unions from `@expanse/brand-core` Character4eye.
 */

/** Eye design styles. */
export const EYE_DESIGNS = [
  "default",
  "aperture",
  "camera",
  "orb",
  "scanner",
  "ring",
] as const
export type EyeDesign = (typeof EYE_DESIGNS)[number]

/** Strap / visor styles (`none` = bare eye on head). */
export const STRAP_STYLES = [
  "default",
  "smooth",
  "angular",
  "floating",
  "organic",
  "none",
] as const
export type StrapStyle = (typeof STRAP_STYLES)[number]

/** Visual style variant. */
export const CHARACTER_VARIANTS = [
  "minimal",
  "tech",
  "friendly",
  "sleek",
] as const
export type CharacterVariant = (typeof CHARACTER_VARIANTS)[number]

/** Character mood / state. */
export const MOODS = [
  "neutral",
  "alert",
  "processing",
  "happy",
  "scanning",
  "excited",
] as const
export type Mood = (typeof MOODS)[number]

/** Named full-body poses. */
export const POSES = [
  "standing",
  "walking",
  "pushing",
  "celebrating",
] as const
export type Pose = (typeof POSES)[number]

/** One-shot emotes (play, then return to the resting pose). */
export const EMOTES = [
  "wave", // Select 4eye — greeting
  "anxious", // Anxious 4eye — startled
  "excited", // Excited 4eye — celebration
] as const
export type Emote = (typeof EMOTES)[number]
