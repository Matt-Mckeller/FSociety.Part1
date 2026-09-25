"use client";

/**
 * GlassesPanel — row 6. AR is inherently sequential (world → recognized →
 * overlaid → acted on), so the media is a 3-frame slideshow above the
 * capability cards. Drop real POV stills into the frames later.
 */

import { Box } from "@mui/material";
import type { IntegrationLayer } from "../model/layers";
import { PanelShell, SectionLabel, InfoCardGrid } from "../components/shared";
import { MediaStage, type MediaFrame } from "../components/MediaStage";

const FRAMES: MediaFrame[] = [
  { label: "AR POV · Raw scene", caption: "1 — The world, as you see it through the glasses." },
  { label: "AR POV · Recognized", caption: "2 — Objects, text & people recognized and ranked by relevance." },
  { label: "AR POV · Overlaid + acted", caption: "3 — The HUD paints context onto the world; you act with a gesture." },
];

export function GlassesPanel({ layer }: { layer: IntegrationLayer }) {
  const accent = layer.accentColor;
  return (
    <PanelShell layer={layer}>
      <SectionLabel accent={accent}>The HUD, Painted Onto the World</SectionLabel>
      <Box sx={{ mb: 3, maxWidth: 620 }}>
        <MediaStage accent={accent} mode="slideshow" frames={FRAMES} aspectRatio="16 / 9" />
      </Box>

      <SectionLabel accent={accent}>How It Works</SectionLabel>
      <InfoCardGrid layer={layer} />
    </PanelShell>
  );
}
