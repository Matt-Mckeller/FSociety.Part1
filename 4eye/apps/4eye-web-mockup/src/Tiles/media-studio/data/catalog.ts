import type { MediaFolder, PipelineStep, PublishTier } from "../types";

/**
 * Canonical Media library map — mirrors ~/Projects/Media/README.md.
 * Paths stay relative to that library (source of truth; not duplicated here).
 */
export const MEDIA_LIBRARY_FOLDERS: MediaFolder[] = [
  {
    id: "phenominal",
    label: "Phenominal",
    path: "Phenominal/",
    blurb: "Session recordings + shorts pipeline (godtier, gov, vid3).",
    count: 28,
    accent: "#e11d48",
    pipeline: true,
  },
  {
    id: "character",
    label: "Character",
    path: "Character/",
    blurb: "Character intros, design stills, WhoAmI cuts.",
    count: null,
    accent: "#6366f1",
  },
  {
    id: "coins",
    label: "Coins",
    path: "Coins/",
    blurb: "Coin / economy UI examples.",
    count: null,
    accent: "#f59e0b",
  },
  {
    id: "edu",
    label: "EDU",
    path: "EDU/",
    blurb: "Learning product slides & classroom refs.",
    count: null,
    accent: "#10b981",
  },
  {
    id: "gg",
    label: "gg",
    path: "gg/",
    blurb: "Short intentional gg clips & stills.",
    count: null,
    accent: "#14b8a6",
  },
  {
    id: "heart-evolve",
    label: "Heart.Evolve",
    path: "Heart.Evolve/",
    blurb: "Heart.Evolve concept stills and variants.",
    count: null,
    accent: "#ec4899",
  },
  {
    id: "instagram",
    label: "Instagram",
    path: "Instagram/",
    blurb: "Masters + _exports (Feed 4×5 · Story 9:16). Run yen photos:export.",
    count: null,
    accent: "#e1306c",
  },
  {
    id: "command-center",
    label: "CommandCenter",
    path: "CommandCenter/",
    blurb: "Command center + nav concepts.",
    count: null,
    accent: "#3b82f6",
  },
  {
    id: "scene-studio",
    label: "SceneStudio",
    path: "SceneStudio/",
    blurb: "Scene Studio example frames.",
    count: null,
    accent: "#a855f7",
  },
  {
    id: "demo-vid",
    label: "Demo_Vid",
    path: "Demo_Vid/",
    blurb: "App demos and product walkthroughs.",
    count: null,
    accent: "#0891b2",
  },
  {
    id: "inbox",
    label: "Inbox",
    path: "_inbox/",
    blurb: "New captures & recordings — file into a topic folder.",
    count: null,
    accent: "#64748b",
  },
];

export const MEDIA_ROOT_LABEL = "~/Projects/Media";

/** Ordered steps for the repeatable Phenominal cut process. */
export const CUT_PIPELINE_STEPS: PipelineStep[] = [
  {
    id: "ingest",
    label: "Ingest",
    detail: "Drop Zoom session into Phenominal/ or _inbox/recordings.",
    status: "done",
  },
  {
    id: "transcribe",
    label: "Transcribe",
    detail: "Whisper → _work/*.srt for marker refinement.",
    status: "done",
  },
  {
    id: "cutlist",
    label: "Cutlist",
    detail: "Titles, hooks, in/out, tags (teach / fund / women).",
    status: "done",
  },
  {
    id: "layout",
    label: "Layout",
    detail: "Talking-primary top + full screen bottom (PiP covered).",
    status: "done",
  },
  {
    id: "render",
    label: "Render",
    detail: "python3 shorts/v2_edited/render_v3_layout.py",
    status: "done",
  },
  {
    id: "promote",
    label: "Promote",
    detail: "Copied to yen public/media/videos/shorts + media.ts.",
    status: "done",
  },
  {
    id: "ship",
    label: "Ship",
    detail: "Post A-tier with captions + one CTA. Hold the rest.",
    status: "next",
  },
];

/** A-tier posting set — ship these first (~11). */
export const A_TIER_CLIP_IDS = new Set([
  "03_gotta_go_to_school",
  "02_info_has_ridiculous_value",
  "04_classroom_for_each_student",
  "12_brain_is_a_human_right",
  "01_1_mil_vs_win",
  "02_shapes_sword_triangle",
  "05_round_corners_teach_peace",
  "07_need_builders",
  "07_help_me_build_it",
  "01_sponsor_the_look",
  "05_info_has_power",
]);

/** Suggested CTA line per clip family — keep one punch, one ask. */
export const DEFAULT_CTA = "Follow for the build — education, work, and the AI in between.";

export function clipTier(clipId: string, tags: string[]): PublishTier {
  if (A_TIER_CLIP_IDS.has(clipId)) return "A";
  if (tags.includes("funding") || tags.includes("teach")) return "B";
  return "hold";
}

export function seriesFromSource(source: string): "godtier" | "future-gov-war" | "vid3" {
  if (source === "gov") return "future-gov-war";
  if (source === "vid3") return "vid3";
  return "godtier";
}

export function shortPublicSrc(series: string, fileId: string): string {
  return `/media/videos/shorts/${series}/${fileId}.mp4`;
}
