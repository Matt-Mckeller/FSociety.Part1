/**
 * @expanse/scoring
 *
 * The Learn / Earn / Compete scoring system as reusable infrastructure.
 *
 * Layers (all importable as subpaths):
 * - `@expanse/scoring/model`    — framework-agnostic type contracts.
 * - `@expanse/scoring/engine`   — pure, isomorphic scoring math.
 * - `@expanse/scoring/variants` — the default brand-aligned variant registry.
 * - `@expanse/scoring/service`  — backend-ready service port + local/remote adapters.
 * - `@expanse/scoring/react`    — React hook, provider, and async result hook.
 * - `@expanse/scoring/samples`  — illustrative input fixtures (placeholders).
 *
 * The root barrel re-exports everything. Depend on nothing in `@4eye/*` — this
 * is infrastructure and stays one-way independent of the product layer.
 */
export * from "./model";
export * from "./engine";
export * from "./variants";
export * from "./service";
export * from "./react";
export * from "./samples";
