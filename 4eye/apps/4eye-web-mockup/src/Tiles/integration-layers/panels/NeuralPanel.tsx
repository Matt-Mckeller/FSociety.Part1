"use client";

/**
 * NeuralPanel — row 5. The 4eye HUD with the 4eye character at the center,
 * actions arranged on the body (orbital action nodes), plus real action bars.
 */

import { Box, Typography, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { Character4eye } from "@expanse/character/2d";
import { GameActionBar, OrbBar } from "@expanse/hud";
import CenterFocusStrongRoundedIcon from "@mui/icons-material/CenterFocusStrongRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import DirectionsRunRoundedIcon from "@mui/icons-material/DirectionsRunRounded";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import type { SvgIconProps } from "@mui/material";
import type { IntegrationLayer } from "../model/layers";
import { PanelShell, SectionLabel, TronTooltip } from "../components/shared";
import { useLayerSurface, useLayerInk } from "../components/surfaceTokens";

const BODY_ACTIONS: { key: string; label: string; hint: string; Icon: React.ComponentType<SvgIconProps> }[] = [
  { key: "focus", label: "Focus", hint: "Enter a deep-focus state and track it.", Icon: CenterFocusStrongRoundedIcon },
  { key: "learn", label: "Learn", hint: "Start a learning loop tuned to your level.", Icon: SchoolRoundedIcon },
  { key: "move", label: "Move", hint: "Log movement and earn real-world progress.", Icon: DirectionsRunRoundedIcon },
  { key: "rest", label: "Rest", hint: "Recover — rest is part of the loop.", Icon: BedtimeRoundedIcon },
  { key: "create", label: "Create", hint: "Cast a creative action into the world.", Icon: AutoAwesomeRoundedIcon },
  { key: "connect", label: "Connect", hint: "Reach out — bond and build relationships.", Icon: FavoriteRoundedIcon },
];

const RADIUS = 46; // % of the stage box — wide enough to clear the larger figure

export function NeuralPanel({ layer }: { layer: IntegrationLayer }) {
  const accent = layer.accentColor;
  const surface = useLayerSurface();
  const { ink } = useLayerInk(layer);
  return (
    <PanelShell layer={layer}>
      <SectionLabel accent={accent}>The 4eye Neural Controller</SectionLabel>

      {/* Character stage with body actions */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 440,
          aspectRatio: "1 / 1",
          mx: "auto",
          mb: 3,
        }}
      >
        {/* orbit rings */}
        {[0.98, 0.66].map((s, i) => (
          <Box
            key={i}
            aria-hidden
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${s * 100}%`,
              height: `${s * 100}%`,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `1px dashed ${alpha(accent, 0.28)}`,
              "@keyframes spin": { to: { transform: "translate(-50%, -50%) rotate(360deg)" } },
              animation: `spin ${34 + i * 16}s linear ${i % 2 ? "reverse" : "normal"} infinite`,
            }}
          />
        ))}

        {/* center glow */}
        <Box aria-hidden sx={{ position: "absolute", inset: "18%", borderRadius: "50%", background: `radial-gradient(circle, ${alpha(accent, 0.28)} 0%, transparent 70%)`, filter: "blur(14px)" }} />

        {/* 4eye character — enlarged centerpiece */}
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "54%", display: "flex", justifyContent: "center" }}>
          <Character4eye compact variant="tech" mood="alert" showStatusLEDs showAntenna showForeheadMark showEarSensors pulseIntensity={2} eyeGlowColor={accent} />
        </Box>

        {/* body action nodes */}
        {BODY_ACTIONS.map(({ key, label, hint, Icon }, i) => {
          const angle = (i / BODY_ACTIONS.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + RADIUS * Math.cos(angle);
          const y = 50 + RADIUS * Math.sin(angle);
          return (
            <Box key={key} sx={{ position: "absolute", top: `${y}%`, left: `${x}%`, transform: "translate(-50%, -50%)" }}>
              <TronTooltip accent={accent} title={hint} placement="top">
                <Box
                  component={motion.div}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.4,
                    cursor: "default",
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: surface.chipBg,
                      border: `1px solid ${alpha(accent, 0.55)}`,
                      boxShadow: `0 0 14px ${alpha(accent, 0.35)}`,
                    }}
                  >
                    <Icon sx={{ fontSize: 20, color: ink }} />
                  </Box>
                  <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.05em", color: surface.text.md }}>{label}</Typography>
                </Box>
              </TronTooltip>
            </Box>
          );
        })}
      </Box>

      {/* Action bars */}
      <SectionLabel accent={accent}>Action Bars</SectionLabel>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          p: 2,
          borderRadius: 2,
          border: `1px solid ${alpha(accent, 0.24)}`,
          background: "rgba(10,12,28,0.6)",
        }}
      >
        <OrbBar context="game" />
        <GameActionBar direction="horizontal" />
      </Box>
    </PanelShell>
  );
}
