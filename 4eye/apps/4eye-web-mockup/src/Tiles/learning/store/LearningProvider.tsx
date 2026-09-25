"use client";

/**
 * LearningProvider — Context + useReducer store for the Learning screen.
 *
 * Mirrors the other tile providers (no Redux/zustand). Options enforce a
 * single selection per group; the checklist supports per-item toggling and a
 * derived completion ratio.
 */

import * as React from "react";

import { LEARNING_SEED } from "./seed-data";
import {
  emptyApmSnapshot,
  rebaseSnapshot,
  recordApmChannels,
  setApmFromBand,
  type ApmCounts,
} from "../model/apm";
import {
  LEARNING_CORE_MODALITIES,
  LEARNING_MODALITY_META,
  OPT_OUTPUT_CUSTOM,
  outputNoteLabel,
  type LearningData,
  type LearningInputType,
  type LearningModality,
  type LearningSession,
  type LearningShape,
} from "../model/types";

export interface LearningState {
  session: LearningSession;
}

export type LearningAction =
  | { type: "set-input-type"; inputType: LearningInputType }
  | { type: "toggle-modality"; id: LearningModality }
  | { type: "toggle-auto-import" }
  | { type: "toggle-shape"; shape: LearningShape }
  | { type: "toggle-checklist"; id: string }
  | { type: "select-option"; id: string }
  /**
   * Tick the first unchecked step. Dispatched when a message is sent from the
   * chat, so working through a session advances it — the checklist tracks what
   * you did rather than waiting to be maintained by hand.
   */
  | { type: "complete-active-step" }
  /** Append weighted throughput events (actions, calculations, messages…). */
  | { type: "record-throughput"; channels: Partial<ApmCounts> }
  | { type: "set-output-note"; text: string }
  | { type: "save-output-note" }
  | { type: "apply-output-note"; id: string }
  | { type: "remove-output-note"; id: string };

function withThroughput(
  session: LearningSession,
  channels: Partial<ApmCounts>,
): LearningSession {
  return {
    ...session,
    throughput: recordApmChannels(session.throughput ?? emptyApmSnapshot(), channels),
  };
}

function reducer(state: LearningState, action: LearningAction): LearningState {
  switch (action.type) {
    case "set-input-type":
      return {
        session: { ...state.session, inputType: action.inputType },
      };
    case "toggle-modality": {
      const meta = LEARNING_MODALITY_META[action.id];
      const has = state.session.modalities.includes(action.id);
      // Named context chips: if auto-import is on, picking one leaves auto
      // and starts a specific user-selected set from that chip.
      if (meta.kind === "context" && state.session.autoImportContext) {
        return {
          session: {
            ...state.session,
            autoImportContext: false,
            modalities: [
              ...state.session.modalities.filter(
                (m) => LEARNING_MODALITY_META[m].kind !== "context",
              ),
              action.id,
            ],
          },
        };
      }
      return {
        session: {
          ...state.session,
          modalities: has
            ? state.session.modalities.filter((m) => m !== action.id)
            : [...state.session.modalities, action.id],
        },
      };
    }
    case "toggle-auto-import": {
      const next = !state.session.autoImportContext;
      return {
        session: {
          ...state.session,
          autoImportContext: next,
          modalities: next
            ? state.session.modalities.filter(
                (m) => LEARNING_MODALITY_META[m].kind !== "context",
              )
            : state.session.modalities,
        },
      };
    }
    case "toggle-shape": {
      const has = state.session.shapes.includes(action.shape);
      return {
        session: {
          ...state.session,
          shapes: has
            ? state.session.shapes.filter((s) => s !== action.shape)
            : [...state.session.shapes, action.shape],
        },
      };
    }
    case "toggle-checklist": {
      const item = state.session.checklist.find((c) => c.id === action.id);
      const markingDone = item ? !item.done : false;
      const session = {
        ...state.session,
        checklist: state.session.checklist.map((c) =>
          c.id === action.id ? { ...c, done: !c.done } : c,
        ),
      };
      return {
        session: markingDone ? withThroughput(session, { action: 1 }) : session,
      };
    }
    case "complete-active-step": {
      const next = state.session.checklist.find((c) => !c.done);
      if (!next) {
        return {
          session: withThroughput(state.session, {
            message: 1,
            calculation: 2,
          }),
        };
      }
      return {
        session: withThroughput(
          {
            ...state.session,
            checklist: state.session.checklist.map((c) =>
              c.id === next.id ? { ...c, done: true } : c,
            ),
          },
          { message: 1, action: 1, calculation: 3 },
        ),
      };
    }
    case "select-option": {
      const target = state.session.options.find((o) => o.id === action.id);
      if (!target) return state;
      const next: LearningSession = {
        ...state.session,
        options: state.session.options.map((o) =>
          o.group === target.group
            ? { ...o, selected: o.id === action.id }
            : o,
        ),
      };
      const rated = target.apmBand
        ? {
            ...next,
            throughput: setApmFromBand(
              next.throughput ?? emptyApmSnapshot(),
              target.apmBand,
            ),
          }
        : next;
      return { session: withThroughput(rated, { decision: 1 }) };
    }
    case "record-throughput":
      return { session: withThroughput(state.session, action.channels) };
    case "set-output-note":
      return { session: { ...state.session, outputNote: action.text } };
    case "save-output-note": {
      const text = state.session.outputNote?.trim() ?? "";
      if (!text) return state;
      const saved = state.session.savedOutputNotes ?? [];
      if (saved.some((n) => n.text === text)) return state;
      const note = {
        id: `NOTE_${Date.now().toString(36)}`,
        label: outputNoteLabel(text),
        text,
      };
      return {
        session: withThroughput(
          { ...state.session, savedOutputNotes: [...saved, note] },
          { decision: 1 },
        ),
      };
    }
    case "apply-output-note": {
      const note = (state.session.savedOutputNotes ?? []).find((n) => n.id === action.id);
      if (!note) return state;
      return {
        session: withThroughput(
          {
            ...state.session,
            outputNote: note.text,
            options: state.session.options.map((o) =>
              o.group === "output" ? { ...o, selected: o.id === OPT_OUTPUT_CUSTOM } : o,
            ),
          },
          { decision: 1 },
        ),
      };
    }
    case "remove-output-note":
      return {
        session: {
          ...state.session,
          savedOutputNotes: (state.session.savedOutputNotes ?? []).filter((n) => n.id !== action.id),
        },
      };
    default:
      return state;
  }
}

export interface LearningContextValue {
  state: LearningState;
  dispatch: React.Dispatch<LearningAction>;
  session: LearningSession;
  /** Fraction of checklist items completed (0–1); 0 when empty. */
  progress: number;
  /** Count of core learning modalities tagged on this session. */
  modalityCovered: number;
  /** Total core learning modalities available to cover. */
  modalityTotal: number;
}

const LearningContext = React.createContext<LearningContextValue | null>(null);

export function LearningProvider({
  data = LEARNING_SEED,
  children,
}: {
  data?: LearningData;
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(reducer, data, (initial) => {
    const pace = initial.session.options.find((o) => o.group === "pace" && o.selected);
    const base = initial.session.throughput
      ? rebaseSnapshot(initial.session.throughput)
      : emptyApmSnapshot();
    const throughput = pace?.apmBand
      ? setApmFromBand(base, pace.apmBand)
      : setApmFromBand(base, "fast");
    return { session: { ...initial.session, throughput } };
  });

  const value = React.useMemo<LearningContextValue>(() => {
    const { checklist, modalities } = state.session;
    const done = checklist.filter((c) => c.done).length;
    const modalityCovered = LEARNING_CORE_MODALITIES.filter((m) =>
      modalities.includes(m),
    ).length;
    return {
      state,
      dispatch,
      session: state.session,
      progress: checklist.length === 0 ? 0 : done / checklist.length,
      modalityCovered,
      modalityTotal: LEARNING_CORE_MODALITIES.length,
    };
  }, [state]);

  return (
    <LearningContext.Provider value={value}>{children}</LearningContext.Provider>
  );
}

export function useLearning(): LearningContextValue {
  const ctx = React.useContext(LearningContext);
  if (!ctx) throw new Error("useLearning must be used within a LearningProvider");
  return ctx;
}
