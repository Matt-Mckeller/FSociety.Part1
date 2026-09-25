"use client";

/**
 * ChipShapePicker — pick the silhouette used for the selection chips that
 * appear in the ContextBar tab once something is selected.
 *
 * The chips read as tiny badges rather than icons, so which silhouette works
 * is a judgement that is far easier to make against live data than in the
 * abstract. Each option is drawn with the real `ShapeChip` atom — outline for
 * the unselected options, filled for the current one — so the row is a
 * preview, not a legend.
 */

import { Box, Tooltip, Typography } from "@mui/material";
import {
  CHIP_SHAPES,
  CHIP_SHAPE_GEOMETRY,
  ShapeChip,
  type ChipShape,
} from "@expanse/brand-core";

import { usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";

/** Outline tint for the options that aren't current — `ShapeChip` appends
 *  its own `cc` alpha, so this needs to be a 6-digit hex. */
const UNSELECTED_HEX = "#8d93a1";

const GOAL_CHIP_SHAPE_KEY = "4eye.aiChat.goalChipShape";

/**
 * The goal-chip silhouette, remembered across sessions.
 *
 * `usePersistedChoice` is per-instance, so this must have a single owner —
 * the ContextBar registrar holds it and hands it to the panel it renders.
 */
export function useGoalChipShape() {
  return usePersistedChoice<ChipShape>(
    GOAL_CHIP_SHAPE_KEY,
    "triangle",
    CHIP_SHAPES,
  );
}

interface ChipShapePickerProps {
  value: ChipShape;
  onChange: (shape: ChipShape) => void;
  /** Tint for the selected option. */
  accent: string;
  label?: string;
}

export function ChipShapePicker({
  value,
  onChange,
  accent,
  label = "Outer shape",
}: ChipShapePickerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1.5,
        py: 1,
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: "rgba(255,255,255,0.45)",
          letterSpacing: 0.6,
          textTransform: "uppercase",
          fontSize: 9.5,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {label}
      </Typography>
      <Box
        role="radiogroup"
        aria-label={label}
        sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: "auto" }}
      >
        {CHIP_SHAPES.map((shape) => {
          const selected = shape === value;
          return (
            <Tooltip key={shape} title={CHIP_SHAPE_GEOMETRY[shape].label} arrow>
              <Box
                role="radio"
                aria-checked={selected}
                aria-label={CHIP_SHAPE_GEOMETRY[shape].label}
                tabIndex={0}
                onClick={() => onChange(shape)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(shape);
                  }
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // Sized for a `big` chip (26px at its widest) plus breathing
                  // room — at `small` the dashed outlines mush together and a
                  // hexagon stops being distinguishable from a circle.
                  width: 32,
                  height: 30,
                  borderRadius: 1,
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: selected ? `${accent}66` : "transparent",
                  bgcolor: selected ? `${accent}1f` : "transparent",
                  transition: "background-color 120ms, border-color 120ms",
                  "&:hover": {
                    bgcolor: selected ? `${accent}2b` : "rgba(255,255,255,0.05)",
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${accent}`,
                    outlineOffset: 1,
                  },
                }}
              >
                <ShapeChip
                  shape={shape}
                  scale="big"
                  filled={selected}
                  hex={selected ? accent : UNSELECTED_HEX}
                />
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
