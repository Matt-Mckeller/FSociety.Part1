/**
 * Normalizer contracts — strategies for mapping a raw signal value into [0,1].
 */

/**
 * Strategy used to map a raw signal value into the normalized [0,1] range.
 *
 * - `linear`  — `clamp(value / max, 0, 1)`. Use for values already on a
 *               bounded scale (e.g. a 0–100 percentile).
 * - `log`     — diminishing returns: `ln(1 + value) / ln(1 + max)`. Use for
 *               grind-able quantities (currency, streak) so accumulation
 *               can't dominate the score.
 * - `sigmoid` — S-curve around `midpoint` with steepness `k`. Use when a
 *               signal has a meaningful "good enough" threshold.
 */
export type NormalizerKind = "linear" | "log" | "sigmoid";

export interface NormalizerConfig {
  kind: NormalizerKind;
  /** Upper reference value mapped toward 1. Required for `linear` and `log`. */
  max?: number;
  /** Steepness for `sigmoid`. Defaults to 0.1. */
  k?: number;
  /** Center for `sigmoid` (where output = 0.5). Defaults to `max / 2`. */
  midpoint?: number;
}
