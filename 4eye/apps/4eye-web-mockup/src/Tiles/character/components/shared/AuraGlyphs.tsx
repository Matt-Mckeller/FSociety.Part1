"use client";

/**
 * AuraGlyphs — all active auras reduced to one badge.
 *
 * Variants trade compactness for spatial / informational reads:
 *   orbit   — colored glyphs on a dashed ring (default, StatusStrip)
 *   mono    — single ink; form carries identity, not hue
 *   web     — hub-and-spoke mesh with ring + cross-links
 *   field   — concentric rings + radial broadcast lines
 *   cypher  — monospace codes — cyber-minimal density
 *
 * Reads applied state from CharacterProfileStore when present so the chip
 * matches AurasGrid / Status Targets. Falls back to defaults outside the store.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";

import {
  AURAS,
  AURA_ACTIVE_DEFAULT,
  JANNA_AURAS,
  JANNA_AURA_ACTIVE_DEFAULT,
  type AuraActive,
  type AuraMeta,
} from "../Auras";
import { useChannelInks } from "../../theme/characterPalette";
import { useIsJannaProfile } from "../../store/useCharacterPresentation";
import { useOptionalProfileStore } from "../../store/CharacterProfileStore";

const MONO_FONT =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

const DEFAULT_INK = "#818cf8";

export type AuraGlyphsVariant = "orbit" | "mono" | "web" | "field" | "cypher";

export const AURA_GLYPHS_VARIANT_META: Record<
  AuraGlyphsVariant,
  { label: string; hint: string }
> = {
  orbit: {
    label: "Orbit",
    hint: "Colored glyphs on a dashed ring — compact default.",
  },
  mono: {
    label: "Monochrome",
    hint: "Single ink channel — identity through form, not hue.",
  },
  web: {
    label: "Web",
    hint: "Nodes linked by a field mesh — hub, ring, and cross-links.",
  },
  field: {
    label: "Field",
    hint: "Concentric rings and radial lines — the aura as broadcast.",
  },
  cypher: {
    label: "Cypher",
    hint: "Monospace codes — deep information, minimal chrome.",
  },
};

export const AURA_GLYPHS_VARIANTS: readonly AuraGlyphsVariant[] = [
  "orbit",
  "mono",
  "web",
  "field",
  "cypher",
];

/** localStorage key for the collapsed-badge visualization preference. */
export const AURA_GLYPHS_VARIANT_STORAGE_KEY = "4eye:auras:glyphs-variant:v1";

export function cycleAuraGlyphsVariant(current: AuraGlyphsVariant): AuraGlyphsVariant {
  const i = AURA_GLYPHS_VARIANTS.indexOf(current);
  const next = (i + 1) % AURA_GLYPHS_VARIANTS.length;
  return AURA_GLYPHS_VARIANTS[next] ?? "orbit";
}

function readStoredAuraGlyphsVariant(): AuraGlyphsVariant | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AURA_GLYPHS_VARIANT_STORAGE_KEY);
    if (raw && (AURA_GLYPHS_VARIANTS as readonly string[]).includes(raw)) {
      return raw as AuraGlyphsVariant;
    }
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Persisted visualization for collapsed Auras badges.
 * Pass `fixed` to lock a variant (Storybook); omit for live cycling + localStorage.
 */
export function useAuraGlyphsVariant(fixed?: AuraGlyphsVariant): {
  variant: AuraGlyphsVariant;
  cycle: () => void;
  setVariant: (next: AuraGlyphsVariant) => void;
  canCycle: boolean;
} {
  const [stored, setStored] = React.useState<AuraGlyphsVariant>(() => fixed ?? "orbit");

  React.useEffect(() => {
    if (fixed) return;
    const saved = readStoredAuraGlyphsVariant();
    if (saved) setStored(saved);
  }, [fixed]);

  const persist = React.useCallback(
    (next: AuraGlyphsVariant | ((prev: AuraGlyphsVariant) => AuraGlyphsVariant)) => {
      setStored((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        if (!fixed && typeof window !== "undefined") {
          try {
            window.localStorage.setItem(AURA_GLYPHS_VARIANT_STORAGE_KEY, resolved);
          } catch {
            /* ignore */
          }
        }
        return resolved;
      });
    },
    [fixed],
  );

  const variant = fixed ?? stored;

  return {
    variant,
    cycle: React.useCallback(() => {
      if (fixed) return;
      persist((prev) => cycleAuraGlyphsVariant(prev));
    }, [fixed, persist]),
    setVariant: (next: AuraGlyphsVariant) => persist(next),
    canCycle: !fixed,
  };
}

function withAlwaysOn(auras: AuraMeta[], active: AuraActive): AuraActive {
  const next = { ...active };
  for (const a of auras) {
    if (a.alwaysOn) next[a.id] = true;
  }
  return next;
}

/** Short monospace tag from an aura label or id. */
export function auraCypherCode(aura: AuraMeta): string {
  const raw = aura.label.replace(/\(\)$/, "");
  const tail = raw.includes(".") ? (raw.split(".").pop() ?? raw) : raw;
  const compact = tail.replace(/[^a-zA-Z]/g, "").toUpperCase();
  if (compact.length >= 3) return compact.slice(0, 4);
  return aura.id.slice(0, 4).toUpperCase();
}

interface AuraNode {
  aura: AuraMeta;
  x: number;
  y: number;
  angle: number;
  index: number;
}

function layoutAuraNodes(
  activeAuras: AuraMeta[],
  pad: number,
  box: number,
  radiusFactor: number,
): AuraNode[] {
  const count = activeAuras.length;
  const center = box / 2;
  const r = (box / 2 - pad) * radiusFactor;
  return activeAuras.map((aura, i) => {
    const angle = (i / Math.max(1, count)) * Math.PI * 2 - Math.PI / 2;
    return {
      aura,
      x: center + Math.cos(angle) * r,
      y: center + Math.sin(angle) * r,
      angle,
      index: i,
    };
  });
}

function variantFootprint(variant: AuraGlyphsVariant, size: number): number {
  switch (variant) {
    case "web":
      return Math.round(size * 1.55);
    case "field":
      return Math.round(size * 1.45);
    case "cypher":
      return Math.round(size * 1.25);
    default:
      return size + 6;
  }
}

function variantRadiusFactor(variant: AuraGlyphsVariant): number {
  switch (variant) {
    case "web":
      return 0.92;
    case "field":
      return 0.88;
    case "cypher":
      return 0.82;
    default:
      return 0.76;
  }
}

function useAuraGlyphsState(
  aurasProp: AuraMeta[] | undefined,
  defaultActiveProp: AuraActive | undefined,
) {
  const isJanna = useIsJannaProfile();
  const store = useOptionalProfileStore();
  const auras = aurasProp ?? (isJanna ? JANNA_AURAS : AURAS);
  const defaultActive =
    defaultActiveProp ?? (isJanna ? JANNA_AURA_ACTIVE_DEFAULT : AURA_ACTIVE_DEFAULT);

  const applied = store
    ? withAlwaysOn(auras as AuraMeta[], store.state.auraActive)
    : withAlwaysOn(auras as AuraMeta[], defaultActive);

  const activeAuras = auras.filter((a) => applied[a.id]);
  return { auras, activeAuras };
}

function AuraTooltip({ activeAuras }: { activeAuras: AuraMeta[] }) {
  const count = activeAuras.length;
  return (
    <Box sx={{ py: 0.25 }}>
      <Typography sx={{ fontSize: 11, fontWeight: 800, lineHeight: 1.4 }}>
        {count} aura{count === 1 ? "" : "s"} active
      </Typography>
      {activeAuras.map((a) => (
        <Typography key={a.id} sx={{ fontSize: 10.5, lineHeight: 1.45, color: a.color }}>
          {a.label}
        </Typography>
      ))}
    </Box>
  );
}

function OrbitAuraGlyphs({
  activeAuras,
  size,
  mono = false,
  ink,
}: {
  activeAuras: AuraMeta[];
  size: number;
  mono?: boolean;
  ink: string;
}) {
  const count = activeAuras.length;
  const box = size + 6;
  const pad = 3;
  const nodes = layoutAuraNodes(activeAuras, pad, box, 0.76);
  const center = box / 2;
  const r = (box / 2 - pad) * 0.76;
  const stroke = mono ? ink : alpha(DEFAULT_INK, 0.35);
  const fill = mono ? alpha(ink, 0.06) : alpha(DEFAULT_INK, 0.08);

  return (
    <Box
      sx={{
        position: "relative",
        width: box,
        height: box,
        borderRadius: "50%",
        border: "1px solid",
        borderColor: alpha(stroke, mono ? 0.55 : 1),
        bgcolor: fill,
        boxShadow: mono ? `0 0 10px ${alpha(ink, 0.14)}` : `0 0 8px ${alpha(DEFAULT_INK, 0.2)}`,
      }}
    >
      <Box
        component="svg"
        width={box}
        height={box}
        viewBox={`0 0 ${box} ${box}`}
        aria-hidden
        sx={{ display: "block", position: "absolute", inset: 0 }}
      >
        <circle
          cx={center}
          cy={center}
          r={r + 2}
          fill="none"
          stroke={stroke}
          strokeWidth={0.8}
          strokeDasharray={mono ? "1.5 2.5" : "2 2"}
          opacity={mono ? 0.7 : 1}
        />
      </Box>
      {nodes.map(({ aura, x, y }) => {
        const glyphSize = Math.max(8, Math.round(size * 0.38));
        const color = mono ? ink : aura.color;
        const { Glyph } = aura;
        const emphasis = mono && aura.important ? 1 : aura.important ? 0.65 : 0;
        return (
          <Box
            key={aura.id}
            sx={{
              position: "absolute",
              left: x - glyphSize / 2,
              top: y - glyphSize / 2,
              color,
              opacity: mono ? (aura.important ? 1 : 0.82) : 1,
              filter: emphasis
                ? `drop-shadow(0 0 ${mono ? 4 : 3}px ${alpha(color, emphasis)})`
                : undefined,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Glyph size={glyphSize} color={color} />
          </Box>
        );
      })}
    </Box>
  );
}

function WebAuraGlyphs({
  activeAuras,
  size,
  ink,
}: {
  activeAuras: AuraMeta[];
  size: number;
  ink: string;
}) {
  const box = variantFootprint("web", size);
  const pad = box * 0.08;
  const nodes = layoutAuraNodes(activeAuras, pad, box, variantRadiusFactor("web"));
  const center = box / 2;
  const count = nodes.length;
  const glyphSize = Math.max(9, Math.round(size * 0.34));

  const ringPairs = nodes.map((_, i) => [i, (i + 1) % count] as const);
  const crossPairs =
    count >= 4
      ? nodes.flatMap((_, i) => {
          const j = (i + Math.floor(count / 2)) % count;
          return i < j ? ([[i, j] as const] as const) : [];
        })
      : [];

  return (
    <Box
      sx={{
        position: "relative",
        width: box,
        height: box,
        flexShrink: 0,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(ink, 0.28),
        bgcolor: alpha(ink, 0.04),
        boxShadow: `0 0 14px ${alpha(ink, 0.1)}, inset 0 0 24px ${alpha(ink, 0.04)}`,
        overflow: "hidden",
      }}
    >
      <Box
        component="svg"
        width={box}
        height={box}
        viewBox={`0 0 ${box} ${box}`}
        aria-hidden
        sx={{ display: "block", position: "absolute", inset: 0 }}
      >
        {crossPairs.map(([a, b]) => (
          <line
            key={`x-${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={alpha(ink, 0.14)}
            strokeWidth={0.7}
          />
        ))}
        {ringPairs.map(([a, b]) => (
          <line
            key={`r-${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={alpha(ink, 0.32)}
            strokeWidth={0.85}
          />
        ))}
        {nodes.map((n) => (
          <line
            key={`h-${n.aura.id}`}
            x1={center}
            y1={center}
            x2={n.x}
            y2={n.y}
            stroke={alpha(ink, 0.22)}
            strokeWidth={0.75}
            strokeDasharray="3 2"
          />
        ))}
        <circle cx={center} cy={center} r={2.2} fill={ink} opacity={0.85} />
        <circle cx={center} cy={center} r={5.5} fill="none" stroke={alpha(ink, 0.35)} strokeWidth={0.8} />
        {nodes.map((n) => (
          <circle
            key={`d-${n.aura.id}`}
            cx={n.x}
            cy={n.y}
            r={n.aura.important ? 2.4 : 1.8}
            fill={ink}
            opacity={n.aura.important ? 0.95 : 0.65}
          />
        ))}
      </Box>
      {nodes.map(({ aura, x, y }) => {
        const { Glyph } = aura;
        return (
          <Box
            key={aura.id}
            sx={{
              position: "absolute",
              left: x - glyphSize / 2,
              top: y - glyphSize / 2,
              color: ink,
              opacity: aura.important ? 1 : 0.88,
              filter: aura.important ? `drop-shadow(0 0 4px ${alpha(ink, 0.55)})` : undefined,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Glyph size={glyphSize} color={ink} />
          </Box>
        );
      })}
    </Box>
  );
}

function FieldAuraGlyphs({
  activeAuras,
  size,
  ink,
}: {
  activeAuras: AuraMeta[];
  size: number;
  ink: string;
}) {
  const box = variantFootprint("field", size);
  const pad = box * 0.07;
  const nodes = layoutAuraNodes(activeAuras, pad, box, variantRadiusFactor("field"));
  const center = box / 2;
  const maxR = (box / 2 - pad) * variantRadiusFactor("field");
  const glyphSize = Math.max(8, Math.round(size * 0.32));

  return (
    <Box
      sx={{
        position: "relative",
        width: box,
        height: box,
        flexShrink: 0,
        borderRadius: "50%",
        border: "1px solid",
        borderColor: alpha(ink, 0.3),
        bgcolor: `radial-gradient(circle at 50% 50%, ${alpha(ink, 0.1)} 0%, ${alpha(ink, 0.02)} 55%, transparent 72%)`,
        boxShadow: `0 0 16px ${alpha(ink, 0.12)}`,
        overflow: "hidden",
      }}
    >
      <Box
        component="svg"
        width={box}
        height={box}
        viewBox={`0 0 ${box} ${box}`}
        aria-hidden
        sx={{ display: "block", position: "absolute", inset: 0 }}
      >
        {[0.34, 0.66, 1].map((t) => (
          <circle
            key={t}
            cx={center}
            cy={center}
            r={maxR * t}
            fill="none"
            stroke={alpha(ink, 0.16 + t * 0.08)}
            strokeWidth={0.75}
            strokeDasharray={t < 1 ? "2 3" : undefined}
          />
        ))}
        {nodes.map((n) => (
          <line
            key={`f-${n.aura.id}`}
            x1={center}
            y1={center}
            x2={n.x}
            y2={n.y}
            stroke={alpha(ink, 0.24)}
            strokeWidth={0.8}
          />
        ))}
        <circle cx={center} cy={center} r={1.6} fill={ink} opacity={0.9} />
      </Box>
      {nodes.map(({ aura, x, y }) => {
        const { Glyph } = aura;
        return (
          <Box
            key={aura.id}
            sx={{
              position: "absolute",
              left: x - glyphSize / 2,
              top: y - glyphSize / 2,
              color: ink,
              opacity: aura.important ? 1 : 0.78,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Glyph size={glyphSize} color={ink} />
          </Box>
        );
      })}
    </Box>
  );
}

function CypherAuraGlyphs({
  activeAuras,
  size,
  ink,
}: {
  activeAuras: AuraMeta[];
  size: number;
  ink: string;
}) {
  const box = variantFootprint("cypher", size);
  const pad = box * 0.06;
  const nodes = layoutAuraNodes(activeAuras, pad, box, variantRadiusFactor("cypher"));
  const center = box / 2;
  const count = activeAuras.length;

  return (
    <Box
      sx={{
        position: "relative",
        width: box,
        height: box,
        flexShrink: 0,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: alpha(ink, 0.32),
        bgcolor: alpha(ink, 0.05),
        fontFamily: MONO_FONT,
      }}
    >
      <Box
        component="svg"
        width={box}
        height={box}
        viewBox={`0 0 ${box} ${box}`}
        aria-hidden
        sx={{ display: "block", position: "absolute", inset: 0 }}
      >
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % count];
          return (
            <line
              key={`c-${n.aura.id}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke={alpha(ink, 0.2)}
              strokeWidth={0.65}
            />
          );
        })}
      </Box>
      <Typography
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: Math.max(7, size * 0.28),
          fontWeight: 900,
          letterSpacing: "0.14em",
          color: alpha(ink, 0.85),
          lineHeight: 1,
          fontFamily: MONO_FONT,
        }}
      >
        {String(count).padStart(2, "0")}
      </Typography>
      {nodes.map(({ aura, x, y }) => (
        <Typography
          key={aura.id}
          sx={{
            position: "absolute",
            left: x,
            top: y,
            transform: "translate(-50%, -50%)",
            fontSize: Math.max(6, size * 0.24),
            fontWeight: 800,
            letterSpacing: "0.06em",
            color: aura.important ? ink : alpha(ink, 0.72),
            lineHeight: 1,
            fontFamily: MONO_FONT,
            textShadow: aura.important ? `0 0 6px ${alpha(ink, 0.35)}` : undefined,
          }}
        >
          {auraCypherCode(aura)}
        </Typography>
      ))}
    </Box>
  );
}

export interface AuraGlyphsProps {
  /** Aura catalog — defaults to Matthew's set. */
  auras?: AuraMeta[];
  /** Edge length of the outer box in px (base; web/field/cypher spread wider). */
  size?: number;
  /** Visualization language — default orbit for compact chips. */
  variant?: AuraGlyphsVariant;
  /** Override ink for mono / web / field / cypher variants. */
  ink?: string;
  /** Starting applied map when nothing is in the store. */
  defaultActive?: AuraActive;
  /** Accessible name for the group. */
  label?: string;
  /** When false, suppress the active-aura tooltip (e.g. tile owns its own hint). */
  showTooltip?: boolean;
}

export function AuraGlyphs({
  auras: aurasProp,
  size = 22,
  variant = "orbit",
  ink: inkProp,
  defaultActive: defaultActiveProp,
  label = "Auras",
  showTooltip = true,
}: AuraGlyphsProps) {
  const channels = useChannelInks();
  const ink = inkProp ?? channels.passive.ink ?? DEFAULT_INK;
  const { activeAuras } = useAuraGlyphsState(aurasProp, defaultActiveProp);
  const count = activeAuras.length;

  const tip = <AuraTooltip activeAuras={activeAuras} />;

  const body =
    count === 0 ? (
      <Box
        sx={{
          width: size + 6,
          height: size + 6,
          borderRadius: "50%",
          border: "1px dashed",
          borderColor: alpha(ink, 0.25),
          bgcolor: alpha(ink, 0.04),
        }}
      />
    ) : variant === "mono" ? (
      <OrbitAuraGlyphs activeAuras={activeAuras} size={size} mono ink={ink} />
    ) : variant === "web" ? (
      <WebAuraGlyphs activeAuras={activeAuras} size={size} ink={ink} />
    ) : variant === "field" ? (
      <FieldAuraGlyphs activeAuras={activeAuras} size={size} ink={ink} />
    ) : variant === "cypher" ? (
      <CypherAuraGlyphs activeAuras={activeAuras} size={size} ink={ink} />
    ) : (
      <OrbitAuraGlyphs activeAuras={activeAuras} size={size} ink={ink} />
    );

  const mark = (
    <Box role="img" aria-label={`${label}: ${count} active`} sx={{ display: "inline-flex", flexShrink: 0 }}>
      {body}
    </Box>
  );

  if (!showTooltip) return mark;

  return (
    <Tooltip arrow placement="bottom" title={tip}>
      {mark}
    </Tooltip>
  );
}

/** Chip wrapper for StatusStrip — label + AuraGlyphs. */
export function AuraGlyphsChip({
  size = 18,
  variant: variantProp,
}: {
  size?: number;
  variant?: AuraGlyphsVariant;
}) {
  const { variant } = useAuraGlyphsVariant(variantProp);
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}>
      <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: "text.secondary", letterSpacing: 0.2 }}>
        Auras
      </Typography>
      <AuraGlyphs size={size} variant={variant} />
    </Stack>
  );
}

/** Side-by-side gallery of every visualization variant (Storybook / pickers). */
export function AuraGlyphsVariantGallery({
  size = 28,
  auras,
  defaultActive,
}: {
  size?: number;
  auras?: AuraMeta[];
  defaultActive?: AuraActive;
}) {
  return (
    <Stack sx={{ gap: 1.5 }}>
      {AURA_GLYPHS_VARIANTS.map((v) => {
        const meta = AURA_GLYPHS_VARIANT_META[v];
        return (
          <Stack key={v} sx={{ flexDirection: "row", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ width: 72, flexShrink: 0 }}>
              <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: 0.3, lineHeight: 1.2 }}>
                {meta.label}
              </Typography>
              <Typography sx={{ fontSize: "0.56rem", color: "text.secondary", lineHeight: 1.35, mt: 0.25 }}>
                {meta.hint}
              </Typography>
            </Box>
            <AuraGlyphs size={size} variant={v} auras={auras} defaultActive={defaultActive} />
          </Stack>
        );
      })}
    </Stack>
  );
}
