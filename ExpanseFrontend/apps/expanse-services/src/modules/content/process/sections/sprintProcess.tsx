import React from "react"
import { SprintVelocityAnimation } from "expanse.dynamicAssets"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import processContent from "../processContent.json"

export const SprintProcess = ({
  animationWidth = 300,
  animationHeight,
}: {
  animationWidth?: number | string
  animationHeight?: number | string
}) => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box display="flex" alignItems="center" flexDirection="column" mb={4}>
        <Typography variant="h3">
          {processContent.sprintProcess.titleText}
        </Typography>
        <Typography variant="body1" fontStyle="italic" textAlign={"center"}>
          {processContent.sprintProcess.bodyText}
        </Typography>
      </Box>
      <Box>
        <SprintVelocityAnimation
          width={animationWidth}
          height={animationHeight}
        />
      </Box>
    </Box>
  )
}
