"use client";

/**
 * MiniHudStage — a contained "Show the HUD" preview for the Computer layer.
 *
 * The page-level FullHud is 100vw/100vh and needs the router + full provider
 * graph, so instead of mounting it we compose its real building blocks
 * (GameActionBar, OrbBar) inside a bespoke neon stage, alongside a row of
 * Transformation Actions with Tron-styled tooltips.
 */

import * as React from "react";
import { Box, Tooltip, Typography, alpha } from "@mui/material";
import { GameActionBar, GAME_ITEMS, OrbBar } from "@expanse/hud";
import type { OrbItem } from "@expanse/hud";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
// Learning-transformation orb icons
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import TransformRoundedIcon from "@mui/icons-material/TransformRounded";
import type { SvgIconProps } from "@mui/material";
import { SOFT_TEXT } from "@expanse/theme";
import { TronTooltip, SectionLabel } from "../components/shared";

const ACCENT = "#4dd0e1";

/**
 * The Computer-layer orbs surface the *learning transformations* — how raw
 * input becomes mastery. These replace the generic game preset
 * (Play/Inventory/Quests/…) so they no longer duplicate the Web OS action
 * pills below.
 */
const LEARNING_ORBS: OrbItem[] = [
  { id: "learn", icon: <SchoolRoundedIcon />, label: "Learn", color: "primary" },
  { id: "plan", icon: <AccountTreeRoundedIcon />, label: "Plan", color: "info" },
  { id: "visualize", icon: <InsightsRoundedIcon />, label: "Visualize", color: "ai" },
  { id: "associate", icon: <HubRoundedIcon />, label: "Associate", color: "success" },
  { id: "transform", icon: <TransformRoundedIcon />, label: "Transform", color: "warning" },
];

/** Web OS navigation actions — distinct from the learning orbs (HUD control). */
const WEB_OS_ACTIONS: { key: string; label: string; hint: string; Icon: React.ComponentType<SvgIconProps> }[] = [
  { key: "morph", label: "Morph Layout", hint: "Reshape the HUD to fit the task at hand.", Icon: AutoAwesomeRoundedIcon },
  { key: "realm", label: "Shift Realm", hint: "Jump between the Website, App, and Technical realms.", Icon: PublicRoundedIcon },
  { key: "map", label: "Summon Map", hint: "Open the full-screen tile map of your world.", Icon: MapRoundedIcon },
];

/**
 * The corner brackets sit 8px in, so content padded to the frame edge collides
 * with them. Everything inside the stage is inset past the brackets instead of
 * being padded from the border — that overlap was the "inset" problem.
 */
const BRACKET_INSET = 8;
const BRACKET_SIZE = 16;
const STAGE_INSET = BRACKET_INSET + BRACKET_SIZE + 6; // clears a bracket arm

/**
 * The game buttons split down the middle: Spellbook and Achievements hold the
 * left edge, Inventory and Quests the right, and the transformation orbs take
 * the centre. A HUD reads as a frame around the work rather than a toolbar
 * stacked under it, which only happens if the chrome actually sits at the
 * edges.
 */
const GAME_LEFT = GAME_ITEMS.slice(0, 2);
const GAME_RIGHT = GAME_ITEMS.slice(2);

/** Display variants for the stage — cycled from the LED button, top right. */
const VARIANTS = ["full", "quiet", "bare"] as const;
type StageVariant = (typeof VARIANTS)[number];

const VARIANT_HINT: Record<StageVariant, string> = {
  full: "Full — grid, scanline, and section labels",
  quiet: "Quiet — backdrop only, no section labels",
  bare: "Bare — chrome off, components only",
};

/**
 * The LED strip, promoted from decoration to control.
 *
 * Three blinking dots in the corner of a HUD already look like a status
 * indicator you could press, so it now is one: it cycles the stage's display
 * variant. The dots stay lit for the active variant and dim past it, which
 * makes the strip a three-position readout rather than an ornament.
 */
function VariantLeds({
  variant,
  onCycle,
}: {
  variant: StageVariant;
  onCycle: () => void;
}) {
  const index = VARIANTS.indexOf(variant);
  const colors = ["#34d399", ACCENT, "#fbbf24"];

  return (
    <Tooltip title={VARIANT_HINT[variant]} placement="left" arrow>
      <Box
        component="button"
        type="button"
        onClick={onCycle}
        aria-label={`Display variant: ${variant}. Change.`}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          px: 0.6,
          py: 0.4,
          border: `1px solid ${alpha(ACCENT, 0.25)}`,
          borderRadius: 1,
          bgcolor: alpha(ACCENT, 0.05),
          cursor: "pointer",
          transition: "border-color 150ms ease, background 150ms ease",
          "&:hover": { borderColor: alpha(ACCENT, 0.6), bgcolor: alpha(ACCENT, 0.12) },
          "&:focus-visible": { outline: `2px solid ${ACCENT}`, outlineOffset: 2 },
        }}
      >
        {colors.map((c, i) => {
          const lit = i <= index;
          return (
            <Box
              key={c}
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: lit ? c : alpha(c, 0.25),
                boxShadow: lit ? `0 0 6px ${c}` : "none",
                "@keyframes ledB": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.3 } },
                animation: lit ? `ledB 2.2s ease-in-out ${i * 0.3}s infinite` : "none",
              }}
            />
          );
        })}
      </Box>
    </Tooltip>
  );
}

function Bracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const v = pos[0] === "t" ? { top: BRACKET_INSET } : { bottom: BRACKET_INSET };
  const h = pos[1] === "l" ? { left: BRACKET_INSET } : { right: BRACKET_INSET };
  const borders =
    pos === "tl"
      ? { borderTop: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}` }
      : pos === "tr"
      ? { borderTop: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}` }
      : pos === "bl"
      ? { borderBottom: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}` }
      : { borderBottom: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}` };
  return <Box aria-hidden sx={{ position: "absolute", width: BRACKET_SIZE, height: BRACKET_SIZE, opacity: 0.7, ...v, ...h, ...borders }} />;
}

export function MiniHudStage() {
  const [variant, setVariant] = React.useState<StageVariant>("full");
  const cycle = () => setVariant((v) => VARIANTS[(VARIANTS.indexOf(v) + 1) % VARIANTS.length]);
  const showBackdrop = variant !== "bare";
  const showLabels = variant === "full";

  return (
    <Box>
      <SectionLabel accent={ACCENT}>Show the HUD</SectionLabel>
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          border: `1px solid ${alpha(ACCENT, 0.35)}`,
          background: "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(20,60,90,0.35) 0%, rgba(7,10,24,0.96) 70%)",
          boxShadow: `inset 0 0 40px ${alpha(ACCENT, 0.08)}, 0 0 24px ${alpha(ACCENT, 0.12)}`,
          overflow: "hidden",
          minHeight: 260,
          // Inset past the corner brackets rather than padded from the border,
          // so no panel ever sits under a bracket arm. This was the misaligned
          // inset — the frame and the content were measuring from different
          // edges.
          p: `${STAGE_INSET}px`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* grid + scanline backdrop */}
        {showBackdrop && (
          <>
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: `linear-gradient(${alpha(ACCENT, 0.06)} 1px, transparent 1px), linear-gradient(90deg, ${alpha(ACCENT, 0.06)} 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
                pointerEvents: "none",
              }}
            />
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 60,
                background: `linear-gradient(to bottom, ${alpha(ACCENT, 0.18)}, transparent)`,
                pointerEvents: "none",
                "@keyframes hudScan": { "0%": { top: "-60px" }, "100%": { top: "100%" } },
                animation: "hudScan 5.5s linear infinite",
              }}
            />
          </>
        )}
        <Bracket pos="tl" />
        <Bracket pos="tr" />
        <Bracket pos="bl" />
        <Bracket pos="br" />

        {/* top status strip — the LED cluster doubles as the variant control */}
        <Box sx={{ position: "relative", display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Typography sx={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: alpha(ACCENT, 0.9) }}>
            4EYE HUD // WEB OS
          </Typography>
          <Box sx={{ flex: 1 }} />
          <VariantLeds variant={variant} onCycle={cycle} />
        </Box>

        {/* Web OS navigation actions — centred, labels on hover only */}
        <Box
          sx={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {showLabels && (
            <Typography
              sx={{
                fontSize: 9.5,
                fontWeight: 800,
                letterSpacing: "0.16em",
                color: SOFT_TEXT.faint,
                textTransform: "uppercase",
                mb: 1,
                textAlign: "center",
              }}
            >
              Web OS Actions
            </Typography>
          )}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2, justifyContent: "center" }}>
            {WEB_OS_ACTIONS.map(({ key, label, hint, Icon }) => (
              <TronTooltip key={key} accent={ACCENT} title={hint} placement="top">
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 1.1,
                    py: 0.7,
                    borderRadius: 1,
                    cursor: "default",
                    border: `1px solid ${alpha(ACCENT, 0.35)}`,
                    bgcolor: alpha(ACCENT, 0.07),
                    transition: "background 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
                    "&:hover": {
                      bgcolor: alpha(ACCENT, 0.16),
                      borderColor: alpha(ACCENT, 0.7),
                      boxShadow: `0 0 14px ${alpha(ACCENT, 0.3)}`,
                    },
                    /*
                      The label is revealed on hover and rendered white. A HUD
                      that names every control at rest is a menu; the icons
                      carry it, and the word arrives when you go looking. The
                      width animates rather than the text appearing inside a
                      reserved gap, so the resting row is genuinely compact.
                    */
                    "&:hover .hud-action-label": {
                      maxWidth: 160,
                      opacity: 1,
                      marginLeft: "2px",
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 15, color: ACCENT }} />
                  <Typography
                    className="hud-action-label"
                    sx={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      maxWidth: 0,
                      opacity: 0,
                      transition: "max-width 220ms ease, opacity 160ms ease, margin-left 220ms ease",
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              </TronTooltip>
            ))}
          </Box>

          {showLabels && (
            <Typography
              sx={{
                fontSize: 9.5,
                fontWeight: 800,
                letterSpacing: "0.16em",
                color: SOFT_TEXT.faint,
                textTransform: "uppercase",
                mb: 1,
                textAlign: "center",
              }}
            >
              Learning Transformations
            </Typography>
          )}

          {/*
            The bottom rail: game buttons pinned to both edges, transformation
            orbs centred between them. Equal-width flex cheeks keep the orbs
            optically centred even though the two game halves are not the same
            width — centring by `space-between` alone would drift.
          */}
          <Box
            sx={{
              mt: "auto",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexWrap: { zero: "wrap", tablet: "nowrap" },
            }}
          >
            <Box sx={{ flex: "1 1 0", display: "flex", justifyContent: "flex-start", minWidth: 0 }}>
              <GameActionBar direction="horizontal" items={GAME_LEFT} />
            </Box>
            <Box sx={{ flexShrink: 0, display: "flex", justifyContent: "center" }}>
              <OrbBar context="learn" items={LEARNING_ORBS} label="Learning Transformations" labelMode="none" />
            </Box>
            <Box sx={{ flex: "1 1 0", display: "flex", justifyContent: "flex-end", minWidth: 0 }}>
              <GameActionBar direction="horizontal" items={GAME_RIGHT} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Typography sx={{ mt: 1, fontSize: "0.72rem", color: SOFT_TEXT.faint, fontStyle: "italic" }}>
        Live HUD components — the same action bars that run the app, shown in-frame.
      </Typography>
    </Box>
  );
}
