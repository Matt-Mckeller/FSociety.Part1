/**
 * Planning — TileSpec (Entity Tile system)
 *
 * Pipeline:  Entity (+traits) → toTileJSON(entity, viewMode) → TileSpec (JSON)
 *            → <TileRenderer> → one of N registered display components.
 *
 * A TileSpec is pure, serializable DATA describing *what* to show. It is never
 * executable code, which makes it storable, server-sendable, and safe to
 * AI-generate (the "generated" tile type is a data-only TileSpec — no eval,
 * no injected components). Display components are pre-built and chosen by
 * `type` via the component registry.
 */

import type { ViewMode } from "./work";

/**
 * Built-in tile types. Each maps to a registered display component.
 * `variant:*` strings allow registered variations without new plumbing.
 */
export type TileType =
  | "summary" // compact HUD card
  | "detail" // full Inspector/Focus body
  | "metric" // WeightMeter / DepthDots / StatusBadge
  | "list" // child-entity list (epics/tasks)
  | "graph" // relationship / timeline view
  | "generated" // prompt-generated, DATA-ONLY spec
  | (`variant:${string}` & {});

/** How a value should be presented inside a slot. */
export type SlotRender =
  | "text"
  | "badge"
  | "meter" // 0..100
  | "dots" // 1..7
  | "date"
  | "symbol"
  | "link";

/** A single field/section within a tile. */
export interface TileSlot {
  key: string;
  label?: string;
  /** Primitive, serializable value. */
  value?: string | number | boolean | null;
  render?: SlotRender;
  /** Optional entity ref this slot links to (for "link"/"symbol"). */
  refId?: string;
}

/** A declarative action surfaced on the tile (resolved by the host, not code). */
export interface TileAction {
  id: string;
  label: string;
  /** Semantic action id the host knows how to handle, e.g. "inspect". */
  intent: string;
  symbol?: string;
}

/**
 * Serializable description of a tile. No React, no functions.
 */
export interface TileSpec {
  /** Display component selector. */
  type: TileType;
  /** Entity this tile represents. */
  entityId: string;
  entityType: string;
  /** PM vs narrative skin. */
  viewMode: ViewMode;
  title?: string;
  symbol?: string;
  /** Symbol color key (resolved to a hex by the renderer). */
  symbolColor?: string;
  layout?: "card" | "row" | "panel" | "modal";
  slots: TileSlot[];
  actions?: TileAction[];
  /** For type "list": child tile specs. */
  children?: TileSpec[];
  /**
   * For type "generated": the prompt that produced this spec (provenance).
   * The OUTPUT is always this data structure — never executable code.
   */
  generatedFrom?: string;
  meta?: Record<string, unknown>;
}
