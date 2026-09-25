/**
 * Reach primitives — presentational When/Where pills, cards, and data.
 *
 * Used by the Reach slide bands and the IntroFlow `SlideWhere` slide.
 * They live here (rather than at slide-folder depth) because they aren't
 * standalone slides — just chips/cards reused in two narrative surfaces.
 */

export { WhenPill, WHEN_PILL_H, type WhenPillProps } from "./WhenPill";
export { WHENS, type WhenPlace } from "./whens";

export { WherePill, PILL_H, strokesFromHex, type WherePillProps } from "./WherePill";
export { WhereCard, CARD_H, type WhereCardProps } from "./WhereCard";
export { PLACES, PLACE_COLOR, type PlaceItem } from "./places";
