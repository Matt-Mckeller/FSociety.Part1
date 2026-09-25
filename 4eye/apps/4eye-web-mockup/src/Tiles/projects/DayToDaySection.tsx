"use client";

import { Box, Typography } from "@mui/material";
import { DayToDayPanel } from "@4eye/web/Tiles/home/slides/see/panels/DayToDayPanel";
import { WipeHeader } from "@4eye/web/Tiles/home/slides/see/cells/WipeHeader";

/**
 * DayToDaySection — moved from the "Use" tab in the See slide.
 * Content to be organized further as the Projects detail page evolves.
 */
export function DayToDaySection() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="overline"
          sx={{
            color: "text.disabled",
            letterSpacing: "0.2em",
            fontWeight: 700,
            display: "block",
            mb: 0.5,
          }}
        >
          Day-to-Day
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.75 }}>
          Before &amp; after 4eye
        </Typography>
        <Typography variant="body2" sx={{
          color: "text.secondary"
        }}>
          Real-world scenarios showing how 4eye transforms everyday moments.
        </Typography>
      </Box>
      <WipeHeader />
      <DayToDayPanel />
    </Box>
  );
}
