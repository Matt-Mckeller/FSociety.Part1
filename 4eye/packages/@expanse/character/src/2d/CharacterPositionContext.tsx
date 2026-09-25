"use client"
import React, { createContext, useMemo, useState, useEffect } from "react"
import {
  calculatePositions,
  BodyPartCoordinatesWithArc,
} from "./geometry/positions"
import { PathCoordinates } from "./geometry/pathHelper"

type Pose = "pushingRight" | "facingForward" | "walkingRight" | "celebration"

type CharacterPositionContextType = ReturnType<typeof calculatePositions> & {
  rightLegPosition: BodyPartCoordinatesWithArc
  leftLegPosition: BodyPartCoordinatesWithArc
  headPosition: PathCoordinates
  bodyPosition: PathCoordinates[]
  leftArmPosition: PathCoordinates[]
  rightArmPosition: PathCoordinates[]
  currentPose: Pose
  setIsWalking: (walking: boolean) => void
  setCurrentPose: (pose: Pose) => void
}

export const CharacterPositionContext =
  createContext<CharacterPositionContextType>(
    {} as CharacterPositionContextType,
  )

export const CharacterPositionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const positions = useMemo(() => calculatePositions(), [])
  // Separated body part positions out due to changing of legs independent from other parts etc
  const {
    facingForward,
    pushingRight,
    walkingRight,
    celebration,
  } = positions

  const [rightLegPosition, setRightLegPosition] =
    useState<BodyPartCoordinatesWithArc>(facingForward.rightLeg)
  const [leftLegPosition, setLeftLegPosition] =
    useState<BodyPartCoordinatesWithArc>(facingForward.leftLeg)
  const [headPosition, setHeadPosition] = useState<PathCoordinates>(
    facingForward.head,
  )
  const [bodyPosition, setBodyPosition] = useState<PathCoordinates[]>(
    facingForward.body,
  )
  const [leftArmPosition, setLeftArmPosition] = useState<PathCoordinates[]>(
    facingForward.leftArm,
  )
  const [rightArmPosition, setRightArmPosition] = useState<PathCoordinates[]>(
    facingForward.rightArm,
  )
  const [currentPose, setCurrentPose] = useState<Pose>("facingForward")
  const [isWalking, setIsWalking] = useState(false)

  useEffect(() => {
    switch (currentPose) {
      case "facingForward":
        setRightLegPosition(facingForward.rightLeg)
        setLeftLegPosition(facingForward.leftLeg)
        setHeadPosition(facingForward.head)
        setBodyPosition(facingForward.body)
        setLeftArmPosition(facingForward.leftArm)
        setRightArmPosition(facingForward.rightArm)
        break
      case "pushingRight":
        setRightLegPosition(pushingRight.rightLeg[0])
        setLeftLegPosition(pushingRight.leftLeg[0])
        setHeadPosition(pushingRight.head)
        setBodyPosition(pushingRight.body)
        setLeftArmPosition(pushingRight.leftArm)
        setRightArmPosition(pushingRight.rightArm)
        break
      case "walkingRight":
        setRightLegPosition(walkingRight.rightLeg[0])
        setLeftLegPosition(walkingRight.leftLeg[0])
        setHeadPosition(walkingRight.head)
        setBodyPosition(walkingRight.body)
        setLeftArmPosition(walkingRight.leftArm)
        setRightArmPosition(walkingRight.rightArm)
        break
      case "celebration":
        setRightLegPosition(celebration.rightLeg)
        setLeftLegPosition(celebration.leftLeg)
        setHeadPosition(celebration.head)
        setBodyPosition(celebration.body)
        setLeftArmPosition(celebration.leftArm)
        setRightArmPosition(celebration.rightArm)
        break
      default:
        break
    }
  }, [currentPose])

  useEffect(() => {
    if (!isWalking) return

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentPose !== "pushingRight" && currentPose !== "walkingRight") {
        console.error("currentPose does not support walking animation")
        // throw new Error("currentPose does not support walking animation")
        return
      }
      if (
        positions[currentPose].rightLeg.length !==
        positions[currentPose].leftLeg.length
      ) {
        console.error(
          "Invalid character positions: rightLeg and leftLeg must have the same length",
        )
      }
      if (
        currentIndex < positions[currentPose].rightLeg.length - 1 &&
        currentIndex < positions[currentPose].leftLeg.length - 1
      ) {
        currentIndex++
        setRightLegPosition(positions[currentPose].rightLeg[currentIndex])
        setLeftLegPosition(positions[currentPose].leftLeg[currentIndex])
      } else {
        currentIndex = 0
      }
    }, 100) // Adjust the interval time to control the speed of the animation

    // eslint-disable-next-line
    return () => clearInterval(interval)
  }, [isWalking, currentPose])

  const value: CharacterPositionContextType = {
    ...positions,
    rightLegPosition,
    leftLegPosition,
    headPosition,
    bodyPosition,
    leftArmPosition,
    rightArmPosition,
    currentPose,
    setIsWalking,
    setCurrentPose,
  }

  return (
    <CharacterPositionContext.Provider value={value}>
      {children}
    </CharacterPositionContext.Provider>
  )
}

export const useCharacterPosition = (): CharacterPositionContextType => {
  const context = React.useContext(CharacterPositionContext)
  if (!context) {
    throw new Error(
      "useCharacterPosition must be used within a CharacterPositionProvider",
    )
  }
  return context
}
