import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography } from "@mui/material"
import { ContactCTAEduButton } from "expanse.ui/contact"

// ============================================================================
// ContactCTAEduButton Stories
// ============================================================================

const meta: Meta<typeof ContactCTAEduButton> = {
  title: "Contact/Components/ContactCTAEduButton",
  component: ContactCTAEduButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Education-specific contact CTA button. Displays "Contact Us" text and opens the contact modal.',
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["contained", "outlined", "text"],
      description: "MUI Button variant",
    },
    displayIcon: {
      control: "boolean",
      description: "Whether to show the power icon",
    },
    eventName: {
      control: "text",
      description: "Analytics event name to track",
    },
  },
}

export default meta

type Story = StoryObj<typeof ContactCTAEduButton>

export const Default: Story = {
  name: "Default (Text Variant)",
  args: {
    eventName: "contact-edu-click",
    variant: "text",
  },
}

export const Contained: Story = {
  name: "Contained",
  args: {
    eventName: "contact-edu-click",
    variant: "contained",
  },
}

export const Outlined: Story = {
  name: "Outlined",
  args: {
    eventName: "contact-edu-click",
    variant: "outlined",
  },
}

export const WithIcon: Story = {
  name: "With Icon",
  args: {
    eventName: "contact-edu-click",
    variant: "contained",
    displayIcon: true,
  },
}

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Contained
        </Typography>
        <ContactCTAEduButton
          eventName="contact-edu-click"
          variant="contained"
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Outlined
        </Typography>
        <ContactCTAEduButton
          eventName="contact-edu-click"
          variant="outlined"
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          With Icon
        </Typography>
        <ContactCTAEduButton
          eventName="contact-edu-click"
          variant="contained"
          displayIcon
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Text
        </Typography>
        <ContactCTAEduButton
          eventName="contact-edu-click"
          variant="text"
        />
      </Box>
    </Stack>
  ),
}
