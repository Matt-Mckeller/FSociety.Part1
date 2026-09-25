import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography } from "@mui/material"

import { BackendAnimation } from "../../../../../../apps/personalNext/src/modules/content/experience/components/BackendAnimation.component"
import { FrontendAnimation } from "../../../../../../apps/personalNext/src/modules/content/experience/components/FrontendAnimation.component"

/**
 * Experience Animations showcase the technical expertise areas.
 * Lottie-based animations for backend and frontend development.
 */
const meta: Meta<typeof BackendAnimation> = {
  title: "PersonalNext/Experience/Animations",
  component: BackendAnimation,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Lottie animations used on experience pages to visually represent backend and frontend development concepts.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof BackendAnimation>

/**
 * Backend development animation at default size.
 */
export const Backend: Story = {
  args: {
    width: "300px",
    height: "200px",
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" mb={2}>
          Backend Animation
        </Typography>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Backend animation at large size for hero sections.
 */
export const BackendLarge: Story = {
  args: {
    width: "500px",
    height: "350px",
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Frontend development animation.
 */
export const Frontend: StoryObj<typeof FrontendAnimation> = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" mb={2}>
        Frontend Animation
      </Typography>
      <FrontendAnimation maxWidth={300} height={200} />
    </Box>
  ),
}

/**
 * Frontend animation at large size.
 */
export const FrontendLarge: StoryObj<typeof FrontendAnimation> = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <FrontendAnimation maxWidth={500} height={350} />
    </Box>
  ),
}

/**
 * Both animations displayed side by side for comparison.
 */
export const BothAnimations: Story = {
  render: () => (
    <Stack direction="row" spacing={4} sx={{ p: 4 }}>
      <Box>
        <Typography variant="h6" mb={2} textAlign="center">
          Backend
        </Typography>
        <BackendAnimation width="250px" height="180px" />
      </Box>
      <Box>
        <Typography variant="h6" mb={2} textAlign="center">
          Frontend
        </Typography>
        <FrontendAnimation maxWidth={250} height={180} />
      </Box>
    </Stack>
  ),
}

/**
 * Animations at various sizes for responsive design reference.
 */
export const SizeVariations: Story = {
  render: () => (
    <Stack spacing={4} sx={{ p: 4 }}>
      <Box>
        <Typography variant="subtitle2" mb={1}>
          Small (150px)
        </Typography>
        <Stack direction="row" spacing={4}>
          <BackendAnimation width="150px" height="100px" />
          <FrontendAnimation maxWidth={150} height={100} />
        </Stack>
      </Box>
      <Box>
        <Typography variant="subtitle2" mb={1}>
          Medium (250px)
        </Typography>
        <Stack direction="row" spacing={4}>
          <BackendAnimation width="250px" height="170px" />
          <FrontendAnimation maxWidth={250} height={170} />
        </Stack>
      </Box>
      <Box>
        <Typography variant="subtitle2" mb={1}>
          Large (400px)
        </Typography>
        <Stack direction="row" spacing={4}>
          <BackendAnimation width="400px" height="280px" />
          <FrontendAnimation maxWidth={400} height={280} />
        </Stack>
      </Box>
    </Stack>
  ),
}
