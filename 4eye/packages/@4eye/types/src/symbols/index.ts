/**
 * Symbol Types
 *
 * Visual symbol primitives. A `Symbol` in 4eye is a small visual
 * marker (MUI icon + color) used to identify entities (targets,
 * audiences, locations, etc.) at a glance.
 */

export type SymbolColor =
  | "red"
  | "blue"
  | "green"
  | "amber"
  | "purple"
  | "teal"
  | "pink"
  | "slate";

export const COLORS: SymbolColor[] = [
  "red",
  "blue",
  "green",
  "amber",
  "purple",
  "teal",
  "pink",
  "slate",
];

export const COLOR_MAP: Record<SymbolColor, string> = {
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#22c55e",
  amber: "#f59e0b",
  purple: "#8b5cf6",
  teal: "#14b8a6",
  pink: "#ec4899",
  slate: "#64748b",
};

/**
 * The complete set of symbol identifiers used across 4eye entities.
 * The visual implementation lives in `@4eye/features/symbols` —
 * this enum is the contract between data and UI.
 */
export type SymbolName =
  | "Star"
  | "Circle"
  | "Square"
  | "Triangle"
  | "Heart"
  | "Diamond"
  | "Moon"
  | "Sun"
  | "Lightning"
  | "Wave"
  | "Cross"
  | "Arrow"
  | "Person"
  | "Group"
  | "Place"
  | "AutoStories"
  | "Movie"
  | "Image"
  | "Pipeline"
  | "Preset"
  | "Tile";
