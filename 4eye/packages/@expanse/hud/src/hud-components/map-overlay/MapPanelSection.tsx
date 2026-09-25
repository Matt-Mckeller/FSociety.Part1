"use client";

/**
 * Section heading used at the top of right-column panels in the map
 * overlay (e.g. "Next best actions"). Renders an accent bar + uppercase
 * title row above its children.
 */

import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface MapPanelSectionProps {
  title: string;
  /** Color of the 4×18 accent bar. @default "#3B82F6" (primary blue) */
  accentColor?: string;
  /** Optional right-aligned slot in the heading row (action button, count, etc.). */
  action?: ReactNode;
  children?: ReactNode;
}

export function MapPanelSection({
  title,
  accentColor = "#3B82F6",
  action,
  children,
}: MapPanelSectionProps) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1.25,
        }}
      >
        <Box
          sx={{
            width: 4,
            height: 18,
            borderRadius: 1,
            bgcolor: accentColor,
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            color: "#fff",
            fontWeight: 800,
            letterSpacing: 0.4,
            fontSize: "1.05rem",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        {action && <Box sx={{ ml: "auto" }}>{action}</Box>}
      </Box>
      {children}
    </Box>
  );
}

export default MapPanelSection;
