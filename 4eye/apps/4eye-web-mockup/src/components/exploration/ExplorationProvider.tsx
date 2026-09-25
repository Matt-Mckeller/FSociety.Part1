"use client";

/**
 * Exploration-event tracking.
 *
 * A generic "the user did/saw X" ledger that quests (and anything else)
 * can key off of, so quest completion is driven by real behavior instead
 * of a hand-typed `completed: true/false` in seed data.
 *
 * Event keys are free-form strings by convention namespaced by kind, e.g.
 * `route:/projects`, `action:lens-toggle`, `media:home-reel-watched`,
 * `engagement:10-clicks`. Callers decide what a key means; this provider
 * only tracks which keys have fired.
 *
 * Two independent things live here:
 *   1. `exploredKeys` — a persisted set of fired event keys, mutated via
 *      `exploreOnce()`. Idempotent, like MarketingProgress's `awardOnce`.
 *   2. `clickCount` — a persisted, generic engagement counter incremented
 *      by a single delegated `document` click listener (any button/link
 *      click counts). Once it crosses a threshold, this provider itself
 *      fires a well-known exploration key for it — no per-component
 *      wiring needed to reward "general poking around."
 *
 * Both persist to localStorage (versioned keys, hydrated in an effect for
 * SSR safety), mirroring the pattern in QuestsProvider / MarketingProgress.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const EXPLORED_STORAGE_KEY = "4eye:exploration:fired:v1";
const CLICKS_STORAGE_KEY = "4eye:exploration:clicks:v1";

/** Once clickCount reaches this, `ENGAGEMENT_KEY` fires automatically. */
const ENGAGEMENT_CLICK_THRESHOLD = 10;
const ENGAGEMENT_KEY = "engagement:10-clicks";

export interface ExplorationApi {
  exploredKeys: ReadonlySet<string>;
  hasExplored: (key: string) => boolean;
  exploreOnce: (key: string) => void;
  clickCount: number;
}

const Ctx = createContext<ExplorationApi | null>(null);

function readSetFromStorage(storageKey: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((x): x is string => typeof x === "string"));
  } catch {
    return new Set();
  }
}

function writeSetToStorage(storageKey: string, value: ReadonlySet<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(Array.from(value)));
  } catch {
    // Quota exceeded / private mode — silently ignore.
  }
}

function readClicksFromStorage(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(CLICKS_STORAGE_KEY);
    const n = raw ? Number(raw) : 0;
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

function writeClicksToStorage(n: number) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CLICKS_STORAGE_KEY, String(n));
  } catch {
    // Quota exceeded / private mode — silently ignore.
  }
}

/** Elements whose clicks count toward the generic engagement counter. */
const INTERACTIVE_SELECTOR = 'button, a[href], [role="button"]';

export function ExplorationProvider({ children }: { children: ReactNode }) {
  const [exploredKeys, setExploredKeys] = useState<ReadonlySet<string>>(new Set());
  const [clickCount, setClickCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const exploredRef = useRef<Set<string>>(new Set());
  const clickCountRef = useRef(0);

  useEffect(() => {
    exploredRef.current = readSetFromStorage(EXPLORED_STORAGE_KEY);
    clickCountRef.current = readClicksFromStorage();
    setExploredKeys(new Set(exploredRef.current));
    setClickCount(clickCountRef.current);
    setHydrated(true);
  }, []);

  const exploreOnce = useCallback((key: string) => {
    if (exploredRef.current.has(key)) return;
    exploredRef.current.add(key);
    writeSetToStorage(EXPLORED_STORAGE_KEY, exploredRef.current);
    setExploredKeys(new Set(exploredRef.current));
  }, []);

  // Delegated click listener: any click landing on (or inside) an
  // interactive element bumps the generic engagement counter, capped
  // once the reward threshold has already fired so it doesn't grow
  // forever.
  useEffect(() => {
    if (!hydrated) return;
    if (exploredRef.current.has(ENGAGEMENT_KEY)) return;

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest(INTERACTIVE_SELECTOR)) return;

      clickCountRef.current += 1;
      writeClicksToStorage(clickCountRef.current);
      setClickCount(clickCountRef.current);

      if (clickCountRef.current >= ENGAGEMENT_CLICK_THRESHOLD) {
        exploreOnce(ENGAGEMENT_KEY);
      }
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [hydrated, exploreOnce]);

  const hasExplored = useCallback(
    (key: string) => exploredKeys.has(key),
    [exploredKeys],
  );

  const value = useMemo<ExplorationApi>(
    () => ({ exploredKeys, hasExplored, exploreOnce, clickCount }),
    [exploredKeys, hasExplored, exploreOnce, clickCount],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useExploration(): ExplorationApi {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useExploration must be used inside <ExplorationProvider>");
  }
  return ctx;
}

/** Fire `exploreOnce(key)` once, on mount — for panel-open / page-view style events. */
export function useExploreOnce(key: string): void {
  const { exploreOnce } = useExploration();
  useEffect(() => {
    exploreOnce(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
