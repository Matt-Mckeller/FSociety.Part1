import React from "react"
import { useTheme } from "@mui/system"

export function BackgroundGradient1({
  id = "BackgroundGradient1",
}: {
  id?: string
}) {
  const theme = useTheme()
  const gradient = theme.palette.gradient.background
  return (
    <linearGradient
      id={id}
      x2="1"
      y1="1"
      y2="0"
      gradientUnits="objectBoundingBox"
    >
      {gradient.map(({ offset, color }: any) => (
        <stop
          offset={offset}
          stopColor={color}
          id={`${id}-${color}`}
          key={`${id}-${color}`}
        />
      ))}
    </linearGradient>
  )
}
