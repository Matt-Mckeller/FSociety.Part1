import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

// Component implementation
interface AccordionItemProps {
  title: string
  detail: string
  defaultExpanded?: boolean
}

function AccordionItem({
  title,
  detail,
  defaultExpanded = false,
}: AccordionItemProps) {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        bgcolor: "#e3f2fd",
        borderLeft: "4px solid #4285f4",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          ✓ {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" sx={{ color: "#555" }}>
          {detail}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

const meta: Meta<typeof AccordionItem> = {
  title: "QuickWinsGuide/AccordionItem",
  component: AccordionItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A styled accordion component used for expandable content sections in the Quick Wins Guide. Features a checkmark prefix, blue accent border, and light blue background.",
      },
    },
  },
  argTypes: {
    title: {
      description: "The accordion header text",
      control: "text",
    },
    detail: {
      description: "The expandable content text",
      control: "text",
    },
    defaultExpanded: {
      description: "Whether the accordion is initially expanded",
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof AccordionItem>

export const Default: Story = {
  args: {
    title: 'Daily "Win of the Day" celebrating small successes',
    detail:
      "Share daily highlights to build momentum and positivity. Recognizing small wins creates a culture of appreciation and progress visibility.",
  },
}

export const Expanded: Story = {
  args: {
    title: "Questions Welcome tag to normalize asking for help",
    detail:
      "Create a visible signal that questions are encouraged, reducing fear of judgment and accelerating learning for new and experienced staff alike.",
    defaultExpanded: true,
  },
}

export const MultipleItems: Story = {
  render: () => (
    <Grid container spacing={2}>
      {[
        {
          title: 'Create a public company-wide channel for daily friendly conversation',
          detail:
            "Establish a dedicated space where managers model positive, casual interaction to normalize enjoyment and build connection across the team.",
        },
        {
          title: 'Share light, positive content to normalize enjoyment at work',
          detail:
            "Post uplifting, relatable content that helps remote teams feel connected and reminds everyone that work can be engaging and human.",
        },
        {
          title: 'Weekly "Shoutouts" for peer recognition',
          detail:
            "Enable teammates to publicly recognize each other's contributions, strengthening bonds and reinforcing helpful behaviors across the team.",
        },
      ].map((item, i) => (
        <Grid item xs={12} key={i}>
          <AccordionItem title={item.title} detail={item.detail} />
        </Grid>
      ))}
    </Grid>
  ),
}
