"use client";

/**
 * CharacterFigure — the player's 4eye avatar rendered with:
 *   1. A continuous idle float (gentle vertical bob)
 *   2. A direction lean driven by the `leanTransform` prop
 *
 * Pure view layer. All character configuration is read from
 * {@link useCharacterProfile}. The lean transform is injected by the
 * host app (use `DIRECTION_TRANSFORMS` from `config` and whatever
 * direction source the app has) — keeping this component free of
 * layout-package dependencies.
 *
 * Must be rendered inside a `<CharacterProfileProvider>`.
 */

import { Box } from "@mui/material";
import { Character4eye, CHARACTER_PERSONAS } from "../2d";
import { useCharacterProfile } from "./context/CharacterProfileContext";
import { ANIMATION, DIRECTION_TRANSFORMS, SPRING_EASING } from "./config";

export interface CharacterFigureProps {
  /** Called when the user clicks the character (e.g. to reveal a CTA). */
  onClick?: () => void;
  /**
   * CSS transform applied to the lean wrapper.
   * Compute via `useCharacterLean()` in the host app and pass the result here,
   * or use `DIRECTION_TRANSFORMS[direction]` directly for static stories/tests.
   * Defaults to `DIRECTION_TRANSFORMS.up` (upright, no lean).
   */
  leanTransform?: string;
}

export function CharacterFigure({ onClick, leanTransform = DIRECTION_TRANSFORMS.up }: CharacterFigureProps) {
  const profile = useCharacterProfile();

  return (
    <Box
      data-testid="character-figure-float"
      sx={{
        width: "100%",
        // Idle float — gentle continuous bob while no direction is
        // overriding the transform; runs independently of the lean.
        "@keyframes mapCharFloat": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        animation: `mapCharFloat ${ANIMATION.floatDuration} ease-in-out infinite`,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Direction lean wrapper — separate element so its transform
          layers on top of the float without cancelling it. */}
      <Box
        data-testid="character-figure-lean"
        onClick={onClick}
        sx={{
          width: "100%",
          maxWidth: 148,
          transform: leanTransform,
          transition: `transform ${ANIMATION.leanDuration} ${SPRING_EASING}`,
          cursor: onClick ? "pointer" : "default",
        }}
      >
        <Character4eye
          {...CHARACTER_PERSONAS.mapExplorer}
          variant={profile.variant}
          eyeDesign={profile.lens}
          strapStyle={profile.strap}
          mood={profile.mood}
          eyeGlowColor={profile.glow}
          showAntenna={profile.showAntenna}
          showStatusLEDs={profile.showLEDs}
          showEarSensors={profile.showEarSensors}
          showForeheadMark={profile.showForeheadMark}
          showDataFlow={profile.showDataFlow}
          interactionMode="static"
        />
      </Box>
    </Box>
  );
}
