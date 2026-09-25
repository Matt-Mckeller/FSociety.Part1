"use client";

/**
 * ProjectOverview — a compact data-visualization strip for the active project.
 *
 * Turns the current creative data into an at-a-glance read, using the shared
 * visual vocabulary (STATUS_COLOR, weightColor) so it stays consistent with
 * the rest of the Create screen:
 *   - Stat tiles:        scenes · sequences · live %
 *   - Status distribution: a single stacked bar (draft / sequence / live)
 *   - Goal coverage:     top goals by aggregated weight across scenes
 *
 * Reads everything from CreateProvider — no props. Designed to sit as a slim
 * full-width rail between the header and the two-pane body (no scroll).
 */

import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";

import { useCreate } from "../store/CreateProvider";
import { STATUS_LABEL, type Scene, type SeedStatus } from "../model/types";
import { BrandIcon } from "./BrandIcon";
import { STATUS_COLOR, weightColor } from "./visuals";

const BRAND_FONT = "Xpens, Roboto, sans-serif";
const STATUS_ORDER: SeedStatus[] = ["live", "sequence", "draft"];

/** One labelled stat number with a glyph. */
function StatTile({
  glyph,
  value,
  label,
  color = "#2c4f76",
}: {
  glyph: Parameters<typeof BrandIcon>[0]["name"];
  value: string | number;
  label: string;
  color?: string;
}) {
  return (
    <Stack
      spacing={0.75}
      sx={{ flexDirection: "row", alignItems: "center", flexShrink: 0 }}
    >
      <Box sx={{ color, display: "inline-flex" }}>
        <BrandIcon name={glyph} size={18} />
      </Box>
      <Box>
        <Typography
          sx={{ fontFamily: BRAND_FONT, fontWeight: 800, fontSize: 16, lineHeight: 1 }}
        >
          {value}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ lineHeight: 1, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4 }}
        >
          {label}
        </Typography>
      </Box>
    </Stack>
  );
}

export function ProjectOverview() {
  const { state, selectedProject, sequencesForProject } = useCreate();

  // Scenes that belong to the active project (across its sequences).
  const projectScenes: Scene[] = sequencesForProject
    .flatMap((seq) => seq.sceneIds)
    .map((id) => state.scenes.find((sc) => sc.id === id))
    .filter((sc): sc is Scene => Boolean(sc));

  const total = projectScenes.length || 1;
  const counts: Record<SeedStatus, number> = {
    draft: projectScenes.filter((s) => s.status === "draft").length,
    sequence: projectScenes.filter((s) => s.status === "sequence").length,
    live: projectScenes.filter((s) => s.status === "live").length,
  };
  const livePct = Math.round((counts.live / total) * 100);

  // Aggregate goal weight across scene-level links, top 3.
  const sceneIds = new Set(projectScenes.map((s) => s.id));
  const weightByGoal = new Map<string, number>();
  for (const link of state.goalLinks) {
    if (link.toType === "scene" && sceneIds.has(link.toId)) {
      weightByGoal.set(link.goalId, (weightByGoal.get(link.goalId) ?? 0) + link.weight);
    }
  }
  const maxGoalWeight = Math.max(1, ...weightByGoal.values());
  const topGoals = [...weightByGoal.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([goalId, weight]) => ({
      goal: state.goals.find((g) => g.id === goalId),
      weight,
    }))
    .filter((g): g is { goal: NonNullable<typeof g.goal>; weight: number } =>
      Boolean(g.goal),
    );

  return (
    <Box
      sx={{
        flexShrink: 0,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { md: "center" },
        gap: 1.5,
        px: 1.5,
        py: 1,
        bgcolor: "#fafbfc",
        border: "1px solid #eef1f5",
        borderRadius: 2,
        overflowX: "auto",
      }}
    >
      {/* Stat tiles */}
      <Stack
        spacing={2}
        sx={{ flexDirection: "row", alignItems: "center", flexShrink: 0 }}
      >
        <StatTile glyph="sequence" value={sequencesForProject.length} label="Sequences" color="#2c4f76" />
        <StatTile glyph="scene" value={projectScenes.length} label="Scenes" color="#1976d2" />
        <StatTile glyph="live" value={`${livePct}%`} label="Live" color="#2e7d32" />
      </Stack>

      {/* Status distribution stacked bar */}
      <Box sx={{ flex: 1, minWidth: 160 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4, display: "block", mb: 0.4 }}
        >
          Scene status
        </Typography>
        <Stack
          spacing={0.4}
          sx={{ flexDirection: "row", alignItems: "center", height: 10, borderRadius: 5, overflow: "hidden", bgcolor: "#eef1f5" }}
        >
          {STATUS_ORDER.map((status) => {
            const pct = (counts[status] / total) * 100;
            if (pct === 0) return null;
            return (
              <Tooltip key={status} title={`${counts[status]} ${STATUS_LABEL[status]}`} arrow>
                <Box
                  sx={{
                    width: `${pct}%`,
                    height: "100%",
                    bgcolor: STATUS_COLOR[status],
                    transition: "width 250ms ease",
                  }}
                />
              </Tooltip>
            );
          })}
        </Stack>
        <Stack spacing={1.25} sx={{ flexDirection: "row", flexWrap: "wrap", mt: 0.5 }}>
          {STATUS_ORDER.map((status) => (
            <Stack key={status} spacing={0.5} sx={{ flexDirection: "row", alignItems: "center" }}>
              <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: STATUS_COLOR[status] }} />
              <Typography variant="caption" sx={{ fontSize: 10, color: "text.secondary" }}>
                {STATUS_LABEL[status]} {counts[status]}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* Goal coverage — top goals by aggregated weight */}
      {topGoals.length > 0 && (
        <Box sx={{ flex: 1, minWidth: 180 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4, display: "block", mb: 0.4 }}
          >
            Goal coverage
          </Typography>
          <Stack spacing={0.5}>
            {topGoals.map(({ goal, weight }) => {
              const pct = Math.round((weight / maxGoalWeight) * 100);
              const color = weightColor(Math.min(100, weight / topGoals.length || weight));
              return (
                <Stack
                  key={goal.id}
                  spacing={0.75}
                  sx={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Box sx={{ color, display: "inline-flex" }}>
                    <BrandIcon name={goal.glyph ?? "goal"} size={13} />
                  </Box>
                  <Typography sx={{ fontSize: 11, fontWeight: 600, minWidth: 64, flexShrink: 0 }} noWrap>
                    {goal.title}
                  </Typography>
                  <Box sx={{ flex: 1, height: 5, borderRadius: 3, bgcolor: alpha(color, 0.16), overflow: "hidden" }}>
                    <Box sx={{ width: `${pct}%`, height: "100%", bgcolor: color, transition: "width 250ms ease" }} />
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      )}

      {!selectedProject && (
        <Typography variant="caption" color="text.secondary">
          No project selected
        </Typography>
      )}
    </Box>
  );
}
