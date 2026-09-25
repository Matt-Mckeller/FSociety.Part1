"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import type { OrbItem } from "@expanse/hud"

/**
 * ReplayIntroProvider — exposes the cross-slide "Replay Intro" callback
 * to any descendant so per-slide action bars can drop it into their
 * orb list without prop-threading from `HomeTile`.
 *
 * Each slide's action bar decides whether to include it. Most do; the
 * Reach (Domains) slide intentionally omits it because its 4-orb bar
 * already fills the available width.
 */
interface ReplayIntroContextValue {
  replayIntro: () => void;
}

const ReplayIntroContext = createContext<ReplayIntroContextValue | null>(null);

export interface ReplayIntroProviderProps {
  replayIntro: () => void;
  children: ReactNode;
}

export function ReplayIntroProvider({
  replayIntro,
  children,
}: ReplayIntroProviderProps) {
  const value = useMemo<ReplayIntroContextValue>(
    () => ({ replayIntro }),
    [replayIntro],
  );
  return (
    <ReplayIntroContext.Provider value={value}>
      {children}
    </ReplayIntroContext.Provider>
  );
}

/** Returns `() => void` to fire the intro replay. */
export function useReplayIntro(): () => void {
  const v = useContext(ReplayIntroContext);
  if (!v) {
    throw new Error("useReplayIntro must be used within <ReplayIntroProvider>");
  }
  return v.replayIntro;
}

/**
 * Returns a ready-to-use `OrbItem` for the cross-slide Replay Intro
 * action. Slide action bars typically push this as the rightmost orb.
 */
export function useReplayIntroOrb(): OrbItem {
  const replayIntro = useReplayIntro();
  return useMemo<OrbItem>(
    () => ({
      id: "replay-intro",
      icon: <ReplayIcon />,
      label: "Replay intro",
      onClick: replayIntro,
    }),
    [replayIntro],
  );
}
