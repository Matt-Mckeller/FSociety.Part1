"use client";

/**
 * Marketing progress context.
 *
 * Lifts player status (currency / xp / level) into stateful state owned by
 * the marketing app, then forwards it into FullHud's `playerStatus` prop so
 * the HUD chrome's status bar reflects live values.
 *
 * Components inside the route group (e.g. EarnSlide) call `addCoins()` /
 * `addXp()` to make the HUD coin counter actually increment.
 *
 * Idempotent: each (slug, action) pair fires only once per browser via
 * `awardOnce()` so re-mounts (and reloads) don't double-grant.
 *
 * `currency` / `xp` and the `awardOnce` fired-key set are persisted to
 * localStorage (versioned keys, hydrated in an effect for SSR safety) so
 * progress survives reloads instead of resetting to zero every time.
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

export interface MarketingProgress {
  currency: number;
  xp: number;
  xpProgress: number;
  level: number;
}

export interface MarketingProgressApi extends MarketingProgress {
  addCoins: (n: number) => void;
  addXp: (n: number) => void;
  awardOnce: (key: string, action: () => void) => void;
}

const DEFAULT: MarketingProgress = {
  currency: Infinity,
  xp: 0,
  xpProgress: 0,
  level: 1,
};

const Ctx = createContext<MarketingProgressApi | null>(null);

const XP_PER_LEVEL = 100;

/** localStorage keys. Versioned so we can break the schema without crash. */
const PROGRESS_STORAGE_KEY = "4eye:marketing-progress:v1";
const FIRED_STORAGE_KEY = "4eye:marketing-progress:fired:v1";

function recompute(xp: number): { level: number; xpProgress: number } {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpProgress = Math.round(((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100);
  return { level, xpProgress };
}

interface PersistedProgress {
  currency: number;
  xp: number;
}

/** JSON cannot encode Infinity; persist it as the string `"Infinity"`. */
function serializeCurrency(n: number): number | "Infinity" {
  return Number.isFinite(n) ? n : "Infinity";
}

function readProgressFromStorage(): PersistedProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof parsed.xp !== "number"
    ) {
      return null;
    }
    // Wallet is unbounded — keep XP, always restore ∞ coins so a leftover
    // finite localStorage value cannot override it.
    return { currency: Infinity, xp: parsed.xp };
  } catch {
    return null;
  }
}

function writeProgressToStorage(progress: PersistedProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        currency: serializeCurrency(progress.currency),
        xp: progress.xp,
      }),
    );
  } catch {
    // Quota exceeded / private mode — silently ignore.
  }
}

function readFiredFromStorage(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(FIRED_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((x): x is string => typeof x === "string"));
  } catch {
    return new Set();
  }
}

function writeFiredToStorage(fired: ReadonlySet<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(FIRED_STORAGE_KEY, JSON.stringify(Array.from(fired)));
  } catch {
    // Quota exceeded / private mode — silently ignore.
  }
}

export function MarketingProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MarketingProgress>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);
  const fired = useRef<Set<string>>(new Set());

  // Hydrate from localStorage exactly once. Always start from DEFAULT on
  // the server / first client paint to keep SSR markup stable, matching
  // QuestsProvider's hydration pattern.
  useEffect(() => {
    const stored = readProgressFromStorage();
    if (stored) {
      setState({ ...stored, ...recompute(stored.xp) });
    }
    fired.current = readFiredFromStorage();
    setHydrated(true);
  }, []);

  // Write-through: persist currency/xp whenever they change, but only
  // after hydration has applied so we never clobber stored values with
  // the pre-hydration DEFAULT state.
  useEffect(() => {
    if (!hydrated) return;
    writeProgressToStorage({ currency: state.currency, xp: state.xp });
  }, [hydrated, state.currency, state.xp]);

  const addCoins = useCallback((n: number) => {
    setState((s) => ({ ...s, currency: s.currency + n }));
  }, []);

  const addXp = useCallback((n: number) => {
    setState((s) => {
      const xp = s.xp + n;
      return { ...s, xp, ...recompute(xp) };
    });
  }, []);

  const awardOnce = useCallback((key: string, action: () => void) => {
    if (fired.current.has(key)) return;
    fired.current.add(key);
    writeFiredToStorage(fired.current);
    action();
  }, []);

  const value = useMemo<MarketingProgressApi>(
    () => ({ ...state, addCoins, addXp, awardOnce }),
    [state, addCoins, addXp, awardOnce],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMarketingProgress(): MarketingProgressApi {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useMarketingProgress must be used inside MarketingProgressProvider");
  }
  return ctx;
}

/**
 * Run `action` exactly once per session for the given `key`. Idempotent across
 * remounts within the same provider lifetime; safe with React StrictMode
 * double-invocation.
 */
export function useAwardOnce(key: string, action: () => void): void {
  const { awardOnce } = useMarketingProgress();
  const actionRef = useRef(action);
  actionRef.current = action;
  useEffect(() => {
    awardOnce(key, () => actionRef.current());
  }, [awardOnce, key]);
}
