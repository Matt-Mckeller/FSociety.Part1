/**
 * Perceived-value contracts — the *end user's* subjective read on how
 * worthwhile an experience felt, which can diverge from the objective
 * Learn / Earn / Compete score.
 *
 * Two ideas drive it:
 *
 *  1. **Subjective signals.** A small set of felt qualities (effort,
 *     enjoyment, relevance, progress, recognition, trust) that shape how much
 *     a person values what they got. Each is a 0–100 intensity.
 *
 *  2. **Expectation framing.** Value is reference-dependent — the same
 *     delivered experience feels better when it beats what the user expected
 *     and worse when it falls short. An optional `expectation` anchor turns
 *     the gap into a delight / disappointment multiplier.
 *
 * Pure data, no React and no math — see `engine/perceived.ts` for the compute.
 */
import type { NormalizerConfig } from "./normalizer";
import type { ScoringVariantId } from "./variant";
import type { ComponentScore, SignalContribution } from "./result";

/**
 * The felt qualities that move a user's sense of value. Brand-aligned:
 * - `effort`      — energy & time they feel they invested (Improve)
 * - `enjoyment`   — fun & emotional satisfaction in the moment (Innovate)
 * - `relevance`   — how well it fit their goals & was personalised (Improve)
 * - `progress`    — felt momentum & growth (Improve)
 * - `recognition` — being seen, celebrated, and rewarded (Win)
 * - `trust`       — confidence it was safe & worthwhile (Protect)
 */
export type PerceivedSignalKey =
  | "effort"
  | "enjoyment"
  | "relevance"
  | "progress"
  | "recognition"
  | "trust";

export const PERCEIVED_SIGNAL_KEYS: readonly PerceivedSignalKey[] = [
  "effort",
  "enjoyment",
  "relevance",
  "progress",
  "recognition",
  "trust",
] as const;

export type PerceivedSignals = Record<PerceivedSignalKey, number>;

/** Raw input to a perceived-value calculation. */
export interface PerceivedValueInput {
  /** The felt-quality signals, each a 0–100 intensity. */
  signals: PerceivedSignals;
  /**
   * What the user expected to get out of it (0–100). Anchors the delight gap
   * — omit to treat the experience as exactly as-expected (neutral framing).
   */
  expectation?: number;
}

/** Relative weights for blending the perceived-value signals. */
export interface PerceivedWeights {
  /** Per-signal emphasis. Need not sum to 1 — the engine normalizes it. */
  signals: Record<PerceivedSignalKey, number>;
  /**
   * How strongly the expectation gap bends the headline, in [0,1]. `0` ignores
   * expectations entirely; `1` applies the full ±20% delight swing.
   */
  expectationSensitivity: number;
}

/** Per-signal normalizer configuration for perceived value. */
export type PerceivedNormalizers = Record<PerceivedSignalKey, NormalizerConfig>;

/** Complete result of a perceived-value calculation. */
export interface PerceivedValueResult {
  variantId: ScoringVariantId;
  /** Headline perceived value (0–100), after expectation framing. */
  perceived: number;
  /** Weighted blend of the felt-quality signals, before framing (0–100). */
  base: ComponentScore;
  /** The expectation anchor the user brought in (0–100). */
  expectation: number;
  /** `base − expectation`: positive = delight, negative = letdown (−100..100). */
  expectationGap: number;
  /** Multiplier the gap applied to the base score (≈0.8..1.2). */
  delightFactor: number;
  /** Per-signal breakdown (alias of `base.contributions`) for tooltips. */
  perceivedContributions: SignalContribution[];
}
