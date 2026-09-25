import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { ProjectExampleStepper } from "../../../../../../apps/personalNext/src/modules/content/career/project-example-stepper.component"

const meta: Meta<typeof ProjectExampleStepper> = {
  title: "PersonalNext/Career/ProjectExampleStepper",
  component: ProjectExampleStepper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A mobile stepper component that displays project examples with company information, descriptions, and icons. Features responsive height adjustments and themed styling.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ width: "800px", maxWidth: "100vw" }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default view of the project example stepper.
 * Navigate between different project examples using the stepper controls.
 */
export const Default: Story = {}

/**
 * Mobile viewport simulation showing responsive layout.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: "375px" }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Tablet viewport simulation.
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: "768px" }}>
        <Story />
      </Box>
    ),
  ],
}
