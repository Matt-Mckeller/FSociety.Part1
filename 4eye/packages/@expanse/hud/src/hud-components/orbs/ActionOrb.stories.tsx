import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MicIcon from "@mui/icons-material/Mic";
import BuildIcon from "@mui/icons-material/Build";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

import { ActionOrb } from "./ActionOrb";
import { OrbCluster } from "./OrbCluster";
import type { OrbItem, OrbShape, OrbVariant, OrbColor, OrbSize, OrbPattern, OrbColorMode, HotkeyDisplayStyle } from "./types";

// =============================================================================
// Theme-Aware Demo Container
// =============================================================================

/**
 * Theme-aware container that uses MUI palette colors.
 * Responds to theme changes from the Storybook toolbar.
 */
const DemoContainer = ({
  children,
  title,
  width = "100%",
  height,
}: {
  children: React.ReactNode;
  title?: string;
  width?: string | number;
  height?: number;
}) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: "relative",
        width,
        height: height || 200,
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {title && (
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: 8,
            left: 12,
            color: "text.secondary",
            fontSize: 11,
          }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};

// =============================================================================
// Meta
// =============================================================================

const meta: Meta<typeof ActionOrb> = {
  title: "Layout Systems/HUD Components/Orbs",
  component: ActionOrb,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    // Backgrounds handled by @expanse/theme via Storybook toolbar
    backgrounds: { disable: true },
    docs: {
      description: {
        component: `
**Action Orbs** - Floating action buttons for spatial/HUD interfaces.

Colors automatically adapt to the selected theme from the toolbar.
Use **🎮 Gamified** or **🎎 Gamified (Japan)** themes for ability colors.

**Features:**
- Shapes: circle, square, diamond, hexagon, pill
- Variants: glass, glow, pulse, outline, solid
- Colors: ai, primary, success, warning, danger, cyan, mint
- Theme integration: uses \`colorMode="auto"\` for theme adaptation

**Use Cases:**
- AI assistant buttons
- Quick actions in canvas/game interfaces
- Ability buttons in game HUDs
- Context-sensitive floating actions
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionOrb>;

// =============================================================================
// Basic Stories
// =============================================================================

export const Default: Story = {
  render: () => (
    <DemoContainer title="Default Action Orb">
      <ActionOrb 
        icon={<AutoAwesomeIcon />} 
        label="AI Assistant" 
        onClick={() => console.log("clicked")}
      />
    </DemoContainer>
  ),
};

// =============================================================================
// All Shapes
// =============================================================================

export const Shapes: Story = {
  name: "Shape Variations",
  render: () => {
    const shapes: OrbShape[] = ["circle", "square", "diamond", "hexagon", "pill"];
    
    return (
      <DemoContainer title="All Shapes - colorMode auto" height={120}>
        <Stack direction="row" spacing={3} sx={{
          alignItems: "center"
        }}>
          {shapes.map((shape) => (
            <Box key={shape} sx={{ textAlign: "center" }}>
              <ActionOrb
                icon={<AutoAwesomeIcon />}
                label={shape}
                shape={shape}
                size="lg"
                color="primary"
              />
              <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block" }}>
                {shape}
              </Typography>
            </Box>
          ))}
        </Stack>
      </DemoContainer>
    );
  },
};

// =============================================================================
// All Variants
// =============================================================================

export const Variants: Story = {
  name: "Visual Variants",
  render: () => {
    const variants: OrbVariant[] = ["glass", "solid", "glow", "pulse", "outline"];
    
    return (
      <DemoContainer title="Visual Variants" height={120}>
        <Stack direction="row" spacing={3} sx={{
          alignItems: "center"
        }}>
          {variants.map((variant) => (
            <Box key={variant} sx={{ textAlign: "center" }}>
              <ActionOrb
                icon={<AutoAwesomeIcon />}
                label={variant}
                variant={variant}
                color="ai"
                size="lg"
              />
              <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block" }}>
                {variant}
              </Typography>
            </Box>
          ))}
        </Stack>
      </DemoContainer>
    );
  },
};

// =============================================================================
// All Colors
// =============================================================================

export const Colors: Story = {
  name: "Color Presets",
  render: () => {
    const colors: OrbColor[] = ["default", "ai", "primary", "success", "warning", "danger", "cyan", "mint"];
    
    return (
      <DemoContainer title="Color Presets (including Cyan & Mint)" height={120}>
        <Stack direction="row" spacing={2} sx={{
          alignItems: "center"
        }}>
          {colors.map((color) => (
            <Box key={color} sx={{ textAlign: "center" }}>
              <ActionOrb
                icon={<AutoAwesomeIcon />}
                label={color}
                color={color}
                variant="glass"
                size="md"
              />
              <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block", fontSize: 10 }}>
                {color}
              </Typography>
            </Box>
          ))}
        </Stack>
      </DemoContainer>
    );
  },
};

// =============================================================================
// All Sizes
// =============================================================================

export const Sizes: Story = {
  name: "Size Options",
  render: () => {
    const sizes: OrbSize[] = ["xs", "sm", "md", "lg", "xl"];
    
    return (
      <DemoContainer title="Size Options" height={120}>
        <Stack direction="row" spacing={2} sx={{
          alignItems: "center"
        }}>
          {sizes.map((size) => (
            <Box key={size} sx={{ textAlign: "center" }}>
              <ActionOrb
                icon={<AutoAwesomeIcon />}
                label={size}
                size={size}
                color="primary"
              />
              <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block" }}>
                {size}
              </Typography>
            </Box>
          ))}
        </Stack>
      </DemoContainer>
    );
  },
};

// =============================================================================
// Theme-Aware Colors (Auto Mode)
// =============================================================================

export const ColorModes: Story = {
  name: "Theme-Aware Colors",
  parameters: {
    docs: {
      description: {
        story: `
Orbs automatically adapt to the current theme mode (light/dark) from the toolbar.

Use **colorMode="auto"** (default) to let orbs read from the MUI theme.
Try switching between ☀️ Light and 🌙 Dark in the toolbar!
        `,
      },
    },
  },
  render: () => (
    <Stack spacing={2}>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        💡 Use the Mode toggle in the toolbar to switch between Light and Dark
      </Typography>
      <DemoContainer title='colorMode="auto" (adapts to theme)' height={120}>
        <Stack direction="row" spacing={2}>
          <ActionOrb icon={<AutoAwesomeIcon />} label="AI" color="ai" />
          <ActionOrb icon={<MicIcon />} label="Voice" color="primary" />
          <ActionOrb icon={<BuildIcon />} label="Tools" color="success" />
          <ActionOrb icon={<FavoriteIcon />} label="Heal" color="mint" />
          <ActionOrb icon={<StarIcon />} label="Shield" color="cyan" />
        </Stack>
      </DemoContainer>
    </Stack>
  ),
};

// =============================================================================
// With Badges
// =============================================================================

export const WithBadges: Story = {
  name: "Badges & States",
  render: () => (
    <DemoContainer title="Badges & Disabled State" height={120}>
      <Stack direction="row" spacing={3} sx={{
        alignItems: "center"
      }}>
        <Box sx={{ textAlign: "center" }}>
          <ActionOrb icon={<NotificationsIcon />} label="Notifications" badge={5} color="primary" />
          <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block" }}>
            badge: 5
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <ActionOrb icon={<ChatIcon />} label="Messages" badge={99} color="ai" />
          <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block" }}>
            badge: 99
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <ActionOrb icon={<SettingsIcon />} label="Disabled" disabled color="default" />
          <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block" }}>
            disabled
          </Typography>
        </Box>
      </Stack>
    </DemoContainer>
  ),
};

// =============================================================================
// OrbCluster - Bottom Arc
// =============================================================================

const defaultItems: OrbItem[] = [
  { id: "ai", icon: <AutoAwesomeIcon />, label: "AI Assistant", color: "ai" },
  { id: "voice", icon: <MicIcon />, label: "Voice Input", color: "primary" },
  { id: "camera", icon: <CameraAltIcon />, label: "Camera", color: "success" },
];

export const ClusterBottomArc: Story = {
  name: "Cluster: Bottom Arc",
  render: () => (
    <DemoContainer title="Bottom Arc Pattern - Theme Aware" height={200}>
      <OrbCluster
        items={defaultItems}
        pattern="bottom-arc"
        size="lg"
        variant="glass"
        colorMode="auto"
        containerWidth={400}
        containerHeight={180}
      />
    </DemoContainer>
  ),
};

// =============================================================================
// OrbCluster - All Patterns
// =============================================================================

export const ClusterPatterns: Story = {
  name: "Cluster: All Patterns",
  render: () => {
    const patterns: OrbPattern[] = [
      "bottom-arc",
      "top-arc",
      "left-stack",
      "right-stack",
      "radial",
      "corners",
      "diagonal-tl",
      "bottom-row",
    ];

    const fourItems: OrbItem[] = [
      { id: "1", icon: <AutoAwesomeIcon />, label: "AI", color: "ai" },
      { id: "2", icon: <MicIcon />, label: "Voice", color: "primary" },
      { id: "3", icon: <CameraAltIcon />, label: "Camera", color: "success" },
      { id: "4", icon: <SettingsIcon />, label: "Settings", color: "warning" },
    ];

    return (
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2, p: 2 }}>
        {patterns.map((pattern) => (
          <DemoContainer key={pattern} title={pattern} height={220}>
            <OrbCluster
              items={fourItems}
              pattern={pattern}
              size="md"
              variant="glass"
              colorMode="auto"
              containerWidth={350}
              containerHeight={200}
            />
          </DemoContainer>
        ))}
      </Box>
    );
  },
};

// =============================================================================
// OrbCluster - With Collapse
// =============================================================================

export const ClusterCollapsible: Story = {
  name: "Cluster: Collapsible",
  render: function CollapsibleDemo() {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <Stack spacing={2}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Click the arrow to toggle collapse state
        </Typography>
        <DemoContainer title={collapsed ? "Collapsed" : "Expanded"} height={collapsed ? 100 : 200}>
          <OrbCluster
            items={defaultItems}
            pattern="bottom-arc"
            size="lg"
            variant="glass"
            colorMode="auto"
            containerWidth={400}
            containerHeight={180}
            collapsed={collapsed}
            onCollapseChange={setCollapsed}
          />
        </DemoContainer>
      </Stack>
    );
  },
};

// =============================================================================
// AI Assistant Example
// =============================================================================

export const AIAssistantExample: Story = {
  name: "Example: AI Assistant",
  render: () => {
    const aiItems: OrbItem[] = [
      { id: "ai", icon: <AutoAwesomeIcon />, label: "Ask AI", color: "ai" },
      { id: "voice", icon: <MicIcon />, label: "Voice Mode", color: "primary" },
      { id: "history", icon: <ChatIcon />, label: "Chat History", color: "default", badge: 3 },
    ];

    return (
      <Box
        sx={{
          position: "relative",
          width: 600,
          height: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Fake canvas content */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.disabled",
          }}
        >
          <Typography variant="h6">Canvas / Document Area</Typography>
        </Box>

        {/* AI orbs at bottom */}
        <Box sx={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}>
          <OrbCluster
            items={aiItems}
            pattern="bottom-arc"
            size="lg"
            variant="glow"
            colorMode="auto"
            containerWidth={350}
            containerHeight={150}
          />
        </Box>
      </Box>
    );
  },
};

// =============================================================================
// Game HUD Example
// =============================================================================

export const GameHUDExample: Story = {
  name: "Example: Game Abilities",
  parameters: {
    docs: {
      description: {
        story: 'Try switching to **🎮 Gamified** theme for vibrant ability colors!',
      },
    },
  },
  render: () => {
    const abilityItems: OrbItem[] = [
      { id: "heal", icon: <FavoriteIcon />, label: "Heal (Q)", color: "mint" },
      { id: "shield", icon: <StarIcon />, label: "Shield (W)", color: "cyan" },
      { id: "attack", icon: <PlayArrowIcon />, label: "Attack (E)", color: "danger" },
      { id: "ultimate", icon: <AutoAwesomeIcon />, label: "Ultimate (R)", color: "ai" },
    ];

    return (
      <Box
        sx={{
          position: "relative",
          width: 700,
          height: 450,
          bgcolor: "background.paper",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Fake game content */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.disabled",
          }}
        >
          <Typography variant="h5">Game View</Typography>
        </Box>

        {/* Abilities at bottom right */}
        <Box sx={{ position: "absolute", bottom: 20, right: 20 }}>
          <OrbCluster
            items={abilityItems}
            pattern="bottom-row"
            size="xl"
            shape="diamond"
            variant="glass"
            colorMode="auto"
            spacing={8}
            containerWidth={300}
            containerHeight={100}
          />
        </Box>

        {/* Quick actions at left */}
        <Box sx={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)" }}>
          <OrbCluster
            items={[
              { id: "pause", icon: <PauseIcon />, label: "Pause", color: "default" },
              { id: "volume", icon: <VolumeUpIcon />, label: "Volume", color: "default" },
              { id: "settings", icon: <SettingsIcon />, label: "Settings", color: "default" },
            ]}
            pattern="left-stack"
            size="md"
            shape="square"
            variant="glass"
            colorMode="auto"
            containerWidth={80}
            containerHeight={200}
          />
        </Box>
      </Box>
    );
  },
};

// =============================================================================
// Hotkey Display Styles
// =============================================================================

export const HotkeyDisplayStyles: Story = {
  name: "Hotkey Display Styles",
  render: () => {
    const hotkeyStyles: HotkeyDisplayStyle[] = ["none", "badge", "overlay", "underline", "ring"];
    
    return (
      <Stack spacing={3}>
        {hotkeyStyles.map((style) => (
          <DemoContainer key={style} title={`hotkeyDisplay: "${style}"`} height={100}>
            <Stack direction="row" spacing={3} sx={{
              alignItems: "center"
            }}>
              <ActionOrb
                icon={<FavoriteIcon />}
                label="Heal"
                color="mint"
                size="lg"
                hotkey="Q"
                hotkeyDisplay={style}
              />
              <ActionOrb
                icon={<StarIcon />}
                label="Shield"
                color="cyan"
                size="lg"
                hotkey="W"
                hotkeyDisplay={style}
              />
              <ActionOrb
                icon={<PlayArrowIcon />}
                label="Attack"
                color="danger"
                size="lg"
                hotkey="E"
                hotkeyDisplay={style}
              />
              <ActionOrb
                icon={<AutoAwesomeIcon />}
                label="Ultimate"
                color="ai"
                size="lg"
                hotkey="R"
                hotkeyDisplay={style}
              />
            </Stack>
          </DemoContainer>
        ))}
      </Stack>
    );
  },
};

// =============================================================================
// Game Abilities with Hotkeys
// =============================================================================

export const GameAbilitiesWithHotkeys: Story = {
  name: "Example: Game HUD with Hotkeys",
  parameters: {
    docs: {
      description: {
        story: 'Switch to **🎮 Gamified** theme for electric cyan/mint ability colors!',
      },
    },
  },
  render: () => {
    const abilityItems: OrbItem[] = [
      { id: "heal", icon: <FavoriteIcon />, label: "Heal", color: "mint", hotkey: "Q" },
      { id: "shield", icon: <StarIcon />, label: "Shield", color: "cyan", hotkey: "W" },
      { id: "attack", icon: <PlayArrowIcon />, label: "Attack", color: "danger", hotkey: "E" },
      { id: "ultimate", icon: <AutoAwesomeIcon />, label: "Ultimate", color: "ai", hotkey: "R" },
    ];

    return (
      <Box
        sx={{
          position: "relative",
          width: 700,
          height: 450,
          bgcolor: "background.paper",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Fake game content */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.disabled",
          }}
        >
          <Typography variant="h5">Game View - Gamified Theme</Typography>
        </Box>

        {/* Abilities at bottom center with hotkey badges */}
        <Box sx={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)" }}>
          <OrbCluster
            items={abilityItems}
            pattern="bottom-row"
            size="xl"
            shape="hexagon"
            variant="glow"
            spacing={12}
            hotkeyDisplay="badge"
            colorMode="auto"
            containerWidth={350}
            containerHeight={100}
          />
        </Box>

        {/* Quick actions with ring hotkeys */}
        <Box sx={{ position: "absolute", left: 20, bottom: 20 }}>
          <OrbCluster
            items={[
              { id: "inventory", icon: <BuildIcon />, label: "Inventory", color: "default", hotkey: "I" },
              { id: "map", icon: <CameraAltIcon />, label: "Map", color: "default", hotkey: "M" },
              { id: "settings", icon: <SettingsIcon />, label: "Settings", color: "default", hotkey: "ESC" },
            ]}
            pattern="left-stack"
            size="md"
            shape="square"
            variant="glass"
            spacing={8}
            hotkeyDisplay="ring"
            colorMode="auto"
            containerWidth={80}
            containerHeight={180}
          />
        </Box>
      </Box>
    );
  },
};

// =============================================================================
// Pill Shape Showcase
// =============================================================================

export const PillShapeShowcase: Story = {
  name: "Pill Shape (1.75:1 Ratio)",
  render: () => (
    <Stack spacing={2}>
      <DemoContainer title="Pill Shape - All Sizes" height={140}>
        <Stack direction="row" spacing={3} sx={{
          alignItems: "center"
        }}>
          {(["xs", "sm", "md", "lg", "xl"] as OrbSize[]).map((size) => (
            <Box key={size} sx={{ textAlign: "center" }}>
              <ActionOrb
                icon={<AutoAwesomeIcon />}
                label={`${size} pill`}
                shape="pill"
                size={size}
                color="ai"
                variant="glass"
              />
              <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block" }}>
                {size}
              </Typography>
            </Box>
          ))}
        </Stack>
      </DemoContainer>
      <DemoContainer title="Pills with Different Colors & Hotkeys" height={100}>
        <Stack direction="row" spacing={2} sx={{
          alignItems: "center"
        }}>
          <ActionOrb icon={<MicIcon />} label="Voice" shape="pill" color="cyan" size="lg" hotkey="V" hotkeyDisplay="badge" />
          <ActionOrb icon={<ChatIcon />} label="Chat" shape="pill" color="ai" size="lg" hotkey="C" hotkeyDisplay="badge" />
          <ActionOrb icon={<FavoriteIcon />} label="Heal" shape="pill" color="mint" size="lg" hotkey="H" hotkeyDisplay="badge" />
          <ActionOrb icon={<StarIcon />} label="Boost" shape="pill" color="warning" size="lg" hotkey="B" hotkeyDisplay="badge" />
        </Stack>
      </DemoContainer>
    </Stack>
  ),
};

// =============================================================================
// Gamified vs Desaturated Comparison
// =============================================================================

export const GamifiedVsDesaturated: Story = {
  name: "Theme Comparison: Gamified",
  parameters: {
    docs: {
      description: {
        story: `
**Switch themes using the toolbar** (paintbrush icon) to see how orbs adapt to different gamified palettes.

- **🎮 Gamified (Vibrant)**: Electric cyan (#00d4ff), mint (#6bffc3) - High energy game UI
- **🎎 Gamified (Japan)**: Soft cyan (#7ab8c8), soft mint (#8fcfb8) - Zen/pastel style

The orbs automatically read colors from the theme's \`ability\` palette when using \`colorMode="auto"\`.
        `,
      },
    },
  },
  render: () => {
    const items: OrbItem[] = [
      { id: "heal", icon: <FavoriteIcon />, label: "Heal", color: "mint", hotkey: "Q" },
      { id: "shield", icon: <StarIcon />, label: "Shield", color: "cyan", hotkey: "W" },
      { id: "attack", icon: <PlayArrowIcon />, label: "Attack", color: "danger", hotkey: "E" },
      { id: "ultimate", icon: <AutoAwesomeIcon />, label: "Ultimate", color: "ai", hotkey: "R" },
    ];

    return (
      <Stack spacing={3} sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          💡 Use the theme selector in the toolbar to switch between <strong>🎮 Gamified (Vibrant)</strong> and <strong>🎎 Gamified (Japan)</strong>
        </Typography>

        {/* Standard layout */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 700,
            height: 200,
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              color: 'text.secondary',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Game Abilities - Colors from theme.palette.ability
          </Typography>
          <Box sx={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)" }}>
            <OrbCluster
              items={items}
              pattern="bottom-row"
              size="xl"
              shape="hexagon"
              variant="glow"
              colorMode="auto"
              spacing={12}
              hotkeyDisplay="badge"
              containerWidth={400}
              containerHeight={120}
            />
          </Box>
        </Box>

        {/* Overlapping layout */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 700,
            height: 160,
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              color: 'text.secondary',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Overlapping Orbs - Enhanced transparency effect
          </Typography>
          <Box sx={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)" }}>
            <OrbCluster
              items={items}
              pattern="bottom-row"
              size="xl"
              shape="circle"
              variant="glass"
              colorMode="auto"
              overlapping
              overlapPercent={35}
              vibrant
              hotkeyDisplay="overlay"
              containerWidth={320}
              containerHeight={100}
            />
          </Box>
        </Box>
      </Stack>
    );
  },
};

// =============================================================================
// Light Mode with All Features
// =============================================================================

export const LightModeComplete: Story = {
  name: "Light Mode: Complete Demo",
  render: () => {
    const items: OrbItem[] = [
      { id: "ai", icon: <AutoAwesomeIcon />, label: "AI", color: "ai", hotkey: "A" },
      { id: "voice", icon: <MicIcon />, label: "Voice", color: "cyan", hotkey: "V" },
      { id: "tools", icon: <BuildIcon />, label: "Tools", color: "mint", hotkey: "T" },
      { id: "camera", icon: <CameraAltIcon />, label: "Camera", color: "primary", hotkey: "C" },
    ];

    return (
      <Stack spacing={2}>
        <Typography variant="body2" sx={{ opacity: 0.7, mb: 1 }}>
          💡 Switch to Light mode in the toolbar for best results
        </Typography>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 500,
            height: 200,
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 8,
              left: 12,
              color: 'text.secondary',
              fontSize: 11,
            }}
          >
            Vibrant Light Mode - colorMode="auto"
          </Typography>
          <Box sx={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)" }}>
            <OrbCluster
              items={items}
              pattern="bottom-arc"
              size="lg"
              variant="glass"
              colorMode="auto"
              vibrant
              hotkeyDisplay="badge"
              containerWidth={400}
              containerHeight={180}
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 500,
            height: 120,
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 8,
              left: 12,
              color: 'text.secondary',
              fontSize: 11,
            }}
          >
            Overlapping Pills - vibrant + overlapping
          </Typography>
          <Box sx={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}>
            <OrbCluster
              items={items}
              pattern="bottom-row"
              shape="pill"
              size="lg"
              variant="glass"
              colorMode="auto"
              vibrant
              overlapping
              overlapPercent={25}
              hotkeyDisplay="underline"
              containerWidth={340}
              containerHeight={80}
            />
          </Box>
        </Box>
      </Stack>
    );
  },
};

// =============================================================================
// Overlapping Orbs Showcase
// =============================================================================

export const OverlappingOrbsShowcase: Story = {
  name: "Overlapping Orbs",
  parameters: {
    docs: {
      description: {
        story: `
**Overlapping Mode** creates a layered effect where orbs overlap each other with transparency.
This effect looks especially good with the \`vibrant\` prop enabled for enhanced saturation.

- \`overlapping\`: Enable overlapping positioning
- \`overlapPercent\`: Control how much orbs overlap (0-50%)
- \`vibrant\`: Boost saturation/opacity for glass blend effect
        `,
      },
    },
  },
  render: () => {
    const abilityItems: OrbItem[] = [
      { id: "1", icon: <FavoriteIcon />, label: "Heal", color: "mint", hotkey: "Q" },
      { id: "2", icon: <StarIcon />, label: "Shield", color: "cyan", hotkey: "W" },
      { id: "3", icon: <PlayArrowIcon />, label: "Attack", color: "danger", hotkey: "E" },
      { id: "4", icon: <AutoAwesomeIcon />, label: "Ultimate", color: "ai", hotkey: "R" },
    ];

    return (
      <Stack spacing={3} sx={{ p: 2 }}>
        {/* No overlap */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 600,
            height: 140,
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 8,
              left: 12,
              color: 'text.secondary',
              fontSize: 11,
            }}
          >
            No Overlap (default)
          </Typography>
          <Box sx={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}>
            <OrbCluster
              items={abilityItems}
              pattern="bottom-row"
              size="xl"
              shape="circle"
              variant="glass"
              colorMode="auto"
              spacing={12}
              containerWidth={350}
              containerHeight={100}
            />
          </Box>
        </Box>

        {/* 25% overlap */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 600,
            height: 140,
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 8,
              left: 12,
              color: 'text.secondary',
              fontSize: 11,
            }}
          >
            25% Overlap + Vibrant
          </Typography>
          <Box sx={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}>
            <OrbCluster
              items={abilityItems}
              pattern="bottom-row"
              size="xl"
              shape="circle"
              variant="glass"
              colorMode="auto"
              overlapping
              overlapPercent={25}
              vibrant
              containerWidth={280}
              containerHeight={100}
            />
          </Box>
        </Box>

        {/* 40% overlap */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 600,
            height: 140,
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 8,
              left: 12,
              color: 'text.secondary',
              fontSize: 11,
            }}
          >
            40% Overlap + Glow Variant
          </Typography>
          <Box sx={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}>
            <OrbCluster
              items={abilityItems}
              pattern="bottom-row"
              size="xl"
              shape="circle"
              variant="glow"
              colorMode="auto"
              overlapping
              overlapPercent={40}
              vibrant
              containerWidth={240}
              containerHeight={100}
            />
          </Box>
        </Box>

        {/* Hexagon overlap */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 600,
            height: 140,
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 8,
              left: 12,
              color: 'text.secondary',
              fontSize: 11,
            }}
          >
            Hexagon Shape + 30% Overlap
          </Typography>
          <Box sx={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}>
            <OrbCluster
              items={abilityItems}
              pattern="bottom-row"
              size="xl"
              shape="hexagon"
              variant="glass"
              colorMode="auto"
              overlapping
              overlapPercent={30}
              vibrant
              hotkeyDisplay="badge"
              containerWidth={300}
              containerHeight={100}
            />
          </Box>
        </Box>
      </Stack>
    );
  },
};
