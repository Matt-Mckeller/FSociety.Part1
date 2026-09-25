"use client";
/**
 * HUD Template: Streaming/Broadcast
 *
 * Live streaming application layout:
 * - Stream controls (go live, end)
 * - Chat overlay
 * - Alerts panel
 * - Audio mixer
 * - Scene switcher
 * - Viewer count
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for OBS-style streaming and broadcast applications.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
  Slider,
  List,
  ListItem,
  TextField,
  Badge,
  Chip,
  Avatar,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CellTowerIcon from "@mui/icons-material/CellTower";
import SettingsIcon from "@mui/icons-material/Settings";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

import { ActionDockButton } from "../../../hud/docks";

// =============================================================================
// Types
// =============================================================================

export interface Scene {
  id: string;
  name: string;
  thumbnail?: string;
}

export interface AudioSource {
  id: string;
  name: string;
  volume: number;
  muted: boolean;
  type: "mic" | "desktop" | "music" | "alert";
}

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  color?: string;
  badges?: string[];
  timestamp: Date;
}

export interface Alert {
  id: string;
  type: "follow" | "subscribe" | "donation" | "raid";
  username: string;
  amount?: number;
  message?: string;
  timestamp: Date;
}

export interface HudStreamingProps {
  children?: ReactNode;
  isLive?: boolean;
  streamDuration?: number; // seconds
  viewerCount?: number;
  scenes?: Scene[];
  activeSceneId?: string;
  audioSources?: AudioSource[];
  chatMessages?: ChatMessage[];
  recentAlerts?: Alert[];
  bitrate?: number; // kbps
  droppedFrames?: number;
  onGoLive?: () => void;
  onEndStream?: () => void;
  onSceneChange?: (sceneId: string) => void;
  onAudioVolumeChange?: (sourceId: string, volume: number) => void;
  onAudioMuteToggle?: (sourceId: string) => void;
  onSendChat?: (message: string) => void;
  onDismissAlert?: (alertId: string) => void;
}

// =============================================================================
// Utility
// =============================================================================

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// =============================================================================
// Template Component
// =============================================================================

export function HudStreaming({
  children,
  isLive = false,
  streamDuration = 0,
  viewerCount = 0,
  scenes = [],
  activeSceneId,
  audioSources = [],
  chatMessages = [],
  recentAlerts = [],
  bitrate = 6000,
  droppedFrames = 0,
  onGoLive,
  onEndStream,
  onSceneChange,
  onAudioVolumeChange,
  onAudioMuteToggle,
  onSendChat,
  onDismissAlert,
}: HudStreamingProps) {
  const [showChat, setShowChat] = useState(true);
  const [showMixer, setShowMixer] = useState(true);
  const [chatInput, setChatInput] = useState("");

  const bgColor = "#18181b";
  const panelBg = "rgba(24, 24, 27, 0.95)";
  const textColor = "#ffffff";
  const accentColor = "#9147ff"; // Twitch purple

  // Default scenes
  const displayScenes: Scene[] = scenes.length > 0 ? scenes : [
    { id: "1", name: "Starting Soon" },
    { id: "2", name: "Main Scene" },
    { id: "3", name: "BRB" },
    { id: "4", name: "Just Chatting" },
    { id: "5", name: "Ending" },
  ];

  // Default audio sources
  const displayAudio: AudioSource[] = audioSources.length > 0 ? audioSources : [
    { id: "1", name: "Microphone", volume: 80, muted: false, type: "mic" },
    { id: "2", name: "Desktop Audio", volume: 60, muted: false, type: "desktop" },
    { id: "3", name: "Music", volume: 30, muted: false, type: "music" },
    { id: "4", name: "Alerts", volume: 70, muted: false, type: "alert" },
  ];

  // Default chat messages
  const displayChat: ChatMessage[] = chatMessages.length > 0 ? chatMessages : [
    { id: "1", username: "viewer123", message: "Hello stream!", color: "#ff7f50", timestamp: new Date() },
    { id: "2", username: "cool_dude", message: "Pog", color: "#1e90ff", badges: ["sub"], timestamp: new Date() },
    { id: "3", username: "moderator", message: "Welcome everyone!", color: "#00ff7f", badges: ["mod"], timestamp: new Date() },
  ];

  const handleSendChat = () => {
    if (chatInput.trim()) {
      onSendChat?.(chatInput);
      setChatInput("");
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
      {/* TOP BAR - Stream Status */}
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
        {/* Left: Go Live / End Stream */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!isLive ? (
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={onGoLive}
              sx={{ bgcolor: "#ef4444", "&:hover": { bgcolor: "#dc2626" } }}
            >
              Go Live
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<StopIcon />}
              onClick={onEndStream}
              sx={{ bgcolor: "#6b7280", "&:hover": { bgcolor: "#4b5563" } }}
            >
              End Stream
            </Button>
          )}

          {isLive && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Chip
                icon={<CellTowerIcon sx={{ fontSize: 16 }} />}
                label="LIVE"
                size="small"
                sx={{ bgcolor: "#ef4444", color: "white", fontWeight: "bold" }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: textColor }}>
                <AccessTimeIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">{formatDuration(streamDuration)}</Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Center: Viewers & Health */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: textColor }}>
            <VisibilityIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{viewerCount.toLocaleString()}</Typography>
          </Box>
          <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
            {bitrate} kbps • {droppedFrames} dropped
          </Typography>
        </Box>

        {/* Right: Settings */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton sx={{ color: textColor }}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ================================================================= */}
      {/* LEFT: Scene Switcher */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          top: 64,
          left: 16,
          width: 200,
          bgcolor: panelBg,
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 2,
          zIndex: 999,
        }}
      >
        <Box sx={{ p: 1.5, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Typography variant="caption" sx={{ color: textColor, textTransform: "uppercase", fontWeight: 600 }}>
            Scenes
          </Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          {displayScenes.map((scene) => (
            <Box
              key={scene.id}
              onClick={() => onSceneChange?.(scene.id)}
              sx={{
                p: 1.5,
                mb: 0.5,
                borderRadius: 1,
                cursor: "pointer",
                bgcolor: activeSceneId === scene.id ? "rgba(145, 71, 255, 0.2)" : "transparent",
                border: activeSceneId === scene.id ? `2px solid ${accentColor}` : "2px solid transparent",
                "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
              }}
            >
              <Typography variant="body2" sx={{ color: textColor }}>
                {scene.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* ================================================================= */}
      {/* LEFT BOTTOM: Audio Mixer */}
      {/* ================================================================= */}
      {showMixer && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 16,
            left: 16,
            width: 200,
            bgcolor: panelBg,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            zIndex: 999,
          }}
        >
          <Box sx={{ p: 1.5, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <Typography variant="caption" sx={{ color: textColor, textTransform: "uppercase", fontWeight: 600 }}>
              Audio Mixer
            </Typography>
          </Box>
          <Box sx={{ p: 1.5 }}>
            {displayAudio.map((source) => (
              <Box key={source.id} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                  <Typography variant="caption" sx={{ color: textColor }}>{source.name}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => onAudioMuteToggle?.(source.id)}
                    sx={{ color: source.muted ? "#ef4444" : textColor }}
                  >
                    {source.type === "mic" ? (source.muted ? <MicOffIcon fontSize="small" /> : <MicIcon fontSize="small" />) : <VolumeUpIcon fontSize="small" />}
                  </IconButton>
                </Box>
                <Slider
                  value={source.muted ? 0 : source.volume}
                  onChange={(_, v) => onAudioVolumeChange?.(source.id, v as number)}
                  size="small"
                  sx={{
                    color: source.muted ? "#6b7280" : "#22c55e",
                    height: 4,
                  }}
                />
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* RIGHT: Chat */}
      {/* ================================================================= */}
      {showChat && (
        <Paper
          sx={{
            position: "fixed",
            top: 64,
            right: 16,
            bottom: 16,
            width: 320,
            bgcolor: panelBg,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
          }}
        >
          <Box sx={{ p: 1.5, borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ChatIcon sx={{ color: textColor, fontSize: 18 }} />
              <Typography variant="caption" sx={{ color: textColor, textTransform: "uppercase", fontWeight: 600 }}>
                Stream Chat
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setShowChat(false)} sx={{ color: textColor }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Chat messages */}
          <List sx={{ flex: 1, overflow: "auto", p: 1 }}>
            {displayChat.map((msg) => (
              <ListItem key={msg.id} sx={{ px: 1, py: 0.5, alignItems: "flex-start" }}>
                <Box>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ fontWeight: 600, color: msg.color || accentColor }}
                  >
                    {msg.username}:
                  </Typography>{" "}
                  <Typography component="span" variant="body2" sx={{ color: textColor }}>
                    {msg.message}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>

          {/* Chat input */}
          <Box sx={{ p: 1.5, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Send a message"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendChat()}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.05)",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  },
                  "& .MuiInputBase-input": { color: textColor },
                }}
              />
              <IconButton onClick={handleSendChat} sx={{ color: accentColor }}>
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* TOP RIGHT: Alerts */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 64,
          right: showChat ? 352 : 16,
          width: 280,
          zIndex: 998,
          transition: "right 0.3s ease",
        }}
      >
        {recentAlerts.slice(0, 3).map((alert) => (
          <Paper
            key={alert.id}
            sx={{
              p: 1.5,
              mb: 1,
              bgcolor: "rgba(145, 71, 255, 0.1)",
              border: `1px solid ${accentColor}`,
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: accentColor, textTransform: "uppercase" }}>
                {alert.type}
              </Typography>
              <Typography variant="body2" sx={{ color: textColor }}>
                {alert.username} {alert.amount && `$${alert.amount}`}
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => onDismissAlert?.(alert.id)} sx={{ color: textColor }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Paper>
        ))}
      </Box>

      {/* ================================================================= */}
      {/* BOTTOM: Quick Controls */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          bgcolor: "rgba(30, 41, 59, 0.95)",
          borderRadius: 2,
          p: 1,
          border: "1px solid rgba(255,255,255,0.1)",
          zIndex: 999,
        }}
      >
        <ActionDockButton icon={<MicIcon />} label="Mute Mic" colorMode="dark" />
        <ActionDockButton icon={<VideocamIcon />} label="Toggle Cam" colorMode="dark" />
        <ActionDockButton icon={<HeadphonesIcon />} label="Deafen" colorMode="dark" />
        <ActionDockButton icon={<NotificationsIcon />} label="Test Alert" colorMode="dark" />
      </Box>

      {/* ================================================================= */}
      {/* MAIN CONTENT - Preview */}
      {/* ================================================================= */}
      {children ?? (
        <Box
          sx={{
            position: "absolute",
            top: 64,
            left: 232,
            right: showChat ? 352 : 16,
            bottom: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#000",
            border: isLive ? "3px solid #ef4444" : "3px solid #6b7280",
            borderRadius: 2,
            transition: "right 0.3s ease",
          }}
        >
          <Typography variant="h4" sx={{ color: textColor, opacity: 0.2 }}>
            Stream Preview
          </Typography>
        </Box>
      )}
    </Box>
  );
}
