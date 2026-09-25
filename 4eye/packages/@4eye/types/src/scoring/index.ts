/**
 * Scoring types — contracts for the Learn / Earn / Compete score system.
 *
 * The scoring model is a two-level tree:
 *
 *   Learn  (headline / growth)
 *   ├── Earn     (a.k.a. "Reward" — total value gained by the user)
 *   │   ├── knowledge      value gained by knowledge
 *   │   ├── entertainment  value gained by entertainment
 *   │   ├── novelty        newness / uniqueness
 *   │   ├── bonding        character bonding
 *   │   ├── relationship   relationship building
 *   │   └── currency       coins / XP (value offered to the user)
 *   └── Compete  (standing vs. other explorers)
 *       ├── rankPercentile
 *       ├── winRate
 *       └── streak
 *
 * Every raw signal is normalized to [0,1] by a pluggable {@link NormalizerConfig},
 * then combined with weights that live entirely inside a {@link ScoringVariant}.
 * Nothing in the math is hardcoded — swap the variant to re-weight the same
 * signals (see the variant registry in `@4eye/core`).
 *
 * This module is dependency-free (no React, no MUI, no Apollo) so it can be
 * consumed by web, mobile, api, and Storybook alike.
 */

// ─── Signal keys ──────────────────────────────────────────────────────

/** The six components that make up the Earn (Reward) score. */
export type RewardSignalKey =
  | "knowledge"
  | "entertainment"
  | "novelty"
  | "bonding"
  | "relationship"
  | "currency";

/** The components that make up the Compete score. */
export type CompeteSignalKey = "rankPercentile" | "winRate" | "streak";

export const REWARD_SIGNAL_KEYS: readonly RewardSignalKey[] = [
  "knowledge",
  "entertainment",
  "novelty",
  "bonding",
  "relationship",
  "currency",
] as const;

export const COMPETE_SIGNAL_KEYS: readonly CompeteSignalKey[] = [
  "rankPercentile",
  "winRate",
  "streak",
] as const;

// ─── Raw signal inputs ────────────────────────────────────────────────

/** Raw (un-normalized) values for the six reward signals. */
export type RewardSignals = Record<RewardSignalKey, number>;

/** Raw (un-normalized) values for the compete signals. */
export type CompeteSignals = Record<CompeteSignalKey, number>;

/**
 * Full set of raw inputs fed into the scoring engine.
 * `mastery` is optional direct mastery (e.g. completed lessons / skills) that
 * can contribute to the headline Learn score independently of Earn & Compete.
 */
export interface ScoringInput {
  reward: RewardSignals;
  compete: CompeteSignals;
  /** Optional direct-mastery signal (raw). Omit to treat as 0. */
  mastery?: number;
}

// ─── Normalizers ──────────────────────────────────────────────────────

/**
 * Strategy used to map a raw signal value into the normalized [0,1] range.
 *
 * - `linear`  — `clamp(value / max, 0, 1)`. Use for values already on a
 *               bounded scale (e.g. a 0–100 percentile).
 * - `log`     — diminishing returns: `ln(1 + value) / ln(1 + max)`. Use for
 *               grind-able quantities (currency, streak) so accumulation
 *               can't dominate the score.
 * - `sigmoid` — S-curve around `midpoint` with steepness `k`. Use when a
 *               signal has a meaningful "good enough" threshold.
 */
export type NormalizerKind = "linear" | "log" | "sigmoid";

export interface NormalizerConfig {
  kind: NormalizerKind;
  /** Upper reference value mapped toward 1. Required for `linear` and `log`. */
  max?: number;
  /** Steepness for `sigmoid`. Defaults to 0.1. */
  k?: number;
  /** Center for `sigmoid` (where output = 0.5). Defaults to `max / 2`. */
  midpoint?: number;
}

// ─── Weights ──────────────────────────────────────────────────────────

/**
 * Relative weights for combining normalized signals. Weights do not need to
 * sum to 1 — the engine normalizes them defensively — but writing them so they
 * sum to 1 keeps configs readable.
 */
export interface ScoringWeights {
  reward: Record<RewardSignalKey, number>;
  compete: Record<CompeteSignalKey, number>;
  /** How the headline Learn score blends its three inputs. */
  learn: {
    reward: number;
    compete: number;
    mastery: number;
  };
}

export interface ScoringNormalizers {
  reward: Record<RewardSignalKey, NormalizerConfig>;
  compete: Record<CompeteSignalKey, NormalizerConfig>;
  mastery: NormalizerConfig;
}

// ─── Variants ─────────────────────────────────────────────────────────

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
  theme?: "improve" | "innovate" | "win" | "heal" | "balanced";
  weights: ScoringWeights;
  normalizers: ScoringNormalizers;
}

export type ScoringVariantId =
  | "balanced"
  | "growth"
  | "connection"
  | "achiever"
  | "explorer";

// ─── Results ──────────────────────────────────────────────────────────

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

// ─── UI metadata ──────────────────────────────────────────────────────

export interface ScoreSignalMeta {
  label: string;
  description: string;
}

/** Concise, brand-aligned copy for each reward signal (used in tooltips). */
export const REWARD_SIGNAL_META: Record<RewardSignalKey, ScoreSignalMeta> = {
  knowledge: { label: "Knowledge", description: "Value gained by learning" },
  entertainment: { label: "Entertainment", description: "Value gained by enjoyment" },
  novelty: { label: "Novelty", description: "Newness & uniqueness discovered" },
  bonding: { label: "Bonding", description: "Connection with your character" },
  relationship: { label: "Relationships", description: "Bonds built with others" },
  currency: { label: "Coins & XP", description: "Rewards earned along the way" },
};

export const COMPETE_SIGNAL_META: Record<CompeteSignalKey, ScoreSignalMeta> = {
  rankPercentile: { label: "Ranking", description: "Standing among explorers" },
  winRate: { label: "Win rate", description: "Share of challenges won" },
  streak: { label: "Streak", description: "Consistency over time" },
};
