"use client"

/**
 * IntroFlowContext — orchestrator state machine for the home-page intro slides.
 *
 * State machine:
 *
 *   idle(slide=0,phase="entering")
 *     → enterComplete   → idle(phase="settled")
 *                                ↓ exitRequested (auto-advance timer or external call)
 *                       idle(phase="exiting")
 *                                ↓ exitComplete
 *                       idle(slide=1,phase="entering") ...
 *
 * Once the final slide's exit completes we transition to `phase="finished"`
 * which signals the host page to reveal the rest of the HUD chrome.
 *
 * Why a reducer:
 *  - `advance()` / `complete()` are no-ops while `phase === "animating"`,
 *    structurally preventing two slides animating simultaneously.
 *  - Slide components register their "settled" duration; the orchestrator
 *    schedules `exitRequested` exactly once.
 *  - Tests assert state transitions deterministically.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react"

export type IntroPhase = "entering" | "settled" | "exiting" | "finished"

export interface IntroFlowState {
  /** 0-indexed active slide. */
  slide: number
  /** Total number of registered slides. */
  slideCount: number
  /** Current animation phase. */
  phase: IntroPhase
}

interface IntroFlowContextValue extends IntroFlowState {
  /** Mark the current slide's `onEnter` timeline as complete. */
  enterComplete: () => void
  /** Mark the current slide's `onExit` timeline as complete. */
  exitComplete: () => void
  /**
   * Request advance to the next slide. No-op if the current phase is not
   * `"settled"` (i.e. blocks reentry during entering / exiting / finished).
   */
  advance: () => void
  /**
   * Imperatively jump to a specific slide. Used for tests / dev tools only.
   * Resets phase to `"entering"`.
   */
  goTo: (next: number) => void
  /** True while an animation is in progress (entering or exiting). */
  isAnimating: boolean
  /** True once every slide has run and exited. */
  isFinished: boolean
}

type Action =
  | { type: "enterComplete" }
  | { type: "exitComplete" }
  | { type: "advance" }
  | { type: "goTo"; slide: number }

function makeReducer(slideCount: number) {
  return function reducer(state: IntroFlowState, action: Action): IntroFlowState {
    switch (action.type) {
      case "enterComplete":
        if (state.phase !== "entering") return state
        return { ...state, phase: "settled" }

      case "advance":
        if (state.phase !== "settled") return state
        return { ...state, phase: "exiting" }

      case "exitComplete":
        if (state.phase !== "exiting") return state
        if (state.slide + 1 >= slideCount) {
          return { ...state, phase: "finished" }
        }
        return { slide: state.slide + 1, slideCount, phase: "entering" }

      case "goTo":
        if (action.slide < 0 || action.slide >= slideCount) return state
        return { slide: action.slide, slideCount, phase: "entering" }

      default:
        return state
    }
  }
}

const Ctx = createContext<IntroFlowContextValue | null>(null)

export interface IntroFlowProviderProps {
  /** How many slides the host will render. */
  slideCount: number
  /**
   * Called once when the flow finishes (final slide's exit completes).
   * Use this to reveal the rest of the page chrome.
   */
  onFinished?: () => void
  /**
   * If true, skip the intro entirely (jump to `phase="finished"` on mount).
   * Use this for returning visitors.
   */
  skip?: boolean
  children: ReactNode
}

const ANIMATING_PHASES: ReadonlySet<IntroPhase> = new Set([
  "entering",
  "exiting",
])

export function IntroFlowProvider({
  slideCount,
  onFinished,
  skip = false,
  children,
}: IntroFlowProviderProps) {
  const reducer = useMemo(() => makeReducer(slideCount), [slideCount])
  const [state, dispatch] = useReducer<typeof reducer, IntroFlowState>(
    reducer,
    undefined as never,
    () => ({
      slide: 0,
      slideCount,
      phase: skip ? "finished" : "entering",
    }),
  )

  const onFinishedRef = useRef(onFinished)
  useEffect(() => {
    onFinishedRef.current = onFinished
  }, [onFinished])

  // Fire onFinished exactly once when transitioning into "finished".
  const finishedFiredRef = useRef(false)
  useEffect(() => {
    if (state.phase === "finished" && !finishedFiredRef.current) {
      finishedFiredRef.current = true
      onFinishedRef.current?.()
    }
  }, [state.phase])

  const enterComplete = useCallback(() => dispatch({ type: "enterComplete" }), [])
  const exitComplete = useCallback(() => dispatch({ type: "exitComplete" }), [])
  const advance = useCallback(() => dispatch({ type: "advance" }), [])
  const goTo = useCallback((slide: number) => dispatch({ type: "goTo", slide }), [])

  const value = useMemo<IntroFlowContextValue>(
    () => ({
      ...state,
      enterComplete,
      exitComplete,
      advance,
      goTo,
      isAnimating: ANIMATING_PHASES.has(state.phase),
      isFinished: state.phase === "finished",
    }),
    [state, enterComplete, exitComplete, advance, goTo],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useIntroFlow(): IntroFlowContextValue {
  const v = useContext(Ctx)
  if (!v) {
    throw new Error("useIntroFlow must be used inside <IntroFlowProvider>")
  }
  return v
}
