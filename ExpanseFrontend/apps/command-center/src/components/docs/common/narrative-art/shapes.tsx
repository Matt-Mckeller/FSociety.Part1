/**
 * Narrative Art - Shape Primitives
 *
 * Reusable SVG building blocks for the KCPS case study narrative crossfades.
 * Same visual language as RewardHero (gradient field + soft blurred blobs),
 * layered with crisp symbolic/figurative line art on top. No image assets -
 * everything here is CSS/SVG so it ships with zero external dependencies
 * and can be swapped later for generated or photographic imagery without
 * changing the surrounding component.
 */
import { Box } from "@mui/material"
import type { ReactNode } from "react"

export type ArtTone = "dark" | "light"

const TONE_GRADIENT: Record<ArtTone, [string, string]> = {
  // Muted storm - sadness/frustration, desaturated to match the SAD_* palette.
  dark: ["#2A2734", "#3A2428"],
  // Muted sunrise - hope, still soft rather than saturated.
  light: ["#E8E3D3", "#7E9284"],
}

const TONE_LINE_COLOR: Record<ArtTone, string> = {
  dark: "rgba(226,232,255,0.72)",
  light: "rgba(20,40,30,0.7)",
}

export interface SceneProps {
  tone: ArtTone
  height?: number | string
  children?: ReactNode
}

/** Gradient field + blurred blobs, matching RewardHero's decorative language. */
export function Backdrop({ tone, height = "100%", children }: SceneProps) {
  const [from, to] = TONE_GRADIENT[tone]
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        height,
        overflow: "hidden",
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: tone === "dark" ? -50 : "auto",
          bottom: tone === "light" ? -60 : "auto",
          right: -30,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: tone === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.16)",
          filter: "blur(10px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -60,
          left: -40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: tone === "dark" ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.09)",
          filter: "blur(6px)",
        }}
      />
      {children}
    </Box>
  )
}

function Line(
  props: { tone: ArtTone } & Omit<React.SVGProps<SVGPathElement>, "stroke">,
) {
  const { tone, ...rest } = props
  return <path stroke={TONE_LINE_COLOR[tone]} fill="none" strokeLinecap="round" strokeLinejoin="round" {...rest} />
}

/** Full-bleed SVG overlay used by every symbolic/figurative motif below. */
function Overlay({ children }: { children: ReactNode }) {
  return (
    <Box component="svg" viewBox="0 0 240 160" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {children}
    </Box>
  )
}

// ---- Environmental / symbolic motifs -------------------------------------

export function CrackedPaint({ tone }: { tone: ArtTone }) {
  return (
    <Overlay>
      <Line tone={tone} strokeWidth={1.5} d="M40 20 L55 55 L38 70 L60 95 L48 130" opacity={0.6} />
      <Line tone={tone} strokeWidth={1.2} d="M55 55 L78 60 L70 90" opacity={0.45} />
      <Line tone={tone} strokeWidth={1.2} d="M60 95 L82 105 L75 140" opacity={0.4} />
    </Overlay>
  )
}

export function DamagedLockers({ tone }: { tone: ArtTone }) {
  const doors = [0, 1, 2, 3]
  return (
    <Overlay>
      {doors.map((i) => (
        <rect
          key={i}
          x={30 + i * 40}
          y={40}
          width={30}
          height={80}
          rx={2}
          fill="none"
          stroke={TONE_LINE_COLOR[tone]}
          strokeWidth={1.4}
          opacity={i === 2 ? 0.85 : 0.35}
          transform={i === 2 ? "translate(3 0) rotate(2 45 80)" : undefined}
        />
      ))}
      {/* dent on the third locker */}
      <Line tone={tone} strokeWidth={1.3} d="M108 70 L120 78 L110 88" opacity={0.9} />
    </Overlay>
  )
}

export function JammedPrinter({ tone }: { tone: ArtTone }) {
  return (
    <Overlay>
      <rect x={90} y={70} width={60} height={36} rx={3} fill="none" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.4} opacity={0.55} />
      <Line tone={tone} strokeWidth={1.2} d="M100 70 C 96 55, 104 48, 96 32" opacity={0.7} />
      <Line tone={tone} strokeWidth={1.2} d="M112 70 C 116 58, 108 50, 116 36" opacity={0.5} />
    </Overlay>
  )
}

export function AttendanceLedger({ tone }: { tone: ArtTone }) {
  const rows = [0, 1, 2, 3, 4, 5]
  return (
    <Overlay>
      {rows.map((i) => (
        <line
          key={i}
          x1={60}
          x2={180}
          y1={35 + i * 15}
          y2={35 + i * 15}
          stroke={TONE_LINE_COLOR[tone]}
          strokeWidth={i === 2 ? 2.2 : 1}
          opacity={i === 2 ? 0.9 : 0.3}
        />
      ))}
    </Overlay>
  )
}

export function SeedSprout({ tone }: { tone: ArtTone }) {
  return (
    <Overlay>
      <Line tone={tone} strokeWidth={1.4} d="M120 140 L120 100" opacity={0.75} />
      <Line tone={tone} strokeWidth={1.4} d="M120 110 C 108 106, 100 92, 106 80" opacity={0.7} />
      <Line tone={tone} strokeWidth={1.4} d="M120 118 C 132 112, 138 98, 132 86" opacity={0.7} />
      <circle cx={120} cy={142} r={5} fill="none" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.2} opacity={0.6} />
    </Overlay>
  )
}

export function FruitingBranch({ tone }: { tone: ArtTone }) {
  return (
    <Overlay>
      <Line tone={tone} strokeWidth={1.6} d="M40 150 C 70 120, 110 100, 190 60" opacity={0.75} />
      <Line tone={tone} strokeWidth={1.2} d="M100 108 C 96 96, 100 88, 96 78" opacity={0.55} />
      <Line tone={tone} strokeWidth={1.2} d="M140 88 C 146 76, 142 66, 148 56" opacity={0.55} />
      <circle cx={95} cy={76} r={7} fill="none" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.3} opacity={0.75} />
      <circle cx={147} cy={54} r={7} fill="none" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.3} opacity={0.75} />
      <circle cx={180} cy={64} r={6} fill="none" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.3} opacity={0.7} />
    </Overlay>
  )
}

export function LightShaft({ tone }: { tone: ArtTone }) {
  return (
    <Overlay>
      <polygon points="150,0 240,0 220,160 170,160" fill={TONE_LINE_COLOR[tone]} opacity={tone === "light" ? 0.16 : 0.06} />
      <polygon points="170,0 220,0 208,160 178,160" fill={TONE_LINE_COLOR[tone]} opacity={tone === "light" ? 0.22 : 0.08} />
    </Overlay>
  )
}

export function TunnelOpening({ tone }: { tone: ArtTone }) {
  return (
    <Overlay>
      <ellipse cx={190} cy={80} rx={44} ry={70} fill={tone === "light" ? "rgba(255,244,214,0.35)" : "rgba(0,0,0,0.3)"} />
      <ellipse cx={190} cy={80} rx={28} ry={46} fill={tone === "light" ? "rgba(255,250,235,0.55)" : "rgba(0,0,0,0.45)"} />
    </Overlay>
  )
}

export function StormClouds({ tone }: { tone: ArtTone }) {
  return (
    <Overlay>
      <ellipse cx={70} cy={30} rx={40} ry={16} fill={TONE_LINE_COLOR[tone]} opacity={0.12} />
      <ellipse cx={110} cy={22} rx={30} ry={12} fill={TONE_LINE_COLOR[tone]} opacity={0.1} />
      <Line tone={tone} strokeWidth={1.2} d="M85 42 L78 58 L90 58 L80 78" opacity={0.5} />
    </Overlay>
  )
}

// ---- Figurative motifs (stylized silhouettes, non-photoreal, non-identifiable) --

export function SilhouetteSeated({ tone, posture }: { tone: ArtTone; posture: "slumped" | "upright" }) {
  const slump = posture === "slumped"
  return (
    <Overlay>
      {/* desk */}
      <line x1={60} y1={120} x2={140} y2={120} stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.6} opacity={0.5} />
      {/* seated figure, head tilt communicates posture without any facial detail */}
      <path
        d={
          slump
            ? "M92 120 L92 96 C 92 84, 100 76, 98 66 C 97 60, 90 58, 88 62"
            : "M92 120 L92 92 C 92 78, 100 70, 100 58"
        }
        stroke={TONE_LINE_COLOR[tone]}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.85}
      />
      <circle cx={slump ? 87 : 101} cy={slump ? 60 : 54} r={6} fill="none" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.8} opacity={0.85} />
    </Overlay>
  )
}

export function SilhouetteWalking({ tone }: { tone: ArtTone }) {
  return (
    <Overlay>
      <path
        d="M170 140 L172 112 C 172 100, 180 96, 182 84 C 184 74, 178 70, 178 62"
        stroke={TONE_LINE_COLOR[tone]}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.85}
      />
      <path d="M172 112 L156 128" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.8} strokeLinecap="round" opacity={0.7} />
      <path d="M172 112 L190 122" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.8} strokeLinecap="round" opacity={0.7} />
      <circle cx={179} cy={58} r={6} fill="none" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.8} opacity={0.85} />
    </Overlay>
  )
}

export function SilhouettePair({ tone }: { tone: ArtTone }) {
  return (
    <Overlay>
      <path d="M110 140 L112 108 C 112 96, 120 92, 120 80" stroke={TONE_LINE_COLOR[tone]} fill="none" strokeWidth={2} strokeLinecap="round" opacity={0.85} />
      <circle cx={121} cy={74} r={6.5} fill="none" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.8} opacity={0.85} />
      <path d="M140 140 L141 116 C 141 106, 147 102, 147 92" stroke={TONE_LINE_COLOR[tone]} fill="none" strokeWidth={1.8} strokeLinecap="round" opacity={0.7} />
      <circle cx={147} cy={87} r={5} fill="none" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.6} opacity={0.7} />
      {/* hands nearly touching - protective, not literal contact */}
      <line x1={124} y1={110} x2={136} y2={112} stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.4} opacity={0.5} />
    </Overlay>
  )
}

export function SilhouetteTense({ tone }: { tone: ArtTone }) {
  return (
    <Overlay>
      <path
        d="M110 140 L108 104 C 108 92, 118 90, 122 78 C 124 72, 118 66, 122 60"
        stroke={TONE_LINE_COLOR[tone]}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.85}
      />
      <path d="M108 104 L88 96" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.8} strokeLinecap="round" opacity={0.7} />
      <path d="M108 104 L130 92" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.8} strokeLinecap="round" opacity={0.7} />
      <circle cx={121} cy={56} r={6} fill="none" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.8} opacity={0.85} />
    </Overlay>
  )
}

export function SilhouetteCalm({ tone }: { tone: ArtTone }) {
  return (
    <Overlay>
      <path
        d="M110 140 L110 104 C 110 92, 118 86, 118 74"
        stroke={TONE_LINE_COLOR[tone]}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.85}
      />
      <path d="M110 104 L98 116" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.6} strokeLinecap="round" opacity={0.6} />
      <path d="M110 104 L124 114" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.6} strokeLinecap="round" opacity={0.6} />
      <circle cx={119} cy={68} r={6} fill="none" stroke={TONE_LINE_COLOR[tone]} strokeWidth={1.8} opacity={0.85} />
    </Overlay>
  )
}
