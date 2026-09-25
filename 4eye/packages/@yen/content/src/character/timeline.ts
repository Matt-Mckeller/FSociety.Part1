/**
 * Character — Timeline model.
 *
 * The timeline is an assembly, not a table: it merges three stores that all
 * describe "something happened" at different depths — cold storage (formative),
 * memory (mid-term), and the live feed (today). `CharacterTimeline` used to do
 * that merge inline, which meant the Events lens had no way to ask questions of
 * the result: how many, from when, how much of it was hard.
 *
 * So the merge, the vocabulary for the three depths, and the era buckets live
 * here. The components render; this file decides what a timeline *is*.
 */

import { CHARACTER_STATUS_SEED } from "./status";
import {
  ART_CHANNEL_META,
  ART_PHASE_META,
  LIFE_TIMELINE_EVENTS,
  TIMELINE_ARC,
  type ArtChannel,
  type ArtPhase,
  type LifeTimelineEvent,
} from "./life-timeline";
import type { FeedEvent } from "./types";

export type { ArtChannel, ArtPhase, LifeTimelineEvent };
export {
  ART_CHANNEL_META,
  ART_PHASE_META,
  LIFE_TIMELINE_EVENTS,
  ONGOING_PROCESS,
  TIMELINE_ARC,
} from "./life-timeline";

/* ──────────────────────────────────────────────────── entries */

/**
 * Where an entry came from — and, because the three stores are ordered by
 * depth, how permanent it is. A feed event is a fact about Tuesday; a cold
 * storage entry is a fact about the person.
 */
export type TimelineSource = "event" | "memory" | "cold";

export type Valence = "positive" | "negative" | "neutral";

export interface TimelineEntry {
  id: string;
  title: string;
  summary?: string;
  occurredAt: number;
  significance: number;
  valence: Valence;
  tags?: string[];
  source: TimelineSource;
  /** What the event taught, where it is known. */
  learned?: string;
  /** What it changed. */
  result?: string;
  /** Image-timeline channel (pink / cyan / gold). */
  artChannel?: ArtChannel;
  /** Darkness → light phase (independent of channel colour). */
  artPhase?: ArtPhase;
  /** Display order on the LIFE → LESSONS → ASCENSION graphic. */
  artOrder?: number;
  /** Gold-star milestone on the source art. */
  artMilestone?: boolean;
  /** Skull / danger mark on the source art. */
  artDanger?: boolean;
}

/* ──────────────────────────────────────────────────── vocabulary */

export const VALENCE_META: Record<Valence, { label: string; color: string }> = {
  positive: { label: "Went well", color: "#16a34a" },
  negative: { label: "Went badly", color: "#dc2626" },
  neutral: { label: "Mixed", color: "#64748b" },
};

/** Kept as a bare map because most render paths only want the colour. */
export const VALENCE_COLORS: Record<Valence, string> = {
  positive: VALENCE_META.positive.color,
  negative: VALENCE_META.negative.color,
  neutral: VALENCE_META.neutral.color,
};

/**
 * Ordered shallow → deep, which is also the order they should be offered as
 * filters: the question "what happened lately?" is asked far more often than
 * "what made me like this?".
 */
export const TIMELINE_SOURCES: readonly TimelineSource[] = ["event", "memory", "cold"] as const;

export const SOURCE_META: Record<TimelineSource, { label: string; blurb: string; dotSize: number }> = {
  event: {
    label: "Recent",
    blurb: "Hours to days old — still in working memory",
    dotSize: 11,
  },
  memory: {
    label: "Chapters",
    blurb: "Weeks to months — the mid-term log",
    dotSize: 13,
  },
  cold: {
    label: "Formative",
    blurb: "Cold storage — the events that set the defaults",
    dotSize: 17,
  },
};

/* ──────────────────────────────────────────────────── eras */

const DAY = 86_400_000;

export type EraId = "week" | "month" | "year" | "before";

/**
 * Buckets by age rather than by calendar boundary. A timeline that runs from
 * two hours ago to six years ago in one undifferentiated column asks the reader
 * to do the arithmetic on every row; grouping does it once, at the top of each
 * run, and the jump from "this month" to "before this year" becomes the visible
 * fact it should be.
 */
export const TIMELINE_ERAS: ReadonlyArray<{
  id: EraId;
  label: string;
  hint: string;
  /** Upper bound in days, exclusive. */
  maxAgeDays: number;
}> = [
  { id: "week", label: "This week", hint: "Still live — close enough to act on", maxAgeDays: 7 },
  { id: "month", label: "This month", hint: "Recent enough to still be moving", maxAgeDays: 31 },
  { id: "year", label: "This year", hint: "The current chapter", maxAgeDays: 365 },
  { id: "before", label: "Before this year", hint: "Formative — where the defaults came from", maxAgeDays: Infinity },
];

export function eraOf(occurredAt: number, now = Date.now()): EraId {
  const ageDays = (now - occurredAt) / DAY;
  return (TIMELINE_ERAS.find((e) => ageDays < e.maxAgeDays) ?? TIMELINE_ERAS[TIMELINE_ERAS.length - 1]).id;
}

export interface EraGroup {
  id: EraId;
  label: string;
  hint: string;
  entries: TimelineEntry[];
}

/** Groups an already-sorted (newest first) list, dropping empty eras. */
export function groupByEra(entries: TimelineEntry[], now = Date.now()): EraGroup[] {
  return TIMELINE_ERAS.map(({ id, label, hint }) => ({
    id,
    label,
    hint,
    entries: entries.filter((e) => eraOf(e.occurredAt, now) === id),
  })).filter((g) => g.entries.length > 0);
}

/* ──────────────────────────────────────────────────── assembly */

/** Feed events worth promoting to the timeline — progress, not activity. */
const TIMELINE_FEED_TYPES: ReadonlySet<FeedEvent["type"]> = new Set<FeedEvent["type"]>([
  "milestone",
  "trait-upgrade",
  "aura-upgrade",
  "focus-changed",
]);

/**
 * Merge the three stores into one newest-first list.
 *
 * `recentEvents` is filtered at 70 significance because RAM holds everything
 * including the noise; memory and cold storage are already curated, so they
 * come through whole. Life-timeline nodes get their art channel / order /
 * milestone flags attached so the graphic view can render the source art.
 */
export function buildTimelineEntries(feedEvents: readonly FeedEvent[] = []): TimelineEntry[] {
  const artById = new Map(LIFE_TIMELINE_EVENTS.map((e) => [e.id, e]));

  const withArt = (m: {
    id: string;
    title: string;
    summary?: string;
    occurredAt: number;
    significance: number;
    valence: Valence;
    tags?: string[];
    learned?: string;
    result?: string;
  }, source: TimelineSource): TimelineEntry => {
    const art = artById.get(m.id);
    return {
      ...m,
      source,
      artChannel: art?.channel,
      artPhase: art?.phase,
      artOrder: art?.order,
      artMilestone: art?.milestone,
      artDanger: art?.danger,
    };
  };

  return [
    ...CHARACTER_STATUS_SEED.coldStorage.map((m) => withArt(m, "cold")),
    ...CHARACTER_STATUS_SEED.memory.map((m) => withArt(m, "memory")),
    ...CHARACTER_STATUS_SEED.recentEvents
      .filter((e) => e.significance >= 70)
      .map((m) => withArt(m, "event")),
    ...feedEvents
      .filter((e) => TIMELINE_FEED_TYPES.has(e.type))
      .slice(0, 5)
      .map((e): TimelineEntry => ({
        id: e.id,
        title: e.label,
        summary: e.detail,
        occurredAt: e.occurredAt,
        significance: 75,
        valence: "positive",
        source: "event",
      })),
  ].sort((a, b) => b.occurredAt - a.occurredAt);
}

/** Every distinct tag in a set of entries, most-used first. */
export function tagsOf(entries: TimelineEntry[]): Array<{ tag: string; count: number }> {
  const counts = new Map<string, number>();
  for (const e of entries) {
    for (const tag of e.tags ?? []) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Brain-lens default: only entries that taught something, newest first.
 *
 * The full formative timeline belongs on the Events lens. On Brain the question
 * is "what did I recently learn?" — so we keep rows with a `learned` field and
 * prefer ones inside `maxAgeDays`. If that window is empty we fall back to the
 * most recent lessons regardless of age, still capped, so the section never
 * goes blank while still reading as a filtered view.
 */
export function recentlyLearnedEntries(
  entries: TimelineEntry[],
  opts: { maxAgeDays?: number; limit?: number; now?: number } = {},
): TimelineEntry[] {
  const maxAgeDays = opts.maxAgeDays ?? 180;
  const limit = opts.limit ?? 8;
  const now = opts.now ?? Date.now();
  const withLesson = entries
    .filter((e) => Boolean(e.learned))
    .sort((a, b) => b.occurredAt - a.occurredAt);
  const recent = withLesson.filter((e) => (now - e.occurredAt) / DAY <= maxAgeDays);
  const pool = recent.length > 0 ? recent : withLesson;
  return pool.slice(0, limit);
}

/**
 * Entries worth pinning above the fold on the Events lens.
 *
 * Prefers image-timeline gold-star milestones, then critical / formative weight.
 */
export function keyTimelineEntries(
  entries: TimelineEntry[],
  opts: { minSignificance?: number; limit?: number } = {},
): TimelineEntry[] {
  const min = opts.minSignificance ?? 90;
  const limit = opts.limit ?? 6;
  const milestones = entries.filter((e) => e.artMilestone);
  const rest = entries.filter(
    (e) => !e.artMilestone && (e.significance >= min || e.source === "cold"),
  );
  return [...milestones, ...rest]
    .sort((a, b) => {
      if (Boolean(a.artMilestone) !== Boolean(b.artMilestone)) {
        return a.artMilestone ? -1 : 1;
      }
      return b.significance - a.significance || (a.artOrder ?? 99) - (b.artOrder ?? 99);
    })
    .slice(0, limit);
}

/** Art-view sort: LIFE → LESSONS → ASCENSION order from the source graphic. */
export function artOrderedEntries(entries: TimelineEntry[]): TimelineEntry[] {
  const withOrder = entries.filter((e) => e.artOrder != null);
  const without = entries.filter((e) => e.artOrder == null);
  return [
    ...withOrder.sort((a, b) => (a.artOrder ?? 0) - (b.artOrder ?? 0)),
    ...without.sort((a, b) => a.occurredAt - b.occurredAt),
  ];
}

