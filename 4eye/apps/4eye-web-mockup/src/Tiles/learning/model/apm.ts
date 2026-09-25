/**
 * APM — a relative throughput rating, not a click counter.
 *
 * "200 APM" here is a capacity index: how much work, calculation, and
 * decision-making the session is set to carry. Super Sonic (the default) sits
 * at 200, the middle of the Super Sonic band. It is *not* StarCraft-style
 * actions per minute. Literal event-rate APM is tracked separately on the
 * same snapshot as `literalApm` so we can still see how busy the last few
 * minutes were.
 *
 * Scale (rating, 0–400):
 *   Sub Sonic    50 target   0–100
 *   Trans Sonic 125 target   100–150
 *   Super Sonic 200 target   150–250   ← default
 *   Hyper Sonic 325 target   250–400
 */

export const APM_WINDOW_MS = 5 * 60_000;

/** Super Sonic-band centre. The default Pace rating. */
export const DEFAULT_APM = 200;

/** Open ceiling of the rating scale (Hyper Sonic top). */
export const APM_SCALE_MAX = 400;

export type ApmChannel = "action" | "calculation" | "message" | "decision";

export const APM_CHANNELS: ApmChannel[] = [
  "action",
  "calculation",
  "message",
  "decision",
];

/** Relative contribution of one *literal* event. Rating APM does not use this. */
export const APM_WEIGHT: Record<ApmChannel, number> = {
  action: 1,
  calculation: 0.4,
  message: 1.5,
  decision: 2,
};

export const APM_CHANNEL_LABEL: Record<ApmChannel, string> = {
  action: "Actions",
  calculation: "Calculations",
  message: "Messages",
  decision: "Decisions",
};

export type PaceBand = "slow" | "guided" | "fast" | "burst";

export const PACE_BANDS: PaceBand[] = ["slow", "guided", "fast", "burst"];

export interface PaceBandMeta {
  id: PaceBand;
  optionId: string;
  label: string;
  /** Compact tick on the APM meter — Sub, Trans, Super, Hyper. */
  shortLabel: string;
  /** Inclusive floor on the rating. */
  minApm: number;
  /** Exclusive ceiling, except Hyper Sonic which includes the top. */
  maxApm: number;
  /** Named centre of the band — Super Sonic is {@link DEFAULT_APM}. */
  targetApm: number;
  /** Inclusive floor on the 0–100 meter. */
  minRelative: number;
  /** Exclusive ceiling on the meter (Hyper Sonic includes 100). */
  maxRelative: number;
  color: string;
  description: string;
}

export const PACE_BAND_META: Record<PaceBand, PaceBandMeta> = {
  slow: {
    id: "slow",
    optionId: "OPT_PACE_SLOW",
    label: "Sub Sonic",
    shortLabel: "Sub",
    minApm: 0,
    maxApm: 100,
    targetApm: 50,
    minRelative: 0,
    maxRelative: 25,
    color: "#64748b",
    description: "Deliberate. One step, room to think.",
  },
  guided: {
    id: "guided",
    optionId: "OPT_PACE_GUIDED",
    label: "Trans Sonic",
    shortLabel: "Trans",
    minApm: 100,
    maxApm: 150,
    targetApm: 125,
    minRelative: 25,
    maxRelative: 50,
    color: "#38bdf8",
    description: "Checks along the way.",
  },
  fast: {
    id: "fast",
    optionId: "OPT_PACE_FAST",
    label: "Super Sonic",
    shortLabel: "Super",
    minApm: 150,
    maxApm: 250,
    targetApm: DEFAULT_APM,
    minRelative: 50,
    maxRelative: 75,
    color: "#f59e0b",
    description: "Cover ground quickly.",
  },
  burst: {
    id: "burst",
    optionId: "OPT_PACE_BURST",
    label: "Hyper Sonic",
    shortLabel: "Hyper",
    minApm: 250,
    maxApm: APM_SCALE_MAX,
    targetApm: 325,
    minRelative: 75,
    maxRelative: 100,
    color: "#ef4444",
    description: "Sprint throughput.",
  },
};

export const DEFAULT_PACE_BAND: PaceBand = "fast";

export interface ApmEvent {
  channel: ApmChannel;
  at: number;
  count: number;
}

export type ApmCounts = Record<ApmChannel, number>;

export interface ApmSnapshot {
  windowMs: number;
  events: ApmEvent[];
  counts: ApmCounts;
  /**
   * Throughput rating (0–400). Super Sonic = 200. This is the number the UI means
   * by "APM" — not events per minute.
   */
  apm: number;
  /**
   * Literal weighted events per minute in the rolling window. Secondary;
   * shown as "live" so the rating is not confused with a click counter.
   */
  literalApm: number;
  /** 0–100 position of the rating on the band meter. */
  relative: number;
  /** Band the rating currently sits in. */
  band: PaceBand;
}

export const EMPTY_APM_COUNTS: ApmCounts = {
  action: 0,
  calculation: 0,
  message: 0,
  decision: 0,
};

export function bandForOptionId(optionId: string): PaceBand | undefined {
  return PACE_BANDS.find((b) => PACE_BAND_META[b].optionId === optionId);
}

export function bandForApm(apm: number): PaceBand {
  if (apm >= PACE_BAND_META.burst.minApm) return "burst";
  if (apm >= PACE_BAND_META.fast.minApm) return "fast";
  if (apm >= PACE_BAND_META.guided.minApm) return "guided";
  return "slow";
}

/**
 * Piecewise-linear map from the rating onto 0–100, using each band's
 * rating span as the domain and its relative span as the range.
 */
export function relativeApm(apm: number): number {
  const band = bandForApm(apm);
  const meta = PACE_BAND_META[band];
  const span = Math.max(1, meta.maxApm - meta.minApm);
  const t = Math.min(1, Math.max(0, (apm - meta.minApm) / span));
  const relSpan = meta.maxRelative - meta.minRelative;
  const value = meta.minRelative + t * relSpan;
  return Math.min(100, Math.max(0, value));
}

export function apmRangeLabel(band: PaceBand): string {
  const { targetApm, minApm, maxApm } = PACE_BAND_META[band];
  if (band === "burst") return `${targetApm} APM (${minApm}–${maxApm}+)`;
  return `${targetApm} APM (${minApm}–${maxApm})`;
}

export function formatApm(apm: number): string {
  return `${Math.round(apm)} APM`;
}

export function formatRelativeApm(relative: number): string {
  return `${Math.round(relative)} rAPM`;
}

export function formatLiteralApm(literalApm: number): string {
  return `${Math.round(literalApm)} live/min`;
}

function pruneEvents(events: ApmEvent[], now: number, windowMs: number): ApmEvent[] {
  const floor = now - windowMs;
  return events.filter((e) => e.at >= floor);
}

function tally(events: ApmEvent[]): ApmCounts {
  const counts: ApmCounts = { ...EMPTY_APM_COUNTS };
  for (const e of events) counts[e.channel] += e.count;
  return counts;
}

function weightedTotal(counts: ApmCounts): number {
  return APM_CHANNELS.reduce((sum, ch) => sum + counts[ch] * APM_WEIGHT[ch], 0);
}

function literalRate(counts: ApmCounts, windowMs: number): number {
  const minutes = windowMs / 60_000;
  return minutes <= 0 ? 0 : weightedTotal(counts) / minutes;
}

function withRating(snapshot: Omit<ApmSnapshot, "relative" | "band"> & Partial<Pick<ApmSnapshot, "relative" | "band">>): ApmSnapshot {
  const apm = Math.min(APM_SCALE_MAX, Math.max(0, snapshot.apm));
  return {
    ...snapshot,
    apm,
    relative: relativeApm(apm),
    band: bandForApm(apm),
  };
}

export function emptyApmSnapshot(windowMs = APM_WINDOW_MS, apm = DEFAULT_APM): ApmSnapshot {
  return withRating({
    windowMs,
    events: [],
    counts: { ...EMPTY_APM_COUNTS },
    apm,
    literalApm: 0,
  });
}

export function setApmRating(snapshot: ApmSnapshot, apm: number): ApmSnapshot {
  return withRating({ ...snapshot, apm });
}

export function setApmFromBand(snapshot: ApmSnapshot, band: PaceBand): ApmSnapshot {
  return setApmRating(snapshot, PACE_BAND_META[band].targetApm);
}

/** Recompute literal rate from events. The rating (`apm`) is left alone. */
export function recomputeApm(snapshot: ApmSnapshot, now = Date.now()): ApmSnapshot {
  const events = pruneEvents(snapshot.events, now, snapshot.windowMs);
  const counts = tally(events);
  return withRating({
    ...snapshot,
    events,
    counts,
    literalApm: literalRate(counts, snapshot.windowMs),
  });
}

export function recordApm(
  snapshot: ApmSnapshot,
  channel: ApmChannel,
  count = 1,
  now = Date.now(),
): ApmSnapshot {
  if (count <= 0) return recomputeApm(snapshot, now);
  return recomputeApm(
    {
      ...snapshot,
      events: [...snapshot.events, { channel, at: now, count }],
    },
    now,
  );
}

export function recordApmChannels(
  snapshot: ApmSnapshot,
  channels: Partial<ApmCounts>,
  now = Date.now(),
): ApmSnapshot {
  let next = snapshot;
  for (const ch of APM_CHANNELS) {
    const n = channels[ch];
    if (n && n > 0) next = recordApm(next, ch, n, now);
  }
  return next;
}

/**
 * Slide a snapshot so its newest event is `now`. Seed data is stamped at
 * module load; rebasing on mount keeps the literal window live. Rating
 * is preserved.
 */
export function rebaseSnapshot(snapshot: ApmSnapshot, now = Date.now()): ApmSnapshot {
  if (snapshot.events.length === 0) return recomputeApm(snapshot, now);
  const newest = Math.max(...snapshot.events.map((e) => e.at));
  const delta = now - newest;
  return recomputeApm(
    {
      ...snapshot,
      events: snapshot.events.map((e) => ({ ...e, at: e.at + delta })),
    },
    now,
  );
}

/**
 * Seed a Super Sonic session at 200 APM, with a plausible literal event mix so
 * the live/min line is not sitting at zero.
 */
export function seedApmSnapshot(now = Date.now(), windowMs = APM_WINDOW_MS): ApmSnapshot {
  const events: ApmEvent[] = [];
  const push = (channel: ApmChannel, count: number, offsetMs: number) => {
    events.push({ channel, count, at: now - offsetMs });
  };

  for (let i = 0; i < 12; i++) push("action", 10, Math.round((windowMs / 12) * i));
  for (let i = 0; i < 8; i++) push("message", 5, Math.round((windowMs / 8) * i));
  for (let i = 0; i < 16; i++) push("calculation", 25, Math.round((windowMs / 16) * i));
  for (let i = 0; i < 10; i++) push("decision", 2, Math.round((windowMs / 10) * i));

  return recomputeApm(
    withRating({
      ...emptyApmSnapshot(windowMs, DEFAULT_APM),
      events,
    }),
    now,
  );
}
