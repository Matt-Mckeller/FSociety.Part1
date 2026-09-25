"use client";
/**
 * HUD Template: Work Dashboard
 *
 * Productivity-focused layout for work environments:
 * - Quick actions bar (top)
 * - Notifications panel
 * - Tasks/Todo widget
 * - Calendar mini-view
 * - Focus timer
 * - App launcher
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for productivity apps and admin dashboards.
 */

import React, { useState, useEffect, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Chip,
  LinearProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TimerIcon from "@mui/icons-material/Timer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FlagIcon from "@mui/icons-material/Flag";

import { ActionBar } from "../../../hud-components/action-bars";
import { ActionButton } from "../../../hud-components/action-button";
import { ActionDock } from "../../../hud/docks";
import { ActionOrb } from "../../../hud-components/orbs";

// =============================================================================
// Types
// =============================================================================

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  dueTime?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  color?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface HudWorkDashboardProps {
  children?: ReactNode;
  tasks?: Task[];
  events?: CalendarEvent[];
  notifications?: Notification[];
  focusDurationMinutes?: number;
  onTaskToggle?: (taskId: string) => void;
  onAddTask?: () => void;
  onNotificationClick?: (notificationId: string) => void;
}

// =============================================================================
// Utility
// =============================================================================

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// =============================================================================
// Template Component
// =============================================================================

export function HudWorkDashboard({
  children,
  tasks = [],
  events = [],
  notifications = [],
  focusDurationMinutes = 25,
  onTaskToggle,
  onAddTask,
  onNotificationClick,
}: HudWorkDashboardProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTasks, setShowTasks] = useState(true);
  const [showCalendar, setShowCalendar] = useState(true);

  // Focus timer state
  const [focusTimeLeft, setFocusTimeLeft] = useState(focusDurationMinutes * 60);
  const [isFocusRunning, setIsFocusRunning] = useState(false);

  useEffect(() => {
    if (!isFocusRunning || focusTimeLeft <= 0) return;
    const interval = setInterval(() => {
      setFocusTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFocusRunning, focusTimeLeft]);

  const resetFocus = () => {
    setFocusTimeLeft(focusDurationMinutes * 60);
    setIsFocusRunning(false);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const focusProgress = ((focusDurationMinutes * 60 - focusTimeLeft) / (focusDurationMinutes * 60)) * 100;

  const bgColor = "#0f0f14";
  const textColor = "#ffffff";
  const accentColor = "#3b82f6";

  const priorityColors = {
    low: "#22c55e",
    medium: "#f59e0b",
    high: "#ef4444",
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
      {/* TOP BAR - Quick Actions */}
      {/* ================================================================= */}
      <ActionDock position="top-center">
        <ActionBar variant="frosted" length={{ percent: 50 }}>
          <ActionButton icon={<SearchIcon />} label="Search (⌘K)" />
          <ActionButton
            icon={<NotificationsIcon />}
            label="Notifications"
            badge={unreadCount}
            onClick={() => setShowNotifications(!showNotifications)}
          />
          <ActionButton
            icon={<AssignmentIcon />}
            label="Tasks"
            active={showTasks}
            onClick={() => setShowTasks(!showTasks)}
          />
          <ActionButton
            icon={<CalendarTodayIcon />}
            label="Calendar"
            active={showCalendar}
            onClick={() => setShowCalendar(!showCalendar)}
          />
          <ActionButton icon={<AppsIcon />} label="Apps" />
        </ActionBar>
      </ActionDock>

      {/* ================================================================= */}
      {/* LEFT PANEL - Tasks */}
      {/* ================================================================= */}
      {showTasks && (
        <Paper
          sx={{
            position: "fixed",
            top: 80,
            left: 24,
            width: 280,
            maxHeight: "calc(100vh - 200px)",
            bgcolor: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AssignmentIcon sx={{ color: accentColor, fontSize: 20 }} />
              <Typography variant="subtitle2" sx={{ color: textColor }}>
                Tasks
              </Typography>
              <Chip
                label={`${completedTasks}/${tasks.length}`}
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.1)", color: textColor, height: 20 }}
              />
            </Box>
            <IconButton size="small" onClick={onAddTask} sx={{ color: accentColor }}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Task list */}
          <List sx={{ py: 0, maxHeight: 300, overflow: "auto" }}>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                dense
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  opacity: task.completed ? 0.5 : 1,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => onTaskToggle?.(task.id)}
                    size="small"
                    sx={{
                      color: "rgba(255,255,255,0.3)",
                      "&.Mui-checked": { color: "#22c55e" },
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={task.title}
                  secondary={task.dueTime}
                  sx={{
                    "& .MuiTypography-root": {
                      color: textColor,
                      textDecoration: task.completed ? "line-through" : "none",
                    },
                    "& .MuiTypography-body2": { opacity: 0.5, fontSize: "0.75rem" },
                  }}
                />
                {task.priority && (
                  <FlagIcon
                    sx={{ fontSize: 16, color: priorityColors[task.priority], opacity: 0.8 }}
                  />
                )}
              </ListItem>
            ))}
          </List>

          {/* Progress */}
          <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <LinearProgress
              variant="determinate"
              value={tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0}
              sx={{
                height: 4,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.1)",
                "& .MuiLinearProgress-bar": { bgcolor: "#22c55e" },
              }}
            />
          </Box>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* RIGHT PANEL - Calendar */}
      {/* ================================================================= */}
      {showCalendar && (
        <Paper
          sx={{
            position: "fixed",
            top: 80,
            right: 24,
            width: 260,
            bgcolor: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CalendarTodayIcon sx={{ color: accentColor, fontSize: 20 }} />
            <Typography variant="subtitle2" sx={{ color: textColor }}>
              Today
            </Typography>
          </Box>

          {/* Events */}
          <List sx={{ py: 1 }}>
            {events.map((event) => (
              <ListItem key={event.id} dense sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <ScheduleIcon sx={{ fontSize: 16, color: event.color || accentColor }} />
                </ListItemIcon>
                <ListItemText
                  primary={event.title}
                  secondary={event.time}
                  sx={{
                    "& .MuiTypography-root": { color: textColor, fontSize: "0.875rem" },
                    "& .MuiTypography-body2": { opacity: 0.5, fontSize: "0.75rem" },
                  }}
                />
              </ListItem>
            ))}
            {events.length === 0 && (
              <ListItem>
                <ListItemText
                  primary="No events today"
                  sx={{ "& .MuiTypography-root": { color: textColor, opacity: 0.4 } }}
                />
              </ListItem>
            )}
          </List>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* NOTIFICATIONS PANEL */}
      {/* ================================================================= */}
      {showNotifications && (
        <Paper
          sx={{
            position: "fixed",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 360,
            maxHeight: 400,
            bgcolor: "rgba(15, 15, 20, 0.98)",
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
            <Typography variant="subtitle1" sx={{ color: textColor }}>
              Notifications
            </Typography>
            <IconButton
              size="small"
              onClick={() => setShowNotifications(false)}
              sx={{ color: textColor }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <List sx={{ py: 0, maxHeight: 320, overflow: "auto" }}>
            {notifications.map((notif) => (
              <ListItemButton
                key={notif.id}
                onClick={() => onNotificationClick?.(notif.id)}
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  bgcolor: notif.read ? "transparent" : "rgba(59, 130, 246, 0.1)",
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {notif.read ? (
                    <CheckCircleIcon sx={{ color: "rgba(255,255,255,0.3)" }} />
                  ) : (
                    <Badge color="primary" variant="dot">
                      <NotificationsIcon sx={{ color: accentColor }} />
                    </Badge>
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={notif.title}
                  secondary={`${notif.message} • ${notif.time}`}
                  sx={{
                    "& .MuiTypography-root": { color: textColor },
                    "& .MuiTypography-body2": { opacity: 0.5, fontSize: "0.75rem" },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* BOTTOM - Focus Timer */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          bottom: 24,
          left: 24,
          width: 200,
          p: 2,
          bgcolor: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 2,
          zIndex: 999,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <TimerIcon sx={{ color: accentColor, fontSize: 18 }} />
          <Typography variant="caption" sx={{ color: textColor, opacity: 0.6 }}>
            Focus Timer
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ color: textColor, fontFamily: "monospace", mb: 1 }}>
          {formatTime(focusTimeLeft)}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={focusProgress}
          sx={{
            height: 4,
            borderRadius: 2,
            mb: 1.5,
            bgcolor: "rgba(255,255,255,0.1)",
            "& .MuiLinearProgress-bar": { bgcolor: accentColor },
          }}
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => setIsFocusRunning(!isFocusRunning)}
            sx={{ color: textColor, bgcolor: "rgba(255,255,255,0.1)" }}
          >
            {isFocusRunning ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
          </IconButton>
          <IconButton
            size="small"
            onClick={resetFocus}
            sx={{ color: textColor, bgcolor: "rgba(255,255,255,0.1)" }}
          >
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Box>
      </Paper>

      {/* ================================================================= */}
      {/* ADD TASK ORB */}
      {/* ================================================================= */}
      <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
        <ActionOrb
          icon={<AddIcon />}
          label="New Task"
          size="lg"
          variant="glow"
          color="primary"
          colorMode="dark"
          onClick={onAddTask}
        />
      </Box>

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
          <Typography variant="h4" sx={{ color: textColor, opacity: 0.2, mb: 2 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: textColor, opacity: 0.4 }}>
            {completedTasks}/{tasks.length} tasks completed | {events.length} events today
          </Typography>
        </Box>
      )}
    </Box>
  );
}
