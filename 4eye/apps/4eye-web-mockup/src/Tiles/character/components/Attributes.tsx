"use client";

/**
 * Character — Attributes grid.
 *
 * Displays each attribute as a tiered card: current value, tier name, a filled
 * progress bar, and the bonus from equipped items. Styled like the Auras grid.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

import {
  ATTRIBUTES,
  tierIndex,
  effectiveValue,
  formatAttributeMark,
  type AttributeMeta,
  type AttributeProgress,
  type AttributeProgressMap,
} from "../model/attributes";
import { useEffectiveAttributes } from "../store/CharacterProfileStore";

/* ---------------------------------------------------------- glyphs */

function IntellectGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="8" r="5.5" opacity="0.9" />
      <rect x="10" y="13.5" width="4" height="2.5" rx="1" opacity="0.7" />
      <path d="M9 17.5 H15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

function WisdomGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 3 L14.5 8.5 H20.5 L15.5 12.5 L17.5 18.5 L12 15 L6.5 18.5 L8.5 12.5 L3.5 8.5 H9.5 Z" opacity="0.88" />
    </BrandIcon>
  );
}

function CharismaGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="8" r="3.5" opacity="0.9" />
      <circle cx="5.5" cy="8" r="2" opacity="0.55" />
      <circle cx="18.5" cy="8" r="2" opacity="0.55" />
      <path d="M4 20 C4 16 8 14 12 14 C16 14 20 16 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </BrandIcon>
  );
}

function CreativityGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2 C12 6.5 15.5 8 15.5 12 C15.5 14.5 14 16.5 12 17 C10 16.5 8.5 14.5 8.5 12 C8.5 8 12 6.5 12 2 Z" opacity="0.88" />
      <path d="M9 18 Q12 20.5 15 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      <path d="M10.5 21 H13.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

function DisciplineGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3" y="11" width="18" height="2.5" rx="1.25" opacity="0.9" />
      <rect x="6" y="7" width="12" height="2" rx="1" opacity="0.65" />
      <rect x="6" y="15.5" width="12" height="2" rx="1" opacity="0.65" />
    </BrandIcon>
  );
}

function WillpowerGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2 L20 10 L16 10 L16 22 L8 22 L8 10 L4 10 Z" opacity="0.88" />
    </BrandIcon>
  );
}

function FocusGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <circle cx="12" cy="12" r="2.5" opacity="0.95" />
    </BrandIcon>
  );
}

function EmpathyGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 21 C12 21 3.7 15.6 3.7 9.4 C3.7 6.3 6.1 4.2 8.7 4.2 C10.4 4.2 11.5 5.2 12 6.2 C12.5 5.2 13.6 4.2 15.3 4.2 C17.9 4.2 20.3 6.3 20.3 9.4 C20.3 15.6 12 21 12 21 Z" opacity="0.88" />
    </BrandIcon>
  );
}

function EnduranceGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 3 L14.5 9 L21 9.5 L16 14 L17.5 21 L12 17.5 L6.5 21 L8 14 L3 9.5 L9.5 9 Z" opacity="0.4" />
      <ellipse cx="12" cy="13" rx="6" ry="8" opacity="0.85" />
    </BrandIcon>
  );
}

function AgilityGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 12 L10 6 L14 10 L20 4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d="M16 4 L20 4 L20 8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <path d="M4 18 L20 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
    </BrandIcon>
  );
}

function AdaptabilityGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 4 C7.6 4 4 7.6 4 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M4 12 C4 16.4 7.6 20 12 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M12 20 C16.4 20 20 16.4 20 12 C20 7.6 16.4 4 12 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="12" cy="4" r="1.8" opacity="0.9" />
    </BrandIcon>
  );
}

function StrengthGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="2" y="11" width="4" height="2" rx="1" opacity="0.9" />
      <rect x="18" y="11" width="4" height="2" rx="1" opacity="0.9" />
      <rect x="6" y="9" width="12" height="6" rx="3" opacity="0.85" />
      <rect x="9" y="7" width="2" height="10" rx="1" opacity="0.5" />
      <rect x="13" y="7" width="2" height="10" rx="1" opacity="0.5" />
    </BrandIcon>
  );
}

const ATTR_GLYPH: Record<string, React.ComponentType<BrandIconProps>> = {
  intelligence: IntellectGlyph,
  wisdom: WisdomGlyph,
  charisma: CharismaGlyph,
  creativity: CreativityGlyph,
  discipline: DisciplineGlyph,
  willpower: WillpowerGlyph,
  focus: FocusGlyph,
  empathy: EmpathyGlyph,
  endurance: EnduranceGlyph,
  agility: AgilityGlyph,
  adaptability: AdaptabilityGlyph,
  strength: StrengthGlyph,
  // New attributes reuse the closest existing mark until dedicated glyphs land
  // on this legacy grid (CharacterTile now prefers AttributesTable).
  "emotional-intelligence": EmpathyGlyph,
  perception: FocusGlyph,
  power: WillpowerGlyph,
  technology: FocusGlyph,
  communication: CharismaGlyph,
  memory: IntellectGlyph,
  courage: WillpowerGlyph,
};

/* ---------------------------------------------------------- attribute card */

function AttributeCard({ attr, progress }: { attr: AttributeMeta; progress: AttributeProgress }) {
  const { color, label, tiers } = attr;
  const eff = effectiveValue(progress);
  const tierIdx = tierIndex(eff);
  const tierLabel = tiers[tierIdx];
  const barFill = Number.isFinite(eff) ? eff / 100 : 1;
  const Glyph = ATTR_GLYPH[attr.id];

  return (
    <Tooltip
      title={
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: "0.72rem" }}>{attr.description}</Typography>
          {Number.isFinite(progress.bonus) && progress.bonus > 0 && (
            <Typography sx={{ fontSize: "0.65rem", color: "#86efac", mt: 0.25 }}>
              Base {formatAttributeMark(progress.base)} + Gear +{progress.bonus}
            </Typography>
          )}
        </Box>
      }
      arrow
      placement="top"
    >
      <Stack
        sx={{
          p: 1.1,
          borderRadius: 2.5,
          bgcolor: "#fff",
          gap: 0.75,
          background: `radial-gradient(130% 120% at 0% 0%, ${alpha(color, 0.15)} 0%, ${alpha(color, 0.04)} 45%, #fff 100%)`,
          boxShadow: `0 0 0 1px ${alpha(color, 0.18)}, 0 4px 12px -4px ${alpha(color, 0.3)}`,
          transition: "box-shadow .2s",
        }}
      >
        {/* Header */}
        <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: alpha(color, 0.14),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color,
              flexShrink: 0,
            }}
          >
            {Glyph ? <Glyph size={20} title={label} /> : null}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color, display: "block", lineHeight: 1.2 }}>
              {label}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: "0.64rem", color: "text.secondary", fontWeight: 600 }}>
              {tierLabel}
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 900, fontSize: "0.85rem", color, flexShrink: 0 }}>
            {formatAttributeMark(eff)}
          </Typography>
        </Stack>

        {/* Progress bar */}
        <Box sx={{ borderRadius: 1, bgcolor: alpha(color, 0.1), height: 5, overflow: "hidden" }}>
          <Box
            sx={{
              height: "100%",
              width: `${barFill * 100}%`,
              borderRadius: 1,
              bgcolor: color,
              boxShadow: `0 0 6px ${alpha(color, 0.5)}`,
              transition: "width .3s",
            }}
          />
        </Box>

        {/* Bonus indicator */}
        {progress.bonus > 0 && (
          <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#16a34a" }}>
            +{progress.bonus} from gear
          </Typography>
        )}
      </Stack>
    </Tooltip>
  );
}

/* ------------------------------------------------------------- grid */

/**
 * @deprecated Quarantined — Surfaced uses `AttributesCard` (same
 * `useEffectiveAttributes` path); Character lens uses `AttributesTable`.
 * Kept for Storybook / stray imports only; do not wire into ProfilePage.
 */
export interface AttributesGridProps {
  progress?: AttributeProgressMap;
}

/** @deprecated Prefer AttributesCard / AttributesTable. */
export function AttributesGrid({ progress }: AttributesGridProps = {}) {
  const effective = useEffectiveAttributes();
  const resolved = progress ?? effective;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 1,
      }}
    >
      {ATTRIBUTES.map((attr) => {
        const p = resolved[attr.id] ?? { base: 0, bonus: 0 };
        return <AttributeCard key={attr.id} attr={attr} progress={p} />;
      })}
    </Box>
  );
}
