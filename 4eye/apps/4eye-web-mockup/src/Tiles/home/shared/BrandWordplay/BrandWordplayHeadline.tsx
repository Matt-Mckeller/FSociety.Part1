"use client";

/**
 * BrandWordplayHeadline — cyber-themed linear sequence.
 *
 *   4eye → 4i   →   AI Eye 4 You   →   AI 4 Your Eyes
 *
 * Plays once and holds on the final phrase. Each transition uses a
 * left-to-right character-scramble "decode" effect with neon cyan glow
 * and a subtle CRT flicker.
 *
 * onFinalStageReached fires when the final phrase is reached so
 * downstream content (ImproveYourPills, modality OrbBars) can reveal.
 *
 * Respects prefers-reduced-motion by jumping straight to the final phrase.
 *
 * State is managed via BrandWordplayContext with a reducer for clean,
 * composable animation state.
 */

import { Typography, type TypographyProps, useMediaQuery, useTheme } from "@mui/material";
import {
  CYBER_GLOW_ACTIVE,
  CYBER_GLOW_IDLE,
  SEQUENCE,
} from "./BrandWordplayContext";
import { useBrandWordplay } from "./useBrandWordplay";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface BrandWordplayHeadlineProps {
  /**
   * When false the animation pauses; when it becomes true the sequence
   * restarts from index 0 ("4eye"). Defaults to true.
   */
  isActive?: boolean;
  variant?: TypographyProps["variant"];
  sx?: TypographyProps["sx"];
  /**
   * Called once when the loop phase begins — use to reveal downstream
   * content (ImproveYourPills, modality OrbBars, etc.).
   */
  onFinalStageReached?: () => void;
  /** API-compat — unused in sequence/loop mode. */
  holdSecByStage?: readonly number[];
  holdSec?: number;
  morphSec?: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function BrandWordplayHeadline({
  isActive = true,
  variant = "h2",
  sx,
  onFinalStageReached,
}: BrandWordplayHeadlineProps) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", {
    noSsr: true,
  });
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const glowIdle = `0 0 4px ${primaryColor}99, 0 0 14px ${primaryColor}44`;
  const glowActive = `0 0 6px ${primaryColor}, 0 0 20px ${primaryColor}bb, 0 0 44px ${primaryColor}44`;

  const { state } = useBrandWordplay(isActive, reducedMotion, onFinalStageReached);

  return (
    <Typography
      variant={variant}
      aria-label={SEQUENCE[state.seqIdx]}
      aria-live="polite"
      sx={[
        { display: "block", textAlign: "center", userSelect: "none", cursor: "default" },
        ...(Array.isArray(sx) ? sx : [sx]),
        // Cyber aesthetic — always wins.
        {
          fontFamily: theme.typography.fontFamily,
          letterSpacing: "0.06em",
          color: primaryColor,
          textShadow: state.scrambling ? glowActive : glowIdle,
          transition: "text-shadow 0.2s ease",
          animation: reducedMotion ? "none" : "cyberFlicker 7s ease-in-out infinite",
          "@keyframes cyberFlicker": {
            "0%, 86%, 100%": { opacity: 1 },
            "88%": { opacity: 0.86 },
            "89%": { opacity: 1 },
            "91%": { opacity: 0.92 },
            "93%": { opacity: 1 },
          },
        },
      ]}
    >
      {state.displayText}
    </Typography>
  );
}

export default BrandWordplayHeadline;
