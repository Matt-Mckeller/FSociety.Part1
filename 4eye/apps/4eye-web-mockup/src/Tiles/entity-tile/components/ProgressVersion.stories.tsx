"use client";

/**
 * Progress & Versions — the completion / versioning indicator.
 *
 * A new planning dimension distinct from Status (one lifecycle state) and
 * Weight (importance): how much of an item's envisioned scope is DONE, how
 * much is committed (planned), and how much is still open horizon (ideas) —
 * with named version milestones (MVP / v2 / v3 …) overlaid on the bar.
 *
 *   ProgressMeter   — compact row form (bar + version chip).
 *   VersionTimeline — detailed expanded-card form (labeled ticks + version list).
 *
 * White background per project storybook conventions.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import type { ProgressTrait } from "@4eye/types";

import { ProgressOrb, VersionTimeline } from "./slot-visuals";

const meta: Meta = {
  title: "Command Center/Progress & Versions",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

/* ----------------------------------------------------------------- fixtures */

const hudLayout: ProgressTrait = {
  kind: "progress",
  done: 78,
  planned: 12,
  milestones: [
    { at: 40, label: "MVP", note: "Overlay shell + resource/action bars usable end-to-end." },
    { at: 70, label: "v2", note: "Surface composition, HUD nav, and intro polish." },
    { at: 90, label: "v3", note: "Card skins, spatial nav toggle, and full theming." },
  ],
};

const preMvp: ProgressTrait = {
  kind: "progress",
  done: 22,
  planned: 38,
  milestones: [
    { at: 40, label: "MVP", note: "First usable end-to-end slice." },
    { at: 75, label: "v2", note: "Feature-complete and polished." },
  ],
};

const justMvp: ProgressTrait = {
  kind: "progress",
  done: 55,
  planned: 25,
  milestones: [
    { at: 50, label: "MVP", note: "Usable — the minimum lovable slice ships." },
    { at: 75, label: "v2", note: "Depth, edge cases, and polish." },
    { at: 95, label: "v3", note: "Delight + full theming." },
  ],
};

const nearDone: ProgressTrait = {
  kind: "progress",
  done: 94,
  planned: 4,
  milestones: [
    { at: 50, label: "MVP" },
    { at: 80, label: "v2" },
    { at: 92, label: "v3", note: "Shipped; only finishing touches remain." },
  ],
};

const noVersions: ProgressTrait = { kind: "progress", done: 60, planned: 30 };

/* ------------------------------------------------------------------- helpers */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ bgcolor: "#fff", p: 3, minHeight: "100vh" }}>{children}</Box>
  );
}

/** A faux list row to show the compact meter exactly as it reads in QuestsView. */
function Row({ name, rank, progress }: { name: string; rank: string; progress: ProgressTrait }) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1.5,
        px: 1.5,
        py: 1,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {name}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {rank}
        </Typography>
      </Box>
      <ProgressOrb progress={progress} />
    </Stack>
  );
}

function Card({ title, progress }: { title: string; progress: ProgressTrait }) {
  return (
    <Box
      sx={{
        width: 420,
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
        {title}
      </Typography>
      <VersionTimeline progress={progress} />
    </Box>
  );
}

/* -------------------------------------------------------------------- stories */

/** The compact bar as it appears in each Quests / Campaign list row. */
export const RowIndicators: Story = {
  render: () => (
    <Frame>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
        Compact row indicator — completion orb
      </Typography>
      <Stack spacing={1} sx={{ maxWidth: 560 }}>
        <Row name="Concept (pre-MVP)" rank="Quest · Epic" progress={preMvp} />
        <Row name="Just usable (MVP)" rank="Quest · Epic" progress={justMvp} />
        <Row name="HUD Layout" rank="Storyline · Project" progress={hudLayout} />
        <Row name="Nearly shipped (v3)" rank="Quest · Epic" progress={nearDone} />
        <Row name="No named versions" rank="Quest · Epic" progress={noVersions} />
      </Stack>
      <Typography variant="caption" sx={{ display: "block", mt: 2, color: "text.secondary", maxWidth: 560 }}>
        Each row shows a single orb: the ring fills to the done %, with the
        number at its center. Hover for the full done / planned / ideas +
        version breakdown. The full bar + version timeline lives in the
        expanded card.
      </Typography>
    </Frame>
  ),
};

/** The detailed timeline as it appears inside the expanded inspector card. */
export const ExpandedCards: Story = {
  render: () => (
    <Frame>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
        Expanded card — full version timeline
      </Typography>
      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
        <Card title="HUD Layout (Storyline)" progress={hudLayout} />
        <Card title="Concept (pre-MVP)" progress={preMvp} />
        <Card title="Just usable (MVP)" progress={justMvp} />
        <Card title="Nearly shipped (v3)" progress={nearDone} />
      </Stack>
    </Frame>
  ),
};
