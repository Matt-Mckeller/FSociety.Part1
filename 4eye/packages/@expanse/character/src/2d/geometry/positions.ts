/**
 * Character Position Calculations
 *
 * Calculates all character pose coordinates for different states:
 * - facingForward: Default standing pose
 * - pushingRight: Leaning pose for pushing animation
 * - walkingRight: Walking cycle with leg keyframes
 * - celebration: Victory pose with arms raised
 *
 * All proportions derived from central config (characterDimensions.ts)
 */

import { ArcParameters, PathCoordinates } from "./pathHelper"
import {
  DEFAULT_DIMENSIONS,
  rotatePointAround,
  getPointAtAngleAndDistance,
  type CharacterDimensions,
} from "./dimensions"

// Use centralized dimensions
const dims = DEFAULT_DIMENSIONS
const {
  containerPaddingX,
  containerPaddingY,
  headLength,
  armLength,
  bodyLength,
  legLength,
  neckGap,
  bodyStrokeWidth,
  armStrokeWidth,
  legStrokeWidth,
  armXOverlap,
  containerWidth,
  containerHeight,
  centerX,
  xLegMovementFactor,
  legGapCorrection,
} = dims

// May end up making it more generic later
export type BodyPartCoordinates = [
  PathCoordinates,
  PathCoordinates,
  PathCoordinates,
]
export type BodyPartCoordinatesWithArc = [
  PathCoordinates,
  PathCoordinates & ArcParameters,
  PathCoordinates & ArcParameters,
]
export type WalkingLegPointSet = [
  BodyPartCoordinatesWithArc,
  BodyPartCoordinatesWithArc,
  BodyPartCoordinatesWithArc,
  BodyPartCoordinatesWithArc,
  BodyPartCoordinatesWithArc,
  BodyPartCoordinatesWithArc,
  BodyPartCoordinatesWithArc,
  BodyPartCoordinatesWithArc,
  BodyPartCoordinatesWithArc,
  BodyPartCoordinatesWithArc,
]
interface PushingRightPoints {
  head: PathCoordinates
  body: BodyPartCoordinates
  leftArm: BodyPartCoordinates
  rightArm: BodyPartCoordinates
  leftLeg: WalkingLegPointSet
  rightLeg: WalkingLegPointSet
}
interface WalkingRightPoints {
  head: PathCoordinates
  body: BodyPartCoordinates
  leftArm: BodyPartCoordinates
  rightArm: BodyPartCoordinates
  leftLeg: WalkingLegPointSet
  rightLeg: WalkingLegPointSet
}
interface FacingForwardPoints {
  head: PathCoordinates
  body: BodyPartCoordinates
  leftArm: BodyPartCoordinates
  rightArm: BodyPartCoordinates
  leftLeg: BodyPartCoordinatesWithArc
  rightLeg: BodyPartCoordinatesWithArc
}
interface CelebrationPoints {
  head: PathCoordinates
  body: BodyPartCoordinates
  leftArm: BodyPartCoordinates
  rightArm: BodyPartCoordinates
  leftLeg: BodyPartCoordinatesWithArc
  rightLeg: BodyPartCoordinatesWithArc
}
interface Celebration1Points {
  head: PathCoordinates
  body: BodyPartCoordinates
  leftArm: BodyPartCoordinates
  rightArm: BodyPartCoordinates
  leftLeg: BodyPartCoordinates
  rightLeg: BodyPartCoordinates
}
interface SideStandingPoints {
  head: PathCoordinates
  body: BodyPartCoordinates
  arms: BodyPartCoordinates // Single arm path for side view
  legs: BodyPartCoordinates // Single leg path for side view
}
export interface AllCharacterPositionCoordinates {
  pushingRight: PushingRightPoints
  facingForward: FacingForwardPoints
  walkingRight: WalkingRightPoints
  celebration1: Celebration1Points
  celebration: CelebrationPoints
  leftStanding: SideStandingPoints
  rightStanding: SideStandingPoints
}
export interface CharacterContainerProps {
  containerPaddingX?: number
  containerPaddingY?: number
  containerWidth?: number
  containerHeight?: number
}
export interface CharacterDisplayProps {
  headLength: number
  bodyStrokeWidth: number
  armStrokeWidth: number
  legStrokeWidth: number
}

function calculateForwardStandingPoints(): FacingForwardPoints {
  const headStartX = centerX
  const headStartY = containerPaddingY

  const headPoints: PathCoordinates = {
    x: headStartX,
    y: headLength / 2 + headStartY,
  }

  const bodyPoints: BodyPartCoordinates = [
    { x: centerX, y: headStartY + headLength + neckGap + bodyStrokeWidth / 2 }, // Start Point
    {
      x: centerX,
      y:
        headStartY +
        headLength +
        neckGap +
        bodyStrokeWidth / 2 +
        bodyLength / 2,
    }, // Mid Point
    {
      x: centerX,
      y: headStartY + headLength + neckGap + bodyStrokeWidth / 2 + bodyLength,
    }, // End Point
  ]

  // Right Arm Points
  const rightArmPoints: BodyPartCoordinates = [
    {
      x: centerX + bodyStrokeWidth / 2 + armXOverlap,
      y: bodyPoints[0].y - bodyStrokeWidth / 2 + armStrokeWidth,
    }, // Start Point
    {
      x: centerX + bodyStrokeWidth / 2 + armXOverlap,
      y: bodyPoints[0].y - bodyStrokeWidth / 2 + armStrokeWidth + armLength / 2,
    }, // Mid Point
    {
      x: centerX + bodyStrokeWidth / 2 + armXOverlap,
      y: bodyPoints[0].y - bodyStrokeWidth / 2 + armStrokeWidth + armLength,
    }, // End Point
  ]

  // Left Arm Points
  const leftArmPoints: BodyPartCoordinates = [
    {
      x: centerX - bodyStrokeWidth / 2 - armXOverlap,
      y: bodyPoints[0].y - bodyStrokeWidth / 2 + armStrokeWidth,
    }, // Start Point
    {
      x: centerX - bodyStrokeWidth / 2 - armXOverlap,
      y: bodyPoints[0].y - bodyStrokeWidth / 2 + armStrokeWidth + armLength / 2,
    }, // Mid Point
    {
      x: centerX - bodyStrokeWidth / 2 - armXOverlap,
      y: bodyPoints[0].y - bodyStrokeWidth / 2 + armStrokeWidth + armLength,
    }, // End Point
  ]

  // Left Leg Points
  const leftLegPoints: BodyPartCoordinatesWithArc = [
    {
      x: centerX - legStrokeWidth / 2 + legGapCorrection,
      y: bodyPoints[0].y + bodyLength,
    },
    {
      x: centerX - legStrokeWidth / 2 + legGapCorrection,
      y: bodyPoints[0].y + bodyLength + legLength / 2,
      arcRadius: 0,
      arcSweepFlag: 1,
      arcLargeFlag: 0,
    },
    {
      x: centerX - legStrokeWidth / 2 + legGapCorrection,
      y: bodyPoints[0].y + bodyLength + legLength,
      arcRadius: 0,
      arcSweepFlag: 1,
      arcLargeFlag: 0,
    },
  ]

  // Right Leg Points
  const rightLegPoints: BodyPartCoordinatesWithArc = [
    {
      x: centerX + legStrokeWidth / 2 - legGapCorrection,
      y: bodyPoints[0].y + bodyLength,
    },
    {
      x: centerX + legStrokeWidth / 2 - legGapCorrection,
      y: bodyPoints[0].y + bodyLength + legLength / 2,
      arcRadius: 0,
      arcSweepFlag: 1,
      arcLargeFlag: 0,
    },
    {
      x: centerX + legStrokeWidth / 2 - legGapCorrection,
      y: bodyPoints[0].y + bodyLength + legLength,
      arcRadius: 0,
      arcSweepFlag: 1,
      arcLargeFlag: 0,
    },
  ]
  return {
    head: headPoints,
    body: bodyPoints,
    leftArm: leftArmPoints,
    rightArm: rightArmPoints,
    leftLeg: leftLegPoints,
    rightLeg: rightLegPoints,
  }
}

const calculatePushingRightPoints = (): PushingRightPoints => {
  const forwardStandingPoints = calculateForwardStandingPoints()

  const rotatedBodyPoints: BodyPartCoordinates = [
    rotatePointAround(
      forwardStandingPoints.body[0],
      forwardStandingPoints.body[2],
      -33,
    ),
    rotatePointAround(
      forwardStandingPoints.body[1],
      forwardStandingPoints.body[2],
      -33,
    ),
    forwardStandingPoints.body[2],
  ]
  // Rotate head center around forwardStandingPoints.body[2]
  const rotatedHeadCenter = rotatePointAround(
    forwardStandingPoints.head,
    forwardStandingPoints.body[2],
    -33,
  )

  // Rotate left and right arm points around forwardStandingPoints.body[2]
  const rotatedLeftArmPoints: BodyPartCoordinates = [
    rotatePointAround(
      forwardStandingPoints.leftArm[0],
      forwardStandingPoints.body[2],
      -33,
    ),
    forwardStandingPoints.leftArm[1],
    forwardStandingPoints.leftArm[2],
  ]

  // overall length of the arm should stay the same too
  const rotatedRightArmPoints: BodyPartCoordinates = [
    rotatePointAround(
      forwardStandingPoints.rightArm[0],
      forwardStandingPoints.body[2],
      -33,
    ),
    forwardStandingPoints.rightArm[1],
    forwardStandingPoints.rightArm[2],
  ]
  // Find center point between rotatedleftArm[0] and rotatedRightArmPoints[0]
  const armsCenterPoint = {
    x: (rotatedLeftArmPoints[0].x + rotatedRightArmPoints[0].x) / 2,
    y: (rotatedLeftArmPoints[0].y + rotatedRightArmPoints[0].y) / 2,
  }

  // Update left and right arm points' first point to be the center point
  rotatedLeftArmPoints[0] = armsCenterPoint
  rotatedRightArmPoints[0] = armsCenterPoint

  // For left arm: rotate the second point to be at 81 degrees from the first point
  const leftArmAngle = 81
  rotatedLeftArmPoints[1] = getPointAtAngleAndDistance(
    rotatedLeftArmPoints[0],
    leftArmAngle,
    armLength / 2,
  )

  const rightArmAngle = 81
  rotatedRightArmPoints[1] = getPointAtAngleAndDistance(
    rotatedRightArmPoints[0],
    rightArmAngle,
    armLength / 2,
  )

  rotatedLeftArmPoints[2] = getPointAtAngleAndDistance(
    rotatedLeftArmPoints[1],
    0,
    armLength / 2,
  )

  rotatedRightArmPoints[2] = getPointAtAngleAndDistance(
    rotatedRightArmPoints[1],
    0,
    armLength / 2,
  )

  const { rightLeg, leftLeg } = calculateWalkingRightLegs()

  return {
    head: rotatedHeadCenter,
    body: rotatedBodyPoints,
    leftArm: rotatedLeftArmPoints,
    rightArm: rotatedRightArmPoints,
    leftLeg: leftLeg,
    rightLeg: rightLeg,
  }
}

const calculateWalkingRightLegs = (): {
  rightLeg: WalkingLegPointSet
  leftLeg: WalkingLegPointSet
} => {
  const forwardStandingPoints = calculateForwardStandingPoints()

  // Calculate the center point between the two legs' points for each index
  for (let i = 0; i < forwardStandingPoints.leftLeg.length; i++) {
    const centerPoint = {
      x:
        (forwardStandingPoints.leftLeg[i].x +
          forwardStandingPoints.rightLeg[i].x) /
        2,
      y:
        (forwardStandingPoints.leftLeg[i].y +
          forwardStandingPoints.rightLeg[i].y) /
        2,
    }
    forwardStandingPoints.leftLeg[i] = centerPoint
    forwardStandingPoints.rightLeg[i] = centerPoint
  }

  forwardStandingPoints.rightLeg[1].arcLargeFlag = 0
  forwardStandingPoints.rightLeg[1].arcSweepFlag = 1
  forwardStandingPoints.rightLeg[2].arcLargeFlag = 0
  forwardStandingPoints.rightLeg[2].arcSweepFlag = 1

  const bentLegPosition1 = structuredClone(forwardStandingPoints.rightLeg)
  // Undo y movement from bentLegPosition3
  // bentLegPosition1[2].y += legLength / 12
  // bentLegPosition1[1].y += legLength / 12
  // Adjust x position for leg
  bentLegPosition1[1].x -= xLegMovementFactor * 1
  bentLegPosition1[2].x -= xLegMovementFactor * 4
  bentLegPosition1[1].arcRadius = legLength / 0.5
  bentLegPosition1[2].arcRadius = legLength / 0.5

  const bentLegPosition3 = structuredClone(forwardStandingPoints.rightLeg) // The currently completed accurate version

  bentLegPosition3[1].x += xLegMovementFactor
  // bentLegPosition3[2].x += bentLegPosition3ForwardXMovementForMidpoint

  // move the leg endpoint up slightly to reflect a lifted foot with the extended knee
  bentLegPosition3[2].y -= legLength / 12
  bentLegPosition3[1].y -= legLength / 12

  bentLegPosition3[1].arcRadius = legLength / 0.909
  bentLegPosition3[2].arcRadius = legLength / 0.909

  const bentLegPosition2 = structuredClone(forwardStandingPoints.rightLeg)
  bentLegPosition2[2].y -= legLength / 15
  bentLegPosition2[1].y -= legLength / 15
  // bentLegPosition2[1].x -= xMovementFactor
  bentLegPosition2[2].x -= xLegMovementFactor * 1.73
  bentLegPosition2[1].arcRadius = legLength / 0.5
  bentLegPosition2[2].arcRadius = legLength / 0.5

  const bentLegPosition4 = structuredClone(forwardStandingPoints.rightLeg)
  bentLegPosition4[2].y -= legLength / 15
  bentLegPosition4[1].y -= legLength / 15
  bentLegPosition4[1].x += xLegMovementFactor * 1.59
  bentLegPosition4[2].x += xLegMovementFactor * 1.59
  bentLegPosition4[1].arcRadius = legLength / 0.61
  bentLegPosition4[2].arcRadius = legLength / 0.61

  const bentLegPosition5 = structuredClone(forwardStandingPoints.rightLeg)
  bentLegPosition5[1].x += xLegMovementFactor * 2
  bentLegPosition5[2].x += xLegMovementFactor * 2.51
  bentLegPosition5[1].arcRadius = legLength / 0.5
  bentLegPosition5[2].arcRadius = legLength / 0.5

  const straightLegPosition1 = structuredClone(forwardStandingPoints.rightLeg)
  straightLegPosition1[1].arcRadius = 0
  straightLegPosition1[2].arcRadius = 0

  straightLegPosition1[1].x -= xLegMovementFactor * 2
  straightLegPosition1[2].x -= xLegMovementFactor * 4

  const straightLegPosition2 = structuredClone(forwardStandingPoints.rightLeg)
  straightLegPosition2[1].arcRadius = 0
  straightLegPosition2[2].arcRadius = 0
  straightLegPosition2[1].x -= xLegMovementFactor * (1.73 / 2)
  straightLegPosition2[2].x -= xLegMovementFactor * 1.73

  const straightLegPosition3 = structuredClone(forwardStandingPoints.rightLeg)
  straightLegPosition3[1].arcRadius = 0
  straightLegPosition3[2].arcRadius = 0

  const straightLegPosition4 = structuredClone(forwardStandingPoints.rightLeg)
  straightLegPosition4[1].arcRadius = 0
  straightLegPosition4[2].arcRadius = 0

  straightLegPosition4[1].x += xLegMovementFactor * (1.59 / 2)
  straightLegPosition4[2].x += xLegMovementFactor * 1.59

  const straightLegPosition5 = structuredClone(forwardStandingPoints.rightLeg)
  straightLegPosition5[1].arcRadius = 0
  straightLegPosition5[2].arcRadius = 0

  straightLegPosition5[1].x += xLegMovementFactor * (2.51 / 2)
  straightLegPosition5[2].x += xLegMovementFactor * 2.51

  return {
    leftLeg: [
      bentLegPosition1,
      bentLegPosition2,
      bentLegPosition3,
      bentLegPosition4,
      bentLegPosition5,
      straightLegPosition5,
      straightLegPosition4,
      straightLegPosition3,
      straightLegPosition2,
      straightLegPosition1,
    ],
    rightLeg: [
      straightLegPosition5,
      straightLegPosition4,
      straightLegPosition3,
      straightLegPosition2,
      straightLegPosition1,
      bentLegPosition1,
      bentLegPosition2,
      bentLegPosition3,
      bentLegPosition4,
      bentLegPosition5,
    ],
  }
}

const calculateWalkingRightPoints = (): WalkingRightPoints => {
  const forwardStandingPoints = calculateForwardStandingPoints()

  const walkingRightLegs = calculateWalkingRightLegs()

  // Deep clone arms and body to avoid mutating the original
  const leftArm = structuredClone(forwardStandingPoints.leftArm)
  const rightArm = structuredClone(forwardStandingPoints.rightArm)
  const body = structuredClone(forwardStandingPoints.body)

  // Calculate the center point between the two arms' points for each index
  for (let i = 0; i < leftArm.length; i++) {
    const centerPoint = {
      x:
        (forwardStandingPoints.leftArm[i].x +
          forwardStandingPoints.rightArm[i].x) /
        2,
      y:
        (forwardStandingPoints.leftArm[i].y +
          forwardStandingPoints.rightArm[i].y) /
        2,
    }
    leftArm[i] = centerPoint
    rightArm[i] = centerPoint
  }

  return {
    head: structuredClone(forwardStandingPoints.head),
    body,
    leftArm,
    rightArm,
    leftLeg: walkingRightLegs.leftLeg,
    rightLeg: walkingRightLegs.rightLeg,
  }
}

/**
 * Calculate celebration1 pose - asymmetric victory pose
 * Right arm raised high (victory pump), left arm extended down-left (counter balance)
 * Legs spread apart in dynamic stance
 */
const calculateCelebration1Points = (): Celebration1Points => {
  const forwardStandingPoints = calculateForwardStandingPoints()

  // Use the same centerX and base positions
  const bodyStartY = forwardStandingPoints.body[0].y
  const bodyEndY = forwardStandingPoints.body[2].y
  const shoulderY = bodyStartY - bodyStrokeWidth / 2 + armStrokeWidth

  // Body stays vertical
  const bodyPoints: BodyPartCoordinates = structuredClone(
    forwardStandingPoints.body,
  )

  // Head stays centered
  const headPoints = structuredClone(forwardStandingPoints.head)

  // Right arm - raised high, angled up-right (victory pump)
  const rightArmStart = { x: centerX + bodyStrokeWidth / 2, y: shoulderY }
  const rightArmMid = rotatePointAround(
    { x: rightArmStart.x, y: rightArmStart.y - armLength / 2 },
    rightArmStart,
    -45,
  )
  const rightArmEnd = rotatePointAround(
    { x: rightArmMid.x, y: rightArmMid.y - armLength / 2 },
    rightArmMid,
    -60,
  )
  const rightArmPoints: BodyPartCoordinates = [
    rightArmStart,
    rightArmMid,
    rightArmEnd,
  ]

  // Left arm - extended down-left (counter balance)
  const leftArmStart = { x: centerX - bodyStrokeWidth / 2, y: shoulderY }
  const leftArmMid = rotatePointAround(
    { x: leftArmStart.x, y: leftArmStart.y + armLength / 2 },
    leftArmStart,
    45,
  )
  const leftArmEnd = rotatePointAround(
    { x: leftArmMid.x, y: leftArmMid.y + armLength / 2 },
    leftArmMid,
    30,
  )
  const leftArmPoints: BodyPartCoordinates = [
    leftArmStart,
    leftArmMid,
    leftArmEnd,
  ]

  // Left leg - spread left
  const leftLegStart = { x: centerX - legStrokeWidth / 2, y: bodyEndY }
  const leftLegMid = {
    x: leftLegStart.x - legLength / 4,
    y: leftLegStart.y + legLength / 2,
  }
  const leftLegEnd = {
    x: leftLegMid.x - legLength / 6,
    y: leftLegStart.y + legLength,
  }
  const leftLegPoints: BodyPartCoordinates = [
    leftLegStart,
    leftLegMid,
    leftLegEnd,
  ]

  // Right leg - spread right
  const rightLegStart = { x: centerX + legStrokeWidth / 2, y: bodyEndY }
  const rightLegMid = {
    x: rightLegStart.x + legLength / 4,
    y: rightLegStart.y + legLength / 2,
  }
  const rightLegEnd = {
    x: rightLegMid.x + legLength / 6,
    y: rightLegStart.y + legLength,
  }
  const rightLegPoints: BodyPartCoordinates = [
    rightLegStart,
    rightLegMid,
    rightLegEnd,
  ]

  return {
    head: headPoints,
    body: bodyPoints,
    leftArm: leftArmPoints,
    rightArm: rightArmPoints,
    leftLeg: leftLegPoints,
    rightLeg: rightLegPoints,
  }
}

/**
 * Calculate left standing pose - side view facing left
 * All limbs at same X position, creating silhouette effect
 */
const calculateLeftStandingPoints = (): SideStandingPoints => {
  // Side view uses headLength as width, character centered
  const sideViewCenterX = headLength / 2 + containerPaddingX

  // Head position
  const headPoints: PathCoordinates = {
    x: sideViewCenterX,
    y: headLength / 2 + containerPaddingY,
  }

  // Body position (side view - single vertical line)
  const bodyStartY =
    containerPaddingY + headLength + neckGap + bodyStrokeWidth / 2
  const bodyEndY = bodyStartY + bodyLength

  const bodyPoints: BodyPartCoordinates = [
    { x: sideViewCenterX, y: bodyStartY },
    { x: sideViewCenterX, y: bodyStartY + bodyLength / 2 },
    { x: sideViewCenterX, y: bodyEndY },
  ]

  // Arms position (same X, overlapping in side view)
  const armStartY = bodyStartY - bodyStrokeWidth / 2 + armStrokeWidth
  const armEndY = armStartY + armLength

  const armPoints: BodyPartCoordinates = [
    { x: sideViewCenterX, y: armStartY },
    { x: sideViewCenterX, y: armStartY + armLength / 2 },
    { x: sideViewCenterX, y: armEndY },
  ]

  // Legs position (same X, overlapping in side view)
  const legStartY = bodyEndY
  const legEndY = legStartY + legLength

  const legPoints: BodyPartCoordinates = [
    { x: sideViewCenterX, y: legStartY },
    { x: sideViewCenterX, y: legStartY + legLength / 2 },
    { x: sideViewCenterX, y: legEndY },
  ]

  return {
    head: headPoints,
    body: bodyPoints,
    arms: armPoints,
    legs: legPoints,
  }
}

/**
 * Calculate right standing pose - side view facing right
 * Currently symmetrical to left standing (becomes different with facial features)
 */
const calculateRightStandingPoints = (): SideStandingPoints => {
  // For now, identical to left standing since basic stick figure is symmetrical
  return calculateLeftStandingPoints()
}

const calculateCelebrationPoints = (): CelebrationPoints => {
  const forwardStandingPoints = calculateForwardStandingPoints()

  const celebrationPoints = structuredClone(forwardStandingPoints)

  // Move body parts for celebration 2 points in the following way:
  // Left arm moves up and to the left to form a v shape but keeps the same arm length
  //   Left arm mid point rotates 33 degrees clockwise around left arm point 1
  //   Left arm end point rotates 33 degrees clockwise around left arm point 1
  //     then left arm end point rotates another 90 degrees clockwise around left arm point 2
  // Right Arm moves up and to the right to form a v shape but keeps the same arm length but with a wider spread and is raised higher than the left arm
  // Right arm point 2 rotates 135 degrees counter clockwise around right arm point 1
  //  Right arm point 3 rotates 135 degrees counter clockwise around right arm point 1
  //  Then right arm 40 degrees counter clockwise around right arm point 2
  // Right leg point 2 rotates 45 degrees counter clockwise around right leg point 1
  //   Right leg point 3 moves up slightly to reflect a lifted foot with the extended knee maintaining the same leg length in the original facing forward position
  // Left leg point 2 rotates 40 degrees counter clockwise around left leg point 1
  // Left leg point 3 rotates 10 degreees clockwise around left leg point 2
  // Left leg point 3 moves up slightly to reflect a lifted foot with the extended knee maintaining the same leg length in the original facing forward position

  // Update left arm position
  celebrationPoints.leftArm[1] = rotatePointAround(
    celebrationPoints.leftArm[1],
    celebrationPoints.leftArm[0],
    -33,
  )
  celebrationPoints.leftArm[2] = rotatePointAround(
    celebrationPoints.leftArm[2],
    celebrationPoints.leftArm[0],
    -33,
  )
  celebrationPoints.leftArm[2] = rotatePointAround(
    celebrationPoints.leftArm[2],
    celebrationPoints.leftArm[1],
    -90,
  )

  // Update right arm position
  celebrationPoints.rightArm[1] = rotatePointAround(
    celebrationPoints.rightArm[1],
    celebrationPoints.rightArm[0],
    90,
  )
  celebrationPoints.rightArm[2] = rotatePointAround(
    celebrationPoints.rightArm[2],
    celebrationPoints.rightArm[0],
    90,
  )
  celebrationPoints.rightArm[2] = rotatePointAround(
    celebrationPoints.rightArm[2],
    celebrationPoints.rightArm[1],
    60,
  )

  // Update right leg position
  celebrationPoints.rightLeg[1] = rotatePointAround(
    celebrationPoints.rightLeg[1],
    celebrationPoints.rightLeg[0],
    30,
  )
  celebrationPoints.rightLeg[2].y -= legLength / 6 // Move up slightly to reflect a lifted foot with the extended knee

  // Update left leg position
  celebrationPoints.leftLeg[1] = rotatePointAround(
    celebrationPoints.leftLeg[1],
    celebrationPoints.leftLeg[0],
    23,
  )
  celebrationPoints.leftLeg[2] = rotatePointAround(
    celebrationPoints.leftLeg[2],
    celebrationPoints.leftLeg[1],
    -10,
  )
  celebrationPoints.leftLeg[2].y -= legLength / 6 // Move up slightly to reflect a lifted foot with the extended knee

  return celebrationPoints
}

export function calculatePositions(): AllCharacterPositionCoordinates &
  CharacterContainerProps &
  CharacterDisplayProps {
  return {
    facingForward: calculateForwardStandingPoints(),
    pushingRight: calculatePushingRightPoints(),
    walkingRight: calculateWalkingRightPoints(),
    celebration1: calculateCelebration1Points(),
    celebration: calculateCelebrationPoints(),
    leftStanding: calculateLeftStandingPoints(),
    rightStanding: calculateRightStandingPoints(),
    containerPaddingX,
    containerPaddingY,
    containerHeight,
    containerWidth,
    headLength,
    bodyStrokeWidth,
    armStrokeWidth,
    legStrokeWidth,
  }
}
