"use client";

/**
 * ActionGlyph — a resolved loadout action rendered as action-bar chrome
 * (mirrors the Character EquippedActionsBar button) with a mode-aware lens
 * glyph and an optional quality badge.
 */

import * as React from "react";
import { Box, Tooltip, Typography, alpha } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Lens, getLens } from "@expanse/lens";

import { SpellGlyph, hasSpellGlyph } from "@4eye/web/Tiles/spellbook/components/SpellGlyphs";
import { StatusTargetMark } from "@4eye/web/Tiles/character/components/StatusTargetMark";
import { QualityBadge } from "./QualityBadge";
import type { ResolvedAction } from "../model/types";

function ActionMark({
  action,
  size,
}: {
  action: ResolvedAction;
  size: number;
}) {
  if (action.ref.kind === "status") {
    return <StatusTargetMark target={action.ref.target} size={size} />;
  }
  if (action.ref.kind === "spell" && hasSpellGlyph(action.ref.spellId)) {
    return <SpellGlyph id={action.ref.spellId} size={size} title={action.name} />;
  }
  const lensDef = getLens(action.lensId);
  return <Lens id={action.lensId} size={size} motion={lensDef?.motion ?? "steady"} animated />;
}

export function ActionGlyph({
  action,
  onClick,
  onRemove,
  compact,
  wash = false,
  fillColor,
}: {
  action: ResolvedAction;
  onClick?: () => void;
  /** Shows a hover "×" that removes/clears the action. */
  onRemove?: () => void;
  /** Round 44px cell (swipe rose) instead of the 72px bar button. */
  compact?: boolean;
  /** Soft family wash — Engine modes tint the cell in the action's own hue. */
  wash?: boolean;
  fillColor?: string;
}) {
  const color = fillColor ?? action.color;

  if (compact) {
    return (
      <Tooltip title={action.hint ?? action.name} arrow>
        <Box
          component="button"
          onClick={onClick}
          sx={{
            appearance: "none",
            cursor: onClick ? "pointer" : "default",
            width: 44,
            height: 44,
            p: 0,
            borderRadius: "50%",
            border: `1.5px solid ${alpha(color, wash ? 0.32 : 0.45)}`,
            bgcolor: alpha(color, wash ? 0.14 : 0.1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            color,
            "&:hover": wash ? { bgcolor: alpha(color, 0.22) } : undefined,
          }}
        >
          <ActionMark action={action} size={22} />
          {action.quality && (
            <Box sx={{ position: "absolute", top: -3, right: -3 }}>
              <QualityBadge tier={action.quality} size={9} />
            </Box>
          )}
        </Box>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={action.hint ?? action.name} arrow>
      <Box
        component="button"
        onClick={onClick}
        sx={{
          appearance: "none",
          cursor: onClick ? "pointer" : "default",
          width: 72,
          p: 1,
          borderRadius: 2,
          border: `1px solid ${alpha(color, wash ? 0.28 : 0.35)}`,
          bgcolor: alpha(color, wash ? 0.12 : 0.08),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          position: "relative",
          transition: "background-color 150ms ease, transform 100ms ease",
          "&:hover": { bgcolor: alpha(color, wash ? 0.18 : 0.16) },
          "&:active": { transform: onClick ? "scale(0.96)" : "none" },
          "&:hover .loadout-remove": { opacity: 1 },
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(color, wash ? 0.2 : 0.16),
            color,
          }}
        >
          <ActionMark action={action} size={22} />
        </Box>
        <Typography
          variant="caption"
          sx={{ fontWeight: 800, color, lineHeight: 1.1, whiteSpace: "nowrap" }}
        >
          {action.name}
        </Typography>
        {action.quality && (
          <Box sx={{ position: "absolute", top: 4, left: 4 }}>
            <QualityBadge tier={action.quality} size={10} />
          </Box>
        )}
        {onRemove && (
          <Box
            className="loadout-remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            sx={{
              position: "absolute",
              top: -6,
              right: -6,
              width: 18,
              height: 18,
              borderRadius: "50%",
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 120ms ease",
              cursor: "pointer",
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 12, color: "text.secondary" }} />
          </Box>
        )}
      </Box>
    </Tooltip>
  );
}

/** Dashed empty slot placeholder matching ActionGlyph dimensions. */
export function EmptySlot({
  onClick,
  compact,
  label = "Assign",
}: {
  onClick?: () => void;
  compact?: boolean;
  label?: string;
}) {
  return (
    <Tooltip title={label} arrow>
      <Box
        component="button"
        onClick={onClick}
        sx={{
          appearance: "none",
          cursor: onClick ? "pointer" : "default",
          width: compact ? 44 : 72,
          height: compact ? 44 : 76,
          borderRadius: compact ? "50%" : 2,
          border: "1.5px dashed",
          borderColor: "divider",
          bgcolor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "text.disabled",
          fontSize: 18,
          fontWeight: 600,
          transition: "border-color 120ms ease, color 120ms ease",
          "&:hover": { borderColor: "text.secondary", color: "text.secondary" },
        }}
      >
        +
      </Box>
    </Tooltip>
  );
}
