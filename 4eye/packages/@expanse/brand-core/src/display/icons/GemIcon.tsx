"use client"

import { useTheme } from "@mui/system"

export const GemIcon = ({
  variant = "default",
}: {
  ringOpacity?: number
  variant?: "default" | "contrastBG"
}) => {
  const theme = useTheme()
  if (variant !== "default" && variant !== "contrastBG") {
    throw new Error("Invalid gem variant, or allowed variants need updated")
  }
  const GemThemeProps = theme.components?.Gem?.variants?.[variant]
  const { strokeColor, fillColor } = GemThemeProps

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 167 272"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="30"
        height="145"
        // rx="50"
        transform="translate(16, 65)"
        fill={fillColor}
      />
      <path
        d="M3 63.5L83.5 3L165 63.5V208L83.5 269L3 208H43.5V63.5H3Z"
        fill={fillColor}
      />
      <path
        d="M83.5 3L3 63.5H165M83.5 3L165 63.5M83.5 3L43.5 63.5V208L83.5 269M83.5 3L125 63.5V208L83.5 269M165 63.5V208M165 208L83.5 269M165 208H3L83.5 269"
        stroke={strokeColor}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <rect
        width="20.8571"
        height="5.00001"
        rx="2.5"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 0.5 188.143)"
        fill={strokeColor}
      />
      <rect
        width="41.7143"
        height="5.00001"
        rx="2.5"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 0.5 136)"
        fill={strokeColor}
      />
      <rect
        width="62.5714"
        height="5.00001"
        rx="2.5"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 0.5 63)"
        fill={strokeColor}
      />
    </svg>
  )
}
