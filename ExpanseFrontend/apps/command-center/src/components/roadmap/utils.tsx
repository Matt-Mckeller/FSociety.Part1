/**
 * Roadmap View Utility Functions
 *
 * Helper functions for date calculations, styling, and data transformations
 */
import { Box } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import TimelineIcon from "@mui/icons-material/Timeline"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import type { RoadmapMilestoneStatus, Synergy } from "../../types"
import { ZoomLevel } from "./constants"

// ==================================================
// DATA ACCESS
// ==================================================

import { projectsData } from "../../contexts/ProjectsContext"

interface Project {
  id: string
  name: string
  color: string
  category: "business" | "personal"
}

const projects = projectsData.projects as Project[]

// ==================================================
// PROJECT HELPERS
// ==================================================

export const getProjectColor = (projectId?: string): string => {
  if (!projectId) return "#64748B"
  const project = projects.find((p) => p.id === projectId)
  return project?.color || "#64748B"
}

export const getProjectName = (projectId?: string): string => {
  if (!projectId) return ""
  const project = projects.find((p) => p.id === projectId)
  return project?.name || projectId
}

// ==================================================
// STATUS HELPERS
// ==================================================

export const getStatusColor = (status?: RoadmapMilestoneStatus): string => {
  switch (status) {
    case "completed":
      return "#10B981"
    case "on-track":
      return "#3B82F6"
    case "planned":
      return "#8B5CF6"
    case "needs-replanning":
      return "#F59E0B"
    case "missed":
      return "#EF4444"
    default:
      return "#64748B"
  }
}

export const getStatusLabel = (status?: RoadmapMilestoneStatus): string => {
  switch (status) {
    case "completed":
      return "✓ Completed"
    case "on-track":
      return "→ On Track"
    case "planned":
      return "○ Planned"
    case "needs-replanning":
      return "⚠ Needs Replanning"
    case "missed":
      return "✗ Missed"
    default:
      return "○ Planned"
  }
}

export const getFeatureStatusIcon = (status: RoadmapMilestoneStatus) => {
  switch (status) {
    case "completed":
      return <CheckCircleIcon sx={{ fontSize: 16, color: "#10B981" }} />
    case "in-progress":
      return <TimelineIcon sx={{ fontSize: 16, color: "#3B82F6" }} />
    case "planned":
      return (
        <Box
          sx={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            border: "2px solid #8B5CF6",
          }}
        />
      )
    default:
      return (
        <Box
          sx={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            border: "2px solid #64748B",
          }}
        />
      )
  }
}

// ==================================================
// PRIORITY HELPERS
// ==================================================

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "mvp":
      return { bg: "#EF4444", text: "#fff" }
    case "post-mvp":
      return { bg: "#F59E0B", text: "#fff" }
    case "nice-to-have":
      return { bg: "#64748B", text: "#fff" }
    default:
      return { bg: "#64748B", text: "#fff" }
  }
}

// ==================================================
// STAGE HELPERS
// ==================================================

export const getStageInfo = (stage?: string) => {
  switch (stage) {
    case "planning":
      return { color: "#8B5CF6", label: "Planning", icon: "📋", progress: 0 }
    case "development":
      return {
        color: "#3B82F6",
        label: "Development",
        icon: "🔧",
        progress: 33,
      }
    case "testing":
      return { color: "#F59E0B", label: "Testing", icon: "🧪", progress: 66 }
    case "launched":
      return { color: "#10B981", label: "Launched", icon: "🚀", progress: 100 }
    default:
      return { color: "#64748B", label: "Unknown", icon: "❓", progress: 0 }
  }
}

// ==================================================
// EFFORT HELPERS
// ==================================================

export const getEffortDisplay = (effort?: string) => {
  switch (effort) {
    case "xs":
      return { label: "XS", bars: 1 }
    case "s":
      return { label: "S", bars: 2 }
    case "m":
      return { label: "M", bars: 3 }
    case "l":
      return { label: "L", bars: 4 }
    case "xl":
      return { label: "XL", bars: 5 }
    default:
      return { label: "?", bars: 0 }
  }
}

// ==================================================
// SYNERGY HELPERS
// ==================================================

export function SynergyArrow({
  direction,
}: {
  direction: Synergy["direction"]
}) {
  switch (direction) {
    case "provides-to":
      return <ArrowForwardIcon fontSize="small" />
    case "receives-from":
      return <ArrowBackIcon fontSize="small" />
    case "bidirectional":
      return <SwapHorizIcon fontSize="small" />
  }
}

// ==================================================
// TIMELINE CALCULATIONS
// ==================================================

/** Get cell width based on zoom level */
export const getCellWidth = (zoom: ZoomLevel): number => {
  switch (zoom) {
    case 1:
      return 600
    case 3:
      return 200
    case 6:
      return 120
    case 12:
      return 100
    default:
      return 100
  }
}

/** Generate months for timeline view */
export const generateMonths = (
  count: number,
  offsetFromNow: number = 0,
): { key: string; label: string; shortLabel: string; days: number }[] => {
  const months: {
    key: string
    label: string
    shortLabel: string
    days: number
  }[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() + offsetFromNow + i,
      1,
    )
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
    const shortLabel = date.toLocaleDateString("en-US", { month: "short" })
    const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    months.push({ key, label, shortLabel, days })
  }

  return months
}

/** Find the index of a month in the months array */
export const getMonthIndex = (
  monthKey: string,
  months: { key: string }[],
): number => {
  return months.findIndex((m) => m.key === monthKey)
}

/** Calculate the pixel position for a date in the timeline */
export const getDatePosition = (
  dateStr: string,
  months: { key: string; days: number }[],
  cellWidth: number,
): number | null => {
  const date = new Date(dateStr)
  const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
  const monthIdx = getMonthIndex(monthKey, months)

  if (monthIdx === -1 || monthIdx >= months.length) return null

  const dayOfMonth = date.getDate()
  const daysInMonth = months[monthIdx]?.days || 30
  const dayOffset = (dayOfMonth / daysInMonth) * cellWidth

  return monthIdx * cellWidth + dayOffset
}

/** Generate days for sprint view */
export const generateDays = (
  weeksAhead: number = 3,
): {
  date: Date
  key: string
  label: string
  dayOfWeek: string
  isToday: boolean
  isWeekend: boolean
}[] => {
  const days: {
    date: Date
    key: string
    label: string
    dayOfWeek: string
    isToday: boolean
    isWeekend: boolean
  }[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < weeksAhead * 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const key = date.toISOString().split("T")[0]
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" })
    const isToday = i === 0
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    days.push({ date, key, label, dayOfWeek, isToday, isWeekend })
  }

  return days
}
