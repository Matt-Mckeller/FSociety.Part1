/**
 * ProfileFrame Stories - Tiered Gamification Profile Borders
 *
 * Comprehensive documentation of the tier system with:
 * - All 5 tier levels showcased
 * - MUI theme integration examples
 * - Animation demonstrations
 * - Badge positioning options
 * - Character variant combinations
 */
import type { Meta, StoryObj } from "@storybook/react"
import {
  ProfileFrame,
  TierLevel,
  TIER_NAMES,
  TIER_DESCRIPTIONS,
  TIER_CONFIGS,
} from "../profile"
import { Character4eyeVariant } from "../poses/Character4eye"

const meta: Meta<typeof ProfileFrame> = {
  title: "BrandCore/Character/Profile/ProfileFrame",
  component: ProfileFrame,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a2e" },
        { name: "light", value: "#f5f5f5" },
        {
          name: "gradient",
          value: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        },
      ],
    },
    docs: {
      description: {
        component: `
## ProfileFrame - Tiered Gamification Borders

A comprehensive tier-based border system for the 4eye character profile photos.

### Tier Progression
| Tier | Name | Description | Features |
|------|------|-------------|----------|
| 1 | **Spark** | Beginning your journey | Simple thin border |
| 2 | **Glow** | Building momentum | Gradient border, subtle glow |
| 3 | **Shine** | Making an impact | Animated pulse, decorative dots |
| 4 | **Radiance** | Leading the way | Multi-layer ornate frame |
| 5 | **Brilliance** | Mastery achieved | Full effects with particles |

### Features
- **SVG-based** decorative borders
- **GSAP animations** for tiers 2+
- **MUI theme integration** via palette prop
- **Customizable colors** and badge positioning
        `,
      },
    },
  },
  argTypes: {
    tier: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5],
      description: "Tier level (1-5) determines visual complexity",
      table: {
        category: "Tier",
        defaultValue: { summary: "1" },
      },
    },
    size: {
      control: { type: "range", min: 80, max: 400, step: 10 },
      description: "Size in pixels",
      table: { category: "Appearance" },
    },
    showBadge: {
      control: "boolean",
      description: "Show tier badge",
      table: { category: "Badge" },
    },
    badgePosition: {
      control: { type: "select" },
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
      description: "Badge position",
      table: { category: "Badge" },
    },
    disableAnimations: {
      control: "boolean",
      description: "Disable GSAP animations",
      table: { category: "Animation" },
    },
    zoom: {
      control: { type: "select" },
      options: ["full", "head", "face", "eye", "tight", "shoulders", "torso"],
      description: "Profile photo zoom level",
      table: { category: "Photo" },
    },
    variant: {
      control: { type: "select" },
      options: ["friendly", "tech", "sleek", "minimal"],
      description: "Character variant",
      table: { category: "Character" },
    },
    themeColor: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "error", "info", "warning"],
      description: "MUI theme color key",
      table: { category: "Theme" },
    },
    shape: {
      control: { type: "select" },
      options: ["circle", "hexagon", "rounded"],
      description: "Frame shape",
      table: { category: "Appearance" },
    },
  },
}

export default meta
type Story = StoryObj<typeof ProfileFrame>

// =============================================================================
// BASIC TIER EXAMPLES
// =============================================================================

export const Tier1Spark: Story = {
  name: "Tier 1: Spark",
  args: {
    tier: 1,
    size: 200,
    variant: "friendly",
    showBadge: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Tier 1 - Spark**: The starting tier with a simple, clean border. Perfect for new users beginning their journey.",
      },
    },
  },
}

export const Tier2Glow: Story = {
  name: "Tier 2: Glow",
  args: {
    tier: 2,
    size: 200,
    variant: "friendly",
    showBadge: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Tier 2 - Glow**: Building momentum with a gradient border and subtle glow animation.",
      },
    },
  },
}

export const Tier3Shine: Story = {
  name: "Tier 3: Shine",
  args: {
    tier: 3,
    size: 200,
    variant: "friendly",
    showBadge: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Tier 3 - Shine**: Making an impact! Features animated pulse ring and decorative dots.",
      },
    },
  },
}

export const Tier4Radiance: Story = {
  name: "Tier 4: Radiance",
  args: {
    tier: 4,
    size: 200,
    variant: "friendly",
    showBadge: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Tier 4 - Radiance**: Leading the way with a multi-layer ornate frame and golden accents.",
      },
    },
  },
}

export const Tier5Brilliance: Story = {
  name: "Tier 5: Brilliance",
  args: {
    tier: 5,
    size: 200,
    variant: "friendly",
    showBadge: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Tier 5 - Brilliance**: Mastery achieved! The ultimate tier with particles, complex animations, and maximum visual impact.",
      },
    },
  },
}

// =============================================================================
// TIER GALLERY
// =============================================================================

export const TierGallery: Story = {
  name: "All Tiers Gallery",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", color: "#fff" }}>
        <h2 style={{ margin: 0, marginBottom: 8 }}>Tier Progression System</h2>
        <p style={{ margin: 0, opacity: 0.7 }}>From Spark to Brilliance</p>
      </div>
      <div
        style={{
          display: "flex",
          gap: 30,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {([1, 2, 3, 4, 5] as TierLevel[]).map((tier) => (
          <div
            key={tier}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <ProfileFrame
              tier={tier}
              size={180}
              variant="friendly"
              showBadge
              badgePosition="bottom-right"
            />
            <div style={{ textAlign: "center", color: "#fff" }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>
                {TIER_NAMES[tier]}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {TIER_DESCRIPTIONS[tier]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complete tier gallery showing all 5 levels of progression from Spark to Brilliance.",
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
        gap: 30,
        alignItems: "flex-end",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {[80, 120, 180, 240, 320].map((size) => (
        <div
          key={size}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ProfileFrame tier={4} size={size} variant="friendly" showBadge />
          <span style={{ color: "#fff", fontSize: 12, opacity: 0.7 }}>
            {size}px
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ProfileFrame scales gracefully from small avatars (80px) to large profile displays (320px).",
      },
    },
  },
}

// =============================================================================
// BADGE POSITIONS
// =============================================================================

export const BadgePositions: Story = {
  name: "Badge Positions",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 40,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map(
        (position) => (
          <div
            key={position}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <ProfileFrame
              tier={3}
              size={160}
              variant="friendly"
              showBadge
              badgePosition={position}
            />
            <span style={{ color: "#fff", fontSize: 12, opacity: 0.7 }}>
              {position}
            </span>
          </div>
        ),
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badge can be positioned in any corner of the frame.",
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
          gap: 30,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {variants.map((variant) => (
          <div
            key={variant}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <ProfileFrame tier={3} size={160} variant={variant} showBadge />
            <span style={{ color: "#fff", fontSize: 12, opacity: 0.7 }}>
              {variant}
            </span>
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "ProfileFrame works with all Character4eye variants.",
      },
    },
  },
}

// =============================================================================
// ZOOM LEVELS
// =============================================================================

export const ZoomLevels: Story = {
  name: "Zoom Levels",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 30,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {(["full", "head", "face", "eye", "tight"] as const).map((zoom) => (
        <div
          key={zoom}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <ProfileFrame
            tier={4}
            size={160}
            variant="friendly"
            zoom={zoom}
            showBadge
          />
          <span style={{ color: "#fff", fontSize: 12, opacity: 0.7 }}>
            {zoom}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different zoom levels for the inner profile photo: full (entire character), head (complete head), face (face features), eye (brain/eye focus), tight (extreme closeup).",
      },
    },
  },
}

// =============================================================================
// CUSTOM COLORS
// =============================================================================

export const CustomColors: Story = {
  name: "Custom Colors",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 30,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* Purple theme */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <ProfileFrame
          tier={4}
          size={160}
          variant="friendly"
          customColors={{
            primary: "#9333ea",
            accent: "#c084fc",
            glow: "#9333ea50",
          }}
          showBadge
        />
        <span style={{ color: "#fff", fontSize: 12, opacity: 0.7 }}>
          Purple
        </span>
      </div>
      {/* Teal theme */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <ProfileFrame
          tier={4}
          size={160}
          variant="friendly"
          customColors={{
            primary: "#14b8a6",
            accent: "#5eead4",
            glow: "#14b8a650",
          }}
          showBadge
        />
        <span style={{ color: "#fff", fontSize: 12, opacity: 0.7 }}>Teal</span>
      </div>
      {/* Pink theme */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <ProfileFrame
          tier={4}
          size={160}
          variant="friendly"
          customColors={{
            primary: "#ec4899",
            accent: "#f472b6",
            glow: "#ec489950",
          }}
          showBadge
        />
        <span style={{ color: "#fff", fontSize: 12, opacity: 0.7 }}>Pink</span>
      </div>
      {/* Green theme */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <ProfileFrame
          tier={4}
          size={160}
          variant="friendly"
          customColors={{
            primary: "#22c55e",
            accent: "#86efac",
            glow: "#22c55e50",
          }}
          showBadge
        />
        <span style={{ color: "#fff", fontSize: 12, opacity: 0.7 }}>Green</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Override default tier colors with custom color themes.",
      },
    },
  },
}

// =============================================================================
// MUI THEME INTEGRATION
// =============================================================================

// Mock MUI palette for demonstration
const mockPalette = {
  primary: { main: "#3b82f6", light: "#60a5fa", dark: "#1d4ed8" },
  secondary: { main: "#8b5cf6", light: "#a78bfa", dark: "#6d28d9" },
  success: { main: "#22c55e", light: "#4ade80" },
  error: { main: "#ef4444", light: "#f87171" },
  info: { main: "#06b6d4", light: "#22d3ee" },
  warning: { main: "#f59e0b", light: "#fbbf24" },
}

export const MUIThemeIntegration: Story = {
  name: "MUI Theme Colors",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", color: "#fff" }}>
        <h3 style={{ margin: 0, marginBottom: 8 }}>MUI Theme Integration</h3>
        <p style={{ margin: 0, opacity: 0.7, fontSize: 14 }}>
          Pass theme.palette to use theme colors
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: 30,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {(
          [
            "primary",
            "secondary",
            "success",
            "error",
            "info",
            "warning",
          ] as const
        ).map((color) => (
          <div
            key={color}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <ProfileFrame
              tier={4}
              size={140}
              variant="friendly"
              themeColor={color}
              palette={mockPalette}
              showBadge
            />
            <span style={{ color: "#fff", fontSize: 12, opacity: 0.7 }}>
              {color}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Use MUI theme colors by passing the \`themeColor\` and \`palette\` props:

\`\`\`tsx
import { useTheme } from "@mui/material/styles"

const MyComponent = () => {
  const theme = useTheme()
  return (
    <ProfileFrame
      tier={4}
      themeColor="primary"
      palette={theme.palette}
    />
  )
}
\`\`\`
        `,
      },
    },
  },
}

// =============================================================================
// ANIMATION STATES
// =============================================================================

export const AnimationsDisabled: Story = {
  name: "Animations Disabled",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 30,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <ProfileFrame
          tier={5}
          size={180}
          variant="friendly"
          disableAnimations={false}
          showBadge
        />
        <span style={{ color: "#fff", fontSize: 12 }}>Animated</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <ProfileFrame
          tier={5}
          size={180}
          variant="friendly"
          disableAnimations={true}
          showBadge
        />
        <span style={{ color: "#fff", fontSize: 12 }}>Static</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Animations can be disabled for reduced motion preferences or performance optimization.",
      },
    },
  },
}

// =============================================================================
// TIER COMPARISON
// =============================================================================

export const TierComparison: Story = {
  name: "Tier Comparison (Same Variant)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {/* Tech variant across all tiers */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
        }}
      >
        <h3 style={{ color: "#fff", margin: 0 }}>Tech Variant</h3>
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {([1, 2, 3, 4, 5] as TierLevel[]).map((tier) => (
            <ProfileFrame
              key={tier}
              tier={tier}
              size={120}
              variant="tech"
              showBadge
            />
          ))}
        </div>
      </div>
      {/* Sleek variant across all tiers */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
        }}
      >
        <h3 style={{ color: "#fff", margin: 0 }}>Sleek Variant</h3>
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {([1, 2, 3, 4, 5] as TierLevel[]).map((tier) => (
            <ProfileFrame
              key={tier}
              tier={tier}
              size={120}
              variant="sleek"
              showBadge
            />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Same character variant shown across all tier levels for comparison.",
      },
    },
  },
}

// =============================================================================
// LEADERBOARD EXAMPLE
// =============================================================================

export const LeaderboardExample: Story = {
  name: "Leaderboard Example",
  render: () => {
    const leaderboard = [
      {
        name: "Champion",
        tier: 5 as TierLevel,
        score: 15420,
        variant: "friendly" as const,
      },
      {
        name: "Veteran",
        tier: 4 as TierLevel,
        score: 12350,
        variant: "tech" as const,
      },
      {
        name: "Expert",
        tier: 4 as TierLevel,
        score: 11200,
        variant: "sleek" as const,
      },
      {
        name: "Pro",
        tier: 3 as TierLevel,
        score: 8900,
        variant: "minimal" as const,
      },
      {
        name: "Rising Star",
        tier: 2 as TierLevel,
        score: 5600,
        variant: "friendly" as const,
      },
    ]

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: 20,
          background: "#16213e",
          borderRadius: 16,
        }}
      >
        <h3 style={{ color: "#fff", margin: 0, textAlign: "center" }}>
          🏆 Leaderboard
        </h3>
        {leaderboard.map((player, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "8px 16px",
              background:
                i === 0 ? "rgba(239, 68, 68, 0.1)" : "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border:
                i === 0
                  ? "1px solid rgba(239, 68, 68, 0.3)"
                  : "1px solid transparent",
            }}
          >
            <span style={{ color: "#fff", fontWeight: 600, width: 24 }}>
              #{i + 1}
            </span>
            <ProfileFrame
              tier={player.tier}
              size={60}
              variant={player.variant}
              showBadge={false}
              zoom="face"
            />
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontWeight: 500 }}>
                {player.name}
              </div>
              <div style={{ color: "#9ca3af", fontSize: 12 }}>
                {TIER_NAMES[player.tier]}
              </div>
            </div>
            <div style={{ color: "#fbbf24", fontWeight: 600 }}>
              {player.score.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example of ProfileFrame used in a gamified leaderboard context.",
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
    tier: 3,
    size: 200,
    variant: "friendly",
    zoom: "face",
    showBadge: true,
    badgePosition: "bottom-right",
    disableAnimations: false,
    shape: "circle",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to experiment with all ProfileFrame props.",
      },
    },
  },
}
