"use client";

/**
 * NextBestActionCardHeader — header row for `NextBestActionCard`.
 *
 * Layout: [outlined chevron square] [QUESTION + "?"] [optional center
 * badge] [pageLabel + small page icon, right-aligned].
 *
 * - Chevron square is **outlined** (1.5px border, transparent bg) and
 *   tinted with `chevronColor` (defaults to primary blue). Per the
 *   variant decision there's **no per-card category color** — all
 *   chevrons share one tint across the stack.
 * - When `selected`, the chevron square swells (32 → 40px) and the
 *   chevron icon runs a subtle infinite bounce; the question scales up
 *   to match.
 * - `centerBadge` is an opt-in slot for inline "Top pick" tags etc.
 *   When present it sits centered between the question and the page
 *   label and pushes the page label flush to the right edge.
 *
 * Promoted from the playground variant story
 * (`playground/NextBestActionCardVariants.stories.tsx`).
 */

import type { ComponentType, ReactNode } from "react";
import type { SvgIconProps } from "@mui/material";
import { Box, Tooltip, Typography } from "@mui/material";

import { useCardSkin } from "./CardSkinProvider";

const DEFAULT_CHEVRON_COLOR = "#3B82F6";

export interface NextBestActionCardHeaderProps {
  /** Direction / question chevron icon. */
  Chevron: ComponentType<SvgIconProps>;
  /** Tooltip + aria label for the chevron square. */
  chevronLabel: string;
  /**
   * Border + icon color for the outlined chevron square.
   * @default "#3B82F6" (primary blue)
   */
  chevronColor?: string;
  /** Question text — rendered with a trailing "?" (e.g. "Why" → "WHY?"). */
  question: string;
  /** Right-aligned destination page label. */
  pageLabel: string;
  /**
   * Small icon shown to the right of `pageLabel` so the destination
   * reads as `Strategy 📊` etc. Optional.
   */
  PageIcon?: ComponentType<SvgIconProps>;
  /**
   * When true, the chevron square grows + the chevron bounces, and the
   * question font scales up. Use for the focused/active card.
   */
  selected?: boolean;
  /**
   * Optional badge rendered horizontally centered between the question
   * and the page label (e.g. inline "Top pick" pill).
   */
  centerBadge?: ReactNode;
}

export function NextBestActionCardHeader({
  Chevron,
  chevronLabel,
  chevronColor,
  question,
  pageLabel,
  PageIcon,
  selected = false,
  centerBadge,
}: NextBestActionCardHeaderProps) {
  const skin = useCardSkin();
  // Explicit `chevronColor` prop always wins; otherwise the skin owns
  // the tint. The original `DEFAULT_CHEVRON_COLOR` is kept as the
  // ultimate fallback for skin-less consumers (legacy stories).
  const chevronTint = chevronColor ?? skin.text.chevron ?? DEFAULT_CHEVRON_COLOR;
  const questionColor = skin.text.question;
  const questionShadow = skin.text.questionGlow;
  const pageLabelColor = skin.text.pageLabel;
  // Question text font size in px — drives both the type and the
  // chevron square so the chevron box is exactly the same height as
  // a single line of the question (`lineHeight: 1` below).
  const questionPx = selected ? 28 : 16;
  // Outer box of the chevron equals the text line height so the
  // chevron + question align cap-to-baseline with no extra padding.
  const glyphSize = questionPx;
  // Icon glyph sized to fit inside the square minus a hair for the
  // 1.5px border so it doesn't kiss the edge.
  const glyphIconPx = glyphSize - 4;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1 }}>
      {/* Outlined chevron square (1.5px border, transparent bg) */}
      <Tooltip title={chevronLabel}>
        <Box
          aria-label={chevronLabel}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: `${glyphSize}px`,
            height: `${glyphSize}px`,
            borderRadius: 0.75,
            bgcolor: "transparent",
            border: `1.5px solid ${chevronTint}`,
            transition: "width 160ms ease, height 160ms ease",
            flexShrink: 0,
          }}
        >
          <Chevron
            sx={{
              color: chevronTint,
              fontSize: `${glyphIconPx}px`,
              ...(selected && {
                animation:
                  "nba-bounce 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "@keyframes nba-bounce": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-3px)" },
                },
              }),
            }}
          />
        </Box>
      </Tooltip>

      {/* Question word — primary headline */}
      <Typography
        sx={{
          color: questionColor,
          textShadow: questionShadow,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          fontWeight: 800,
          fontSize: `${questionPx}px`,
          lineHeight: 1,
        }}
      >
        {`${question}?`}
      </Typography>

      {/* Centered badge slot (optional) */}
      {centerBadge && (
        <Box
          sx={{
            flex: "0 0 auto",
            mx: "auto",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {centerBadge}
        </Box>
      )}

      {/* Right side: page title + small page icon */}
      <Box
        sx={{
          ml: centerBadge ? 0 : "auto",
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          minWidth: 0,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: pageLabelColor,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: 0,
          }}
        >
          {pageLabel}
        </Typography>
        {PageIcon && (
          <PageIcon sx={{ color: pageLabelColor, opacity: 0.85, fontSize: 18 }} />
        )}
      </Box>
    </Box>
  );
}

export default NextBestActionCardHeader;
