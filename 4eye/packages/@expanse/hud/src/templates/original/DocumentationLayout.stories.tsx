import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { DocumentationLayout } from "./DocumentationLayout"
import { NavigationProvider } from "@expanse/map"
import { Box, Typography, Card, CardContent } from "@mui/material"
import { HomeOutlined, MenuBookOutlined, CodeOutlined, SettingsOutlined } from "@mui/icons-material"

const meta: Meta<typeof DocumentationLayout> = {
  title: 'Layout Systems/Basic Web Layout/Documentation',
  component: DocumentationLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Documentation-style layout with glass-morphism overlays, top bar, sidebars, minimap, and navigation controls. Supports presets (default, minimal, sidebar-focus, clean) and auto-generation from grid config.",
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
            { id: "doc-home", position: { x: 0, y: 0 }, seo: { title: "Home" }, display: { label: "Home", colors: { inactive: "#666", active: "#1976d2" } } },
            { id: "doc-docs", position: { x: 1, y: 0 }, seo: { title: "Documentation" }, display: { label: "Documentation", colors: { inactive: "#666", active: "#1976d2" } } },
            { id: "doc-api", position: { x: 2, y: 0 }, seo: { title: "API Reference" }, display: { label: "API Reference", colors: { inactive: "#666", active: "#1976d2" } } },
            { id: "doc-guides", position: { x: 0, y: 1 }, seo: { title: "Guides" }, display: { label: "Guides", colors: { inactive: "#666", active: "#1976d2" } } },
            { id: "doc-examples", position: { x: 1, y: 1 }, seo: { title: "Examples" }, display: { label: "Examples", colors: { inactive: "#666", active: "#1976d2" } } },
            { id: "doc-settings", position: { x: 2, y: 1 }, seo: { title: "Settings" }, display: { label: "Settings", colors: { inactive: "#666", active: "#1976d2" } } },
          ],
        }}
      >
        <Story />
      </NavigationProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DocumentationLayout>

// =============================================================================
// Sample Content Component
// =============================================================================

function SampleContent({ title, description }: { title: string; description: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        p: 3,
      }}
    >
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" sx={{
            color: "text.secondary"
          }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

// =============================================================================
// Stories
// =============================================================================

export const PresetDefault: Story = {
  args: {
    preset: "default",
    children: (
      <SampleContent
        title="Default Preset"
        description="Includes top bar, both sidebars, minimap (top-right), and navigation controls (bottom-center)."
      />
    ),
  },
}

export const PresetMinimal: Story = {
  args: {
    preset: "minimal",
    children: (
      <SampleContent
        title="Minimal Preset"
        description="Only top bar and minimap visible. Clean and distraction-free."
      />
    ),
  },
}

export const PresetSidebarFocus: Story = {
  args: {
    preset: "sidebar-focus",
    children: (
      <SampleContent
        title="Sidebar Focus Preset"
        description="Emphasized sidebars for navigation-heavy documentation."
      />
    ),
  },
}

export const PresetClean: Story = {
  args: {
    preset: "clean",
    children: (
      <SampleContent
        title="Clean Preset"
        description="Top bar only, no sidebars. Minimal interface for focused reading."
      />
    ),
  },
}

export const WithManualSidebarItems: Story = {
  args: {
    preset: "default",
    leftItems: [
      {
        id: "home",
        icon: HomeOutlined,
        label: "Home",
        position: { x: 0, y: 0 },
      },
      {
        id: "docs",
        icon: MenuBookOutlined,
        label: "Docs",
        position: { x: 1, y: 0 },
      },
      {
        id: "api",
        icon: CodeOutlined,
        label: "API",
        position: { x: 2, y: 0 },
      },
    ],
    rightItems: [
      {
        id: "settings",
        icon: SettingsOutlined,
        label: "Settings",
        position: { x: 2, y: 1 },
      },
    ],
    children: (
      <SampleContent
        title="Manual Sidebar Items"
        description="Custom sidebar navigation items with icons and labels."
      />
    ),
  },
}

export const CustomMinimapPosition: Story = {
  args: {
    preset: "default",
    minimapPosition: "bottom-left",
    navControlsPosition: "bottom-right",
    children: (
      <SampleContent
        title="Custom Positions"
        description="Minimap in bottom-left, nav controls in bottom-right."
      />
    ),
  },
}

export const MinimapVariants: Story = {
  args: {
    preset: "minimal",
    minimapVariant: "dots",
    minimapSize: "large",
    children: (
      <SampleContent
        title="Minimap Variants"
        description="Large minimap with dots variant instead of grid."
      />
    ),
  },
}

export const NavigationPadVariants: Story = {
  args: {
    preset: "default",
    navPadVariant: "hints",
    navPadSize: "large",
    children: (
      <SampleContent
        title="Navigation Pad Variants"
        description="Large navigation pad with keyboard hints displayed."
      />
    ),
  },
}

export const CustomBackdrop: Story = {
  args: {
    preset: "default",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    children: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Card sx={{ maxWidth: 600, bgcolor: "rgba(255, 255, 255, 0.9)" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Custom Background
            </Typography>
            <Typography variant="body1" sx={{
              color: "text.secondary"
            }}>
              Gradient background with glass-morphism overlays.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    ),
  },
}

export const VisibilityToggle: Story = {
  args: {
    preset: "default",
    showMinimap: false,
    showLeftBar: true,
    showRightBar: false,
    showTopBar: true,
    showNavigationControls: true,
    children: (
      <SampleContent
        title="Visibility Toggle"
        description="Minimap hidden, right bar hidden. Custom visibility configuration."
      />
    ),
  },
}

export const CustomBarSizes: Story = {
  args: {
    preset: "default",
    barSizes: {
      top: 80,
      left: 80,
      right: 80,
    },
    children: (
      <SampleContent
        title="Custom Bar Sizes"
        description="Larger bars (80px each) for more prominent UI elements."
      />
    ),
  },
}

export const FastTransitions: Story = {
  args: {
    preset: "default",
    transitionDuration: 100,
    children: (
      <SampleContent
        title="Fast Transitions"
        description="Quick 100ms transitions for snappy navigation. Navigate to see the effect."
      />
    ),
  },
}

export const SlowTransitions: Story = {
  args: {
    preset: "default",
    transitionDuration: 600,
    children: (
      <SampleContent
        title="Slow Transitions"
        description="Slower 600ms transitions for dramatic page changes."
      />
    ),
  },
}
