import type { Meta, StoryObj } from "@storybook/react"
import { Box, Container } from "@mui/material"

// Import marketing sections directly from ExpanseEdu
import { Contact } from "../../../../../../apps/expanseEdu/src/modules/content/home/Contact"
import { Purpose } from "../../../../../../apps/expanseEdu/src/modules/content/home/Purpose"
import { ThankYou } from "../../../../../../apps/expanseEdu/src/modules/content/home/ThankYou"
import { UnderConstruction } from "../../../../../../apps/expanseEdu/src/modules/content/home/UnderConstruction"
import { Curtains } from "../../../../../../apps/expanseEdu/src/modules/content/home/Curtains"
import { ProblemSolutionStorySlider } from "../../../../../../apps/expanseEdu/src/modules/content/home/ProblemSolutionStorySlider"

/**
 * ExpanseEdu Additional Marketing Sections
 *
 * Additional marketing components used on the ExpanseEdu landing page
 * that complement the main HomeSections stories.
 */
const meta: Meta = {
  title: "ExpanseEdu/Marketing/AdditionalSections",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

// Decorator to wrap stories with a container for consistent layout
const MarketingDecorator = (Story: React.ComponentType) => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Story />
  </Container>
)

/**
 * Contact Section - Contact CTA with character illustration
 */
export const ContactSection: StoryObj = {
  render: () => <Contact />,
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Contact call-to-action section featuring the ContactUsCharacter illustration and a CTA button to reach out.",
      },
    },
  },
}

/**
 * Purpose Section - Mission statement with interactive cards
 */
export const PurposeSection: StoryObj = {
  render: () => <Purpose />,
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Interactive cards showing the purpose and mission of Expanse EDU. Hover over cards to reveal more details.",
      },
    },
  },
}

/**
 * ThankYou Section - Thank you message with animation
 */
export const ThankYouSection: StoryObj = {
  render: () => <ThankYou />,
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Thank you message displayed with a SmilingFace Lottie animation.",
      },
    },
  },
}

/**
 * UnderConstruction Section - Placeholder page
 */
export const UnderConstructionSection: StoryObj = {
  render: () => <UnderConstruction />,
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Under construction placeholder page with DesignCollaboration animation and contact CTA.",
      },
    },
  },
}

/**
 * Curtains Section - Decorative element with Crown animation
 */
export const CurtainsSection: StoryObj = {
  render: () => <Curtains />,
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Decorative curtains section with a Crown Lottie animation overlay.",
      },
    },
  },
}

/**
 * Problem/Solution Story Slider - Interactive stepper
 */
export const ProblemSolutionSlider: StoryObj = {
  render: () => <ProblemSolutionStorySlider />,
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Interactive slider/stepper component that walks through problem statements and Expanse solutions.",
      },
    },
  },
}

/**
 * All Additional Sections - Gallery view
 */
export const AllAdditionalSections: StoryObj = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 8, py: 4 }}>
      <Box>
        <Contact />
      </Box>
      <Box>
        <Purpose />
      </Box>
      <Box>
        <ThankYou />
      </Box>
      <Box>
        <Curtains />
      </Box>
      <Box>
        <ProblemSolutionStorySlider />
      </Box>
      <Box>
        <UnderConstruction />
      </Box>
    </Box>
  ),
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Gallery view of all additional marketing sections stacked together.",
      },
    },
  },
}
