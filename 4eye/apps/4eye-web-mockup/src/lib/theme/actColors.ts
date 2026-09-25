/**
 * Per-act color tokens for the home-page presentation.
 *
 * Slides are grouped into 4 narrative acts that fold the deck into a
 * PAS-Resolution funnel:
 *   1 — Promise  (Hook + Promise slides — the opening pull)
 *   2 — Reach    (Where + When + Offerings — proof you can use it anywhere)
 *   3 — Play     (the vision slide — what 4eye unlocks long-term)
 *   4 — Reward   (Quests / completion / claim flow)
 *
 * The same palette appears in:
 *   - SectionProgress timeline (active step + progress bar color)
 *   - Modality plus grid (one color per learning modality, mapped to acts)
 *   - Anywhere else that needs to signal "which act are we in".
 *
 * Tailwind-style 500-weight hexes chosen for high contrast against white.
 *
 * Note on numbering vs deck order: groupId numbering does NOT have to
 * match deck traversal order. The deck plays Hook (1) → Promise (1) →
 * Play (3) → Reach (2) → Reward (4). Act numbers are stable identifiers
 * the timeline maps from `TimelineStep.groupId`, so reordering the deck
 * does not require re-shuffling these tokens.
 */
export const ACT_COLORS = {
  /** Act 1 — Promise (Hook + Promise). Blue. */
  act1: "#3b82f6",
  /** Act 2 — Reach (Where + When + Offerings). Green. */
  act2: "#22c55e",
  /** Act 3 — Play (vision). Purple. */
  act3: "#a855f7",
  /** Act 4 — Reward / Quests. Orange. */
  act4: "#f97316",
} as const;

export type ActKey = keyof typeof ACT_COLORS;
export type ActNumber = 1 | 2 | 3 | 4;

export const ACT_LABELS: Record<ActNumber, string> = {
  1: "Promise",
  2: "Reach",
  3: "Play",
  4: "Reward",
};

export function actColor(act: ActNumber): string {
  return ACT_COLORS[`act${act}` as ActKey];
}
