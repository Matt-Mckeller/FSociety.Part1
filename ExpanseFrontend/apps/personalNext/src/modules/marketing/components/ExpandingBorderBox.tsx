import { Box } from "@mui/system"
import { ReactNode } from "react"

export const ExpandingBorderBox = ({
  children,
  largestBorderSize,
}: {
  children: ReactNode
  largestBorderSize: number
}) => {
  // const border1Size = 9
  // const border2Size = border1Size / 2
  // const border3Size = border2Size / 2
  // const extraPaddingForContainer = border1Size
  // const borderGapSize = (border1Size * 3) / 4
  // inverse
  const border3Size = largestBorderSize
  const border2Size = border3Size / 2
  const border1Size = border2Size / 2
  const borderGapSize = (border3Size * 3) / 4
  const border1Radius = 10
  const border2Radius = 10
  const border3Radius = 10

  // const border1Color = "rgba(0,0,0, 0.15)"
  // const theme = useTheme()
  // console.log({ themecolor: theme.palette.primary })
  // const border1Color = theme.palette.primary.main + "16"
  const border1Color = "rgba(0,0,0, .75)"
  const border2Color = "rgba(0,0,0, .75)"
  const border3Color = "rgba(0,0,0, .75)"
  // const container2Padding = borderGapSize / 2

  return (
    <Box
      id="border1-container"
      sx={{
        boxSizing: "border-box",
        border: `${border1Size}px solid ${border1Color}`,
        borderRadius: border1Radius + "px",
        // m: extraMarginForContainer + "px",
        p: borderGapSize + "px",
        height: "100%",
        minHeight: "100%",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Box
        id="border2-container"
        sx={{
          boxSizing: "border-box",
          border: `${border2Size}px solid ${border2Color}`,
          borderRadius: border2Radius + "px",
          p: borderGapSize + "px",
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          minHeight: "100%",
        }}
      >
        <Box
          id="border3-container-content"
          display="flex"
          sx={{
            boxSizing: "border-box",
            border: `${border3Size}px solid ${border3Color}`,
            borderRadius: border3Radius + "px",
            // m: contentAreaCalculatedMargin + "px",
            height: "100%",
            minHeight: "100%",
            width: "100%",
            maxWidth: "100%",
            position: "relative",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
