"use client";

/**
 * Character tile — interactive Storybook.
 *
 * Acceptance variants (per the Character & Screens plan):
 *   - FullyEquipped: actions, spells, active work, and goals all populated.
 *   - EmptyLoadout:  a fresh character with empty equipped slots.
 *   - Mobile:        narrow width.
 *
 * The "Open Spellbook" launcher (in Spells, and the Cast action) opens the
 * Spellbook overlay. White background per project Storybook conventions.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { LensIconModeProvider } from "@expanse/lens";

import { LOADOUT_EMPTY } from "@4eye/web/components/loadout";
import { CharacterTile } from "./CharacterTile";
import { CHARACTER_EMPTY } from "./store/seed-data";

const WHITE_BG = {
  backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
} as const;

const meta: Meta<typeof CharacterTile> = {
  title: "Character/Character Tile",
  component: CharacterTile,
  parameters: { layout: "padded", ...WHITE_BG },
};
export default meta;
type Story = StoryObj<typeof CharacterTile>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ p: 2, bgcolor: "#fff", display: "inline-block", width: "100%" }}>{children}</Box>
);

export const FullyEquipped: Story = {
  name: "Fully Equipped",
  render: () => (
    <Frame>
      <CharacterTile />
    </Frame>
  ),
};

export const EmptyLoadout: Story = {
  name: "Empty Loadout",
  render: () => (
    <Frame>
      <CharacterTile data={CHARACTER_EMPTY} loadout={LOADOUT_EMPTY} />
    </Frame>
  ),
};

export const LoadoutConfigured: Story = {
  name: "Loadout Configured (seed)",
  render: () => (
    <Frame>
      <CharacterTile />
    </Frame>
  ),
};

export const HandsMode: Story = {
  name: "Hands Mode",
  render: () => (
    <Frame>
      <LensIconModeProvider initialMode="hands">
        <CharacterTile />
      </LensIconModeProvider>
    </Frame>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <Box sx={{ width: 360, p: 1, bgcolor: "#fff" }}>
      <CharacterTile />
    </Box>
  ),
};
