"use client";

/**
 * LearningChecklist — the concrete steps for the current session.
 *
 * Each item is a toggleable checkbox with an optional hint. A header shows
 * overall completion.
 */

import * as React from "react";
import {
  Box,
  Checkbox,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRounded from "@mui/icons-material/RadioButtonUncheckedRounded";

import { useLearning } from "../store/LearningProvider";

export function LearningChecklist() {
  const { session, progress, dispatch } = useLearning();
  const pct = Math.round(progress * 100);

  if (session.checklist.length === 0) {
    return (
      <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
        No steps yet — they appear once you start a session.
      </Typography>
    );
  }

  return (
    <Stack spacing={1}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LinearProgress
          variant="determinate"
          value={pct}
          sx={{ flex: 1, height: 6, borderRadius: 3 }}
        />
        <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
          {pct}%
        </Typography>
      </Box>
      {session.checklist.map((item) => (
        <Box
          key={item.id}
          sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}
        >
          <Checkbox
            checked={item.done}
            onChange={() => dispatch({ type: "toggle-checklist", id: item.id })}
            icon={<RadioButtonUncheckedRounded />}
            checkedIcon={<CheckCircleRounded />}
            sx={{ p: 0.5, mt: -0.25 }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                textDecoration: item.done ? "line-through" : "none",
                color: item.done ? "text.secondary" : "text.primary",
              }}
            >
              {item.label}
            </Typography>
            {item.hint && (
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {item.hint}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
