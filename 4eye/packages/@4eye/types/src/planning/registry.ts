/**
 * Planning — Entity type registry
 *
 * Per-type config: what each EntityType looks like and is allowed to do.
 * This is the "config settings for what types can do" — the registry, NOT
 * subclasses. Feature/UI code resolves layout/permissions/actions from here.
 */

import type { EntityType } from "./entity";
import type { SymbolName, SymbolColor } from "../symbols";
import type { TraitKind } from "./trait";
import type { TileType } from "./tile";

/** What an entity type may do / where it may appear. */
export interface EntityTypeConfig {
  type: EntityType;
  label: string;
  /** Plain-language description (clarity over evocative game labels). */
  description: string;
  symbol?: SymbolName;
  symbolColor?: SymbolColor;
  /** Traits this type is expected to carry. */
  defaultTraits: TraitKind[];
  /** Default tile type for quick render. */
  defaultTile: TileType;
  /** Tile types this entity supports. */
  tiles: TileType[];
  /** Semantic action intents available, e.g. "inspect", "send-to-chat". */
  actions: string[];
  /** May this type appear on the action bar? */
  canPlaceOnActionBar?: boolean;
}

export type EntityRegistry = Record<string, EntityTypeConfig>;
