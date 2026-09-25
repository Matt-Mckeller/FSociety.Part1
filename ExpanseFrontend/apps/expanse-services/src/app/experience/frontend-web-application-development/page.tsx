import { Metadata } from "next"
import { Typography, Box, Card, Grid, List, ListItem } from "@mui/material"
import {
  FrontendContent,
  FrontendContentSchema,
} from "@personalNext/content/experience/frontendContent"
import { SectionSpacer } from "expanse.ui/theme"
import { MattsProfileWithCta } from "../../../modules/content/career/matts-profile-with-cta.component"
import { FrontendAnimation } from "../../../modules/content/experience/components/FrontendAnimation.component"
import { CalendlyCTAButton } from "expanse.ui/contact"

export const metadata: Metadata = {
  title: "Frontend Web Application Development",
}

export default function FrontendWebApplicationDevelopmentPage() {
  const content: FrontendContentSchema = FrontendContent.en
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
        <FrontendAnimation maxWidth={300} height={300}></FrontendAnimation>
      </Box>
      <Box mb={4}>
        <Typography variant="h3" component="h1" mb={2}>
          {sections.introduction.label}
        </Typography>
        <Typography variant="body1">{sections.introduction.text}</Typography>
        <Typography variant="h6" textAlign="center" fontWeight="bold" mt={2}>
          {sections.introduction.cardSectionTitle}
        </Typography>
        <Grid container mt={2} spacing={4}>
          <Grid
            item
            zero={12}
            tablet={6}
            display="flex"
            justifyContent="center"
          >
            <Card
              elevation={1}
              sx={{
                height: "126px",
                flexBasis: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {sections.introduction.cards.card1Items.map((text) => (
                <Typography variant="body1" fontWeight="bold">
                  {text}
                </Typography>
              ))}
            </Card>
          </Grid>
          <Grid
            item
            zero={12}
            tablet={6}
            display="flex"
            justifyContent="center"
          >
            <Card
              elevation={1}
              sx={{
                height: "126px",
                flexBasis: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {sections.introduction.cards.card2Items.map((text) => (
                <Typography variant="body1" fontWeight="bold">
                  {text}
                </Typography>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box width="100%" display="flex" mt={2} justifyContent="center">
        <Box width="300px" display="flex">
          <CalendlyCTAButton
            text={sections.introduction.ctaLabel}
            icon={null}
          ></CalendlyCTAButton>
        </Box>
      </Box>

      <SectionSpacer size="medium"></SectionSpacer>

      {/* <Box mb={4}>
        <Typography variant="h3" mb={2}>
          {sections.benefits.label}
        </Typography>
        <Typography variant="body1">{sections.benefits.text}</Typography>

        <Typography variant="h6" mt={4}>
          {sections.benefits.list1.title}
        </Typography>
        <List>
          {sections.benefits.list1.entries.map(({ label, description }) => (
            <ListItem>
              <Typography variant="body1">
                <Box component="span" fontWeight="bold">
                  {label}:{" "}
                </Box>
                {description}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">{sections.benefits.list2.title}</Typography>
        <List>
          {sections.benefits.list2.entries.map(({ label, description }) => (
            <ListItem>
              <Typography variant="body1">
                <Box component="span" fontWeight="bold">
                  {label}:{" "}
                </Box>
                {description}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box> 
      <SectionSpacer size="medium"></SectionSpacer>
      */}

      <Box mb={4}>
        <Typography variant="h3" mb={2}>
          {sections.professionalExperience.label}
        </Typography>
        <Typography variant="body1">
          {sections.professionalExperience.text}
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h3" mb={2}>
          {sections.specializedSkills.label}
        </Typography>
        <Typography variant="body1">
          {sections.specializedSkills.text}
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h3" mb={2}>
          {sections.technology.label}
        </Typography>
        <Typography variant="body1">{sections.technology.text}</Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h3" mb={2}>
          {sections.designPrincipals.label}
        </Typography>
        <Typography variant="body1">
          {sections.designPrincipals.text}
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h3" mb={2}>
          {sections.passion.label}
        </Typography>
        {sections.passion.paragraphs.map((text) => (
          <Typography variant="body1" paragraph>
            {text}
          </Typography>
        ))}
      </Box>

      {/* <Box mb={4}>
        <Typography variant="h3" mb={2}>
          {sections.comprehensiveSolutions.label}
        </Typography>
        {sections.comprehensiveSolutions.paragraphs.map((text) => (
          <Typography variant="body1" paragraph>
            {text}
          </Typography>
        ))}
      </Box> */}
      <SectionSpacer size="xs" />
      <Box display="flex" justifyContent="center">
        <MattsProfileWithCta />
      </Box>
    </>
  )
}
