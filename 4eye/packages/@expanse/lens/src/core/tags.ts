/**
 * Tag taxonomy — the controlled vocabulary used to filter & sort both
 * lenses and actions. Aligned with the 4eye brand pillars and the
 * learning-transformation categories from the app's learning-modes plan.
 */

import type { LensTheme } from "./types"

// ─────────────────────────────────────────────────────────────────────
// Transformation categories (the "verbs" of learning)
// ─────────────────────────────────────────────────────────────────────

/**
 * A learning/attention transformation family. Every action and most
 * lenses carry exactly one primary category plus free-form tags.
 */
export type TransformCategory =
  | "perceive" // notice, scan, detect, observe
  | "analyze" // break down, compare, classify
  | "recall" // retrieve, remember, quiz
  | "reframe" // reinterpret, perspective-shift
  | "summarize" // condense, distill, key-points
  | "synthesize" // combine, connect, generate
  | "practice" // drill, rehearse, apply
  | "organize" // structure, sort, map
  | "focus" // attend, concentrate, prioritize
  | "regulate" // calm, breathe, balance (heal)
  | "protect" // guard, filter, boundary
  | "grow" // improve, level, compound
  | "connect" // relate, bond, empathize
  | "celebrate" // reward, win, encourage
  | "movement" // move, advance, navigate, transition
  | "mood" // lift, ground, shift-state, feel
  | "status" // check, log, report, update

export const TRANSFORM_CATEGORIES: readonly TransformCategory[] = [
  "perceive",
  "analyze",
  "recall",
  "reframe",
  "summarize",
  "synthesize",
  "practice",
  "organize",
  "focus",
  "regulate",
  "protect",
  "grow",
  "connect",
  "celebrate",
  "movement",
  "mood",
  "status",
] as const

/** Human-readable labels for each category. */
export const TRANSFORM_LABELS: Record<TransformCategory, string> = {
  perceive: "Perceive",
  analyze: "Analyze",
  recall: "Recall",
  reframe: "Reframe",
  summarize: "Summarize",
  synthesize: "Synthesize",
  practice: "Practice",
  organize: "Organize",
  focus: "Focus",
  regulate: "Regulate",
  protect: "Protect",
  grow: "Grow",
  connect: "Connect",
  celebrate: "Celebrate",
  movement: "Movement",
  mood: "Mood",
  status: "Status",
}

/** Default brand pillar a category rolls up into. */
export const CATEGORY_THEME: Record<TransformCategory, LensTheme> = {
  perceive: "innovate",
  analyze: "improve",
  recall: "improve",
  reframe: "improve",
  summarize: "improve",
  synthesize: "improve",
  practice: "improve",
  organize: "improve",
  focus: "innovate",
  regulate: "heal",
  protect: "protect",
  grow: "improve",
  connect: "heal",
  celebrate: "win",
  movement: "win",
  mood: "heal",
  status: "improve",
}

/** Default shell a category renders with (used by the action expander). */
export const CATEGORY_SHELL = {
  perceive: "aperture",
  analyze: "scanner",
  recall: "spiral",
  reframe: "prism",
  summarize: "ring-pulse",
  synthesize: "orbit",
  practice: "reticle",
  organize: "link",
  focus: "reticle",
  regulate: "wave",
  protect: "shield",
  grow: "growth",
  connect: "link",
  celebrate: "bloom",
  movement: "orbit",
  mood: "wave",
  status: "ring-pulse",
} as const

// ─────────────────────────────────────────────────────────────────────
// Domain tags (what the transformation operates on)
// ─────────────────────────────────────────────────────────────────────

export const DOMAIN_TAGS = [
  "learning",
  "communication",
  "relationships",
  "mood",
  "culture",
  "habits",
  "attention",
  "memory",
  "language",
  "wellbeing",
  "movement",
  "status",
] as const

export type DomainTag = (typeof DOMAIN_TAGS)[number]

/** Every theme value as a tag string (mirrors LensTheme). */
export const THEME_TAGS: readonly LensTheme[] = [
  "improve",
  "innovate",
  "win",
  "heal",
  "protect",
] as const
