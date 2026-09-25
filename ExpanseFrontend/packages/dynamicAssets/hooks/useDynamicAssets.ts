import { useTheme } from "@mui/system"

/* 
Provides shared coloring for assets based on theme mode light or dark
may at some point move to a component configuration level or somewhere else
*/
export const useDynamicAssets = () => {
  const theme = useTheme()
  const shapeStrokeColor = theme.palette.background.contrastBG
  const filledShapeColor = theme.palette.primary.main
  const textLineRepresentationColor = theme.palette.background.dark
  const threeLayerOuterStroke =
    theme.palette.mode === "dark"
      ? `${theme.palette.background.light}`
      : `${theme.palette.background.dark}`
  const threeLayerCenterStroke = `${theme.palette.background.medium}`
  const threeLayerInnerStroke =
    theme.palette.mode === "dark"
      ? `${theme.palette.background.dark}`
      : `${theme.palette.background.light}`
  return {
    shapeStrokeColor,
    filledShapeColor,
    textLineRepresentationColor,
    threeLayerInnerStroke,
    threeLayerCenterStroke,
    threeLayerOuterStroke,
  }
}
