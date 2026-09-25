"use client";

/**
 * ChipsRow — the three tagline chips above the product-layer column.
 *
 *   "Perfect Your Learning"  ·  "Transform Your Life"  ·  "Enjoy The Game"
 *
 * The third chip cypher-scrambles into a second reading via the shared
 * MorphLabel scramble. Each morphing word is width-locked (min-width sized to
 * its longer variant) so the pill NEVER reflows mid-scramble:
 *   Enjoy ⇄ Master   ·   The (static)   ·   Game ⇄ Craft
 */

import { Box, Typography, alpha } from "@mui/material";
import { SOFT_EMERALD, SOFT_CYAN, SOFT_AMBER } from "@expanse/theme";
import { MorphLabel } from "@4eye/web/components/hud/resourceBars/widgets";
import { useLayerSurface } from "./surfaceTokens";

const EMERALD = SOFT_EMERALD;
const CYAN = SOFT_CYAN;
const AMBER = SOFT_AMBER;

/** Reserve the width of the longer word so scrambling can't reflow the row. */
function FixedWord({ ch, children }: { ch: number; children: React.ReactNode }) {
  return (
    <Box sx={{ display: "inline-flex", justifyContent: "center", minWidth: `${ch}ch` }}>
      {children}
    </Box>
  );
}

function StaticChip({ label, accent }: { label: string; accent: string }) {
  const surface = useLayerSurface();
  return (
    <Box
      sx={{
        px: 1.4,
        py: 0.65,
        borderRadius: 999,
        border: `1px solid ${alpha(accent, 0.45)}`,
        bgcolor: alpha(accent, 0.1),
        boxShadow: `0 0 14px ${alpha(accent, 0.18)}`,
        whiteSpace: "nowrap",
      }}
    >
      <Typography sx={{ fontSize: "0.76rem", fontWeight: 800, letterSpacing: "0.03em", color: surface.ink(accent) }}>
        {label}
      </Typography>
    </Box>
  );
}

export function ChipsRow() {
  const surface = useLayerSurface();
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      <StaticChip label="Perfect Your Learning" accent={EMERALD} />
      <StaticChip label="Transform Your Life" accent={CYAN} />

      {/* Scrambling chip — Enjoy⇄Master · The · Game⇄Craft, each word width-locked */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4em",
          px: 1.4,
          py: 0.65,
          borderRadius: 999,
          border: `1px solid ${alpha(AMBER, 0.5)}`,
          bgcolor: alpha(AMBER, 0.1),
          boxShadow: `0 0 16px ${alpha(AMBER, 0.22)}`,
          whiteSpace: "nowrap",
        }}
      >
        <FixedWord ch={6.5}>
          <MorphLabel motion="scramble" words={["Enjoy", "Master"]} color={surface.ink(AMBER)} active hold={3200} maxPasses={null} fontSize="0.76rem" weight={800} letterSpacing={0.4} />
        </FixedWord>
        <Typography component="span" sx={{ fontSize: "0.76rem", fontWeight: 800, letterSpacing: "0.03em", color: surface.ink(AMBER) }}>
          The
        </Typography>
        <FixedWord ch={5.5}>
          <MorphLabel motion="scramble" words={["Game", "Craft"]} color={surface.ink(AMBER)} active hold={4300} maxPasses={null} fontSize="0.76rem" weight={800} letterSpacing={0.4} />
        </FixedWord>
      </Box>
    </Box>
  );
}
