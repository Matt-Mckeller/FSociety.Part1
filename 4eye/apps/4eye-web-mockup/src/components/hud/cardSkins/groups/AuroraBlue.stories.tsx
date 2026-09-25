import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography } from "@mui/material";

import { CARD_SKINS } from "@expanse/hud"

import { SkinPreview } from "../shared/SkinPreview";
import {
  makeSkinStory,
  SKIN_GROUP_META_PARAMETERS,
} from "../shared/makeSkinStory";

const AURORA_BLUE_IDS = [
  "neonGlow/aurora-blue-ice",
  "neonGlow/aurora-blue-deep-sea",
  "neonGlow/aurora-blue-arctic",
  "neonGlow/aurora-blue-electric",
  "neonGlow/aurora-blue-teal-mist",
  "neonGlow/aurora-blue-midnight",
  "neonGlow/aurora-blue-glacial",
  "neonGlow/aurora-blue-lagoon",
  "neonGlow/aurora-blue-storm",
  "neonGlow/aurora-blue-abyssal",
] as const;

const meta: Meta = {
  title: "HUD / Map / Card Skins / D · Aurora Blue (10 variants)",
  parameters: SKIN_GROUP_META_PARAMETERS,
};
export default meta;

type Story = StoryObj;

/**
 * All 10 aurora-blue variants on a single screen for at-a-glance
 * comparison. Iterates on `neonGlow/aurora` by replacing the magenta
 * accent with cyan / teal / azure / indigo pairings so the cards
 * harmonize with the rest of the cool-blue HUD palette.
 */
export const AllTen: Story = {
  name: "All 10 — grid (5 × 2)",
  render: () => (
    <Box sx={{ p: 3, bgcolor: "#ffffff", minHeight: "100vh" }}>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: "1.4rem", fontWeight: 800, color: "#0B1626" }}>
          Aurora · blue iterations
        </Typography>
        <Typography sx={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.65)" }}>
          10 takes on the dual-color aurora glow, all staying inside
          the blue / teal / cyan / azure palette. The first card in
          each stack is selected so you can judge how the accent ring
          interacts with the recommended affordance.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 2,
        }}
      >
        {AURORA_BLUE_IDS.map((id) => {
          const skin = CARD_SKINS[id];
          return (
            <SkinPreview
              key={id}
              skin={id}
              caption={id}
              label={skin?.label}
            />
          );
        })}
      </Box>
    </Box>
  ),
};

// Per-skin stories that mount the real overlay with the chosen
// aurora-blue variant applied to the right-rail cards.
export const Ice          = makeSkinStory("neonGlow/aurora-blue-ice",        "Aurora · blue ice");
export const DeepSea      = makeSkinStory("neonGlow/aurora-blue-deep-sea",   "Aurora · deep sea");
export const Arctic       = makeSkinStory("neonGlow/aurora-blue-arctic",     "Aurora · arctic");
export const Electric     = makeSkinStory("neonGlow/aurora-blue-electric",   "Aurora · electric");
export const TealMist     = makeSkinStory("neonGlow/aurora-blue-teal-mist",  "Aurora · teal mist");
export const Midnight     = makeSkinStory("neonGlow/aurora-blue-midnight",   "Aurora · midnight");
export const Glacial      = makeSkinStory("neonGlow/aurora-blue-glacial",    "Aurora · glacial");
export const Lagoon       = makeSkinStory("neonGlow/aurora-blue-lagoon",     "Aurora · lagoon");
export const Storm        = makeSkinStory("neonGlow/aurora-blue-storm",      "Aurora · storm");
export const Abyssal      = makeSkinStory("neonGlow/aurora-blue-abyssal",    "Aurora · abyssal");
