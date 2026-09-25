"use client"

import { useTheme } from "@mui/material"
import { useId, useRef } from "react"

type ProgressBarState = "filled" | "default"
/**
 * ProgressBar component renders a customizable progress bar using SVG.
 * Color Styling is done using the theme provider.
 *
 * @param aspectRatio - The aspect ratio of the progress bar. This is the number: 1 for the aspect ratio so providing a 4 would be a 4:1 length to width aspect ratio.
 *   on second thought I'm not entirely sure how the aspect ratio works, may need this cleaned up
 *   for now the parent container has to have a max height, i.e. <Box sx={{ height: "50px" }}>
 *   and the component stretches out to fill to be X:1 based on the parent containers height
 * @param percentFilled - The percentage of the progress bar that is filled, ranging from 0 to 1. Defaults to 0.75.
 * @returns A JSX element representing the progress bar.
 */
export const ProgressBar = ({
  aspectRatio,
  percentFilled = 0.75,
  displayPercentFilled = true,
  displayedLevel = undefined,
}: {
  aspectRatio: number
  percentFilled: number // 0 to 1
  displayPercentFilled?: boolean
  displayedLevel?: string | number
}) => {
  const theme = useTheme()
  const ProgressBarThemeVariantStyles = theme.components?.ProgressBar?.variants
  const UnfilledVariantStyles = ProgressBarThemeVariantStyles?.default
  const FilledVariantStyles = ProgressBarThemeVariantStyles?.defaultFilled
  if (!UnfilledVariantStyles) {
    throw new Error("ProgressBar component is missing default variant styles")
  }
  if (!FilledVariantStyles) {
    throw new Error(
      "ProgressBar component is missing defaultFilled variant styles",
    )
  }

  const svgRef = useRef<SVGSVGElement>(null)
  const _percentFilled =
    percentFilled > 1 ? 1 : percentFilled < 0 ? 0 : percentFilled
  if (percentFilled > 1 || percentFilled < 0) {
    console.log("actual fill percentage", { percentFilled })
    // console.warn(
    //   "Progress bar fill percent should be between 0 and 100 (0 and 1)",
    // )
  }

  const state: ProgressBarState = percentFilled === 1 ? "filled" : "default"

  const {
    outerDecorativeLayerStrokeColor,
    outerDecorativeLayerFillColor,
    innerBackgroundLayerFillColor,
    innerProgressLayerFillColor,
    // textColor is no longer used - dual-color text calculates colors based on theme mode
  } = state === "filled" ? FilledVariantStyles : UnfilledVariantStyles

  const totalHeight = 100
  const totalWidth = totalHeight * aspectRatio
  const outerStrokeWidth = 6
  const middleFillHeight = outerStrokeWidth * 2

  const outerDecorativeLayerWidth = totalWidth - outerStrokeWidth * 2
  const outerDecorativeLayerHeight = totalHeight - outerStrokeWidth * 2
  const innerBackgroundLayerHeight =
    outerDecorativeLayerHeight - (outerStrokeWidth + middleFillHeight) * 2
  const innerBackgroundLayerWidth =
    outerDecorativeLayerWidth - (outerStrokeWidth + middleFillHeight) * 2
  const outerDecorativeLayerOffsetXY = outerStrokeWidth

  const innerProgressLayerHeight = innerBackgroundLayerHeight
  const innerFillBarRx = innerProgressLayerHeight / 2
  // The rx makes the curve end at the percent mark which makes it seem
  // less full than it is, in order to fix this we you can subtract
  // a portion of the corner radius (rx) from the width calculation
  // to get a more accurate fill width and then add it back on after
  const innerProgressLayerWidth =
    percentFilled > 0
      ? (innerBackgroundLayerWidth - 2 * innerFillBarRx) * _percentFilled +
        2 * innerFillBarRx
      : 0

  const innerLayerOffsetXY =
    outerStrokeWidth + middleFillHeight + outerDecorativeLayerOffsetXY

  const fontSize = Math.min(
    innerBackgroundLayerHeight * 0.6,
    innerBackgroundLayerWidth / 5,
  )
  // textColor is now theme-driven for WCAG AA compliance

  const formattedPercentage = Math.floor(percentFilled * 100)

  return (
    <svg
      ref={svgRef}
      style={{
        height: "auto",
        maxHeight: "100%",
        width: "auto",
        maxWidth: "100%",
      }}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      preserveAspectRatio={"none"}
    >
      <g>
        {/* Outer layer decorative */}
        <rect
          x={outerDecorativeLayerOffsetXY}
          y={outerDecorativeLayerOffsetXY}
          width={outerDecorativeLayerWidth}
          height={outerDecorativeLayerHeight}
          fill={outerDecorativeLayerFillColor}
          strokeWidth={outerStrokeWidth}
          stroke={outerDecorativeLayerStrokeColor}
          rx={outerDecorativeLayerHeight / 2}
        ></rect>
        {/* Inner layer background */}
        <rect
          y={innerLayerOffsetXY}
          x={innerLayerOffsetXY}
          width={innerBackgroundLayerWidth}
          height={innerBackgroundLayerHeight}
          fill={innerBackgroundLayerFillColor}
          rx={innerBackgroundLayerHeight / 2}
        ></rect>
        {/* Progress fill bar */}

        <rect
          y={innerLayerOffsetXY}
          x={innerLayerOffsetXY}
          width={innerProgressLayerWidth}
          height={innerProgressLayerHeight}
          fill={innerProgressLayerFillColor}
          rx={innerFillBarRx}
        ></rect>

        {/* Dual-color text with drop shadow for maximum readability */}
        {displayPercentFilled && (
          <DualColorText
            displayedLevel={displayedLevel}
            formattedPercentage={formattedPercentage}
            fontSize={fontSize}
            fontFamily={theme.typography.fontFamily as string}
            totalHeight={totalHeight}
            innerLayerOffsetXY={innerLayerOffsetXY}
            innerProgressLayerWidth={innerProgressLayerWidth}
            innerBackgroundLayerWidth={innerBackgroundLayerWidth}
            isDarkMode={theme.palette.mode === "dark"}
          />
        )}
      </g>
    </svg>
  )
}

/**
 * DualColorText component renders text that changes color at the fill boundary
 * with a drop shadow for enhanced readability.
 */
const DualColorText = ({
  displayedLevel,
  formattedPercentage,
  fontSize,
  fontFamily,
  totalHeight,
  innerLayerOffsetXY,
  innerProgressLayerWidth,
  innerBackgroundLayerWidth,
  isDarkMode,
}: {
  displayedLevel?: string | number
  formattedPercentage: number
  fontSize: number
  fontFamily: string
  totalHeight: number
  innerLayerOffsetXY: number
  innerProgressLayerWidth: number
  innerBackgroundLayerWidth: number
  isDarkMode: boolean
}) => {
  const uniqueId = useId()
  const clipIdFill = `fillClip-${uniqueId}`
  const clipIdBg = `bgClip-${uniqueId}`
  const shadowFilterBg = `shadow-bg-${uniqueId}`
  const shadowFilterFill = `shadow-fill-${uniqueId}`

  // Colors: dark text on light background, light text on dark fill
  const textOnBackground = isDarkMode ? "#FFFFFF" : "#000000"
  const textOnFill = isDarkMode ? "#000000" : "#FFFFFF"
  
  // Shadow colors: use contrasting color for better visibility
  // In dark mode, white text needs dark shadow; dark text needs light shadow
  const shadowColorBg = isDarkMode ? "black" : "white"
  const shadowColorFill = isDarkMode ? "white" : "black"

  const displayText = `${displayedLevel ? "Level: " + displayedLevel + ",  " : ""}${formattedPercentage}`

  return (
    <>
      <defs>
        {/* Drop shadow filters - use contrasting shadows for better readability */}
        <filter id={shadowFilterBg} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={shadowColorBg} floodOpacity="0.8" />
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor={shadowColorBg} floodOpacity="0.4" />
        </filter>
        <filter id={shadowFilterFill} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={shadowColorFill} floodOpacity="0.8" />
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor={shadowColorFill} floodOpacity="0.4" />
        </filter>
        {/* Clip for the filled portion */}
        <clipPath id={clipIdFill}>
          <rect
            x={innerLayerOffsetXY}
            y={0}
            width={innerProgressLayerWidth}
            height={totalHeight}
          />
        </clipPath>
        {/* Clip for the unfilled portion */}
        <clipPath id={clipIdBg}>
          <rect
            x={innerLayerOffsetXY + innerProgressLayerWidth}
            y={0}
            width={innerBackgroundLayerWidth - innerProgressLayerWidth}
            height={totalHeight}
          />
        </clipPath>
      </defs>
      {/* Text on unfilled background with shadow */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill={textOnBackground}
        fontSize={fontSize}
        dominantBaseline="middle"
        fontFamily={fontFamily}
        fontWeight={600}
        clipPath={`url(#${clipIdBg})`}
        filter={`url(#${shadowFilterBg})`}
      >
        {displayText}<tspan fontWeight={700} fontSize={fontSize * 1.1}>%</tspan>
      </text>
      {/* Text on filled portion with shadow */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill={textOnFill}
        fontSize={fontSize}
        dominantBaseline="middle"
        fontFamily={fontFamily}
        fontWeight={600}
        clipPath={`url(#${clipIdFill})`}
        filter={`url(#${shadowFilterFill})`}
      >
        {displayText}<tspan fontWeight={700} fontSize={fontSize * 1.1}>%</tspan>
      </text>
    </>
  )
}
