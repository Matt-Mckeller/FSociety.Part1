"use client";

/**
 * Command Center — Docs view.
 *
 * The reference/codex surface: recorded Decisions (with reasoning +
 * confidence) and the running list of Open Questions (with status and any
 * resolved answer). This is the "why we chose what we chose" record that keeps
 * the planning legible over time. Read-only.
 */

import * as React from "react";
import { Box, Chip, Stack, Typography, alpha, useTheme } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import {
  DECISIONS,
  OPEN_QUESTIONS,
  type DecisionConfidence,
} from "../../store/strategy-data";
import { CodexGlyph } from "../planning-glyphs";
import { Panel } from "./shared";

const CONFIDENCE_HEX: Record<DecisionConfidence, string> = {
  high: "#09c577", // green
  medium: "#e0911f", // amber
  low: "#f91a4b", // red
};

const QUESTION_HEX: Record<string, string> = {
  open: "#64748b",
  exploring: "#3b82f6",
  answered: "#09c577",
};

export function DocsView() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gap: 1.5,
        gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
        alignItems: "start",
        height: "100%",
        minHeight: 0,
      }}
    >
      {/* Decisions */}
      <Panel
        title="Decisions"
        fill
        glyph={
          <Box sx={{ color: "primary.main", display: "flex" }}>
            <CodexGlyph size={18} />
          </Box>
        }
        action={<Chip size="small" label={DECISIONS.length} sx={{ fontWeight: 700 }} />}
      >
        <Stack spacing={1.25}>
          {DECISIONS.map((d) => (
            <Box
              key={d.id}
              sx={{
                p: 1.25,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0.75,
                  flexWrap: "wrap",
                  mb: 0.25,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 800, flex: 1, minWidth: 0 }}>
                  {d.title}
                </Typography>
                <Chip
                  size="small"
                  label={`${d.confidence} confidence`}
                  sx={{
                    height: 18,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "capitalize",
                    bgcolor: alpha(CONFIDENCE_HEX[d.confidence], 0.14),
                    color: CONFIDENCE_HEX[d.confidence],
                  }}
                />
              </Stack>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {d.decision}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                {d.reasoning}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.disabled", display: "block", mt: 0.5 }}>
                {d.category} · {d.decidedOn}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Panel>

      {/* Questions */}
      <Panel
        title="Questions"
        fill
        glyph={
          <Box sx={{ color: "primary.main", display: "flex" }}>
            <CodexGlyph size={18} />
          </Box>
        }
        action={<Chip size="small" label={OPEN_QUESTIONS.length} sx={{ fontWeight: 700 }} />}
      >
        <Stack spacing={1.25}>
          {OPEN_QUESTIONS.map((q) => (
            <Box
              key={q.id}
              sx={{
                p: 1.25,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0.75,
                  flexWrap: "wrap",
                  mb: 0.25,
                }}
              >
                <Chip
                  size="small"
                  label={q.status}
                  sx={{
                    height: 18,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "capitalize",
                    bgcolor: alpha(QUESTION_HEX[q.status] ?? "#64748b", 0.14),
                    color: QUESTION_HEX[q.status] ?? "#64748b",
                  }}
                />
                <Typography variant="subtitle2" sx={{ fontWeight: 800, flex: 1, minWidth: 0 }}>
                  {q.question}
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                {q.context}
              </Typography>
              {q.answer && (
                <Stack
                  sx={{ flexDirection: "row", alignItems: "flex-start", gap: 0.5, mt: 0.75 }}
                >
                  <CheckCircleRoundedIcon
                    sx={{ fontSize: 15, color: theme.palette.success.main, mt: 0.1 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                    {q.answer}
                  </Typography>
                </Stack>
              )}
            </Box>
          ))}
        </Stack>
      </Panel>
    </Box>
  );
}
