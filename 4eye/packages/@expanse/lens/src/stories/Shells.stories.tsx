import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { LENS_SHELL_IDS, LENS_THEMES, LENS_MOTIONS } from "../core/types"
import type { LensMotion, LensTheme } from "../core/types"
import { Lens } from "../components/Lens"
import { getLens } from "../registry/lensRegistry"

/**
 * The 17 animated SVG "shells" — the visual primitives every lens is
 * composed from. Switch theme and motion to see how palette and energy
 * change across the whole set.
 */
const meta: Meta = {
  title: "Lens/Shells",
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

export const AllShells: Story = {
  render: () => {
    const [theme, setTheme] = useState<LensTheme>("improve")
    const [motion, setMotion] = useState<LensMotion>("steady")
    const [animated, setAnimated] = useState(true)
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
          {LENS_SHELL_IDS.map((shell) => (
            <div key={shell} style={card}>
              <Lens shell={shell} theme={theme} motion={motion} size={72} animated={animated} />
              <span style={label}>{shell}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/**
 * The five spell lenses that moved to purpose-built shells: Distill
 * (condense), Reveal (eye), Scan (beacon), Summarize (converge), and
 * Reinterpret (voice). Analyze keeps the classic scanner for contrast.
 */
export const UpdatedSpellLenses: Story = {
  name: "Updated Spell Lenses",
  render: () => {
    const ids = ["distill", "reveal", "scan", "summarize", "reinterpret", "analyze"]
    return (
      <div style={wrap}>
        <div style={grid}>
          {ids.map((id) => {
            const def = getLens(id)
            return (
              <div key={id} style={card}>
                <Lens id={id} size={72} animated />
                <span style={label}>
                  {def?.word} · {def?.shell}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
}
