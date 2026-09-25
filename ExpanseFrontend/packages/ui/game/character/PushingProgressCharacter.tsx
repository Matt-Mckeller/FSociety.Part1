"use client"

import { Box, Grid } from "@mui/material"
import { ProgressBar } from "../../theme/components/ProgressBar.component"
import { useCharacterAnimation } from "./animation/useCharacterAnimation"
import { AnimatedCharacter } from "./animation/AnimatedCharacter"
import { POSES } from "./animation/poseRegistry"
import { ArmAnimationMode, CelebrationConfig } from "./animation/types"
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
   * Arm animation mode during push phase:
   * - 'hands': Hands oscillate up/down on the bar (default)
   * - 'effort': Body leans forward rhythmically, arms angle up-right creating
   *             a natural "putting weight into the push" effect. Hands stay
   *             fixed on bar while body/head/shoulders rock forward.
   * - 'none': No arm animation during push
   */
  armAnimationMode?: ArmAnimationMode

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
   * Celebration animation configuration
   */
  celebrationConfig?: CelebrationConfig
}

// Default celebration configuration
const DEFAULT_CELEBRATION_CONFIG: Required<CelebrationConfig> = {
  jumpHeight: 71,
  duration: 1.0,
  includeAnticipation: true,
  bounces: 1,
}

export const PushingProgressCharacter = ({
  armAnimationMode = "hands",
  fromProgress = 0,
  toProgress = 100,
  loop = true,
  onComplete,
  celebrationConfig = {},
}: PushingProgressCharacterProps) => {
  const totalHeight = 200
  const totalWidth = 519
  const barHeight = 40

  // Merge celebration config with defaults
  const celebConfig: Required<CelebrationConfig> = {
    ...DEFAULT_CELEBRATION_CONFIG,
    ...celebrationConfig,
  }

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
  const armAnimationModeRef = useRef(armAnimationMode)
  armAnimationModeRef.current = armAnimationMode
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
      api().transitionToPose("pushingRight", {
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          // Start walking legs after transition completes
          // Must pass pose ID explicitly since state hasn't updated yet
          api().startWalking("pushingRight")

          // Arm animation based on mode
          const mode = armAnimationModeRef.current

          if (mode === "hands") {
            // Hands oscillate up/down on the bar
            rightArmAnimationIdRef.current = api().startSecondaryAnimation({
              name: "rightArmOscillation",
              target: "rightArm",
              keyframes: [
                POSES.pushingRight.rightArm,
                POSES.pushingRightHandsUp.rightArm,
                POSES.pushingRight.rightArm,
                POSES.pushingRightHandsDown.rightArm,
              ],
              duration: 0.8,
              repeat: -1,
              yoyo: false,
              ease: "sine.inOut",
            })

            leftArmAnimationIdRef.current = api().startSecondaryAnimation({
              name: "leftArmOscillation",
              target: "leftArm",
              keyframes: [
                POSES.pushingRight.leftArm,
                POSES.pushingRightHandsUp.leftArm,
                POSES.pushingRight.leftArm,
                POSES.pushingRightHandsDown.leftArm,
              ],
              duration: 0.8,
              repeat: -1,
              yoyo: false,
              ease: "sine.inOut",
            })
          } else if (mode === "effort") {
            // Effort mode: Forward lean cycle - body/head/arms move together
            // Creates natural "putting weight into the push" effect
            // Arms angle up-right automatically via the lean pose

            leanCycleActiveRef.current = true
            const leanDuration = 0.4

            // Cycle function - oscillates between pushingRight and pushingRightLeanForward
            const leanForward = () => {
              if (!leanCycleActiveRef.current) return
              api().transitionToPose("pushingRightLeanForward", {
                duration: leanDuration,
                ease: "power1.inOut",
                onComplete: leanBack,
              })
            }

            const leanBack = () => {
              if (!leanCycleActiveRef.current) return
              api().transitionToPose("pushingRight", {
                duration: leanDuration,
                ease: "power1.inOut",
                onComplete: leanForward,
              })
            }

            // Start the lean cycle
            leanForward()
          }
          // mode === 'none' - no arm animation
        },
      })
    }

    const beginWalkingPhase = () => {
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
        duration: 0.3,
        ease: "power1.out",
        onComplete: () => {
          // Start walking cycle for walkingRight pose
          api().startWalking("walkingRight")
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
          api().transitionToPose("celebration2", {
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

    // Calculate push duration based on progress range
    const progressRange = Math.abs(toProgress - fromProgress)
    const basePushDuration = 3 // Base duration for 100% progress
    const pushDuration = (progressRange / 100) * basePushDuration

    // Determine if we should celebrate (only at 100%)
    const shouldCelebrate = toProgress >= 100

    // Timing constants
    const TIMING = {
      standPause: 1.5,
      pushDuration: Math.max(pushDuration, 0.5), // Minimum 0.5s
      pushPastBar: 0.5,
      walkDuration: 1,
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
        ease: "power1.inOut",
        onUpdate: () => setProgressBarPercentFilled(progressRef.current.value),
      },
      TIMING.standPause + 0.4,
    ) // Start after pose transition

    tl.to(
      positionRef.current,
      {
        x: progressToPosition(toProgress),
        duration: TIMING.pushDuration,
        ease: "power1.inOut",
        onUpdate: () => setCharacterPositionX(positionRef.current.x),
      },
      TIMING.standPause + 0.4,
    )

    const pushPastBarTime = TIMING.standPause + 0.4 + TIMING.pushDuration

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
    <Grid container width={"100%"} sx={{ paddingTop: "50px" }}>
      <Grid
        item
        zero={12}
        height="200px"
        display={"flex"}
        justifyContent={"center"}
      >
        <Box
          width={totalWidth}
          height={totalHeight}
          position="relative"
          display="flex"
          justifyContent="center"
        >
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
            <AnimatedCharacter animationState={animationApi.state} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
