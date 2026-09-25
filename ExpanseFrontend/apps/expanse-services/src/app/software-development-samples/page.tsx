import { Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Auth, AuthCTAButton } from "expanse.ui/auth"
import {
  PointSelectionContextProvider,
  PointExampleSection,
} from "expanse.ui/points"
import { SectionSpacer, TypographyResponsive } from "expanse.ui/theme"
import { StandardUIComponents } from "../../modules/content/samples"
import { Metadata } from "next"
import { DataVisualizationTabDisplay } from "../../modules/content/experience"
import { OneTwoThreeLine } from "expanse.dynamicAssets"

export const metadata: Metadata = {
  title: "Application Samples",
}
export default function SoftwareDevelopmentSamples() {
  // todo server side rendering?
  const cardWidth = 300

  return (
    <Box mt={8}>
      <PointSelectionContextProvider>
        <TypographyResponsive variant="h1" textAlign="center">
          Sample Components & Demos
        </TypographyResponsive>
        <SectionSpacer />
        <Typography variant="h2" mb={8} textAlign="center">
          Authentication: Forms, Validation, APIs
        </Typography>
        <Box width="100%" mb={4} justifyContent="center" display="flex">
          <Typography mb={4} variant="body1" component="p" textAlign="center">
            Experience core aspects of a web application including Forms, API
            calls, and Authentication by Clicking Below
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          {/* <Paper sx={{ p: 6, mb: 3 }}>
            <Box sx={{ display: "flex", maxWidth: "375px" }}>
              <Auth></Auth>
            </Box>
          </Paper> */}
          <AuthCTAButton
            authDisplayType="signUp"
            eventName="auth-cta-samples-1"
          />
        </Box>
        <SectionSpacer />
        <Typography variant="h2" mb={8} textAlign="center">
          Data Visualizations: Charts
        </Typography>
        <Box display="flex" flexGrow={1} justifyContent="center">
          <Box maxWidth="750px" flexGrow={1}>
            <DataVisualizationTabDisplay />
          </Box>
        </Box>
        <SectionSpacer />
        <Typography variant="h2" mb={8} textAlign="center">
          Standard Interface Components
        </Typography>
        <StandardUIComponents />
        <SectionSpacer />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          sx={{ minHeight: "575px" }}
        >
          <Box mb={4}>
            <TypographyResponsive variant="h2" textAlign="center">
              Interactive Point Visualization Demos
            </TypographyResponsive>
          </Box>
          <PointExampleSection cardWidth={cardWidth} />
        </Box>
        <SectionSpacer />
        {/* <Box mb={4}>
          <TypographyResponsive variant="h2" textAlign="center">
            Brand Assets
          </TypographyResponsive>
        </Box>
        <Box width="100%">
          <OneTwoThreeLine height="3px" width="100%" />
          <OneTwoThreeLine height="6px" width="100%" />
          <OneTwoThreeLine height="9px" width="100%" />
        </Box> */}

        {/* <PuzzleComponent></PuzzleComponent> */}
      </PointSelectionContextProvider>
    </Box>
  )
}
