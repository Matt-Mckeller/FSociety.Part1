"use client";

/**
 * Command Center — EntityRow.
 *
 * The shared list-row presentation for a planning entity. Shows symbol, name,
 * optional summary, narrative/PM rank, and a metric strip (status / weight /
 * depth / estimate), with an Inspect affordance. Used by the Quests, Sprint,
 * and Priorities views so the visual language is identical everywhere.
 */

import * as React from "react";
import { Box, Chip, Stack, Tooltip, Typography, alpha, useTheme } from "@mui/material";
import { Symbol } from "@4eye/features";
import { getTrait, rankLabel, type Entity, type WorkPayload } from "@4eye/types";

import { useCommandCenter } from "../store/CommandCenterProvider";
import {
  WeightMeter,
  DepthDots,
  StatusBadge,
  ProgressOrb,
} from "../../entity-tile/components/slot-visuals";
import { InspectButton, pointsOf, summaryOf } from "./EntityControls";
import { EntityTypeGlyph } from "./planning-glyphs";

const TYPE_LABEL: Record<string, string> = {
  legend:    "Legend",
  campaign:  "Campaign",
  storyline: "Storyline",
  quest:     "Quest",
  objective: "Objective",
  action:    "Action",
  priority:  "Priority",
  process:   "Process",
  work:      "Work Item",
};

function typeLabel(type: string) {
  return TYPE_LABEL[type] ?? type.charAt(0).toUpperCase() + type.slice(1);
}

export interface EntityRowProps {
  entity: Entity;
  /** Indentation depth (hierarchy nesting). */
  indent?: number;
  /** Show the one-line summary under the name. */
  showSummary?: boolean;
  /** Show the structural EntityTypeGlyph before the symbol. Default true. */
  showTypeGlyph?: boolean;
  /** Extra controls rendered on the right (before Inspect). */
  trailing?: React.ReactNode;
  /** Optional left-side adornment (e.g. a disclosure caret). */
  leading?: React.ReactNode;
}

export function EntityRow({
  entity,
  indent = 0,
  showSummary = true,
  showTypeGlyph = true,
  trailing,
  leading,
}: EntityRowProps) {
  const theme = useTheme();
  const { state, inspect } = useCommandCenter();

  const status = getTrait(entity.traits, "status")?.value;
  const weight = getTrait(entity.traits, "weight")?.value;
  const depth = getTrait(entity.traits, "depth")?.value;
  const progress = getTrait(entity.traits, "progress");
  const points = pointsOf(entity);
  const summary = summaryOf(entity);
  const work = entity.meta?.work as WorkPayload | undefined;
  const rankText = work ? rankLabel(work.rank, state.viewMode) : undefined;
  const badge = typeof entity.meta?.badge === "string" ? entity.meta.badge : undefined;

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        pl: 1 + indent * 4,
        pr: 1,
        py: 0.85,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        transition: "border-color 140ms ease, background-color 140ms ease",
        "&:hover": {
          borderColor: alpha(theme.palette.primary.main, 0.4),
          bgcolor: alpha(theme.palette.primary.main, 0.03),
        },
      }}
    >
      {leading}
      {showTypeGlyph && (
        <Tooltip title={typeLabel(entity.type)} placement="top" arrow>
          <Box sx={{ display: "flex", flexShrink: 0, color: "text.disabled" }}>
            <EntityTypeGlyph type={entity.type} size={14} />
          </Box>
        </Tooltip>
      )}
      {/* Entity symbol — content identity (what it's about) */}
      {entity.symbol && (
        <Tooltip title={entity.symbol} placement="top" arrow>
          <Box sx={{ display: "flex", flexShrink: 0 }}>
            <Symbol name={entity.symbol} color={entity.symbolColor ?? "slate"} size={20} />
          </Box>
        </Tooltip>
      )}

      <Box
        sx={{ flex: 1, minWidth: 0, cursor: "pointer" }}
        onClick={() => inspect(entity.id)}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {entity.name}
          </Typography>
          {rankText && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                textTransform: "capitalize",
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {rankText}
            </Typography>
          )}
          {badge && (
            <Chip
              label={badge}
              size="small"
              sx={{
                height: 16,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 0.3,
                textTransform: "uppercase",
                bgcolor: "error.dark",
                color: "error.contrastText",
                flexShrink: 0,
                "& .MuiChip-label": { px: 0.75 },
              }}
            />
          )}
        </Stack>
        {showSummary && summary && (
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {summary}
          </Typography>
        )}
      </Box>

      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          flexShrink: 0,
        }}
      >
        {status && <StatusBadge status={status} />}
        {progress && <ProgressOrb progress={progress} />}
        {weight != null && <WeightMeter weight={weight} width={56} />}
        {depth != null && <DepthDots depth={depth} size={6} />}
        {points != null && (
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color: "text.secondary", minWidth: 28, textAlign: "right" }}
          >
            {points}p
          </Typography>
        )}
        {trailing}
        <InspectButton entity={entity} />
      </Stack>
    </Stack>
  );
}
