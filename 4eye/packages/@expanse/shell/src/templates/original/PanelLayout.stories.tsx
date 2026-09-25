import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { PanelLayout } from "./PanelLayout"
import { NavigationProvider } from "@expanse/map"
import { Box, Typography, Button, IconButton, Divider, List, ListItemButton, ListItemText } from "@mui/material"
import { Menu, Search, Settings, Home, Dashboard, Analytics } from "@mui/icons-material"

const meta: Meta<typeof PanelLayout> = {
  title: 'Layout Systems/Basic Web Layout/Panel',
  component: PanelLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Panel-based layout with flex slots for action bars. Use for split-screen layouts, presentations, or embedded grid navigation. For full-screen apps, use FullScreenLayout instead.",
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
              id: "panel-1", 
              position: { x: 0, y: 0 },
              seo: { title: "Panel A" },
              display: { label: "Panel A", colors: { inactive: "#666", active: "#1976d2" } }
            },
            { 
              id: "panel-2", 
              position: { x: 1, y: 0 },
              seo: { title: "Panel B" },
              display: { label: "Panel B", colors: { inactive: "#666", active: "#1976d2" } }
            },
            { 
              id: "panel-3", 
              position: { x: 2, y: 0 },
              seo: { title: "Panel C" },
              display: { label: "Panel C", colors: { inactive: "#666", active: "#1976d2" } }
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
type Story = StoryObj<typeof PanelLayout>

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
          height: 400,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h5">Main Content Area</Typography>
      </Box>
    ),
  },
}

export const WithTopBar: Story = {
  args: {
    slots: {
      top: (
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
            <IconButton>
              <Menu />
            </IconButton>
            <Typography variant="h6">Panel Application</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton>
              <Search />
            </IconButton>
            <IconButton>
              <Settings />
            </IconButton>
          </Box>
        </Box>
      ),
    },
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 400,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h5">Content with Top Bar</Typography>
      </Box>
    ),
  },
}

export const WithLeftSidebar: Story = {
  args: {
    slots: {
      left: (
        <Box sx={{ p: 2, height: "100%" }}>
          <Typography variant="subtitle2" gutterBottom>
            Navigation
          </Typography>
          <Divider sx={{ my: 1 }} />
          <List dense>
            <ListItemButton>
              <Home sx={{ mr: 2 }} fontSize="small" />
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton>
              <Dashboard sx={{ mr: 2 }} fontSize="small" />
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton>
              <Analytics sx={{ mr: 2 }} fontSize="small" />
              <ListItemText primary="Analytics" />
            </ListItemButton>
            <ListItemButton>
              <Settings sx={{ mr: 2 }} fontSize="small" />
              <ListItemText primary="Settings" />
            </ListItemButton>
          </List>
        </Box>
      ),
    },
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 400,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Typography variant="h5">Main Content</Typography>
      </Box>
    ),
  },
}

export const WithRightPanel: Story = {
  args: {
    slots: {
      right: (
        <Box sx={{ p: 2, height: "100%" }}>
          <Typography variant="subtitle2" gutterBottom>
            Properties
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="caption" sx={{
              color: "text.secondary"
            }}>
              Width: 200px
            </Typography>
            <Typography variant="caption" sx={{
              color: "text.secondary"
            }}>
              Height: 100%
            </Typography>
            <Typography variant="caption" sx={{
              color: "text.secondary"
            }}>
              Sticky: false
            </Typography>
          </Box>
        </Box>
      ),
    },
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 400,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h5">Content with Right Panel</Typography>
      </Box>
    ),
  },
}

export const WithBottomBar: Story = {
  args: {
    slots: {
      bottom: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            width: "100%",
          }}
        >
          <Typography variant="caption" sx={{
            color: "text.secondary"
          }}>
            Status: Ready
          </Typography>
          <Typography variant="caption" sx={{
            color: "text.secondary"
          }}>
            Last updated: Just now
          </Typography>
        </Box>
      ),
    },
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 400,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h5">Content with Bottom Bar</Typography>
      </Box>
    ),
  },
}

export const CompleteLayout: Story = {
  args: {
    fullHeight: true,
    slots: {
      top: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            width: "100%",
          }}
        >
          <Typography variant="h6">Complete Panel Layout</Typography>
          <Button size="small">Actions</Button>
        </Box>
      ),
      left: (
        <Box sx={{ p: 2 }}>
          <Typography variant="caption">Left Panel</Typography>
        </Box>
      ),
      right: (
        <Box sx={{ p: 2 }}>
          <Typography variant="caption">Right Panel</Typography>
        </Box>
      ),
      bottom: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography variant="caption">Footer</Typography>
        </Box>
      ),
    },
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
        <Typography variant="h5">Main Content (All Panels)</Typography>
      </Box>
    ),
  },
}

export const WithBarOverrides: Story = {
  args: {
    slots: {
      left: (
        <Box sx={{ p: 2, width: "100%" }}>
          <Typography variant="caption">Wide Left Panel (400px)</Typography>
        </Box>
      ),
      top: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 3,
            width: "100%",
          }}
        >
          <Typography variant="caption">Tall Top Bar (80px)</Typography>
        </Box>
      ),
    },
    barOverrides: {
      left: { width: 400 },
      top: { height: 80 },
    },
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 400,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h5">Custom Bar Sizes</Typography>
      </Box>
    ),
  },
}

export const StickyBars: Story = {
  args: {
    slots: {
      top: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 3,
            width: "100%",
          }}
        >
          <Typography variant="caption">Sticky Top Bar</Typography>
        </Box>
      ),
      left: (
        <Box sx={{ p: 2 }}>
          <Typography variant="caption">Sticky Left Panel</Typography>
        </Box>
      ),
    },
    barOverrides: {
      top: { sticky: true },
      left: { sticky: true },
    },
    children: (
      <Box
        sx={{
          height: 1200,
          p: 3,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Scrollable Content
        </Typography>
        <Typography variant="body2" sx={{
          marginBottom: "16px"
        }}>
          Scroll down to see sticky bars remain in place...
        </Typography>
        {Array.from({ length: 20 }).map((_, i) => (
          <Typography key={i} variant="body2" sx={{
            marginBottom: "16px"
          }}>
            Content paragraph {i + 1}
          </Typography>
        ))}
      </Box>
    ),
  },
}
