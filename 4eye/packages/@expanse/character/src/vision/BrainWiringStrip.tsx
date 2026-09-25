"use client"

import { Box, useTheme } from "@mui/material"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { usePulseSubscribe } from "./pulse/BrainStripPulseContext"

/**
 * BrainWiringStrip — a thin horizontal "neural net" strip of geometric
 * shape nodes (▲ ■ ●) connected by progressively-drawn lines. Reads as
 * "learning happens when connections form between concepts" — a quiet
 * atmospheric element behind the Vision page's hero.
 *
 * Animation: when the strip enters the viewport (25% threshold), the
 * connecting lines draw in left-to-right with a small stagger, then a
 * gentle pulse runs through the central anchor node forever.
 */

type Shape = "tri" | "sq" | "circ"

interface Node {
  shape: Shape
  /** 0..1 — horizontal position. */
  x: number
  /** 0..1 — vertical position. */
  y: number
  /** Tint key. */
  tint: "violet" | "teal" | "amber"
  /** Size in px. */
  size: number
}

const TINTS: Record<Node["tint"], string> = {
  violet: "#8b5cf6",
  teal: "#14b8a6",
  amber: "#f59e0b",
}

/** Curated layout — feels organic but every connection makes sense. */
const NODES: Node[] = [
  { shape: "circ", x: 0.04, y: 0.25, tint: "violet", size: 14 },
  { shape: "tri",  x: 0.12, y: 0.65, tint: "teal",   size: 16 },
  { shape: "sq",   x: 0.20, y: 0.30, tint: "amber",  size: 14 },
  { shape: "circ", x: 0.28, y: 0.70, tint: "violet", size: 12 },
  { shape: "tri",  x: 0.36, y: 0.20, tint: "amber",  size: 18 },
  { shape: "sq",   x: 0.46, y: 0.55, tint: "teal",   size: 16 },
  // Anchor (the "4" / 4eye) — slightly larger, glowing.
  { shape: "circ", x: 0.52, y: 0.45, tint: "violet", size: 24 },
  { shape: "tri",  x: 0.62, y: 0.25, tint: "teal",   size: 14 },
  { shape: "sq",   x: 0.70, y: 0.70, tint: "amber",  size: 16 },
  { shape: "circ", x: 0.80, y: 0.40, tint: "violet", size: 14 },
  { shape: "tri",  x: 0.88, y: 0.65, tint: "amber",  size: 18 },
  { shape: "sq",   x: 0.96, y: 0.30, tint: "teal",   size: 12 },
]

const ANCHOR_INDEX = 6

/** Edges drawn between node indices. Hand-picked so the graph reads as
 *  a network rather than a path. Anchor node touches several. */
const EDGES: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [5, 6], [6, 7], [6, 8], [6, 4], [6, 9],
  [7, 9], [8, 10], [9, 10], [10, 11],
]

const STRIP_W = 1100
const STRIP_H = 140

function ShapeSvg({ shape, size, color }: { shape: Shape; size: number; color: string }) {
  const half = size / 2
  if (shape === "tri") {
    return (
      <polygon
        points={`${half},2 ${size - 2},${size - 2} 2,${size - 2}`}
        fill={color}
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    )
  }
  if (shape === "sq") {
    return (
      <rect
        x={2}
        y={2}
        width={size - 4}
        height={size - 4}
        rx={2}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    )
  }
  return <circle cx={half} cy={half} r={half - 2} fill={color} />
}

/**
 * Map controller button index (0–3) to the node indices that should
 * flash. Spread across the strip so each button "claims" a region.
 * index -1 = ALL nodes (LEVEL UP sweep).
 */
const BUTTON_NODE_MAP: Record<number, number[]> = {
  0: [4, 6],       // △ improve — left-center cluster
  1: [6, 7, 9],    // ○ heal    — anchor + right upper
  2: [0, 1, 2],    // ✕ protect — left cluster
  3: [8, 10, 11],  // ▢ win     — right cluster
}

export interface BrainWiringStripProps {
  /** Override the connecting line color (default: theme-aware slate). */
  lineColor?: string
  /**
   * Override node fill: a single hex, or "gradient" to apply a
   * purple→blue gradient across nodes from left to right.
   */
  nodeOverride?: string | "gradient"
}

export function BrainWiringStrip({ lineColor: lineColorProp, nodeOverride }: BrainWiringStripProps = {}) {
  const ref = useRef<SVGSVGElement | null>(null)
  const theme = useTheme()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const lines = Array.from(el.querySelectorAll<SVGPathElement>(".bw-line"))
    const anchor = el.querySelector<SVGGElement>(".bw-anchor")
    const nodes = Array.from(el.querySelectorAll<SVGGElement>(".bw-node"))

    // Initial state — lines hidden via dashoffset, nodes scaled down.
    lines.forEach((p) => {
      const len = p.getTotalLength()
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
    })
    gsap.set(nodes, { scale: 0, transformOrigin: "50% 50%" })

    let played = false
    let pulseTl: gsap.core.Timeline | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || played) return
        played = true

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } })
        tl.to(nodes, { scale: 1, duration: 0.4, stagger: 0.04 }, 0)
        tl.to(
          lines,
          { strokeDashoffset: 0, duration: 0.7, stagger: 0.06, ease: "power1.inOut" },
          0.2,
        )

        // Forever-pulse the anchor node + its outgoing lines.
        if (anchor) {
          pulseTl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } })
          pulseTl.to(anchor, { scale: 1.15, duration: 1.2 })
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      pulseTl?.kill()
    }
  }, [])

  // Pulse subscriber — lights nodes when controller fires
  usePulseSubscribe((nodeIndex) => {
    const el = ref.current
    if (!el) return
    const allNodes = Array.from(el.querySelectorAll<SVGGElement>(".bw-node"))

    const targets = nodeIndex === -1
      ? allNodes
      : (BUTTON_NODE_MAP[nodeIndex] ?? []).map((i) => allNodes[i]).filter(Boolean)

    if (!targets.length) return

    gsap.fromTo(
      targets,
      { scale: 1 },
      {
        scale: 1.45,
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        transformOrigin: "50% 50%",
        stagger: 0.04,
        overwrite: "auto",
      },
    )
  })

  // Build coordinates in the strip's coordinate space.
  const points = NODES.map((n) => ({ x: n.x * STRIP_W, y: n.y * STRIP_H, n }))
  const lineColor = lineColorProp ?? (theme.palette.mode === "dark" ? "#475569" : "#94a3b8")

  // Resolve per-node color, applying nodeOverride (single hex or gradient).
  function nodeColor(index: number, defaultColor: string): string {
    if (!nodeOverride) return defaultColor
    if (nodeOverride === "gradient") {
      // Interpolate violet → blue across the node sequence.
      const t = NODES.length <= 1 ? 0 : index / (NODES.length - 1)
      const lerp = (a: number, b: number) => Math.round(a + (b - a) * t)
      // violet #8b5cf6 (139,92,246) → blue #3b82f6 (59,130,246)
      const r = lerp(139, 59)
      const g = lerp(92, 130)
      const b = lerp(246, 246)
      return `rgb(${r}, ${g}, ${b})`
    }
    return nodeOverride
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: STRIP_W,
        mx: "auto",
        opacity: 0.85,
      }}
      aria-hidden
    >
      <svg
        ref={ref}
        viewBox={`0 0 ${STRIP_W} ${STRIP_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* Edges first so nodes sit on top */}
        {EDGES.map(([a, b], i) => {
          const pa = points[a]
          const pb = points[b]
          if (!pa || !pb) return null
          return (
            <path
              key={i}
              className="bw-line"
              d={`M${pa.x} ${pa.y} L${pb.x} ${pb.y}`}
              stroke={lineColor}
              strokeWidth={1.2}
              fill="none"
              strokeLinecap="round"
            />
          )
        })}
        {points.map((p, i) => {
          const isAnchor = i === ANCHOR_INDEX
          const fill = nodeColor(i, TINTS[p.n.tint])
          return (
            <g
              key={i}
              className={isAnchor ? "bw-anchor bw-node" : "bw-node"}
              transform={`translate(${p.x - p.n.size / 2} ${p.y - p.n.size / 2})`}
            >
              {isAnchor && (
                <circle
                  cx={p.n.size / 2}
                  cy={p.n.size / 2}
                  r={p.n.size / 2 + 6}
                  fill={fill}
                  opacity={0.18}
                />
              )}
              <ShapeSvg shape={p.n.shape} size={p.n.size} color={fill} />
            </g>
          )
        })}
      </svg>
    </Box>
  )
}
