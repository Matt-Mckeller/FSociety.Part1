import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { InspectorModal, type InspectorTab } from "./InspectorModal";

const meta: Meta<typeof InspectorModal> = {
  title: "HUD / Map / InspectorModal",
  component: InspectorModal,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    docs: {
      description: {
        component: `
**InspectorModal** — Plan §3.4 "Reusable Full-Screen Entity Modal".

A reusable, closable, full-screen surface for inspecting any entity. The
**action** is "Inspect / Analyze"; the **surface** is the **Inspector**.
Entity-agnostic: pass a title/subtitle/icon/accent + either \`tabs\` or
\`children\`. Closes via Esc, backdrop click, or the ✕ button (focus is
restored on close).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InspectorModal>;

const PageStage = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", p: 4 }}>{children}</Box>
);

const sampleTabs: InspectorTab[] = [
  {
    id: "overview",
    label: "Overview",
    icon: InfoRoundedIcon,
    content: (
      <Stack spacing={2}>
        <Typography sx={{ fontSize: "0.85rem", color: "#334155", lineHeight: 1.6 }}>
          The Harrah&apos;s Casino location is a primary node connecting several
          events and people across the investigation timeline.
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Location" size="small" />
          <Chip label="High activity" size="small" color="warning" />
          <Chip label="3 linked events" size="small" />
        </Stack>
      </Stack>
    ),
  },
  {
    id: "connections",
    label: "Connections",
    icon: AccountTreeRoundedIcon,
    content: (
      <Stack spacing={1.5}>
        {["Casino Dealer Matthew", "The Banker", "$20 Bill (green tape)"].map((c) => (
          <Box
            key={c}
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: "#f1f5f9",
              border: "1px solid #e2e8f0",
              fontSize: "0.8rem",
              color: "#1e293b",
            }}
          >
            {c}
          </Box>
        ))}
      </Stack>
    ),
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: TimelineRoundedIcon,
    content: (
      <Stack spacing={1.5}>
        {["Day 1 — Diamond man sighting", "Day 2 — Exchange", "Day 4 — Departure"].map((t, i) => (
          <Box key={t} sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#3b82f6", flexShrink: 0 }} />
            <Typography sx={{ fontSize: "0.8rem", color: "#334155" }}>
              {t}
            </Typography>
          </Box>
        ))}
      </Stack>
    ),
  },
];

export const Default: Story = {
  name: "Default — tabbed entity inspector",
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <PageStage>
        <Button variant="contained" onClick={() => setOpen(true)} startIcon={<TravelExploreRoundedIcon />}>
          Inspect entity
        </Button>
        <InspectorModal
          open={open}
          onClose={() => setOpen(false)}
          title="Harrah's Casino"
          subtitle="Location · LOCATION_HARRAHS_CASINO"
          icon={TravelExploreRoundedIcon}
          accentColor="#be3030"
          tabs={sampleTabs}
          actions={
            <Button size="small" variant="outlined" startIcon={<AutoAwesomeRoundedIcon />}>
              Analyze
            </Button>
          }
        />
      </PageStage>
    );
  },
};

export const PlainBody: Story = {
  name: "Plain body — no tabs",
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <PageStage>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open inspector
        </Button>
        <InspectorModal
          open={open}
          onClose={() => setOpen(false)}
          title="Casino Dealer Matthew"
          subtitle="Person · PERSON_CASINO_DEALER_MATTHEW"
          icon={PersonRoundedIcon}
          accentColor="#3b82f6"
          actions={
            <Button size="small" variant="text" startIcon={<ShareRoundedIcon />}>
              Share
            </Button>
          }
        >
          <Stack spacing={2}>
            <Typography sx={{ fontSize: "0.85rem", color: "#334155", lineHeight: 1.6 }}>
              A free-form body — render any entity content here when tabs aren&apos;t needed.
            </Typography>
            <Box sx={{ height: 160, borderRadius: 2, bgcolor: "#eff6ff", border: "1px solid #dbeafe" }} />
          </Stack>
        </InspectorModal>
      </PageStage>
    );
  },
};
