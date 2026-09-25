"use client";

import { Stack, Typography } from "@mui/material";
import ProfileStatsCard from "@4eye/web/Tiles/home/slides/see/components/ProfileStatsCard";

export function GamificationProfileSection() {
  return (
    <Stack
      spacing={3}
      sx={{
        alignItems: "center",
        py: 2
      }}>
      <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center" }}>
        Configure your human, learn, earn, and compete.
      </Typography>
      <Typography
        variant="overline"
        sx={{
          letterSpacing: "0.22em",
          fontWeight: 700,
          fontSize: "0.65rem",
          color: "text.disabled",
        }}
      >
        Your Profile
      </Typography>
      <ProfileStatsCard />
    </Stack>
  );
}
