"use client"

import { Box, Grid } from "@mui/material"
import { ProgressBar } from "./ProgressBar"
import {
  useCharacterAnimation,
  AnimatedCharacter,
  POSES,
  getPreset,
} from ".."
import type {
  PushingMood,
  CelebrationConfig,
  PushingProgressPreset,
  Character4eyeMood,
  Character4eyeVariant,
  EyeDesign,
  StrapStyle,
} from ".."
import { useState, useEffect, useRef, useCallback } from "react"
import gsap from "gsap"

/**
 * Animated character that pushes a progress bar across the screen.
 * Uses the new animation system (V2) with smooth GSAP-powered transitions
 * between poses and secondary animations for arm movement.
 *
 * Animation sequence:
 * 1. Character stands facing forward (with smooth transition in)
 * 2. Character transitions to pushing pose (animated)
 * 3. Arms animate during push phase (hands, effort lean, or none)
 * 4. Progress bar fills as character pushes
 * 5. Character transitions to walking pose (animated)
 * 6. Character walks past the bar
 * 7. Character transitions to celebration (with energetic jump)
 * 8. Animation loops (if loop=true)
 */
export interface PushingProgressCharacterProps {
  /**
   * Named preset for animation behavior. Available presets:
   * - 'default': Steady, confident push
   * - 'effort': Struggling with visible effort
   * - 'smooth': Casual, relaxed pace
   * - 'bouncy': Eager, energetic motion
   * - 'quick': Determined, focused push
   * - 'dramatic': Slow struggle with big celebration
   */
  preset?: string | PushingProgressPreset

  /**
   * Emotional mood during push phase (overrides preset):
   * - 'steady': Calm, confident - minimal secondary motion
   * - 'determined': Focused intensity - slight forward lean
   * - 'eager': Excited, energetic - faster pace, bouncy
   * - 'struggling': Tired, effortful - slower, occasional strain
   * - 'casual': Relaxed, easy - loose body language
   */
  mood?: PushingMood

  /**
   * Starting progress percentage (0-100). Default: 0
   */
  fromProgress?: number

  /**
   * Target progress percentage (0-100). Default: 100
   */
  toProgress?: number

  /**
   * Whether to loop the animation. Default: true
   */
  loop?: boolean

  /**
   * Callback when animation completes (only called when loop=false)
   */
  onComplete?: () => void

  /**
   * Celebration animation configuration (overrides preset)
   */
  celebrationConfig?: CelebrationConfig

  // ----- Optional Character4eye-style decorations on the head -----
  /** Variant — enables decoration rendering. When unset, the bare
   *  stick figure is shown (legacy behavior). */
  variant?: Character4eyeVariant
  /** Eye design renderer key. */
  eyeDesign?: EyeDesign
  /** Strap (goggles band) style. `"none"` skips the strap entirely. */
  strapStyle?: StrapStyle
  /** Effective mood passed to character renderers. */
  characterMood?: Character4eyeMood
  /** Override the eye glow color. */
  eyeGlowColor?: string
  /** Antenna on top of head (default: true when `variant` is set). */
  showAntenna?: boolean
  /** Pulse intensity (0–3) for eye/antenna. */
  pulseIntensity?: number
}

export const PushingProgressCharacter = ({
  preset = "default",
  mood,
  fromProgress = 0,
  toProgress = 100,
  loop = true,
  onComplete,
  celebrationConfig = {},
  variant,
  eyeDesign,
  strapStyle,
  characterMood,
  eyeGlowColor,
  showAntenna,
  pulseIntensity,
}: PushingProgressCharacterProps) => {
  const totalHeight = 200
  const totalWidth = 519
  const barHeight = 40

  // Resolve preset
  const resolvedPreset = typeof preset === "string" ? getPreset(preset) : preset

  // Merge celebration config: preset ← prop overrides
  const celebConfig = {
    ...resolvedPreset.celebration,
    ...celebrationConfig,
  }

  // Use mood from props, falling back to preset
  const effectiveMood = mood ?? resolvedPreset.push.mood

  // Use the new animation system
  const animationApi = useCharacterAnimation({ initialPose: "facingForward" })

  // Store animation API in ref to avoid effect re-runs
  const animationApiRef = useRef(animationApi)
  animationApiRef.current = animationApi

  const [characterPositionX, setCharacterPositionX] = useState(0)
  const [characterPositionY, setCharacterPositionY] = useState(0)
  const [characterScaleY, setCharacterScaleY] = useState(1)
  const [progressBarPercentFilled, setProgressBarPercentFilled] =
    useState(fromProgress)

  // Refs for animation values GSAP can tween
  const positionRef = useRef({ x: 0, y: 0, scaleY: 1 })
  const progressRef = useRef({ value: fromProgress })

  // Timeline ref to prevent recreating
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Body bobbing animation ref (legacy, kept for cleanup)
  const bodyBobbingRef = useRef<gsap.core.Tween | null>(null)
  // Forward lean cycle active flag
  const leanCycleActiveRef = useRef(false)
  // Ref for arm animation IDs
  const rightArmAnimationIdRef = useRef<string | null>(null)
  const leftArmAnimationIdRef = useRef<string | null>(null)
  // Refs for props to access in effect without deps
  const moodRef = useRef(effectiveMood)
  moodRef.current = effectiveMood
  const presetRef = useRef(resolvedPreset)
  presetRef.current = resolvedPreset
  const celebConfigRef = useRef(celebConfig)
  celebConfigRef.current = celebConfig
  const fromProgressRef = useRef(fromProgress)
  fromProgressRef.current = fromProgress
  const toProgressRef = useRef(toProgress)
  toProgressRef.current = toProgress
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  /**
   * Main animation timeline - runs once on mount
   */
  useEffect(() => {
    // Use refs to access latest API without re-running effect
    const api = () => animationApiRef.current
    const getFromProgress = () => fromProgressRef.current
    const getToProgress = () => toProgressRef.current
    const getCelebConfig = () => celebConfigRef.current

    // Calculate character position based on progress (0-100 maps to screen position)
    const progressToPosition = (progress: number) => {
      // Character position is scaled 0-56 for pushing, then continues walking
      return (progress / 100) * 56
    }

    const initialize = () => {
      api().stopAllSecondaryAnimations()
      api().stopWalking()
      bodyBobbingRef.current?.kill()
      bodyBobbingRef.current = null
      leanCycleActiveRef.current = false
      // IMPORTANT: Mutate existing objects, don't replace them!
      // GSAP tweens capture object references at creation time.
      const startProgress = getFromProgress()
      positionRef.current.x = progressToPosition(startProgress)
      positionRef.current.y = 0
      positionRef.current.scaleY = 1
      progressRef.current.value = startProgress
      setCharacterPositionX(positionRef.current.x)
      setCharacterPositionY(0)
      setCharacterScaleY(1)
      setProgressBarPercentFilled(startProgress)
      api().transitionToPose("facingForward", { duration: 0.3 })
    }

    const beginPushing = () => {
      const pConfig = presetRef.current
      api().transitionToPose("pushingRight", {
        duration: pConfig.transitions.toPush,
        ease: "power2.inOut",
        onComplete: () => {
          // Start walking legs after transition completes
          api().startWalking("pushingRight", {
            speed: pConfig.push.walkingSpeed,
          })

          // Apply mood-based secondary animations
          const currentMood = moodRef.current

          switch (currentMood) {
            case "steady":
              // Calm, confident push - just walking legs, no secondary motion
              break

            case "determined":
              // Focused intensity - subtle periodic forward lean
              leanCycleActiveRef.current = true
              const determinedLean = () => {
                if (!leanCycleActiveRef.current) return
                api().transitionToPose("pushingRightEffort", {
                  duration: 0.6,
                  ease: "power1.inOut",
                  onComplete: () => {
                    if (!leanCycleActiveRef.current) return
                    api().transitionToPose("pushingRight", {
                      duration: 0.6,
                      ease: "power1.inOut",
                      onComplete: determinedLean,
                    })
                  },
                })
              }
              determinedLean()
              break

            case "eager":
              // Excited, energetic - add bouncy vertical motion
              const eagerBounce = () => {
                if (!leanCycleActiveRef.current) return
                gsap.to(positionRef.current, {
                  y: -4,
                  duration: 0.15,
                  ease: "power2.out",
                  onUpdate: () => setCharacterPositionY(positionRef.current.y),
                  onComplete: () => {
                    gsap.to(positionRef.current, {
                      y: 0,
                      duration: 0.15,
                      ease: "power2.in",
                      onUpdate: () =>
                        setCharacterPositionY(positionRef.current.y),
                      onComplete: () => {
                        if (leanCycleActiveRef.current) {
                          gsap.delayedCall(0.2, eagerBounce)
                        }
                      },
                    })
                  },
                })
              }
              leanCycleActiveRef.current = true
              eagerBounce()
              break

            case "struggling":
              // Tired, effortful - forward lean cycle with slower recovery
              leanCycleActiveRef.current = true
              const strugglingLean = () => {
                if (!leanCycleActiveRef.current) return
                // Quick lean forward (strain)
                api().transitionToPose("pushingRightEffort", {
                  duration: 0.35,
                  ease: "power2.in",
                  onComplete: () => {
                    if (!leanCycleActiveRef.current) return
                    // Slow recovery (catching breath)
                    api().transitionToPose("pushingRight", {
                      duration: 0.55,
                      ease: "power1.out",
                      onComplete: strugglingLean,
                    })
                  },
                })
              }
              strugglingLean()
              break

            case "casual":
              // Relaxed, easy - subtle side sway
              const casualSway = () => {
                if (!leanCycleActiveRef.current) return
                gsap.to(positionRef.current, {
                  x: positionRef.current.x + 1.5,
                  duration: 0.8,
                  ease: "sine.inOut",
                  onUpdate: () => setCharacterPositionX(positionRef.current.x),
                  onComplete: () => {
                    gsap.to(positionRef.current, {
                      x: positionRef.current.x - 1.5,
                      duration: 0.8,
                      ease: "sine.inOut",
                      onUpdate: () =>
                        setCharacterPositionX(positionRef.current.x),
                      onComplete: () => {
                        if (leanCycleActiveRef.current) {
                          casualSway()
                        }
                      },
                    })
                  },
                })
              }
              leanCycleActiveRef.current = true
              casualSway()
              break
          }
        },
      })
    }

    const beginWalkingPhase = () => {
      const pConfig = presetRef.current
      api().stopAllSecondaryAnimations()
      rightArmAnimationIdRef.current = null
      leftArmAnimationIdRef.current = null

      // Stop lean cycle and body bobbing
      leanCycleActiveRef.current = false
      bodyBobbingRef.current?.kill()
      bodyBobbingRef.current = null
      positionRef.current.y = 0
      setCharacterPositionY(0)

      // Smooth transition to walking - keep walking legs going during transition
      api().transitionToPose("walkingRight", {
        duration: pConfig.transitions.toWalk,
        ease: "power1.out",
        onComplete: () => {
          // Start walking cycle for walkingRight pose
          api().startWalking("walkingRight", {
            speed: pConfig.walk.walkingSpeed,
          })
        },
      })
    }

    /**
     * Energetic celebration sequence with anticipation, apex pose, and bounce landing
     */
    const beginCelebration = () => {
      const config = getCelebConfig()
      const totalDuration = config.duration

      // Timing breakdown for energetic jump:
      // - Anticipation (crouch): 12% of total
      // - Jump up to apex: 25% of total
      // - Hang at apex: 8% of total
      // - Fall down: 20% of total
      // - Bounce landing: 35% of total
      const anticipationDuration = config.includeAnticipation
        ? totalDuration * 0.12
        : 0
      const jumpUpDuration = totalDuration * 0.25
      const apexHangDuration = totalDuration * 0.08
      const fallDuration = totalDuration * 0.2
      const landingDuration = totalDuration * 0.35

      // Create celebration sub-timeline
      const celebTl = gsap.timeline()

      let timeOffset = 0

      // Phase 1: Anticipation - crouch before jump
      if (config.includeAnticipation) {
        // Transition to anticipation pose while still walking briefly
        celebTl.call(
          () => {
            api().transitionToPose("celebrationAnticipation", {
              duration: anticipationDuration,
              ease: "power2.in",
            })
          },
          undefined,
          timeOffset,
        )

        // Slight downward movement
        celebTl.to(
          positionRef.current,
          {
            y: 3,
            scaleY: 0.95,
            duration: anticipationDuration,
            ease: "power2.in",
            onUpdate: () => {
              setCharacterPositionY(positionRef.current.y)
              setCharacterScaleY(positionRef.current.scaleY)
            },
          },
          timeOffset,
        )

        timeOffset += anticipationDuration
      }

      // Stop walking at jump initiation
      celebTl.call(
        () => {
          api().stopWalking()
        },
        undefined,
        timeOffset,
      )

      // Phase 2: Jump up - transition to apex pose with arms raised
      celebTl.call(
        () => {
          api().transitionToPose("celebrationApex", {
            duration: jumpUpDuration,
            ease: "power2.out",
          })
        },
        undefined,
        timeOffset,
      )

      celebTl.to(
        positionRef.current,
        {
          y: -config.jumpHeight,
          scaleY: 1.05, // Slight stretch during jump
          duration: jumpUpDuration,
          ease: "power2.out",
          onUpdate: () => {
            setCharacterPositionY(positionRef.current.y)
            setCharacterScaleY(positionRef.current.scaleY)
          },
        },
        timeOffset,
      )

      timeOffset += jumpUpDuration

      // Phase 3: Apex hang - brief pause at top
      celebTl.to(
        positionRef.current,
        {
          y: -config.jumpHeight - 2, // Tiny bit higher
          scaleY: 1.02,
          duration: apexHangDuration,
          ease: "sine.inOut",
          onUpdate: () => {
            setCharacterPositionY(positionRef.current.y)
            setCharacterScaleY(positionRef.current.scaleY)
          },
        },
        timeOffset,
      )

      timeOffset += apexHangDuration

      // Phase 4: Fall down - transition to landing pose
      celebTl.call(
        () => {
          api().transitionToPose("celebration", {
            duration: fallDuration,
            ease: "power2.in",
          })
        },
        undefined,
        timeOffset,
      )

      celebTl.to(
        positionRef.current,
        {
          y: 0,
          scaleY: 0.88, // Squash on landing
          duration: fallDuration,
          ease: "power2.in",
          onUpdate: () => {
            setCharacterPositionY(positionRef.current.y)
            setCharacterScaleY(positionRef.current.scaleY)
          },
        },
        timeOffset,
      )

      timeOffset += fallDuration

      // Phase 5: Bounce recovery - spring back to normal
      celebTl.to(
        positionRef.current,
        {
          y: -config.jumpHeight * 0.15, // Small bounce
          scaleY: 1.02,
          duration: landingDuration * 0.4,
          ease: "power2.out",
          onUpdate: () => {
            setCharacterPositionY(positionRef.current.y)
            setCharacterScaleY(positionRef.current.scaleY)
          },
        },
        timeOffset,
      )

      timeOffset += landingDuration * 0.4

      // Final settle
      celebTl.to(
        positionRef.current,
        {
          y: 0,
          scaleY: 1,
          duration: landingDuration * 0.6,
          ease: "bounce.out",
          onUpdate: () => {
            setCharacterPositionY(positionRef.current.y)
            setCharacterScaleY(positionRef.current.scaleY)
          },
        },
        timeOffset,
      )

      return celebTl
    }

    /**
     * Stop pushing and transition to standing/waiting pose
     * Used when progress doesn't reach 100%
     */
    const stopPushingAndWait = () => {
      api().stopAllSecondaryAnimations()
      rightArmAnimationIdRef.current = null
      leftArmAnimationIdRef.current = null

      // Stop lean cycle
      leanCycleActiveRef.current = false
      bodyBobbingRef.current?.kill()
      bodyBobbingRef.current = null

      // Stop walking legs
      api().stopWalking()

      // Transition to standing pose facing the bar
      api().transitionToPose("facingForward", {
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const returnToForward = () => {
      api().transitionToPose("facingForward", {
        duration: 0.4,
        ease: "power1.inOut",
      })
    }

    const tl = gsap.timeline({ repeat: loop ? -1 : 0 })

    // Get preset config
    const getPresetConfig = () => presetRef.current

    // Calculate push duration based on progress range and preset speed factor
    const progressRange = Math.abs(toProgress - fromProgress)
    const presetConfig = getPresetConfig()
    const pushDuration = progressRange * presetConfig.push.speedFactor

    // Determine if we should celebrate (only at 100%)
    const shouldCelebrate = toProgress >= 100

    // Timing from preset
    const TIMING = {
      standPause: 1.5,
      transitionToPush: presetConfig.transitions.toPush,
      pushDuration: Math.max(pushDuration, 0.5), // Minimum 0.5s
      pushPastBar: 0.5,
      transitionToWalk: presetConfig.transitions.toWalk,
      walkDuration: presetConfig.walk.duration,
      celebrationDuration: getCelebConfig().duration,
      endPause: 1.0,
      waitStandDuration: 0.5, // Pause after standing when not celebrating
    }

    // Phase 1: Stand facing forward
    tl.call(initialize, undefined, 0)

    // Phase 2: Transition to pushing (with smooth animation)
    tl.call(beginPushing, undefined, TIMING.standPause)

    // Phase 3: Push progress bar (GSAP tween for progress and position)
    tl.to(
      progressRef.current,
      {
        value: toProgress,
        duration: TIMING.pushDuration,
        ease: presetConfig.push.ease,
        onUpdate: () => setProgressBarPercentFilled(progressRef.current.value),
      },
      TIMING.standPause + TIMING.transitionToPush,
    ) // Start after pose transition

    tl.to(
      positionRef.current,
      {
        x: progressToPosition(toProgress),
        duration: TIMING.pushDuration,
        ease: presetConfig.push.ease,
        onUpdate: () => setCharacterPositionX(positionRef.current.x),
      },
      TIMING.standPause + TIMING.transitionToPush,
    )

    const pushPastBarTime =
      TIMING.standPause + TIMING.transitionToPush + TIMING.pushDuration

    // Only proceed to celebration sequence if reaching 100%
    if (shouldCelebrate) {
      // Phase 4: Push slightly past bar
      tl.to(
        positionRef.current,
        {
          x: 62,
          duration: TIMING.pushPastBar,
          ease: "power1.out",
          onUpdate: () => setCharacterPositionX(positionRef.current.x),
        },
        pushPastBarTime,
      )

      // Phase 5: Transition to walking (with smooth animation)
      const walkStartTime = pushPastBarTime + TIMING.pushPastBar
      tl.call(beginWalkingPhase, undefined, walkStartTime)

      tl.to(
        positionRef.current,
        {
          x: 100,
          duration: TIMING.walkDuration,
          ease: "power2.out",
          onUpdate: () => setCharacterPositionX(positionRef.current.x),
        },
        walkStartTime,
      )

      // Phase 6: Energetic celebration (starts while still moving for fluid transition)
      const celebrateTime = walkStartTime + TIMING.walkDuration * 0.4
      tl.add(beginCelebration(), celebrateTime)

      // Phase 7: Return to forward facing
      const returnTime = celebrateTime + TIMING.celebrationDuration + 0.3
      tl.call(returnToForward, undefined, returnTime)

      // Call onComplete if not looping
      if (!loop && onCompleteRef.current) {
        tl.call(
          () => {
            onCompleteRef.current?.()
          },
          undefined,
          returnTime + 0.5,
        )
      }
    } else {
      // Partial progress: Stop and stand waiting by the bar
      // Phase 4: Stop pushing and transition to waiting
      tl.call(stopPushingAndWait, undefined, pushPastBarTime)

      // Phase 5: Wait in standing position
      const waitEndTime = pushPastBarTime + TIMING.waitStandDuration

      // Call onComplete if not looping
      if (!loop && onCompleteRef.current) {
        tl.call(
          () => {
            onCompleteRef.current?.()
          },
          undefined,
          waitEndTime,
        )
      }
    }

    // Store timeline ref
    timelineRef.current = tl

    // Cleanup on unmount
    return () => {
      tl.kill()
      bodyBobbingRef.current?.kill()
      api().stopAllSecondaryAnimations()
    }
  }, [loop, toProgress, fromProgress, celebConfig.duration]) // Re-run if key props change

  return (
    <Grid
      container
      sx={{
        width: "100%",
        paddingTop: "50px"
      }}>
      <Grid
        size={12}
        sx={{
          height: "200px",
          display: "flex",
          justifyContent: "center",
          overflow: "visible"
        }}>
        <Box
          sx={{
            width: totalWidth,
            height: totalHeight,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            overflow: "visible"
          }}>
          {/* Progress Bar */}
          <Box
            sx={{
              position: "absolute",
              width: totalWidth,
              height: totalHeight,
            }}
          >
            <Box
              sx={{
                height: barHeight,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -45px)",
              }}
            >
              <ProgressBar
                aspectRatio={5}
                percentFilled={progressBarPercentFilled / 100}
                displayPercentFilled={true}
              />
            </Box>
          </Box>

          {/* Animated Character */}
          <Box
            sx={{
              position: "absolute",
              height: 200,
              width: 200,
              left: `${(characterPositionX / 100) * (totalWidth - 200)}px`,
              top: `${(characterPositionY / 100) * totalHeight}px`,
              transform: `scaleY(${characterScaleY})`,
              transformOrigin: "bottom center",
              transition: "left 0.05s linear",
            }}
          >
            <AnimatedCharacter
              animationState={animationApi.state}
              variant={variant}
              eyeDesign={eyeDesign}
              strapStyle={strapStyle}
              mood={characterMood}
              eyeGlowColor={eyeGlowColor}
              showAntenna={showAntenna ?? variant != null}
              pulseIntensity={pulseIntensity}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
