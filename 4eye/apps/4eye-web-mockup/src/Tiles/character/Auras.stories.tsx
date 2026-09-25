"use client";

/**
 * Auras — interactive Storybook.
 *
 * The character's radiated auras as glowing tier cards. Each aura runs a ladder
 * of Degrees of Quality (e.g. Like -> Love -> Worship) bought with Influence,
 * can be toggled on/off, and only a plan-gated number can be applied at once.
 *
 * Variants:
 *   - MyAuras:     the player's own auras, all MAX, applied (Pro plan).
 *   - Progression: a mid-game mix — some maxed, some upgradeable, one locked.
 *   - EarlyGame:   mostly locked, showing Unlock affordances and costs.
 *   - PlanFree:    a 1-slot Free plan — apply one aura, the rest gate out.
 *   - PlanElite:   a 6-slot Elite plan — apply them all.
 *   - States:      static side-by-side of MAX / in-progress / locked.
 *
 * Interactive stories let you toggle auras (saved to localStorage in-app),
 * upgrade degrees, and watch the applied-slot meter gate at the cap. Hover a
 * tier pip to see that degree's name. White background per project convention.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Divider, Typography } from "@mui/material";

import {
  AURAS,
  AurasGrid,
  AURA_PROGRESS_MAX,
  AURA_PROGRESS_PROGRESSION,
  AURA_PROGRESS_LOCKED,
  type AuraActive,
} from "./components/Auras";
import { AuraGlyphsVariantGallery } from "./components/shared/AuraGlyphs";

const WHITE_BG = {
  backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
} as const;

// Derived from the registry so stories survive aura id renames.
const ALL_ON: AuraActive = Object.fromEntries(AURAS.map((a) => [a.id, true]));
const FIRST_ON: AuraActive = { [AURAS[0].id]: true };

const meta: Meta<typeof AurasGrid> = {
  title: "Character/Auras",
  component: AurasGrid,
  parameters: { layout: "padded", ...WHITE_BG },
};
export default meta;
type Story = StoryObj<typeof AurasGrid>;

const Frame = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ p: 2, bgcolor: "#fff", maxWidth: 720 }}>
    <Typography
      variant="overline"
      sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: 0.6, display: "block", mb: 0.75 }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export const MyAuras: Story = {
  name: "My Auras (all MAX)",
  render: () => (
    <Frame title="Auras">
      <AurasGrid progress={AURA_PROGRESS_MAX} persistKey="4eye:test:auras:v1" />
    </Frame>
  ),
};

export const Progression: Story = {
  name: "Progression (interactive)",
  render: () => (
    <Frame title="Auras">
      <AurasGrid progress={AURA_PROGRESS_PROGRESSION} balance={900} persistKey={null} />
    </Frame>
  ),
};

export const EarlyGame: Story = {
  name: "Early Game (mostly locked)",
  render: () => (
    <Frame title="Auras">
      <AurasGrid progress={AURA_PROGRESS_LOCKED} balance={400} persistKey={null} />
    </Frame>
  ),
};

export const PlanFree: Story = {
  name: "Free plan (1 slot)",
  render: () => (
    <Frame title="Auras — Free plan caps you at 1 applied">
      <AurasGrid progress={AURA_PROGRESS_MAX} active={FIRST_ON} cap={1} plan="Free" persistKey={null} />
    </Frame>
  ),
};

export const PlanElite: Story = {
  name: "Elite plan (6 slots)",
  render: () => (
    <Frame title="Auras — Elite plan unlocks all 6 slots">
      <AurasGrid progress={AURA_PROGRESS_MAX} active={ALL_ON} cap={6} plan="Elite" persistKey={null} />
    </Frame>
  ),
};

export const VisualizationVariants: Story = {
  name: "Collapsed badge variants",
  render: () => (
    <Frame title="AuraGlyphs — spatial & cypher reads for the collapsed Auras tile">
      <AuraGlyphsVariantGallery size={34} />
    </Frame>
  ),
};

export const States: Story = {
  name: "Degree States (side by side)",
  render: () => (
    <Box sx={{ p: 2, bgcolor: "#fff", maxWidth: 720, display: "flex", flexDirection: "column", gap: 2 }}>
      <Frame title="All MAX — applied auras glow">
        <AurasGrid progress={AURA_PROGRESS_MAX} interactive={false} persistKey={null} />
      </Frame>
      <Divider />
      <Frame title="In progress — upgradeable">
        <AurasGrid progress={AURA_PROGRESS_PROGRESSION} interactive={false} persistKey={null} />
      </Frame>
      <Divider />
      <Frame title="Locked — unlock to begin">
        <AurasGrid progress={AURA_PROGRESS_LOCKED} interactive={false} persistKey={null} />
      </Frame>
    </Box>
  ),
};
