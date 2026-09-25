"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Preset, PresetMeta } from "@4eye/types";
import type { SymbolColor, SymbolName } from "@4eye/types";
import type { SelectedContext } from "@4eye/types";

// ---------------------------------------------------------------------------
// State & reducer
// ---------------------------------------------------------------------------

export interface PresetsState {
  presets: Preset[];
  /**
   * When set, the UI should show the Apply Preset dialog offering
   * Replace / Merge. Set by `requestApplyPreset`, cleared on confirm/dismiss.
   */
  pendingApplyId: string | null;
}

type PresetsAction =
  | { type: "SAVE"; preset: Preset }
  | { type: "DELETE"; id: string }
  | { type: "UPDATE"; id: string; patch: Partial<Omit<Preset, "id" | "createdAt">> }
  | { type: "REQUEST_APPLY"; id: string }
  | { type: "CLEAR_PENDING" };

const STORAGE_KEY = "4eye-presets-v1";
const isBrowser = typeof window !== "undefined";

function loadPresets(): Preset[] {
  if (!isBrowser) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Preset[]) : [];
  } catch {
    return [];
  }
}

function savePresets(presets: Preset[]) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  } catch {
    // ignore quota / serialization failure
  }
}

function presetsReducer(state: PresetsState, action: PresetsAction): PresetsState {
  switch (action.type) {
    case "SAVE": {
      const next = [action.preset, ...state.presets];
      savePresets(next);
      return { ...state, presets: next };
    }
    case "DELETE": {
      const next = state.presets.filter((p) => p.id !== action.id);
      savePresets(next);
      return { ...state, presets: next };
    }
    case "UPDATE": {
      const next = state.presets.map((p) =>
        p.id === action.id ? { ...p, ...action.patch } : p,
      );
      savePresets(next);
      return { ...state, presets: next };
    }
    case "REQUEST_APPLY":
      return { ...state, pendingApplyId: action.id };
    case "CLEAR_PENDING":
      return { ...state, pendingApplyId: null };
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export interface PresetsContextValue {
  presets: Preset[];
  pendingApplyId: string | null;
  /**
   * Save the provided context snapshot as a new preset. Returns the id
   * of the newly created preset.
   */
  savePreset(args: {
    name: string;
    symbol: SymbolName;
    symbolColor: SymbolColor;
    symbolVariant?: import("@4eye/types").PresetSymbolVariant;
    symbolSatellites?: import("@4eye/types").PresetSatellite[];
    recipe: SelectedContext;
    meta: PresetMeta;
  }): string;
  /**
   * Stage a preset for application. Opens the Apply Preset dialog
   * (Replace vs Merge) rather than applying immediately.
   */
  requestApplyPreset(id: string): void;
  /** Dismiss the pending apply dialog without making changes. */
  dismissApply(): void;
  deletePreset(id: string): void;
  updatePreset(id: string, patch: Partial<Omit<Preset, "id" | "createdAt">>): void;
  getPresetById(id: string): Preset | undefined;
}

const PresetsContext = createContext<PresetsContextValue | undefined>(undefined);

export function PresetsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(presetsReducer, undefined, () => ({
    presets: loadPresets(),
    pendingApplyId: null,
  }));

  const savePreset = useCallback(
    (args: {
      name: string;
      symbol: SymbolName;
      symbolColor: SymbolColor;
      symbolVariant?: import("@4eye/types").PresetSymbolVariant;
      symbolSatellites?: import("@4eye/types").PresetSatellite[];
      recipe: SelectedContext;
      meta: PresetMeta;
    }): string => {
      const id = Math.random().toString(36).slice(2, 9);
      const preset: Preset = {
        id,
        name: args.name,
        symbol: args.symbol,
        symbolColor: args.symbolColor,
        symbolVariant: args.symbolVariant,
        symbolSatellites: args.symbolSatellites,
        recipe: args.recipe,
        meta: args.meta,
        createdAt: Date.now(),
      };
      dispatch({ type: "SAVE", preset });
      return id;
    },
    [],
  );

  const requestApplyPreset = useCallback(
    (id: string) => dispatch({ type: "REQUEST_APPLY", id }),
    [],
  );

  const dismissApply = useCallback(
    () => dispatch({ type: "CLEAR_PENDING" }),
    [],
  );

  const deletePreset = useCallback(
    (id: string) => dispatch({ type: "DELETE", id }),
    [],
  );

  const updatePreset = useCallback(
    (id: string, patch: Partial<Omit<Preset, "id" | "createdAt">>) =>
      dispatch({ type: "UPDATE", id, patch }),
    [],
  );

  const getPresetById = useCallback(
    (id: string) => state.presets.find((p) => p.id === id),
    [state.presets],
  );

  const value = useMemo<PresetsContextValue>(
    () => ({
      presets: state.presets,
      pendingApplyId: state.pendingApplyId,
      savePreset,
      requestApplyPreset,
      dismissApply,
      deletePreset,
      updatePreset,
      getPresetById,
    }),
    [state, savePreset, requestApplyPreset, dismissApply, deletePreset, updatePreset, getPresetById],
  );

  return (
    <PresetsContext.Provider value={value}>{children}</PresetsContext.Provider>
  );
}

export function usePresets(): PresetsContextValue {
  const ctx = useContext(PresetsContext);
  if (!ctx) throw new Error("usePresets must be used within PresetsProvider");
  return ctx;
}
