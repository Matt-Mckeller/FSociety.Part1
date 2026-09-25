/**
 * Variant contract — a named, swappable scoring configuration.
 */
import type { ScoringNormalizers, ScoringWeights } from "./weights";

/** Brand theme a variant leans into, used purely for UI accenting. */
export type ScoringVariantTheme =
  | "improve"
  | "innovate"
  | "win"
  | "heal"
  | "balanced";

export type ScoringVariantId =
  | "balanced"
  | "growth"
  | "connection"
  | "achiever"
  | "explorer";

/**
 * A named, swappable scoring configuration. Each variant re-weights the same
 * signals to emphasize a different style of growth, optionally aligned to a
 * brand theme (Improve / Innovate / Win / Heal). Variants are the unit of
 * modularity — add one to the registry without touching the engine.
 */
export interface ScoringVariant {
  id: ScoringVariantId;
  label: string;
  description: string;
  /** Brand theme this variant leans into, for UI accenting. */
  theme?: ScoringVariantTheme;
  weights: ScoringWeights;
  normalizers: ScoringNormalizers;
}
