"use client";

/**
 * Character — Perspectives.
 *
 * Tracks the user's stance across major life domains. Cards use drawn glyphs
 * (not emoji) so domain colour reaches the icon, and share Brain valence /
 * chrome tokens so this grid does not invent a third colour system.
 */

import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slider,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import {
  PERSPECTIVE_META,
  PERSPECTIVE_SEED,
  type PerspectiveMeta,
  type PerspectiveEntry,
  type PerspectiveSnapshot,
} from "../model/perspectives";
import { useProfileStore } from "../store/CharacterProfileStore";
import { PerspectiveGlyph } from "./PerspectiveGlyphs";
import { BRAIN_ACCENT, VALENCE } from "../theme/brainTokens";

/* ---------------------------------------------------------- weight bar */

function WeightBar({ value, color }: { value: number; color: string }) {
  const positive = value > 0;
  const pct = Math.abs(value) / 100;

  return (
    <Box sx={{ position: "relative", height: 6, borderRadius: 1, bgcolor: alpha("#64748b", 0.12), overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 1,
          bgcolor: alpha("#64748b", 0.35),
          transform: "translateX(-50%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          borderRadius: 1,
          width: `${pct * 50}%`,
          ...(positive
            ? { left: "50%", bgcolor: color }
            : { right: "50%", bgcolor: alpha(color, 0.55) }),
        }}
      />
    </Box>
  );
}

/* --------------------------------------------------------- mini sparkline */

function Sparkline({
  history,
  color,
  width = 60,
  height = 24,
}: {
  history: PerspectiveSnapshot[];
  color: string;
  width?: number;
  height?: number;
}) {
  if (history.length < 2) return null;

  const sorted = [...history].sort((a, b) => a.recordedAt - b.recordedAt);
  const values = sorted.map((h) => h.weight);
  const minV = -100;
  const maxV = 100;

  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - minV) / (maxV - minV)) * height;
    return `${x},${y}`;
  });

  const midY = height / 2;
  return (
    <svg width={width} height={height} style={{ flexShrink: 0 }}>
      <line x1={0} y1={midY} x2={width} y2={midY} stroke={alpha(color, 0.2)} strokeWidth={1} />
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.85}
      />
      <circle
        cx={parseFloat(pts[pts.length - 1].split(",")[0])}
        cy={parseFloat(pts[pts.length - 1].split(",")[1])}
        r={2.5}
        fill={color}
      />
    </svg>
  );
}

/* -------------------------------------------------------- trend icon */

function TrendIcon({ history }: { history: PerspectiveSnapshot[] }) {
  if (history.length < 2) return null;
  const last = history[history.length - 1].weight;
  const prev = history[history.length - 2].weight;
  const delta = last - prev;
  if (delta > 5) return <TrendingUpRoundedIcon sx={{ fontSize: 14, color: VALENCE.positive.color }} />;
  if (delta < -5) return <TrendingDownRoundedIcon sx={{ fontSize: 14, color: VALENCE.negative.color }} />;
  return <TrendingFlatRoundedIcon sx={{ fontSize: 14, color: VALENCE.neutral.color }} />;
}

/* ------------------------------------------------------- detail dialog */

function PerspectiveDetail({
  meta,
  entry,
  currentWeight,
  onClose,
  onUpdateStance,
}: {
  meta: PerspectiveMeta;
  entry: PerspectiveEntry;
  currentWeight: number;
  onClose: () => void;
  onUpdateStance: (newWeight: number) => void;
}) {
  const { dispatch } = useProfileStore();
  const identity = meta.color;
  const c = BRAIN_ACCENT;
  const sorted = [...entry.history].sort((a, b) => a.recordedAt - b.recordedAt);
  const [isEditing, setIsEditing] = React.useState(false);
  const [draftWeight, setDraftWeight] = React.useState(currentWeight);

  const handleConfirm = () => {
    onUpdateStance(draftWeight);
    dispatch({
      type: "add-feed-event",
      event: {
        id: `perspective-${meta.id}-${Date.now()}`,
        type: "perspective-updated",
        label: `${meta.label} stance updated`,
        detail: `${currentWeight > 0 ? "+" : ""}${currentWeight} → ${draftWeight > 0 ? "+" : ""}${draftWeight}`,
        occurredAt: Date.now(),
        color: c,
        emoji: meta.icon,
      },
    });
    setIsEditing(false);
    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="mobileL" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, pb: 0 }}>
        <Box sx={{ color: identity, display: "flex", p: 0.6, borderRadius: 1.5, bgcolor: alpha(identity, 0.1) }}>
          <PerspectiveGlyph id={meta.id} size={22} title={meta.label} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{meta.label}</Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>{meta.description}</Typography>
        </Box>
        <IconButton size="small" onClick={() => setIsEditing((v) => !v)} sx={{ color: isEditing ? c : "text.secondary" }}>
          <EditRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {isEditing && (
          <Box
            sx={{
              mt: 1,
              mb: 1.5,
              p: 1.25,
              borderRadius: 2,
              border: "1.5px solid",
              borderColor: alpha(c, 0.3),
              bgcolor: alpha(c, 0.04),
            }}
          >
            <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.75 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: c }}>UPDATE STANCE</Typography>
              <Typography variant="caption" sx={{ fontWeight: 900, color: c }}>
                {draftWeight > 0 ? "+" : ""}{draftWeight}
              </Typography>
            </Stack>
            <Slider
              value={draftWeight}
              min={-100}
              max={100}
              step={5}
              onChange={(_, v) => setDraftWeight(v as number)}
              sx={{
                color: c,
                "& .MuiSlider-thumb": { width: 16, height: 16 },
                "& .MuiSlider-rail": { bgcolor: alpha(c, 0.15) },
              }}
              marks={[
                { value: -100, label: "-100" },
                { value: 0, label: "0" },
                { value: 100, label: "+100" },
              ]}
            />
            <Stack direction="row" sx={{ justifyContent: "flex-end", gap: 1, mt: 1 }}>
              <Button size="small" onClick={() => setIsEditing(false)} sx={{ textTransform: "none" }}>
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleConfirm}
                sx={{ textTransform: "none", fontWeight: 800, bgcolor: c, "&:hover": { bgcolor: alpha(c, 0.85) } }}
              >
                Confirm
              </Button>
            </Stack>
          </Box>
        )}

        <Stack spacing={1} sx={{ mt: isEditing ? 0 : 1 }}>
          <Box>
            <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled" }}>CURRENT</Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: c }}>
                {currentWeight > 0 ? "+" : ""}{currentWeight}
              </Typography>
            </Stack>
            <WeightBar value={currentWeight} color={c} />
          </Box>
          <Box>
            <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled" }}>TARGET</Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: alpha(c, 0.6) }}>
                {entry.target > 0 ? "+" : ""}{entry.target}
              </Typography>
            </Stack>
            <WeightBar value={entry.target} color={alpha(c, 0.5)} />
          </Box>
          <Stack direction="row" spacing={2}>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", display: "block" }}>IMPORTANCE</Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: c }}>{entry.importance}/100</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", display: "block" }}>ENGAGEMENT</Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: c }}>{entry.engagement}/100</Typography>
            </Box>
          </Stack>
        </Stack>

        {sorted.length > 1 && (
          <>
            <Divider sx={{ my: 1.5 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", display: "block", mb: 1 }}>
              HISTORY
            </Typography>
            <Stack spacing={0.75}>
              {sorted.map((snap, i) => {
                const date = new Date(snap.recordedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });
                return (
                  <Stack key={i} direction="row" sx={{ alignItems: "flex-start", gap: 1 }}>
                    <Typography variant="caption" sx={{ color: "text.disabled", whiteSpace: "nowrap", fontSize: "0.6rem", mt: 0.2 }}>
                      {date}
                    </Typography>
                    <Box
                      sx={{
                        flexShrink: 0,
                        mt: 0.75,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: i === sorted.length - 1 ? c : alpha(c, 0.4),
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: c }}>
                        {snap.weight > 0 ? "+" : ""}{snap.weight}
                      </Typography>
                      {snap.note && (
                        <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                          {snap.note}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </>
        )}

        <Divider sx={{ my: 1.5 }} />
        <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", display: "block", mb: 0.5 }}>
          RELATED TOPICS
        </Typography>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
          {meta.relatedTopics.map((t) => (
            <Box
              key={t}
              sx={{
                px: 0.75,
                py: 0.25,
                borderRadius: 1,
                bgcolor: alpha(c, 0.08),
                border: "1px solid",
                borderColor: alpha(c, 0.2),
              }}
            >
              <Typography variant="caption" sx={{ color: c, fontWeight: 700, fontSize: "0.65rem" }}>
                {t}
              </Typography>
            </Box>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------- perspective card */

function PerspectiveCard({
  meta,
  entry,
  onClick,
}: {
  meta: PerspectiveMeta;
  entry: PerspectiveEntry;
  onClick: () => void;
}) {
  const identity = meta.color;
  const c = BRAIN_ACCENT;

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 1.15,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(c, 0.18),
        bgcolor: alpha(c, 0.02),
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 0.75,
        "&:hover": { borderColor: alpha(c, 0.4), bgcolor: alpha(c, 0.05) },
        transition: "border-color .15s, background-color .15s",
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center", gap: 0.9 }}>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(identity, 0.12),
            color: identity,
            flexShrink: 0,
          }}
        >
          <PerspectiveGlyph id={meta.id} size={18} title={meta.label} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "text.primary", display: "block", lineHeight: 1.2 }}>
            {meta.label}
          </Typography>
        </Box>
        <TrendIcon history={entry.history} />
        <Sparkline history={entry.history} color={c} width={44} height={18} />
      </Stack>

      <WeightBar value={entry.current} color={c} />

      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.62rem" }}>
          {entry.current > 0 ? "+" : ""}{entry.current} · imp {entry.importance}
        </Typography>
        <Typography variant="caption" sx={{ color: alpha(c, 0.75), fontSize: "0.6rem", fontWeight: 700 }}>
          target {entry.target > 0 ? "+" : ""}{entry.target}
        </Typography>
      </Stack>
    </Box>
  );
}

/* --------------------------------------------------------------- panel */

export function PerspectivesPanel() {
  const { state, dispatch } = useProfileStore();
  const [detail, setDetail] = React.useState<string | null>(null);
  const weightOverrides = state.perspectiveWeights;

  const detailEntry = detail ? PERSPECTIVE_SEED.find((e) => e.perspectiveId === detail) : null;
  const detailMeta = detail ? PERSPECTIVE_META.find((m) => m.id === detail) : null;

  const unique = PERSPECTIVE_SEED.filter(
    (e, idx, arr) => arr.findIndex((x) => x.perspectiveId === e.perspectiveId) === idx,
  );
  const sorted = [...unique].sort((a, b) => b.importance - a.importance);

  const handleUpdateStance = (newWeight: number) => {
    if (detail) {
      dispatch({ type: "set-perspective-weight", perspectiveId: detail, weight: newWeight });
    }
  };

  return (
    <>
      <Typography
        variant="caption"
        sx={{ color: alpha(BRAIN_ACCENT, 0.85), display: "block", mb: 1, fontWeight: 600, lineHeight: 1.45 }}
      >
        Stance by domain — importance ranks the grid; glyphs carry a soft identity tint.
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 1 }}>
        {sorted.map((entry) => {
          const meta = PERSPECTIVE_META.find((m) => m.id === entry.perspectiveId);
          if (!meta) return null;
          const currentWeight = weightOverrides[entry.perspectiveId] ?? entry.current;
          return (
            <PerspectiveCard
              key={entry.perspectiveId}
              meta={meta}
              entry={{ ...entry, current: currentWeight }}
              onClick={() => setDetail(entry.perspectiveId)}
            />
          );
        })}
      </Box>

      {detailEntry && detailMeta && (
        <PerspectiveDetail
          meta={detailMeta}
          entry={detailEntry}
          currentWeight={weightOverrides[detailEntry.perspectiveId] ?? detailEntry.current}
          onUpdateStance={handleUpdateStance}
          onClose={() => setDetail(null)}
        />
      )}
    </>
  );
}
