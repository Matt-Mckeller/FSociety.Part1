"use client"
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react"
import { ProgressBar } from "../../theme"
import { ExperienceContext } from "../context"
interface ExperienceProgressBarProps {
  aspectRatio: number
  levelUpPauseDuration?: number // Pause duration at 100% in milliseconds
  animationDuration?: number // Duration of the animation in milliseconds
  onAnimationFinish?: () => void
  displayLevelText?: boolean
}

// todo: needs to handle multiple experience changes in quick succession / overlapping
// some sort of queue system or perhaps even better would be a method for handling calculating
// the ending state of the animation based on changes and keeps animating towards the end state
// Also the animation duration is not consistent with the actual time it takes to animate
// i.e. leveling up doubles the duration
// the smoothness of the progression could be improved as well
const ExperienceProgressBar: React.FC<ExperienceProgressBarProps> = ({
  aspectRatio,
  levelUpPauseDuration = 1000, // Default pause duration of 1 second
  animationDuration = 1000, // Default animation duration of 1 second
  displayLevelText = false,
  onAnimationFinish,
}) => {
  const { currentLevel, experiencePercentage } = useContext(ExperienceContext)

  const [animatedPercentage, setAnimatedPercentage] =
    useState(experiencePercentage)
  const previousPercentageRef = useRef<number>(undefined)
  const previousLevelRef = useRef<number>(undefined)
  const [levelDisplayed, setLevelDisplayed] = useState(currentLevel)
  const isAnimatingRef = useRef(false) // Ref to track if an animation is in progress

  const animate = useCallback(
    (
      currentTime: number,
      startTime: number,
      startPercentage: number,
      endPercentage: number,
      duration: number,
      onComplete?: () => void,
    ) => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      const currentPercentage =
        startPercentage + (endPercentage - startPercentage) * progress

      setAnimatedPercentage(currentPercentage)

      if (progress < 1) {
        requestAnimationFrame((currentTime) =>
          animate(
            currentTime,
            startTime,
            startPercentage,
            endPercentage,
            duration,
            onComplete,
          ),
        )
      } else {
        isAnimatingRef.current = false
        if (onComplete) {
          onComplete()
        }
      }
    },
    [],
  )
  const startAnimation = useCallback(
    (
      startPercentage: number,
      endPercentage: number,
      duration: number,
      onComplete?: () => void,
    ) => {
      const startTime = performance.now()
      isAnimatingRef.current = true

      requestAnimationFrame((currentTime) =>
        animate(
          currentTime,
          startTime,
          startPercentage,
          endPercentage,
          duration,
          onComplete,
        ),
      )
    },
    [],
  )

  const handleLevelUpAnimation = useCallback(
    (
      levelsToAnimate: number,
      currentPercentage: number,
      endingPercentage: number,
    ) => {
      if (levelsToAnimate > 0) {
        startAnimation(currentPercentage, 100, animationDuration, () => {
          setTimeout(() => {
            setAnimatedPercentage(0)
            setLevelDisplayed(levelDisplayed + 1)
            handleLevelUpAnimation(levelsToAnimate - 1, 0, endingPercentage)
          }, levelUpPauseDuration)
        })
      } else {
        // Animate to the final experience percentage
        startAnimation(0, endingPercentage, animationDuration)
      }
    },
    [],
  )

  useEffect(() => {
    if (
      previousLevelRef.current === undefined ||
      previousPercentageRef.current === undefined
    ) {
      previousLevelRef.current = currentLevel
      previousPercentageRef.current = experiencePercentage
    } else {
      const levelDifference = currentLevel - previousLevelRef.current

      if (
        currentLevel !== previousLevelRef.current ||
        experiencePercentage !== previousPercentageRef.current
      ) {
        if (!isAnimatingRef.current) {
          if (levelDifference > 0) {
            handleLevelUpAnimation(
              levelDifference,
              previousPercentageRef.current,
              experiencePercentage,
            )
            previousLevelRef.current = currentLevel
            previousPercentageRef.current = experiencePercentage
          } else {
            startAnimation(
              previousPercentageRef.current,
              experiencePercentage,
              animationDuration,
            )
            previousLevelRef.current = currentLevel
            previousPercentageRef.current = experiencePercentage
          }
        }
      }
    }
  }, [
    experiencePercentage,
    currentLevel,
    animationDuration,
    levelUpPauseDuration,
  ])

  const roundedDecimalPercentage =
    Math.round((animatedPercentage / 100) * 100) / 100

  return (
    <>
      <ProgressBar
        displayedLevel={displayLevelText ? levelDisplayed : undefined}
        aspectRatio={aspectRatio}
        percentFilled={roundedDecimalPercentage}
      />
    </>
  )
}

export { ExperienceProgressBar }
export default ExperienceProgressBar
