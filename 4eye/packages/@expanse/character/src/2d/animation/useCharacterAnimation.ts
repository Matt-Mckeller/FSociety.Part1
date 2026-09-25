"use client"

/**
 * useCharacterAnimation - GSAP-powered character animation hook
 *
 * Provides smooth transitions between poses and support for secondary animations
 * (like hands oscillating while pushing).
 *
 * Architecture:
 * - GSAP tweens mutable ref objects (never React state directly)
 * - On each tick, syncState() reads refs → updates React state
 * - Progress comes from GSAP timeline (0→1), not position calculations
 */

import { useRef, useState, useCallback, useEffect } from "react"
import gsap from "gsap"
import { POSES, getTransitionDefaults, WALKING_CYCLES } from "./poseRegistry"
import type {
  CharacterAnimationState,
  TransitionOptions,
  SecondaryAnimationConfig,
} from "./types"
import type { CharacterPose, PoseId } from "./poses"
import type { LimbPoints, LegPoints, ArcPoint } from "../geometry/points"

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/** Deep clone a pose to avoid mutating the registry */
function clonePose(pose: CharacterPose): CharacterPose {
  return {
    head: { ...pose.head },
    body: pose.body.map((p) => ({ ...p })) as LimbPoints,
    leftArm: pose.leftArm.map((p) => ({ ...p })) as LimbPoints,
    rightArm: pose.rightArm.map((p) => ({ ...p })) as LimbPoints,
    leftLeg: pose.leftLeg.map((p) => ({ ...p })) as LegPoints,
    rightLeg: pose.rightLeg.map((p) => ({ ...p })) as LegPoints,
  }
}

/** Interpolate between two values */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** Interpolate a limb (array of points) between start and target */
function interpolateLimb<T extends { x: number; y: number }>(
  start: T[],
  target: T[],
  progress: number,
  offsets?: { x: number; y: number }[]
): T[] {
  return start.map((startPt, i) => {
    const targetPt = target[i]
    const offset = offsets?.[i] ?? { x: 0, y: 0 }
    return {
      ...targetPt, // Preserve any extra properties (arcRadius, etc.)
      x: lerp(startPt.x, targetPt.x, progress) + offset.x,
      y: lerp(startPt.y, targetPt.y, progress) + offset.y,
    } as T
  })
}

/** Create empty offset array for a limb */
function createZeroOffsets() {
  return [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]
}

// ============================================================================
// TYPES
// ============================================================================

export interface UseCharacterAnimationOptions {
  /** Initial pose ID */
  initialPose?: PoseId
  /** Default walking speed (seconds per cycle). Default: 0.8 */
  walkingSpeed?: number
}

export interface WalkingOptions {
  /** Override walking speed for this cycle */
  speed?: number
}

export interface UseCharacterAnimationReturn {
  /** Current animation state for rendering */
  state: CharacterAnimationState
  /** Transition to a new pose with smooth interpolation */
  transitionToPose: (poseId: PoseId, options?: TransitionOptions) => void
  /** Start a secondary animation (returns animation ID) */
  startSecondaryAnimation: (config: SecondaryAnimationConfig) => string
  /** Stop a specific secondary animation */
  stopSecondaryAnimation: (id: string) => void
  /** Stop all secondary animations */
  stopAllSecondaryAnimations: () => void
  /** Start walking leg cycle */
  startWalking: (poseId?: PoseId, options?: WalkingOptions) => void
  /** Stop walking leg cycle */
  stopWalking: () => void
  /** Pause all animations */
  pause: () => void
  /** Resume all animations */
  resume: () => void
  /** Get current transition progress (0-1) */
  getProgress: () => number
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

export function useCharacterAnimation(
  options: UseCharacterAnimationOptions = {}
): UseCharacterAnimationReturn {
  const { initialPose = "facingForward", walkingSpeed = 0.8 } = options

  // -------------------------------------------------------------------------
  // REFS - Mutable state that GSAP tweens
  // -------------------------------------------------------------------------

  const refs = useRef({
    // Current transition progress (0→1), updated by GSAP
    progress: { value: 1 },

    // Start and target poses for interpolation
    startPose: clonePose(POSES[initialPose]),
    targetPose: clonePose(POSES[initialPose]),

    // Secondary animation offsets (applied after pose interpolation)
    offsets: {
      leftArm: createZeroOffsets(),
      rightArm: createZeroOffsets(),
      leftLeg: createZeroOffsets(),
      rightLeg: createZeroOffsets(),
    },

    // Walking state
    isWalking: false,
    walkingLegTargets: {
      leftLeg: POSES[initialPose].leftLeg.map((p) => ({ ...p })),
      rightLeg: POSES[initialPose].rightLeg.map((p) => ({ ...p })),
    },
  })

  // Timeline refs
  const mainTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const walkingTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const secondaryAnimationsRef = useRef<Map<string, gsap.core.Timeline>>(
    new Map()
  )

  // Animation ID counter
  const animationIdRef = useRef(0)

  // -------------------------------------------------------------------------
  // REACT STATE - What gets rendered
  // -------------------------------------------------------------------------

  const [state, setState] = useState<CharacterAnimationState>(() => ({
    head: POSES[initialPose].head,
    body: POSES[initialPose].body,
    leftArm: POSES[initialPose].leftArm,
    rightArm: POSES[initialPose].rightArm,
    leftLeg: POSES[initialPose].leftLeg,
    rightLeg: POSES[initialPose].rightLeg,
    currentPose: initialPose,
    isTransitioning: false,
    activeSecondaryAnimations: [],
  }))

  // -------------------------------------------------------------------------
  // SYNC STATE - Called on every GSAP tick
  // -------------------------------------------------------------------------

  const syncState = useCallback(() => {
    const r = refs.current
    const progress = r.progress.value
    const start = r.startPose
    const target = r.targetPose
    const offsets = r.offsets

    // Interpolate head (relative to body anchor)
    const bodyProgress = interpolateLimb(start.body, target.body, progress)
    const startHeadOffset = {
      x: start.head.x - start.body[0].x,
      y: start.head.y - start.body[0].y,
    }
    const targetHeadOffset = {
      x: target.head.x - target.body[0].x,
      y: target.head.y - target.body[0].y,
    }
    const head = {
      x: bodyProgress[0].x + lerp(startHeadOffset.x, targetHeadOffset.x, progress),
      y: bodyProgress[0].y + lerp(startHeadOffset.y, targetHeadOffset.y, progress),
    }

    // Interpolate arms with secondary offsets
    const leftArm = interpolateLimb(
      start.leftArm,
      target.leftArm,
      progress,
      offsets.leftArm
    ) as LimbPoints
    const rightArm = interpolateLimb(
      start.rightArm,
      target.rightArm,
      progress,
      offsets.rightArm
    ) as LimbPoints

    // Legs: use walking targets if walking, otherwise interpolate
    let leftLeg: LegPoints
    let rightLeg: LegPoints

    if (r.isWalking) {
      // Walking: GSAP is animating walkingLegTargets directly
      leftLeg = r.walkingLegTargets.leftLeg.map((p) => ({ ...p })) as LegPoints
      rightLeg = r.walkingLegTargets.rightLeg.map((p) => ({ ...p })) as LegPoints
    } else {
      // Normal: interpolate between poses
      leftLeg = interpolateLimb(start.leftLeg, target.leftLeg, progress) as LegPoints
      rightLeg = interpolateLimb(start.rightLeg, target.rightLeg, progress) as LegPoints
    }

    setState((prev) => ({
      ...prev,
      head,
      body: bodyProgress as LimbPoints,
      leftArm,
      rightArm,
      leftLeg,
      rightLeg,
    }))
  }, [])

  // -------------------------------------------------------------------------
  // TRANSITION TO POSE
  // -------------------------------------------------------------------------

  const transitionToPose = useCallback(
    (poseId: PoseId, options: TransitionOptions = {}) => {
      const targetPose = POSES[poseId]
      if (!targetPose) {
        console.error(`Unknown pose: ${poseId}`)
        return
      }

      const r = refs.current

      // Capture current interpolated state as new start pose
      // This enables smooth interruption of in-progress transitions
      const currentProgress = r.progress.value
      r.startPose = {
        head: {
          x: lerp(r.startPose.head.x, r.targetPose.head.x, currentProgress),
          y: lerp(r.startPose.head.y, r.targetPose.head.y, currentProgress),
        },
        body: interpolateLimb(r.startPose.body, r.targetPose.body, currentProgress) as LimbPoints,
        leftArm: interpolateLimb(r.startPose.leftArm, r.targetPose.leftArm, currentProgress) as LimbPoints,
        rightArm: interpolateLimb(r.startPose.rightArm, r.targetPose.rightArm, currentProgress) as LimbPoints,
        leftLeg: interpolateLimb(r.startPose.leftLeg, r.targetPose.leftLeg, currentProgress) as LegPoints,
        rightLeg: interpolateLimb(r.startPose.rightLeg, r.targetPose.rightLeg, currentProgress) as LegPoints,
      }
      r.targetPose = clonePose(targetPose)

      // Get transition settings
      const defaults = getTransitionDefaults(state.currentPose, poseId)
      const duration = options.duration ?? defaults?.duration ?? 0.4
      const ease = options.ease ?? defaults?.ease ?? "power2.inOut"

      // Kill existing transition
      mainTimelineRef.current?.kill()

      // Reset progress
      r.progress.value = 0

      // Create timeline - tweens progress from 0→1
      const tl = gsap.timeline({
        onUpdate: syncState,
        onStart: () => setState((prev) => ({ ...prev, isTransitioning: true })),
        onComplete: () => {
          r.startPose = clonePose(targetPose)
          r.progress.value = 1
          setState((prev) => ({
            ...prev,
            isTransitioning: false,
            currentPose: poseId,
          }))
          options.onComplete?.()
        },
      })

      // Single tween for progress - much cleaner than tweening every point
      tl.to(r.progress, {
        value: 1,
        duration,
        ease,
      })

      mainTimelineRef.current = tl
    },
    [state.currentPose, syncState]
  )

  // -------------------------------------------------------------------------
  // SECONDARY ANIMATIONS
  // -------------------------------------------------------------------------

  const startSecondaryAnimation = useCallback(
    (config: SecondaryAnimationConfig): string => {
      const id = `secondary_${++animationIdRef.current}`
      const r = refs.current
      const limbOffsets = r.offsets[config.target as keyof typeof r.offsets]

      if (!limbOffsets) {
        console.warn(`Unknown target: ${config.target}`)
        return id
      }

      // Kill existing animation on this limb
      secondaryAnimationsRef.current.get(id)?.kill()

      // Base pose for calculating offsets
      const baseLimb = r.targetPose[config.target as keyof CharacterPose] as {
        x: number
        y: number
      }[]

      // Create timeline cycling through keyframes
      const tl = gsap.timeline({
        repeat: config.repeat,
        yoyo: config.yoyo,
        onUpdate: syncState,
      })

      const frameTime = config.duration / config.keyframes.length

      config.keyframes.forEach((frame, frameIndex) => {
        frame.forEach((point, pointIndex) => {
          const basePoint = baseLimb[pointIndex]
          tl.to(
            limbOffsets[pointIndex],
            {
              x: point.x - basePoint.x,
              y: point.y - basePoint.y,
              duration: frameTime,
              ease: config.ease ?? "sine.inOut",
            },
            frameIndex * frameTime
          )
        })
      })

      secondaryAnimationsRef.current.set(id, tl)
      setState((prev) => ({
        ...prev,
        activeSecondaryAnimations: [...prev.activeSecondaryAnimations, config.name],
      }))

      return id
    },
    [syncState]
  )

  const stopSecondaryAnimation = useCallback((id: string) => {
    const tween = secondaryAnimationsRef.current.get(id)
    if (tween) {
      tween.kill()
      secondaryAnimationsRef.current.delete(id)
    }
  }, [])

  const stopAllSecondaryAnimations = useCallback(() => {
    secondaryAnimationsRef.current.forEach((tl) => tl.kill())
    secondaryAnimationsRef.current.clear()

    // Reset offsets
    const r = refs.current
    Object.values(r.offsets).forEach((limb) => {
      limb.forEach((pt) => {
        pt.x = 0
        pt.y = 0
      })
    })

    setState((prev) => ({ ...prev, activeSecondaryAnimations: [] }))
  }, [])

  // -------------------------------------------------------------------------
  // WALKING CYCLE
  // -------------------------------------------------------------------------

  const startWalking = useCallback(
    (poseId?: PoseId, options: WalkingOptions = {}) => {
      const effectivePoseId = poseId ?? state.currentPose
      const cycle = WALKING_CYCLES[effectivePoseId]

      if (!cycle) {
        console.warn(`No walking cycle for pose: ${effectivePoseId}`)
        return
      }

      walkingTimelineRef.current?.kill()

      const r = refs.current
      r.isWalking = true

      // Initialize walking targets from first frame
      cycle.leftLeg[0].forEach((pt, i) => {
        Object.assign(r.walkingLegTargets.leftLeg[i], pt)
      })
      cycle.rightLeg[0].forEach((pt, i) => {
        Object.assign(r.walkingLegTargets.rightLeg[i], pt)
      })

      const speed = options.speed ?? walkingSpeed
      const frameTime = speed / cycle.leftLeg.length

      const tl = gsap.timeline({
        repeat: -1,
        onUpdate: syncState,
      })

      // Animate through leg frames
      cycle.leftLeg.forEach((frame, frameIndex) => {
        frame.forEach((point, pointIndex) => {
          tl.to(
            r.walkingLegTargets.leftLeg[pointIndex],
            {
              x: point.x,
              y: point.y,
              // Snap arc properties (don't interpolate 0/1 flags)
              ...((point as ArcPoint).arcRadius !== undefined && {
                arcRadius: point.arcRadius,
              }),
              duration: frameTime,
              ease: "power1.inOut",
              onStart: () => {
                // Snap arc flags at frame start
                const target = r.walkingLegTargets.leftLeg[pointIndex] as ArcPoint
                if ((point as ArcPoint).arcLargeFlag !== undefined) {
                  target.arcLargeFlag = (point as ArcPoint).arcLargeFlag
                  target.arcSweepFlag = (point as ArcPoint).arcSweepFlag
                }
              },
            },
            frameIndex * frameTime
          )
        })
      })

      cycle.rightLeg.forEach((frame, frameIndex) => {
        frame.forEach((point, pointIndex) => {
          tl.to(
            r.walkingLegTargets.rightLeg[pointIndex],
            {
              x: point.x,
              y: point.y,
              ...((point as ArcPoint).arcRadius !== undefined && {
                arcRadius: point.arcRadius,
              }),
              duration: frameTime,
              ease: "power1.inOut",
              onStart: () => {
                const target = r.walkingLegTargets.rightLeg[pointIndex] as ArcPoint
                if ((point as ArcPoint).arcLargeFlag !== undefined) {
                  target.arcLargeFlag = (point as ArcPoint).arcLargeFlag
                  target.arcSweepFlag = (point as ArcPoint).arcSweepFlag
                }
              },
            },
            frameIndex * frameTime
          )
        })
      })

      walkingTimelineRef.current = tl
    },
    [state.currentPose, walkingSpeed, syncState]
  )

  const stopWalking = useCallback(() => {
    walkingTimelineRef.current?.kill()
    walkingTimelineRef.current = null
    refs.current.isWalking = false
  }, [])

  // -------------------------------------------------------------------------
  // PAUSE / RESUME
  // -------------------------------------------------------------------------

  const pause = useCallback(() => {
    mainTimelineRef.current?.pause()
    walkingTimelineRef.current?.pause()
    secondaryAnimationsRef.current.forEach((tl) => tl.pause())
  }, [])

  const resume = useCallback(() => {
    mainTimelineRef.current?.resume()
    walkingTimelineRef.current?.resume()
    secondaryAnimationsRef.current.forEach((tl) => tl.resume())
  }, [])

  const getProgress = useCallback(() => refs.current.progress.value, [])

  // -------------------------------------------------------------------------
  // CLEANUP
  // -------------------------------------------------------------------------

  useEffect(() => {
    return () => {
      mainTimelineRef.current?.kill()
      walkingTimelineRef.current?.kill()
      secondaryAnimationsRef.current.forEach((tl) => tl.kill())
    }
  }, [])

  // -------------------------------------------------------------------------
  // RETURN API
  // -------------------------------------------------------------------------

  return {
    state,
    transitionToPose,
    startSecondaryAnimation,
    stopSecondaryAnimation,
    stopAllSecondaryAnimations,
    startWalking,
    stopWalking,
    pause,
    resume,
    getProgress,
  }
}
