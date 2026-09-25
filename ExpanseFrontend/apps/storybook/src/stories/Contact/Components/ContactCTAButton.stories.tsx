import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography } from "@mui/material"
import { ContactCTAButton } from "expanse.ui/contact"

// ============================================================================
// ContactCTAButton Stories
// ============================================================================

const meta: Meta<typeof ContactCTAButton> = {
  title: "Contact/Components/ContactCTAButton",
  component: ContactCTAButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button that opens the contact modal (on desktop) or navigates to contact page (on mobile). Used throughout the site for lead capture.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["contained", "outlined", "text"],
      description: "MUI Button variant",
    },
    textVariant: {
      control: "select",
      options: ["touch", "contact"],
      description: "Which dictionary text to display",
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

type Story = StoryObj<typeof ContactCTAButton>

export const Default: Story = {
  name: "Default (Text Variant)",
  args: {
    eventName: "contact-cta-click",
    variant: "text",
    textVariant: "contact",
  },
}

export const Contained: Story = {
  name: "Contained",
  args: {
    eventName: "contact-cta-click",
    variant: "contained",
    textVariant: "contact",
  },
}

export const Outlined: Story = {
  name: "Outlined",
  args: {
    eventName: "contact-cta-click",
    variant: "outlined",
    textVariant: "contact",
  },
}

export const TouchText: Story = {
  name: 'Touch Text ("Get In Touch")',
  args: {
    eventName: "contact-cta-click",
    variant: "contained",
    textVariant: "touch",
  },
}

export const WithIcon: Story = {
  name: "With Icon",
  args: {
    eventName: "contact-cta-click",
    variant: "contained",
    textVariant: "contact",
    displayIcon: true,
  },
}

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Contact Text - Contained
        </Typography>
        <ContactCTAButton
          eventName="contact-cta-click"
          variant="contained"
          textVariant="contact"
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Touch Text - Contained
        </Typography>
        <ContactCTAButton
          eventName="contact-cta-click"
          variant="contained"
          textVariant="touch"
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          With Icon - Outlined
        </Typography>
        <ContactCTAButton
          eventName="contact-cta-click"
          variant="outlined"
          textVariant="contact"
          displayIcon
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Text Variant
        </Typography>
        <ContactCTAButton
          eventName="contact-cta-click"
          variant="text"
          textVariant="contact"
        />
      </Box>
    </Stack>
  ),
}
