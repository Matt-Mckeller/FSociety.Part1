import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Box, Typography, FormControlLabel, Switch, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MicIcon from "@mui/icons-material/Mic";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GridOnIcon from "@mui/icons-material/GridOn";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FitScreenIcon from "@mui/icons-material/FitScreen";

import { ActionBar } from "../../../hud-components/action-bars";
import { HudButton } from "../../../hud-components/primitives/HudButton";
import { ActionDock, ActionDockButton } from "../../docks";
import { ActionOrb, OrbCluster } from "../../../hud-components/orbs";
import { NavigationProvider, type MapGridNavigationConfig } from "@expanse/map";
import type { OrbItem } from "../../../hud-components/orbs";

// Navigation config for provider
const navConfig: MapGridNavigationConfig = {
  dimensions: { width: 5, height: 5, homePosition: { x: 2, y: 2 }, wrapAround: false },
  tiles: [],
};

// =============================================================================
// Meta
// =============================================================================

const meta: Meta = {
  title: "Layout Systems/HUD Components/Overview",
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    docs: {
      description: {
        component: `
# HUD Component System

A complete set of UI components for heads-up display (HUD) interfaces in Spatial Layout applications.

## Components

### Action Bars (Edge-positioned)
- **ActionBar**: Centered action bar on screen edges (top, bottom, left, right)
- **Toolbar**: Mode/tool selection with one active at a time (radio behavior)
- **SettingsBar**: Toggle settings with multiple active (checkbox behavior)

### Docks (Corner-positioned)  
- **ActionDock**: Stacked action buttons in corners

### Floating Actions
- **ActionOrb**: Single floating action button with shape/animation variants
- **OrbCluster**: Group of orbs arranged in patterns

### Navigation
- **NavigationPad**: D-pad style directional controls
- **Minimap**: Grid overview with current position

### Shared Features
- Collapsible with various handle styles
- Dark and light mode support
- Attached mode (docked to edge)
- Responsive sizing options
        `,
      },
    },
  },
};

export default meta;

// =============================================================================
// Interactive HUD Demo
// =============================================================================

export const InteractiveDemo: StoryObj = {
  name: "Complete HUD Demo",
  render: function HUDDemo() {
    // State for tools/modes
    const [editMode, setEditMode] = useState("select");
    const [showGrid, setShowGrid] = useState(false);
    const [showLabels, setShowLabels] = useState(true);
    const [snapEnabled, setSnapEnabled] = useState(false);
    
    // State for collapsed bars
    const [bottomCollapsed, setBottomCollapsed] = useState(false);
    const [leftCollapsed, setLeftCollapsed] = useState(false);
    
    // AI orb items
    const aiItems: OrbItem[] = [
      { id: "ai", icon: <AutoAwesomeIcon />, label: "AI Assistant", color: "ai" },
      { id: "voice", icon: <MicIcon />, label: "Voice Input", color: "primary" },
      { id: "camera", icon: <CameraAltIcon />, label: "Camera", color: "success" },
    ];

    return (
      <Box sx={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
        <NavigationProvider config={navConfig}>
          
          {/* Top Bar - Main navigation */}
          <ActionDock position="top-center">
            <ActionBar variant="glass" length={{ percent: 45 }}>
              <HudButton icon={<HomeIcon />} label="Home" />
              <HudButton icon={<SearchIcon />} label="Search" />
              <HudButton icon={<FilterListIcon />} label="Filter" />
              <HudButton icon={<ChatIcon />} label="Chat" badge={3} />
              <HudButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </ActionDock>

          {/* Left Bar - Tools */}
          <ActionDock position="left-center">
            <ActionBar variant="glass" orientation="vertical" thickness="lg">
              <HudButton icon={<EditIcon />} label="Edit" active={editMode === "edit"} onClick={() => setEditMode("edit")} />
              <HudButton icon={<SelectAllIcon />} label="Select" active={editMode === "select"} onClick={() => setEditMode("select")} />
              <HudButton icon={<VisibilityIcon />} label="View" active={editMode === "view"} onClick={() => setEditMode("view")} />
              <HudButton icon={<ContentCopyIcon />} label="Copy" />
              <HudButton icon={<DeleteIcon />} label="Delete" />
            </ActionBar>
          </ActionDock>

          {/* Right Dock - Quick actions */}
          <ActionDock position="top-right">
            <ActionBar variant="glass" orientation="vertical">
              <ActionDockButton icon={<ZoomInIcon />} label="Zoom In" />
              <ActionDockButton icon={<ZoomOutIcon />} label="Zoom Out" />
              <ActionDockButton icon={<FitScreenIcon />} label="Fit to Screen" />
              <ActionDockButton icon={<GridOnIcon />} label="Toggle Grid" active={showGrid} onClick={() => setShowGrid(!showGrid)} />
            </ActionBar>
          </ActionDock>

          {/* Bottom Settings Bar */}
          <ActionDock position="bottom-center">
            <ActionBar variant="glass" length={{ percent: 35 }}>
              <HudButton icon={<GridOnIcon />} label="Show Grid" active={showGrid} onClick={() => setShowGrid(!showGrid)} />
              <HudButton icon={<EditIcon />} label="Show Labels" active={showLabels} onClick={() => setShowLabels(!showLabels)} />
              <HudButton icon={<SelectAllIcon />} label="Snap to Grid" active={snapEnabled} onClick={() => setSnapEnabled(!snapEnabled)} />
            </ActionBar>
          </ActionDock>

          {/* AI Action Orbs - Bottom right */}
          <Box sx={{ position: "fixed", bottom: 80, right: 20, zIndex: 1000 }}>
            <OrbCluster
              items={aiItems}
              pattern="right-stack"
              size="lg"
              variant="glow"
              containerWidth={80}
              containerHeight={240}
            />
          </Box>

          {/* Undo/Redo dock - Bottom left */}
          <ActionDock position="bottom-left">
            <ActionDockButton icon={<UndoIcon />} label="Undo" />
            <ActionDockButton icon={<RedoIcon />} label="Redo" />
          </ActionDock>

          {/* Center content area */}
          <Box 
            sx={{ 
              position: "absolute", 
              top: "50%", 
              left: "50%", 
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ opacity: 0.2, mb: 2 }}>
              Canvas Area
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.4 }}>
              Mode: {editMode} | Grid: {showGrid ? "On" : "Off"} | Labels: {showLabels ? "On" : "Off"}
            </Typography>
          </Box>
          
        </NavigationProvider>
      </Box>
    );
  },
};

// =============================================================================
// Component Showcase
// =============================================================================

export const ComponentShowcase: StoryObj = {
  name: "All Components",
  render: () => {
    const aiItems: OrbItem[] = [
      { id: "1", icon: <AutoAwesomeIcon />, label: "AI", color: "ai" },
      { id: "2", icon: <MicIcon />, label: "Voice", color: "primary" },
      { id: "3", icon: <CameraAltIcon />, label: "Camera", color: "success" },
    ];
    
    return (
      <Box sx={{ p: 4, minHeight: "100vh" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>HUD Component Showcase</Typography>
        
        <Stack spacing={6}>
          {/* Section: Bars */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, opacity: 0.7 }}>Action Bars</Typography>
            <Stack direction="row" spacing={3} sx={{ alignItems: "flex-start" }}>
              <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 3, width: 400, height: 150, position: "relative", border: 1, borderColor: "divider" }}>
                <Typography variant="caption" sx={{ opacity: 0.5, position: "absolute", top: 8, left: 12 }}>ActionBar</Typography>
                <Box sx={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}>
                  <Box sx={{ display: "flex", gap: 0.5, bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: 2, p: 0.75, border: 1, borderColor: "divider" }}>
                    <HudButton icon={<HomeIcon />} label="Home" />
                    <HudButton icon={<SearchIcon />} label="Search" active />
                    <HudButton icon={<FilterListIcon />} label="Filter" />
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 3, width: 200, height: 150, position: "relative", border: 1, borderColor: "divider" }}>
                <Typography variant="caption" sx={{ opacity: 0.5, position: "absolute", top: 8, left: 12 }}>ActionDock</Typography>
                <Box sx={{ position: "absolute", top: 36, right: 16 }}>
                  <Stack spacing={0.5}>
                    <ActionDockButton icon={<ZoomInIcon />} label="Zoom In" />
                    <ActionDockButton icon={<ZoomOutIcon />} label="Zoom Out" />
                    <ActionDockButton icon={<FitScreenIcon />} label="Fit" />
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Box>
          
          {/* Section: Orbs */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, opacity: 0.7 }}>Action Orbs</Typography>
            <Stack direction="row" spacing={3}>
              <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 3, width: 150, height: 150, position: "relative", border: 1, borderColor: "divider" }}>
                <Typography variant="caption" sx={{ opacity: 0.5, position: "absolute", top: 8, left: 12 }}>Single Orb</Typography>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                  <ActionOrb icon={<AutoAwesomeIcon />} label="AI" color="ai" variant="glow" size="lg" />
                </Box>
              </Box>
              
              <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 3, width: 400, height: 150, position: "relative", border: 1, borderColor: "divider" }}>
                <Typography variant="caption" sx={{ opacity: 0.5, position: "absolute", top: 8, left: 12 }}>OrbCluster (bottom-arc)</Typography>
                <OrbCluster
                  items={aiItems}
                  pattern="bottom-arc"
                  size="lg"
                  variant="glass"
                  containerWidth={380}
                  containerHeight={130}
                />
              </Box>
            </Stack>
          </Box>
          
          {/* Section: Shapes & Variants */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, opacity: 0.7 }}>Orb Shapes</Typography>
            <Stack direction="row" spacing={2}>
              <ActionOrb icon={<AutoAwesomeIcon />} label="Circle" shape="circle" color="ai" />
              <ActionOrb icon={<AutoAwesomeIcon />} label="Square" shape="square" color="primary" />
              <ActionOrb icon={<AutoAwesomeIcon />} label="Diamond" shape="diamond" color="success" />
              <ActionOrb icon={<AutoAwesomeIcon />} label="Hexagon" shape="hexagon" color="warning" />
            </Stack>
          </Box>
          
          <Box>
            <Typography variant="h6" sx={{ mb: 2, opacity: 0.7 }}>Orb Variants</Typography>
            <Stack direction="row" spacing={2}>
              <ActionOrb icon={<AutoAwesomeIcon />} label="Glass" variant="glass" color="ai" />
              <ActionOrb icon={<AutoAwesomeIcon />} label="Solid" variant="solid" color="ai" />
              <ActionOrb icon={<AutoAwesomeIcon />} label="Glow" variant="glow" color="ai" />
              <ActionOrb icon={<AutoAwesomeIcon />} label="Pulse" variant="pulse" color="ai" />
              <ActionOrb icon={<AutoAwesomeIcon />} label="Outline" variant="outline" color="ai" />
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

// =============================================================================
// Light vs Dark Comparison
// =============================================================================

export const LightVsDark: StoryObj = {
  name: "Light vs Dark Mode",
  render: () => {
    const aiItems: OrbItem[] = [
      { id: "1", icon: <AutoAwesomeIcon />, label: "AI", color: "ai" },
      { id: "2", icon: <MicIcon />, label: "Voice", color: "primary" },
    ];
    
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Light vs Dark - Use Storybook toolbar to toggle theme mode
        </Typography>
        
        <Stack spacing={3}>
          <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 3, border: 1, borderColor: "divider" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Action Bars</Typography>
            <Box sx={{ display: "flex", gap: 0.5, bgcolor: "action.hover", borderRadius: 2, p: 0.75, width: "fit-content" }}>
              <HudButton icon={<HomeIcon />} label="Home" />
              <HudButton icon={<SearchIcon />} label="Search" active />
            </Box>
          </Box>
          
          <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 3, border: 1, borderColor: "divider" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Action Orbs</Typography>
            <Stack direction="row" spacing={2}>
              <ActionOrb icon={<AutoAwesomeIcon />} label="AI" color="ai" />
              <ActionOrb icon={<MicIcon />} label="Voice" color="primary" />
            </Stack>
          </Box>
          
          <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 3, border: 1, borderColor: "divider", position: "relative", height: 150 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Orb Cluster</Typography>
            <OrbCluster items={aiItems} pattern="bottom-arc" containerWidth={300} containerHeight={120} />
          </Box>
        </Stack>
      </Box>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};
