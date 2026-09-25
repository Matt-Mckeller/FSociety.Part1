"use client";
/**
 * HUD Template: Desktop Default
 *
 * Full-featured desktop HUD demonstrating the new 4-tier architecture:
 * - ActionButton: Individual button appearance
 * - ActionGroup: Selection behavior (radio/checkbox)
 * - ActionBar: Container styling (skin, thickness)
 * - ActionDock: Screen positioning
 *
 * USAGE: Copy this file into your app and modify as needed.
 */

import React, { useState, type ReactNode } from "react";
import { Box, Typography, FormControlLabel, Switch, useTheme } from "@mui/material";
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
import SchoolIcon from "@mui/icons-material/School";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from "@mui/icons-material/Build";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import BookIcon from "@mui/icons-material/Book";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { ActionBar } from "../../../hud-components/action-bars";
import { ActionButton } from "../../../hud-components/action-button";
import { ActionGroup } from "../../../hud-components/action-group";
import { ActionDock } from "../../../hud/docks";
import { OrbCluster } from "../../../hud-components/orbs";
import { NavigationPad } from "../../../hud-components/navigation-pad";
import { NavigationProvider, type MapGridNavigationConfig } from "@expanse/map";
import { MinimapPanel } from "../../../map-views/minimap/MinimapPanel";
import type { OrbItem } from "../../../hud-components/orbs";

// =============================================================================
// Types
// =============================================================================

export interface HudDesktopDefaultProps {
  children?: ReactNode;
  navigationConfig?: MapGridNavigationConfig;
}

// =============================================================================
// Default Nav Config
// =============================================================================

// Category palette (matches minimap-tile.factory defaults)
const CAT = {
  home:     { color: "#4caf50", active: "#81c784" },
  learning: { color: "#2196f3", active: "#64b5f6" },
  gaming:   { color: "#9c27b0", active: "#ba68c8" },
  social:   { color: "#ff9800", active: "#ffb74d" },
  tools:    { color: "#607d8b", active: "#90a4ae" },
} as const;

// 9×3 grid — row 0 (top), row 1 (middle/home row), row 2 (bottom)
// Columns: 0 1 2 3 4 5 6 7 8
//
//  Row 0:  Lessons  Practice  Skills   [empty]  Explore  [empty]  Arena   Match   Leaderboard
//  Row 1:  Profile  Chat      Social   Learn    HOME     Gaming   Tools   Build   Settings
//  Row 2:  [empty]  BookClub  Friends  Goals    [empty]  Rewards  [empty] Notify  Account

const defaultNavConfig: MapGridNavigationConfig = {
  dimensions: { width: 9, height: 3, homePosition: { x: 4, y: 1 }, wrapAround: false },
  tiles: [
    // ── Row 0 (top) ────────────────────────────────────────────────────────
    { id: "lessons",     position: { x: 0, y: 0 }, seo: { title: "Lessons" },     display: { label: "Lessons",     icon: SchoolIcon,      category: "Learning", colors: { inactive: CAT.learning.color, active: CAT.learning.active } } },
    { id: "practice",    position: { x: 1, y: 0 }, seo: { title: "Practice" },    display: { label: "Practice",    icon: EditIcon,         category: "Learning", colors: { inactive: CAT.learning.color, active: CAT.learning.active } } },
    { id: "skills",      position: { x: 2, y: 0 }, seo: { title: "Skills" },      display: { label: "Skills",      icon: EmojiEventsIcon,  category: "Learning", colors: { inactive: CAT.learning.color, active: CAT.learning.active } } },
    // x:3 y:0 — empty
    { id: "explore",     position: { x: 4, y: 0 }, seo: { title: "Explore" },     display: { label: "Explore",     icon: ExploreIcon,      category: "Home",     colors: { inactive: CAT.home.color,     active: CAT.home.active     } } },
    // x:5 y:0 — empty
    { id: "arena",       position: { x: 6, y: 0 }, seo: { title: "Arena" },       display: { label: "Arena",       icon: SportsEsportsIcon, category: "Gaming",  colors: { inactive: CAT.gaming.color,   active: CAT.gaming.active   } } },
    { id: "match",       position: { x: 7, y: 0 }, seo: { title: "Match" },       display: { label: "Match",       icon: SportsEsportsIcon, category: "Gaming",  colors: { inactive: CAT.gaming.color,   active: CAT.gaming.active   } } },
    { id: "leaderboard", position: { x: 8, y: 0 }, seo: { title: "Leaderboard" }, display: { label: "Ranking",     icon: EmojiEventsIcon,  category: "Gaming",  colors: { inactive: CAT.gaming.color,   active: CAT.gaming.active   } } },

    // ── Row 1 (home row) ───────────────────────────────────────────────────
    { id: "profile",     position: { x: 0, y: 1 }, seo: { title: "Profile" },     display: { label: "Profile",     icon: AccountCircleIcon, category: "Social",  colors: { inactive: CAT.social.color,   active: CAT.social.active   } } },
    { id: "chat",        position: { x: 1, y: 1 }, seo: { title: "Chat" },        display: { label: "Chat",        icon: ChatIcon,          category: "Social",  colors: { inactive: CAT.social.color,   active: CAT.social.active   } } },
    { id: "social",      position: { x: 2, y: 1 }, seo: { title: "Social" },      display: { label: "Social",      icon: PeopleIcon,        category: "Social",  colors: { inactive: CAT.social.color,   active: CAT.social.active   } } },
    { id: "learning",    position: { x: 3, y: 1 }, seo: { title: "Learning" },    display: { label: "Learn",       icon: BookIcon,          category: "Learning", colors: { inactive: CAT.learning.color, active: CAT.learning.active } } },
    { id: "home",        position: { x: 4, y: 1 }, seo: { title: "Home" },        display: { label: "Home",        icon: HomeIcon,          category: "Home",     colors: { inactive: CAT.home.color,     active: CAT.home.active     } } },
    { id: "gaming",      position: { x: 5, y: 1 }, seo: { title: "Gaming" },      display: { label: "Gaming",      icon: SportsEsportsIcon, category: "Gaming",  colors: { inactive: CAT.gaming.color,   active: CAT.gaming.active   } } },
    { id: "tools",       position: { x: 6, y: 1 }, seo: { title: "Tools" },       display: { label: "Tools",       icon: BuildIcon,         category: "Tools",   colors: { inactive: CAT.tools.color,    active: CAT.tools.active    } } },
    { id: "build",       position: { x: 7, y: 1 }, seo: { title: "Build" },       display: { label: "Build",       icon: DashboardIcon,     category: "Tools",   colors: { inactive: CAT.tools.color,    active: CAT.tools.active    } } },
    { id: "settings",    position: { x: 8, y: 1 }, seo: { title: "Settings" },    display: { label: "Settings",    icon: SettingsIcon,      category: "Tools",   colors: { inactive: CAT.tools.color,    active: CAT.tools.active    } } },

    // ── Row 2 (bottom) ─────────────────────────────────────────────────────
    // x:0 y:2 — empty
    { id: "bookclub",    position: { x: 1, y: 2 }, seo: { title: "Book Club" },   display: { label: "Book Club",   icon: BookIcon,          category: "Learning", colors: { inactive: CAT.learning.color, active: CAT.learning.active } } },
    { id: "friends",     position: { x: 2, y: 2 }, seo: { title: "Friends" },     display: { label: "Friends",     icon: PeopleIcon,        category: "Social",  colors: { inactive: CAT.social.color,   active: CAT.social.active   } } },
    { id: "goals",       position: { x: 3, y: 2 }, seo: { title: "Goals" },       display: { label: "Goals",       icon: FavoriteIcon,      category: "Home",     colors: { inactive: CAT.home.color,     active: CAT.home.active     } } },
    // x:4 y:2 — empty
    { id: "rewards",     position: { x: 5, y: 2 }, seo: { title: "Rewards" },     display: { label: "Rewards",     icon: EmojiEventsIcon,  category: "Gaming",  colors: { inactive: CAT.gaming.color,   active: CAT.gaming.active   } } },
    // x:6 y:2 — empty
    { id: "notify",      position: { x: 7, y: 2 }, seo: { title: "Notifications" }, display: { label: "Alerts",    icon: NotificationsIcon, category: "Tools",   colors: { inactive: CAT.tools.color,    active: CAT.tools.active    } } },
    { id: "account",     position: { x: 8, y: 2 }, seo: { title: "Account" },     display: { label: "Account",     icon: AccountCircleIcon, category: "Social",  colors: { inactive: CAT.social.color,   active: CAT.social.active   } } },
  ],
};

// =============================================================================
// Template Component
// =============================================================================

export function HudDesktopDefault({
  children,
  navigationConfig = defaultNavConfig,
}: HudDesktopDefaultProps) {
  const [editMode, setEditMode] = useState("select");
  const [showGrid, setShowGrid] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [snapEnabled, setSnapEnabled] = useState(false);
  const [colorMode, setColorMode] = useState<"dark" | "light">("dark");

  const theme = useTheme();
  const bgColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;

  const aiItems: OrbItem[] = [
    { id: "ai", icon: <AutoAwesomeIcon />, label: "AI Assistant", color: "ai" },
    { id: "voice", icon: <MicIcon />, label: "Voice Input", color: "primary" },
    { id: "camera", icon: <CameraAltIcon />, label: "Camera", color: "success" },
  ];

  return (
    <Box sx={{ width: "100vw", height: "100vh", bgcolor: bgColor, position: "relative", overflow: "hidden" }}>
      <NavigationProvider config={navigationConfig}>
        {/* TOP BAR - Navigation */}
        <ActionDock position="top-center">
          <ActionBar variant="frosted" thickness="md" length={{ percent: 45 }}>
            <ActionButton icon={<HomeIcon />} label="Home" />
            <ActionButton icon={<SearchIcon />} label="Search" />
            <ActionButton icon={<FilterListIcon />} label="Filter" />
            <ActionButton icon={<ChatIcon />} label="Chat" badge={3} />
            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </ActionDock>

        {/* LEFT BAR - Tools with radio selection */}
        <ActionDock position="left-center">
          <ActionBar variant="frosted" thickness="lg" orientation="vertical">
            <ActionGroup mode="radio" value={editMode} onChange={(v) => setEditMode(v as string)} indicator="circle">
              <ActionButton icon={<EditIcon />} label="Edit" value="edit" />
              <ActionButton icon={<SelectAllIcon />} label="Select" value="select" />
              <ActionButton icon={<VisibilityIcon />} label="View" value="view" />
            </ActionGroup>
            <ActionButton icon={<ContentCopyIcon />} label="Copy" />
            <ActionButton icon={<DeleteIcon />} label="Delete" />
          </ActionBar>
        </ActionDock>

        {/* MINIMAP PANEL - Top right, with built-in toggle button */}
        <MinimapPanel
          position="top-right"
          defaultOpen
          title="Navigation Map"
          showToggleButton
          tileVariant="default"
        />

        {/* RIGHT DOCK - Quick actions */}
        <ActionDock position="top-right" sx={{ top: 16, right: 56 }}>
          <ActionBar variant="frosted" orientation="vertical">
            <ActionButton icon={<ZoomInIcon />} label="Zoom In" />
            <ActionButton icon={<ZoomOutIcon />} label="Zoom Out" />
            <ActionButton icon={<FitScreenIcon />} label="Fit to Screen" />
            <ActionButton icon={<GridOnIcon />} label="Toggle Grid" active={showGrid} onClick={() => setShowGrid(!showGrid)} />
          </ActionBar>
        </ActionDock>

        {/* BOTTOM BAR - Settings toggles */}
        <ActionDock position="bottom-center">
          <ActionBar variant="frosted" thickness="md" length={{ percent: 35 }}>
            <ActionButton icon={<GridOnIcon />} label="Show Grid" active={showGrid} onClick={() => setShowGrid(!showGrid)} />
            <ActionButton icon={<EditIcon />} label="Show Labels" active={showLabels} onClick={() => setShowLabels(!showLabels)} />
            <ActionButton icon={<SelectAllIcon />} label="Snap to Grid" active={snapEnabled} onClick={() => setSnapEnabled(!snapEnabled)} />
          </ActionBar>
        </ActionDock>

        {/* AI ORBS - Bottom right */}
        <Box sx={{ position: "fixed", bottom: 80, right: 20, zIndex: 1000 }}>
          <OrbCluster items={aiItems} pattern="right-stack" size="lg" variant="glow" colorMode={colorMode} containerWidth={80} containerHeight={240} />
        </Box>

        {/* UNDO/REDO - Bottom left */}
        <ActionDock position="bottom-left">
          <ActionBar variant="frosted">
            <ActionButton icon={<UndoIcon />} label="Undo" />
            <ActionButton icon={<RedoIcon />} label="Redo" />
          </ActionBar>
        </ActionDock>

        {/* NAVIGATION PAD */}
        <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
          <NavigationPad variant="hud" size="medium" showHome />
        </Box>

        {/* THEME TOGGLE */}
        <Box sx={{ position: "fixed", top: 80, right: 20, zIndex: 1001 }}>
          <FormControlLabel
            control={<Switch checked={colorMode === "light"} onChange={(e) => setColorMode(e.target.checked ? "light" : "dark")} size="small" />}
            label={<Typography variant="caption" sx={{ color: textColor, opacity: 0.7 }}>Light Mode</Typography>}
          />
        </Box>

        {/* CONTENT AREA */}
        {children ?? (
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
            <Typography variant="h4" sx={{ color: textColor, opacity: 0.2, mb: 2 }}>Canvas Area</Typography>
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.4 }}>
              Mode: {editMode} | Grid: {showGrid ? "On" : "Off"} | Labels: {showLabels ? "On" : "Off"}
            </Typography>
          </Box>
        )}
      </NavigationProvider>
    </Box>
  );
}
