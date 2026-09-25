"use client"
import { useTheme } from "@mui/system"
import { useCharacterPosition } from "../CharacterPositionContext"

export const CharacterAll = ({
  limbOpacity = 0.5,
}: {
  limbOpacity?: number
  enableTestingBorders?: boolean
}) => {
  // performance todos, use a single state object

  const theme = useTheme()
  const ExpanseCharacterThemeProps =
    theme.components?.ExpanseCharacter.variants?.default

  // Get all pose and position state from context
  const {
    containerPaddingX,
    containerPaddingY,
    containerHeight,
    containerWidth,
    headLength,
    bodyStrokeWidth,
    armStrokeWidth,
    legStrokeWidth,
    rightLegPosition,
    leftLegPosition,
    headPosition,
    bodyPosition,
    leftArmPosition,
    rightArmPosition,
    // currentPose, // if needed
  } = useCharacterPosition()

  return (
    <svg
      style={{
        height: "auto",
        maxHeight: "100%",
        width: "auto",
        maxWidth: "100%",
        // border: "1px solid black",
      }}
      viewBox={`0 0 ${containerWidth} ${containerHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        name="head"
        cx={headPosition.x}
        // cy={headLength / 2 + headStartY}
        cy={headPosition.y}
        r={headLength / 2}
        fill={ExpanseCharacterThemeProps.headColor}
      />
      <path
        name="body"
        d={bodyPosition
          .map(({ x, y }, index) => (index === 0 ? `M${x} ${y}` : `L${x} ${y}`))
          .join(" ")}
        stroke={ExpanseCharacterThemeProps.bodyColor}
        strokeWidth={bodyStrokeWidth}
        strokeLinecap="round"
      />
      <path
        name="leftArm"
        d={leftArmPosition
          .map(({ x, y }, index) => (index === 0 ? `M${x} ${y}` : `L${x} ${y}`))
          .join(" ")}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        opacity={limbOpacity}
        strokeLinecap="round"
      />
      <path
        name="rightArm"
        d={rightArmPosition
          .map(({ x, y }, index) => (index === 0 ? `M${x} ${y}` : `L${x} ${y}`))
          .join(" ")}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      {(() => {
        const [start, mid, end] = rightLegPosition
        // Use line commands when arcRadius is 0 or undefined, arc commands otherwise
        const midCmd =
          mid.arcRadius && mid.arcRadius > 0
            ? `A${mid.arcRadius} ${mid.arcRadius} 0 ${mid.arcLargeFlag ?? 0} ${mid.arcSweepFlag ?? 0} ${mid.x} ${mid.y}`
            : `L${mid.x} ${mid.y}`
        const endCmd =
          end.arcRadius && end.arcRadius > 0
            ? `A${end.arcRadius} ${end.arcRadius} 0 ${end.arcLargeFlag ?? 0} ${end.arcSweepFlag ?? 0} ${end.x} ${end.y}`
            : `L${end.x} ${end.y}`
        return (
          <path
            d={`M${start.x} ${start.y} ${midCmd} ${endCmd}`}
            stroke={ExpanseCharacterThemeProps.limbColor}
            strokeWidth={legStrokeWidth}
            strokeLinecap="round"
            opacity={limbOpacity}
            fill="none"
          />
        )
      })()}
      {(() => {
        const [start, mid, end] = leftLegPosition
        // Use line commands when arcRadius is 0 or undefined, arc commands otherwise
        const midCmd =
          mid.arcRadius && mid.arcRadius > 0
            ? `A${mid.arcRadius} ${mid.arcRadius} 0 ${mid.arcLargeFlag ?? 0} ${mid.arcSweepFlag ?? 0} ${mid.x} ${mid.y}`
            : `L${mid.x} ${mid.y}`
        const endCmd =
          end.arcRadius && end.arcRadius > 0
            ? `A${end.arcRadius} ${end.arcRadius} 0 ${end.arcLargeFlag ?? 0} ${end.arcSweepFlag ?? 0} ${end.x} ${end.y}`
            : `L${end.x} ${end.y}`
        return (
          <path
            d={`M${start.x} ${start.y} ${midCmd} ${endCmd}`}
            stroke={ExpanseCharacterThemeProps.limbColor}
            strokeWidth={legStrokeWidth}
            strokeLinecap="round"
            opacity={limbOpacity}
            fill="none"
          />
        )
      })()}
    </svg>
  )
}
