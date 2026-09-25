/**
 * Scoring engine — pure functions that turn raw signals + a variant into
 * Learn / Earn / Compete scores. No React, no side effects.
 *
 * Pipeline (per component):
 *   raw signal → normalize([0,1]) → × effective weight → ×100 → sum
 *
 * Weights are sum-normalized defensively, so variant configs that don't add
 * up to exactly 1 still produce a clean 0–100 score.
 */
import type {
  ComponentScore,
  CompeteSignalKey,
  LearnScoreResult,
  NormalizerConfig,
  RewardSignalKey,
  ScoringInput,
  ScoringVariant,
  SignalContribution,
} from "../model";
import { COMPETE_SIGNAL_KEYS, REWARD_SIGNAL_KEYS } from "../model";
import { normalize } from "./normalizers";

/** Sum the numeric values of a weight record. */
function weightSum(weights: Record<string, number>, keys: readonly string[]): number {
  return keys.reduce((acc, k) => acc + Math.max(0, weights[k] ?? 0), 0);
}

const round1 = (n: number): number => Math.round(n * 10) / 10;

/**
 * Generic weighted-signal combiner. Returns a 0–100 score plus per-signal
 * contribution breakdown.
 */
function combine<K extends string>(
  keys: readonly K[],
  raw: Record<K, number>,
  weights: Record<K, number>,
  normalizers: Record<K, NormalizerConfig>,
): ComponentScore {
  const totalWeight = weightSum(weights, keys);
  const contributions: SignalContribution[] = keys.map((key) => {
    const rawValue = raw[key] ?? 0;
    const normalized = normalize(rawValue, normalizers[key]);
    const effectiveWeight = totalWeight > 0 ? Math.max(0, weights[key] ?? 0) / totalWeight : 0;
    const points = normalized * effectiveWeight * 100;
    return {
      key,
      raw: rawValue,
      normalized: round1(normalized * 100) / 100,
      weight: round1(effectiveWeight * 100) / 100,
      points: round1(points),
    };
  });

  const score = round1(contributions.reduce((acc, c) => acc + c.points, 0));
  return { score, contributions };
}

/** Compute the Earn (Reward) component from its six signals. */
export function computeReward(input: ScoringInput, variant: ScoringVariant): ComponentScore {
  return combine<RewardSignalKey>(
    REWARD_SIGNAL_KEYS,
    input.reward,
    variant.weights.reward,
    variant.normalizers.reward,
  );
}

/** Compute the Compete component from its signals. */
export function computeCompete(input: ScoringInput, variant: ScoringVariant): ComponentScore {
  return combine<CompeteSignalKey>(
    COMPETE_SIGNAL_KEYS,
    input.compete,
    variant.weights.compete,
    variant.normalizers.compete,
  );
}

/** Compute the direct-mastery component (single signal). */
export function computeMastery(input: ScoringInput, variant: ScoringVariant): ComponentScore {
  const raw = input.mastery ?? 0;
  const normalized = normalize(raw, variant.normalizers.mastery);
  const score = round1(normalized * 100);
  return {
    score,
    contributions: [
      {
        key: "mastery",
        raw,
        normalized: round1(normalized * 100) / 100,
        weight: 1,
        points: score,
      },
    ],
  };
}

/**
 * Run the full engine: compute Earn, Compete, Mastery, then blend them into
 * the headline Learn score using the variant's learn weights.
 */
export function computeScores(input: ScoringInput, variant: ScoringVariant): LearnScoreResult {
  const earn = computeReward(input, variant);
  const compete = computeCompete(input, variant);
  const mastery = computeMastery(input, variant);

  const lw = variant.weights.learn;
  const totalLearnWeight =
    Math.max(0, lw.reward) + Math.max(0, lw.compete) + Math.max(0, lw.mastery);

  const parts: Array<{ key: string; score: number; weight: number }> = [
    { key: "earn", score: earn.score, weight: Math.max(0, lw.reward) },
    { key: "compete", score: compete.score, weight: Math.max(0, lw.compete) },
    { key: "mastery", score: mastery.score, weight: Math.max(0, lw.mastery) },
  ];

  const learnContributions: SignalContribution[] = parts.map((p) => {
    const effectiveWeight = totalLearnWeight > 0 ? p.weight / totalLearnWeight : 0;
    const points = p.score * effectiveWeight;
    return {
      key: p.key,
      raw: p.score,
      normalized: round1(p.score) / 100,
      weight: round1(effectiveWeight * 100) / 100,
      points: round1(points),
    };
  });

  const learn = round1(learnContributions.reduce((acc, c) => acc + c.points, 0));

  return {
    variantId: variant.id,
    learn,
    earn,
    compete,
    mastery,
    learnContributions,
  };
}
