"use client";
/**
 * HUD Template: Media Player
 *
 * Video/audio player layout with timeline controls:
 * - Timeline scrubber with progress
 * - Playback controls (play/pause, skip, volume)
 * - Chapter markers
 * - Captions toggle
 * - Fullscreen toggle
 * - Time display
 * - Auto-hide controls
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for video players and media streaming apps.
 */

import React, { useState, useEffect, useCallback, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Slider,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import ClosedCaptionDisabledIcon from "@mui/icons-material/ClosedCaptionDisabled";
import SettingsIcon from "@mui/icons-material/Settings";
import ListIcon from "@mui/icons-material/List";
import CloseIcon from "@mui/icons-material/Close";

// =============================================================================
// Types
// =============================================================================

export interface Chapter {
  id: string;
  title: string;
  startTime: number; // seconds
}

export interface HudMediaPlayerProps {
  children?: ReactNode;
  currentTime?: number;
  duration?: number;
  bufferedTime?: number;
  isPlaying?: boolean;
  volume?: number;
  isMuted?: boolean;
  chapters?: Chapter[];
  showCaptions?: boolean;
  autoHideDelay?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  onMuteToggle?: () => void;
  onSkipPrevious?: () => void;
  onSkipNext?: () => void;
  onChapterSelect?: (chapter: Chapter) => void;
  onCaptionsToggle?: () => void;
}

// =============================================================================
// Utility
// =============================================================================

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// =============================================================================
// Template Component
// =============================================================================

export function HudMediaPlayer({
  children,
  currentTime = 0,
  duration = 100,
  bufferedTime = 0,
  isPlaying = false,
  volume = 1,
  isMuted = false,
  chapters = [],
  showCaptions = false,
  autoHideDelay = 3000,
  onPlay,
  onPause,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onSkipPrevious,
  onSkipNext,
  onChapterSelect,
  onCaptionsToggle,
}: HudMediaPlayerProps) {
  const [showControls, setShowControls] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showChapters, setShowChapters] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);

  // Auto-hide controls
  useEffect(() => {
    if (!isPlaying) return;
    const checkHide = () => {
      if (Date.now() - lastActivity > autoHideDelay) {
        setShowControls(false);
      }
    };
    const interval = setInterval(checkHide, 500);
    return () => clearInterval(interval);
  }, [lastActivity, autoHideDelay, isPlaying]);

  const handleActivity = useCallback(() => {
    setLastActivity(Date.now());
    setShowControls(true);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleActivity();
      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          isPlaying ? onPause?.() : onPlay?.();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onSeek?.(Math.max(0, currentTime - 10));
          break;
        case "ArrowRight":
          e.preventDefault();
          onSeek?.(Math.min(duration, currentTime + 10));
          break;
        case "ArrowUp":
          e.preventDefault();
          onVolumeChange?.(Math.min(1, volume + 0.1));
          break;
        case "ArrowDown":
          e.preventDefault();
          onVolumeChange?.(Math.max(0, volume - 0.1));
          break;
        case "m":
          e.preventDefault();
          onMuteToggle?.();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "c":
          e.preventDefault();
          onCaptionsToggle?.();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, currentTime, duration, volume, handleActivity, onPlay, onPause, onSeek, onVolumeChange, onMuteToggle, onCaptionsToggle]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedProgress = duration > 0 ? (bufferedTime / duration) * 100 : 0;

  const bgColor = "#000000";
  const textColor = "#ffffff";

  // Find current chapter
  const currentChapter = chapters
    .filter((c) => c.startTime <= currentTime)
    .sort((a, b) => b.startTime - a.startTime)[0];

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: bgColor,
        position: "relative",
        overflow: "hidden",
        cursor: showControls ? "default" : "none",
      }}
      onMouseMove={handleActivity}
      onClick={handleActivity}
    >
      {/* ================================================================= */}
      {/* VIDEO CONTENT */}
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
          }}
        >
          <Typography variant="h2" sx={{ color: textColor, opacity: 0.1 }}>
            Video Content
          </Typography>
        </Box>
      )}

      {/* ================================================================= */}
      {/* TOP GRADIENT */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />

      {/* ================================================================= */}
      {/* TOP BAR - Title and Settings */}
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
          zIndex: 1000,
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Title / Chapter */}
        <Box>
          {currentChapter && (
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.7 }}>
              {currentChapter.title}
            </Typography>
          )}
        </Box>

        {/* Settings */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={() => setShowChapters(!showChapters)}
            sx={{ color: textColor, opacity: chapters.length > 0 ? 1 : 0.3 }}
            disabled={chapters.length === 0}
          >
            <ListIcon />
          </IconButton>
          <IconButton
            onClick={(e) => setSettingsAnchor(e.currentTarget)}
            sx={{ color: textColor }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ================================================================= */}
      {/* CENTER PLAY BUTTON (when paused) */}
      {/* ================================================================= */}
      {!isPlaying && showControls && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999,
          }}
        >
          <IconButton
            onClick={onPlay}
            sx={{
              color: textColor,
              bgcolor: "rgba(0,0,0,0.5)",
              width: 80,
              height: 80,
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
          >
            <PlayArrowIcon sx={{ fontSize: 48 }} />
          </IconButton>
        </Box>
      )}

      {/* ================================================================= */}
      {/* BOTTOM GRADIENT */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />

      {/* ================================================================= */}
      {/* BOTTOM CONTROLS */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          px: 3,
          pb: 2,
          zIndex: 1000,
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Timeline */}
        <Box sx={{ position: "relative", mb: 1, mx: 1 }}>
          {/* Buffered progress */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              height: 4,
              bgcolor: "rgba(255,255,255,0.2)",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                width: `${bufferedProgress}%`,
                height: "100%",
                bgcolor: "rgba(255,255,255,0.3)",
                borderRadius: 2,
              }}
            />
          </Box>

          {/* Chapter markers */}
          {chapters.map((chapter) => (
            <Box
              key={chapter.id}
              sx={{
                position: "absolute",
                left: `${(chapter.startTime / duration) * 100}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 4,
                height: 12,
                bgcolor: "rgba(255,255,255,0.8)",
                borderRadius: 1,
                zIndex: 1,
              }}
            />
          ))}

          {/* Slider */}
          <Slider
            value={currentTime}
            min={0}
            max={duration}
            onChange={(_, value) => onSeek?.(value as number)}
            sx={{
              color: "primary.main",
              height: 4,
              padding: "12px 0",
              "& .MuiSlider-thumb": {
                width: 14,
                height: 14,
                transition: "0.2s",
                "&:hover, &.Mui-focusVisible": { boxShadow: "0 0 0 8px rgba(255,255,255,0.16)" },
              },
              "& .MuiSlider-rail": { opacity: 0 },
            }}
          />
        </Box>

        {/* Controls row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left - Play controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton onClick={onSkipPrevious} sx={{ color: textColor }}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton onClick={() => onSeek?.(Math.max(0, currentTime - 10))} sx={{ color: textColor }}>
              <Replay10Icon />
            </IconButton>
            <IconButton
              onClick={isPlaying ? onPause : onPlay}
              sx={{ color: textColor, mx: 1 }}
            >
              {isPlaying ? <PauseIcon sx={{ fontSize: 36 }} /> : <PlayArrowIcon sx={{ fontSize: 36 }} />}
            </IconButton>
            <IconButton onClick={() => onSeek?.(Math.min(duration, currentTime + 10))} sx={{ color: textColor }}>
              <Forward10Icon />
            </IconButton>
            <IconButton onClick={onSkipNext} sx={{ color: textColor }}>
              <SkipNextIcon />
            </IconButton>

            {/* Volume */}
            <Box
              sx={{ display: "flex", alignItems: "center", ml: 2 }}
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <IconButton onClick={onMuteToggle} sx={{ color: textColor }}>
                {isMuted || volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
              <Box
                sx={{
                  width: showVolumeSlider ? 80 : 0,
                  overflow: "hidden",
                  transition: "width 0.2s ease",
                }}
              >
                <Slider
                  value={isMuted ? 0 : volume}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(_, value) => onVolumeChange?.(value as number)}
                  sx={{
                    color: textColor,
                    width: 70,
                    ml: 1,
                    "& .MuiSlider-thumb": { width: 12, height: 12 },
                  }}
                />
              </Box>
            </Box>

            {/* Time */}
            <Typography variant="body2" sx={{ color: textColor, ml: 2, fontFamily: "monospace" }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          </Box>

          {/* Right - Captions, Fullscreen */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton onClick={onCaptionsToggle} sx={{ color: showCaptions ? "primary.main" : textColor }}>
              {showCaptions ? <ClosedCaptionIcon /> : <ClosedCaptionDisabledIcon />}
            </IconButton>
            <IconButton onClick={toggleFullscreen} sx={{ color: textColor }}>
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ================================================================= */}
      {/* CHAPTERS PANEL */}
      {/* ================================================================= */}
      {showChapters && (
        <Paper
          sx={{
            position: "fixed",
            top: 80,
            right: 24,
            width: 280,
            maxHeight: "calc(100vh - 200px)",
            bgcolor: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            overflow: "hidden",
            zIndex: 1001,
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ color: textColor }}>
              Chapters
            </Typography>
            <IconButton size="small" onClick={() => setShowChapters(false)} sx={{ color: textColor }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <List sx={{ py: 0, maxHeight: 400, overflow: "auto" }}>
            {chapters.map((chapter) => (
              <ListItem key={chapter.id} disablePadding>
                <ListItemButton
                  selected={currentChapter?.id === chapter.id}
                  onClick={() => {
                    onChapterSelect?.(chapter);
                    onSeek?.(chapter.startTime);
                  }}
                  sx={{
                    "&.Mui-selected": { bgcolor: "rgba(255,255,255,0.1)" },
                    "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  <ListItemText
                    primary={chapter.title}
                    secondary={formatTime(chapter.startTime)}
                    sx={{
                      "& .MuiTypography-root": { color: textColor },
                      "& .MuiTypography-body2": { opacity: 0.5 },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* SETTINGS MENU */}
      {/* ================================================================= */}
      <Menu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={() => setSettingsAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "rgba(0,0,0,0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              "& .MuiMenuItem-root": { color: textColor },
            },
          },
        }}
      >
        <MenuItem onClick={() => setSettingsAnchor(null)}>Quality: Auto (1080p)</MenuItem>
        <MenuItem onClick={() => setSettingsAnchor(null)}>Playback Speed: 1x</MenuItem>
        <MenuItem onClick={() => setSettingsAnchor(null)}>Audio Track: English</MenuItem>
      </Menu>
    </Box>
  );
}
