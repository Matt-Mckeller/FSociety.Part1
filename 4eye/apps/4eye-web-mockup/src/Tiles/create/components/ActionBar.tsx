"use client";

/**
 * ActionBar — take actions on a Scene or Sequence: promote its status and run
 * generation, either broadly or directed at a particular goal. Every action is
 * recorded into the entity's version history (see CreateProvider `act` /
 * `promote`). Goal-directed generation is offered as a menu of the item's
 * resolved goals so you can push effort "toward a particular goal".
 */

import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";

import {
  NEXT_STATUS,
  STATUS_LABEL,
  type ResolvedGoalLink,
  type SeedStatus,
} from "../model/types";
import { BrandIcon } from "./BrandIcon";
import { InfoChip, weightColor } from "./visuals";
import type { GlyphName } from "./brand-glyphs";

const BRAND_FONT = "Xpens, Roboto, sans-serif";

/** Compact icon-only action with a tooltip — used for secondary actions. */
function IconAction({
  title,
  glyph,
  color,
  onClick,
  disabled,
}: {
  title: string;
  glyph: GlyphName;
  color: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}) {
  return (
    <Tooltip title={title} arrow>
      <span>
        <IconButton
          size="small"
          onClick={onClick}
          disabled={disabled}
          sx={{
            width: 30,
            height: 30,
            borderRadius: 1.5,
            border: `1px solid ${alpha(color, 0.33)}`,
            color,
            "&:hover": { bgcolor: alpha(color, 0.08) },
            "&.Mui-disabled": { opacity: 0.4 },
          }}
        >
          <BrandIcon name={glyph} size={16} color="currentColor" />
        </IconButton>
      </span>
    </Tooltip>
  );
}

export interface ActionBarProps {
  status: SeedStatus;
  /** Resolved goals on the target — offered for goal-directed generation. */
  goals: ResolvedGoalLink[];
  version?: number;
  onPromote: (to: SeedStatus) => void;
  onGenerate: () => void;
  onGenerateForGoal: (goalId: string, goalTitle: string) => void;
  /** When provided, shows a “Send & run” primary that hands context to chat. */
  onSendToChat?: () => void;
}

export function ActionBar({
  status,
  goals,
  version,
  onPromote,
  onGenerate,
  onGenerateForGoal,
  onSendToChat,
}: ActionBarProps) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const next = NEXT_STATUS[status];

  return (
    <Stack
      spacing={0.75}
      useFlexGap
      sx={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}
    >
      {/* PRIMARY — Generate */}
      <Tooltip title="Generate a take for this scene" arrow>
        <Button
          size="small"
          variant="contained"
          disableElevation
          onClick={onGenerate}
          startIcon={<BrandIcon name="generate" size={16} color="#fff" />}
          sx={{
            fontFamily: BRAND_FONT,
            textTransform: "none",
            fontWeight: 700,
            px: 1.5,
            bgcolor: "#2c4f76",
            "&:hover": { bgcolor: "#22405f" },
          }}
        >
          Generate
        </Button>
      </Tooltip>

      {onSendToChat && (
        <Tooltip title="Send this scene + context to 4eye chat and run it" arrow>
          <Button
            size="small"
            variant="contained"
            disableElevation
            onClick={onSendToChat}
            startIcon={<BrandIcon name="perspective" size={16} color="#fff" />}
            sx={{
              fontFamily: BRAND_FONT,
              textTransform: "none",
              fontWeight: 700,
              px: 1.5,
              bgcolor: "#7c3aed",
              "&:hover": { bgcolor: "#6a2fd0" },
            }}
          >
            Send & run
          </Button>
        </Tooltip>
      )}

      <Divider orientation="vertical" flexItem sx={{ mx: 0.25, my: 0.5 }} />

      {/* SECONDARY — icon-only, tooltip-backed */}
      <IconAction
        title={goals.length ? "Generate toward a particular goal" : "No goals linked"}
        glyph="goal"
        color="#2c4f76"
        disabled={goals.length === 0}
        onClick={(e) => setAnchor(e.currentTarget)}
      />
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        {goals.map((g) => (
          <MenuItem
            key={g.goalId}
            onClick={() => {
              onGenerateForGoal(g.goalId, g.goal.title);
              setAnchor(null);
            }}
          >
            <Stack
              spacing={1}
              sx={{ flexDirection: "row", alignItems: "center", minWidth: 200 }}
            >
              {g.goal.glyph && (
                <BrandIcon name={g.goal.glyph} size={16} color={weightColor(g.weight)} />
              )}
              <Typography sx={{ fontFamily: BRAND_FONT, flex: 1 }}>
                {g.goal.title}
              </Typography>
              <Chip
                label={g.weight}
                size="small"
                sx={{ height: 18, bgcolor: weightColor(g.weight), color: "#fff" }}
              />
            </Stack>
          </MenuItem>
        ))}
      </Menu>

      {next && (
        <IconAction
          title={`Promote to ${STATUS_LABEL[next]}`}
          glyph={next === "live" ? "live" : "promote"}
          color="#2e7d32"
          onClick={() => onPromote(next)}
        />
      )}

      <Box sx={{ ml: "auto" }} />

      {version !== undefined && (
        <InfoChip
          label={`v${version}`}
          tooltip="Current version — bumps on every recorded change"
          glyph="history"
          color="#64748b"
        />
      )}
    </Stack>
  );
}
