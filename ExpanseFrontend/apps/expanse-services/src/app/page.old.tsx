import { AuthCTAButton } from "expanse.ui/auth"
import { Box, Button, Typography } from "@mui/material"
import { PointSelectionContextProvider } from "expanse.ui/points"
import { SectionSpacer, TypographyResponsive } from "expanse.ui/theme"
import { TicketCard } from "expanse.ui/points"
import {
  CoreCompetencyCards,
  DevelopmentTechnologies,
  MattsProfile,
  ProfessionalSummary,
  SpecializationSection,
} from "../modules/content"
import { ProjectExampleStepper } from "../modules/content/career/project-example-stepper.component"
import { Metadata } from "next"
import { AppBarHeight } from "expanse.ui/theme"
import { MattsProfileWithCta } from "../modules/content/career/matts-profile-with-cta.component"
import { TicketWithCharactersOnTop } from "expanse.ui/game"
import { CalendlyCTAButton, ContactCTAButton } from "expanse.ui/contact"
import {
  AllHomeProcessHighlights,
  ThreeStepProcess,
} from "../modules/content/process"
import processContent from "../modules/content/process/processContent.json"
import { RocketLaunch } from "expanse.dynamicAssets"

export const metadata: Metadata = {
  title: "Custom Web Application Development",
}
export default function Home() {
  return (
    <PointSelectionContextProvider>
      <Box
        display="flex"
        mt={4}
        flexDirection="column"
        alignItems="center"
        flexGrow={1}
        width="100%"
      >
        <Box
          height={`calc(100vh - ${AppBarHeight})`}
          maxHeight={"1000px"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="300px" height="300px">
            {/* <TicketCard /> */}
            {/* <TicketWithCharactersOnTop /> */}
            <RocketLaunch />
          </Box>
          <SectionSpacer size="xs" />
          <Typography variant="h2" textAlign="center">
            Web Application Development Expert
          </Typography>
          <SectionSpacer size="xs" />

          <Box>
            <CalendlyCTAButton
              eventName="landing-hero-calendly-click"
              text="Let's Talk"
              variant="outlined"
              sx={{ width: "300px" }}
            />
          </Box>

          {/* <AuthCTAButton
            authDisplayType="signUp"
            eventName="auth-cta-services-1"
            variant="outlined"
            sx={{ width: "300px", mt: 2 }}
          /> */}
        </Box>

        <SectionSpacer size="small" />

        <Box display="flex" flexDirection="column">
          <TypographyResponsive
            desiredLineCount={2}
            variant="h2"
            sx={{ textTransform: "uppercase", textAlign: "center", my: 8 }}
          >
            Focus Areas
          </TypographyResponsive>
          <CoreCompetencyCards />
        </Box>

        <SectionSpacer size="large" />

        <AllHomeProcessHighlights />
        <SectionSpacer size="large" />

        <Box
          height={`calc(100vh - ${AppBarHeight})`}
          maxHeight={"1000px"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
        >
          <Box>
            <TypographyResponsive
              desiredLineCount={1}
              variant="h2"
              sx={{ textTransform: "uppercase", textAlign: "center", my: 8 }}
            >
              Projects
            </TypographyResponsive>
            <ProjectExampleStepper />
          </Box>
        </Box>
        <Box
          // height={`calc(100vh - ${AppBarHeight})`}
          // maxHeight={"1000px"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <MattsProfileWithCta />
        </Box>

        {/* spacing is strange because of the contact button */}
        <SectionSpacer size="xs"></SectionSpacer>

        {/* <Box
          width={1}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <TypographyResponsive
            variant="h1"
            textAlign="center"
            mb={8}
            desiredLineCount={1}
          >
            {processContent.threeStepProcess.sectionTitle}
          </TypographyResponsive>
          <ThreeStepProcess />
          <Button
            variant={"text"}
            color="primary"
            // href="https://docs.google.com/document/d/e/2PACX-1vSHeIjzzHDkBP6MFbFlTui7d-h1W7A4OmdAdKblhjqqF5mEi2L1hMqVb_iGCIj5Sf2RjAAgj9XVB0kB/pub"
            href="https://drive.google.com/file/d/1yjf4zjXfKto0Wvjhvj18p4lB3XMrpxdr/view?usp=sharing"
            component="a"
            target="_blank"
            sx={{ fontWeight: "bold", mt: 4 }}
          >
            Learn More
          </Button>
        </Box> */}

        <SectionSpacer size="large"></SectionSpacer>

        <TypographyResponsive
          desiredLineCount={1}
          variant="h2"
          sx={{ textTransform: "uppercase", textAlign: "center", my: 8 }}
        >
          Technology Highlights
        </TypographyResponsive>
        <DevelopmentTechnologies />

        <SectionSpacer size="small" />

        <TypographyResponsive
          desiredLineCount={1}
          variant="h2"
          sx={{ textTransform: "uppercase", textAlign: "center", my: 8 }}
        >
          Areas of Expertise
        </TypographyResponsive>
        <SpecializationSection />

        <SectionSpacer size="small" />

        <TypographyResponsive
          desiredLineCount={1}
          variant="h2"
          sx={{
            textTransform: "uppercase",
            textAlign: "center",
            my: 8,
            width: "100%",
            // padding: 8,
          }}
        >
          Professional Summary
        </TypographyResponsive>
        <ProfessionalSummary />

        <SectionSpacer size="small" />
      </Box>
    </PointSelectionContextProvider>
  )
}
