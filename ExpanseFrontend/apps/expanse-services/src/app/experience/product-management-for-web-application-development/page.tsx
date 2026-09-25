import { Metadata } from "next"
import { Typography, Box, List, ListItem } from "@mui/material"
import { SectionSpacer, TypographyResponsive } from "expanse.ui/theme"
import { MattsProfileWithCta } from "../../../modules/content/career/matts-profile-with-cta.component"
import {
  ProductManagementContent,
  ProductManagementContentSchema,
} from "../../../modules/content/experience"
import { ProductManagementAnimation } from "../../../modules/content/experience/components/ProductManagement.component"
import { GlobeNavigationAnimation } from "../../../modules/content/experience/components/GlobeNavigationAnimation.component"
import { LegoBuildingBlocksAnimation } from "../../../modules/content/experience/components/LegoBuildingBlockAnimation"
import { ExpandingCirclesAnimation } from "expanse.dynamicAssets/shapes"

export const metadata: Metadata = {
  title: "Product Management for Web Application Development",
}

// todo move to utility folder / package
export const replacePlaceholdersWithBoldAndItalic = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <Typography key={index} component="span" fontWeight="bold">
          {part.slice(2, -2)}
        </Typography>
      )
    } else if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <Typography key={index} component="span" fontStyle="italic">
          {part.slice(1, -1)}
        </Typography>
      )
    }
    return part
  })
}

export default function ProductManagementExperiencePage() {
  const content: ProductManagementContentSchema = ProductManagementContent.en
  const { sections } = content

  return (
    <>
      <Box mb={4}>
        {/* todo should be h1 but typography responsive is causing a bug*/}
        {/* and default h1 is too big on 375 */}
        <Typography variant="h2" textAlign="center" mb={4}>
          {sections.heading.line1}
          <Typography component="span" variant="h3" display="block">
            {sections.heading.line2}
          </Typography>
        </Typography>
      </Box>

      <Box mb={4}>
        <ProductManagementAnimation
          maxWidth={300}
          height={300}
        ></ProductManagementAnimation>
      </Box>

      {/* BRIDGING WORLDS */}
      <Box mb={4}>
        <Typography variant="h2" mb={2}>
          {sections.bridgingWorlds.title}
        </Typography>
        {sections.bridgingWorlds.paragraphs
          .slice(0, 4)
          .map((paragraph, index) => (
            <Typography key={index} variant="body1" paragraph>
              {replacePlaceholdersWithBoldAndItalic(paragraph)}
            </Typography>
          ))}
        <Typography variant="h3" mt={4} mb={2}>
          {sections.bridgingWorlds.benefits.label}
        </Typography>
        <List sx={{ pl: 12 }}>
          {sections.bridgingWorlds.benefits.items.map((item, index) => (
            <ListItem
              key={index}
              sx={{ display: "list-item", listStyleType: "disc", pl: 0, py: 0 }}
            >
              <Typography variant="body1">{item}</Typography>
            </ListItem>
          ))}
        </List>
        {sections.bridgingWorlds.paragraphs.slice(4).map((paragraph, index) => (
          <Typography key={index + 4} variant="body1" paragraph>
            {replacePlaceholdersWithBoldAndItalic(paragraph)}
          </Typography>
        ))}
      </Box>

      {/* Placeholder box */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Box
          sx={{
            maxWidth: 300,
            aspectRatio: "4 / 3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            px: 4,
          }}
        >
          <ExpandingCirclesAnimation
            textArray={["Collaboration", "Innovation", "Product"]}
          />
        </Box>
      </Box>

      {/* NAVIGATING WEB DEVELOPMENT */}
      <Box mb={4}>
        <Typography variant="h2" mb={2}>
          {sections.navigatingWebDevelopment.title}
        </Typography>
        {sections.navigatingWebDevelopment.paragraphs.map(
          (paragraph, index) => (
            <Typography key={index} variant="body1" paragraph>
              {replacePlaceholdersWithBoldAndItalic(paragraph)}
            </Typography>
          ),
        )}
        <Typography variant="body1" fontWeight="bold" mt={4} mb={2}>
          {sections.navigatingWebDevelopment.overTheYears.label}
        </Typography>
        <List sx={{ pl: 12 }}>
          {sections.navigatingWebDevelopment.overTheYears.items.map(
            (item, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "list-item",
                  listStyleType: "disc",
                  pl: 0,
                  py: 0,
                }}
              >
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ),
          )}
        </List>

        <Typography variant="body1" fontWeight="bold" mt={4} mb={2}>
          {sections.navigatingWebDevelopment.foundationEnables.label}
        </Typography>
        <List sx={{ pl: 12 }}>
          {sections.navigatingWebDevelopment.foundationEnables.items.map(
            (item, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "list-item",
                  listStyleType: "disc",
                  pl: 0,
                  py: 0,
                }}
              >
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ),
          )}
        </List>
        {sections.navigatingWebDevelopment.paragraphs.map(
          (paragraph, index) => (
            <Typography key={index + 4} variant="body1" paragraph>
              {replacePlaceholdersWithBoldAndItalic(paragraph)}
            </Typography>
          ),
        )}
      </Box>

      <Box mb={4}>
        <GlobeNavigationAnimation
          maxWidth={150}
          height={150}
        ></GlobeNavigationAnimation>
      </Box>

      <SectionSpacer size="xs" />
      {/* BUILDING SYSTEMS */}
      <Box
        mb={4}
        display="flex"
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography variant="h2" mb={2}>
          {sections.buildingSystems.title}
        </Typography>
        {sections.buildingSystems.paragraphs
          .slice(0, 3)
          .map((paragraph, index) => (
            <Typography key={index} variant="body1" paragraph>
              {replacePlaceholdersWithBoldAndItalic(paragraph)}
            </Typography>
          ))}
        <LegoBuildingBlocksAnimation maxWidth={300} height={300} />
        {sections.buildingSystems.paragraphs
          .slice(3, sections.buildingSystems.paragraphs.length - 1)
          .map((paragraph, index) => (
            <Typography key={index} variant="body1" paragraph>
              {replacePlaceholdersWithBoldAndItalic(paragraph)}
            </Typography>
          ))}
      </Box>

      <SectionSpacer size="xs" />
      <Box display="flex" justifyContent="center">
        <MattsProfileWithCta />
      </Box>
    </>
  )
}
