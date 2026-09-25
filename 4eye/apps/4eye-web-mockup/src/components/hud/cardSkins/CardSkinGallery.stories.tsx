import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography } from "@mui/material";

import { CARD_SKIN_GROUPS, CARD_SKINS, DEFAULT_CARD_SKIN_ID } from "@expanse/hud"
import type { CardSkinGroup } from "@expanse/hud"

import { FullScreenMapView } from "../FullScreenMapView";
import { OverlayStoryShell } from "./shared/OverlayStoryShell";
import { SkinPreview } from "./shared/SkinPreview";

const GROUP_LABEL: Record<CardSkinGroup, string> = {
  frostedGlass: "A · Frosted Glass",
  paperInk: "B · Paper Ink",
  duotoneGradient: "C · Duotone Gradient",
  neonGlow: "D · Neon Glow",
  legacyDeep: "E · Legacy Deep",
};

const GROUP_ORDER: CardSkinGroup[] = [
  "frostedGlass",
  "paperInk",
  "duotoneGradient",
  "neonGlow",
  "legacyDeep",
];

const meta: Meta = {
  title: "HUD / Map / Card Skins / Gallery",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
};
export default meta;

type Story = StoryObj;

/**
 * All 25 skins on one screen — a 5×5 grid (one row per group).
 *
 * Each cell is a self-contained mini NBA stack so contrast is honestly
 * tested against the *white* gallery background. The first card in
 * each stack runs the production "recommended" treatment so you can
 * judge the affordance + skin combo at a glance.
 */
export const AllTwentyFive: Story = {
  name: "All 25 — grid (5 × 5)",
  render: () => (
    <Box sx={{ p: 3, bgcolor: "#ffffff", minHeight: "100vh" }}>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: "1.4rem", fontWeight: 800, color: "#0B1626" }}>
          Card skin gallery — 5 groups × 5 variants
        </Typography>
        <Typography sx={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.65)" }}>
          Each row is one skin group. The first card in every stack is
          marked recommended (amber glow). The default production skin
          is the very first cell:{" "}
          <code>{DEFAULT_CARD_SKIN_ID}</code>.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {GROUP_ORDER.map((group) => {
          const skins = CARD_SKIN_GROUPS[group];
          return (
            <Box key={group}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: 1.4,
                  textTransform: "uppercase",
                  color: "rgba(15,23,42,0.55)",
                  mb: 1,
                }}
              >
                {GROUP_LABEL[group]}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                  gap: 2,
                }}
              >
                {skins.map((skin) => (
                  <SkinPreview
                    key={skin.id}
                    skin={skin.id}
                    caption={skin.id}
                    label={skin.label}
                  />
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  ),
};

interface CompareArgs {
  skin: string;
}

/**
 * Real overlay + frosted-glass baseline pinned in the top-right
 * corner. Use the `skin` arg to swap the overlay's right-rail card
 * skin while the frosted baseline stays put so you can A/B both at
 * once on a single screen.
 */
export const CompareOnRealOverlay: StoryObj<CompareArgs> = {
  name: "Compare — overlay + frosted baseline pinned",
  argTypes: {
    skin: {
      control: { type: "select" },
      options: Object.keys(CARD_SKINS),
    },
  },
  args: { skin: "paperInk/clean" },
  render: (args) => (
    <OverlayStoryShell>
      <FullScreenMapView cardSkin={args.skin} />
      {/* Frosted-glass baseline pinned top-right so the brief's
          "frosted style at the top, on the same screen" constraint
          is satisfied while every other skin is iterated below. */}
      <Box
        sx={{
          position: "fixed",
          top: 96,
          right: 24,
          width: 280,
          zIndex: 2000,
          pointerEvents: "none",
          // Dark backing strip so the frosted-glass baseline cards
          // render at full contrast even when the overlay's right
          // rail is set to a light skin.
          bgcolor: "#1B2638",
          borderRadius: 2,
          p: 1,
          boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: "0.65rem",
            letterSpacing: 1.2,
            fontWeight: 700,
            opacity: 0.7,
            mb: 0.5,
            px: 0.5,
          }}
        >
          BASELINE — frostedGlass/dark-base
        </Typography>
        <SkinPreview skin={DEFAULT_CARD_SKIN_ID} />
      </Box>
    </OverlayStoryShell>
  ),
};
