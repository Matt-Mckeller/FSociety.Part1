"use client";

/**
 * NextBestActionCard — production card for the map overlay's
 * "Next best actions" stack.
 *
 * Default surface treatment is the **R9 "glass + breathing pulse"** look:
 * a frosted-glass card with a slow scale + glow loop (3.2s). This is
 * the *baseline* for every card in the stack (every card breathes),
 * with `topPickStyle` layering an extra affordance to call out the
 * recommended pick.
 *
 * Structure (two layers):
 *   - Outer Box: `overflow: visible`, owns the breathing transform
 *     and the soft outer glow shadow so the halo isn't clipped.
 *   - Inner Box: `overflow: hidden`, owns the glass surface + any
 *     animated overlays (shimmer, etc.) + the content.
 *
 * Promoted from the playground variant story
 * (`playground/NextBestActionCardVariants.stories.tsx`,
 * `Glass-breathing base + Top Pick variations`).
 */

import type { ReactNode } from "react";
import { Box, Chip } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

import { useCardSkin } from "./CardSkinProvider";
import { CARD_SKIN_GLOW_RGB } from "./skins";

/** How the recommended / top-pick affordance is rendered on the card. */
export type TopPickStyle =
  /** Base glass-breathing only — no extra top-pick treatment. */
  | "none"
  /** Same breathing loop but glow halo is amber/gold instead of green. */
  | "glow-amber"
  /** Same loop but glow is a hot pink — playful "hero" pick. */
  | "glow-pink"
  /** Extra static ring sits just outside the card border. */
  | "halo-ring"
  /** Adds a recurring light sweep over the glass surface. */
  | "shimmer"
  /** Pill chip pinned outside the top edge. */
  | "floating-chip"
  /** Gold corner triangle in the top-right. */
  | "corner-mark";

export interface NextBestActionCardProps {
  /** Header row — chevron, question, page label, etc. */
  header: ReactNode;
  /** Body row — chips, difficulty meter, etc. */
  body: ReactNode;
  /** Brighter glass + thicker border to mark the active/selected card. */
  selected?: boolean;
  /** Top-pick treatment. Defaults to `"none"`. */
  topPickStyle?: TopPickStyle;
  /** Whole-card click handler. */
  onClick?: () => void;
}

// ───────────────────────────── tokens ─────────────────────────────
//
// Glow / surface / border tokens now live on the active `CardSkin`
// (`useCardSkin()` below). The old local constants matched the
// `frostedGlass/dark-base` skin exactly and are kept for reference
// only via `CARD_SKIN_GLOW_RGB`.

const GLOW_RGB = CARD_SKIN_GLOW_RGB;
type GlowKey = keyof typeof GLOW_RGB;

// ─────────────────────────── component ────────────────────────────

export function NextBestActionCard({
  header,
  body,
  selected = false,
  topPickStyle = "none",
  onClick,
}: NextBestActionCardProps) {
  const skin = useCardSkin();

  const glowKey: GlowKey =
    topPickStyle === "glow-amber"
      ? "amber"
      : topPickStyle === "glow-pink"
        ? "pink"
        : "green";
  const glow = GLOW_RGB[glowKey];

  const showShimmer = topPickStyle === "shimmer";
  const showHaloRing = topPickStyle === "halo-ring";
  const showFloatingChip = topPickStyle === "floating-chip";
  const showCornerMark = topPickStyle === "corner-mark";

  // Only apply glow to cards with an explicit topPickStyle — base cards
  // breathe with scale only (no colored glow), keeping them neutral.
  const enableGlow = topPickStyle !== "none";

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        // Outer layer: NO clipping so the breathing scale + glow halo
        // can extend beyond the card's content box.
        overflow: "visible",
        cursor: onClick ? "pointer" : "default",
        // Breathing loop (scale + colored glow). Shadow chain comes
        // from the active CardSkin so the breath color/depth tracks
        // the visual identity.
        animation: `nba-breathing 3.2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
        "@keyframes nba-breathing": {
          "0%, 100%": {
            transform: "scale(1)",
            filter: enableGlow
              ? `${skin.shadow.rest} drop-shadow(0 0 0 rgba(${glow},0))`
              : skin.shadow.rest,
          },
          "50%": {
            transform: "scale(1.012)",
            filter: enableGlow
              ? `${skin.shadow.breath} drop-shadow(0 0 14px rgba(${glow},0.55))`
              : skin.shadow.breath,
          },
        },
        "&:active": { transform: "scale(0.995)" },
        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
          filter: enableGlow
            ? `${skin.shadow.rest} drop-shadow(0 0 8px rgba(${glow},0.4))`
            : skin.shadow.rest,
        },
      }}
    >
      {/* Optional static halo ring (sits between outer glow and card edge) */}
      {showHaloRing && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: -4,
            borderRadius: 3,
            border: `1.5px solid rgba(${GLOW_RGB.amber},0.55)`,
            boxShadow: `0 0 0 4px rgba(${GLOW_RGB.amber},0.12)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Optional floating "Top pick" chip pinned outside top edge */}
      {showFloatingChip && (
        <Chip
          size="small"
          icon={<StarRateRoundedIcon sx={{ fontSize: 14 }} />}
          label="Top pick"
          sx={{
            position: "absolute",
            top: -10,
            right: 12,
            height: 20,
            zIndex: 3,
            bgcolor: `rgba(${GLOW_RGB.amber},1)`,
            color: "#1a1a1a",
            fontWeight: 800,
            letterSpacing: 0.4,
            "& .MuiChip-icon": { color: "#1a1a1a", ml: 0.5 },
            "& .MuiChip-label": { px: 0.75, fontSize: "0.7rem" },
          }}
        />
      )}

      {/* Inner layer: clips animated overlays, holds the surface */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          border: skin.border === "none" ? "none" : "1.5px solid",
          borderColor:
            skin.border === "none"
              ? undefined
              : selected
                ? (skin.borderSelected ?? skin.border)
                : skin.border,
          background:
            selected
              ? (skin.surfaceSelected ?? skin.surface)
              : skin.surface,
          backdropFilter: skin.backdrop === "none" ? "none" : skin.backdrop,
          WebkitBackdropFilter:
            skin.backdrop === "none" ? "none" : skin.backdrop,
          // Inner highlight (top edge sheen) — optional per skin.
          boxShadow: skin.innerHighlight,
          px: selected ? 1.5 : 1.25,
          py: selected ? 1.5 : 1.25,
          transition:
            "background 160ms ease, border-color 160ms ease, padding 160ms ease",
          "&:hover": {
            background:
              selected
                ? (skin.surfaceSelected ?? skin.surface)
                : (skin.surfaceHover ?? skin.surface),
          },
        }}
      >
        {/* Recurring shimmer sweep (top-pick "shimmer" style) */}
        {showShimmer && (
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              borderRadius: "inherit",
              overflow: "hidden",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-60%",
                width: "40%",
                height: "100%",
                background:
                  "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                animation: "nba-shimmer 2.8s ease-in-out infinite",
              },
              "@keyframes nba-shimmer": {
                "0%": { transform: "translateX(0)" },
                "60%, 100%": { transform: "translateX(420%)" },
              },
            }}
          />
        )}

        {/* Gold corner triangle (top-pick "corner-mark" style) */}
        {showCornerMark && (
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderTop: `28px solid rgba(${GLOW_RGB.amber},0.85)`,
              borderLeft: "28px solid transparent",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Content */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {header}
          {body}
        </Box>
      </Box>
    </Box>
  );
}

export default NextBestActionCard;
