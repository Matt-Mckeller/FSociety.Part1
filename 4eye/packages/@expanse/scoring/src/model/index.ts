/**
 * `@expanse/scoring/model` — framework-agnostic scoring contracts.
 *
 * Zero dependencies (no React, MUI, or Apollo) so the same types power the web
 * app, mobile, Storybook, and the NestJS api. Importable as a subpath to get
 * just the types without the engine/runtime.
 */
export * from "./signals";
export * from "./normalizer";
export * from "./weights";
export * from "./variant";
export * from "./result";
export * from "./perceived";
export * from "./meta";
