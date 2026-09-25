/**
 * useScoreResult — async hook over the injected {@link ScoringService}.
 *
 * Use this when the score may come from the backend. With the default
 * {@link ScoringProvider} it resolves synchronously from the local engine, so
 * it also works fully offline. Returns a small request-state envelope.
 */
import { useEffect, useState } from "react";
import type {
  LearnScoreResult,
  ScoringInput,
  ScoringVariantId,
} from "../model";
import { useScoringService } from "./ScoringProvider";

export interface ScoreResultState {
  result: LearnScoreResult | null;
  loading: boolean;
  error: Error | null;
}

export function useScoreResult(
  input: ScoringInput,
  variantId?: ScoringVariantId,
): ScoreResultState {
  const service = useScoringService();
  const [state, setState] = useState<ScoreResultState>({
    result: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));

    service
      .score({ input, variantId })
      .then((result) => {
        if (active) setState({ result, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            result: null,
            loading: false,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      });

    return () => {
      active = false;
    };
  }, [
    service,
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

  return state;
}
