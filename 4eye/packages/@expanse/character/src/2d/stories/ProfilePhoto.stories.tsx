/**
 * ProfilePhoto Stories - Zoom Levels and Cropping Options
 *
 * Comprehensive documentation of the ProfilePhoto component with:
 * - All zoom level presets showcased
 * - Character anatomy reference
 * - Border and background options
 * - Custom viewBox examples
 */
import type { Meta, StoryObj } from "@storybook/react"
import { ProfilePhoto, ProfileZoom } from "../profile"
import { Character4eyeVariant } from "../figure/Character4eye"

const meta: Meta<typeof ProfilePhoto> = {
  title: "Character/2D/Profile/ProfilePhoto",
  component: ProfilePhoto,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f5f5f5" },
        { name: "dark", value: "#1a1a2e" },
        {
          name: "gradient",
          value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
      ],
    },
    docs: {
      description: {
        component: `
## ProfilePhoto - Cropped Profile Views

Creates precise zoom views of the 4eye character for avatars, profile pictures, and UI elements.

### Character Anatomy Reference

\`\`\`
Y=0      ┌─────────┐  Head top
         │    ○    │  Eye center at Y=16.5
Y=33     └─────────┘  Head bottom
Y=38     ── neck ──   Neck gap (~5 units)
Y=46     ╔═════════╗  Shoulder attachment
Y=51     ║         ║  Body stroke center
         ║  BODY   ║  Body length = 99
Y=150    ╚═════════╝  Body end
         ╱         ╲
        ╱   LEGS    ╲  Leg length = 99
       ╱             ╲
Y~260  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  Character bottom
\`\`\`

### Zoom Levels

| Level | Target | Use Case |
|-------|--------|----------|
| \`full\` | Entire character | Full avatar, mascot display |
| \`head\` | Complete head | Profile cards, larger avatars |
| \`face\` | Face features | Default - best for most avatars |
| \`eye\` | Brain/eye area | Focus on the "intelligence" |
| \`tight\` | Just the eye | Extreme detail, favicon |
| \`shoulders\` | Head + shoulders | Professional portrait style |
| \`torso\` | Upper body | Character personality display |
        `,
      },
    },
  },
  argTypes: {
    zoom: {
      control: { type: "select" },
      options: ["full", "head", "face", "eye", "tight", "shoulders", "torso"],
      description: "Zoom level preset",
      table: {
        category: "Zoom",
        defaultValue: { summary: "face" },
      },
    },
    size: {
      control: { type: "range", min: 60, max: 400, step: 10 },
      description: "Size in pixels",
      table: { category: "Appearance" },
    },
    variant: {
      control: { type: "select" },
      options: ["friendly", "tech", "sleek", "minimal"],
      description: "Character variant",
      table: { category: "Character" },
    },
    borderStyle: {
      control: { type: "select" },
      options: ["circle", "rounded", "square", "none"],
      description: "Border shape",
      table: { category: "Border" },
    },
    borderWidth: {
      control: { type: "range", min: 0, max: 10, step: 1 },
      description: "Border width in pixels",
      table: { category: "Border" },
    },
    borderColor: {
      control: "color",
      description: "Border color",
      table: { category: "Border" },
    },
    background: {
      control: { type: "select" },
      options: ["gradient", "solid", "transparent"],
      description: "Background style",
      table: { category: "Background" },
    },
    shadow: {
      control: "boolean",
      description: "Show shadow",
      table: { category: "Appearance" },
    },
    eyeDesign: {
      control: { type: "select" },
      options: ["default", "aperture", "camera", "orb", "scanner", "ring"],
      description: "Eye design style",
      table: { category: "Character" },
    },
  },
}

export default meta
type Story = StoryObj<typeof ProfilePhoto>

// =============================================================================
// ZOOM LEVEL COMPARISON
// =============================================================================

export const ZoomLevelComparison: Story = {
  name: "All Zoom Levels",
  render: () => {
    const zoomLevels: {
      zoom: ProfileZoom
      label: string
      description: string
    }[] = [
      { zoom: "full", label: "Full", description: "Entire character" },
      { zoom: "head", label: "Head", description: "Complete head" },
      { zoom: "face", label: "Face", description: "Face features (default)" },
      { zoom: "eye", label: "Eye", description: "Brain/eye focus" },
      { zoom: "tight", label: "Tight", description: "Extreme closeup" },
      { zoom: "shoulders", label: "Shoulders", description: "Portrait style" },
      { zoom: "torso", label: "Torso", description: "Upper body" },
    ]

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, marginBottom: 8 }}>Zoom Level Comparison</h2>
          <p style={{ margin: 0, color: "#666" }}>
            Different zoom presets for various use cases
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 24,
            justifyItems: "center",
          }}
        >
          {zoomLevels.map(({ zoom, label, description }) => (
            <div
              key={zoom}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <ProfilePhoto
                variant="friendly"
                size={140}
                zoom={zoom}
                borderStyle="circle"
              />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
                <div style={{ color: "#888", fontSize: 11 }}>{description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "All available zoom levels side by side for comparison.",
      },
    },
  },
}

// =============================================================================
// HEAD-FOCUSED ZOOMS
// =============================================================================

export const HeadFocusedZooms: Story = {
  name: "Head-Focused Zooms",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        alignItems: "flex-end",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={200}
          zoom="head"
          borderStyle="circle"
        />
        <div style={{ marginTop: 12 }}>
          <strong>Head</strong>
          <p style={{ color: "#888", fontSize: 12, margin: "4px 0 0" }}>
            Profile cards, larger avatars
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={200}
          zoom="face"
          borderStyle="circle"
        />
        <div style={{ marginTop: 12 }}>
          <strong>Face (Default)</strong>
          <p style={{ color: "#888", fontSize: 12, margin: "4px 0 0" }}>
            Best for most avatars
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={200}
          zoom="eye"
          borderStyle="circle"
        />
        <div style={{ marginTop: 12 }}>
          <strong>Eye</strong>
          <p style={{ color: "#888", fontSize: 12, margin: "4px 0 0" }}>
            Focus on intelligence
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={200}
          zoom="tight"
          borderStyle="circle"
        />
        <div style={{ marginTop: 12 }}>
          <strong>Tight</strong>
          <p style={{ color: "#888", fontSize: 12, margin: "4px 0 0" }}>
            Favicons, tiny icons
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Head-focused zoom levels for avatars and icons.",
      },
    },
  },
}

// =============================================================================
// BODY-FOCUSED ZOOMS
// =============================================================================

export const BodyFocusedZooms: Story = {
  name: "Body-Focused Zooms",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 40,
        alignItems: "flex-end",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={220}
          zoom="shoulders"
          borderStyle="rounded"
        />
        <div style={{ marginTop: 12 }}>
          <strong>Shoulders</strong>
          <p style={{ color: "#888", fontSize: 12, margin: "4px 0 0" }}>
            Professional portrait style
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={220}
          zoom="torso"
          borderStyle="rounded"
        />
        <div style={{ marginTop: 12 }}>
          <strong>Torso</strong>
          <p style={{ color: "#888", fontSize: 12, margin: "4px 0 0" }}>
            Character personality display
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={220}
          zoom="full"
          borderStyle="rounded"
        />
        <div style={{ marginTop: 12 }}>
          <strong>Full</strong>
          <p style={{ color: "#888", fontSize: 12, margin: "4px 0 0" }}>
            Complete character
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Body-focused zoom levels for larger displays and character showcases.",
      },
    },
  },
}

// =============================================================================
// SIZE VARIATIONS
// =============================================================================

export const SizeVariations: Story = {
  name: "Size Variations",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 24,
        alignItems: "flex-end",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {[48, 64, 96, 128, 180, 240].map((size) => (
        <div key={size} style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={size}
            zoom="face"
            borderStyle="circle"
          />
          <div style={{ marginTop: 8, fontSize: 12, color: "#888" }}>
            {size}px
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ProfilePhoto scales gracefully from tiny icons to large displays.",
      },
    },
  },
}

// =============================================================================
// BORDER STYLES
// =============================================================================

export const BorderStyles: Story = {
  name: "Border Styles",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {(["circle", "rounded", "square", "none"] as const).map((style) => (
        <div key={style} style={{ textAlign: "center" }}>
          <ProfilePhoto
            variant="friendly"
            size={160}
            zoom="face"
            borderStyle={style}
            borderWidth={style !== "none" ? 4 : 0}
            borderColor="#00d4ff"
          />
          <div style={{ marginTop: 12, fontWeight: 500 }}>{style}</div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different border shapes for various design contexts.",
      },
    },
  },
}

// =============================================================================
// BORDER COLORS
// =============================================================================

export const BorderColors: Story = {
  name: "Border Colors",
  render: () => {
    const colors = [
      { color: "#00d4ff", name: "Cyan" },
      { color: "#00ff88", name: "Green" },
      { color: "#f43f5e", name: "Rose" },
      { color: "#a855f7", name: "Purple" },
      { color: "#f59e0b", name: "Amber" },
      { color: "#3b82f6", name: "Blue" },
    ]

    return (
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {colors.map(({ color, name }) => (
          <div key={color} style={{ textAlign: "center" }}>
            <ProfilePhoto
              variant="tech"
              size={140}
              zoom="face"
              borderStyle="circle"
              borderWidth={6}
              borderColor={color}
            />
            <div style={{ marginTop: 8, fontSize: 12, color: "#888" }}>
              {name}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

// =============================================================================
// BACKGROUNDS
// =============================================================================

export const Backgrounds: Story = {
  name: "Background Options",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 24,
        flexWrap: "wrap",
        justifyContent: "center",
        padding: 24,
        background: "#1a1a2e",
        borderRadius: 16,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={140}
          zoom="face"
          background="gradient"
        />
        <div style={{ marginTop: 8, fontSize: 12, color: "#fff" }}>
          Gradient
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={140}
          zoom="face"
          background="solid"
          backgroundColor="#16213e"
        />
        <div style={{ marginTop: 8, fontSize: 12, color: "#fff" }}>Solid</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={140}
          zoom="face"
          background="transparent"
        />
        <div style={{ marginTop: 8, fontSize: 12, color: "#fff" }}>
          Transparent
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ProfilePhoto
          variant="friendly"
          size={140}
          zoom="face"
          background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        />
        <div style={{ marginTop: 8, fontSize: 12, color: "#fff" }}>Custom</div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Various background options including custom CSS gradients.",
      },
    },
  },
}

// =============================================================================
// CHARACTER VARIANTS
// =============================================================================

export const CharacterVariants: Story = {
  name: "Character Variants",
  render: () => {
    const variants: Character4eyeVariant[] = [
      "friendly",
      "tech",
      "sleek",
      "minimal",
    ]
    return (
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {variants.map((variant) => (
          <div key={variant} style={{ textAlign: "center" }}>
            <ProfilePhoto
              variant={variant}
              size={160}
              zoom="face"
              borderStyle="circle"
            />
            <div style={{ marginTop: 12, fontWeight: 500 }}>{variant}</div>
          </div>
        ))}
      </div>
    )
  },
}

// =============================================================================
// EYE DESIGNS
// =============================================================================

export const EyeDesigns: Story = {
  name: "Eye Designs at Eye Zoom",
  render: () => {
    const designs = [
      "default",
      "aperture",
      "camera",
      "orb",
      "scanner",
      "ring",
    ] as const
    return (
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {designs.map((design) => (
          <div key={design} style={{ textAlign: "center" }}>
            <ProfilePhoto
              variant="friendly"
              eyeDesign={design}
              size={160}
              zoom="eye"
              borderStyle="circle"
            />
            <div style={{ marginTop: 12 }}>{design}</div>
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Different eye designs shown at eye zoom level.",
      },
    },
  },
}

// =============================================================================
// AVATAR GRID
// =============================================================================

export const AvatarGrid: Story = {
  name: "Avatar Grid (Use Case)",
  render: () => {
    const users = [
      {
        name: "Alex",
        variant: "friendly" as const,
        eyeDesign: "default" as const,
      },
      {
        name: "Jordan",
        variant: "tech" as const,
        eyeDesign: "aperture" as const,
      },
      { name: "Sam", variant: "sleek" as const, eyeDesign: "camera" as const },
      { name: "Casey", variant: "minimal" as const, eyeDesign: "orb" as const },
      {
        name: "Morgan",
        variant: "friendly" as const,
        eyeDesign: "scanner" as const,
      },
      { name: "Riley", variant: "tech" as const, eyeDesign: "ring" as const },
    ]

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <h3 style={{ margin: 0, textAlign: "center" }}>Team Members</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            maxWidth: 400,
          }}
        >
          {users.map((user) => (
            <div key={user.name} style={{ textAlign: "center" }}>
              <ProfilePhoto
                variant={user.variant}
                eyeDesign={user.eyeDesign}
                size={100}
                zoom="face"
                borderStyle="circle"
              />
              <div style={{ marginTop: 8, fontSize: 14, fontWeight: 500 }}>
                {user.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Example of ProfilePhoto used in a team/user grid layout.",
      },
    },
  },
}

// =============================================================================
// PLAYGROUND
// =============================================================================

export const Playground: Story = {
  name: "Playground",
  args: {
    size: 200,
    zoom: "face",
    variant: "friendly",
    borderStyle: "circle",
    borderWidth: 0,
    borderColor: "#00d4ff",
    background: "gradient",
    shadow: true,
    eyeDesign: "default",
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to experiment with ProfilePhoto props.",
      },
    },
  },
}
