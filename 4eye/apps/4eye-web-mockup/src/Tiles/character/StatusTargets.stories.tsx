"use client";

/**
 * Status Targets — Mood / Auras / Gear / Buffs as one grid → HUD → pin language.
 *
 * Variants:
 *   - SizeToggle:       Compact · Grid · Large with persisted toggle.
 *   - GridAndHud:       full section grid; auras collapsed to circular AuraGlyphs.
 *   - CombinedTile:     compact summary tile (legacy — prefer SizeToggle → Compact).
 *   - CircularAuras / ProfileStatusChips / Aura visualization galleries.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Divider, Stack, Typography } from "@mui/material";

import { CharacterProfileStore } from "./store/CharacterProfileStore";
import { LoadoutProvider } from "@4eye/web/components/loadout/store/LoadoutProvider";
import { StatusStrip } from "./components/DailyGrids";
import {
  AuraGlyphs,
  AuraGlyphsChip,
  AuraGlyphsVariantGallery,
  AURA_GLYPHS_VARIANTS,
  AURA_GLYPHS_VARIANT_META,
  type AuraGlyphsVariant,
} from "./components/shared/AuraGlyphs";
import { STATUS_TARGET_SIZE_META } from "./model/statusTargetSizes";
import {
  StatusTargets,
  StatusTargetsCombined,
  StatusTargetsSection,
} from "./components/StatusTargetsSection";

const WHITE_BG = {
  backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
} as const;

const meta: Meta<typeof StatusTargets> = {
  title: "Character/StatusTargets",
  component: StatusTargets,
  parameters: { layout: "padded", ...WHITE_BG },
  decorators: [
    (Story) => (
      <CharacterProfileStore>
        <LoadoutProvider>
          <Box sx={{ p: 2, maxWidth: 960, bgcolor: "#fff" }}>
            <Story />
          </Box>
        </LoadoutProvider>
      </CharacterProfileStore>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof StatusTargets>;

const Frame = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Stack sx={{ gap: 1.25 }}>
    <Typography
      variant="overline"
      sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: 0.6, display: "block" }}
    >
      {title}
    </Typography>
    {children}
  </Stack>
);

export const SizeToggle: Story = {
  name: "Size toggle — Compact · Grid · Large",
  render: () => (
    <Frame title="Toggle display size — Compact = one tile; Grid = full grid; Large = hero tiles + HUD">
      <StatusTargets />
    </Frame>
  ),
};

export const GridAndHud: Story = {
  name: "Grid → HUD → Pin",
  render: () => (
    <Frame title="Grid size — Mood · Auras (collapsed) · Gear · Buffs">
      <StatusTargets size="grid" showSizeToggle={false} />
    </Frame>
  ),
};

export const LargeGrid: Story = {
  name: "Large hero grid",
  render: () => (
    <Frame title={`Large — ${STATUS_TARGET_SIZE_META.large.minTile}px tiles, ${STATUS_TARGET_SIZE_META.large.maxWidth}px max width`}>
      <StatusTargets size="large" showSizeToggle={false} />
    </Frame>
  ),
};

export const ExpandedAuras: Story = {
  name: "Grid — Auras expanded",
  render: () => (
    <Frame title="Individual aura tiles at grid size">
      <StatusTargets size="grid" showSizeToggle={false} defaultAurasExpanded />
    </Frame>
  ),
};

export const CombinedTile: Story = {
  name: "Combined summary tile",
  render: () => (
    <Frame title="Compact only — one square tile expands into grid below">
      <StatusTargetsCombined />
    </Frame>
  ),
};

export const CircularAuras: Story = {
  name: "Circular Auras badge",
  render: () => (
    <Stack sx={{ gap: 2 }}>
      <Frame title="AuraGlyphs — active auras orbit one circle (Profile StatusStrip)">
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
          <AuraGlyphs size={22} />
          <AuraGlyphs size={28} />
          <AuraGlyphs size={36} />
        </Stack>
      </Frame>
      <Divider />
      <Frame title="AuraGlyphsChip — label + circle as used on Today">
        <AuraGlyphsChip size={18} />
      </Frame>
    </Stack>
  ),
};

export const AuraVisualizationVariants: Story = {
  name: "Auras — visualization variants",
  render: () => (
    <Stack sx={{ gap: 2 }}>
      <Frame title="Variant gallery — orbit · mono · web · field · cypher">
        <AuraGlyphsVariantGallery size={32} />
      </Frame>
      <Divider />
      <Frame title="Live grid — click Auras glyph or section ↻ to cycle (persists in localStorage)">
        <StatusTargetsSection />
      </Frame>
      <Divider />
      <Frame title="Collapsed Auras tile — web variant locked (Storybook)">
        <StatusTargetsSection auraGlyphsVariant="web" />
      </Frame>
    </Stack>
  ),
};

const VARIANT_GRID: AuraGlyphsVariant[] = [...AURA_GLYPHS_VARIANTS];

export const AuraTilesByVariant: Story = {
  name: "Auras tile — all variants",
  render: () => (
    <Stack sx={{ gap: 2 }}>
      {VARIANT_GRID.map((variant) => (
        <Frame
          key={variant}
          title={`${AURA_GLYPHS_VARIANT_META[variant].label} — ${AURA_GLYPHS_VARIANT_META[variant].hint}`}
        >
          <StatusTargetsSection auraGlyphsVariant={variant} />
        </Frame>
      ))}
    </Stack>
  ),
};

export const ProfileStatusChips: Story = {
  name: "Profile status chips",
  render: () => (
    <Stack sx={{ gap: 2 }}>
      <Frame title="StatusStrip — Profile Today lens (compact)">
        <StatusStrip />
      </Frame>
      <Divider />
      <Frame title="StatusStrip fill — SurfacedBand (equal-width chips)">
        <StatusStrip fill />
      </Frame>
    </Stack>
  ),
};

export const AllSizes: Story = {
  name: "All sizes — side by side",
  render: () => (
    <Stack sx={{ gap: 3 }}>
      {(["compact", "grid", "large"] as const).map((size) => (
        <Frame
          key={size}
          title={`${STATUS_TARGET_SIZE_META[size].label} — ${STATUS_TARGET_SIZE_META[size].hint}`}
        >
          <StatusTargets size={size} showSizeToggle={false} />
        </Frame>
      ))}
    </Stack>
  ),
};
