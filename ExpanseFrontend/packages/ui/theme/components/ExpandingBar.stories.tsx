import type { Meta, StoryObj } from "@storybook/react"
import { ExpandingBar } from "./ExpandingBar.component"
import { Box, Typography } from "@mui/material"

/**
 * ExpandingBar creates a decorative bar container with rounded ends and
 * layered primary color styling. Uses SVG with foreignObject for content.
 */
const meta: Meta<typeof ExpandingBar> = {
  title: "Theme/ExpandingBar",
  component: ExpandingBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    aspectRatio: {
      control: { type: "range", min: 2, max: 12, step: 0.5 },
      description:
        "Aspect ratio of the bar (width:height). Higher values = wider bar.",
    },
  },
}

export default meta
type Story = StoryObj<typeof ExpandingBar>

/**
 * Default expanding bar with 4:1 aspect ratio
 */
export const Default: Story = {
  args: {
    aspectRatio: 4,
  },
  render: (args) => (
    <Box sx={{ height: 60, width: "100%", maxWidth: 400 }}>
      <ExpandingBar {...args}>
        <Typography
          sx={{
            color: "common.white",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Content
        </Typography>
      </ExpandingBar>
    </Box>
  ),
}

/**
 * Wide bar with 8:1 aspect ratio
 */
export const WideBar: Story = {
  args: {
    aspectRatio: 8,
  },
  render: (args) => (
    <Box sx={{ height: 50, width: "100%", maxWidth: 600 }}>
      <ExpandingBar {...args}>
        <Typography
          sx={{
            color: "common.white",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Wide Bar Content
        </Typography>
      </ExpandingBar>
    </Box>
  ),
}

/**
 * Compact bar with 2:1 aspect ratio
 */
export const CompactBar: Story = {
  args: {
    aspectRatio: 2,
  },
  render: (args) => (
    <Box sx={{ height: 80, width: 200 }}>
      <ExpandingBar {...args}>
        <Typography
          sx={{
            color: "common.white",
            fontWeight: 700,
            textAlign: "center",
            fontSize: "0.875rem",
          }}
        >
          Compact
        </Typography>
      </ExpandingBar>
    </Box>
  ),
}

/**
 * Bar with number content (like a score display)
 */
export const WithNumber: Story = {
  args: {
    aspectRatio: 3,
  },
  render: (args) => (
    <Box sx={{ height: 70, width: 250 }}>
      <ExpandingBar {...args}>
        <Typography
          sx={{
            color: "common.white",
            fontWeight: 800,
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          1,250 XP
        </Typography>
      </ExpandingBar>
    </Box>
  ),
}

/**
 * Multiple bars at different sizes
 */
export const MultipleSizes: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}>
      <Box sx={{ height: 40 }}>
        <ExpandingBar aspectRatio={8}>
          <Typography sx={{ color: "common.white", fontWeight: 600 }}>
            Wide (8:1)
          </Typography>
        </ExpandingBar>
      </Box>
      <Box sx={{ height: 50 }}>
        <ExpandingBar aspectRatio={6}>
          <Typography sx={{ color: "common.white", fontWeight: 600 }}>
            Medium (6:1)
          </Typography>
        </ExpandingBar>
      </Box>
      <Box sx={{ height: 60 }}>
        <ExpandingBar aspectRatio={4}>
          <Typography sx={{ color: "common.white", fontWeight: 600 }}>
            Standard (4:1)
          </Typography>
        </ExpandingBar>
      </Box>
    </Box>
  ),
}
