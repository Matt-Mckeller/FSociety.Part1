"use client";

import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SeeProfileCharacter } from "@4eye/web/Tiles/home/slides/see/components/SeeProfileCharacter";

/**
 * ConfigurePanel — first glimpse of the Promise. Hero copy + the
 * "your 4eye" pairing. The "Improve your" pills have moved to SeeGlimpses
 * so they are always visible above the tab switcher.
 */
export function ConfigurePanel() {
  const [hovered, setHovered] = useState(false);

  return (
    <Stack spacing={{ xs: 3, md: 4.5 }} sx={{
      alignItems: "center"
    }}>
      <Box sx={{ textAlign: "center", px: { xs: 1, sm: 0 }, maxWidth: 1100 }}>
        <Typography
          component="h2"
          sx={{
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "text.primary",
            mb: { xs: 1.5, md: 2 },
          }}
        >
          Configure your human.
        </Typography>
        <Typography
          component="p"
          sx={{
            fontSize: "clamp(1.5rem, 3.6vw, 3.4rem)",
            fontWeight: 700,
            color: "text.secondary",
            letterSpacing: "-0.018em",
            lineHeight: 1.2,
          }}
        >
          Learn,{" "}
          <Box component="span" sx={{ color: "warning.main" }}>
            Earn,
          </Box>{" "}
          and{" "}
          <Box component="span" sx={{ color: "success.main" }}>
            Compete.
          </Box>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          cursor: "default",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <SeeProfileCharacter size={120} />
        <Typography
          sx={{
            color: hovered ? "primary.main" : "text.disabled",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontSize: "0.7rem",
            transition: "color 0.18s",
          }}
        >
          {hovered ? "you" : "Your 4eye"}
        </Typography>
      </Box>
    </Stack>
  );
}
