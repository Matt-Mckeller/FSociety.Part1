"use client";

/**
 * Storybook notes for Evolve styles.
 * Live player: password-gated Profile Core media.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography } from "@mui/material";

/**
 * Placeholder story — the live player lives on Profile Core behind the
 * evolve.love password gate. Keep this file so Storybook indexes the family
 * without mounting yen Next routes.
 */
function EvolveFamilyNotes() {
  return (
    <Box sx={{ p: 3, maxWidth: 560 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
        Evolve() · styles
      </Typography>
      <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 2, lineHeight: 1.55 }}>
        Style 1 (linear Heart.Evolve) and Style 2 (branching Evolve) live on the personal
        profile, not on yen Vision. Open Core → Media and unlock with EVOLVE_LOVE_PASSWORD.
      </Typography>
      <Typography component="ul" sx={{ m: 0, pl: 2.5, fontSize: 13.5, lineHeight: 1.7 }}>
        <li>
          <strong>Profile Core · Media</strong> — album, stage player, notes (password gated)
        </li>
        <li>
          Yen <strong>/vision</strong> — product vision only (AION, Web 4, what ships)
        </li>
      </Typography>
    </Box>
  );
}

const meta: Meta<typeof EvolveFamilyNotes> = {
  title: "Yen / Evolve / Family",
  component: EvolveFamilyNotes,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof EvolveFamilyNotes>;

export const Notes: Story = {};
