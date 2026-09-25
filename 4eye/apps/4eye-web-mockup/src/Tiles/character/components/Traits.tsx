"use client";

/**
 * Character — Traits grid.
 *
 * Personality traits with tiered progression and custom glyphs. Colour follows
 * the lens's two axes: **hue on the glyph** carries trait identity; **chrome
 * is channel (equipped)** so a row of cards does not become a rainbow wall.
 * Rank pips are achromatic via {@link useRankInk}.
 */

import * as React from "react";
import {
  Box,
  Button,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

import {
  TRAITS,
  traitHoverHint,
  traitNextCost,
  type TraitMeta,
  type TraitProgress,
} from "../model/traits";
import { useProfileStore } from "../store/CharacterProfileStore";
import { useChannelInks, useRankInk } from "../theme/characterPalette";
import { TierPips } from "./shared/TierPips";
import { InfluencePill } from "./shared/InfluencePill";

/* ----------------------------------------------------------------- glyphs */

function CuriousGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.88" />
      <path d="M12 15 V17" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <circle cx="12" cy="19.5" r="1.2" opacity="0.9" />
      <path d="M9.5 8 C9.5 6.6 10.6 5.5 12 5.5 C13.4 5.5 14.5 6.6 14.5 8 C14.5 9.4 12 10.5 12 10.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </BrandIcon>
  );
}

function BrilliantGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2 L13.8 8.2 L20.5 8.2 L15.1 12 L17 18.2 L12 14.5 L7 18.2 L8.9 12 L3.5 8.2 L10.2 8.2 Z" opacity="0.9" />
    </BrandIcon>
  );
}

function InfectiousGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="4.5" opacity="0.9" />
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="4" cy="8" r="1.8" opacity="0.65" />
      <circle cx="20" cy="8" r="1.8" opacity="0.65" />
      <circle cx="4" cy="16" r="1.8" opacity="0.5" />
      <circle cx="20" cy="16" r="1.8" opacity="0.5" />
    </BrandIcon>
  );
}

function PerfectionistGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.4" />
      <path d="M7 12 L10.5 15.5 L17 9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    </BrandIcon>
  );
}

function DreamerGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 3 C8 3 5 6.5 5 10 C5 14.5 9 17 12 21 C15 17 19 14.5 19 10 C19 6.5 16 3 12 3 Z" opacity="0.25" />
      <path d="M12 3 L13.5 7 L18 7 L14.5 10 L16 14 L12 11.5 L8 14 L9.5 10 L6 7 L10.5 7 Z" opacity="0.9" />
    </BrandIcon>
  );
}

function DesireGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2 C12 6 10 9 10 12 C10 14.2 11 16 12 16 C13 16 14 14.2 14 12 C14 9 12 6 12 2 Z" opacity="0.9" />
      <path d="M12 16 C12 16 8 14 8 18 A4 4 0 0 0 16 18 C16 14 12 16 12 16 Z" opacity="0.65" />
    </BrandIcon>
  );
}

function HilariousGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="10" opacity="0.12" />
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.75" />
      <path d="M8 15 Q12 19 16 15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
      <circle cx="9" cy="10" r="1.5" opacity="0.9" />
      <circle cx="15" cy="10" r="1.5" opacity="0.9" />
    </BrandIcon>
  );
}

function EmpathicGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 20 C12 20 4 15 4 9.5 C4 7 5.8 5 8 5 C9.5 5 10.5 5.8 11 6.5 C11.5 5.8 12.5 5 14 5 C16.2 5 18 7 18 9.5 C18 15 12 20 12 20 Z" opacity="0.88" />
      <path d="M6 10 C7 12 9 13 11 13" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    </BrandIcon>
  );
}

function ResilientGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 3 L4 8 L4 16 L12 21 L20 16 L20 8 Z" opacity="0.2" />
      <path d="M12 3 L20 8 L20 16 L12 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d="M12 3 L4 8 L4 16 L12 21" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M8 12 L11 15 L16 9.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
    </BrandIcon>
  );
}

function StrategicGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" opacity="0.9" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" opacity="0.65" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" opacity="0.65" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" opacity="0.4" />
    </BrandIcon>
  );
}

function AttachedGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="9" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.85" />
      <circle cx="15" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.85" />
      <path d="M12 9.2 V14.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </BrandIcon>
  );
}

function ChasingGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 12 H14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M11 7.5 L17.5 12 L11 16.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <circle cx="19.2" cy="12" r="1.6" opacity="0.9" />
    </BrandIcon>
  );
}

function CompetitiveGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M5 18 H19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
      <path d="M8 18 V13 H11 V18" opacity="0.7" />
      <path d="M11 18 V8 H14 V18" opacity="0.9" />
      <path d="M14 18 V11 H17 V18" opacity="0.55" />
      <path d="M12.5 5 L13.2 6.6 L15 6.8 L13.6 8 L14 9.8 L12.5 8.9 L11 9.8 L11.4 8 L10 6.8 L11.8 6.6 Z" opacity="0.95" />
    </BrandIcon>
  );
}

function SecureGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2.4 L19.2 5.2 V11.2 C19.2 16.4 16 20.2 12 21.6 C8 20.2 4.8 16.4 4.8 11.2 V5.2 Z" opacity="0.9" />
      <path d="M9.2 11.6 L11.2 13.6 L15.2 9.4" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
    </BrandIcon>
  );
}

const TRAIT_GLYPH: Record<string, React.ComponentType<BrandIconProps>> = {
  curious: CuriousGlyph,
  brilliant: BrilliantGlyph,
  "infectious-personality": InfectiousGlyph,
  perfectionist: PerfectionistGlyph,
  dreamer: DreamerGlyph,
  desire: DesireGlyph,
  hilarious: HilariousGlyph,
  empathic: EmpathicGlyph,
  secure: SecureGlyph,
  resilient: ResilientGlyph,
  strategic: StrategicGlyph,
  attached: AttachedGlyph,
  chasing: ChasingGlyph,
  competitive: CompetitiveGlyph,
};

/* --------------------------------------------------- trait card */

function TraitCard({
  trait,
  level,
  affordable,
  onUpgrade,
}: {
  trait: TraitMeta;
  level: number;
  affordable: boolean;
  onUpgrade?: () => void;
}) {
  const channels = useChannelInks();
  const { rank } = useRankInk();
  const channel = channels.equipped;
  const chrome = channel.ink;
  const glyphHue = trait.color;

  const locked = level < 0;
  const maxed = level >= 3;
  const cost = traitNextCost(level);
  const Glyph = TRAIT_GLYPH[trait.id];
  const t = locked ? 0 : (level + 1) / 4;
  const pipInk = locked ? rank(0) : rank(Math.min(5, level + 1));

  return (
    <Tooltip title={traitHoverHint(trait)} arrow placement="top">
      <Stack
        sx={{
          position: "relative",
          gap: 0.85,
          p: 1.1,
          borderRadius: 2.5,
          bgcolor: "background.paper",
          overflow: "hidden",
          border: "1px solid",
          borderColor: alpha(chrome, locked ? 0.12 : 0.22 + t * 0.1),
          backgroundImage: locked
            ? "none"
            : `radial-gradient(120% 100% at 0% 0%, ${alpha(chrome, 0.08)} 0%, transparent 55%)`,
          opacity: locked ? 0.78 : 1,
          transition: "border-color .2s, opacity .2s",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", gap: 1, minWidth: 0 }}>
          <Box
            sx={{
              color: locked ? "text.disabled" : glyphHue,
              flexShrink: 0,
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(glyphHue, locked ? 0.06 : 0.12),
              border: `1px solid ${alpha(glyphHue, locked ? 0.12 : 0.28)}`,
              boxShadow: locked ? "none" : `0 0 ${4 + t * 8}px ${alpha(glyphHue, 0.22 + t * 0.2)}`,
            }}
          >
            {locked ? (
              <LockRoundedIcon sx={{ fontSize: 20, color: "text.disabled" }} />
            ) : (
              Glyph && <Glyph size={22} title={trait.label} />
            )}
          </Box>
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: locked ? "text.secondary" : "text.primary",
                lineHeight: 1.15,
                display: "block",
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                letterSpacing: 0.1,
              }}
            >
              {trait.label}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.65rem" }}>
              {locked ? "Locked" : trait.degrees[level]}
            </Typography>
          </Box>
          {maxed && (
            <Stack
              direction="row"
              spacing={0.3}
              sx={{
                alignItems: "center",
                px: 0.6,
                py: 0.2,
                borderRadius: 1,
                bgcolor: alpha(chrome, 0.1),
                color: chrome,
                flexShrink: 0,
              }}
            >
              <WorkspacePremiumRoundedIcon sx={{ fontSize: 13 }} />
              <Typography sx={{ fontSize: "0.58rem", fontWeight: 900, letterSpacing: 0.5 }}>MAX</Typography>
            </Stack>
          )}
        </Stack>

        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <TierPips level={level} color={pipInk} />
          {!locked && !maxed && (
            <Typography sx={{ fontSize: "0.62rem", color: "text.secondary", fontWeight: 600 }}>
              Next: {trait.degrees[level + 1]}
            </Typography>
          )}
        </Stack>

        {maxed
          ? trait.maxEffect && (
              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                <AutoAwesomeRoundedIcon sx={{ fontSize: 12, color: chrome }} />
                <Typography sx={{ fontSize: "0.63rem", fontWeight: 700, color: "text.secondary" }}>
                  {trait.maxEffect}
                </Typography>
              </Stack>
            )
          : cost != null && (
              <Button
                size="small"
                disableElevation
                variant="contained"
                onClick={onUpgrade}
                disabled={!affordable || !onUpgrade}
                startIcon={locked ? <LockRoundedIcon sx={{ fontSize: 14 }} /> : undefined}
                sx={{
                  alignSelf: "flex-start",
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: "0.67rem",
                  py: 0.3,
                  px: 0.9,
                  borderRadius: 1.5,
                  bgcolor: chrome,
                  color: "common.white",
                  "&:hover": { bgcolor: alpha(chrome, 0.85) },
                  "&.Mui-disabled": { bgcolor: alpha(chrome, 0.25), color: "common.white" },
                }}
              >
                {locked ? "Unlock" : "Upgrade"} · ✦{cost.toLocaleString()}
              </Button>
            )}
      </Stack>
    </Tooltip>
  );
}

/* ----------------------------------------------------------------- grid */

export interface TraitsGridProps {
  progress?: TraitProgress;
  balance?: number;
  interactive?: boolean;
}

export function TraitsGrid({
  progress,
  balance: _balanceOverride,
  interactive = true,
}: TraitsGridProps) {
  const { state, dispatch } = useProfileStore();
  const levels = progress ?? state.traitLevels;
  const balance = _balanceOverride ?? state.influenceBalance;

  const upgrade = React.useCallback(
    (trait: TraitMeta) => {
      dispatch({ type: "upgrade-trait", traitId: trait.id });
    },
    [dispatch],
  );

  const hasUpgradable = TRAITS.some((t) => {
    const level = levels[t.id] ?? -1;
    return level < 3;
  });

  return (
    <Stack spacing={1}>
      {interactive && hasUpgradable && (
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <InfluencePill balance={balance} />
        </Stack>
      )}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(212px, 1fr))", gap: 1 }}>
        {TRAITS.map((t) => {
          const level = levels[t.id] ?? -1;
          const cost = traitNextCost(level);
          return (
            <TraitCard
              key={t.id}
              trait={t}
              level={level}
              affordable={cost != null && cost <= balance}
              onUpgrade={interactive ? () => upgrade(t) : undefined}
            />
          );
        })}
      </Box>
    </Stack>
  );
}
