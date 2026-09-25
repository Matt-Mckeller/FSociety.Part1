/**
 * ContactUsCharacterUnified - Character with headphones using standard body proportions
 *
 * This variant uses the same body proportions as CharacterForwardStanding
 * but adds headphones and facial features from the ContactUsCharacter design.
 *
 * ## Key Differences from ContactUsCharacter
 *
 * - Uses standard character proportions (headSize = 33, body = 99, etc.)
 * - Includes full body (arms, legs)
 * - Simplified headphones design that scales with head
 * - Optional facial features
 *
 * ## Design Patterns Used
 *
 * - Same proportional system as main character
 * - Hair style from ContactUsCharacter (styled puff)
 * - Headphones scaled to head size
 */

"use client"
import React from "react"
import { useTheme } from "@mui/system"
import { getCharacterPathData } from "../characterPathHelper"
import {
  calculateDimensions,
  calculateShoulderPoint,
  calculateHipPoint,
} from "../config"

export interface ContactUsCharacterUnifiedProps {
  /** Extra padding around the character (default: 10) */
  containerPaddingX?: number
  /** Extra padding around the character (default: 10) */
  containerPaddingY?: number
  /** Opacity for limbs - arms and legs (default: 0.5) */
  limbOpacity?: number
  /** Show facial features (eyes and mouth) (default: true) */
  showFace?: boolean
  /** Show headphones (default: true) */
  showHeadphones?: boolean
  /** Show styled hair (default: true) */
  showHair?: boolean
  /** CSS class for the container */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * Character with headphones using standard body proportions
 */
export function ContactUsCharacterUnified({
  containerPaddingX = 10,
  containerPaddingY = 10,
  limbOpacity = 0.5,
  showFace = true,
  showHeadphones = true,
  showHair = true,
  className,
  style,
}: ContactUsCharacterUnifiedProps) {
  const theme = useTheme()

  const ExpanseCharacterThemeProps = theme.components?.ExpanseCharacter
    ?.variants?.default ?? {
    headColor: theme.palette.primary.main,
    bodyColor: theme.palette.primary.dark,
    limbColor: theme.palette.primary.light,
  }

  const primaryColor = theme.palette.primary.main
  const secondaryColor = theme.palette.primary.light
  const white = theme.palette.common.white

  // Get dimensions from central config
  const dims = calculateDimensions({
    containerPaddingX,
    containerPaddingY,
  })

  const {
    headLength,
    armLength,
    bodyLength,
    legLength,
    neckGap,
    bodyStrokeWidth,
    armStrokeWidth,
    legStrokeWidth,
    characterWidth,
    characterHeight,
    containerWidth,
    containerHeight,
    centerX,
  } = dims

  const headStartY = containerPaddingY
  const headCenterX = centerX
  const headCenterY = headLength / 2 + headStartY
  const headRadius = headLength / 2

  // Body points - vertical line from shoulder to hip
  const bodyPoints = [
    { x: centerX, y: headStartY + headLength + neckGap + bodyStrokeWidth / 2 },
    {
      x: centerX,
      y:
        headStartY +
        headLength +
        neckGap +
        bodyStrokeWidth / 2 +
        bodyLength / 2,
    },
    {
      x: centerX,
      y: headStartY + headLength + neckGap + bodyStrokeWidth / 2 + bodyLength,
    },
  ]

  // Calculate attachment points
  const rightShoulder = calculateShoulderPoint(bodyPoints[0], "right", dims)
  const leftShoulder = calculateShoulderPoint(bodyPoints[0], "left", dims)

  // Arms - one slightly raised (waving gesture for contact)
  const rightArmPoints = [
    rightShoulder,
    {
      x: rightShoulder.x + armLength * 0.3,
      y: rightShoulder.y - armLength * 0.2,
    },
    {
      x: rightShoulder.x + armLength * 0.6,
      y: rightShoulder.y - armLength * 0.4,
    },
  ]

  const leftArmPoints = [
    leftShoulder,
    { x: leftShoulder.x, y: leftShoulder.y + armLength / 2 },
    { x: leftShoulder.x, y: leftShoulder.y + armLength },
  ]

  // Hip attachment points
  const leftHip = calculateHipPoint(bodyPoints[0], "left", dims)
  const rightHip = calculateHipPoint(bodyPoints[0], "right", dims)

  // Legs
  const leftLegPoints = [
    leftHip,
    { x: leftHip.x, y: leftHip.y + legLength / 2 },
    { x: leftHip.x, y: leftHip.y + legLength },
  ]

  const rightLegPoints = [
    rightHip,
    { x: rightHip.x, y: rightHip.y + legLength / 2 },
    { x: rightHip.x, y: rightHip.y + legLength },
  ]

  // Headphone dimensions (scaled to head)
  const headphoneWidth = headRadius * 0.4
  const headphoneHeight = headRadius * 0.9
  const headphoneY = headCenterY - headRadius * 0.1

  // Hair puff dimensions
  const hairPuffRadius = headRadius * 0.35
  const hairPuffX = headCenterX + headRadius * 0.5
  const hairPuffY = headCenterY - headRadius * 0.7

  // Face feature dimensions
  const eyeRadius = headRadius * 0.08
  const eyeOffsetX = headRadius * 0.25
  const eyeY = headCenterY - headRadius * 0.1
  const mouthY = headCenterY + headRadius * 0.35
  const mouthWidth = headRadius * 0.5

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox={`0 0 ${containerWidth} ${containerHeight}`}
      fill="none"
      className={className}
      style={{
        height: "auto",
        maxHeight: "100%",
        width: "auto",
        maxWidth: "100%",
        ...style,
      }}
      data-component="ContactUsCharacterUnified"
    >
      {/* Body */}
      <path
        name="body"
        d={getCharacterPathData(bodyPoints)}
        stroke={ExpanseCharacterThemeProps.bodyColor}
        strokeWidth={bodyStrokeWidth}
        strokeLinecap="round"
      />

      {/* Left Arm */}
      <path
        name="leftArm"
        d={getCharacterPathData(leftArmPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        opacity={limbOpacity}
        strokeLinecap="round"
      />

      {/* Right Arm (waving) */}
      <path
        name="rightArm"
        d={getCharacterPathData(rightArmPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />

      {/* Left Leg */}
      <path
        name="leftLeg"
        d={getCharacterPathData(leftLegPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />

      {/* Right Leg */}
      <path
        name="rightLeg"
        d={getCharacterPathData(rightLegPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />

      {/* Hair (styled puff) */}
      {showHair && (
        <>
          <circle
            name="hairPuff"
            cx={hairPuffX}
            cy={hairPuffY}
            r={hairPuffRadius}
            fill={primaryColor}
          />
          <circle
            name="hairPuffOutline"
            cx={hairPuffX}
            cy={hairPuffY}
            r={hairPuffRadius}
            fill="none"
            stroke={secondaryColor}
            strokeWidth={1}
          />
        </>
      )}

      {/* Head */}
      <circle
        name="head"
        cx={headCenterX}
        cy={headCenterY}
        r={headRadius}
        fill={ExpanseCharacterThemeProps.headColor}
      />

      {/* Headphones */}
      {showHeadphones && (
        <>
          {/* Headphone band (arc over head) */}
          <path
            name="headphoneBand"
            d={`M ${headCenterX - headRadius - 2} ${headCenterY}
                A ${headRadius + 4} ${headRadius * 0.8} 0 0 1 ${headCenterX + headRadius + 2} ${headCenterY}`}
            stroke={primaryColor}
            strokeWidth={3}
            fill="none"
          />

          {/* Left earpad */}
          <ellipse
            name="leftEarpad"
            cx={headCenterX - headRadius - 2}
            cy={headphoneY}
            rx={headphoneWidth / 2}
            ry={headphoneHeight / 2}
            fill={primaryColor}
          />
          <ellipse
            name="leftEarpadInner"
            cx={headCenterX - headRadius - 2}
            cy={headphoneY}
            rx={headphoneWidth / 3}
            ry={headphoneHeight / 3}
            fill={secondaryColor}
          />

          {/* Right earpad */}
          <ellipse
            name="rightEarpad"
            cx={headCenterX + headRadius + 2}
            cy={headphoneY}
            rx={headphoneWidth / 2}
            ry={headphoneHeight / 2}
            fill={primaryColor}
          />
          <ellipse
            name="rightEarpadInner"
            cx={headCenterX + headRadius + 2}
            cy={headphoneY}
            rx={headphoneWidth / 3}
            ry={headphoneHeight / 3}
            fill={secondaryColor}
          />
        </>
      )}

      {/* Face features */}
      {showFace && (
        <>
          {/* Left eye */}
          <circle
            name="leftEye"
            cx={headCenterX - eyeOffsetX}
            cy={eyeY}
            r={eyeRadius}
            fill={white}
          />

          {/* Right eye */}
          <circle
            name="rightEye"
            cx={headCenterX + eyeOffsetX}
            cy={eyeY}
            r={eyeRadius}
            fill={white}
          />

          {/* Smile */}
          <path
            name="smile"
            d={`M ${headCenterX - mouthWidth / 2} ${mouthY}
                Q ${headCenterX} ${mouthY + mouthWidth * 0.4}
                  ${headCenterX + mouthWidth / 2} ${mouthY}`}
            stroke={white}
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}
    </svg>
  )
}
