"use client";

import { Box, Typography, useTheme } from "@mui/material";
import type { ComponentType, SVGProps } from "react";

/**
 * WhenPill — clean card tile used by the "Whenever you are" band.
 * Intentionally simpler than WherePill: no stroke rings, no bevel overlay —
 * just a soft tinted surface, large icon, and label.
 */

export const WHEN_PILL_H = 140;

export interface WhenPillProps {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  hex: string;
  /** Class applied to the outer wrapper — used by GSAP selectors. Defaults to "when-pill". */
  className?: string;
}

export function WhenPill({ label, Icon, hex, className = "when-pill" }: WhenPillProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      className={className}
      sx={{
        borderRadius: 4,
        bgcolor: isDark ? `${hex}18` : `${hex}10`,
        p: { zero: 2.5, tablet: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        minHeight: WHEN_PILL_H,
        width: "100%",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 12px 24px -8px ${hex}44`,
        },
        cursor: "default",
      }}
    >
      {/* @ts-expect-error MUI icon compat */}
      <Icon style={{ fontSize: 52, color: hex }} />
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "0.02em",
          textAlign: "center",
          lineHeight: 1.2,
          color: isDark ? "common.white" : "text.primary",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
