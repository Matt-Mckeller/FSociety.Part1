"use client";

/**
 * Journal tile — state container.
 *
 * Context + `useReducer`, mirroring the Command Center pattern. State is the
 * entry list plus UI state (selection, filter, search, editor mode, and a
 * pending transformation preview). The entry list persists to `localStorage`
 * so notes survive reloads; seed data is used on first run.
 */

import * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type {
  ChatTurn,
  JournalData,
  JournalEntry,
  JournalKind,
  TransformResult,
} from "../model/types";
import { JOURNAL_SEED } from "./seed-data";

/** localStorage key for the persisted entry list. */
export const JOURNAL_STORAGE_KEY = "4eye:journal:v1";

export type KindFilter = "all" | JournalKind;
export type EditorMode = "write" | "preview";

interface JournalUiState {
  selectedId: string | null;
  kindFilter: KindFilter;
  search: string;
  mode: EditorMode;
  /** Pending transformation result awaiting Apply / Discard. */
  transformPreview: TransformResult | null;
}

export interface JournalState extends JournalData, JournalUiState {}

export type JournalAction =
  | { type: "create-entry"; kind: JournalKind }
  | { type: "update-entry"; id: string; patch: Partial<Pick<JournalEntry, "title" | "body" | "tags" | "pinned">> }
  | { type: "delete-entry"; id: string }
  | { type: "select-entry"; id: string | null }
  | { type: "set-kind-filter"; filter: KindFilter }
  | { type: "set-search"; search: string }
  | { type: "set-mode"; mode: EditorMode }
  | { type: "append-chat-turn"; id: string; turn: ChatTurn }
  | { type: "set-transform-preview"; preview: TransformResult | null }
  | { type: "apply-transform"; id: string; mode: "replace" | "append" }
  | { type: "hydrate"; entries: JournalEntry[] };

function makeId(kind: JournalKind): string {
  return `j-${kind}-${Math.random().toString(36).slice(2, 9)}`;
}

const NEW_TITLE: Record<JournalKind, string> = {
  note: "Untitled note",
  journal: "Journal entry",
  "ai-chat": "New AI chat",
};

function touch(entry: JournalEntry, patch: Partial<JournalEntry>): JournalEntry {
  return { ...entry, ...patch, updatedAt: Date.now() };
}

function journalReducer(state: JournalState, action: JournalAction): JournalState {
  switch (action.type) {
    case "hydrate":
      return { ...state, entries: action.entries };

    case "create-entry": {
      const now = Date.now();
      const entry: JournalEntry = {
        id: makeId(action.kind),
        kind: action.kind,
        title: NEW_TITLE[action.kind],
        body: "",
        tags: [],
        chat: action.kind === "ai-chat" ? [] : undefined,
        createdAt: now,
        updatedAt: now,
      };
      return {
        ...state,
        entries: [entry, ...state.entries],
        selectedId: entry.id,
        mode: "write",
      };
    }

    case "update-entry":
      return {
        ...state,
        entries: state.entries.map((e) =>
          e.id === action.id ? touch(e, action.patch) : e,
        ),
      };

    case "delete-entry": {
      const entries = state.entries.filter((e) => e.id !== action.id);
      return {
        ...state,
        entries,
        selectedId:
          state.selectedId === action.id ? (entries[0]?.id ?? null) : state.selectedId,
      };
    }

    case "select-entry":
      return { ...state, selectedId: action.id, mode: "write", transformPreview: null };

    case "set-kind-filter":
      return { ...state, kindFilter: action.filter };

    case "set-search":
      return { ...state, search: action.search };

    case "set-mode":
      return { ...state, mode: action.mode };

    case "append-chat-turn":
      return {
        ...state,
        entries: state.entries.map((e) =>
          e.id === action.id
            ? touch(e, { chat: [...(e.chat ?? []), action.turn] })
            : e,
        ),
      };

    case "set-transform-preview":
      return { ...state, transformPreview: action.preview };

    case "apply-transform": {
      const preview = state.transformPreview;
      if (!preview) return state;
      return {
        ...state,
        transformPreview: null,
        mode: "preview",
        entries: state.entries.map((e) => {
          if (e.id !== action.id) return e;
          const body =
            action.mode === "replace"
              ? preview.output
              : `${e.body.trim()}\n\n${preview.output}`.trim();
          return touch(e, { body });
        }),
      };
    }

    default:
      return state;
  }
}

interface JournalContextValue {
  state: JournalState;
  /** Entries after kind-filter + search, pinned first then newest. */
  visibleEntries: JournalEntry[];
  /** The currently selected entry, or null. */
  selected: JournalEntry | null;
  createEntry: (kind: JournalKind) => void;
  updateEntry: (
    id: string,
    patch: Partial<Pick<JournalEntry, "title" | "body" | "tags" | "pinned">>,
  ) => void;
  deleteEntry: (id: string) => void;
  selectEntry: (id: string | null) => void;
  setKindFilter: (filter: KindFilter) => void;
  setSearch: (search: string) => void;
  setMode: (mode: EditorMode) => void;
  appendChatTurn: (id: string, turn: ChatTurn) => void;
  setTransformPreview: (preview: TransformResult | null) => void;
  applyTransform: (id: string, mode: "replace" | "append") => void;
}

const JournalContext = createContext<JournalContextValue | null>(null);

function initState(data: JournalData, initialKind?: KindFilter): JournalState {
  return {
    entries: data.entries,
    selectedId: data.entries[0]?.id ?? null,
    kindFilter: initialKind ?? "all",
    search: "",
    mode: "write",
    transformPreview: null,
  };
}

export interface JournalProviderProps {
  children: React.ReactNode;
  /** Initial entry data. Defaults to the seed. */
  data?: JournalData;
  initialKind?: KindFilter;
  /** localStorage key, or null to disable persistence (stories/tests). */
  persistKey?: string | null;
}

export function JournalProvider({
  children,
  data = JOURNAL_SEED,
  initialKind,
  persistKey = JOURNAL_STORAGE_KEY,
}: JournalProviderProps) {
  const [state, dispatch] = useReducer(journalReducer, undefined, () =>
    initState(data, initialKind),
  );

  // Hydrate from localStorage after mount (never during render / SSR).
  const hydratedRef = React.useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    if (!persistKey || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(persistKey);
      if (raw) {
        const parsed = JSON.parse(raw) as JournalEntry[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "hydrate", entries: parsed });
          dispatch({ type: "select-entry", id: parsed[0]?.id ?? null });
        }
      }
    } catch {
      /* ignore malformed storage */
    }
  }, [persistKey]);

  // Persist entry list on change (skip until after first hydrate pass).
  useEffect(() => {
    if (!persistKey || typeof window === "undefined") return;
    if (!hydratedRef.current) return;
    try {
      window.localStorage.setItem(persistKey, JSON.stringify(state.entries));
    } catch {
      /* ignore quota errors */
    }
  }, [state.entries, persistKey]);

  const value = useMemo<JournalContextValue>(() => {
    const q = state.search.trim().toLowerCase();
    const visibleEntries = state.entries
      .filter((e) => state.kindFilter === "all" || e.kind === state.kindFilter)
      .filter(
        (e) =>
          !q ||
          e.title.toLowerCase().includes(q) ||
          e.body.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .sort((a, b) => {
        if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
        return b.updatedAt - a.updatedAt;
      });

    const selected = state.entries.find((e) => e.id === state.selectedId) ?? null;

    return {
      state,
      visibleEntries,
      selected,
      createEntry: (kind) => dispatch({ type: "create-entry", kind }),
      updateEntry: (id, patch) => dispatch({ type: "update-entry", id, patch }),
      deleteEntry: (id) => dispatch({ type: "delete-entry", id }),
      selectEntry: (id) => dispatch({ type: "select-entry", id }),
      setKindFilter: (filter) => dispatch({ type: "set-kind-filter", filter }),
      setSearch: (search) => dispatch({ type: "set-search", search }),
      setMode: (mode) => dispatch({ type: "set-mode", mode }),
      appendChatTurn: (id, turn) => dispatch({ type: "append-chat-turn", id, turn }),
      setTransformPreview: (preview) => dispatch({ type: "set-transform-preview", preview }),
      applyTransform: (id, mode) => dispatch({ type: "apply-transform", id, mode }),
    };
  }, [state]);

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
}

export function useJournal(): JournalContextValue {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error("useJournal must be used within a JournalProvider");
  return ctx;
}
