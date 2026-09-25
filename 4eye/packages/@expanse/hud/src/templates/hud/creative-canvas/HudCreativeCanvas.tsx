"use client";
/**
 * HUD Template: Creative Canvas
 *
 * Digital art/design application layout:
 * - Tools panel (left)
 * - Layers panel (right)
 * - Properties panel (right, below layers)
 * - Color picker
 * - Zoom controls
 * - History (undo/redo)
 * - Canvas info
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for drawing apps, photo editors, and design tools.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slider,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import EditIcon from "@mui/icons-material/Edit";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PanToolIcon from "@mui/icons-material/PanTool";
import ColorizeIcon from "@mui/icons-material/Colorize";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import { ActionDock, ActionDockButton } from "../../../hud/docks";

// =============================================================================
// Types
// =============================================================================

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  thumbnail?: string;
}

export interface Tool {
  id: string;
  icon: ReactNode;
  label: string;
  hotkey?: string;
}

export interface HudCreativeCanvasProps {
  children?: ReactNode;
  layers?: Layer[];
  selectedLayerId?: string;
  activeTool?: string;
  brushSize?: number;
  brushOpacity?: number;
  primaryColor?: string;
  secondaryColor?: string;
  zoom?: number;
  canvasWidth?: number;
  canvasHeight?: number;
  canvasName?: string;
  onToolSelect?: (toolId: string) => void;
  onLayerSelect?: (layerId: string) => void;
  onLayerVisibilityToggle?: (layerId: string) => void;
  onLayerLockToggle?: (layerId: string) => void;
  onLayerAdd?: () => void;
  onLayerDelete?: (layerId: string) => void;
  onLayerDuplicate?: (layerId: string) => void;
  onBrushSizeChange?: (size: number) => void;
  onBrushOpacityChange?: (opacity: number) => void;
  onColorChange?: (color: string, isPrimary: boolean) => void;
  onZoomChange?: (zoom: number) => void;
  onUndo?: () => void;
  onRedo?: () => void;
}

// =============================================================================
// Default Tools
// =============================================================================

const defaultTools: Tool[] = [
  { id: "brush", icon: <BrushIcon />, label: "Brush", hotkey: "B" },
  { id: "pencil", icon: <EditIcon />, label: "Pencil", hotkey: "P" },
  { id: "eraser", icon: <AutoFixHighIcon />, label: "Eraser", hotkey: "E" },
  { id: "rectangle", icon: <CropSquareIcon />, label: "Rectangle", hotkey: "R" },
  { id: "ellipse", icon: <CircleOutlinedIcon />, label: "Ellipse", hotkey: "O" },
  { id: "text", icon: <TextFieldsIcon />, label: "Text", hotkey: "T" },
  { id: "hand", icon: <PanToolIcon />, label: "Hand", hotkey: "H" },
  { id: "eyedropper", icon: <ColorizeIcon />, label: "Eyedropper", hotkey: "I" },
];

// =============================================================================
// Template Component
// =============================================================================

export function HudCreativeCanvas({
  children,
  layers = [],
  selectedLayerId,
  activeTool = "brush",
  brushSize = 10,
  brushOpacity = 100,
  primaryColor = "#000000",
  secondaryColor = "#ffffff",
  zoom = 100,
  canvasWidth = 1920,
  canvasHeight = 1080,
  canvasName = "Untitled",
  onToolSelect,
  onLayerSelect,
  onLayerVisibilityToggle,
  onLayerLockToggle,
  onLayerAdd,
  onLayerDelete,
  onLayerDuplicate,
  onBrushSizeChange,
  onBrushOpacityChange,
  onColorChange,
  onZoomChange,
  onUndo,
  onRedo,
}: HudCreativeCanvasProps) {
  const [showLayers, setShowLayers] = useState(true);
  const [showProperties, setShowProperties] = useState(true);

  const bgColor = "#1a1a1f";
  const panelBg = "rgba(30, 30, 35, 0.95)";
  const textColor = "#ffffff";

  // Default layers if none provided
  const displayLayers = layers.length > 0 ? layers : [
    { id: "1", name: "Background", visible: true, locked: true, opacity: 100 },
    { id: "2", name: "Layer 1", visible: true, locked: false, opacity: 100 },
    { id: "3", name: "Layer 2", visible: true, locked: false, opacity: 80 },
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
      {/* TOP BAR - Canvas Info */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 80,
          right: showLayers ? 280 : 0,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          bgcolor: panelBg,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          zIndex: 1000,
        }}
      >
        <Typography variant="body2" sx={{ color: textColor }}>
          {canvasName}
        </Typography>
        <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
          {canvasWidth} × {canvasHeight}
        </Typography>
        <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
          {zoom}%
        </Typography>
      </Box>

      {/* ================================================================= */}
      {/* LEFT: Tools Panel */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: 64,
          bgcolor: panelBg,
          borderRight: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
          zIndex: 1001,
        }}
      >
        {defaultTools.map((tool) => (
          <IconButton
            key={tool.id}
            onClick={() => onToolSelect?.(tool.id)}
            title={`${tool.label} (${tool.hotkey})`}
            sx={{
              color: activeTool === tool.id ? "primary.main" : textColor,
              bgcolor: activeTool === tool.id ? "rgba(59, 130, 246, 0.2)" : "transparent",
              width: 44,
              height: 44,
              mb: 0.5,
              borderRadius: 1,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            {tool.icon}
          </IconButton>
        ))}

        <Divider sx={{ width: "60%", my: 2, bgcolor: "rgba(255,255,255,0.1)" }} />

        {/* Color swatches */}
        <Box sx={{ position: "relative", width: 36, height: 36, mb: 2 }}>
          {/* Secondary color (back) */}
          <Box
            onClick={() => onColorChange?.(secondaryColor, false)}
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 24,
              height: 24,
              bgcolor: secondaryColor,
              border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: 0.5,
              cursor: "pointer",
            }}
          />
          {/* Primary color (front) */}
          <Box
            onClick={() => onColorChange?.(primaryColor, true)}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 24,
              height: 24,
              bgcolor: primaryColor,
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: 0.5,
              cursor: "pointer",
            }}
          />
        </Box>
      </Paper>

      {/* ================================================================= */}
      {/* LEFT BOTTOM: Brush Properties */}
      {/* ================================================================= */}
      {showProperties && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 24,
            left: 80,
            width: 200,
            p: 2,
            bgcolor: panelBg,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            zIndex: 999,
          }}
        >
          <Typography variant="caption" sx={{ color: textColor, opacity: 0.5, textTransform: "uppercase" }}>
            Brush
          </Typography>

          {/* Size */}
          <Box sx={{ mt: 1.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: textColor }}>Size</Typography>
              <Typography variant="caption" sx={{ color: textColor }}>{brushSize}px</Typography>
            </Box>
            <Slider
              value={brushSize}
              min={1}
              max={100}
              onChange={(_, v) => onBrushSizeChange?.(v as number)}
              size="small"
              sx={{ color: "primary.main" }}
            />
          </Box>

          {/* Opacity */}
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: textColor }}>Opacity</Typography>
              <Typography variant="caption" sx={{ color: textColor }}>{brushOpacity}%</Typography>
            </Box>
            <Slider
              value={brushOpacity}
              min={1}
              max={100}
              onChange={(_, v) => onBrushOpacityChange?.(v as number)}
              size="small"
              sx={{ color: "primary.main" }}
            />
          </Box>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* RIGHT: Layers Panel */}
      {/* ================================================================= */}
      {showLayers && (
        <Paper
          sx={{
            position: "fixed",
            top: 40,
            right: 0,
            bottom: 0,
            width: 260,
            bgcolor: panelBg,
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 1.5,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ color: textColor }}>
              Layers
            </Typography>
            <Box>
              <IconButton size="small" onClick={onLayerAdd} sx={{ color: textColor }}>
                <AddIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => selectedLayerId && onLayerDuplicate?.(selectedLayerId)}
                sx={{ color: textColor }}
                disabled={!selectedLayerId}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => selectedLayerId && onLayerDelete?.(selectedLayerId)}
                sx={{ color: textColor }}
                disabled={!selectedLayerId}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Layer list */}
          <List sx={{ flex: 1, overflow: "auto", py: 0 }}>
            {displayLayers.map((layer) => (
              <ListItem
                key={layer.id}
                disablePadding
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <ListItemButton
                  selected={selectedLayerId === layer.id}
                  onClick={() => onLayerSelect?.(layer.id)}
                  sx={{
                    py: 1,
                    "&.Mui-selected": { bgcolor: "rgba(59, 130, 246, 0.2)" },
                    "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <DragIndicatorIcon sx={{ color: textColor, opacity: 0.3, fontSize: 18 }} />
                  </ListItemIcon>

                  {/* Thumbnail placeholder */}
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 0.5,
                      mr: 1,
                    }}
                  />

                  <ListItemText
                    primary={layer.name}
                    secondary={`${layer.opacity}%`}
                    sx={{
                      "& .MuiTypography-root": { color: textColor, fontSize: "0.875rem" },
                      "& .MuiTypography-body2": { opacity: 0.5, fontSize: "0.7rem" },
                    }}
                  />

                  {/* Layer controls */}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLayerVisibilityToggle?.(layer.id);
                    }}
                    sx={{ color: textColor, opacity: layer.visible ? 1 : 0.3 }}
                  >
                    {layer.visible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLayerLockToggle?.(layer.id);
                    }}
                    sx={{ color: textColor, opacity: layer.locked ? 1 : 0.3 }}
                  >
                    {layer.locked ? <LockIcon fontSize="small" /> : <LockOpenIcon fontSize="small" />}
                  </IconButton>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Opacity slider for selected layer */}
          <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: textColor }}>Layer Opacity</Typography>
              <Typography variant="caption" sx={{ color: textColor }}>
                {displayLayers.find((l) => l.id === selectedLayerId)?.opacity ?? 100}%
              </Typography>
            </Box>
            <Slider
              value={displayLayers.find((l) => l.id === selectedLayerId)?.opacity ?? 100}
              min={0}
              max={100}
              size="small"
              sx={{ color: "primary.main" }}
            />
          </Box>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* BOTTOM RIGHT: Zoom Controls */}
      {/* ================================================================= */}
      <ActionDock position="bottom-right">
        <ActionDockButton icon={<ZoomInIcon />} label="Zoom In" onClick={() => onZoomChange?.(Math.min(zoom + 25, 400))} />
        <ActionDockButton icon={<ZoomOutIcon />} label="Zoom Out" onClick={() => onZoomChange?.(Math.max(zoom - 25, 25))} />
        <ActionDockButton icon={<FitScreenIcon />} label="Fit to Screen" onClick={() => onZoomChange?.(100)} />
      </ActionDock>

      {/* ================================================================= */}
      {/* BOTTOM LEFT: History */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          left: 300,
          display: "flex",
          gap: 1,
          zIndex: 999,
        }}
      >
        <IconButton
          onClick={onUndo}
          sx={{
            color: textColor,
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
          }}
        >
          <UndoIcon />
        </IconButton>
        <IconButton
          onClick={onRedo}
          sx={{
            color: textColor,
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
          }}
        >
          <RedoIcon />
        </IconButton>
      </Box>

      {/* ================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ================================================================= */}
      {children ?? (
        <Box
          sx={{
            position: "absolute",
            top: 40,
            left: 64,
            right: showLayers ? 260 : 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 800,
              height: 600,
              bgcolor: "#ffffff",
              boxShadow: "0 0 40px rgba(0,0,0,0.5)",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#ccc",
              }}
            >
              Canvas
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
