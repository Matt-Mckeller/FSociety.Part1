"use client"

/**
 * ControllerSvg — Mind Controller graphic for the Control slide.
 *
 * Anatomy:
 *   - Body: rounded gamepad silhouette with left/right grips
 *   - Screen: mini XP/coin display in the center
 *   - D-pad: 4 small squares (references Symbol-Grid nav)
 *   - Face buttons: △ ○ ✕ ▢ using brand shape primitives
 *     △ = improve/violet, ○ = heal/teal, ✕ = protect/amber, ▢ = win/indigo
 *   - L/R bumpers (decorative)
 *
 * The `pressedButton` prop (0–3) visually depresses one face button.
 * Parent drives this from the GSAP timeline.
 */

import React, { forwardRef, useImperativeHandle, useRef, useState } from "react"

export const CTRL_W = 120
export const CTRL_H = 72

/** Map button index → brand color (default production palette). */
export const BUTTON_COLORS = [
  "#8b5cf6", // 0 △ improve/violet
  "#14b8a6", // 1 ○ heal/teal
  "#f59e0b", // 2 ✕ protect/amber
  "#6366f1", // 3 ▢ win/indigo
] as const

/** Map button index → shape label for aria */
export const BUTTON_LABELS = ["Improve (△)", "Heal (○)", "Protect (✕)", "Win (▢)"] as const

/**
 * Visual tokens for the controller body, accents, screen, and face
 * buttons. All fields are optional on the prop surface; missing fields
 * fall back to `DEFAULT_CONTROLLER_PALETTE`.
 */
export interface ControllerPalette {
  bodyStart: string
  bodyEnd: string
  stroke: string
  accent: string
  accentStroke: string
  accentSoft: string
  screenStart: string
  screenEnd: string
  screenRing: string
  screenDot: string
  shadowColor: string
  buttonColors: readonly [string, string, string, string]
}

export const DEFAULT_CONTROLLER_PALETTE: ControllerPalette = {
  bodyStart: "#f0f4ff",
  bodyEnd: "#dde3f0",
  stroke: "#c7d2fe",
  accent: "#c7d2fe",
  accentStroke: "#a5b4fc",
  accentSoft: "#e0e7ff",
  screenStart: "#6366f1",
  screenEnd: "#8b5cf6",
  screenRing: "#818cf8",
  screenDot: "#6366f1",
  shadowColor: "#6366f1",
  buttonColors: [BUTTON_COLORS[0], BUTTON_COLORS[1], BUTTON_COLORS[2], BUTTON_COLORS[3]],
}

/** Imperative handle exposed to parent via ref. */
export interface ControllerSvgHandle {
  /** Visually depress face button at index 0-3. */
  pressButton: (idx: number) => void
  /** Release all pressed buttons. */
  releaseButton: () => void
}

export type ButtonStyle = "shapes" | "branded"

/**
 * Branded icon set — all four buttons show an "awakening third eye / letter-1"
 * icon: a narrow vertical eye (outer oval + lash curves + iris dot) centered on
 * the button.  Each case gets a subtle variant so they remain visually distinct
 * while sharing the same core glyph language.
 *
 * 0 = top    — pure eye, straight lashes (Improve · awaken)
 * 1 = right  — eye with upward-radiating rays (Body · illuminate)
 * 2 = bottom — eye with downward tear-drop (Heal · compassion)
 * 3 = left   — eye with surrounding orbit ring (Win · focus)
 */
function BrandedButtonIcon({ index, cx, cy }: { index: number; cx: number; cy: number }) {
  const x = cx, y = cy

  // Shared core: narrow vertical eye resembling "1" — outer oval, lash arcs, iris, pupil
  function EyeCore({ extraTop = 0, extraBottom = 0 }: { extraTop?: number; extraBottom?: number }) {
    return (
      <g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" opacity={0.95}>
        {/* Outer eye oval — slightly taller than wide, like the digit 1 */}
        <ellipse cx={0} cy={0} rx={2.2} ry={3.5 + extraTop * 0.5} stroke="white" strokeWidth={1.0} />
        {/* Upper lash arc */}
        <path d={`M -2.2,${-0 + extraTop * 0.2} C -1.4,${-3.8 - extraTop} 1.4,${-3.8 - extraTop} 2.2,${-0 + extraTop * 0.2}`} strokeWidth={0.9} />
        {/* Lower lash arc */}
        <path d={`M -2.2,${0 - extraBottom * 0.2} C -1.4,${3.8 + extraBottom} 1.4,${3.8 + extraBottom} 2.2,${0 - extraBottom * 0.2}`} strokeWidth={0.9} />
        {/* Iris */}
        <circle cx={0} cy={0} r={1.4} stroke="white" strokeWidth={0.8} />
        {/* Pupil dot */}
        <circle cx={0} cy={0} r={0.55} fill="white" stroke="none" />
      </g>
    )
  }

  switch (index) {
    case 0: // Improve — pure awakening eye, clean lashes
      return (
        <g transform={`translate(${x},${y})`}>
          <EyeCore />
        </g>
      )
    case 1: // Illuminate — eye with three upward rays
      return (
        <g transform={`translate(${x},${y})`}>
          <EyeCore />
          <g stroke="white" strokeWidth={0.75} strokeLinecap="round" opacity={0.85}>
            <line x1={0}    y1={-4.2} x2={0}    y2={-5.2} />
            <line x1={1.5}  y1={-3.9} x2={2.0}  y2={-4.7} />
            <line x1={-1.5} y1={-3.9} x2={-2.0} y2={-4.7} />
          </g>
        </g>
      )
    case 2: // Compassion — eye with a single tear drop below
      return (
        <g transform={`translate(${x},${y})`}>
          <EyeCore />
          {/* Tear drop */}
          <path d="M 0,4.2 C -0.6,5.0 -0.6,5.8 0,5.8 C 0.6,5.8 0.6,5.0 0,4.2 Z" fill="white" stroke="none" opacity={0.85} />
        </g>
      )
    case 3: // Focus — eye inside a thin orbit ring
      return (
        <g transform={`translate(${x},${y})`}>
          {/* Outer orbit */}
          <circle cx={0} cy={0} r={5.0} stroke="white" strokeWidth={0.7} strokeDasharray="2.2 1.4" opacity={0.55} />
          <EyeCore />
        </g>
      )
    default:
      return null
  }
}


interface ControllerSvgProps {
  className?: string
  style?: React.CSSProperties
  palette?: Partial<ControllerPalette>
  buttonStyle?: ButtonStyle
}

export const ControllerSvg = forwardRef<ControllerSvgHandle, ControllerSvgProps>(
  function ControllerSvg({ className, style, palette, buttonStyle = "shapes" }, ref) {
    const id = React.useId()
    const svgRef = useRef<SVGSVGElement>(null)
    const [pressedButton, setPressedButton] = useState(-1)
    const p: ControllerPalette = { ...DEFAULT_CONTROLLER_PALETTE, ...palette }

    useImperativeHandle(ref, () => ({
      pressButton: (idx: number) => setPressedButton(idx),
      releaseButton: () => setPressedButton(-1),
    }))

    // Face button positions (center x, center y) in viewBox coords
    // Right cluster: top=△, right=○, bottom=✕, left=▢
    const faceButtons = [
      { cx: 91, cy: 28, label: BUTTON_LABELS[0], color: p.buttonColors[0] }, // △ top
      { cx: 100, cy: 37, label: BUTTON_LABELS[1], color: p.buttonColors[1] }, // ○ right
      { cx: 91, cy: 46, label: BUTTON_LABELS[2], color: p.buttonColors[2] }, // ✕ bottom
      { cx: 82, cy: 37, label: BUTTON_LABELS[3], color: p.buttonColors[3] }, // ▢ left
    ]

    return (
      <svg
        ref={svgRef}
        width={CTRL_W}
        height={CTRL_H}
        viewBox={`0 0 ${CTRL_W} ${CTRL_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        aria-label="Mind Controller — press buttons to power your mind"
        role="img"
      >
        <defs>
          <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.bodyStart} />
            <stop offset="100%" stopColor={p.bodyEnd} />
          </linearGradient>
          <linearGradient id={`${id}-highlight`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.screenStart} stopOpacity="0.18" />
            <stop offset="100%" stopColor={p.screenEnd} stopOpacity="0.08" />
          </linearGradient>
          <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`${id}-shadow`} x="-5%" y="-5%" width="110%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={p.shadowColor} floodOpacity="0.12" />
          </filter>
        </defs>
        {/* ── BODY — unified silhouette with integrated grips ── */}
        <path
          d="
            M 28 10
            Q 60 4 92 10
            L 98 10
            Q 108 12 110 23
            L 110 37
            Q 115 49 110 62
            Q 106 71 97 71
            Q 89 71 87 61
            L 87 44
            Q 76 48 60 48
            Q 44 48 33 44
            L 33 61
            Q 31 71 23 71
            Q 14 71 10 62
            Q 5 49 10 37
            L 10 23
            Q 12 12 22 10
            Z
          "
          fill={`url(#${id}-body)`}
          stroke={p.stroke}
          strokeWidth={1.5}
          filter={`url(#${id}-shadow)`}
        />
        {/* Top highlight sheen */}
        <path
          d="M 28 10 Q 60 4 92 10 L 97 10 Q 104 12 106 18 Q 76 14 60 14 Q 44 14 14 18 Q 16 12 22 10 Z"
          fill={`url(#${id}-highlight)`}
          opacity={0.55}
        />
        {/* ── SHOULDER BUTTONS (L / R) ── */}
        <rect x={13} y={3} width={22} height={8} rx={4} fill={p.accentSoft} stroke={p.stroke} strokeWidth={1} />
        <rect x={85} y={3} width={22} height={8} rx={4} fill={p.accentSoft} stroke={p.stroke} strokeWidth={1} />
        {/* ── SCREEN — status gem ── */}
        <rect x={44} y={17} width={32} height={18} rx={5} fill={`url(#${id}-screen)`} stroke={p.accentStroke} strokeWidth={0.8} />
        <circle cx={60} cy={26} r={4.5} fill="none" stroke={p.screenRing} strokeWidth={0.8} opacity={0.6} />
        <circle cx={60} cy={26} r={2} fill={p.screenDot} opacity={0.65} />
        {/* ── D-PAD — single plus path ── */}
        <path
          d="M 29 24 H 34 V 19 H 38 V 24 H 43 V 28 H 38 V 33 H 34 V 28 H 29 Z"
          fill={p.accent}
          stroke={p.accentStroke}
          strokeWidth={0.5}
          strokeLinejoin="round"
        />
        {/* ── FACE BUTTONS ── */}
        {faceButtons.map((btn, i) => {
          const isPressed = pressedButton === i
          const r = isPressed ? 5.5 : 6
          const opacity = isPressed ? 1 : 0.92

          return (
            <g key={i} filter={isPressed ? `url(#${id}-glow)` : undefined}>
              {isPressed && (
                <circle cx={btn.cx} cy={btn.cy} r={9} fill={btn.color} opacity={0.2} />
              )}
              <circle cx={btn.cx} cy={btn.cy} r={r} fill={btn.color} opacity={opacity} />
              {/* Inner highlight */}
              <circle cx={btn.cx} cy={btn.cy - 1.5} r={r * 0.44} fill="white" opacity={0.22} />
              {/* Symbol */}
              {buttonStyle === "shapes" ? (
                <>
                  {i === 0 && (
                    // Arrow pointing up-right at 33° — shaft + arrowhead
                    // 33° from horizontal → dx = cos(57°)≈0.544, dy = -sin(57°)≈-0.839 (up = negative y)
                    // Shaft: from (-2.1, 2.1) to (1.3, -1.85); arrowhead tip at (2.2, -2.6)
                    (<g fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" opacity={0.94}>
                      {/* Shaft */}
                      <line
                        x1={btn.cx - 1.8} y1={btn.cy + 2.0}
                        x2={btn.cx + 1.1} y2={btn.cy - 1.7}
                        strokeWidth={1.5}
                      />
                      {/* Arrowhead — filled triangle at tip, rotated 33° */}
                      <polygon
                        points={`
                          ${btn.cx + 2.6},${btn.cy - 2.8}
                          ${btn.cx + 0.0},${btn.cy - 1.9}
                          ${btn.cx + 1.5},${btn.cy - 0.3}
                        `}
                      />
                    </g>)
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
            </g>
          );
        })}
        {/* ── SELECT / START ── */}
        <rect x={49} y={39} width={9} height={4} rx={2} fill={p.accent} stroke={p.accentStroke} strokeWidth={0.5} />
        <rect x={62} y={39} width={9} height={4} rx={2} fill={p.accent} stroke={p.accentStroke} strokeWidth={0.5} />
      </svg>
    );
  },
)
