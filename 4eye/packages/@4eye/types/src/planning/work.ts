/**
 * Planning — Work model + ViewMode
 *
 * The PM hierarchy is ONE generic Work model; the narrative labels
 * (Legend/Campaign/Storyline/Quest/Objective/Action) are a *skin* applied via
 * `ViewMode`, NOT separate classes.
 *
 * ViewMode is renamed from "Lens" to avoid collision with the @expanse/lens
 * package (animated symbol-language).
 */

/** Which skin the PM data is rendered through. */
export type ViewMode = "pm" | "narrative";

/** Generic, neutral work rank (the underlying model). */
export type WorkRank =
  | "vision" // top — one north star
  | "initiative"
  | "project"
  | "epic"
  | "task"
  | "step";

/** Narrative skin labels, mapped 1:1 to WorkRank for `narrative` ViewMode. */
export type NarrativeRank =
  | "legend"
  | "campaign"
  | "storyline"
  | "quest"
  | "objective"
  | "action";

export const RANK_TO_NARRATIVE: Record<WorkRank, NarrativeRank> = {
  vision: "legend",
  initiative: "campaign",
  project: "storyline",
  epic: "quest",
  task: "objective",
  step: "action",
};

/** Leaf work classification (for tasks/tickets). */
export type WorkCategory =
  | "component"
  | "module"
  | "page"
  | "planning"
  | "development"
  | "operations"
  | "research";

/**
 * A WorkEntity is an Entity of type "work" (or a narrative alias) plus this
 * payload. Hierarchy is expressed via Relationship edges (epic-of/task-of),
 * not nested children — keeping the single-edge-table model intact.
 */
export interface WorkPayload {
  rank: WorkRank;
  category?: WorkCategory;
}

/** Resolve the display label for a rank under a given view mode. */
export function rankLabel(rank: WorkRank, mode: ViewMode): string {
  return mode === "narrative" ? RANK_TO_NARRATIVE[rank] : rank;
}
