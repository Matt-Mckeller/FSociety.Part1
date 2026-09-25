"use client"

import gsap from "gsap"
import { useEffect, useRef, type RefObject } from "react"
import type { ControllerSvgHandle } from "../devices/ControllerSvg"

export type ControlDevice = "watch" | "controller" | "both"

/**
 * Animation personality applied to the mount and reaction sequences.
 *
 * - `standard` — deliberate button presses, head looks down, wink at end.
 * - `ascent`   — controller raised; head tilts back as if looking up,
 *                triumphant coin burst, large XP reward.
 * - `earn`     — controller held low; excited head bob + rapid mash,
 *                coin burst fires during mount itself.
 */
export type AnimationVariant = "standard" | "ascent" | "earn"

export type CharacterRefs = {
  wrapRef: RefObject<HTMLDivElement>
  headRef: RefObject<HTMLDivElement>
  deviceRef: RefObject<HTMLDivElement>
  watchRef: RefObject<HTMLDivElement>
  shockRef: RefObject<HTMLDivElement>
  levelUpRef: RefObject<HTMLDivElement>
  xpToastRef: RefObject<HTMLDivElement>
  coinBurstRef: RefObject<HTMLDivElement>
  boltRef: RefObject<HTMLDivElement>
  eyelidRef: RefObject<HTMLDivElement>
  controllerSvgRef: RefObject<ControllerSvgHandle>
}

const CONTROLLER_BUTTON_SEQUENCE = [
  { index: 0, start: 0.9, name: "improve" },
  { index: 1, start: 1.45, name: "heal" },
  { index: 3, start: 2.0, name: "win" },
  { index: 2, start: 2.55, name: "protect" },
] as const

// ─────────────────────────────────────────────────────────────────────
// Mount sequences
// ─────────────────────────────────────────────────────────────────────

function pressControllerButton(
  tl: gsap.core.Timeline,
  refs: CharacterRefs,
  emitPulse: (nodeIndex: number) => void,
  btnIndex: number,
  start: number,
  name: string,
) {
  tl.addLabel(`btn-${name}`, start)
  tl.call(() => {
    refs.controllerSvgRef.current?.pressButton(btnIndex)
    emitPulse(btnIndex)
  }, [], `btn-${name}`)
  tl.to(refs.boltRef.current, { id: `ctrl/bolt-in:${name}`, opacity: 1, scale: 1, duration: 0.12 }, `btn-${name}`)
  tl.to(refs.boltRef.current, { id: `ctrl/bolt-out:${name}`, opacity: 0, scale: 0.4, duration: 0.2 }, start + 0.15)
  tl.call(() => {
    refs.controllerSvgRef.current?.releaseButton()
  }, [], start + 0.35)
}

// ─────────────────────────────────────────────────────────────────────
// Shared coin burst helper — extracted so mount sequences can call it.
// ─────────────────────────────────────────────────────────────────────

interface CoinBurstOpts {
  /** Y destination for the float-up (default: -75). Higher = more dramatic. */
  floatY?: number
  /** Scale multiplier on each coin (default: 1). */
  scaleMult?: number
}

function fireCoinBurst(
  refs: CharacterRefs,
  emitPulse: (nodeIndex: number) => void,
  { floatY = -75, scaleMult = 1 }: CoinBurstOpts = {},
) {
  if (!refs.coinBurstRef.current) return
  refs.coinBurstRef.current.style.display = "block"
  emitPulse(-2)

  const coins = gsap.utils.toArray<HTMLElement>("[data-coin]", refs.coinBurstRef.current)
  if (!coins.length) return
  gsap.killTweensOf(coins)
  gsap.set(coins, { opacity: 0, scale: 0, y: 0, x: 0, rotation: 0 })

  const driftX = [-16, -8, 0, 8, 16]

  gsap.to(coins, {
    opacity: 1,
    scale: (i) => (i === 2 ? 1.3 : 1.1) * scaleMult,
    y: -20,
    x: (i) => driftX[i] ?? 0,
    rotation: (i) => (i % 2 === 0 ? 22 : -22),
    duration: 0.22,
    stagger: 0.045,
    ease: "back.out(2.5)",
  })

  gsap.to(coins, {
    opacity: 0,
    scale: 0.7,
    y: floatY,
    x: (i) => (driftX[i] ?? 0) * 2.2,
    rotation: (i) => (i % 2 === 0 ? 65 : -65),
    duration: 0.5,
    stagger: 0.045,
    ease: "power2.in",
    delay: 0.28,
    onComplete: () => {
      if (refs.coinBurstRef.current) refs.coinBurstRef.current.style.display = "none"
    },
  })
}

function runWatchMountSequence(tl: gsap.core.Timeline, refs: CharacterRefs) {
  tl.addLabel("device-enter", 0.4)
  tl.to(refs.deviceRef.current, { id: "watch/device-enter", opacity: 1, scale: 1, y: 0, duration: 0.4 }, "device-enter")

  const check = (label: string, start: number) => {
    tl.addLabel(label, start)
    tl.to(refs.headRef.current, { id: `watch/${label}/glance-down`, rotate: 12, duration: 0.18 }, label)
    tl.to(refs.headRef.current, { id: `watch/${label}/glance-up`, rotate: 0, duration: 0.22 }, start + 0.22)
  }

  check("check-1", 0.85)
  check("check-2", 1.4)
  check("check-3", 1.95)

  tl.addLabel("wink", 2.55)
  tl.to(refs.eyelidRef.current, { id: "watch/wink-close", scaleY: 1, duration: 0.12 }, "wink")
  tl.to(refs.eyelidRef.current, { id: "watch/wink-open", scaleY: 0, duration: 0.18 }, 2.7)
}

function runControllerMountSequence(
  tl: gsap.core.Timeline,
  refs: CharacterRefs,
  options: {
    device: ControlDevice
    gamification: boolean
    emitPulse: (nodeIndex: number) => void
  },
) {
  tl.addLabel("device-enter", 0.3)
  tl.to(refs.deviceRef.current, { id: "ctrl/device-enter", opacity: 1, scale: 1, y: 0, duration: 0.5 }, "device-enter")

  if (options.device === "both") {
    tl.to(refs.watchRef.current, { id: "ctrl/watch-enter", opacity: 1, scale: 1, duration: 0.4 }, 0.4)
  }

  tl.addLabel("look-down", 0.6)
  tl.to(refs.headRef.current, { id: "ctrl/head-look-down", rotate: 8, duration: 0.3 }, "look-down")

  CONTROLLER_BUTTON_SEQUENCE.forEach((step) => {
    pressControllerButton(tl, refs, options.emitPulse, step.index, step.start, step.name)
  })

  tl.addLabel("head-settle", 2.85)
  tl.to(refs.headRef.current, { id: "ctrl/head-settle", rotate: 0, duration: 0.35 }, "head-settle")

  if (options.gamification) {
    tl.addLabel("xp-toast", 3.05)
    tl.to(refs.xpToastRef.current, { id: "ctrl/xp-toast-in", opacity: 1, y: -8, duration: 0.3 }, "xp-toast")
    tl.to(refs.xpToastRef.current, { id: "ctrl/xp-toast-out", opacity: 0, y: -18, duration: 0.3 }, 3.55)
  }

  tl.addLabel("wink", 3.4)
  tl.to(refs.eyelidRef.current, { id: "ctrl/wink-close", scaleY: 1, duration: 0.12 }, "wink")
  tl.to(refs.eyelidRef.current, { id: "ctrl/wink-open", scaleY: 0, duration: 0.18 }, 3.55)
}

/**
 * ASCENT mount — controller is positioned high; character looks UP.
 *
 * Head tilts back (negative rotation) as if gazing up at the raised controller.
 * Each button press pushes the head a little further back. After settling,
 * a triumphant coin burst erupts upward and a large XP toast fires.
 *
 * Timeline: ~3.5 s total.
 */
function runAscentMountSequence(
  tl: gsap.core.Timeline,
  refs: CharacterRefs,
  options: { gamification: boolean; emitPulse: (nodeIndex: number) => void },
) {
  // Device enters from below (same as standard)
  tl.addLabel("device-enter", 0.3)
  tl.to(refs.deviceRef.current, { id: "asc/device-enter", opacity: 1, scale: 1, y: 0, duration: 0.5 }, "device-enter")

  // Head tilts back as if looking up at the raised controller
  tl.addLabel("look-up", 0.55)
  tl.to(refs.headRef.current, { id: "asc/head-look-up", rotate: -10, duration: 0.4, ease: "power2.inOut" }, "look-up")

  // Button presses — same sequence, but each one nudges the head slightly further back
  const ascentSequence = [
    { index: 0, start: 0.9,  name: "improve", headRotate: -12 },
    { index: 1, start: 1.45, name: "heal",    headRotate: -14 },
    { index: 3, start: 2.0,  name: "win",     headRotate: -13 },
    { index: 2, start: 2.55, name: "protect", headRotate: -11 },
  ]

  ascentSequence.forEach(({ index, start, name, headRotate }) => {
    tl.addLabel(`btn-${name}`, start)
    tl.call(() => {
      refs.controllerSvgRef.current?.pressButton(index)
      options.emitPulse(index)
    }, [], `btn-${name}`)
    tl.to(refs.boltRef.current, { id: `asc/bolt-in:${name}`, opacity: 1, scale: 1, duration: 0.12 }, `btn-${name}`)
    tl.to(refs.boltRef.current, { id: `asc/bolt-out:${name}`, opacity: 0, scale: 0.4, duration: 0.2 }, start + 0.15)
    tl.to(refs.headRef.current, { id: `asc/head:${name}`, rotate: headRotate, duration: 0.2, ease: "power1.inOut" }, `btn-${name}`)
    tl.call(() => { refs.controllerSvgRef.current?.releaseButton() }, [], start + 0.35)
  })

  // Head settles to a proud slight-upward gaze (-6°)
  tl.addLabel("head-settle", 2.85)
  tl.to(refs.headRef.current, { id: "asc/head-settle", rotate: -6, duration: 0.4, ease: "power2.out" }, "head-settle")

  if (options.gamification) {
    // Coin burst fires triumphantly — coins arc high
    tl.addLabel("coin-burst", 3.0)
    tl.call(() => fireCoinBurst(refs, options.emitPulse, { floatY: -100, scaleMult: 1.2 }), [], "coin-burst")

    // Large XP toast
    tl.addLabel("xp-toast", 3.05)
    tl.to(refs.xpToastRef.current, { id: "asc/xp-toast-in", opacity: 1, y: -10, duration: 0.28 }, "xp-toast")
    tl.to(refs.xpToastRef.current, { id: "asc/xp-toast-out", opacity: 0, y: -22, duration: 0.3 }, 3.5)
  }

  // Slow, satisfied blink
  tl.addLabel("wink", 3.35)
  tl.to(refs.eyelidRef.current, { id: "asc/wink-close", scaleY: 1, duration: 0.18 }, "wink")
  tl.to(refs.eyelidRef.current, { id: "asc/wink-open", scaleY: 0, duration: 0.22 }, 3.58)
}

/**
 * EARN mount — controller is held low; character is already excited.
 *
 * Head bobs immediately (anticipation), device enters fast, rapid
 * button mash with head shaking side-to-side, coin burst fires during
 * the mount itself (not just on click), big XP reward.
 *
 * Timeline: ~2.2 s total (shorter — high energy).
 */
function runEarnMountSequence(
  tl: gsap.core.Timeline,
  refs: CharacterRefs,
  options: { gamification: boolean; emitPulse: (nodeIndex: number) => void },
) {
  // Head bobs with anticipation before device enters
  tl.to(refs.headRef.current, { id: "earn/head-bob-1", y: -5, duration: 0.16, ease: "power1.inOut" }, 0)
  tl.to(refs.headRef.current, { id: "earn/head-bob-2", y: 0,  duration: 0.16, ease: "power1.inOut" }, 0.16)
  tl.to(refs.headRef.current, { id: "earn/head-bob-3", y: -4, duration: 0.14, ease: "power1.inOut" }, 0.32)
  tl.to(refs.headRef.current, { id: "earn/head-bob-4", y: 0,  duration: 0.14, ease: "power1.inOut" }, 0.46)

  // Device enters fast — eager
  tl.addLabel("device-enter", 0.2)
  tl.to(refs.deviceRef.current, { id: "earn/device-enter", opacity: 1, scale: 1, y: 0, duration: 0.28, ease: "back.out(1.4)" }, "device-enter")

  // Rapid button mash — all 4 in ~0.55 s (vs 1.7 s standard)
  const earnSequence = [
    { index: 0, start: 0.55, name: "hit-1" },
    { index: 1, start: 0.7,  name: "hit-2" },
    { index: 3, start: 0.85, name: "hit-3" },
    { index: 2, start: 1.0,  name: "hit-4" },
  ]

  earnSequence.forEach(({ index, start, name }) => {
    tl.addLabel(`btn-${name}`, start)
    tl.call(() => {
      refs.controllerSvgRef.current?.pressButton(index)
      options.emitPulse(index)
    }, [], `btn-${name}`)
    tl.to(refs.boltRef.current, { id: `earn/bolt-in:${name}`, opacity: 1, scale: 1.1, duration: 0.1 }, `btn-${name}`)
    tl.to(refs.boltRef.current, { id: `earn/bolt-out:${name}`, opacity: 0, scale: 0.4, duration: 0.15 }, start + 0.12)
    tl.call(() => { refs.controllerSvgRef.current?.releaseButton() }, [], start + 0.28)
  })

  // Head shakes excitedly during the mash (rotate left-right)
  tl.to(refs.headRef.current, { id: "earn/shake-1", rotate: -7, duration: 0.12 }, 0.55)
  tl.to(refs.headRef.current, { id: "earn/shake-2", rotate:  7, duration: 0.12 }, 0.67)
  tl.to(refs.headRef.current, { id: "earn/shake-3", rotate: -5, duration: 0.12 }, 0.79)
  tl.to(refs.headRef.current, { id: "earn/shake-4", rotate:  5, duration: 0.12 }, 0.91)
  tl.to(refs.headRef.current, { id: "earn/shake-settle", rotate: 0, duration: 0.2 }, 1.08)

  if (options.gamification) {
    // Coin burst erupts during mount — the reward is instant
    tl.addLabel("coin-burst", 1.2)
    tl.call(() => fireCoinBurst(refs, options.emitPulse, { floatY: -90, scaleMult: 1.4 }), [], "coin-burst")

    // XP toast pops up fast
    tl.addLabel("xp-toast", 1.25)
    tl.to(refs.xpToastRef.current, { id: "earn/xp-toast-in", opacity: 1, y: -8, duration: 0.22 }, "xp-toast")
    tl.to(refs.xpToastRef.current, { id: "earn/xp-toast-out", opacity: 0, y: -20, duration: 0.25 }, 1.65)
  }

  // Quick, satisfied wink
  tl.addLabel("wink", 1.85)
  tl.to(refs.eyelidRef.current, { id: "earn/wink-close", scaleY: 1, duration: 0.1 }, "wink")
  tl.to(refs.eyelidRef.current, { id: "earn/wink-open", scaleY: 0, duration: 0.15 }, 1.98)
}

// ─────────────────────────────────────────────────────────────────────
// Reaction sequences (hover/click)
// ─────────────────────────────────────────────────────────────────────

function runWatchReactionSequence(
  tl: gsap.core.Timeline,
  refs: CharacterRefs,
  gamification: boolean,
) {
  tl.addLabel("head-jerk")
  tl.to(refs.headRef.current, { id: "watch/react/head-jerk-down", rotate: 14, duration: 0.18 }, "head-jerk")
  tl.to(refs.headRef.current, { id: "watch/react/head-jerk-up", rotate: 0, duration: 0.18 })

  if (!gamification) return

  tl.addLabel("shock-in", "+=0.05")
  tl.to(refs.shockRef.current, { id: "watch/react/shock-in", opacity: 1, scale: 1.2, y: -10, duration: 0.25 }, "shock-in")
  tl.to(refs.deviceRef.current, { id: "watch/react/watch-spin", rotate: -110, duration: 0.35 }, "shock-in")
  tl.fromTo(
    refs.headRef.current,
    { y: 0, scale: 1 },
    { id: "watch/react/head-bounce", y: -6, scale: 1.04, duration: 0.18, yoyo: true, repeat: 1 },
    "shock-in",
  )
  tl.to({}, { duration: 0.4 })
  tl.addLabel("shock-out")
  tl.to(refs.shockRef.current, { id: "watch/react/shock-out", opacity: 0, scale: 0.5, y: 6, duration: 0.25 }, "shock-out")
  tl.to(refs.deviceRef.current, { id: "watch/react/watch-restore", rotate: -45, duration: 0.4 }, "shock-out")
}

function runControllerReactionSequence(
  tl: gsap.core.Timeline,
  refs: CharacterRefs,
  options: {
    gamification: boolean
    emitPulse: (nodeIndex: number) => void
  },
) {
  tl.addLabel("combo-mash")
  const comboButtons = [0, 1, 3, 2]

  comboButtons.forEach((btnIndex, i) => {
    const t = i * 0.12
    tl.call(() => {
      refs.controllerSvgRef.current?.pressButton(btnIndex)
      options.emitPulse(btnIndex)
    }, [], t)
    tl.call(() => {
      refs.controllerSvgRef.current?.releaseButton()
    }, [], t + 0.1)
  })

  tl.addLabel("head-pump", 0.1)
  tl.to(refs.headRef.current, { id: "ctrl/react/head-pump", y: -4, scale: 1.03, duration: 0.15, yoyo: true, repeat: 1 }, "head-pump")

  if (options.gamification) {
    tl.addLabel("coin-burst", 0.4)
    tl.call(() => fireCoinBurst(refs, options.emitPulse), [], "coin-burst")

    tl.addLabel("level-up", 0.45)
    tl.to(refs.levelUpRef.current, { id: "ctrl/react/level-up-in", opacity: 1, scale: 1.15, y: -8, duration: 0.3 }, "level-up")
    options.emitPulse(-1)

    tl.to({}, { duration: 0.5 })
    tl.to(refs.levelUpRef.current, { id: "ctrl/react/level-up-out", opacity: 0, scale: 0.8, y: -14, duration: 0.25 })
  }

  tl.addLabel("sweep-bolt", 0.48)
  tl.to(refs.boltRef.current, { id: "ctrl/react/sweep-bolt-in", opacity: 1, scale: 1.4, duration: 0.15 }, "sweep-bolt")
  tl.to(refs.boltRef.current, { id: "ctrl/react/sweep-bolt-out", opacity: 0, scale: 0.4, duration: 0.3 }, 0.68)
}

/**
 * ASCENT reaction — head arcs back triumphantly, coins fly high.
 */
function runAscentReactionSequence(
  tl: gsap.core.Timeline,
  refs: CharacterRefs,
  options: { gamification: boolean; emitPulse: (nodeIndex: number) => void },
) {
  const comboButtons = [0, 1, 3, 2]
  comboButtons.forEach((btnIndex, i) => {
    const t = i * 0.12
    tl.call(() => { refs.controllerSvgRef.current?.pressButton(btnIndex); options.emitPulse(btnIndex) }, [], t)
    tl.call(() => { refs.controllerSvgRef.current?.releaseButton() }, [], t + 0.1)
  })

  // Head arcs back — triumphant
  tl.addLabel("head-arc", 0.08)
  tl.to(refs.headRef.current, { id: "asc/react/head-arc-back", rotate: -16, y: -5, scale: 1.04, duration: 0.22, ease: "back.out(1.5)" }, "head-arc")
  tl.to(refs.headRef.current, { id: "asc/react/head-settle", rotate: -6, y: 0, scale: 1, duration: 0.35 }, 0.35)

  if (options.gamification) {
    tl.addLabel("coin-burst", 0.3)
    tl.call(() => fireCoinBurst(refs, options.emitPulse, { floatY: -110, scaleMult: 1.3 }), [], "coin-burst")

    tl.addLabel("level-up", 0.38)
    tl.to(refs.levelUpRef.current, { id: "asc/react/level-up-in", opacity: 1, scale: 1.2, y: -10, duration: 0.3 }, "level-up")
    options.emitPulse(-1)

    tl.to({}, { duration: 0.5 })
    tl.to(refs.levelUpRef.current, { id: "asc/react/level-up-out", opacity: 0, scale: 0.8, y: -18, duration: 0.25 })
  }

  tl.addLabel("sweep-bolt", 0.44)
  tl.to(refs.boltRef.current, { id: "asc/react/sweep-bolt-in", opacity: 1, scale: 1.6, duration: 0.15 }, "sweep-bolt")
  tl.to(refs.boltRef.current, { id: "asc/react/sweep-bolt-out", opacity: 0, scale: 0.4, duration: 0.3 }, 0.64)
}

/**
 * EARN reaction — frantic rapid mash, head shakes, immediate coin explosion.
 */
function runEarnReactionSequence(
  tl: gsap.core.Timeline,
  refs: CharacterRefs,
  options: { gamification: boolean; emitPulse: (nodeIndex: number) => void },
) {
  // Faster mash — 60 ms between presses
  const comboButtons = [0, 1, 3, 2]
  comboButtons.forEach((btnIndex, i) => {
    const t = i * 0.06
    tl.call(() => { refs.controllerSvgRef.current?.pressButton(btnIndex); options.emitPulse(btnIndex) }, [], t)
    tl.call(() => { refs.controllerSvgRef.current?.releaseButton() }, [], t + 0.05)
  })

  // Head shakes side-to-side (excited, not a pump)
  tl.to(refs.headRef.current, { id: "earn/react/shake-1", rotate: -9, duration: 0.1 }, 0.04)
  tl.to(refs.headRef.current, { id: "earn/react/shake-2", rotate:  9, duration: 0.1 }, 0.14)
  tl.to(refs.headRef.current, { id: "earn/react/shake-3", rotate: -6, duration: 0.1 }, 0.24)
  tl.to(refs.headRef.current, { id: "earn/react/shake-4", rotate:  0, duration: 0.18 }, 0.34)

  if (options.gamification) {
    // Coins fire immediately — biggest burst
    tl.addLabel("coin-burst", 0.12)
    tl.call(() => fireCoinBurst(refs, options.emitPulse, { floatY: -95, scaleMult: 1.5 }), [], "coin-burst")

    tl.addLabel("level-up", 0.2)
    tl.to(refs.levelUpRef.current, { id: "earn/react/level-up-in", opacity: 1, scale: 1.15, y: -8, duration: 0.28 }, "level-up")
    options.emitPulse(-1)

    tl.to({}, { duration: 0.45 })
    tl.to(refs.levelUpRef.current, { id: "earn/react/level-up-out", opacity: 0, scale: 0.8, y: -14, duration: 0.22 })
  }

  tl.addLabel("sweep-bolt", 0.18)
  tl.to(refs.boltRef.current, { id: "earn/react/sweep-bolt-in", opacity: 1, scale: 1.8, duration: 0.12 }, "sweep-bolt")
  tl.to(refs.boltRef.current, { id: "earn/react/sweep-bolt-out", opacity: 0, scale: 0.4, duration: 0.22 }, 0.32)
}

// ─────────────────────────────────────────────────────────────────────
// Public hook
// ─────────────────────────────────────────────────────────────────────

export interface UseControlAnimationArgs {
  refs: CharacterRefs
  device: ControlDevice
  gamification: boolean
  emitPulse: (nodeIndex: number) => void
  /** Which mount + reaction personality to use (default: "standard") */
  animationVariant?: AnimationVariant
}

/**
 * Wires up the mount-time GSAP timeline for the VisionControlCharacter
 * and returns a `playReaction()` function for hover/click handlers.
 */
export function useControlAnimation({
  refs,
  device,
  gamification,
  emitPulse,
  animationVariant = "standard",
}: UseControlAnimationArgs) {
  const reactionTl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!refs.wrapRef.current) return

    gsap.set(refs.deviceRef.current, { opacity: 0, scale: 0.7, y: 10 })
    gsap.set(refs.levelUpRef.current, { opacity: 0, scale: 0.5, y: 6 })
    gsap.set(refs.xpToastRef.current, { opacity: 0, y: 4 })
    gsap.set(refs.boltRef.current, { opacity: 0, scale: 0.5 })
    gsap.set(refs.eyelidRef.current, { scaleY: 0, transformOrigin: "50% 0%" })
    gsap.set(refs.headRef.current, { rotate: 0, transformOrigin: "50% 100%" })

    if (device === "watch" || device === "both") {
      const watchDot = refs.wrapRef.current.querySelector(".watch-dot")
      if (watchDot) {
        gsap.to(watchDot, {
          id: "watch/watch-dot-pulse",
          opacity: 0.4,
          repeat: -1,
          yoyo: true,
          duration: 1.0,
          ease: "sine.inOut",
        })
      }
      if (device === "both") {
        gsap.set(refs.watchRef.current, { opacity: 0, scale: 0.7 })
      }
    }

    const tl = gsap.timeline({ id: "vision-control:mount", defaults: { ease: "power2.out" } })
    if (device === "watch") {
      runWatchMountSequence(tl, refs)
    } else if (animationVariant === "ascent") {
      runAscentMountSequence(tl, refs, { gamification, emitPulse })
    } else if (animationVariant === "earn") {
      runEarnMountSequence(tl, refs, { gamification, emitPulse })
    } else {
      runControllerMountSequence(tl, refs, { device, gamification, emitPulse })
    }

    return () => {
      tl.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device, gamification, animationVariant])

  const playReaction = () => {
    if (reactionTl.current?.isActive()) return

    const tl = gsap.timeline({ id: "vision-control:reaction", defaults: { ease: "power3.out" } })
    reactionTl.current = tl

    if (device === "watch") {
      runWatchReactionSequence(tl, refs, gamification)
    } else if (animationVariant === "ascent") {
      runAscentReactionSequence(tl, refs, { gamification, emitPulse })
    } else if (animationVariant === "earn") {
      runEarnReactionSequence(tl, refs, { gamification, emitPulse })
    } else {
      runControllerReactionSequence(tl, refs, { gamification, emitPulse })
    }
  }

  return { playReaction }
}
