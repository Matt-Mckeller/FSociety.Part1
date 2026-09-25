import { useState } from "react"
import { ProfileAvatar, type ProfileMode } from "@expanse/character/profile"
import type { SharedProfileZoom } from "@expanse/character/profile"

/**
 * ProfileAvatar — one avatar, two renderers.
 *
 * Speaks a single set of framing props and flips between the cheap 2D SVG
 * `ProfilePhoto` and the true-3D `ProfileAvatar3D`. The 3D surface is
 * code-split, so a page that only shows 2D never loads three.js; the first
 * switch to 3D lazy-mounts WebGL and subsequent switches crossfade.
 */
const meta = {
  title: "Character/Profile/Avatar (2D-3D)",
  component: ProfileAvatar,
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
}

export default meta

/** Built-in toggle — click 2D / 3D to switch renderers in place. */
export const WithToggle = {
  render: () => (
    <div style={{ padding: 32, background: "#ffffff" }}>
      <ProfileAvatar
        persona="hero"
        size={260}
        zoom="head"
        borderStyle="circle"
        borderWidth={4}
        borderColor="#00d4ff"
        showToggle
      />
    </div>
  ),
}

/** Controlled mode — an external switch drives both the label and the avatar. */
export const Controlled = {
  render: () => {
    const [mode, setMode] = useState<ProfileMode>("2d")
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: 32,
          background: "#ffffff",
        }}
      >
        <ProfileAvatar
          mode={mode}
          persona="mapExplorer"
          size={240}
          zoom="face"
          borderStyle="circle"
          borderWidth={3}
          borderColor="#7c4dff"
          onModeChange={setMode}
        />
        <button onClick={() => setMode(mode === "2d" ? "3d" : "2d")}>
          Showing {mode.toUpperCase()} — switch to{" "}
          {mode === "2d" ? "3D" : "2D"}
        </button>
      </div>
    )
  },
}

/** The shared zoom presets, rendered in 2D with the toggle available. */
export const ZoomPresets = {
  render: () => {
    const zooms: SharedProfileZoom[] = [
      "face",
      "head",
      "shoulders",
      "torso",
      "full",
    ]
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          padding: 32,
          background: "#ffffff",
        }}
      >
        {zooms.map((zoom) => (
          <div
            key={zoom}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <ProfileAvatar
              persona="hero"
              size={180}
              zoom={zoom}
              borderStyle="circle"
              borderWidth={3}
              borderColor="#00d4ff"
              showToggle
            />
            <span style={{ fontSize: 12, fontWeight: 600 }}>{zoom}</span>
          </div>
        ))}
      </div>
    )
  },
}
