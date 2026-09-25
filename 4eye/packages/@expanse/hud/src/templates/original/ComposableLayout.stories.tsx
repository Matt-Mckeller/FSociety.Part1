import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { ComposableLayout } from "./ComposableLayout"
import { NavigationProvider } from "@expanse/map"
import { Box, Typography, Card, CardContent, IconButton, Button, Divider } from "@mui/material"
import { Menu, Search, Settings, Home, Notifications } from "@mui/icons-material"

const meta: Meta<typeof ComposableLayout> = {
  title: 'Layout Systems/Basic Web Layout/Composable',
  component: ComposableLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composable layout system for mixing layout features. Build custom layouts by composing fragments from different templates with full control over positioning and z-index.",
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
            { id: "comp-1", position: { x: 0, y: 0 }, seo: { title: "Fragment A" }, display: { label: "Fragment A", colors: { inactive: "#666", active: "#1976d2" } } },
            { id: "comp-2", position: { x: 1, y: 0 }, seo: { title: "Fragment B" }, display: { label: "Fragment B", colors: { inactive: "#666", active: "#1976d2" } } },
            { id: "comp-3", position: { x: 2, y: 0 }, seo: { title: "Fragment C" }, display: { label: "Fragment C", colors: { inactive: "#666", active: "#1976d2" } } },
          ],
        }}
      >
        <Story />
      </NavigationProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ComposableLayout>

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
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              ComposableLayout
            </Typography>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              Default layout with no fragments. Just the main content area.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    ),
  },
}

export const WithTopBar: Story = {
  args: {
    fragments: [
      {
        name: "header",
        position: "top",
        size: 64,
        content: (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              height: "100%",
              bgcolor: "background.paper",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton>
                <Menu />
              </IconButton>
              <Typography variant="h6">App Header</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton>
                <Search />
              </IconButton>
              <IconButton>
                <Notifications />
              </IconButton>
              <IconButton>
                <Settings />
              </IconButton>
            </Box>
          </Box>
        ),
      },
    ],
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
        <Typography variant="h5">Content with Top Bar Fragment</Typography>
      </Box>
    ),
  },
}

export const WithSidebar: Story = {
  args: {
    fragments: [
      {
        name: "sidebar",
        position: "left",
        size: 280,
        content: (
          <Box
            sx={{
              height: "100%",
              bgcolor: "background.paper",
              borderRight: 1,
              borderColor: "divider",
              p: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button fullWidth startIcon={<Home />} sx={{ justifyContent: "flex-start" }}>
                Home
              </Button>
              <Button fullWidth startIcon={<Menu />} sx={{ justifyContent: "flex-start" }}>
                Menu
              </Button>
              <Button fullWidth startIcon={<Settings />} sx={{ justifyContent: "flex-start" }}>
                Settings
              </Button>
            </Box>
          </Box>
        ),
      },
    ],
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
        <Typography variant="h5">Content with Left Sidebar Fragment</Typography>
      </Box>
    ),
  },
}

export const CompleteFramework: Story = {
  args: {
    fragments: [
      {
        name: "header",
        position: "top",
        size: 64,
        content: (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              height: "100%",
              bgcolor: "background.paper",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h6">Complete Framework</Typography>
            <Button>Actions</Button>
          </Box>
        ),
      },
      {
        name: "sidebar",
        position: "left",
        size: 240,
        content: (
          <Box
            sx={{
              height: "100%",
              bgcolor: "background.paper",
              borderRight: 1,
              borderColor: "divider",
              p: 2,
            }}
          >
            <Typography variant="subtitle2">Sidebar</Typography>
          </Box>
        ),
      },
      {
        name: "right-panel",
        position: "right",
        size: 280,
        content: (
          <Box
            sx={{
              height: "100%",
              bgcolor: "background.paper",
              borderLeft: 1,
              borderColor: "divider",
              p: 2,
            }}
          >
            <Typography variant="subtitle2">Right Panel</Typography>
          </Box>
        ),
      },
      {
        name: "footer",
        position: "bottom",
        size: 48,
        content: (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              bgcolor: "background.paper",
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="caption">Footer Status</Typography>
          </Box>
        ),
      },
    ],
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
        <Typography variant="h5">Main Content Area</Typography>
      </Box>
    ),
  },
}

export const WithMinimap: Story = {
  args: {
    minimap: {
      show: true,
      position: "top-right",
      variant: "grid",
      size: "medium",
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
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              With Minimap Fragment
            </Typography>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              Minimap positioned in top-right with grid variant.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    ),
  },
}

export const WithNavigationControls: Story = {
  args: {
    navigation: {
      show: true,
      position: "bottom-center",
      variant: "default",
      size: "medium",
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
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              With Navigation Fragment
            </Typography>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              Navigation controls in bottom-center.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    ),
  },
}

export const WithChrome: Story = {
  args: {
    chrome: {
      show: true,
      variant: "absolute",
      slots: {
        topLeft: (
          <Box sx={{ p: 2 }}>
            <Typography variant="caption">Top Left</Typography>
          </Box>
        ),
        topRight: (
          <Box sx={{ p: 2 }}>
            <IconButton size="small">
              <Settings />
            </IconButton>
          </Box>
        ),
        bottomLeft: (
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" sx={{
              color: "success.main"
            }}>
              ● Online
            </Typography>
          </Box>
        ),
        bottomRight: (
          <Box sx={{ p: 2 }}>
            <Typography variant="caption">v1.0.0</Typography>
          </Box>
        ),
      },
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
        <Typography variant="h5">Content with Chrome Overlay</Typography>
      </Box>
    ),
  },
}

export const CompleteComposition: Story = {
  args: {
    fragments: [
      {
        name: "header",
        position: "top",
        size: 64,
        content: (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 3,
              height: "100%",
              bgcolor: "background.paper",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h6">Complete Composition</Typography>
          </Box>
        ),
      },
      {
        name: "sidebar",
        position: "left",
        size: 200,
        content: (
          <Box
            sx={{
              height: "100%",
              bgcolor: "background.paper",
              borderRight: 1,
              borderColor: "divider",
              p: 2,
            }}
          >
            <Typography variant="caption">Menu</Typography>
          </Box>
        ),
      },
    ],
    minimap: {
      show: true,
      position: "bottom-right",
      size: "small",
    },
    navigation: {
      show: true,
      position: "bottom-left",
      variant: "compact",
      size: "small",
    },
    chrome: {
      show: true,
      slots: {
        topRight: (
          <IconButton size="small">
            <Settings />
          </IconButton>
        ),
      },
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
        <Typography variant="h5">All Features Combined</Typography>
      </Box>
    ),
  },
}

export const FloatingFragments: Story = {
  args: {
    fragments: [
      {
        name: "floating-card-1",
        position: "floating",
        content: (
          <Box
            sx={{
              position: "absolute",
              top: 100,
              left: 100,
              width: 280,
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6">Floating Card 1</Typography>
                <Typography variant="body2" sx={{
                  color: "text.secondary"
                }}>
                  Absolute positioned fragment
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ),
      },
      {
        name: "floating-card-2",
        position: "floating",
        content: (
          <Box
            sx={{
              position: "absolute",
              bottom: 100,
              right: 100,
              width: 280,
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6">Floating Card 2</Typography>
                <Typography variant="body2" sx={{
                  color: "text.secondary"
                }}>
                  Another floating fragment
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ),
      },
    ],
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
        <Typography variant="h5">Floating Fragments</Typography>
      </Box>
    ),
  },
}

export const ConditionalFragments: Story = {
  args: {
    fragments: [
      {
        name: "always-visible",
        position: "top",
        size: 64,
        show: true,
        content: (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 3,
              height: "100%",
              bgcolor: "success.dark",
              color: "white",
            }}
          >
            <Typography variant="h6">Always Visible (show: true)</Typography>
          </Box>
        ),
      },
      {
        name: "hidden",
        position: "bottom",
        size: 64,
        show: false,
        content: (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 3,
              height: "100%",
              bgcolor: "error.dark",
              color: "white",
            }}
          >
            <Typography variant="h6">Hidden (show: false)</Typography>
          </Box>
        ),
      },
    ],
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
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Conditional Fragments
            </Typography>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              Top fragment is visible (show: true), bottom fragment is hidden (show: false).
            </Typography>
          </CardContent>
        </Card>
      </Box>
    ),
  },
}

export const CustomZIndex: Story = {
  args: {
    fragments: [
      {
        name: "background-layer",
        position: "center",
        zIndex: 1,
        content: (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "primary.light",
              opacity: 0.3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3" sx={{
              color: "primary.dark"
            }}>
              Background Layer (z: 1)
            </Typography>
          </Box>
        ),
      },
      {
        name: "content-layer",
        position: "center",
        zIndex: 10,
        content: (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Card sx={{ width: 400 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Content Layer (z: 10)
                </Typography>
                <Typography variant="body2" sx={{
                  color: "text.secondary"
                }}>
                  Custom z-index stacking
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ),
      },
    ],
    children: null,
  },
}
