"use client";

/**
 * Loadout — shared action-bar configuration Storybook.
 *
 * Covers the Planning/Implementation/Improvement bars (empty/seeded), the
 * quality-tier badges, and the assign/create dialogs. Interactive: hover an
 * action for the remove "×", open the pickers to assign or create actions.
 */

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Button, Stack, Typography } from "@mui/material";

import { ActionBarsPanel } from "./components/ActionBarsPanel";
import { ActionGlyph } from "./components/ActionGlyph";
import { ActionPickerDialog } from "./components/ActionPickerDialog";
import { CustomActionDialog } from "./components/CustomActionDialog";
import { LoadoutPages } from "./components/LoadoutPages";
import { QUALITY_TIERS, QUALITY_TIER_META, type LoadoutActionRef } from "./model/types";
import { LoadoutProvider, useLoadout } from "./store/LoadoutProvider";
import { LOADOUT_EMPTY } from "./store/seed-data";
import { statusTargetKey } from "@4eye/web/Tiles/character/model/statusTargets";

const WHITE_BG = {
  backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
} as const;

const meta: Meta = {
  title: "Loadout/Action Bars",
  parameters: { layout: "padded", ...WHITE_BG },
};
export default meta;
type Story = StoryObj;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ p: 2, bgcolor: "#fff", display: "inline-block", minWidth: 420 }}>{children}</Box>
);

export const Seeded: Story = {
  name: "Bars (seeded)",
  render: () => (
    <Frame>
      <LoadoutProvider>
        <ActionBarsPanel />
      </LoadoutProvider>
    </Frame>
  ),
};

export const Empty: Story = {
  name: "Bars (empty)",
  render: () => (
    <Frame>
      <LoadoutProvider data={LOADOUT_EMPTY}>
        <ActionBarsPanel />
      </LoadoutProvider>
    </Frame>
  ),
};

export const KeypadPages: Story = {
  name: "Keypad Pages",
  render: () => (
    <Frame>
      <LoadoutProvider>
        <LoadoutPages />
      </LoadoutProvider>
    </Frame>
  ),
};

function QualityTiersDemo() {
  const { resolve } = useLoadout();
  const refs: LoadoutActionRef[] = [
    { kind: "spell", spellId: "SPELL_CONCISE" },
    { kind: "spell", spellId: "SPELL_ANALYZE" },
    { kind: "custom", customId: "CUSTOM_BOOST" },
  ];
  return (
    <Stack sx={{ gap: 2 }}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        {QUALITY_TIERS.map((tier) => (
          <Stack key={tier} sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: QUALITY_TIER_META[tier].color,
                transform: "rotate(45deg)",
                borderRadius: "2px",
              }}
            />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {QUALITY_TIER_META[tier].label}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Stack sx={{ flexDirection: "row", gap: 1 }}>
        {refs.map((ref) => {
          const resolved = resolve(ref);
          return resolved ? <ActionGlyph key={resolved.key} action={resolved} /> : null;
        })}
      </Stack>
    </Stack>
  );
}

export const QualityTiers: Story = {
  name: "Quality Tiers",
  render: () => (
    <Frame>
      <LoadoutProvider>
        <QualityTiersDemo />
      </LoadoutProvider>
    </Frame>
  ),
};

function PickerDemo() {
  const [open, setOpen] = React.useState(false);
  const [picked, setPicked] = React.useState<string | null>(null);
  return (
    <Stack sx={{ gap: 1, alignItems: "flex-start" }}>
      <Button variant="outlined" onClick={() => setOpen(true)} sx={{ textTransform: "none", fontWeight: 700 }}>
        Open action picker
      </Button>
      {picked && (
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Picked: {picked}
        </Typography>
      )}
      <ActionPickerDialog
        open={open}
        title="Pick an action"
        onClose={() => setOpen(false)}
        onSelect={(ref) =>
          setPicked(
            ref.kind === "spell"
              ? ref.spellId
              : ref.kind === "custom"
                ? ref.customId
                : statusTargetKey(ref.target),
          )
        }
      />
    </Stack>
  );
}

export const ActionPicker: Story = {
  name: "Action Picker",
  render: () => (
    <Frame>
      <LoadoutProvider>
        <PickerDemo />
      </LoadoutProvider>
    </Frame>
  ),
};

function CustomActionDemo() {
  const [open, setOpen] = React.useState(false);
  const { state } = useLoadout();
  return (
    <Stack sx={{ gap: 1, alignItems: "flex-start" }}>
      <Button variant="outlined" onClick={() => setOpen(true)} sx={{ textTransform: "none", fontWeight: 700 }}>
        New custom action
      </Button>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {state.customActions.length} custom action(s): {state.customActions.map((c) => c.name).join(", ")}
      </Typography>
      <CustomActionDialog open={open} onClose={() => setOpen(false)} />
    </Stack>
  );
}

export const CustomAction: Story = {
  name: "Custom Action Dialog",
  render: () => (
    <Frame>
      <LoadoutProvider>
        <CustomActionDemo />
      </LoadoutProvider>
    </Frame>
  ),
};
