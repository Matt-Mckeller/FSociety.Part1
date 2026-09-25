/**
 * The workbench's two display choices.
 *
 * Which arrangement is right here is a judgement about how a transcript, a
 * session panel and five context panels sit together at a real width, and that
 * is much easier to make by looking than by arguing — the same reason the
 * profile page ships three `RAIL_LAYOUTS` behind a toggle rather than picking
 * one in a document. So all three ship, `stack` is the surface as it was, and
 * the choice persists per-user.
 */

export type WorkbenchLayout = "dock" | "split" | "stack";

export const WORKBENCH_LAYOUTS: WorkbenchLayout[] = ["dock", "split", "stack"];

export const WORKBENCH_LAYOUT_HINT: Record<WorkbenchLayout, string> = {
  dock:
    "One dock beside the transcript holds Learn and every context panel. Opening a panel never shortens the conversation.",
  split:
    "Learn is pinned beside the transcript; context panels open above it from the tile grid.",
  stack:
    "The original: Chat and Learn as full-width tabs, panels dropping in over the transcript.",
};

/**
 * How much of the dock is showing.
 *
 * `rail` is the minified state — the dock keeps its column but shows only what
 * can be read at a glance (see `LearningRail`). `dock` is the working width.
 * `wide` is for when the panel *is* the task: reading a plan, picking through
 * storyboards.
 */
export type DockWidth = "rail" | "dock" | "wide";

export const DOCK_WIDTHS: DockWidth[] = ["rail", "dock", "wide"];

/**
 * Fixed px for the two narrow states so the transcript's width is predictable
 * as you cycle; a percentage for `wide` so the panel scales with the viewport
 * once it is the thing you are looking at.
 */
export const DOCK_WIDTH_SIZE: Record<DockWidth, number | string> = {
  rail: 60,
  dock: 340,
  wide: "48%",
};

export const DOCK_WIDTH_HINT: Record<DockWidth, string> = {
  rail: "Minified — session metrics only",
  dock: "Working width",
  wide: "Wide — the panel is the task",
};
