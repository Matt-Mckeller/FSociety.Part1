"use client"

/**
 * useCharacterReactions — reusable hover/click reactions for any
 * brand-core character SVG.
 *
 * The hook is a *primitive*: it doesn't render anything, it just installs
 * GSAP timelines that target named SVG sub-elements inside a wrapper element.
 * Caller is responsible for:
 *   1. Rendering an SVG that exposes the standard brand-core `name="..."`
 *      attributes on its sub-elements (`leftArm`, `rightArm`, `head`,
 *      `antenna` are read by this hook; missing elements are skipped).
 *   2. Passing the wrapper ref via `rootRef`.
 *   3. Wiring `bind` onto the wrapper element to attach pointer/keyboard
 *      handlers, or driving the hook imperatively via `playSelect()` /
 *      `playAnxious()` / `playExcited()`.
 *
 * Reactions provided (named after the three "4eye" personas):
 *   • Select 4eye   — right arm raises and oscillates; head tilts; antenna jiggles.
 *                    Auto-triggered on `pointerenter` (mouse only) and `focus`.
 *   • Anxious 4eye  — squash & stretch on the SVG; both arms flair; antenna whips.
 *                    Auto-triggered on `click`/`tap` and Enter/Space keypress.
 *   • Excited 4eye  — V-pose hop with arm-fall gag. Imperative-only — no
 *                    auto-bind; callers fire it via the returned `playExcited()`.
 *   • IdleBob       — subtle ±3px y oscillation between interactions.
 *
 * Each behavior can be disabled via the `select`, `anxious`, `idleBob` flags.
 *
 * Reduced motion: when `reducedMotion` is true (or the user prefers it),
 * imperative tweens are skipped. Mood callbacks still fire so callers can
 * provide visible feedback through other means (eye glow color, etc.).
 *
 * GSAP scoping: every tween is registered inside a `gsap.context()` keyed
 * to `rootRef.current`, so unmount/strict-mode replays clean up automatically.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import type { CharacterAnatomy } from "../anatomy"
import { detachLimb } from "./detachableLimb"
import {
  buildSelectTimeline,
  buildAnxiousTimeline,
  buildExcitedTimeline,
} from "./reactions"

export type CharacterReactionMood = "neutral" | "happy" | "alert"

export interface UseCharacterReactionsOptions {
  /** Wrapper element that contains the character SVG. */
  rootRef: React.RefObject<HTMLElement | null>
  /**
   * Typed anatomy registry produced by `useCharacterAnatomy()`. When
   * provided, the hook resolves character parts (`leftArm`, `head`,
   * etc.) through the registry instead of falling back to
   * `rootRef.current.querySelector('[name="..."]')`.
   *
   * Anatomy lookup is preferred for new callers because it is
   * compiler-checked: a typo in a part name is caught at build time and
   * the returned ref is correctly typed (no `as SVGPathElement` casts).
   * The querySelector fallback is retained for back-compat with any
   * caller that hasn't migrated yet.
   */
  anatomy?: CharacterAnatomy
  /**
   * When false, all interactions are ignored and idle bob is paused.
   * @default true
   */
  enabled?: boolean
  /** Honors prefers-reduced-motion at the call site. @default false */
  reducedMotion?: boolean
  /** Enable Select 4eye reaction on hover/focus. @default true */
  select?: boolean
  /** Enable Anxious 4eye reaction on click/keypress. @default true */
  anxious?: boolean
  /** Enable subtle idle bob between interactions. @default true */
  idleBob?: boolean
}

export interface UseCharacterReactionsResult {
  /** Current mood — `"neutral"` between reactions, `"happy"` while playing
   *  Select or Excited, `"alert"` while/just after Anxious. Useful for
   *  driving eye glow. */
  mood: CharacterReactionMood
  /** Imperatively trigger the Select 4eye timeline. No-op if disabled or busy. */
  playSelect: () => void
  /** Imperatively trigger the Anxious 4eye timeline. No-op if disabled or busy. */
  playAnxious: () => void
  /**
   * Imperatively trigger the Excited 4eye timeline (V-pose + happy hop +
   * antenna whip + arm-fall gag). No-op when disabled. Cancels any
   * in-flight Select.
   */
  playExcited: () => void
  /** Spread onto the wrapper element to wire pointer/keyboard handlers. */
  bind: {
    onPointerEnter: (e: React.PointerEvent<HTMLElement>) => void
    onFocus: () => void
    onClick: () => void
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void
  }
}

/** Cooldown after Anxious 4eye before another can fire (prevents stacked tweens). */
const ANXIOUS_COOLDOWN_MS = 600

/**
 * Selectors used by the legacy `querySelector` fallback path. Only
 * consulted when {@link UseCharacterReactionsOptions.anatomy} is not
 * provided. New callers should pass an `anatomy` registry and these
 * selectors will be unused.
 */
const SELECTORS = {
  svg: "svg",
  rightArm: '[name="rightArm"]',
  leftArm: '[name="leftArm"]',
  head: '[name="head"]',
  antenna: '[name="antenna"]',
} as const

export function useCharacterReactions({
  rootRef,
  anatomy,
  enabled = true,
  reducedMotion = false,
  select = true,
  anxious = true,
  idleBob = true,
}: UseCharacterReactionsOptions): UseCharacterReactionsResult {
  const ctxRef = useRef<gsap.Context | null>(null)
  const idleTweenRef = useRef<gsap.core.Tween | null>(null)
  const selectBusyRef = useRef(false)
  const anxiousBusyRef = useRef(false)
  const lastPointerTypeRef = useRef<string>("mouse")

  const [mood, setMood] = useState<CharacterReactionMood>("neutral")

  // ------------------------------------------------------------------
  // Part resolution — anatomy-first with querySelector fallback.
  // ------------------------------------------------------------------
  // Single source of truth for "give me this character part". When an
  // `anatomy` registry was supplied we go through it (typed, no DOM
  // query); otherwise we fall back to scanning the DOM under
  // `rootRef.current` for the legacy `name="..."` attribute. The svg
  // root is special-cased: it has no `name=` attr in some hosts, so the
  // fallback selector is the bare tag.
  const resolvePart = useCallback(
    <T extends SVGElement>(
      part: "svg" | "head" | "leftArm" | "rightArm" | "antenna",
    ): T | null => {
      if (anatomy) {
        return anatomy.get<T>(part)
      }
      const root = rootRef.current
      if (!root) return null
      return root.querySelector<T>(SELECTORS[part])
    },
    [anatomy, rootRef],
  )

  // ------------------------------------------------------------------
  // GSAP context lifecycle
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {}, rootRef.current)
    ctxRef.current = ctx
    return () => {
      ctx.revert()
      ctxRef.current = null
    }
  }, [rootRef])

  // ------------------------------------------------------------------
  // Idle bob — only while enabled + idleBob + not reduced motion
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!enabled || !idleBob || reducedMotion) {
      idleTweenRef.current?.kill()
      idleTweenRef.current = null
      return
    }
    const ctx = ctxRef.current
    const svg = resolvePart<SVGSVGElement>("svg")
    if (!ctx || !svg) return
    ctx.add(() => {
      idleTweenRef.current = gsap.to(svg, {
        y: -3,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })
    })
    return () => {
      idleTweenRef.current?.kill()
      idleTweenRef.current = null
    }
  }, [enabled, idleBob, reducedMotion, rootRef, resolvePart])

  // ------------------------------------------------------------------
  // Select 4eye — friendly hover acknowledgement (formerly "wave").
  // ------------------------------------------------------------------
  const playSelect = useCallback(() => {
    if (!enabled || !select) return
    if (reducedMotion) {
      setMood("happy")
      return
    }
    if (selectBusyRef.current || anxiousBusyRef.current) return
    const ctx = ctxRef.current
    const root = rootRef.current
    if (!ctx || !root) return

    const rightArm = resolvePart<SVGPathElement>("rightArm")
    const head = resolvePart<SVGCircleElement>("head")
    const antenna = resolvePart<SVGGElement>("antenna")
    if (!rightArm) return

    selectBusyRef.current = true
    setMood("happy")
    idleTweenRef.current?.pause()

    ctx.add(() => {
      buildSelectTimeline({
        rightArm,
        head,
        antenna,
        onComplete: () => {
          selectBusyRef.current = false
          setMood("neutral")
          idleTweenRef.current?.resume()
        },
      })
    })
  }, [enabled, select, reducedMotion, rootRef, resolvePart])

  // ------------------------------------------------------------------
  // Anxious 4eye — startled click reaction (formerly "poke").
  // ------------------------------------------------------------------
  const playAnxious = useCallback(() => {
    if (!enabled || !anxious) return
    if (anxiousBusyRef.current) return
    if (reducedMotion) {
      setMood("alert")
      window.setTimeout(() => setMood("neutral"), 600)
      return
    }
    const ctx = ctxRef.current
    const root = rootRef.current
    if (!ctx || !root) return

    const svg = resolvePart<SVGSVGElement>("svg")
    const leftArm = resolvePart<SVGPathElement>("leftArm")
    const rightArm = resolvePart<SVGPathElement>("rightArm")
    const antenna = resolvePart<SVGGElement>("antenna")
    if (!svg) return

    anxiousBusyRef.current = true
    setMood("alert")
    idleTweenRef.current?.pause()

    // Cancel any in-flight Select so the arms can flair cleanly.
    if (rightArm) gsap.killTweensOf(rightArm)
    if (leftArm) gsap.killTweensOf(leftArm)
    selectBusyRef.current = false

    ctx.add(() => {
      buildAnxiousTimeline({
        svg,
        leftArm,
        rightArm,
        antenna,
        onComplete: () => {
          window.setTimeout(() => {
            anxiousBusyRef.current = false
            setMood("neutral")
            idleTweenRef.current?.resume()
          }, ANXIOUS_COOLDOWN_MS - 550)
        },
      })
    })
  }, [enabled, anxious, reducedMotion, rootRef, resolvePart])

  // ------------------------------------------------------------------
  // Excited 4eye — the headline reaction (formerly "celebrate"). Both
  // arms shoot up into a V, shake with excitement, the body hops twice,
  // antenna whips, head bobs along. Designed to read as unambiguous,
  // joyful affirmation.
  // ------------------------------------------------------------------
  const excitedBusyRef = useRef(false)
  const playExcited = useCallback(() => {
    if (!enabled) return
    if (excitedBusyRef.current) return
    if (reducedMotion) {
      setMood("happy")
      window.setTimeout(() => setMood("neutral"), 900)
      return
    }
    const ctx = ctxRef.current
    const root = rootRef.current
    if (!ctx || !root) return

    const svg = resolvePart<SVGSVGElement>("svg")
    const leftArm = resolvePart<SVGPathElement>("leftArm")
    const rightArm = resolvePart<SVGPathElement>("rightArm")
    const head = resolvePart<SVGCircleElement>("head")
    const antenna = resolvePart<SVGGElement>("antenna")
    if (!svg) return

    excitedBusyRef.current = true
    setMood("happy")
    idleTweenRef.current?.pause()

    // Cancel any in-flight Select/Anxious so Excited owns the stage.
    if (rightArm) gsap.killTweensOf(rightArm)
    if (leftArm) gsap.killTweensOf(leftArm)
    if (head) gsap.killTweensOf(head)
    if (antenna) gsap.killTweensOf(antenna)
    selectBusyRef.current = false
    anxiousBusyRef.current = false

    ctx.add(() => {
      // Set up the detachable-limb scene up front (if leftArm exists)
      // so the timeline can reference its `fallen` clone immediately.
      // The scene is null when there's no left arm or no parent — the
      // Excited timeline runs without the gag in that case.
      const limbScene =
        leftArm && leftArm.parentNode
          ? detachLimb({
              source: leftArm,
              parent: leftArm.parentNode,
              svg,
              transformOrigin: "top center",
              transformBox: "fill-box",
            })
          : null

      buildExcitedTimeline({
        svg,
        leftArm,
        rightArm,
        head,
        antenna,
        limbScene,
        onComplete: () => {
          excitedBusyRef.current = false
          setMood("neutral")
          idleTweenRef.current?.resume()
        },
      })
    })
  }, [enabled, reducedMotion, rootRef, resolvePart])


  // ------------------------------------------------------------------
  // Pointer / keyboard handlers
  // ------------------------------------------------------------------
  const onPointerEnter = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      lastPointerTypeRef.current = e.pointerType || "mouse"
      // Don't auto-Select on touch — touch fires enter right before tap and
      // we don't want Select + Anxious to stack.
      if (e.pointerType === "touch") return
      playSelect()
    },
    [playSelect],
  )

  const onFocus = useCallback(() => {
    if (lastPointerTypeRef.current === "touch") return
    playSelect()
  }, [playSelect])

  const onClick = useCallback(() => {
    playAnxious()
  }, [playAnxious])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        playAnxious()
      }
    },
    [playAnxious],
  )

  const bind = useMemo(
    () => ({ onPointerEnter, onFocus, onClick, onKeyDown }),
    [onPointerEnter, onFocus, onClick, onKeyDown],
  )

  return { mood, playSelect, playAnxious, playExcited, bind }
}
