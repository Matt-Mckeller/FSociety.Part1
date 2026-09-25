/**
 * Seeding — domain types.
 *
 * Sequences, Scenes, Goals, and Seeds for the marketing-video creation
 * flow. Replaces code-only "seeding" with browsable, goal-driven entities.
 *
 * Design decisions (see Planning/.../marketing-video-sequences.md):
 *   - D-S6 Hybrid relationships: plain links are embedded ID arrays; the
 *     ONLY edge-table relationship is Goal↔Scene/Sequence (it must carry
 *     `weight` + `depth`). That edge is {@link GoalLink}.
 *   - D-S7 IDs = UUID `id` + readable `slug`.
 *   - D-S8 These types are self-contained today (stub store); they are
 *     shaped to drop onto the shared Entity base later without changes.
 *
 * `Sequence` mirrors Report's `CommunicationChain` (ordered entries);
 * `Scene.perspectives` reuses Report's `Perspective` shape for video guidance.
 */

import type { GlyphName } from "../components/brand-glyphs";

export type EntityType =
  | "project"
  | "sequence"
  | "scene"
  | "goal"
  | "seed"
  | "asset";

/** The medium a Project produces — drives which generation tools apply. */
export type ProjectMedium = "animation" | "video" | "image" | "audio";

/** Promote target — the existing "promote to a sequence / to live" concept. */
export type SeedStatus = "draft" | "sequence" | "live";

/**
 * What kind of change a {@link ChangeEvent} records. Generic enough to apply
 * to every entity (the "history/event tracking on all entities" decision).
 */
export type ChangeKind =
  | "created"
  | "edited"
  | "promoted"
  | "goal-linked"
  | "goal-tuned"
  | "generated";

/**
 * One immutable entry in an entity's version history (audit log). Entities
 * carry an ordered list; the list length + 1 is effectively the version.
 */
export interface ChangeEvent {
  id: string;
  /** ISO timestamp. */
  at: string;
  /** Who/what made the change (user, system, ai-pipeline…). */
  actor: string;
  kind: ChangeKind;
  /** Human-readable one-liner shown in the history timeline. */
  summary: string;
  /** Optional goal this change was directed toward (goal-directed actions). */
  goalId?: string;
  /** Optional status transition captured for "promoted" events. */
  fromStatus?: SeedStatus;
  toStatus?: SeedStatus;
}

/**
 * Shared base for every seeding entity. Today this lives locally; later it
 * is replaced by the shared Entity base from `_current.md` (same shape).
 */
export interface Entity {
  /** UUID v4 — stable primary key (4eye convention). */
  id: string;
  /** Readable handle for humans/URLs, e.g. "sequence-see". */
  slug: string;
  type: EntityType;
  /** Each entity has its own symbol (emoji/icon key) for the action bar. */
  symbol?: string;
  /** Branded glyph key (see brand-glyphs). Preferred over {@link symbol}. */
  glyph?: GlyphName;
  /** Optional real image (avatar / thumbnail). Falls back to {@link glyph}. */
  imageUrl?: string;
  /** Monotonic version number, bumped on every recorded change. */
  version?: number;
  /** Ordered audit log of changes (oldest → newest). */
  history?: ChangeEvent[];
  /** Open extension bag (vertical-specific / future metadata). */
  meta?: Record<string, unknown>;
}

/**
 * Reused from Report's `Perspective` — a target interpretation that guides
 * generation (criminal/business/objective/ai/etc.).
 */
export interface Perspective {
  type: string;
  author?: string;
  interpretation: string;
  likelihood?: "low" | "medium" | "high";
  reasoning?: string;
}

/**
 * A Project — the top-level creative workspace context (e.g. "Animation").
 * Groups one or more {@link Sequence}s. This is the lightweight Project layer
 * from `_current.md` §2.1 (a leaf of the PM hierarchy, modelled as an entity);
 * it will later compose onto the shared Work entity.
 */
export interface Project extends Entity {
  type: "project";
  title: string;
  status: SeedStatus;
  /** What this project produces — drives the generation toolset. */
  medium: ProjectMedium;
  /** Short tagline shown in the header. */
  tagline?: string;
  /** Ordered sequence ids that belong to this project (embedded link). */
  sequenceIds: string[];
}

/** A "Story", animated. Ordered list of scenes (cf. CommunicationChain). */
export interface Sequence extends Entity {
  type: "sequence";
  title: string;
  status: SeedStatus;
  /** Owning project (embedded link). */
  projectId?: string;
  /** Ordered scene ids (embedded array — plain link, no edge metadata). */
  sceneIds: string[];
}

/** A single scene / beat inside a sequence. */
export interface Scene extends Entity {
  type: "scene";
  title: string;
  sequenceId: string;
  status: SeedStatus;
  /** Browsable/editable prompt scripts fed to the generation pipeline. */
  promptScripts: string[];
  /** Target perspectives that guide generation (reused Report shape). */
  perspectives?: Perspective[];
  /** Ordered seed ids attached to this scene (plain embedded link). */
  seedIds: string[];
}

/** A goal / focus area that can be linked to scenes or sequences. */
export interface Goal extends Entity {
  type: "goal";
  title: string;
  /** Lens grouping, e.g. "Engagement", "Mental health", "Trust". */
  focusArea?: string;
}

/** What kind of payload a seed carries. */
export type SeedKind = "prompt" | "goal" | "text" | "reference" | "asset";

/** A prompt seed / seed goal / text / reference bundle. */
export interface Seed extends Entity {
  type: "seed";
  kind: SeedKind;
  title: string;
  body: string;
}

/**
 * The ONE edge-table relationship (D-S6). Links a Goal to a Scene or a
 * Sequence and carries the two attributes that a plain embedded array
 * cannot: `weight` and `depth`.
 */
export interface GoalLink {
  goalId: string;
  toId: string;
  toType: "scene" | "sequence";
  /** Importance of this goal for the target. 0–100. */
  weight: number;
  /** Complexity / depth tier of the target. 1–7 (realistically 3–7 used). */
  depth: number;
  /**
   * Free-text guidance for how this goal should shape generation on this
   * target. Saved on the edge and shown in the expanded card.
   */
  instructions?: string;
  /**
   * Extra associations surfaced as badges (e.g. related assets, references,
   * linked entities). Each renders as a chip with a tooltip.
   */
  associations?: LinkBadge[];
}

/**
 * A small labelled association rendered as a chip/badge with a tooltip.
 * Generic enough to reuse on any relationship/edge in the system.
 */
export interface LinkBadge {
  label: string;
  /** Hover explanation. */
  tooltip?: string;
  /** Emoji / icon key shown before the label. */
  symbol?: string;
  /** Branded glyph key (preferred over {@link symbol}). */
  glyph?: GlyphName;
  /** Optional real image (asset thumbnail) shown in the badge. */
  imageUrl?: string;
  /** Visual tone. */
  tone?: "default" | "info" | "success" | "warning";
}

/** Depth tier labels (1–7) for display. */
export const DEPTH_TIERS: Record<number, string> = {
  1: "Surface",
  2: "Light",
  3: "Standard",
  4: "Layered",
  5: "Deep",
  6: "Intricate",
  7: "Profound",
};

/** A {@link GoalLink} resolved against the goal it points at, plus origin. */
export interface ResolvedGoalLink extends GoalLink {
  goal: Goal;
  /** True when the link was inherited from the parent sequence. */
  inherited: boolean;
}

/** Marker used by the depth badge tooltip. */
export const DEPTH_TIER_HINT =
  "Treatment depth — how elaborate the generated result should be.";

/** Human label for each status. */
export const STATUS_LABEL: Record<SeedStatus, string> = {
  draft: "Draft",
  sequence: "In Sequence",
  live: "Live",
};

/** The next status an item can be promoted to (undefined = already live). */
export const NEXT_STATUS: Record<SeedStatus, SeedStatus | undefined> = {
  draft: "sequence",
  sequence: "live",
  live: undefined,
};
