import type { SymbolColor, SymbolName } from "../symbols";
import type { SelectedContext } from "../context/selectedContext";

/**
 * Layout variant for the preset's complex visual symbol.
 * Matches `PresetVariant` from `@4eye/features`.
 */
export type PresetSymbolVariant =
  | "ring"
  | "rosette"
  | "stack"
  | "orbit"
  | "mosaic"
  | "monogram";

/** A secondary symbol used in rosette / orbit / mosaic / stack variants. */
export interface PresetSatellite {
  symbol: SymbolName;
  symbolColor: SymbolColor;
}

/**
 * Snapshot of optional non-entity context that can be captured by a
 * Preset. Each field is optional so older presets created before a
 * given dimension existed remain forward-compatible.
 */
export interface PresetMeta {
  /** Currently selected Domain id (single-select). */
  domainId?: string | null;
  /** Active Goal ids (multi-select up to 3). */
  goalIds?: string[];
  /** Active Project id (single-select). */
  projectId?: string | null;
  /**
   * AI Settings snapshot — opaque key/value bag matching whatever the
   * AISettingsPanel currently emits. Kept loose so the panel can
   * evolve without churning the Preset shape.
   */
  aiSettings?: Record<string, unknown>;
}

/**
 * Preset — a saved recipe of context selections that can be applied
 * (replace or merge) back into the current AI Chat session in one tap.
 *
 * A Preset captures:
 *  - all entity selections (`SelectedContext`, includes pipelines)
 *  - active Domain / Goals / Project
 *  - an AI Settings snapshot
 *
 * Each preset has its own complex visual symbol (icon + color) so the
 * user can recognise it at a glance in the Presets nav grid panel.
 */
export interface Preset {
  id: string;
  name: string;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  /**
   * Visual layout variant for the preset's complex symbol.
   * Defaults to "ring" if absent (backward-compat).
   */
  symbolVariant?: PresetSymbolVariant;
  /**
   * Secondary entity symbols used in rosette / orbit / mosaic / stack
   * variants. Omitted for ring and monogram.
   */
  symbolSatellites?: PresetSatellite[];
  /** Entity-level selection snapshot. */
  recipe: SelectedContext;
  /** Non-entity context snapshot (domain / goals / project / ai). */
  meta: PresetMeta;
  createdAt: number;
}
