import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { DashboardLayout } from "./DashboardLayout"
import { NavigationProvider } from "@expanse/map"
import { Box, Typography, Button, Card, CardContent } from "@mui/material"
import { DashboardOutlined, Settings, Notifications } from "@mui/icons-material"

const meta: Meta<typeof DashboardLayout> = {
  title: 'Layout Systems/Basic Web Layout/Dashboard',
  component: DashboardLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Dashboard preset wrapping FullScreenLayout with rich defaults. Includes minimap (top-right), navigation controls (bottom-center), and support for all 4 bar positions.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story: React.ComponentType) => (
      <NavigationProvider
        config={{
          dimensions: {
            width: 3,
            height: 3,
          },
          tiles: [
            { 
              id: "dash-1", 
              position: { x: 0, y: 0 },
              seo: { title: "Dashboard Home" },
              display: { label: "Home", colors: { inactive: "#666", active: "#1976d2" } }
            },
            { 
              id: "dash-2", 
              position: { x: 1, y: 0 },
              seo: { title: "Analytics" },
              display: { label: "Analytics", colors: { inactive: "#666", active: "#1976d2" } }
            },
            { 
              id: "dash-3", 
              position: { x: 2, y: 0 },
              seo: { title: "Reports" },
              display: { label: "Reports", colors: { inactive: "#666", active: "#1976d2" } }
            },
            { 
              id: "dash-4", 
              position: { x: 0, y: 1 },
              seo: { title: "Users" },
              display: { label: "Users", colors: { inactive: "#666", active: "#1976d2" } }
            },
            { 
              id: "dash-5", 
              position: { x: 1, y: 1 },
              seo: { title: "Settings" },
              display: { label: "Settings", colors: { inactive: "#666", active: "#1976d2" } }
            },
          ],
        }}
      >
        <Story />
      </NavigationProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DashboardLayout>

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          bgcolor: "background.default",
        }}
      >
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Dashboard Home
            </Typography>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              Default dashboard layout with minimap (top-right) and navigation controls (bottom-center).
            </Typography>
          </CardContent>
        </Card>
      </Box>
    ),
  },
}

export const WithTopBar: Story = {
  args: {
    topBar: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <DashboardOutlined />
          <Typography variant="h6">Dashboard</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button startIcon={<Notifications />}>Notifications</Button>
          <Button startIcon={<Settings />}>Settings</Button>
        </Box>
      </Box>
    ),
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h4">Content with Top Bar</Typography>
      </Box>
    ),
  },
}

export const WithLeftSidebar: Story = {
  args: {
    leftBar: (
      <Box sx={{ p: 2, width: 240 }}>
        <Typography variant="subtitle2" gutterBottom>
          Navigation
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button variant="text" fullWidth sx={{ justifyContent: "flex-start" }}>
            Home
          </Button>
          <Button variant="text" fullWidth sx={{ justifyContent: "flex-start" }}>
            Analytics
          </Button>
          <Button variant="text" fullWidth sx={{ justifyContent: "flex-start" }}>
            Reports
          </Button>
          <Button variant="text" fullWidth sx={{ justifyContent: "flex-start" }}>
            Settings
          </Button>
        </Box>
      </Box>
    ),
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h4">Content with Left Sidebar</Typography>
      </Box>
    ),
  },
}

export const WithRightPanel: Story = {
  args: {
    rightBar: (
      <Box sx={{ p: 2, width: 280 }}>
        <Typography variant="subtitle2" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body2">Recent Activity</Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body2">Notifications</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    ),
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h4">Content with Right Panel</Typography>
      </Box>
    ),
  },
}

export const CompleteLayout: Story = {
  args: {
    topBar: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          width: "100%",
        }}
      >
        <Typography variant="h6">Complete Dashboard</Typography>
        <Button>Actions</Button>
      </Box>
    ),
    leftBar: (
      <Box sx={{ p: 2, width: 200 }}>
        <Typography variant="subtitle2">Menu</Typography>
      </Box>
    ),
    rightBar: (
      <Box sx={{ p: 2, width: 200 }}>
        <Typography variant="subtitle2">Sidebar</Typography>
      </Box>
    ),
    bottomBar: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography variant="caption">Status: Connected</Typography>
      </Box>
    ),
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h4">Full Dashboard Layout</Typography>
      </Box>
    ),
  },
}

export const WithCustomPositions: Story = {
  args: {
    minimapPosition: "bottom-left",
    navControlsPosition: "bottom-right",
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          bgcolor: "background.default",
        }}
      >
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Custom Positions
            </Typography>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              Minimap in bottom-left, nav controls in bottom-right.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    ),
  },
}

export const Minimal: Story = {
  args: {
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h4">Minimal Dashboard (No Overlays)</Typography>
      </Box>
    ),
  },
}
