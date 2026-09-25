import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import HomeIcon from "@mui/icons-material/Home"
import ViewListIcon from "@mui/icons-material/ViewList"
import SchoolIcon from "@mui/icons-material/School"
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset"
import GroupIcon from "@mui/icons-material/Group"
import BuildIcon from "@mui/icons-material/Build"
import { NavigationProvider } from "@expanse/map"
import type { MapGridNavigationConfig } from "@expanse/map"
import { ContextBar } from "../../hud-components/context-bar"
import { MinimapFullView } from "./MinimapFullView"

// =============================================================================
// Demo registry — 5×5 with mixed categories. A few tiles intentionally have
// no icon so the first-letter chip fallback (Q2) is visible.
//
// Brand-aligned palette: cyan primary for Home, then the Improve / Innovate /
// Heal / Protect themes from the 4ear brand guidelines.
// =============================================================================

const BRAND = {
  primary: "#00d4ff",   // cyan — Home / primary
  improve: "#5B8DEF",   // blue — Learning
  innovate: "#C792EA",  // lavender — Gaming
  heal: "#FF8FB1",      // pink — Social
  protect: "#7DD3C0",   // mint — Tools
}

const CATEGORIES: Record<string, { color: string }> = {
  Home: { color: BRAND.primary },
  Learning: { color: BRAND.improve },
  Gaming: { color: BRAND.innovate },
  Social: { color: BRAND.heal },
  Tools: { color: BRAND.protect },
}

type DemoTile = {
  id: string
  position: { x: number; y: number }
  category: keyof typeof CATEGORIES
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any
}

const demoTiles: DemoTile[] = [
  { id: "home",     position: { x: 2, y: 2 }, category: "Home",     label: "Home",       icon: HomeIcon },
  { id: "math",     position: { x: 0, y: 0 }, category: "Learning", label: "Math",       icon: SchoolIcon },
  { id: "science",  position: { x: 1, y: 0 }, category: "Learning", label: "Science",    icon: SchoolIcon },
  { id: "history",  position: { x: 2, y: 0 }, category: "Learning", label: "History" },
  { id: "english",  position: { x: 3, y: 0 }, category: "Learning", label: "English" },
  { id: "quest",    position: { x: 4, y: 0 }, category: "Gaming",   label: "Quest",      icon: VideogameAssetIcon },
  { id: "arena",    position: { x: 4, y: 1 }, category: "Gaming",   label: "Arena",      icon: VideogameAssetIcon },
  { id: "chat",     position: { x: 0, y: 1 }, category: "Social",   label: "Chat" },
  { id: "party",    position: { x: 0, y: 2 }, category: "Social",   label: "Party",      icon: GroupIcon },
  { id: "friends",  position: { x: 0, y: 3 }, category: "Social",   label: "Friends",    icon: GroupIcon },
  { id: "settings", position: { x: 4, y: 3 }, category: "Tools",    label: "Settings",   icon: BuildIcon },
  { id: "profile",  position: { x: 4, y: 4 }, category: "Tools",    label: "Profile" },
  { id: "biology",  position: { x: 1, y: 4 }, category: "Learning", label: "Biology, Cells & Tissues" },
  { id: "physics",  position: { x: 2, y: 4 }, category: "Learning", label: "Physics" },
]

const demoConfig: MapGridNavigationConfig = {
  dimensions: {
    width: 5,
    height: 5,
    homePosition: { x: 2, y: 2 },
    wrapAround: false,
  },
  tiles: demoTiles.map(({ id, position, category, label, icon }) => ({
    id,
    position,
    seo: { title: label },
    display: {
      label,
      category,
      icon,
      colors: {
        inactive: CATEGORIES[category].color,
        active: "#ffffff",
      },
    },
  })),
}

// =============================================================================
// Story scaffolding
// =============================================================================

const meta: Meta<typeof MinimapFullView> = {
  title: "Layout Systems/Spatial/MinimapFullView",
  component: MinimapFullView,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    docs: {
      description: {
        component: `
Phase 3 of the Minimap Full View. The shell now mounts the real
\`MinimapFullGrid\` (responsive sizing, icon + label per cell, first-letter
fallback for tiles without an icon) and \`MinimapFullLegend\` (auto-derived
from the active tile registry).

Both \`MinimapPanel\` and \`MinimapFullView\` consume the same shared
\`MinimapTileGrid\` and \`MinimapCategoryLegend\`, so the two surfaces stay
visually consistent.
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof MinimapFullView>

// FullHud chrome dimensions (mirrors apps/4eye-web-mockup/src/lib/layout/hudSafeArea.ts):
//   top    = 64 px (status + context bar)
//   left   = 64 px (left rail)
//   bottom = 72 px (collapsed AIInputBar — the persistent chrome the
//                   MinimapFullView must clear via `bottomChromeInset`)
// The MinimapFullView occludes the page content area but lives _within_
// these reservations so the persistent chrome stays visible. Mirroring this
// in Storybook gives the same in-app proportions.
const APP_CHROME = {
  topBar: 64,
  leftRail: 64,
  aiInputBar: 72,
}

type StageProps = {
  children: React.ReactNode
  /**
   * If true, the AIInputBar mock is rendered as persistent chrome (and the
   * MinimapFullView automatically gets a matching `bottomChromeInset`).
   * Defaults to true so every story shows the realistic app frame.
   */
  withAiInputBar?: boolean
}

const Stage: React.FC<StageProps> = ({ children, withAiInputBar = true }) => (
  <NavigationProvider config={demoConfig}>
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        bgcolor: "#ffffff",
        // Subtle branded glow in the corners — keeps the surface white but
        // hints at the cyan/lavender brand without darkening the canvas.
        backgroundImage: `
          radial-gradient(circle at 0% 0%, ${BRAND.primary}14, transparent 40%),
          radial-gradient(circle at 100% 100%, ${BRAND.innovate}14, transparent 40%)
        `,
        overflow: "hidden",
      }}
    >
      {/* === Top bar (status + context) === */}
      <Box
        sx={{
          height: APP_CHROME.topBar,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          px: 2,
          gap: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.improve})`,
          }}
        />
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, letterSpacing: 0.4 }}
        >
          4eye
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Typography variant="caption" sx={{
          color: "text.secondary"
        }}>
          Lvl 4 · 1,240 ✦
        </Typography>
      </Box>

      {/* === Middle row: left rail + content area === */}
      <Box sx={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Left rail */}
        <Box
          sx={{
            width: APP_CHROME.leftRail,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            py: 2,
            borderRight: "1px solid",
            borderColor: "divider",
            bgcolor: "rgba(255,255,255,0.6)",
          }}
        >
          {[BRAND.primary, BRAND.improve, BRAND.innovate, BRAND.heal].map(
            (c, i) => (
              <Box
                key={i}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1.5,
                  bgcolor: c,
                  opacity: i === 0 ? 1 : 0.45,
                }}
              />
            ),
          )}
        </Box>

        {/* Content area — this is where MinimapFullView occludes the page */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            minWidth: 0,
            minHeight: 0,
            position: "relative",
          }}
        >
          {children}
        </Box>
      </Box>

      {/* === Persistent AIInputBar chrome (always visible behind the map) === */}
      {withAiInputBar && (
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 320,
            height: 48,
            borderRadius: 24,
            bgcolor: "#fafafa",
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300,
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          <Typography variant="caption" sx={{
            color: "text.secondary"
          }}>
            Ask anything…
          </Typography>
        </Box>
      )}
    </Box>
  </NavigationProvider>
)

const ReturnButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Button
    size="small"
    variant="outlined"
    startIcon={<CloseIcon />}
    onClick={onClick}
  >
    Return
  </Button>
)

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  name: "Default (5×5 grid, icon + label)",
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Stage>
        {!open && (
          <Box sx={{ p: 4 }}>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Open map view
            </Button>
          </Box>
        )}
        <MinimapFullView
          open={open}
          onOpenChange={setOpen}
          title="Map"
          bottomChromeInset={APP_CHROME.aiInputBar}
          roleActions={
            <Tooltip title="Home">
              <IconButton size="small">
                <HomeIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          }
          navigationActions={
            <>
              <Tooltip title="Tile list">
                <IconButton size="small">
                  <ViewListIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <ReturnButton onClick={() => setOpen(false)} />
            </>
          }
        />
      </Stage>
    )
  },
}

export const IconOnly: Story = {
  name: "Tile content — iconOnly",
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Stage>
        <MinimapFullView
          open={open}
          onOpenChange={setOpen}
          tileContent="iconAndLabel"
          bottomChromeInset={APP_CHROME.aiInputBar}
          navigationActions={<ReturnButton onClick={() => setOpen(false)} />}
        />
      </Stage>
    )
  },
}

export const FixedTileSize: Story = {
  name: "Tile size — fixed 80px",
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Stage>
        <MinimapFullView
          open={open}
          onOpenChange={setOpen}
          tileSize={80}
          bottomChromeInset={APP_CHROME.aiInputBar}
          navigationActions={<ReturnButton onClick={() => setOpen(false)} />}
        />
      </Stage>
    )
  },
}

export const WithContextBarAndFooter: Story = {
  name: "Context bar + footer + bottom inset",
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Stage>
        <MinimapFullView
          open={open}
          onOpenChange={setOpen}
          title="This is your map."
          bottomChromeInset={APP_CHROME.aiInputBar}
          contextBar={
            <ContextBar
              mode="workspace"
              labelDisplay="icon-label-right"
              defaultValue="goals"
            />
          }
          footer={
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" onClick={() => setOpen(false)}>
                Start exploring
              </Button>
            </Box>
          }
          navigationActions={<ReturnButton onClick={() => setOpen(false)} />}
        />
      </Stage>
    )
  },
}

export const EntranceFade: Story = {
  name: "Entrance — fade",
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Stage>
        <MinimapFullView
          open={open}
          onOpenChange={setOpen}
          entrance="fade"
          bottomChromeInset={APP_CHROME.aiInputBar}
          navigationActions={<ReturnButton onClick={() => setOpen(false)} />}
        />
      </Stage>
    )
  },
}

export const EscToClose: Story = {
  name: "Behavior — Esc to close + focus return",
  parameters: {
    docs: {
      description: {
        story:
          "Click anywhere inside the surface to give it focus, then press Esc. Focus returns to the trigger button.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Stage>
        {!open ? (
          <Box sx={{ p: 4 }}>
            <Button
              variant="contained"
              autoFocus
              onClick={() => setOpen(true)}
            >
              Open map view (focus returns here)
            </Button>
          </Box>
        ) : (
          <MinimapFullView
            open={open}
            onOpenChange={setOpen}
            title="Press Esc to close"
            bottomChromeInset={APP_CHROME.aiInputBar}
            navigationActions={<ReturnButton onClick={() => setOpen(false)} />}
          />
        )}
      </Stage>
    )
  },
}

// =============================================================================
// Sizing presets — `preset` prop bakes in density + min/max tile size +
// content mode. Each story embeds the map in an aspect-ratio cell sized
// to match a realistic host (full-screen, large card, sidebar, etc.).
// =============================================================================

type InlineFrameProps = {
  width: number | string
  height: number | string
  children: React.ReactNode
}

const InlineFrame: React.FC<InlineFrameProps> = ({ width, height, children }) => (
  <NavigationProvider config={demoConfig}>
    <Box sx={{ p: 4, bgcolor: "#ffffff", minHeight: "100vh" }}>
      <Box sx={{ width, height, display: "flex" }}>{children}</Box>
    </Box>
  </NavigationProvider>
)

export const PresetHero: Story = {
  name: "Preset — hero (full-screen)",
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Stage>
        <MinimapFullView
          open={open}
          onOpenChange={setOpen}
          preset="hero"
          bottomChromeInset={APP_CHROME.aiInputBar}
          navigationActions={<ReturnButton onClick={() => setOpen(false)} />}
        />
      </Stage>
    )
  },
}

export const PresetLarge: Story = {
  name: "Preset — large (inline card)",
  render: () => (
    <InlineFrame width={720} height={520}>
      <MinimapFullView open onOpenChange={() => undefined} preset="large" flat={false} />
    </InlineFrame>
  ),
}

export const PresetMedium: Story = {
  name: "Preset — medium (rewards-page embed)",
  render: () => (
    <InlineFrame width={560} height={400}>
      <MinimapFullView open onOpenChange={() => undefined} preset="medium" flat={false} />
    </InlineFrame>
  ),
}

export const PresetSmall: Story = {
  name: "Preset — small (sidebar embed)",
  render: () => (
    <InlineFrame width={320} height={280}>
      <MinimapFullView open onOpenChange={() => undefined} preset="small" flat={false} />
    </InlineFrame>
  ),
}

export const PresetThumbnail: Story = {
  name: "Preset — thumbnail (preview)",
  render: () => (
    <InlineFrame width={220} height={180}>
      <MinimapFullView open onOpenChange={() => undefined} preset="thumbnail" flat={false} />
    </InlineFrame>
  ),
}

export const NavigationChevrons: Story = {
  name: "Active tile — directional chevrons",
  parameters: {
    docs: {
      description: {
        story:
          "Active tile renders 4 directional chevrons that pulse outward in sequence to indicate navigation. Chevrons at grid boundaries (e.g. Up at row 0) are suppressed automatically by the grid.",
      },
    },
  },
  render: () => (
    <InlineFrame width={640} height={480}>
      <MinimapFullView
        open
        onOpenChange={() => undefined}
        preset="large"
        flat={false}
        showNavigationChevrons
      />
    </InlineFrame>
  ),
}

// =============================================================================
// Background Variants — contrast & color exploration
//
// Each story replaces the default "background.dark" panel-blue (#2C4F76) with
// a lighter surface. The CornerBracketFrame corner-diamond decoration and
// animated WaterBackground grain both work on light surfaces — they stay in
// the live overlay but are omitted here (not part of MinimapFullView itself).
//
// Key changes per variant:
//   • bgcolor override via sx → overrides shell default (#2C4F76 flat mode)
//   • color: "text.primary" → flips text from forced #FFF to dark ink
//   • No box-shadow needed at story level (the deep inset vignettes live in
//     MinimapFullViewOverlay, not the MinimapFullView shell)
// =============================================================================

/**
 * Variant A — Pure White (#ffffff)
 * Maximum contrast. Tile category colors (soft blue, pink, mint, purple)
 * pop hardest against white. CornerBracketFrame brackets will stand out.
 */
export const BgWhite: Story = {
  name: "BG Variant A — White (#fff)",
  parameters: {
    docs: {
      description: {
        story:
          "Pure white surface. Maximum contrast for tile category colors. CornerBracketFrame brackets and chevrons are sharpest here.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Stage>
        <MinimapFullView
          open={open}
          onOpenChange={setOpen}
          bottomChromeInset={APP_CHROME.aiInputBar}
          navigationActions={<ReturnButton onClick={() => setOpen(false)} />}
          sx={{ bgcolor: "#ffffff", color: "text.primary" }}
        />
      </Stage>
    )
  },
}

/**
 * Variant B — Frost Blue (#F0F8FF)
 * The lightest possible blue tint — almost white, barely perceptible.
 * Matches `background.light` in the blue theme palette.
 * Feels like a bright window or cloud, preserves the spatial "map" feeling.
 */
export const BgFrostBlue: Story = {
  name: "BG Variant B — Frost Blue (#F0F8FF)",
  parameters: {
    docs: {
      description: {
        story:
          "Frost Blue (#F0F8FF) — the lightest blue tint, matches `background.light` in the blue theme. Near-white but hints at sky and spatial depth.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Stage>
        <MinimapFullView
          open={open}
          onOpenChange={setOpen}
          bottomChromeInset={APP_CHROME.aiInputBar}
          navigationActions={<ReturnButton onClick={() => setOpen(false)} />}
          sx={{ bgcolor: "#F0F8FF", color: "text.primary" }}
        />
      </Stage>
    )
  },
}

/**
 * Variant C — Pale Azure (#E8F4FF)
 * Noticeable but still clearly light. A soft sky-blue that reads as
 * an airy map canvas — halfway between frost and the old dark panel.
 */
export const BgPaleAzure: Story = {
  name: "BG Variant C — Pale Azure (#E8F4FF)",
  parameters: {
    docs: {
      description: {
        story:
          "Pale Azure (#E8F4FF) — soft sky-blue canvas. Visibly blue but still light, like map paper. Good middle ground.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Stage>
        <MinimapFullView
          open={open}
          onOpenChange={setOpen}
          bottomChromeInset={APP_CHROME.aiInputBar}
          navigationActions={<ReturnButton onClick={() => setOpen(false)} />}
          sx={{ bgcolor: "#E8F4FF", color: "text.primary" }}
        />
      </Stage>
    )
  },
}

/**
 * Variant D — Mist (#EDF2F8)
 * Blue-gray, like aged map paper or morning mist.
 * Neutral — neither warm nor cold — grounded and readable.
 */
export const BgMist: Story = {
  name: "BG Variant D — Mist (#EDF2F8)",
  parameters: {
    docs: {
      description: {
        story:
          "Mist (#EDF2F8) — desaturated blue-gray, like map paper. Neutral and grounded, avoids the clinical feel of pure white.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Stage>
        <MinimapFullView
          open={open}
          onOpenChange={setOpen}
          bottomChromeInset={APP_CHROME.aiInputBar}
          navigationActions={<ReturnButton onClick={() => setOpen(false)} />}
          sx={{ bgcolor: "#EDF2F8", color: "text.primary" }}
        />
      </Stage>
    )
  },
}

/**
 * Side-by-side comparison — current dark + all 4 light variants.
 *
 * Uses flat={true} (the app default) so the dark-to-light transition is
 * visible. The first card shows the *current* dark-blue surface so you can
 * judge contrast directly against the light alternatives.
 */
export const BgVariantComparison: Story = {
  name: "BG Variants — Side-by-side comparison",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Current dark-blue reference + 4 light alternatives, all rendered at `preset=large` with `flat={true}`. Labels adapt to the surface color.",
      },
    },
  },
  render: () => (
    <NavigationProvider config={demoConfig}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          p: 4,
          bgcolor: "#e8e8e8",
          minHeight: "100vh",
          alignItems: "flex-start",
        }}
      >
        {(
          [
            { label: "Current — Dark Blue", bgcolor: undefined,  textColor: undefined },
            { label: "A — White",           bgcolor: "#ffffff",  textColor: "text.primary" },
            { label: "B — Frost Blue",      bgcolor: "#F0F8FF",  textColor: "text.primary" },
            { label: "C — Pale Azure",      bgcolor: "#E8F4FF",  textColor: "text.primary" },
            { label: "D — Mist",            bgcolor: "#EDF2F8",  textColor: "text.primary" },
          ] as const
        ).map(({ label, bgcolor, textColor }) => (
          <Box key={label} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#333", pl: 0.5 }}>
              {label}
            </Typography>
            <Box sx={{ width: 520, height: 400, display: "flex", boxShadow: 3 }}>
              <MinimapFullView
                open
                onOpenChange={() => undefined}
                preset="large"
                flat
                showLegend={false}
                {...(bgcolor !== undefined
                  ? { sx: { bgcolor, color: textColor } }
                  : {})}
              />
            </Box>
            <Typography variant="caption" sx={{ color: "#666", pl: 0.5 }}>
              {bgcolor ?? "background.dark (#2C4F76)"}
            </Typography>
          </Box>
        ))}
      </Box>
    </NavigationProvider>
  ),
}
