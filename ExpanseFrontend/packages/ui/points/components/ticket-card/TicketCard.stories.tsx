import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { TicketCard } from "./ticket-card.component"
import { TICKET_POINT_OPTIONS } from "../../types/Points.types"

/**
 * TicketCard displays a styled card representing a task/ticket with
 * point-based complexity estimation. It shows XP meters,
 * tier levels, and point values.
 */
const meta: Meta<typeof TicketCard> = {
  title: "Points/TicketCard",
  component: TicketCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    ticketTitle: {
      control: "text",
      description: "Title displayed on the ticket card",
    },
    ticketPoints: {
      control: "select",
      options: Object.values(TICKET_POINT_OPTIONS).filter(
        (v) => typeof v === "number",
      ),
      description: "Complexity points for the ticket",
    },
    scaleFactor: {
      control: { type: "range", min: 0.5, max: 2, step: 0.1 },
      description: "Scale factor for the card size",
    },
    showCheckmark: {
      control: "boolean",
      description: "Whether to show a checkmark indicator",
    },
  },
}

export default meta
type Story = StoryObj<typeof TicketCard>

/**
 * Default ticket card with 3 points
 */
export const Default: Story = {
  args: {
    ticketTitle: "WEB APP DEVELOPMENT",
    ticketPoints: TICKET_POINT_OPTIONS.THREE_POINTS,
    scaleFactor: 1,
  },
}

/**
 * 1 Point - Simple task
 */
export const OnePoint: Story = {
  args: {
    ticketTitle: "BUG FIX",
    ticketPoints: TICKET_POINT_OPTIONS.ONE_POINT,
  },
}

/**
 * 5 Points - Medium complexity
 */
export const FivePoints: Story = {
  args: {
    ticketTitle: "FEATURE IMPLEMENTATION",
    ticketPoints: TICKET_POINT_OPTIONS.FIVE_POINTS,
  },
}

/**
 * 9 Points - High complexity
 */
export const NinePoints: Story = {
  args: {
    ticketTitle: "API INTEGRATION",
    ticketPoints: TICKET_POINT_OPTIONS.NINE_POINTS,
  },
}

/**
 * 18 Points - Very high complexity
 */
export const EighteenPoints: Story = {
  args: {
    ticketTitle: "SYSTEM REFACTOR",
    ticketPoints: TICKET_POINT_OPTIONS.EIGHTEEN_POINTS,
  },
}

/**
 * 81 Points - Needs simplification
 */
export const EightyOnePoints: Story = {
  args: {
    ticketTitle: "EPIC TASK",
    ticketPoints: TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS,
  },
}

/**
 * Scaled up version
 */
export const ScaledUp: Story = {
  args: {
    ticketTitle: "LARGE DISPLAY",
    ticketPoints: TICKET_POINT_OPTIONS.FIVE_POINTS,
    scaleFactor: 1.5,
  },
}

/**
 * All point levels showcase
 */
export const AllPointLevels: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      <TicketCard
        ticketPoints={TICKET_POINT_OPTIONS.ONE_POINT}
        scaleFactor={0.8}
      />
      <TicketCard
        ticketPoints={TICKET_POINT_OPTIONS.TWO_POINTS}
        scaleFactor={0.8}
      />
      <TicketCard
        ticketPoints={TICKET_POINT_OPTIONS.THREE_POINTS}
        scaleFactor={0.8}
      />
      <TicketCard
        ticketPoints={TICKET_POINT_OPTIONS.FIVE_POINTS}
        scaleFactor={0.8}
      />
      <TicketCard
        ticketPoints={TICKET_POINT_OPTIONS.NINE_POINTS}
        scaleFactor={0.8}
      />
      <TicketCard
        ticketPoints={TICKET_POINT_OPTIONS.EIGHTEEN_POINTS}
        scaleFactor={0.8}
      />
      <TicketCard
        ticketPoints={TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS}
        scaleFactor={0.8}
      />
    </div>
  ),
}
