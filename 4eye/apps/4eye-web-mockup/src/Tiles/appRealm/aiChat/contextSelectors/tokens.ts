/**
 * Per-context accents for the ContextBar tabs and their dropdown panels.
 *
 * These live outside both the bar and the panels because each imports the
 * other's neighbourhood — the bar renders the panels, and the panels need the
 * same tint for their own selected states.
 */

/** Goals — blue. */
export const GOALS_ACCENT = "#3b82f6";
/** Projects — purple. */
export const PROJECTS_ACCENT = "#a855f7";
/** Acting as — amber. */
export const ACTING_AS_ACCENT = "#fb923c";
/** Inner mark on vision/goal silhouettes — gray so it reads against the colored outline. */
export const GOAL_CENTER_MARK = "#94a3b8";
