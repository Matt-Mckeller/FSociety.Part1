/**
 * @expanse/lens — animated symbol-language for the 4eye learning system.
 *
 * - Core vocabulary: themes, motions, palettes, transformation tags.
 * - 12 reusable animated SVG "shells" + a shell registry.
 * - <Lens> dispatcher and <LensChip> (symbol + word) components.
 * - A registry of 100+ named lenses (LENSES, queryLenses, getLens).
 *
 * The 1000+ simple actions live in the pure-data `@expanse/lens/actions`
 * subpath (no React) — import from there for filtering/sorting datasets.
 */

export * from "./core"
export * from "./shells"
export * from "./hands"
export * from "./registry"
export * from "./components"
