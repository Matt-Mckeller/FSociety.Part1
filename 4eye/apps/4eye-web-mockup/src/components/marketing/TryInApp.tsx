"use client";

import { Box, Chip, Stack, Typography } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export interface TryInAppProps {
  href?: string;
  label?: string;
}

export default function TryInApp({
  href = "/app/decoder?sample=ready-for-bed",
  label = "Try in app",
}: TryInAppProps) {
  return (
    <Box
      component="a"
      href={href}
      data-cta="try-in-app"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 2,
        py: 0.75,
        borderRadius: 999,
        bgcolor: "primary.main",
        color: "common.white",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: "0.82rem",
        letterSpacing: "0.03em",
        boxShadow: "0 2px 8px rgba(99,102,241,0.35)",
        transition: "opacity 0.15s, transform 0.15s",
        "&:hover": { opacity: 0.88, transform: "translateY(-1px)" },
        "&:active": { opacity: 1, transform: "translateY(0)" },
      }}
    >
      <RocketLaunchIcon sx={{ fontSize: 15 }} />
      {label}
    </Box>
  );
}
