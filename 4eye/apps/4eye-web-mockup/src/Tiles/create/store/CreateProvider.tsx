"use client";

/**
 * CreateProvider — React Context + useReducer (per state-mgmt convention;
 * no Redux/zustand). Owns declarative seeding state and exposes selectors.
 *
 * Mirrors the existing QuestsProvider pattern. Goal inheritance is computed
 * read-time via the pure resolver, never stored.
 */

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import { getEffectiveGoals, getSequenceGoals } from "../model/resolver";
import type {
  ChangeEvent,
  ChangeKind,
  Entity,
  Goal,
  GoalLink,
  Project,
  ResolvedGoalLink,
  Scene,
  Sequence,
  Seed,
  SeedStatus,
} from "../model/types";
import { initialCreateState } from "./SeedStore";

export interface CreateState {
  projects: Project[];
  sequences: Sequence[];
  scenes: Scene[];
  goals: Goal[];
  seeds: Seed[];
  goalLinks: GoalLink[];
  selectedProjectId?: string;
  selectedSequenceId?: string;
  selectedSceneId?: string;
}

export type CreateAction =
  | { kind: "select-project"; id: string }
  | { kind: "select-sequence"; id: string }
  | { kind: "select-scene"; id: string }
  | { kind: "edit-prompt"; sceneId: string; index: number; body: string }
  | {
      kind: "link-goal";
      goalId: string;
      toId: string;
      toType: "scene" | "sequence";
      weight: number;
      depth: number;
      instructions?: string;
    }
  | { kind: "unlink-goal"; goalId: string; toId: string }
  | { kind: "promote"; id: string; to: SeedStatus }
  | {
      /** Record a (optionally goal-directed) action onto an entity's history. */
      kind: "act";
      id: string;
      action: ChangeKind;
      summary: string;
      goalId?: string;
    };

/** Append a {@link ChangeEvent} to an entity and bump its version. */
function recordChange<T extends Entity>(
  entity: T,
  event: Omit<ChangeEvent, "id" | "at">,
): T {
  const change: ChangeEvent = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `chg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: new Date().toISOString(),
    ...event,
  };
  return {
    ...entity,
    version: (entity.version ?? 1) + 1,
    history: [...(entity.history ?? []), change],
  };
}

function reducer(state: CreateState, action: CreateAction): CreateState {
  switch (action.kind) {
    case "select-project":
      return { ...state, selectedProjectId: action.id };
    case "select-sequence":
      return { ...state, selectedSequenceId: action.id };
    case "select-scene":
      return { ...state, selectedSceneId: action.id };
    case "edit-prompt":
      return {
        ...state,
        scenes: state.scenes.map((s) =>
          s.id === action.sceneId
            ? {
                ...s,
                promptScripts: s.promptScripts.map((p, i) =>
                  i === action.index ? action.body : p,
                ),
              }
            : s,
        ),
      };
    case "link-goal": {
      const exists = state.goalLinks.some(
        (l) => l.goalId === action.goalId && l.toId === action.toId,
      );
      const next = exists
        ? state.goalLinks.map((l) =>
            l.goalId === action.goalId && l.toId === action.toId
              ? {
                  ...l,
                  weight: action.weight,
                  depth: action.depth,
                  ...(action.instructions !== undefined
                    ? { instructions: action.instructions }
                    : {}),
                }
              : l,
          )
        : [
            ...state.goalLinks,
            {
              goalId: action.goalId,
              toId: action.toId,
              toType: action.toType,
              weight: action.weight,
              depth: action.depth,
              instructions: action.instructions,
            },
          ];
      return { ...state, goalLinks: next };
    }
    case "unlink-goal":
      return {
        ...state,
        goalLinks: state.goalLinks.filter(
          (l) => !(l.goalId === action.goalId && l.toId === action.toId),
        ),
      };
    case "promote": {
      const promote = <T extends Sequence | Scene>(s: T): T =>
        s.id === action.id
          ? recordChange({ ...s, status: action.to }, {
              actor: "you",
              kind: "promoted",
              summary: `Promoted ${s.status} → ${action.to}`,
              fromStatus: s.status,
              toStatus: action.to,
            })
          : s;
      return {
        ...state,
        sequences: state.sequences.map(promote),
        scenes: state.scenes.map(promote),
      };
    }
    case "act": {
      const apply = <T extends Sequence | Scene>(s: T): T =>
        s.id === action.id
          ? recordChange(s, {
              actor: "you",
              kind: action.action,
              summary: action.summary,
              ...(action.goalId ? { goalId: action.goalId } : {}),
            })
          : s;
      return {
        ...state,
        sequences: state.sequences.map(apply),
        scenes: state.scenes.map(apply),
      };
    }
    default:
      return state;
  }
}

interface CreateContextValue {
  state: CreateState;
  dispatch: (action: CreateAction) => void;
  // selectors
  selectedProject?: Project;
  sequencesForProject: Sequence[];
  selectedSequence?: Sequence;
  scenesForSelected: Scene[];
  selectedScene?: Scene;
  effectiveGoals: ResolvedGoalLink[];
  sequenceGoals: ResolvedGoalLink[];
}

const CreateContext = createContext<CreateContextValue | null>(null);

export function CreateProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: CreateState;
}) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState ?? initialCreateState(),
  );

  const value = useMemo<CreateContextValue>(() => {
    const selectedProject = state.projects.find(
      (p) => p.id === state.selectedProjectId,
    );
    const sequencesForProject = selectedProject
      ? selectedProject.sequenceIds
          .map((id) => state.sequences.find((sq) => sq.id === id))
          .filter((sq): sq is Sequence => Boolean(sq))
      : state.sequences;
    const selectedSequence = state.sequences.find(
      (s) => s.id === state.selectedSequenceId,
    );
    const scenesForSelected = selectedSequence
      ? selectedSequence.sceneIds
          .map((id) => state.scenes.find((sc) => sc.id === id))
          .filter((sc): sc is Scene => Boolean(sc))
      : [];
    const selectedScene = state.scenes.find(
      (s) => s.id === state.selectedSceneId,
    );
    const effectiveGoals = selectedScene
      ? getEffectiveGoals(selectedScene, state.goalLinks, state.goals)
      : [];
    const sequenceGoals = selectedSequence
      ? getSequenceGoals(selectedSequence.id, state.goalLinks, state.goals)
      : [];

    return {
      state,
      dispatch,
      selectedProject,
      sequencesForProject,
      selectedSequence,
      scenesForSelected,
      selectedScene,
      effectiveGoals,
      sequenceGoals,
    };
  }, [state]);

  return (
    <CreateContext.Provider value={value}>{children}</CreateContext.Provider>
  );
}

export function useCreate(): CreateContextValue {
  const ctx = useContext(CreateContext);
  if (!ctx) throw new Error("useCreate must be used within a CreateProvider");
  return ctx;
}
