import React from "react"
import { DesignCollaborationAnimation } from "expanse.dynamicAssets"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import processContent from "../processContent.json"

export const CollaborativeDesignProcess = ({
  width = "300px",
  maxWidth = "100%",
}: {
  width?: number | string
  maxWidth?: number | string
}) => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h3" textAlign="center">
        {processContent.collaborativeDesignProcess.titleText}
      </Typography>
      <Typography variant="body1">
        {processContent.collaborativeDesignProcess.bodyText}
      </Typography>
      <DesignCollaborationAnimation width={width} maxWidth={maxWidth} />
    </Box>
  )
}
