"use client";

import { useCallback, useContext, useEffect, useRef } from "react";
import {
  BrandWordplayContext,
  FINAL_IDX,
  FRAME_MS,
  GLITCH_CHARS,
  HOLD_MS,
  SCRAMBLE_FRAMES,
  SEQUENCE,
} from "./BrandWordplayContext";

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useBrandWordplay(
  isActive: boolean = true,
  reducedMotion: boolean = false,
  onFinalStageReached?: () => void,
) {
  const context = useContext(BrandWordplayContext);
  if (!context) {
    throw new Error(
      "useBrandWordplay must be used within BrandWordplayProvider",
    );
  }

  const { state, dispatch } = context;

  const wasActiveRef = useRef(false);
  const holdTimerRef = useRef<number | null>(null);
  const scrambleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Ref-based guard avoids stale-closure bugs: state.finalFired captured in a
  // render closure can be stale on re-entry if the INIT dispatch hasn't
  // produced a new render before scheduleNext(0) is called.
  const finalFiredRef = useRef(false);

  const clearAll = useCallback(() => {
    if (holdTimerRef.current !== null) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (scrambleRef.current !== null) {
      clearInterval(scrambleRef.current);
      scrambleRef.current = null;
    }
  }, []);

  /**
   * Scramble-decode to a target sequence index, then call onDone.
   */
  const scrambleTo = useCallback(
    (targetIdx: number, onDone: () => void) => {
      const target = SEQUENCE[targetIdx];

      if (reducedMotion) {
        dispatch({ type: "SET_SEQ_IDX", payload: targetIdx });
        dispatch({ type: "SET_DISPLAY_TEXT", payload: target });
        onDone();
        return;
      }

      dispatch({ type: "SET_SCRAMBLING", payload: true });
      let frame = 0;

      scrambleRef.current = setInterval(() => {
        frame += 1;
        const progress = frame / SCRAMBLE_FRAMES;

        const decoded = Array.from({ length: target.length }, (_, i) => {
          const ch = target[i]!;
          if (ch === " ") return " ";
          if (i / target.length < progress) return ch;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]!;
        }).join("");

        dispatch({ type: "SET_DISPLAY_TEXT", payload: decoded });

        if (frame >= SCRAMBLE_FRAMES) {
          clearInterval(scrambleRef.current!);
          scrambleRef.current = null;
          dispatch({ type: "SET_SEQ_IDX", payload: targetIdx });
          dispatch({ type: "SET_DISPLAY_TEXT", payload: target });
          dispatch({ type: "SET_SCRAMBLING", payload: false });
          onDone();
        }
      }, FRAME_MS);
    },
    [reducedMotion, dispatch],
  );

  /**
   * Hold on `currentIdx` for its HOLD_MS, then scramble to the next.
   * Stops (and fires onFinalStageReached) when the final index is reached.
   *
   * Uses finalFiredRef (not state.finalFired) so the check is always current
   * even when called from inside a timer that was scheduled in a previous
   * render cycle.
   */
  const scheduleNext = useCallback(
    (currentIdx: number) => {
      if (currentIdx >= FINAL_IDX) return; // already at the end

      holdTimerRef.current = window.setTimeout(() => {
        const nextIdx = currentIdx + 1;

        scrambleTo(nextIdx, () => {
          if (nextIdx === FINAL_IDX && !finalFiredRef.current) {
            finalFiredRef.current = true;
            dispatch({ type: "MARK_FINAL_FIRED" });
            onFinalStageReached?.();
          }
          scheduleNext(nextIdx);
        });
      }, HOLD_MS[currentIdx] ?? 1400);
    },
    [scrambleTo, dispatch, onFinalStageReached],
  );

  // ── Start / restart when slide becomes active ──────────────────────────────
  useEffect(() => {
    if (!isActive) {
      wasActiveRef.current = false;
      finalFiredRef.current = false;
      clearAll();
      dispatch({ type: "SET_RUNNING", payload: false });
      return;
    }

    if (wasActiveRef.current) return;
    wasActiveRef.current = true;
    finalFiredRef.current = false;
    clearAll();

    if (reducedMotion) {
      dispatch({ type: "SET_SEQ_IDX", payload: FINAL_IDX });
      dispatch({ type: "SET_DISPLAY_TEXT", payload: SEQUENCE[FINAL_IDX] });
      dispatch({ type: "SET_SCRAMBLING", payload: false });
      dispatch({ type: "SET_RUNNING", payload: true });
      finalFiredRef.current = true;
      dispatch({ type: "MARK_FINAL_FIRED" });
      onFinalStageReached?.();
      return;
    }

    dispatch({ type: "INIT" });
    scheduleNext(0);

    return clearAll;
  }, [isActive, reducedMotion, clearAll, scheduleNext, dispatch, onFinalStageReached]);

  return {
    state,
    dispatch,
    clearAll,
  };
}

export default useBrandWordplay;
