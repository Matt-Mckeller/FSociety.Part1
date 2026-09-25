/**
 * Local, engine-backed scoring service.
 *
 * Computes scores in-process via the pure engine — **no backend required**.
 * This is the default the React provider uses, so every UI works offline out
 * of the box. When the backend lands, swap in a remote service without
 * touching any call site.
 */
import { computeScores, computePerceivedValue } from "../engine";
import {
  SCORING_VARIANT_LIST,
  getScoringVariant,
} from "../variants";
import type {
  PerceivedValueRequest,
  ScoreRequest,
  ScoringService,
  ScoringVariantSummary,
} from "./types";
import { toVariantSummary } from "./types";
import type { LearnScoreResult, PerceivedValueResult } from "../model";

export class LocalScoringService implements ScoringService {
  async score({ input, variantId }: ScoreRequest): Promise<LearnScoreResult> {
    return computeScores(input, getScoringVariant(variantId));
  }

  async perceivedValue({
    input,
    variantId,
  }: PerceivedValueRequest): Promise<PerceivedValueResult> {
    return computePerceivedValue(input, getScoringVariant(variantId));
  }

  async listVariants(): Promise<ScoringVariantSummary[]> {
    return SCORING_VARIANT_LIST.map(toVariantSummary);
  }
}

/** Shared singleton — the engine is stateless, so one instance is enough. */
export const localScoringService: ScoringService = new LocalScoringService();
