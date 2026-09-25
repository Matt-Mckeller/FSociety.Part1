/**
 * Character personas — preset combinations of the `Character4eye`
 * props that turn a single character system into a cast of distinct
 * individuals. Pick a persona by key at the call site instead of
 * repeating prop combos in every consumer.
 *
 * Adding a new persona: add an entry here, then reference it via
 * `CHARACTER_PERSONAS.<key>` and spread the result into the character.
 *
 * NOTE: This is intentionally a plain TS object (not a React component)
 * so the same preset can be passed into any of the character entry
 * points — `<Character4eye>`, `<AnimatedCharacter>`, `<FourEyeMascot>`,
 * etc.
 */

import type {
  Character4eyeMood,
  Character4eyeVariant,
  EyeDesign,
  StrapStyle,
} from "./figure"

export interface CharacterPersona {
  variant?: Character4eyeVariant
  eyeDesign?: EyeDesign
  strapStyle?: StrapStyle
  mood?: Character4eyeMood
  showAntenna?: boolean
  showStatusLEDs?: boolean
  statusLEDCount?: 1 | 2 | 3
  showEarSensors?: boolean
  showForeheadMark?: boolean
  showDataFlow?: boolean
  pulseIntensity?: 0 | 1 | 2 | 3
}

export const CHARACTER_PERSONAS = {
  /** Calm, welcoming entry — used by the home hero mascot. */
  hero: {
    variant: "friendly",
    eyeDesign: "orb",
    strapStyle: "smooth",
    mood: "neutral",
    showAntenna: true,
    pulseIntensity: 1,
  },

  /** Focused / actively-working — used by the Promise slide. */
  promise: {
    variant: "tech",
    eyeDesign: "scanner",
    strapStyle: "smooth",
    mood: "processing",
    showAntenna: true,
    showDataFlow: true,
    pulseIntensity: 2,
  },

  /** Warm, glowing celebration — used by the Celebrate slide. */
  celebrate: {
    variant: "friendly",
    eyeDesign: "orb",
    strapStyle: "organic",
    mood: "happy",
    showAntenna: true,
    showForeheadMark: true,
    pulseIntensity: 3,
  },

  /** Forward-looking, modern, "checking the time" — Vision page. */
  vision: {
    variant: "friendly",
    eyeDesign: "orb",
    strapStyle: "smooth",
    mood: "alert",
    showAntenna: true,
    showStatusLEDs: true,
    statusLEDCount: 2,
    pulseIntensity: 1,
  },

  /** Sharp, analytical — left character in the trio split. */
  trioLearning: {
    variant: "tech",
    eyeDesign: "aperture",
    strapStyle: "angular",
    mood: "scanning",
    showAntenna: true,
    showStatusLEDs: true,
    statusLEDCount: 3,
  },

  /** Soft, emotional — center character in the trio split. */
  trioMood: {
    variant: "friendly",
    eyeDesign: "orb",
    strapStyle: "organic",
    mood: "happy",
    showAntenna: true,
    pulseIntensity: 2,
  },

  /** Energized, outward — right character in the trio split. */
  trioEngage: {
    variant: "sleek",
    eyeDesign: "ring",
    strapStyle: "floating",
    mood: "alert",
    showAntenna: true,
    showStatusLEDs: true,
    statusLEDCount: 2,
  },

  /**
   * Map explorer — the player's avatar on the full-screen map view.
   * Alert orb eyes (scanning the grid), data-flow lines on the strap
   * reinforce the "actively reading the map" feel, status LEDs show
   * the character is live and connected to the world.
   */
  mapExplorer: {
    variant: "friendly",
    eyeDesign: "orb",
    strapStyle: "smooth",
    mood: "alert",
    showAntenna: true,
    showStatusLEDs: true,
    statusLEDCount: 2,
    showDataFlow: true,
    pulseIntensity: 1,
  },
} as const satisfies Record<string, CharacterPersona>

export type PersonaKey = keyof typeof CHARACTER_PERSONAS
