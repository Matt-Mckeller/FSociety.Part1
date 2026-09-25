"use client";

import * as React from "react";
import { Box } from "@mui/material";
import type { LensExample } from "@4eye/web/Tiles/home/slides/see/state/lensExamples";

/**
 * ArrowFlow — center column of a Without/With row. Renders a soft connector
 * line with the row's tint color and an optional translation control slot.
 * The row title is now rendered above the grid by the parent panel.
 */
export function ArrowFlow({
  tintColor,
  toggle,
}: {
  label?: string;
  Icon?: LensExample["Icon"];
  tintColor: string;
  toggle?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.25,
        position: "relative",
        py: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 16,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 4,
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            height: 2,
            background: `linear-gradient(90deg, rgba(148,163,184,0.25) 0%, ${tintColor}66 100%)`,
            borderRadius: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: tintColor,
            opacity: 0.75,
            boxShadow: `0 0 0 3px ${tintColor}11`,
          }}
        />
      </Box>

      {toggle}
    </Box>
  );
}
