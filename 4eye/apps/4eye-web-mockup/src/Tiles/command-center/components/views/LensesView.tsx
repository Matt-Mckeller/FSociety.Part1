"use client";

import * as React from "react";
import { Box, Chip, Stack, Typography, alpha, useTheme } from "@mui/material";
import { getTrait, type Entity, type GoalLink, type SymbolColor, type SymbolName, COLOR_MAP } from "@4eye/types";
import { Symbol as BrandSymbol } from "@4eye/features";

import { useCommandCenter } from "../../store/CommandCenterProvider";
import { weightOf } from "../EntityControls";
import { LensGlyph, EntityTypeGlyph } from "../planning-glyphs";
import { WeightMeter } from "../../../entity-tile/components/slot-visuals";

type LensKind = "value" | "marketing" | "craft";

/** Which group a lens belongs to. Missing/unknown defaults to "craft". */
function lensKindOf(lens: Entity): LensKind {
  const k = lens.meta?.lensKind;
  return k === "value" || k === "marketing" ? k : "craft";
}

interface LensCardProps {
  lens: Entity;
  linkedItems: Array<{ gl: GoalLink; entity: Entity }>;
  /** 1-based importance rank within the lens's group. */
  rank: number;
}

function LensCard({ lens, linkedItems, rank }: LensCardProps) {
  const theme = useTheme();
  const accent = theme.palette.primary.main;
  const w = weightOf(lens);
  const outcome = getTrait(lens.traits, "goalDirected")?.outcome;
  const testQuestion = typeof lens.meta?.summary === "string" ? lens.meta.summary : undefined;

  const symbolColorHex =
    lens.symbolColor && lens.symbolColor in COLOR_MAP
      ? COLOR_MAP[lens.symbolColor as keyof typeof COLOR_MAP]
      : accent;

  return (
    <Box
      sx={{
        p: 1.75,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(symbolColorHex, 0.28),
        background: `linear-gradient(135deg, ${alpha(symbolColorHex, 0.07)}, transparent 55%)`,
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
      }}
    >
      {/* Header */}
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            flexShrink: 0,
            minWidth: 22,
            height: 22,
            px: 0.5,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 11,
            color: symbolColorHex,
            bgcolor: alpha(symbolColorHex, 0.16),
          }}
          title={`Importance rank #${rank}`}
        >
          {`#${rank}`}
        </Box>
        {lens.symbol && (
          <BrandSymbol
            name={lens.symbol as SymbolName}
            color={(lens.symbolColor as SymbolColor) ?? "slate"}
            size={22}
          />
        )}
        <Typography variant="subtitle2" sx={{ fontWeight: 800, flex: 1, minWidth: 0 }}>
          {lens.name}
        </Typography>
        <Chip
          size="small"
          label={`${w}`}
          sx={{
            height: 20,
            fontWeight: 800,
            bgcolor: alpha(symbolColorHex, 0.14),
            color: symbolColorHex,
            flexShrink: 0,
          }}
        />
        <WeightMeter weight={w} width={52} />
      </Stack>

      {/* Outcome */}
      {outcome && (
        <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500, lineHeight: 1.4 }}>
          {outcome}
        </Typography>
      )}

      {/* Test question */}
      {testQuestion && (
        <Box
          sx={{
            px: 1.25,
            py: 0.75,
            borderRadius: 1.25,
            bgcolor: alpha(symbolColorHex, 0.08),
            borderLeft: `3px solid ${alpha(symbolColorHex, 0.5)}`,
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary", fontStyle: "italic", lineHeight: 1.4 }}>
            {testQuestion}
          </Typography>
        </Box>
      )}

      {/* Linked work items */}
      {linkedItems.length > 0 && (
        <Box>
          <Typography
            variant="caption"
            sx={{ fontWeight: 800, color: "text.disabled", letterSpacing: 0.4, textTransform: "uppercase", display: "block", mb: 0.75 }}
          >
            Linked Work
          </Typography>
          <Stack spacing={0.5}>
            {linkedItems.map(({ gl, entity }) => (
              <Stack key={gl.id} sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
                <Box sx={{ color: alpha(symbolColorHex, 0.5), display: "flex", flexShrink: 0 }}>
                  <EntityTypeGlyph type={entity.type} size={13} />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ flex: 1, minWidth: 0, fontWeight: 600, lineHeight: 1.3, color: "text.secondary" }}
                  noWrap
                >
                  {entity.name}
                </Typography>
                <WeightMeter weight={gl.weight} width={40} />
              </Stack>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

/** The selectable lens-type tabs, in display order. */
const LENS_TABS: { kind: LensKind; label: string }[] = [
  { kind: "value", label: "Value" },
  { kind: "marketing", label: "Marketing" },
  { kind: "craft", label: "Craft" },
];

export function LensesView() {
  const theme = useTheme();
  const accent = theme.palette.primary.main;
  const { store } = useCommandCenter();
  const [kind, setKind] = React.useState<LensKind>("value");

  const byKind = React.useMemo(() => {
    const byWeight = (a: Entity, b: Entity) => weightOf(b) - weightOf(a);
    const all = store.entitiesOfType("priority");
    const out: Record<LensKind, Entity[]> = { value: [], marketing: [], craft: [] };
    for (const e of all) out[lensKindOf(e)].push(e);
    for (const k of Object.keys(out) as LensKind[]) out[k].sort(byWeight);
    return out;
  }, [store]);

  const linkedFor = React.useCallback(
    (lensId: string) =>
      store
        .goalLinksForGoal(lensId)
        .map((gl) => ({ gl, entity: store.getEntity(gl.entityId) }))
        .filter((r): r is { gl: GoalLink; entity: Entity } => Boolean(r.entity))
        .slice(0, 5),
    [store],
  );

  const lenses = byKind[kind];

  return (
    <Stack spacing={1.5}>
      {/* "Lenses" + type tabs (Value / Marketing / Craft). */}
      <Stack
        role="tablist"
        aria-label="Lens types"
        sx={{ flexDirection: "row", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
          <Box sx={{ color: accent, display: "flex" }}>
            <LensGlyph size={18} />
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
            Lenses
          </Typography>
        </Stack>

        <Stack sx={{ flexDirection: "row", gap: 0.5, flexWrap: "wrap" }}>
          {LENS_TABS.map((t) => {
            const selected = t.kind === kind;
            const count = byKind[t.kind].length;
            return (
              <Box
                key={t.kind}
                role="tab"
                aria-selected={selected}
                tabIndex={0}
                onClick={() => setKind(t.kind)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setKind(t.kind);
                  }
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                  px: 1.25,
                  py: 0.5,
                  borderRadius: 1.5,
                  cursor: "pointer",
                  userSelect: "none",
                  color: selected ? accent : alpha(theme.palette.text.primary, 0.62),
                  bgcolor: selected ? alpha(accent, 0.12) : "transparent",
                  border: "1px solid",
                  borderColor: selected ? alpha(accent, 0.32) : "transparent",
                  transition: "all 140ms ease",
                  "&:hover": {
                    bgcolor: selected ? alpha(accent, 0.16) : alpha(accent, 0.06),
                    color: selected ? accent : theme.palette.text.primary,
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${alpha(accent, 0.6)}`,
                    outlineOffset: 1,
                  },
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: selected ? 800 : 600, fontSize: 12 }}>
                  {t.label}
                </Typography>
                <Box
                  sx={{
                    fontSize: 10.5,
                    fontWeight: 800,
                    minWidth: 16,
                    textAlign: "center",
                    px: 0.5,
                    borderRadius: 1,
                    color: selected ? accent : "text.disabled",
                    bgcolor: selected ? alpha(accent, 0.14) : alpha(theme.palette.text.primary, 0.06),
                  }}
                >
                  {count}
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Stack>

      {/* Ranked cards for the active lens type. Responsive without relying on
          named breakpoints — fills as many ~440px columns as fit. */}
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: "repeat(auto-fill, minmax(440px, 1fr))",
          alignItems: "start",
        }}
      >
        {lenses.map((lens, i) => (
          <LensCard key={lens.id} lens={lens} rank={i + 1} linkedItems={linkedFor(lens.id)} />
        ))}
      </Box>
    </Stack>
  );
}
