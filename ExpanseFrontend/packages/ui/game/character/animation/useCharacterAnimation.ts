"use client"

/**
 * useCharacterAnimation - GSAP-powered character animation hook
 * 
 * Provides smooth transitions between poses and support for secondary animations
 * (like hands oscillating while pushing).
 */

import { useRef, useState, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import {
  POSES,
  getTransitionDefaults,
  WALKING_CYCLES,
} from './poseRegistry'
import type {
  CharacterAnimationState,
  CharacterPose,
  PoseId,
  TransitionOptions,
  SecondaryAnimationConfig,
  Point2D,
  LimbPoints,
  LegPoints,
} from './types'

/**
 * Deep clone a pose to avoid mutating the registry
 */
function clonePose(pose: CharacterPose): CharacterPose {
  return {
    head: { ...pose.head },
    body: pose.body.map(p => ({ ...p })) as LimbPoints,
    leftArm: pose.leftArm.map(p => ({ ...p })) as LimbPoints,
    rightArm: pose.rightArm.map(p => ({ ...p })) as LimbPoints,
    leftLeg: pose.leftLeg.map(p => ({ ...p })) as LegPoints,
    rightLeg: pose.rightLeg.map(p => ({ ...p })) as LegPoints,
  }
}

/**
 * Create interpolation targets that GSAP can tween
 */
function createAnimationTargets(pose: CharacterPose) {
  return {
    head: { ...pose.head },
    body: pose.body.map(p => ({ ...p })),
    leftArm: pose.leftArm.map(p => ({ ...p })),
    rightArm: pose.rightArm.map(p => ({ ...p })),
    leftLeg: pose.leftLeg.map(p => ({ ...p })),
    rightLeg: pose.rightLeg.map(p => ({ ...p })),
  }
}

export interface UseCharacterAnimationOptions {
  /** Initial pose ID */
  initialPose?: PoseId
  /** Auto-start walking animation when in walking poses */
  autoWalk?: boolean
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
  /** Start walking leg cycle (optionally specify pose ID for timing-sensitive calls) */
  startWalking: (overridePoseId?: PoseId) => void
  /** Stop walking leg cycle */
  stopWalking: () => void
  /** Pause all animations */
  pause: () => void
  /** Resume all animations */
  resume: () => void
}

export function useCharacterAnimation(
  options: UseCharacterAnimationOptions = {}
): UseCharacterAnimationReturn {
  const { initialPose = 'facingForward', autoWalk = false } = options
  
  // Animation targets - these are the objects GSAP tweens
  const targetsRef = useRef(createAnimationTargets(POSES[initialPose]))
  
  // Main timeline for pose transitions
  const mainTimelineRef = useRef<gsap.core.Timeline | null>(null)
  
  // Secondary animation tweens
  const secondaryAnimationsRef = useRef<Map<string, gsap.core.Tween>>(new Map())
  
  // Walking cycle timeline
  const walkingTimelineRef = useRef<gsap.core.Timeline | null>(null)
  
  // Flag to track if walking animation is active (legs should use targets directly)
  const isWalkingRef = useRef(false)
  
  // Counter for generating unique secondary animation IDs
  const animationIdCounter = useRef(0)
  
  // Track poses for constraint calculations (start and target)
  const startPoseRef = useRef<CharacterPose>(POSES[initialPose])
  const targetPoseRef = useRef<CharacterPose>(POSES[initialPose])
  
  // Secondary animation offsets - applied on top of pose interpolation
  // These are the values GSAP tweens for secondary animations
  const secondaryOffsetsRef = useRef({
    leftArm: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    rightArm: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    leftLeg: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    rightLeg: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
  })
  
  // React state for rendering
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
  
  /**
   * Update React state from animation targets, enforcing skeletal constraints
   * to ensure limbs stay attached to the body during transitions.
   * 
   * Interpolates head/limb offsets between start and target poses based on
   * body position progress. Body is the anchor - all parts follow its movement.
   */
  const syncStateFromTargets = useCallback(() => {
    const t = targetsRef.current
    const startPose = startPoseRef.current
    const targetPose = targetPoseRef.current
    
    // Current body position (this is the anchor that GSAP is tweening)
    const body = t.body.map(p => ({ ...p })) as LimbPoints
    
    // Calculate transition progress based on body[0] position
    // Use distance-based interpolation to handle any direction of movement
    const startToTarget = {
      x: targetPose.body[0].x - startPose.body[0].x,
      y: targetPose.body[0].y - startPose.body[0].y,
    }
    const startToCurrent = {
      x: body[0].x - startPose.body[0].x,
      y: body[0].y - startPose.body[0].y,
    }
    
    // Calculate progress (0 to 1) based on projection onto start-to-target vector
    const totalDist = Math.sqrt(startToTarget.x ** 2 + startToTarget.y ** 2)
    let progress = 0
    if (totalDist > 0.001) {
      const dotProduct = startToCurrent.x * startToTarget.x + startToCurrent.y * startToTarget.y
      progress = Math.max(0, Math.min(1, dotProduct / (totalDist * totalDist)))
    } else {
      // No body movement, use target pose
      progress = 1
    }
    
    // Interpolate head position: blend between start and target offsets
    const startHeadOffset = {
      x: startPose.head.x - startPose.body[0].x,
      y: startPose.head.y - startPose.body[0].y,
    }
    const targetHeadOffset = {
      x: targetPose.head.x - targetPose.body[0].x,
      y: targetPose.head.y - targetPose.body[0].y,
    }
    const headOffset = {
      x: startHeadOffset.x + (targetHeadOffset.x - startHeadOffset.x) * progress,
      y: startHeadOffset.y + (targetHeadOffset.y - startHeadOffset.y) * progress,
    }
    const head = {
      x: body[0].x + headOffset.x,
      y: body[0].y + headOffset.y,
    }
    
    // Interpolate arm positions: each point interpolates independently
    // This handles the "merged shoulder" in pushing poses where arm[0] is NOT at body[0]
    // Then apply secondary animation offsets
    const secOffsets = secondaryOffsetsRef.current
    
    const leftArm = startPose.leftArm.map((startPt, i) => {
      const targetPt = targetPose.leftArm[i]
      // Direct interpolation between start and target positions
      return {
        x: startPt.x + (targetPt.x - startPt.x) * progress + secOffsets.leftArm[i].x,
        y: startPt.y + (targetPt.y - startPt.y) * progress + secOffsets.leftArm[i].y,
      }
    }) as LimbPoints
    
    const rightArm = startPose.rightArm.map((startPt, i) => {
      const targetPt = targetPose.rightArm[i]
      // Direct interpolation between start and target positions
      return {
        x: startPt.x + (targetPt.x - startPt.x) * progress + secOffsets.rightArm[i].x,
        y: startPt.y + (targetPt.y - startPt.y) * progress + secOffsets.rightArm[i].y,
      }
    }) as LimbPoints
    
    // Interpolate leg positions - when walking, use targets directly
    // Otherwise interpolate between start and target poses
    let leftLeg: LegPoints
    let rightLeg: LegPoints
    
    if (isWalkingRef.current) {
      // Walking mode: use targets directly (GSAP is animating them in the walking cycle)
      leftLeg = t.leftLeg.map(pt => ({
        x: pt.x,
        y: pt.y,
        arcRadius: pt.arcRadius,
        arcLargeFlag: pt.arcLargeFlag,
        arcSweepFlag: pt.arcSweepFlag,
      })) as LegPoints
      
      rightLeg = t.rightLeg.map(pt => ({
        x: pt.x,
        y: pt.y,
        arcRadius: pt.arcRadius,
        arcLargeFlag: pt.arcLargeFlag,
        arcSweepFlag: pt.arcSweepFlag,
      })) as LegPoints
    } else {
      // Normal mode: direct interpolation with arc properties
      leftLeg = startPose.leftLeg.map((startPt, i) => {
        const targetPt = targetPose.leftLeg[i]
        return {
          x: startPt.x + (targetPt.x - startPt.x) * progress,
          y: startPt.y + (targetPt.y - startPt.y) * progress,
          // Preserve arc properties - use target's arc params
          arcRadius: targetPt.arcRadius,
          arcLargeFlag: targetPt.arcLargeFlag,
          arcSweepFlag: targetPt.arcSweepFlag,
        }
      }) as LegPoints
      
      rightLeg = startPose.rightLeg.map((startPt, i) => {
        const targetPt = targetPose.rightLeg[i]
        return {
          x: startPt.x + (targetPt.x - startPt.x) * progress,
          y: startPt.y + (targetPt.y - startPt.y) * progress,
          // Preserve arc properties - use target's arc params
          arcRadius: targetPt.arcRadius,
          arcLargeFlag: targetPt.arcLargeFlag,
          arcSweepFlag: targetPt.arcSweepFlag,
        }
      }) as LegPoints
    }
    
    setState(prev => ({
      ...prev,
      head,
      body,
      leftArm,
      rightArm,
      leftLeg,
      rightLeg,
    }))
  }, [])
  
  /**
   * Transition to a new pose with smooth interpolation
   */
  const transitionToPose = useCallback((poseId: PoseId, options: TransitionOptions = {}) => {
    const targetPose = POSES[poseId]
    if (!targetPose) {
      console.error(`Unknown pose: ${poseId}`)
      return
    }
    
    // Store current pose as start, and new pose as target for constraint calculations
    startPoseRef.current = clonePose(POSES[state.currentPose])
    targetPoseRef.current = targetPose
    
    // Get default transition settings
    const defaults = getTransitionDefaults(state.currentPose, poseId)
    const duration = options.duration ?? defaults?.duration ?? 0.4
    const ease = options.ease ?? defaults?.ease ?? 'power2.inOut'
    const limbTimings = options.limbTimings ?? defaults?.limbTimings ?? {}
    
    // Kill any existing transition
    mainTimelineRef.current?.kill()
    
    // Create new timeline
    const tl = gsap.timeline({
      onUpdate: syncStateFromTargets,
      onStart: () => setState(prev => ({ ...prev, isTransitioning: true })),
      onComplete: () => {
        // Update startPose to match target so future calculations are based on current pose
        startPoseRef.current = clonePose(targetPose)
        setState(prev => ({ 
          ...prev, 
          isTransitioning: false, 
          currentPose: poseId 
        }))
        options.onComplete?.()
      },
    })
    
    const targets = targetsRef.current
    
    // Head transition
    const headTiming = limbTimings.head ?? {}
    tl.to(targets.head, {
      x: targetPose.head.x,
      y: targetPose.head.y,
      duration: headTiming.duration ?? duration,
      ease: headTiming.ease ?? ease,
      delay: headTiming.delay ?? 0,
    }, 0)
    
    // Body transition (3 points)
    const bodyTiming = limbTimings.body ?? {}
    targetPose.body.forEach((point, i) => {
      tl.to(targets.body[i], {
        x: point.x,
        y: point.y,
        duration: bodyTiming.duration ?? duration,
        ease: bodyTiming.ease ?? ease,
        delay: bodyTiming.delay ?? 0,
      }, 0)
    })
    
    // Left arm transition
    const leftArmTiming = limbTimings.leftArm ?? {}
    targetPose.leftArm.forEach((point, i) => {
      tl.to(targets.leftArm[i], {
        x: point.x,
        y: point.y,
        duration: leftArmTiming.duration ?? duration,
        ease: leftArmTiming.ease ?? ease,
        delay: leftArmTiming.delay ?? 0,
      }, 0)
    })
    
    // Right arm transition
    const rightArmTiming = limbTimings.rightArm ?? {}
    targetPose.rightArm.forEach((point, i) => {
      tl.to(targets.rightArm[i], {
        x: point.x,
        y: point.y,
        duration: rightArmTiming.duration ?? duration,
        ease: rightArmTiming.ease ?? ease,
        delay: rightArmTiming.delay ?? 0,
      }, 0)
    })
    
    // Left leg transition (includes arc parameters)
    const leftLegTiming = limbTimings.leftLeg ?? {}
    targetPose.leftLeg.forEach((point, i) => {
      tl.to(targets.leftLeg[i], {
        x: point.x,
        y: point.y,
        arcRadius: point.arcRadius,
        arcLargeFlag: point.arcLargeFlag,
        arcSweepFlag: point.arcSweepFlag,
        duration: leftLegTiming.duration ?? duration,
        ease: leftLegTiming.ease ?? ease,
        delay: leftLegTiming.delay ?? 0,
      }, 0)
    })
    
    // Right leg transition
    const rightLegTiming = limbTimings.rightLeg ?? {}
    targetPose.rightLeg.forEach((point, i) => {
      tl.to(targets.rightLeg[i], {
        x: point.x,
        y: point.y,
        arcRadius: point.arcRadius,
        arcLargeFlag: point.arcLargeFlag,
        arcSweepFlag: point.arcSweepFlag,
        duration: rightLegTiming.duration ?? duration,
        ease: rightLegTiming.ease ?? ease,
        delay: rightLegTiming.delay ?? 0,
      }, 0)
    })
    
    mainTimelineRef.current = tl
  }, [state.currentPose, syncStateFromTargets])
  
  /**
   * Start a secondary animation that layers on top of the current pose.
   * Uses offset-based approach: animates offsets that are applied after
   * pose interpolation in syncStateFromTargets.
   */
  const startSecondaryAnimation = useCallback((config: SecondaryAnimationConfig): string => {
    const id = `secondary_${++animationIdCounter.current}`
    const offsets = secondaryOffsetsRef.current
    const basePose = targetPoseRef.current // Use current target pose as base
    
    // Get the offset array for the target limb
    const limbOffsets = offsets[config.target as keyof typeof offsets]
    if (!limbOffsets) {
      console.warn(`Unknown target for secondary animation: ${config.target}`)
      return id
    }
    
    // Create timeline for cycling through keyframes
    const tl = gsap.timeline({
      repeat: config.repeat,
      yoyo: config.yoyo,
      onUpdate: syncStateFromTargets,
    })
    
    const frameTime = config.duration / config.keyframes.length
    const baseLimb = basePose[config.target as keyof CharacterPose] as Point2D[]
    
    // Animate offsets from base pose to each keyframe
    config.keyframes.forEach((frame, frameIndex) => {
      frame.forEach((point, pointIndex) => {
        // Calculate offset from base pose
        const basePoint = baseLimb[pointIndex]
        const offsetX = point.x - basePoint.x
        const offsetY = point.y - basePoint.y
        
        tl.to(limbOffsets[pointIndex], {
          x: offsetX,
          y: offsetY,
          duration: frameTime,
          ease: config.ease ?? 'sine.inOut',
        }, frameIndex * frameTime)
      })
    })
    
    secondaryAnimationsRef.current.set(id, tl as unknown as gsap.core.Tween)
    
    setState(prev => ({
      ...prev,
      activeSecondaryAnimations: [...prev.activeSecondaryAnimations, config.name],
    }))
    
    return id
  }, [syncStateFromTargets])
  
  /**
   * Stop a specific secondary animation
   */
  const stopSecondaryAnimation = useCallback((id: string) => {
    const tween = secondaryAnimationsRef.current.get(id)
    if (tween) {
      tween.kill()
      secondaryAnimationsRef.current.delete(id)
    }
  }, [])
  
  /**
   * Stop all secondary animations and reset offsets
   */
  const stopAllSecondaryAnimations = useCallback(() => {
    secondaryAnimationsRef.current.forEach(tween => tween.kill())
    secondaryAnimationsRef.current.clear()
    
    // Reset all secondary offsets to zero
    const offsets = secondaryOffsetsRef.current
    ;(['leftArm', 'rightArm', 'leftLeg', 'rightLeg'] as const).forEach(limb => {
      offsets[limb].forEach(pt => {
        pt.x = 0
        pt.y = 0
      })
    })
    
    setState(prev => ({ ...prev, activeSecondaryAnimations: [] }))
  }, [])
  
  /**
   * Start the walking leg cycle animation
   * @param overridePoseId - Optional pose ID to use instead of current state (useful when called before state updates)
   */
  const startWalking = useCallback((overridePoseId?: PoseId) => {
    const poseId = overridePoseId ?? state.currentPose
    const cycle = WALKING_CYCLES[poseId]
    
    if (!cycle) {
      console.warn(`No walking cycle defined for pose: ${poseId}`)
      return
    }
    
    // Kill existing walking timeline
    walkingTimelineRef.current?.kill()
    
    // Enable walking mode so syncStateFromTargets uses targets directly
    isWalkingRef.current = true
    
    const targets = targetsRef.current
    const tl = gsap.timeline({
      repeat: -1,
      onUpdate: syncStateFromTargets,
    })
    
    // 80ms per frame for smooth, energetic walking (10 frames = 0.8s cycle)
    const frameTime = 0.08
    
    // Animate through leg cycle frames with smooth transition between keyframes
    cycle.leftLeg.forEach((frame, frameIndex) => {
      frame.forEach((point, pointIndex) => {
        tl.to(targets.leftLeg[pointIndex], {
          x: point.x,
          y: point.y,
          arcRadius: point.arcRadius,
          arcLargeFlag: point.arcLargeFlag,
          arcSweepFlag: point.arcSweepFlag,
          duration: frameTime,
          ease: 'power1.inOut',
        }, frameIndex * frameTime)
      })
    })
    
    cycle.rightLeg.forEach((frame, frameIndex) => {
      frame.forEach((point, pointIndex) => {
        tl.to(targets.rightLeg[pointIndex], {
          x: point.x,
          y: point.y,
          arcRadius: point.arcRadius,
          arcLargeFlag: point.arcLargeFlag,
          arcSweepFlag: point.arcSweepFlag,
          duration: frameTime,
          ease: 'power1.inOut',
        }, frameIndex * frameTime)
      })
    })
    
    walkingTimelineRef.current = tl
  }, [state.currentPose, syncStateFromTargets])
  
  /**
   * Stop the walking leg cycle
   */
  const stopWalking = useCallback(() => {
    walkingTimelineRef.current?.kill()
    walkingTimelineRef.current = null
    isWalkingRef.current = false
  }, [])
  
  /**
   * Pause all animations
   */
  const pause = useCallback(() => {
    mainTimelineRef.current?.pause()
    walkingTimelineRef.current?.pause()
    secondaryAnimationsRef.current.forEach(tween => tween.pause())
  }, [])
  
  /**
   * Resume all animations
   */
  const resume = useCallback(() => {
    mainTimelineRef.current?.resume()
    walkingTimelineRef.current?.resume()
    secondaryAnimationsRef.current.forEach(tween => tween.resume())
  }, [])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mainTimelineRef.current?.kill()
      walkingTimelineRef.current?.kill()
      secondaryAnimationsRef.current.forEach(tween => tween.kill())
    }
  }, [])
  
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
  }
}
