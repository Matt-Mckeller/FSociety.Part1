import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack, Divider } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import SettingsIcon from "@mui/icons-material/Settings"
import SearchIcon from "@mui/icons-material/Search"
import FavoriteIcon from "@mui/icons-material/Favorite"
import StarIcon from "@mui/icons-material/Star"
import CloudIcon from "@mui/icons-material/Cloud"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import { ActionBar, ActionButton } from "../../../hud-components"
import { DemoSurface } from "@expanse/ui"

const meta: Meta = {
  title: "Layout Systems/HUD Components/ActionBar/Layered",
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

// =============================================================================
// Helper Components
// =============================================================================

const ShowcaseLabel = ({ children, secondary }: { children: React.ReactNode; secondary?: string }) => (
  <Box sx={{ mb: 1 }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.primary" }}>
      {children}
    </Typography>
    {secondary && (
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {secondary}
      </Typography>
    )}
  </Box>
)

// =============================================================================
// Overview - Main entry point
// =============================================================================

export const Overview: StoryObj = {
  name: "✨ Overview",
  render: () => (
    <Box sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        3-Layer ActionBar (SVG)
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        Brand-aligned ActionBar using the TripleLayerPath glow effect from brand-core.
        Three overlapping strokes create depth: outer diffuse glow, center transition, inner sharp definition.
      </Typography>

      <DemoSurface variant="dark" padding="lg">
        <Stack spacing={4}>
          <Box>
            <ShowcaseLabel secondary="Primary theme color">Default</ShowcaseLabel>
            <Box sx={{ height: 60, width: "100%" }}>
              <ActionBar layered length={{ percent: 85 }}>
                <ActionButton icon={<HomeIcon />} label="Home" />
                <ActionButton icon={<SearchIcon />} label="Search" />
                <ActionButton icon={<SettingsIcon />} label="Settings" />
              </ActionBar>
            </Box>
          </Box>

          <Box>
            <ShowcaseLabel secondary="Secondary palette">Secondary</ShowcaseLabel>
            <Box sx={{ height: 60, width: "100%" }}>
              <ActionBar layered={{ colorScheme: "secondary" }} length={{ percent: 85 }}>
                <ActionButton icon={<PlayArrowIcon />} label="Play" />
                <ActionButton icon={<PauseIcon />} label="Pause" />
                <ActionButton icon={<SkipNextIcon />} label="Next" />
              </ActionBar>
            </Box>
          </Box>

          <Box>
            <ShowcaseLabel secondary="Cloud preset - dramatic glow">Cloud Style</ShowcaseLabel>
            <Box sx={{ height: 70, width: "100%" }}>
              <ActionBar layered={{ preset: "cloud", colorPreset: "cloudStyle" }} thickness="lg" length={{ percent: 85 }}>
                <ActionButton icon={<StarIcon />} label="Star" />
                <ActionButton icon={<FavoriteIcon />} label="Like" />
                <ActionButton icon={<CloudIcon />} label="Cloud" />
              </ActionBar>
            </Box>
          </Box>
        </Stack>
      </DemoSurface>
    </Box>
  ),
}

// =============================================================================
// Presets - Stroke width variations
// =============================================================================

export const Presets: StoryObj = {
  name: "🎛️ Presets",
  render: () => (
    <DemoSurface variant="dark" padding="lg">
      <Stack spacing={4}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Stroke Presets</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Different stroke width ratios for varying visual weight
        </Typography>

        {([
          { preset: "standard", label: "Standard", desc: "Balanced widths (default)" },
          { preset: "thin", label: "Thin", desc: "Subtle, delicate strokes" },
          { preset: "cloud", label: "Cloud", desc: "Dramatic outer glow" },
          { preset: "dramatic", label: "Dramatic (7-3-1)", desc: "High contrast ratio" },
          { preset: "balanced", label: "Balanced", desc: "Even distribution" },
          { preset: "centerFocus", label: "Center Focus", desc: "Emphasizes middle stroke" },
        ] as const).map(({ preset, label, desc }) => (
          <Box key={preset}>
            <ShowcaseLabel secondary={desc}>{label}</ShowcaseLabel>
            <Box sx={{ height: 60, width: "100%" }}>
              <ActionBar layered={{ preset }} length={{ percent: 80 }}>
                <ActionButton icon={<HomeIcon />} label="Home" />
                <ActionButton icon={<SearchIcon />} label="Search" />
                <ActionButton icon={<SettingsIcon />} label="Settings" />
              </ActionBar>
            </Box>
          </Box>
        ))}
      </Stack>
    </DemoSurface>
  ),
}

// =============================================================================
// Visual States
// =============================================================================

export const VisualStates: StoryObj = {
  name: "🎭 Visual States",
  render: () => (
    <Box sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Visual States</Typography>
      <Typography variant="body2" sx={{ mb: 4, color: "text.secondary" }}>
        Use visualState to indicate active, inactive, or hovered states
      </Typography>

      <Stack spacing={4}>
        <Box sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: 2 }}>
          <ShowcaseLabel secondary="visualState: 'active' (default)">Active State</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ visualState: "active" }} length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>

        <Box sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: 2 }}>
          <ShowcaseLabel secondary="visualState: 'inactive' - Dimmed opacity">Inactive State</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ visualState: "inactive" }} length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>

        <Box sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: 2 }}>
          <ShowcaseLabel secondary="visualState: 'hovered' - Enhanced glow">Hovered State</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ visualState: "hovered", preset: "cloud" }} length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>

        <Divider />
        
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          Side-by-side comparison
        </Typography>
        <DemoSurface variant="dark" padding="md">
          <Stack direction="row" spacing={2} sx={{
            justifyContent: "center"
          }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>Inactive</Typography>
              <Box sx={{ height: 50, width: 200 }}>
                <ActionBar layered={{ visualState: "inactive" }}>
                  <ActionButton icon={<HomeIcon />} label="Home" />
                </ActionBar>
              </Box>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>Active</Typography>
              <Box sx={{ height: 50, width: 200 }}>
                <ActionBar layered={{ visualState: "active" }}>
                  <ActionButton icon={<HomeIcon />} label="Home" />
                </ActionBar>
              </Box>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>Hovered</Typography>
              <Box sx={{ height: 50, width: 200 }}>
                <ActionBar layered={{ visualState: "hovered" }}>
                  <ActionButton icon={<HomeIcon />} label="Home" />
                </ActionBar>
              </Box>
            </Box>
          </Stack>
        </DemoSurface>
      </Stack>
    </Box>
  ),
}

// =============================================================================
// Custom Colors
// =============================================================================

export const CustomColors: StoryObj = {
  name: "🎨 Custom Colors",
  render: () => (
    <DemoSurface variant="dark" padding="lg">
      <Stack spacing={4}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Custom Color Themes</Typography>

        <Box>
          <ShowcaseLabel secondary="customBaseColor: '#7c3aed'">Purple</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ colorScheme: "custom", customBaseColor: "#7c3aed" }} length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>

        <Box>
          <ShowcaseLabel secondary="customBaseColor: '#f59e0b'">Gold</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ colorScheme: "custom", customBaseColor: "#f59e0b", colorPreset: "bold" }} length={{ percent: 80 }}>
              <ActionButton icon={<StarIcon />} label="Star" />
              <ActionButton icon={<FavoriteIcon />} label="Like" />
              <ActionButton icon={<CloudIcon />} label="Cloud" />
            </ActionBar>
          </Box>
        </Box>

        <Box>
          <ShowcaseLabel secondary="customBaseColor: '#06b6d4'">Cyan</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ colorScheme: "custom", customBaseColor: "#06b6d4" }} length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>

        <Box>
          <ShowcaseLabel secondary="customBaseColor: '#ec4899'">Pink</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ colorScheme: "custom", customBaseColor: "#ec4899", preset: "cloud" }} length={{ percent: 80 }}>
              <ActionButton icon={<FavoriteIcon />} label="Like" />
              <ActionButton icon={<StarIcon />} label="Star" />
              <ActionButton icon={<HomeIcon />} label="Home" />
            </ActionBar>
          </Box>
        </Box>

        <Box>
          <ShowcaseLabel secondary="customBaseColor: '#22c55e'">Green</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ colorScheme: "custom", customBaseColor: "#22c55e" }} length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>
      </Stack>
    </DemoSurface>
  ),
}

// =============================================================================
// Shapes
// =============================================================================

export const Shapes: StoryObj = {
  name: "📐 Shapes",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: "grey.900" }}>
        Shape Variations
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: "grey.700" }}>
        3-Layer ActionBar supports all standard shapes
      </Typography>

      <Stack spacing={3}>
        {([
          { shape: "pill", label: "Pill", desc: "Fully rounded ends (default)" },
          { shape: "rounded", label: "Rounded", desc: "Medium radius corners" },
          { shape: "soft", label: "Soft Rounded", desc: "Subtle radius" },
          { shape: "square", label: "Square", desc: "Sharp corners" },
        ] as const).map(({ shape, label, desc }) => (
          <Box key={shape} sx={{ bgcolor: "#e0e0e0", p: 3, borderRadius: 2 }}>
            <ShowcaseLabel secondary={desc}>{label}</ShowcaseLabel>
            <Box sx={{ height: 56, width: "100%" }}>
              <ActionBar layered shape={shape} length={{ percent: 70 }}>
                <ActionButton icon={<HomeIcon />} label="Home" />
                <ActionButton icon={<SearchIcon />} label="Search" />
                <ActionButton icon={<SettingsIcon />} label="Settings" />
              </ActionBar>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  ),
}
