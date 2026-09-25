/**
 * @4eye/core/scoring
 *
 * The Learn / Earn / Compete scoring system: pure engine, normalizers,
 * variant registry, and a React hook. Types live in `@4eye/types`.
 *
 * Import via the subpath (`@4eye/core/scoring`) to consume the engine without
 * pulling in the Apollo/GraphQL surface of the core root index.
 */
export * from "./normalizers";
export * from "./engine";
export * from "./variants";
export * from "./useScoring";
