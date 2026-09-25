"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Stack, Chip } from "@mui/material"

/**
 * # Ticket Card Sub-Components
 * 
 * These internal components are used within the TicketCard component.
 * They are not currently exported from the main package but exist in
 * `packages/ui/points/components/ticket-card/`.
 */

const TicketCardSubComponentsDocumentation = () => {
  const subComponents = [
    {
      name: "DescriptionBar",
      file: "description-bar.component.tsx",
      description: "A decorative bar component used as a placeholder for description text. Supports default and longer bar variants.",
      props: ["useLongerBar?: boolean"],
    },
    {
      name: "TicketPoints (PointDisplay)",
      file: "point-display.component.tsx",
      description: "Displays the point value of a ticket with 'Point' or 'Points' label.",
      props: ["ticketPoints: TICKET_POINT_OPTIONS"],
    },
    {
      name: "XPLevelDisplay",
      file: "xp-level-display.component.tsx",
      description: "Shows the XP level associated with ticket points. Can display as 'XP Level: X' or 'Level X' with logo.",
      props: ["ticketPoints: TICKET_POINT_OPTIONS", "displayLevelVersion?: boolean"],
    },
    {
      name: "XPTierDisplay",
      file: "xp-tier-display.component.tsx",
      description: "Shows the XP tier/reward label based on point value with an engineering icon.",
      props: ["ticketPoints: TICKET_POINT_OPTIONS"],
    },
    {
      name: "XPMeter",
      file: "xp-meter.component.tsx",
      description: "Visual meter showing XP progress with tick marks for each level.",
      props: ["ticketPoints: TICKET_POINT_OPTIONS"],
    },
  ]

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom>
        Ticket Card Sub-Components
      </Typography>
      
      <Typography variant="body1" paragraph>
        These components are used internally within the TicketCard component to display
        various elements. They are located in <code>packages/ui/points/components/ticket-card/</code>.
      </Typography>

      <Chip label="Internal Components" color="info" sx={{ mb: 3 }} />

      <Stack spacing={2}>
        {subComponents.map((comp) => (
          <Paper key={comp.name} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {comp.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              {comp.file}
            </Typography>
            <Typography variant="body2" paragraph>
              {comp.description}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Props:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              {comp.props.map((prop) => (
                <li key={prop}>
                  <Typography variant="body2" component="span" sx={{ fontFamily: "monospace" }}>
                    {prop}
                  </Typography>
                </li>
              ))}
            </Box>
          </Paper>
        ))}
      </Stack>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "info.light" }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          TICKET_POINT_OPTIONS Enum
        </Typography>
        <Typography variant="body2">
          Available point options:
        </Typography>
        <Box component="pre" sx={{ bgcolor: "common.white", p: 2, borderRadius: 1, fontSize: 12, mt: 1 }}>
{`enum TICKET_POINT_OPTIONS {
  ONE_POINT = 1,
  TWO_POINTS = 2,
  THREE_POINTS = 3,
  FIVE_POINTS = 5,
  NINE_POINTS = 9,
  EIGHTEEN_POINTS = 18,
  EIGHTY_ONE_POINTS = 81,
}`}
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mt: 2, bgcolor: "warning.light" }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Export Status
        </Typography>
        <Typography variant="body2">
          These sub-components are not currently exported from the main package.
          Only <code>TicketCard</code> and <code>XPMeter</code> are exported.
          To use these components directly, they would need to be added to the
          ticket-card/index.ts exports.
        </Typography>
      </Paper>
    </Box>
  )
}

const meta: Meta<typeof TicketCardSubComponentsDocumentation> = {
  title: "Points/TicketCard/SubComponents",
  component: TicketCardSubComponentsDocumentation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Internal sub-components used within the TicketCard.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof TicketCardSubComponentsDocumentation>

export const Documentation: Story = {}
