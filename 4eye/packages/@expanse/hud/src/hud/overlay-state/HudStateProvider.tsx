"use client";

/**
 * HudStateProvider — wraps the HUD shell and exposes a reducer-backed
 * context for HUD-level UI state (full-screen MinimapFullView, dock
 * visibility, Emotion.Inspect). See `hudReducer.ts` for the action vocabulary.
 *
 * Hosts read state with `useHudState()` and dispatch with
 * `useHudDispatch()`. Convenience helpers wrap the most common dispatches.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import {
  hudReducer,
  INITIAL_HUD_STATE,
  MAP_CLOSE_GLYPH_MS,
  type HudAction,
  type HudState,
} from "./hudReducer";

/** Shared so a second close click during the plus beat does not stack timers. */
let mapCloseTimer: ReturnType<typeof setTimeout> | null = null;

function cancelMapCloseTimer() {
  if (mapCloseTimer == null) return;
  clearTimeout(mapCloseTimer);
  mapCloseTimer = null;
}

const HudStateContext = createContext<HudState | null>(null);
const HudDispatchContext = createContext<React.Dispatch<HudAction> | null>(
  null,
);

export interface HudStateProviderProps {
  children: ReactNode;
  /** Optional initial state override (mostly useful for tests). */
  initialState?: HudState;
}

export function HudStateProvider({
  children,
  initialState = INITIAL_HUD_STATE,
}: HudStateProviderProps) {
  const [state, dispatch] = useReducer(hudReducer, initialState);

  const stateValue = useMemo(() => state, [state]);

  return (
    <HudStateContext.Provider value={stateValue}>
      <HudDispatchContext.Provider value={dispatch}>
        {children}
      </HudDispatchContext.Provider>
    </HudStateContext.Provider>
  );
}

export function useHudState(): HudState {
  const ctx = useContext(HudStateContext);
  if (!ctx) {
    throw new Error("useHudState() must be used inside <HudStateProvider>");
  }
  return ctx;
}

/** Soft read — null when mounted outside the HUD shell (stories, tiles). */
export function useHudStateOptional(): HudState | null {
  return useContext(HudStateContext);
}

export function useHudDispatch(): React.Dispatch<HudAction> {
  const ctx = useContext(HudDispatchContext);
  if (!ctx) {
    throw new Error(
      "useHudDispatch() must be used inside <HudStateProvider>",
    );
  }
  return ctx;
}

/** Soft dispatch — null outside the HUD shell. */
export function useHudDispatchOptional(): React.Dispatch<HudAction> | null {
  return useContext(HudDispatchContext);
}

/** Stable callback that dispatches `OPEN_MAP_VIEW`. */
export function useOpenMapView(): () => void {
  const dispatch = useHudDispatch();
  return useCallback(() => {
    cancelMapCloseTimer();
    dispatch({ type: "OPEN_MAP_VIEW" });
  }, [dispatch]);
}

/**
 * Morphs the map close glyph to a plus, then unmounts the overlay.
 * Direct `CLOSE_MAP_VIEW` dispatches stay instant (e.g. Scene Studio).
 */
export function useCloseMapView(): () => void {
  const dispatch = useHudDispatch();
  return useCallback(() => {
    if (mapCloseTimer != null) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      dispatch({ type: "CLOSE_MAP_VIEW" });
      return;
    }
    dispatch({ type: "BEGIN_CLOSE_MAP_VIEW" });
    mapCloseTimer = setTimeout(() => {
      mapCloseTimer = null;
      dispatch({ type: "CLOSE_MAP_VIEW" });
    }, MAP_CLOSE_GLYPH_MS);
  }, [dispatch]);
}

/**
 * Open Emotion.Inspect on the HUD shell. Soft: no-ops outside HudStateProvider
 * so Character actions can call it safely in stories.
 */
export function useOpenEmotionInspect(): (emotionId?: string) => void {
  const dispatch = useHudDispatchOptional();
  return useCallback(
    (emotionId?: string) => {
      cancelMapCloseTimer();
      dispatch?.({ type: "OPEN_EMOTION_INSPECT", emotionId });
    },
    [dispatch],
  );
}

/** Close Emotion.Inspect. Soft outside the HUD shell. */
export function useCloseEmotionInspect(): () => void {
  const dispatch = useHudDispatchOptional();
  return useCallback(() => {
    dispatch?.({ type: "CLOSE_EMOTION_INSPECT" });
  }, [dispatch]);
}
