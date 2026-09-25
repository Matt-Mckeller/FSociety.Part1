import type { Meta, StoryObj } from "@storybook/react"
import { CloseModalButton } from "./CloseModalButton.component"
import { Box, Paper, Typography } from "@mui/material"
import { action } from "@storybook/addon-actions"

/**
 * CloseModalButton displays a circular close (X) button typically used
 * in modal headers. Features hover state with background highlight.
 */
const meta: Meta<typeof CloseModalButton> = {
  title: "Theme/CloseModalButton",
  component: CloseModalButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    handleClose: {
      action: "closed",
      description: "Callback function when the close button is clicked",
    },
  },
}

export default meta
type Story = StoryObj<typeof CloseModalButton>

/**
 * Default close button
 */
export const Default: Story = {
  args: {
    handleClose: action("close clicked"),
  },
}

/**
 * Close button in a modal header context
 */
export const InModalHeader: Story = {
  args: {
    handleClose: action("close clicked"),
  },
  render: (args) => (
    <Paper sx={{ width: 400, p: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6">Modal Title</Typography>
        <CloseModalButton {...args} />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2">
          Modal content would go here...
        </Typography>
      </Box>
    </Paper>
  ),
}

/**
 * Close button on dark background
 */
export const OnDarkBackground: Story = {
  args: {
    handleClose: action("close clicked"),
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          p: 4,
          bgcolor: "grey.800",
          borderRadius: 2,
        }}
      >
        <Story />
      </Box>
    ),
  ],
}

/**
 * Multiple close buttons showing hover state
 */
export const MultipleStates: Story = {
  render: () => (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Box sx={{ textAlign: "center" }}>
        <CloseModalButton handleClose={action("close 1")} />
        <Typography variant="caption" display="block">
          Default
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        Hover over the button to see the highlight effect
      </Typography>
    </Box>
  ),
}
