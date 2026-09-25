import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography } from "@mui/material"

import { SprintProcess } from "../../../../../../apps/personalNext/src/modules/content/process/sections/sprintProcess"
import { FullServiceProcess } from "../../../../../../apps/personalNext/src/modules/content/process/sections/fullServiceProcess"
import { EstimationProcess } from "../../../../../../apps/personalNext/src/modules/content/process/sections/estimationProcess"
import { CommunicationProcess } from "../../../../../../apps/personalNext/src/modules/content/process/sections/communicationProcess"
import { ModernToolsProcess } from "../../../../../../apps/personalNext/src/modules/content/process/sections/modernToolsProcess"
import { ModularArchitectureProcess } from "../../../../../../apps/personalNext/src/modules/content/process/sections/modularArchitectureProcess"
import { CollaborativeDesignProcess } from "../../../../../../apps/personalNext/src/modules/content/process/sections/collaborativeDesignProcess"

/**
 * Process Sections showcase various aspects of the development workflow.
 * Each section combines text content with animated graphics.
 */
const meta: Meta<typeof SprintProcess> = {
  title: "PersonalNext/Process/ProcessSections",
  component: SprintProcess,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Collection of process section components used on the Process page. Each section highlights a different aspect of the agile development methodology.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SprintProcess>

// =============================================================================
// SprintProcess Stories
// =============================================================================

/**
 * Sprint Process with velocity animation.
 */
export const Sprint: Story = {
  args: {
    animationWidth: 300,
    animationHeight: 200,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Sprint Process at larger size.
 */
export const SprintLarge: Story = {
  args: {
    animationWidth: 500,
    animationHeight: 350,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

// =============================================================================
// FullServiceProcess Stories
// =============================================================================

/**
 * Full Service Process - Desktop layout.
 */
export const FullServiceDesktop: StoryObj<typeof FullServiceProcess> = {
  render: () => (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
      <FullServiceProcess assetWidth={300} isMobile={false} />
    </Box>
  ),
}

/**
 * Full Service Process - Mobile layout.
 */
export const FullServiceMobile: StoryObj<typeof FullServiceProcess> = {
  render: () => (
    <Box sx={{ maxWidth: 375, mx: "auto", p: 2 }}>
      <FullServiceProcess assetWidth="100%" assetMaxWidth={300} isMobile={true} />
    </Box>
  ),
}

// =============================================================================
// Other Process Sections
// =============================================================================

/**
 * Estimation Process section.
 */
export const Estimation: StoryObj<typeof EstimationProcess> = {
  render: () => (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
      <EstimationProcess isMobile={false} />
    </Box>
  ),
}

/**
 * Communication Process section.
 */
export const Communication: StoryObj<typeof CommunicationProcess> = {
  render: () => (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
      <CommunicationProcess isMobile={false} />
    </Box>
  ),
}

/**
 * Modern Tools Process section.
 */
export const ModernTools: StoryObj<typeof ModernToolsProcess> = {
  render: () => (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
      <ModernToolsProcess />
    </Box>
  ),
}

/**
 * Modular Architecture Process section.
 */
export const ModularArchitecture: StoryObj<typeof ModularArchitectureProcess> = {
  render: () => (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
      <ModularArchitectureProcess isMobile={false} />
    </Box>
  ),
}

/**
 * Collaborative Design Process section.
 */
export const CollaborativeDesign: StoryObj<typeof CollaborativeDesignProcess> = {
  render: () => (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
      <CollaborativeDesignProcess />
    </Box>
  ),
}

/**
 * All process sections stacked for overview.
 */
export const AllSections: Story = {
  render: () => (
    <Stack spacing={8} sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
      <Box>
        <Typography variant="h5" mb={2}>Sprint Process</Typography>
        <SprintProcess animationWidth={250} />
      </Box>
      <Box>
        <Typography variant="h5" mb={2}>Full Service</Typography>
        <FullServiceProcess assetWidth={250} isMobile={false} />
      </Box>
      <Box>
        <Typography variant="h5" mb={2}>Estimation</Typography>
        <EstimationProcess isMobile={false} />
      </Box>
      <Box>
        <Typography variant="h5" mb={2}>Communication</Typography>
        <CommunicationProcess isMobile={false} />
      </Box>
    </Stack>
  ),
}
