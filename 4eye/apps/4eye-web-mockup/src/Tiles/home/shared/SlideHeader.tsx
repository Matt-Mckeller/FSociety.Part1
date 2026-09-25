"use client";

import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";

interface SlideHeaderProps {
  /** Small wide-tracked uppercase label above the title (e.g. "WHERE"). */
  eyebrow: ReactNode;
  /**
   * The headline. Can be a string or any node (e.g. an inline highlight
   * span, or a `<MorphingHeadline>`).
   */
  title?: ReactNode;
  /**
   * If provided, renders as a custom slot in place of the default
   * `<Typography>` headline — for cases where the headline is itself a
   * specialized component (e.g. animated phrase rotation).
   */
  titleSlot?: ReactNode;
  /** Optional supporting paragraph below the title. */
  subtitle?: ReactNode;
  /** Stack alignment. Defaults to center. */
  align?: "center" | "flex-start";
  /** className applied to the title (e.g. for GSAP timeline targeting). */
  titleClassName?: string;
  /** className applied to the eyebrow. */
  eyebrowClassName?: string;
  /** Outer Stack sx for spacing/margin overrides. */
  sx?: SxProps<Theme>;
}

/**
 * Standard slide header: small uppercase eyebrow → bold clamp() headline
 * → optional supporting paragraph. Locks in the design vocabulary used
 * across the home deck so all slides share the same typographic rhythm.
 */
export function SlideHeader({
  eyebrow,
  title,
  titleSlot,
  subtitle,
  align = "center",
  titleClassName,
  eyebrowClassName,
  sx,
}: SlideHeaderProps) {
  const textAlign = align === "center" ? "center" : "left";
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: align,
        textAlign,
        ...sx
      }}>
      <Typography
        className={eyebrowClassName}
        sx={{
          color: "text.disabled",
          letterSpacing: "0.36em",
          fontWeight: 700,
          fontSize: "0.78rem",
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </Typography>
      {titleSlot ??
        (title != null && (
          <Typography
            className={titleClassName}
            component="h2"
            sx={{
              fontSize: "clamp(2rem, 4.4vw, 3.6rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "text.primary",
              maxWidth: 1100,
            }}
          >
            {title}
          </Typography>
        ))}
      {subtitle && (
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            fontWeight: 500,
            lineHeight: 1.45,
            maxWidth: 760,
          }}
        >
          {subtitle}
        </Box>
      )}
    </Stack>
  );
}
