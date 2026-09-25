import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"

import {
  CoreCompetencyCard,
  CoreCompetencyCards,
  WebAndMobileAppDevCard,
  IntegrationsAndApiDevelopmentCard,
  WebDevelopmentServicesCard,
  TechnologyMigrationServicesCard,
} from "../../../../../../apps/personalNext/src/modules/content/career/core-competency-cards.component"
import {
  LighteningCloud,
  WebAndMobileAppScreens,
} from "expanse.dynamicAssets"

/**
 * Core Competency Cards display key skills and service offerings.
 * Used on the home page and services pages to highlight expertise areas.
 */
const meta: Meta<typeof CoreCompetencyCards> = {
  title: "PersonalNext/Career/CoreCompetencyCards",
  component: CoreCompetencyCards,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A responsive grid of competency cards showcasing professional skills with animated icons, titles, and descriptions. Adapts between row and column layouts based on screen width.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CoreCompetencyCards>

// =============================================================================
// CoreCompetencyCards (Grid) Stories
// =============================================================================

/**
 * Default three-card layout showing all core competencies.
 * Displays in a row on desktop and stacks vertically on mobile.
 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 1200, p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Cards displayed in a narrow container to show mobile/stacked layout.
 */
export const MobileLayout: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 400, p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

// =============================================================================
// Individual CoreCompetencyCard Stories
// =============================================================================

/**
 * Web and Mobile App Development card - primary offering.
 */
export const WebAppDevelopment: StoryObj<typeof CoreCompetencyCard> = {
  render: () => (
    <Box sx={{ maxWidth: 350, p: 2 }}>
      <CoreCompetencyCard
        title={WebAndMobileAppDevCard.title}
        text={WebAndMobileAppDevCard.text}
        ImageComponent={WebAndMobileAppDevCard.ImageComponent}
      />
    </Box>
  ),
}

/**
 * Integrations and API Development card.
 */
export const IntegrationsAndApis: StoryObj<typeof CoreCompetencyCard> = {
  render: () => (
    <Box sx={{ maxWidth: 350, p: 2 }}>
      <CoreCompetencyCard
        title={IntegrationsAndApiDevelopmentCard.title}
        text={IntegrationsAndApiDevelopmentCard.text}
        ImageComponent={IntegrationsAndApiDevelopmentCard.ImageComponent}
      />
    </Box>
  ),
}

/**
 * Web Development Services card.
 */
export const WebDevelopment: StoryObj<typeof CoreCompetencyCard> = {
  render: () => (
    <Box sx={{ maxWidth: 350, p: 2 }}>
      <CoreCompetencyCard
        title={WebDevelopmentServicesCard.title}
        text={WebDevelopmentServicesCard.text}
        ImageComponent={WebDevelopmentServicesCard.ImageComponent}
      />
    </Box>
  ),
}

/**
 * Technology Migration card - for legacy system upgrades.
 */
export const TechnologyMigration: StoryObj<typeof CoreCompetencyCard> = {
  render: () => (
    <Box sx={{ maxWidth: 350, p: 2 }}>
      <CoreCompetencyCard
        title={TechnologyMigrationServicesCard.title}
        text={TechnologyMigrationServicesCard.text}
        ImageComponent={TechnologyMigrationServicesCard.ImageComponent}
      />
    </Box>
  ),
}

/**
 * Custom card with user-defined content.
 */
export const CustomCard: StoryObj<typeof CoreCompetencyCard> = {
  render: () => (
    <Box sx={{ maxWidth: 350, p: 2 }}>
      <CoreCompetencyCard
        title="Custom Skill"
        text="This is a custom competency card that demonstrates how to create new cards with different icons and content. The card layout supports any SVG or Lottie animation component."
        ImageComponent={LighteningCloud}
      />
    </Box>
  ),
}

/**
 * All available card presets displayed together for comparison.
 */
export const AllCardPresets: StoryObj<typeof CoreCompetencyCard> = {
  render: () => (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 400 }}
    >
      <CoreCompetencyCard
        title={WebAndMobileAppDevCard.title}
        text={WebAndMobileAppDevCard.text}
        ImageComponent={WebAndMobileAppDevCard.ImageComponent}
      />
      <CoreCompetencyCard
        title={IntegrationsAndApiDevelopmentCard.title}
        text={IntegrationsAndApiDevelopmentCard.text}
        ImageComponent={IntegrationsAndApiDevelopmentCard.ImageComponent}
      />
      <CoreCompetencyCard
        title={WebDevelopmentServicesCard.title}
        text={WebDevelopmentServicesCard.text}
        ImageComponent={WebDevelopmentServicesCard.ImageComponent}
      />
      <CoreCompetencyCard
        title={TechnologyMigrationServicesCard.title}
        text={TechnologyMigrationServicesCard.text}
        ImageComponent={TechnologyMigrationServicesCard.ImageComponent}
      />
    </Box>
  ),
}
