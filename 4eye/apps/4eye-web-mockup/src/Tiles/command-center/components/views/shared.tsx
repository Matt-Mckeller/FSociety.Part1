"use client";

/**
 * Command Center — shared view primitives.
 *
 * Small layout helpers used across the Command Center sub-views: a panel card
 * with a glyph header, a scrollable content region, and an empty-state.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha, useTheme } from "@mui/material";

export interface PanelProps {
  title: string;
  /** Optional brand glyph or icon at the panel header. */
  glyph?: React.ReactNode;
  /** Right-aligned header slot (counts, toggles). */
  action?: React.ReactNode;
  /** Fill available height and scroll the body. */
  fill?: boolean;
  children: React.ReactNode;
  sx?: import("@mui/material").SxProps<import("@mui/material/styles").Theme>;
}

/** A titled card surface. Headers carry an optional brand glyph + action. */
export function Panel({ title, glyph, action, fill, children, sx }: PanelProps) {
  return (
    <Stack
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.paper",
        overflow: "hidden",
        minHeight: 0,
        ...(fill ? { flex: 1, height: "100%" } : {}),
        ...sx,
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        {glyph}
        <Typography variant="subtitle2" sx={{ fontWeight: 800, flex: 1 }}>
          {title}
        </Typography>
        {action}
      </Stack>
      <Box sx={{ p: 1.5, overflowY: "auto", minHeight: 0, ...(fill ? { flex: 1 } : {}) }}>
        {children}
      </Box>
    </Stack>
  );
}

/** Muted empty-state message. */
export function EmptyState({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 3,
        textAlign: "center",
        color: alpha(theme.palette.text.primary, 0.5),
        fontSize: 13,
      }}
    >
      {children}
    </Box>
  );
}

/** A small labelled stat (number + caption). */
export function StatTile({
  value,
  label,
  color,
}: {
  value: React.ReactNode;
  label: string;
  color?: string;
}) {
  const theme = useTheme();
  const c = color ?? theme.palette.primary.main;
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 84,
        p: 1.25,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(c, 0.22),
        bgcolor: alpha(c, 0.06),
      }}
    >
      <Typography sx={{ fontWeight: 800, fontSize: 22, lineHeight: 1.1, color: c }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
        {label}
      </Typography>
    </Box>
  );
}
