"use client";

/**
 * RobotPanel — row 3. A companion catalog: the 4wings emotional-support
 * companion (ported), 4eye as a guide/tutor companion (real Character4eye),
 * and real-robot cards framed as support companions, tools, and teachers.
 */

import { Box, Grid, Typography, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { Character4eye } from "@expanse/character/2d";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import type { SvgIconProps } from "@mui/material";
import type { IntegrationLayer } from "../model/layers";
import { PanelShell, SectionLabel } from "../components/shared";
import { FourWingCompanion } from "../companions/FourWingCompanion";
import { useLayerSurface, useLayerInk } from "../components/surfaceTokens";

function RoleTag({ label, color }: { label: string; color: string }) {
  const surface = useLayerSurface();
  return (
    <Box sx={{ display: "inline-flex", px: 0.9, py: 0.25, borderRadius: 999, border: `1px solid ${alpha(color, 0.5)}`, bgcolor: alpha(color, 0.14) }}>
      <Typography sx={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.08em", color: surface.ink(color), textTransform: "uppercase" }}>{label}</Typography>
    </Box>
  );
}

function FeaturedCard({
  accent,
  figure,
  name,
  role,
  roleColor,
  blurb,
  i,
}: {
  accent: string;
  figure: React.ReactNode;
  name: string;
  role: string;
  roleColor: string;
  blurb: string;
  i: number;
}) {
  const surface = useLayerSurface();
  return (
    <Grid size={{ zero: 12, tablet: 6 }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34, delay: 0.05 + i * 0.08 }} style={{ height: "100%" }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            gap: 1.5,
            p: 2,
            borderRadius: 2,
            border: `1px solid ${alpha(accent, 0.3)}`,
            background: `linear-gradient(135deg, ${alpha(accent, 0.12)} 0%, ${surface.cardBg} 100%)`,
            boxShadow: `inset 0 0 30px ${alpha(accent, 0.06)}`,
          }}
        >
          <Box sx={{ width: 96, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{figure}</Box>
          <Box sx={{ minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75, flexWrap: "wrap" }}>
              <Typography sx={{ fontSize: "1.05rem", fontWeight: 800, color: surface.text.hi }}>{name}</Typography>
              <RoleTag label={role} color={roleColor} />
            </Box>
            <Typography sx={{ fontSize: "0.82rem", color: surface.text.md, lineHeight: 1.55 }}>{blurb}</Typography>
          </Box>
        </Box>
      </motion.div>
    </Grid>
  );
}

const REAL_ROBOTS: { key: string; name: string; role: string; roleColor: string; blurb: string; Icon: React.ComponentType<SvgIconProps> }[] = [
  { key: "home", name: "Home Companion", role: "Companion", roleColor: "#f472b6", blurb: "An always-there presence for the household — company, reminders, and care.", Icon: FavoriteRoundedIcon },
  { key: "tutor", name: "Tutor Bot", role: "Teacher", roleColor: "#4dd0e1", blurb: "A patient teacher that adapts every lesson to the learner in front of it.", Icon: SchoolRoundedIcon },
  { key: "field", name: "Field Unit", role: "Tool", roleColor: "#ffb74d", blurb: "Embodied hands in the physical world — capture, carry, build, assist.", Icon: HandymanRoundedIcon },
  { key: "assist", name: "Assistant Arm", role: "Tool", roleColor: "#ffb74d", blurb: "A precise manipulator that turns digital intent into physical action.", Icon: PrecisionManufacturingRoundedIcon },
];

export function RobotPanel({ layer }: { layer: IntegrationLayer }) {
  const accent = layer.accentColor;
  const surface = useLayerSurface();
  const { ink } = useLayerInk(layer);
  return (
    <PanelShell layer={layer}>
      <Box sx={{ mb: 3 }}>
        <SectionLabel accent={accent}>Companion Catalog</SectionLabel>
        <Grid container spacing={2}>
          <FeaturedCard
            accent={accent}
            i={0}
            figure={<FourWingCompanion scale={0.42} statusColor="#34d399" />}
            name="4wings"
            role="Companion"
            roleColor="#a78bfa"
            blurb="A calming counsellor-support companion — homework partner and emotional support, always by your side between the moments that matter."
          />
          <FeaturedCard
            accent={accent}
            i={1}
            figure={
              <Box sx={{ width: 96, height: 104, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Character4eye compact variant="tech" mood="happy" showStatusLEDs showAntenna eyeGlowColor={accent} />
              </Box>
            }
            name="4eye"
            role="Guide"
            roleColor="#4dd0e1"
            blurb="Your primary guide and tutor — the mascot that lives in the HUD, teaching, encouraging, and leveling up alongside you."
          />
        </Grid>
      </Box>

      <SectionLabel accent={accent}>Support Companions · Tools · Teachers</SectionLabel>
      <Grid container spacing={1.5}>
        {REAL_ROBOTS.map((r, i) => {
          const { Icon } = r;
          return (
            <Grid size={{ zero: 6, tablet: 3 }} key={r.key}>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }} style={{ height: "100%" }}>
                <Box
                  sx={{
                    height: "100%",
                    p: 1.5,
                    borderRadius: 2,
                    border: `1px solid ${alpha(accent, 0.2)}`,
                    background: surface.chromeBg,
                    transition: "border-color 160ms ease, transform 160ms ease",
                    "&:hover": { borderColor: alpha(accent, 0.5), transform: "translateY(-2px)" },
                  }}
                >
                  <Icon sx={{ fontSize: 24, color: ink, mb: 1, filter: `drop-shadow(0 0 5px ${alpha(accent, 0.5)})` }} />
                  <Box sx={{ mb: 0.75 }}>
                    <RoleTag label={r.role} color={r.roleColor} />
                  </Box>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: surface.text.hi, mb: 0.35 }}>{r.name}</Typography>
                  <Typography sx={{ fontSize: "0.72rem", color: surface.text.md, lineHeight: 1.5 }}>{r.blurb}</Typography>
                </Box>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </PanelShell>
  );
}
