/**
 * usePerceivedValue — React hook wrapping the pure perceived-value engine.
 *
 * Memoizes the end user's perceived value for a set of felt-quality signals
 * and a chosen variant. The synchronous, offline path — for backend-sourced
 * results use {@link usePerceivedValueResult} with a {@link ScoringProvider}.
 */
import { useMemo } from "react";
import type {
  PerceivedValueInput,
  PerceivedValueResult,
  ScoringVariantId,
} from "../model";
import { computePerceivedValue } from "../engine";
import { getScoringVariant } from "../variants";

export function usePerceivedValue(
  input: PerceivedValueInput,
  variantId?: ScoringVariantId,
): PerceivedValueResult {
  return useMemo(() => {
    const variant = getScoringVariant(variantId);
    return computePerceivedValue(input, variant);
  }, [
    variantId,
    input.expectation,
    input.signals.effort,
    input.signals.enjoyment,
    input.signals.relevance,
    input.signals.progress,
    input.signals.recognition,
    input.signals.trust,
  ]);
}
