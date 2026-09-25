"use client";

/**
 * Spellbook store — Context + useReducer (mirrors InventoryProvider).
 *
 * Owns the spell registry plus browse state: search, lane filter, sort,
 * favorites, the active preset (including virtual For you), and which spell is
 * expanded. Casting records lastCast + a short feedback hint for Equip / Bind.
 */

import * as React from "react";

import { useLoadoutOptional, type BindingTemplateId } from "@4eye/web/components/loadout";
import { useCharacterOptional } from "@4eye/web/Tiles/character/store/CharacterProvider";

import type { Spell, SpellbookData, SpellSort } from "../model/types";
import {
  BINDING_TO_PRESET,
  FOR_YOU_PRESET_ID,
  PRESET_TO_BINDING,
  PRIMARY_SPELL_IDS,
  spellLane,
  spellWeight,
  type SpellLane,
} from "../model/lanes";
import { SPELLBOOK_SEED } from "./seed-data";

export type { SpellLane };

export interface SpellbookState extends SpellbookData {
  search: string;
  /** Display lane filter — preferred over raw category. */
  lane: SpellLane | "all";
  sort: SpellSort;
  favoritesOnly: boolean;
  /** Active preset id, {@link FOR_YOU_PRESET_ID}, or null for the full library. */
  activePresetId: string | null;
  /** Split "always-available" vs "contextual" — advanced, off by default. */
  splitMode: boolean;
  expandedId: string | null;
  lastCastId: string | null;
  /** Short line after cast — e.g. equip / bind hint. */
  castHint: string | null;
}

export type SpellbookAction =
  | { type: "set-search"; search: string }
  | { type: "set-lane"; lane: SpellLane | "all" }
  | { type: "set-sort"; sort: SpellSort }
  | { type: "toggle-favorites-only" }
  | { type: "toggle-favorite"; id: string }
  | { type: "apply-preset"; id: string }
  | { type: "clear-preset" }
  | { type: "toggle-split" }
  | { type: "expand"; id: string | null }
  | { type: "cast"; id: string; hint?: string | null }
  | { type: "clear-cast-hint" };

function reducer(state: SpellbookState, action: SpellbookAction): SpellbookState {
  switch (action.type) {
    case "set-search":
      return { ...state, search: action.search };
    case "set-lane":
      return { ...state, lane: action.lane };
    case "set-sort":
      return { ...state, sort: action.sort };
    case "toggle-favorites-only":
      return { ...state, favoritesOnly: !state.favoritesOnly };
    case "toggle-favorite":
      return {
        ...state,
        spells: state.spells.map((s) =>
          s.id === action.id ? { ...s, favorite: !s.favorite } : s,
        ),
      };
    case "apply-preset":
      if (action.id === FOR_YOU_PRESET_ID) {
        return { ...state, activePresetId: FOR_YOU_PRESET_ID, lane: "all" };
      }
      return state.presets.some((p) => p.id === action.id)
        ? { ...state, activePresetId: action.id, lane: "all" }
        : state;
    case "clear-preset":
      return { ...state, activePresetId: null };
    case "toggle-split":
      return { ...state, splitMode: !state.splitMode };
    case "expand":
      return { ...state, expandedId: action.id };
    case "cast":
      return {
        ...state,
        lastCastId: action.id,
        castHint: action.hint ?? "Equip it on your character, or Save to a bar.",
      };
    case "clear-cast-hint":
      return { ...state, castHint: null };
    default:
      return state;
  }
}

interface SpellbookContextValue {
  state: SpellbookState;
  dispatch: React.Dispatch<SpellbookAction>;
  visibleSpells: Spell[];
  lastCast: Spell | null;
  /** Equipped spell ids when Character is mounted. */
  equippedIds: Set<string>;
}

const SpellbookContext = React.createContext<SpellbookContextValue | null>(null);

const LANE_RANK: Record<SpellLane, number> = {
  primary: 0,
  learn: 1,
  love: 2,
  play: 3,
  power: 4,
  create: 5,
  utility: 6,
};

export interface SpellbookProviderProps {
  children: React.ReactNode;
  data?: SpellbookData;
  /** Defaults to For you home. Pass `null` for All, or a preset id. */
  initialPresetId?: string | null;
  initialSplit?: boolean;
}

export function SpellbookProvider({
  children,
  data = SPELLBOOK_SEED,
  initialPresetId = FOR_YOU_PRESET_ID,
  initialSplit = false,
}: SpellbookProviderProps) {
  const character = useCharacterOptional();
  const loadout = useLoadoutOptional();

  const [state, dispatch] = React.useReducer(reducer, undefined, () => ({
    ...data,
    search: "",
    lane: "all" as const,
    sort: "recommended" as SpellSort,
    favoritesOnly: false,
    activePresetId: initialPresetId,
    splitMode: initialSplit,
    expandedId: null,
    lastCastId: null,
    castHint: null,
  }));

  const equippedIds = React.useMemo(
    () => new Set(character?.character.equippedSpells.map((e) => e.spellId) ?? []),
    [character?.character.equippedSpells],
  );

  // Two-way sync: Bindings rose → Spellbook preset (skip For you / secondary-only).
  const bindingId = loadout?.state.activeBindingTemplateId;
  const lastSyncedBinding = React.useRef<string | undefined>(undefined);
  React.useEffect(() => {
    if (!bindingId || bindingId === lastSyncedBinding.current) return;
    lastSyncedBinding.current = bindingId;
    const presetId = BINDING_TO_PRESET[bindingId];
    if (presetId && state.activePresetId !== presetId && state.activePresetId !== FOR_YOU_PRESET_ID) {
      dispatch({ type: "apply-preset", id: presetId });
    }
    // Only react to binding changes, not preset echo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bindingId]);

  // Spellbook mode preset → Bindings rose.
  const applyPresetWithSync = React.useCallback(
    (id: string) => {
      dispatch({ type: "apply-preset", id });
      const templateId = PRESET_TO_BINDING[id] as BindingTemplateId | undefined;
      if (templateId && loadout) {
        lastSyncedBinding.current = templateId;
        loadout.dispatch({ type: "apply-binding-template", templateId });
      }
    },
    [loadout],
  );

  const visibleSpells = React.useMemo(() => {
    const q = state.search.trim().toLowerCase();
    const preset =
      state.activePresetId && state.activePresetId !== FOR_YOU_PRESET_ID
        ? state.presets.find((p) => p.id === state.activePresetId)
        : null;
    const presetIds = preset ? new Set(preset.spellIds) : null;

    let list = state.spells.filter((s) => {
      if (state.activePresetId === FOR_YOU_PRESET_ID) {
        const inForYou =
          equippedIds.has(s.id) ||
          PRIMARY_SPELL_IDS.has(s.id) ||
          Boolean(s.favorite) ||
          spellWeight(s) >= 85;
        if (!inForYou) return false;
      } else if (presetIds && !presetIds.has(s.id)) {
        return false;
      }
      if (state.lane !== "all" && spellLane(s) !== state.lane) return false;
      if (state.favoritesOnly && !s.favorite) return false;
      if (q && !`${s.name} ${s.shortDescription}`.toLowerCase().includes(q)) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (state.sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
        case "lane":
          return (
            LANE_RANK[spellLane(a)] - LANE_RANK[spellLane(b)] ||
            spellWeight(b) - spellWeight(a) ||
            a.name.localeCompare(b.name)
          );
        case "recommended":
        default:
          return (
            Number(equippedIds.has(b.id)) - Number(equippedIds.has(a.id)) ||
            Number(PRIMARY_SPELL_IDS.has(b.id)) - Number(PRIMARY_SPELL_IDS.has(a.id)) ||
            Number(b.favorite ?? false) - Number(a.favorite ?? false) ||
            spellWeight(b) - spellWeight(a) ||
            Number(b.alwaysAvailable) - Number(a.alwaysAvailable) ||
            a.name.localeCompare(b.name)
          );
      }
    });
    return list;
  }, [
    state.spells,
    state.presets,
    state.activePresetId,
    state.lane,
    state.favoritesOnly,
    state.search,
    state.sort,
    equippedIds,
  ]);

  const lastCast = React.useMemo(
    () => state.spells.find((s) => s.id === state.lastCastId) ?? null,
    [state.spells, state.lastCastId],
  );

  const dispatchWrapped = React.useCallback(
    (action: SpellbookAction) => {
      if (action.type === "apply-preset") {
        applyPresetWithSync(action.id);
        return;
      }
      dispatch(action);
    },
    [applyPresetWithSync],
  );

  const value = React.useMemo(
    () => ({ state, dispatch: dispatchWrapped, visibleSpells, lastCast, equippedIds }),
    [state, dispatchWrapped, visibleSpells, lastCast, equippedIds],
  );

  return (
    <SpellbookContext.Provider value={value}>
      {children}
    </SpellbookContext.Provider>
  );
}

export function useSpellbook(): SpellbookContextValue {
  const ctx = React.useContext(SpellbookContext);
  if (!ctx) {
    throw new Error("useSpellbook must be used within a SpellbookProvider");
  }
  return ctx;
}
