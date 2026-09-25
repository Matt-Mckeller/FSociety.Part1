import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"
import { ContactModal, ContactCTAButton } from "expanse.ui/contact"

// ============================================================================
// ContactModal Stories
// ============================================================================

const meta: Meta<typeof ContactModal> = {
  title: "Contact/Components/ContactModal",
  component: ContactModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal dialog containing the contact form. Opens via ContactCTAButton on desktop, or navigates to a contact page on mobile.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ContactModal>

export const ClosedWithTrigger: Story = {
  name: "Closed (with CTA trigger)",
  parameters: {
    contact: { isModalOpen: false },
  },
  render: () => (
    <Box textAlign="center">
      <Typography variant="body2" color="text.secondary" mb={2}>
        Click the button to open the contact modal
      </Typography>
      <ContactCTAButton
        eventName="contact-cta-click"
        variant="contained"
        textVariant="contact"
      />
      <ContactModal />
    </Box>
  ),
}

export const Open: Story = {
  name: "Open (Empty Form)",
  parameters: {
    contact: { isModalOpen: true },
  },
  render: () => <ContactModal />,
}

export const OpenWithPrefilledData: Story = {
  name: "Open (Pre-filled Data)",
  parameters: {
    contact: {
      isModalOpen: true,
      initialFormValues: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "(555) 123-4567",
      },
    },
  },
  render: () => <ContactModal />,
}

export const OpenWithFullForm: Story = {
  name: "Open (Fully Filled)",
  parameters: {
    contact: {
      isModalOpen: true,
      initialFormValues: {
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        phoneNumber: "(555) 987-6543",
        description:
          "I'm interested in learning more about your services and would like to schedule a demo.",
      },
    },
  },
  render: () => <ContactModal />,
}
