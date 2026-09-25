import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { ResponsiveLayoutWrapper, minimalResponsiveConfig, documentationResponsiveConfig } from "./ResponsiveLayout"
import { MinimalLayout } from "./MinimalLayout"
import { DocumentationLayout } from "./DocumentationLayout"
import { DashboardLayout } from "./DashboardLayout"
import { NavigationProvider } from "@expanse/map"
import { Box, Typography, Card, CardContent, useMediaQuery, useTheme } from "@mui/material"

const meta: Meta<typeof ResponsiveLayoutWrapper> = {
  title: 'Layout Systems/Basic Web Layout/Responsive',
  component: ResponsiveLayoutWrapper,
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "667px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1440px", height: "900px" },
        },
      },
    },
    docs: {
      description: {
        component:
          "Responsive wrapper that automatically adapts any layout component based on viewport size. Supports custom breakpoints and merges viewport-specific props.",
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
              id: "r-1", 
              position: { x: 0, y: 0 },
              seo: { title: "Home" },
              display: { label: "Home", colors: { inactive: "#666", active: "#1976d2" } }
            },
            { 
              id: "r-2", 
              position: { x: 1, y: 0 },
              seo: { title: "About" },
              display: { label: "About", colors: { inactive: "#666", active: "#1976d2" } }
            },
            { 
              id: "r-3", 
              position: { x: 2, y: 0 },
              seo: { title: "Contact" },
              display: { label: "Contact", colors: { inactive: "#666", active: "#1976d2" } }
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
type Story = StoryObj<typeof ResponsiveLayoutWrapper>

// =============================================================================
// Device Indicator Component
// =============================================================================

function DeviceIndicator() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))

  const deviceType = isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"
  const color = isMobile ? "error" : isTablet ? "warning" : "success"

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        bgcolor: `${color}.main`,
        color: "white",
        px: 2,
        py: 1,
        borderRadius: 1,
        fontFamily: "monospace",
        fontSize: 14,
        fontWeight: "bold",
      }}
    >
      {deviceType}
    </Box>
  )
}

// =============================================================================
// Stories
// =============================================================================

export const MinimalLayoutResponsive: Story = {
  args: {
    layout: MinimalLayout,
    baseProps: {
      preset: "default",
      children: (
        <>
          <DeviceIndicator />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              bgcolor: "background.default",
              p: 3,
            }}
          >
            <Card sx={{ maxWidth: 600 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                 Responsive Minimal Layout
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    marginBottom: "16px"
                  }}>
                  Resize the viewport or change the device setting to see adaptive behavior:
                </Typography>
                <Typography variant="caption" component="div" sx={{ fontFamily: "monospace", mt: 2 }}>
                  Mobile: Compact preset, small minimap
                </Typography>
                <Typography variant="caption" component="div" sx={{ fontFamily: "monospace" }}>
                  Tablet: Focus mode preset, medium minimap
                </Typography>
                <Typography variant="caption" component="div" sx={{ fontFamily: "monospace" }}>
                  Desktop: Default preset, large minimap
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </>
      ),
    },
    responsive: {
      mobile: {
        preset: "compact",
        minimapSize: "small",
        navPadSize: "small",
      },
      tablet: {
        preset: "focus-mode",
        minimapSize: "medium",
        navPadSize: "medium",
      },
      desktop: {
        preset: "default",
        minimapSize: "large",
        navPadSize: "large",
      },
    },
  },
}

export const DocumentationLayoutResponsive: Story = {
  args: {
    layout: DocumentationLayout,
    baseProps: {
      preset: "default",
      children: (
        <>
          <DeviceIndicator />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              bgcolor: "background.default",
              p: 3,
            }}
          >
            <Card sx={{ maxWidth: 600 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Responsive Documentation Layout
                </Typography>
                <Typography variant="body2" sx={{
                  color: "text.secondary"
                }}>
                  Sidebars hide on mobile, partial on tablet, full on desktop.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </>
      ),
    },
    responsive: {
      mobile: {
        preset: "blank",
        showLeftBar: false,
        showRightBar: false,
        showTopBar: true,
        minimapSize: "small",
      },
      tablet: {
        preset: "default",
        showLeftBar: true,
        showRightBar: false,
        minimapSize: "medium",
      },
      desktop: {
        preset: "default",
        showLeftBar: true,
        showRightBar: true,
        minimapSize: "large",
      },
    },
  },
}

export const DashboardLayoutResponsive: Story = {
  args: {
    layout: DashboardLayout as React.ComponentType<any>,
    baseProps: {
      children: (
        <>
          <DeviceIndicator />
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
                  Responsive Dashboard
                </Typography>
                <Typography variant="body2" sx={{
                  color: "text.secondary"
                }}>
                  Minimap and nav controls adapt to device size.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </>
      ),
    },
    responsive: {
      mobile: {
        minimapPosition: "top-right",
        navControlsPosition: "bottom-center",
        showMinimap: false,
      },
      tablet: {
        minimapPosition: "top-right",
        navControlsPosition: "bottom-right",
        showMinimap: true,
      },
      desktop: {
        minimapPosition: "bottom-left",
        navControlsPosition: "bottom-right",
        showMinimap: true,
      },
    },
  },
}

export const CustomBreakpoints: Story = {
  args: {
    layout: MinimalLayout,
    baseProps: {
      preset: "default",
      children: (
        <>
          <DeviceIndicator />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              bgcolor: "background.default",
              p: 3,
            }}
          >
            <Card sx={{ maxWidth: 600 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Custom Breakpoints
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    marginBottom: "16px"
                  }}>
                  Using custom breakpoints instead of MUI defaults:
                </Typography>
                <Typography variant="caption" component="div" sx={{ fontFamily: "monospace" }}>
                  Mobile: &lt; 600px
                </Typography>
                <Typography variant="caption" component="div" sx={{ fontFamily: "monospace" }}>
                  Tablet: 600-1200px
                </Typography>
                <Typography variant="caption" component="div" sx={{ fontFamily: "monospace" }}>
                  Desktop: &gt; 1200px
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </>
      ),
    },
    breakpoints: {
      mobile: 600,
      tablet: 1200,
      desktop: 1200,
    },
    responsive: {
      mobile: {
        preset: "compact",
        showMinimap: false,
      },
      tablet: {
        preset: "focus-mode",
        showMinimap: true,
        minimapSize: "medium",
      },
      desktop: {
        preset: "default",
        showMinimap: true,
        minimapSize: "large",
      },
    },
  },
}

export const ConditionalFeatures: Story = {
  args: {
    layout: MinimalLayout,
    baseProps: {
      preset: "default",
      children: (
        <>
          <DeviceIndicator />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              bgcolor: "background.default",
              p: 3,
            }}
          >
            <Card sx={{ maxWidth: 600 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Conditional Features
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    marginBottom: "16px"
                  }}>
                  Features toggle based on device:
                </Typography>
                <Typography variant="caption" component="div">
                  Mobile: No minimap, no nav controls
                </Typography>
                <Typography variant="caption" component="div">
                  Tablet: Minimap only
                </Typography>
                <Typography variant="caption" component="div">
                  Desktop: Both minimap and nav controls
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </>
      ),
    },
    responsive: {
      mobile: {
        showMinimap: false,
        showNavigationControls: false,
      },
      tablet: {
        showMinimap: true,
        showNavigationControls: false,
      },
      desktop: {
        showMinimap: true,
        showNavigationControls: true,
      },
    },
  },
}
