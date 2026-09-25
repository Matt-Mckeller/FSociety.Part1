/**
 * AI Chat HUD — PipelineLayerRail stories
 *
 * Visual mockups of the Pipeline Layer Rail — the vertical pill on the
 * HUD left rail that lets users assemble an ordered stack of prompt-
 * processing layers (pipelines) for the AI Chat composer.
 *
 * The actual functional component (`PipelineLayerRail`) lives in
 * `apps/4eye-web-mockup` and requires `@4eye/features` providers.
 * These stories provide a static visual reference only.
 *
 * All stories use WHITE background per brand guidelines.
 * The pill itself uses DUSK_HORIZON (dark/starry) so it reads clearly.
 */
import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DUSK_HORIZON_BACKGROUND } from "@expanse/theme";

// ─── Demo data ───────────────────────────────────────────────────────────────

const DEMO_PIPELINES = [
  { id: "concise",    name: "Make it Concise",  color: "#3b82f6" },
  { id: "stack",      name: "Data Stacking",    color: "#14b8a6" },
  { id: "engage",     name: "Engagement",       color: "#f59e0b" },
  { id: "healing",    name: "Healing",          color: "#22c55e" },
  { id: "love",       name: "Love",             color: "#ef4444" },
];

// ─── Collapsed pill ───────────────────────────────────────────────────────────

function CollapsedPill({
  layers,
  onClick,
}: {
  layers: typeof DEMO_PIPELINES;
  onClick?: () => void;
}) {
  const filled = layers.length;
  const layerCount = Math.max(Math.min(filled, 4), 3);
  return (
    <Tooltip title="Prompt layers — click to manage" placement="right" arrow>
      <Box
        onClick={onClick}
        sx={{
          width: 44,
          height: 88,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 0.5,
          py: 1,
          borderRadius: "22px",
          cursor: "pointer",
          background: "linear-gradient(135deg, #0d1117 0%, #161b22 55%, #0d1117 100%)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
          userSelect: "none",
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 32 48"
          sx={{ width: 34, height: "auto", display: "block" }}
          aria-hidden
        >
          <defs>
            <linearGradient id="story-pipe-tile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="48%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          {Array.from({ length: layerCount }, (_, i) => layerCount - 1 - i).map((fromTop) => {
            const y = 4 + fromTop * 10;
            const isFilled = fromTop < filled;
            const isTop = fromTop === 0;
            const color = layers[fromTop]?.color;
            return (
              <g key={fromTop}>
                <rect x="5" y={y} width="22" height="13" rx="2.4" fill={isFilled ? "#1e3a8a" : "#1e3a8a44"} />
                <rect
                  x="5"
                  y={y}
                  width="22"
                  height="10.8"
                  rx="2.4"
                  fill={isFilled ? color ?? "url(#story-pipe-tile)" : "#3b82f62e"}
                  stroke="#0b122473"
                  strokeWidth="0.7"
                />
                {isTop &&
                  [-4.15, 4.15].flatMap((dx) =>
                    [0, 3.35].map((dy) => (
                      <circle
                        key={`${dx}-${dy}`}
                        cx={16 + dx}
                        cy={y + 4.05 + dy}
                        r="1.55"
                        fill={isFilled ? "#7dd3fc" : "#7dd3fc59"}
                        stroke="rgba(255,255,255,0.45)"
                        strokeWidth="0.4"
                      />
                    )),
                  )}
              </g>
            );
          })}
        </Box>
      </Box>
    </Tooltip>
  );
}

// ─── Expanded panel ───────────────────────────────────────────────────────────

function ExpandedPanel({
  active,
  available,
  onRemove,
  onAdd,
  onClose,
}: {
  active: typeof DEMO_PIPELINES;
  available: typeof DEMO_PIPELINES;
  onRemove: (id: string) => void;
  onAdd: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <Box
      sx={{
        width: 320,
        borderRadius: 2,
        overflow: "hidden",
        background: DUSK_HORIZON_BACKGROUND,
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <AccountTreeIcon sx={{ color: "#06b6d4", fontSize: 16 }} />
        <Typography
          variant="subtitle2"
          sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, flex: 1, fontSize: 12 }}
        >
          Prompt Layers
        </Typography>
        <Box
          sx={{
            px: 0.9,
            py: 0.35,
            borderRadius: 999,
            border: "1px solid rgba(96,165,250,0.45)",
            bgcolor: "rgba(37,99,235,0.18)",
            color: "#bfdbfe",
            fontSize: 9.5,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          auto
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: "rgba(255,255,255,0.4)", p: 0.25 }}>
          <CloseRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* Active flow */}
      <Box sx={{ px: 1.5, pt: 1.5, pb: 1 }}>
        <Typography
          variant="overline"
          sx={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: 1, display: "block", mb: 1 }}
        >
          Flow ({active.length})
        </Typography>
        {active.length === 0 ? (
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>
            No layers selected — add from below
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {active.map((layer, i) => (
              <Box
                key={layer.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 0.75,
                  borderRadius: 1,
                  bgcolor: "rgba(255,255,255,0.05)",
                  border: `1px solid ${layer.color}33`,
                }}
              >
                <DragIndicatorIcon sx={{ color: "rgba(255,255,255,0.2)", fontSize: 14, cursor: "grab" }} />
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.5)", minWidth: 14, fontSize: 10, textAlign: "center" }}
                >
                  {i + 1}
                </Typography>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: layer.color,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" sx={{ color: "white", flex: 1, fontSize: 12, fontWeight: 500 }}>
                  {layer.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => onRemove(layer.id)}
                  sx={{ color: "rgba(255,255,255,0.3)", p: 0.25, "&:hover": { color: "#ef4444" } }}
                >
                  <CloseRoundedIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Divider */}
      {available.length > 0 && (
        <>
          <Divider sx={{ bgcolor: "rgba(255,255,255,0.08)", mx: 1.5 }} />
          <Box sx={{ px: 1.5, py: 1 }}>
            <Typography
              variant="overline"
              sx={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: 1, display: "block", mb: 0.75 }}
            >
              Available
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
              {available.map((layer) => (
                <Box
                  key={layer.id}
                  onClick={() => onAdd(layer.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 0.75,
                    py: 0.5,
                    borderRadius: 1,
                    cursor: "pointer",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: layer.color,
                      opacity: 0.7,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
                    {layer.name}
                  </Typography>
                  <AddRoundedIcon sx={{ color: "rgba(255,255,255,0.25)", fontSize: 14, ml: "auto" }} />
                </Box>
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

// ─── Story shell component ────────────────────────────────────────────────────

function PipelineLayerRailDemo({ initialActiveIds }: { initialActiveIds: string[] }) {
  const [activeIds, setActiveIds] = useState(initialActiveIds);
  const [expanded, setExpanded] = useState(false);

  const activeLayers = activeIds
    .map((id) => DEMO_PIPELINES.find((p) => p.id === id))
    .filter((p): p is (typeof DEMO_PIPELINES)[0] => !!p);

  const availableLayers = DEMO_PIPELINES.filter((p) => !activeIds.includes(p.id));

  const handleRemove = (id: string) => setActiveIds((prev) => prev.filter((i) => i !== id));
  const handleAdd = (id: string) => setActiveIds((prev) => [...prev, id]);

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
      {/* Left rail pill */}
      <CollapsedPill layers={activeLayers} onClick={() => setExpanded((v) => !v)} />

      {/* Expanded panel (shown inline for story) */}
      {expanded && (
        <ExpandedPanel
          active={activeLayers}
          available={availableLayers}
          onRemove={handleRemove}
          onAdd={handleAdd}
          onClose={() => setExpanded(false)}
        />
      )}

      {/* State label */}
      <Box sx={{ pt: 0.5 }}>
        <Typography variant="caption" sx={{ color: "#999", fontSize: 11 }}>
          {expanded ? "Expanded — click × or pill to collapse" : "Collapsed — click pill to expand"}
        </Typography>
        <br />
        <Typography variant="caption" sx={{ color: "#bbb", fontSize: 11 }}>
          Active: {activeIds.length === 0 ? "none" : activeLayers.map((l) => l.name).join(" → ")}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Layout Systems / HUD Components / AiChat / PipelineLayerRail",
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

/** Empty state — no layers selected. Ghost panel stack. */
export const EmptyState: Story = {
  render: () => <PipelineLayerRailDemo initialActiveIds={[]} />,
};

/** One active layer — top panel filled. */
export const OneLayer: Story = {
  render: () => <PipelineLayerRailDemo initialActiveIds={["concise"]} />,
};

/** Three layers — full blue panel stack. */
export const ThreeLayers: Story = {
  render: () => <PipelineLayerRailDemo initialActiveIds={["concise", "engage", "healing"]} />,
};

/** All five layers — dense pill, expanded panel pre-opened. */
export const AllLayersExpanded: Story = {
  render: () => {
    const [activeIds, setActiveIds] = useState(DEMO_PIPELINES.map((p) => p.id));
    const activeLayers = activeIds
      .map((id) => DEMO_PIPELINES.find((p) => p.id === id))
      .filter((p): p is (typeof DEMO_PIPELINES)[0] => !!p);
    return (
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        <CollapsedPill layers={activeLayers} />
        <ExpandedPanel
          active={activeLayers}
          available={[]}
          onRemove={(id) => setActiveIds((prev) => prev.filter((i) => i !== id))}
          onAdd={() => {}}
          onClose={() => {}}
        />
      </Box>
    );
  },
};

/** Side-by-side: empty, 1-layer, 3-layer pills — quick visual reference. */
export const PillVariants: Story = {
  parameters: {
    backgrounds: {
      default: "slate",
      values: [
        { name: "slate", value: "#0f172a" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
  render: () => {
    const configs: Array<{ ids: string[]; label: string }> = [
      { ids: [], label: "Empty" },
      { ids: ["concise"], label: "1 layer" },
      { ids: ["concise", "engage"], label: "2 layers" },
      { ids: ["concise", "engage", "healing"], label: "3 layers" },
      { ids: DEMO_PIPELINES.map((p) => p.id), label: "All 5" },
    ];
    return (
      <Box sx={{ display: "flex", gap: 3, alignItems: "flex-end", p: 2 }}>
        {configs.map(({ ids, label }) => {
          const layers = ids
            .map((id) => DEMO_PIPELINES.find((p) => p.id === id))
            .filter((p): p is (typeof DEMO_PIPELINES)[0] => !!p);
          return (
            <Box
              key={label}
              sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}
            >
              <CollapsedPill layers={layers} />
              <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: 10 }}>
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  },
};
