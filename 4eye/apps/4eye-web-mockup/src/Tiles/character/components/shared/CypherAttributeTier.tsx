"use client";

/**
 * Janna's Power tier reads Dominant at rest and cyphers to Submissive on hover.
 */

import * as React from "react";
import { Box } from "@mui/material";

import { MorphLabel } from "@4eye/web/components/hud/resourceBars/widgets";
import { useIsJannaProfile } from "../../store/useCharacterPresentation";

const JANNA_POWER_CYPHER = ["Dominant", "Submissive"];

export function CypherAttributeTier({
  attrId,
  tier,
  fontSize,
  weight = 700,
}: {
  attrId: string;
  tier: string;
  fontSize?: string | number;
  weight?: number;
}) {
  const isJanna = useIsJannaProfile();
  const [active, setActive] = React.useState(false);
  const cypher = isJanna && attrId === "power" && tier === "Dominant";

  if (!cypher) return <>{tier}</>;

  return (
    <Box
      component="span"
      tabIndex={0}
      aria-label="Dominant, cyphertext Submissive"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      sx={{ display: "inline-flex", cursor: "default", outline: "none" }}
    >
      <MorphLabel
        motion="scramble"
        words={JANNA_POWER_CYPHER}
        color="inherit"
        active={active}
        swaps={1}
        hold={700}
        fontSize={fontSize}
        weight={weight}
        letterSpacing={0.4}
        fontFamily="inherit"
      />
    </Box>
  );
}
