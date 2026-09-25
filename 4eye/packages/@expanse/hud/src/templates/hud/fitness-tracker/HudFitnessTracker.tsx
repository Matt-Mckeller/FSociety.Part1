"use client";
/**
 * HUD Template: Fitness Tracker
 *
 * Workout/fitness application layout:
 * - Heart rate monitor
 * - Timer/stopwatch
 * - Exercise list
 * - Rest countdown
 * - Stats display
 * - Progress ring
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for fitness apps, workout trackers, and health monitoring.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Chip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TimerIcon from "@mui/icons-material/Timer";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { ActionOrb } from "../../../hud-components/orbs";

// =============================================================================
// Types
// =============================================================================

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  duration?: number; // seconds
  completed: boolean;
  current?: boolean;
}

export interface WorkoutStats {
  duration: number; // seconds
  calories: number;
  heartRate: number;
  avgHeartRate: number;
  maxHeartRate: number;
}

export interface HudFitnessTrackerProps {
  children?: ReactNode;
  workoutName?: string;
  exercises?: Exercise[];
  currentExerciseIndex?: number;
  stats?: WorkoutStats;
  isActive?: boolean;
  isPaused?: boolean;
  isResting?: boolean;
  restTimeRemaining?: number;
  timerSeconds?: number;
  targetHeartRateZone?: [number, number];
  onStart?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  onSkipExercise?: () => void;
  onSkipRest?: () => void;
  onExerciseComplete?: (exerciseId: string) => void;
}

// =============================================================================
// Utility
// =============================================================================

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function getHeartRateZone(hr: number): { zone: string; color: string } {
  if (hr < 100) return { zone: "Rest", color: "#6b7280" };
  if (hr < 120) return { zone: "Warm Up", color: "#3b82f6" };
  if (hr < 140) return { zone: "Fat Burn", color: "#22c55e" };
  if (hr < 160) return { zone: "Cardio", color: "#f59e0b" };
  if (hr < 180) return { zone: "Peak", color: "#ef4444" };
  return { zone: "Max", color: "#dc2626" };
}

// =============================================================================
// Template Component
// =============================================================================

export function HudFitnessTracker({
  children,
  workoutName = "Full Body Workout",
  exercises = [],
  currentExerciseIndex = 0,
  stats,
  isActive = false,
  isPaused = false,
  isResting = false,
  restTimeRemaining = 0,
  timerSeconds = 0,
  targetHeartRateZone = [120, 150],
  onStart,
  onPause,
  onResume,
  onStop,
  onSkipExercise,
  onSkipRest,
  onExerciseComplete,
}: HudFitnessTrackerProps) {
  const bgColor = "#0f0f14";
  const panelBg = "rgba(255,255,255,0.05)";
  const textColor = "#ffffff";

  // Default stats
  const displayStats: WorkoutStats = stats || {
    duration: timerSeconds,
    calories: Math.floor(timerSeconds * 0.15),
    heartRate: 135,
    avgHeartRate: 128,
    maxHeartRate: 165,
  };

  // Default exercises
  const displayExercises: Exercise[] = exercises.length > 0 ? exercises : [
    { id: "1", name: "Jumping Jacks", duration: 60, completed: true, current: false },
    { id: "2", name: "Push-ups", sets: 3, reps: 15, completed: false, current: true },
    { id: "3", name: "Squats", sets: 3, reps: 20, completed: false, current: false },
    { id: "4", name: "Plank", duration: 45, completed: false, current: false },
    { id: "5", name: "Burpees", sets: 3, reps: 10, completed: false, current: false },
    { id: "6", name: "Mountain Climbers", duration: 45, completed: false, current: false },
  ];

  const currentExercise = displayExercises[currentExerciseIndex];
  const completedCount = displayExercises.filter((e) => e.completed).length;
  const progress = (completedCount / displayExercises.length) * 100;
  const hrZone = getHeartRateZone(displayStats.heartRate);

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
      {/* TOP: Workout Info */}
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
        <Box>
          <Typography variant="h6" sx={{ color: textColor }}>
            {workoutName}
          </Typography>
          <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
            {completedCount} of {displayExercises.length} exercises
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Timer */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ color: textColor, fontFamily: "monospace" }}>
              {formatTime(displayStats.duration)}
            </Typography>
          </Box>

          {/* Controls */}
          {!isActive ? (
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={onStart}
              sx={{ bgcolor: "#22c55e", "&:hover": { bgcolor: "#16a34a" } }}
            >
              Start
            </Button>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                onClick={isPaused ? onResume : onPause}
                sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}
              >
                {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
              </IconButton>
              <IconButton
                onClick={onStop}
                sx={{ color: "white", bgcolor: "rgba(239, 68, 68, 0.2)" }}
              >
                <StopIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      {/* ================================================================= */}
      {/* CENTER: Heart Rate & Current Exercise */}
      {/* ================================================================= */}
      {isResting ? (
        // Rest Screen
        (<Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: textColor, opacity: 0.5, mb: 2 }}>
            REST
          </Typography>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={(restTimeRemaining / 60) * 100}
              size={200}
              thickness={4}
              sx={{ color: "#3b82f6" }}
            />
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
              <Typography variant="h2" sx={{ color: textColor, fontFamily: "monospace" }}>
                {restTimeRemaining}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button onClick={onSkipRest} sx={{ color: textColor }}>
              Skip Rest
            </Button>
          </Box>
        </Box>)
      ) : (
        // Active Exercise Display
        (currentExercise && (<Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography variant="h3" sx={{ color: textColor, mb: 2 }}>
            {currentExercise.name}
          </Typography>
          {currentExercise.sets && currentExercise.reps && (
            <Typography variant="h5" sx={{ color: textColor, opacity: 0.6 }}>
              {currentExercise.sets} × {currentExercise.reps} reps
            </Typography>
          )}
          {currentExercise.duration && (
            <Typography variant="h5" sx={{ color: textColor, opacity: 0.6 }}>
              {currentExercise.duration} seconds
            </Typography>
          )}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={() => onExerciseComplete?.(currentExercise.id)}
              sx={{ bgcolor: "#22c55e", px: 4 }}
            >
              Complete
            </Button>
            <Button onClick={onSkipExercise} sx={{ color: textColor, ml: 2 }}>
              Skip
            </Button>
          </Box>
        </Box>))
      )}
      {/* ================================================================= */}
      {/* LEFT: Exercise List */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          top: 80,
          left: 16,
          bottom: 16,
          width: 280,
          bgcolor: panelBg,
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          zIndex: 999,
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Typography variant="subtitle2" sx={{ color: textColor }}>
            Exercises
          </Typography>
        </Box>
        <List sx={{ flex: 1, overflow: "auto", py: 0 }}>
          {displayExercises.map((exercise, idx) => (
            <ListItem
              key={exercise.id}
              sx={{
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                bgcolor: idx === currentExerciseIndex ? "rgba(59, 130, 246, 0.1)" : "transparent",
                opacity: exercise.completed ? 0.5 : 1,
              }}
            >
              {exercise.completed ? (
                <CheckCircleIcon sx={{ color: "#22c55e", mr: 2 }} />
              ) : (
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)",
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ color: textColor }}>
                    {idx + 1}
                  </Typography>
                </Box>
              )}
              <ListItemText
                primary={exercise.name}
                secondary={
                  exercise.sets
                    ? `${exercise.sets} × ${exercise.reps}`
                    : `${exercise.duration}s`
                }
                sx={{
                  "& .MuiTypography-root": { color: textColor },
                  "& .MuiTypography-body2": { opacity: 0.5 },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      {/* ================================================================= */}
      {/* RIGHT: Stats Panel */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          top: 80,
          right: 16,
          width: 200,
          bgcolor: panelBg,
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 2,
          p: 2,
          zIndex: 999,
        }}
      >
        {/* Heart Rate */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <FavoriteIcon sx={{ color: hrZone.color, fontSize: 40, mb: 1 }} />
          <Typography variant="h3" sx={{ color: textColor, fontFamily: "monospace" }}>
            {displayStats.heartRate}
          </Typography>
          <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
            BPM
          </Typography>
          <Chip
            label={hrZone.zone}
            size="small"
            sx={{ mt: 1, bgcolor: hrZone.color, color: "white" }}
          />
        </Box>

        {/* Other Stats */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LocalFireDepartmentIcon sx={{ color: "#f59e0b" }} />
            <Box>
              <Typography variant="h6" sx={{ color: textColor }}>
                {displayStats.calories}
              </Typography>
              <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
                Calories
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <WhatshotIcon sx={{ color: "#ef4444" }} />
            <Box>
              <Typography variant="h6" sx={{ color: textColor }}>
                {displayStats.maxHeartRate}
              </Typography>
              <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
                Max HR
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FavoriteIcon sx={{ color: "#ec4899" }} />
            <Box>
              <Typography variant="h6" sx={{ color: textColor }}>
                {displayStats.avgHeartRate}
              </Typography>
              <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
                Avg HR
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
      {/* ================================================================= */}
      {/* BOTTOM: Progress Bar */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          bgcolor: "rgba(255,255,255,0.1)",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${progress}%`,
            bgcolor: "#22c55e",
            transition: "width 0.3s ease",
          }}
        />
      </Box>
      {/* ================================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================================= */}
      {children}
    </Box>
  );
}
