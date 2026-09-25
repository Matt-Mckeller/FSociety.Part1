/**
 * @expanse/lens — core type vocabulary.
 *
 * A "lens" is an animated SVG symbol that carries a *word/meaning* in the
 * 4eye symbol-language. Lenses are composed from a small set of reusable
 * animated "shells" (the visual primitive) plus a theme palette, a motion
 * personality, and a set of tags for filtering/sorting.
 */

// ─────────────────────────────────────────────────────────────────────
// Shells — the ~17 animated SVG primitives
// ─────────────────────────────────────────────────────────────────────

/** The animated SVG primitive a lens is rendered with. */
export type LensShellId =
  | "aperture" // iris blades opening / closing — perception, focus
  | "scanner" // sweeping bar — analyze, read, detect
  | "ring-pulse" // concentric expanding rings — signal, awareness
  | "orbit" // dots orbiting a core — connection, systems
  | "prism" // refracting triangle — reframe, perspective
  | "reticle" // focus crosshair — target, attention, precision
  | "wave" // calm sine waves — heal, breathe, regulate
  | "shield" // shimmering shield — protect, guard, boundary
  | "growth" // sprouting bars — improve, progress, compound
  | "link" // connecting nodes — relationships, bonds, sync
  | "spiral" // compounding spiral — attention, momentum, recall
  | "bloom" // radial petals — positivity, gratitude, flourish
  | "condense" // rings selected inward — distill, tighten, keep the essence
  | "eye" // eye within an eye — visualize, reveal, inner sight
  | "beacon" // radar sweep + pinging dot — find, locate, detect
  | "converge" // rings collapsing to center — summarize, gather what matters
  | "voice" // fanned signal arcs — translate, speak, express

/** All shell ids, ordered for galleries. */
export const LENS_SHELL_IDS: readonly LensShellId[] = [
  "aperture",
  "scanner",
  "ring-pulse",
  "orbit",
  "prism",
  "reticle",
  "wave",
  "shield",
  "growth",
  "link",
  "spiral",
  "bloom",
  "condense",
  "eye",
  "beacon",
  "converge",
  "voice",
] as const

// ─────────────────────────────────────────────────────────────────────
// Hand poses — the gesture layer (icons drawable with your hands)
// ─────────────────────────────────────────────────────────────────────

/** A hand gesture a lens can render as in "hands" icon mode. */
export type HandPoseId =
  | "open-palm" // splayed open hand — offer, reveal, perspective
  | "fist" // closed fist — strength, protect, hold
  | "point" // index finger out — find, target, detect
  | "peace" // two fingers up — celebrate, win
  | "pinch" // finger + thumb closing — distill, precision, focus
  | "wave" // rocking open hand — signal, greet, flow
  | "clasp" // two hands pressed together — connect, gratitude, center
  | "heart" // two hands shaping a heart — care, encourage, flourish
  | "frame" // thumbs + fingers framing a view — visualize, perceive
  | "thumbs-up" // thumb raised — improve, approve, progress
  | "snap" // mid-snap fingers — recall, spark, momentum
  | "cup" // cupped hands — gather, receive, synthesize

/** All hand pose ids, ordered for galleries. */
export const HAND_POSE_IDS: readonly HandPoseId[] = [
  "open-palm",
  "fist",
  "point",
  "peace",
  "pinch",
  "wave",
  "clasp",
  "heart",
  "frame",
  "thumbs-up",
  "snap",
  "cup",
] as const

/** How lens glyphs render: animated shells or hand gestures. */
export type LensIconMode = "lens" | "hands"

// ─────────────────────────────────────────────────────────────────────
// Themes — the five 4eye brand pillars (+ neutral)
// ─────────────────────────────────────────────────────────────────────

/**
 * Brand pillar a lens belongs to. Drives the default palette.
 * - improve  — learning, progression, resilience
 * - innovate — engagement, gamification, novelty
 * - win      — currency, score, rankings
 * - heal     — positivity, optimism, recovery
 * - protect  — security, safety, stability
 */
export type LensTheme = "improve" | "innovate" | "win" | "heal" | "protect" | "neutral"

export const LENS_THEMES: readonly LensTheme[] = [
  "improve",
  "innovate",
  "win",
  "heal",
  "protect",
  "neutral",
] as const

// ─────────────────────────────────────────────────────────────────────
// Motion — animation personality
// ─────────────────────────────────────────────────────────────────────

/** How energetically a lens animates. Maps to a base duration. */
export type LensMotion = "calm" | "steady" | "lively" | "intense"

export const LENS_MOTIONS: readonly LensMotion[] = ["calm", "steady", "lively", "intense"] as const

// ─────────────────────────────────────────────────────────────────────
// Palette
// ─────────────────────────────────────────────────────────────────────

/** Four-stop palette every shell renders against. */
export interface LensPalette {
  /** Primary stroke / fill. */
  base: string
  /** Secondary accent. */
  accent: string
  /** Glow / halo color. */
  glow: string
  /** Soft background tint. */
  soft: string
}

// ─────────────────────────────────────────────────────────────────────
// Shell render props
// ─────────────────────────────────────────────────────────────────────

export interface LensShellProps {
  /** Square pixel size of the rendered SVG. Default 64. */
  size?: number
  /** Palette override. Defaults to the lens theme palette. */
  palette?: LensPalette
  /** Motion personality. Default "steady". */
  motion?: LensMotion
  /** Whether the lens animates. Default true (respects reduced-motion). */
  animated?: boolean
  /** Optional class on the root svg. */
  className?: string
  /** Accessible title. */
  title?: string
}

// ─────────────────────────────────────────────────────────────────────
// Lens definition (registry entry)
// ─────────────────────────────────────────────────────────────────────

export interface LensDef {
  /** Stable kebab-case id. */
  id: string
  /** The symbol-language word / meaning (e.g. "Analyze", "Reframe"). */
  word: string
  /** Which animated shell renders it. */
  shell: LensShellId
  /** Brand pillar — drives the default palette. */
  theme: LensTheme
  /** Motion personality. */
  motion: LensMotion
  /** Free-form tags for filtering/sorting (transformation, domain, mood…). */
  tags: string[]
  /** One-line educational/marketing gloss. */
  description?: string
  /** Hand-mode override; defaults to the shell's pose when omitted. */
  handPose?: HandPoseId
}
