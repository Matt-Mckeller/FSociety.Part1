import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ExpanseLogo, ExpanseLogoLegacy, type LogoSize } from "expanse.dynamicAssets/logo"

/**
 * ExpanseLogo - The official Expanse logo component.
 * 
 * A simplified wrapper with refined "perfect" settings baked in.
 * For most use cases, just specify the size:
 * 
 * ```tsx
 * <ExpanseLogo size="md" />
 * <ExpanseLogo size={48} />
 * ```
 * 
 * **Size Presets:**
 * - `'xs'`: 16px - badges, inline text
 * - `'sm'`: 24px - navigation icons
 * - `'md'`: 48px - standard logo (default)
 * - `'lg'`: 64px - hero sections
 * - `'xl'`: 96px - landing pages
 * - `'xxl'`: 128px - splash screens
 * 
 * **Theme Support:**
 * - `'auto'`: Detect from MUI theme
 * - `'dark'`: Dark logo for light backgrounds
 * - `'light'`: Light logo for dark backgrounds
 */
const meta: Meta<typeof ExpanseLogo> = {
  title: "Branding/Logo/ExpanseLogo",
  component: ExpanseLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a2e" },
        { name: "gray", value: "#f5f5f5" },
      ],
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      description: "Size preset or pixel value",
    },
    theme: {
      control: "select",
      options: ["auto", "dark", "light", "brand"],
      description: "Theme variant for different backgrounds",
    },
    variant: {
      control: "select",
      options: ["3d", "flat"],
      description: "Rendering style",
    },
    showMoon: {
      control: "boolean",
      description: "Show the moon element",
    },
    showEye: {
      control: "boolean",
      description: "Show the pupil/eye",
    },
  },
}

export default meta
type Story = StoryObj<typeof ExpanseLogo>

// =============================================================================
// DEFAULT STORIES
// =============================================================================

/**
 * Default logo with refined settings.
 * The "perfect" logo with all settings optimized.
 */
export const Default: Story = {
  args: {
    size: "lg",
  },
}

/**
 * Medium size - standard usage
 */
export const Medium: Story = {
  args: {
    size: "md",
  },
}

/**
 * Large size for hero sections
 */
export const Large: Story = {
  args: {
    size: "xl",
  },
}

// =============================================================================
// SIZE PRESETS
// =============================================================================

/**
 * All size presets side by side
 */
export const SizePresets: Story = {
  render: () => {
    const sizes: LogoSize[] = ["xs", "sm", "md", "lg", "xl", "xxl"]
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
        {sizes.map((size) => (
          <div key={size} style={{ textAlign: "center" }}>
            <ExpanseLogo size={size} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#666" }}>
              {size}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

/**
 * Custom pixel sizes
 */
export const CustomSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      <ExpanseLogo size={32} />
      <ExpanseLogo size={56} />
      <ExpanseLogo size={72} />
      <ExpanseLogo size={100} />
    </div>
  ),
}

// =============================================================================
// THEME VARIANTS
// =============================================================================

/**
 * Theme comparison - dark and light variants
 */
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div
        style={{
          padding: "2rem",
          background: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <ExpanseLogo size="xl" theme="dark" />
        <span style={{ color: "#666", fontSize: "0.875rem" }}>theme="dark"</span>
        <span style={{ color: "#999", fontSize: "0.75rem" }}>For light backgrounds</span>
      </div>
      <div
        style={{
          padding: "2rem",
          background: "#1a1a2e",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <ExpanseLogo size="xl" theme="light" />
        <span style={{ color: "#aaa", fontSize: "0.875rem" }}>theme="light"</span>
        <span style={{ color: "#777", fontSize: "0.75rem" }}>For dark backgrounds</span>
      </div>
    </div>
  ),
}

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * 3D vs Flat rendering variants
 */
export const RenderingVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "3rem" }}>
      <div style={{ textAlign: "center" }}>
        <ExpanseLogo size="xl" variant="3d" />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          variant="3d" (default)
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ExpanseLogo size="xl" variant="flat" />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          variant="flat"
        </div>
      </div>
    </div>
  ),
}

// =============================================================================
// ELEMENT VISIBILITY
// =============================================================================

/**
 * Moon visibility toggle
 */
export const MoonToggle: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "3rem" }}>
      <div style={{ textAlign: "center" }}>
        <ExpanseLogo size="xl" showMoon={true} />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          With moon
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ExpanseLogo size="xl" showMoon={false} />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          Without moon
        </div>
      </div>
    </div>
  ),
}

/**
 * Eye/pupil visibility toggle
 */
export const EyeToggle: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "3rem" }}>
      <div style={{ textAlign: "center" }}>
        <ExpanseLogo size="xl" showEye={true} />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          With eye
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ExpanseLogo size="xl" showEye={false} />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          Without eye
        </div>
      </div>
    </div>
  ),
}

// =============================================================================
// USE CASES
// =============================================================================

/**
 * Navigation header example
 */
export const NavigationExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1.5rem",
        background: "#1a1a2e",
        borderRadius: "8px",
      }}
    >
      <ExpanseLogo size="sm" theme="light" />
      <span style={{ color: "#fff", fontWeight: 600, fontSize: "1.125rem" }}>
        Expanse
      </span>
    </div>
  ),
}

/**
 * Hero section example
 */
export const HeroExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        padding: "3rem",
        background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
        borderRadius: "16px",
      }}
    >
      <ExpanseLogo size="xxl" theme="light" />
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "#fff", margin: 0, fontSize: "2rem" }}>
          Welcome to Expanse
        </h1>
        <p style={{ color: "#aaa", margin: "0.5rem 0 0" }}>
          Your journey to financial wellness starts here
        </p>
      </div>
    </div>
  ),
}

/**
 * Badge/avatar example
 */
export const AvatarExample: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#1a1a2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ExpanseLogo size="sm" theme="light" />
      </div>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "8px",
          background: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ExpanseLogo size="xs" theme="dark" />
      </div>
    </div>
  ),
}

// =============================================================================
// LEGACY COMPONENT
// =============================================================================

/**
 * Legacy ExpanseLogo component (original flat version)
 */
export const LegacyComponent: Story = {
  render: () => (
    <div style={{ textAlign: "center" }}>
      <ExpanseLogoLegacy height={96} fill="#1a1a2e" ringFill="#1a1a2e" />
      <div style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
        ExpanseLogoLegacy (original component)
      </div>
    </div>
  ),
}
