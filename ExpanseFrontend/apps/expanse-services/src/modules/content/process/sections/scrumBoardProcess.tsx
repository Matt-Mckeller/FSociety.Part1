import { ScrumBoard } from "expanse.dynamicAssets"
import React from "react"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import processContent from "../processContent.json"
import { TypographyResponsive } from "expanse.ui/theme"

export const ScrumBoardProcess = ({
  assetWidth,
  maxAssetWidth,
  isMobile,
}: {
  assetWidth: number | string
  maxAssetWidth: number | string
  isMobile: boolean
}) => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <TypographyResponsive
        variant="h3"
        textAlign="center"
        desiredLineCount={2}
        mb={8}
      >
        {processContent.scrumBoardProcess.titleText}
      </TypographyResponsive>
      {/* <Typography variant="body1">
        {processContent.scrumBoardProcess.bodyText}
      </Typography> */}
      <Box width={assetWidth} maxWidth={maxAssetWidth}>
        <ScrumBoard />
      </Box>
    </Box>
  )
}
