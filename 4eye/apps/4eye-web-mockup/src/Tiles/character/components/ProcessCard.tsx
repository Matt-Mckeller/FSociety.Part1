"use client";

import * as React from "react";
import { Box, Chip, Stack, Typography, alpha } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

import {
  NAMESPACE_COLOR,
  latestProcessStatus,
  plainMarkdownPreview,
  type ProcessEntry,
} from "../model/processes";

export function ProcessCard({
  entry,
  onClick,
}: {
  entry: ProcessEntry;
  onClick: () => void;
}) {
  const color = NAMESPACE_COLOR[entry.namespace] ?? "#64748b";
  const preview = plainMarkdownPreview(entry.description);
  const latestStatus = latestProcessStatus(entry.logs);
  const latestLog = entry.logs.length > 0
    ? [...entry.logs].sort((a, b) => b.createdAt - a.createdAt)[0]
    : undefined;
  const logPreview = latestLog
    ? plainMarkdownPreview(latestLog.body || latestLog.expression || "")
    : "";

  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      sx={{
        p: 1.5,
        borderRadius: 2,
        cursor: "pointer",
        border: "1px solid",
        borderColor: "divider",
        borderLeft: `3px solid ${color}`,
        bgcolor: "background.paper",
        transition: "all 120ms ease",
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          borderColor: alpha(color, 0.55),
          bgcolor: (t) => alpha(color, t.palette.mode === "dark" ? 0.08 : 0.04),
          boxShadow: `0 4px 20px ${alpha(color, 0.12)}`,
        },
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center", gap: 0.5, mb: 0.75, flexWrap: "wrap" }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            fontSize: "0.68rem",
          }}
        >
          {entry.namespace}
        </Typography>
        {entry.autoPlay && (
          <Chip
            size="small"
            icon={<PlayArrowRoundedIcon sx={{ fontSize: "14px !important" }} />}
            label="Auto"
            sx={{
              height: 20,
              fontSize: "0.62rem",
              fontWeight: 700,
              bgcolor: (t) => alpha(color, 0.12),
              color,
              "& .MuiChip-icon": { color },
            }}
          />
        )}
        {latestStatus && (
          <Chip
            size="small"
            label={latestStatus.label ?? "Status"}
            sx={{
              height: 20,
              fontSize: "0.62rem",
              fontWeight: 700,
              bgcolor: (t) => alpha("#3b82f6", 0.12),
              color: "#3b82f6",
            }}
          />
        )}
        {!entry.active && (
          <Chip size="small" label="Paused" color="warning" sx={{ height: 20, fontSize: "0.62rem" }} />
        )}
        {entry.logs.length > 0 && (
          <Typography variant="caption" color="text.disabled" sx={{ ml: "auto", fontSize: "0.62rem" }}>
            {entry.logs.length} log{entry.logs.length === 1 ? "" : "s"}
          </Typography>
        )}
      </Stack>

      <Typography
        component="div"
        sx={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontWeight: 700,
          fontSize: { xs: "0.84rem", sm: "0.92rem" },
          lineHeight: 1.4,
          mb: 0.75,
          wordBreak: "break-word",
          color: "text.primary",
          flex: 1,
        }}
      >
        {entry.expression}
      </Typography>

      {entry.tags.length > 0 && (
        <Stack direction="row" sx={{ gap: 0.4, flexWrap: "wrap", mb: 0.75 }}>
          {entry.tags.map((t) => (
            <Chip key={t} label={t} size="small" variant="outlined" sx={{ height: 20, fontSize: "0.62rem" }} />
          ))}
        </Stack>
      )}

      {(preview || logPreview) && (
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.78rem",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {logPreview || preview}
        </Typography>
      )}
    </Box>
  );
}
