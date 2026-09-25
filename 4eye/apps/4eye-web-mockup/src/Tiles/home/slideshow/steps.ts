import type { TimelineGroup, TimelineStep } from "@4eye/web/components/timeline";
import { ACT_COLORS, ACT_LABELS } from "@4eye/web/lib/theme/actColors";
import {
  IconStepCatalog,
  IconStepControl,
  IconStepDomain,
  IconStepEarn,
  IconStepLearn,
  IconStepSee,
  IconStepVideo,
} from "./step-icons";

/**
 * Stable identifiers for every slide in the home deck. Used as discriminator
 * by the slideshow reducer, the persistent-mascot registry, and any consumer
 * that needs to key off a slide rather than a numeric index.
 */
export type SlideId =
  | "video"
  | "learn"
  | "see"
  | "control"
  | "domains"
  | "catalog"
  | "earn";

/**
 * Slideshow steps in playback order (PAS-Resolution funnel):
 *   Video → Learn → Control → See → Catalog → Domains → Earn.
 *
 * `id` matches the timeline `tabTitle` (lowercased) and the slide
 * folder name under `slides/<id>/`.
 *
 * Group ids map to {@link ACT_COLORS}/{@link ACT_LABELS} (act names):
 *   1 = Promise (Video + Learn + See)
 *   3 = Play    (Control — the vision beat)
 *   2 = Reach   (Domains + Catalog)
 *   4 = Reward  (Earn)
 */
export const STEPS: ReadonlyArray<TimelineStep & { id: SlideId }> = [
  {
    id: "video",
    label: "Video",
    tabTitle: "Video",
    subLabel: "The classrooms of tomorrow, available soon.",
    groupId: 1,
    Icon: IconStepVideo,
  },
  {
    id: "learn",
    label: "Learn",
    tabTitle: "Learn",
    subLabel: "Start \u2192 Learn and Grow \u2192 Earn",
    groupId: 1,
    Icon: IconStepLearn,
  },
  {
    id: "control",
    label: "Control",
    tabTitle: "Control",
    subLabel: "control attention",
    groupId: 3,
    Icon: IconStepControl,
  },
  {
    id: "see",
    label: "See",
    tabTitle: "See",
    subLabel: "configure your human.",
    groupId: 1,
    Icon: IconStepSee,
  },
  {
    id: "catalog",
    label: "Catalog",
    tabTitle: "Catalog",
    subLabel: "Understand all your eyes.",
    groupId: 2,
    Icon: IconStepCatalog,
  },
  {
    id: "domains",
    label: "Domains",
    tabTitle: "Domains",
    subLabel: "where and when",
    groupId: 2,
    Icon: IconStepDomain,
  },
  {
    id: "earn",
    label: "Earn",
    tabTitle: "Earn",
    subLabel: "welcome to 4eye",
    groupId: 4,
    Icon: IconStepEarn,
  },
];

export const GROUPS: TimelineGroup[] = [
  { id: 1, label: ACT_LABELS[1], color: ACT_COLORS.act1 },
  { id: 3, label: ACT_LABELS[3], color: ACT_COLORS.act3 },
  { id: 2, label: ACT_LABELS[2], color: ACT_COLORS.act2 },
  { id: 4, label: ACT_LABELS[4], color: ACT_COLORS.act4 },
];

/**
 * Per-slide auto-play durations (ms), aligned with {@link STEPS} order.
 * Tuned to slide content density: short Hook/Reward; longer Play
 * (densest, stacked code-pair cards) and Reach (two reveal sequences +
 * pill→card morph). Multiplied by 1/speed at runtime.
 */
export const SLIDE_DURATIONS_MS: number[] = [
  6000, // video      — marketing opener video
  2000, // hook       — single tagline + Play button
  3500, // play       — densest, stacked code-pair cards
  3000, // promise    — chips + tagline (now carries the marketing copy)
  3000, // offerings  — AI-4-my-eyes phrase rotation
  5000, // reach      — When band + Where band + pill→card morph
  2500, // reward
];

/** Selectable playback speeds. Cycle order is the array order. */
export const SPEEDS = [1, 1.5, 2, 0.5] as const;
export type Speed = (typeof SPEEDS)[number];

/** Default fallback when an index has no entry in {@link SLIDE_DURATIONS_MS}. */
export const DEFAULT_SLIDE_DURATION_MS = 2500;

/** Debounce window for wheel-driven slide advance (ms). */
export const WHEEL_LOCK_MS = 700;
/** Minimum wheel deltaY to register as an advance gesture. */
export const WHEEL_THRESHOLD = 30;
/** Fade duration for manual nav (ms). */
export const FADE_MS = 500;
/** Faster fade during auto-play — short dwell makes a 500 ms fade feel like half the slide. */
export const FADE_MS_AUTO = 320;
