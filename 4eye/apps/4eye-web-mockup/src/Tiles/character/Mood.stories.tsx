"use client";

/**
 * Mood — Storybook stories.
 *
 * Explores visual representations of the character's emotional state:
 *   - Emotion Map: a 2D valence × arousal grid. Positive domain is intentionally
 *     wider — the highest peaks of positive emotion are rare and undiscovered
 *     by most.
 *   - Emotion Pairs: positive/negative counterparts (Joy vs Anger, Hope vs Fear).
 *   - Intensity + Mastery indicators.
 *   - Interactive mood selector.
 */

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Chip,
  Divider,
  Slider,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";

import { EMOTIONS, MOOD_SNAPSHOT_SEED, type EmotionMeta } from "./model/mood";

/* ----------------------------------------------------------------- helpers */

const positive = EMOTIONS.filter((e) => e.valence === "positive");
const negative = EMOTIONS.filter((e) => e.valence === "negative");

/* ------------------------------------------------- intensity + mastery bar */

function IntensityMasteryBar({
  label,
  value,
  color,
  lowLabel = "Low",
  avgLabel = "Average",
  highLabel = "High",
}: {
  label: string;
  value: number;
  color: string;
  lowLabel?: string;
  avgLabel?: string;
  highLabel?: string;
}) {
  const zone = value < 33 ? lowLabel : value < 67 ? avgLabel : highLabel;
  return (
    <Stack spacing={0.75}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
          {label}
        </Typography>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color }}>
            {zone}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {value}/100
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ position: "relative", height: 10, borderRadius: 2, bgcolor: alpha(color, 0.12), overflow: "hidden" }}>
        <Box
          sx={{
            width: `${value}%`,
            height: "100%",
            borderRadius: 2,
            bgcolor: color,
            boxShadow: `0 0 8px ${alpha(color, 0.5)}`,
            transition: "width .35s",
          }}
        />
        {/* threshold marks */}
        {[33, 67].map((pct) => (
          <Box
            key={pct}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${pct}%`,
              width: 1.5,
              bgcolor: alpha(color, 0.3),
            }}
          />
        ))}
      </Box>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        {[lowLabel, avgLabel, highLabel].map((l) => (
          <Typography key={l} variant="caption" sx={{ color: "text.disabled", fontSize: "0.6rem" }}>
            {l}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}

/* ------------------------------------------------- emotion dot on the map */

function EmotionDot({
  emotion,
  active,
  onSelect,
  scaleFactor = 1,
}: {
  emotion: EmotionMeta;
  active: boolean;
  onSelect: (id: string) => void;
  scaleFactor?: number;
}) {
  const size = active ? 14 : 10;
  return (
    <Tooltip
      title={
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: "0.72rem" }}>{emotion.label}</Typography>
          <Typography sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.8)" }}>
            {emotion.description}
          </Typography>
          {emotion.elevated && (
            <Typography sx={{ fontSize: "0.6rem", color: "#fbbf24", mt: 0.25 }}>
              ✦ Elevated state — rare
            </Typography>
          )}
        </Box>
      }
      arrow
      placement="top"
    >
      <Box
        onClick={() => onSelect(emotion.id)}
        sx={{
          width: size,
          height: size,
          borderRadius: "50%",
          bgcolor: emotion.color,
          border: active ? `2px solid #fff` : "none",
          boxShadow: active
            ? `0 0 0 2px ${emotion.color}, 0 0 12px ${alpha(emotion.color, 0.6)}`
            : `0 0 6px ${alpha(emotion.color, 0.4)}`,
          cursor: "pointer",
          transition: "all .2s",
          zIndex: active ? 10 : 1,
          "&:hover": {
            transform: "scale(1.3)",
          },
        }}
      />
    </Tooltip>
  );
}

/* ------------------------------------------- 2D valence × arousal map */

function EmotionMap({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const mapHeight = 280;
  const positiveWidth = 65; // % — wider because positive domain is larger
  const negativeWidth = 35;

  return (
    <Box sx={{ userSelect: "none" }}>
      {/* Legend */}
      <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="caption" sx={{ color: "#dc2626", fontWeight: 700, fontSize: "0.65rem" }}>
          ← Negative
        </Typography>
        <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.65rem" }}>
          Arousal
        </Typography>
        <Typography variant="caption" sx={{ color: "#16a34a", fontWeight: 700, fontSize: "0.65rem" }}>
          Positive →
        </Typography>
      </Stack>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: mapHeight,
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Negative domain (35% width, left) */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${negativeWidth}%`,
            background: `linear-gradient(90deg, ${alpha("#7f1d1d", 0.15)}, ${alpha("#dc2626", 0.06)})`,
          }}
        />
        {/* Positive domain (65% width, right) — intentionally larger */}
        <Box
          sx={{
            position: "absolute",
            left: `${negativeWidth}%`,
            top: 0,
            bottom: 0,
            right: 0,
            background: `linear-gradient(90deg, ${alpha("#16a34a", 0.06)}, ${alpha("#d97706", 0.1)})`,
          }}
        />
        {/* Undiscovered peak region at far right top */}
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "22%",
            height: "40%",
            background: `radial-gradient(circle at 100% 0%, ${alpha("#f59e0b", 0.18)} 0%, transparent 70%)`,
            borderBottom: `1px dashed ${alpha("#f59e0b", 0.25)}`,
            borderLeft: `1px dashed ${alpha("#f59e0b", 0.2)}`,
          }}
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            right: 6,
            top: 6,
            fontSize: "0.55rem",
            color: alpha("#d97706", 0.7),
            fontWeight: 700,
            letterSpacing: 0.3,
          }}
        >
          ✦ UNCHARTED
        </Typography>

        {/* Center vertical divider */}
        <Box
          sx={{
            position: "absolute",
            left: `${negativeWidth}%`,
            top: 8,
            bottom: 8,
            width: 1.5,
            bgcolor: alpha("#64748b", 0.2),
          }}
        />

        {/* Arousal axis label (left) */}
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            left: 4,
            top: 6,
            fontSize: "0.55rem",
            color: "text.disabled",
            transform: "none",
          }}
        >
          High
        </Typography>
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            left: 4,
            bottom: 6,
            fontSize: "0.55rem",
            color: "text.disabled",
          }}
        >
          Low
        </Typography>

        {/* Plot all emotions */}
        {EMOTIONS.map((e) => {
          const isPos = e.valence === "positive";
          const arousalPct = 1 - e.arousal / 100; // 0 = top (high), 1 = bottom (low)

          let xPct: number;
          if (isPos) {
            // Within the positive zone: right side, stronger emotions toward right
            const relX = 0.1 + (e.arousal / 100) * 0.85;
            xPct = negativeWidth + relX * positiveWidth;
          } else {
            // Within the negative zone: left side
            const relX = 0.9 - (e.arousal / 100) * 0.8;
            xPct = relX * negativeWidth;
          }

          const x = xPct;
          const y = arousalPct * 100;

          return (
            <Box
              key={e.id}
              sx={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: selected === e.id ? 10 : 1,
              }}
            >
              <EmotionDot
                emotion={e}
                active={selected === e.id}
                onSelect={onSelect}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

/* --------------------------------------------------- emotion pair grid */

const PAIRS: Array<{ positive: EmotionMeta; negative: EmotionMeta }> = [
  { positive: EMOTIONS.find((e) => e.id === "euphoric")!, negative: EMOTIONS.find((e) => e.id === "despairing")! },
  { positive: EMOTIONS.find((e) => e.id === "hopeful")!, negative: EMOTIONS.find((e) => e.id === "fearful")! },
  { positive: EMOTIONS.find((e) => e.id === "joyful")!, negative: EMOTIONS.find((e) => e.id === "angry")! },
  { positive: EMOTIONS.find((e) => e.id === "content")!, negative: EMOTIONS.find((e) => e.id === "frustrated")! },
  { positive: EMOTIONS.find((e) => e.id === "grateful")!, negative: EMOTIONS.find((e) => e.id === "guilty")! },
  { positive: EMOTIONS.find((e) => e.id === "serene")!, negative: EMOTIONS.find((e) => e.id === "melancholy")! },
  { positive: EMOTIONS.find((e) => e.id === "peaceful")!, negative: EMOTIONS.find((e) => e.id === "numb")! },
].filter((p) => p.positive && p.negative);

function EmotionPairRow({ pair }: { pair: (typeof PAIRS)[number] }) {
  const { positive: pos, negative: neg } = pair;
  return (
    <Stack direction="row" sx={{ alignItems: "stretch", gap: 0 }}>
      {/* Positive */}
      <Box
        sx={{
          flex: 1.8,
          p: 0.75,
          borderRadius: "8px 0 0 8px",
          bgcolor: alpha(pos.color, 0.08),
          border: "1px solid",
          borderColor: alpha(pos.color, 0.22),
          borderRight: "none",
        }}
      >
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: pos.color, flexShrink: 0 }} />
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: pos.color, display: "block", lineHeight: 1.1 }}>
              {pos.label}
              {pos.elevated && " ✦"}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.6rem" }}>
              {pos.description}
            </Typography>
          </Box>
        </Stack>
      </Box>
      {/* Center divider */}
      <Box sx={{ width: 1.5, bgcolor: alpha("#64748b", 0.15) }} />
      {/* Negative */}
      <Box
        sx={{
          flex: 1,
          p: 0.75,
          borderRadius: "0 8px 8px 0",
          bgcolor: alpha(neg.color, 0.06),
          border: "1px solid",
          borderColor: alpha(neg.color, 0.2),
          borderLeft: "none",
        }}
      >
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: neg.color, flexShrink: 0 }} />
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: neg.color, display: "block", lineHeight: 1.1, fontSize: "0.68rem" }}>
              {neg.label}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.58rem" }}>
              {neg.description}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}

/* ------------------------------------------------- full mood display */

function MoodDisplay({ intensity = 72, mastery = 68 }: { intensity?: number; mastery?: number }) {
  const [selected, setSelected] = React.useState(MOOD_SNAPSHOT_SEED.primaryEmotion);
  const activeEmotion = EMOTIONS.find((e) => e.id === selected);

  return (
    <Stack spacing={2.5} sx={{ maxWidth: 640 }}>
      {/* Title */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Emotional Landscape</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          A map of human emotional experience — valence (positive/negative) × arousal (high/low).
          The positive domain is larger because the highest states of joy, bliss, and transcendence
          are yet to be discovered by most people.
        </Typography>
      </Box>

      {/* Active emotion display */}
      {activeEmotion && (
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            p: 1.25,
            borderRadius: 2,
            border: "1px solid",
            borderColor: alpha(activeEmotion.color, 0.3),
            bgcolor: alpha(activeEmotion.color, 0.06),
          }}
        >
          <Box
            sx={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              bgcolor: activeEmotion.color,
              boxShadow: `0 0 12px ${alpha(activeEmotion.color, 0.6)}`,
              flexShrink: 0,
              mt: 0.25,
            }}
          />
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: activeEmotion.color }}>
                {activeEmotion.label}
              </Typography>
              <Chip
                label={activeEmotion.valence === "positive" ? "Positive" : "Negative"}
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  bgcolor: alpha(activeEmotion.color, 0.15),
                  color: activeEmotion.color,
                  "& .MuiChip-label": { px: 0.75 },
                }}
              />
              {activeEmotion.elevated && (
                <Chip
                  label="Elevated · Rare"
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    bgcolor: alpha("#d97706", 0.1),
                    color: "#d97706",
                    "& .MuiChip-label": { px: 0.75 },
                  }}
                />
              )}
            </Stack>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {activeEmotion.description}
            </Typography>
          </Box>
        </Stack>
      )}

      {/* Map */}
      <EmotionMap selected={selected} onSelect={setSelected} />

      <Divider />

      {/* Intensity + Mastery */}
      <Stack spacing={1.5}>
        <IntensityMasteryBar
          label="Emotional Intensity"
          value={intensity}
          color="#f97316"
          lowLabel="Subdued"
          avgLabel="Moderate"
          highLabel="Intense"
        />
        <IntensityMasteryBar
          label="Emotional Mastery · Control · Understanding"
          value={mastery}
          color="#4F46E5"
          lowLabel="Reactive"
          avgLabel="Aware"
          highLabel="Sovereign"
        />
      </Stack>

      <Divider />

      {/* Emotion pairs */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", letterSpacing: 0.4, display: "block", mb: 1 }}>
          EMOTION PAIRS — Positive / Negative counterparts
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 0.75 }}>
          {PAIRS.map((pair, i) => (
            <EmotionPairRow key={i} pair={pair} />
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

/* ----------------------------------------------------- interactive */

function InteractiveMoodDisplay() {
  const [intensity, setIntensity] = React.useState(72);
  const [mastery, setMastery] = React.useState(68);

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={3}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 700 }}>Intensity: {intensity}</Typography>
          <Slider
            value={intensity}
            onChange={(_, v) => setIntensity(v as number)}
            min={0}
            max={100}
            size="small"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 700 }}>Mastery: {mastery}</Typography>
          <Slider
            value={mastery}
            onChange={(_, v) => setMastery(v as number)}
            min={0}
            max={100}
            size="small"
          />
        </Box>
      </Stack>
      <MoodDisplay intensity={intensity} mastery={mastery} />
    </Stack>
  );
}

/* ---------------------------------------------------------------- meta */

const meta: Meta = {
  title: "Character/Mood",
  parameters: {
    layout: "padded",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
};
export default meta;

type Story = StoryObj;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ p: 2, bgcolor: "#fff" }}>{children}</Box>
);

export const EmotionLandscape: Story = {
  name: "Emotion Landscape Map",
  render: () => (
    <Frame>
      <MoodDisplay intensity={72} mastery={68} />
    </Frame>
  ),
};

export const HighIntensityHighMastery: Story = {
  name: "High Intensity · High Mastery",
  render: () => (
    <Frame>
      <MoodDisplay intensity={88} mastery={85} />
    </Frame>
  ),
};

export const LowIntensityLowMastery: Story = {
  name: "Low Intensity · Low Mastery",
  render: () => (
    <Frame>
      <MoodDisplay intensity={25} mastery={22} />
    </Frame>
  ),
};

export const Interactive: Story = {
  name: "Interactive — Adjust Intensity & Mastery",
  render: () => (
    <Frame>
      <InteractiveMoodDisplay />
    </Frame>
  ),
};

export const EmotionPairs: Story = {
  name: "Positive / Negative Pairs",
  render: () => (
    <Frame>
      <Stack spacing={1.5} sx={{ maxWidth: 540 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Emotion Pairs</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
          Every positive emotion has a negative counterpart. The positive domain is wider — its highest
          states are largely undiscovered by most humans.
        </Typography>
        {PAIRS.map((pair, i) => (
          <EmotionPairRow key={i} pair={pair} />
        ))}
      </Stack>
    </Frame>
  ),
};
