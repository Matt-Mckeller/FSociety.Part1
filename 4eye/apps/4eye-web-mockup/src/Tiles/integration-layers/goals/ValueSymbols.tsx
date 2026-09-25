"use client";

/**
 * The value symbols for Goal 2 — "Other Things In Life" — worth valuing
 * beyond money. Each maps the spec's emoji to a recognizable icon + its
 * meaning (shown on hover), colored from the app's own SOFT_* brand tokens
 * so they read as part of this product rather than generic stock icons.
 */

import * as React from "react";
import { Box } from "@mui/material";
import type { SvgIconProps } from "@mui/material";
import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ParkRoundedIcon from "@mui/icons-material/ParkRounded";
import MoodRoundedIcon from "@mui/icons-material/MoodRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import {
  SOFT_CYAN,
  SOFT_BLUE,
  SOFT_AMBER,
  SOFT_EMERALD,
  SOFT_VIOLET,
  SOFT_LILAC,
  SOFT_PERIWINKLE,
  SOFT_INDIGO,
} from "@expanse/theme";
import { TronTooltip } from "../components/shared";
import { useLayerSurface } from "../components/surfaceTokens";

export interface ValueSymbol {
  key: string;
  Icon: React.ComponentType<SvgIconProps>;
  label: string;
  meaning: string;
  color: string;
}

export const VALUE_SYMBOLS: ValueSymbol[] = [
  { key: "observe", Icon: SatelliteAltRoundedIcon, label: "Observability", meaning: "Satellites, cameras, eyes — awareness. Seeing the world clearly.", color: SOFT_BLUE },
  { key: "compute", Icon: MemoryRoundedIcon, label: "Computers & AI", meaning: "Computers, programming, AI, technology — our new leverage.", color: SOFT_CYAN },
  { key: "time", Icon: AccessTimeRoundedIcon, label: "The Present Moment", meaning: "Prioritization & adaptability. Think about past & future — but the present moment is execution. No scheduling: an important optional shift in the workflow.", color: SOFT_AMBER },
  { key: "grow", Icon: ParkRoundedIcon, label: "Growth", meaning: "Evolve, grow, nourish.", color: SOFT_EMERALD },
  { key: "mood", Icon: MoodRoundedIcon, label: "Mood & Social", meaning: "Mood, energy, social — how you actually feel and connect.", color: SOFT_AMBER },
  { key: "chem", Icon: ScienceRoundedIcon, label: "Chemistry", meaning: "Important chemicals, chemistry, energy — the substances that drive you.", color: SOFT_VIOLET },
  { key: "body", Icon: RestaurantRoundedIcon, label: "Body & Nutrition", meaning: "Blood, nutrition, and digestion — the fuel and the flow.", color: SOFT_LILAC },
  { key: "purpose", Icon: ExploreRoundedIcon, label: "Purpose & Direction", meaning: "Purpose, goals, direction — knowing where you're headed and why.", color: SOFT_BLUE },
  { key: "brain", Icon: PsychologyRoundedIcon, label: "The Brain", meaning: "How the brain works — neural networks, the mind itself.", color: SOFT_VIOLET },
  { key: "robots", Icon: PrecisionManufacturingRoundedIcon, label: "Robots", meaning: "Love robots, use robots, teach robots.", color: SOFT_PERIWINKLE },
  { key: "karma", Icon: VolunteerActivismRoundedIcon, label: "Karma", meaning: "Share, karma, positivity — value that compounds when you give it away.", color: SOFT_EMERALD },
];

export const VALUE_SYMBOLS_ACCENT = SOFT_INDIGO;

export function ValueIcon({ symbol, size = 34 }: { symbol: ValueSymbol; size?: number }) {
  const { Icon, label, meaning, color } = symbol;
  const surface = useLayerSurface();
  return (
    <TronTooltip accent={color} title={`${label} — ${meaning}`} placement="top">
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          cursor: "default",
          bgcolor: surface.chipBg,
          border: `1px solid ${color}66`,
          transition: "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
          "&:hover": { transform: "translateY(-3px)", borderColor: color, boxShadow: `0 0 14px ${color}88` },
        }}
      >
        <Icon sx={{ fontSize: size * 0.56, color: surface.ink(color), filter: `drop-shadow(0 0 4px ${color}88)` }} />
      </Box>
    </TronTooltip>
  );
}
