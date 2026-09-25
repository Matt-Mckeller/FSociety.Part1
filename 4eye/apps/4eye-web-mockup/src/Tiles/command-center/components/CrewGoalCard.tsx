"use client";

/**
 * CrewGoalCard — dark game-card for a crew relationship or personal goal.
 *
 * Visual language mirrors the TaskCard family (dark bg + coloured glow border)
 * but is tuned for goals: no hearts/XP, instead a type badge, priority bar,
 * status chip, and a quick-toggle done button.
 *
 *   Relationship goals → cyan glow  (#22d3ee)
 *   Personal goals     → violet glow (#a78bfa)
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import type { EntityGoal, GoalPriority, GoalStatus, GoalType } from "../store/crew";
import { priorityById } from "../../character/model/priorities";
import { PriorityGlyph } from "../../character/components/PriorityGlyphs";
import { COLOR_MAP } from "@4eye/types";
/** @deprecated Use EntityGoal */
export type CrewGoal = EntityGoal;

// ─── Theme constants ──────────────────────────────────────────────────────────

const TYPE_THEME: Record<GoalType, { accent: string; Icon: React.ElementType; label: string }> = {
  relationship: { accent: "#22d3ee", Icon: FavoriteRoundedIcon, label: "Relationship" },
  personal:     { accent: "#a78bfa", Icon: StarRoundedIcon,     label: "Personal Goal" },
  operational:  { accent: "#34d399", Icon: StarRoundedIcon,     label: "Operational" },
  creative:     { accent: "#f59e0b", Icon: StarRoundedIcon,     label: "Creative" },
};

const PRIORITY_COLOR: Record<GoalPriority, string> = {
  high:   "#f43f5e",
  medium: "#f59e0b",
  low:    "#475569",
};

const STATUS_NEXT: Record<GoalStatus, GoalStatus> = {
  active: "done",
  done:   "active",
  paused: "active",
};

const STATUS_LABEL: Record<GoalStatus, string> = {
  active: "Active",
  done:   "Done",
  paused: "Paused",
};

const STATUS_COLOR: Record<GoalStatus, string> = {
  active: "#22c55e",
  done:   "#64748b",
  paused: "#f59e0b",
};

const STATUS_ICON: Record<GoalStatus, React.ElementType> = {
  active: PlayArrowRoundedIcon,
  done:   CheckRoundedIcon,
  paused: PauseRoundedIcon,
};

// ─── Component ────────────────────────────────────────────────────────────────

export interface CrewGoalCardProps {
  goal: EntityGoal;
  onStatusChange?: (id: string, next: GoalStatus) => void;
}

export function CrewGoalCard({ goal, onStatusChange }: CrewGoalCardProps) {
  const { accent, Icon, label } = TYPE_THEME[goal.goalType];
  const prioColor = PRIORITY_COLOR[goal.priority];
  const isDone = goal.status === "done";
  const StatusIcon = STATUS_ICON[goal.status];

  const glowInner = alpha(accent, 0.55);
  const glowCenter = alpha(accent, 0.22);
  const glowOuter = alpha(accent, 0.08);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStatusChange?.(goal.id, STATUS_NEXT[goal.status]);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: 220,
        minHeight: 180,
        borderRadius: "12px",
        background: "#0b1220",
        boxShadow: `
          0 0 0 1px ${glowInner},
          0 0 0 3px ${glowCenter},
          0 0 0 6px ${glowOuter}
        `,
        p: 1.75,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        flexShrink: 0,
        opacity: isDone ? 0.65 : 1,
        transition: "opacity 200ms ease, box-shadow 200ms ease",
        cursor: "default",
        "&:hover": {
          boxShadow: `
            0 0 0 1px ${alpha(accent, 0.75)},
            0 0 0 3px ${alpha(accent, 0.32)},
            0 0 0 8px ${alpha(accent, 0.12)}
          `,
        },
      }}
    >
      {/* Top row: type badge + status toggle */}
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 0.5 }}>
        <Stack direction="row" sx={{ alignItems: "center", gap: 0.5 }}>
          <Icon sx={{ fontSize: 12, color: accent }} />
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: accent,
              lineHeight: 1,
            }}
          >
            {label}
          </Typography>
        </Stack>

        <Tooltip title={`Mark ${STATUS_NEXT[goal.status]}`} arrow placement="top">
          <Box
            component="button"
            onClick={handleToggle}
            aria-label={`Goal status: ${STATUS_LABEL[goal.status]}`}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.4,
              px: 0.75,
              py: 0.3,
              borderRadius: 999,
              border: `1px solid ${alpha(STATUS_COLOR[goal.status], 0.45)}`,
              bgcolor: alpha(STATUS_COLOR[goal.status], 0.1),
              color: STATUS_COLOR[goal.status],
              cursor: "pointer",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              lineHeight: 1,
              background: "none",
              transition: "background 150ms, border-color 150ms",
              "&:hover": {
                bgcolor: alpha(STATUS_COLOR[goal.status], 0.22),
                borderColor: STATUS_COLOR[goal.status],
              },
            }}
          >
            <StatusIcon sx={{ fontSize: 10 }} />
            {STATUS_LABEL[goal.status]}
          </Box>
        </Tooltip>
      </Stack>

      {/* Priority bar */}
      <Box
        sx={{
          height: 2,
          borderRadius: 999,
          bgcolor: alpha(prioColor, 0.18),
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: goal.priority === "high" ? "100%" : goal.priority === "medium" ? "60%" : "30%",
            bgcolor: prioColor,
            borderRadius: 999,
          }}
        />
      </Box>

      {/* Title */}
      <Typography
        sx={{
          fontSize: 13.5,
          fontWeight: 700,
          color: isDone ? "rgba(255,255,255,0.45)" : "#FFFFFF",
          lineHeight: 1.3,
          textDecoration: isDone ? "line-through" : "none",
          flex: 1,
        }}
      >
        {goal.title}
      </Typography>

      {/* Description */}
      {goal.description && (
        <Typography
          sx={{
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {goal.description}
        </Typography>
      )}

      {/* Footer: priority + optional Direction alignment */}
      <Stack direction="row" sx={{ alignItems: "center", gap: 0.5, mt: "auto", pt: 0.5, flexWrap: "wrap" }}>
        <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: prioColor, flexShrink: 0 }} />
        <Typography
          sx={{ fontSize: 10, fontWeight: 600, color: alpha(prioColor, 0.9), textTransform: "capitalize" }}
        >
          {goal.priority} priority
        </Typography>
        {goal.alignsToPriorityId && (() => {
          const pri = priorityById(goal.alignsToPriorityId);
          if (!pri) return null;
          const c = COLOR_MAP[pri.color];
          return (
            <Tooltip title={pri.hint} arrow>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  gap: 0.35,
                  ml: 0.5,
                  px: 0.5,
                  py: 0.15,
                  borderRadius: 0.75,
                  bgcolor: alpha(c, 0.12),
                  color: c,
                }}
              >
                <PriorityGlyph id={pri.id} size={11} />
                <Typography sx={{ fontSize: 9, fontWeight: 800, fontFamily: "monospace", letterSpacing: 0.1 }}>
                  {pri.code}
                </Typography>
              </Stack>
            </Tooltip>
          );
        })()}
      </Stack>
    </Box>
  );
}
