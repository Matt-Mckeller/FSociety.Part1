"use client"

/**
 * QuestsProvider — owns Quests modal visibility + claimed-set persistence.
 *
 * Responsibilities:
 *   1. Modal open/close state (`open`, `isOpen`, `close`).
 *   2. The "claimed" set, persisted to `localStorage` under
 *      {@link STORAGE_KEY}. Hydrates on mount; writes through on every
 *      claim. SSR-safe (read happens in `useEffect`).
 *   3. Derives a {@link QuestStatus} for every seed entry via {@link quests}.
 *   4. `claim(id)` calls into the marketing progress provider's
 *      `addCoins()` so the HUD coin counter ticks immediately. Returns
 *      the awarded coin count so callers (the modal) can fan that into
 *      the coin-fly animation.
 *   5. `claimAll()` claims every currently completed-unclaimed quest in
 *      one batch and returns the total coin reward.
 *
 * State management:
 *   The provider's internal state (`claimed`, `hydrated`, `isOpen`)
 *   lives in a single `useReducer` — see {@link questsReducer}. The
 *   localStorage write-through and the marketing progress side
 *   effects (`addCoins`) are intentionally *not* inside the reducer:
 *   they live in the dispatching `claim` / `claimAll` callbacks
 *   below, so the reducer stays pure (input state + action ⇒ next
 *   state) and trivially testable.
 *
 * The provider intentionally does NOT own the coin-fly animation — that
 * belongs to the modal so the animation only runs while the modal is
 * mounted (and therefore visible). The provider is the source of truth
 * for *which* quests are claimable and *how much* they reward.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react"

import { useMarketingProgress } from "@4eye/web/components/marketing-progress"
import { useExploration } from "@4eye/web/components/exploration"
import { QUEST_SEED } from "./quest-data"
import type { Quest, QuestStatus } from "./types"

/** localStorage key. Versioned so we can break the schema without crash. */
const STORAGE_KEY = "4eye:quests:claimed:v1"

export interface QuestWithStatus extends Quest {
  status: QuestStatus
}

export interface QuestsApi {
  /** All seed quests, hydrated with their derived {@link QuestStatus}. */
  quests: ReadonlyArray<QuestWithStatus>
  /** Quests with `status === "completed-unclaimed"`. */
  unclaimed: ReadonlyArray<QuestWithStatus>
  /** Count of unclaimed quests — drives the Game Bar pill badge. */
  unclaimedCount: number

  /** Modal visibility. */
  isOpen: boolean
  open: () => void
  close: () => void

  /**
   * Mark a single quest as claimed. Awards its coins via
   * `MarketingProgress.addCoins()` and persists the claim to
   * localStorage.
   *
   * @returns the coin reward that was awarded, or `0` if the quest is
   *   already claimed / not yet completed (so callers can no-op the
   *   coin-fly animation).
   */
  claim: (id: string) => number

  /**
   * Claim every currently completed-unclaimed quest in one batch.
   * Returns the *list* of {id, rewardCoins} pairs claimed, in seed
   * order, so the modal can stagger fly-coins per quest.
   */
  claimAll: () => ReadonlyArray<{ id: string; rewardCoins: number }>
}

// =============================================================================
// Reducer
// =============================================================================

interface QuestsInternalState {
  /**
   * Quest ids the user has already claimed. Stored as a Set for O(1)
   * membership checks. Replaced (not mutated) on every claim so React
   * sees a referential change.
   */
  claimed: ReadonlySet<string>
  /**
   * Whether the localStorage hydration effect has run. Until it has,
   * we render every completed quest as `unclaimed` so the UI doesn't
   * briefly show no claim affordances on first paint.
   */
  hydrated: boolean
  /** Modal visibility. */
  isOpen: boolean
}

type QuestsAction =
  | { type: "HYDRATE"; claimed: ReadonlySet<string> }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "CLAIM_BATCH"; ids: ReadonlyArray<string> }

const INITIAL_STATE: QuestsInternalState = {
  claimed: new Set(),
  hydrated: false,
  isOpen: false,
}

function questsReducer(
  state: QuestsInternalState,
  action: QuestsAction,
): QuestsInternalState {
  switch (action.type) {
    case "HYDRATE":
      // First-time bootstrap from localStorage. Runs exactly once
      // per provider mount.
      return { ...state, claimed: action.claimed, hydrated: true }
    case "OPEN":
      return state.isOpen ? state : { ...state, isOpen: true }
    case "CLOSE":
      return state.isOpen ? { ...state, isOpen: false } : state
    case "CLAIM_BATCH": {
      // Filter out ids already claimed so a stray double-dispatch
      // doesn't claim things twice. The dispatcher (`claim` /
      // `claimAll`) is also responsible for filtering before calling
      // `addCoins`, so by the time we get here `ids` should be the
      // exact set to add — but defending against duplicates here
      // keeps the reducer self-contained and idempotent.
      const next = new Set(state.claimed)
      let mutated = false
      for (const id of action.ids) {
        if (!next.has(id)) {
          next.add(id)
          mutated = true
        }
      }
      return mutated ? { ...state, claimed: next } : state
    }
    default: {
      const _exhaustive: never = action
      void _exhaustive
      return state
    }
  }
}

// =============================================================================
// localStorage helpers
// =============================================================================

const Ctx = createContext<QuestsApi | null>(null)

function readClaimedFromStorage(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((x): x is string => typeof x === "string"))
  } catch {
    return new Set()
  }
}

function writeClaimedToStorage(claimed: ReadonlySet<string>) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(claimed)))
  } catch {
    // Quota exceeded / private mode — silently ignore. Claim still
    // takes effect for the current session.
  }
}

/**
 * Effective completion: a `trigger` (real exploration event) always wins
 * over the static v1 `completed` flag; quests with no `trigger` fall back
 * to `completed` unchanged (early-explorer, join-edu).
 */
function isCompleted(quest: Quest, exploredKeys: ReadonlySet<string>): boolean {
  return quest.trigger ? exploredKeys.has(quest.trigger) : quest.completed
}

function deriveStatus(
  quest: Quest,
  claimed: ReadonlySet<string>,
  exploredKeys: ReadonlySet<string>,
): QuestStatus {
  if (!isCompleted(quest, exploredKeys)) return "incomplete"
  return claimed.has(quest.id) ? "completed-claimed" : "completed-unclaimed"
}

// =============================================================================
// Provider
// =============================================================================

export function QuestsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(questsReducer, INITIAL_STATE)
  const { addCoins } = useMarketingProgress()
  const { exploredKeys } = useExploration()

  // Hydrate the claimed set from localStorage exactly once. Always
  // start from an empty set on the server / first client paint to
  // keep SSR markup stable.
  useEffect(() => {
    dispatch({ type: "HYDRATE", claimed: readClaimedFromStorage() })
  }, [])

  const open = useCallback(() => dispatch({ type: "OPEN" }), [])
  const close = useCallback(() => dispatch({ type: "CLOSE" }), [])

  const claim = useCallback(
    (id: string): number => {
      const seed = QUEST_SEED.find((q) => q.id === id)
      if (!seed || !isCompleted(seed, exploredKeys)) return 0
      if (state.claimed.has(id)) return 0

      // Side effects: persist + bump HUD counter. The reducer just
      // owns the in-memory set.
      const next = new Set(state.claimed)
      next.add(id)
      writeClaimedToStorage(next)
      addCoins(seed.rewardCoins)

      dispatch({ type: "CLAIM_BATCH", ids: [id] })
      return seed.rewardCoins
    },
    [state.claimed, exploredKeys, addCoins],
  )

  const claimAll = useCallback(
    (): ReadonlyArray<{ id: string; rewardCoins: number }> => {
      const toClaim = QUEST_SEED.filter(
        (q) => isCompleted(q, exploredKeys) && !state.claimed.has(q.id),
      )
      if (toClaim.length === 0) return []

      let totalCoins = 0
      const claimedNow: { id: string; rewardCoins: number }[] = []
      const next = new Set(state.claimed)
      for (const quest of toClaim) {
        next.add(quest.id)
        totalCoins += quest.rewardCoins
        claimedNow.push({ id: quest.id, rewardCoins: quest.rewardCoins })
      }

      writeClaimedToStorage(next)
      addCoins(totalCoins)
      dispatch({ type: "CLAIM_BATCH", ids: toClaim.map((q) => q.id) })
      return claimedNow
    },
    [state.claimed, exploredKeys, addCoins],
  )

  const value = useMemo<QuestsApi>(() => {
    const quests: QuestWithStatus[] = QUEST_SEED.map((q) => ({
      ...q,
      // Until hydrated, keep every completed quest in `unclaimed`
      // state so the badge / claim-all CTA aren't briefly empty
      // before the localStorage read.
      status: state.hydrated
        ? deriveStatus(q, state.claimed, exploredKeys)
        : deriveStatus(q, new Set(), exploredKeys),
    }))
    const unclaimed = quests.filter((q) => q.status === "completed-unclaimed")
    return {
      quests,
      unclaimed,
      unclaimedCount: unclaimed.length,
      isOpen: state.isOpen,
      open,
      close,
      claim,
      claimAll,
    }
  }, [state.claimed, state.hydrated, state.isOpen, exploredKeys, open, close, claim, claimAll])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useQuests(): QuestsApi {
  const ctx = useContext(Ctx)
  if (!ctx) {
    throw new Error("useQuests must be used inside <QuestsProvider>")
  }
  return ctx
}
