/**
 * ActionButton Stories
 *
 * Demonstrates the ActionButton component - individual buttons
 * for use within ActionBar and ActionGroup components.
 */

import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Box, Stack, Typography } from "@mui/material"
import { ActionButton } from "./ActionButton"
import { ActionBar } from "../action-bars"
import { ActionDock } from "../../hud/docks"

// Icons
import HomeIcon from "@mui/icons-material/Home"
import SearchIcon from "@mui/icons-material/Search"
import SettingsIcon from "@mui/icons-material/Settings"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import AddIcon from "@mui/icons-material/Add"
import StarIcon from "@mui/icons-material/Star"
import FavoriteIcon from "@mui/icons-material/Favorite"
import NotificationsIcon from "@mui/icons-material/Notifications"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

// =============================================================================
// Meta
// =============================================================================

const meta: Meta<typeof ActionButton> = {
  title: "Layout Systems/HUD Components/ActionButton",
  component: ActionButton,
  parameters: {
    layout: "centered",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    labelDisplay: {
      control: "select",
      options: ["icon-only", "icon-label-below", "icon-label-right", "label-only"],
    },
    colorMode: {
      control: "select",
      options: ["auto", "dark", "light"],
    },
  },
}

export default meta
type Story = StoryObj<typeof ActionButton>

// =============================================================================
// Basic Stories
// =============================================================================

/**
 * Default ActionButton with just an icon
 */
export const Default: Story = {
  args: {
    icon: <HomeIcon />,
    label: "Home",
  },
}

/**
 * ActionButton showing all size variants
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} sx={{
      alignItems: "center"
    }}>
      <Box sx={{
        textAlign: "center"
      }}>
        <ActionButton icon={<HomeIcon />} label="XS" size="xs" />
        <Typography variant="caption">xs (32px)</Typography>
      </Box>
      <Box sx={{
        textAlign: "center"
      }}>
        <ActionButton icon={<HomeIcon />} label="SM" size="sm" />
        <Typography variant="caption">sm (36px)</Typography>
      </Box>
      <Box sx={{
        textAlign: "center"
      }}>
        <ActionButton icon={<HomeIcon />} label="MD" size="md" />
        <Typography variant="caption">md (40px)</Typography>
      </Box>
      <Box sx={{
        textAlign: "center"
      }}>
        <ActionButton icon={<HomeIcon />} label="LG" size="lg" />
        <Typography variant="caption">lg (48px)</Typography>
      </Box>
    </Stack>
  ),
}

// =============================================================================
// Label Display Modes
// =============================================================================

/**
 * Icon-only mode (default) - shows tooltip on hover
 */
export const IconOnly: Story = {
  args: {
    icon: <SearchIcon />,
    label: "Search",
    labelDisplay: "icon-only",
  },
}

/**
 * Label shown below the icon
 */
export const IconLabelBelow: Story = {
  args: {
    icon: <SettingsIcon />,
    label: "Settings",
    labelDisplay: "icon-label-below",
    size: "lg",
  },
}

/**
 * Label shown to the right of the icon
 */
export const IconLabelRight: Story = {
  args: {
    icon: <EditIcon />,
    label: "Edit",
    labelDisplay: "icon-label-right",
  },
}

/**
 * Label only, no icon
 */
export const LabelOnly: Story = {
  args: {
    label: "Submit",
    labelDisplay: "label-only",
  },
}

/**
 * All label display modes together
 */
export const LabelDisplayModes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} sx={{
      alignItems: "flex-start"
    }}>
      <Box sx={{
        textAlign: "center"
      }}>
        <ActionButton icon={<HomeIcon />} label="Home" labelDisplay="icon-only" />
        <Typography variant="caption" sx={{ display: "block" }}>icon-only</Typography>
      </Box>
      <Box sx={{
        textAlign: "center"
      }}>
        <ActionButton icon={<HomeIcon />} label="Home" labelDisplay="icon-label-below" size="lg" />
        <Typography variant="caption" sx={{ display: "block" }}>icon-label-below</Typography>
      </Box>
      <Box sx={{
        textAlign: "center"
      }}>
        <ActionButton icon={<HomeIcon />} label="Home" labelDisplay="icon-label-right" />
        <Typography variant="caption" sx={{ display: "block" }}>icon-label-right</Typography>
      </Box>
      <Box sx={{
        textAlign: "center"
      }}>
        <ActionButton label="Home" labelDisplay="label-only" />
        <Typography variant="caption" sx={{ display: "block" }}>label-only</Typography>
      </Box>
    </Stack>
  ),
}

// =============================================================================
// States
// =============================================================================

/**
 * Active (selected) state
 */
export const Active: Story = {
  args: {
    icon: <StarIcon />,
    label: "Starred",
    active: true,
  },
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    icon: <DeleteIcon />,
    label: "Delete",
    disabled: true,
  },
}

/**
 * With badge for notifications
 */
export const WithBadge: Story = {
  args: {
    icon: <NotificationsIcon />,
    label: "Notifications",
    badge: 5,
  },
}

/**
 * Badge with large number
 */
export const BadgeLargeNumber: Story = {
  args: {
    icon: <NotificationsIcon />,
    label: "Notifications",
    badge: 99,
  },
}

/**
 * All button states
 */
export const States: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Box sx={{
        textAlign: "center"
      }}>
        <ActionButton icon={<HomeIcon />} label="Default" />
        <Typography variant="caption">Default</Typography>
      </Box>
      <Box sx={{
        textAlign: "center"
      }}>
        <ActionButton icon={<StarIcon />} label="Active" active />
        <Typography variant="caption">Active</Typography>
      </Box>
      <Box sx={{
        textAlign: "center"
      }}>
        <ActionButton icon={<DeleteIcon />} label="Disabled" disabled />
        <Typography variant="caption">Disabled</Typography>
      </Box>
      <Box sx={{
        textAlign: "center"
      }}>
        <ActionButton icon={<NotificationsIcon />} label="Badge" badge={3} />
        <Typography variant="caption">Badge</Typography>
      </Box>
    </Stack>
  ),
}

// =============================================================================
// Toggle Buttons
// =============================================================================

/**
 * Button with different icons for on/off states
 */
export const ToggleWithIconChange: Story = {
  render: () => {
    const [isPlaying, setIsPlaying] = React.useState(false)
    return (
      <ActionButton
        icon={<PlayArrowIcon />}
        iconOn={<PauseIcon />}
        label={isPlaying ? "Pause" : "Play"}
        active={isPlaying}
        onClick={() => setIsPlaying(!isPlaying)}
      />
    )
  },
}

/**
 * Favorite toggle button
 */
export const FavoriteToggle: Story = {
  render: () => {
    const [isFavorite, setIsFavorite] = React.useState(false)
    return (
      <ActionButton
        icon={<FavoriteIcon />}
        label={isFavorite ? "Remove favorite" : "Add to favorites"}
        active={isFavorite}
        onClick={() => setIsFavorite(!isFavorite)}
      />
    )
  },
}

// =============================================================================
// In ActionBar Context
// =============================================================================

/**
 * Buttons inside an ActionBar container
 */
export const InActionBar: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <Box sx={{ width: "100%", p: 4 }}>
      <ActionBar variant="glass">
        <ActionButton icon={<HomeIcon />} label="Home" />
        <ActionButton icon={<SearchIcon />} label="Search" />
        <ActionButton icon={<SettingsIcon />} label="Settings" />
        <ActionButton icon={<NotificationsIcon />} label="Notifications" badge={3} />
      </ActionBar>
    </Box>
  ),
}

/**
 * Vertical ActionBar with labeled buttons
 */
export const VerticalWithLabels: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <Box sx={{ p: 4 }}>
      <ActionBar variant="glass" orientation="vertical">
        <ActionButton icon={<HomeIcon />} label="Home" labelDisplay="icon-label-below" size="lg" />
        <ActionButton icon={<SearchIcon />} label="Search" labelDisplay="icon-label-below" size="lg" />
        <ActionButton icon={<AddIcon />} label="Create" labelDisplay="icon-label-below" size="lg" />
        <ActionButton icon={<SettingsIcon />} label="Settings" labelDisplay="icon-label-below" size="lg" />
      </ActionBar>
    </Box>
  ),
}

// =============================================================================
// Color Modes
// =============================================================================

/**
 * Light mode buttons (for dark backgrounds)
 */
export const LightMode: Story = {
  parameters: {
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#1a1a2e" }] },
  },
  render: () => (
    <Stack direction="row" spacing={2}>
      <ActionButton icon={<HomeIcon />} label="Home" colorMode="light" />
      <ActionButton icon={<StarIcon />} label="Active" colorMode="light" active />
      <ActionButton icon={<NotificationsIcon />} label="Badge" colorMode="light" badge={7} />
    </Stack>
  ),
}

/**
 * Dark mode buttons (for light backgrounds)
 */
export const DarkMode: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <ActionButton icon={<HomeIcon />} label="Home" colorMode="dark" />
      <ActionButton icon={<StarIcon />} label="Active" colorMode="dark" active />
      <ActionButton icon={<NotificationsIcon />} label="Badge" colorMode="dark" badge={7} />
    </Stack>
  ),
}

// =============================================================================
// Real-World Examples
// =============================================================================

/**
 * File actions toolbar
 */
export const FileActionsExample: Story = {
  render: () => (
    <ActionBar variant="outlined" padding={8} gap={4}>
      <ActionButton icon={<CloudUploadIcon />} label="Upload" labelDisplay="icon-label-right" />
      <ActionButton icon={<AddIcon />} label="New" labelDisplay="icon-label-right" />
      <ActionButton icon={<EditIcon />} label="Edit" labelDisplay="icon-label-right" />
      <ActionButton icon={<DeleteIcon />} label="Delete" labelDisplay="icon-label-right" />
    </ActionBar>
  ),
}

/**
 * Quick actions panel
 */
export const QuickActionsPanel: Story = {
  render: () => {
    const [activeAction, setActiveAction] = React.useState<string | null>(null)

    const actions = [
      { id: "home", icon: <HomeIcon />, label: "Home" },
      { id: "search", icon: <SearchIcon />, label: "Search" },
      { id: "star", icon: <StarIcon />, label: "Favorites" },
      { id: "settings", icon: <SettingsIcon />, label: "Settings" },
    ]

    return (
      <ActionBar variant="frosted" orientation="vertical" padding={12} gap={8}>
        {actions.map(action => (
          <ActionButton
            key={action.id}
            icon={action.icon}
            label={action.label}
            labelDisplay="icon-label-below"
            size="lg"
            active={activeAction === action.id}
            onClick={() => setActiveAction(action.id)}
          />
        ))}
      </ActionBar>
    )
  },
}
