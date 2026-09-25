"use client";

/** Inventory store — Context + useReducer (mirrors ProfileProvider). */

import * as React from "react";

import type {
  InventoryData,
  InventoryItem,
  ItemCategory,
  SortKey,
} from "../model/types";
import { RARITY_ORDER } from "../model/types";
import { INVENTORY_SEED } from "./seed-data";

export interface InventoryState extends InventoryData {
  /** Active category tab, or "all". */
  category: ItemCategory | "all";
  search: string;
  sort: SortKey;
  favoritesOnly: boolean;
  /** Currently open item detail, or null. */
  selectedId: string | null;
}

export type InventoryAction =
  | { type: "set-category"; category: ItemCategory | "all" }
  | { type: "set-search"; search: string }
  | { type: "set-sort"; sort: SortKey }
  | { type: "toggle-favorites-only" }
  | { type: "toggle-favorite"; id: string }
  | { type: "select"; id: string | null };

function reducer(state: InventoryState, action: InventoryAction): InventoryState {
  switch (action.type) {
    case "set-category":
      return { ...state, category: action.category };
    case "set-search":
      return { ...state, search: action.search };
    case "set-sort":
      return { ...state, sort: action.sort };
    case "toggle-favorites-only":
      return { ...state, favoritesOnly: !state.favoritesOnly };
    case "toggle-favorite":
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === action.id ? { ...it, favorite: !it.favorite } : it,
        ),
      };
    case "select":
      return { ...state, selectedId: action.id };
    default:
      return state;
  }
}

interface InventoryContextValue {
  state: InventoryState;
  dispatch: React.Dispatch<InventoryAction>;
  /** Items after category/search/favorite filter + sort. */
  visibleItems: InventoryItem[];
  /** The currently selected item, or null. */
  selected: InventoryItem | null;
}

const InventoryContext = React.createContext<InventoryContextValue | null>(null);

export interface InventoryProviderProps {
  children: React.ReactNode;
  data?: InventoryData;
  initialCategory?: ItemCategory | "all";
}

export function InventoryProvider({
  children,
  data = INVENTORY_SEED,
  initialCategory = "all",
}: InventoryProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, undefined, () => ({
    ...data,
    category: initialCategory,
    search: "",
    sort: "rarity" as SortKey,
    favoritesOnly: false,
    selectedId: null,
  }));

  const visibleItems = React.useMemo(() => {
    const q = state.search.trim().toLowerCase();
    let list = state.items.filter((it) => {
      if (state.category !== "all" && it.category !== state.category) return false;
      if (state.favoritesOnly && !it.favorite) return false;
      if (q && !`${it.name} ${it.description ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (state.sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return b.acquiredAt - a.acquiredAt;
        case "rarity":
        default:
          return RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity] || a.name.localeCompare(b.name);
      }
    });
    return list;
  }, [state.items, state.category, state.favoritesOnly, state.search, state.sort]);

  const selected = React.useMemo(
    () => state.items.find((it) => it.id === state.selectedId) ?? null,
    [state.items, state.selectedId],
  );

  const value = React.useMemo(
    () => ({ state, dispatch, visibleItems, selected }),
    [state, visibleItems, selected],
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventory(): InventoryContextValue {
  const ctx = React.useContext(InventoryContext);
  if (!ctx) throw new Error("useInventory must be used within an InventoryProvider");
  return ctx;
}
