"use client";

/**
 * CharacterProvider — Context + useReducer for the Character tile.
 *
 * Owns the {@link CharacterData} plus screen state: the active character,
 * active emotion lens, and whether the Spellbook overlay is open.
 * Emotion.Inspect open state lives on the HUD shell (`HudState`), not here.
 */

import * as React from "react";

import type { Character, CharacterData, EquippedSpell } from "../model/types";
import { MAX_EQUIPPED_ROLES } from "../model/titles";
import { lensIdForMood } from "../model/emotions";
import { CHARACTER_STATUS_SEED } from "../model/status";
import { CHARACTER_SEED } from "./seed-data";

export interface CharacterState extends CharacterData {
  /** Whether the Spellbook overlay is open. */
  spellbookOpen: boolean;
  /**
   * Active emotion lens id (catalogue). Shared by the summary card and the
   * Inspect Emotion action so both operate on the same framing.
   */
  activeEmotionId: string;
}

export type CharacterAction =
  | { type: "set-character"; id: string }
  | { type: "toggle-role"; title: string }
  | { type: "toggle-equip-spell"; spellId: string }
  | { type: "open-spellbook" }
  | { type: "close-spellbook" }
  | { type: "set-emotion"; id: string }
  | { type: "hydrate-equipped-spells"; byCharacterId: Record<string, EquippedSpell[]> };

const MAX_EQUIPPED_SPELLS = 12;
const EQUIPPED_SPELLS_KEY = "4eye.character.equippedSpells.v1";

function readPersistedEquippedSpells(): Record<string, EquippedSpell[]> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(EQUIPPED_SPELLS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const out: Record<string, EquippedSpell[]> = {};
    for (const [id, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (!Array.isArray(value)) continue;
      const spells: EquippedSpell[] = [];
      for (const item of value) {
        if (typeof item === "string") spells.push({ spellId: item });
        else if (
          item &&
          typeof item === "object" &&
          "spellId" in item &&
          typeof (item as EquippedSpell).spellId === "string"
        ) {
          spells.push({ spellId: (item as EquippedSpell).spellId });
        }
      }
      out[id] = spells;
    }
    return out;
  } catch {
    return null;
  }
}

/** Toggle a role title on the active character, capped at MAX_EQUIPPED_ROLES. */
function toggleActiveRole(state: CharacterState, title: string): CharacterState {
  return {
    ...state,
    characters: state.characters.map((c) => {
      if (c.id !== state.activeCharacterId) return c;
      const equipped = c.titles.includes(title);
      if (equipped) return { ...c, titles: c.titles.filter((t) => t !== title) };
      if (c.titles.length >= MAX_EQUIPPED_ROLES) return c;
      return { ...c, titles: [...c.titles, title] };
    }),
  };
}

/** Toggle a spell on the active character's equipped set. */
function toggleEquipSpell(state: CharacterState, spellId: string): CharacterState {
  return {
    ...state,
    characters: state.characters.map((c) => {
      if (c.id !== state.activeCharacterId) return c;
      const has = c.equippedSpells.some((e) => e.spellId === spellId);
      if (has) {
        return { ...c, equippedSpells: c.equippedSpells.filter((e) => e.spellId !== spellId) };
      }
      if (c.equippedSpells.length >= MAX_EQUIPPED_SPELLS) return c;
      return { ...c, equippedSpells: [...c.equippedSpells, { spellId }] };
    }),
  };
}

function reducer(state: CharacterState, action: CharacterAction): CharacterState {
  switch (action.type) {
    case "set-character":
      return state.characters.some((c) => c.id === action.id)
        ? { ...state, activeCharacterId: action.id }
        : state;
    case "toggle-role":
      return toggleActiveRole(state, action.title);
    case "toggle-equip-spell":
      return toggleEquipSpell(state, action.spellId);
    case "open-spellbook":
      return { ...state, spellbookOpen: true };
    case "close-spellbook":
      return { ...state, spellbookOpen: false };
    case "set-emotion":
      return { ...state, activeEmotionId: action.id };
    case "hydrate-equipped-spells":
      return {
        ...state,
        characters: state.characters.map((c) =>
          action.byCharacterId[c.id]
            ? { ...c, equippedSpells: action.byCharacterId[c.id] }
            : c,
        ),
      };
    default:
      return state;
  }
}

interface CharacterContextValue {
  state: CharacterState;
  dispatch: React.Dispatch<CharacterAction>;
  /** The currently active character (always defined for valid data). */
  character: Character;
}

const CharacterContext = React.createContext<CharacterContextValue | null>(null);

export interface CharacterProviderProps {
  children: React.ReactNode;
  data?: CharacterData;
}

export function CharacterProvider({
  children,
  data = CHARACTER_SEED,
}: CharacterProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, undefined, () => ({
    ...data,
    spellbookOpen: false,
    activeEmotionId: lensIdForMood(CHARACTER_STATUS_SEED.mood),
  }));
  const [equipReady, setEquipReady] = React.useState(false);

  React.useEffect(() => {
    const saved = readPersistedEquippedSpells();
    if (saved) dispatch({ type: "hydrate-equipped-spells", byCharacterId: saved });
    setEquipReady(true);
  }, []);

  React.useEffect(() => {
    if (!equipReady || typeof window === "undefined") return;
    try {
      const map = Object.fromEntries(
        state.characters.map((c) => [c.id, c.equippedSpells]),
      );
      window.localStorage.setItem(EQUIPPED_SPELLS_KEY, JSON.stringify(map));
    } catch {
      // ignore
    }
  }, [equipReady, state.characters]);

  const character = React.useMemo(
    () =>
      state.characters.find((c) => c.id === state.activeCharacterId) ??
      state.characters[0],
    [state.characters, state.activeCharacterId],
  );

  const value = React.useMemo(
    () => ({ state, dispatch, character }),
    [state, character],
  );

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter(): CharacterContextValue {
  const ctx = React.useContext(CharacterContext);
  if (!ctx) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return ctx;
}

/** Soft read — null when the Spellbook (or another surface) mounts outside Character. */
export function useCharacterOptional(): CharacterContextValue | null {
  return React.useContext(CharacterContext);
}
