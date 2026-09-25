/**
 * ActionBar Stories
 *
 * Demonstrates ActionBar as a pure visual container.
 * ActionBar handles styling and layout, not selection behavior.
 *
 * For selection behavior, see ActionGroup stories.
 * For screen positioning, see ActionDock stories.
 */

import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { ActionBar } from "./ActionBar"
import { ActionButton, type ActionButtonActiveShape } from "../../action-button"
import { ActionGroup } from "../../action-group"
import type { ActionBarVariant, ActionBarShape } from "../types"

// Icons
import HomeIcon from "@mui/icons-material/Home"
import SearchIcon from "@mui/icons-material/Search"
import SettingsIcon from "@mui/icons-material/Settings"
import EditIcon from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import SelectAllIcon from "@mui/icons-material/SelectAll"
import ChatIcon from "@mui/icons-material/Chat"
import GridOnIcon from "@mui/icons-material/GridOn"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"

// =============================================================================
// Meta
// =============================================================================

const meta: Meta<typeof ActionBar> = {
  title: "Layout Systems/HUD Components/ActionBar/Docs",
  component: ActionBar,
  parameters: {
    layout: "centered",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
    docs: {
      description: {
        component: `
# ActionBar - Pure Visual Container

ActionBar is a styled container for toolbar-style interfaces.

**What ActionBar handles:**
- Visual styling (variant for surface, shape for corners)
- Layout (orientation, gap, padding, alignment)
- Sizing (thickness, length)

**What ActionBar does NOT handle:**
- Screen positioning → use \`ActionDock\`
- Selection behavior → use \`ActionGroup\`

**Variants (surface treatment):**
- \`glass\` - Translucent with blur (default)
- \`solid\` - Opaque surface, no blur
- \`frosted\` - Heavy blur, elevated
- \`minimal\` - No background
- \`outlined\` - Transparent with border
- \`technical\` - Sharp, accent border

**Shapes (border radius):**
- \`pill\` - Full rounded 28px (default)
- \`rounded\` - Medium rounded 12px
- \`soft\` - Subtle rounded 6px
- \`square\` - Sharp corners 0px
- \`capsule\` - Elongated 16px

**Overrides:** Any visual prop can be overridden directly:
\`\`\`tsx
<ActionBar variant="glass" blur={20} bgcolor="rgba(0,0,0,0.5)" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["glass", "solid", "frosted", "minimal", "outlined", "technical"],
    },
    shape: {
      control: "select",
      options: ["pill", "rounded", "soft", "square", "capsule"],
    },
    thickness: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    alignment: {
      control: "select",
      options: ["start", "center", "end", "space-between"],
    },
  },
}

export default meta
type Story = StoryObj<typeof ActionBar>

// =============================================================================
// Basic Stories
// =============================================================================

/**
 * Default ActionBar with glass variant and pill shape.
 * Uses dark glass on light backgrounds for high contrast.
 * ActionButtons automatically get correct colors via context.
 */
export const Default: Story = {
  render: () => (
    <ActionBar>
      <ActionButton icon={<HomeIcon />} label="Home" />
      <ActionButton icon={<SearchIcon />} label="Search" />
      <ActionButton icon={<SettingsIcon />} label="Settings" />
    </ActionBar>
  ),
}

/**
 * All variant presets side by side.
 * ActionButtons automatically adapt colors based on variant's surface.
 */
export const Variants: Story = {
  render: () => {
    const variants: ActionBarVariant[] = [
      "glass",
      "solid",
      "frosted",
      "minimal",
      "outlined",
      "technical",
    ]

    return (
      <Stack spacing={3}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
              variant="{variant}"
            </Typography>
            <ActionBar variant={variant}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        ))}
      </Stack>
    )
  },
}

/**
 * All shape presets
 */
export const Shapes: Story = {
  render: () => {
    const shapes: ActionBarShape[] = ["pill", "rounded", "soft", "square", "capsule"]

    return (
      <Stack spacing={3}>
        {shapes.map((shape) => (
          <Box key={shape}>
            <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
              shape="{shape}"
            </Typography>
            <ActionBar variant="glass" shape={shape}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        ))}
      </Stack>
    )
  },
}

// =============================================================================
// Glass Effects with Overrides
// =============================================================================

/**
 * Glass effect intensity variations using override props.
 * Demonstrates blur, bgcolor, and boxShadow customization.
 */
export const GlassEffects: Story = {
  render: () => {
    const glassConfigs = [
      {
        name: "Light Glass (low blur)",
        props: { variant: "glass" as const, blur: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
      },
      {
        name: "Standard Glass (default)",
        props: { variant: "glass" as const },
      },
      {
        name: "Heavy Frosted (strong blur)",
        props: { variant: "frosted" as const, blur: 20 },
      },
      {
        name: "Tinted Glass (colored, no blur)",
        props: { variant: "glass" as const, shape: "rounded" as const, blur: 0, bgcolor: "rgba(59, 130, 246, 0.15)" },
      },
      {
        name: "Glassmorphism (elevated float)",
        props: {
          variant: "frosted" as const,
          shape: "rounded" as const,
          blur: 24,
          bgcolor: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
        },
      },
    ]

    return (
      <Stack spacing={4}>
        {glassConfigs.map(({ name, props }) => (
          <Box key={name}>
            <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
              {name}
            </Typography>
            <ActionBar {...props}>
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
        ))}
      </Stack>
    )
  },
}

// =============================================================================
// Active Background Shapes
// =============================================================================

/**
 * Active/selected button background shapes.
 * The background highlight can be circle, square, triangle, or diamond.
 */
export const ActiveBackgroundShapes: Story = {
  render: () => {
    const shapes: { shape: ActionButtonActiveShape; description: string }[] = [
      { shape: "rounded", description: "Rounded (default)" },
      { shape: "circle", description: "Circle" },
      { shape: "square", description: "Square" },
      { shape: "diamond", description: "Diamond" },
    ]

    return (
      <Stack spacing={4}>
        {shapes.map(({ shape, description }) => (
          <ActiveShapeExample key={shape} shape={shape} description={description} />
        ))}
      </Stack>
    )
  },
}

function ActiveShapeExample({
  shape,
  description,
}: {
  shape: ActionButtonActiveShape
  description: string
}) {
  const [value, setValue] = useState("edit")

  return (
    <Box>
      <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
        {description}
      </Typography>
      <ActionBar variant="solid" shape="rounded">
        <ActionGroup mode="radio" value={value} onChange={setValue}>
          <ActionButton icon={<EditIcon />} label="Edit" value="edit" activeShape={shape} />
          <ActionButton icon={<SelectAllIcon />} label="Select" value="select" activeShape={shape} />
          <ActionButton icon={<VisibilityIcon />} label="View" value="view" activeShape={shape} />
        </ActionGroup>
      </ActionBar>
    </Box>
  )
}

// =============================================================================
// Layout Options
// =============================================================================

/**
 * Orientation and alignment options combined
 */
export const LayoutOptions: Story = {
  render: () => (
    <Stack spacing={4}>
      {/* Horizontal variations */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Horizontal
        </Typography>
        <Stack spacing={2}>
          {(["start", "center", "end", "space-between"] as const).map((alignment) => (
            <Box key={alignment}>
              <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
                align: {alignment}
              </Typography>
              <ActionBar alignment={alignment} length={{ pixels: 350 }}>
                <ActionButton icon={<HomeIcon />} label="Home" />
                <ActionButton icon={<SearchIcon />} label="Search" />
              </ActionBar>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Vertical variations */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Vertical
        </Typography>
        <Stack direction="row" spacing={4}>
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
              icon-only
            </Typography>
            <ActionBar orientation="vertical">
              <ActionButton icon={<HomeIcon />} label="Home" />
              <ActionButton icon={<SearchIcon />} label="Search" />
              <ActionButton icon={<SettingsIcon />} label="Settings" />
            </ActionBar>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
              with labels
            </Typography>
            <ActionBar orientation="vertical" thickness="lg" variant="frosted">
              <ActionButton icon={<HomeIcon />} label="Home" labelDisplay="icon-label-below" size="lg" />
              <ActionButton icon={<SearchIcon />} label="Search" labelDisplay="icon-label-below" size="lg" />
              <ActionButton icon={<SettingsIcon />} label="Settings" labelDisplay="icon-label-below" size="lg" />
            </ActionBar>
          </Box>
        </Stack>
      </Box>
    </Stack>
  ),
}

/**
 * Sizing options: thickness and length
 */
export const SizingOptions: Story = {
  render: () => (
    <Stack spacing={4}>
      {/* Thickness */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Thickness
        </Typography>
        <Stack spacing={2}>
          {(["xs", "sm", "md", "lg"] as const).map((thickness) => (
            <Box key={thickness}>
              <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
                {thickness}
              </Typography>
              <ActionBar thickness={thickness}>
                <ActionButton icon={<HomeIcon />} label="Home" />
                <ActionButton icon={<SearchIcon />} label="Search" />
                <ActionButton icon={<SettingsIcon />} label="Settings" />
              </ActionBar>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Gap & Padding */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Spacing (gap & padding)
        </Typography>
        <Stack spacing={2}>
          {[
            { gap: 0, padding: 4, label: "compact (gap: 0, padding: 4)" },
            { gap: 8, padding: 8, label: "normal (gap: 8, padding: 8)" },
            { gap: 16, padding: 16, label: "loose (gap: 16, padding: 16)" },
          ].map(({ gap, padding, label }) => (
            <Box key={label}>
              <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
                {label}
              </Typography>
              <ActionBar gap={gap} padding={padding} variant="outlined" shape="soft">
                <ActionButton icon={<HomeIcon />} label="Home" />
                <ActionButton icon={<SearchIcon />} label="Search" />
                <ActionButton icon={<SettingsIcon />} label="Settings" />
              </ActionBar>
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  ),
}

// =============================================================================
// Selection Groups
// =============================================================================

/**
 * ActionBar with selection groups (radio and checkbox modes)
 */
export const WithSelectionGroups: Story = {
  render: () => {
    const [tool, setTool] = useState("edit")
    const [formatValues, setFormatValues] = useState({ bold: false, italic: true, underline: false })
    const [settings, setSettings] = useState({ grid: true })

    return (
      <Stack spacing={4}>
        {/* Radio mode */}
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
            Radio mode (single selection)
          </Typography>
          <ActionBar variant="solid" shape="rounded">
            <ActionGroup mode="radio" value={tool} onChange={setTool} indicator="underline">
              <ActionButton icon={<EditIcon />} label="Edit" value="edit" />
              <ActionButton icon={<SelectAllIcon />} label="Select" value="select" />
              <ActionButton icon={<VisibilityIcon />} label="View" value="view" />
            </ActionGroup>
          </ActionBar>
        </Box>

        {/* Checkbox mode */}
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
            Checkbox mode (multiple selection)
          </Typography>
          <ActionBar variant="frosted">
            <ActionGroup
              mode="checkbox"
              values={formatValues}
              onToggle={(id, checked) => setFormatValues((v) => ({ ...v, [id]: checked }))}
              indicator="square"
            >
              <ActionButton icon={<FormatBoldIcon />} label="Bold" value="bold" />
              <ActionButton icon={<FormatItalicIcon />} label="Italic" value="italic" />
              <ActionButton icon={<FormatUnderlinedIcon />} label="Underline" value="underline" />
            </ActionGroup>
          </ActionBar>
        </Box>

        {/* Mixed groups */}
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
            Multiple groups with dividers
          </Typography>
          <ActionBar variant="glass" gap={8}>
            <ActionGroup mode="radio" value={tool} onChange={setTool}>
              <ActionButton icon={<EditIcon />} label="Edit" value="edit" />
              <ActionButton icon={<VisibilityIcon />} label="View" value="view" />
            </ActionGroup>

            <Box sx={{ width: 1, height: 24, borderLeft: 1, borderColor: "divider" }} />

            <ActionGroup
              mode="checkbox"
              values={settings}
              onToggle={(id, c) => setSettings((v) => ({ ...v, [id]: c }))}
            >
              <ActionButton icon={<GridOnIcon />} label="Grid" value="grid" />
            </ActionGroup>

            <Box sx={{ width: 1, height: 24, borderLeft: 1, borderColor: "divider" }} />

            <ActionButton icon={<SettingsIcon />} label="Settings" />
          </ActionBar>
        </Box>
      </Stack>
    )
  },
}

// =============================================================================
// Real-World Examples
// =============================================================================

/**
 * Navigation bar with badges and labels
 */
export const NavBarExample: Story = {
  render: () => (
    <ActionBar variant="frosted" padding={12} gap={8}>
      <ActionButton icon={<HomeIcon />} label="Home" labelDisplay="icon-label-right" />
      <ActionButton icon={<SearchIcon />} label="Search" labelDisplay="icon-label-right" />
      <ActionButton icon={<ChatIcon />} label="Messages" labelDisplay="icon-label-right" badge={5} />
      <ActionButton icon={<SettingsIcon />} label="Settings" labelDisplay="icon-label-right" />
    </ActionBar>
  ),
}

/**
 * Compact toolbar for dense UIs
 */
export const CompactToolbar: Story = {
  render: () => {
    const [tool, setTool] = useState("edit")

    return (
      <ActionBar variant="minimal" thickness="xs" gap={0} padding={4}>
        <ActionGroup mode="radio" value={tool} onChange={setTool}>
          <ActionButton icon={<EditIcon />} label="Edit" value="edit" size="xs" />
          <ActionButton icon={<SelectAllIcon />} label="Select" value="select" size="xs" />
          <ActionButton icon={<VisibilityIcon />} label="View" value="view" size="xs" />
        </ActionGroup>
      </ActionBar>
    )
  },
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <ActionBar disabled>
      <ActionButton icon={<HomeIcon />} label="Home" />
      <ActionButton icon={<SearchIcon />} label="Search" />
      <ActionButton icon={<SettingsIcon />} label="Settings" />
    </ActionBar>
  ),
}

// =============================================================================
// Color Mode Integration
// =============================================================================

/**
 * Demonstrates light vs dark color mode integration.
 * 
 * The buttons automatically adapt their colors based on theme.palette.mode.
 * Use the colorMode prop to force a specific mode (useful for glass overlays).
 */
export const ColorModeDemo: Story = {
  render: () => {
    const [tool, setTool] = useState("edit")

    return (
      <Stack spacing={4}>
        {/* Light background (default storybook) */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Light Background (auto mode)
          </Typography>
          <ActionBar variant="glass">
            <ActionGroup mode="radio" value={tool} onChange={setTool}>
              <ActionButton icon={<EditIcon />} label="Edit" value="edit" />
              <ActionButton icon={<SelectAllIcon />} label="Select" value="select" />
              <ActionButton icon={<VisibilityIcon />} label="View" value="view" />
            </ActionGroup>
          </ActionBar>
        </Box>

        {/* Dark background simulation */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: "#1a1a2e",
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, color: "white" }}>
            Dark Background (colorMode=&quot;dark&quot; override)
          </Typography>
          <ActionBar variant="frosted">
            <ActionGroup mode="radio" value={tool} onChange={setTool}>
              <ActionButton icon={<EditIcon />} label="Edit" value="edit" colorMode="dark" />
              <ActionButton icon={<SelectAllIcon />} label="Select" value="select" colorMode="dark" />
              <ActionButton icon={<VisibilityIcon />} label="View" value="view" colorMode="dark" />
            </ActionGroup>
          </ActionBar>
        </Box>

        {/* Light mode forced on dark background (shows contrast issue) */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: "#1a1a2e",
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, color: "white" }}>
            Dark Background (colorMode=&quot;light&quot; - intentionally wrong for comparison)
          </Typography>
          <ActionBar variant="outlined" shape="soft">
            <ActionButton icon={<EditIcon />} label="Edit" colorMode="light" />
            <ActionButton icon={<SearchIcon />} label="Search" colorMode="light" />
          </ActionBar>
        </Box>
      </Stack>
    )
  },
}
