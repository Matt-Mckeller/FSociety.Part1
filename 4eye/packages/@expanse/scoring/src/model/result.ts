/**
 * Result contracts — the shape the engine returns after scoring an input.
 */
import type { ScoringVariantId } from "./variant";

/** Per-signal contribution detail, useful for tooltips and debugging. */
export interface SignalContribution {
  key: string;
  /** Raw input value. */
  raw: number;
  /** Value after normalization, in [0,1]. */
  normalized: number;
  /** Effective (sum-normalized) weight applied. */
  weight: number;
  /** Points this signal contributed to its parent score (0–100 scale). */
  points: number;
}

export interface ComponentScore {
  /** Final component score on a 0–100 scale. */
  score: number;
  contributions: SignalContribution[];
}

/** Complete result of running the engine for one variant. */
export interface LearnScoreResult {
  variantId: ScoringVariantId;
  /** Headline growth score (0–100). */
  learn: number;
  /** Earn / Reward component (0–100). */
  earn: ComponentScore;
  /** Compete component (0–100). */
  compete: ComponentScore;
  /** Direct-mastery component (0–100). */
  mastery: ComponentScore;
  /** How learn was blended from earn / compete / mastery. */
  learnContributions: SignalContribution[];
}
