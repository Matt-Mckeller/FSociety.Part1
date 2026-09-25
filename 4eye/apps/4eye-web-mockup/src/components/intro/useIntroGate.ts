"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "4eye:intro-seen:v1";

function readSeen(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Owns the IntroFlow gating + replay flow.
 *
 * Hydration-safe by design. The "have they seen the intro" answer lives in
 * `localStorage`, which the server cannot read — so resolving it during the
 * first render would make the server (always "not seen") disagree with the
 * client (maybe "seen"), producing a hydration mismatch and a visible
 * content swap. Instead we resolve in three states:
 *
 *   gateResolved=false           → render a neutral loading state. Identical
 *                                  on the server and the first client render,
 *                                  so hydration matches with zero mismatch.
 *   gateResolved=true, !introDone → first-time visitor: play the intro.
 *   gateResolved=true,  introDone → returning visitor: skip to the slideshow.
 *
 * `localStorage` is read once, after mount, in an effect — never during
 * render. This keeps the route statically renderable (no cookies / no
 * `next/headers`) while eliminating the blank-then-swap flash.
 *
 * - `introRunKey`: bumped on `replayIntro()` so the IntroFlow component
 *   remounts and replays even after `localStorage` says "already seen".
 * - `replayIntro`: clears the persisted seen-flag, flips `introDone` back
 *   to false, and bumps the run key. Caller is responsible for also
 *   pausing any auto-play timer (this hook stays focused on intro state).
 */
export function useIntroGate() {
  // Start unresolved on both server and first client render so the two
  // agree. The effect below flips this after reading localStorage.
  const [gateResolved, setGateResolved] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [introRunKey, setIntroRunKey] = useState(0);

  useEffect(() => {
    setIntroDone(readSeen());
    setGateResolved(true);
  }, []);

  const finishIntro = useCallback(() => setIntroDone(true), []);

  const replayIntro = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore quota / privacy errors */
    }
    // Stay resolved — we want the intro to play immediately, not flash the
    // loading state — and remount IntroFlow via the run key.
    setGateResolved(true);
    setIntroDone(false);
    setIntroRunKey((k) => k + 1);
  }, []);

  return { introDone, gateResolved, introRunKey, finishIntro, replayIntro };
}
