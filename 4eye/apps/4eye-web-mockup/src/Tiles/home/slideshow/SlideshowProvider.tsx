"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import {
  INITIAL_SLIDESHOW_STATE,
  makeSlideshowReducer,
  type SlideshowAction,
  type SlideshowState,
} from "@4eye/web/Tiles/home/slideshow/slideshowReducer";
import type { SlideId } from "@4eye/web/Tiles/home/slideshow/steps";
import { STEPS } from "@4eye/web/Tiles/home/slideshow/steps";

interface SlideshowContextValue {
  state: SlideshowState;
  dispatch: (action: SlideshowAction) => void;
  total: number;
  /** True iff the active slide is the last one in the deck. */
  isFinalStep: boolean;
  /** Stable id of the active slide (for mascot routing, analytics, etc). */
  activeId: SlideId;
  // Imperative helpers — thin wrappers over `dispatch` for ergonomics.
  goto: (i: number) => void;
  next: () => void;
  prev: () => void;
  togglePlay: () => void;
  cycleSpeed: () => void;
  setHovered: (v: boolean) => void;
  setPlaying: (v: boolean) => void;
  restart: () => void;
}

const SlideshowContext = createContext<SlideshowContextValue | null>(null);

interface SlideshowProviderProps {
  total: number;
  children: ReactNode;
}

/**
 * Hosts the slideshow reducer + exposes a stable, ergonomic API to all
 * descendants (controls, input hooks, auto-advance timer, stage).
 *
 * No effects of its own — purely state + dispatch wrappers. Effectful
 * concerns (wheel, keyboard, autoplay timer, visibility-pause) live in
 * sibling hooks that read this context.
 */
export function SlideshowProvider({ total, children }: SlideshowProviderProps) {
  const reducer = useMemo(() => makeSlideshowReducer({ total }), [total]);
  const [state, dispatch] = useReducer(reducer, INITIAL_SLIDESHOW_STATE);

  const goto = useCallback((i: number) => dispatch({ type: "GOTO", index: i }), []);
  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const prev = useCallback(() => dispatch({ type: "PREV" }), []);
  const togglePlay = useCallback(() => dispatch({ type: "TOGGLE_PLAY" }), []);
  const cycleSpeed = useCallback(() => dispatch({ type: "CYCLE_SPEED" }), []);
  const setHovered = useCallback(
    (v: boolean) => dispatch({ type: "SET_HOVERED", value: v }),
    [],
  );
  const setPlaying = useCallback(
    (v: boolean) => dispatch({ type: "SET_PLAYING", value: v }),
    [],
  );
  const restart = useCallback(() => dispatch({ type: "RESTART" }), []);

  const value = useMemo<SlideshowContextValue>(() => {
    const isFinalStep = state.activeIdx === total - 1;
    const activeId = (STEPS[state.activeIdx]?.id ?? STEPS[0].id) as SlideId;
    return {
      state,
      dispatch,
      total,
      isFinalStep,
      activeId,
      goto,
      next,
      prev,
      togglePlay,
      cycleSpeed,
      setHovered,
      setPlaying,
      restart,
    };
  }, [state, total, goto, next, prev, togglePlay, cycleSpeed, setHovered, setPlaying, restart]);

  return <SlideshowContext.Provider value={value}>{children}</SlideshowContext.Provider>;
}

/**
 * Read the slideshow API. Throws if used outside `SlideshowProvider` so
 * misuse is caught at first render rather than producing silent no-ops.
 */
export function useSlideshow(): SlideshowContextValue {
  const v = useContext(SlideshowContext);
  if (!v) throw new Error("useSlideshow must be used within <SlideshowProvider>");
  return v;
}
