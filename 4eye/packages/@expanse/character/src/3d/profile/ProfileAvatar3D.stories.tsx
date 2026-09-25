import { ProfileAvatar3D, type ProfileAvatar3DZoom } from "@expanse/character/3d"

/**
 * ProfileAvatar3D — the 3D counterpart of the 2D `ProfilePhoto`.
 *
 * Where the 2D `ProfilePhoto` crops the flat SVG via its viewBox, this frames
 * the LIVE WebGL render inside a circular / rounded avatar container and aims
 * the camera at the head (face crop) or pulls back to the full figure.
 *
 * Drives the shared character store from the preview decorator
 * (CharacterProvider + CharacterThemeSync), so colors follow the active theme.
 */

const meta = {
  title: "Character/3D/Profile/Avatar",
  component: ProfileAvatar3D,
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
}

export default meta

const ZOOMS: ProfileAvatar3DZoom[] = [
  "face",
  "head",
  "shoulders",
  "torso",
  "full",
]

export const Default = {
  render: () => (
    <div style={{ padding: 24, background: "#ffffff" }}>
      <ProfileAvatar3D
        size={240}
        zoom="face"
        borderStyle="circle"
        borderWidth={4}
        borderColor="#00d4ff"
      />
    </div>
  ),
}

export const ZoomPresets = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 32,
        padding: 24,
        background: "#ffffff",
      }}
    >
      {ZOOMS.map((zoom) => (
        <div key={zoom} style={{ textAlign: "center" }}>
          <ProfileAvatar3D
            size={180}
            zoom={zoom}
            borderStyle="circle"
            borderWidth={3}
            borderColor="#00d4ff"
          />
          <div
            style={{
              marginTop: 8,
              fontFamily: "system-ui, sans-serif",
              fontSize: 13,
              textTransform: "capitalize",
              color: "#475569",
            }}
          >
            {zoom}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const BorderShapes = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        padding: 24,
        background: "#ffffff",
      }}
    >
      {(["circle", "rounded", "square", "none"] as const).map((borderStyle) => (
        <div key={borderStyle} style={{ textAlign: "center" }}>
          <ProfileAvatar3D
            size={180}
            zoom="head"
            borderStyle={borderStyle}
            borderWidth={borderStyle === "none" ? 0 : 3}
            borderColor="#00d4ff"
          />
          <div
            style={{
              marginTop: 8,
              fontFamily: "system-ui, sans-serif",
              fontSize: 13,
              textTransform: "capitalize",
              color: "#475569",
            }}
          >
            {borderStyle}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Orbitable = {
  render: () => (
    <div style={{ padding: 24, background: "#ffffff" }}>
      <ProfileAvatar3D
        size={320}
        zoom="head"
        borderStyle="rounded"
        borderWidth={2}
        borderColor="#e2e8f0"
        enableOrbit
      />
    </div>
  ),
}
