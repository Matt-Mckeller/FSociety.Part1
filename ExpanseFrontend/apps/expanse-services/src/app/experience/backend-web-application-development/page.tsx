import { Metadata } from "next"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import {
  BackendContentSchema,
  BackendContent,
} from "@/modules/content/experience"
import { SectionSpacer } from "expanse.ui/theme"
import { MattsProfileWithCta } from "@personalNext/content/career/matts-profile-with-cta.component"
import { BackendAnimation } from "@/modules/content/experience/components/BackendAnimation.component"

export const metadata: Metadata = {
  title: "Backend Web Application Development",
}
export default function FrontendWebApplicationDevelopmentPage() {
  const content: BackendContentSchema = BackendContent.en
  const { sections } = content

  return (
    <>
      <Box mb={4}>
        <Typography variant="h1" textAlign="center" mb={4}>
          {sections.heading.line1}
          <Typography component="span" variant="h3" display="block">
            {sections.heading.line2}
          </Typography>
        </Typography>
      </Box>
      <Box mb={4}>
        <BackendAnimation width="300" height="300" />
      </Box>
      <Box mb={4}>
        <Typography variant="h3" component="h1" mb={2}>
          {sections.comprehensiveExpertise.label}
        </Typography>
        {sections.comprehensiveExpertise.paragraphs.map((paragraph) => {
          return (
            <Typography variant="body2" paragraph>
              {paragraph}
            </Typography>
          )
        })}
      </Box>
      {/* <Box mb={4}>
        <Typography variant="h3" mb={2}>
          {sections.cta.label}
        </Typography>
        <Typography variant="body2">{sections.cta.text}</Typography>
      </Box>
      <SectionSpacer size="xs" /> */}
      <Box display="flex" justifyContent="center">
        <MattsProfileWithCta />
      </Box>
    </>
  )
}
