"use client";
/**
 * HUD Template: Presentation
 *
 * Clean, minimal layout for slideshows and demos:
 * - Session timer with play/pause/reset
 * - Slide counter
 * - Navigation arrows (keyboard: ← → Space)
 * - Fullscreen toggle (F key)
 * - Auto-hide controls
 * - Progress bar
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for projector-friendly presentations.
 */

import React, { useState, useEffect, useCallback, type ReactNode } from "react";
import { Box, Typography, IconButton, LinearProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// =============================================================================
// Types
// =============================================================================

export interface HudPresentationProps {
  children?: ReactNode;
  currentSlide?: number;
  totalSlides?: number;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  autoHideDelay?: number;
}

// =============================================================================
// Utility: Format time
// =============================================================================

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// =============================================================================
// Template Component
// =============================================================================

export function HudPresentation({
  children,
  currentSlide = 1,
  totalSlides = 1,
  onNextSlide,
  onPrevSlide,
  autoHideDelay = 3000,
}: HudPresentationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Timer logic
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setElapsedTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Auto-hide controls
  useEffect(() => {
    const checkHide = () => {
      if (Date.now() - lastActivity > autoHideDelay) {
        setShowControls(false);
      }
    };
    const interval = setInterval(checkHide, 500);
    return () => clearInterval(interval);
  }, [lastActivity, autoHideDelay]);

  const handleActivity = useCallback(() => {
    setLastActivity(Date.now());
    setShowControls(true);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleActivity();
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          onNextSlide?.();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onPrevSlide?.();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNextSlide, onPrevSlide, handleActivity]);

  // Fullscreen toggle
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const progress = totalSlides > 0 ? (currentSlide / totalSlides) * 100 : 0;
  const bgColor = "#000000";
  const textColor = "#ffffff";

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
      {/* TOP BAR - Timer and Slide Counter */}
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
          background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      >
        {/* Timer controls */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={() => setIsPlaying(!isPlaying)}
            sx={{ color: textColor }}
            size="small"
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <Typography variant="h6" sx={{ color: textColor, fontFamily: "monospace", minWidth: 60 }}>
            {formatTime(elapsedTime)}
          </Typography>
          <IconButton
            onClick={() => setElapsedTime(0)}
            sx={{ color: textColor, opacity: 0.6 }}
            size="small"
          >
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Slide counter */}
        <Typography variant="h6" sx={{ color: textColor }}>
          {currentSlide} / {totalSlides}
        </Typography>

        {/* Fullscreen toggle */}
        <IconButton onClick={toggleFullscreen} sx={{ color: textColor }}>
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Box>

      {/* ================================================================= */}
      {/* NAVIGATION ARROWS */}
      {/* ================================================================= */}
      <IconButton
        onClick={onPrevSlide}
        disabled={currentSlide <= 1}
        sx={{
          position: "fixed",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          color: textColor,
          opacity: showControls ? 0.6 : 0,
          transition: "opacity 0.3s ease",
          "&:hover": { opacity: 1 },
          "&:disabled": { opacity: 0.2 },
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: 48 }} />
      </IconButton>

      <IconButton
        onClick={onNextSlide}
        disabled={currentSlide >= totalSlides}
        sx={{
          position: "fixed",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          color: textColor,
          opacity: showControls ? 0.6 : 0,
          transition: "opacity 0.3s ease",
          "&:hover": { opacity: 1 },
          "&:disabled": { opacity: 0.2 },
        }}
      >
        <ChevronRightIcon sx={{ fontSize: 48 }} />
      </IconButton>

      {/* ================================================================= */}
      {/* PROGRESS BAR */}
      {/* ================================================================= */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          bgcolor: "rgba(255,255,255,0.1)",
          "& .MuiLinearProgress-bar": {
            bgcolor: "primary.main",
          },
          opacity: showControls ? 1 : 0.3,
          transition: "opacity 0.3s ease",
        }}
      />

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
          }}
        >
          <Typography variant="h2" sx={{ color: textColor, opacity: 0.2 }}>
            Slide {currentSlide}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
