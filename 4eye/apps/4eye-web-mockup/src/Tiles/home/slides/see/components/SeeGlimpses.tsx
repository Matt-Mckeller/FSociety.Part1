"use client";

import { Box, Typography } from "@mui/material";
import { ConfigurePanel } from "@4eye/web/Tiles/home/slides/see/panels/ConfigurePanel";
import { GrowCards } from "@4eye/web/Tiles/home/slides/see/components/GrowCards";
import { useSlideshowTimelineHeight } from "@4eye/web/components/timeline";

/**
 * SeeGlimpses — sticky "Glimpses / Configure" header + Configure panel +
 * Grow cards. The Use (day-to-day) tab has been moved to the Projects page.
 */
export function SeeGlimpses() {
  const timelineHeight = useSlideshowTimelineHeight();

  return (
    <Box sx={{ width: "100%" }}>
      {/* Sticky band — pinned just under the timeline overlay */}
      <Box
        className="bp-sticky"
        sx={{
          position: "sticky",
          top: `${timelineHeight}px`,
          zIndex: 2,
          pt: { xs: 1, md: 1.25 },
          pb: { xs: 2, md: 2.5 },
          px: { xs: 2, md: 3 },
          bgcolor: "background.paper",
          borderRadius: 3,
          border: "1px solid rgba(15,23,42,0.08)",
          boxShadow:
            "0 4px 18px rgba(15,23,42,0.06), 0 12px 18px -12px rgba(15,23,42,0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.75,
        }}
      >
        <Typography
          sx={{
            color: "text.disabled",
            letterSpacing: "0.36em",
            fontWeight: 700,
            fontSize: "0.72rem",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          Glimpses
        </Typography>
        <Typography
          sx={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "text.secondary",
            letterSpacing: "-0.005em",
          }}
        >
          Configure
        </Typography>
      </Box>

      {/* Panel body */}
      <Box
        className="bp-panel"
        sx={{ pt: { xs: 2.5, md: 3 } }}
      >
        <ConfigurePanel />
        <GrowCards />
      </Box>
    </Box>
  );
}
