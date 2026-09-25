"use client";

/**
 * FourWingCompanion — a self-contained port of the 4wings ("Counsellor Support")
 * companion robot from the ExpanseFrontend/apps/4wing brand-design package.
 *
 * The original is an inline SVG owl-like character (purple gradient body,
 * flapping translucent wings, glowing eyes, status light). Ported here with all
 * animation keyframes inlined so it carries no cross-repo or globals.css
 * dependency. Renders cleanly at small sizes via `scale`.
 */

import { Box } from "@mui/material";

export type CompanionExpression = "happy" | "calm" | "curious" | "excited";

interface FourWingCompanionProps {
  /** 0–1 render scale relative to the 200×240 base body. */
  scale?: number;
  /** Status-light color (device state). */
  statusColor?: string;
  expression?: CompanionExpression;
  animate?: boolean;
}

const BODY_COLOR = "#7C3AED";
const BODY_LIGHT = "#A78BFA";
const BODY_DARK = "#5B21B6";
const BLUSH = "#EC4899";

const BODY_W = 200;
const BODY_H = 240;
const ROUNDNESS = 45;
const EYE_SIZE = 36;
const EYE_SPACING = 50;
const PUPIL = 14;
const SMILE_W = 50;
const SMILE_H = 18;
const WING = 60;

export function FourWingCompanion({
  scale = 1,
  statusColor = "#3B82F6",
  expression = "happy",
  animate = true,
}: FourWingCompanionProps) {
  const eyeExpr =
    expression === "excited"
      ? { scaleY: 1.1, pupilOffset: 0 }
      : expression === "curious"
      ? { scaleY: 1, pupilOffset: 3 }
      : expression === "calm"
      ? { scaleY: 0.85, pupilOffset: 0 }
      : { scaleY: 1, pupilOffset: 0 };

  const w = (BODY_W + WING * 2) * scale;
  const h = (BODY_H + 40) * scale;

  const smile =
    expression === "calm"
      ? `M ${BODY_W / 2 - SMILE_W / 2} ${BODY_H * 0.58} Q ${BODY_W / 2} ${BODY_H * 0.58}, ${BODY_W / 2 + SMILE_W / 2} ${BODY_H * 0.58}`
      : expression === "excited"
      ? `M ${BODY_W / 2 - SMILE_W / 2} ${BODY_H * 0.55} Q ${BODY_W / 2} ${BODY_H * 0.55 + SMILE_H * 1.5}, ${BODY_W / 2 + SMILE_W / 2} ${BODY_H * 0.55}`
      : `M ${BODY_W / 2 - SMILE_W / 2} ${BODY_H * 0.55} Q ${BODY_W / 2} ${BODY_H * 0.55 + SMILE_H}, ${BODY_W / 2 + SMILE_W / 2} ${BODY_H * 0.55}`;

  return (
    <Box
      sx={{
        position: "relative",
        width: w,
        height: h,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "@keyframes fwFloat": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "@keyframes fwPulse": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.4 } },
        "@keyframes fwWingL": {
          "0%,100%": { transform: "rotate(-20deg) translateY(0)" },
          "50%": { transform: "rotate(-13deg) translateY(-6px)" },
        },
        "@keyframes fwWingR": {
          "0%,100%": { transform: "rotate(20deg) translateY(0)" },
          "50%": { transform: "rotate(13deg) translateY(-6px)" },
        },
        animation: animate ? "fwFloat 4s ease-in-out infinite" : "none",
      }}
    >
      <svg width={w} height={h} viewBox={`0 0 ${BODY_W + WING * 2} ${BODY_H + 40}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="fwBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={BODY_LIGHT} />
            <stop offset="50%" stopColor={BODY_COLOR} />
            <stop offset="100%" stopColor={BODY_DARK} />
          </linearGradient>
          <linearGradient id="fwWing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={BODY_LIGHT} stopOpacity="0.8" />
            <stop offset="100%" stopColor={BODY_COLOR} stopOpacity="0.4" />
          </linearGradient>
          <filter id="fwGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="fwShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor={BODY_COLOR} floodOpacity="0.3" />
          </filter>
        </defs>

        <g transform={`translate(${WING}, 40)`}>
          {/* Wings */}
          <ellipse
            cx={-WING * 0.3}
            cy={BODY_H * 0.5}
            rx={WING}
            ry={WING * 0.6}
            fill="url(#fwWing)"
            transform={`rotate(-20, ${-WING * 0.3}, ${BODY_H * 0.5})`}
            style={{ transformOrigin: `${-WING * 0.3}px ${BODY_H * 0.5}px`, animation: animate ? "fwWingL 2s ease-in-out infinite" : "none" }}
          />
          <ellipse
            cx={BODY_W + WING * 0.3}
            cy={BODY_H * 0.5}
            rx={WING}
            ry={WING * 0.6}
            fill="url(#fwWing)"
            transform={`rotate(20, ${BODY_W + WING * 0.3}, ${BODY_H * 0.5})`}
            style={{ transformOrigin: `${BODY_W + WING * 0.3}px ${BODY_H * 0.5}px`, animation: animate ? "fwWingR 2s ease-in-out infinite" : "none" }}
          />

          {/* Ears */}
          <ellipse cx={BODY_W * 0.25} cy={-10} rx={18} ry={25} fill={BODY_LIGHT} transform={`rotate(-15, ${BODY_W * 0.25}, -10)`} />
          <ellipse cx={BODY_W * 0.75} cy={-10} rx={18} ry={25} fill={BODY_LIGHT} transform={`rotate(15, ${BODY_W * 0.75}, -10)`} />

          {/* Body */}
          <rect x="0" y="0" width={BODY_W} height={BODY_H} rx={ROUNDNESS} ry={ROUNDNESS} fill="url(#fwBody)" filter="url(#fwShadow)" stroke={BODY_LIGHT} strokeWidth="2" strokeOpacity="0.3" />
          <ellipse cx={BODY_W / 2} cy={BODY_H * 0.65} rx={BODY_W * 0.35} ry={BODY_H * 0.25} fill={BODY_LIGHT} opacity="0.15" />

          {/* Eyes */}
          <g transform={`translate(${BODY_W / 2}, ${BODY_H * 0.35})`}>
            {[-1, 1].map((side) => (
              <g key={side} transform={`translate(${(side * EYE_SPACING) / 2}, 0) scale(1, ${eyeExpr.scaleY})`}>
                <circle cx="0" cy="0" r={EYE_SIZE / 2} fill="#FFFFFF" filter="url(#fwGlow)" />
                <circle cx={eyeExpr.pupilOffset} cy={eyeExpr.pupilOffset} r={PUPIL / 2} fill={BODY_DARK} />
                <circle cx={-PUPIL * 0.3} cy={-PUPIL * 0.3} r={PUPIL * 0.25} fill="#FFFFFF" />
              </g>
            ))}
          </g>

          {/* Smile */}
          <path d={smile} stroke="rgba(255,255,255,0.85)" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Blush */}
          <ellipse cx={BODY_W * 0.2} cy={BODY_H * 0.5} rx={15} ry={8} fill={BLUSH} opacity="0.2" />
          <ellipse cx={BODY_W * 0.8} cy={BODY_H * 0.5} rx={15} ry={8} fill={BLUSH} opacity="0.2" />

          {/* Status light */}
          <circle cx={BODY_W * 0.85} cy={BODY_H * 0.12} r={8} fill={statusColor} filter="url(#fwGlow)" style={{ animation: animate ? "fwPulse 2s ease-in-out infinite" : "none" }} />
        </g>
      </svg>
    </Box>
  );
}
