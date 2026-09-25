"use client";

import * as React from "react";
import { Box, Chip, Stack, Typography, alpha } from "@mui/material";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";

import { MarkdownPreview } from "@4eye/web/Tiles/journal/components/MarkdownPreview";
import { NAMESPACE_COLOR, type ProcessGroup } from "../model/processes";

export function ProcessGroupBanner({
  group,
  accent,
  compact = false,
}: {
  group: ProcessGroup;
  accent?: string;
  compact?: boolean;
}) {
  const color = accent ?? NAMESPACE_COLOR[group.namespace] ?? "#64748b";

  return (
    <Box
      sx={{
        p: compact ? 1 : 1.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(color, 0.35),
        bgcolor: (t) => alpha(color, t.palette.mode === "dark" ? 0.06 : 0.04),
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center", gap: 0.75, mb: group.tags.length || group.description ? 0.5 : 0 }}>
        <AccountTreeRoundedIcon sx={{ fontSize: compact ? 16 : 18, color }} />
        <Typography
          variant={compact ? "body2" : "subtitle1"}
          sx={{
            fontWeight: 800,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: compact ? "0.88rem" : "1rem",
            lineHeight: 1.3,
            wordBreak: "break-word",
          }}
        >
          {group.namespace}.{group.name}()
        </Typography>
      </Stack>
      {group.tags.length > 0 && (
        <Stack direction="row" sx={{ gap: 0.4, flexWrap: "wrap", mb: group.description ? 0.75 : 0 }}>
          {group.tags.map((t) => (
            <Chip key={t} label={t} size="small" sx={{ height: 20, fontSize: "0.65rem" }} />
          ))}
        </Stack>
      )}
      {group.description && (
        <Box sx={{ "& p": { my: 0.25, fontSize: compact ? "0.82rem" : undefined } }}>
          <MarkdownPreview source={group.description} />
        </Box>
      )}
    </Box>
  );
}
