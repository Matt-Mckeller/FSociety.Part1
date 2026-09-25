"use client";

/**
 * Sample — Stacked Layers Infographic
 *
 * Demonstrates the AI integration layer stack tile and its sub-components.
 *
 * Stories:
 *   - Default       Full interactive tile (stack → click → detail → back).
 *   - StackOnly     Just the LayerStack visual, no TileContainer chrome.
 *   - DetailAION    Detail view for the AION (foundation) layer, pre-opened.
 *   - DetailChat    Detail view for AI Chat (apex) layer, pre-opened.
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";

import { SampleTile } from "./SampleTile";
import { LayerStack } from "./components/LayerStack";
import { LayerDetail } from "./components/LayerDetail";
import { SAMPLE_LAYERS } from "./model/layers";

// ── shared dark frame that matches the tile's background ──────────────────

const DARK_BG = {
  backgrounds: {
    default: "dark",
    values: [
      { name: "dark", value: "#07091a" },
      { name: "white", value: "#ffffff" },
    ],
  },
} as const;

/** Full-viewport dark frame — same feel as the HUD. */
const FullFrame = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      height: "100vh",
      width: "100%",
      boxSizing: "border-box",
      background: "linear-gradient(160deg, #07091a 0%, #0b1228 60%, #0a0e22 100%)",
    }}
  >
    {children}
  </Box>
);

// ── meta ──────────────────────────────────────────────────────────────────

const meta: Meta<typeof SampleTile> = {
  title: "Sample/Layer Stack",
  component: SampleTile,
  parameters: { layout: "fullscreen", ...DARK_BG },
};
export default meta;
type Story = StoryObj<typeof SampleTile>;

// ── stories ───────────────────────────────────────────────────────────────

/** Full interactive tile — click any layer to enter the detail view, back to return. */
export const Default: Story = {
  name: "Full Tile (interactive)",
  render: () => (
    <FullFrame>
      <SampleTile />
    </FullFrame>
  ),
};

/**
 * Just the LayerStack visual component in isolation — useful for iterating
 * on block geometry, colors, and hover states without the tile chrome.
 */
export const StackOnly: Story = {
  name: "Stack — isolated",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <FullFrame>
        <LayerStack
          layers={SAMPLE_LAYERS}
          onSelect={setSelected}
          selectedId={selected}
          pendingId={null}
        />
      </FullFrame>
    );
  },
};

/** Detail view for AION — the deepest/foundation layer. */
export const DetailAion: Story = {
  name: "Detail — AION (foundation)",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = useState(true);
    const layer = SAMPLE_LAYERS.find((l) => l.id === "aion")!;
    const adjacent = [SAMPLE_LAYERS.find((l) => l.id === "brainwave")!];
    return (
      <FullFrame>
        {visible ? (
          <LayerDetail
            layer={layer}
            adjacentLayers={adjacent}
            onBack={() => setVisible(false)}
            onNavigate={() => undefined}
          />
        ) : (
          <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            Back pressed — reload story to reset
          </Box>
        )}
      </FullFrame>
    );
  },
};

/** Detail view for AI Chat — the apex layer. */
export const DetailAiChat: Story = {
  name: "Detail — AI Chat (apex)",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = useState(true);
    const layer = SAMPLE_LAYERS.find((l) => l.id === "chat")!;
    const adjacent = [SAMPLE_LAYERS.find((l) => l.id === "audio")!];
    return (
      <FullFrame>
        {visible ? (
          <LayerDetail
            layer={layer}
            adjacentLayers={adjacent}
            onBack={() => setVisible(false)}
            onNavigate={() => undefined}
          />
        ) : (
          <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            Back pressed — reload story to reset
          </Box>
        )}
      </FullFrame>
    );
  },
};

/** Stack with AION pre-selected (highlight shown). */
export const StackWithSelection: Story = {
  name: "Stack — with AION highlighted",
  render: () => (
    <FullFrame>
      <LayerStack
        layers={SAMPLE_LAYERS}
        onSelect={() => undefined}
        selectedId="aion"
        pendingId={null}
      />
    </FullFrame>
  ),
};
