/**
 * Surfacing — which slices of a profile deserve the user's attention *right now*.
 *
 * The profile entity is deliberately a superset: identity, healing, psychology,
 * student, teacher, classroom, professional, parent. Showing all of it at once is
 * the thing we explicitly don't want. Something has to decide what surfaces.
 *
 * Today that decision is hard-coded (see {@link surfaceProfile}). The point of this
 * module is that it is the *only* place that has to change when it stops being
 * hard-coded: the band renders whatever the selector returns, ordered by weight,
 * so swapping in a real ranker is a data change rather than a UI change.
 *
 * Two deliberate constraints on the seed data:
 *   - Every item carries a `reason`. It is shown in the card's tooltip, so the
 *     hard-coded data already has the shape a real ranker must emit, and the UI
 *     already has somewhere to put it.
 *   - Weights are spread, not clustered. Ties would make ordering look arbitrary
 *     the moment a second source starts contributing.
 */

/** The kinds of thing that can surface. Each maps to one card in the band. */
export type SurfacedKind =
  | "summary"
  | "daily-focus"
  | "current-goal"
  | "next-action"
  | "highest-value"
  | "attributes"
  | "learning-styles";

export interface SurfacedItem {
  id: string;
  kind: SurfacedKind;
  /** 0–100. Drives ordering, and above `EMPHASIS_THRESHOLD` also drives emphasis. */
  weight: number;
  /** Why this surfaced. Shown to the user; becomes ranker output later. */
  reason: string;
}

/** Above this weight a card is rendered with accent emphasis. */
export const EMPHASIS_THRESHOLD = 80;

/**
 * Column span per kind on a 12-column grid, so the band composes deliberately
 * instead of every card defaulting to half-width. Chosen by content shape:
 * `summary` owns a full row so its status bar (level, emotion, auras) can
 * read as one scan; daily-focus / goal / next-action share the row beneath;
 * the remaining cards take a third each. Everything collapses to full width
 * below tablet.
 */
export const SPAN: Record<SurfacedKind, number> = {
  summary: 12,
  "daily-focus": 4,
  "current-goal": 4,
  "next-action": 4,
  "highest-value": 4,
  attributes: 4,
  "learning-styles": 4,
};

export interface SurfacingContext {
  /** Which lens the user is currently looking through, if any. */
  lens?: string;
  /** Profile level — a later ranker will gate some kinds behind progression. */
  level?: number;
}

/**
 * Returns what should surface, highest weight first.
 *
 * Hard-coded for now — the signature is the contract, not the body. A real
 * implementation would read recent events, goal deadlines, habit streaks and
 * mood deltas and emit the same shape.
 */
export function surfaceProfile(_ctx: SurfacingContext = {}): SurfacedItem[] {
  const items: SurfacedItem[] = [
    {
      id: "srf-summary",
      kind: "summary",
      weight: 90,
      reason: "Always surfaced — the at-a-glance state of the character.",
    },
    {
      id: "srf-daily-focus",
      kind: "daily-focus",
      weight: 85,
      reason: "Two habits are still open today and one consumable expires within the hour.",
    },
    {
      id: "srf-current-goal",
      kind: "current-goal",
      weight: 70,
      reason: "Closest goal to completion — small remaining effort, high momentum value.",
    },
    {
      id: "srf-next-action",
      kind: "next-action",
      weight: 55,
      reason: "Optimally prepare, then record perfectly — shorts and vision content for EDU, 4eye, and the Recording App.",
    },
    {
      id: "srf-attributes",
      kind: "attributes",
      weight: 62,
      reason: "Emotional intelligence and perception lead the ranked set this week.",
    },
    {
      id: "srf-highest-value",
      kind: "highest-value",
      weight: 40,
      reason: "Value alignment shifted this week — Heal rose relative to Win.",
    },
    {
      id: "srf-learning",
      kind: "learning-styles",
      // Lowest weight — Learning sits at the bottom of the Surfaced dashboard.
      weight: 30,
      reason: "Visual · associative · storytelling still define how this character learns.",
    },
  ];
  return items.sort((a, b) => b.weight - a.weight);
}
