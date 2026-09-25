import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography } from "@mui/material"
import {
  CalendlyCTAButton,
  ContactCTAButton,
  ContactCTAEduButton,
} from "expanse.ui/contact"

// ============================================================================
// CalendlyCTAButton Stories
// ============================================================================

const CalendlyMeta: Meta<typeof CalendlyCTAButton> = {
  title: "Contact/Components/CalendlyCTAButton",
  component: CalendlyCTAButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button that opens Calendly for scheduling discovery calls. Links to an external Calendly URL.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["contained", "outlined", "text"],
      description: "MUI Button variant",
    },
    text: {
      control: "text",
      description: "Custom button text (overrides dictionary default)",
    },
    eventName: {
      control: "text",
      description: "Analytics event name to track",
    },
  },
}

export default CalendlyMeta

type CalendlyStory = StoryObj<typeof CalendlyCTAButton>

export const Contained: CalendlyStory = {
  name: "Contained",
  args: {
    variant: "contained",
  },
}

export const Outlined: CalendlyStory = {
  name: "Outlined",
  args: {
    variant: "outlined",
  },
}

export const Text: CalendlyStory = {
  name: "Text",
  args: {
    variant: "text",
  },
}

export const CustomText: CalendlyStory = {
  name: "Custom Text",
  args: {
    variant: "contained",
    text: "Book a Demo",
  },
}

export const AllVariants: CalendlyStory = {
  name: "All Variants",
  render: () => (
    <Stack spacing={2} alignItems="center">
      <Typography variant="subtitle2" color="text.secondary">
        Contained
      </Typography>
      <CalendlyCTAButton variant="contained" />

      <Typography variant="subtitle2" color="text.secondary">
        Outlined
      </Typography>
      <CalendlyCTAButton variant="outlined" />

      <Typography variant="subtitle2" color="text.secondary">
        Text
      </Typography>
      <CalendlyCTAButton variant="text" />
    </Stack>
  ),
}
