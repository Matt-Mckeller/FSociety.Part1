/**
 * Perceived-value engine — pure functions that turn the user's felt-quality
 * signals into a single "how worthwhile did this feel?" score. No React, no
 * side effects.
 *
 * Pipeline:
 *   raw signal → normalize([0,1]) → × effective weight → ×100 → sum  (base)
 *   base, framed by the expectation gap → headline perceived value
 *
 * Expectation framing makes the score *reference-dependent*: the same base
 * value reads higher when it beats what the user expected and lower when it
 * disappoints. The swing is capped to ±20% so framing nudges, never dominates.
 */
import type {
  ComponentScore,
  NormalizerConfig,
  PerceivedNormalizers,
  PerceivedSignalKey,
  PerceivedSignals,
  PerceivedValueInput,
  PerceivedValueResult,
  PerceivedWeights,
  ScoringVariant,
  SignalContribution,
} from "../model";
import { PERCEIVED_SIGNAL_KEYS } from "../model";
import { normalize } from "./normalizers";

const round1 = (n: number): number => Math.round(n * 10) / 10;
const round2 = (n: number): number => Math.round(n * 100) / 100;
const clamp = (n: number, lo: number, hi: number): number =>
  n < lo ? lo : n > hi ? hi : n;

/** Maximum proportion the expectation gap can bend the base score (±20%). */
const MAX_DELIGHT_SWING = 0.2;

/**
 * Default perceived-value weights — even emphasis across the felt qualities
 * with a moderate sensitivity to expectations. Variants may override these.
 */
export const DEFAULT_PERCEIVED_WEIGHTS: PerceivedWeights = {
  signals: {
    effort: 1,
    enjoyment: 1,
    relevance: 1,
    progress: 1,
    recognition: 1,
    trust: 1,
  },
  expectationSensitivity: 0.5,
};

/**
 * Default perceived-value normalizers. The felt-quality signals are reported
 * on a bounded 0–100 intensity scale, so all are `linear`.
 */
export const DEFAULT_PERCEIVED_NORMALIZERS: PerceivedNormalizers = {
  effort: { kind: "linear", max: 100 },
  enjoyment: { kind: "linear", max: 100 },
  relevance: { kind: "linear", max: 100 },
  progress: { kind: "linear", max: 100 },
  recognition: { kind: "linear", max: 100 },
  trust: { kind: "linear", max: 100 },
};

/** Sum the non-negative values of a weight record. */
function weightSum(
  weights: Record<PerceivedSignalKey, number>,
): number {
  return PERCEIVED_SIGNAL_KEYS.reduce(
    (acc, k) => acc + Math.max(0, weights[k] ?? 0),
    0,
  );
}

/** Weighted combine of the perceived signals into a 0–100 base score. */
function combinePerceived(
  signals: PerceivedSignals,
  weights: Record<PerceivedSignalKey, number>,
  normalizers: Record<PerceivedSignalKey, NormalizerConfig>,
): ComponentScore {
  const totalWeight = weightSum(weights);
  const contributions: SignalContribution[] = PERCEIVED_SIGNAL_KEYS.map((key) => {
    const rawValue = signals[key] ?? 0;
    const normalized = normalize(rawValue, normalizers[key]);
    const effectiveWeight =
      totalWeight > 0 ? Math.max(0, weights[key] ?? 0) / totalWeight : 0;
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

/**
 * Compute the end user's perceived value for an input under a variant. Falls
 * back to the built-in defaults when the variant does not tune perceived value.
 */
export function computePerceivedValue(
  input: PerceivedValueInput,
  variant: ScoringVariant,
): PerceivedValueResult {
  const weights = variant.weights.perceived ?? DEFAULT_PERCEIVED_WEIGHTS;
  const normalizers = variant.normalizers.perceived ?? DEFAULT_PERCEIVED_NORMALIZERS;

  const base = combinePerceived(input.signals, weights.signals, normalizers);

  // Default expectation to the base itself → zero gap → neutral framing.
  const expectation = clamp(input.expectation ?? base.score, 0, 100);
  const expectationGap = round1(base.score - expectation);

  const sensitivity = clamp(weights.expectationSensitivity ?? 0, 0, 1);
  const delightFactor = round2(
    1 + clamp((expectationGap / 100) * sensitivity, -MAX_DELIGHT_SWING, MAX_DELIGHT_SWING),
  );

  const perceived = round1(clamp(base.score * delightFactor, 0, 100));

  return {
    variantId: variant.id,
    perceived,
    base,
    expectation: round1(expectation),
    expectationGap,
    delightFactor,
    perceivedContributions: base.contributions,
  };
}
