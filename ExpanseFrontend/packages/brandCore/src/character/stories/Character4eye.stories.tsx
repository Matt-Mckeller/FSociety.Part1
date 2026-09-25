/**
 * Stories for the 4eye AI mascot character
 * Showcases different design variations and customization options
 */
import type { Meta, StoryObj } from "@storybook/react"
import { Character4eye, Character4eyeProps } from "../poses/Character4eye"
import { ProfilePhoto, ProfilePhotoProps } from "../profile"
import { BrandProvider } from "../../context/BrandContext"

// Legacy alias for backward compatibility in stories
const FaceCloseup = ProfilePhoto

const meta: Meta<typeof Character4eye> = {
  title: "BrandCore/Character/4eye/Overview",
  component: Character4eye,
  decorators: [
    (Story) => (
      <BrandProvider>
        <div
          style={{
            background: "#ffffff",
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <Story />
        </div>
      </BrandProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["minimal", "tech", "friendly", "sleek"],
      description: "Visual style variant for the face design",
    },
    eyeDesign: {
      control: "select",
      options: ["default", "aperture", "camera", "orb", "scanner", "ring"],
      description: "Eye design style",
    },
    strapStyle: {
      control: "select",
      options: ["default", "smooth", "angular", "floating", "organic", "none"],
      description: "Strap/visor style",
    },
    eyeGlowColor: {
      control: "color",
      description: "Color of the eye glow effect",
    },
    limbOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Arms and legs opacity (default: 0.5)",
    },
    compact: {
      control: "boolean",
    },
    showAntenna: {
      control: "boolean",
      description: "Show antenna on top of head",
    },
    showStatusLEDs: {
      control: "boolean",
      description: "Show status LED indicators",
    },
    statusLEDCount: {
      control: { type: "range", min: 1, max: 3, step: 1 },
      description: "Number of status LEDs (1-3)",
    },
    showEarSensors: {
      control: "boolean",
      description: "Show ear sensors on strap sides",
    },
    showForeheadMark: {
      control: "boolean",
      description: "Show forehead tech mark",
    },
    showDataFlow: {
      control: "boolean",
      description: "Show data flow lines on strap",
    },
    apertureBlades: {
      control: { type: "range", min: 3, max: 12, step: 1 },
      description: "Number of aperture blades (for aperture eye design)",
    },
    mood: {
      control: "select",
      options: ["neutral", "alert", "processing", "happy", "scanning"],
      description: "Character mood/state",
    },
  },
}

export default meta
type Story = StoryObj<typeof Character4eye>

// =====================
// Default View
// =====================

export const Default: Story = {
  render: (args) => (
    <div style={{ height: "300px" }}>
      <Character4eye {...args} />
    </div>
  ),
  args: {
    compact: true,
    variant: "friendly",
  },
}

// =====================
// All Variants Gallery
// =====================

export const VariantsGallery: Story = {
  name: "Design Variants",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "2rem",
        alignItems: "end",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "220px" }}>
          <Character4eye compact variant="minimal" />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <strong style={{ fontSize: "14px" }}>Minimal</strong>
          <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0" }}>
            Clean, simple visor band
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "220px" }}>
          <Character4eye compact variant="tech" />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <strong style={{ fontSize: "14px" }}>Tech</strong>
          <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0" }}>
            Circuit nodes, detailed
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "220px" }}>
          <Character4eye compact variant="friendly" />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <strong style={{ fontSize: "14px" }}>Friendly</strong>
          <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0" }}>
            Warm glow, approachable
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "220px" }}>
          <Character4eye compact variant="sleek" />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <strong style={{ fontSize: "14px" }}>Sleek</strong>
          <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0" }}>
            Thin band, modern
          </p>
        </div>
      </div>
    </div>
  ),
}

// =====================
// Color Variations
// =====================

export const ColorVariations: Story = {
  name: "Glow Colors",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "1.5rem",
        alignItems: "end",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "180px" }}>
          <Character4eye compact variant="friendly" eyeGlowColor="#00d4ff" />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Cyan (Default)</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "180px" }}>
          <Character4eye compact variant="friendly" eyeGlowColor="#00ff88" />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Green</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "180px" }}>
          <Character4eye compact variant="friendly" eyeGlowColor="#ff6b35" />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Orange</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "180px" }}>
          <Character4eye compact variant="friendly" eyeGlowColor="#a855f7" />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Purple</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "180px" }}>
          <Character4eye compact variant="friendly" eyeGlowColor="#f43f5e" />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Rose</span>
      </div>
    </div>
  ),
}

// =====================
// Size Comparison
// =====================

export const SizeComparison: Story = {
  name: "Size Comparison",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "3rem",
        alignItems: "end",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "120px" }}>
          <Character4eye compact variant="friendly" />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Small</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "200px" }}>
          <Character4eye compact variant="friendly" />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Medium</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "320px" }}>
          <Character4eye compact variant="friendly" />
        </div>
        <span style={{ color: "#888", fontSize: "12px" }}>Large</span>
      </div>
    </div>
  ),
}

// =====================
// Interactive Playground
// =====================

export const Playground: Story = {
  name: "Interactive Playground",
  render: (args) => (
    <div style={{ height: "350px" }}>
      <Character4eye {...args} />
    </div>
  ),
  args: {
    compact: true,
    variant: "friendly",
    eyeDesign: "default",
    strapStyle: "default",
    eyeGlowColor: "#00d4ff",
    limbOpacity: 0.5,
    showAntenna: false,
    showStatusLEDs: false,
    statusLEDCount: 2,
    showEarSensors: false,
    showForeheadMark: false,
    showDataFlow: false,
    mood: "neutral",
    apertureBlades: 6,
  },
}

// =====================
// Profile Photo Showcase
// =====================

export const ProfilePhotoZoomLevels: Story = {
  name: "Profile Photo - Zoom Levels",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>Zoom Level Comparison</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1.5rem",
          justifyItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="full"
            borderStyle="circle"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Full</strong>
            <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0" }}>
              Entire character
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="head"
            borderStyle="circle"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Head</strong>
            <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0" }}>
              Complete head
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="face"
            borderStyle="circle"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Face</strong>
            <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0" }}>
              Face-focused crop
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="eye"
            borderStyle="circle"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Eye</strong>
            <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0" }}>
              Brain/eye focus
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="tight"
            borderStyle="circle"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Tight</strong>
            <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0" }}>
              Extreme closeup
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ProfilePhotoBorderStyles: Story = {
  name: "Profile Photo - Border Styles",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>Border Style Options</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          justifyItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="face"
            borderStyle="circle"
            borderWidth={3}
            borderColor="#00d4ff"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Circle</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="face"
            borderStyle="rounded"
            borderWidth={3}
            borderColor="#00ff88"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Rounded</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="face"
            borderStyle="square"
            borderWidth={3}
            borderColor="#a855f7"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Square</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="face"
            borderStyle="none"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>None</strong>
          </div>
        </div>
      </div>

      <h4 style={{ margin: "1rem 0 0", color: "#555" }}>Thick Borders</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          justifyItems: "center",
        }}
      >
        <ProfilePhoto
          variant="tech"
          size={140}
          zoom="face"
          borderStyle="circle"
          borderWidth={6}
          borderColor="#00d4ff"
        />
        <ProfilePhoto
          variant="tech"
          size={140}
          zoom="face"
          borderStyle="circle"
          borderWidth={6}
          borderColor="#00ff88"
        />
        <ProfilePhoto
          variant="tech"
          size={140}
          zoom="face"
          borderStyle="circle"
          borderWidth={6}
          borderColor="#f43f5e"
        />
        <ProfilePhoto
          variant="tech"
          size={140}
          zoom="face"
          borderStyle="circle"
          borderWidth={6}
          borderColor="#a855f7"
        />
      </div>
    </div>
  ),
}

export const ProfilePhotoBackgrounds: Story = {
  name: "Profile Photo - Background Options",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        background: "#2a2a2a",
        padding: "2rem",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ margin: 0, color: "#fff" }}>Background Variations</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          justifyItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={140}
            zoom="face"
            background="gradient"
          />
          <div style={{ marginTop: "0.75rem", color: "#fff" }}>
            <strong style={{ fontSize: "13px" }}>Gradient</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={140}
            zoom="face"
            background="solid"
            backgroundColor="#1a1a2e"
          />
          <div style={{ marginTop: "0.75rem", color: "#fff" }}>
            <strong style={{ fontSize: "13px" }}>Dark Solid</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={140}
            zoom="face"
            background="transparent"
            borderWidth={2}
            borderColor="#666"
          />
          <div style={{ marginTop: "0.75rem", color: "#fff" }}>
            <strong style={{ fontSize: "13px" }}>Transparent</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={140}
            zoom="face"
            background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
          <div style={{ marginTop: "0.75rem", color: "#fff" }}>
            <strong style={{ fontSize: "13px" }}>Custom Gradient</strong>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ProfilePhotoVariants: Story = {
  name: "Profile Photo - All Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>
        Character Variants as Profile Photos
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          justifyItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="minimal"
            size={160}
            zoom="face"
            borderStyle="circle"
            borderWidth={2}
            borderColor="#888"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Minimal</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="tech"
            size={160}
            zoom="face"
            borderStyle="circle"
            borderWidth={2}
            borderColor="#00ff88"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Tech</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="face"
            borderStyle="circle"
            borderWidth={2}
            borderColor="#00d4ff"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Friendly</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="sleek"
            size={160}
            zoom="face"
            borderStyle="circle"
            borderWidth={2}
            borderColor="#a855f7"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Sleek</strong>
          </div>
        </div>
      </div>

      {/* Full characters for reference */}
      <div
        style={{
          borderTop: "1px solid #e0e0e0",
          paddingTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
          alignItems: "end",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "160px" }}>
            <Character4eye compact variant="minimal" />
          </div>
          <span style={{ color: "#888", fontSize: "11px" }}>Full View</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "160px" }}>
            <Character4eye compact variant="tech" />
          </div>
          <span style={{ color: "#888", fontSize: "11px" }}>Full View</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "160px" }}>
            <Character4eye compact variant="friendly" />
          </div>
          <span style={{ color: "#888", fontSize: "11px" }}>Full View</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "160px" }}>
            <Character4eye compact variant="sleek" />
          </div>
          <span style={{ color: "#888", fontSize: "11px" }}>Full View</span>
        </div>
      </div>
    </div>
  ),
}

export const ProfilePhotoSizes: Story = {
  name: "Profile Photo - Size Scale",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>Size Variations</h3>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "end",
          flexWrap: "wrap",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={32}
            zoom="face"
            borderStyle="circle"
          />
          <div style={{ marginTop: "0.5rem", fontSize: "11px", color: "#888" }}>
            32px
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={48}
            zoom="face"
            borderStyle="circle"
          />
          <div style={{ marginTop: "0.5rem", fontSize: "11px", color: "#888" }}>
            48px
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={64}
            zoom="face"
            borderStyle="circle"
          />
          <div style={{ marginTop: "0.5rem", fontSize: "11px", color: "#888" }}>
            64px
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={96}
            zoom="face"
            borderStyle="circle"
          />
          <div style={{ marginTop: "0.5rem", fontSize: "11px", color: "#888" }}>
            96px
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={128}
            zoom="face"
            borderStyle="circle"
          />
          <div style={{ marginTop: "0.5rem", fontSize: "11px", color: "#888" }}>
            128px
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={180}
            zoom="face"
            borderStyle="circle"
          />
          <div style={{ marginTop: "0.5rem", fontSize: "11px", color: "#888" }}>
            180px
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={240}
            zoom="face"
            borderStyle="circle"
          />
          <div style={{ marginTop: "0.5rem", fontSize: "11px", color: "#888" }}>
            240px
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ProfilePhotoWithFeatures: Story = {
  name: "Profile Photo - With Visual Features",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>
        Profile Photos with Enhanced Features
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          justifyItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="tech"
            size={160}
            zoom="face"
            borderStyle="circle"
            borderWidth={2}
            borderColor="#00ff88"
            eyeDesign="aperture"
            showStatusLEDs
            statusLEDCount={3}
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "13px" }}>Aperture + LEDs</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="face"
            borderStyle="circle"
            borderWidth={2}
            borderColor="#a855f7"
            eyeDesign="orb"
            showForeheadMark
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "13px" }}>Orb + Mark</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="sleek"
            size={160}
            zoom="face"
            borderStyle="circle"
            borderWidth={2}
            borderColor="#00d4ff"
            eyeDesign="scanner"
            strapStyle="floating"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "13px" }}>Scanner + Float</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="tech"
            size={160}
            zoom="face"
            borderStyle="circle"
            borderWidth={2}
            borderColor="#f43f5e"
            eyeDesign="camera"
            showEarSensors
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "13px" }}>Camera + Sensors</strong>
          </div>
        </div>
      </div>
    </div>
  ),
}

// =====================
// Legacy Face Closeup Views (using ProfilePhoto)
// =====================

export const FaceCloseupGallery: Story = {
  name: "Face Closeup - All Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Closeup row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
          justifyItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="minimal"
            size={160}
            zoom="face"
            borderStyle="rounded"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Minimal</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="tech"
            size={160}
            zoom="face"
            borderStyle="rounded"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Tech</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="face"
            borderStyle="rounded"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Friendly</strong>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="sleek"
            size={160}
            zoom="face"
            borderStyle="rounded"
          />
          <div style={{ marginTop: "0.75rem" }}>
            <strong style={{ fontSize: "14px" }}>Sleek</strong>
          </div>
        </div>
      </div>

      {/* Full character reference */}
      <div
        style={{
          borderTop: "1px solid #e0e0e0",
          paddingTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
          alignItems: "end",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="minimal" />
          </div>
          <span style={{ color: "#888", fontSize: "11px" }}>Full View</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="tech" />
          </div>
          <span style={{ color: "#888", fontSize: "11px" }}>Full View</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" />
          </div>
          <span style={{ color: "#888", fontSize: "11px" }}>Full View</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="sleek" />
          </div>
          <span style={{ color: "#888", fontSize: "11px" }}>Full View</span>
        </div>
      </div>
    </div>
  ),
}

export const FaceCloseupLarge: Story = {
  name: "Face Closeup - Large",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "3rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={300}
          zoom="face"
          eyeGlowColor="#00d4ff"
          borderStyle="rounded"
        />
        <div style={{ marginTop: "1rem" }}>
          <strong style={{ fontSize: "16px" }}>Friendly - Cyan</strong>
          <p style={{ color: "#888", fontSize: "12px", margin: "4px 0 0" }}>
            Large closeup for detail inspection
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "300px" }}>
          <Character4eye compact variant="friendly" />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <strong style={{ fontSize: "16px" }}>Full Character</strong>
          <p style={{ color: "#888", fontSize: "12px", margin: "4px 0 0" }}>
            For comparison
          </p>
        </div>
      </div>
    </div>
  ),
}

export const FaceCloseupColors: Story = {
  name: "Face Closeup - Color Variations",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "1.5rem",
        justifyItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={140}
          zoom="face"
          eyeGlowColor="#00d4ff"
          borderStyle="circle"
        />
        <span
          style={{
            color: "#888",
            fontSize: "12px",
            marginTop: "0.5rem",
            display: "block",
          }}
        >
          Cyan
        </span>
      </div>
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={140}
          zoom="face"
          eyeGlowColor="#00ff88"
          borderStyle="circle"
        />
        <span
          style={{
            color: "#888",
            fontSize: "12px",
            marginTop: "0.5rem",
            display: "block",
          }}
        >
          Green
        </span>
      </div>
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={140}
          zoom="face"
          eyeGlowColor="#ff6b35"
          borderStyle="circle"
        />
        <span
          style={{
            color: "#888",
            fontSize: "12px",
            marginTop: "0.5rem",
            display: "block",
          }}
        >
          Orange
        </span>
      </div>
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={140}
          zoom="face"
          eyeGlowColor="#a855f7"
          borderStyle="circle"
        />
        <span
          style={{
            color: "#888",
            fontSize: "12px",
            marginTop: "0.5rem",
            display: "block",
          }}
        >
          Purple
        </span>
      </div>
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={140}
          zoom="face"
          eyeGlowColor="#f43f5e"
          borderStyle="circle"
        />
        <span
          style={{
            color: "#888",
            fontSize: "12px",
            marginTop: "0.5rem",
            display: "block",
          }}
        >
          Rose
        </span>
      </div>
    </div>
  ),
}

// ============================================================
// NEW: EYE DESIGN VARIATIONS
// ============================================================

export const EyeDesignGallery: Story = {
  name: "Eye Designs - All Styles",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>Eye Design Variations</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "1.5rem",
          alignItems: "end",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" eyeDesign="default" />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Default</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Basic concentric circles
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" eyeDesign="aperture" />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Aperture</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Camera iris blades
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" eyeDesign="camera" />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Camera</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Detailed lens rings
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" eyeDesign="orb" />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Orb</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Glowing magical sphere
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" eyeDesign="scanner" />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Scanner</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Horizontal scan lines
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" eyeDesign="ring" />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Ring</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Thin ring with pupil
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const EyeDesignAperture: Story = {
  name: "Eye Design - Aperture Variations",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>Aperture Blade Counts</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1.5rem",
          alignItems: "end",
        }}
      >
        {[4, 5, 6, 8, 12].map((blades) => (
          <div key={blades} style={{ textAlign: "center" }}>
            <div style={{ height: "180px" }}>
              <Character4eye
                compact
                variant="friendly"
                eyeDesign="aperture"
                apertureBlades={blades as any}
              />
            </div>
            <strong style={{ fontSize: "13px" }}>{blades} Blades</strong>
          </div>
        ))}
      </div>
    </div>
  ),
}

// ============================================================
// NEW: STRAP STYLE VARIATIONS
// ============================================================

export const StrapStyleGallery: Story = {
  name: "Strap Styles - All Types",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>Strap/Visor Style Variations</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "1.5rem",
          alignItems: "end",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" strapStyle="default" />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Default</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Standard wrap-around
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" strapStyle="smooth" />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Smooth</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Organic flowing curves
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" strapStyle="angular" />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Angular</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Sharp geometric edges
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" strapStyle="floating" />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Floating</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Detached segments
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" strapStyle="organic" />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Organic</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Flowing, living feel
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "180px" }}>
            <Character4eye compact variant="friendly" strapStyle="none" />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>None</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Eye only, no strap
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

// ============================================================
// NEW: VISUAL ELEMENTS
// ============================================================

export const VisualElementsGallery: Story = {
  name: "Visual Elements - Accessories",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>Optional Visual Elements</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          alignItems: "end",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "220px" }}>
            <Character4eye compact variant="tech" showAntenna />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Antenna</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Top sensor antenna
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "220px" }}>
            <Character4eye
              compact
              variant="tech"
              showStatusLEDs
              statusLEDCount={3}
            />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Status LEDs</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Indicator lights (1-3)
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "220px" }}>
            <Character4eye compact variant="tech" showEarSensors />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Ear Sensors</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Side strap sensors
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "220px" }}>
            <Character4eye compact variant="tech" showForeheadMark />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "13px" }}>Forehead Mark</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Tech diamond pattern
            </p>
          </div>
        </div>
      </div>

      <h4 style={{ margin: "1rem 0 0", color: "#555" }}>Data Flow Lines</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          alignItems: "end",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "200px" }}>
            <Character4eye compact variant="tech" showDataFlow />
          </div>
          <span style={{ color: "#888", fontSize: "12px" }}>
            Default Strap + Data Flow
          </span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "200px" }}>
            <Character4eye
              compact
              variant="tech"
              strapStyle="angular"
              showDataFlow
            />
          </div>
          <span style={{ color: "#888", fontSize: "12px" }}>
            Angular + Data Flow
          </span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "200px" }}>
            <Character4eye
              compact
              variant="tech"
              strapStyle="smooth"
              showDataFlow
            />
          </div>
          <span style={{ color: "#888", fontSize: "12px" }}>
            Smooth + Data Flow
          </span>
        </div>
      </div>
    </div>
  ),
}

export const StatusLEDVariations: Story = {
  name: "Status LEDs - Counts & Colors",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>LED Count Variations</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          alignItems: "end",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "200px" }}>
            <Character4eye
              compact
              variant="friendly"
              showStatusLEDs
              statusLEDCount={1}
            />
          </div>
          <strong style={{ fontSize: "13px" }}>1 LED</strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "200px" }}>
            <Character4eye
              compact
              variant="friendly"
              showStatusLEDs
              statusLEDCount={2}
            />
          </div>
          <strong style={{ fontSize: "13px" }}>2 LEDs</strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "200px" }}>
            <Character4eye
              compact
              variant="friendly"
              showStatusLEDs
              statusLEDCount={3}
            />
          </div>
          <strong style={{ fontSize: "13px" }}>3 LEDs</strong>
        </div>
      </div>

      <h3 style={{ margin: "1rem 0 0", color: "#333" }}>Custom LED Colors</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          alignItems: "end",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "200px" }}>
            <Character4eye
              compact
              variant="friendly"
              showStatusLEDs
              statusLEDCount={3}
              statusLEDColors={["#ff0000", "#ffff00", "#00ff00"]}
            />
          </div>
          <span style={{ color: "#888", fontSize: "12px" }}>Traffic Light</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "200px" }}>
            <Character4eye
              compact
              variant="friendly"
              showStatusLEDs
              statusLEDCount={3}
              statusLEDColors={["#a855f7", "#ec4899", "#f97316"]}
            />
          </div>
          <span style={{ color: "#888", fontSize: "12px" }}>Warm Gradient</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "200px" }}>
            <Character4eye
              compact
              variant="friendly"
              showStatusLEDs
              statusLEDCount={3}
              statusLEDColors={["#00d4ff", "#00d4ff", "#00d4ff"]}
            />
          </div>
          <span style={{ color: "#888", fontSize: "12px" }}>All Cyan</span>
        </div>
      </div>
    </div>
  ),
}

// ============================================================
// NEW: COMBINED FEATURE SHOWCASE
// ============================================================

export const CombinedFeatures: Story = {
  name: "Combined Features - Mix & Match",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>Feature Combinations</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          alignItems: "end",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "220px" }}>
            <Character4eye
              compact
              variant="tech"
              eyeDesign="camera"
              strapStyle="angular"
              showAntenna
              showStatusLEDs
              statusLEDCount={2}
            />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "12px" }}>Surveillance Bot</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Camera + Angular + Antenna
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "220px" }}>
            <Character4eye
              compact
              variant="friendly"
              eyeDesign="orb"
              strapStyle="smooth"
              showForeheadMark
              eyeGlowColor="#a855f7"
            />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "12px" }}>Mystic AI</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Orb + Smooth + Forehead
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "220px" }}>
            <Character4eye
              compact
              variant="sleek"
              eyeDesign="ring"
              strapStyle="floating"
              showEarSensors
              eyeGlowColor="#00ff88"
            />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "12px" }}>Hover Drone</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Ring + Floating + Sensors
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "220px" }}>
            <Character4eye
              compact
              variant="minimal"
              eyeDesign="scanner"
              strapStyle="organic"
              showDataFlow
              mood="scanning"
              eyeGlowColor="#f43f5e"
            />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "12px" }}>Bioscanner</strong>
            <p style={{ color: "#888", fontSize: "10px", margin: "2px 0 0" }}>
              Scanner + Organic + Flow
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const FullyLoadedCharacter: Story = {
  name: "Fully Loaded - All Features",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "4rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "350px" }}>
          <Character4eye
            compact
            variant="tech"
            eyeDesign="aperture"
            strapStyle="default"
            showAntenna
            showStatusLEDs
            statusLEDCount={3}
            showEarSensors
            showForeheadMark
            showDataFlow
            eyeGlowColor="#00d4ff"
            apertureBlades={6}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <strong style={{ fontSize: "16px" }}>Maximum Tech</strong>
          <p style={{ color: "#888", fontSize: "12px", margin: "4px 0 0" }}>
            All visual elements enabled
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "350px" }}>
          <Character4eye
            compact
            variant="friendly"
            eyeDesign="orb"
            strapStyle="smooth"
            showAntenna
            showStatusLEDs
            statusLEDCount={2}
            showForeheadMark
            eyeGlowColor="#a855f7"
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <strong style={{ fontSize: "16px" }}>Friendly Mystic</strong>
          <p style={{ color: "#888", fontSize: "12px", margin: "4px 0 0" }}>
            Warm magical aesthetic
          </p>
        </div>
      </div>
    </div>
  ),
}

// ============================================================
// NEW: EYE + STRAP MATRIX
// ============================================================

export const EyeStrapMatrix: Story = {
  name: "Eye × Strap Matrix",
  render: () => {
    const eyeDesigns = [
      "default",
      "aperture",
      "camera",
      "orb",
      "scanner",
      "ring",
    ] as const
    const strapStyles = ["default", "smooth", "angular", "floating"] as const

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ margin: 0, color: "#333" }}>
          Eye Design × Strap Style Combinations
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `100px repeat(${strapStyles.length}, 1fr)`,
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          {/* Header row */}
          <div></div>
          {strapStyles.map((strap) => (
            <div
              key={strap}
              style={{
                textAlign: "center",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              {strap}
            </div>
          ))}

          {/* Data rows */}
          {eyeDesigns.map((eye) => (
            <>
              <div
                key={`${eye}-label`}
                style={{ fontSize: "11px", fontWeight: "bold" }}
              >
                {eye}
              </div>
              {strapStyles.map((strap) => (
                <div key={`${eye}-${strap}`} style={{ height: "90px" }}>
                  <Character4eye
                    compact
                    variant="friendly"
                    eyeDesign={eye}
                    strapStyle={strap}
                  />
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    )
  },
}

// ============================================================
// NEW: THEMED PRESETS
// ============================================================

export const ThemedPresets: Story = {
  name: "Themed Presets",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>
        Ready-to-Use Theme Combinations
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1.5rem",
          alignItems: "end",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              height: "200px",
              background: "#0a0a12",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <Character4eye
              compact
              variant="tech"
              eyeDesign="camera"
              strapStyle="angular"
              showAntenna
              showStatusLEDs
              eyeGlowColor="#00ff00"
            />
          </div>
          <strong style={{ fontSize: "12px" }}>Night Vision</strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              height: "200px",
              background: "#1a1a2e",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <Character4eye
              compact
              variant="sleek"
              eyeDesign="aperture"
              strapStyle="smooth"
              showForeheadMark
              eyeGlowColor="#ff6b35"
            />
          </div>
          <strong style={{ fontSize: "12px" }}>Sunset Mode</strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              height: "200px",
              background: "#f0f9ff",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <Character4eye
              compact
              variant="friendly"
              eyeDesign="orb"
              strapStyle="organic"
              showStatusLEDs
              statusLEDCount={2}
              eyeGlowColor="#00d4ff"
            />
          </div>
          <strong style={{ fontSize: "12px" }}>Daylight</strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              height: "200px",
              background: "#2d1b4e",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <Character4eye
              compact
              variant="minimal"
              eyeDesign="ring"
              strapStyle="floating"
              showEarSensors
              eyeGlowColor="#a855f7"
            />
          </div>
          <strong style={{ fontSize: "12px" }}>Cosmic</strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              height: "200px",
              background: "#1e3a3a",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <Character4eye
              compact
              variant="tech"
              eyeDesign="scanner"
              strapStyle="default"
              showDataFlow
              showAntenna
              mood="scanning"
              eyeGlowColor="#00ff88"
            />
          </div>
          <strong style={{ fontSize: "12px" }}>Matrix</strong>
        </div>
      </div>
    </div>
  ),
}

// ============================================================
// EYE DESIGN CLOSEUPS (using ProfilePhoto)
// ============================================================

export const EyeCloseupGallery: Story = {
  name: "Eye Closeup - All Designs",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>Eye Design Detail Views</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "1.5rem",
          justifyItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={140}
            zoom="eye"
            eyeDesign="default"
            borderStyle="circle"
          />
          <strong
            style={{ fontSize: "12px", marginTop: "0.5rem", display: "block" }}
          >
            Default
          </strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={140}
            zoom="eye"
            eyeDesign="aperture"
            borderStyle="circle"
          />
          <strong
            style={{ fontSize: "12px", marginTop: "0.5rem", display: "block" }}
          >
            Aperture
          </strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={140}
            zoom="eye"
            eyeDesign="camera"
            borderStyle="circle"
          />
          <strong
            style={{ fontSize: "12px", marginTop: "0.5rem", display: "block" }}
          >
            Camera
          </strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={140}
            zoom="eye"
            eyeDesign="orb"
            borderStyle="circle"
          />
          <strong
            style={{ fontSize: "12px", marginTop: "0.5rem", display: "block" }}
          >
            Orb
          </strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={140}
            zoom="eye"
            eyeDesign="scanner"
            borderStyle="circle"
          />
          <strong
            style={{ fontSize: "12px", marginTop: "0.5rem", display: "block" }}
          >
            Scanner
          </strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={140}
            zoom="eye"
            eyeDesign="ring"
            borderStyle="circle"
          />
          <strong
            style={{ fontSize: "12px", marginTop: "0.5rem", display: "block" }}
          >
            Ring
          </strong>
        </div>
      </div>

      <h4 style={{ margin: "1rem 0 0", color: "#555" }}>
        Large Detail View: Aperture
      </h4>
      <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={250}
          zoom="eye"
          eyeDesign="aperture"
          eyeGlowColor="#00d4ff"
          borderStyle="circle"
        />
        <ProfilePhoto
          variant="tech"
          size={250}
          zoom="eye"
          eyeDesign="aperture"
          eyeGlowColor="#00ff88"
          borderStyle="circle"
        />
        <ProfilePhoto
          variant="sleek"
          size={250}
          zoom="eye"
          eyeDesign="aperture"
          eyeGlowColor="#a855f7"
          borderStyle="circle"
        />
      </div>
    </div>
  ),
}

export const EyeCloseupCamera: Story = {
  name: "Eye Closeup - Camera Detail",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "3rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="tech"
          size={300}
          zoom="eye"
          eyeDesign="camera"
          eyeGlowColor="#00d4ff"
          borderStyle="circle"
          borderWidth={3}
          borderColor="#00d4ff"
        />
        <div style={{ marginTop: "1rem" }}>
          <strong style={{ fontSize: "16px" }}>Camera Eye - Cyan</strong>
          <p style={{ color: "#888", fontSize: "12px", margin: "4px 0 0" }}>
            Detailed lens rings with highlight dots
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "300px" }}>
          <Character4eye compact variant="tech" eyeDesign="camera" />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <strong style={{ fontSize: "16px" }}>Full Character</strong>
          <p style={{ color: "#888", fontSize: "12px", margin: "4px 0 0" }}>
            With camera eye design
          </p>
        </div>
      </div>
    </div>
  ),
}

export const EyeCloseupOrb: Story = {
  name: "Eye Closeup - Orb Detail",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "3rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={300}
          zoom="eye"
          eyeDesign="orb"
          eyeGlowColor="#a855f7"
          borderStyle="circle"
          borderWidth={3}
          borderColor="#a855f7"
        />
        <div style={{ marginTop: "1rem" }}>
          <strong style={{ fontSize: "16px" }}>Orb Eye - Purple</strong>
          <p style={{ color: "#888", fontSize: "12px", margin: "4px 0 0" }}>
            Magical glowing sphere with sparkles
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "300px" }}>
          <Character4eye
            compact
            variant="friendly"
            eyeDesign="orb"
            eyeGlowColor="#a855f7"
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <strong style={{ fontSize: "16px" }}>Full Character</strong>
          <p style={{ color: "#888", fontSize: "12px", margin: "4px 0 0" }}>
            With orb eye design
          </p>
        </div>
      </div>
    </div>
  ),
}

// ============================================================
// COMBINED CLOSEUP SHOWCASE (using ProfilePhoto)
// ============================================================

export const CombinedCloseupShowcase: Story = {
  name: "Closeup - Combined Features",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h3 style={{ margin: 0, color: "#333" }}>Feature Combination Closeups</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
          justifyItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="tech"
            size={180}
            zoom="face"
            borderStyle="circle"
            eyeDesign="camera"
            strapStyle="angular"
            showStatusLEDs
            statusLEDCount={3}
            eyeGlowColor="#00ff00"
          />
          <strong
            style={{ fontSize: "12px", marginTop: "0.5rem", display: "block" }}
          >
            Surveillance
          </strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={180}
            zoom="face"
            borderStyle="circle"
            eyeDesign="orb"
            strapStyle="smooth"
            showForeheadMark
            eyeGlowColor="#a855f7"
          />
          <strong
            style={{ fontSize: "12px", marginTop: "0.5rem", display: "block" }}
          >
            Mystic
          </strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="sleek"
            size={180}
            zoom="face"
            borderStyle="circle"
            eyeDesign="ring"
            strapStyle="floating"
            showEarSensors
            eyeGlowColor="#00ff88"
          />
          <strong
            style={{ fontSize: "12px", marginTop: "0.5rem", display: "block" }}
          >
            Hover
          </strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="minimal"
            size={180}
            zoom="face"
            borderStyle="circle"
            eyeDesign="scanner"
            strapStyle="organic"
            eyeGlowColor="#f43f5e"
          />
          <strong
            style={{ fontSize: "12px", marginTop: "0.5rem", display: "block" }}
          >
            Scanner
          </strong>
        </div>
      </div>
    </div>
  ),
}
