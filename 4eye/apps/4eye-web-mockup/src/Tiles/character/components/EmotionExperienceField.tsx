"use client";

/**
 * EmotionExperienceField — living map of emotions (replaces the pie).
 *
 * Not a classic D3 bubble chart (static packed circles, position meaningless).
 * This is closer to a force-softened circumplex:
 *
 *   x = valence (− → +)     teaches the mood model
 *   y = arousal (low → high)
 *   radius ∝ √experience    area reads as weight
 *   ghost ring = previousLevel   shows change
 *   soft family gravity     Drive / Create / Relate / See / Regulate
 *   gentle motion           pulse + drift — not a frozen pack
 *
 * Click a node to select that emotion for inspect.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha } from "@mui/material";

import {
  EMOTION_FAMILY_META,
  emotionFamily,
  emotionMeta,
  type EmotionFamily,
} from "../model/emotions";
import {
  emotionExperienceDelta,
  emotionExperienceSlices,
  type EmotionExperience,
} from "../model/emotion-inspect";

type Node = {
  id: string;
  label: string;
  color: string;
  family: EmotionFamily;
  level: number;
  previousLevel: number;
  delta: number;
  note?: string;
  /** Target on the field (0–1). */
  tx: number;
  ty: number;
  /** Simulated position. */
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  prevR: number;
};

const FAMILY_ANCHOR: Record<EmotionFamily, { x: number; y: number }> = {
  drive: { x: 0.62, y: 0.18 },
  create: { x: 0.72, y: 0.42 },
  relate: { x: 0.78, y: 0.58 },
  see: { x: 0.22, y: 0.35 },
  regulate: { x: 0.55, y: 0.78 },
};

function valenceX(valence: "positive" | "negative"): number {
  return valence === "positive" ? 0.72 : 0.28;
}

function arousalY(arousal: number): number {
  return 1 - Math.min(1, Math.max(0, arousal / 100));
}

function buildNodes(width: number, height: number): Node[] {
  const pad = 28;
  const slices = emotionExperienceSlices();
  return slices.map((e: EmotionExperience) => {
    const meta = emotionMeta(e.emotionId);
    const family = emotionFamily(e.emotionId);
    const anchor = FAMILY_ANCHOR[family];
    const vx = valenceX(meta?.valence ?? "positive");
    const vy = arousalY(meta?.arousal ?? 50);
    // Blend circumplex target with family cluster — teaches axes AND groups.
    const tx = vx * 0.55 + anchor.x * 0.45;
    const ty = vy * 0.55 + anchor.y * 0.45;
    const r = 6 + Math.sqrt(Math.max(0, e.level)) * 1.35;
    const prevR = 6 + Math.sqrt(Math.max(0, e.previousLevel)) * 1.35;
    return {
      id: e.emotionId,
      label: meta?.label ?? e.emotionId,
      color: meta?.color ?? "#94a3b8",
      family,
      level: e.level,
      previousLevel: e.previousLevel,
      delta: emotionExperienceDelta(e.emotionId),
      note: e.note,
      tx,
      ty,
      x: pad + tx * (width - pad * 2),
      y: pad + ty * (height - pad * 2),
      vx: 0,
      vy: 0,
      r,
      prevR,
    };
  });
}

export function EmotionExperienceField({
  activeEmotionId,
  onSelect,
  width = 280,
  height = 220,
}: {
  activeEmotionId: string;
  onSelect?: (id: string) => void;
  width?: number;
  height?: number;
}) {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const nodesRef = React.useRef<Node[]>([]);
  const [tick, setTick] = React.useState(0);
  const [hover, setHover] = React.useState<string | null>(null);
  const t0 = React.useRef(performance.now());

  React.useEffect(() => {
    nodesRef.current = buildNodes(width, height);
    setTick((n) => n + 1);
  }, [width, height]);

  React.useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    const pad = 28;
    const step = (now: number) => {
      const nodes = nodesRef.current;
      const t = (now - t0.current) / 1000;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const targetX = pad + n.tx * (width - pad * 2);
        const targetY = pad + n.ty * (height - pad * 2);
        // Soft spring to target + tiny organic drift.
        const driftX = Math.sin(t * (0.7 + (i % 5) * 0.11) + i) * (1.2 + n.level / 80);
        const driftY = Math.cos(t * (0.55 + (i % 7) * 0.09) + i * 1.3) * (1.0 + n.level / 90);
        n.vx += (targetX + driftX - n.x) * 0.04;
        n.vy += (targetY + driftY - n.y) * 0.04;
        n.vx *= 0.86;
        n.vy *= 0.86;
        n.x += n.vx;
        n.y += n.vy;
      }

      // Light collide so leaders don't stack illegibly.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const min = a.r + b.r + 2;
          if (dist < min) {
            const push = ((min - dist) / dist) * 0.08;
            a.x -= dx * push;
            a.y -= dy * push;
            b.x += dx * push;
            b.y += dy * push;
          }
        }
      }

      setTick((n) => n + 1);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [width, height, reduceMotion]);

  const nodes = nodesRef.current;
  const active = nodes.find((n) => n.id === activeEmotionId) ?? nodes[0];
  const tip = hover ? nodes.find((n) => n.id === hover) : active;

  void tick;

  const families = (Object.keys(EMOTION_FAMILY_META) as EmotionFamily[]).map((f) => {
    const members = nodes.filter((n) => n.family === f);
    if (members.length === 0) return null;
    const cx = members.reduce((s, n) => s + n.x, 0) / members.length;
    const cy = members.reduce((s, n) => s + n.y, 0) / members.length;
    return { id: f, ...EMOTION_FAMILY_META[f], cx, cy };
  });

  return (
    <Stack sx={{ alignItems: "stretch", gap: 0.6, width, flexShrink: 0 }}>
      <Stack direction="row" sx={{ alignItems: "baseline", justifyContent: "space-between", gap: 1 }}>
        <Typography
          sx={{
            fontSize: "0.55rem",
            fontWeight: 800,
            letterSpacing: 0.7,
            color: "text.disabled",
            textTransform: "uppercase",
          }}
        >
          Emotion field
        </Typography>
        <Typography sx={{ fontSize: "0.52rem", color: "text.disabled", fontWeight: 600 }}>
          valence → · arousal ↑
        </Typography>
      </Stack>

      <Box
        sx={{
          position: "relative",
          width,
          height,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: alpha("#0f172a", 0.02),
          overflow: "hidden",
        }}
      >
        <svg width={width} height={height} role="img" aria-label="Emotion experience field">
          {/* Axis hints */}
          <line
            x1={16}
            y1={height - 14}
            x2={width - 16}
            y2={height - 14}
            stroke={alpha("#94a3b8", 0.35)}
            strokeWidth={1}
          />
          <line
            x1={14}
            y1={16}
            x2={14}
            y2={height - 16}
            stroke={alpha("#94a3b8", 0.35)}
            strokeWidth={1}
          />
          <text x={width - 18} y={height - 6} textAnchor="end" fill="#94a3b8" fontSize={8} fontWeight={700}>
            +
          </text>
          <text x={18} y={12} fill="#94a3b8" fontSize={8} fontWeight={700}>
            high
          </text>

          {/* Family soft labels */}
          {families.map(
            (f) =>
              f && (
                <text
                  key={f.id}
                  x={f.cx}
                  y={f.cy - 22}
                  textAnchor="middle"
                  fill={alpha(f.color, 0.55)}
                  fontSize={9}
                  fontWeight={800}
                  style={{ letterSpacing: "0.06em" }}
                >
                  {f.label.toUpperCase()}
                </text>
              ),
          )}

          {/* Previous-level ghosts (change) */}
          {nodes.map((n) => (
            <circle
              key={`${n.id}-ghost`}
              cx={n.x}
              cy={n.y}
              r={n.prevR}
              fill="none"
              stroke={alpha(n.color, 0.35)}
              strokeWidth={1.25}
              strokeDasharray={n.delta >= 0 ? "2 3" : "4 2"}
            />
          ))}

          {/* Live nodes */}
          {nodes.map((n) => {
            const isActive = n.id === activeEmotionId;
            const isHot = Math.abs(n.delta) >= 5 || n.level >= 85;
            const pulse =
              reduceMotion || !isHot
                ? 0
                : Math.sin((performance.now() - t0.current) / 280 + n.level) * 1.4;
            return (
              <g
                key={n.id}
                style={{ cursor: onSelect ? "pointer" : "default" }}
                onClick={() => onSelect?.(n.id)}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
              >
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r + (isActive ? 2 : 0) + pulse}
                  fill={alpha(n.color, isActive ? 0.92 : 0.55)}
                  stroke={n.color}
                  strokeWidth={isActive ? 2 : 1}
                  opacity={isActive || hover === n.id ? 1 : 0.78}
                />
                {n.level >= 80 ? (
                  <text
                    x={n.x}
                    y={n.y + 3}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={8}
                    fontWeight={800}
                    style={{ pointerEvents: "none" }}
                  >
                    {n.level}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </Box>

      {/* Readout under the field */}
      {tip ? (
        <Stack sx={{ gap: 0.15, minHeight: 36 }}>
          <Stack direction="row" sx={{ alignItems: "center", gap: 0.6, flexWrap: "wrap" }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: tip.color }} />
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, color: tip.color }}>
              {tip.label}
            </Typography>
            <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, color: "text.primary" }}>
              {tip.level}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.62rem",
                fontWeight: 800,
                color: tip.delta > 0 ? "#16a34a" : tip.delta < 0 ? "#dc2626" : "text.disabled",
              }}
            >
              {tip.delta > 0 ? `↑${tip.delta}` : tip.delta < 0 ? `↓${Math.abs(tip.delta)}` : "·"}
            </Typography>
            <Typography sx={{ fontSize: "0.55rem", fontWeight: 700, color: "text.disabled" }}>
              {EMOTION_FAMILY_META[tip.family].label}
            </Typography>
          </Stack>
          {tip.note ? (
            <Typography sx={{ fontSize: "0.6rem", color: "text.secondary", lineHeight: 1.35 }}>
              {tip.note}
            </Typography>
          ) : null}
        </Stack>
      ) : null}

      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.4 }}>
        {(Object.keys(EMOTION_FAMILY_META) as EmotionFamily[]).map((f) => (
          <Box
            key={f}
            sx={{
              px: 0.5,
              py: 0.15,
              borderRadius: 0.75,
              border: "1px solid",
              borderColor: alpha(EMOTION_FAMILY_META[f].color, 0.35),
              bgcolor: alpha(EMOTION_FAMILY_META[f].color, 0.06),
            }}
          >
            <Typography sx={{ fontSize: "0.5rem", fontWeight: 800, color: EMOTION_FAMILY_META[f].color }}>
              {EMOTION_FAMILY_META[f].label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
