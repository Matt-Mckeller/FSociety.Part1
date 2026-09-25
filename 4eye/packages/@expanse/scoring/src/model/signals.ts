/**
 * Signal definitions — the raw, un-normalized inputs to the scoring engine.
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
