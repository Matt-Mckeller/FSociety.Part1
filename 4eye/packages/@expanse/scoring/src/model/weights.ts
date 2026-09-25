/**
 * Weight + normalizer-set contracts for combining normalized signals.
 */
import type { CompeteSignalKey, RewardSignalKey } from "./signals";
import type { NormalizerConfig } from "./normalizer";
import type { PerceivedNormalizers, PerceivedWeights } from "./perceived";

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
  /**
   * Optional perceived-value tuning. Omit to fall back to the engine's
   * built-in defaults ({@link DEFAULT_PERCEIVED_WEIGHTS}).
   */
  perceived?: PerceivedWeights;
}

/** Per-signal normalizer configuration for a variant. */
export interface ScoringNormalizers {
  reward: Record<RewardSignalKey, NormalizerConfig>;
  compete: Record<CompeteSignalKey, NormalizerConfig>;
  mastery: NormalizerConfig;
  /**
   * Optional perceived-value normalizers. Omit to fall back to the engine's
   * built-in defaults ({@link DEFAULT_PERCEIVED_NORMALIZERS}).
   */
  perceived?: PerceivedNormalizers;
}
