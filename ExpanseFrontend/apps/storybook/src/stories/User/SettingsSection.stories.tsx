import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Box, Typography, Switch, FormControlLabel } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import NotificationsIcon from "@mui/icons-material/Notifications"
import SecurityIcon from "@mui/icons-material/Security"
import PaletteIcon from "@mui/icons-material/Palette"
import {
  SettingsSection,
  SettingsSectionGroup,
} from "../../../../../packages/ui/user/components/SettingsSection"

/**
 * SettingsSection provides a reusable container for grouping related settings
 * with optional icons, descriptions, and collapsible behavior.
 */
const meta: Meta<typeof SettingsSection> = {
  title: "User/SettingsSection",
  component: SettingsSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A reusable section container for settings pages with support for icons, descriptions, and collapsible panels.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outlined", "filled"],
    },
    collapsible: { control: "boolean" },
    defaultCollapsed: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 500 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SettingsSection>

// =============================================================================
// Stories
// =============================================================================

/**
 * Default section with title and content
 */
export const Default: Story = {
  args: {
    title: "Profile Settings",
    children: (
      <Box>
        <Typography variant="body2" color="text.secondary">
          Manage your profile information and display preferences.
        </Typography>
      </Box>
    ),
  },
}

/**
 * Section with icon
 */
export const WithIcon: Story = {
  args: {
    title: "Profile Settings",
    icon: PersonIcon,
    children: (
      <Box>
        <Typography variant="body2" color="text.secondary">
          Manage your profile information and display preferences.
        </Typography>
      </Box>
    ),
  },
}

/**
 * Section with description
 */
export const WithDescription: Story = {
  args: {
    title: "Notification Preferences",
    description: "Control how and when you receive notifications",
    icon: NotificationsIcon,
    children: (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
        <FormControlLabel control={<Switch defaultChecked />} label="Push notifications" />
        <FormControlLabel control={<Switch />} label="SMS notifications" />
      </Box>
    ),
  },
}

/**
 * Collapsible section
 */
export const Collapsible: Story = {
  args: {
    title: "Advanced Settings",
    description: "Click to expand",
    icon: SecurityIcon,
    collapsible: true,
    defaultCollapsed: false,
    children: (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <FormControlLabel control={<Switch />} label="Two-factor authentication" />
        <FormControlLabel control={<Switch />} label="Login alerts" />
        <FormControlLabel control={<Switch defaultChecked />} label="Session timeout" />
      </Box>
    ),
  },
}

/**
 * Collapsible section - expanded by default
 */
export const CollapsibleExpanded: Story = {
  args: {
    title: "Theme Settings",
    icon: PaletteIcon,
    collapsible: true,
    defaultCollapsed: false,
    children: (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <FormControlLabel control={<Switch defaultChecked />} label="Dark mode" />
        <FormControlLabel control={<Switch />} label="High contrast" />
        <FormControlLabel control={<Switch defaultChecked />} label="Animations" />
      </Box>
    ),
  },
}

/**
 * Outlined variant
 */
export const Outlined: Story = {
  args: {
    title: "Account Information",
    icon: PersonIcon,
    variant: "outlined",
    children: (
      <Box>
        <Typography variant="body2">Email: user@example.com</Typography>
        <Typography variant="body2">Member since: January 2023</Typography>
      </Box>
    ),
  },
}

/**
 * Filled variant
 */
export const Filled: Story = {
  args: {
    title: "Security Settings",
    icon: SecurityIcon,
    variant: "filled",
    children: (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <FormControlLabel control={<Switch defaultChecked />} label="Two-factor authentication" />
        <FormControlLabel control={<Switch defaultChecked />} label="Login alerts" />
      </Box>
    ),
  },
}

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <SettingsSection title="Default Variant" variant="default" icon={PersonIcon}>
        <Typography variant="body2">Default styling</Typography>
      </SettingsSection>
      <SettingsSection title="Outlined Variant" variant="outlined" icon={PersonIcon}>
        <Typography variant="body2">With border outline</Typography>
      </SettingsSection>
      <SettingsSection title="Filled Variant" variant="filled" icon={PersonIcon}>
        <Typography variant="body2">With background fill</Typography>
      </SettingsSection>
    </Box>
  ),
}

/**
 * Section Group - multiple sections together
 */
export const SectionGroup: Story = {
  render: () => (
    <SettingsSectionGroup>
      <SettingsSection
        title="Profile"
        description="Manage your public profile"
        icon={PersonIcon}
      >
        <FormControlLabel control={<Switch defaultChecked />} label="Show profile publicly" />
      </SettingsSection>
      <SettingsSection
        title="Notifications"
        description="Control notification preferences"
        icon={NotificationsIcon}
      >
        <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
      </SettingsSection>
      <SettingsSection
        title="Security"
        description="Manage security settings"
        icon={SecurityIcon}
      >
        <FormControlLabel control={<Switch />} label="Two-factor auth" />
      </SettingsSection>
    </SettingsSectionGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "SettingsSectionGroup provides consistent spacing between multiple sections.",
      },
    },
  },
}

/**
 * Interactive example with state
 */
export const Interactive: Story = {
  render: () => {
    const InteractiveSection = () => {
      const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sms: false,
      })

      return (
        <SettingsSection
          title="Notification Preferences"
          description="Choose how you want to be notified"
          icon={NotificationsIcon}
          variant="outlined"
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.email}
                  onChange={(e) =>
                    setNotifications({ ...notifications, email: e.target.checked })
                  }
                />
              }
              label="Email notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.push}
                  onChange={(e) =>
                    setNotifications({ ...notifications, push: e.target.checked })
                  }
                />
              }
              label="Push notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.sms}
                  onChange={(e) =>
                    setNotifications({ ...notifications, sms: e.target.checked })
                  }
                />
              }
              label="SMS notifications"
            />
          </Box>
        </SettingsSection>
      )
    }

    return <InteractiveSection />
  },
}

/**
 * Nested content example
 */
export const NestedContent: Story = {
  args: {
    title: "Display Preferences",
    icon: PaletteIcon,
    description: "Customize how the app looks",
    collapsible: true,
    defaultCollapsed: false,
    children: (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Theme
          </Typography>
          <FormControlLabel control={<Switch />} label="Dark mode" />
        </Box>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Accessibility
          </Typography>
          <FormControlLabel control={<Switch />} label="High contrast" />
          <FormControlLabel control={<Switch defaultChecked />} label="Reduce motion" />
        </Box>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Layout
          </Typography>
          <FormControlLabel control={<Switch defaultChecked />} label="Compact mode" />
        </Box>
      </Box>
    ),
  },
}
