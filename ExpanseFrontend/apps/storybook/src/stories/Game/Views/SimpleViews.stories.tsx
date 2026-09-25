import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import {
  CharacterPushingBar,
  TicketWithCharactersOnTop,
  PushingProgressStaticSample,
  TicketEventSampleDisplay,
} from "expanse.ui/game"

/**
 * Simple view components that combine characters, progress bars, and ticket elements
 * These are decorative/display components with no props or minimal configuration
 */
const meta: Meta = {
  title: "Game/Views/SimpleViews",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Collection of simple display components combining characters, progress elements, and tickets.",
      },
    },
  },
}

export default meta

// =============================================================================
// CharacterPushingBar Stories
// =============================================================================

/**
 * Character pushing a progress bar - combines StaticCharacter with ProgressBar
 */
export const CharacterPushingBarDefault: StoryObj = {
  render: () => (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <CharacterPushingBar />
    </Box>
  ),
  name: "CharacterPushingBar - Default",
}

export const CharacterPushingBarScaled: StoryObj = {
  render: () => (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Box sx={{ transform: "scale(2)", transformOrigin: "center" }}>
        <CharacterPushingBar />
      </Box>
    </Box>
  ),
  name: "CharacterPushingBar - Scaled Up",
}

// =============================================================================
// TicketWithCharactersOnTop Stories
// =============================================================================

/**
 * Ticket card with decorative characters positioned on top
 */
export const TicketWithCharactersDefault: StoryObj = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <TicketWithCharactersOnTop />
    </Box>
  ),
  name: "TicketWithCharactersOnTop - Default",
}

// =============================================================================
// PushingProgressStaticSample Stories
// =============================================================================

/**
 * Static sample showing characters on either side of progress bar
 */
export const PushingProgressStaticDefault: StoryObj = {
  render: () => (
    <Box sx={{ p: 4, maxWidth: 600 }}>
      <PushingProgressStaticSample />
    </Box>
  ),
  name: "PushingProgressStaticSample - Default",
}

export const PushingProgressStaticCompact: StoryObj = {
  render: () => (
    <Box sx={{ p: 2, maxWidth: 400 }}>
      <PushingProgressStaticSample />
    </Box>
  ),
  name: "PushingProgressStaticSample - Compact",
}

// =============================================================================
// TicketEventSampleDisplay Stories
// =============================================================================

/**
 * Simple ticket event display component
 */
export const TicketEventSampleDefault: StoryObj = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <TicketEventSampleDisplay />
    </Box>
  ),
  name: "TicketEventSampleDisplay - Default",
}
