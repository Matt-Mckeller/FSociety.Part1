/**
 * Service contracts — the seam between "compute the score here" and "ask the
 * backend for it".
 *
 * Everything is `async` so a local (in-process engine) implementation and a
 * remote (API-backed) implementation share one interface. UIs depend on the
 * {@link ScoringService} port and never care which is wired in.
 */
import type {
  LearnScoreResult,
  PerceivedValueInput,
  PerceivedValueResult,
  ScoringInput,
  ScoringVariant,
  ScoringVariantId,
} from "../model";

/** A request to score one input under a chosen variant. */
export interface ScoreRequest {
  input: ScoringInput;
  /** Variant to score with. Omit to use the registry default. */
  variantId?: ScoringVariantId;
}

/** A request to calculate the end user's perceived value under a variant. */
export interface PerceivedValueRequest {
  input: PerceivedValueInput;
  /** Variant to frame perceived value with. Omit to use the registry default. */
  variantId?: ScoringVariantId;
}

/**
 * Lightweight variant descriptor for selection UIs — omits the normalizer /
 * weight internals so it is cheap to ship over the wire.
 */
export interface ScoringVariantSummary {
  id: ScoringVariantId;
  label: string;
  description: string;
  theme?: ScoringVariant["theme"];
}

/**
 * Port for retrieving scores. Implemented locally by the pure engine today
 * ({@link LocalScoringService}) and by a remote adapter once the backend
 * scoring service exists ({@link createRemoteScoringService}).
 */
export interface ScoringService {
  /** Score a single input + variant. */
  score(request: ScoreRequest): Promise<LearnScoreResult>;
  /** Calculate the end user's perceived value for an input + variant. */
  perceivedValue(request: PerceivedValueRequest): Promise<PerceivedValueResult>;
  /** List the variants this service knows about. */
  listVariants(): Promise<ScoringVariantSummary[]>;
}

/** Project a full variant down to its wire-friendly summary. */
export function toVariantSummary(variant: ScoringVariant): ScoringVariantSummary {
  return {
    id: variant.id,
    label: variant.label,
    description: variant.description,
    theme: variant.theme,
  };
}
