"use client";

/**
 * GoalLinkCard — one instance of the reusable **LinkCard** pattern.
 *
 * A LinkCard is a compact, expandable card representing ONE relationship
 * (edge) between two entities. Collapsed, it is a single dense row (avatar +
 * title + key badges + weight). Expanded, it reveals the editable controls
 * (weight, depth), free-text `instructions`, and an "Associations" row of
 * chips/badges (each with a tooltip, optionally an asset thumbnail).
 *
 * This same pattern is intended for any edge in the system (Asset↔Scene,
 * Scene↔Sequence, Quest↔Goal in planning, …) — only the body controls differ.
 *
 * Real images: the avatar and badges render an <img> when an `imageUrl`
 * exists, falling back to the entity's emoji symbol. No raster assets ship
 * with the repo today, so the emoji fallback is what you normally see.
 */

import { useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Collapse,
  IconButton,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  DEPTH_TIERS,
  DEPTH_TIER_HINT,
  type LinkBadge,
  type ResolvedGoalLink,
} from "../model/types";
import { DepthDots, WeightMeter, weightColor } from "./visuals";
import { BrandIcon } from "./BrandIcon";

const BRAND_FONT = "Xpens, Roboto, sans-serif";

export interface GoalLinkCardProps {
  link: ResolvedGoalLink;
  /** When false, controls are read-only (e.g. in a preview). */
  editable?: boolean;
  /** Start expanded (defaults to collapsed for compactness). */
  defaultExpanded?: boolean;
  onWeightChange?: (weight: number) => void;
  onDepthChange?: (depth: number) => void;
  onInstructionsChange?: (instructions: string) => void;
}

const TONE_COLOR: Record<
  NonNullable<LinkBadge["tone"]>,
  "default" | "info" | "success" | "warning"
> = {
  default: "default",
  info: "info",
  success: "success",
  warning: "warning",
};

/** One association rendered as a chip + tooltip (+ optional asset thumbnail). */
function BadgeChip({ badge }: { badge: LinkBadge }) {
  const chip = (
    <Chip
      size="small"
      variant="outlined"
      color={badge.tone ? TONE_COLOR[badge.tone] : "default"}
      avatar={
        badge.imageUrl ? (
          <Avatar src={badge.imageUrl} alt="" />
        ) : badge.glyph ? (
          <Avatar sx={{ bgcolor: "transparent" }}>
            <BrandIcon name={badge.glyph} size={15} />
          </Avatar>
        ) : badge.symbol ? (
          <Avatar sx={{ bgcolor: "transparent", fontSize: 13 }}>
            {badge.symbol}
          </Avatar>
        ) : undefined
      }
      label={badge.label}
      sx={{ maxWidth: 220 }}
    />
  );
  return badge.tooltip ? (
    <Tooltip title={badge.tooltip} arrow>
      {chip}
    </Tooltip>
  ) : (
    chip
  );
}

export function GoalLinkCard({
  link,
  editable = true,
  defaultExpanded = false,
  onWeightChange,
  onDepthChange,
  onInstructionsChange,
}: GoalLinkCardProps) {
  const { goal, weight, depth, inherited, instructions, associations } = link;
  const [open, setOpen] = useState(defaultExpanded);

  const depthLabel = DEPTH_TIERS[depth] ?? String(depth);

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        bgcolor: inherited ? "#fafafa" : "#f5f5f5",
        border: "1px solid",
        borderColor: inherited ? "#eee" : "#e0e0e0",
        opacity: inherited ? 0.9 : 1,
        overflow: "hidden",
        // left accent strip encodes importance at a glance
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          bgcolor: weightColor(weight),
          opacity: inherited ? 0.5 : 1,
        },
      }}
    >
      {/* ── Collapsed header: one dense row ─────────────────────────────── */}
      <Stack
        spacing={1}
        onClick={() => setOpen((v) => !v)}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          px: 1,
          py: 0.75,
          cursor: "pointer",
          "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
        }}
      >
        <Avatar
          variant="rounded"
          src={goal.imageUrl}
          sx={{
            width: 30,
            height: 30,
            fontSize: 16,
            bgcolor: goal.imageUrl ? "transparent" : "#eef2f7",
            color: "#3a4a5e",
          }}
        >
          {goal.glyph ? (
            <BrandIcon name={goal.glyph} size={18} />
          ) : (
            goal.symbol ?? <BrandIcon name="goal" size={18} />
          )}
        </Avatar>

        <Typography
          sx={{
            fontFamily: BRAND_FONT,
            fontWeight: 700,
            fontSize: 14,
            flex: 1,
            minWidth: 0,
          }}
          noWrap
        >
          {goal.title}
        </Typography>

        {goal.focusArea && (
          <Chip
            label={goal.focusArea}
            size="small"
            variant="outlined"
            sx={{ height: 20 }}
          />
        )}

        {inherited && (
          <Tooltip title="Inherited from the parent sequence" arrow>
            <Chip
              label="inherited"
              size="small"
              sx={{ height: 20, fontStyle: "italic" }}
            />
          </Tooltip>
        )}

        <DepthDots depth={depth} />
        <WeightMeter weight={weight} />

        {(instructions || (associations && associations.length > 0)) && (
          <Tooltip title="Has notes / associations" arrow>
            <Box component="span" sx={{ display: "inline-flex", color: "text.secondary" }}>
              <BrandIcon name="link" size={14} />
            </Box>
          </Tooltip>
        )}

        <IconButton
          size="small"
          aria-label={open ? "collapse" : "expand"}
          sx={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 150ms ease",
          }}
        >
          <ExpandMoreIcon fontSize="small" />
        </IconButton>
      </Stack>

      {/* ── Expanded body ───────────────────────────────────────────────── */}
      <Collapse in={open} unmountOnExit>
        <Box
          sx={{
            px: 1.25,
            pb: 1.25,
            pt: 0.5,
            borderTop: "1px solid",
            borderColor: "rgba(0,0,0,0.06)",
          }}
        >
          <Stack
            spacing={2}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              mt: 1,
            }}
          >
            <Box sx={{ flex: "1 1 200px", minWidth: 160 }}>
              <Typography variant="caption" color="text.secondary">
                Weight · {weight}
              </Typography>
              <Slider
                size="small"
                value={weight}
                min={0}
                max={100}
                disabled={!editable}
                onChange={(_, v) => onWeightChange?.(v as number)}
                aria-label="weight"
              />
            </Box>

            <Box>
              <Tooltip title={DEPTH_TIER_HINT} arrow placement="top">
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block" }}
                >
                  Depth · {depthLabel}
                </Typography>
              </Tooltip>
              <ToggleButtonGroup
                size="small"
                exclusive
                value={depth}
                disabled={!editable}
                onChange={(_, v) => v && onDepthChange?.(v as number)}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((tier) => (
                  <ToggleButton
                    key={tier}
                    value={tier}
                    sx={{ px: 1.1, py: 0.2 }}
                  >
                    {tier}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Stack>

          {/* Instructions */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1.5, mb: 0.5 }}
          >
            Additional instructions
          </Typography>
          {editable ? (
            <TextField
              value={instructions ?? ""}
              placeholder="How should this goal shape generation here?"
              multiline
              minRows={2}
              fullWidth
              size="small"
              onChange={(e) => onInstructionsChange?.(e.target.value)}
              sx={{ bgcolor: "#ffffff" }}
            />
          ) : (
            <Typography
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", color: instructions ? "text.primary" : "text.disabled" }}
            >
              {instructions || "No additional instructions."}
            </Typography>
          )}

          {/* Associations */}
          {associations && associations.length > 0 && (
            <>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1.5, mb: 0.5 }}
              >
                Associations
              </Typography>
              <Stack
                spacing={0.75}
                useFlexGap
                sx={{ flexDirection: "row", flexWrap: "wrap" }}
              >
                {associations.map((b, i) => (
                  <BadgeChip key={i} badge={b} />
                ))}
              </Stack>
            </>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}
