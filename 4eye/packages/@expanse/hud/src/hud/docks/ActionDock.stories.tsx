/**
 * ActionDock Stories
 *
 * Demonstrates ActionDock as a pure positioning component.
 * ActionDock places its children at fixed screen positions.
 * Use ActionBar inside ActionDock for visual styling.
 */

import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Box, Typography, Stack } from "@mui/material"

// Icons
import AddIcon from "@mui/icons-material/Add"
import ChatIcon from "@mui/icons-material/Chat"
import HistoryIcon from "@mui/icons-material/History"
import HomeIcon from "@mui/icons-material/Home"
import SettingsIcon from "@mui/icons-material/Settings"
import HelpIcon from "@mui/icons-material/Help"
import NotificationsIcon from "@mui/icons-material/Notifications"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import EditIcon from "@mui/icons-material/Edit"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import ZoomOutIcon from "@mui/icons-material/ZoomOut"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"

import { ActionDock } from "./ActionDock"
import { ActionBar } from "../../hud-components/action-bars"
import { ActionButton } from "../../hud-components/action-button"
import { ActionGroup } from "../../hud-components/action-group"

// =============================================================================
// Meta
// =============================================================================

const meta: Meta<typeof ActionDock> = {
  title: "Layout Systems/HUD Components/ActionDock",
  component: ActionDock,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
    docs: {
      description: {
        component: `
# ActionDock - Screen Positioning

ActionDock is a pure positioning component for HUD elements.

**What ActionDock handles:**
- Fixed screen positioning
- 9 position options (4 corners, 4 edge centers, center)
- Offset from edges
- Attached vs floating mode

**What ActionDock does NOT handle:**
- Visual styling → use \`ActionBar\`
- Selection behavior → use \`ActionGroup\`

**Positions:**
- Corners: \`top-left\`, \`top-right\`, \`bottom-left\`, \`bottom-right\`
- Edge centers: \`top-center\`, \`bottom-center\`, \`left-center\`, \`right-center\`
- Center: \`center\`
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left", "top-center", "top-right",
        "left-center", "center", "right-center",
        "bottom-left", "bottom-center", "bottom-right",
      ],
    },
    offset: {
      control: { type: "number", min: 0, max: 100, step: 4 },
    },
    attached: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: "100vw", height: "100vh", position: "relative", bgcolor: "#f5f5f5" }}>
        <Story />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        >
          <Typography variant="h4">Canvas Area</Typography>
          <Typography variant="body2">ActionDock positions elements around this space</Typography>
        </Box>
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ActionDock>

// =============================================================================
// Position Overview
// =============================================================================

/**
 * All 9 positions at once
 */
export const AllPositions: Story = {
  render: () => (
    <>
      <ActionDock position="top-left">
        <ActionBar variant="outlined" padding={4}>
          <ActionButton icon={<MenuIcon />} label="TL" size="sm" />
        </ActionBar>
      </ActionDock>

      <ActionDock position="top-center">
        <ActionBar variant="outlined" padding={4}>
          <ActionButton icon={<MenuIcon />} label="TC" size="sm" />
        </ActionBar>
      </ActionDock>

      <ActionDock position="top-right">
        <ActionBar variant="outlined" padding={4}>
          <ActionButton icon={<MenuIcon />} label="TR" size="sm" />
        </ActionBar>
      </ActionDock>

      <ActionDock position="left-center">
        <ActionBar variant="outlined" padding={4} orientation="vertical">
          <ActionButton icon={<MenuIcon />} label="LC" size="sm" />
        </ActionBar>
      </ActionDock>

      <ActionDock position="center">
        <ActionBar variant="outlined" padding={4}>
          <ActionButton icon={<MenuIcon />} label="C" size="sm" />
        </ActionBar>
      </ActionDock>

      <ActionDock position="right-center">
        <ActionBar variant="outlined" padding={4} orientation="vertical">
          <ActionButton icon={<MenuIcon />} label="RC" size="sm" />
        </ActionBar>
      </ActionDock>

      <ActionDock position="bottom-left">
        <ActionBar variant="outlined" padding={4}>
          <ActionButton icon={<MenuIcon />} label="BL" size="sm" />
        </ActionBar>
      </ActionDock>

      <ActionDock position="bottom-center">
        <ActionBar variant="outlined" padding={4}>
          <ActionButton icon={<MenuIcon />} label="BC" size="sm" />
        </ActionBar>
      </ActionDock>

      <ActionDock position="bottom-right">
        <ActionBar variant="outlined" padding={4}>
          <ActionButton icon={<MenuIcon />} label="BR" size="sm" />
        </ActionBar>
      </ActionDock>
    </>
  ),
}

// =============================================================================
// Corner Positions
// =============================================================================

/**
 * Bottom-right - chat/quick actions (most common)
 */
export const BottomRight: Story = {
  render: () => (
    <ActionDock position="bottom-right">
      <ActionBar variant="frosted" orientation="vertical">
        <ActionButton icon={<AddIcon />} label="New" />
        <ActionButton icon={<ChatIcon />} label="Chat" badge={3} />
        <ActionButton icon={<HistoryIcon />} label="History" />
      </ActionBar>
    </ActionDock>
  ),
}

/**
 * Top-left - menu/navigation
 */
export const TopLeft: Story = {
  render: () => (
    <ActionDock position="top-left">
      <ActionBar variant="glass">
        <ActionButton icon={<MenuIcon />} label="Menu" />
        <ActionButton icon={<HomeIcon />} label="Home" />
        <ActionButton icon={<SearchIcon />} label="Search" />
      </ActionBar>
    </ActionDock>
  ),
}

/**
 * Top-right - account/notifications
 */
export const TopRight: Story = {
  render: () => (
    <ActionDock position="top-right">
      <ActionBar variant="solid">
        <ActionButton icon={<NotificationsIcon />} label="Notifications" badge={5} />
        <ActionButton icon={<AccountCircleIcon />} label="Account" />
        <ActionButton icon={<SettingsIcon />} label="Settings" />
      </ActionBar>
    </ActionDock>
  ),
}

/**
 * Bottom-left - help/support
 */
export const BottomLeft: Story = {
  render: () => (
    <ActionDock position="bottom-left">
      <ActionBar variant="minimal" orientation="vertical">
        <ActionButton icon={<HelpIcon />} label="Help" />
      </ActionBar>
    </ActionDock>
  ),
}

// =============================================================================
// Edge Center Positions
// =============================================================================

/**
 * Bottom-center - main toolbar
 */
export const BottomCenter: Story = {
  render: () => {
    const [tool, setTool] = useState("edit")

    return (
      <ActionDock position="bottom-center">
        <ActionBar variant="frosted">
          <ActionGroup mode="radio" value={tool} onChange={setTool} indicator="underline">
            <ActionButton icon={<EditIcon />} label="Edit" value="edit" />
            <ActionButton icon={<SearchIcon />} label="Search" value="search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" value="settings" />
          </ActionGroup>
        </ActionBar>
      </ActionDock>
    )
  },
}

/**
 * Top-center - navigation breadcrumb
 */
export const TopCenter: Story = {
  render: () => (
    <ActionDock position="top-center">
      <ActionBar variant="glass">
        <ActionButton icon={<HomeIcon />} label="Home" labelDisplay="icon-label-right" />
        <ActionButton icon={<SearchIcon />} label="Search" labelDisplay="icon-label-right" />
      </ActionBar>
    </ActionDock>
  ),
}

/**
 * Left-center - tool palette
 */
export const LeftCenter: Story = {
  render: () => {
    const [tool, setTool] = useState("edit")

    return (
      <ActionDock position="left-center">
        <ActionBar variant="solid" orientation="vertical">
          <ActionGroup mode="radio" value={tool} onChange={setTool}>
            <ActionButton icon={<EditIcon />} label="Edit" value="edit" />
            <ActionButton icon={<SearchIcon />} label="Search" value="search" />
            <ActionButton icon={<ZoomInIcon />} label="Zoom" value="zoom" />
          </ActionGroup>
        </ActionBar>
      </ActionDock>
    )
  },
}

/**
 * Right-center - property panel access
 */
export const RightCenter: Story = {
  render: () => (
    <ActionDock position="right-center">
      <ActionBar variant="frosted" orientation="vertical">
        <ActionButton icon={<SettingsIcon />} label="Properties" />
        <ActionButton icon={<ChatIcon />} label="Comments" badge={2} />
      </ActionBar>
    </ActionDock>
  ),
}

/**
 * Center - modal controls
 */
export const Center: Story = {
  render: () => {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
      <ActionDock position="center">
        <ActionBar variant="frosted" padding={16}>
          <ActionButton
            icon={<PlayArrowIcon />}
            iconOn={<PauseIcon />}
            label={isPlaying ? "Pause" : "Play"}
            active={isPlaying}
            onClick={() => setIsPlaying(!isPlaying)}
            size="lg"
          />
        </ActionBar>
      </ActionDock>
    )
  },
}

// =============================================================================
// Offset & Attached
// =============================================================================

/**
 * Custom offset
 */
export const CustomOffset: Story = {
  args: {
    position: "bottom-right",
    offset: 32,
  },
  render: (args) => (
    <ActionDock {...args}>
      <ActionBar variant="glass">
        <ActionButton icon={<AddIcon />} label="Add" />
      </ActionBar>
    </ActionDock>
  ),
}

/**
 * Attached mode - no gap from edge
 */
export const Attached: Story = {
  render: () => (
    <>
      <ActionDock position="top-left" attached>
        <ActionBar variant="solid">
          <ActionButton icon={<MenuIcon />} label="Menu" />
        </ActionBar>
      </ActionDock>

      <ActionDock position="bottom-right" attached>
        <ActionBar variant="solid" orientation="vertical">
          <ActionButton icon={<AddIcon />} label="Add" />
          <ActionButton icon={<ChatIcon />} label="Chat" />
        </ActionBar>
      </ActionDock>
    </>
  ),
}

// =============================================================================
// Real-World Examples
// =============================================================================

/**
 * Complete HUD layout
 */
export const CompleteHUDLayout: Story = {
  render: () => {
    const [tool, setTool] = useState("edit")
    const [settings, setSettings] = useState({ grid: true })

    return (
      <>
        {/* Top-left: Menu */}
        <ActionDock position="top-left">
          <ActionBar variant="glass">
            <ActionButton icon={<MenuIcon />} label="Menu" />
            <ActionButton icon={<HomeIcon />} label="Home" />
          </ActionBar>
        </ActionDock>

        {/* Top-right: Account */}
        <ActionDock position="top-right">
          <ActionBar variant="glass">
            <ActionButton icon={<NotificationsIcon />} label="Notifications" badge={3} />
            <ActionButton icon={<AccountCircleIcon />} label="Account" />
          </ActionBar>
        </ActionDock>

        {/* Left: Tool palette */}
        <ActionDock position="left-center">
          <ActionBar variant="solid" orientation="vertical">
            <ActionGroup mode="radio" value={tool} onChange={setTool} orientation="vertical">
              <ActionButton icon={<EditIcon />} label="Edit" value="edit" />
              <ActionButton icon={<SearchIcon />} label="Search" value="search" />
              <ActionButton icon={<ZoomInIcon />} label="Zoom In" value="zoom-in" />
              <ActionButton icon={<ZoomOutIcon />} label="Zoom Out" value="zoom-out" />
            </ActionGroup>
          </ActionBar>
        </ActionDock>

        {/* Bottom: Main controls */}
        <ActionDock position="bottom-center">
          <ActionBar variant="frosted" gap={8}>
            <ActionGroup
              mode="checkbox"
              values={settings}
              onToggle={(id, c) => setSettings(v => ({ ...v, [id]: c }))}
            >
              <ActionButton icon={<HomeIcon />} label="Grid" value="grid" />
            </ActionGroup>

            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </ActionDock>

        {/* Bottom-right: Quick actions */}
        <ActionDock position="bottom-right">
          <ActionBar variant="frosted" orientation="vertical">
            <ActionButton icon={<AddIcon />} label="New" />
            <ActionButton icon={<ChatIcon />} label="Chat" badge={5} />
          </ActionBar>
        </ActionDock>
      </>
    )
  },
}

/**
 * Simple floating action button
 */
export const FloatingActionButton: Story = {
  render: () => (
    <ActionDock position="bottom-right">
      <ActionBar variant="frosted" padding={12}>
        <ActionButton icon={<AddIcon />} label="Create" size="lg" />
      </ActionBar>
    </ActionDock>
  ),
}
