/**
 * usePerceivedValueResult — async hook over the injected {@link ScoringService}.
 *
 * Use this when perceived value may come from the backend. With the default
 * {@link ScoringProvider} it resolves synchronously from the local engine, so
 * it also works fully offline. Returns a small request-state envelope.
 */
import { useEffect, useState } from "react";
import type {
  PerceivedValueInput,
  PerceivedValueResult,
  ScoringVariantId,
} from "../model";
import { useScoringService } from "./ScoringProvider";

export interface PerceivedValueResultState {
  result: PerceivedValueResult | null;
  loading: boolean;
  error: Error | null;
}

export function usePerceivedValueResult(
  input: PerceivedValueInput,
  variantId?: ScoringVariantId,
): PerceivedValueResultState {
  const service = useScoringService();
  const [state, setState] = useState<PerceivedValueResultState>({
    result: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));

    service
      .perceivedValue({ input, variantId })
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
    input.expectation,
    input.signals.effort,
    input.signals.enjoyment,
    input.signals.relevance,
    input.signals.progress,
    input.signals.recognition,
    input.signals.trust,
  ]);

  return state;
}
