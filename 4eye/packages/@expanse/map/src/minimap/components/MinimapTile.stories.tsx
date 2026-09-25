import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Box, Typography } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import SchoolIcon from "@mui/icons-material/School"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import PeopleIcon from "@mui/icons-material/People"
import BuildIcon from "@mui/icons-material/Build"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { MinimapTile } from "./MinimapTile"
import type { MinimapTileVariant } from "@expanse/theme"

// =============================================================================
// Meta
// =============================================================================

const meta: Meta<typeof MinimapTile> = {
  title: "Layout Systems/HUD Components/MinimapTile",
  component: MinimapTile,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    docs: {
      description: {
        component: `
**MinimapTile** is a single interactive cell in a minimap navigation grid.

A tile can represent:
- **A page** — click navigates via \`onClick\` handler (provided by parent)
- **An action** — click triggers a callback (rendered as \`<button>\`)
- **An external link** — rendered as \`<a target="_blank">\`
- **Display-only** — no interaction, just shows current state
- **Empty** — unconfigured grid position (visual placeholder)

### Semantic Element Resolution
\`\`\`
disabled              → <div>   (no interaction)
href + external       → <a target="_blank" rel="noopener noreferrer">
href                  → <a href>
onClick               → <button type="button">
(default)             → <div>   (display-only)
\`\`\`

### Color Resolution
1. Explicit \`color\` prop
2. \`category\` → theme categoryColors or instance overrides
3. \`emptyTileColor\` from theme (or fallback \`#455a64\`)
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "circular", "sharp", "outlined", "minimal", "glow"] satisfies MinimapTileVariant[],
      description: "Visual style variant",
    },
    size: { control: { type: "range", min: 16, max: 48, step: 2 } },
    iconSize: { control: { type: "range", min: 8, max: 24, step: 2 } },
    isActive: { control: "boolean" },
    isEmpty: { control: "boolean" },
    disabled: { control: "boolean" },
    animateActive: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof MinimapTile>

// =============================================================================
// Helpers
// =============================================================================

/** A dark panel that simulates a minimap grid background */
function GridCell({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#1a1a2e",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      {children}
    </Box>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="caption" sx={{ color: "#888", display: "block", mb: 0.5, fontSize: "0.65rem" }}>
      {children}
    </Typography>
  )
}

// =============================================================================
// Stories
// =============================================================================

// ------------------------------------------------------------------
// Playground (interactive controls)
// ------------------------------------------------------------------
export const Playground: Story = {
  render: (args) => (
    <Box sx={{ p: 3, bgcolor: "#1a1a2e", borderRadius: 2 }}>
      <MinimapTile {...args} />
    </Box>
  ),
  args: {
    variant: "default",
    size: 28,
    iconSize: 14,
    label: "Home",
    category: "Home",
    isActive: false,
    isEmpty: false,
    disabled: false,
    animateActive: true,
  },
}

// ------------------------------------------------------------------
// All Variants
// ------------------------------------------------------------------
/**
 * Six visual variants — all shown with an active Home tile and an empty tile.
 */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => {
    const variants: MinimapTileVariant[] = ["default", "circular", "sharp", "outlined", "minimal", "glow"]
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {variants.map((v) => (
          <Box key={v}>
            <Label>{v}</Label>
            <GridCell>
              <MinimapTile variant={v} size={28} label="Home" category="Home" icon={HomeIcon} />
              <MinimapTile variant={v} size={28} label="Home" category="Home" icon={HomeIcon} isActive />
              <MinimapTile variant={v} size={28} label="Learning" category="Learning" icon={SchoolIcon} />
              <MinimapTile variant={v} size={28} label="Gaming" category="Gaming" icon={SportsEsportsIcon} />
              <MinimapTile variant={v} size={28} isEmpty />
              <MinimapTile variant={v} size={28} isEmpty />
            </GridCell>
          </Box>
        ))}
      </Box>
    )
  },
}

// ------------------------------------------------------------------
// All States
// ------------------------------------------------------------------
/**
 * Shows the same tile in every interaction state side-by-side.
 */
export const AllStates: Story = {
  name: "All States",
  render: () => (
    <Box>
      <Label>States for a category tile (Home)</Label>
      <GridCell>
        <Box sx={{ textAlign: "center" }}>
          <MinimapTile size={28} label="Home" category="Home" icon={HomeIcon} />
          <Label>resting</Label>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <MinimapTile size={28} label="Home" category="Home" icon={HomeIcon} isActive animateActive={false} />
          <Label>active</Label>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <MinimapTile size={28} isEmpty />
          <Label>empty</Label>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <MinimapTile size={28} label="Home" category="Home" icon={HomeIcon} disabled />
          <Label>disabled</Label>
        </Box>
      </GridCell>
    </Box>
  ),
}

// ------------------------------------------------------------------
// As Page Tile — navigates via onClick
// ------------------------------------------------------------------
/**
 * The most common use-case: a tile that calls a navigation handler on click.
 * Rendered as a \`<button>\` element.
 */
export const AsPageTile: Story = {
  name: "As Page Tile (onClick)",
  render: () => (
    <Box>
      <Label>Rendered as &lt;button&gt; — triggers navigateTo(x, y)</Label>
      <GridCell>
        <MinimapTile
          size={32}
          iconSize={16}
          label="Home"
          category="Home"
          icon={HomeIcon}
          onClick={() => alert("navigate to Home")}
        />
        <MinimapTile
          size={32}
          iconSize={16}
          label="Learning Hub"
          category="Learning"
          icon={SchoolIcon}
          onClick={() => alert("navigate to Learning Hub")}
        />
        <MinimapTile
          size={32}
          iconSize={16}
          label="Arena"
          category="Gaming"
          icon={SportsEsportsIcon}
          onClick={() => alert("navigate to Arena")}
          isActive
        />
        <MinimapTile
          size={32}
          iconSize={16}
          label="Social"
          category="Social"
          icon={PeopleIcon}
          onClick={() => alert("navigate to Social")}
        />
      </GridCell>
    </Box>
  ),
}

// ------------------------------------------------------------------
// As Action Tile — triggers arbitrary callback
// ------------------------------------------------------------------
/**
 * Tiles can trigger any action: opening a modal, toggling a panel, etc.
 * Identical API to page tiles — the parent determines what onClick does.
 */
export const AsActionTile: Story = {
  name: "As Action Tile",
  render: () => (
    <Box>
      <Label>onClick triggers an action (not necessarily navigation)</Label>
      <GridCell>
        <MinimapTile
          size={32}
          iconSize={16}
          label="Open Tools"
          category="Tools"
          icon={BuildIcon}
          onClick={() => alert("open tools panel")}
        />
        <MinimapTile
          size={32}
          iconSize={16}
          label="Team"
          category="Social"
          icon={PeopleIcon}
          onClick={() => alert("show team overlay")}
        />
      </GridCell>
    </Box>
  ),
}

// ------------------------------------------------------------------
// As External Link
// ------------------------------------------------------------------
/**
 * `href` + `external` renders as `<a target="_blank" rel="noopener noreferrer">`.
 * A good option for tiles that point to external resources or docs.
 */
export const AsExternalLink: Story = {
  name: "As External Link",
  render: () => (
    <Box>
      <Label>Rendered as &lt;a target="_blank"&gt;</Label>
      <GridCell>
        <MinimapTile
          size={32}
          iconSize={16}
          label="Docs"
          color="#00bcd4"
          icon={OpenInNewIcon}
          href="https://example.com/docs"
          external
        />
        <MinimapTile
          size={32}
          iconSize={16}
          label="Repo"
          color="#9c27b0"
          icon={OpenInNewIcon}
          href="https://github.com"
          external
        />
      </GridCell>
    </Box>
  ),
}

// ------------------------------------------------------------------
// Display-Only
// ------------------------------------------------------------------
/**
 * No onClick / href — renders as a non-interactive `<div>`.
 * Useful for showing the layout without enabling navigation
 * (e.g. a static preview in docs).
 */
export const DisplayOnly: Story = {
  name: "Display-Only",
  render: () => (
    <Box>
      <Label>No interaction — rendered as &lt;div&gt;</Label>
      <GridCell>
        {[
          { label: "Home", cat: "Home", Icon: HomeIcon },
          { label: "Learn", cat: "Learning", Icon: SchoolIcon },
          { label: "Game", cat: "Gaming", Icon: SportsEsportsIcon },
          { label: "Social", cat: "Social", Icon: PeopleIcon },
          { label: "Tools", cat: "Tools", Icon: BuildIcon },
        ].map(({ label, cat, Icon }) => (
          <MinimapTile key={cat} size={28} label={label} category={cat} icon={Icon} />
        ))}
      </GridCell>
    </Box>
  ),
}

// ------------------------------------------------------------------
// Category Colors
// ------------------------------------------------------------------
/**
 * Tiles inherit background color from their `category`.
 * No `color` prop needed — the theme maps category keys to palette colors.
 */
export const Categories: Story = {
  name: "Category Colors",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Label>Category → color resolution (theme palette)</Label>
      <GridCell>
        {[
          { cat: "Home", Icon: HomeIcon },
          { cat: "Learning", Icon: SchoolIcon },
          { cat: "Gaming", Icon: SportsEsportsIcon },
          { cat: "Social", Icon: PeopleIcon },
          { cat: "Tools", Icon: BuildIcon },
          { cat: "Utility", Icon: BuildIcon },
          { cat: "Context", Icon: HomeIcon },
        ].map(({ cat, Icon }) => (
          <Box key={cat} sx={{ textAlign: "center" }}>
            <MinimapTile size={28} label={cat} category={cat} icon={Icon} />
            <Typography variant="caption" sx={{ color: "#aaa", fontSize: "0.6rem", mt: 0.25, display: "block" }}>
              {cat}
            </Typography>
          </Box>
        ))}
      </GridCell>
    </Box>
  ),
}

// ------------------------------------------------------------------
// Sizes
// ------------------------------------------------------------------
/**
 * The `size` prop scales both the tile dimensions and (independently)
 * the `iconSize` prop scales the icon inside.
 */
export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {[14, 18, 22, 28, 36, 44].map((s) => (
        <Box key={s}>
          <Label>size={s}</Label>
          <GridCell>
            <MinimapTile size={s} iconSize={Math.max(8, Math.floor(s * 0.5))} label="Home" category="Home" icon={HomeIcon} />
            <MinimapTile size={s} iconSize={Math.max(8, Math.floor(s * 0.5))} label="Home" category="Home" icon={HomeIcon} isActive animateActive={false} />
            <MinimapTile size={s} iconSize={Math.max(8, Math.floor(s * 0.5))} label="Gaming" category="Gaming" icon={SportsEsportsIcon} />
            <MinimapTile size={s} isEmpty />
          </GridCell>
        </Box>
      ))}
    </Box>
  ),
}

// ------------------------------------------------------------------
// Tile State Indicators
// ------------------------------------------------------------------
/**
 * Progress badges (exploration %) and recommended-tile corner brackets.
 * Shows all meaningful combinations so you can pick the right look.
 */
export const TileStateIndicators: Story = {
  name: "Tile State Indicators",
  render: () => {
    const progressStates: Array<{ label: string; value: number }> = [
      { label: "Not visited (0%)", value: 0 },
      { label: "Just started (10%)", value: 10 },
      { label: "Quarter explored (25%)", value: 25 },
      { label: "Half explored (50%)", value: 50 },
      { label: "Three-quarters (75%)", value: 75 },
      { label: "Fully explored (100%)", value: 100 },
    ]

    const sizes = [28, 36, 44]

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

        {/* ── Progress ring variants ── */}
        <Box>
          <Label>Progress badge — all states (size=36)</Label>
          <GridCell>
            {progressStates.map(({ label, value }) => (
              <Box key={value} sx={{ textAlign: "center" }}>
                <MinimapTile
                  size={36}
                  label="Learn"
                  color="#3B82F6"
                  icon={SchoolIcon}
                  progressPercent={value}
                />
                <Label>{label}</Label>
              </Box>
            ))}
          </GridCell>
        </Box>

        {/* ── Recommended frame only ── */}
        <Box>
          <Label>Recommended frame — resting vs active (size=36)</Label>
          <GridCell>
            <Box sx={{ textAlign: "center" }}>
              <MinimapTile size={36} label="Home" color="#6366F1" icon={HomeIcon} isRecommended />
              <Label>recommended</Label>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <MinimapTile size={36} label="Home" color="#6366F1" icon={HomeIcon} isRecommended isActive animateActive={false} />
              <Label>recommended + active</Label>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <MinimapTile size={36} label="Home" color="#6366F1" icon={HomeIcon} />
              <Label>not recommended</Label>
            </Box>
          </GridCell>
        </Box>

        {/* ── Combined: progress + recommended ── */}
        <Box>
          <Label>Combined — progress badge + recommended frame (size=36)</Label>
          <GridCell>
            {[0, 25, 75, 100].map((pct) => (
              <Box key={pct} sx={{ textAlign: "center" }}>
                <MinimapTile
                  size={36}
                  label="Goals"
                  color="#8B5CF6"
                  icon={SportsEsportsIcon}
                  progressPercent={pct}
                  isRecommended
                />
                <Label>rec + {pct}%</Label>
              </Box>
            ))}
          </GridCell>
        </Box>

        {/* ── Size variants ── */}
        <Box>
          <Label>Indicator scaling across tile sizes (25% progress + recommended)</Label>
          <GridCell>
            {sizes.map((s) => (
              <Box key={s} sx={{ textAlign: "center" }}>
                <MinimapTile
                  size={s}
                  label="Arena"
                  color="#10B981"
                  icon={SportsEsportsIcon}
                  progressPercent={25}
                  isRecommended
                />
                <Label>size={s}</Label>
              </Box>
            ))}
          </GridCell>
        </Box>

        {/* ── On empty tiles (indicators suppressed) ── */}
        <Box>
          <Label>Empty tiles — indicators never render (guards are in MinimapTile)</Label>
          <GridCell>
            <Box sx={{ textAlign: "center" }}>
              <MinimapTile size={36} isEmpty progressPercent={50} isRecommended />
              <Label>empty (no badge/frame)</Label>
            </Box>
          </GridCell>
        </Box>

      </Box>
    )
  },
}

// ------------------------------------------------------------------
// Instance Category Color Overrides
// ------------------------------------------------------------------
/**
 * Pass `categoryColors` to override per-instance without touching the theme.
 * Merges on top of theme defaults.
 */
export const CategoryOverrides: Story = {
  name: "Per-Instance Category Overrides",
  render: () => (
    <Box>
      <Label>categoryColors prop overrides theme defaults</Label>
      <GridCell>
        <MinimapTile
          size={28}
          label="Home"
          category="Home"
          icon={HomeIcon}
          categoryColors={{ Home: "#e91e63" }}  // Hot pink override
        />
        <MinimapTile
          size={28}
          label="Learning"
          category="Learning"
          icon={SchoolIcon}
          categoryColors={{ Learning: "#ff5722" }}  // Deep orange override
        />
        <MinimapTile size={28} label="Gaming" category="Gaming" icon={SportsEsportsIcon} />
      </GridCell>
    </Box>
  ),
}
