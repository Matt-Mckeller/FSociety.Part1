"use client";

import { Box, Tooltip, Typography, alpha } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  INCLUDED_CAST_META,
  TARGET_ROLE_META,
  type Target,
  type TargetRole,
} from "@4eye/types";
import { Symbol } from "../symbols";
import { AimReticle } from "./CastMarks";

export const ROLE_RADIUS: Record<TargetRole, string> = {
  actor: "20px 6px 6px 20px",
  target: "6px 20px 20px 6px",
};

export const AUDIENCE_RADIUS = "8px";

/** How strongly a chip claims the cursor. */
export type TargetingEmphasis = "primary" | "aim" | "include";

interface TargetingChipProps {
  target: Target;
  role: TargetRole;
  /** When true, render as a small glyph (used in add-poppers). */
  compact?: boolean;
  /** Glyph + name. Default on for assigned slots. */
  labeled?: boolean;
  /**
   * Visual weight of the assignment.
   * `primary` is the cursor. `aim` is a directed action. `include`
   * rides along without being the focus.
   */
  emphasis?: TargetingEmphasis;
  onSelect?: () => void;
  onRemove?: () => void;
  selected?: boolean;
}

/**
 * Role-shaped chip for an Actor, Aim, or included target.
 * Actors read left-heavy (who acts). Aimed chips carry a reticle
 * (directed action). Included chips are quieter — no cursor.
 */
export function TargetingChip({
  target,
  role,
  compact = false,
  labeled,
  emphasis,
  onSelect,
  onRemove,
  selected = false,
}: TargetingChipProps) {
  const include = emphasis === "include";
  const meta = include ? INCLUDED_CAST_META : TARGET_ROLE_META[role];
  const showLabel = labeled ?? !compact;
  const radius = include ? AUDIENCE_RADIUS : ROLE_RADIUS[role];
  const primary = emphasis === "primary";
  const aimed = role === "target" && !include;
  const color = meta.color;

  return (
    <Tooltip title={target.name} placement="top" disableHoverListener={showLabel}>
      <Box
        onClick={onSelect}
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          maxWidth: showLabel ? 168 : 36,
          minHeight: showLabel ? 32 : 28,
          px: showLabel ? 1.15 : 0.35,
          py: showLabel ? 0.55 : 0.25,
          cursor: onSelect ? "pointer" : "default",
          borderRadius: radius,
          border: primary ? "2px solid" : include ? "1.5px dashed" : "1.5px solid",
          borderColor: selected || primary ? color : alpha(color, include ? 0.4 : 0.45),
          bgcolor: alpha(color, selected || primary ? 0.22 : include ? 0.06 : 0.12),
          transition: "transform 120ms ease, border-color 120ms ease, background-color 120ms ease",
          "&:hover": onSelect
            ? { transform: "translateY(-1px)", borderColor: color, bgcolor: alpha(color, 0.2) }
            : undefined,
        }}
      >
        {aimed && (
          <AimReticle
            sx={{
              fontSize: primary ? 13 : 11,
              color,
              opacity: primary ? 1 : 0.78,
              flexShrink: 0,
            }}
          />
        )}
        <Symbol name={target.symbol} color={target.symbolColor} size={showLabel ? 16 : 22} variant="ghost" />
        {showLabel && (
          <Typography
            noWrap
            sx={{
              fontSize: "0.68rem",
              fontWeight: primary ? 800 : 700,
              color,
              lineHeight: 1.1,
              pr: onRemove ? 0.6 : 0.15,
            }}
          >
            {target.name}
          </Typography>
        )}
        {onRemove && (
          <Box
            role="button"
            aria-label={`Remove ${target.name}`}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              onRemove();
            }}
            sx={{
              position: "absolute",
              top: -5,
              right: -5,
              width: 14,
              height: 14,
              borderRadius: "50%",
              bgcolor: "background.paper",
              border: `1px solid ${color}`,
              color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 120ms ease, background-color 120ms ease",
              "&:hover": {
                transform: "scale(1.12)",
                bgcolor: color,
                color: "#fff",
              },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 9 }} />
          </Box>
        )}
      </Box>
    </Tooltip>
  );
}
