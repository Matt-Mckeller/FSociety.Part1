/**
 * Pure normalizer functions — map a raw signal value into [0,1].
 *
 * No dependencies. See {@link NormalizerConfig} for strategy semantics.
 */
import type { NormalizerConfig } from "../model";

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * Normalize a raw value to [0,1] using the given strategy.
 * Returns 0 for non-finite or negative inputs.
 */
export function normalize(value: number, config: NormalizerConfig): number {
  if (!Number.isFinite(value) || value <= 0) return 0;

  switch (config.kind) {
    case "linear": {
      const max = config.max ?? 1;
      if (max <= 0) return 0;
      return clamp01(value / max);
    }

    case "log": {
      // Diminishing returns: ln(1 + value) / ln(1 + max).
      const max = config.max ?? 1;
      if (max <= 0) return 0;
      return clamp01(Math.log1p(value) / Math.log1p(max));
    }

    case "sigmoid": {
      const k = config.k ?? 0.1;
      const midpoint = config.midpoint ?? (config.max ?? 0) / 2;
      return clamp01(1 / (1 + Math.exp(-k * (value - midpoint))));
    }

    default:
      return 0;
  }
}
