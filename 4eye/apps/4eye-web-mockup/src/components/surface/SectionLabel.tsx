"use client";

/**
 * SectionLabel — the small uppercase band header used to give a long surface a
 * fixed vertical rhythm: label + fading rule, then content, then `mb: 3`.
 *
 * Moved out of `Tiles/integration-layers/components/shared.tsx` so the profile
 * page and the layer panels read as one system. Accent is run through
 * `useSurface().ink()` so the label stays ≥4.5:1 in both modes.
 */

import * as React from "react";
import { Typography, alpha } from "@mui/material";
import { useSurface } from "./surfaceTokens";

export function SectionLabel({ children, accent }: { children: React.ReactNode; accent: string }) {
  const surface = useSurface();
  return (
    <Typography
      sx={{
        fontSize: 10.5,
        fontWeight: 800,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: surface.ink(accent),
        mb: 1.25,
        display: "flex",
        alignItems: "center",
        gap: 1,
        "&::after": {
          content: '""',
          flex: 1,
          height: "1px",
          background: `linear-gradient(90deg, ${alpha(accent, 0.4)}, transparent)`,
        },
      }}
    >
      {children}
    </Typography>
  );
}
