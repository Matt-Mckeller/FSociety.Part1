"use client";
/**
 * HUD Template: 3D Viewer
 *
 * 3D model viewing application layout:
 * - Rotation gizmo
 * - Layer toggles
 * - Measurement tools
 * - View presets
 * - Model info
 * - Camera controls
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for CAD viewers, 3D model explorers, and product configurators.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Switch,
  List,
  ListItem,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Chip,
  Divider,
} from "@mui/material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import GridOnIcon from "@mui/icons-material/GridOn";
import GridOffIcon from "@mui/icons-material/GridOff";
import LightModeIcon from "@mui/icons-material/LightMode";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import StraightenIcon from "@mui/icons-material/Straighten";
import DownloadIcon from "@mui/icons-material/Download";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import ContrastIcon from "@mui/icons-material/Contrast";

import { ActionDockButton } from "../../../hud/docks";

// =============================================================================
// Types
// =============================================================================

export interface ModelLayer {
  id: string;
  name: string;
  visible: boolean;
  color?: string;
}

export interface ViewPreset {
  id: string;
  name: string;
  icon?: ReactNode;
}

export interface ModelInfo {
  name: string;
  format?: string;
  vertices?: number;
  faces?: number;
  materials?: number;
  fileSize?: string;
  dimensions?: { x: number; y: number; z: number };
}

export interface Hud3dViewerProps {
  children?: ReactNode;
  modelInfo?: ModelInfo;
  layers?: ModelLayer[];
  viewPresets?: ViewPreset[];
  activeViewPreset?: string;
  showGrid?: boolean;
  showWireframe?: boolean;
  showAxes?: boolean;
  isAnimating?: boolean;
  zoom?: number;
  lightIntensity?: number;
  ambientOcclusion?: boolean;
  onLayerToggle?: (layerId: string) => void;
  onViewPresetChange?: (presetId: string) => void;
  onZoomChange?: (zoom: number) => void;
  onResetView?: () => void;
  onFitToView?: () => void;
  onGridToggle?: () => void;
  onWireframeToggle?: () => void;
  onAxesToggle?: () => void;
  onAnimationToggle?: () => void;
  onLightIntensityChange?: (intensity: number) => void;
  onMeasure?: () => void;
  onExport?: () => void;
  onFullscreen?: () => void;
}

// =============================================================================
// Template Component
// =============================================================================

export function Hud3dViewer({
  children,
  modelInfo,
  layers = [],
  viewPresets = [],
  activeViewPreset = "perspective",
  showGrid = true,
  showWireframe = false,
  showAxes = true,
  isAnimating = false,
  zoom = 100,
  lightIntensity = 80,
  ambientOcclusion = true,
  onLayerToggle,
  onViewPresetChange,
  onZoomChange,
  onResetView,
  onFitToView,
  onGridToggle,
  onWireframeToggle,
  onAxesToggle,
  onAnimationToggle,
  onLightIntensityChange,
  onMeasure,
  onExport,
  onFullscreen,
}: Hud3dViewerProps) {
  const [showLayers, setShowLayers] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [measureMode, setMeasureMode] = useState(false);

  const bgColor = "#2a2a2e";
  const panelBg = "rgba(40, 40, 44, 0.95)";
  const textColor = "#ffffff";
  const accentColor = "#0ea5e9";

  // Default model info
  const displayInfo: ModelInfo = modelInfo || {
    name: "Model.glb",
    format: "glTF Binary",
    vertices: 124567,
    faces: 41523,
    materials: 12,
    fileSize: "4.2 MB",
    dimensions: { x: 2.5, y: 1.8, z: 3.2 },
  };

  // Default layers
  const displayLayers: ModelLayer[] = layers.length > 0 ? layers : [
    { id: "body", name: "Body", visible: true, color: "#64748b" },
    { id: "frame", name: "Frame", visible: true, color: "#ef4444" },
    { id: "wheels", name: "Wheels", visible: true, color: "#1e1e1e" },
    { id: "interior", name: "Interior", visible: false, color: "#854d0e" },
    { id: "glass", name: "Glass", visible: true, color: "#0ea5e9" },
  ];

  // Default view presets
  const displayPresets: ViewPreset[] = viewPresets.length > 0 ? viewPresets : [
    { id: "perspective", name: "Perspective" },
    { id: "front", name: "Front" },
    { id: "back", name: "Back" },
    { id: "left", name: "Left" },
    { id: "right", name: "Right" },
    { id: "top", name: "Top" },
    { id: "bottom", name: "Bottom" },
  ];

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
      {/* TOP: Toolbar */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          bgcolor: panelBg,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ViewInArIcon sx={{ color: accentColor }} />
          <Typography variant="subtitle1" sx={{ color: textColor }}>
            {displayInfo.name}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* View Presets */}
          <ToggleButtonGroup
            value={activeViewPreset}
            exclusive
            onChange={(_, v) => v && onViewPresetChange?.(v)}
            size="small"
          >
            {displayPresets.slice(0, 4).map((preset) => (
              <ToggleButton
                key={preset.id}
                value={preset.id}
                sx={{
                  color: textColor,
                  borderColor: "rgba(255,255,255,0.1)",
                  "&.Mui-selected": { bgcolor: "rgba(14, 165, 233, 0.2)", color: accentColor },
                }}
              >
                {preset.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: "rgba(255,255,255,0.1)" }} />

          {/* Display Options */}
          <IconButton
            onClick={onGridToggle}
            sx={{ color: showGrid ? accentColor : textColor }}
          >
            {showGrid ? <GridOnIcon /> : <GridOffIcon />}
          </IconButton>
          <IconButton
            onClick={onWireframeToggle}
            sx={{ color: showWireframe ? accentColor : textColor }}
          >
            <ThreeDRotationIcon />
          </IconButton>
          <IconButton
            onClick={() => { setMeasureMode(!measureMode); onMeasure?.(); }}
            sx={{ color: measureMode ? accentColor : textColor }}
          >
            <StraightenIcon />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: "rgba(255,255,255,0.1)" }} />

          {/* Actions */}
          <IconButton onClick={onExport} sx={{ color: textColor }}>
            <DownloadIcon />
          </IconButton>
          <IconButton onClick={() => setShowInfo(!showInfo)} sx={{ color: showInfo ? accentColor : textColor }}>
            <InfoIcon />
          </IconButton>
          <IconButton onClick={onFullscreen} sx={{ color: textColor }}>
            <FullscreenIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ================================================================= */}
      {/* LEFT: Layers Panel */}
      {/* ================================================================= */}
      {showLayers && (
        <Paper
          sx={{
            position: "fixed",
            top: 64,
            left: 16,
            width: 220,
            bgcolor: panelBg,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            zIndex: 999,
          }}
        >
          <Box sx={{ p: 1.5, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <Typography variant="caption" sx={{ color: textColor, textTransform: "uppercase", fontWeight: 600 }}>
              Layers
            </Typography>
          </Box>
          <List dense sx={{ py: 0 }}>
            {displayLayers.map((layer) => (
              <ListItem
                key={layer.id}
                sx={{ py: 0.5 }}
                secondaryAction={
                  <IconButton
                    size="small"
                    onClick={() => onLayerToggle?.(layer.id)}
                    sx={{ color: layer.visible ? textColor : "rgba(255,255,255,0.3)" }}
                  >
                    {layer.visible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                  </IconButton>
                }
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: layer.color,
                    mr: 1.5,
                    opacity: layer.visible ? 1 : 0.3,
                  }}
                />
                <ListItemText
                  primary={layer.name}
                  sx={{
                    "& .MuiTypography-root": {
                      color: textColor,
                      opacity: layer.visible ? 1 : 0.5,
                      fontSize: "0.875rem",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* LEFT BOTTOM: Lighting Controls */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          bottom: 80,
          left: 16,
          width: 220,
          bgcolor: panelBg,
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 2,
          p: 2,
          zIndex: 999,
        }}
      >
        <Typography variant="caption" sx={{ color: textColor, textTransform: "uppercase", fontWeight: 600 }}>
          Lighting
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LightModeIcon sx={{ color: textColor, fontSize: 18 }} />
              <Typography variant="caption" sx={{ color: textColor }}>Intensity</Typography>
            </Box>
            <Typography variant="caption" sx={{ color: textColor }}>{lightIntensity}%</Typography>
          </Box>
          <Slider
            value={lightIntensity}
            onChange={(_, v) => onLightIntensityChange?.(v as number)}
            size="small"
            sx={{ color: accentColor }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Typography variant="caption" sx={{ color: textColor }}>Ambient Occlusion</Typography>
          <Switch checked={ambientOcclusion} size="small" />
        </Box>
      </Paper>

      {/* ================================================================= */}
      {/* RIGHT: Model Info */}
      {/* ================================================================= */}
      {showInfo && (
        <Paper
          sx={{
            position: "fixed",
            top: 64,
            right: 16,
            width: 240,
            bgcolor: panelBg,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            p: 2,
            zIndex: 999,
          }}
        >
          <Typography variant="caption" sx={{ color: textColor, textTransform: "uppercase", fontWeight: 600 }}>
            Model Info
          </Typography>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            {[
              { label: "Format", value: displayInfo.format },
              { label: "Vertices", value: displayInfo.vertices?.toLocaleString() },
              { label: "Faces", value: displayInfo.faces?.toLocaleString() },
              { label: "Materials", value: displayInfo.materials },
              { label: "File Size", value: displayInfo.fileSize },
            ].map((item) => (
              <Box key={item.label} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>{item.label}</Typography>
                <Typography variant="caption" sx={{ color: textColor }}>{item.value}</Typography>
              </Box>
            ))}
            {displayInfo.dimensions && (
              <Box>
                <Typography variant="caption" sx={{ color: textColor, opacity: 0.5, display: "block", mb: 0.5 }}>
                  Dimensions (m)
                </Typography>
                <Typography variant="caption" sx={{ color: textColor }}>
                  {displayInfo.dimensions.x} × {displayInfo.dimensions.y} × {displayInfo.dimensions.z}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* RIGHT: Zoom Controls */}
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
        }}
      >
        <IconButton onClick={() => onZoomChange?.(Math.min(zoom + 20, 200))} sx={{ bgcolor: panelBg, color: textColor, "&:hover": { bgcolor: panelBg } }}>
          <ZoomInIcon />
        </IconButton>
        <Box sx={{ height: 120, px: 1 }}>
          <Slider
            orientation="vertical"
            value={zoom}
            min={20}
            max={200}
            onChange={(_, v) => onZoomChange?.(v as number)}
            sx={{ color: accentColor, height: "100%" }}
          />
        </Box>
        <IconButton onClick={() => onZoomChange?.(Math.max(zoom - 20, 20))} sx={{ bgcolor: panelBg, color: textColor, "&:hover": { bgcolor: panelBg } }}>
          <ZoomOutIcon />
        </IconButton>
      </Box>

      {/* ================================================================= */}
      {/* BOTTOM: Camera Controls */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          bgcolor: panelBg,
          borderRadius: 2,
          p: 1,
          border: "1px solid rgba(255,255,255,0.1)",
          zIndex: 999,
        }}
      >
        <ActionDockButton icon={<FitScreenIcon />} label="Fit to View" colorMode="dark" onClick={onFitToView} />
        <ActionDockButton icon={<RestartAltIcon />} label="Reset View" colorMode="dark" onClick={onResetView} />
        <ActionDockButton
          icon={isAnimating ? <PauseIcon /> : <PlayArrowIcon />}
          label={isAnimating ? "Pause" : "Animate"}
          colorMode="dark"
          onClick={onAnimationToggle}
        />
        <ActionDockButton icon={<CameraAltIcon />} label="Screenshot" colorMode="dark" />
      </Box>

      {/* ================================================================= */}
      {/* BOTTOM LEFT: Axes Indicator */}
      {/* ================================================================= */}
      {showAxes && (
        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            left: showLayers ? 252 : 16,
            width: 60,
            height: 60,
            bgcolor: "rgba(0,0,0,0.5)",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 998,
          }}
        >
          {/* Simple axes indicator */}
          <svg width="40" height="40" viewBox="0 0 40 40">
            <line x1="20" y1="20" x2="35" y2="20" stroke="#ef4444" strokeWidth="2" />
            <text x="36" y="23" fill="#ef4444" fontSize="10">X</text>
            <line x1="20" y1="20" x2="20" y2="5" stroke="#22c55e" strokeWidth="2" />
            <text x="17" y="4" fill="#22c55e" fontSize="10">Y</text>
            <line x1="20" y1="20" x2="10" y2="30" stroke="#3b82f6" strokeWidth="2" />
            <text x="5" y="35" fill="#3b82f6" fontSize="10">Z</text>
          </svg>
        </Box>
      )}

      {/* ================================================================= */}
      {/* MAIN CONTENT - 3D View */}
      {/* ================================================================= */}
      {children ?? (
        <Box
          sx={{
            position: "absolute",
            top: 48,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" sx={{ color: textColor, opacity: 0.1 }}>
            3D Canvas
          </Typography>
        </Box>
      )}
    </Box>
  );
}
