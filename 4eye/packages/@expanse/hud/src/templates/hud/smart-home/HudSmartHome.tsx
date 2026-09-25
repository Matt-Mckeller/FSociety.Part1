"use client";
/**
 * HUD Template: Smart Home
 *
 * IoT/Smart home control layout:
 * - Room selector
 * - Device toggles
 * - Scene presets
 * - Energy stats
 * - Climate control
 * - Security cameras
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for smart home dashboards and IoT control panels.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Switch,
  Slider,
  Chip,
  Grid,
  Avatar,
} from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WeekendIcon from "@mui/icons-material/Weekend";
import BedIcon from "@mui/icons-material/Bed";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BathtubIcon from "@mui/icons-material/Bathtub";
import GarageIcon from "@mui/icons-material/Garage";
import YardIcon from "@mui/icons-material/Yard";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SpeakerIcon from "@mui/icons-material/Speaker";
import TvIcon from "@mui/icons-material/Tv";
import BlenderIcon from "@mui/icons-material/Blender";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import BoltIcon from "@mui/icons-material/Bolt";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import VideocamIcon from "@mui/icons-material/Videocam";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

// =============================================================================
// Types
// =============================================================================

export interface Room {
  id: string;
  name: string;
  icon: ReactNode;
  deviceCount?: number;
}

export interface Device {
  id: string;
  name: string;
  type: "light" | "thermostat" | "speaker" | "tv" | "lock" | "camera" | "appliance";
  roomId: string;
  isOn: boolean;
  value?: number; // brightness, temperature, volume
  color?: string;
}

export interface Scene {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
}

export interface EnergyStats {
  currentUsage: number; // kW
  todayUsage: number; // kWh
  monthUsage: number; // kWh
  waterUsage: number; // gallons
}

export interface HudSmartHomeProps {
  children?: ReactNode;
  rooms?: Room[];
  devices?: Device[];
  scenes?: Scene[];
  energyStats?: EnergyStats;
  selectedRoomId?: string;
  currentTemperature?: number;
  targetTemperature?: number;
  isAway?: boolean;
  securityArmed?: boolean;
  onRoomSelect?: (roomId: string) => void;
  onDeviceToggle?: (deviceId: string) => void;
  onDeviceValueChange?: (deviceId: string, value: number) => void;
  onSceneActivate?: (sceneId: string) => void;
  onTemperatureChange?: (temp: number) => void;
  onSecurityToggle?: () => void;
  onAwayToggle?: () => void;
}

// =============================================================================
// Template Component
// =============================================================================

export function HudSmartHome({
  children,
  rooms = [],
  devices = [],
  scenes = [],
  energyStats,
  selectedRoomId,
  currentTemperature = 72,
  targetTemperature = 70,
  isAway = false,
  securityArmed = false,
  onRoomSelect,
  onDeviceToggle,
  onDeviceValueChange,
  onSceneActivate,
  onTemperatureChange,
  onSecurityToggle,
  onAwayToggle,
}: HudSmartHomeProps) {
  const [activeRoom, setActiveRoom] = useState(selectedRoomId || "living");

  const bgColor = "#0f172a";
  const panelBg = "rgba(30, 41, 59, 0.8)";
  const textColor = "#ffffff";
  const accentColor = "#3b82f6";

  // Default rooms
  const displayRooms: Room[] = rooms.length > 0 ? rooms : [
    { id: "living", name: "Living Room", icon: <WeekendIcon />, deviceCount: 5 },
    { id: "bedroom", name: "Bedroom", icon: <BedIcon />, deviceCount: 3 },
    { id: "kitchen", name: "Kitchen", icon: <KitchenIcon />, deviceCount: 4 },
    { id: "bathroom", name: "Bathroom", icon: <BathtubIcon />, deviceCount: 2 },
    { id: "garage", name: "Garage", icon: <GarageIcon />, deviceCount: 2 },
    { id: "outdoor", name: "Outdoor", icon: <YardIcon />, deviceCount: 3 },
  ];

  // Default devices
  const displayDevices: Device[] = devices.length > 0 ? devices : [
    { id: "1", name: "Ceiling Light", type: "light", roomId: "living", isOn: true, value: 80 },
    { id: "2", name: "Floor Lamp", type: "light", roomId: "living", isOn: false, value: 50 },
    { id: "3", name: "Smart TV", type: "tv", roomId: "living", isOn: true },
    { id: "4", name: "Sonos Speaker", type: "speaker", roomId: "living", isOn: true, value: 40 },
    { id: "5", name: "Front Door", type: "lock", roomId: "living", isOn: true },
    { id: "6", name: "Bedroom Light", type: "light", roomId: "bedroom", isOn: false, value: 30 },
    { id: "7", name: "AC Unit", type: "thermostat", roomId: "bedroom", isOn: true },
  ];

  // Default scenes
  const displayScenes: Scene[] = scenes.length > 0 ? scenes : [
    { id: "morning", name: "Morning", icon: <WbSunnyIcon />, color: "#f59e0b" },
    { id: "night", name: "Night", icon: <NightsStayIcon />, color: "#6366f1" },
    { id: "movie", name: "Movie", icon: <TvIcon />, color: "#8b5cf6" },
    { id: "away", name: "Away", icon: <SecurityIcon />, color: "#ef4444" },
  ];

  // Default energy stats
  const displayEnergy: EnergyStats = energyStats || {
    currentUsage: 2.4,
    todayUsage: 28.5,
    monthUsage: 892,
    waterUsage: 45,
  };

  const filteredDevices = displayDevices.filter((d) => d.roomId === activeRoom);

  const DeviceIcon = ({ type, isOn }: { type: string; isOn: boolean }) => {
    const iconProps = { sx: { color: isOn ? accentColor : "rgba(255,255,255,0.3)" } };
    switch (type) {
      case "light": return isOn ? <LightbulbIcon {...iconProps} /> : <LightbulbOutlinedIcon {...iconProps} />;
      case "thermostat": return <ThermostatIcon {...iconProps} />;
      case "speaker": return <SpeakerIcon {...iconProps} />;
      case "tv": return <TvIcon {...iconProps} />;
      case "lock": return isOn ? <LockIcon {...iconProps} /> : <LockOpenIcon {...iconProps} />;
      case "camera": return <VideocamIcon {...iconProps} />;
      default: return <BlenderIcon {...iconProps} />;
    }
  };

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
      {/* TOP: Header */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          bgcolor: panelBg,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <HomeIcon sx={{ color: accentColor }} />
          <Typography variant="h6" sx={{ color: textColor }}>
            Smart Home
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Temperature */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ThermostatIcon sx={{ color: "#f59e0b" }} />
            <Typography variant="h6" sx={{ color: textColor }}>
              {currentTemperature}°F
            </Typography>
          </Box>

          {/* Security */}
          <Chip
            icon={securityArmed ? <LockIcon /> : <LockOpenIcon />}
            label={securityArmed ? "Armed" : "Disarmed"}
            onClick={onSecurityToggle}
            sx={{
              bgcolor: securityArmed ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
              color: securityArmed ? "#22c55e" : "#ef4444",
              "& .MuiChip-icon": { color: "inherit" },
            }}
          />

          {/* Away Mode */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.6 }}>
              Away
            </Typography>
            <Switch checked={isAway} onChange={onAwayToggle} size="small" />
          </Box>

          <IconButton sx={{ color: textColor }}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ================================================================= */}
      {/* LEFT: Room Selector */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          top: 80,
          left: 16,
          width: 200,
          bgcolor: panelBg,
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 2,
          p: 1,
          zIndex: 999,
        }}
      >
        <Typography variant="caption" sx={{ color: textColor, opacity: 0.5, px: 1, textTransform: "uppercase" }}>
          Rooms
        </Typography>
        <Box sx={{ mt: 1 }}>
          {displayRooms.map((room) => (
            <Box
              key={room.id}
              onClick={() => {
                setActiveRoom(room.id);
                onRoomSelect?.(room.id);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                borderRadius: 1,
                cursor: "pointer",
                bgcolor: activeRoom === room.id ? "rgba(59, 130, 246, 0.2)" : "transparent",
                "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
              }}
            >
              <Box sx={{ color: activeRoom === room.id ? accentColor : textColor, opacity: activeRoom === room.id ? 1 : 0.5 }}>
                {room.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ color: textColor }}>
                  {room.name}
                </Typography>
              </Box>
              {room.deviceCount && (
                <Typography variant="caption" sx={{ color: textColor, opacity: 0.3 }}>
                  {room.deviceCount}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Paper>

      {/* ================================================================= */}
      {/* LEFT BOTTOM: Scenes */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          width: 200,
          bgcolor: panelBg,
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 2,
          p: 2,
          zIndex: 999,
        }}
      >
        <Typography variant="caption" sx={{ color: textColor, opacity: 0.5, textTransform: "uppercase" }}>
          Quick Scenes
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {displayScenes.map((scene) => (
            <Chip
              key={scene.id}
              icon={scene.icon as React.ReactElement}
              label={scene.name}
              onClick={() => onSceneActivate?.(scene.id)}
              sx={{
                bgcolor: `${scene.color}20`,
                color: scene.color,
                "& .MuiChip-icon": { color: scene.color },
              }}
            />
          ))}
        </Box>
      </Paper>

      {/* ================================================================= */}
      {/* CENTER: Devices Grid */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "absolute",
          top: 80,
          left: 232,
          right: 320,
          bottom: 16,
          overflow: "auto",
          p: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: textColor, mb: 2 }}>
          {displayRooms.find((r) => r.id === activeRoom)?.name || "All Devices"}
        </Typography>

        <Grid container spacing={2}>
          {filteredDevices.map((device) => (
            <Grid size={{ zero: 12, tablet: 6, laptop: 4 }} key={device.id}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: device.isOn ? "rgba(59, 130, 246, 0.1)" : panelBg,
                  border: device.isOn ? `1px solid ${accentColor}` : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <DeviceIcon type={device.type} isOn={device.isOn} />
                  <Switch
                    checked={device.isOn}
                    onChange={() => onDeviceToggle?.(device.id)}
                    size="small"
                  />
                </Box>
                <Typography variant="body1" sx={{ color: textColor, fontWeight: 500 }}>
                  {device.name}
                </Typography>
                {device.value !== undefined && device.isOn && (
                  <Slider
                    value={device.value}
                    onChange={(_, v) => onDeviceValueChange?.(device.id, v as number)}
                    size="small"
                    sx={{ mt: 1, color: accentColor }}
                  />
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ================================================================= */}
      {/* RIGHT: Climate & Energy */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 80,
          right: 16,
          width: 280,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: 999,
        }}
      >
        {/* Climate Control */}
        <Paper
          sx={{
            p: 2,
            bgcolor: panelBg,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ color: textColor, mb: 2 }}>
            Climate
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AcUnitIcon sx={{ color: "#3b82f6" }} />
              <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
                Cooling
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ color: textColor }}>
              {targetTemperature}°
            </Typography>
          </Box>
          <Slider
            value={targetTemperature}
            min={60}
            max={85}
            onChange={(_, v) => onTemperatureChange?.(v as number)}
            sx={{ color: "#3b82f6" }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="caption" sx={{ color: textColor, opacity: 0.3 }}>60°</Typography>
            <Typography variant="caption" sx={{ color: textColor, opacity: 0.3 }}>85°</Typography>
          </Box>
        </Paper>

        {/* Energy Stats */}
        <Paper
          sx={{
            p: 2,
            bgcolor: panelBg,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ color: textColor, mb: 2 }}>
            Energy
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BoltIcon sx={{ color: "#f59e0b", fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: textColor }}>Current</Typography>
              </Box>
              <Typography variant="body1" sx={{ color: "#f59e0b", fontWeight: 600 }}>
                {displayEnergy.currentUsage} kW
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BoltIcon sx={{ color: textColor, fontSize: 20, opacity: 0.5 }} />
                <Typography variant="body2" sx={{ color: textColor }}>Today</Typography>
              </Box>
              <Typography variant="body1" sx={{ color: textColor }}>
                {displayEnergy.todayUsage} kWh
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WaterDropIcon sx={{ color: "#3b82f6", fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: textColor }}>Water</Typography>
              </Box>
              <Typography variant="body1" sx={{ color: "#3b82f6" }}>
                {displayEnergy.waterUsage} gal
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* ================================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================================= */}
      {children}
    </Box>
  );
}
