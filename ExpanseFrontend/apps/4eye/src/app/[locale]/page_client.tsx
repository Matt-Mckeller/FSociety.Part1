"use client"
import { useTranslations } from "next-intl"
import { AppBarHeight } from "expanse.ui/theme"
import { SectionSpacer } from "expanse.ui/theme"
import {
  Advantages,
  Audience,
  Contact,
  Curtains,
  GamificationEngagement,
  Goals,
  Intro,
  ProblemSolutionStorySlider,
  Purpose,
  ThankYou,
} from "../../modules/content/home"
import { Box } from "@mui/system"

export default function HomeClientView() {
  const t = useTranslations("home")

  return (
    <Box display="flex" flexDirection="column" alignItems="center" flexGrow={1}>
      <Box
        height={`calc(100vh - ${AppBarHeight})`}
        maxHeight={"1000px"}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Intro />
      </Box>
      <SectionSpacer size="large" />
      <GamificationEngagement />
      <SectionSpacer size="large" />
      <Purpose />
      <SectionSpacer size="large" />
      <ProblemSolutionStorySlider />
      <SectionSpacer size="large" />
      <Advantages />
      <SectionSpacer size="large" />
      <Audience />
      <SectionSpacer size="large" />
      <Goals />
      <SectionSpacer size="large" />
      <Curtains />
      <SectionSpacer size="large" />
      <Contact />
      <SectionSpacer size="large" />
      <ThankYou />
      <SectionSpacer size="large" />
    </Box>
  )
}
