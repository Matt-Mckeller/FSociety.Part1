import type { Meta, StoryObj } from "@storybook/react"
import { SectionSpacer } from "./layout/sectionSpacer.component"
import { Box, Typography } from "@mui/material"

/**
 * SectionSpacer provides consistent vertical spacing between sections.
 * Available sizes: xs (8px), small (16px), medium (32px), large (64px).
 */
const meta: Meta<typeof SectionSpacer> = {
  title: "Theme/Layout/SectionSpacer",
  component: SectionSpacer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "small", "medium", "large"],
      description: "Size of the vertical spacing",
    },
  },
}

export default meta
type Story = StoryObj<typeof SectionSpacer>

const DemoSection = ({ label }: { label: string }) => (
  <Box
    sx={{
      p: 2,
      bgcolor: "primary.main",
      color: "primary.contrastText",
      borderRadius: 1,
      textAlign: "center",
    }}
  >
    <Typography variant="body1">{label}</Typography>
  </Box>
)

/**
 * Extra small spacing (8px)
 */
export const ExtraSmall: Story = {
  args: {
    size: "xs",
  },
  render: (args) => (
    <Box>
      <DemoSection label="Section Above" />
      <SectionSpacer {...args} />
      <DemoSection label="Section Below (xs = 8px)" />
    </Box>
  ),
}

/**
 * Small spacing (16px)
 */
export const Small: Story = {
  args: {
    size: "small",
  },
  render: (args) => (
    <Box>
      <DemoSection label="Section Above" />
      <SectionSpacer {...args} />
      <DemoSection label="Section Below (small = 16px)" />
    </Box>
  ),
}

/**
 * Medium spacing (32px) - Default
 */
export const Medium: Story = {
  args: {
    size: "medium",
  },
  render: (args) => (
    <Box>
      <DemoSection label="Section Above" />
      <SectionSpacer {...args} />
      <DemoSection label="Section Below (medium = 32px)" />
    </Box>
  ),
}

/**
 * Large spacing (64px)
 */
export const Large: Story = {
  args: {
    size: "large",
  },
  render: (args) => (
    <Box>
      <DemoSection label="Section Above" />
      <SectionSpacer {...args} />
      <DemoSection label="Section Below (large = 64px)" />
    </Box>
  ),
}

/**
 * All sizes compared side by side
 */
export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: "flex", gap: 4 }}>
      {(["xs", "small", "medium", "large"] as const).map((size) => (
        <Box key={size} sx={{ flex: 1, minWidth: 150 }}>
          <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
            {size}
          </Typography>
          <DemoSection label="Above" />
          <SectionSpacer size={size} />
          <DemoSection label="Below" />
        </Box>
      ))}
    </Box>
  ),
}
