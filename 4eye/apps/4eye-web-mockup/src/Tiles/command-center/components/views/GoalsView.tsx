"use client";

import * as React from "react";
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

import {
  GOALS,
  PROBLEMS,
  GOALS_FOR_PROBLEM,
  DESIRES,
  type Desire,
  type GoalCategory,
  type MarketingGoal,
  type MarketingProblem,
  type Priority,
} from "../../store/goals-data";
import { useCommandCenter } from "../../store/CommandCenterProvider";

/* ------------------------------------------------------------------ consts */

const PRIORITY_COLOR: Record<Priority, string> = {
  P0: "#f91a4b",
  P1: "#e0911f",
  P2: "#3b82f6",
};

const PRIORITY_ORDER: Priority[] = ["P0", "P1", "P2"];

const CATEGORY_META: Record<
  GoalCategory,
  { label: string; color: string; symbol: string }
> = {
  northStar: { label: "North Star", color: "#7C3AED", symbol: "★" },
  marketing:  { label: "Marketing",  color: "#3b82f6", symbol: "◈" },
  product:    { label: "Product",    color: "#6366f1", symbol: "◉" },
  realWorld:  { label: "Real World", color: "#10b981", symbol: "◎" },
};

const CATEGORY_ORDER: GoalCategory[] = ["northStar", "marketing", "product", "realWorld"];

type SortKey = "priority" | "status" | "alpha";

const STATUS_ORDER: Record<string, number> = {
  "in-progress": 0,
  validated: 1,
  candidate: 2,
  draft: 3,
};

/* ------------------------------------------------------------------ utils */

function prioritySort(a: { priority: Priority }, b: { priority: Priority }) {
  return PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority);
}

function statusSort(a: { status: string }, b: { status: string }) {
  return (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9);
}

function alphaSort(a: { title: string }, b: { title: string }) {
  return a.title.localeCompare(b.title);
}

function sortItems<T extends { priority: Priority; status: string; title: string }>(
  items: T[],
  key: SortKey,
): T[] {
  const copy = [...items];
  if (key === "priority") return copy.sort((a, b) => prioritySort(a, b) || alphaSort(a, b));
  if (key === "status") return copy.sort((a, b) => statusSort(a, b) || prioritySort(a, b));
  return copy.sort(alphaSort);
}

/* ------------------------------------------------------------ shared atoms */

function PriorityStrip({ priority }: { priority: Priority }) {
  return (
    <Box
      sx={{
        width: 3,
        alignSelf: "stretch",
        borderRadius: 1,
        bgcolor: PRIORITY_COLOR[priority],
        flexShrink: 0,
      }}
    />
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const color = PRIORITY_COLOR[priority];
  return (
    <Chip
      size="small"
      label={priority}
      sx={{
        height: 18,
        fontSize: 9.5,
        fontWeight: 800,
        letterSpacing: 0.4,
        bgcolor: alpha(color, 0.14),
        color,
        flexShrink: 0,
        "& .MuiChip-label": { px: 0.75 },
      }}
    />
  );
}

function CategoryBadge({ category }: { category: GoalCategory }) {
  const { color, label, symbol } = CATEGORY_META[category];
  return (
    <Chip
      size="small"
      label={`${symbol} ${label}`}
      sx={{
        height: 16,
        fontSize: 9,
        fontWeight: 700,
        bgcolor: alpha(color, 0.1),
        color,
        flexShrink: 0,
        "& .MuiChip-label": { px: 0.6 },
      }}
    />
  );
}

function StatusDot({ status }: { status: string }) {
  const theme = useTheme();
  const color =
    status === "validated"
      ? theme.palette.success.main
      : status === "in-progress"
      ? theme.palette.primary.main
      : status === "candidate"
      ? "#3b82f6"
      : alpha(theme.palette.text.primary, 0.25);
  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        bgcolor: color,
        flexShrink: 0,
      }}
    />
  );
}

function ImpactBar({
  impact,
  relationshipType,
}: {
  impact: number;
  relationshipType: "solves" | "supports";
}) {
  const theme = useTheme();
  const fillColor =
    relationshipType === "solves" ? "#f91a4b" : theme.palette.primary.main;
  return (
    <Box
      sx={{
        width: 48,
        height: 5,
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
        }}
      />
    </Box>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="caption"
      sx={{
        display: "block",
        color: "text.disabled",
        fontWeight: 800,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        mb: 0.5,
        fontSize: 9,
      }}
    >
      {children}
    </Typography>
  );
}

/* ------------------------------------------------------------- CategoryBar */

interface CategoryBarProps {
  activeCategory: GoalCategory | "all";
  onSetCategory: (c: GoalCategory | "all") => void;
  counts: Record<GoalCategory, number>;
  total: number;
}

function CategoryBar({ activeCategory, onSetCategory, counts, total }: CategoryBarProps) {
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
      {/* All */}
      <Chip
        size="small"
        label={`All  ${total}`}
        onClick={() => onSetCategory("all")}
        sx={{
          height: 22,
          fontSize: 10,
          fontWeight: 800,
          cursor: "pointer",
          bgcolor: activeCategory === "all" ? alpha("#6366f1", 0.12) : "transparent",
          color: activeCategory === "all" ? "#6366f1" : "text.disabled",
          border: "1px solid",
          borderColor: activeCategory === "all" ? alpha("#6366f1", 0.3) : "transparent",
          transition: "all 0.15s",
          "& .MuiChip-label": { px: 0.75 },
        }}
      />
      {CATEGORY_ORDER.map((cat) => {
        const { label, color, symbol } = CATEGORY_META[cat];
        const active = activeCategory === cat;
        return (
          <Chip
            key={cat}
            size="small"
            label={`${symbol} ${label}  ${counts[cat]}`}
            onClick={() => onSetCategory(cat)}
            sx={{
              height: 22,
              fontSize: 10,
              fontWeight: 800,
              cursor: "pointer",
              bgcolor: active ? alpha(color, 0.12) : "transparent",
              color: active ? color : "text.disabled",
              border: "1px solid",
              borderColor: active ? alpha(color, 0.3) : "transparent",
              transition: "all 0.15s",
              "& .MuiChip-label": { px: 0.75 },
            }}
          />
        );
      })}
    </Stack>
  );
}

/* ---------------------------------------------------------------- FilterBar */

interface FilterBarProps {
  activeFilters: Set<Priority>;
  onToggleFilter: (p: Priority) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  counts: Record<Priority, number>;
}

function FilterBar({ activeFilters, onToggleFilter, sort, onSort, counts }: FilterBarProps) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 0.75,
        flexWrap: "wrap",
        pb: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {PRIORITY_ORDER.map((p) => {
        const active = activeFilters.has(p);
        const color = PRIORITY_COLOR[p];
        return (
          <Chip
            key={p}
            size="small"
            label={`${p}  ${counts[p]}`}
            onClick={() => onToggleFilter(p)}
            sx={{
              height: 22,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.3,
              cursor: "pointer",
              bgcolor: active ? alpha(color, 0.14) : alpha(color, 0.04),
              color: active ? color : "text.disabled",
              border: "1px solid",
              borderColor: active ? alpha(color, 0.35) : "transparent",
              transition: "all 0.15s",
              "& .MuiChip-label": { px: 0.75 },
            }}
          />
        );
      })}

      <Box sx={{ flex: 1 }} />

      <Stack sx={{ flexDirection: "row", gap: 0.5 }}>
        {(["priority", "status", "alpha"] as SortKey[]).map((s) => (
          <Chip
            key={s}
            size="small"
            label={s === "alpha" ? "A–Z" : s.charAt(0).toUpperCase() + s.slice(1)}
            onClick={() => onSort(s)}
            sx={{
              height: 22,
              fontSize: 9.5,
              fontWeight: 700,
              cursor: "pointer",
              bgcolor: sort === s ? alpha("#6366f1", 0.12) : "transparent",
              color: sort === s ? "#6366f1" : "text.disabled",
              border: "1px solid",
              borderColor: sort === s ? alpha("#6366f1", 0.3) : "transparent",
              transition: "all 0.15s",
              "& .MuiChip-label": { px: 0.75 },
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}

/* ---------------------------------------------------------------- GoalRow */

function GoalExpandedBody({ goal }: { goal: MarketingGoal }) {
  const theme = useTheme();
  const { inspectGoalItem } = useCommandCenter();
  const accent = theme.palette.primary.main;
  const catColor = CATEGORY_META[goal.category].color;

  const sortedSolves = [...goal.solves].sort((a, b) => b.impact - a.impact);

  return (
    <Box
      sx={{
        px: 2,
        pb: 1.25,
        pt: 0.5,
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
      }}
    >
      {/* Description */}
      {goal.description && (
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", lineHeight: 1.6, display: "block" }}
        >
          {goal.description}
        </Typography>
      )}

      {/* Target date + milestone timeline */}
      {(goal.targetDate || goal.milestones) && (
        <Box>
          <SectionLabel>Timeline</SectionLabel>
          {goal.targetDate && !goal.milestones && (
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
              <Chip
                size="small"
                label="Target"
                sx={{
                  height: 17,
                  fontSize: 9.5,
                  fontWeight: 700,
                  bgcolor: alpha(catColor, 0.14),
                  color: catColor,
                }}
              />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {new Date(goal.targetDate).getFullYear()}
              </Typography>
            </Stack>
          )}
          {goal.milestones && (
            <Stack spacing={0.4}>
              {goal.milestones.map((m) => (
                <Stack
                  key={m.year}
                  sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  <Chip
                    label={m.year}
                    size="small"
                    sx={{
                      height: 17,
                      fontSize: 9.5,
                      fontWeight: 700,
                      bgcolor: alpha(catColor, 0.14),
                      color: catColor,
                    }}
                  />
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {m.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </Box>
      )}

      {sortedSolves.length > 0 && (
        <Box>
          <SectionLabel>Problems addressed</SectionLabel>
          <Stack spacing={0.6}>
            {sortedSolves.map(({ id, relationshipType, impact }) => {
              const problem = PROBLEMS.find((p) => p.id === id);
              if (!problem) return null;
              const isSolves = relationshipType === "solves";
              return (
                <Stack
                  key={id}
                  sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}
                >
                  <ImpactBar impact={impact} relationshipType={relationshipType} />
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: 9,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: 0.3,
                      color: isSolves ? PRIORITY_COLOR[problem.priority] : "text.disabled",
                      width: 46,
                      flexShrink: 0,
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
                    sx={{
                      color: "text.disabled",
                      fontWeight: 700,
                      minWidth: 24,
                      textAlign: "right",
                      fontSize: 9.5,
                    }}
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
          <SectionLabel>Enables</SectionLabel>
          <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.4 }}>
            {goal.enabledFeatures.map((f) => (
              <Chip
                key={f}
                size="small"
                label={f}
                sx={{
                  height: 18,
                  fontSize: 9.5,
                  fontWeight: 600,
                  bgcolor: alpha(accent, 0.08),
                  color: accent,
                  "& .MuiChip-label": { px: 0.75 },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {goal.relatedContent && goal.relatedContent.length > 0 && (
        <Box>
          <SectionLabel>Related content</SectionLabel>
          <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.4 }}>
            {goal.relatedContent.map((c) => (
              <Chip
                key={c}
                size="small"
                label={c}
                onClick={() => {}}
                sx={{
                  height: 18,
                  fontSize: 9.5,
                  fontWeight: 600,
                  bgcolor: alpha("#6366f1", 0.07),
                  color: "#6366f1",
                  cursor: "pointer",
                  "& .MuiChip-label": { px: 0.75 },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

function GoalRow({ goal }: { goal: MarketingGoal }) {
  const { inspectGoalItem } = useCommandCenter();
  const [expanded, setExpanded] = React.useState(false);
  const pColor = PRIORITY_COLOR[goal.priority];

  return (
    <Box
      className="parent-row"
      sx={{
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: expanded ? alpha(pColor, 0.3) : "divider",
        bgcolor: expanded ? alpha(pColor, 0.03) : "background.paper",
        overflow: "hidden",
        transition: "border-color 0.15s, background-color 0.15s",
        "&:hover": {
          borderColor: alpha(pColor, 0.25),
        },
      }}
    >
      {/* Collapsed row */}
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          px: 1,
          py: 0.75,
          cursor: "pointer",
          minHeight: 36,
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        <PriorityStrip priority={goal.priority} />
        <StatusDot status={goal.status} />
        <Typography
          variant="body2"
          sx={{ flex: 1, fontWeight: 700, lineHeight: 1.3, minWidth: 0 }}
        >
          {goal.title}
        </Typography>

        {/* Category + counts */}
        <Stack
          sx={{
            flexDirection: "row",
            gap: 0.5,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <CategoryBadge category={goal.category} />
          {goal.solves.length > 0 && (
            <Typography
              variant="caption"
              sx={{ color: "text.disabled", fontWeight: 600, fontSize: 10, whiteSpace: "nowrap" }}
            >
              {goal.solves.length} {goal.solves.length === 1 ? "prob" : "probs"}
            </Typography>
          )}
          {goal.solves.length > 0 && goal.enabledFeatures.length > 0 && (
            <Typography variant="caption" sx={{ color: "divider" }}>·</Typography>
          )}
          {goal.enabledFeatures.length > 0 && (
            <Typography
              variant="caption"
              sx={{ color: "text.disabled", fontWeight: 600, fontSize: 10, whiteSpace: "nowrap" }}
            >
              {goal.enabledFeatures.length} features
            </Typography>
          )}
        </Stack>

        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            inspectGoalItem(goal);
          }}
          sx={{
            p: 0.25,
            color: "text.disabled",
            opacity: 0,
            ".parent-row:hover &": { opacity: 1 },
          }}
          aria-label="Open detail"
        >
          <Box
            sx={{
              width: 14,
              height: 14,
              border: "1.5px solid",
              borderColor: "text.disabled",
              borderRadius: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            ↗
          </Box>
        </IconButton>

        <Box sx={{ color: "text.disabled", display: "flex", flexShrink: 0 }}>
          {expanded ? (
            <KeyboardArrowUpRoundedIcon sx={{ fontSize: 16 }} />
          ) : (
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 16 }} />
          )}
        </Box>
      </Stack>

      {/* Expanded body */}
      <Collapse in={expanded}>
        <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
          <GoalExpandedBody goal={goal} />
        </Box>
      </Collapse>
    </Box>
  );
}

/* --------------------------------------------------------------- ProblemRow */

function ProblemExpandedBody({ problem }: { problem: MarketingProblem }) {
  const theme = useTheme();
  const { inspectGoalItem } = useCommandCenter();
  const pColor = PRIORITY_COLOR[problem.priority];

  const addressingGoals = (GOALS_FOR_PROBLEM[problem.id] ?? [])
    .map((gid) => GOALS.find((g) => g.id === gid))
    .filter((g): g is MarketingGoal => Boolean(g))
    .map((g) => {
      const link = g.solves.find((s) => s.id === problem.id);
      return { goal: g, link };
    })
    .sort((a, b) => (b.link?.impact ?? 0) - (a.link?.impact ?? 0));

  return (
    <Box
      sx={{
        px: 2,
        pb: 1.25,
        pt: 0.5,
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
      }}
    >
      {problem.description && (
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", lineHeight: 1.6, display: "block" }}
        >
          {problem.description}
        </Typography>
      )}

      {addressingGoals.length > 0 && (
        <Box>
          <SectionLabel>Addressed by</SectionLabel>
          <Stack spacing={0.6}>
            {addressingGoals.map(({ goal, link }) => (
              <Stack
                key={goal.id}
                sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}
              >
                {link && (
                  <ImpactBar impact={link.impact} relationshipType={link.relationshipType} />
                )}
                {link && (
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: 9,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: 0.3,
                      color:
                        link.relationshipType === "solves" ? pColor : "text.disabled",
                      width: 46,
                      flexShrink: 0,
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
                    sx={{
                      color: "text.disabled",
                      fontWeight: 700,
                      minWidth: 24,
                      textAlign: "right",
                      fontSize: 9.5,
                    }}
                  >
                    {link.impact}
                  </Typography>
                )}
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

      {problem.affectedRoles.length > 0 && (
        <Box>
          <SectionLabel>Affects</SectionLabel>
          <Stack sx={{ flexDirection: "row", gap: 0.4, flexWrap: "wrap" }}>
            {problem.affectedRoles.map((r) => (
              <Chip
                key={r}
                size="small"
                label={r}
                sx={{
                  height: 18,
                  fontSize: 9.5,
                  fontWeight: 600,
                  bgcolor: alpha(pColor, 0.1),
                  color: pColor,
                  "& .MuiChip-label": { px: 0.75 },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {problem.enabledFeatures.length > 0 && (
        <Box>
          <SectionLabel>Motivates</SectionLabel>
          <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.4 }}>
            {problem.enabledFeatures.map((f) => (
              <Chip
                key={f}
                size="small"
                label={f}
                sx={{
                  height: 18,
                  fontSize: 9.5,
                  fontWeight: 600,
                  bgcolor: alpha(theme.palette.text.primary, 0.07),
                  color: "text.secondary",
                  "& .MuiChip-label": { px: 0.75 },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

function ProblemRow({ problem }: { problem: MarketingProblem }) {
  const { inspectGoalItem } = useCommandCenter();
  const [expanded, setExpanded] = React.useState(false);
  const pColor = PRIORITY_COLOR[problem.priority];
  const goalCount = (GOALS_FOR_PROBLEM[problem.id] ?? []).length;

  return (
    <Box
      sx={{
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: expanded ? alpha(pColor, 0.3) : "divider",
        bgcolor: expanded ? alpha(pColor, 0.03) : "background.paper",
        overflow: "hidden",
        transition: "border-color 0.15s, background-color 0.15s",
        "&:hover": { borderColor: alpha(pColor, 0.25) },
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          px: 1,
          py: 0.75,
          cursor: "pointer",
          minHeight: 36,
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        <PriorityStrip priority={problem.priority} />
        <StatusDot status={problem.status} />
        <Typography
          variant="body2"
          sx={{ flex: 1, fontWeight: 700, lineHeight: 1.3, minWidth: 0 }}
        >
          {problem.title}
        </Typography>

        <Stack sx={{ flexDirection: "row", gap: 0.5, alignItems: "center", flexShrink: 0 }}>
          {problem.affectedRoles.length > 0 && (
            <Typography
              variant="caption"
              sx={{ color: "text.disabled", fontWeight: 600, fontSize: 10, whiteSpace: "nowrap" }}
            >
              {problem.affectedRoles.join(", ")}
            </Typography>
          )}
          {problem.affectedRoles.length > 0 && goalCount > 0 && (
            <Typography variant="caption" sx={{ color: "divider" }}>·</Typography>
          )}
          {goalCount > 0 && (
            <Typography
              variant="caption"
              sx={{ color: "text.disabled", fontWeight: 600, fontSize: 10, whiteSpace: "nowrap" }}
            >
              {goalCount} {goalCount === 1 ? "goal" : "goals"}
            </Typography>
          )}
        </Stack>

        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            inspectGoalItem(problem);
          }}
          sx={{ p: 0.25, color: "text.disabled" }}
          aria-label="Open detail"
        >
          <Box
            sx={{
              width: 14,
              height: 14,
              border: "1.5px solid",
              borderColor: "text.disabled",
              borderRadius: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            ↗
          </Box>
        </IconButton>

        <Box sx={{ color: "text.disabled", display: "flex", flexShrink: 0 }}>
          {expanded ? (
            <KeyboardArrowUpRoundedIcon sx={{ fontSize: 16 }} />
          ) : (
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 16 }} />
          )}
        </Box>
      </Stack>

      <Collapse in={expanded}>
        <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
          <ProblemExpandedBody problem={problem} />
        </Box>
      </Collapse>
    </Box>
  );
}

/* ---------------------------------------------------------------- DesireCard */

function DesireCard({ desire }: { desire: Desire }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: alpha(desire.color, 0.22),
        bgcolor: alpha(desire.color, 0.05),
        display: "flex",
        flexDirection: "column",
        gap: 0.75,
        transition: "border-color 0.15s, background-color 0.15s",
        "&:hover": {
          borderColor: alpha(desire.color, 0.4),
          bgcolor: alpha(desire.color, 0.09),
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, color: desire.color, lineHeight: 1, letterSpacing: -0.3 }}
      >
        {desire.word}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", lineHeight: 1.55, display: "block" }}
      >
        {desire.tagline}
      </Typography>
    </Box>
  );
}

/* ---------------------------------------------------------------- GoalsList */

function GoalsList() {
  /*
    Opens on North Star rather than All. "All" is every goal at once, which is
    the view you want least often — the compass exists to say which direction
    is the one that matters, and landing on the full list buries that behind a
    scroll. The other categories are one click away.
  */
  const [activeCategory, setActiveCategory] = React.useState<GoalCategory | "all">("northStar");
  const [activeFilters, setActiveFilters] = React.useState<Set<Priority>>(
    new Set(PRIORITY_ORDER),
  );
  const [sort, setSort] = React.useState<SortKey>("priority");

  const categoryCounts = React.useMemo(
    () =>
      CATEGORY_ORDER.reduce(
        (acc, cat) => {
          acc[cat] = GOALS.filter((g) => g.category === cat).length;
          return acc;
        },
        {} as Record<GoalCategory, number>,
      ),
    [],
  );

  const visibleByCategory = React.useMemo(
    () =>
      activeCategory === "all"
        ? GOALS
        : GOALS.filter((g) => g.category === activeCategory),
    [activeCategory],
  );

  const priorityCounts = React.useMemo(
    () =>
      PRIORITY_ORDER.reduce(
        (acc, p) => {
          acc[p] = visibleByCategory.filter((g) => g.priority === p).length;
          return acc;
        },
        {} as Record<Priority, number>,
      ),
    [visibleByCategory],
  );

  const filtered = React.useMemo(
    () =>
      sortItems(
        visibleByCategory.filter((g) => activeFilters.has(g.priority)),
        sort,
      ),
    [visibleByCategory, activeFilters, sort],
  );

  function toggleFilter(p: Priority) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(p)) {
        if (next.size === 1) return prev;
        next.delete(p);
      } else {
        next.add(p);
      }
      return next;
    });
  }

  return (
    <Stack spacing={1}>
      {/* Category filter */}
      <CategoryBar
        activeCategory={activeCategory}
        onSetCategory={setActiveCategory}
        counts={categoryCounts}
        total={GOALS.length}
      />
      {/* Priority filter + sort */}
      <FilterBar
        activeFilters={activeFilters}
        onToggleFilter={toggleFilter}
        sort={sort}
        onSort={setSort}
        counts={priorityCounts}
      />
      <Stack spacing={0.5}>
        {filtered.map((g) => (
          <GoalRow key={g.id} goal={g} />
        ))}
      </Stack>
    </Stack>
  );
}

/* -------------------------------------------------------------- ProblemsList */

function ProblemsList() {
  const [activeFilters, setActiveFilters] = React.useState<Set<Priority>>(
    new Set(PRIORITY_ORDER),
  );
  const [sort, setSort] = React.useState<SortKey>("priority");

  const counts = React.useMemo(
    () =>
      PRIORITY_ORDER.reduce(
        (acc, p) => {
          acc[p] = PROBLEMS.filter((prob) => prob.priority === p).length;
          return acc;
        },
        {} as Record<Priority, number>,
      ),
    [],
  );

  const filtered = React.useMemo(
    () => sortItems(PROBLEMS.filter((p) => activeFilters.has(p.priority)), sort),
    [activeFilters, sort],
  );

  function toggleFilter(p: Priority) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(p)) {
        if (next.size === 1) return prev;
        next.delete(p);
      } else {
        next.add(p);
      }
      return next;
    });
  }

  return (
    <Stack spacing={1}>
      <FilterBar
        activeFilters={activeFilters}
        onToggleFilter={toggleFilter}
        sort={sort}
        onSort={setSort}
        counts={counts}
      />
      <Stack spacing={0.5}>
        {filtered.map((p) => (
          <ProblemRow key={p.id} problem={p} />
        ))}
      </Stack>
    </Stack>
  );
}

/* ---------------------------------------------------------------------- view */

export function GoalsView() {
  const [tab, setTab] = React.useState<"goals" | "problems" | "desires">("goals");

  const p0Goals = GOALS.filter((g) => g.priority === "P0").length;
  const p0Problems = PROBLEMS.filter((p) => p.priority === "P0").length;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          minHeight: 34,
          borderBottom: "1px solid",
          borderColor: "divider",
          "& .MuiTab-root": {
            minHeight: 34,
            py: 0,
            px: 1.5,
            fontSize: 12,
            fontWeight: 700,
            textTransform: "none",
            letterSpacing: 0.1,
          },
        }}
      >
        <Tab
          label={
            <Stack sx={{ flexDirection: "row", gap: 0.75, alignItems: "center" }}>
              <span>Goals</span>
              <Chip
                size="small"
                label={GOALS.length}
                sx={{ height: 16, fontSize: 9, fontWeight: 800, pointerEvents: "none", "& .MuiChip-label": { px: 0.6 } }}
              />
              {p0Goals > 0 && (
                <Chip
                  size="small"
                  label={`${p0Goals} P0`}
                  sx={{
                    height: 16,
                    fontSize: 9,
                    fontWeight: 800,
                    bgcolor: alpha(PRIORITY_COLOR.P0, 0.12),
                    color: PRIORITY_COLOR.P0,
                    pointerEvents: "none",
                    "& .MuiChip-label": { px: 0.6 },
                  }}
                />
              )}
            </Stack>
          }
          value="goals"
        />
        <Tab
          label={
            <Stack sx={{ flexDirection: "row", gap: 0.75, alignItems: "center" }}>
              <span>Problems</span>
              <Chip
                size="small"
                label={PROBLEMS.length}
                sx={{ height: 16, fontSize: 9, fontWeight: 800, pointerEvents: "none", "& .MuiChip-label": { px: 0.6 } }}
              />
              {p0Problems > 0 && (
                <Chip
                  size="small"
                  label={`${p0Problems} critical`}
                  sx={{
                    height: 16,
                    fontSize: 9,
                    fontWeight: 800,
                    bgcolor: alpha(PRIORITY_COLOR.P0, 0.12),
                    color: PRIORITY_COLOR.P0,
                    pointerEvents: "none",
                    "& .MuiChip-label": { px: 0.6 },
                  }}
                />
              )}
            </Stack>
          }
          value="problems"
        />
        <Tab label="Desires" value="desires" />
      </Tabs>

      {tab === "goals" && <GoalsList />}
      {tab === "problems" && <ProblemsList />}
      {tab === "desires" && (
        <Box
          sx={{
            display: "grid",
            gap: 1.25,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
          }}
        >
          {DESIRES.map((d) => (
            <DesireCard key={d.id} desire={d} />
          ))}
        </Box>
      )}
    </Box>
  );
}
