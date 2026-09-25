/**
 * Brain lens colour language — one vocabulary for Mood, Perspectives,
 * Relationships, Timeline, and Memory.
 *
 * Page chrome is a single rose-red accent. Valence stays good / hard / mixed
 * (green / red / slate) so meaning is readable. Rank deepens that same red
 * family instead of inventing amber / orange / violet systems. Domain and
 * relationship-type hues may tint glyphs and graph nodes lightly, but they
 * stay inside the red–rose–brick family so the lens never reads as a rainbow.
 */

export const BRAIN_ACCENT = "#e11d48";

export const VALENCE = {
  positive: { label: "Went well", short: "Good", color: "#16a34a" },
  negative: { label: "Went badly", short: "Hard", color: "#dc2626" },
  neutral: { label: "Mixed", short: "Mixed", color: "#64748b" },
} as const;

export type ValenceKey = keyof typeof VALENCE;

/** Want / priority link chips — accent + valence, never one-off pinks/browns. */
export const LINK_KIND_COLOR = {
  goal: BRAIN_ACCENT,
  priority: "#be123c",
  redirect: VALENCE.neutral.color,
} as const;

/** Report-style importance bands on a 0–100 significance scale — red intensity. */
export function significanceBand(value: number): {
  label: string;
  color: string;
  /** 1–10 scale for report-app parity chips. */
  rank10: number;
  /** Hover copy — what the score meant in the report / timeline example. */
  blurb: string;
} {
  const rank10 = Math.max(1, Math.min(10, Math.round(value / 10)));
  if (value >= 90)
    return {
      label: "Critical",
      color: "#9f1239",
      rank10,
      blurb: "Critical (9–10) — life-defining. Sets defaults; everything else orbits it.",
    };
  if (value >= 75)
    return {
      label: "High",
      color: "#e11d48",
      rank10,
      blurb: "High (8) — chapter-level. Shaped a season; still referenced when deciding.",
    };
  if (value >= 55)
    return {
      label: "Notable",
      color: "#fb7185",
      rank10,
      blurb: "Notable (6–7) — remembered on purpose. Worth the row, not the centre of gravity.",
    };
  return {
    label: "Background",
    color: "#64748b",
    rank10,
    blurb: "Background (1–5) — context. Happened; does not steer the plot alone.",
  };
}

/** Hover copy for valence chips — Good / Hard / Mixed in report language. */
export const VALENCE_CHIP_BLURB = {
  positive: "Went well (Good) — net gain. Energy, clarity, or capability went up.",
  negative: "Went badly (Hard) — cost something. Friction, loss, or a lesson still unpaid.",
  neutral: "Mixed — both true at once. Kept because the tension is the point.",
} as const;

/** Soft page wash for under-construction / filter callouts. */
export const BRAIN_WASH = {
  accent: BRAIN_ACCENT,
  warn: "#9f1239",
  remote: "#be185d",
} as const;
