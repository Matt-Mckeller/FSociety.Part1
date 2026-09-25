"use client";

/**
 * EngagementLens — Profile Core lens for mastery vs attention.
 *
 * Ports the KB canvas explorer into profile chrome: topic sync, score mode,
 * Meaning / Skills / Web / Life / Learn / Signals / Social / Saved.
 * Engagement values are authored (hardcoded) — formulas later.
 */

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";

import { SHOW_PRIVATE_ANNOTATIONS } from "@yen/content/private-surfaces";
import { useSurface } from "@4eye/web/components/surface";
import { WeightMeter } from "@4eye/web/Tiles/create/components/visuals";
import { Section } from "@4eye/web/Tiles/character/components/shared/EquipSlot";
import {
  ENGAGEMENT_MODES,
  KB_EDGES,
  KB_NODES,
  KB_SAVED,
  KB_SIGNALS,
  KB_SOCIAL,
  KB_TOPICS,
  WEB_MODE_META,
  filterKbNodes,
  filterKbSignals,
  kbNeighborIds,
  kbNodeLabel,
  type EngagementMode,
  type EventIcon,
  type KbNode,
  type KbTopic,
  type MetricMode,
  type SavedVisualization,
  type SignalKind,
  type TrainedSignal,
  type WebMode,
} from "@4eye/web/Tiles/character/model/knowledge-base";

const STORAGE_VOTES = "4eye.profile.engagement.savedVotes";

function ScoreBar({ value, accent, label }: { value: number; accent: string; label: string }) {
  const color = value >= 85 ? accent : value >= 60 ? alpha(accent, 0.85) : alpha(accent, 0.55);
  return (
    <Tooltip title={`${label} ${value} / 100`} arrow>
      <Box sx={{ flex: 1, height: 8, borderRadius: 999, bgcolor: alpha(accent, 0.12), overflow: "hidden" }}>
        <Box sx={{ width: `${Math.max(0, Math.min(100, value))}%`, height: "100%", bgcolor: color }} />
      </Box>
    </Tooltip>
  );
}

function DualBars({
  label,
  weight,
  engagement,
  metric,
  active,
  accent,
  onClick,
  subtitle,
}: {
  label: string;
  weight: number;
  engagement: number;
  metric: MetricMode;
  active?: boolean;
  accent: string;
  onClick?: () => void;
  subtitle?: string;
}) {
  const showW = metric === "weight" || metric === "both";
  const showE = metric === "engagement" || metric === "both";
  return (
    <Box
      onClick={onClick}
      sx={{
        px: 1,
        py: 0.75,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: active ? alpha(accent, 0.5) : "divider",
        bgcolor: active ? alpha(accent, 0.07) : "transparent",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? { borderColor: alpha(accent, 0.35), bgcolor: alpha(accent, 0.04) }
          : undefined,
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 1,
          mb: showW || showE ? 0.5 : 0,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.8rem" }}>
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
          {showW && showE
            ? `${weight}·${engagement}`
            : showW
              ? weight
              : engagement}
        </Typography>
      </Stack>
      {subtitle ? (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mb: 0.5, fontSize: "0.65rem", lineHeight: 1.3 }}
        >
          {subtitle}
        </Typography>
      ) : null}
      <Stack spacing={0.35}>
        {showW ? (
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
            <Typography
              variant="caption"
              sx={{ width: 28, color: "text.secondary", fontSize: "0.6rem" }}
            >
              M
            </Typography>
            <ScoreBar value={weight} accent={accent} label="Mastery" />
          </Stack>
        ) : null}
        {showE ? (
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
            <Typography
              variant="caption"
              sx={{ width: 28, color: "text.secondary", fontSize: "0.6rem" }}
            >
              E
            </Typography>
            <ScoreBar value={engagement} accent={accent} label="Engagement" />
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
}

function BandMeter({
  lo,
  hi,
  now,
  accent,
}: {
  lo: number;
  hi: number;
  now: number;
  accent: string;
}) {
  return (
    <Box>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          mb: 0.5,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Engagement band {lo}–{hi}
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 700, color: accent }}>
          now {now}
        </Typography>
      </Stack>
      <Box
        sx={{
          position: "relative",
          height: 8,
          borderRadius: 999,
          bgcolor: alpha(accent, 0.12),
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: `${lo}%`,
            width: `${Math.max(2, hi - lo)}%`,
            top: 0,
            bottom: 0,
            bgcolor: alpha(accent, 0.45),
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: `calc(${now}% - 5px)`,
            width: 10,
            height: 10,
            top: -1,
            borderRadius: "50%",
            bgcolor: accent,
            border: "2px solid",
            borderColor: "background.paper",
          }}
        />
      </Box>
    </Box>
  );
}

function EventGlyph({ icon, color }: { icon: EventIcon; color: string }) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (icon) {
    case "computer":
      return (
        <g>
          <rect x={3} y={4} width={14} height={10} rx={1.5} {...common} />
          <path d="M6 17h8" {...common} />
        </g>
      );
    case "play":
      return (
        <g>
          <circle cx={10} cy={10} r={7} {...common} />
          <path d="M8 7l6 3-6 3V7z" fill={color} stroke="none" />
        </g>
      );
    case "life":
      return (
        <g>
          <circle cx={10} cy={6} r={2.5} {...common} />
          <path d="M10 9.5v5M6 11h8M10 14.5l-3 4M10 14.5l3 4" {...common} />
        </g>
      );
    case "recover":
      return <path d="M3 11 Q7 4 10 11 T17 11" {...common} />;
    case "design":
      return (
        <g>
          <rect x={3} y={3} width={6} height={6} {...common} />
          <rect x={11} y={11} width={6} height={6} {...common} />
        </g>
      );
    case "slump":
      return <path d="M4 6l6 8 6-4" {...common} />;
    case "ship":
      return (
        <g>
          <path d="M3 12h14l-3 4H6z" {...common} />
          <path d="M7 12V6h5" {...common} />
        </g>
      );
    case "study":
      return (
        <g>
          <path d="M3 5h14v12H3z" {...common} />
          <path d="M10 5v12" {...common} />
        </g>
      );
  }
}

function SelectionPanel({
  node,
  signal,
  accent,
  onClear,
}: {
  node: KbNode | null;
  signal: TrainedSignal | null;
  accent: string;
  onClear: () => void;
}) {
  if (!node && !signal) return null;

  if (signal) {
    return (
      <Box
        sx={{
          px: 1.25,
          py: 1,
          borderRadius: 1.5,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.75,
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 800 }}>
            {signal.kind} · {signal.label}
          </Typography>
          <Button size="small" onClick={onClear} sx={{ minWidth: 0, px: 1 }}>
            Clear
          </Button>
        </Stack>
        <BandMeter
          lo={signal.engagementLo}
          hi={signal.engagementHi}
          now={signal.engagement}
          accent={accent}
        />
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
          {signal.blurb}
        </Typography>
      </Box>
    );
  }
  const n = node!;
  return (
    <Box
      sx={{
        px: 1.25,
        py: 1,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.75,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 800 }}>
          {n.kind} · {n.label} · {n.weight}/{n.engagement}
        </Typography>
        <Button size="small" onClick={onClear} sx={{ minWidth: 0, px: 1 }}>
          Clear
        </Button>
      </Stack>
      <BandMeter
        lo={n.engagementLo}
        hi={n.engagementHi}
        now={n.engagement}
        accent={accent}
      />
      {n.blurb || n.learned ? (
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
          {n.blurb ?? n.learned}
        </Typography>
      ) : null}
    </Box>
  );
}

function MeaningMode({
  nodes,
  metric,
  accent,
  selectedId,
  onSelect,
}: {
  nodes: KbNode[];
  metric: MetricMode;
  accent: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const words = nodes
    .filter((n) => n.kind === "meaning")
    .sort((a, b) => b.weight - a.weight);
  const wants = nodes
    .filter((n) => n.kind === "want")
    .sort((a, b) => b.engagement - a.engagement);
  return (
    <Stack spacing={1}>
      <Section title="Themes">
        <Stack spacing={0.6}>
          {words.map((n) => (
            <DualBars
              key={n.id}
              label={n.label}
              weight={n.weight}
              engagement={n.engagement}
              metric={metric}
              accent={accent}
              active={selectedId === n.id}
              onClick={() => onSelect(n.id)}
            />
          ))}
        </Stack>
      </Section>
      {wants.length > 0 ? (
        <Section title="Wants">
          <Stack spacing={0.6}>
            {wants.map((n) => (
              <DualBars
                key={n.id}
                label={n.label}
                weight={n.weight}
                engagement={n.engagement}
                metric={metric}
                accent={accent}
                active={selectedId === n.id}
                onClick={() => onSelect(n.id)}
              />
            ))}
          </Stack>
        </Section>
      ) : null}
    </Stack>
  );
}

function SkillsMode({
  nodes,
  metric,
  accent,
  selectedId,
  onSelect,
}: {
  nodes: KbNode[];
  metric: MetricMode;
  accent: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const skills = nodes.filter((n) => n.kind === "skill");
  const tiers = [
    { id: "professional", label: "Professional · LinkedIn-style", tip: "Craft competence" },
    { id: "foundation", label: "Foundation · unlocked", tip: "Base skill-tree competencies" },
    { id: "developing", label: "Developing · next unlocks", tip: "Available / climbing" },
  ] as const;
  return (
    <Stack spacing={2.5}>
      {tiers.map((tier) => {
        const list = skills
          .filter((s) => s.tier === tier.id)
          .sort((a, b) => b.weight - a.weight);
        if (list.length === 0) return null;
        return (
          <Section key={tier.id} title={tier.label}>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
              {tier.tip}
            </Typography>
            <Stack spacing={1}>
              {list.map((n) => (
                <DualBars
                  key={n.id}
                  label={n.label}
                  weight={n.weight}
                  engagement={n.engagement}
                  metric={metric === "weight" ? "both" : metric}
                  accent={accent}
                  active={selectedId === n.id}
                  onClick={() => onSelect(n.id)}
                  subtitle={n.status}
                />
              ))}
            </Stack>
          </Section>
        );
      })}
    </Stack>
  );
}

function LearnMode({
  nodes,
  metric,
  accent,
  selectedId,
  onSelect,
}: {
  nodes: KbNode[];
  metric: MetricMode;
  accent: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const learn = nodes
    .filter((n) => n.kind === "learn")
    .sort((a, b) => b.weight - a.weight);
  return (
    <Stack spacing={1}>
      <Typography variant="caption" color="text.secondary" sx={{ px: 0.25 }}>
        Engage ≠ learn — Auditory is loud in life, quiet as a learn channel.
      </Typography>
      {learn.map((n) => (
        <DualBars
          key={n.id}
          label={n.label}
          weight={n.weight}
          engagement={n.engagement}
          metric={metric === "weight" ? "both" : metric}
          accent={accent}
          active={selectedId === n.id}
          onClick={() => onSelect(n.id)}
          subtitle={n.id === "l-auditory" ? n.blurb : undefined}
        />
      ))}
    </Stack>
  );
}

function WebModeView({
  nodes,
  metric,
  accent,
  selectedId,
  onSelect,
  webMode,
  setWebMode,
}: {
  nodes: KbNode[];
  metric: MetricMode;
  accent: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  webMode: WebMode;
  setWebMode: (m: WebMode) => void;
}) {
  const tip = WEB_MODE_META.find((m) => m.id === webMode)?.tip ?? "";
  const idSet = new Set(nodes.map((n) => n.id));
  const edges = KB_EDGES.filter((e) => idSet.has(e.from) && idSet.has(e.to));
  const focus = selectedId ? kbNeighborIds(selectedId) : null;
  const compare = [...nodes]
    .filter((n) => n.kind === "meaning" || n.kind === "skill" || n.kind === "learn")
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 12);
  const topicIds = KB_TOPICS.map((t) => t.id).filter((t) =>
    nodes.some((n) => n.topics.includes(t)),
  );

  return (
    <Stack spacing={2}>
      <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75 }}>
        {WEB_MODE_META.map((m) => (
          <Tooltip key={m.id} title={m.tip} arrow>
            <Chip
              size="small"
              label={m.label}
              color={webMode === m.id ? "primary" : "default"}
              variant={webMode === m.id ? "filled" : "outlined"}
              onClick={() => setWebMode(m.id)}
              sx={webMode === m.id ? { bgcolor: accent, "&:hover": { bgcolor: accent } } : undefined}
            />
          </Tooltip>
        ))}
      </Stack>
      <Typography variant="caption" color="text.secondary">
        {tip}
      </Typography>

      {webMode === "clusters" ? (
        <Stack spacing={1.5}>
          {topicIds.map((tid) => {
            const list = nodes
              .filter((n) => n.topics.includes(tid))
              .sort((a, b) => b.engagement - a.engagement)
              .slice(0, 8);
            if (!list.length) return null;
            const label = KB_TOPICS.find((t) => t.id === tid)?.label ?? tid;
            return (
              <Box key={tid}>
                <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.75, display: "block" }}>
                  {label}
                </Typography>
                <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
                  {list.map((n) => {
                    const r = 14 + (n.weight / 100) * 16;
                    const active = selectedId === n.id;
                    const dim = focus ? !focus.has(n.id) : false;
                    return (
                      <Tooltip
                        key={n.id}
                        title={`${n.label} · mastery ${n.weight} · engage ${n.engagement}`}
                      >
                        <Box
                          component="button"
                          type="button"
                          onClick={() => onSelect(n.id)}
                          sx={{
                            width: r * 2,
                            height: r * 2,
                            borderRadius: "50%",
                            border: "2px solid",
                            borderColor: active ? accent : "divider",
                            bgcolor: active ? alpha(accent, 0.18) : alpha(accent, 0.06),
                            color: "text.primary",
                            fontSize: 10,
                            fontWeight: 700,
                            cursor: "pointer",
                            opacity: dim ? 0.28 : 0.45 + (n.engagement / 100) * 0.55,
                          }}
                        >
                          {n.label.slice(0, 3)}
                        </Box>
                      </Tooltip>
                    );
                  })}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      ) : null}

      {webMode === "compare" ? (
        <Stack spacing={1}>
          {compare.map((n) => (
            <DualBars
              key={n.id}
              label={n.label}
              weight={n.weight}
              engagement={n.engagement}
              metric="both"
              accent={accent}
              active={selectedId === n.id}
              onClick={() => onSelect(n.id)}
            />
          ))}
        </Stack>
      ) : null}

      {webMode === "edges" ? (
        <Stack spacing={0.75}>
          {edges.map((e) => (
            <Typography key={`${e.from}-${e.to}-${e.rel}`} variant="body2">
              <Box component="span" sx={{ fontWeight: 700 }}>
                {kbNodeLabel(e.from)}
              </Box>{" "}
              <Box component="span" sx={{ color: "text.secondary" }}>
                {e.rel}
              </Box>{" "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                {kbNodeLabel(e.to)}
              </Box>
            </Typography>
          ))}
          {edges.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No edges in the current topic filter.
            </Typography>
          ) : null}
        </Stack>
      ) : null}

      {webMode === "links" ? (
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            Simplified link list (full DAG layout stays on the canvas explorer).
            Focus a node to highlight neighbors.
          </Typography>
          {nodes
            .filter((n) => edges.some((e) => e.from === n.id || e.to === n.id))
            .slice(0, 24)
            .map((n) => {
              const neighbors = [...kbNeighborIds(n.id)]
                .filter((id) => id !== n.id)
                .map(kbNodeLabel)
                .slice(0, 4);
              return (
                <DualBars
                  key={n.id}
                  label={n.label}
                  weight={n.weight}
                  engagement={n.engagement}
                  metric={metric}
                  accent={accent}
                  active={selectedId === n.id}
                  onClick={() => onSelect(n.id)}
                  subtitle={neighbors.length ? `→ ${neighbors.join(", ")}` : undefined}
                />
              );
            })}
        </Stack>
      ) : null}
    </Stack>
  );
}

function LifeMode({
  nodes,
  metric,
  accent,
  selectedId,
  onSelect,
}: {
  nodes: KbNode[];
  metric: MetricMode;
  accent: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const surface = useSurface();
  const ink = surface.ink(accent);
  const events = nodes
    .filter((n) => n.kind === "event")
    .sort((a, b) => b.weight - a.weight);
  const depths = ["formative", "chapter", "recent"] as const;
  const depthY = { formative: 70, chapter: 180, recent: 290 };
  const depthLabel = {
    formative: "Formative",
    chapter: "Chapters",
    recent: "Recent",
  };

  return (
    <Stack spacing={1.25}>
      <Typography variant="caption" color="text.secondary">
        Size = significance · stroke = engagement
      </Typography>
      <Box
        sx={{
          overflowX: "auto",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1.5,
        }}
      >
        <svg width={720} height={360}>
          {depths.map((d) => (
            <g key={d}>
              <text x={12} y={depthY[d] - 36} fill={ink} fontSize={11} opacity={0.55}>
                {depthLabel[d]}
              </text>
              <line
                x1={12}
                y1={depthY[d]}
                x2={708}
                y2={depthY[d]}
                stroke={ink}
                strokeOpacity={0.2}
                strokeDasharray="3 4"
              />
            </g>
          ))}
          {depths.map((d) => {
            const list = events.filter((e) => e.depth === d);
            return list.map((n, i) => {
              const r = 16 + (n.weight / 100) * 28;
              const x = 70 + i * (90 + r * 0.4);
              const y = depthY[d];
              const active = selectedId === n.id;
              const strokeW = 1.5 + (n.engagement / 100) * 2.5;
              return (
                <g
                  key={n.id}
                  transform={`translate(${x},${y})`}
                  style={{ cursor: "pointer" }}
                  onClick={() => onSelect(n.id)}
                  opacity={0.5 + (n.engagement / 100) * 0.5}
                >
                  <title>
                    {`${n.label}\nSignificance ${n.weight} · Engagement ${n.engagement}`}
                  </title>
                  <circle
                    r={r}
                    fill={active ? alpha(accent, 0.25) : alpha(accent, 0.08)}
                    stroke={active ? accent : ink}
                    strokeWidth={strokeW}
                  />
                  <g transform="translate(-7,-7)">
                    <EventGlyph icon={n.icon ?? "life"} color={ink} />
                  </g>
                  <text
                    y={r + 14}
                    textAnchor="middle"
                    fill={ink}
                    fontSize={10}
                    opacity={0.75}
                  >
                    {n.label.length > 16 ? `${n.label.slice(0, 14)}…` : n.label}
                  </text>
                </g>
              );
            });
          })}
        </svg>
      </Box>
      <Stack spacing={1}>
        {events.map((n) => (
          <DualBars
            key={n.id}
            label={n.label}
            weight={n.weight}
            engagement={n.engagement}
            metric={metric}
            accent={accent}
            active={selectedId === n.id}
            onClick={() => onSelect(n.id)}
            subtitle={n.learned?.slice(0, 90)}
          />
        ))}
      </Stack>
    </Stack>
  );
}

function SignalsMode({
  topics,
  metric,
  accent,
  selectedSignalId,
  onSelectSignal,
  onSelectNode,
}: {
  topics: KbTopic[];
  metric: MetricMode;
  accent: string;
  selectedSignalId: string | null;
  onSelectSignal: (id: string) => void;
  onSelectNode: (id: string) => void;
}) {
  const signals = [...filterKbSignals(topics)].sort((a, b) => b.value - a.value);
  const kinds: SignalKind[] = ["letter", "number", "bit", "combo", "color", "media"];
  return (
    <Stack spacing={1.5}>
      <Typography variant="caption" color="text.secondary">
        Value = rank · Engage = loudness (authored)
      </Typography>
      {kinds.map((kind) => {
        const list = signals.filter((s) => s.kind === kind);
        if (!list.length) return null;
        return (
          <Section key={kind} title={`${kind}s`}>
            {kind === "color" ? (
              <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1, mb: 1.25 }}>
                {list.map((s) => {
                  const r = 16 + (s.value / 100) * 14;
                  return (
                    <Tooltip
                      key={s.id}
                      title={`${s.label} · value ${s.value} · engage ${s.engagement}`}
                    >
                      <Box
                        component="button"
                        type="button"
                        onClick={() => {
                          onSelectSignal(s.id);
                          if (s.kbNodeIds[0]) onSelectNode(s.kbNodeIds[0]);
                        }}
                        sx={{
                          width: r * 2,
                          height: r * 2,
                          borderRadius: "50%",
                          border: "2px solid",
                          borderColor:
                            selectedSignalId === s.id ? accent : "divider",
                          bgcolor: alpha(accent, 0.12),
                          fontSize: 10,
                          fontWeight: 700,
                          cursor: "pointer",
                          opacity: 0.45 + (s.engagement / 100) * 0.55,
                        }}
                      >
                        {(s.swatch ?? s.label).slice(0, 3)}
                      </Box>
                    </Tooltip>
                  );
                })}
              </Stack>
            ) : null}
            <Stack spacing={1}>
              {list.map((s) => (
                <DualBars
                  key={s.id}
                  label={s.label}
                  weight={s.value}
                  engagement={s.engagement}
                  metric={metric}
                  accent={accent}
                  active={selectedSignalId === s.id}
                  onClick={() => {
                    onSelectSignal(s.id);
                    if (s.kbNodeIds[0]) onSelectNode(s.kbNodeIds[0]);
                  }}
                  subtitle={s.blurb}
                />
              ))}
            </Stack>
          </Section>
        );
      })}
    </Stack>
  );
}

function SocialMode({
  topics,
  selectedId,
  accent,
  onSelect,
  onSelectSignal,
}: {
  topics: KbTopic[];
  selectedId: string | null;
  accent: string;
  onSelect: (id: string) => void;
  onSelectSignal: (id: string) => void;
}) {
  /*
    Dark rows used to return `true` unconditionally here — pinned past the topic
    filter and rendered with a "dark" label, which described their status rather
    than doing anything about it.
  */
  const rows = KB_SOCIAL.filter((e) => {
    if (e.privacy === "dark") return SHOW_PRIVATE_ANNOTATIONS;
    if (topics.length === 0) return true;
    return e.matchedKbNodeIds.some((id) => {
      const n = KB_NODES.find((x) => x.id === id);
      return n?.topics.some((t) => topics.includes(t));
    });
  });
  return (
    <Stack spacing={1}>
      {SHOW_PRIVATE_ANNOTATIONS && (
        <Typography variant="caption" color="text.secondary">
          Dark rows shown but excluded from soft-public ranking later
        </Typography>
      )}
      {rows.map((e) => (
        <Box
          key={e.id}
          sx={{
            p: 1.25,
            borderRadius: 2,
            border: "1px solid",
            borderColor:
              e.privacy === "dark"
                ? "error.light"
                : e.matchedKbNodeIds.includes(selectedId ?? "")
                  ? alpha(accent, 0.5)
                  : "divider",
            bgcolor: "background.paper",
            opacity: e.privacy === "dark" ? 0.75 : 1,
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 1,
              mb: 0.5,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 800 }}>
              {e.label}
              {e.privacy === "dark" ? " · dark" : ""}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {e.strength}
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
            {e.provider} · {e.detail}
          </Typography>
          <WeightMeter weight={e.strength} label="strength" />
          <Button
            size="small"
            sx={{ mt: 1 }}
            onClick={() => {
              if (e.matchedKbNodeIds[0]) onSelect(e.matchedKbNodeIds[0]);
              if (e.matchedSignalIds[0]) onSelectSignal(e.matchedSignalIds[0]);
            }}
          >
            Focus linked
          </Button>
        </Box>
      ))}
    </Stack>
  );
}

function SavedMode({
  votes,
  accent,
  onOpen,
  onUseful,
}: {
  votes: Record<string, number>;
  accent: string;
  onOpen: (sv: SavedVisualization) => void;
  onUseful: (id: string) => void;
}) {
  return (
    <Stack
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 1.5,
      }}
    >
      {KB_SAVED.map((sv) => {
        const v = votes[sv.id] ?? sv.usefulnessVotes;
        return (
          <Box
            key={sv.id}
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                mb: 0.75,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                {sv.title}
              </Typography>
              <Chip size="small" label={`${v} useful`} />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {sv.blurb}
            </Typography>
            <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.5, mb: 1.25 }}>
              <Chip size="small" label={sv.lens} sx={{ bgcolor: alpha(accent, 0.12) }} />
              <Chip size="small" label={sv.metric} variant="outlined" />
              {sv.topics.map((t) => (
                <Chip key={t} size="small" label={t} variant="outlined" />
              ))}
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="contained" onClick={() => onOpen(sv)} sx={{ bgcolor: accent }}>
                Open
              </Button>
              <Button size="small" variant="outlined" onClick={() => onUseful(sv.id)}>
                Mark useful
              </Button>
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
}

function SchemaMode() {
  return (
    <Stack spacing={1.5}>
      <Typography variant="body2">
        {KB_NODES.length} nodes · {KB_EDGES.length} edges · {KB_SIGNALS.length}{" "}
        signals · {KB_SOCIAL.length} social rows · {KB_SAVED.length} saved views
      </Typography>
      <Typography variant="caption" color="text.secondary" component="div">
        <Box component="div">weight / value — mastery or relative signal value (authored)</Box>
        <Box component="div">engagement — authored mock 0–100 (formulas later)</Box>
        <Box component="div">engagementLo–Hi — usual band on the selection meter</Box>
        <Box component="div">topics — sync filter across every mode</Box>
      </Typography>
    </Stack>
  );
}

export function EngagementLens({ accent }: { accent: string }) {
  const [topics, setTopics] = React.useState<KbTopic[]>([]);
  const [metric, setMetric] = React.useState<MetricMode>("both");
  const [mode, setMode] = React.useState<EngagementMode>("meaning");
  const [webMode, setWebMode] = React.useState<WebMode>("clusters");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [selectedSignalId, setSelectedSignalId] = React.useState<string | null>(
    null,
  );
  const [showTopics, setShowTopics] = React.useState(false);
  const [votes, setVotes] = React.useState<Record<string, number>>(() => {
    if (typeof window === "undefined") {
      return Object.fromEntries(KB_SAVED.map((s) => [s.id, s.usefulnessVotes]));
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_VOTES);
      if (raw) return JSON.parse(raw) as Record<string, number>;
    } catch {
      /* ignore */
    }
    return Object.fromEntries(KB_SAVED.map((s) => [s.id, s.usefulnessVotes]));
  });

  React.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_VOTES, JSON.stringify(votes));
    } catch {
      /* ignore */
    }
  }, [votes]);

  const filtered = filterKbNodes(topics);
  const selected = selectedId
    ? (KB_NODES.find((n) => n.id === selectedId) ?? null)
    : null;
  const selectedSignal = selectedSignalId
    ? (KB_SIGNALS.find((s) => s.id === selectedSignalId) ?? null)
    : null;
  const modeMeta = ENGAGEMENT_MODES.find((m) => m.id === mode)!;

  const toggleTopic = (t: KbTopic) => {
    setTopics((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  };

  const openSaved = (sv: SavedVisualization) => {
    setMode(sv.lens);
    setTopics(sv.topics);
    setMetric(sv.metric);
    if (sv.webMode) setWebMode(sv.webMode);
    setSelectedId(sv.selectedId ?? null);
    setSelectedSignalId(sv.selectedSignalId ?? null);
    if (sv.topics.length) setShowTopics(true);
  };

  return (
    <Stack spacing={1.25}>
      {/* Compact chrome — one strip */}
      <Stack
        sx={{
          gap: 0.75,
          p: 1,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: alpha(accent, 0.04),
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 0.3 }}>
            Engagement
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ flex: 1, minWidth: 120 }}>
            {modeMeta.question}
          </Typography>
          <Stack sx={{ flexDirection: "row", gap: 0.4 }}>
            {(
              [
                ["weight", "M"],
                ["engagement", "E"],
                ["both", "M+E"],
              ] as const
            ).map(([id, label]) => (
              <Tooltip
                key={id}
                title={
                  id === "weight"
                    ? "Mastery / meaning"
                    : id === "engagement"
                      ? "Engagement (authored)"
                      : "Both"
                }
              >
                <Chip
                  size="small"
                  label={label}
                  onClick={() => setMetric(id)}
                  variant={metric === id ? "filled" : "outlined"}
                  sx={{
                    height: 22,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    ...(metric === id
                      ? { bgcolor: accent, color: "#fff", "&:hover": { bgcolor: accent } }
                      : {}),
                  }}
                />
              </Tooltip>
            ))}
            <Chip
              size="small"
              label={topics.length ? `Filter ${topics.length}` : "Filter"}
              onClick={() => setShowTopics((v) => !v)}
              variant={showTopics || topics.length ? "filled" : "outlined"}
              sx={{
                height: 22,
                fontSize: "0.65rem",
                ...(topics.length
                  ? { bgcolor: alpha(accent, 0.2) }
                  : {}),
              }}
            />
          </Stack>
        </Stack>

        <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.4 }}>
          {ENGAGEMENT_MODES.filter((m) => m.id !== "schema").map((m) => (
            <Tooltip key={m.id} title={m.question} arrow>
              <Chip
                size="small"
                label={m.label}
                onClick={() => setMode(m.id)}
                variant={mode === m.id ? "filled" : "outlined"}
                sx={{
                  height: 24,
                  fontSize: "0.68rem",
                  fontWeight: mode === m.id ? 800 : 600,
                  ...(mode === m.id
                    ? { bgcolor: accent, color: "#fff", "&:hover": { bgcolor: accent } }
                    : {}),
                }}
              />
            </Tooltip>
          ))}
          <Chip
            size="small"
            label="?"
            onClick={() => setMode("schema")}
            variant={mode === "schema" ? "filled" : "outlined"}
            sx={{ height: 24, minWidth: 28, fontWeight: 800 }}
          />
        </Stack>

        {showTopics ? (
          <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.4 }}>
            {KB_TOPICS.map((t) => (
              <Chip
                key={t.id}
                size="small"
                label={t.label}
                onClick={() => toggleTopic(t.id)}
                variant={topics.includes(t.id) ? "filled" : "outlined"}
                sx={{
                  height: 22,
                  fontSize: "0.65rem",
                  ...(topics.includes(t.id)
                    ? { bgcolor: accent, color: "#fff", "&:hover": { bgcolor: accent } }
                    : {}),
                }}
              />
            ))}
            {topics.length > 0 ? (
              <Chip
                size="small"
                label="Clear"
                onClick={() => setTopics([])}
                variant="outlined"
                sx={{ height: 22, fontSize: "0.65rem" }}
              />
            ) : null}
          </Stack>
        ) : null}
      </Stack>

      {(selected || selectedSignal) && (
        <SelectionPanel
          node={selected}
          signal={selectedSignal}
          accent={accent}
          onClear={() => {
            setSelectedId(null);
            setSelectedSignalId(null);
          }}
        />
      )}

      {mode === "meaning" ? (
        <MeaningMode
          nodes={filtered}
          metric={metric}
          accent={accent}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      ) : null}
      {mode === "skills" ? (
        <SkillsMode
          nodes={filtered}
          metric={metric}
          accent={accent}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      ) : null}
      {mode === "web" ? (
        <WebModeView
          nodes={filtered}
          metric={metric}
          accent={accent}
          selectedId={selectedId}
          onSelect={setSelectedId}
          webMode={webMode}
          setWebMode={setWebMode}
        />
      ) : null}
      {mode === "life" ? (
        <LifeMode
          nodes={filtered}
          metric={metric}
          accent={accent}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      ) : null}
      {mode === "learn" ? (
        <LearnMode
          nodes={filtered}
          metric={metric}
          accent={accent}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      ) : null}
      {mode === "signals" ? (
        <SignalsMode
          topics={topics}
          metric={metric}
          accent={accent}
          selectedSignalId={selectedSignalId}
          onSelectSignal={setSelectedSignalId}
          onSelectNode={setSelectedId}
        />
      ) : null}
      {mode === "social" ? (
        <SocialMode
          topics={topics}
          selectedId={selectedId}
          accent={accent}
          onSelect={setSelectedId}
          onSelectSignal={setSelectedSignalId}
        />
      ) : null}
      {mode === "saved" ? (
        <SavedMode
          votes={votes}
          accent={accent}
          onOpen={openSaved}
          onUseful={(id) =>
            setVotes((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
          }
        />
      ) : null}
      {mode === "schema" ? <SchemaMode /> : null}
    </Stack>
  );
}
