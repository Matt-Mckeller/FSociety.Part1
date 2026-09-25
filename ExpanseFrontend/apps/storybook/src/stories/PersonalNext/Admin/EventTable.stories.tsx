import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"

import { EventTable } from "../../../../../../apps/personalNext/src/modules/admin/EventTable.component"

// Sample analytics event data for the story
const sampleEvents = [
  {
    id: "1",
    event: "page_view",
    pageUrl: "https://expanseservices.com/",
    eventTimestamp: "2026-01-21T10:30:00Z",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    ipAddress: "192.168.1.1",
    params: '{"referrer": "google.com"}',
    userId: "user_123",
    metrics: '{"loadTime": 1.2}',
    deviceContext: '{"device": "desktop", "browser": "Chrome"}',
    createdAt: "2026-01-21T10:30:00Z",
    updatedAt: "2026-01-21T10:30:00Z",
    sessionId: "session_abc123",
  },
  {
    id: "2",
    event: "button_click",
    pageUrl: "https://expanseservices.com/contact",
    eventTimestamp: "2026-01-21T10:35:00Z",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0)",
    ipAddress: "192.168.1.2",
    params: '{"buttonId": "contact-submit"}',
    userId: "user_456",
    metrics: '{"clickX": 150, "clickY": 300}',
    deviceContext: '{"device": "mobile", "browser": "Safari"}',
    createdAt: "2026-01-21T10:35:00Z",
    updatedAt: "2026-01-21T10:35:00Z",
    sessionId: "session_def456",
  },
  {
    id: "3",
    event: "form_submit",
    pageUrl: "https://expanseservices.com/contact",
    eventTimestamp: "2026-01-21T10:40:00Z",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    ipAddress: "192.168.1.3",
    params: '{"formId": "contact-form", "success": true}',
    userId: "user_789",
    metrics: '{"formFillTime": 45.2}',
    deviceContext: '{"device": "desktop", "browser": "Firefox"}',
    createdAt: "2026-01-21T10:40:00Z",
    updatedAt: "2026-01-21T10:40:00Z",
    sessionId: "session_ghi789",
  },
  {
    id: "4",
    event: "scroll_depth",
    pageUrl: "https://expanseservices.com/process",
    eventTimestamp: "2026-01-21T11:00:00Z",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    ipAddress: "192.168.1.4",
    params: '{"depth": 75}',
    userId: null,
    metrics: '{"timeOnPage": 120}',
    deviceContext: '{"device": "desktop", "browser": "Chrome"}',
    createdAt: "2026-01-21T11:00:00Z",
    updatedAt: "2026-01-21T11:00:00Z",
    sessionId: "session_jkl012",
  },
  {
    id: "5",
    event: "error",
    pageUrl: "https://expanseservices.com/api-explorer",
    eventTimestamp: "2026-01-21T11:15:00Z",
    userAgent: "Mozilla/5.0 (Linux; Android 11)",
    ipAddress: "192.168.1.5",
    params: '{"errorCode": 500, "message": "Server error"}',
    userId: "user_123",
    metrics: null,
    deviceContext: '{"device": "mobile", "browser": "Chrome"}',
    createdAt: "2026-01-21T11:15:00Z",
    updatedAt: "2026-01-21T11:15:00Z",
    sessionId: "session_mno345",
  },
]

/**
 * Event Table displays analytics events in a sortable, filterable table.
 * Used in the admin section to monitor site activity.
 */
const meta: Meta<typeof EventTable> = {
  title: "PersonalNext/Admin/EventTable",
  component: EventTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Admin analytics table with sortable columns, search filtering, pagination, and column visibility toggles. Supports i18n with English and Spanish labels.",
      },
    },
  },
  argTypes: {
    dataArray: {
      control: false,
      description: "Array of analytics event objects",
    },
    language: {
      control: { type: "select" },
      options: ["en", "es"],
      description: "Language for column labels",
    },
  },
}

export default meta
type Story = StoryObj<typeof EventTable>

/**
 * Default event table with sample data.
 */
export const Default: Story = {
  args: {
    dataArray: sampleEvents,
    language: "en",
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%", p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Event table in Spanish.
 */
export const Spanish: Story = {
  args: {
    dataArray: sampleEvents,
    language: "es",
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%", p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Event table with empty data state.
 */
export const EmptyState: Story = {
  args: {
    dataArray: [],
    language: "en",
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%", p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Event table in a compact/narrow container.
 */
export const CompactView: Story = {
  args: {
    dataArray: sampleEvents.slice(0, 3),
    language: "en",
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 800, p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}
