"use client"

/**
 * HudControllerSvg — Alternate "HUD panel" controller layout.
 *
 * Anatomy:
 *   Left Eye  ───  Center Square  ───  Right Eye
 *
 *   Left & Right Eyes: almond/lens shapes housing an iris + pupil. The
 *   visual language comes from the existing center-screen gem on
 *   ControllerSvg — the gem becomes a pair of eyes flanking the panel.
 *
 *   Center Square: 50×50 panel with HUD corner brackets. Four face
 *   buttons arranged in a diamond (top/right/bottom/left).
 *
 *   Connectors: thin dashed lines with tick marks bridge the eyes to
 *   the square, giving a "heads-up display" readout feel.
 *
 * buttonStyle:
 *   "shapes"  — △ ○ + ▢ geometric symbols (matching ControllerSvg)
 *   "branded" — Mind / Body / Love/Heal / Chat icons
 *
 * Exposes the same ControllerSvgHandle imperative API so it can be
 * driven by the same GSAP animation helpers as ControllerSvg.
 */

import React, { forwardRef, useImperativeHandle, useState } from "react"
import type { ControllerPalette, ControllerSvgHandle, ButtonStyle } from "./ControllerSvg"
import { DEFAULT_CONTROLLER_PALETTE, BUTTON_COLORS } from "./ControllerSvg"

export const HUD_W = 220
export const HUD_H = 80

// ── Eye geometry ──────────────────────────────────────────────────
const L_EYE_CX = 38
const R_EYE_CX = 182
const EYE_CY = 40
// Almond path: left-tip Q top-apex right-tip Q bottom-apex close
const lEyePath = "M 12,40 Q 38,26 64,40 Q 38,54 12,40 Z"
const rEyePath = "M 156,40 Q 182,26 208,40 Q 182,54 156,40 Z"
const EYE_IRIS_R = 9.5
const EYE_PUPIL_R = 3.8

// ── Center square ─────────────────────────────────────────────────
const SQ_X = 85, SQ_Y = 15, SQ_W = 50, SQ_H = 50
const SQ_CX = 110, SQ_CY = 40

// ── Button diamond (radius from square center) ─────────────────────
const BTN_R_DIST = 15 // px from square center to each button center
const HUD_FACE_BUTTONS = [
  { cx: SQ_CX,             cy: SQ_CY - BTN_R_DIST }, // 0 top    — Mind / △
  { cx: SQ_CX + BTN_R_DIST, cy: SQ_CY             }, // 1 right  — Body / ○
  { cx: SQ_CX,             cy: SQ_CY + BTN_R_DIST }, // 2 bottom — Love / ✕
  { cx: SQ_CX - BTN_R_DIST, cy: SQ_CY             }, // 3 left   — Chat / ▢
] as const

// ── Button labels ─────────────────────────────────────────────────
const BRANDED_LABELS = ["Mind", "Body", "Love", "Chat"] as const
const SHAPE_LABELS    = ["Improve (△)", "Heal (○)", "Protect (✕)", "Win (▢)"] as const

// ─────────────────────────────────────────────────────────────────
// Branded micro-icons (same as ControllerSvg)
// ─────────────────────────────────────────────────────────────────
function BrandedButtonIcon({ index, cx, cy }: { index: number; cx: number; cy: number }) {
  switch (index) {
    case 0: // Mind — two-lobe brain
      return (
        <g transform={`translate(${cx},${cy})`} fill="none" stroke="white" strokeWidth={0.9} strokeLinecap="round" strokeLinejoin="round" opacity={0.92}>
          <path d="M0,-0.5 C0,-3.2 -3.8,-3.8 -3.8,-1.8 C-4.5,-1.5 -4.5,0.8 -3,1.2 C-3,2.8 -1,3.2 0,2.4" />
          <path d="M0,-0.5 C0,-3.2 3.8,-3.8 3.8,-1.8 C4.5,-1.5 4.5,0.8 3,1.2 C3,2.8 1,3.2 0,2.4" />
          <line x1="0" y1="0" x2="0" y2="2.4" strokeWidth={0.7} />
        </g>
      )
    case 1: // Body — human figure
      return (
        <g transform={`translate(${cx},${cy})`} fill="white" stroke="white" strokeLinecap="round" opacity={0.92}>
          <circle cx={0} cy={-2.8} r={1.3} fill="white" stroke="none" />
          <line x1={0} y1={-1.5} x2={0} y2={1.2} strokeWidth={1.1} />
          <line x1={-2.2} y1={-0.3} x2={2.2} y2={-0.3} strokeWidth={1.0} />
          <line x1={0} y1={1.2} x2={-1.6} y2={3.4} strokeWidth={1.0} />
          <line x1={0} y1={1.2} x2={1.6} y2={3.4} strokeWidth={1.0} />
        </g>
      )
    case 2: // Love/Heal — heart
      return (
        <g transform={`translate(${cx},${cy})`} opacity={0.92}>
          <path
            d="M0,2.2 C-0.4,1.6 -3.4,-0.2 -3.4,-1.8 C-3.4,-3.3 -1.4,-3.8 0,-2.2 C1.4,-3.8 3.4,-3.3 3.4,-1.8 C3.4,-0.2 0.4,1.6 0,2.2 Z"
            fill="white"
          />
        </g>
      )
    case 3: // Chat — speech bubble
      return (
        <g transform={`translate(${cx},${cy})`} opacity={0.92}>
          <rect x={-3.2} y={-3.2} width={6.4} height={4.8} rx={1.3} fill="none" stroke="white" strokeWidth={1.1} />
          <path d="M -1.4,1.6 L -0.4,3.2 L 1.2,1.6 Z" fill="white" />
        </g>
      )
    default:
      return null
  }
}

// ─────────────────────────────────────────────────────────────────
// HUD Corner bracket helper
// ─────────────────────────────────────────────────────────────────
function HudCornerBracket({
  x, y, flipH, flipV, color, size = 7,
}: {
  x: number; y: number; flipH?: boolean; flipV?: boolean; color: string; size?: number
}) {
  const sx = flipH ? -1 : 1
  const sy = flipV ? -1 : 1
  return (
    <g transform={`translate(${x},${y}) scale(${sx},${sy})`}>
      {/* Horizontal arm */}
      <line x1={0} y1={0} x2={size} y2={0} stroke={color} strokeWidth={1.2} strokeLinecap="square" />
      {/* Vertical arm */}
      <line x1={0} y1={0} x2={0} y2={size} stroke={color} strokeWidth={1.2} strokeLinecap="square" />
    </g>
  )
}

// ─────────────────────────────────────────────────────────────────
// Connector tick marks
// ─────────────────────────────────────────────────────────────────
function ConnectorTicks({ x1, x2, y, color }: { x1: number; x2: number; y: number; color: string }) {
  const mid = (x1 + x2) / 2
  const ticks = [x1 + 4, mid, x2 - 4]
  return (
    <>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth={0.5} opacity={0.4} strokeDasharray="2 2" />
      {ticks.map((tx, i) => (
        <line key={i} x1={tx} y1={y - 2.5} x2={tx} y2={y + 2.5} stroke={color} strokeWidth={0.8} opacity={0.6} />
      ))}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────
interface HudControllerSvgProps {
  className?: string
  style?: React.CSSProperties
  palette?: Partial<ControllerPalette>
  buttonStyle?: ButtonStyle
}

// ─────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────
export const HudControllerSvg = forwardRef<ControllerSvgHandle, HudControllerSvgProps>(
  function HudControllerSvg({ className, style, palette, buttonStyle = "shapes" }, ref) {
    const id = React.useId()
    const [pressedButton, setPressedButton] = useState(-1)
    const p: ControllerPalette = { ...DEFAULT_CONTROLLER_PALETTE, ...palette }

    useImperativeHandle(ref, () => ({
      pressButton: (idx: number) => setPressedButton(idx),
      releaseButton: () => setPressedButton(-1),
    }))

    const buttonColors = p.buttonColors ?? [BUTTON_COLORS[0], BUTTON_COLORS[1], BUTTON_COLORS[2], BUTTON_COLORS[3]]
    const labels = buttonStyle === "branded" ? BRANDED_LABELS : SHAPE_LABELS

    return (
      <svg
        width={HUD_W}
        height={HUD_H}
        viewBox={`0 0 ${HUD_W} ${HUD_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        aria-label="HUD Mind Controller — Mind · Body · Love · Chat"
        role="img"
      >
        <defs>
          {/* Eye iris gradient */}
          <radialGradient id={`${id}-iris`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor={p.screenStart} stopOpacity="0.55" />
            <stop offset="100%" stopColor={p.screenEnd} stopOpacity="0.25" />
          </radialGradient>
          {/* Square panel fill */}
          <linearGradient id={`${id}-sq`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.bodyStart} />
            <stop offset="100%" stopColor={p.bodyEnd} />
          </linearGradient>
          {/* Panel screen gradient */}
          <linearGradient id={`${id}-panel-screen`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.screenStart} stopOpacity="0.12" />
            <stop offset="100%" stopColor={p.screenEnd} stopOpacity="0.06" />
          </linearGradient>
          {/* Drop shadow */}
          <filter id={`${id}-shadow`} x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={p.shadowColor} floodOpacity="0.14" />
          </filter>
          {/* Glow for pressed button */}
          <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Eye clip paths */}
          <clipPath id={`${id}-l-eye-clip`}>
            <path d={lEyePath} />
          </clipPath>
          <clipPath id={`${id}-r-eye-clip`}>
            <path d={rEyePath} />
          </clipPath>
          {/* Square clip */}
          <clipPath id={`${id}-sq-clip`}>
            <rect x={SQ_X} y={SQ_Y} width={SQ_W} height={SQ_H} rx={5} />
          </clipPath>
        </defs>

        {/* ── LEFT EYE ── */}
        <g filter={`url(#${id}-shadow)`}>
          <path d={lEyePath} fill={p.bodyStart} stroke={p.stroke} strokeWidth={1} />
        </g>
        {/* Eye contents clipped to lens */}
        <g clipPath={`url(#${id}-l-eye-clip)`}>
          {/* Scan lines */}
          {[-4, -1, 2, 5].map((dy) => (
            <line key={dy} x1={10} y1={EYE_CY + dy} x2={66} y2={EYE_CY + dy}
              stroke={p.screenRing} strokeWidth={0.35} opacity={0.3} />
          ))}
          {/* Iris */}
          <circle cx={L_EYE_CX} cy={EYE_CY} r={EYE_IRIS_R} fill={`url(#${id}-iris)`} />
          <circle cx={L_EYE_CX} cy={EYE_CY} r={EYE_IRIS_R} fill="none" stroke={p.screenRing} strokeWidth={0.8} opacity={0.6} />
          {/* Pupil */}
          <circle cx={L_EYE_CX} cy={EYE_CY} r={EYE_PUPIL_R} fill={p.screenDot} opacity={0.75} />
          {/* Highlight */}
          <circle cx={L_EYE_CX - 2.5} cy={EYE_CY - 2.5} r={1.8} fill="white" opacity={0.45} />
        </g>
        {/* Eye outline on top */}
        <path d={lEyePath} fill="none" stroke={p.stroke} strokeWidth={1} />

        {/* ── RIGHT EYE ── */}
        <g filter={`url(#${id}-shadow)`}>
          <path d={rEyePath} fill={p.bodyStart} stroke={p.stroke} strokeWidth={1} />
        </g>
        <g clipPath={`url(#${id}-r-eye-clip)`}>
          {[-4, -1, 2, 5].map((dy) => (
            <line key={dy} x1={154} y1={EYE_CY + dy} x2={210} y2={EYE_CY + dy}
              stroke={p.screenRing} strokeWidth={0.35} opacity={0.3} />
          ))}
          <circle cx={R_EYE_CX} cy={EYE_CY} r={EYE_IRIS_R} fill={`url(#${id}-iris)`} />
          <circle cx={R_EYE_CX} cy={EYE_CY} r={EYE_IRIS_R} fill="none" stroke={p.screenRing} strokeWidth={0.8} opacity={0.6} />
          <circle cx={R_EYE_CX} cy={EYE_CY} r={EYE_PUPIL_R} fill={p.screenDot} opacity={0.75} />
          <circle cx={R_EYE_CX - 2.5} cy={EYE_CY - 2.5} r={1.8} fill="white" opacity={0.45} />
        </g>
        <path d={rEyePath} fill="none" stroke={p.stroke} strokeWidth={1} />

        {/* ── CONNECTORS (eye → square) ── */}
        <ConnectorTicks x1={64} x2={SQ_X} y={EYE_CY} color={p.accentStroke} />
        <ConnectorTicks x1={SQ_X + SQ_W} x2={156} y={EYE_CY} color={p.accentStroke} />

        {/* ── CENTER SQUARE PANEL ── */}
        <rect x={SQ_X} y={SQ_Y} width={SQ_W} height={SQ_H} rx={5}
          fill={`url(#${id}-sq)`} stroke={p.stroke} strokeWidth={1.2}
          filter={`url(#${id}-shadow)`} />
        {/* Panel screen tint */}
        <rect x={SQ_X} y={SQ_Y} width={SQ_W} height={SQ_H} rx={5}
          fill={`url(#${id}-panel-screen)`} />

        {/* Scan lines on panel (clipped) */}
        <g clipPath={`url(#${id}-sq-clip)`} opacity={0.18}>
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1={SQ_X} y1={SQ_Y + i * 5.5} x2={SQ_X + SQ_W} y2={SQ_Y + i * 5.5}
              stroke={p.screenRing} strokeWidth={0.4} />
          ))}
        </g>

        {/* HUD corner brackets */}
        <HudCornerBracket x={SQ_X + 3}        y={SQ_Y + 3}        color={p.accentStroke} />
        <HudCornerBracket x={SQ_X + SQ_W - 3} y={SQ_Y + 3}        color={p.accentStroke} flipH />
        <HudCornerBracket x={SQ_X + 3}        y={SQ_Y + SQ_H - 3} color={p.accentStroke} flipV />
        <HudCornerBracket x={SQ_X + SQ_W - 3} y={SQ_Y + SQ_H - 3} color={p.accentStroke} flipH flipV />

        {/* Center dot marker */}
        <circle cx={SQ_CX} cy={SQ_CY} r={1.5} fill={p.screenDot} opacity={0.4} />

        {/* Diamond connector lines between buttons (faint cross hair) */}
        <line x1={HUD_FACE_BUTTONS[3].cx} y1={SQ_CY} x2={HUD_FACE_BUTTONS[1].cx} y2={SQ_CY}
          stroke={p.accentStroke} strokeWidth={0.4} opacity={0.3} />
        <line x1={SQ_CX} y1={HUD_FACE_BUTTONS[0].cy} x2={SQ_CX} y2={HUD_FACE_BUTTONS[2].cy}
          stroke={p.accentStroke} strokeWidth={0.4} opacity={0.3} />

        {/* ── FACE BUTTONS ── */}
        {HUD_FACE_BUTTONS.map((btn, i) => {
          const isPressed = pressedButton === i
          const r = isPressed ? 5.5 : 6
          const color = buttonColors[i]

          return (
            <g key={i} filter={isPressed ? `url(#${id}-glow)` : undefined}>
              {isPressed && (
                <circle cx={btn.cx} cy={btn.cy} r={9.5} fill={color} opacity={0.18} />
              )}
              <circle cx={btn.cx} cy={btn.cy} r={r} fill={color} opacity={isPressed ? 1 : 0.92} />
              {/* Inner highlight */}
              <circle cx={btn.cx} cy={btn.cy - 1.5} r={r * 0.44} fill="white" opacity={0.22} />
              {/* Icon */}
              {buttonStyle === "shapes" ? (
                <>
                  {i === 0 && (
                    <polygon
                      points={`${btn.cx},${btn.cy - 3.5} ${btn.cx + 3},${btn.cy + 2.5} ${btn.cx - 3},${btn.cy + 2.5}`}
                      fill="white" opacity={0.92}
                    />
                  )}
                  {i === 1 && (
                    <circle cx={btn.cx} cy={btn.cy} r={2.5} fill="none" stroke="white" strokeWidth={1.3} opacity={0.92} />
                  )}
                  {i === 2 && (
                    <>
                      <line x1={btn.cx - 2.6} y1={btn.cy} x2={btn.cx + 2.6} y2={btn.cy} stroke="white" strokeWidth={1.5} strokeLinecap="round" opacity={0.95} />
                      <line x1={btn.cx} y1={btn.cy - 2.6} x2={btn.cx} y2={btn.cy + 2.6} stroke="white" strokeWidth={1.5} strokeLinecap="round" opacity={0.95} />
                    </>
                  )}
                  {i === 3 && (
                    <rect x={btn.cx - 2.4} y={btn.cy - 2.4} width={4.8} height={4.8} rx={0.6} fill="none" stroke="white" strokeWidth={1.3} opacity={0.92} />
                  )}
                </>
              ) : (
                <BrandedButtonIcon index={i} cx={btn.cx} cy={btn.cy} />
              )}
              {/* Button label (tiny, below/above for top/bottom buttons) */}
              <text
                x={btn.cx}
                y={i === 0 ? btn.cy - 9 : i === 2 ? btn.cy + 11.5 : i === 1 ? btn.cy + 0.5 : btn.cy + 0.5}
                textAnchor={i === 1 ? "start" : i === 3 ? "end" : "middle"}
                dx={i === 1 ? 8.5 : i === 3 ? -8.5 : 0}
                fontSize={4.5}
                fill={p.screenDot}
                opacity={0.55}
                fontFamily="system-ui, sans-serif"
                dominantBaseline={i === 0 ? "auto" : i === 2 ? "hanging" : "middle"}
              >
                {labels[i]}
              </text>
            </g>
          )
        })}
      </svg>
    )
  },
)
