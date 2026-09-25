"use client"
import React from "react"
import { ComponentsAndLanguagesAnimation } from "expanse.dynamicAssets"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import processContent from "../processContent.json"
import { TypographyResponsive } from "expanse.ui/theme"

export const ModularArchitectureProcess = ({
  assetWidth = "100%",
  assetMaxWidth = "100%",
  isMobile,
}: {
  assetWidth?: number | string
  assetMaxWidth?: number | string
  isMobile: boolean
}) => {
  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      alignItems={isMobile ? "center" : "center"}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isMobile ? "center" : "flex-end"}
        flexGrow={1}
        paddingRight={isMobile ? "0" : 2}
      >
        <TypographyResponsive
          variant="h3"
          desiredLineCount={1}
          textAlign={isMobile ? "center" : "center"}
        >
          {processContent.modularArchitectureProcess.titleText}
        </TypographyResponsive>
        <Typography
          variant="body1"
          textAlign={"left"}
          // px={isMobile ? 0 : 8}
        >
          {processContent.modularArchitectureProcess.bodyText}
        </Typography>
      </Box>
      <Box
        flex={1}
        justifyContent={isMobile ? "center" : "flex-start"}
        paddingLeft={isMobile ? "0" : 2}
      >
        <ComponentsAndLanguagesAnimation
          maxWidth={assetMaxWidth}
          width={assetWidth}
        />
      </Box>
    </Box>
  )
}
