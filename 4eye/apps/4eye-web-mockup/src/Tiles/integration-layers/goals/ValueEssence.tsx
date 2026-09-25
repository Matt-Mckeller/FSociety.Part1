"use client";

/**
 * ValueEssence — Goal 2's always-visible art: a simple, calm read of the
 * whole idea — money in, the (color-cycling) coin stack, the crown.
 *
 * Deliberately minimal: the full "everything worth valuing" grid lives in
 * ValueMerge, revealed only on click/expand, so the resting state of this
 * goal isn't overwhelming.
 */

import { Box, Typography, alpha } from "@mui/material";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { AnimatedCoinStack } from "./AnimatedCoinStack";
import { LiquidCrown } from "./LiquidCrown";
import { useLayerSurface } from "../components/surfaceTokens";

const ACCENT = "#7cc4ff";

function Money() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
      {[0, 1, 2].map((i) => (
        <PaidRoundedIcon
          key={i}
          sx={{ fontSize: 26, color: "#5ad07f", ml: i ? "-9px" : 0, filter: "drop-shadow(0 0 4px #2f8f52)", zIndex: 3 - i }}
        />
      ))}
    </Box>
  );
}

export function ValueEssence() {
  const surface = useLayerSurface();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
        <Money />
        <EastRoundedIcon sx={{ fontSize: 18, color: alpha(ACCENT, 0.7) }} />
        <AnimatedCoinStack size={46} chipCircuit />
        <EastRoundedIcon sx={{ fontSize: 18, color: alpha(ACCENT, 0.7) }} />
        <LiquidCrown size={58} />
      </Box>
      <Typography sx={{ fontSize: "0.68rem", color: surface.text.faint, fontStyle: "italic" }}>
        Money is just one currency — many currencies in this game of life.
      </Typography>
    </Box>
  );
}
