/**
 * useScoring — React hook wrapping the pure scoring engine.
 *
 * Memoizes the computed Learn / Earn / Compete result for a set of raw
 * signals and a chosen variant. The UI renders the result; it never does math.
 */
import { useMemo } from "react";
import type {
  LearnScoreResult,
  ScoringInput,
  ScoringVariantId,
} from "@4eye/types";
import { computeScores } from "./engine";
import { getScoringVariant } from "./variants";

export function useScoring(
  input: ScoringInput,
  variantId?: ScoringVariantId,
): LearnScoreResult {
  return useMemo(() => {
    const variant = getScoringVariant(variantId);
    return computeScores(input, variant);
  }, [
    variantId,
    input.mastery,
    input.reward.knowledge,
    input.reward.entertainment,
    input.reward.novelty,
    input.reward.bonding,
    input.reward.relationship,
    input.reward.currency,
    input.compete.rankPercentile,
    input.compete.winRate,
    input.compete.streak,
  ]);
}
