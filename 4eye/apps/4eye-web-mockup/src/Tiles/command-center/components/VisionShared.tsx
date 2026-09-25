"use client";

import * as React from "react";
import { Box, Stack, Typography, alpha } from "@mui/material";

export function BulletItem({ text, color }: { text: string; color: string }) {
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "flex-start", gap: 0.75 }}>
      <Box
        sx={{
          mt: 0.6,
          width: 7,
          height: 7,
          borderRadius: "50%",
          flexShrink: 0,
          bgcolor: alpha(color, 0.65),
        }}
      />
      <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.45 }}>
        {text}
      </Typography>
    </Stack>
  );
}

export function VisionSectionLabel({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <Typography
      variant="caption"
      sx={{
        display: "block",
        fontWeight: 800,
        letterSpacing: 0.4,
        textTransform: "uppercase",
        color: color ?? "text.secondary",
        mb: 0.75,
      }}
    >
      {children}
    </Typography>
  );
}

export function SubPanel({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(tone, 0.28),
        bgcolor: alpha(tone, 0.05),
      }}
    >
      {children}
    </Box>
  );
}
