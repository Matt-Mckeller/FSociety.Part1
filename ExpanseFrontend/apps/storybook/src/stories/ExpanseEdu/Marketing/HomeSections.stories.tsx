import type { Meta, StoryObj } from "@storybook/react"
import { Box, Container } from "@mui/material"

// Import marketing sections directly from ExpanseEdu using relative paths
import { Intro } from "../../../../../../apps/expanseEdu/src/modules/content/home/Intro"
import { Advantages } from "../../../../../../apps/expanseEdu/src/modules/content/home/Advantages"
import { Goals } from "../../../../../../apps/expanseEdu/src/modules/content/home/Goals"
import { Audience } from "../../../../../../apps/expanseEdu/src/modules/content/home/Audience"
import { GamificationEngagement } from "../../../../../../apps/expanseEdu/src/modules/content/home/GamificationEngagement"

/**
 * ExpanseEdu Marketing Sections
 *
 * These are the marketing components used on the ExpanseEdu landing page.
 * They showcase the value proposition, features, and goals of the Expanse
 * education platform.
 */

// Decorator to wrap stories with a container for consistent layout
const MarketingDecorator = (Story: React.ComponentType) => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Story />
  </Container>
)

/**
 * Intro Section - The hero section with logo and tagline
 */
export const IntroSection: StoryObj = {
  render: () => <Intro />,
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Hero section featuring the Expanse logo, character animations, and the main tagline: 'Unlocking student potential'",
      },
    },
  },
}

/**
 * Advantages Section - Key product advantages displayed as cards
 */
export const AdvantagesSection: StoryObj = {
  render: () => <Advantages />,
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Displays key advantages of Expanse: Seamless Integration, Simple Setup, Adaptable, and Easy to Use.",
      },
    },
  },
}

/**
 * Goals Section - Additional educational targets and objectives
 */
export const GoalsSection: StoryObj = {
  render: () => <Goals />,
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Lists educational targets including teaching purpose, equipping students, cultivating growth mindset, and creating positive environments.",
      },
    },
  },
}

/**
 * Audience Section - Target audience description
 */
export const AudienceSection: StoryObj = {
  render: () => <Audience />,
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Describes the target audience: K-12 and Higher Education students, families, teachers, and schools.",
      },
    },
  },
}

/**
 * Gamification Engagement Section - Shows the intersection of education and gamification
 */
export const GamificationSection: StoryObj = {
  render: () => <GamificationEngagement />,
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Features an animated visualization showing how Education + Gamification creates Enhanced Motivation, Focused Attention, and Deeper Purpose.",
      },
    },
  },
}

/**
 * Combined Marketing Page - All sections together
 */
export const CombinedPage: StoryObj = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={8}>
      <Intro />
      <GamificationEngagement />
      <Advantages />
      <Goals />
      <Audience />
    </Box>
  ),
  decorators: [MarketingDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Combined view of all marketing sections as they would appear on the landing page.",
      },
    },
  },
}

const meta: Meta = {
  title: "ExpanseEdu/Marketing/Home Sections",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Marketing sections from the ExpanseEdu landing page. These components showcase the platform's value proposition for students, teachers, and schools.",
      },
    },
  },
}

export default meta
