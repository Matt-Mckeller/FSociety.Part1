"use client";

import { Box, Typography } from "@mui/material";
import type { LensExample } from "@4eye/web/Tiles/home/slides/see/state/lensExamples";

/**
 * WithoutCell — left half of a Without/With row, in muted slate.
 */
export function WithoutCell({ ex }: { ex: LensExample }) {
  const isCode = ex.flavor === "code";
  const data = ex.without;

  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: "#f1f5f9",
        px: { xs: 2, sm: 2.5 },
        py: 2,
        minHeight: { xs: 90, sm: 100 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 0.75,
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontFamily: isCode ? "monospace" : "inherit",
          fontSize: isCode ? { xs: 13.5, sm: 15 } : { xs: 14.5, sm: 16 },
          fontWeight: isCode ? 500 : 600,
          color: "rgba(15,23,42,0.92)",
          lineHeight: 1.4,
        }}
      >
        {data.primary}
      </Typography>
      {data.secondary ? (
        <Typography
          variant="caption"
          sx={{
            color: "rgba(15,23,42,0.55)",
            fontStyle: isCode ? "normal" : "italic",
            fontWeight: 500,
            lineHeight: 1.35,
            fontSize: "0.78rem",
          }}
        >
          {data.secondary}
        </Typography>
      ) : null}
    </Box>
  );
}
