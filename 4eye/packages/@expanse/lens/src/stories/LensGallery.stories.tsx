import type { Meta, StoryObj } from "@storybook/react"
import { useMemo, useState } from "react"
import { LENS_THEMES } from "../core/types"
import type { LensTheme } from "../core/types"
import { TRANSFORM_CATEGORIES, TRANSFORM_LABELS } from "../core/tags"
import type { TransformCategory } from "../core/tags"
import { LENSES } from "../registry/lenses.data"
import { queryLenses, ALL_LENS_TAGS } from "../registry/lensRegistry"
import { LensChip } from "../components/LensChip"

/**
 * The full lens library — 100+ named symbols. Search by word, filter by
 * theme / category / tag. Each card is an animated <LensChip>.
 */
const meta: Meta = {
  title: "Lens/Gallery",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
}
export default meta

type Story = StoryObj

const wrap: React.CSSProperties = { padding: 32, fontFamily: "Inter, system-ui, sans-serif" }
const controls: React.CSSProperties = {
  display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 8,
}
const input: React.CSSProperties = {
  padding: "8px 12px", borderRadius: 10, border: "1px solid #d4d4d8", fontSize: 14, minWidth: 220,
}
const grid: React.CSSProperties = {
  display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14, marginTop: 20,
}
const cardCss: React.CSSProperties = {
  display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 18,
  background: "#f5f5f5", borderRadius: 14, border: "1px solid #ececec", textAlign: "center",
}
const desc: React.CSSProperties = { fontSize: 11, color: "#64748b", lineHeight: 1.35 }
const count: React.CSSProperties = { fontSize: 13, color: "#64748b", fontWeight: 600 }

export const Library: Story = {
  render: () => {
    const [text, setText] = useState("")
    const [theme, setTheme] = useState<LensTheme | "">("")
    const [tag, setTag] = useState("")

    const results = useMemo(
      () => queryLenses({
        text: text || undefined,
        theme: (theme || undefined) as LensTheme | undefined,
        tags: tag ? [tag] : undefined,
      }),
      [text, theme, tag],
    )

    return (
      <div style={wrap}>
        <h2 style={{ margin: "0 0 4px" }}>Lens Library</h2>
        <p style={count}>{LENSES.length} lenses · showing {results.length}</p>
        <div style={controls}>
          <input style={input} placeholder="Search words…" value={text} onChange={(e) => setText(e.target.value)} />
          <select style={input} value={theme} onChange={(e) => setTheme(e.target.value as LensTheme | "")}>
            <option value="">All themes</option>
            {LENS_THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select style={input} value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="">All tags</option>
            {ALL_LENS_TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
          {TRANSFORM_CATEGORIES.map((c: TransformCategory) => (
            <button
              key={c}
              onClick={() => setTag((prev) => (prev === c ? "" : c))}
              style={{
                padding: "4px 10px", borderRadius: 999, fontSize: 12, cursor: "pointer",
                border: "1px solid #d4d4d8", background: tag === c ? "#334155" : "#fff",
                color: tag === c ? "#fff" : "#334155",
              }}
            >
              {TRANSFORM_LABELS[c]}
            </button>
          ))}
        </div>
        <div style={grid}>
          {results.map((l) => (
            <div key={l.id} style={cardCss}>
              <LensChip def={l} size={56} />
              <span style={desc}>{l.description}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
}
