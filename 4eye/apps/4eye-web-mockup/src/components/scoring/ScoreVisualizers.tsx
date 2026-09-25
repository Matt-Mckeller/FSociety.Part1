"use client";
/**
 * Presentational helpers for the scoring Storybook stories.
 *
 * These live in the app (MUI-based) on purpose — `@expanse/scoring` stays
 * UI-free infrastructure. They only consume the engine's pure output.
 */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type {
  LearnScoreResult,
  ScoringVariantTheme,
  SignalContribution,
} from "@expanse/scoring";

/** Accent color per brand theme, for component bars. */
export const THEME_COLOR: Record<ScoringVariantTheme, string> = {
  balanced: "#5b6cff",
  improve: "#1f9d55",
  innovate: "#7c4dff",
  win: "#f5a623",
  heal: "#19b5a5",
};

export function ScoreBar({
  label,
  value,
  color,
  emphasize = false,
}: {
  label: string;
  value: number;
  color: string;
  emphasize?: boolean;
}) {
  return (
    <Box sx={{ mb: 1.25 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 0.5,
          fontWeight: emphasize ? 700 : 500,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "inherit" }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "inherit", fontVariantNumeric: "tabular-nums" }}>
          {value.toFixed(1)}
        </Typography>
      </Box>
      <Box
        sx={{
          height: emphasize ? 14 : 10,
          borderRadius: 999,
          background: "#ececf2",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${Math.max(0, Math.min(100, value))}%`,
            background: color,
            borderRadius: 999,
            transition: "width 200ms ease",
          }}
        />
      </Box>
    </Box>
  );
}

export function ContributionList({
  title,
  contributions,
  labelFor,
}: {
  title: string;
  contributions: SignalContribution[];
  labelFor?: (key: string) => string;
}) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.6 }}
      >
        {title}
      </Typography>
      <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mt: 0.5 }}>
        <Box component="tbody">
          {contributions.map((c) => (
            <Box component="tr" key={c.key} sx={{ "& td": { py: 0.25, fontSize: 12.5 } }}>
              <Box component="td" sx={{ color: "text.primary" }}>
                {labelFor ? labelFor(c.key) : c.key}
              </Box>
              <Box component="td" sx={{ color: "text.secondary", textAlign: "right", width: 64 }}>
                {(c.weight * 100).toFixed(0)}%
              </Box>
              <Box
                component="td"
                sx={{
                  textAlign: "right",
                  width: 56,
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 600,
                }}
              >
                {c.points.toFixed(1)}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

/** Compact card showing the four headline scores for a result. */
export function ResultCard({
  result,
  theme = "balanced",
  title,
}: {
  result: LearnScoreResult;
  theme?: ScoringVariantTheme;
  title?: string;
}) {
  const accent = THEME_COLOR[theme] ?? THEME_COLOR.balanced;
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        background: "#f5f5f5",
        border: "1px solid #e6e6ee",
        minWidth: 240,
      }}
    >
      {title && (
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
          {title}
        </Typography>
      )}
      <ScoreBar label="Learn" value={result.learn} color={accent} emphasize />
      <ScoreBar label="Earn" value={result.earn.score} color="#7d8bff" />
      <ScoreBar label="Compete" value={result.compete.score} color="#f5a623" />
      <ScoreBar label="Mastery" value={result.mastery.score} color="#19b5a5" />
    </Box>
  );
}
