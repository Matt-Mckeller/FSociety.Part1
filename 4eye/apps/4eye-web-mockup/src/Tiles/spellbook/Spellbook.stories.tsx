"use client";

/**
 * Spellbook tile — interactive Storybook (V1 mockup).
 *
 * Acceptance variants (per project-controller.md §Spellbook):
 *   - Keypad:        the full grid of spell cards (default).
 *   - PresetApplied: opens filtered to a curated mode (Learning Mode).
 *   - SplitView:     always-available vs contextual split layout.
 *   - Compact:       embeddable density (used inside the Character screen).
 *   - Sparse:        few spells, no presets (empty-ish states).
 *   - Mobile:        narrow width.
 *
 * White background per project Storybook conventions.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { LensIconModeProvider } from "@expanse/lens";

import { SpellbookTile } from "./SpellbookTile";
import { SPELLBOOK_SPARSE } from "./store/seed-data";

const WHITE_BG = {
  backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
} as const;

const meta: Meta<typeof SpellbookTile> = {
  title: "Spellbook/Spellbook Tile",
  component: SpellbookTile,
  parameters: { layout: "padded", ...WHITE_BG },
};
export default meta;
type Story = StoryObj<typeof SpellbookTile>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ p: 2, bgcolor: "#fff", display: "inline-block", width: "100%" }}>{children}</Box>
);

export const Keypad: Story = {
  name: "Keypad (default)",
  render: () => (
    <Frame>
      <SpellbookTile />
    </Frame>
  ),
};

export const PresetApplied: Story = {
  name: "Preset — Learning Mode",
  render: () => (
    <Frame>
      <SpellbookTile initialPresetId="PRESET_LEARNING" />
    </Frame>
  ),
};

export const SplitView: Story = {
  name: "Split (always vs contextual)",
  render: () => (
    <Frame>
      <SpellbookTile initialSplit />
    </Frame>
  ),
};

export const Compact: Story = {
  name: "Compact (embedded)",
  render: () => (
    <Frame>
      <SpellbookTile compact />
    </Frame>
  ),
};

export const Sparse: Story = {
  name: "Sparse (few spells)",
  render: () => (
    <Frame>
      <SpellbookTile data={SPELLBOOK_SPARSE} />
    </Frame>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <Box sx={{ width: 360, p: 1, bgcolor: "#fff" }}>
      <SpellbookTile compact />
    </Box>
  ),
};

export const HandsMode: Story = {
  name: "Hands Mode",
  render: () => (
    <Frame>
      <LensIconModeProvider initialMode="hands">
        <SpellbookTile />
      </LensIconModeProvider>
    </Frame>
  ),
};

export const SaveToBars: Story = {
  name: "Save to Action Bars",
  render: () => (
    <Frame>
      <SpellbookTile showBars />
    </Frame>
  ),
};
