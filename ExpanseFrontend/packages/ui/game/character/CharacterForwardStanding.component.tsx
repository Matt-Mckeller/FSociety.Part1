import { useTheme } from "@mui/system"
import { getCharacterPathData } from "./characterPathHelper"

export const CharacterForwardStanding = ({
  containerPaddingX = 0,
  containerPaddingY = 0,
  limbOpacity = 0.5,
  enableTestingBorders = false,
}: {
  containerPaddingX?: number
  containerPaddingY?: number
  limbOpacity?: number
  enableTestingBorders?: boolean
}) => {
  // console.log({ containerPaddingX, containerPaddingY, limbOpacity })
  // todo?: extract names of the individual elements to somewhere else for sharing
  // todo: Position arms and legs based on body coordinates rather than container
  // todo: figure out how to position head, is it based on the body? or is the body based on the head?
  //    head may bob so.. head standard center point? maybe center of body is a better option
  // todo: width and height of container maybe should be determined based on points and stroke

  const theme = useTheme()
  const ExpanseCharacterThemeProps =
    theme.components?.ExpanseCharacter.variants?.default

  const headLength = 33
  const armLength = 66
  const bodyLength = 99
  const legLength = 99
  const neckGap = headLength * 0.1

  const bodyStrokeWidth = headLength * 0.787
  const armStrokeWidth = bodyStrokeWidth / 3
  const legStrokeWidth = bodyStrokeWidth / 2

  const armXOverlap = armStrokeWidth / 6

  const characterWidth = bodyStrokeWidth + armStrokeWidth + armXOverlap * 2
  const characterHeight =
    headLength +
    neckGap +
    bodyLength +
    legLength +
    bodyStrokeWidth / 2 +
    legStrokeWidth / 2

  const containerWidth = characterWidth + containerPaddingX * 2
  const containerHeight = characterHeight + containerPaddingY * 2

  const centerX = characterWidth / 2 + containerPaddingX

  const headStartX = centerX
  const headStartY = containerPaddingY

  const bodyPoints = [
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
  const rightArmPoints = [
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
  const leftArmPoints = [
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
  const leftLegPoints = [
    {
      x: centerX - legStrokeWidth / 2 + 0.1, // Add 0.1 to prevent gap
      y: bodyPoints[0].y + bodyLength,
    }, // Start Point
    {
      x: centerX - legStrokeWidth / 2 + 0.1,
      y: bodyPoints[0].y + bodyLength + legLength / 2,
    }, // Mid Point
    {
      x: centerX - legStrokeWidth / 2 + 0.1,
      y: bodyPoints[0].y + bodyLength + legLength,
    }, // End Point
  ]

  // Right Leg Points
  const rightLegPoints = [
    {
      x: centerX + legStrokeWidth / 2 - 0.1, // Subtract 0.1 to prevent gap
      y: bodyPoints[0].y + bodyLength,
    }, // Start Point
    {
      x: centerX + legStrokeWidth / 2 - 0.1,
      y: bodyPoints[0].y + bodyLength + legLength / 2,
    }, // Mid Point
    {
      x: centerX + legStrokeWidth / 2 - 0.1,
      y: bodyPoints[0].y + bodyLength + legLength,
    }, // End Point
  ]

  return (
    <svg
      style={{
        height: "auto",
        maxHeight: "100%",
        width: "auto",
        maxWidth: "100%",
      }}
      viewBox={`0 0 ${containerWidth} ${containerHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* For testing */}
      {enableTestingBorders && (
        <>
          <rect
            name="container border"
            strokeWidth="1"
            stroke="#010203"
            height={containerHeight}
            width={containerWidth}
          ></rect>
          <rect
            name="character border"
            strokeWidth="1"
            stroke="blue"
            x={containerPaddingX}
            y={containerPaddingY}
            height={characterHeight}
            width={characterWidth}
          ></rect>
        </>
      )}
      <circle
        name="head"
        cx={headStartX}
        cy={headLength / 2 + headStartY}
        r={headLength / 2}
        fill={ExpanseCharacterThemeProps.headColor}
      />
      <path
        name="body"
        d={getCharacterPathData(bodyPoints)}
        stroke={ExpanseCharacterThemeProps.bodyColor}
        strokeWidth={bodyStrokeWidth}
        strokeLinecap="round"
      />
      <path
        name="leftArm"
        d={getCharacterPathData(leftArmPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        opacity={limbOpacity}
        strokeLinecap="round"
      />
      <path
        name="rightArm"
        d={getCharacterPathData(rightArmPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      <path
        name="leftLeg"
        d={getCharacterPathData(leftLegPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      <path
        name="rightLeg"
        d={getCharacterPathData(rightLegPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      {/* <path
        d="M19 49V85.5V122"
        stroke={theme.palette.primary.main}
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M5 43V71.5V100"
        stroke={theme.palette.primary.light}
        strokeWidth="8.67"
        strokeLinecap="round"
      />
      <path
        d="M33 43V71.5V100"
        stroke={theme.palette.primary.light}
        strokeWidth="8.67"
        strokeLinecap="round"
      />
      <path
        d="M12.5 122V165V208"
        stroke={theme.palette.primary.light}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M25.5 122V165V208"
        stroke={theme.palette.primary.light}
        strokeWidth="13"
        strokeLinecap="round"
      /> */}
    </svg>
  )
}
