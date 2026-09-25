"use client";

/**
 * CharacterCompass — the small compass area below the character.
 *
 * Two stacked states:
 *   1. Idle    — `ExploreIcon` floats above a cycling ring variant
 *                (see {@link useRingCycle}, see {@link RING_SCHEDULE}).
 *   2. Demo    — when `showDemo` is true (toggled by the parent via
 *                `forceShowDemo` or by clicking the character figure),
 *                the icon is replaced by a green "See Demo" CTA pill
 *                that pops in with a spring and pulses with a glow.
 *
 * Click on the pill calls `onSeeDemo` and dismisses itself.
 */

import { Box, Typography } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useRingCycle } from "./hooks/useRingCycle";
import { RING_RENDERERS, type RingVariantId } from "./rings";
import { ANIMATION, SPRING_EASING } from "./config";
import { useCharacterProfile } from "./context/CharacterProfileContext";

export interface CharacterCompassProps {
  /** Fires when the user clicks the See Demo CTA. */
  onSeeDemo?: () => void;
  /**
   * When true, freeze the compass on this ring variant instead of
   * cycling. Useful for Storybook gallery stories.
   */
  pinRing?: RingVariantId;
}

export function CharacterCompass({
  onSeeDemo,
  pinRing,
}: CharacterCompassProps) {
  const { showDemoCta, setShowDemoCta } = useCharacterProfile();
  const cycledRing = useRingCycle();
  const ringVariant: RingVariantId = pinRing ?? cycledRing;
  const ActiveRings = RING_RENDERERS[ringVariant];

  return (
    <Box
      data-testid="character-compass"
      sx={{
        position: "relative",
        mt: -1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 36,
        width: "100%",
      }}
    >
      {!showDemoCta ? (
        <>
          {/* Orbital rings — key={ringVariant} forces remount on each
              transition so CSS keyframes restart cleanly; ringFadeIn
              gives a soft cross-fade. */}
          <Box
            key={ringVariant}
            data-testid="character-compass-rings"
            data-ring-variant={ringVariant}
            sx={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "@keyframes ringFadeIn": {
                "0%":   { opacity: 0 },
                "100%": { opacity: 1 },
              },
              animation: `ringFadeIn ${ANIMATION.ringFadeDuration} ease-in forwards`,
              pointerEvents: "none",
            }}
          >
            <ActiveRings />
          </Box>
          {/* Icon — persistent layer above all ring variants */}
          <ExploreIcon
            data-testid="character-compass-icon"
            sx={{
              fontSize: 18,
              color: "primary.main",
              opacity: 0.75,
              position: "relative",
              zIndex: 1,
            }}
          />
        </>
      ) : (
        <SeeDemoButton
          onClick={() => {
            setShowDemoCta(false);
            onSeeDemo?.();
          }}
        />
      )}
    </Box>
  );
}

// ─── See Demo button ───────────────────────────────────────────────────
function SeeDemoButton({ onClick }: { onClick: () => void }) {
  return (
    <Box
      sx={{
        "@keyframes demoPopIn": {
          "0%":   { transform: "scale(0.3)", opacity: 0 },
          "75%":  { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)",   opacity: 1 },
        },
        animation: `demoPopIn ${ANIMATION.demoPopDuration} ${SPRING_EASING} forwards`,
      }}
    >
      <Box
        component="button"
        data-testid="see-demo-button"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onClick();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.6,
          px: 1.4,
          py: 0.65,
          borderRadius: 999,
          bgcolor: "#16a34a",
          border: "2px solid rgba(255,255,255,0.25)",
          cursor: "pointer",
          outline: "none",
          // Green glow pulse
          "@keyframes demoGlow": {
            "0%, 100%": { boxShadow: "0 0 0 0 rgba(22,163,74,0.55)" },
            "50%":      { boxShadow: "0 0 0 9px rgba(22,163,74,0)"  },
          },
          animation: `demoGlow ${ANIMATION.demoGlowDuration} ease-in-out infinite`,
          "&:hover":  { bgcolor: "#15803d" },
          "&:active": { transform: "scale(0.96)" },
          transition: "background-color 0.15s, transform 0.1s",
        }}
      >
        <PlayArrowIcon sx={{ fontSize: 13, color: "#fff" }} />
        <Typography
          sx={{
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          See Demo
        </Typography>
      </Box>
    </Box>
  );
}
