"use client";

/**
 * SectionFrame — the border and field for a section that is *new*.
 *
 * Prepared ahead of the content that will fill it. The requirement was a frame
 * distinct from the rest of the page, which means it has to differ by something
 * other than colour: the page already spends colour on accents, and one more
 * tinted box would read as another card.
 *
 * So the difference is drawn:
 *
 *  - **A corner-bracket border**, not a rectangle. Four L-shaped marks at the
 *    corners with the edges left open — the frame implies a boundary rather
 *    than closing one, which is what a section still being filled should say.
 *  - **A ruled field** behind it, at a low contrast that survives both themes,
 *    so the section has a floor and the cards sit *on* something.
 *  - **A ribbon** in the top edge carrying the branch ref, breaking the border
 *    line where it crosses. That break is the tell — a label that interrupts
 *    its own frame reads as attached to it rather than laid over it.
 *
 * `variant="quiet"` drops the brackets and the ribbon for the established
 * sections, so the new one is the only thing on the page wearing this.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha } from "@mui/material";

import { CONTENT_TEXT_PROPS } from "@/i18n/locales";

export interface SectionFrameProps {
  label: string;
  /** The git-ish ref shown in the ribbon. */
  badge?: string;
  blurb?: string;
  /** Right-aligned controls in the header row. */
  actions?: React.ReactNode;
  /** `fresh` gets the full treatment; `quiet` is a plain ruled section. */
  variant?: "fresh" | "quiet";
  /** Accent for the brackets and ribbon. */
  accent?: string;
  /**
   * Darken the *field* — the in-app presentation.
   *
   * Only the field. The header row sits outside it, on the page, which stays
   * whatever the theme says: an earlier version tinted the heading with this
   * flag too and produced near-white section titles on a white page, because
   * app mode darkens the cards and the field, not the surface underneath them.
   * A flag named for one surface must not be spent on text sitting on another.
   */
  dark?: boolean;
  /** Collapsible folder behaviour — closed by default when true. */
  defaultCollapsed?: boolean;
  children: React.ReactNode;
}

const BRACKET = 22;
const BRACKET_WEIGHT = 2;

function Corner({ at, color }: { at: "tl" | "tr" | "bl" | "br"; color: string }) {
  const vertical = at[0] === "t" ? { top: -1 } : { bottom: -1 };
  const horizontal = at[1] === "l" ? { left: -1 } : { right: -1 };
  const borders =
    at === "tl"
      ? { borderTop: `${BRACKET_WEIGHT}px solid`, borderLeft: `${BRACKET_WEIGHT}px solid`, borderTopLeftRadius: 10 }
      : at === "tr"
        ? { borderTop: `${BRACKET_WEIGHT}px solid`, borderRight: `${BRACKET_WEIGHT}px solid`, borderTopRightRadius: 10 }
        : at === "bl"
          ? { borderBottom: `${BRACKET_WEIGHT}px solid`, borderLeft: `${BRACKET_WEIGHT}px solid`, borderBottomLeftRadius: 10 }
          : { borderBottom: `${BRACKET_WEIGHT}px solid`, borderRight: `${BRACKET_WEIGHT}px solid`, borderBottomRightRadius: 10 };

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        width: BRACKET,
        height: BRACKET,
        borderColor: color,
        pointerEvents: "none",
        ...vertical,
        ...horizontal,
        ...borders,
      }}
    />
  );
}

export function SectionFrame({
  label,
  badge,
  blurb,
  actions,
  variant = "quiet",
  accent = "#2563eb",
  dark = false,
  defaultCollapsed = false,
  children,
}: SectionFrameProps) {
  const fresh = variant === "fresh";
  const rule = dark ? alpha("#94a3b8", 0.12) : alpha("#0f172a", 0.06);
  const [open, setOpen] = React.useState(!defaultCollapsed);

  return (
    <Box component="section" sx={{ position: "relative" }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 1.25,
          mb: open ? 1.5 : 0,
          pl: fresh ? 1.5 : 0,
        }}
      >
        <Box
          component="button"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            m: 0,
            p: 0,
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "inherit",
            textAlign: "left",
          }}
        >
          <Box
            aria-hidden
            sx={{
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: open ? "none" : `6px solid`,
              borderBottom: open ? `6px solid` : "none",
              borderTopColor: "text.secondary",
              borderBottomColor: "text.secondary",
              transform: open ? "none" : "rotate(-90deg)",
              transition: "transform 120ms ease",
            }}
          />
          <Typography
            component="h2"
            {...CONTENT_TEXT_PROPS}
            sx={{
              fontSize: { zero: 20, laptop: 24 },
              fontWeight: 700,
              letterSpacing: -0.4,
              color: "text.primary",
            }}
          >
            {label}
          </Typography>
        </Box>

        {badge && (
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: 11.5,
              fontWeight: 700,
              px: 0.85,
              py: 0.2,
              borderRadius: 0.75,
              color: fresh ? accent : "text.disabled",
              border: "1px solid",
              borderColor: fresh ? alpha(accent, 0.4) : "divider",
              bgcolor: fresh ? alpha(accent, 0.08) : "transparent",
            }}
          >
            {badge}
          </Typography>
        )}

        {blurb && (
          <Typography
            {...CONTENT_TEXT_PROPS}
            sx={{
              fontSize: 14,
              lineHeight: 1.55,
              color: "text.secondary",
              flex: 1,
              minWidth: 260,
              maxWidth: "62ch",
            }}
          >
            {blurb}
          </Typography>
        )}

        {actions && <Box sx={{ ml: "auto", flexShrink: 0 }}>{actions}</Box>}
      </Stack>

      {open && (
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          p: { zero: fresh ? 2 : 0, laptop: fresh ? 3 : 0 },
          ...(fresh && {
            backgroundImage: `
              linear-gradient(${rule} 1px, transparent 1px),
              linear-gradient(90deg, ${rule} 1px, transparent 1px),
              radial-gradient(120% 90% at 12% 0%, ${alpha(accent, dark ? 0.14 : 0.07)} 0%, transparent 62%)
            `,
            backgroundSize: "26px 26px, 26px 26px, 100% 100%",
            backgroundColor: dark ? "#080d17" : alpha("#f8fafc", 0.9),
            border: "1px solid",
            borderColor: dark ? alpha("#94a3b8", 0.1) : alpha("#0f172a", 0.05),
          }),
        }}
      >
        {fresh && (
          <>
            <Corner at="tl" color={accent} />
            <Corner at="tr" color={accent} />
            <Corner at="bl" color={accent} />
            <Corner at="br" color={accent} />
          </>
        )}
        {children}
      </Box>
      )}
    </Box>
  );
}
