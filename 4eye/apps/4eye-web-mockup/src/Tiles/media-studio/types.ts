/**
 * Media Studio types — Cut / Library / Publish action surface.
 */

export type MediaStudioTab = "library" | "cut" | "publish";

export type MediaFolderId =
  | "phenominal"
  | "character"
  | "coins"
  | "edu"
  | "gg"
  | "heart-evolve"
  | "instagram"
  | "command-center"
  | "scene-studio"
  | "demo-vid"
  | "inbox";

export interface MediaFolder {
  id: MediaFolderId;
  label: string;
  path: string;
  blurb: string;
  /** Approx item count for display; null = unknown / browse later. */
  count: number | null;
  accent: string;
  /** Highlight for the shorts pipeline. */
  pipeline?: boolean;
}

export type CutGoal = "teach" | "engage" | "professional" | "funding" | "women";

export type PublishPlatform = "tiktok" | "youtube" | "instagram";

export interface CutClip {
  source: string;
  id: string;
  title: string;
  hook: string;
  /** Post-ready caption — concise, engagement-first. */
  description?: string;
  /** Best targets; most Phenominal shorts → tiktok + youtube. */
  platforms?: PublishPlatform[];
  start: string;
  end: string;
  tags: string[];
  layout_mode?: string;
  new?: boolean;
}

export interface CutSource {
  file: string;
  layout: string;
  w: number;
  h: number;
  pip?: { x: number; y: number; w: number; h: number };
  ui?: { x: number; y: number; w: number; h: number };
}

export interface CutlistDoc {
  output_dir: string;
  goals: string[];
  layout_notes: Record<string, string>;
  sources: Record<string, CutSource>;
  clips: CutClip[];
}

export type PipelineStepId =
  | "ingest"
  | "transcribe"
  | "cutlist"
  | "layout"
  | "render"
  | "promote"
  | "ship";

export interface PipelineStep {
  id: PipelineStepId;
  label: string;
  detail: string;
  status: "ready" | "done" | "next";
}

export type PublishTier = "A" | "B" | "hold";

export interface PublishClip {
  id: string;
  title: string;
  hook: string;
  description: string;
  platforms: PublishPlatform[];
  series: "godtier" | "future-gov-war" | "vid3";
  fileId: string;
  src: string | null;
  tags: string[];
  tier: PublishTier;
  filedAs: string;
  /** yen Videos library id for deep-link `#id`. */
  videoId: string | null;
  /** Already copied into yen public + media.ts. */
  live: boolean;
}
