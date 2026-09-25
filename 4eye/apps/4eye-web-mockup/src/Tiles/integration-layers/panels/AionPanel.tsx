"use client";

/**
 * AionPanel — row 8, the apex. Full-dive is a feeling/mood, so one arresting
 * cinematic hero (or a short ambient loop, if you have footage) sells it best.
 * Swap the MediaStage to mode="video" + videoSrc when the loop is ready.
 */

import { Box } from "@mui/material";
import type { IntegrationLayer } from "../model/layers";
import { PanelShell, SectionLabel, InfoCardGrid } from "../components/shared";
import { MediaStage } from "../components/MediaStage";
import { AionWorkingNotes } from "../components/AionWorkingNotes";

export function AionPanel({ layer }: { layer: IntegrationLayer }) {
  const accent = layer.accentColor;
  return (
    <PanelShell layer={layer}>
      <SectionLabel accent={accent}>Every Layer, Converged</SectionLabel>
      <Box sx={{ mb: 3, maxWidth: 720 }}>
        {/* For an ambient loop instead: mode="video" videoSrc="…" poster="…" */}
        <MediaStage
          accent={accent}
          mode="single"
          frames={[{ label: "AION · Full-dive cinematic hero", caption: "Host AI / OS — creator root, full dive, looping toward infinity." }]}
          aspectRatio="21 / 9"
        />
      </Box>

      <SectionLabel accent={accent}>Working notes</SectionLabel>
      <AionWorkingNotes layer={layer} />

      <SectionLabel accent={accent}>Host · Creator · Full Dive</SectionLabel>
      <InfoCardGrid layer={layer} />
    </PanelShell>
  );
}
