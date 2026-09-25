import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { ContactForm } from "expanse.ui/contact"

// ============================================================================
// ContactForm Stories
// ============================================================================

const meta: Meta<typeof ContactForm> = {
  title: "Contact/Screens/ContactForm",
  component: ContactForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Contact form with name, email, phone, and description fields. Used inside ContactModal. Includes validation and submit handling.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: 450,
          p: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Story />
      </Box>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ContactForm>

export const Empty: Story = {
  name: "Empty Form",
  parameters: {
    contact: {
      initialFormValues: {},
    },
  },
}

export const PartiallyFilled: Story = {
  name: "Partially Filled",
  parameters: {
    contact: {
      initialFormValues: {
        fullName: "Jane Smith",
        email: "jane@example.com",
      },
    },
  },
}

export const FullyFilled: Story = {
  name: "Fully Filled",
  parameters: {
    contact: {
      initialFormValues: {
        fullName: "Jane Smith",
        email: "jane@example.com",
        phoneNumber: "(555) 987-6543",
        description:
          "I'm interested in learning more about your services and would like to schedule a demo. Please reach out at your earliest convenience.",
      },
    },
  },
}

export const WithPhoneOnly: Story = {
  name: "Name and Phone Only",
  parameters: {
    contact: {
      initialFormValues: {
        fullName: "Robert Johnson",
        phoneNumber: "(555) 456-7890",
      },
    },
  },
}

export const LongDescription: Story = {
  name: "Long Description",
  parameters: {
    contact: {
      initialFormValues: {
        fullName: "Alice Williams",
        email: "alice.williams@company.com",
        phoneNumber: "(555) 111-2222",
        description:
          "I have been exploring various solutions for our team's needs and came across your platform. We are a mid-sized company looking for a comprehensive solution that can help streamline our workflows. I would appreciate the opportunity to discuss how your services could benefit our organization. Please let me know your availability for a call or demo session.",
      },
    },
  },
}
