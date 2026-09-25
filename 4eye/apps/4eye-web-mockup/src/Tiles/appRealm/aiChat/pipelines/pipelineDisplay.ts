/**
 * Pipeline pill display types — same idea as the workbench dock width
 * cycle (`rail` / `dock` / `wide`): several treatments ship because the
 * right silhouette is easier to judge live than to pick in a document.
 *
 * `auto` is the smart default: compact (square, matches Spellbook) until
 * two layers are seated, then the tall stacked-tile pill.
 */

export const PIPELINE_DISPLAYS = ["auto", "stack", "compact", "flow"] as const;

export type PipelineDisplay = (typeof PIPELINE_DISPLAYS)[number];

export type ResolvedPipelineDisplay = Exclude<PipelineDisplay, "auto">;

export const PIPELINE_DISPLAY_HINT: Record<PipelineDisplay, string> = {
  auto: "Smart — square until two layers, then the tile stack",
  stack: "Tall pill of gradient tiles",
  compact: "Square — matches Spellbook and Game",
  flow: "Tiles colored by the active layers",
};

export function resolvePipelineDisplay(
  display: PipelineDisplay,
  activeCount: number,
): ResolvedPipelineDisplay {
  if (display === "auto") return activeCount >= 2 ? "stack" : "compact";
  return display;
}
