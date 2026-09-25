import type { Meta, StoryObj } from "@storybook/react"
import { useMemo, useState } from "react"
import { TRANSFORM_CATEGORIES, TRANSFORM_LABELS } from "../core/tags"
import type { TransformCategory } from "../core/tags"
import { LENS_THEMES } from "../core/types"
import type { LensTheme } from "../core/types"
import { ACTION_COUNT } from "../actions/expand"
import { queryActions, sortActions, actionCountsByCategory } from "../actions/query"
import type { ActionSort } from "../actions/query"
import { Lens } from "../components/Lens"

/**
 * The action explorer — 1000+ simple (mostly one-word) actions, each
 * tied to a lens. Search, filter by category / theme, and sort. The
 * pure dataset lives in `@expanse/lens/actions` (no React).
 *
 * Rows are capped for render performance; the count reflects the full
 * filtered set. Toggle "Animate glyphs" to bring the symbols to life.
 */
const meta: Meta = {
  title: "Lens/Action Explorer",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
}
export default meta

type Story = StoryObj

const ROW_CAP = 300
const wrap: React.CSSProperties = { padding: 32, fontFamily: "Inter, system-ui, sans-serif" }
const input: React.CSSProperties = {
  padding: "8px 12px", borderRadius: 10, border: "1px solid #d4d4d8", fontSize: 14, minWidth: 200,
}
const controls: React.CSSProperties = { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }
const count: React.CSSProperties = { fontSize: 13, color: "#64748b", fontWeight: 600 }
const grid: React.CSSProperties = {
  display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 8, marginTop: 18,
}
const row: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
  background: "#f5f5f5", borderRadius: 10, border: "1px solid #ececec",
}
const wordStyle: React.CSSProperties = { fontSize: 14, fontWeight: 600, color: "#334155" }
const catStyle: React.CSSProperties = { fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.4 }

export const Explorer: Story = {
  render: () => {
    const [text, setText] = useState("")
    const [category, setCategory] = useState<TransformCategory | "">("")
    const [theme, setTheme] = useState<LensTheme | "">("")
    const [sort, setSort] = useState<ActionSort>("category")
    const [animate, setAnimate] = useState(false)

    const counts = useMemo(actionCountsByCategory, [])

    const results = useMemo(() => {
      const filtered = queryActions({
        text: text || undefined,
        category: (category || undefined) as TransformCategory | undefined,
        theme: (theme || undefined) as LensTheme | undefined,
      })
      return sortActions(filtered, sort)
    }, [text, category, theme, sort])

    const shown = results.slice(0, ROW_CAP)

    return (
      <div style={wrap}>
        <h2 style={{ margin: "0 0 4px" }}>Action Explorer</h2>
        <p style={count}>
          {ACTION_COUNT} total actions · {results.length} match{results.length === 1 ? "" : "es"}
          {results.length > ROW_CAP ? ` · showing first ${ROW_CAP}` : ""}
        </p>
        <div style={controls}>
          <input style={input} placeholder="Search actions…" value={text} onChange={(e) => setText(e.target.value)} />
          <select style={input} value={category} onChange={(e) => setCategory(e.target.value as TransformCategory | "")}>
            <option value="">All categories</option>
            {TRANSFORM_CATEGORIES.map((c) => (
              <option key={c} value={c}>{TRANSFORM_LABELS[c]} ({counts[c] ?? 0})</option>
            ))}
          </select>
          <select style={input} value={theme} onChange={(e) => setTheme(e.target.value as LensTheme | "")}>
            <option value="">All themes</option>
            {LENS_THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select style={input} value={sort} onChange={(e) => setSort(e.target.value as ActionSort)}>
            <option value="category">Sort: category</option>
            <option value="word">Sort: word</option>
            <option value="theme">Sort: theme</option>
          </select>
          <label style={count}>
            <input type="checkbox" checked={animate} onChange={(e) => setAnimate(e.target.checked)} /> Animate glyphs
          </label>
        </div>
        <div style={grid}>
          {shown.map((a) => (
            <div key={a.id} style={row}>
              <Lens id={a.lensId} theme={a.theme} size={28} animated={animate} title={a.word} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={wordStyle}>{a.word}</span>
                <span style={catStyle}>{a.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}
