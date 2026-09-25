"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useIntroGate } from "./useIntroGate";

/**
 * IntroGateProvider — lifts intro gate state to the HUD layout level so
 * both HomeTile and HUD-level components (e.g. MapActionBar) can access
 * `replayIntro` without prop-threading.
 *
 * Mounted in `HudLayout` so the state persists across realm transitions
 * and is reachable from the full-screen map overlay.
 */
interface IntroGateContextValue {
  introDone: boolean;
  /**
   * False until localStorage has been read post-hydration. While false the
   * host should render a neutral loading state (see HomeTile) so the server
   * and first client render agree — avoiding a hydration mismatch.
   */
  gateResolved: boolean;
  introRunKey: number;
  finishIntro: () => void;
  replayIntro: () => void;
}

const IntroGateContext = createContext<IntroGateContextValue | null>(null);

export function IntroGateProvider({ children }: { children: ReactNode }) {
  const value = useIntroGate();
  return (
    <IntroGateContext.Provider value={value}>
      {children}
    </IntroGateContext.Provider>
  );
}

/** Returns the intro gate value. Throws when outside <IntroGateProvider>. */
export function useIntroGateContext(): IntroGateContextValue {
  const v = useContext(IntroGateContext);
  if (!v) {
    throw new Error(
      "useIntroGateContext must be used within <IntroGateProvider>",
    );
  }
  return v;
}

/**
 * Null-safe variant — returns `null` when called outside
 * `<IntroGateProvider>`. Use this in components that may render outside
 * the provider (e.g. Storybook stories, isolated test mounts).
 */
export function useIntroGateOptional(): IntroGateContextValue | null {
  return useContext(IntroGateContext);
}
