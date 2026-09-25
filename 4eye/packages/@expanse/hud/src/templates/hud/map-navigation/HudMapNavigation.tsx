"use client";
/**
 * HUD Template: Map/Navigation
 *
 * GPS navigation application layout:
 * - Route info
 * - Turn-by-turn directions
 * - ETA display
 * - POI markers
 * - Zoom controls
 * - Current speed
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for navigation apps and map-based interfaces.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import StraightIcon from "@mui/icons-material/Straight";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import RoundaboutLeftIcon from "@mui/icons-material/RoundaboutLeft";
import PlaceIcon from "@mui/icons-material/Place";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import LayersIcon from "@mui/icons-material/Layers";
import SearchIcon from "@mui/icons-material/Search";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CloseIcon from "@mui/icons-material/Close";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

import { HUD_ACTION_BAR_SIZE } from "@expanse/brand-core";
import { ActionDock, ActionDockButton } from "../../../hud/docks";

// =============================================================================
// Types
// =============================================================================

export interface NavigationStep {
  id: string;
  instruction: string;
  distance: string;
  maneuver: "left" | "right" | "straight" | "uturn" | "roundabout" | "arrive";
  streetName?: string;
}

export interface POI {
  id: string;
  name: string;
  type: "gas" | "food" | "parking" | "other";
  distance: string;
}

export interface HudMapNavigationProps {
  children?: ReactNode;
  destination?: string;
  currentStreet?: string;
  distanceRemaining?: string;
  timeRemaining?: string;
  eta?: string;
  currentSpeed?: number;
  speedLimit?: number;
  steps?: NavigationStep[];
  nearbyPOIs?: POI[];
  isNavigating?: boolean;
  isMuted?: boolean;
  onSearch?: () => void;
  onRecenter?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onLayerToggle?: () => void;
  onMuteToggle?: () => void;
  onEndNavigation?: () => void;
  onPOISelect?: (poi: POI) => void;
}

// =============================================================================
// Utility
// =============================================================================

const maneuverIcons: Record<string, ReactNode> = {
  left: <TurnLeftIcon />,
  right: <TurnRightIcon />,
  straight: <StraightIcon />,
  uturn: <UTurnLeftIcon />,
  roundabout: <RoundaboutLeftIcon />,
  arrive: <PlaceIcon />,
};

const poiIcons: Record<string, ReactNode> = {
  gas: <LocalGasStationIcon />,
  food: <RestaurantIcon />,
  parking: <LocalParkingIcon />,
  other: <PlaceIcon />,
};

// =============================================================================
// Template Component
// =============================================================================

export function HudMapNavigation({
  children,
  destination = "123 Main Street",
  currentStreet = "Highway 101",
  distanceRemaining = "15.3 mi",
  timeRemaining = "23 min",
  eta = "3:45 PM",
  currentSpeed = 65,
  speedLimit = 65,
  steps = [],
  nearbyPOIs = [],
  isNavigating = true,
  isMuted = false,
  onSearch,
  onRecenter,
  onZoomIn,
  onZoomOut,
  onLayerToggle,
  onMuteToggle,
  onEndNavigation,
  onPOISelect,
}: HudMapNavigationProps) {
  const [showDirections, setShowDirections] = useState(true);

  const bgColor = "#1a1a1e";
  const panelBg = "rgba(30, 30, 35, 0.95)";
  const textColor = "#ffffff";
  const accentColor = "#3b82f6";
  const navColor = "#22c55e";

  // Default steps
  const displaySteps: NavigationStep[] = steps.length > 0 ? steps : [
    { id: "1", instruction: "Turn right", distance: "0.3 mi", maneuver: "right", streetName: "Oak Avenue" },
    { id: "2", instruction: "Continue straight", distance: "2.1 mi", maneuver: "straight", streetName: "Highway 101" },
    { id: "3", instruction: "Take exit", distance: "0.5 mi", maneuver: "right", streetName: "Exit 42" },
    { id: "4", instruction: "Turn left", distance: "0.2 mi", maneuver: "left", streetName: "Main Street" },
    { id: "5", instruction: "Arrive at destination", distance: "", maneuver: "arrive" },
  ];

  // Default POIs
  const displayPOIs: POI[] = nearbyPOIs.length > 0 ? nearbyPOIs : [
    { id: "1", name: "Shell Gas Station", type: "gas", distance: "0.5 mi" },
    { id: "2", name: "McDonald's", type: "food", distance: "0.8 mi" },
    { id: "3", name: "Public Parking", type: "parking", distance: "1.2 mi" },
  ];

  const nextStep = displaySteps[0];
  const isOverSpeed = currentSpeed > speedLimit;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: bgColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ================================================================= */}
      {/* TOP: Next Turn Card */}
      {/* ================================================================= */}
      {isNavigating && nextStep && (
        <Paper
          sx={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: 500,
            bgcolor: navColor,
            borderRadius: 3,
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                bgcolor: "rgba(255,255,255,0.2)",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Box sx={{ color: "white", fontSize: 32 }}>
                {maneuverIcons[nextStep.maneuver]}
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
                {nextStep.instruction}
              </Typography>
              <Typography variant="body1" sx={{ color: "white", opacity: 0.9 }}>
                {nextStep.streetName}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="h4" sx={{ color: "white", fontWeight: 600 }}>
                {nextStep.distance}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* TOP LEFT: Search */}
      {/* ================================================================= */}
      <IconButton
        onClick={onSearch}
        sx={{
          position: "fixed",
          top: isNavigating ? 100 : 16,
          left: 16,
          bgcolor: panelBg,
          color: textColor,
          zIndex: 999,
          "&:hover": { bgcolor: panelBg },
        }}
      >
        <SearchIcon />
      </IconButton>

      {/* ================================================================= */}
      {/* LEFT: Directions Panel */}
      {/* ================================================================= */}
      {showDirections && isNavigating && (
        <Paper
          sx={{
            position: "fixed",
            top: 150,
            left: 16,
            width: 280,
            maxHeight: "50vh",
            bgcolor: panelBg,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
          }}
        >
          <Box sx={{ p: 1.5, borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ color: textColor }}>
              Directions
            </Typography>
            <IconButton size="small" onClick={() => setShowDirections(false)} sx={{ color: textColor }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <List sx={{ flex: 1, overflow: "auto", py: 0 }}>
            {displaySteps.map((step, idx) => (
              <ListItem
                key={step.id}
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  bgcolor: idx === 0 ? "rgba(34, 197, 94, 0.1)" : "transparent",
                }}
              >
                <ListItemIcon sx={{ color: idx === 0 ? navColor : textColor, minWidth: 40 }}>
                  {maneuverIcons[step.maneuver]}
                </ListItemIcon>
                <ListItemText
                  primary={step.instruction}
                  secondary={step.streetName}
                  sx={{
                    "& .MuiTypography-root": { color: textColor },
                    "& .MuiTypography-body2": { opacity: 0.5 },
                  }}
                />
                <Typography variant="body2" sx={{ color: textColor, opacity: 0.6 }}>
                  {step.distance}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* BOTTOM: Route Info Bar */}
      {/* ================================================================= */}
      {isNavigating && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: panelBg,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            zIndex: 1000,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            {/* Destination */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
                Destination
              </Typography>
              <Typography variant="body1" sx={{ color: textColor }}>
                {destination}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: "rgba(255,255,255,0.1)" }} />

            {/* Time */}
            <Box sx={{ textAlign: "center", minWidth: 80 }}>
              <Typography variant="h5" sx={{ color: navColor, fontWeight: 600 }}>
                {timeRemaining}
              </Typography>
              <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
                ETA {eta}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: "rgba(255,255,255,0.1)" }} />

            {/* Distance */}
            <Box sx={{ textAlign: "center", minWidth: 80 }}>
              <Typography variant="h5" sx={{ color: textColor }}>
                {distanceRemaining}
              </Typography>
              <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
                remaining
              </Typography>
            </Box>

            {/* End Navigation */}
            <IconButton onClick={onEndNavigation} sx={{ ml: 2, color: "#ef4444" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* BOTTOM LEFT: Speed Display */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          bottom: isNavigating ? 100 : 16,
          left: 16,
          width: 80,
          height: 80,
          bgcolor: isOverSpeed ? "#ef4444" : panelBg,
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        <Typography variant="h4" sx={{ color: textColor, fontWeight: 600, lineHeight: 1 }}>
          {currentSpeed}
        </Typography>
        <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
          mph
        </Typography>
      </Paper>

      {/* Speed Limit */}
      <Paper
        sx={{
          position: "fixed",
          bottom: isNavigating ? 100 : 16,
          left: 110,
          width: 50,
          height: 50,
          bgcolor: "white",
          border: "3px solid #ef4444",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        <Typography variant="caption" sx={{ color: "#1a1a1a", fontSize: "0.6rem", lineHeight: 1 }}>
          LIMIT
        </Typography>
        <Typography variant="body1" sx={{ color: "#1a1a1a", fontWeight: 700, lineHeight: 1 }}>
          {speedLimit}
        </Typography>
      </Paper>

      {/* ================================================================= */}
      {/* RIGHT: Map Controls */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          zIndex: 999,
          "& .MuiIconButton-root": {
            width: HUD_ACTION_BAR_SIZE.desktop,
            height: HUD_ACTION_BAR_SIZE.desktop,
            padding: 0,
            bgcolor: panelBg,
            "&:hover": { bgcolor: panelBg },
          },
          "& .MuiSvgIcon-root": {
            fontSize: HUD_ACTION_BAR_SIZE.desktop * 0.55,
          },
        }}
      >
        <IconButton onClick={onZoomIn} sx={{ color: textColor }}>
          <ZoomInIcon />
        </IconButton>
        <IconButton onClick={onZoomOut} sx={{ color: textColor }}>
          <ZoomOutIcon />
        </IconButton>
        <IconButton onClick={onRecenter} sx={{ color: accentColor }}>
          <MyLocationIcon />
        </IconButton>
        <IconButton onClick={onLayerToggle} sx={{ color: textColor }}>
          <LayersIcon />
        </IconButton>
        <IconButton onClick={onMuteToggle} sx={{ color: isMuted ? "#ef4444" : textColor }}>
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
      </Box>

      {/* ================================================================= */}
      {/* RIGHT BOTTOM: POIs */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          right: 16,
          bottom: isNavigating ? 100 : 16,
          display: "flex",
          gap: 1,
          zIndex: 999,
        }}
      >
        {displayPOIs.slice(0, 3).map((poi) => (
          <Chip
            key={poi.id}
            icon={poiIcons[poi.type] as React.ReactElement}
            label={poi.distance}
            onClick={() => onPOISelect?.(poi)}
            sx={{
              bgcolor: panelBg,
              color: textColor,
              "& .MuiChip-icon": { color: textColor },
            }}
          />
        ))}
      </Box>

      {/* ================================================================= */}
      {/* MAIN CONTENT - Map */}
      {/* ================================================================= */}
      {children ?? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#242428",
          }}
        >
          <Typography variant="h4" sx={{ color: textColor, opacity: 0.1 }}>
            Map View
          </Typography>
        </Box>
      )}
    </Box>
  );
}
