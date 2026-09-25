import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { HAND_POSE_IDS, LENS_THEMES, LENS_MOTIONS } from "../core/types"
import type { HandPoseId, LensMotion, LensTheme } from "../core/types"
import { HAND_POSE_COMPONENTS } from "../hands/handRegistry"
import { paletteFor } from "../core/palettes"
import { Lens } from "../components/Lens"

/**
 * The 12 hand-gesture poses — the "hands" icon mode. Every lens maps to a
 * pose (per-shell default, optional per-lens override) so the whole symbol
 * language can be drawn with your hands.
 */
const meta: Meta = {
  title: "Lens/Hand Poses",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
}
export default meta

type Story = StoryObj

const wrap: React.CSSProperties = { padding: 32, fontFamily: "Inter, system-ui, sans-serif" }
const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: 16,
}
const card: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
  padding: 18,
  background: "#f5f5f5",
  borderRadius: 14,
  border: "1px solid #ececec",
}
const label: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: "#334155" }

export const AllPoses: Story = {
  render: () => {
    const [theme, setTheme] = useState<LensTheme>("improve")
    const [motion, setMotion] = useState<LensMotion>("steady")
    const [animated, setAnimated] = useState(true)
    const palette = paletteFor(theme)
    return (
      <div style={wrap}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
          <label style={label}>
            Theme{" "}
            <select value={theme} onChange={(e) => setTheme(e.target.value as LensTheme)}>
              {LENS_THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label style={label}>
            Motion{" "}
            <select value={motion} onChange={(e) => setMotion(e.target.value as LensMotion)}>
              {LENS_MOTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </label>
          <label style={label}>
            <input type="checkbox" checked={animated} onChange={(e) => setAnimated(e.target.checked)} /> Animated
          </label>
        </div>
        <div style={grid}>
          {HAND_POSE_IDS.map((pose: HandPoseId) => {
            const Pose = HAND_POSE_COMPONENTS[pose]
            return (
              <div key={pose} style={card}>
                <Pose size={72} palette={palette} motion={motion} animated={animated} />
                <span style={label}>{pose}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
}

/** Sample lenses rendered in both icon modes, side by side. */
export const LensVsHands: Story = {
  name: "Lens vs Hands",
  render: () => {
    const ids = ["distill", "reveal", "scan", "summarize", "reinterpret", "analyze", "celebrate", "soothe", "gratitude", "connect", "protect", "grow"]
    return (
      <div style={wrap}>
        <div style={grid}>
          {ids.map((id) => (
            <div key={id} style={card}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Lens id={id} size={56} animated mode="lens" />
                <Lens id={id} size={56} animated mode="hands" />
              </div>
              <span style={label}>{id}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
}
