import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack } from "@mui/material"

import { ExpandingBorderBox } from "../../../../../../apps/personalNext/src/modules/marketing/components/ExpandingBorderBox"

/**
 * Expanding Border Box creates a decorative nested border effect.
 * Used in marketing materials and business cards for visual interest.
 */
const meta: Meta<typeof ExpandingBorderBox> = {
  title: "PersonalNext/Marketing/ExpandingBorderBox",
  component: ExpandingBorderBox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A decorative container with three nested borders that create an expanding visual effect. The border sizes scale proportionally from the largest border size parameter.",
      },
    },
  },
  argTypes: {
    largestBorderSize: {
      control: { type: "number", min: 2, max: 20, step: 1 },
      description: "The size of the outermost/largest border in pixels",
    },
  },
}

export default meta
type Story = StoryObj<typeof ExpandingBorderBox>

/**
 * Default expanding border box with sample content.
 */
export const Default: Story = {
  args: {
    largestBorderSize: 9,
  },
  render: (args) => (
    <Box sx={{ width: 400, height: 300 }}>
      <ExpandingBorderBox {...args}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          p={4}
        >
          <Typography variant="h5" textAlign="center">
            Content Area
          </Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}

/**
 * Small border variation.
 */
export const SmallBorders: Story = {
  args: {
    largestBorderSize: 4,
  },
  render: (args) => (
    <Box sx={{ width: 300, height: 200 }}>
      <ExpandingBorderBox {...args}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          p={2}
        >
          <Typography variant="body1" textAlign="center">
            Subtle borders
          </Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}

/**
 * Large border variation for emphasis.
 */
export const LargeBorders: Story = {
  args: {
    largestBorderSize: 16,
  },
  render: (args) => (
    <Box sx={{ width: 500, height: 350 }}>
      <ExpandingBorderBox {...args}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          p={4}
        >
          <Typography variant="h4" textAlign="center">
            Bold Statement
          </Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}

/**
 * Business card sized example.
 */
export const BusinessCardSize: Story = {
  args: {
    largestBorderSize: 9,
  },
  render: (args) => (
    <Box sx={{ width: 350, height: 200 }}>
      <ExpandingBorderBox {...args}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          p={2}
        >
          <Typography variant="h6">Matthew McKeller</Typography>
          <Typography variant="body2">Software Developer</Typography>
        </Box>
      </ExpandingBorderBox>
    </Box>
  ),
}

/**
 * Comparison of different border sizes.
 */
export const BorderSizeComparison: Story = {
  render: () => (
    <Stack spacing={4} alignItems="center">
      {[4, 8, 12, 16].map((size) => (
        <Box key={size} sx={{ width: 250, height: 150 }}>
          <ExpandingBorderBox largestBorderSize={size}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
            >
              <Typography variant="body2">Border: {size}px</Typography>
            </Box>
          </ExpandingBorderBox>
        </Box>
      ))}
    </Stack>
  ),
}
