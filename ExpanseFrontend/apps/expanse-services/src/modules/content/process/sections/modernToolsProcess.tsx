import React from "react"
import { ModernTechnologyAnimation } from "expanse.dynamicAssets"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import processContent from "../processContent.json" // Import the JSON file

export const ModernToolsProcess = ({
  width = "300px",
  maxWidth = "100%",
}: {
  width?: number | string
  maxWidth?: number | string
}) => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h3" textAlign="center">
        {processContent.modernToolsProcess.titleText}
      </Typography>
      <Typography variant="body1" fontStyle="italic" textAlign="center">
        {processContent.modernToolsProcess.bodyText}
      </Typography>
      <ModernTechnologyAnimation width={width} maxWidth={maxWidth} />
    </Box>
  )
}
