import { Metadata } from "next"
import { Box } from "@mui/system"
import {
  AgileLifecycleLoopGraphic,
  AnimatedExpandingCircle,
  ComponentsAndLanguagesAnimation,
  ContactUsGraphic,
  DesignCollaborationAnimation,
  ModernTechnologyAnimation,
  OneTwoThreeLine,
  ScrumBoard,
} from "expanse.dynamicAssets"
import { SectionSpacer } from "expanse.ui/theme"
import { Typography } from "@mui/material"

import {
  ThreeStepProcess,
  TechnicalDetailsSlider,
  ScrumBoardProcess,
  SprintProcess,
  EstimationProcess,
  CommunicationProcess,
  FullServiceProcess,
  ModularArchitectureProcess,
  ModernToolsProcess,
  CollaborativeDesignProcess,
} from "../../modules/content/process"
import processContent from "../../modules/content/process/processContent.json" // Import the JSON file
import { TicketWithSlider } from "expanse.ui/points"

export const metadata: Metadata = {
  title: "Expanse Agile Software Development Process",
}

export default function Process() {
  return "wip"
  const { pageTitle } = processContent
  const contactGraphicWidth = 300 // too large on height
  const assetWidthGroup1 = 500
  const assetWidthGroup2 = 500
  const imageMaxWidths = 800

  return (
    <Box
      display="flex"
      mt={4}
      flexDirection="column"
      alignItems="center"
      flexGrow={1}
    >
      <Box width={1}>
        <Typography variant="h1" textAlign="center" mb={8}>
          {pageTitle}
        </Typography>
        <ThreeStepProcess />
      </Box>

      <SectionSpacer />
      <Box flexGrow={1} width={assetWidthGroup1} maxWidth={"100%"}>
        <FullServiceProcess isMobile={true} />
      </Box>

      <Box width="100%" maxWidth={assetWidthGroup2}>
        <ScrumBoardProcess />
      </Box>

      <SectionSpacer />
      <Box flexGrow={1}>
        <EstimationProcess />
      </Box>
      <SectionSpacer />

      <Box>
        <SprintProcess animationWidth={300} animationHeight={200} />
      </Box>

      <SectionSpacer />

      <Box flexGrow={1} width={contactGraphicWidth} maxWidth={"100%"}>
        <CommunicationProcess />
      </Box>
      <SectionSpacer />

      <Box flexGrow={1}>
        <ModernToolsProcess width={assetWidthGroup1} maxWidth="100%" />
      </Box>
      <SectionSpacer />
      <Box flexGrow={1}>
        <ModularArchitectureProcess
          assetWidth={assetWidthGroup1}
          assetMaxWidth="100%"
          isMobile={true}
        />
      </Box>
      <Box flexGrow={1}>
        <CollaborativeDesignProcess width={assetWidthGroup1} maxWidth="100%" />
      </Box>

      <Box height={100}>
        <AnimatedExpandingCircle />
      </Box>
      <Box
        data-id="Project Management Images"
        display="flex"
        flexDirection="column"
        maxWidth={imageMaxWidths}
      >
        <Box flexGrow={1}>
          <Box
            component="img"
            width="100%"
            src="https://storage.googleapis.com/expanse-public-assets/process/SprintBoardExample.webp"
          />
          <Box>
            <Typography variant="body1" fontStyle="italic">
              This is an image.
            </Typography>
          </Box>
        </Box>
        <Box flexGrow={1}>
          <Box
            component="img"
            width="100%"
            src="https://storage.googleapis.com/expanse-public-assets/process/ProductBacklogExample1.webp"
          />
          <Box>
            <Typography variant="body1" fontStyle="italic">
              This is an image2.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        data-id="Technical Examples"
        display="flex"
        flexDirection="column"
        maxWidth={imageMaxWidths}
      >
        <Box flexGrow={1}>
          <img
            width="100%"
            src="https://storage.googleapis.com/expanse-public-assets/process/GraphQLSample.webp"
          />
          <Typography variant="body1" fontStyle="italic">
            This is an image 3
          </Typography>
        </Box>
        <Box flexGrow={1}>
          <img
            width="100%"
            src="https://storage.googleapis.com/expanse-public-assets/process/TechnicalDocumentationSample.webp"
          />
          <Typography variant="body1" fontStyle="italic">
            This is an image 4
          </Typography>
        </Box>
      </Box>
      {/* <Box flexGrow={1} maxWidth="800px">
        <TechnicalDetailsSlider />
      </Box> */}

      {/* <Box
        width="800px"
        maxWidth="100%"
        justifyContent="center"
        // height="auto"
        height="300px"
        maxHeight="300px"
        sx={{ border: "1px solid black" }}
      >
        <JiraSamplesSlider />
      </Box> */}
      <SectionSpacer />
    </Box>
  )
}
