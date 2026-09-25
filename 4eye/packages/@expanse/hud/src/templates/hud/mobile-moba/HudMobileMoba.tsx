"use client";
/**
 * HUD Template: Mobile MOBA
 *
 * Gaming-style mobile layout with thumb-reachable controls:
 * - Minimal top bar (menu, home, notifications)
 * - Left thumb zone: AI/communication orbs
 * - Right thumb zone: Navigation/inventory orbs
 * - Center: Primary action orb
 * - Safe area inset support
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for portrait mobile with bottom-focused thumb zones.
 */

import React, { useState, type ReactNode } from "react";
import { Box, Typography, IconButton, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MicIcon from "@mui/icons-material/Mic";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MapIcon from "@mui/icons-material/Map";
import InventoryIcon from "@mui/icons-material/Inventory2";
import PersonIcon from "@mui/icons-material/Person";

import { OrbCluster, ActionOrb } from "../../../hud-components/orbs";
import { NavigationProvider, type MapGridNavigationConfig } from "@expanse/map";
import type { OrbItem } from "../../../hud-components/orbs";

// =============================================================================
// Types
// =============================================================================

export interface HudMobileMobaProps {
  children?: ReactNode;
  navigationConfig?: MapGridNavigationConfig;
  notificationCount?: number;
  onMenuPress?: () => void;
  onHomePress?: () => void;
}

// =============================================================================
// Default Config
// =============================================================================

const defaultNavConfig: MapGridNavigationConfig = {
  dimensions: { width: 3, height: 3, homePosition: { x: 1, y: 1 }, wrapAround: false },
  tiles: [],
};

// =============================================================================
// Template Component
// =============================================================================

export function HudMobileMoba({
  children,
  navigationConfig = defaultNavConfig,
  notificationCount = 0,
  onMenuPress,
  onHomePress,
}: HudMobileMobaProps) {
  const [activeOrb, setActiveOrb] = useState<string | null>(null);

  const handleOrbClick = (id: string) => () => {
    setActiveOrb(id === activeOrb ? null : id);
  };

  // Left thumb zone - AI/communication orbs
  const leftOrbs: OrbItem[] = [
    { id: "ai", icon: <AutoAwesomeIcon />, label: "AI", color: "ai", onClick: handleOrbClick("ai") },
    { id: "mic", icon: <MicIcon />, label: "Voice", color: "primary", onClick: handleOrbClick("mic") },
    { id: "camera", icon: <CameraAltIcon />, label: "Camera", color: "success", onClick: handleOrbClick("camera") },
  ];

  // Right thumb zone - navigation/inventory orbs
  const rightOrbs: OrbItem[] = [
    { id: "map", icon: <MapIcon />, label: "Map", color: "cyan", onClick: handleOrbClick("map") },
    { id: "inventory", icon: <InventoryIcon />, label: "Items", color: "warning", onClick: handleOrbClick("inventory") },
    { id: "profile", icon: <PersonIcon />, label: "Profile", color: "mint", onClick: handleOrbClick("profile") },
  ];

  const bgColor = "#0a0a0f";
  const textColor = "#ffffff";

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: bgColor,
        position: "relative",
        overflow: "hidden",
        // Safe area insets for mobile
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <NavigationProvider config={navigationConfig}>
        {/* ================================================================= */}
        {/* TOP BAR - Minimal (Menu, Home, Notifications) */}
        {/* ================================================================= */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            zIndex: 1000,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
          }}
        >
          <IconButton onClick={onMenuPress} sx={{ color: textColor }}>
            <MenuIcon />
          </IconButton>

          <IconButton onClick={onHomePress} sx={{ color: textColor }}>
            <HomeIcon />
          </IconButton>

          <IconButton sx={{ color: textColor }}>
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>

        {/* ================================================================= */}
        {/* LEFT THUMB ZONE - AI/Communication Orbs */}
        {/* ================================================================= */}
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            left: 16,
            zIndex: 1000,
          }}
        >
          <OrbCluster
            items={leftOrbs}
            pattern="left-stack"
            size="lg"
            variant="glow"
            colorMode="dark"
            containerWidth={80}
            containerHeight={240}
          />
        </Box>

        {/* ================================================================= */}
        {/* RIGHT THUMB ZONE - Navigation/Inventory Orbs */}
        {/* ================================================================= */}
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 16,
            zIndex: 1000,
          }}
        >
          <OrbCluster
            items={rightOrbs}
            pattern="right-stack"
            size="lg"
            variant="glow"
            colorMode="dark"
            containerWidth={80}
            containerHeight={240}
          />
        </Box>

        {/* ================================================================= */}
        {/* CENTER - Primary Action Orb */}
        {/* ================================================================= */}
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1001,
          }}
        >
          <ActionOrb
            icon={<AutoAwesomeIcon sx={{ fontSize: 32 }} />}
            label="Action"
            size="xl"
            variant="pulse"
            color="ai"
            colorMode="dark"
          />
        </Box>

        {/* ================================================================= */}
        {/* MAIN CONTENT AREA */}
        {/* ================================================================= */}
        {children ?? (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              px: 4,
            }}
          >
            <Typography variant="h5" sx={{ color: textColor, opacity: 0.2, mb: 2 }}>
              Mobile Game View
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.4 }}>
              Active: {activeOrb ?? "None"}
            </Typography>
          </Box>
        )}
      </NavigationProvider>
    </Box>
  );
}
