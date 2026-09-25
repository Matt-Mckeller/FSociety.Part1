import React from "react"
import { useTheme } from "@mui/system"
import {
  circle1OffsetX,
  circle1OffsetY,
  filledCircle1Radius,
  strokeCircle1Radius,
} from "../config/shape.config"
import { useDynamicAssets } from "../hooks"

type FillVersionOptions = "white" | "background" | "default"
type StrokeVersionOptions = "white" | "contrastBG" | "default"
interface Props {
  id?: string
  strokeCircleRadius?: number
  filledCircleRadius?: number
  fillVersion?: FillVersionOptions
  strokeVersion?: StrokeVersionOptions
}
export function DualCircleGroup1({
  id,
  filledCircleRadius = filledCircle1Radius,
  strokeCircleRadius = strokeCircle1Radius,
  fillVersion = "default",
  strokeVersion = "default",
}: Props) {
  const theme = useTheme()
  const { filledShapeColor: defaultFilledColor } = useDynamicAssets()
  const fillColor =
    fillVersion === "background"
      ? theme.palette.background.default
      : fillVersion === "white"
        ? theme.palette.common.white
        : defaultFilledColor
  const strokeColor =
    strokeVersion === "white"
      ? theme.palette.common.white
      : strokeVersion === "contrastBG"
        ? theme.palette.background.contrastBG
        : theme.palette.background.default
  return (
    <g transform="rotate(180)" id={id || ""}>
      <circle
        cx="0"
        cy="0"
        r={filledCircleRadius}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
      />
      <circle
        cx={circle1OffsetX - strokeCircle1Radius / 2}
        cy={circle1OffsetY + strokeCircleRadius / 2}
        r={strokeCircle1Radius}
        fill={fillColor}
      />
    </g>
  )
}
