"use client";
/**
 * Scoring — interactive Storybook for `@expanse/scoring`.
 *
 * - Playground:        live sliders → Learn / Earn / Compete / Mastery breakdown.
 * - Variant comparison: one input scored across every variant.
 * - Normalizer curves:  linear / log / sigmoid mapping visualized.
 */
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  COMPETE_SIGNAL_KEYS,
  COMPETE_SIGNAL_META,
  REWARD_SIGNAL_KEYS,
  REWARD_SIGNAL_META,
  SAMPLE_PROFILES,
  SCORING_VARIANT_LIST,
  computeScores,
  getScoringVariant,
  normalize,
  useScoring,
} from "@expanse/scoring";
import type {
  CompeteSignalKey,
  NormalizerKind,
  RewardSignalKey,
  ScoringInput,
  ScoringVariantId,
} from "@expanse/scoring";
import {
  ContributionList,
  ResultCard,
  THEME_COLOR,
} from "./ScoreVisualizers";

const WHITE_BG = {
  backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
};

// Per-signal slider maxima derived from the (shared) balanced normalizers.
const NORM = getScoringVariant("balanced").normalizers;

function signalMax(kind: "reward" | "compete", key: string): number {
  const cfg =
    kind === "reward"
      ? NORM.reward[key as RewardSignalKey]
      : NORM.compete[key as CompeteSignalKey];
  return cfg.max ?? 100;
}

// ─────────────────────────────────────────────────────────────────────────────
// Playground
// ─────────────────────────────────────────────────────────────────────────────

function Playground() {
  const [variantId, setVariantId] = React.useState<ScoringVariantId>("balanced");
  const [input, setInput] = React.useState<ScoringInput>(SAMPLE_PROFILES[0].input);

  const result = useScoring(input, variantId);
  const variant = getScoringVariant(variantId);

  const setReward = (key: RewardSignalKey, v: number) =>
    setInput((prev) => ({ ...prev, reward: { ...prev.reward, [key]: v } }));
  const setCompete = (key: CompeteSignalKey, v: number) =>
    setInput((prev) => ({ ...prev, compete: { ...prev.compete, [key]: v } }));
  const setMastery = (v: number) => setInput((prev) => ({ ...prev, mastery: v }));

  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", maxWidth: 980, p: 1 }}>
      {/* Controls */}
      <Box sx={{ flex: "1 1 440px", minWidth: 360 }}>
        <Typography variant="overline" color="text.secondary">
          Variant
        </Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={variantId}
          onChange={(_, v) => v && setVariantId(v)}
          sx={{ mb: 1, flexWrap: "wrap" }}
        >
          {SCORING_VARIANT_LIST.map((v) => (
            <ToggleButton key={v.id} value={v.id} sx={{ textTransform: "none" }}>
              {v.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Box sx={{ mb: 1 }}>
          <Typography variant="overline" color="text.secondary">
            Sample profiles
          </Typography>
          <ToggleButtonGroup size="small" exclusive sx={{ flexWrap: "wrap", display: "flex" }}>
            {SAMPLE_PROFILES.map((p) => (
              <ToggleButton
                key={p.id}
                value={p.id}
                onClick={() => setInput(p.input)}
                sx={{ textTransform: "none" }}
              >
                {p.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Typography variant="overline" color="text.secondary">
          Earn signals
        </Typography>
        {REWARD_SIGNAL_KEYS.map((key) => (
          <SignalSlider
            key={key}
            label={REWARD_SIGNAL_META[key].label}
            help={REWARD_SIGNAL_META[key].description}
            value={input.reward[key]}
            max={signalMax("reward", key)}
            onChange={(v) => setReward(key, v)}
          />
        ))}

        <Typography variant="overline" color="text.secondary">
          Compete signals
        </Typography>
        {COMPETE_SIGNAL_KEYS.map((key) => (
          <SignalSlider
            key={key}
            label={COMPETE_SIGNAL_META[key].label}
            help={COMPETE_SIGNAL_META[key].description}
            value={input.compete[key]}
            max={signalMax("compete", key)}
            onChange={(v) => setCompete(key, v)}
          />
        ))}

        <Typography variant="overline" color="text.secondary">
          Mastery
        </Typography>
        <SignalSlider
          label="Mastery"
          help="Direct mastery (completed lessons / skills)"
          value={input.mastery ?? 0}
          max={100}
          onChange={setMastery}
        />
      </Box>

      {/* Result */}
      <Box sx={{ flex: "1 1 300px", minWidth: 280 }}>
        <ResultCard result={result} theme={variant.theme} title={`${variant.label} — live score`} />
        <Box sx={{ mt: 2 }}>
          <ContributionList
            title="Earn breakdown"
            contributions={result.earn.contributions}
            labelFor={(k) => REWARD_SIGNAL_META[k as RewardSignalKey]?.label ?? k}
          />
          <ContributionList
            title="Compete breakdown"
            contributions={result.compete.contributions}
            labelFor={(k) => COMPETE_SIGNAL_META[k as CompeteSignalKey]?.label ?? k}
          />
          <ContributionList title="Learn blend" contributions={result.learnContributions} />
        </Box>
      </Box>
    </Box>
  );
}

function SignalSlider({
  label,
  help,
  value,
  max,
  onChange,
}: {
  label: string;
  help: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <Box sx={{ mb: 0.5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" title={help}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>
          {Math.round(value)} / {max}
        </Typography>
      </Box>
      <Slider
        size="small"
        value={value}
        max={max}
        min={0}
        onChange={(_, v) => onChange(v as number)}
      />
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant comparison
// ─────────────────────────────────────────────────────────────────────────────

function VariantComparison() {
  const [input, setInput] = React.useState<ScoringInput>(SAMPLE_PROFILES[0].input);
  return (
    <Box sx={{ p: 1, maxWidth: 1100 }}>
      <Typography variant="overline" color="text.secondary">
        Sample profile (scored under every variant)
      </Typography>
      <ToggleButtonGroup size="small" exclusive sx={{ mb: 2, flexWrap: "wrap", display: "flex" }}>
        {SAMPLE_PROFILES.map((p) => (
          <ToggleButton
            key={p.id}
            value={p.id}
            onClick={() => setInput(p.input)}
            sx={{ textTransform: "none" }}
          >
            {p.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {SCORING_VARIANT_LIST.map((v) => (
          <ResultCard
            key={v.id}
            result={computeScores(input, v)}
            theme={v.theme}
            title={v.label}
          />
        ))}
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Normalizer curves
// ─────────────────────────────────────────────────────────────────────────────

function NormalizerCurves() {
  const max = 100;
  const kinds: Array<{ kind: NormalizerKind; color: string; label: string }> = [
    { kind: "linear", color: "#5b6cff", label: "linear" },
    { kind: "log", color: "#1f9d55", label: "log (diminishing returns)" },
    { kind: "sigmoid", color: "#f5a623", label: "sigmoid (threshold)" },
  ];
  const W = 360;
  const H = 220;
  const pad = 28;

  const points = (kind: NormalizerKind) =>
    Array.from({ length: 51 }, (_, i) => {
      const x = (i / 50) * max;
      const y = normalize(x, { kind, max, k: 0.12, midpoint: max / 2 });
      const px = pad + (x / max) * (W - pad * 2);
      const py = H - pad - y * (H - pad * 2);
      return `${px},${py}`;
    }).join(" ");

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Raw value → normalized [0,1] (max = {max})
      </Typography>
      <Box
        component="svg"
        width={W}
        height={H}
        sx={{ background: "#fafafa", border: "1px solid #e6e6ee", borderRadius: 2 }}
      >
        {/* axes */}
        <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="#ccc" />
        <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="#ccc" />
        {kinds.map((k) => (
          <polyline key={k.kind} fill="none" stroke={k.color} strokeWidth={2.5} points={points(k.kind)} />
        ))}
      </Box>
      <Box sx={{ mt: 1.5 }}>
        {kinds.map((k) => (
          <Box key={k.kind} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Box sx={{ width: 18, height: 4, borderRadius: 2, background: k.color }} />
            <Typography variant="body2">{k.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Scoring/Playground",
  parameters: {
    ...WHITE_BG,
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Interactive demos for `@expanse/scoring` — the Learn / Earn / Compete engine. " +
          "All math comes from the pure package; these views only render its output.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const EnginePlayground: Story = {
  name: "Engine playground",
  render: () => <Playground />,
};

export const VariantComparisonStory: Story = {
  name: "Variant comparison",
  render: () => <VariantComparison />,
};

export const NormalizerCurvesStory: Story = {
  name: "Normalizer curves",
  render: () => <NormalizerCurves />,
};
