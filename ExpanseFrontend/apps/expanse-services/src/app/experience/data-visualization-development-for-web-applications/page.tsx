import { Metadata } from "next"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import {
  DataVisualizationsContent,
  DataVisualizationsContentSchema,
} from "@/modules/content/experience"
import { SectionSpacer } from "expanse.ui/theme"
import { MattsProfileWithCta } from "@personalNext/content/career/matts-profile-with-cta.component"
import { DataVisualizationTabDisplay } from "@/modules/content/experience"

export const metadata: Metadata = {
  title: "Data Visualization Development for Web Applications",
}
export default function DataVisualizationDevelopmentPage() {
  const content: DataVisualizationsContentSchema = DataVisualizationsContent.en
  const { sections } = content

  return (
    <>
      <Typography variant="h1" textAlign="center" mb={4}>
        {sections.heading.line1}
        <Typography component="span" variant="h3" display="block">
          {sections.heading.line2}
        </Typography>
      </Typography>
      <Typography variant="h2" textAlign="center" mb={4}></Typography>
      <Box maxWidth="750px" flexGrow={1} width="100%">
        <DataVisualizationTabDisplay />
      </Box>
      <SectionSpacer size="xs" />
      <Box mb={4}>
        <Typography variant="h3" component="h1" mb={2}>
          {sections.dataVisualizationsForWebApplications.label}
        </Typography>
        {sections.dataVisualizationsForWebApplications.paragraphs.map(
          (paragraph) => (
            <Typography variant="body2" paragraph>
              {paragraph}
            </Typography>
          ),
        )}
      </Box>
      {/* <Box mb={4}>
        <Typography variant="h3" mb={2}>
          {sections.cta.label}
        </Typography>
        <Typography variant="body2">
          {sections.cta.text}
          <strong> {sections.cta.boldFinalSentence}</strong>
        </Typography>
      </Box> */}
      <SectionSpacer size="xs" />
      <Box display="flex" justifyContent="center">
        <MattsProfileWithCta />
      </Box>
      <SectionSpacer size="xs" />
    </>
  )
}
