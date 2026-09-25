import { Path } from "@apollo/client"
import { ArcParameters, PathCoordinates } from "./characterPathHelper"

const containerPaddingX = 100
const containerPaddingY = 0
const headLength = 33
const armLength = 66
const bodyLength = 99
const legLength = 99
const neckGap = headLength * 0.2
const bodyStrokeWidth = headLength * 0.787
const armStrokeWidth = bodyStrokeWidth / 3
const legStrokeWidth = bodyStrokeWidth / 2
const armXOverlap = armStrokeWidth / 6
const ForwardStandingCharacterWidth =
  bodyStrokeWidth + armStrokeWidth + armXOverlap * 2
const ForwardStandingCharacterHeight =
  headLength +
  neckGap +
  bodyLength +
  legLength +
  bodyStrokeWidth / 2 +
  legStrokeWidth / 2

const centerX = ForwardStandingCharacterWidth / 2 + containerPaddingX
const containerWidth = ForwardStandingCharacterWidth + containerPaddingX * 2
const containerHeight = ForwardStandingCharacterHeight + containerPaddingY * 2
const xLegMovementFactor = bodyStrokeWidth / 3

function rotatePointAround<T extends { x: number; y: number }>(
  point: T,
  center: { x: number; y: number },
  degrees: number,
): T {
  const angle = (degrees * Math.PI) / 180
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const dx = point.x - center.x
  const dy = point.y - center.y
  return {
    ...point,
    x: center.x + dx * cos + dy * sin,
    y: center.y - dx * sin + dy * cos,
  }
}

// Helper to get a point at a given angle and distance from a center
function getPointAtAngleAndDistance(
  center: { x: number; y: number },
  angleDegrees: number,
  distance: number,
) {
  const angleRadians = (angleDegrees * Math.PI) / 180
  return {
    x: center.x + Math.cos(angleRadians) * distance,
    y: center.y + Math.sin(angleRadians) * distance,
  }
}

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
interface Celebration2Points {
  head: PathCoordinates
  body: BodyPartCoordinates
  leftArm: BodyPartCoordinates
  rightArm: BodyPartCoordinates
  leftLeg: BodyPartCoordinatesWithArc
  rightLeg: BodyPartCoordinatesWithArc
}
export interface AllCharacterPositionCoordinates {
  pushingRight: PushingRightPoints
  facingForward: FacingForwardPoints
  walkingRight: WalkingRightPoints
  celebration2: Celebration2Points
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
      x: centerX - legStrokeWidth / 2 + 0.1, // Add 0.1 to prevent gap
      y: bodyPoints[0].y + bodyLength,
    }, // Start Point
    {
      x: centerX - legStrokeWidth / 2 + 0.1,
      y: bodyPoints[0].y + bodyLength + legLength / 2,
      arcRadius: 0,
      arcSweepFlag: 1,
      arcLargeFlag: 0,
    }, // Mid Point
    {
      x: centerX - legStrokeWidth / 2 + 0.1,
      y: bodyPoints[0].y + bodyLength + legLength,
      arcRadius: 0,
      arcSweepFlag: 1,
      arcLargeFlag: 0,
    }, // End Point
  ]

  // Right Leg Points
  const rightLegPoints: BodyPartCoordinatesWithArc = [
    {
      x: centerX + legStrokeWidth / 2 - 0.1, // Subtract 0.1 to prevent gap
      y: bodyPoints[0].y + bodyLength,
    },
    {
      x: centerX + legStrokeWidth / 2 - 0.1,
      y: bodyPoints[0].y + bodyLength + legLength / 2,
      arcRadius: 0,
      arcSweepFlag: 1,
      arcLargeFlag: 0,
    }, // Mid Point
    {
      x: centerX + legStrokeWidth / 2 - 0.1,
      y: bodyPoints[0].y + bodyLength + legLength,
      arcRadius: 0,
      arcSweepFlag: 1,
      arcLargeFlag: 0,
    }, // End Point
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

const calculateCelebration2Points = (): Celebration2Points => {
  const forwardStandingPoints = calculateForwardStandingPoints()

  const celebration2Points = structuredClone(forwardStandingPoints)

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
  celebration2Points.leftArm[1] = rotatePointAround(
    celebration2Points.leftArm[1],
    celebration2Points.leftArm[0],
    -33,
  )
  celebration2Points.leftArm[2] = rotatePointAround(
    celebration2Points.leftArm[2],
    celebration2Points.leftArm[0],
    -33,
  )
  celebration2Points.leftArm[2] = rotatePointAround(
    celebration2Points.leftArm[2],
    celebration2Points.leftArm[1],
    -90,
  )

  // Update right arm position
  celebration2Points.rightArm[1] = rotatePointAround(
    celebration2Points.rightArm[1],
    celebration2Points.rightArm[0],
    90,
  )
  celebration2Points.rightArm[2] = rotatePointAround(
    celebration2Points.rightArm[2],
    celebration2Points.rightArm[0],
    90,
  )
  celebration2Points.rightArm[2] = rotatePointAround(
    celebration2Points.rightArm[2],
    celebration2Points.rightArm[1],
    60,
  )

  // Update right leg position
  celebration2Points.rightLeg[1] = rotatePointAround(
    celebration2Points.rightLeg[1],
    celebration2Points.rightLeg[0],
    30,
  )
  celebration2Points.rightLeg[2].y -= legLength / 6 // Move up slightly to reflect a lifted foot with the extended knee

  // Update left leg position
  celebration2Points.leftLeg[1] = rotatePointAround(
    celebration2Points.leftLeg[1],
    celebration2Points.leftLeg[0],
    23,
  )
  celebration2Points.leftLeg[2] = rotatePointAround(
    celebration2Points.leftLeg[2],
    celebration2Points.leftLeg[1],
    -10,
  )
  celebration2Points.leftLeg[2].y -= legLength / 6 // Move up slightly to reflect a lifted foot with the extended knee

  return celebration2Points
}

export function calculatePositions(): AllCharacterPositionCoordinates &
  CharacterContainerProps &
  CharacterDisplayProps {
  return {
    facingForward: calculateForwardStandingPoints(),
    pushingRight: calculatePushingRightPoints(),
    walkingRight: calculateWalkingRightPoints(),
    celebration2: calculateCelebration2Points(),
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
