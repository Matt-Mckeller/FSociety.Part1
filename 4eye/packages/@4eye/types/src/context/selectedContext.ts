/**
 * Selected Context — the bag of selected entity IDs that gets bundled
 * into a chat input prompt. Pure data structure (no React).
 */

export interface SelectedContext {
  targets: string[];
  audiences: string[];
  locations: string[];
  stories: string[];
  animations: string[];
  scenes: string[];
  sequences: string[];
  pipelines: string[];
}

export const EMPTY_SELECTED_CONTEXT: SelectedContext = {
  targets: [],
  audiences: [],
  locations: [],
  stories: [],
  animations: [],
  scenes: [],
  sequences: [],
  pipelines: [],
};

export type SelectedContextKey = keyof SelectedContext;

export const SELECTED_CONTEXT_KEYS: SelectedContextKey[] = [
  "targets",
  "audiences",
  "locations",
  "stories",
  "animations",
  "scenes",
  "sequences",
  "pipelines",
];
