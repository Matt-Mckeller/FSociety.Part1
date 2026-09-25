"use client";

/**
 * InputTypePicker — choose how material enters a learning session.
 *
 * 2×2 of user inputs (text, voice, image, link), then Template as a
 * longer thin smile along the bottom. Auto-imported Optimally Relevant
 * Context sits under that, independent of the user grid.
 */

import * as React from "react";
import { Box, Tooltip, Typography, alpha } from "@mui/material";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import { COLOR_MAP } from "@4eye/types";

import {
  LEARNING_INPUT_TYPE_META,
  type LearningInputType,
} from "../model/types";
import { useLearning } from "../store/LearningProvider";
import { InputTypeIcon } from "./InputTypeIcon";

const GRID_INPUT_TYPES: LearningInputType[] = ["text", "voice", "image", "link"];

const ORC_ACCENT = COLOR_MAP.purple;
const ORC_TOOLTIP =
  "Auto-imported input — optimally relevant context, or all relevant context depending on availability and system coins.";

function UserInputChip({
  id,
  smile = false,
}: {
  id: LearningInputType;
  smile?: boolean;
}) {
  const { session, dispatch } = useLearning();
  const meta = LEARNING_INPUT_TYPE_META[id];
  const accent = COLOR_MAP[meta.accent];
  const active = session.inputType === id;

  return (
    <Tooltip title={meta.blurb} arrow>
      <Box
        role="button"
        tabIndex={0}
        aria-pressed={active}
        onClick={() => dispatch({ type: "set-input-type", inputType: id })}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            dispatch({ type: "set-input-type", inputType: id });
          }
        }}
        sx={{
          cursor: "pointer",
          width: "100%",
          height: smile ? 28 : 36,
          px: 1,
          borderRadius: smile ? "10px 10px 50% 50% / 8px 8px 100% 100%" : 1.5,
          border: `1.5px solid ${active ? accent : alpha(accent, 0.28)}`,
          bgcolor: active ? alpha(accent, 0.12) : "transparent",
          transition: "all 120ms ease",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.6,
          "&:hover": { bgcolor: alpha(accent, 0.08) },
          "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 2 },
        }}
      >
        <InputTypeIcon name={meta.icon} sx={{ fontSize: 16, color: accent }} />
        <Typography sx={{ fontWeight: 800, fontSize: 12, lineHeight: 1, color: "text.primary" }}>
          {meta.label}
        </Typography>
      </Box>
    </Tooltip>
  );
}

function AutoImportChip() {
  const { session, dispatch } = useLearning();
  const on = session.autoImportContext;
  const title = on
    ? ORC_TOOLTIP
    : "Auto-import is off. Only named chips you turn on will ride with you.";

  return (
    <Tooltip title={title} arrow>
      <Box
        role="button"
        tabIndex={0}
        aria-pressed={on}
        onClick={() => dispatch({ type: "toggle-auto-import" })}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            dispatch({ type: "toggle-auto-import" });
          }
        }}
        sx={{
          cursor: "pointer",
          height: 26,
          px: 1,
          borderRadius: 1.5,
          border: `1.5px solid ${on ? ORC_ACCENT : alpha(ORC_ACCENT, 0.28)}`,
          bgcolor: on ? alpha(ORC_ACCENT, 0.12) : "transparent",
          transition: "all 120ms ease",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.6,
          "&:hover": { bgcolor: alpha(ORC_ACCENT, on ? 0.18 : 0.08) },
          "&:focus-visible": { outline: `2px solid ${ORC_ACCENT}`, outlineOffset: 2 },
        }}
      >
        <AutoAwesomeRounded sx={{ fontSize: 16, color: ORC_ACCENT }} />
        <Typography sx={{ fontWeight: 800, fontSize: 12, lineHeight: 1, color: "text.primary" }}>
          Optimally Relevant Context
        </Typography>
      </Box>
    </Tooltip>
  );
}

export function InputTypePicker() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0.75,
        }}
      >
        {GRID_INPUT_TYPES.map((id) => (
          <UserInputChip key={id} id={id} />
        ))}
        <Box sx={{ gridColumn: "1 / -1" }}>
          <UserInputChip id="template" smile />
        </Box>
      </Box>
      <Typography
        variant="caption"
        sx={{
          fontSize: 9.5,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "text.secondary",
        }}
      >
        Auto-imported
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
        <AutoImportChip />
      </Box>
    </Box>
  );
}
