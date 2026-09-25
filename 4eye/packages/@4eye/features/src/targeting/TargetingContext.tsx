"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import {
  TARGET_ROLES,
  type Target,
  type TargetAssignment,
  type TargetRole,
  type TargetingState,
} from "@4eye/types";
import { useContextData } from "../context-data";
import {
  initialTargetingState,
  targetingReducer,
} from "./targetingReducer";
import { localStorageAdapter } from "./storage";

const generateId = () => Math.random().toString(36).slice(2, 9);

interface TargetingContextValue {
  state: TargetingState;
  /** Resolved actor assignments paired with their Target entity. */
  resolvedActors: Array<{ assignment: TargetAssignment; target: Target }>;
  /** Resolved aim assignments — the primary cursor of the prompt. */
  resolvedTargets: Array<{ assignment: TargetAssignment; target: Target }>;
  totalAssigned: number;
  addAssignment: (role: TargetRole, targetId: string) => string;
  removeAssignment: (role: TargetRole, assignmentId: string) => void;
  /**
   * Toggle a Target's assignment to a role by entity id (no need to
   * look up the assignment id). If already assigned, removes the
   * first matching assignment; otherwise adds a new one.
   */
  toggleAssignment: (role: TargetRole, targetId: string) => void;
  clearRole: (role: TargetRole) => void;
  clearAll: () => void;
  isAssigned: (role: TargetRole, targetId: string) => boolean;
}

const TargetingContext = createContext<TargetingContextValue | undefined>(
  undefined,
);

export function TargetingProvider({ children }: { children: ReactNode }) {
  const { targets } = useContextData();
  const [state, dispatch] = useReducer(targetingReducer, initialTargetingState);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    const saved = localStorageAdapter.load();
    if (saved) dispatch({ type: "HYDRATE", state: saved });
  }, []);

  // Persist on every change.
  useEffect(() => {
    localStorageAdapter.save(state);
  }, [state]);

  const addAssignment = useCallback(
    (role: TargetRole, targetId: string) => {
      const assignment: TargetAssignment = {
        id: generateId(),
        role,
        targetId,
        createdAt: Date.now(),
      };
      dispatch({ type: "ADD", role, assignment });
      return assignment.id;
    },
    [],
  );

  const removeAssignment = useCallback(
    (role: TargetRole, assignmentId: string) => {
      dispatch({ type: "REMOVE", role, assignmentId });
    },
    [],
  );

  const clearRole = useCallback((role: TargetRole) => {
    dispatch({ type: "CLEAR", role });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const isAssigned = useCallback(
    (role: TargetRole, targetId: string) => {
      const bucket = role === "actor" ? state.actors : state.targets;
      return bucket.some((a) => a.targetId === targetId);
    },
    [state.actors, state.targets],
  );

  const toggleAssignment = useCallback(
    (role: TargetRole, targetId: string) => {
      const bucket = role === "actor" ? state.actors : state.targets;
      const existing = bucket.find((a) => a.targetId === targetId);
      if (existing) {
        dispatch({ type: "REMOVE", role, assignmentId: existing.id });
      } else {
        const assignment: TargetAssignment = {
          id: generateId(),
          role,
          targetId,
          createdAt: Date.now(),
        };
        dispatch({ type: "ADD", role, assignment });
      }
    },
    [state.actors, state.targets],
  );

  const resolve = useCallback(
    (assignments: TargetAssignment[]) =>
      assignments
        .map((assignment) => {
          const target = targets.find((t) => t.id === assignment.targetId);
          return target ? { assignment, target } : null;
        })
        .filter(
          (x): x is { assignment: TargetAssignment; target: Target } =>
            x !== null,
        ),
    [targets],
  );

  const resolvedActors = useMemo(
    () => resolve(state.actors),
    [resolve, state.actors],
  );
  const resolvedTargets = useMemo(
    () => resolve(state.targets),
    [resolve, state.targets],
  );

  const totalAssigned = state.actors.length + state.targets.length;

  const value = useMemo<TargetingContextValue>(
    () => ({
      state,
      resolvedActors,
      resolvedTargets,
      totalAssigned,
      addAssignment,
      removeAssignment,
      toggleAssignment,
      clearRole,
      clearAll,
      isAssigned,
    }),
    [
      state,
      resolvedActors,
      resolvedTargets,
      totalAssigned,
      addAssignment,
      removeAssignment,
      toggleAssignment,
      clearRole,
      clearAll,
      isAssigned,
    ],
  );

  return (
    <TargetingContext.Provider value={value}>
      {children}
    </TargetingContext.Provider>
  );
}

export function useTargeting(): TargetingContextValue {
  const ctx = useContext(TargetingContext);
  if (!ctx)
    throw new Error("useTargeting must be used within TargetingProvider");
  return ctx;
}

// Re-export role iteration helper for consumers.
export { TARGET_ROLES };
