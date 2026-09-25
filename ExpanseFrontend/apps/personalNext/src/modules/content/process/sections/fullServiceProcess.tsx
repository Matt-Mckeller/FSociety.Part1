"use client"
import { AgileLifecycleLoopGraphic } from "expanse.dynamicAssets"
import React from "react"
import { Box, useMediaQuery, useTheme } from "@mui/system"
import { Typography } from "@mui/material"
import processContent from "../processContent.json"
import { TypographyResponsive } from "expanse.ui/theme"

export const FullServiceProcess = ({
  assetWidth = 300,
  assetMaxWidth = "100%",
  isMobile,
}: {
  assetWidth?: number | string
  assetMaxWidth?: number | string
  isMobile: boolean
}) => {
  const theme = useTheme()

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      alignItems={isMobile ? "center" : "center"}
    >
      <Box
        flex={1}
        justifyContent={isMobile ? "center" : "flex-start"}
        paddingRight={isMobile ? "0" : 4}
      >
        <Box width={assetWidth} maxWidth={assetMaxWidth}>
          <AgileLifecycleLoopGraphic />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isMobile ? "center" : "flex-start"}
        flexGrow={1}
        paddingLeft={isMobile ? "0" : 4}
      >
        <TypographyResponsive
          variant="h3"
          desiredLineCount={isMobile ? 1 : 1}
          textAlign={isMobile ? "center" : "center"}
        >
          {processContent.fullServiceProcess.titleText}
        </TypographyResponsive>
        <Typography variant="body1" textAlign={isMobile ? "inherit" : "left"}>
          {processContent.fullServiceProcess.bodyText}
        </Typography>
      </Box>
    </Box>
  )
}
