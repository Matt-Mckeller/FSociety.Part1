import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"
import { DescriptionBar } from "./description-bar.component"
import { TicketPoints } from "./point-display.component"
import { XPLevelDisplay } from "./xp-level-display.component"
import { XPTierDisplay } from "./xp-tier-display.component"
import { TICKET_POINT_OPTIONS } from "../../types/Points.types"

/**
 * Sub-components used within the TicketCard component.
 * These components handle specific parts of the ticket display.
 */
const meta: Meta = {
  title: "Points/TicketCard/SubComponents",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

// ============================================================================
// DescriptionBar
// ============================================================================

export const DescriptionBarDefault: StoryObj = {
  name: "DescriptionBar - Default",
  render: () => (
    <Box sx={{ bgcolor: "primary.main", p: 2, borderRadius: 1 }}>
      <Typography variant="caption" color="white" mb={1} display="block">
        Default width (90px)
      </Typography>
      <DescriptionBar />
      <DescriptionBar />
      <DescriptionBar />
    </Box>
  ),
}

export const DescriptionBarLonger: StoryObj = {
  name: "DescriptionBar - Longer",
  render: () => (
    <Box sx={{ bgcolor: "primary.main", p: 2, borderRadius: 1 }}>
      <Typography variant="caption" color="white" mb={1} display="block">
        Longer width (120px)
      </Typography>
      <DescriptionBar useLongerBar />
      <DescriptionBar useLongerBar />
      <DescriptionBar />
    </Box>
  ),
}

// ============================================================================
// TicketPoints (PointDisplay)
// ============================================================================

export const TicketPointsStory: StoryObj = {
  name: "TicketPoints - All Options",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Ticket Point Options</Typography>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}
      >
        <TicketPoints ticketPoints={TICKET_POINT_OPTIONS.ONE_POINT} />
        <TicketPoints ticketPoints={TICKET_POINT_OPTIONS.TWO_POINTS} />
        <TicketPoints ticketPoints={TICKET_POINT_OPTIONS.THREE_POINTS} />
        <TicketPoints ticketPoints={TICKET_POINT_OPTIONS.FIVE_POINTS} />
        <TicketPoints ticketPoints={TICKET_POINT_OPTIONS.NINE_POINTS} />
        <TicketPoints ticketPoints={TICKET_POINT_OPTIONS.EIGHTEEN_POINTS} />
        <TicketPoints ticketPoints={TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS} />
      </Box>
    </Box>
  ),
}

// ============================================================================
// XPLevelDisplay
// ============================================================================

export const XPLevelDisplayDefault: StoryObj = {
  name: "XPLevelDisplay - Default",
  render: () => (
    <Box
      sx={{ bgcolor: "primary.main", p: 2, borderRadius: 1, color: "white" }}
    >
      <Typography variant="caption" mb={1} display="block">
        XP Level Display (default)
      </Typography>
      <XPLevelDisplay ticketPoints={TICKET_POINT_OPTIONS.ONE_POINT} />
    </Box>
  ),
}

export const XPLevelDisplayWithLevel: StoryObj = {
  name: "XPLevelDisplay - Level Version",
  render: () => (
    <Box
      sx={{ bgcolor: "primary.main", p: 2, borderRadius: 1, color: "white" }}
    >
      <Typography variant="caption" mb={2} display="block">
        With displayLevelVersion=true
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <XPLevelDisplay
          displayLevelVersion={true}
          ticketPoints={TICKET_POINT_OPTIONS.ONE_POINT}
        />
        <XPLevelDisplay
          displayLevelVersion={true}
          ticketPoints={TICKET_POINT_OPTIONS.THREE_POINTS}
        />
        <XPLevelDisplay
          displayLevelVersion={true}
          ticketPoints={TICKET_POINT_OPTIONS.NINE_POINTS}
        />
        <XPLevelDisplay
          displayLevelVersion={true}
          ticketPoints={TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS}
        />
      </Box>
    </Box>
  ),
}

// ============================================================================
// XPTierDisplay
// ============================================================================

export const XPTierDisplayAllTiers: StoryObj = {
  name: "XPTierDisplay - All Tiers",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">XP Tier Display</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <XPTierDisplay ticketPoints={TICKET_POINT_OPTIONS.ONE_POINT} />
        <XPTierDisplay ticketPoints={TICKET_POINT_OPTIONS.TWO_POINTS} />
        <XPTierDisplay ticketPoints={TICKET_POINT_OPTIONS.THREE_POINTS} />
        <XPTierDisplay ticketPoints={TICKET_POINT_OPTIONS.FIVE_POINTS} />
        <XPTierDisplay ticketPoints={TICKET_POINT_OPTIONS.NINE_POINTS} />
        <XPTierDisplay ticketPoints={TICKET_POINT_OPTIONS.EIGHTEEN_POINTS} />
        <XPTierDisplay ticketPoints={TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS} />
      </Box>
    </Box>
  ),
}

// ============================================================================
// Gallery - All Sub-components
// ============================================================================

export const AllSubComponents: StoryObj = {
  name: "Gallery - All Sub-components",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
      <Typography variant="h5">Ticket Card Sub-components</Typography>

      <Box>
        <Typography variant="h6" mb={1}>
          DescriptionBar
        </Typography>
        <Box
          sx={{
            bgcolor: "primary.main",
            p: 2,
            borderRadius: 1,
            width: "fit-content",
          }}
        >
          <DescriptionBar />
          <DescriptionBar useLongerBar />
          <DescriptionBar />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" mb={1}>
          TicketPoints
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TicketPoints ticketPoints={TICKET_POINT_OPTIONS.ONE_POINT} />
          <TicketPoints ticketPoints={TICKET_POINT_OPTIONS.THREE_POINTS} />
          <TicketPoints ticketPoints={TICKET_POINT_OPTIONS.NINE_POINTS} />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" mb={1}>
          XPLevelDisplay
        </Typography>
        <Box
          sx={{
            bgcolor: "primary.main",
            p: 2,
            borderRadius: 1,
            color: "white",
            width: "fit-content",
          }}
        >
          <XPLevelDisplay
            displayLevelVersion={true}
            ticketPoints={TICKET_POINT_OPTIONS.FIVE_POINTS}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" mb={1}>
          XPTierDisplay
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <XPTierDisplay ticketPoints={TICKET_POINT_OPTIONS.THREE_POINTS} />
          <XPTierDisplay ticketPoints={TICKET_POINT_OPTIONS.NINE_POINTS} />
        </Box>
      </Box>
    </Box>
  ),
}
