"use client";

/**
 * StatusTargetsSection — Mood, Auras, Gear, Buffs as one larger grid language.
 *
 * One shared expand host: tapping any tile opens {@link StatusTargetHud} below
 * the whole section (not a hover popover or Dialog). Pins write to Action Bars
 * when LoadoutProvider is present.
 */

import * as React from "react";
import { Box, Collapse, Stack, Typography, alpha } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import { SLOT_LABEL } from "../model/equipment";
import { MOOD_META, type MoodLabel } from "../model/status";
import {
  STATUS_TARGET_KIND_META,
  parseStatusTargetKey,
  statusTargetKey,
  type StatusTargetKind,
  type StatusTargetRef,
} from "../model/statusTargets";
import {
  statusTargetSizeTokens,
  type StatusTargetSize,
  type StatusTargetSizeTokens,
} from "../model/statusTargetSizes";
import { timeLeftLabel } from "../lib/time";
import { useProfileStore } from "../store/CharacterProfileStore";
import {
  useCharacterAuras,
  useCharacterSeedEffects,
  useCharacterStatus,
} from "../store/useCharacterPresentation";
import { AuraGlyphs, AURA_GLYPHS_VARIANT_META, useAuraGlyphsVariant, type AuraGlyphsVariant } from "./shared/AuraGlyphs";
import { SquareTileGrid, type SquareTile } from "./SquareTileGrid";
import { StatusTargetHud } from "./StatusTargetHud";
import { StatusTargetMark } from "./StatusTargetMark";
import { StatusTargetSizeToggle } from "./StatusTargetSizeToggle";
import { useStatusTargetSize } from "./useStatusTargetSize";

const AURA_COLLAPSED_TILE_ID = "aura:collapsed";
const STATUS_COMBINED_TILE_ID = "status:combined";

export interface StatusTargetsSectionProps {
  /** Collapse auras into one circular {@link AuraGlyphs} tile (default true). */
  collapseAuras?: boolean;
  /** Start with individual aura tiles visible (only when {@link collapseAuras}). */
  defaultAurasExpanded?: boolean;
  /** Collapsed Auras tile visualization — orbit, mono, web, field, cypher. */
  auraGlyphsVariant?: AuraGlyphsVariant;
  /** Tile + HUD scale — compact summary uses grid tokens when expanded inline. */
  size?: StatusTargetSize;
}

/** Composite glyph for the combined status summary tile. */
function StatusSummaryGlyph({ tokens }: { tokens: StatusTargetSizeTokens }) {
  const { variant } = useAuraGlyphsVariant();
  const { state } = useProfileStore();
  const status = useCharacterStatus();
  const seeded = useCharacterSeedEffects();
  const moodRef: StatusTargetRef = { kind: "mood", moodId: status.mood };
  const gearCount = state.equippedItems.filter((i) => i.equipped).length;
  const buffCount = (seeded ?? state.activeEffects).filter((e) => e.kind === "buff").length;
  const gearColor = state.equippedItems.find((i) => i.equipped)?.color ?? "#64748b";

  return (
    <Stack sx={{ alignItems: "center", justifyContent: "center", gap: 0.2, width: "100%" }}>
      <StatusTargetMark target={moodRef} size={tokens.markSize} />
      <AuraGlyphs size={tokens.auraGlyphsSize} variant={variant} />
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.35 }}>
        {gearCount > 0 && (
          <Inventory2OutlinedIcon sx={{ fontSize: tokens.markSize * 0.68, color: gearColor }} />
        )}
        {buffCount > 0 && (
          <Typography
            sx={{
              fontSize: `${0.48 * tokens.tileScale}rem`,
              fontWeight: 900,
              color: "#16a34a",
              lineHeight: 1,
            }}
          >
            {buffCount}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

function SectionHeader({
  kind,
  tokens,
  sx,
}: {
  kind: StatusTargetKind;
  tokens: StatusTargetSizeTokens;
  sx?: object;
}) {
  const meta = STATUS_TARGET_KIND_META[kind];
  return (
    <Typography
      sx={{
        color: "text.secondary",
        fontWeight: 800,
        fontSize: tokens.headerFontSize,
        letterSpacing: "0.12em",
        mb: 0.85,
        ...sx,
      }}
    >
      {meta.section}
    </Typography>
  );
}

function useStatusTargetTiles(
  collapseAuras: boolean,
  aurasExpanded: boolean,
  auraGlyphsVariant: AuraGlyphsVariant,
  tokens: StatusTargetSizeTokens,
  onCycleAuraGlyphs?: () => void,
  canCycleAuraGlyphs = false,
) {
  const { state } = useProfileStore();
  const status = useCharacterStatus();
  const auras = useCharacterAuras();
  const seeded = useCharacterSeedEffects();

  const moodReadouts: Array<{ id: MoodLabel; intensity: number }> = [
    { id: status.mood, intensity: status.moodIntensity },
    ...(status.additionalMoods ?? []),
  ];

  const moodTiles: SquareTile[] = moodReadouts.flatMap((m) => {
    const meta = MOOD_META[m.id];
    if (!meta) return [];
    const ref: StatusTargetRef = { kind: "mood", moodId: m.id };
    return [
      {
        id: statusTargetKey(ref),
        label: meta.label,
        glyph: <StatusTargetMark target={ref} size={tokens.markSize} />,
        color: meta.color,
        meta: `${m.intensity}`,
      },
    ];
  });

  const visibleAuras = auras.filter((a) => state.auraActive[a.id] || a.alwaysOn || a.important);
  const appliedAuraCount = visibleAuras.filter((a) => state.auraActive[a.id]).length;

  const auraTilesDetailed: SquareTile[] = visibleAuras.map((a) => {
    const ref: StatusTargetRef = { kind: "aura", auraId: a.id };
    const lvl = state.auraLevels[a.id] ?? -1;
    const degree = lvl < 0 ? "Locked" : a.degrees[lvl];
    return {
      id: statusTargetKey(ref),
      label: a.label.replace(/\(\)$/, "").split(".").pop() ?? a.label,
      glyph: <StatusTargetMark target={ref} size={tokens.markSize} auraCatalog={auras} />,
      color: a.color,
      meta: degree,
      done: !!state.auraActive[a.id],
    };
  });

  const variantMeta = AURA_GLYPHS_VARIANT_META[auraGlyphsVariant];

  const auraTiles: SquareTile[] =
    collapseAuras && !aurasExpanded && auraTilesDetailed.length > 0
      ? [
          {
            id: AURA_COLLAPSED_TILE_ID,
            label: "Auras",
            glyph: <AuraGlyphs size={tokens.auraGlyphsSize} variant={auraGlyphsVariant} showTooltip={false} />,
            color: STATUS_TARGET_KIND_META.aura.color,
            meta: canCycleAuraGlyphs
              ? `${appliedAuraCount} applied · ${variantMeta.label}`
              : `${appliedAuraCount} applied`,
            onGlyphClick: canCycleAuraGlyphs ? onCycleAuraGlyphs : undefined,
            glyphHint: canCycleAuraGlyphs
              ? `${variantMeta.label} view — click glyph to cycle (${variantMeta.hint})`
              : undefined,
          },
        ]
      : auraTilesDetailed;

  const equipped = state.equippedItems.filter((i) => i.equipped);
  const gearTiles: SquareTile[] = equipped.slice(0, 8).map((item) => {
    const ref: StatusTargetRef = { kind: "gear", itemId: item.id };
    return {
      id: statusTargetKey(ref),
      label: item.name.replace(/\s*\([^)]*\)/g, "").trim().slice(0, 16),
      glyph: <StatusTargetMark target={ref} size={tokens.markSize} gearItem={item} />,
      color: item.color,
      meta: SLOT_LABEL[item.slot],
    };
  });

  const buffs = (seeded ?? state.activeEffects).filter((e) => e.kind === "buff");
  const buffTiles: SquareTile[] = buffs.map((b) => {
    const ref: StatusTargetRef = { kind: "buff", effectId: b.id };
    return {
      id: statusTargetKey(ref),
      label: b.label,
      glyph: <StatusTargetMark target={ref} size={tokens.markSize} effect={b} />,
      color: b.color,
      meta: b.expiresAt ? timeLeftLabel(b.expiresAt) : undefined,
    };
  });

  const sections = (
    [
      { kind: "mood" as const, tiles: moodTiles },
      { kind: "aura" as const, tiles: auraTiles },
      { kind: "gear" as const, tiles: gearTiles },
      { kind: "buff" as const, tiles: buffTiles },
    ] as const
  ).filter((s): s is { kind: StatusTargetKind; tiles: SquareTile[] } => s.tiles.length > 0);

  return { sections, status, appliedAuraCount, gearCount: equipped.length, buffCount: buffs.length };
}

function AuraSectionHeader({
  kind,
  aurasExpanded,
  onCollapse,
  variant,
  onCycleVariant,
  canCycleVariant,
  tokens,
}: {
  kind: StatusTargetKind;
  aurasExpanded: boolean;
  onCollapse: () => void;
  variant?: AuraGlyphsVariant;
  onCycleVariant?: () => void;
  canCycleVariant?: boolean;
  tokens: StatusTargetSizeTokens;
}) {
  if (kind !== "aura") return <SectionHeader kind={kind} tokens={tokens} />;
  const variantMeta = variant ? AURA_GLYPHS_VARIANT_META[variant] : null;

  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", mb: 0.85 }}>
      <SectionHeader kind={kind} tokens={tokens} sx={{ mb: 0 }} />
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        {!aurasExpanded && canCycleVariant && variantMeta && onCycleVariant && (
          <Typography
            role="button"
            tabIndex={0}
            onClick={onCycleVariant}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onCycleVariant();
              }
            }}
            sx={{
              fontSize: "0.58rem",
              fontWeight: 800,
              color: STATUS_TARGET_KIND_META.aura.color,
              cursor: "pointer",
              letterSpacing: 0.2,
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              "&:hover": { opacity: 0.85 },
            }}
          >
            {variantMeta.label} ↻
          </Typography>
        )}
        {aurasExpanded && (
          <Typography
            role="button"
            tabIndex={0}
            onClick={onCollapse}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onCollapse();
              }
            }}
            sx={{
              fontSize: "0.58rem",
              fontWeight: 800,
              color: "text.secondary",
              cursor: "pointer",
              letterSpacing: 0.2,
              "&:hover": { color: STATUS_TARGET_KIND_META.aura.color },
            }}
          >
            Collapse
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

export function StatusTargetsSection({
  collapseAuras = true,
  defaultAurasExpanded = false,
  auraGlyphsVariant: auraGlyphsVariantProp,
  size = "grid",
}: StatusTargetsSectionProps = {}) {
  const tokens = statusTargetSizeTokens(size);
  const { variant, cycle, canCycle } = useAuraGlyphsVariant(auraGlyphsVariantProp);
  const [expandedKey, setExpandedKey] = React.useState<string | null>(null);
  const [aurasExpanded, setAurasExpanded] = React.useState(defaultAurasExpanded);
  const { sections } = useStatusTargetTiles(
    collapseAuras,
    aurasExpanded,
    variant,
    tokens,
    cycle,
    canCycle,
  );

  const handleExpandedChange = (id: string | null) => {
    if (id === AURA_COLLAPSED_TILE_ID) {
      setAurasExpanded(true);
      setExpandedKey(null);
      return;
    }
    setExpandedKey(id);
  };

  const expandedTarget = expandedKey ? parseStatusTargetKey(expandedKey) : null;

  if (sections.length === 0) return null;

  return (
    <Stack sx={{ gap: tokens.sectionGap, width: "100%" }}>
      {sections.map(({ kind, tiles }) => (
        <Box key={kind}>
          <SquareTileGrid
            tiles={tiles}
            minTile={tokens.minTile}
            gap={tokens.gridGap}
            tileScale={tokens.tileScale}
            header={
              kind === "aura" ? (
                <AuraSectionHeader
                  kind={kind}
                  tokens={tokens}
                  aurasExpanded={aurasExpanded}
                  variant={variant}
                  canCycleVariant={canCycle && !aurasExpanded}
                  onCycleVariant={cycle}
                  onCollapse={() => {
                    setAurasExpanded(false);
                    setExpandedKey(null);
                  }}
                />
              ) : (
                <SectionHeader kind={kind} tokens={tokens} />
              )
            }
            expandedId={expandedKey}
            onExpandedChange={handleExpandedChange}
            showDrawer={false}
          />
        </Box>
      ))}
      {expandedTarget && (
        <StatusTargetHud
          target={expandedTarget}
          onClose={() => setExpandedKey(null)}
          markSize={tokens.hudMarkSize}
        />
      )}
    </Stack>
  );
}

function StatusTargetsCompact({
  tokens,
  sectionProps,
}: {
  tokens: StatusTargetSizeTokens;
  sectionProps: Omit<StatusTargetsSectionProps, "size">;
}) {
  const [open, setOpen] = React.useState(false);
  const gridTokens = statusTargetSizeTokens("grid");
  const { variant } = useAuraGlyphsVariant(sectionProps.auraGlyphsVariant);
  const { sections, status } = useStatusTargetTiles(
    true,
    false,
    variant,
    tokens,
  );
  const moodMeta = MOOD_META[status.mood];
  const accent = moodMeta?.color ?? STATUS_TARGET_KIND_META.mood.color;

  if (sections.length === 0) return null;

  const summaryParts = sections.map((s) => s.tiles.length);
  const summaryMeta = summaryParts.join(" · ");

  const summaryTile: SquareTile = {
    id: STATUS_COMBINED_TILE_ID,
    label: "Status",
    glyph: <StatusSummaryGlyph tokens={tokens} />,
    color: accent,
    meta: summaryMeta,
  };

  return (
    <Stack sx={{ gap: 0, width: "100%" }}>
      <Box
        sx={{
          maxWidth: tokens.summaryMaxWidth,
          borderRadius: 2,
          ...(open && {
            "& [role=button]": {
              borderColor: alpha(accent, 0.65),
              bgcolor: alpha(accent, 0.06),
            },
          }),
        }}
      >
        <SquareTileGrid
          tiles={[summaryTile]}
          minTile={tokens.minTile}
          gap={tokens.gridGap}
          tileScale={tokens.tileScale}
          expandedId={open ? STATUS_COMBINED_TILE_ID : null}
          onExpandedChange={(id) => setOpen(id === STATUS_COMBINED_TILE_ID)}
          showDrawer={false}
        />
      </Box>
      <Collapse in={open} unmountOnExit>
        <Box sx={{ mt: gridTokens.sectionGap, maxWidth: gridTokens.maxWidth, width: "100%" }}>
          <StatusTargetsSection {...sectionProps} size="grid" />
        </Box>
      </Collapse>
    </Stack>
  );
}

export interface StatusTargetsProps extends Omit<StatusTargetsSectionProps, "size"> {
  /** Initial / persisted display size when uncontrolled. */
  defaultSize?: StatusTargetSize;
  /** Controlled display size — disables persistence when set. */
  size?: StatusTargetSize;
  /** Show Compact · Grid · Large toggle (default true). */
  showSizeToggle?: boolean;
}

/**
 * StatusTargets — size-toggleable host for compact summary, full grid, or hero grid.
 */
export function StatusTargets({
  defaultSize = "grid",
  size: controlledSize,
  showSizeToggle = true,
  ...sectionProps
}: StatusTargetsProps = {}) {
  const { size, setSize, canSet } = useStatusTargetSize({
    controlled: controlledSize,
    defaultSize,
  });
  const tokens = statusTargetSizeTokens(size);
  const status = useCharacterStatus();
  const moodMeta = MOOD_META[status.mood];
  const accent = moodMeta?.color ?? STATUS_TARGET_KIND_META.mood.color;

  const toggle =
    showSizeToggle && canSet && controlledSize == null ? (
      <StatusTargetSizeToggle value={size} onChange={setSize} accent={accent} />
    ) : null;

  if (size === "compact") {
    return (
      <Box sx={{ maxWidth: statusTargetSizeTokens("grid").maxWidth, width: "100%" }}>
        {toggle}
        <StatusTargetsCompact tokens={tokens} sectionProps={sectionProps} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: tokens.maxWidth, width: "100%" }}>
      {toggle}
      <StatusTargetsSection {...sectionProps} size={size} />
    </Box>
  );
}

/**
 * StatusTargetsCombined — compact summary tile only (back-compat).
 * Prefer {@link StatusTargets} with `defaultSize="compact"` or the size toggle.
 */
export function StatusTargetsCombined() {
  return <StatusTargets defaultSize="compact" showSizeToggle={false} />;
}

/** Back-compat: buff-only grid used to live alone on Today. */
export function BuffGrid() {
  const { state } = useProfileStore();
  const seeded = useCharacterSeedEffects();
  const buffs = (seeded ?? state.activeEffects).filter((e) => e.kind === "buff");
  const [expandedKey, setExpandedKey] = React.useState<string | null>(null);

  if (buffs.length === 0) return null;

  const tiles: SquareTile[] = buffs.map((b) => {
    const ref: StatusTargetRef = { kind: "buff", effectId: b.id };
    return {
      id: statusTargetKey(ref),
      label: b.label,
      glyph: <StatusTargetMark target={ref} size={18} effect={b} />,
      color: b.color,
      meta: b.expiresAt ? timeLeftLabel(b.expiresAt) : undefined,
    };
  });

  const expandedTarget = expandedKey ? parseStatusTargetKey(expandedKey) : null;

  return (
    <Box>
      <SquareTileGrid
        tiles={tiles}
        minTile={78}
        header={<SectionHeader kind="buff" tokens={statusTargetSizeTokens("grid")} />}
        expandedId={expandedKey}
        onExpandedChange={setExpandedKey}
        showDrawer={false}
      />
      {expandedTarget && (
        <StatusTargetHud target={expandedTarget} onClose={() => setExpandedKey(null)} />
      )}
    </Box>
  );
}
