import { AuthCTAButton } from "expanse.ui/auth"
import { Box, Button, Typography, Chip, Stack } from "@mui/material"
import { PointSelectionContextProvider } from "expanse.ui/points"
import { SectionSpacer, TypographyResponsive } from "expanse.ui/theme"
import { TicketCard } from "expanse.ui/points"
import { CoreCompetencyCards } from "../modules/content"
import { ProjectExampleStepper } from "../modules/content/career/project-example-stepper.component"
import { Metadata } from "next"
import { AppBarHeight } from "expanse.ui/theme"

import { TicketWithCharactersOnTop } from "expanse.ui/game"
import { CalendlyCTAButton, ContactCTAButton } from "expanse.ui/contact"
import {
  AllHomeProcessHighlights,
  ThreeStepProcess,
} from "../modules/content/process"
import processContent from "../modules/content/process/processContent.json"
import { WalkingCharacter } from "expanse.ui/game"
import { CharacterPositionProvider } from "expanse.ui/theme"

export const metadata: Metadata = {
  title: "Expanse | Shaping the Future",
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
          <CharacterPositionProvider>
            <Box width="100%" maxWidth="600px" height="400px">
              <WalkingCharacter />
            </Box>
          </CharacterPositionProvider>
          <SectionSpacer size="xs" />
          <Typography variant="h2" textAlign="center">
            Shaping the Future
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
          Specialties
        </TypographyResponsive>
        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
          justifyContent="center"
          useFlexGap
          sx={{ maxWidth: 800, mx: "auto" }}
        >
          {[
            "Learning",
            "Gamification",
            "Engagement",
            "Mental Health",
            "User Experience",
            "Innovation",
          ].map((specialty) => (
            <Chip
              key={specialty}
              label={specialty}
              variant="outlined"
              sx={{ fontSize: "1.1rem", py: 2.5, px: 1 }}
            />
          ))}
        </Stack>

        <SectionSpacer size="small" />

        <TypographyResponsive
          desiredLineCount={1}
          variant="h2"
          sx={{
            textTransform: "uppercase",
            textAlign: "center",
            my: 8,
            width: "100%",
          }}
        >
          Our Mission
        </TypographyResponsive>
        <Box maxWidth={800} mx="auto" px={4}>
          <Typography variant="body1" mb={3} textAlign="center">
            Expanse builds innovative software solutions that transform how people
            learn, work, and engage. We combine cutting-edge technology with deep
            expertise in gamification, user experience, and mental health to create
            products that make a meaningful impact.
          </Typography>
          <Typography variant="body1" mb={3} textAlign="center">
            Our team is driven by a belief that technology should empower people,
            not overwhelm them. We focus on creating intuitive, engaging experiences
            that help users achieve their goals while supporting their wellbeing.
          </Typography>
          <Typography variant="body1" textAlign="center">
            From educational platforms to productivity tools, we bring innovation
            and purpose to every project we undertake.
          </Typography>
        </Box>

        <SectionSpacer size="small" />
      </Box>
    </PointSelectionContextProvider>
  )
}
