import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack, Divider } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import SettingsIcon from "@mui/icons-material/Settings"
import SearchIcon from "@mui/icons-material/Search"
import FavoriteIcon from "@mui/icons-material/Favorite"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import MicIcon from "@mui/icons-material/Mic"
import VideocamIcon from "@mui/icons-material/Videocam"
import ScreenShareIcon from "@mui/icons-material/ScreenShare"
import CallEndIcon from "@mui/icons-material/CallEnd"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import StarIcon from "@mui/icons-material/Star"
import CloudIcon from "@mui/icons-material/Cloud"
import NotificationsIcon from "@mui/icons-material/Notifications"
import PersonIcon from "@mui/icons-material/Person"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import { ActionBar, ActionButton } from "../../../hud-components"
import { DemoSurface } from "@expanse/ui"

const meta: Meta = {
  title: "Layout Systems/HUD Components/ActionBar/Variants",
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

const ShowcaseSection = ({ 
  title, 
  children, 
  dark = false 
}: { 
  title: string
  children: React.ReactNode
  dark?: boolean 
}) => (
  <Box sx={{ mb: 4 }}>
    <Typography 
      variant="h6" 
      sx={{ mb: 2, pb: 1, borderBottom: 1, borderColor: "divider", fontWeight: 600 }}
    >
      {title}
    </Typography>
    <DemoSurface variant={dark ? "dark" : "default"} padding="md">
      <Stack spacing={3}>{children}</Stack>
    </DemoSurface>
  </Box>
)

// =============================================================================
// Main Showcase: Best Variants
// =============================================================================

export const BestVariantsShowcase: StoryObj = {
  name: "✨ Best Variants",
  render: () => (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>ActionBar Showcase</Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        A curated collection of the best ActionBar configurations
      </Typography>

      {/* Primary Color Bars */}
      <ShowcaseSection title="🎨 Primary Color Backgrounds" dark>
        <Box>
          <ShowcaseLabel secondary="colorMode='primary' - Uses theme primary color">Primary Solid</ShowcaseLabel>
          <ActionBar colorMode="primary" shape="pill">
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<NotificationsIcon />} label="Alerts" />
            <ActionButton icon={<PersonIcon />} label="Profile" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel secondary="colorMode='secondary' - Uses theme secondary color">Secondary Solid</ShowcaseLabel>
          <ActionBar colorMode="secondary" shape="rounded">
            <ActionButton icon={<DashboardIcon />} label="Dashboard" />
            <ActionButton icon={<AnalyticsIcon />} label="Analytics" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
      </ShowcaseSection>

      {/* Gradient Bars */}
      <ShowcaseSection title="🌈 Gradient Backgrounds" dark>
        <Box>
          <ShowcaseLabel secondary="gradient='primary-blend' - Primary light → dark">Primary Blend</ShowcaseLabel>
          <ActionBar gradient="primary-blend" shape="pill">
            <ActionButton icon={<PlayArrowIcon />} label="Play" />
            <ActionButton icon={<PauseIcon />} label="Pause" />
            <ActionButton icon={<SkipNextIcon />} label="Next" />
            <ActionButton icon={<VolumeUpIcon />} label="Volume" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel secondary="Custom gradient: purple → cyan">Custom Gradient</ShowcaseLabel>
          <ActionBar gradient={{ direction: "horizontal", from: "#7c3aed", to: "#06b6d4" }} shape="rounded">
            <ActionButton icon={<StarIcon />} label="Star" />
            <ActionButton icon={<FavoriteIcon />} label="Like" />
            <ActionButton icon={<CloudIcon />} label="Cloud" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel secondary="Radial gradient with glow effect">Radial Glow</ShowcaseLabel>
          <ActionBar gradient={{ direction: "radial", from: "rgba(99, 102, 241, 0.8)", via: "rgba(99, 102, 241, 0.4)", to: "rgba(0, 0, 0, 0.9)" }} shape="pill" blur={8}>
            <ActionButton icon={<AddIcon />} label="Add" />
            <ActionButton icon={<EditIcon />} label="Edit" />
            <ActionButton icon={<DeleteIcon />} label="Delete" />
          </ActionBar>
        </Box>
      </ShowcaseSection>

      {/* Asymmetric Shapes */}
      <ShowcaseSection title="📐 Asymmetric Edge Shapes" dark>
        <Box>
          <ShowcaseLabel secondary="shape='pill-top' - Rounded top, flat bottom">Pill Top</ShowcaseLabel>
          <ActionBar variant="glass" shape="pill-top">
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel secondary="shape='pill-bottom' - Flat top, rounded bottom">Pill Bottom</ShowcaseLabel>
          <ActionBar variant="frosted" shape="pill-bottom">
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <ShowcaseLabel secondary="shape='pill-left'">Pill Left</ShowcaseLabel>
            <ActionBar variant="solid" shape="pill-left" orientation="vertical" thickness="md">
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
          <Box sx={{ flex: 1 }}>
            <ShowcaseLabel secondary="shape='pill-right'">Pill Right</ShowcaseLabel>
            <ActionBar variant="solid" shape="pill-right" orientation="vertical" thickness="md">
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Stack>
        <Box>
          <ShowcaseLabel secondary="Custom: { topLeft: 28, topRight: 0, bottomLeft: 0, bottomRight: 28 }">Diagonal Beveled</ShowcaseLabel>
          <ActionBar variant="technical" shape={{ topLeft: 28, topRight: 0, bottomLeft: 0, bottomRight: 28 }}>
            <ActionButton icon={<DashboardIcon />} label="Dashboard" />
            <ActionButton icon={<AnalyticsIcon />} label="Analytics" />
            <ActionButton icon={<CloudIcon />} label="Cloud" />
          </ActionBar>
        </Box>
      </ShowcaseSection>

      {/* 3-Layer SVG Bars */}
      <ShowcaseSection title="🎭 3-Layer Brand Style (SVG)" dark>
        <Box>
          <ShowcaseLabel secondary="layered={true} - Default 3-layer style">Default Layered</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>
        <Box>
          <ShowcaseLabel secondary="colorScheme='secondary'">Secondary Colors</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ colorScheme: "secondary" }} length={{ percent: 80 }}>
              <ActionButton icon={<PlayArrowIcon />} label="Play" />
              <ActionButton icon={<PauseIcon />} label="Pause" />
              <ActionButton icon={<SkipNextIcon />} label="Next" />
            </ActionBar>
          </Box>
        </Box>
        <Box>
          <ShowcaseLabel secondary="Custom purple colors">Custom Layers</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ colorScheme: "custom", customBaseColor: "#7c3aed", preset: "dramatic" }} length={{ percent: 80 }}>
              <ActionButton icon={<AddIcon />} label="Add" />
              <ActionButton icon={<EditIcon />} label="Edit" />
              <ActionButton icon={<DeleteIcon />} label="Delete" />
            </ActionBar>
          </Box>
        </Box>
      </ShowcaseSection>

      {/* Attached Mode */}
      <ShowcaseSection title="📎 Attached Edge Styling" dark>
        <Box>
          <ShowcaseLabel secondary="attached='bottom' - Shadow projects upward">Attached Bottom</ShowcaseLabel>
          <ActionBar variant="glass" attached="bottom" shape="pill-top">
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<NotificationsIcon />} label="Alerts" />
            <ActionButton icon={<PersonIcon />} label="Profile" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel secondary="attached='top' - Shadow projects downward">Attached Top</ShowcaseLabel>
          <ActionBar variant="frosted" attached="top" shape="pill-bottom">
            <ActionButton icon={<DashboardIcon />} label="Dashboard" />
            <ActionButton icon={<AnalyticsIcon />} label="Analytics" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
      </ShowcaseSection>

      {/* Combined Features */}
      <ShowcaseSection title="🔥 Combined Features" dark>
        <Box>
          <ShowcaseLabel secondary="Gradient + Asymmetric + Attached">Media Player</ShowcaseLabel>
          <ActionBar gradient="primary-blend" shape="pill-top" attached="bottom" thickness="lg">
            <ActionButton icon={<SkipPreviousIcon />} label="Previous" />
            <ActionButton icon={<PlayArrowIcon />} label="Play" size="lg" />
            <ActionButton icon={<SkipNextIcon />} label="Next" />
            <Box sx={{ width: 1, bgcolor: "rgba(255,255,255,0.2)", mx: 1 }} />
            <ActionButton icon={<VolumeUpIcon />} label="Volume" />
            <ActionButton icon={<FavoriteIcon />} label="Like" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel secondary="Layered + Gold custom colors">Premium Toolbar</ShowcaseLabel>
          <Box sx={{ height: 70, width: "100%" }}>
            <ActionBar layered={{ preset: "cloud", colorScheme: "custom", customBaseColor: "#f59e0b" }} length={{ percent: 90 }} thickness="lg">
              <ActionButton icon={<StarIcon />} label="Star" />
              <ActionButton icon={<FavoriteIcon />} label="Like" />
              <ActionButton icon={<AddIcon />} label="Add" />
              <ActionButton icon={<EditIcon />} label="Edit" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>
        <Box>
          <ShowcaseLabel secondary="Glass + Gradient">Video Call Bar</ShowcaseLabel>
          <ActionBar gradient={{ direction: "horizontal", from: "rgba(0, 0, 0, 0.9)", via: "rgba(99, 102, 241, 0.3)", to: "rgba(0, 0, 0, 0.9)" }} shape="capsule" blur={16}>
            <ActionButton icon={<MicIcon />} label="Mute" />
            <ActionButton icon={<VideocamIcon />} label="Camera" />
            <ActionButton icon={<ScreenShareIcon />} label="Share" />
            <Box sx={{ width: 1, bgcolor: "rgba(255,255,255,0.2)", mx: 1, height: 32 }} />
            <ActionButton icon={<CallEndIcon />} label="End" />
          </ActionBar>
        </Box>
      </ShowcaseSection>
    </Box>
  ),
}

// =============================================================================
// Color Modes
// =============================================================================

export const ColorModes: StoryObj = {
  name: "🎨 Color Modes",
  render: () => (
    <DemoSurface variant="dark" padding="lg">
      <Stack spacing={4}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Color Modes</Typography>
        <Box>
          <ShowcaseLabel secondary="Default dark glass appearance">Surface (Default)</ShowcaseLabel>
          <ActionBar colorMode="surface">
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel secondary="Uses theme.palette.primary.main">Primary</ShowcaseLabel>
          <ActionBar colorMode="primary">
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel secondary="Uses theme.palette.secondary.main">Secondary</ShowcaseLabel>
          <ActionBar colorMode="secondary">
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel secondary="Use with gradient or bgcolor override">Custom</ShowcaseLabel>
          <ActionBar colorMode="custom" bgcolor="#7c3aed">
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
      </Stack>
    </DemoSurface>
  ),
}

// =============================================================================
// Gradients
// =============================================================================

export const Gradients: StoryObj = {
  name: "🌈 Gradients",
  render: () => (
    <DemoSurface variant="dark" padding="lg">
      <Stack spacing={4}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Gradient Backgrounds</Typography>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>Preset Gradients</Typography>
        
        {(["primary-blend", "secondary-blend", "primary-glow", "glass-primary", "glass-secondary", "dark-fade"] as const).map((preset) => (
          <Box key={preset}>
            <ShowcaseLabel>{preset}</ShowcaseLabel>
            <ActionBar gradient={preset} blur={preset.includes("glass") ? 12 : undefined}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>Custom Gradients</Typography>
        
        <Box>
          <ShowcaseLabel>Horizontal (default direction)</ShowcaseLabel>
          <ActionBar gradient={{ from: "#ec4899", to: "#8b5cf6" }}>
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel>Vertical</ShowcaseLabel>
          <ActionBar gradient={{ direction: "vertical", from: "#06b6d4", to: "#3b82f6" }}>
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel>Diagonal</ShowcaseLabel>
          <ActionBar gradient={{ direction: "diagonal", from: "#f59e0b", to: "#ef4444" }}>
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel>Radial</ShowcaseLabel>
          <ActionBar gradient={{ direction: "radial", from: "#22c55e", to: "#15803d" }}>
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel>3-Stop Gradient (via)</ShowcaseLabel>
          <ActionBar gradient={{ from: "#3b82f6", via: "#8b5cf6", to: "#ec4899" }}>
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
      </Stack>
    </DemoSurface>
  ),
}

// =============================================================================
// Asymmetric Shapes
// =============================================================================

export const AsymmetricShapes: StoryObj = {
  name: "📐 Asymmetric Shapes",
  render: () => (
    <DemoSurface variant="dark" padding="lg">
      <Stack spacing={4}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Asymmetric Edge Shapes</Typography>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>Edge Presets</Typography>
        
        <Stack direction="row" spacing={2} sx={{
          flexWrap: "wrap"
        }}>
          {(["pill-top", "pill-bottom"] as const).map((shape) => (
            <Box key={shape} sx={{ minWidth: 200 }}>
              <ShowcaseLabel>{shape}</ShowcaseLabel>
              <ActionBar variant="glass" shape={shape}>
                <ActionButton icon={<HomeIcon />} label="Home" />
                <ActionButton icon={<SearchIcon />} label="Search" />
              </ActionBar>
            </Box>
          ))}
        </Stack>
        
        <Stack direction="row" spacing={4}>
          {(["pill-left", "pill-right"] as const).map((shape) => (
            <Box key={shape}>
              <ShowcaseLabel>{shape}</ShowcaseLabel>
              <ActionBar variant="glass" shape={shape} orientation="vertical" thickness="md">
                <ActionButton icon={<HomeIcon />} label="Home" />
                <ActionButton icon={<SearchIcon />} label="Search" />
                <ActionButton icon={<SettingsIcon />} label="Settings" />
              </ActionBar>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>Beveled Corners</Typography>
        
        <Stack direction="row" spacing={2} sx={{
          flexWrap: "wrap"
        }}>
          {(["beveled-tl", "beveled-tr", "beveled-bl", "beveled-br"] as const).map((shape) => (
            <Box key={shape} sx={{ minWidth: 200 }}>
              <ShowcaseLabel>{shape}</ShowcaseLabel>
              <ActionBar variant="solid" shape={shape}>
                <ActionButton icon={<HomeIcon />} label="Home" />
                <ActionButton icon={<SearchIcon />} label="Search" />
              </ActionBar>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>Custom Asymmetric</Typography>
        
        <Box>
          <ShowcaseLabel>Diagonal: topLeft + bottomRight rounded</ShowcaseLabel>
          <ActionBar variant="technical" shape={{ topLeft: 28, topRight: 0, bottomLeft: 0, bottomRight: 28 }}>
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
        <Box>
          <ShowcaseLabel>Different radii per corner</ShowcaseLabel>
          <ActionBar variant="frosted" shape={{ topLeft: 28, topRight: 12, bottomLeft: 6, bottomRight: 0 }}>
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
      </Stack>
    </DemoSurface>
  ),
}

// =============================================================================
// Layered Variants (3-Layer SVG)
// =============================================================================

export const LayeredVariants: StoryObj = {
  name: "🎭 3-Layer SVG",
  render: () => (
    <DemoSurface variant="dark" padding="lg">
      <Stack spacing={4}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>3-Layer Brand Style (SVG)</Typography>
        
        <Box>
          <ShowcaseLabel secondary="Default configuration">Basic Layered</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>
        
        <Box>
          <ShowcaseLabel secondary="colorScheme: 'secondary'">Secondary Palette</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ colorScheme: "secondary" }} length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>Stroke Width Variations</Typography>
        
        <Box>
          <ShowcaseLabel secondary="preset: thin">Thin Stroke</ShowcaseLabel>
          <Box sx={{ height: 56, width: "100%" }}>
            <ActionBar layered={{ preset: "thin" }} length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>
        <Box>
          <ShowcaseLabel secondary="preset: cloud (dramatic glow)">Cloud Stroke</ShowcaseLabel>
          <Box sx={{ height: 70, width: "100%" }}>
            <ActionBar layered={{ preset: "cloud", colorPreset: "cloudStyle" }} length={{ percent: 80 }} thickness="lg">
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>Custom Colors</Typography>
        
        <Box>
          <ShowcaseLabel secondary="Purple theme">Custom Purple</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ colorScheme: "custom", customBaseColor: "#7c3aed" }} length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>
        <Box>
          <ShowcaseLabel secondary="Gold theme">Custom Gold</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ colorScheme: "custom", customBaseColor: "#f59e0b", colorPreset: "bold" }} length={{ percent: 80 }}>
              <ActionButton icon={<StarIcon />} label="Star" />
              <ActionButton icon={<FavoriteIcon />} label="Like" />
              <ActionButton icon={<CloudIcon />} label="Cloud" />
            </ActionBar>
          </Box>
        </Box>
        <Box>
          <ShowcaseLabel secondary="Cyan theme">Custom Cyan</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ colorScheme: "custom", customBaseColor: "#06b6d4", preset: "standard" }} length={{ percent: 80 }}>
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
// Attached Modes
// =============================================================================

export const AttachedModes: StoryObj = {
  name: "📎 Attached Mode",
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>Attached Edge Styling</Typography>
      <Typography variant="body2" sx={{ mb: 4, color: "text.secondary" }}>
        When attached to an edge, the ActionBar's shadow is directed away from that edge.
        Combine with asymmetric shapes for edge-hugging designs.
      </Typography>

      <Stack spacing={4}>
        <Box sx={{ position: "relative", height: 200, bgcolor: "grey.900", borderRadius: 2, overflow: "hidden" }}>
          <Box sx={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)" }}>
            <ActionBar variant="glass" attached="bottom" shape="pill-top">
              <ActionButton icon={<SkipPreviousIcon />} label="Prev" />
              <ActionButton icon={<PlayArrowIcon />} label="Play" />
              <ActionButton icon={<SkipNextIcon />} label="Next" />
              <ActionButton icon={<VolumeUpIcon />} label="Vol" />
            </ActionBar>
          </Box>
          <Typography variant="caption" sx={{ position: "absolute", top: 8, left: 8, color: "grey.500" }}>
            attached="bottom" + shape="pill-top"
          </Typography>
        </Box>

        <Box sx={{ position: "relative", height: 200, bgcolor: "grey.900", borderRadius: 2, overflow: "hidden" }}>
          <Box sx={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }}>
            <ActionBar variant="frosted" attached="top" shape="pill-bottom">
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<NotificationsIcon />} label="Alerts" />
              <ActionButton icon={<PersonIcon />} label="Profile" />
            </ActionBar>
          </Box>
          <Typography variant="caption" sx={{ position: "absolute", bottom: 8, left: 8, color: "grey.500" }}>
            attached="top" + shape="pill-bottom"
          </Typography>
        </Box>

        <Box sx={{ position: "relative", height: 300, bgcolor: "grey.900", borderRadius: 2, overflow: "hidden" }}>
          <Box sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}>
            <ActionBar variant="solid" attached="left" shape="pill-right" orientation="vertical" thickness="md">
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<DashboardIcon />} label="Dash" />
              <ActionButton icon={<AnalyticsIcon />} label="Stats" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
          <Typography variant="caption" sx={{ position: "absolute", top: 8, right: 8, color: "grey.500" }}>
            attached="left" + shape="pill-right" + vertical
          </Typography>
        </Box>

        <Box sx={{ position: "relative", height: 300, bgcolor: "grey.900", borderRadius: 2, overflow: "hidden" }}>
          <Box sx={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}>
            <ActionBar variant="glass" attached="right" shape="pill-left" orientation="vertical" thickness="md">
              <ActionButton icon={<AddIcon />} label="Add" />
              <ActionButton icon={<EditIcon />} label="Edit" />
              <ActionButton icon={<DeleteIcon />} label="Delete" />
              <ActionButton icon={<MoreVertIcon />} label="More" />
            </ActionBar>
          </Box>
          <Typography variant="caption" sx={{ position: "absolute", top: 8, left: 8, color: "grey.500" }}>
            attached="right" + shape="pill-left" + vertical
          </Typography>
        </Box>
      </Stack>
    </Box>
  ),
}

// =============================================================================
// All Variants Grid
// =============================================================================

export const AllVariantsGrid: StoryObj = {
  name: "📊 All Variants Grid",
  render: () => (
    <DemoSurface variant="dark" padding="lg">
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>All Variant × Shape Combinations</Typography>
      <Stack spacing={4}>
        {(["glass", "solid", "frosted", "minimal", "outlined", "technical"] as const).map((variant) => (
          <Box key={variant}>
            <Typography variant="subtitle2" sx={{ mb: 2, textTransform: "capitalize" }}>{variant}</Typography>
            <Stack direction="row" spacing={2} useFlexGap sx={{
              flexWrap: "wrap"
            }}>
              {(["pill", "rounded", "soft", "square", "capsule"] as const).map((shape) => (
                <Box key={shape} sx={{ minWidth: 180 }}>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>{shape}</Typography>
                  <ActionBar variant={variant} shape={shape}>
                    <ActionButton icon={<HomeIcon />} label="Home" />
                    <ActionButton icon={<SearchIcon />} label="Search" />
                    <ActionButton icon={<SettingsIcon />} label="Settings" />
                  </ActionBar>
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </DemoSurface>
  ),
}

// =============================================================================
// Light Mode Preview
// =============================================================================

export const LightModePreview: StoryObj = {
  name: "☀️ Light Mode Preview",
  parameters: {
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: "grey.900" }}>
        ActionBar Light Mode
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "grey.700" }}>
        How ActionBars appear in light mode environments
      </Typography>

      {/* Layered Style - Best for Light Mode */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, pb: 1, borderBottom: 1, borderColor: "grey.200", fontWeight: 600, color: "grey.900" }}>
          3-Layer SVG (Recommended for Light Mode)
        </Typography>
        <Box sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: 2, mb: 2 }}>
          <ShowcaseLabel secondary="Default primary colors">Standard Layered</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>
        <Box sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: 2, mb: 2 }}>
          <ShowcaseLabel secondary="visualState: 'inactive' - Dimmed appearance">Inactive State</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ visualState: "inactive" }} length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>
        <Box sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: 2 }}>
          <ShowcaseLabel secondary="visualState: 'hovered' - Enhanced glow">Hover State</ShowcaseLabel>
          <Box sx={{ height: 60, width: "100%" }}>
            <ActionBar layered={{ visualState: "hovered", preset: "cloud" }} length={{ percent: 80 }}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Box>
      </Box>

      {/* Solid Variants */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, pb: 1, borderBottom: 1, borderColor: "grey.200", fontWeight: 600, color: "grey.900" }}>
          Solid Color Backgrounds
        </Typography>
        <Stack spacing={2} sx={{ bgcolor: "#fafafa", p: 3, borderRadius: 2 }}>
          <Box>
            <ShowcaseLabel>Primary Solid</ShowcaseLabel>
            <ActionBar colorMode="primary" shape="pill">
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
          <Box>
            <ShowcaseLabel>Secondary Solid</ShowcaseLabel>
            <ActionBar colorMode="secondary" shape="rounded">
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        </Stack>
      </Box>

      {/* Shape Variations */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, pb: 1, borderBottom: 1, borderColor: "grey.200", fontWeight: 600, color: "grey.900" }}>
          Shape Variations (3-Layer)
        </Typography>
        <Stack spacing={2} sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: 2 }}>
          <Box>
            <ShowcaseLabel secondary="shape: 'pill' (default)">Pill Shape</ShowcaseLabel>
            <Box sx={{ height: 56, width: "100%" }}>
              <ActionBar layered={{ colorScheme: "primary" }} shape="pill" length={{ percent: 70 }}>
                <ActionButton icon={<HomeIcon />} label="Home" />
                <ActionButton icon={<SearchIcon />} label="Search" />
              </ActionBar>
            </Box>
          </Box>
          <Box>
            <ShowcaseLabel secondary="shape: 'rounded'">Rounded Shape</ShowcaseLabel>
            <Box sx={{ height: 56, width: "100%" }}>
              <ActionBar layered={{ colorScheme: "primary" }} shape="rounded" length={{ percent: 70 }}>
                <ActionButton icon={<HomeIcon />} label="Home" />
                <ActionButton icon={<SearchIcon />} label="Search" />
              </ActionBar>
            </Box>
          </Box>
          <Box>
            <ShowcaseLabel secondary="shape: 'square'">Square Shape</ShowcaseLabel>
            <Box sx={{ height: 56, width: "100%" }}>
              <ActionBar layered={{ colorScheme: "secondary" }} shape="square" length={{ percent: 70 }}>
                <ActionButton icon={<HomeIcon />} label="Home" />
                <ActionButton icon={<SearchIcon />} label="Search" />
              </ActionBar>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  ),
}
