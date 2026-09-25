"use client";

/**
 * Inventory tile — domain model.
 *
 * UI-first per the canonical Inventory plan. Items, resources and collectibles
 * a user earns/buys/receives, organised by category with rarity, favorites and
 * a detail panel. No reward/craft/trade backend — example data only.
 */

import type { SymbolColor } from "@4eye/types";

export type { SymbolColor };

/** Top-level taxonomy (plan §2). */
export type ItemCategory =
  | "currency"
  | "equipment"
  | "collectibles"
  | "supplies";

/** Sub-type within a category, used for grouping + iconography. */
export type ItemKind =
  // currency & resources
  | "currency-earned"
  | "currency-premium"
  | "token"
  | "material"
  // equipment & items
  | "cosmetic"
  | "functional"
  | "consumable"
  | "permanent"
  // collectibles
  | "card"
  | "badge"
  | "trophy"
  | "rare"
  // supplies
  | "quest"
  | "learning"
  | "gift"
  | "mystery";

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

/** What a user can do with an item (plan §4). Shown as quick actions. */
export type ItemAction = "use" | "equip" | "trade" | "gift" | "craft" | "open" | "destroy";

export interface ItemEffect {
  id: string;
  label: string;
  value: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  kind: ItemKind;
  rarity: Rarity;
  /** Brand accent for the item glyph. */
  accent?: SymbolColor;
  /** Short description / lore. */
  description?: string;
  /** Stackable quantity (currency, materials, consumables). */
  quantity?: number;
  /** Stats / effects shown in the detail panel. */
  effects?: ItemEffect[];
  /** Where it came from (achievement, quest, store…). */
  source?: string;
  /** Curriculum tie-in subject, if any (plan §5). */
  subject?: string;
  favorite?: boolean;
  equipped?: boolean;
  /** Unopened mystery box / pack. */
  unopened?: boolean;
  /** Epoch ms acquired. */
  acquiredAt: number;
  /** Allowed actions for this item. */
  actions: ItemAction[];
}

export type SortKey = "rarity" | "date" | "name";

export interface InventoryData {
  items: InventoryItem[];
  /** Unclaimed rewards count → HUD notification chip. */
  pendingRewards: number;
  /** Storage slots used / total (plan §3 storage). */
  capacity: { used: number; total: number };
}

export interface CategoryMeta {
  label: string;
  /** MUI icon-material rounded name (without the suffix). */
  icon: string;
}

export const ITEM_CATEGORIES: ItemCategory[] = [
  "currency",
  "equipment",
  "collectibles",
  "supplies",
];

export const CATEGORY_META: Record<ItemCategory, CategoryMeta> = {
  currency: { label: "Currency & Resources", icon: "PaidRounded" },
  equipment: { label: "Equipment & Items", icon: "CheckroomRounded" },
  collectibles: { label: "Collectibles", icon: "MilitaryTechRounded" },
  supplies: { label: "Supplies", icon: "Inventory2Rounded" },
};

export const RARITY_ORDER: Record<Rarity, number> = {
  legendary: 5,
  epic: 4,
  rare: 3,
  uncommon: 2,
  common: 1,
};

export function formatQuantity(n: number): string {
  return Number.isFinite(n) ? String(n) : "∞";
}

export const RARITY_LABEL: Record<Rarity, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

export const ACTION_LABEL: Record<ItemAction, string> = {
  use: "Use",
  equip: "Equip",
  trade: "Trade",
  gift: "Gift",
  craft: "Craft",
  open: "Open",
  destroy: "Destroy",
};
