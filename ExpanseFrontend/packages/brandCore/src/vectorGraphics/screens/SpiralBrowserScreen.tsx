/**
 * SpiralBrowserScreen - Browser mockup with spiral layout
 *
 * A decorative browser graphic with cards arranged around a spiral path.
 * Used for technology/migration service illustrations.
 *
 * ## Design Patterns Used
 *
 * ### Browser Mockup
 * - Toolbar with traffic light buttons
 * - Layered screen content areas
 * - Three-layer border pattern on inner screen
 *
 * ### Spiral Layout
 * - Cards positioned along a decorative spiral curve
 * - Multiple scale factors for depth
 *
 * ### Geometric Accents
 * - DualCircles and DualRectangles for alignment decoration
 */

"use client"

import React from "react"
import { useTheme } from "@mui/system"
import { DualCircles, DualRectangles } from "../../shapes"
import { BackgroundGradient } from "../../primitives/gradients"
import { useVectorGraphicColors } from "../../utils/useVectorGraphicColors"

// ============================================================
// CONSTANTS
// ============================================================

const smallerCardTotalHeight = 12
const smallerCardTotalWidth = 18
const biggerCardTotalHeight = 30
const biggerCardTotalWidth = 40
const backgroundGradientId = "spiral-browser-gradient"

const totalBrowserWidth = 100
const totalBrowserHeight = (2 * totalBrowserWidth) / 3
const browserToolbarHeight = (1 / 15) * totalBrowserHeight
const browserSideAndBottomPadding = (1 / 60) * totalBrowserHeight
const browserInteriorScreenOverlayPadding = browserSideAndBottomPadding * 2
const browserButtonRadius = (1 / 4) * browserToolbarHeight
const browserButtonSpacing = browserButtonRadius
const browserInnerScreenWidth =
  totalBrowserWidth -
  browserSideAndBottomPadding * 2 -
  browserInteriorScreenOverlayPadding * 2
const browserInnerScreenHeight =
  totalBrowserHeight -
  browserSideAndBottomPadding -
  browserToolbarHeight -
  browserInteriorScreenOverlayPadding * 2
const sideArcLength = 3

// ============================================================
// CARD SUBCOMPONENTS
// ============================================================

function SmallerCard() {
  const theme = useTheme()
  const cardBackgroundColor = theme.palette.background.medium ?? theme.palette.grey[700]
  const cardTextColor = "white"
  const cardTextLineHeight = 1
  const cardTextLineGapHeight = 1
  const shorterLineWidth = (1 * smallerCardTotalWidth) / 3
  const longerLineWidth = (2 * smallerCardTotalWidth) / 3
  const textHeightTotal = 3 * cardTextLineHeight + 2 * cardTextLineGapHeight
  const startingLineY = (smallerCardTotalHeight - textHeightTotal) / 2

  const linePositions = [
    { x: smallerCardTotalWidth / 3, y: startingLineY },
    { x: smallerCardTotalWidth / 6, y: startingLineY + cardTextLineGapHeight + cardTextLineHeight },
    { x: smallerCardTotalWidth / 6, y: startingLineY + 2 * (cardTextLineGapHeight + cardTextLineHeight) },
  ]

  return (
    <g data-name="Smaller Card">
      <rect
        width={smallerCardTotalWidth}
        height={smallerCardTotalHeight}
        fill={cardBackgroundColor}
        rx={3}
      />
      {linePositions.map((pos, i) => (
        <g key={i} transform={`translate(${pos.x} ${pos.y})`}>
          <rect
            width={i === 0 ? shorterLineWidth : longerLineWidth}
            height={cardTextLineHeight}
            fill={cardTextColor}
            rx={i === 0 ? 0.5 : 1}
          />
        </g>
      ))}
    </g>
  )
}

function BiggerCard() {
  const theme = useTheme()
  const cardBackgroundColor = theme.palette.background.medium ?? theme.palette.grey[700]
  const cardTextColor = "white"
  const cornerShapeFill = theme.palette.common.white
  const textLineHeight = 1.5
  const textLineGap = 1.5

  const cardPaddingX = (1 / 10) * biggerCardTotalWidth
  const cornerShapeWidth = (1 / 5) * (biggerCardTotalWidth - cardPaddingX * 2)
  const gapBetweenIconAndRightText = cardPaddingX / 2
  const shorterLineWidth =
    biggerCardTotalWidth - cardPaddingX * 2 - gapBetweenIconAndRightText - cornerShapeWidth

  const topLineStartX = cardPaddingX + gapBetweenIconAndRightText + cornerShapeWidth
  const gapBetweenIconAndBottomText = cardPaddingX * 0.75
  const longerLineWidth = biggerCardTotalWidth - 2 * cardPaddingX
  const longerLineStartX = cardPaddingX

  const cornerShapeHeight = (4 / 3) * cornerShapeWidth
  const totalContentHeight =
    cornerShapeHeight + gapBetweenIconAndBottomText + 4 * textLineHeight + 3 * textLineGap
  const cardPaddingY = (biggerCardTotalHeight - totalContentHeight) / 2
  const topLineStartY =
    cardPaddingY + (1 / 2) * cornerShapeHeight - (1 / 2) * (2 * textLineHeight + textLineGap)
  const longerLineStartY = cardPaddingY + cornerShapeHeight + gapBetweenIconAndBottomText

  return (
    <g data-name="Bigger Card">
      <rect
        width={biggerCardTotalWidth}
        height={biggerCardTotalHeight}
        fill={cardBackgroundColor}
        rx={3}
      />
      {/* Top two shorter lines */}
      <g transform={`translate(${topLineStartX} ${topLineStartY})`}>
        <rect width={shorterLineWidth} height={textLineHeight} fill={cardTextColor} rx={0.5} />
      </g>
      <g transform={`translate(${topLineStartX} ${topLineStartY + textLineGap + textLineHeight})`}>
        <rect width={shorterLineWidth} height={textLineHeight} fill={cardTextColor} rx={0.5} />
      </g>
      {/* Four longer lines */}
      {[0, 1, 2, 3].map((i) => (
        <g
          key={i}
          transform={`translate(${longerLineStartX} ${longerLineStartY + i * (textLineGap + textLineHeight)})`}
        >
          <rect width={longerLineWidth} height={textLineHeight} fill={cardTextColor} rx={1} />
        </g>
      ))}
      {/* Corner icon placeholder */}
      <rect
        x={cardPaddingX}
        y={cardPaddingY}
        width={cornerShapeWidth}
        height={cornerShapeHeight}
        fill={cornerShapeFill}
        rx={1}
      />
    </g>
  )
}

// ============================================================
// BROWSER SUBCOMPONENTS
// ============================================================

function BrowserToolbar() {
  const theme = useTheme()
  const fill = theme.palette.background.offsetBG ?? theme.palette.grey[800]

  return (
    <path
      data-name="Browser Toolbar"
      fill={fill}
      d={`m0,${browserToolbarHeight} 
        v-${browserToolbarHeight - sideArcLength} 
        a${sideArcLength} -${sideArcLength} 0 0 1 ${sideArcLength} -${sideArcLength}
        h${totalBrowserWidth - 2 * sideArcLength}
        a${sideArcLength} ${sideArcLength} 0 0 1 ${sideArcLength} ${sideArcLength}
        v${browserToolbarHeight - sideArcLength}
        z`}
    />
  )
}

function BrowserSecondScreenLayer() {
  const theme = useTheme()
  const fill = theme.palette.background.medium ?? theme.palette.grey[700]

  return (
    <g data-name="Browser Second Screen Layer">
      <rect
        width={totalBrowserWidth - browserSideAndBottomPadding * 2}
        height={10}
        fill={fill}
      />
      <rect
        rx={3}
        width={totalBrowserWidth - browserSideAndBottomPadding * 2}
        height={totalBrowserHeight - browserSideAndBottomPadding - browserToolbarHeight}
        fill={fill}
      />
    </g>
  )
}

function BrowserInnerScreenLayer() {
  const { threeLayerInnerStroke } = useVectorGraphicColors()

  return (
    <rect
      data-name="Browser Inner Screen"
      rx={3}
      width={browserInnerScreenWidth}
      height={browserInnerScreenHeight}
      fill={`url('#${backgroundGradientId}')`}
      stroke={threeLayerInnerStroke}
      strokeWidth={1}
    />
  )
}

function BrowserToolbarButtons() {
  const theme = useTheme()
  const fill = theme.palette.background.default

  return (
    <g data-name="Browser Toolbar Buttons">
      <circle r={browserButtonRadius} fill={fill} />
      <circle r={browserButtonRadius} fill={fill} cx={2 * browserButtonRadius + browserButtonSpacing} />
      <circle r={browserButtonRadius} fill={fill} cx={2 * (2 * browserButtonRadius + browserButtonSpacing)} />
    </g>
  )
}

function Browser() {
  const { palette } = useTheme()

  const browserToolbarButtonY = browserToolbarHeight / 2
  const browserToolbarButtonX =
    browserSideAndBottomPadding + browserInteriorScreenOverlayPadding + browserButtonRadius
  const xCoordinateOfMiddleLeftCorner = sideArcLength / 2 - 0.44
  const yCoordinateOfMiddleLeftCorner = sideArcLength / 2 - 0.66

  return (
    <g id="browser" data-name="Browser">
      <rect
        width={totalBrowserWidth}
        height={totalBrowserHeight}
        rx={3}
        fill={palette.background.offsetBG ?? palette.grey[800]}
      />
      <BrowserToolbar />

      <g transform={`translate(${browserSideAndBottomPadding} ${browserToolbarHeight})`}>
        <BrowserSecondScreenLayer />
      </g>
      <g
        transform={`translate(${browserSideAndBottomPadding + browserInteriorScreenOverlayPadding} ${browserToolbarHeight + browserInteriorScreenOverlayPadding})`}
      >
        <BrowserInnerScreenLayer />
        <path
          id="side-triangle-overlay"
          data-name="Screen Shading Overlay"
          d={`m0,${sideArcLength} v${browserInnerScreenHeight - sideArcLength} h${browserInnerScreenWidth * (69 / 100)} L${xCoordinateOfMiddleLeftCorner} ${yCoordinateOfMiddleLeftCorner} z`}
          fill={palette.common.black}
          opacity="0.1"
        />
      </g>
      <g transform={`translate(${browserToolbarButtonX} ${browserToolbarButtonY})`}>
        <BrowserToolbarButtons />
      </g>
    </g>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export interface SpiralBrowserScreenProps {
  /** CSS class for the container */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * Browser mockup with spiral card layout
 *
 * Features:
 * - Browser mockup with toolbar and layered screen
 * - Cards arranged along a decorative spiral curve
 * - DualCircles and DualRectangles for geometric accents
 * - Theme-aware gradient fill
 */
export function SpiralBrowserScreen({
  className,
  style,
}: SpiralBrowserScreenProps) {
  const theme = useTheme()

  const viewBoxWidth = 300
  const viewBoxHeight = 200
  const swirlCenterXCoordinate = viewBoxWidth / 6
  const swirlCenterYCoordinate = (2 * viewBoxHeight) / 3
  const card2ScaleFactor = 0.5
  const card3ScaleFactor = 0.75

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width="100%"
      height="100%"
      className={className}
      style={style}
      data-component="SpiralBrowserScreen"
    >
      <defs>
        <BackgroundGradient id={backgroundGradientId} />
      </defs>

      {/* Spiral with Cards */}
      <g transform="scale(1.3) translate(0 -50)">
        {/* Spiral Path */}
        <g transform={`translate(${swirlCenterXCoordinate - 36} ${swirlCenterYCoordinate - 25}) scale(1.5)`}>
          <path
            data-name="Spiral Path"
            fill="none"
            stroke={theme.palette.background.contrastBG ?? theme.palette.grey[400]}
            strokeWidth="0.33"
            d="m 30.438861,19.988195 c 0.313227,-8.155735 -12.91625,-9.200288 -15.253246,-1.096163 -2.9495,7.868959 4.727119,15.2418 12.869137,13.452641 C 36.490018,31.233462 42.278949,21.578759 39.227715,13.50654 36.412982,3.3555879 24.21067,-2.9109802 14.58043,1.6459363 1.0043805,6.9978466 -4.6736714,26.554306 4.9065846,38.017579 13.902987,50.231598 32.459064,53.645185 45.072311,45.221681 54.542871,39.775094 59.089844,29.422882 63.655153,19.984893"
          />
        </g>

        {/* Cards along the spiral */}
        <g transform={`translate(${swirlCenterXCoordinate - 45} ${swirlCenterYCoordinate}) scale(${card2ScaleFactor})`}>
          <BiggerCard />
        </g>
        <g transform={`translate(${swirlCenterXCoordinate + smallerCardTotalWidth} ${swirlCenterYCoordinate + 32}) scale(${card3ScaleFactor})`}>
          <BiggerCard />
        </g>
        <g transform={`translate(${swirlCenterXCoordinate} ${swirlCenterYCoordinate})`}>
          <SmallerCard />
        </g>
      </g>

      {/* Browser */}
      <g transform="translate(110 20) scale(1.8)">
        <Browser />
      </g>

      {/* Geometric Accents */}
      <g transform="translate(130 120) scale(0.5)">
        <DualCircles
          id="lower-left-circle"
          strokeVersion="white"
          fillVersion="white"
        />
      </g>
      <g transform="translate(240 90)">
        <DualRectangles id="rect-browser-1" />
      </g>
      <g transform="translate(180 53)">
        <DualRectangles id="rect-browser-2" />
      </g>
      <g transform="translate(60 80) scale(0.25)">
        <DualCircles id="circle-upper-left" strokeVersion="contrastBG" />
      </g>
      <g transform="translate(30 160) scale(0.35)">
        <DualCircles id="circle-lower-left" strokeVersion="contrastBG" />
      </g>
    </svg>
  )
}
