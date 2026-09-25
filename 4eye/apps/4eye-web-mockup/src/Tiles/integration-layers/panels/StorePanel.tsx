"use client";

/**
 * StorePanel — row 4. Real-world gamification you can buy.
 *
 * Adds the store-specific chrome the generic card grid lacked:
 *   · a profile status / resource bar (currency + level + streak)
 *   · a row of loot chests (rarity tiers)
 *   · the product cards (Equipment · Devices · OS · Marketplace)
 *
 * No economy model exists yet, so the currency + chests ship as seed constants.
 */

import { Box, Grid, LinearProgress, Typography, alpha } from "@mui/material";
import { motion } from "framer-motion";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import type { SvgIconProps } from "@mui/material";
import { SOFT_AMBER } from "@expanse/theme";
import type { IntegrationLayer } from "../model/layers";
import { PanelShell, SectionLabel, InfoCardGrid } from "../components/shared";
import { useLayerSurface } from "../components/surfaceTokens";

// ── Seed economy (mock) ──────────────────────────────────────────────────────

const CURRENCIES: { key: string; label: string; value: string; color: string; Icon: React.ComponentType<SvgIconProps> }[] = [
  { key: "coins", label: "Coins", value: "∞", color: SOFT_AMBER, Icon: MonetizationOnRoundedIcon },
  { key: "gems", label: "Gems", value: "342", color: "#7fd4ff", Icon: DiamondRoundedIcon },
  { key: "xp", label: "XP", value: "88,120", color: "#4fe0b0", Icon: BoltRoundedIcon },
];

const CHESTS: { key: string; label: string; rarity: string; color: string; ready: string }[] = [
  { key: "common", label: "Common Chest", rarity: "Common", color: "#9fb3c8", ready: "Ready" },
  { key: "rare", label: "Rare Chest", rarity: "Rare", color: "#64b5f6", ready: "2h 10m" },
  { key: "epic", label: "Epic Chest", rarity: "Epic", color: "#b39ddb", ready: "1d 4h" },
];

const LEVEL = 27;
const LEVEL_PROGRESS = 68; // %

// ── Profile status / resource bar ────────────────────────────────────────────

function StatusBar({ accent }: { accent: string }) {
  const surface = useLayerSurface();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        p: 2,
        mb: 3,
        borderRadius: 2,
        border: `1px solid ${alpha(accent, 0.3)}`,
        background: `linear-gradient(135deg, ${alpha(accent, 0.14)} 0%, ${surface.cardBg} 100%)`,
        boxShadow: `inset 0 0 30px ${alpha(accent, 0.06)}`,
      }}
    >
      {/* level + progress */}
      <Box sx={{ minWidth: 150, flex: "1 1 150px" }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 0.5 }}>
          <Typography sx={{ fontSize: "1.4rem", fontWeight: 900, color: surface.ink(accent), lineHeight: 1, fontFamily: "monospace" }}>
            Lv {LEVEL}
          </Typography>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.4 }}>
            <LocalFireDepartmentRoundedIcon sx={{ fontSize: 15, color: surface.ink("#ff8a5c") }} />
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, color: surface.ink("#ff8a5c") }}>14-day streak</Typography>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={LEVEL_PROGRESS}
          sx={{
            height: 6,
            borderRadius: 999,
            bgcolor: alpha(accent, 0.14),
            "& .MuiLinearProgress-bar": { bgcolor: accent, borderRadius: 999 },
          }}
        />
        <Typography sx={{ fontSize: "0.64rem", color: surface.text.lo, mt: 0.4 }}>
          {LEVEL_PROGRESS}% to Lv {LEVEL + 1}
        </Typography>
      </Box>

      {/* currency chips */}
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
        {CURRENCIES.map(({ key, label, value, color, Icon }) => (
          <Box
            key={key}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.85,
              px: 1.4,
              py: 0.85,
              borderRadius: 1.5,
              border: `1px solid ${alpha(color, 0.4)}`,
              bgcolor: alpha(color, 0.1),
            }}
          >
            <Icon sx={{ fontSize: 20, color: surface.ink(color), filter: `drop-shadow(0 0 5px ${alpha(color, 0.6)})` }} />
            <Box>
              <Typography sx={{ fontSize: "0.95rem", fontWeight: 900, color: surface.text.hi, lineHeight: 1, fontFamily: "monospace", fontVariantNumeric: "tabular-nums" }}>
                {value}
              </Typography>
              <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: surface.ink(color) }}>
                {label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ── Chests ───────────────────────────────────────────────────────────────────

function Chests() {
  const surface = useLayerSurface();
  return (
    <Grid container spacing={1.5} sx={{ mb: 3 }}>
      {CHESTS.map((chest, i) => {
        const isReady = chest.ready === "Ready";
        return (
          <Grid size={{ zero: 4 }} key={chest.key}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 + i * 0.06 }}
              style={{ height: "100%" }}
            >
              <Box
                sx={{
                  height: "100%",
                  p: 1.75,
                  borderRadius: 2,
                  textAlign: "center",
                  border: `1px solid ${alpha(chest.color, 0.4)}`,
                  background: `radial-gradient(ellipse 100% 80% at 50% 0%, ${alpha(chest.color, 0.22)} 0%, ${surface.cardBg} 70%)`,
                  boxShadow: isReady ? `0 0 22px ${alpha(chest.color, 0.35)}` : "none",
                  transition: "transform 160ms ease, box-shadow 160ms ease",
                  cursor: isReady ? "pointer" : "default",
                  "&:hover": isReady ? { transform: "translateY(-3px)", boxShadow: `0 0 30px ${alpha(chest.color, 0.5)}` } : undefined,
                }}
              >
                <Box
                  component={motion.div}
                  animate={isReady ? { y: [0, -4, 0] } : {}}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  sx={{ display: "inline-flex", mb: 0.75 }}
                >
                  <Inventory2RoundedIcon sx={{ fontSize: 34, color: chest.color, filter: `drop-shadow(0 0 8px ${alpha(chest.color, 0.7)})` }} />
                </Box>
                <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: surface.ink(chest.color) }}>
                  {chest.rarity}
                </Typography>
                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: isReady ? surface.ink("#34d399") : surface.text.lo,
                  }}
                >
                  {isReady ? "Open now" : chest.ready}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
}

// ── Panel ─────────────────────────────────────────────────────────────────────

export function StorePanel({ layer }: { layer: IntegrationLayer }) {
  const accent = layer.accentColor;
  return (
    <PanelShell layer={layer}>
      <SectionLabel accent={accent}>Profile Status</SectionLabel>
      <StatusBar accent={accent} />

      <SectionLabel accent={accent}>Loot Chests</SectionLabel>
      <Chests />

      <SectionLabel accent={accent}>Real-World Gamification Store</SectionLabel>
      <InfoCardGrid layer={layer} />
    </PanelShell>
  );
}
