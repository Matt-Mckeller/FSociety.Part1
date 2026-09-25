import { ContactUsGraphic } from "expanse.dynamicAssets"
import React from "react"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import processContent from "../processContent.json"
import { TypographyResponsive } from "expanse.ui/theme"

// todo may want to switch this to be more consistent sizing with the other graphics in the future
export const CommunicationProcess = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={isMobile ? "column" : "row"}
      height={isMobile ? undefined : "50vh"}
      maxHeight={isMobile ? "100%" : "50vh"}
      width="100%"
    >
      <Box
        flex={1}
        flexBasis={isMobile ? "" : "50%"}
        maxHeight={isMobile ? "100%" : "50vh"}
        height={isMobile ? undefined : "50vh"}
        px={"10%"}
      >
        <ContactUsGraphic />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        mb={8}
        flexBasis={isMobile ? "" : "50%"}
      >
        <TypographyResponsive variant="h3">
          {processContent.communicationProcess.titleText}
        </TypographyResponsive>
        <Typography variant="body1">
          {processContent.communicationProcess.bodyText}
        </Typography>
      </Box>
    </Box>
  )
}
