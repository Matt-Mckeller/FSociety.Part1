"use client";
/**
 * HUD Template: Learning Focus
 *
 * Study session layout with goals, progress, and focus features:
 * - Subject display with streak badge
 * - Level and XP progress bar
 * - Session timer (auto-starts)
 * - Goals panel with completion tracking
 * - Focus mode (hide HUD for concentration)
 * - AI help orb
 * - Hint button
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for educational apps with gamification elements.
 */

import React, { useState, useEffect, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  LinearProgress,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Chip,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { ActionOrb } from "../../../hud-components/orbs";

// =============================================================================
// Types
// =============================================================================

export interface LearningGoal {
  id: string;
  label: string;
  completed: boolean;
}

export interface HudLearningFocusProps {
  children?: ReactNode;
  subject?: string;
  xp?: number;
  xpMax?: number;
  level?: number;
  goals?: LearningGoal[];
  streakDays?: number;
  onGoalToggle?: (goalId: string) => void;
  onAiHelp?: () => void;
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

export function HudLearningFocus({
  children,
  subject = "Learning Session",
  xp = 0,
  xpMax = 100,
  level = 1,
  goals = [],
  streakDays = 0,
  onGoalToggle,
  onAiHelp,
}: HudLearningFocusProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [focusMode, setFocusMode] = useState(false);

  // Timer logic
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setElapsedTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const xpProgress = xpMax > 0 ? (xp / xpMax) * 100 : 0;
  const completedGoals = goals.filter((g) => g.completed).length;

  const bgColor = "#0a0a12";
  const textColor = "#ffffff";
  const accentColor = "#6366f1";

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
      {/* TOP BAR - Subject, Level, XP */}
      {/* ================================================================= */}
      {!focusMode && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            zIndex: 1000,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)",
          }}
        >
          {/* Subject and streak */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ color: textColor }}>
              {subject}
            </Typography>
            {streakDays > 0 && (
              <Chip
                icon={<LocalFireDepartmentIcon sx={{ color: "#ff6b35 !important" }} />}
                label={`${streakDays} day streak`}
                size="small"
                sx={{
                  bgcolor: "rgba(255, 107, 53, 0.2)",
                  color: "#ff6b35",
                  border: "1px solid rgba(255, 107, 53, 0.3)",
                }}
              />
            )}
          </Box>

          {/* Level and XP */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.7 }}>
              Level {level}
            </Typography>
            <Box sx={{ width: 120 }}>
              <LinearProgress
                variant="determinate"
                value={xpProgress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "rgba(255,255,255,0.1)",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: accentColor,
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
            <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
              {xp}/{xpMax} XP
            </Typography>
          </Box>
        </Box>
      )}

      {/* ================================================================= */}
      {/* LEFT PANEL - Session Timer */}
      {/* ================================================================= */}
      {!focusMode && (
        <Paper
          sx={{
            position: "fixed",
            top: 100,
            left: 24,
            width: 200,
            p: 2,
            bgcolor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            zIndex: 1000,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: textColor, opacity: 0.5, textTransform: "uppercase" }}
          >
            Session Time
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <IconButton
              onClick={() => setIsPlaying(!isPlaying)}
              size="small"
              sx={{ color: textColor }}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <Typography variant="h4" sx={{ color: textColor, fontFamily: "monospace" }}>
              {formatTime(elapsedTime)}
            </Typography>
          </Box>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* RIGHT PANEL - Goals */}
      {/* ================================================================= */}
      {!focusMode && goals.length > 0 && (
        <Paper
          sx={{
            position: "fixed",
            top: 100,
            right: 24,
            width: 280,
            p: 2,
            bgcolor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            zIndex: 1000,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography
              variant="caption"
              sx={{ color: textColor, opacity: 0.5, textTransform: "uppercase" }}
            >
              Session Goals
            </Typography>
            <Typography variant="caption" sx={{ color: accentColor }}>
              {completedGoals}/{goals.length}
            </Typography>
          </Box>
          <List dense sx={{ py: 0 }}>
            {goals.map((goal) => (
              <ListItem key={goal.id} disablePadding sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Checkbox
                    checked={goal.completed}
                    onChange={() => onGoalToggle?.(goal.id)}
                    size="small"
                    sx={{
                      color: "rgba(255,255,255,0.3)",
                      "&.Mui-checked": { color: accentColor },
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={goal.label}
                  sx={{
                    "& .MuiTypography-root": {
                      color: textColor,
                      opacity: goal.completed ? 0.5 : 1,
                      textDecoration: goal.completed ? "line-through" : "none",
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
      {/* FOCUS MODE TOGGLE */}
      {/* ================================================================= */}
      <Box sx={{ position: "fixed", top: 24, right: 24, zIndex: 1001 }}>
        <IconButton
          onClick={() => setFocusMode(!focusMode)}
          sx={{
            color: textColor,
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
          }}
        >
          {focusMode ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </Box>

      {/* ================================================================= */}
      {/* AI HELP ORB */}
      {/* ================================================================= */}
      {!focusMode && (
        <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
          <ActionOrb
            icon={<AutoAwesomeIcon sx={{ fontSize: 28 }} />}
            label="AI Help"
            size="lg"
            variant="glow"
            color="ai"
            colorMode="dark"
            onClick={onAiHelp}
          />
        </Box>
      )}

      {/* ================================================================= */}
      {/* HINT BUTTON */}
      {/* ================================================================= */}
      {!focusMode && (
        <Box sx={{ position: "fixed", bottom: 24, right: 100, zIndex: 1000 }}>
          <ActionOrb
            icon={<HelpOutlineIcon sx={{ fontSize: 24 }} />}
            label="Hint"
            size="md"
            variant="glass"
            color="cyan"
            colorMode="dark"
          />
        </Box>
      )}

      {/* ================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ================================================================= */}
      {children ?? (
        <Box
          sx={{
            position: "absolute",
            top: focusMode ? "50%" : "calc(50% + 32px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            maxWidth: 600,
            px: 4,
          }}
        >
          <Typography variant="h3" sx={{ color: textColor, opacity: 0.2, mb: 2 }}>
            Learning Content
          </Typography>
          <Typography variant="body1" sx={{ color: textColor, opacity: 0.4 }}>
            {focusMode ? "Focus mode active - distractions hidden" : "Your lesson content goes here"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
