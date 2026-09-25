import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Grid } from "@mui/material"
import { ProfileDisplay } from "./ProfileDisplay"
import { TicketWithCharactersOnTop } from "./TicketWithCharactersOnTop"
import { TicketEventSampleDisplay } from "./TicketEventSampleDisplay"

/**
 * Game View components that combine multiple UI elements into complete views.
 * These are larger composite components used in the game interface.
 */
const meta: Meta = {
  title: "Game/Views/Composite",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}

export default meta

// ============================================================================
// ProfileDisplay
// ============================================================================

export const ProfileDisplayDefault: StoryObj = {
  name: "ProfileDisplay - Default",
  render: () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Profile Display with Labels
      </Typography>
      <ProfileDisplay
        enableLabels={true}
        barHeight={50}
        displayIcons={false}
      />
    </Box>
  ),
}

export const ProfileDisplayWithIcons: StoryObj = {
  name: "ProfileDisplay - With Icons",
  render: () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Profile Display with Icons
      </Typography>
      <ProfileDisplay
        enableLabels={true}
        barHeight={50}
        displayIcons={true}
      />
    </Box>
  ),
}

export const ProfileDisplayMinimal: StoryObj = {
  name: "ProfileDisplay - Minimal",
  render: () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Profile Display (No Labels)
      </Typography>
      <ProfileDisplay
        enableLabels={false}
        barHeight={40}
        displayIcons={false}
      />
    </Box>
  ),
}

// ============================================================================
// TicketWithCharactersOnTop
// ============================================================================

export const TicketWithCharactersOnTopStory: StoryObj = {
  name: "TicketWithCharactersOnTop",
  render: () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Ticket Card with Character Decorations
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        A ticket card with animated characters positioned on top for a playful
        presentation.
      </Typography>
      <TicketWithCharactersOnTop />
    </Box>
  ),
}

// ============================================================================
// TicketEventSampleDisplay
// ============================================================================

export const TicketEventSampleDisplayStory: StoryObj = {
  name: "TicketEventSampleDisplay",
  render: () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Ticket Event Sample Display
      </Typography>
      <TicketEventSampleDisplay />
    </Box>
  ),
}

// ============================================================================
// Gallery - All Views
// ============================================================================

export const AllViews: StoryObj = {
  name: "Gallery - All Composite Views",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
      <Typography variant="h4">Game Composite Views</Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          ProfileDisplay
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Displays player level, currency, and experience with optional labels
          and icons.
        </Typography>
        <ProfileDisplay enableLabels={true} displayIcons={true} />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          TicketWithCharactersOnTop
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Ticket card with decorative characters.
        </Typography>
        <TicketWithCharactersOnTop />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          TicketEventSampleDisplay
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Sample ticket event display.
        </Typography>
        <TicketEventSampleDisplay />
      </Paper>
    </Box>
  ),
}
