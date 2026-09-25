import { useTheme } from "@mui/system"
import React from "react"

export function LineWithSquaresAtTheEnd({
  id = "Horizontal_Line_with_Squares_At_The_End",
}: {
  id?: string
}) {
  const theme = useTheme()
  return (
    <g id={id} data-name="Horizontal Line with Shapes At End">
      <rect
        id="Horizontal_Line"
        data-name="Horizontal Line"
        x="136.56"
        y="139.38"
        width="65.9"
        height="0.52"
        fill="#fff"
      />
      <rect
        id="SecondaryColor_square"
        data-name="Secondary Color square"
        x="190.78"
        y="136.66"
        width="7.24"
        height="7.24"
        fill={theme.palette.secondary.main}
      />
      <path
        id="Square_white_outline"
        data-name="Square white outline"
        d="M202.41,139.76h-8.78V131h8.78Zm-8.4-.38h8v-8h-8Z"
        transform="translate(0)"
        fill="#fff"
      />
    </g>
  )
}
