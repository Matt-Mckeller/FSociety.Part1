/**
 * WebAndMobileAppScreens - Laptop and phone mockup
 *
 * A combined laptop and mobile phone device mockup illustration.
 * Used for web/mobile development service illustrations.
 *
 * ## Design Patterns Used
 *
 * ### Three-Layer Border Stacking
 * Devices use three-layer stroke colors for depth
 *
 * ### Device Mockups
 * - Laptop with keyboard
 * - Mobile phone with notch/camera cutout
 * - Both with gradient screens
 *
 * ### Text Line Representation
 * Placeholder lines representing text content
 *
 * ### Geometric Accents
 * - DualCircles and DualRectangles throughout
 */

"use client"

import React from "react"
import { Box, useTheme } from "@mui/material"
import { DualCircles, DualRectangles } from "../../shapes"
import { BackgroundGradient } from "../../primitives/gradients"
import { useVectorGraphicColors } from "../../utils/useVectorGraphicColors"

export interface WebAndMobileAppScreensProps {
  /** Data attribute ID for testing */
  dataId?: string
  /** CSS class for the container */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * Laptop and mobile phone device mockup
 *
 * Features:
 * - Laptop with keyboard and toolbar
 * - Mobile phone with camera notch
 * - Theme-aware gradient screens
 * - Three-layer border pattern on devices
 * - DualCircles and DualRectangles decorations
 */
export function WebAndMobileAppScreens({
  dataId = "WebAndMobileAppScreens",
  className,
  style,
}: WebAndMobileAppScreensProps) {
  const theme = useTheme()
  const {
    shapeStrokeColor,
    filledShapeColor,
    textLineRepresentationColor,
    threeLayerInnerStroke,
    threeLayerCenterStroke,
    threeLayerOuterStroke,
  } = useVectorGraphicColors()

  const deviceStrokeWidth = theme.palette.mode === "dark" ? 2 : 3
  const cameraColor = theme.palette.common.white
  // Use grey fallback for custom background extensions
  const bgExtended = theme.palette.background as unknown as Record<string, string>
  const keyBoardColor = bgExtended?.dark ?? theme.palette.grey[900]
  const screenStroke = threeLayerOuterStroke
  const keyboardStroke = threeLayerOuterStroke

  return (
    <Box
      className={className}
      style={style}
      sx={{
        height: "100%",
        width: "100%",
        minWidth: "100%"
      }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 300 200"
        data-id={dataId}
        data-component="WebAndMobileAppScreens"
      >
        <defs>
          <BackgroundGradient id="WebMobileGradient" />
        </defs>

        <g
          data-name="Web and Mobile App Development Graphic"
          transform="translate(-337.627 -165)"
        >
          {/* Colored accent circle */}
          <circle
            cx="15.31"
            cy="15.31"
            r="15.31"
            fill={filledShapeColor}
            data-name="Accent Circle"
            transform="translate(388.592 319.814)"
          />

          {/* Bottom line under laptop */}
          <path
            fill={shapeStrokeColor}
            d="M416.232 297.654h189.422v.517H416.232z"
            data-name="Line Bottom of Laptop"
          />

          {/* LAPTOP */}
          <g data-name="Laptop">
            {/* Laptop frame */}
            <path
              fill={threeLayerCenterStroke}
              stroke={screenStroke}
              strokeWidth={deviceStrokeWidth}
              data-name="Laptop Frame"
              d="M514.333 186.82H447.1v-1.385h-30.486v1.385H349.1a4.548 4.548 0 0 0-4.548 4.548v92.062a4.549 4.549 0 0 0 4.548 4.549h165.233a4.549 4.549 0 0 0 4.548-4.549v-92.062a4.548 4.548 0 0 0-4.548-4.548z"
            />

            {/* Screen with gradient */}
            <rect
              fill="url(#WebMobileGradient)"
              width="162.13"
              height="91.458"
              stroke={threeLayerInnerStroke}
              rx={5}
              ry={5}
              transform="translate(350.654 194.857)"
              data-name="Laptop Screen"
            />

            {/* Keyboard */}
            <path
              fill={keyBoardColor}
              stroke={keyboardStroke}
              strokeWidth="1px"
              d="M523.433 284.653H507.61v-1.141a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.141h-3.39v-1.141a.227.227 0 0 0-.227-.226h-5.424a.226.226 0 0 0-.226.226v1.141h-3.391v-1.141a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.14h-3.392v-1.14a.226.226 0 0 0-.226-.226h-5.424a.226.226 0 0 0-.226.226v1.14h-3.39v-1.14a.226.226 0 0 0-.226-.226h-5.425a.227.227 0 0 0-.227.226v1.14h-3.39v-1.14a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.14H452v-1.14a.226.226 0 0 0-.226-.226h-42.49a.226.226 0 0 0-.226.226v1.14h-3.392v-1.14a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.14H396.4v-1.14a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.14h-3.39v-1.14a.227.227 0 0 0-.227-.226h-5.425a.226.226 0 0 0-.226.226v1.14h-3.39v-1.14a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.14H368.6v-1.14a.226.226 0 0 0-.226-.226h-5.425a.226.226 0 0 0-.226.226v1.14h-3.39v-1.14a.227.227 0 0 0-.227-.226h-5.424a.226.226 0 0 0-.226.226v1.14h-10.4a5.425 5.425 0 0 0-5.425 5.425v2.453a5.425 5.425 0 0 0 5.425 5.425h180.377a5.424 5.424 0 0 0 5.425-5.425v-2.452a5.424 5.424 0 0 0-5.425-5.425z"
              data-name="Keyboard"
            />

            {/* Camera */}
            <circle
              cx="1.663"
              cy="1.663"
              r="1.663"
              fill={cameraColor}
              data-name="Laptop Camera"
              transform="translate(429.917 189.037)"
            />

            {/* Screen shading overlay */}
            <path
              d="M466.417 286.315H350.654v-91.458z"
              data-name="Screen Shading Overlay"
              opacity=".1"
              style={{ isolation: "isolate" }}
            />

            {/* Circle decoration on laptop screen */}
            <g transform="translate(372 269) scale(0.5)">
              <DualCircles
                id="laptop-screen-circles"
                fillVersion="white"
                strokeVersion="white"
              />
            </g>

            {/* Text lines on laptop */}
            <g data-name="Laptop Text Lines">
              <path fill={textLineRepresentationColor} d="M469.41 244.181h15.145v3.165H469.41z" data-name="Button" />
              <path fill={textLineRepresentationColor} d="M451.1 219.543h51.763v1.356H451.1z" data-name="Line 1" />
              <path fill={textLineRepresentationColor} d="M451.1 223.838h51.763v1.356H451.1z" data-name="Line 2" />
              <path fill={textLineRepresentationColor} d="M451.1 228.133h51.763v1.356H451.1z" data-name="Line 3" />
              <path fill={textLineRepresentationColor} d="M451.1 232.427h51.763v1.356H451.1z" data-name="Line 4" />
              <path fill={textLineRepresentationColor} d="M451.1 236.722h51.763v1.356H451.1z" data-name="Line 5" />
            </g>
          </g>

          {/* Decorative lines and shapes */}
          <path
            fill={shapeStrokeColor}
            d="M442.59 326.855h189.422v.517H442.59z"
            data-name="Long Line Bottom"
          />
          <path
            fill={shapeStrokeColor}
            d="M387.418 350.63h65.897v.517h-65.897z"
            data-name="Short Line Bottom"
          />
          <g transform="translate(470.972 327.232)">
            <DualRectangles id="rect-bottom-middle" strokeVersion="contrastBG" />
          </g>
          <path
            fill={shapeStrokeColor}
            d="M509.106 194.86h43.5v.517h-65.897z"
            data-name="Line Top Right"
          />
          <g transform="translate(543.33 185.78)">
            <DualRectangles id="rect-top-middle" strokeVersion="contrastBG" />
          </g>
          <g transform="translate(616.204 327)">
            <DualRectangles id="rect-bottom-right" strokeVersion="contrastBG" />
          </g>

          {/* PHONE */}
          <g id="phone" data-name="Phone">
            {/* Phone frame */}
            <path
              fill={threeLayerCenterStroke}
              stroke={threeLayerOuterStroke}
              strokeWidth={deviceStrokeWidth}
              d="M610.821 241.943h-.614V225.1a9.746 9.746 0 0 0-9.746-9.746h-35.676a9.745 9.745 0 0 0-9.746 9.746v92.38a9.746 9.746 0 0 0 9.746 9.746h35.676a9.747 9.747 0 0 0 9.746-9.746v-63.551h.615z"
              data-name="Phone Frame"
            />

            {/* Phone screen with gradient and notch */}
            <path
              fill="url(#WebMobileGradient)"
              stroke={threeLayerInnerStroke}
              strokeWidth="1"
              d="M608.131 225.677v92.244a7.278 7.278 0 0 1-7.277 7.28h-35.847a7.278 7.278 0 0 1-7.277-7.278v-92.246a7.278 7.278 0 0 1 7.277-7.278h4.349a3.458 3.458 0 0 0 3.2 4.763H593a3.459 3.459 0 0 0 3.2-4.763h4.656a7.278 7.278 0 0 1 7.277 7.277z"
              data-name="Phone Screen"
            />

            {/* Phone text lines */}
            <g data-name="Phone Text Lines">
              <path fill={textLineRepresentationColor} d="M577.591 279.222h10.679v3.165h-10.679z" data-name="Button" />
              <path fill={textLineRepresentationColor} d="M564.681 254.584h36.499v1.356h-36.499z" data-name="Line 1" />
              <path fill={textLineRepresentationColor} d="M564.681 258.878h36.499v1.356h-36.499z" data-name="Line 2" />
              <path fill={textLineRepresentationColor} d="M564.681 263.173h36.499v1.356h-36.499z" data-name="Line 3" />
              <path fill={textLineRepresentationColor} d="M564.681 267.468h36.499v1.356h-36.499z" data-name="Line 4" />
              <path fill={textLineRepresentationColor} d="M564.681 271.763h36.499v1.356h-36.499z" data-name="Line 5" />
            </g>

            {/* Rectangle decoration on phone */}
            <g transform="translate(577.972 236.232)">
              <DualRectangles id="rect-phone" />
            </g>

            {/* Phone screen shading overlay */}
            <path
              d="M608.131 308.071v9.85a7.278 7.278 0 0 1-7.277 7.28h-35.847a7.278 7.278 0 0 1-7.277-7.278v-49.672l30.2 23.86.517.408 5.618 4.437.524.416z"
              data-name="Phone Shading Overlay"
              opacity=".1"
              style={{ isolation: "isolate" }}
            />

            {/* Circle decoration on phone */}
            <g transform="translate(571 315) scale(.5)">
              <DualCircles
                id="phone-circles"
                fillVersion="white"
                strokeVersion="white"
              />
            </g>

            {/* Phone camera */}
            <circle
              cx="583"
              cy="220"
              r="1.663"
              fill={cameraColor}
              data-name="Phone Camera"
            />
          </g>

          {/* Large decorative border circle */}
          <path
            fill={shapeStrokeColor}
            d="M420.366 351.147a22.482 22.482 0 1 1 22.483-22.483 22.483 22.483 0 0 1-22.483 22.483zm0-44.448a21.965 21.965 0 1 0 21.966 21.965 21.965 21.965 0 0 0-21.966-21.964z"
            data-name="Large Border Circle"
          />
        </g>
      </svg>
    </Box>
  );
}
