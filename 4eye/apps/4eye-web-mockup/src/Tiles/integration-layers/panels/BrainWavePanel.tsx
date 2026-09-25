"use client";

/**
 * BrainWavePanel — row 7. Abstract, invisible tech — one strong conceptual
 * hero plus a small signal → intent → action diagram reads clearer than a
 * carousel of near-identical renders.
 */

import { Box, Typography, alpha } from "@mui/material";
import { motion } from "framer-motion";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import type { SvgIconProps } from "@mui/material";
import type { IntegrationLayer } from "../model/layers";
import { PanelShell, SectionLabel, InfoCardGrid } from "../components/shared";
import { MediaStage } from "../components/MediaStage";
import { useLayerSurface } from "../components/surfaceTokens";

const STEPS: { key: string; label: string; Icon: React.ComponentType<SvgIconProps> }[] = [
  { key: "signal", label: "Neural signal", Icon: GraphicEqRoundedIcon },
  { key: "intent", label: "Decoded intent", Icon: PsychologyRoundedIcon },
  { key: "action", label: "Instant action", Icon: BoltRoundedIcon },
];

function SignalDiagram({ accent }: { accent: string }) {
  const surface = useLayerSurface();
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, flexWrap: "wrap", mb: 3 }}>
      {STEPS.map(({ key, label, Icon }, i) => (
        <Box key={key} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.6,
              px: 1.75,
              py: 1.25,
              borderRadius: 2,
              minWidth: 92,
              border: `1px solid ${alpha(accent, 0.4)}`,
              bgcolor: alpha(accent, 0.08),
            }}
          >
            <Icon sx={{ fontSize: 22, color: surface.ink(accent), filter: `drop-shadow(0 0 6px ${alpha(accent, 0.6)})` }} />
            <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color: surface.text.hi, textAlign: "center" }}>{label}</Typography>
          </Box>
          {i < STEPS.length - 1 && (
            <Box
              component={motion.div}
              animate={{ x: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >
              <EastRoundedIcon sx={{ fontSize: 20, color: surface.ink(accent) }} />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

export function BrainWavePanel({ layer }: { layer: IntegrationLayer }) {
  const accent = layer.accentColor;
  return (
    <PanelShell layer={layer}>
      <SectionLabel accent={accent}>Thought-Speed Input</SectionLabel>
      <Box sx={{ mb: 3, maxWidth: 620 }}>
        <MediaStage accent={accent} mode="single" frames={[{ label: "brainwave concept hero", caption: "Direct neural interface — cognition bridged to compute." }]} aspectRatio="16 / 9" />
      </Box>

      <SignalDiagram accent={accent} />

      <SectionLabel accent={accent}>The Interface</SectionLabel>
      <InfoCardGrid layer={layer} />
    </PanelShell>
  );
}
