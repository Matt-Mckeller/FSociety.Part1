"use client"

/**
 * EarnSlideContext — wires {@link earnSlideReducer} into a React
 * tree.
 *
 * Hosts mount {@link EarnSlideProvider} once at the slide root.
 * Descendants (page components, animation hooks) read `state` and
 * `dispatch` via {@link useEarnSlide}.
 *
 * Pulled out of the slide component itself so the slide stays a thin
 * orchestrator: it composes a Provider + page components and never
 * reaches into reducer internals.
 */

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react"

import {
  initialEarnSlideState,
  earnSlideReducer,
  type EarnSlideAction,
  type EarnSlideState,
} from "./earn-slide.reducer"

export interface EarnSlideContextValue {
  state: EarnSlideState
  dispatch: Dispatch<EarnSlideAction>
}

const EarnSlideContext = createContext<EarnSlideContextValue | null>(null)

export interface EarnSlideProviderProps {
  children: ReactNode
}

export function EarnSlideProvider({ children }: EarnSlideProviderProps) {
  const [state, dispatch] = useReducer(earnSlideReducer, initialEarnSlideState)
  // Stable identity per `state` change — pages that only read
  // `dispatch` won't re-render when `state` changes (and vice versa,
  // when consumed via destructuring).
  const value = useMemo<EarnSlideContextValue>(
    () => ({ state, dispatch }),
    [state],
  )
  return <EarnSlideContext.Provider value={value}>{children}</EarnSlideContext.Provider>
}

/**
 * Read the reward slide's reducer state + dispatch. Throws if used
 * outside a {@link EarnSlideProvider} — that's a wiring bug.
 */
export function useEarnSlide(): EarnSlideContextValue {
  const ctx = useContext(EarnSlideContext)
  if (!ctx) {
    throw new Error("useEarnSlide must be used inside <EarnSlideProvider>")
  }
  return ctx
}
