import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { StandardUIComponents } from "../../../../../../apps/personalNext/src/modules/content/samples/StandardUiComponents.component"

const meta: Meta<typeof StandardUIComponents> = {
  title: "PersonalNext/Samples/StandardUIComponents",
  component: StandardUIComponents,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A showcase grid of standard MUI components including Autocomplete, Buttons, Menus, Badges, Progress bars, and Date pickers. Demonstrates common UI patterns.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ width: "900px", maxWidth: "100vw", p: 2 }}>
          <Story />
        </Box>
      </LocalizationProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default grid layout showing all standard UI components.
 */
export const Default: Story = {}

/**
 * Mobile layout showing responsive behavior.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ width: "375px", p: 2 }}>
          <Story />
        </Box>
      </LocalizationProvider>
    ),
  ],
}

/**
 * Tablet layout.
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ width: "768px", p: 2 }}>
          <Story />
        </Box>
      </LocalizationProvider>
    ),
  ],
}
