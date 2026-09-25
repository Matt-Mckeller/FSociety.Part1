"use client";

/**
 * Character — Relationships panel (Brain).
 *
 * Under reconstruction: the card grid was a people list pretending to be a
 * system. This surface shows the intended model — type mappings, bond /
 * valence values, presence — as a graph placeholder, while marking the work
 * as rebuilding. The remote queen seat (Em) is highlighted so the map does
 * not read as "partner missing" when the piece is present but not local.
 * Relationship `profileId`s now match `PROFILE_*` / CREW so deep-links can land.
 */

import * as React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";

import {
  RELATIONSHIPS_SEED,
  RELATIONSHIP_TYPE_META,
  PRESENCE_META,
  type RelationshipEntry,
  type RelationshipType,
  type RelationshipPresence,
} from "../model/relationships";
import { SHOW_PRIVATE_ANNOTATIONS } from "@yen/content/private-surfaces";
import { useProfileStore } from "../store/CharacterProfileStore";
import { daysSince } from "../lib/time";
import { BRAIN_ACCENT, BRAIN_WASH, VALENCE } from "../theme/brainTokens";

/* ──────────────────────────────────────────────────── helpers */

function valenceLabel(v: number): { label: string; color: string } {
  if (v >= 70) return { label: "Very warm", color: VALENCE.positive.color };
  if (v >= 30) return { label: "Positive", color: VALENCE.positive.color };
  if (v >= -10) return { label: "Neutral", color: VALENCE.neutral.color };
  if (v >= -50) return { label: "Tense", color: BRAIN_WASH.warn };
  return { label: "Strained", color: VALENCE.negative.color };
}

function presenceOf(entry: RelationshipEntry): RelationshipPresence {
  return entry.presence ?? "local";
}

/* ──────────────────────────────────────────────────── graph layout */

type GraphNode = RelationshipEntry & { x: number; y: number };

function layoutGraph(entries: RelationshipEntry[]): GraphNode[] {
  const cx = 160;
  const cy = 130;
  const r = 92;
  // Queen sits opposite the King hub so the remote seat is unmistakable.
  const ordered = [...entries].sort((a, b) => {
    if (a.role === "queen") return -1;
    if (b.role === "queen") return 1;
    return b.strength - a.strength;
  });
  return ordered.map((entry, i) => {
    const angle = -Math.PI / 2 + (i / ordered.length) * Math.PI * 2;
    return {
      ...entry,
      x: cx + Math.cos(angle) * (entry.role === "queen" ? r + 8 : r),
      y: cy + Math.sin(angle) * (entry.role === "queen" ? r + 8 : r),
    };
  });
}

/* ──────────────────────────────────────────────────── detail dialog */

function RelationshipDetail({
  entry,
  onClose,
}: {
  entry: RelationshipEntry;
  onClose: () => void;
}) {
  const typeMeta = RELATIONSHIP_TYPE_META[entry.type];
  const c = typeMeta.color;
  const valence = valenceLabel(entry.valence);
  const presence = PRESENCE_META[presenceOf(entry)];
  const isQueen = entry.role === "queen";

  return (
    <Dialog open onClose={onClose} maxWidth="mobileL" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, pb: 0 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(isQueen ? BRAIN_WASH.remote : c, 0.14),
            border: "1.5px solid",
            borderColor: alpha(isQueen ? BRAIN_WASH.remote : c, 0.45),
            color: isQueen ? BRAIN_WASH.remote : c,
            fontWeight: 900,
            fontSize: "0.75rem",
          }}
        >
          {entry.name.slice(0, 1)}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            {entry.name}
            {isQueen ? " · Queen" : ""}
          </Typography>
          <Typography variant="caption" sx={{ color: c, fontWeight: 700 }}>
            {typeMeta.label} · {presence.label}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}><CloseRoundedIcon fontSize="small" /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1.25} sx={{ mt: 1 }}>
          {isQueen && (
            <Box
              sx={{
                p: 1,
                borderRadius: 1.5,
                bgcolor: alpha(BRAIN_WASH.remote, 0.08),
                border: "1px dashed",
                borderColor: alpha(BRAIN_WASH.remote, 0.4),
              }}
            >
              <Typography variant="caption" sx={{ color: BRAIN_WASH.remote, fontWeight: 700, display: "block", mb: 0.35 }}>
                Remote queen seat
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.45 }}>
                Filled but not local — the piece is on the board. Contact runs through want and
                stream, not a shared room yet.
              </Typography>
            </Box>
          )}

          <Stack direction="row" spacing={3}>
            <Box>
              <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, display: "block" }}>BOND</Typography>
              <Typography variant="caption" sx={{ fontWeight: 900, color: c, fontSize: "1.1rem" }}>{entry.strength}</Typography>
              <Typography variant="caption" sx={{ color: "text.disabled" }}>/100</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, display: "block" }}>TONE</Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: valence.color }}>{valence.label}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, display: "block" }}>LAST TOUCH</Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
                {entry.lastInteractionAt ? daysSince(entry.lastInteractionAt) : "—"}
              </Typography>
            </Box>
          </Stack>

          {SHOW_PRIVATE_ANNOTATIONS && entry.notes && (
            <>
              <Divider />
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5, fontStyle: "italic" }}>
                "{entry.notes}"
              </Typography>
            </>
          )}

          {SHOW_PRIVATE_ANNOTATIONS && entry.queenGoals && entry.queenGoals.length > 0 && (
            <>
              <Divider />
              <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, display: "block", mb: 0.5 }}>
                QUEEN GOALS
              </Typography>
              <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
                {entry.queenGoals.map((g) => (
                  <Box
                    key={g}
                    sx={{
                      px: 0.85,
                      py: 0.35,
                      borderRadius: 1.5,
                      border: "1px solid",
                      borderColor: alpha(BRAIN_WASH.remote, 0.4),
                      bgcolor: alpha(BRAIN_WASH.remote, 0.1),
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.45 }}>
                      {g}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </>
          )}

          {entry.sharedGoals && entry.sharedGoals.length > 0 && (
            <>
              <Divider />
              <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, display: "block", mb: 0.5 }}>
                SHARED GOALS
              </Typography>
              <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
                {entry.sharedGoals.map((g) => (
                  <Box
                    key={g}
                    sx={{
                      px: 0.85,
                      py: 0.35,
                      borderRadius: 1.5,
                      border: "1px solid",
                      borderColor: alpha(c, 0.25),
                      bgcolor: alpha(c, 0.05),
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700, color: c }}>{g}</Typography>
                  </Box>
                ))}
              </Stack>
            </>
          )}

          {SHOW_PRIVATE_ANNOTATIONS && entry.mmGoals && entry.mmGoals.length > 0 && (
            <>
              <Divider />
              <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, display: "block", mb: 0.5 }}>
                MM GOALS
              </Typography>
              <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
                {entry.mmGoals.map((g) => (
                  <Box
                    key={g}
                    sx={{
                      px: 0.85,
                      py: 0.35,
                      borderRadius: 1.5,
                      border: "1px solid",
                      borderColor: alpha(BRAIN_WASH.remote, 0.35),
                      bgcolor: alpha(BRAIN_WASH.remote, 0.08),
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.45 }}>
                      {g}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

/* ──────────────────────────────────────────────────── graph */

function RelationshipGraph({
  nodes,
  onSelect,
}: {
  nodes: GraphNode[];
  onSelect: (id: string) => void;
}) {
  const cx = 160;
  const cy = 130;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 360,
        mx: "auto",
        aspectRatio: "320 / 280",
      }}
    >
      <svg viewBox="0 0 320 260" width="100%" height="100%" style={{ display: "block" }}>
        {/* Edges from self to each person — stroke weight = bond, dash = remote */}
        {nodes.map((n) => {
          const typeMeta = RELATIONSHIP_TYPE_META[n.type];
          const remote = presenceOf(n) === "remote";
          const dormant = presenceOf(n) === "dormant";
          const stroke = n.role === "queen" ? BRAIN_WASH.remote : typeMeta.color;
          return (
            <line
              key={`e-${n.id}`}
              x1={cx}
              y1={cy}
              x2={n.x}
              y2={n.y}
              stroke={stroke}
              strokeWidth={1.2 + (n.strength / 100) * 2.4}
              strokeOpacity={dormant ? 0.25 : remote ? 0.55 : 0.45}
              strokeDasharray={remote ? "5 4" : dormant ? "2 3" : undefined}
            />
          );
        })}

        {/* King hub — blue = in charge */}
        <circle
          cx={cx}
          cy={cy}
          r={24}
          fill="none"
          stroke={BRAIN_ACCENT}
          strokeWidth={1.4}
          strokeDasharray="3 3"
          opacity={0.85}
        />
        <circle cx={cx} cy={cy} r={18} fill={alpha(BRAIN_ACCENT, 0.12)} stroke={BRAIN_ACCENT} strokeWidth={2.2} />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={BRAIN_ACCENT}
          fontSize="9"
          fontWeight="800"
        >
          King
        </text>
        <text
          x={cx}
          y={cy + 32}
          textAnchor="middle"
          fill={alpha(BRAIN_ACCENT, 0.95)}
          fontSize="8"
          fontWeight="700"
        >
          Vision
        </text>

        {/* People */}
        {nodes.map((n) => {
          const typeMeta = RELATIONSHIP_TYPE_META[n.type];
          const isQueen = n.role === "queen";
          const remote = presenceOf(n) === "remote";
          const fill = isQueen ? BRAIN_WASH.remote : typeMeta.color;
          const r = isQueen ? 16 : 12;
          return (
            <g
              key={n.id}
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(n.id)}
            >
              {isQueen && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={r + 6}
                  fill="none"
                  stroke={BRAIN_WASH.remote}
                  strokeWidth={1.4}
                  strokeDasharray="3 3"
                  opacity={0.85}
                />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={r}
                fill={alpha(fill, remote ? 0.12 : 0.18)}
                stroke={fill}
                strokeWidth={isQueen ? 2.2 : 1.6}
              />
              <text
                x={n.x}
                y={n.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={fill}
                fontSize={isQueen ? "9" : "8"}
                fontWeight="800"
              >
                {n.name.slice(0, isQueen ? 2 : 1)}
              </text>
              <text
                x={n.x}
                y={n.y + r + 11}
                textAnchor="middle"
                fill={alpha(fill, 0.95)}
                fontSize="8"
                fontWeight="700"
              >
                {isQueen ? "Queen · remote" : n.name.split(" ")[0]}
              </text>
            </g>
          );
        })}
      </svg>
    </Box>
  );
}

/* ──────────────────────────────────────────────────── type / value legend */

function SystemLegend() {
  const types: RelationshipType[] = ["partner", "family", "mentor", "friend", "collaborator", "rival"];
  return (
    <Stack spacing={1.1}>
      <Typography variant="caption" sx={{ fontWeight: 800, color: "text.disabled", letterSpacing: 0.5 }}>
        MAPPINGS · TYPES
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 0.6 }}>
        {types.map((t) => {
          const m = RELATIONSHIP_TYPE_META[t];
          return (
            <Stack key={t} direction="row" spacing={0.7} sx={{ alignItems: "center" }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: m.color, flexShrink: 0 }} />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: m.color, display: "block", lineHeight: 1.2 }}>
                  {m.label}
                </Typography>
                <Typography sx={{ fontSize: "0.58rem", color: "text.disabled", lineHeight: 1.3 }}>
                  {m.blurb}
                </Typography>
              </Box>
            </Stack>
          );
        })}
      </Box>

      <Typography variant="caption" sx={{ fontWeight: 800, color: "text.disabled", letterSpacing: 0.5, pt: 0.5 }}>
        SEATS
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.25 }}>
        <Stack direction="row" spacing={0.7} sx={{ alignItems: "center" }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: BRAIN_ACCENT, flexShrink: 0 }} />
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: BRAIN_ACCENT, display: "block", lineHeight: 1.2 }}>
              King · blue
            </Typography>
            <Typography sx={{ fontSize: "0.58rem", color: "text.disabled", lineHeight: 1.3 }}>
              In charge — center hub
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={0.7} sx={{ alignItems: "center" }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: BRAIN_WASH.remote, flexShrink: 0 }} />
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: BRAIN_WASH.remote, display: "block", lineHeight: 1.2 }}>
              Queen · violet
            </Typography>
            <Typography sx={{ fontSize: "0.58rem", color: "text.disabled", lineHeight: 1.3 }}>
              Partner piece — remote seat
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Typography variant="caption" sx={{ fontWeight: 800, color: "text.disabled", letterSpacing: 0.5, pt: 0.5 }}>
        VALUES ON EACH EDGE
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.25 }}>
        {[
          { label: "Bond 0–100", hint: "Stroke weight" },
          { label: "Tone −100…+100", hint: "Warm → strained" },
          { label: "Presence", hint: "Solid · dashed remote · faint dormant" },
        ].map((row) => (
          <Box key={row.label}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: BRAIN_ACCENT, display: "block", lineHeight: 1.2 }}>
              {row.label}
            </Typography>
            <Typography sx={{ fontSize: "0.58rem", color: "text.disabled" }}>{row.hint}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

/* ──────────────────────────────────────────────────── chart views */

type ChartView = "love" | "friends" | "family";

const CHART_VIEWS: Array<{
  id: ChartView;
  label: string;
  /** Types included when this view is active and enabled. */
  types: RelationshipType[];
}> = [
  { id: "love", label: "Love", types: ["partner"] },
  { id: "friends", label: "Friends", types: ["friend"] },
  { id: "family", label: "Family", types: ["family"] },
];

const FRIENDS_BUG_HINT = "Bugged on evolution — LF more";

function ChartViewTabs({
  active,
  onChange,
}: {
  active: ChartView;
  onChange: (v: ChartView) => void;
}) {
  return (
    <Box sx={{ mb: 1.25 }}>
      <Typography
        variant="caption"
        sx={{ fontWeight: 800, color: "text.disabled", letterSpacing: 0.5, display: "block", mb: 0.75 }}
      >
        RELATIONSHIP CHARTS
      </Typography>
      <Stack direction="row" sx={{ gap: 0.6, flexWrap: "wrap" }}>
        {CHART_VIEWS.map((view) => {
          const selected = active === view.id;
          const isFriends = view.id === "friends";
          const isFamily = view.id === "family";
          const disabled = isFriends;

          const tabSx = {
            border: "1px solid",
            borderColor: selected
              ? alpha(BRAIN_ACCENT, 0.55)
              : disabled
                ? alpha("#64748b", 0.25)
                : "divider",
            bgcolor: selected
              ? alpha(BRAIN_ACCENT, 0.12)
              : disabled
                ? alpha("#64748b", 0.04)
                : "transparent",
            color: selected
              ? BRAIN_ACCENT
              : disabled
                ? "text.disabled"
                : "text.secondary",
            borderRadius: 999,
            px: 1.1,
            py: 0.45,
            fontSize: "0.68rem",
            fontWeight: selected ? 800 : 650,
            cursor: disabled ? "not-allowed" : "pointer",
            font: "inherit",
            display: "inline-flex",
            alignItems: "center",
            gap: 0.45,
            opacity: disabled ? 0.72 : 1,
            "&:focus-visible": {
              outline: `2px solid ${alpha(BRAIN_ACCENT, 0.55)}`,
              outlineOffset: 2,
            },
          } as const;

          const tab = (
            <Box
              component="button"
              type="button"
              aria-pressed={selected}
              aria-disabled={disabled || undefined}
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                onChange(view.id);
              }}
              sx={tabSx}
            >
              {view.label}
              {isFriends && (
                <BugReportRoundedIcon sx={{ fontSize: 13, color: BRAIN_WASH.warn }} />
              )}
              {isFamily && (
                <Typography
                  component="span"
                  sx={{ fontSize: "0.58rem", fontWeight: 700, color: "text.disabled", ml: 0.15 }}
                >
                  · see friends
                </Typography>
              )}
            </Box>
          );

          if (isFriends) {
            return (
              <Tooltip key={view.id} title={FRIENDS_BUG_HINT} arrow>
                <span>{tab}</span>
              </Tooltip>
            );
          }

          return <React.Fragment key={view.id}>{tab}</React.Fragment>;
        })}
      </Stack>
      <Typography
        variant="caption"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mt: 0.85,
          color: BRAIN_WASH.warn,
          fontWeight: 700,
        }}
      >
        <BugReportRoundedIcon sx={{ fontSize: 14 }} />
        Friends · disabled — {FRIENDS_BUG_HINT}
      </Typography>
      {active === "family" && (
        <Typography variant="caption" sx={{ display: "block", mt: 0.5, color: "text.secondary", fontWeight: 600 }}>
          Family — see Friends.
        </Typography>
      )}
    </Box>
  );
}

/* ──────────────────────────────────────────────────── panel */

export function RelationshipsPanel() {
  const { state } = useProfileStore();
  const [detail, setDetail] = React.useState<string | null>(null);
  const [chartView, setChartView] = React.useState<ChartView>("love");

  const entries = React.useMemo(
    () =>
      RELATIONSHIPS_SEED.map((r) => {
        const log = state.relationshipLog[r.id];
        if (!log) return r;
        return {
          ...r,
          strength: Math.min(100, r.strength + log.strengthBonus),
          lastInteractionAt: log.at,
        };
      }),
    [state.relationshipLog],
  );

  // Love is the only enabled chart; friends/family tabs exist as labels but do not
  // drive the graph until the evolution bug is cleared.
  const loveEntries = React.useMemo(
    () => entries.filter((e) => e.type === "partner"),
    [entries],
  );
  const nodes = React.useMemo(() => layoutGraph(loveEntries), [loveEntries]);
  const detailEntry = entries.find((r) => r.id === detail);
  const queen = entries.find((r) => r.role === "queen");

  return (
    <>
      <Box
        sx={{
          mb: 1.25,
          p: 1.15,
          borderRadius: 2,
          border: "1px solid",
          borderColor: alpha(BRAIN_WASH.warn, 0.35),
          bgcolor: alpha(BRAIN_WASH.warn, 0.06),
          display: "flex",
          gap: 1,
          alignItems: "flex-start",
        }}
      >
        <ConstructionRoundedIcon sx={{ fontSize: 18, color: BRAIN_WASH.warn, mt: 0.15 }} />
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: BRAIN_WASH.warn, display: "block" }}>
            Under construction · rebuilding the relationship graph
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.45 }}>
            Placeholder for the mapping system: types, bond strength, tone, and presence.
            Love chart is live; Friends is bugged on evolution (LF more); Family — see Friends.
          </Typography>
        </Box>
      </Box>

      <ChartViewTabs active={chartView} onChange={setChartView} />

      {queen && (
        <Box
          sx={{
            mb: 1.25,
            p: 1.1,
            borderRadius: 2,
            border: "1.5px dashed",
            borderColor: alpha(BRAIN_WASH.remote, 0.5),
            bgcolor: alpha(BRAIN_WASH.remote, 0.06),
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <HubRoundedIcon sx={{ fontSize: 18, color: BRAIN_WASH.remote }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: BRAIN_WASH.remote, display: "block" }}>
              Queen piece present · remote — {queen.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.4 }}>
              Not missing from the board. Bond {queen.strength}/100 · {valenceLabel(queen.valence).label.toLowerCase()} ·
              last touch {queen.lastInteractionAt ? daysSince(queen.lastInteractionAt) : "—"}.
            </Typography>
          </Box>
          <Box
            component="button"
            type="button"
            onClick={() => setDetail(queen.id)}
            sx={{
              border: "1px solid",
              borderColor: alpha(BRAIN_WASH.remote, 0.45),
              bgcolor: alpha(BRAIN_WASH.remote, 0.1),
              color: BRAIN_WASH.remote,
              borderRadius: 1.5,
              px: 1,
              py: 0.45,
              fontSize: "0.65rem",
              fontWeight: 800,
              cursor: "pointer",
              font: "inherit",
            }}
          >
            Open
          </Box>
        </Box>
      )}

      {chartView === "love" && (
        <>
          <Typography
            variant="caption"
            sx={{ color: alpha(BRAIN_ACCENT, 0.9), fontWeight: 700, display: "block", mb: 0.75 }}
          >
            Showing love relationships only
          </Typography>
          <RelationshipGraph nodes={nodes} onSelect={setDetail} />
        </>
      )}

      {chartView === "family" && (
        <Box
          sx={{
            py: 2.5,
            px: 1.5,
            textAlign: "center",
            borderRadius: 2,
            border: "1px dashed",
            borderColor: "divider",
            bgcolor: alpha("#64748b", 0.04),
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", display: "block" }}>
            See Friends
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled", display: "block", mt: 0.4 }}>
            Family chart is not separate yet — use the Friends tab (currently bugged).
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 1.25, pt: 1.25, borderTop: "1px solid", borderColor: "divider" }}>
        <SystemLegend />
      </Box>

      {detailEntry && (
        <RelationshipDetail entry={detailEntry} onClose={() => setDetail(null)} />
      )}
    </>
  );
}

