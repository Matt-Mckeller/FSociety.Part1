"use client";

import * as React from "react";
import {
  Box,
  Chip,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useCommandCenter } from "../store/CommandCenterProvider";
import {
  GOALS,
  PROBLEMS,
  GOALS_FOR_PROBLEM,
  type MarketingGoal,
  type MarketingProblem,
  type Priority,
} from "../store/goals-data";

/* ------------------------------------------------------------------ shared */

const PRIORITY_COLOR: Record<Priority, string> = {
  P0: "#f91a4b",
  P1: "#e0911f",
  P2: "#3b82f6",
};

const STATUS_LABEL: Record<string, string> = {
  "in-progress": "In Progress",
  validated: "Validated",
  candidate: "Candidate",
  draft: "Draft",
};

function PriorityBadge({ priority }: { priority: Priority }) {
  const color = PRIORITY_COLOR[priority];
  return (
    <Chip
      size="small"
      label={priority}
      sx={{
        height: 20,
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 0.4,
        bgcolor: alpha(color, 0.14),
        color,
        flexShrink: 0,
      }}
    />
  );
}

function StatusBadge({ status }: { status: string }) {
  const theme = useTheme();
  const color =
    status === "validated"
      ? theme.palette.success.main
      : status === "in-progress"
      ? theme.palette.primary.main
      : status === "candidate"
      ? "#3b82f6"
      : alpha(theme.palette.text.primary, 0.3);
  return (
    <Typography
      variant="caption"
      sx={{ color, fontWeight: 700, letterSpacing: 0.3 }}
    >
      {STATUS_LABEL[status] ?? status}
    </Typography>
  );
}

/* ---------------------------------------------------------------- ImpactBar */

function ImpactBar({
  impact,
  relationshipType,
}: {
  impact: number;
  relationshipType: "solves" | "supports";
}) {
  const theme = useTheme();
  const fillColor =
    relationshipType === "solves"
      ? "#f91a4b"
      : theme.palette.primary.main;

  return (
    <Box
      sx={{
        width: 56,
        height: 6,
        borderRadius: 3,
        bgcolor: alpha(fillColor, 0.12),
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${impact}%`,
          bgcolor: fillColor,
          borderRadius: 3,
          transition: "width 0.3s ease",
        }}
      />
    </Box>
  );
}

/* ---------------------------------------------------------- SectionHeader */

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="caption"
      sx={{
        display: "block",
        color: "text.disabled",
        fontWeight: 800,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        mb: 0.75,
      }}
    >
      {children}
    </Typography>
  );
}

/* ---------------------------------------------------------- GoalDetail */

function GoalDetail({ goal }: { goal: MarketingGoal }) {
  const theme = useTheme();
  const { inspectGoalItem } = useCommandCenter();
  const accent = theme.palette.primary.main;

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {goal.description && (
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
          {goal.description}
        </Typography>
      )}

      {goal.solves.length > 0 && (
        <Box>
          <SectionHeader>Problems addressed</SectionHeader>
          <Stack spacing={1}>
            {goal.solves
              .slice()
              .sort((a, b) => b.impact - a.impact)
              .map(({ id, relationshipType, impact }) => {
                const problem = PROBLEMS.find((p) => p.id === id);
                if (!problem) return null;
                return (
                  <Stack
                    key={id}
                    sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                  >
                    <ImpactBar impact={impact} relationshipType={relationshipType} />
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 800,
                        color:
                          relationshipType === "solves"
                            ? PRIORITY_COLOR[problem.priority]
                            : "text.disabled",
                        width: 52,
                        flexShrink: 0,
                        textTransform: "uppercase",
                        fontSize: 9.5,
                        letterSpacing: 0.3,
                      }}
                    >
                      {relationshipType}
                    </Typography>
                    <Typography
                      variant="caption"
                      onClick={() => inspectGoalItem(problem)}
                      sx={{
                        flex: 1,
                        color: "text.secondary",
                        fontWeight: 600,
                        lineHeight: 1.3,
                        cursor: "pointer",
                        "&:hover": { color: "text.primary", textDecoration: "underline" },
                      }}
                    >
                      {problem.title}
                    </Typography>
                    <PriorityBadge priority={problem.priority} />
                    <Typography
                      variant="caption"
                      sx={{ color: "text.disabled", fontWeight: 700, minWidth: 28, textAlign: "right" }}
                    >
                      {impact}
                    </Typography>
                  </Stack>
                );
              })}
          </Stack>
        </Box>
      )}

      {goal.enabledFeatures.length > 0 && (
        <Box>
          <SectionHeader>Enables</SectionHeader>
          <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.5 }}>
            {goal.enabledFeatures.map((f) => (
              <Chip
                key={f}
                size="small"
                label={f}
                sx={{
                  height: 20,
                  fontSize: 10,
                  fontWeight: 600,
                  bgcolor: alpha(accent, 0.08),
                  color: accent,
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {goal.relatedContent && goal.relatedContent.length > 0 && (
        <Box>
          <SectionHeader>Related content</SectionHeader>
          <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.5 }}>
            {goal.relatedContent.map((c) => (
              <Chip
                key={c}
                size="small"
                label={c}
                sx={{
                  height: 20,
                  fontSize: 10,
                  fontWeight: 600,
                  bgcolor: alpha(theme.palette.text.primary, 0.07),
                  color: "text.secondary",
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
}

/* -------------------------------------------------------- ProblemDetail */

function ProblemDetail({ problem }: { problem: MarketingProblem }) {
  const theme = useTheme();
  const { inspectGoalItem } = useCommandCenter();
  const pColor = PRIORITY_COLOR[problem.priority];

  const addressingGoals = (GOALS_FOR_PROBLEM[problem.id] ?? [])
    .map((gid) => GOALS.find((g) => g.id === gid))
    .filter((g): g is MarketingGoal => Boolean(g))
    .map((g) => {
      const link = g.solves.find((s) => s.id === problem.id);
      return { goal: g, link };
    });

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {problem.description && (
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
          {problem.description}
        </Typography>
      )}

      {problem.affectedRoles.length > 0 && (
        <Box>
          <SectionHeader>Affects</SectionHeader>
          <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.5 }}>
            {problem.affectedRoles.map((r) => (
              <Chip
                key={r}
                size="small"
                label={r}
                sx={{
                  height: 20,
                  fontSize: 10,
                  fontWeight: 600,
                  bgcolor: alpha(pColor, 0.1),
                  color: pColor,
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {addressingGoals.length > 0 && (
        <Box>
          <SectionHeader>Addressed by</SectionHeader>
          <Stack spacing={1}>
            {addressingGoals
              .slice()
              .sort((a, b) => (b.link?.impact ?? 0) - (a.link?.impact ?? 0))
              .map(({ goal, link }) => (
                <Stack
                  key={goal.id}
                  sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  {link && (
                    <ImpactBar
                      impact={link.impact}
                      relationshipType={link.relationshipType}
                    />
                  )}
                  {link && (
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 800,
                        color:
                          link.relationshipType === "solves"
                            ? pColor
                            : "text.disabled",
                        width: 52,
                        flexShrink: 0,
                        textTransform: "uppercase",
                        fontSize: 9.5,
                        letterSpacing: 0.3,
                      }}
                    >
                      {link.relationshipType}
                    </Typography>
                  )}
                  <Typography
                    variant="caption"
                    onClick={() => inspectGoalItem(goal)}
                    sx={{
                      flex: 1,
                      color: "text.secondary",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      cursor: "pointer",
                      "&:hover": { color: "text.primary", textDecoration: "underline" },
                    }}
                  >
                    {goal.title}
                  </Typography>
                  <PriorityBadge priority={goal.priority} />
                  {link && (
                    <Typography
                      variant="caption"
                      sx={{ color: "text.disabled", fontWeight: 700, minWidth: 28, textAlign: "right" }}
                    >
                      {link.impact}
                    </Typography>
                  )}
                </Stack>
              ))}
          </Stack>
        </Box>
      )}

      {problem.enabledFeatures.length > 0 && (
        <Box>
          <SectionHeader>Motivates</SectionHeader>
          <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.5 }}>
            {problem.enabledFeatures.map((f) => (
              <Chip
                key={f}
                size="small"
                label={f}
                sx={{
                  height: 20,
                  fontSize: 10,
                  fontWeight: 600,
                  bgcolor: alpha(theme.palette.text.primary, 0.07),
                  color: "text.secondary",
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
}

/* --------------------------------------------------------------- Inspector */

function isGoal(item: MarketingGoal | MarketingProblem): item is MarketingGoal {
  return "solves" in item;
}

export function GoalItemInspector() {
  const theme = useTheme();
  const { inspectedGoalItem, inspectGoalItem } = useCommandCenter();

  const open = Boolean(inspectedGoalItem);
  if (!open || !inspectedGoalItem) return null;

  const isGoalItem = isGoal(inspectedGoalItem);
  const priority = inspectedGoalItem.priority;
  const accentColor = PRIORITY_COLOR[priority];

  return (
    <Dialog
      open={open}
      onClose={() => inspectGoalItem(null)}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            border: "1px solid",
            borderColor: alpha(accentColor, 0.3),
            backgroundImage: "none",
            maxWidth: 520,
          },
        },
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 1.5,
          p: 2,
          background: `linear-gradient(135deg, ${alpha(accentColor, 0.1)}, transparent)`,
        }}
      >
        <Box
          sx={{
            width: 4,
            alignSelf: "stretch",
            borderRadius: 2,
            bgcolor: accentColor,
            flexShrink: 0,
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            sx={{ flexDirection: "row", alignItems: "center", gap: 1, mb: 0.5 }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.disabled",
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                fontSize: 9.5,
              }}
            >
              {isGoalItem ? "Goal" : "Problem"}
            </Typography>
            <PriorityBadge priority={priority} />
            <StatusBadge status={inspectedGoalItem.status} />
          </Stack>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
            {inspectedGoalItem.title}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => inspectGoalItem(null)}
          aria-label="Close"
          sx={{ flexShrink: 0 }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Divider />

      {isGoalItem ? (
        <GoalDetail goal={inspectedGoalItem} />
      ) : (
        <ProblemDetail problem={inspectedGoalItem} />
      )}
    </Dialog>
  );
}
