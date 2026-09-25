import { TicketWithSlider } from "expanse.ui/points"
import React from "react"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import processContent from "../processContent.json"

export const EstimationProcess = ({ isMobile }: { isMobile: boolean }) => {
  /*
  Options for improving layout
      word-wrap: break-word;
    hyphens: auto;
    or
    max-width: 25ch; // character length per line
    or
    word-spacing: 0px;
    or 
    text alignment
    or
    custom font size
    or 
    letter spacing
    or
    change the text
  */
  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "column"}
      alignItems="center"
    >
      <Typography variant="h3" mb={8}>
        {processContent.estimationProcess.titleText}
      </Typography>
      <Box mb={8}>
        <TicketWithSlider />
      </Box>
      <Box textAlign={isMobile ? "left" : "center"}>
        <Typography variant="body1">
          {processContent.estimationProcess.bodyText}
        </Typography>
      </Box>
    </Box>
  )
}
