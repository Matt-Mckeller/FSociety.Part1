"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface RailPreferencesValue {
  /** Persistent-ish rail FAB under-labels (Show/Hide button labels). */
  labelsVisible: boolean;
  toggleLabels: () => void;
  /**
   * Temporary learning overlay: clear name callouts next to every major
   * HUD action bar. Session-only — not persisted; meant to be flipped on
   * briefly while learning chrome names, then off.
   */
  chromeGuideVisible: boolean;
  toggleChromeGuide: () => void;
}

const RailPreferencesContext = createContext<RailPreferencesValue | null>(null);

export function RailPreferencesProvider({
  children,
  initialLabelsVisible = false,
}: {
  children: ReactNode;
  initialLabelsVisible?: boolean;
}) {
  const [labelsVisible, setLabelsVisible] = useState(initialLabelsVisible);
  const [chromeGuideVisible, setChromeGuideVisible] = useState(false);
  const toggleLabels = useCallback(() => setLabelsVisible((v) => !v), []);
  const toggleChromeGuide = useCallback(
    () => setChromeGuideVisible((v) => !v),
    [],
  );
  const value = useMemo(
    () => ({
      labelsVisible,
      toggleLabels,
      chromeGuideVisible,
      toggleChromeGuide,
    }),
    [labelsVisible, toggleLabels, chromeGuideVisible, toggleChromeGuide],
  );
  return (
    <RailPreferencesContext.Provider value={value}>
      {children}
    </RailPreferencesContext.Provider>
  );
}

export function useRailPreferences(): RailPreferencesValue {
  const ctx = useContext(RailPreferencesContext);
  if (!ctx) {
    throw new Error(
      "useRailPreferences() must be used inside <RailPreferencesProvider>",
    );
  }
  return ctx;
}
