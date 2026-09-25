"use client";

/**
 * ComputerPanel — row 2. An icon grid of the computer-layer capabilities
 * (apps + observability), followed by the in-frame HUD preview.
 */

import { Box, Grid, Typography, alpha } from "@mui/material";
import { motion } from "framer-motion";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import type { SvgIconProps } from "@mui/material";
import type { IntegrationLayer } from "../model/layers";
import { PanelShell, SectionLabel } from "../components/shared";
import { MiniHudStage } from "../hud/MiniHudStage";
import { useLayerSurface, useLayerInk } from "../components/surfaceTokens";

type Cap = { key: string; label: string; sub: string; Icon: React.ComponentType<SvgIconProps> };

const APPS: Cap[] = [
  { key: "chat", label: "AI Chat & Web Apps", sub: "Conversational OS", Icon: ChatRoundedIcon },
  { key: "webos", label: "Web OS", sub: "Game-native shell", Icon: WebRoundedIcon },
  { key: "real", label: "Real-World Layer", sub: "Screen ⇄ world bridge", Icon: PublicRoundedIcon },
];

const OBSERVABILITY: Cap[] = [
  { key: "video", label: "Video", sub: "Scene understanding", Icon: VideocamRoundedIcon },
  { key: "audio", label: "Audio", sub: "Acoustic intelligence", Icon: GraphicEqRoundedIcon },
  { key: "glasses", label: "Glasses", sub: "Ambient overlay", Icon: VisibilityRoundedIcon },
];

/**
 * Domains / Realms — the surfaces the Web OS spans. This is where "domains"
 * live in the product: the Computer layer is the OS, and the OS runs across
 * these realms (the same set the "Shift Realm" action jumps between).
 */
const DOMAINS: { key: string; label: string; sub: string; Icon: React.ComponentType<SvgIconProps> }[] = [
  { key: "web", label: "Website", sub: "Public / marketing realm", Icon: LanguageRoundedIcon },
  { key: "app", label: "App", sub: "The gamified HUD realm", Icon: PhoneIphoneRoundedIcon },
  { key: "tech", label: "Technical", sub: "Builder / dev realm", Icon: TerminalRoundedIcon },
  { key: "real", label: "Real-World", sub: "Physical-life realm", Icon: TravelExploreRoundedIcon },
];

function CapCard({ cap, accent, ink, i }: { cap: Cap; accent: string; ink: string; i: number }) {
  const { Icon } = cap;
  const surface = useLayerSurface();
  return (
    <Grid size={{ zero: 6, tablet: 4 }}>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}>
        <Box
          sx={{
            p: 1.75,
            height: "100%",
            borderRadius: 2,
            border: `1px solid ${alpha(accent, 0.24)}`,
            background: `linear-gradient(135deg, ${alpha(accent, 0.1)} 0%, ${surface.cardBg} 100%)`,
            transition: "border-color 160ms ease, transform 160ms ease",
            "&:hover": { borderColor: alpha(accent, 0.55), transform: "translateY(-2px)" },
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(accent, 0.12),
              border: `1px solid ${alpha(accent, 0.3)}`,
              mb: 1.25,
            }}
          >
            <Icon sx={{ fontSize: 20, color: ink, filter: `drop-shadow(0 0 5px ${alpha(accent, 0.6)})` }} />
          </Box>
          <Typography sx={{ fontSize: "0.86rem", fontWeight: 700, color: surface.text.hi, lineHeight: 1.2 }}>
            {cap.label}
          </Typography>
          <Typography sx={{ fontSize: "0.72rem", color: surface.text.lo, mt: 0.35 }}>{cap.sub}</Typography>
        </Box>
      </motion.div>
    </Grid>
  );
}

export function ComputerPanel({ layer }: { layer: IntegrationLayer }) {
  const accent = layer.accentColor;
  const surface = useLayerSurface();
  const { ink } = useLayerInk(layer);
  return (
    <PanelShell layer={layer}>
      <Box sx={{ mb: 3 }}>
        <SectionLabel accent={accent}>AI Chat & Web Apps · Web OS · Real-World Layer</SectionLabel>
        <Grid container spacing={1.5}>
          {APPS.map((c, i) => (
            <CapCard key={c.key} cap={c} accent={accent} ink={ink} i={i} />
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 3 }}>
        <SectionLabel accent={accent}>Observability Integrations</SectionLabel>
        <Grid container spacing={1.5}>
          {OBSERVABILITY.map((c, i) => (
            <CapCard key={c.key} cap={c} accent={accent} ink={ink} i={i} />
          ))}
        </Grid>
      </Box>

      {/* Domains / Realms — the surfaces the Web OS spans */}
      <Box sx={{ mb: 3 }}>
        <SectionLabel accent={accent}>Domains · The Realms It Spans</SectionLabel>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {DOMAINS.map(({ key, label, sub, Icon }, i) => (
            <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, delay: 0.05 + i * 0.05 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.25,
                  py: 0.85,
                  borderRadius: 999,
                  border: `1px solid ${alpha(accent, 0.3)}`,
                  bgcolor: alpha(accent, 0.08),
                  transition: "border-color 160ms ease, background 160ms ease",
                  "&:hover": { borderColor: alpha(accent, 0.6), bgcolor: alpha(accent, 0.14) },
                }}
              >
                <Icon sx={{ fontSize: 17, color: ink }} />
                <Box>
                  <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: surface.text.hi, lineHeight: 1.1 }}>{label}</Typography>
                  <Typography sx={{ fontSize: "0.64rem", color: surface.text.lo, lineHeight: 1.1 }}>{sub}</Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>

      <MiniHudStage />
    </PanelShell>
  );
}
