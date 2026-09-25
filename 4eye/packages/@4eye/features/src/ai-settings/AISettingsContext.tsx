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
import type {
  AISettings,
  AccuracyLevel,
  AskQuestionsMode,
  AutonomousMode,
  ChatContextSourceId,
  DurationMode,
  InstructionItem,
  PlanMode,
  PowerLevel,
  ReviewMode,
  TestingMode,
  TimeAspect,
  TimeMode,
} from "@4eye/types";
import { mergeContextSources } from "@4eye/types";
import {
  aiSettingsReducer,
  initialAISettings,
} from "./aiSettingsReducer";
import {
  migrateImportPermissionSettings,
  migratePower,
  migrateRewritePast,
  migrateTimeAspect,
} from "./aiSettingsConfig";

const STORAGE_KEY = "4eye-ai-settings-v1";

interface LegacySnapshot extends Partial<AISettings> {
  quality?: unknown;
  thinking?: unknown;
}

function hydrateSettings(parsed: LegacySnapshot): AISettings {
  const { quality, thinking, ...rest } = parsed;
  return {
    ...initialAISettings,
    ...rest,
    timeAspect: migrateTimeAspect(parsed.timeAspect),
    rewritePast: migrateRewritePast(parsed.rewritePast),
    powerLevel: migratePower(parsed.powerLevel, quality, thinking),
    importPermissionSettings: migrateImportPermissionSettings(
      parsed.importPermissionSettings,
    ),
    includeCore: true,
    contextSources: mergeContextSources(
      (parsed.contextSources ?? {}) as Partial<Record<ChatContextSourceId, boolean>>,
    ),
  };
}

interface AISettingsContextValue {
  settings: AISettings;
  setAccuracy: (level: AccuracyLevel) => void;
  setRandomness: (value: number) => void;
  setTimeAspect: (aspect: TimeAspect) => void;
  setRewritePast: (enabled: boolean) => void;
  setPowerLevel: (level: PowerLevel) => void;
  setAutonomousMode: (mode: AutonomousMode) => void;
  setPlanMode: (mode: PlanMode) => void;
  setTestingMode: (mode: TestingMode) => void;
  setAskQuestionsMode: (mode: AskQuestionsMode) => void;
  setReviewMode: (mode: ReviewMode) => void;
  setDurationMode: (mode: DurationMode) => void;
  setDurationMinutes: (minutes: number | undefined) => void;
  setTimeMode: (mode: TimeMode) => void;
  setScheduledTime: (time: string | undefined) => void;
  setImportPermissionSettings: (enabled: boolean) => void;
  toggleContextSource: (id: ChatContextSourceId) => void;
  setContextSource: (id: ChatContextSourceId, enabled: boolean) => void;
  addInstruction: (instruction: Omit<InstructionItem, "id">) => void;
  removeInstruction: (id: string) => void;
  toggleInstruction: (id: string) => void;
  updateInstruction: (id: string, patch: Partial<InstructionItem>) => void;
  resetToDefaults: () => void;
  /** Load a full or partial snapshot (e.g. from a Preset's meta.aiSettings). */
  loadSettings: (snapshot: Partial<AISettings>) => void;
}

const AISettingsContext = createContext<AISettingsContextValue | undefined>(
  undefined,
);

export function AISettingsProvider({ children }: { children: ReactNode }) {
  const [settings, dispatch] = useReducer(aiSettingsReducer, initialAISettings);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as LegacySnapshot;
      dispatch({
        type: "HYDRATE",
        settings: hydrateSettings(parsed),
      });
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const set = useCallback(
    <K extends keyof AISettings>(key: K, value: AISettings[K]) =>
      dispatch({ type: "SET", patch: { [key]: value } as Partial<AISettings> }),
    [],
  );

  const value = useMemo<AISettingsContextValue>(
    () => ({
      settings,
      setAccuracy: (v) => set("accuracy", v),
      setRandomness: (v) => set("randomness", Math.max(0, Math.min(1, v))),
      setTimeAspect: (v) => set("timeAspect", v),
      setRewritePast: (v) => set("rewritePast", v),
      setPowerLevel: (v) => set("powerLevel", v),
      setAutonomousMode: (v) => set("autonomousMode", v),
      setPlanMode: (v) => set("planMode", v),
      setTestingMode: (v) => set("testingMode", v),
      setAskQuestionsMode: (v) => set("askQuestionsMode", v),
      setReviewMode: (v) => set("reviewMode", v),
      setDurationMode: (v) => set("durationMode", v),
      setDurationMinutes: (v) => set("durationMinutes", v),
      setTimeMode: (v) => set("timeMode", v),
      setScheduledTime: (v) => set("scheduledTime", v),
      setImportPermissionSettings: (v) => set("importPermissionSettings", v),
      toggleContextSource: (id) =>
        dispatch({ type: "TOGGLE_CONTEXT_SOURCE", id }),
      setContextSource: (id, enabled) =>
        dispatch({ type: "SET_CONTEXT_SOURCE", id, enabled }),
      addInstruction: (instruction) =>
        dispatch({ type: "ADD_INSTRUCTION", instruction }),
      removeInstruction: (id) => dispatch({ type: "REMOVE_INSTRUCTION", id }),
      toggleInstruction: (id) => dispatch({ type: "TOGGLE_INSTRUCTION", id }),
      updateInstruction: (id, patch) =>
        dispatch({ type: "UPDATE_INSTRUCTION", id, patch }),
      resetToDefaults: () => dispatch({ type: "RESET" }),
      loadSettings: (snapshot) =>
        dispatch({
          type: "HYDRATE",
          settings: hydrateSettings(snapshot as LegacySnapshot),
        }),
    }),
    [settings, set],
  );

  return (
    <AISettingsContext.Provider value={value}>
      {children}
    </AISettingsContext.Provider>
  );
}

export function useAISettings(): AISettingsContextValue {
  const ctx = useContext(AISettingsContext);
  if (!ctx)
    throw new Error("useAISettings must be used within AISettingsProvider");
  return ctx;
}
