/**
 * Generic, content-agnostic layout primitives.
 *
 * - `ScrollSnapColumn` — vertical scroll-snap container.
 * - `Hero`, `BulletList`, `Quote`, `CallToAction`, `FeatureCardGrid` —
 *   reusable content blocks. None of them know about each other or
 *   about tiles, slides, or decks.
 *
 * For full-viewport HUD-aware sections inside a tile, compose these
 * blocks under `<TileContainer>` from `@expanse/shell`.
 */

export { Section } from "./Section";
export type { SectionProps, SectionTone } from "./Section";

export { Hero } from "./Hero";
export type { HeroProps, HeroHandle } from "./Hero";

export { BulletList } from "./BulletList";
export type { BulletListProps, BulletListItem } from "./BulletList";

export { CallToAction } from "./CallToAction";
export type { CallToActionProps } from "./CallToAction";

export { Quote } from "./Quote";
export type { QuoteProps } from "./Quote";

export { FeatureCardGrid } from "./FeatureCardGrid";
export type { FeatureCardGridProps, FeatureCard } from "./FeatureCardGrid";
