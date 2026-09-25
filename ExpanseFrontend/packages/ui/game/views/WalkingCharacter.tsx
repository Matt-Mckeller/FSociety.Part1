"use client"

import { Box, Grid } from "@mui/material"
import {
  CharacterAll,
  ProgressBar,
  useCharacterPosition,
} from "../../theme"
import { useCallback, useState, useEffect, useRef } from "react"
import gsap from "gsap"

/**
 * Animated character that walks and pushes a progress bar across the screen.
 * Uses GSAP timeline for coordinated animations.
 * 
 * Animation sequence:
 * 1. Character stands facing forward
 * 2. Character begins pushing pose
 * 3. Progress bar fills as character pushes
 * 4. Character walks past the bar
 * 5. Character celebrates
 * 6. Animation loops
 */
export const WalkingCharacter = () => {
  const totalHeight = 200
  const totalWidth = 519
  const barHeight = 40

  const { setIsWalking, setCurrentPose } = useCharacterPosition()
  const [characterPositionX, setCharacterPositionX] = useState(0)
  // Add a ref to always have the latest value in the animation callbacks
  const characterPositionXRef = useRef(0)
  const [characterPositionY, setCharacterPositionY] = useState(0)
  // Add a ref to always have the latest value in the animation callbacks
  const characterPositionYRef = useRef(0)
  const [progressBarPercentFilled, setProgressBarPercentFilled] = useState(0)
  
  // Use refs for intervals to properly track them across renders
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const xMovementIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const yMovementIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const initialize = useCallback(() => {
    setCurrentPose("facingForward")
    setIsWalking(false)
    setCharacterPositionX(0)
    setProgressBarPercentFilled(0)
  }, [setCurrentPose, setIsWalking])

  const beginPushing = useCallback(() => {
    setCurrentPose("pushingRight")
    setIsWalking(true)
  }, [setCurrentPose, setIsWalking])

  const beginBarProgression = useCallback(
    (durationSeconds: number) => {
      const steps = 100 // from 0 to 100
      const intervalTime = (durationSeconds * 1000) / steps

      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
      
      progressIntervalRef.current = setInterval(() => {
        setProgressBarPercentFilled((prev) => {
          if (prev + 1 >= 100) {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
            return 100
          }
          return prev + 1
        })
      }, intervalTime)
    },
    [],
  )

  // Update moveCharacterToX to use the ref
  const moveCharacterToX = useCallback(
    (targetX: number, durationSeconds: number) => {
      const steps = 100
      const intervalTime = (durationSeconds * 1000) / steps
      const startX = characterPositionXRef.current
      const deltaX = targetX - startX
      let step = 0

      if (xMovementIntervalRef.current) clearInterval(xMovementIntervalRef.current)
      
      xMovementIntervalRef.current = setInterval(() => {
        step++
        setCharacterPositionX(() => {
          const next = startX + (deltaX * step) / steps
          if (step >= steps) {
            if (xMovementIntervalRef.current) clearInterval(xMovementIntervalRef.current)
            return targetX
          }
          return next
        })
      }, intervalTime)
    },
    [],
  )

  const moveCharacterToY = useCallback(
    (targetY: number, durationSeconds: number) => {
      const steps = 100
      const intervalTime = (durationSeconds * 1000) / steps
      const startY = characterPositionYRef.current
      const deltaY = targetY - startY
      let step = 0

      if (yMovementIntervalRef.current) clearInterval(yMovementIntervalRef.current)
      
      yMovementIntervalRef.current = setInterval(() => {
        step++
        setCharacterPositionY(() => {
          const next = startY + (deltaY * step) / steps
          if (step >= steps) {
            if (yMovementIntervalRef.current) clearInterval(yMovementIntervalRef.current)
            return targetY
          }
          return next
        })
      }, intervalTime)
    },
    [],
  )

  const cleanupAnimation = useCallback(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    if (xMovementIntervalRef.current) clearInterval(xMovementIntervalRef.current)
    if (yMovementIntervalRef.current) clearInterval(yMovementIntervalRef.current)
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } })

    const secondsToCompleteProgressBar = 3
    const pushDurationSlightlyPastEndOfProgressBar = 0.5
    const durationToReachTheEndX = 1
    const celebrationDuration = 0.5

    const pushingStartBeforeProgressGap = secondsToCompleteProgressBar / 100

    tl.call(initialize, undefined, 0)
    tl.call(beginPushing, undefined, 1.5 - pushingStartBeforeProgressGap)
    tl.call(
      () => beginBarProgression(secondsToCompleteProgressBar),
      undefined,
      1.5,
    )
    tl.call(
      () => moveCharacterToX(56, secondsToCompleteProgressBar),
      undefined,
      1.5,
    )
    tl.call(
      () => {
        // Keep pushing slightly past the end of the bar
        setCurrentPose("pushingRight")
        moveCharacterToX(62, pushDurationSlightlyPastEndOfProgressBar)
      },
      undefined,
      1.5 + secondsToCompleteProgressBar,
    )
    tl.call(
      () => {
        setCurrentPose("walkingRight")
        moveCharacterToX(100, durationToReachTheEndX)
      },
      undefined,
      1.5 +
        secondsToCompleteProgressBar +
        pushDurationSlightlyPastEndOfProgressBar,
    )
    tl.call(
      () => {
        setCurrentPose("celebration2")
        moveCharacterToY(-71, celebrationDuration / 2)
        setIsWalking(false)
      },
      undefined,
      1.5 +
        secondsToCompleteProgressBar +
        pushDurationSlightlyPastEndOfProgressBar +
        durationToReachTheEndX / 2,
    )
    tl.call(
      () => {
        setCurrentPose("celebration2")
        moveCharacterToY(0, celebrationDuration / 2)
      },
      undefined,
      1.5 +
        secondsToCompleteProgressBar +
        pushDurationSlightlyPastEndOfProgressBar +
        durationToReachTheEndX / 2 +
        celebrationDuration / 2,
    )
    tl.call(
      () => {
        setCurrentPose("facingForward")
      },
      undefined,
      1.5 +
        secondsToCompleteProgressBar +
        pushDurationSlightlyPastEndOfProgressBar +
        durationToReachTheEndX / 2 +
        celebrationDuration,
    )
    tl.call(
      cleanupAnimation,
      undefined,
      1.5 +
        secondsToCompleteProgressBar +
        pushDurationSlightlyPastEndOfProgressBar +
        durationToReachTheEndX +
        celebrationDuration +
        1.5,
    )

    return () => {
      tl.kill()
      cleanupAnimation()
    }
  }, [
    initialize,
    beginPushing,
    beginBarProgression,
    moveCharacterToX,
    moveCharacterToY,
    cleanupAnimation,
    setCurrentPose,
    setIsWalking,
  ])

  // Keep the ref updated
  useEffect(() => {
    characterPositionXRef.current = characterPositionX
  }, [characterPositionX])
  useEffect(() => {
    characterPositionYRef.current = characterPositionY
  }, [characterPositionY])

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
              left: `${(characterPositionX / 100) * (totalWidth - 200)}px`,
              top: `${(characterPositionY / 100) * totalHeight}px`,
              transition: "left 0.05s linear, top 0.05s linear",
            }}
          >
            <CharacterAll />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
