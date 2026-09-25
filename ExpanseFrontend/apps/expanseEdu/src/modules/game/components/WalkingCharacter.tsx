import { Box, Grid } from "@mui/material"
import { CharacterPushingBar } from "expanse.ui/game"
import {
  StaticCharacter,
  CharacterState,
  CharacterAll,
  ProgressBar,
  CharacterPositionProvider,
  SectionSpacer,
} from "expanse.ui/theme"
import { useCallback, useState, useEffect, useRef } from "react"
import { useCharacterPosition } from "expanse.ui/theme"
import gsap from "gsap"

// =============================================================================
// ANIMATION TIMING CONSTANTS
// =============================================================================
const TIMING = {
  // Phase durations (in seconds)
  INITIAL_PAUSE: 1.5,
  PROGRESS_BAR_FILL: 3,
  PUSH_PAST_BAR: 0.5,
  WALK_TO_END: 1,
  CELEBRATION: {
    ANTICIPATION: 0.1,
    JUMP_UP: 0.25,
    LAND: 0.35,
    HOLD: 0.3,
  },
  END_PAUSE: 1.5,
} as const

// Easing curves for natural movement
const EASING = {
  PUSH: "power1.inOut", // Steady effort while pushing
  WALK: "power2.out", // Natural deceleration
  JUMP_UP: "power2.out", // Quick launch
  LAND: "bounce.out", // Bouncy landing
  PROGRESS: "power1.inOut", // Smooth progress bar fill
} as const

export const WalkingCharacter = () => {
  const totalHeight = 200
  const totalWidth = 519
  const barHeight = 40

  const { setIsWalking, setCurrentPose } = useCharacterPosition()
  
  // Position state with refs for GSAP animation targets
  const [characterPositionX, setCharacterPositionX] = useState(0)
  const [characterPositionY, setCharacterPositionY] = useState(0)
  const [progressBarPercentFilled, setProgressBarPercentFilled] = useState(0)
  
  // Refs for GSAP to tween (allows smooth animation)
  const positionRef = useRef({ x: 0, y: 0, progress: 0 })
  const tweensRef = useRef<gsap.core.Tween[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Sync ref values to state for rendering
  const syncPositionToState = useCallback(() => {
    setCharacterPositionX(positionRef.current.x)
    setCharacterPositionY(positionRef.current.y)
    setProgressBarPercentFilled(positionRef.current.progress)
  }, [])

  // =============================================================================
  // ANIMATION FUNCTIONS - Using GSAP for smooth tweening
  // =============================================================================
  
  const moveToX = useCallback((targetX: number, duration: number, ease: string = EASING.WALK) => {
    const tween = gsap.to(positionRef.current, {
      x: targetX,
      duration,
      ease,
      onUpdate: syncPositionToState,
    })
    tweensRef.current.push(tween)
    return tween
  }, [syncPositionToState])

  const moveToY = useCallback((targetY: number, duration: number, ease: string = EASING.JUMP_UP) => {
    const tween = gsap.to(positionRef.current, {
      y: targetY,
      duration,
      ease,
      onUpdate: syncPositionToState,
    })
    tweensRef.current.push(tween)
    return tween
  }, [syncPositionToState])

  const animateProgress = useCallback((targetPercent: number, duration: number, ease: string = EASING.PROGRESS) => {
    const tween = gsap.to(positionRef.current, {
      progress: targetPercent,
      duration,
      ease,
      onUpdate: syncPositionToState,
    })
    tweensRef.current.push(tween)
    return tween
  }, [syncPositionToState])

  const resetPosition = useCallback(() => {
    // Kill any active tweens
    tweensRef.current.forEach(tween => tween.kill())
    tweensRef.current = []
    
    // Reset position ref
    positionRef.current = { x: 0, y: 0, progress: 0 }
    syncPositionToState()
  }, [syncPositionToState])

  // =============================================================================
  // CELEBRATION SEQUENCE - Enhanced with anticipation and bounce
  // =============================================================================
  const playCelebration = useCallback(() => {
    const celebrationTl = gsap.timeline()
    
    // Anticipation: slight crouch before jump
    celebrationTl.to(positionRef.current, {
      y: 5, // Small downward movement
      duration: TIMING.CELEBRATION.ANTICIPATION,
      ease: "power2.in",
      onUpdate: syncPositionToState,
    })
    
    // Jump up
    .to(positionRef.current, {
      y: -71,
      duration: TIMING.CELEBRATION.JUMP_UP,
      ease: EASING.JUMP_UP,
      onUpdate: syncPositionToState,
    })
    
    // Land with bounce
    .to(positionRef.current, {
      y: 0,
      duration: TIMING.CELEBRATION.LAND,
      ease: EASING.LAND,
      onUpdate: syncPositionToState,
    })
    
    return celebrationTl
  }, [syncPositionToState])

  // =============================================================================
  // MAIN ANIMATION TIMELINE
  // =============================================================================
  useEffect(() => {
    const tl = gsap.timeline({ 
      repeat: -1, 
      defaults: { ease: "none" },
      onRepeat: resetPosition,
    })
    timelineRef.current = tl

    // Calculate cumulative times for cleaner timeline management
    let currentTime = 0

    // --- PHASE 1: Initialize ---
    tl.add("init", currentTime)
    tl.call(() => {
      resetPosition()
      setCurrentPose("facingForward")
      setIsWalking(false)
    }, undefined, "init")
    
    currentTime += TIMING.INITIAL_PAUSE

    // --- PHASE 2: Begin pushing and fill progress bar ---
    tl.add("startPush", currentTime - 0.03) // Slight overlap for smoother transition
    tl.call(() => {
      setCurrentPose("pushingRight")
      setIsWalking(true)
    }, undefined, "startPush")

    tl.add("fillProgress", currentTime)
    // Smooth GSAP tween for progress bar
    tl.to(positionRef.current, {
      progress: 100,
      duration: TIMING.PROGRESS_BAR_FILL,
      ease: EASING.PROGRESS,
      onUpdate: syncPositionToState,
    }, "fillProgress")
    
    // Character moves with progress bar (pushing it)
    tl.to(positionRef.current, {
      x: 56,
      duration: TIMING.PROGRESS_BAR_FILL,
      ease: EASING.PUSH,
      onUpdate: syncPositionToState,
    }, "fillProgress")

    currentTime += TIMING.PROGRESS_BAR_FILL

    // --- PHASE 3: Push slightly past end of bar ---
    tl.add("pushPastBar", currentTime)
    tl.to(positionRef.current, {
      x: 62,
      duration: TIMING.PUSH_PAST_BAR,
      ease: EASING.PUSH,
      onUpdate: syncPositionToState,
    }, "pushPastBar")

    currentTime += TIMING.PUSH_PAST_BAR

    // --- PHASE 4: Walk to end position ---
    tl.add("walkToEnd", currentTime)
    tl.call(() => {
      setCurrentPose("walkingRight")
    }, undefined, "walkToEnd")
    
    tl.to(positionRef.current, {
      x: 100,
      duration: TIMING.WALK_TO_END,
      ease: EASING.WALK,
      onUpdate: syncPositionToState,
    }, "walkToEnd")

    // --- PHASE 5: Celebration (starts mid-walk) ---
    const celebrationStartOffset = TIMING.WALK_TO_END * 0.5
    tl.add("celebrate", currentTime + celebrationStartOffset)
    tl.call(() => {
      setCurrentPose("celebration2")
      setIsWalking(false)
    }, undefined, "celebrate")
    
    // Add celebration sub-timeline
    tl.add(playCelebration(), "celebrate")

    currentTime += TIMING.WALK_TO_END

    // --- PHASE 6: Return to standing ---
    const celebrationTotalDuration = 
      TIMING.CELEBRATION.ANTICIPATION + 
      TIMING.CELEBRATION.JUMP_UP + 
      TIMING.CELEBRATION.LAND + 
      TIMING.CELEBRATION.HOLD
    
    tl.add("standingReturn", currentTime + celebrationTotalDuration - TIMING.WALK_TO_END * 0.5)
    tl.call(() => {
      setCurrentPose("facingForward")
    }, undefined, "standingReturn")

    currentTime += celebrationTotalDuration - TIMING.WALK_TO_END * 0.5 + TIMING.END_PAUSE

    // Set total duration for clean loop
    tl.totalDuration(currentTime)

    return () => {
      tl.kill()
      tweensRef.current.forEach(tween => tween.kill())
      tweensRef.current = []
    }
  }, [setCurrentPose, setIsWalking, syncPositionToState, resetPosition, playCelebration])

  return (
    <Grid container width={"100%"} sx={{ paddingTop: "100px" }}>
      <Grid
        item
        zero={3}
        height="100px"
        display={"flex"}
        justifyContent={"flex-start"}
      >
        <StaticCharacter
          state={CharacterState.forwardStanding}
          containerPaddingX={100}
          containerPaddingY={0}
          limbOpacity={0.95}
        />
      </Grid>
      <Grid
        item
        zero={6}
        height="100px"
        display={"flex"}
        justifyContent={"center"}
        sx={{ transform: "scale(1.05)" }}
      >
        <CharacterPushingBar />
      </Grid>
      <Grid
        item
        zero={3}
        height="200px"
        display={"flex"}
        justifyContent={"flex-end"}
        // sx={}
      >
        <CharacterPositionProvider>
          <CharacterAll></CharacterAll>
        </CharacterPositionProvider>
      </Grid>
      <SectionSpacer size="large" />
      <Grid
        item
        zero={12}
        height="200px"
        display={"flex"}
        justifyContent={"flex-end"}
      >
        <Box
          width={totalWidth}
          height={totalHeight}
          position="relative"
          display="flex"
          justifyContent="center"
          // sx={{ border: "1px solid red" }}
        >
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

          <Box
            sx={{
              position: "absolute",
              height: 200,
              width: 200,
              left: `${(characterPositionX / 100) * (totalWidth - 200)}px`, // 200 is estimated as the width of the character
              top: `${(characterPositionY / 100) * totalHeight}px`,
              // GSAP handles all animation - no CSS transition needed
            }}
          >
            <CharacterAll />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
