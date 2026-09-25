"use client";
/**
 * HUD Template: Music Production
 *
 * DAW-style music production layout:
 * - Transport controls (play, stop, record)
 * - Timeline/arrangement view
 * - Mixer channels
 * - BPM/tempo
 * - Time signature
 * - Track list
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for audio production and music creation apps.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Slider,
  TextField,
  Divider,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RepeatIcon from "@mui/icons-material/Repeat";
import MetronomeIcon from "@mui/icons-material/Timer";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";
import AddIcon from "@mui/icons-material/Add";

// =============================================================================
// Types
// =============================================================================

export interface Track {
  id: string;
  name: string;
  color: string;
  volume: number;
  pan: number;
  muted: boolean;
  solo: boolean;
  armed: boolean;
  type: "audio" | "midi" | "bus" | "master";
}

export interface HudMusicProductionProps {
  children?: ReactNode;
  isPlaying?: boolean;
  isRecording?: boolean;
  bpm?: number;
  timeSignature?: [number, number];
  currentBar?: number;
  currentBeat?: number;
  currentTime?: string; // "00:00:00.000"
  loopEnabled?: boolean;
  metronomeEnabled?: boolean;
  tracks?: Track[];
  masterVolume?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onRecord?: () => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  onBpmChange?: (bpm: number) => void;
  onLoopToggle?: () => void;
  onMetronomeToggle?: () => void;
  onTrackVolumeChange?: (trackId: string, volume: number) => void;
  onTrackPanChange?: (trackId: string, pan: number) => void;
  onTrackMuteToggle?: (trackId: string) => void;
  onTrackSoloToggle?: (trackId: string) => void;
  onTrackArmToggle?: (trackId: string) => void;
  onMasterVolumeChange?: (volume: number) => void;
  onAddTrack?: () => void;
}

// =============================================================================
// Template Component
// =============================================================================

export function HudMusicProduction({
  children,
  isPlaying = false,
  isRecording = false,
  bpm = 120,
  timeSignature = [4, 4],
  currentBar = 1,
  currentBeat = 1,
  currentTime = "00:00:00.000",
  loopEnabled = false,
  metronomeEnabled = true,
  tracks = [],
  masterVolume = 80,
  onPlay,
  onPause,
  onStop,
  onRecord,
  onSkipBack,
  onSkipForward,
  onBpmChange,
  onLoopToggle,
  onMetronomeToggle,
  onTrackVolumeChange,
  onTrackPanChange,
  onTrackMuteToggle,
  onTrackSoloToggle,
  onTrackArmToggle,
  onMasterVolumeChange,
  onAddTrack,
}: HudMusicProductionProps) {
  const bgColor = "#1a1a1e";
  const panelBg = "rgba(30, 30, 35, 0.95)";
  const textColor = "#ffffff";
  const accentColor = "#22c55e";
  const recordColor = "#ef4444";

  // Default tracks
  const displayTracks: Track[] = tracks.length > 0 ? tracks : [
    { id: "1", name: "Drums", color: "#ef4444", volume: 75, pan: 0, muted: false, solo: false, armed: false, type: "audio" },
    { id: "2", name: "Bass", color: "#3b82f6", volume: 70, pan: 0, muted: false, solo: false, armed: false, type: "audio" },
    { id: "3", name: "Synth", color: "#8b5cf6", volume: 65, pan: -20, muted: false, solo: false, armed: false, type: "midi" },
    { id: "4", name: "Vocals", color: "#f59e0b", volume: 80, pan: 0, muted: true, solo: false, armed: true, type: "audio" },
    { id: "5", name: "FX", color: "#ec4899", volume: 50, pan: 30, muted: false, solo: false, armed: false, type: "bus" },
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
      {/* TOP: Transport Bar */}
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
          justifyContent: "center",
          gap: 4,
          bgcolor: panelBg,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          zIndex: 1000,
        }}
      >
        {/* Left: Position */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 200 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: textColor, opacity: 0.5, display: "block" }}>
              BAR
            </Typography>
            <Typography variant="h6" sx={{ color: textColor, fontFamily: "monospace" }}>
              {currentBar.toString().padStart(3, "0")}
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ color: textColor, opacity: 0.3 }}>:</Typography>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: textColor, opacity: 0.5, display: "block" }}>
              BEAT
            </Typography>
            <Typography variant="h6" sx={{ color: textColor, fontFamily: "monospace" }}>
              {currentBeat}
            </Typography>
          </Box>
        </Box>

        {/* Center: Transport Controls */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={onSkipBack} sx={{ color: textColor }}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton onClick={onStop} sx={{ color: textColor }}>
            <StopIcon />
          </IconButton>
          <IconButton
            onClick={isPlaying ? onPause : onPlay}
            sx={{
              color: "white",
              bgcolor: isPlaying ? accentColor : "rgba(255,255,255,0.1)",
              width: 48,
              height: 48,
              "&:hover": { bgcolor: isPlaying ? accentColor : "rgba(255,255,255,0.2)" },
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton
            onClick={onRecord}
            sx={{
              color: "white",
              bgcolor: isRecording ? recordColor : "rgba(255,255,255,0.1)",
              width: 48,
              height: 48,
              "&:hover": { bgcolor: isRecording ? recordColor : "rgba(255,255,255,0.2)" },
            }}
          >
            <FiberManualRecordIcon />
          </IconButton>
          <IconButton onClick={onSkipForward} sx={{ color: textColor }}>
            <SkipNextIcon />
          </IconButton>
        </Box>

        {/* Right: Tempo & Options */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, minWidth: 200 }}>
          {/* BPM */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: textColor, opacity: 0.5, display: "block" }}>
              BPM
            </Typography>
            <TextField
              value={bpm}
              onChange={(e) => onBpmChange?.(parseInt(e.target.value) || 120)}
              size="small"
              type="number"
              sx={{
                width: 60,
                "& .MuiInputBase-input": {
                  color: textColor,
                  textAlign: "center",
                  fontFamily: "monospace",
                  fontSize: "1.1rem",
                  p: 0.5,
                },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            />
          </Box>

          {/* Time Signature */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: textColor, opacity: 0.5, display: "block" }}>
              TIME
            </Typography>
            <Typography variant="body1" sx={{ color: textColor, fontFamily: "monospace" }}>
              {timeSignature[0]}/{timeSignature[1]}
            </Typography>
          </Box>

          {/* Options */}
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton
              onClick={onLoopToggle}
              sx={{ color: loopEnabled ? accentColor : textColor, opacity: loopEnabled ? 1 : 0.5 }}
            >
              <RepeatIcon />
            </IconButton>
            <IconButton
              onClick={onMetronomeToggle}
              sx={{ color: metronomeEnabled ? accentColor : textColor, opacity: metronomeEnabled ? 1 : 0.5 }}
            >
              <MetronomeIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ================================================================= */}
      {/* LEFT: Track List */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          top: 56,
          left: 0,
          bottom: 120,
          width: 200,
          bgcolor: panelBg,
          borderRight: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          zIndex: 999,
        }}
      >
        <Box sx={{ p: 1, borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="caption" sx={{ color: textColor, textTransform: "uppercase" }}>
            Tracks
          </Typography>
          <IconButton size="small" onClick={onAddTrack} sx={{ color: textColor }}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflow: "auto" }}>
          {displayTracks.map((track) => (
            <Box
              key={track.id}
              sx={{
                p: 1,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                borderLeft: `3px solid ${track.color}`,
                bgcolor: track.armed ? "rgba(239, 68, 68, 0.1)" : "transparent",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                <Typography variant="body2" sx={{ color: textColor, fontWeight: 500 }}>
                  {track.name}
                </Typography>
                <Box sx={{ display: "flex", gap: 0.25 }}>
                  <IconButton
                    size="small"
                    onClick={() => onTrackMuteToggle?.(track.id)}
                    sx={{ color: track.muted ? "#ef4444" : textColor, opacity: track.muted ? 1 : 0.4, p: 0.25 }}
                  >
                    <Typography variant="caption" sx={{ fontSize: 10, fontWeight: "bold" }}>M</Typography>
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onTrackSoloToggle?.(track.id)}
                    sx={{ color: track.solo ? "#f59e0b" : textColor, opacity: track.solo ? 1 : 0.4, p: 0.25 }}
                  >
                    <Typography variant="caption" sx={{ fontSize: 10, fontWeight: "bold" }}>S</Typography>
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onTrackArmToggle?.(track.id)}
                    sx={{ color: track.armed ? "#ef4444" : textColor, opacity: track.armed ? 1 : 0.4, p: 0.25 }}
                  >
                    <FiberSmartRecordIcon sx={{ fontSize: 12 }} />
                  </IconButton>
                </Box>
              </Box>
              <Slider
                value={track.volume}
                onChange={(_, v) => onTrackVolumeChange?.(track.id, v as number)}
                size="small"
                sx={{ color: track.color, height: 4, py: 0 }}
              />
            </Box>
          ))}
        </Box>
      </Paper>

      {/* ================================================================= */}
      {/* BOTTOM: Mixer */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          bgcolor: panelBg,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          zIndex: 1000,
        }}
      >
        {/* Track Channels */}
        <Box sx={{ flex: 1, display: "flex", overflow: "auto" }}>
          {displayTracks.map((track) => (
            <Box
              key={track.id}
              sx={{
                width: 80,
                borderRight: "1px solid rgba(255,255,255,0.05)",
                p: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" sx={{ color: textColor, opacity: 0.6, mb: 1 }}>
                {track.name}
              </Typography>
              <Box sx={{ height: 60, display: "flex", alignItems: "flex-end" }}>
                <Slider
                  orientation="vertical"
                  value={track.volume}
                  onChange={(_, v) => onTrackVolumeChange?.(track.id, v as number)}
                  sx={{
                    color: track.muted ? "#6b7280" : track.color,
                    height: "100%",
                    "& .MuiSlider-thumb": { width: 12, height: 6, borderRadius: 1 },
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: textColor, opacity: 0.4, mt: 0.5 }}>
                {track.volume}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Master Channel */}
        <Box
          sx={{
            width: 100,
            borderLeft: "2px solid rgba(255,255,255,0.2)",
            p: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography variant="caption" sx={{ color: textColor, fontWeight: 600, mb: 1 }}>
            MASTER
          </Typography>
          <Box sx={{ height: 60, display: "flex", alignItems: "flex-end" }}>
            <Slider
              orientation="vertical"
              value={masterVolume}
              onChange={(_, v) => onMasterVolumeChange?.(v as number)}
              sx={{
                color: accentColor,
                height: "100%",
                "& .MuiSlider-thumb": { width: 16, height: 8, borderRadius: 1 },
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: accentColor, mt: 0.5 }}>
            {masterVolume}
          </Typography>
        </Box>
      </Paper>

      {/* ================================================================= */}
      {/* TOP RIGHT: Time Display */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 12,
          right: 16,
          zIndex: 1001,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: textColor,
            fontFamily: "monospace",
            bgcolor: "rgba(0,0,0,0.5)",
            px: 2,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          {currentTime}
        </Typography>
      </Box>

      {/* ================================================================= */}
      {/* MAIN CONTENT - Timeline */}
      {/* ================================================================= */}
      {children ?? (
        <Box
          sx={{
            position: "absolute",
            top: 56,
            left: 200,
            right: 0,
            bottom: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: textColor, opacity: 0.1 }}>
            Timeline / Arrangement View
          </Typography>
        </Box>
      )}
    </Box>
  );
}
