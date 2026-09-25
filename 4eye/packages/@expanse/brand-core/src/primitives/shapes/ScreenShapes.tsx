/**
 * Screen Shapes - Browser, mobile, tablet device primitives
 *
 * Device mockup shapes with configurable styles.
 * Used for app screenshots, web illustrations, and device mockups.
 *
 * ## Design Patterns
 * These shapes use the triple-layer border system for consistent branding.
 * Background gradients follow the "darkness to light" growth theme.
 */

"use client"

import React from "react"
import { useTheme } from "@mui/system"
import { useVectorGraphicColors } from "../../utils/useVectorGraphicColors"

// ============================================================
// CONSTANTS
// ============================================================

/** Common device screen ratios */
export const SCREEN_RATIOS = {
  /** Desktop widescreen 16:9 */
  desktop: 16 / 9,
  /** Desktop 16:10 */
  desktop16x10: 16 / 10,
  /** iPad Pro 4:3 */
  tablet: 4 / 3,
  /** iPhone modern ~19.5:9 → simplified to 2.16:1 */
  phoneTall: 19.5 / 9,
  /** iPhone older 16:9 */
  phone16x9: 16 / 9,
  /** Square */
  square: 1,
} as const

export type ScreenRatio = keyof typeof SCREEN_RATIOS

// ============================================================
// BROWSER WINDOW SHAPE
// ============================================================

export interface BrowserWindowShapeProps {
  /** Width of the browser */
  width?: number
  /** Height of the browser (calculated from ratio if not provided) */
  height?: number
  /** Aspect ratio preset for the content area */
  ratio?: ScreenRatio
  /** Corner radius */
  cornerRadius?: number
  /** Toolbar height (as fraction of total height) */
  toolbarHeight?: number
  /** Fill color for toolbar */
  toolbarFill?: string
  /** Fill color for content area */
  contentFill?: string
  /** Stroke color */
  stroke?: string
  /** Stroke width */
  strokeWidth?: number
  /** Whether to show traffic light buttons */
  showButtons?: boolean
  /** Whether to show address bar */
  showAddressBar?: boolean
  /** Children to render in content area */
  children?: React.ReactNode
  /** Custom class name */
  className?: string
}

export function BrowserWindowShape({
  width = 200,
  height,
  ratio = "desktop",
  cornerRadius = 4,
  toolbarHeight = 0.08,
  toolbarFill,
  contentFill,
  stroke,
  strokeWidth = 1,
  showButtons = true,
  showAddressBar = true,
  children,
  className,
}: BrowserWindowShapeProps) {
  const theme = useTheme()
  const { threeLayerInnerStroke, threeLayerCenterStroke } =
    useVectorGraphicColors()

  const finalHeight = height ?? width / SCREEN_RATIOS[ratio]
  const actualToolbarFill =
    toolbarFill ??
    (theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[200])
  const actualContentFill = contentFill ?? theme.palette.background.paper
  const actualStroke = stroke ?? threeLayerInnerStroke

  const barHeight = finalHeight * toolbarHeight
  const contentHeight = finalHeight - barHeight
  const buttonRadius = barHeight * 0.2
  const buttonY = barHeight / 2
  const buttonStartX = cornerRadius + buttonRadius * 2
  const buttonSpacing = buttonRadius * 2.5
  const addressBarWidth = width * 0.5
  const addressBarHeight = barHeight * 0.5
  const addressBarX = (width - addressBarWidth) / 2
  const addressBarY = (barHeight - addressBarHeight) / 2

  return (
    <g className={className} data-shape="browser-window">
      {/* Toolbar */}
      <path
        d={`
          M ${cornerRadius} 0
          H ${width - cornerRadius}
          Q ${width} 0 ${width} ${cornerRadius}
          V ${barHeight}
          H 0
          V ${cornerRadius}
          Q 0 0 ${cornerRadius} 0
          Z
        `}
        fill={actualToolbarFill}
        stroke={actualStroke}
        strokeWidth={strokeWidth}
        data-id="browser-toolbar"
      />
      {/* Traffic light buttons */}
      {showButtons && (
        <g data-id="browser-buttons">
          <circle
            cx={buttonStartX}
            cy={buttonY}
            r={buttonRadius}
            fill="#FF5F57"
            data-id="browser-btn-close"
          />
          <circle
            cx={buttonStartX + buttonSpacing}
            cy={buttonY}
            r={buttonRadius}
            fill="#FFBD2E"
            data-id="browser-btn-minimize"
          />
          <circle
            cx={buttonStartX + buttonSpacing * 2}
            cy={buttonY}
            r={buttonRadius}
            fill="#28CA41"
            data-id="browser-btn-maximize"
          />
        </g>
      )}
      {/* Address bar */}
      {showAddressBar && (
        <rect
          x={addressBarX}
          y={addressBarY}
          width={addressBarWidth}
          height={addressBarHeight}
          rx={addressBarHeight / 2}
          fill={theme.palette.background.default}
          stroke={threeLayerCenterStroke}
          strokeWidth={strokeWidth * 0.5}
          data-id="browser-address-bar"
        />
      )}
      {/* Content area */}
      <rect
        x={0}
        y={barHeight}
        width={width}
        height={contentHeight}
        fill={actualContentFill}
        stroke={actualStroke}
        strokeWidth={strokeWidth}
        data-id="browser-content"
      />
      {/* Bottom corners */}
      <path
        d={`
          M 0 ${finalHeight - cornerRadius}
          V ${finalHeight - cornerRadius}
          Q 0 ${finalHeight} ${cornerRadius} ${finalHeight}
          H ${width - cornerRadius}
          Q ${width} ${finalHeight} ${width} ${finalHeight - cornerRadius}
        `}
        fill="none"
        stroke={actualStroke}
        strokeWidth={strokeWidth}
        data-id="browser-bottom-corners"
      />
      {/* Children in content area */}
      {children && (
        <g
          transform={`translate(0, ${barHeight})`}
          data-id="browser-content-children"
        >
          {children}
        </g>
      )}
    </g>
  )
}

// ============================================================
// MOBILE PHONE SHAPE
// ============================================================

export interface MobilePhoneShapeProps {
  /** Width of the phone */
  width?: number
  /** Height of the phone (calculated from ratio if not provided) */
  height?: number
  /** Aspect ratio preset */
  ratio?: ScreenRatio
  /** Corner radius */
  cornerRadius?: number
  /** Bezel width */
  bezelWidth?: number
  /** Device frame color */
  frameColor?: string
  /** Screen fill color */
  screenFill?: string
  /** Stroke color */
  stroke?: string
  /** Stroke width */
  strokeWidth?: number
  /** Whether to show notch/dynamic island */
  showNotch?: boolean
  /** Whether to show home indicator */
  showHomeIndicator?: boolean
  /** Children to render in screen area */
  children?: React.ReactNode
  /** Custom class name */
  className?: string
}

export function MobilePhoneShape({
  width = 60,
  height,
  ratio = "phoneTall",
  cornerRadius = 8,
  bezelWidth = 0.04,
  frameColor,
  screenFill,
  stroke,
  strokeWidth = 1,
  showNotch = true,
  showHomeIndicator = true,
  children,
  className,
}: MobilePhoneShapeProps) {
  const theme = useTheme()
  const { threeLayerInnerStroke } = useVectorGraphicColors()

  const finalHeight = height ?? width * SCREEN_RATIOS[ratio]
  const actualFrameColor =
    frameColor ??
    (theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[800])
  const actualScreenFill = screenFill ?? theme.palette.background.paper
  const actualStroke = stroke ?? threeLayerInnerStroke

  const bezel = width * bezelWidth
  const screenWidth = width - bezel * 2
  const screenHeight = finalHeight - bezel * 2
  const screenCorner = cornerRadius * 0.75
  const notchWidth = width * 0.3
  const notchHeight = finalHeight * 0.025
  const notchX = (width - notchWidth) / 2
  const homeWidth = width * 0.35
  const homeHeight = finalHeight * 0.005

  return (
    <g className={className} data-shape="mobile-phone">
      {/* Device frame */}
      <rect
        x={0}
        y={0}
        width={width}
        height={finalHeight}
        rx={cornerRadius}
        fill={actualFrameColor}
        stroke={actualStroke}
        strokeWidth={strokeWidth}
        data-id="phone-frame"
      />
      {/* Screen */}
      <rect
        x={bezel}
        y={bezel}
        width={screenWidth}
        height={screenHeight}
        rx={screenCorner}
        fill={actualScreenFill}
        data-id="phone-screen"
      />
      {/* Notch / Dynamic Island */}
      {showNotch && (
        <rect
          x={notchX}
          y={bezel + bezel}
          width={notchWidth}
          height={notchHeight}
          rx={notchHeight / 2}
          fill={actualFrameColor}
          data-id="phone-notch"
        />
      )}
      {/* Home indicator */}
      {showHomeIndicator && (
        <rect
          x={(width - homeWidth) / 2}
          y={finalHeight - bezel - bezel}
          width={homeWidth}
          height={homeHeight}
          rx={homeHeight / 2}
          fill={actualFrameColor}
          data-id="phone-home-indicator"
        />
      )}
      {/* Children in screen area */}
      {children && (
        <g
          transform={`translate(${bezel}, ${bezel})`}
          data-id="phone-screen-children"
        >
          {children}
        </g>
      )}
    </g>
  )
}

// ============================================================
// TABLET SHAPE
// ============================================================

export interface TabletShapeProps
  extends Omit<
    MobilePhoneShapeProps,
    "ratio" | "showNotch" | "showHomeIndicator"
  > {
  /** Aspect ratio preset */
  ratio?: ScreenRatio
  /** Whether to show camera */
  showCamera?: boolean
}

export function TabletShape({
  width = 120,
  height,
  ratio = "tablet",
  cornerRadius = 10,
  bezelWidth = 0.03,
  frameColor,
  screenFill,
  stroke,
  strokeWidth = 1,
  showCamera = true,
  children,
  className,
}: TabletShapeProps) {
  const theme = useTheme()
  const { threeLayerInnerStroke } = useVectorGraphicColors()

  const finalHeight = height ?? width / SCREEN_RATIOS[ratio]
  const actualFrameColor =
    frameColor ??
    (theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[800])
  const actualScreenFill = screenFill ?? theme.palette.background.paper
  const actualStroke = stroke ?? threeLayerInnerStroke

  const bezel = width * bezelWidth
  const screenWidth = width - bezel * 2
  const screenHeight = finalHeight - bezel * 2
  const screenCorner = cornerRadius * 0.7
  const cameraRadius = width * 0.01

  return (
    <g className={className} data-shape="tablet">
      {/* Device frame */}
      <rect
        x={0}
        y={0}
        width={width}
        height={finalHeight}
        rx={cornerRadius}
        fill={actualFrameColor}
        stroke={actualStroke}
        strokeWidth={strokeWidth}
        data-id="tablet-frame"
      />
      {/* Screen */}
      <rect
        x={bezel}
        y={bezel}
        width={screenWidth}
        height={screenHeight}
        rx={screenCorner}
        fill={actualScreenFill}
        data-id="tablet-screen"
      />
      {/* Camera */}
      {showCamera && (
        <circle
          cx={width / 2}
          cy={bezel / 2}
          r={cameraRadius}
          fill={theme.palette.grey[600]}
          data-id="tablet-camera"
        />
      )}
      {/* Children in screen area */}
      {children && (
        <g
          transform={`translate(${bezel}, ${bezel})`}
          data-id="tablet-screen-children"
        >
          {children}
        </g>
      )}
    </g>
  )
}
