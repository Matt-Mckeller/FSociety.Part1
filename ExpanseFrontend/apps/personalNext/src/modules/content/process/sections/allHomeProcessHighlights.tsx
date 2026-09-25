"use client"
import { Typography } from "@mui/material"
import { Box, useMediaQuery, useTheme } from "@mui/system"
import { SectionSpacer } from "expanse.ui/theme"
import React from "react"
import { CollaborativeDesignProcess } from "./collaborativeDesignProcess"
import { CommunicationProcess } from "./communicationProcess"
import { EstimationProcess } from "./estimationProcess"
import { FullServiceProcess } from "./fullServiceProcess"
import { ModernToolsProcess } from "./modernToolsProcess"
import { ModularArchitectureProcess } from "./modularArchitectureProcess"
import { ScrumBoardProcess } from "./scrumBoardProcess"
import { SprintProcess } from "./sprintProcess"
import { ThreeStepProcess } from "./threeStepProcess"

export const AllHomeProcessHighlights = () => {
  const contactGraphicWidth = 300 // too large on height
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"))
  const isTablet = useMediaQuery(theme.breakpoints.between("mobileL", "laptop"))
  const isDesktop = useMediaQuery(theme.breakpoints.between("fourK", "laptop"))
  const is4k = useMediaQuery(theme.breakpoints.up("desktop"))
  const assetWidthGroup1 =
    isDesktop || is4k ? 500 : isTablet ? 300 : isMobile ? 300 : 300

  return (
    <Box width={1} display="flex" alignItems="center" flexDirection="column">
      <Box flexGrow={1}>
        <ModernToolsProcess width={assetWidthGroup1} maxWidth="100%" />
      </Box>

      <SectionSpacer size="large" />
      <Box flexGrow={1} px={isMobile ? 0 : "10%"}>
        <ModularArchitectureProcess
          assetWidth={assetWidthGroup1}
          assetMaxWidth="100%"
          isMobile={isMobile}
        />
      </Box>

      {/* <SectionSpacer size="large" />
      <Box flexGrow={1} width="100%" px={isMobile ? 0 : "10%"}>
        <FullServiceProcess
          assetWidth={assetWidthGroup1}
          assetMaxWidth={"100%"}
          isMobile={isMobile}
        />
      </Box> */}

      {/* <SectionSpacer size="large" />
      <Box flexGrow={1}>
        <SprintProcess animationWidth={assetWidthGroup1} />
      </Box> */}

      {/* <SectionSpacer size="large" />
      <Box
        flexGrow={1}
        height="100vh"
        maxHeight={"1000px"}
        display="flex"
        alignItems="center"
        width="100%"
        maxWidth={600}
      >
        <EstimationProcess isMobile={isMobile} />
      </Box> */}

      {/* <SectionSpacer size="large" />
      <Box flexGrow={1}>
        <CollaborativeDesignProcess width={assetWidthGroup1} maxWidth="100%" />
      </Box> */}

      {/* <SectionSpacer size="large" />
      <Box flexGrow={1} display="flex" alignItems="center">
        <ScrumBoardProcess
          assetWidth={"100%"}
          maxAssetWidth={"100%"}
          isMobile={isMobile}
        />
      </Box> */}

      <SectionSpacer size="large" />
      <Box flexGrow={1} maxWidth="100%" display="flex" alignItems="center">
        <CommunicationProcess isMobile={isMobile} />
      </Box>
    </Box>
  )
}
