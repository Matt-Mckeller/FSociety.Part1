/**
 * `@expanse/scoring/react` — React bindings.
 *
 * The only layer that imports React (a peer dependency). Everything else in the
 * package is framework-agnostic.
 *
 * - {@link useScoring}        — synchronous, memoized local compute.
 * - {@link ScoringProvider}   — supplies a ScoringService (local by default).
 * - {@link useScoreResult}    — async hook over the provided service (backend-ready).
 */
export * from "./useScoring";
export * from "./ScoringProvider";
export * from "./useScoreResult";
export * from "./usePerceivedValue";
export * from "./usePerceivedValueResult";
