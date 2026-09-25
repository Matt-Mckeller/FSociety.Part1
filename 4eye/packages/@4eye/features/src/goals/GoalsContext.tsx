"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  MAX_SELECTED_GOALS,
  type Goal,
  type SelectedGoal,
} from "@4eye/types";
import { DEFAULT_GOALS } from "./defaults/goals";
import { useDomain } from "../domain";

const STORAGE_KEY = "4eye-selected-goals-v2";
const CUSTOM_KEY = "4eye-custom-goals-v1";

interface GoalsContextValue {
  /** All goals (default + custom + prompt), unfiltered */
  allGoals: Goal[];
  /** Catalog goals filtered by current domain (plus "default"-domain goals) */
  goals: Goal[];
  customGoals: Goal[];
  /** Typed for this prompt only — not persisted. */
  promptGoals: Goal[];
  selectedGoals: Goal[];
  selectedGoalIds: string[];
  selectGoal: (id: string) => void;
  deselectGoal: (id: string) => void;
  toggleGoal: (id: string) => void;
  clearSelectedGoals: () => void;
  addCustomGoal: (goal: Omit<Goal, "id">) => void;
  removeCustomGoal: (id: string) => void;
  /** Adds a session-only goal and selects it when a slot is free. */
  addPromptGoal: (text: string) => boolean;
  removePromptGoal: (id: string) => void;
  canSelectMore: boolean;
  isGoalSelected: (id: string) => boolean;
}

const GoalsContext = createContext<GoalsContextValue | undefined>(undefined);

export function GoalsProvider({
  children,
  catalog,
}: {
  children: ReactNode;
  /** Replaces `DEFAULT_GOALS` when the host has a real profile catalog. */
  catalog?: Goal[];
}) {
  const { currentDomain } = useDomain();
  const [selectedGoalIds, setSelectedGoalIds] = useState<string[]>([]);
  const [customGoals, setCustomGoals] = useState<Goal[]>([]);
  const [promptGoals, setPromptGoals] = useState<Goal[]>([]);
  const baseGoals = catalog ?? DEFAULT_GOALS;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sel = window.localStorage.getItem(STORAGE_KEY);
    if (sel) {
      try {
        const parsed = JSON.parse(sel) as SelectedGoal[];
        setSelectedGoalIds(parsed.map((s) => s.goalId));
      } catch {}
    }
    const cust = window.localStorage.getItem(CUSTOM_KEY);
    if (cust) {
      try {
        setCustomGoals(JSON.parse(cust) as Goal[]);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const persistable = selectedGoalIds.filter((id) => !id.startsWith("goal-prompt-"));
    const payload: SelectedGoal[] = persistable.map((id) => ({
      goalId: id,
      selectedAt: Date.now(),
    }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [selectedGoalIds]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CUSTOM_KEY, JSON.stringify(customGoals));
  }, [customGoals]);

  const catalogGoals = useMemo(
    () => [...baseGoals, ...customGoals],
    [baseGoals, customGoals],
  );
  const allGoals = useMemo(
    () => [...catalogGoals, ...promptGoals],
    [catalogGoals, promptGoals],
  );

  useEffect(() => {
    setSelectedGoalIds((prev) => {
      const valid = prev.filter(
        (id) =>
          id.startsWith("goal-prompt-") || allGoals.some((g) => g.id === id),
      );
      return valid.length === prev.length ? prev : valid;
    });
  }, [allGoals]);

  const goals = useMemo(
    () =>
      catalogGoals.filter(
        (g) => g.domain === currentDomain || g.domain === "default",
      ),
    [catalogGoals, currentDomain],
  );

  const selectedGoals = useMemo(
    () =>
      selectedGoalIds
        .map((id) => allGoals.find((g) => g.id === id))
        .filter((g): g is Goal => Boolean(g)),
    [selectedGoalIds, allGoals],
  );

  const selectGoal = useCallback((id: string) => {
    setSelectedGoalIds((prev) =>
      prev.includes(id) || prev.length >= MAX_SELECTED_GOALS ? prev : [...prev, id],
    );
  }, []);

  const deselectGoal = useCallback((id: string) => {
    setSelectedGoalIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggleGoal = useCallback((id: string) => {
    setSelectedGoalIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_SELECTED_GOALS) return prev;
      return [...prev, id];
    });
  }, []);

  const clearSelectedGoals = useCallback(() => {
    setSelectedGoalIds([]);
    setPromptGoals([]);
  }, []);

  const addCustomGoal = useCallback((goal: Omit<Goal, "id">) => {
    setCustomGoals((prev) => [
      ...prev,
      { ...goal, id: `goal-custom-${Date.now()}` },
    ]);
  }, []);

  const removeCustomGoal = useCallback((id: string) => {
    setCustomGoals((prev) => prev.filter((g) => g.id !== id));
    setSelectedGoalIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const addPromptGoal = useCallback((text: string) => {
    const description = text.trim().replace(/\s+/g, " ");
    if (!description) return false;
    if (promptGoals.some((g) => (g.description ?? g.word) === description)) return false;

    const id = `goal-prompt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const parts = description.split(" ");
    const word =
      description.length <= 28
        ? description
        : parts.length <= 3
          ? `${description.slice(0, 27)}…`
          : parts.slice(0, 3).join(" ");

    setPromptGoals((prev) => [
      ...prev,
      {
        id,
        word,
        symbol: "Star",
        symbolColor: "blue",
        category: "purpose",
        domain: "default",
        description: word === description ? undefined : description,
        detail: "Temporary — this prompt only",
        ephemeral: true,
      },
    ]);
    setSelectedGoalIds((prev) =>
      prev.includes(id) || prev.length >= MAX_SELECTED_GOALS ? prev : [...prev, id],
    );
    return true;
  }, [promptGoals]);

  const removePromptGoal = useCallback((id: string) => {
    setPromptGoals((prev) => prev.filter((g) => g.id !== id));
    setSelectedGoalIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const isGoalSelected = useCallback(
    (id: string) => selectedGoalIds.includes(id),
    [selectedGoalIds],
  );

  const value = useMemo<GoalsContextValue>(
    () => ({
      allGoals,
      goals,
      customGoals,
      promptGoals,
      selectedGoals,
      selectedGoalIds,
      selectGoal,
      deselectGoal,
      toggleGoal,
      clearSelectedGoals,
      addCustomGoal,
      removeCustomGoal,
      addPromptGoal,
      removePromptGoal,
      canSelectMore: selectedGoals.length < MAX_SELECTED_GOALS,
      isGoalSelected,
    }),
    [
      allGoals,
      goals,
      customGoals,
      promptGoals,
      selectedGoals,
      selectedGoalIds,
      selectGoal,
      deselectGoal,
      toggleGoal,
      clearSelectedGoals,
      addCustomGoal,
      removeCustomGoal,
      addPromptGoal,
      removePromptGoal,
      isGoalSelected,
    ],
  );

  return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>;
}

export function useGoals(): GoalsContextValue {
  const ctx = useContext(GoalsContext);
  if (!ctx) throw new Error("useGoals must be used within a GoalsProvider");
  return ctx;
}
