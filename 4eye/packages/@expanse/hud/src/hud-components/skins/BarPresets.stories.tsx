import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Box, Typography } from "@mui/material"
import BackpackIcon from "@mui/icons-material/Backpack"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import AssignmentIcon from "@mui/icons-material/Assignment"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import BoltIcon from "@mui/icons-material/Bolt"

import { NavigationProvider } from "@expanse/map"
import type { MapGridNavigationConfig } from "@expanse/map"
import { MinimapDock } from "../../map-views/minimap/MinimapDock"

import { ActionDock } from "../../hud/docks"
import { ActionBar } from "../action-bars"
import { ActionButton } from "../action-button"
import { NavigationBar } from "../navigation-bar"
import { AIInputBar } from "../ai-input-bar"
import { SettingsBar } from "../settings-bar"
import { OrbBar } from "../orb-bar"
import { ContextBar, type ContextBarContext, type ContextBarMode } from "../context-bar"

// =============================================================================
// Sample navigation config
// =============================================================================

const sampleConfig: MapGridNavigationConfig = {
  dimensions: {
    width: 4,
    height: 3,
    homePosition: { x: 0, y: 0 },
    wrapAround: false,
  },
  tiles: [
    { id: "home",    position: { x: 0, y: 0 }, seo: { title: "Home" },    display: { label: "Home",    category: "primary",   colors: { inactive: "rgba(99,102,241,0.4)", active: "#6366f1" } } },
    { id: "explore", position: { x: 1, y: 0 }, seo: { title: "Explore" }, display: { label: "Explore", category: "primary",   colors: { inactive: "rgba(99,102,241,0.4)", active: "#6366f1" } } },
    { id: "learn",   position: { x: 2, y: 0 }, seo: { title: "Learn" },   display: { label: "Learn",   category: "secondary", colors: { inactive: "rgba(34,197,94,0.4)",  active: "#22c55e" } } },
    { id: "play",    position: { x: 3, y: 0 }, seo: { title: "Play" },    display: { label: "Play",    category: "secondary", colors: { inactive: "rgba(34,197,94,0.4)",  active: "#22c55e" } } },
    { id: "about",   position: { x: 0, y: 1 }, seo: { title: "About" },   display: { label: "About",   category: "info",      colors: { inactive: "rgba(59,130,246,0.4)", active: "#3b82f6" } } },
    { id: "contact", position: { x: 1, y: 1 }, seo: { title: "Contact" }, display: { label: "Contact", category: "info",      colors: { inactive: "rgba(59,130,246,0.4)", active: "#3b82f6" } } },
  ],
}

// =============================================================================
// Meta
// =============================================================================

const meta: Meta = {
  title: "Layout Systems/HUD Components/Bar Presets",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
}
export default meta
type Story = StoryObj

// =============================================================================
// Stage helper
// =============================================================================

function Stage({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <NavigationProvider config={sampleConfig}>
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          background: "#ffffff",
          overflow: "hidden",
          color: "text.primary",
        }}
      >
        {title && (
          <Typography
            variant="overline"
            sx={{ position: "absolute", top: 16, left: 16, opacity: 0.6 }}
          >
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </NavigationProvider>
  )
}

// =============================================================================
// Stories
// =============================================================================

/** MinimapDock with backpack + inventory buttons that travel with the panel. */
export const MinimapDockWithSlotButtons: Story = {
  render: () => (
    <Stage title="MinimapDock — game slot bar glued to inboard edge">
      <MinimapDock
        position="top-right"
        defaultOpen
        title="Map"
        slotOrientation="column"
        slotButtons={
          <ActionBar variant="frosted" orientation="vertical" thickness="md">
            <ActionButton icon={<BackpackIcon />}     label="Backpack" />
            <ActionButton icon={<Inventory2Icon />}   label="Inventory"    badge={3} />
            <ActionButton icon={<AssignmentIcon />}   label="Quests"       badge={2} />
            <ActionButton icon={<EmojiEventsIcon />}  label="Achievements" />
            <ActionButton icon={<BoltIcon />}          label="Spellbook" />
          </ActionBar>
        }
        headerActions={
          <>
            <ActionButton icon={<BackpackIcon />}     label="Backpack"     size="xs" />
            <ActionButton icon={<Inventory2Icon />}   label="Inventory"    size="xs" badge={3} />
            <ActionButton icon={<AssignmentIcon />}   label="Quests"       size="xs" badge={2} />
            <ActionButton icon={<EmojiEventsIcon />}  label="Achievements" size="xs" />
            <ActionButton icon={<BoltIcon />}          label="Spellbook"   size="xs" />
          </>
        }
      />
    </Stage>
  ),
}

/** Same dock collapsed — buttons render as a horizontal row of frosted chips matching the map toggle. */
export const MinimapDockCollapsed: Story = {
  render: () => (
    <Stage title="MinimapDock — collapsed (frosted chip row)">
      <MinimapDock
        position="top-right"
        defaultOpen={false}
        title="Map"
        headerActions={
          <>
            <ActionButton icon={<BackpackIcon />}     label="Backpack"     size="xs" />
            <ActionButton icon={<Inventory2Icon />}   label="Inventory"    size="xs" badge={3} />
            <ActionButton icon={<AssignmentIcon />}   label="Quests"       size="xs" badge={2} />
            <ActionButton icon={<EmojiEventsIcon />}  label="Achievements" size="xs" />
            <ActionButton icon={<BoltIcon />}          label="Spellbook"   size="xs" />
          </>
        }
      />
    </Stage>
  ),
}

/** Mobile collapsed — chip row is hidden; only the map toggle is shown so the
    corner stays uncluttered. Header actions surface inside the panel header
    when the user opens the map (with overflow into a "More" menu). */
export const MinimapDockMobileCollapsed: Story = {
  render: () => (
    <Stage title="MinimapDock — mobile collapsed (toggle only)">
      <MinimapDock
        position="top-right"
        mobile
        defaultOpen={false}
        title="Map"
        headerActions={
          <>
            <ActionButton icon={<BackpackIcon />}     label="Backpack"     size="xs" />
            <ActionButton icon={<Inventory2Icon />}   label="Inventory"    size="xs" badge={3} />
            <ActionButton icon={<AssignmentIcon />}   label="Quests"       size="xs" badge={2} />
            <ActionButton icon={<EmojiEventsIcon />}  label="Achievements" size="xs" />
            <ActionButton icon={<BoltIcon />}          label="Spellbook"   size="xs" />
          </>
        }
      />
    </Stage>
  ),
}

/** Mobile expanded — smaller map, first 2 actions inline, the rest in a More menu. */
export const MinimapDockMobileExpanded: Story = {
  render: () => (
    <Stage title="MinimapDock — mobile expanded (overflow menu)">
      <MinimapDock
        position="top-right"
        mobile
        defaultOpen
        title="Map"
        maxVisibleActions={2}
        headerActions={
          <>
            <ActionButton icon={<BackpackIcon />}     label="Backpack"     size="xs" />
            <ActionButton icon={<Inventory2Icon />}   label="Inventory"    size="xs" badge={3} />
            <ActionButton icon={<AssignmentIcon />}   label="Quests"       size="xs" badge={2} />
            <ActionButton icon={<EmojiEventsIcon />}  label="Achievements" size="xs" />
            <ActionButton icon={<BoltIcon />}          label="Spellbook"   size="xs" />
          </>
        }
      />
    </Stage>
  ),
}

/** NavigationBar standalone — wired to useNavigation. */
export const NavigationBarStandalone: Story = {
  render: () => (
    <Stage title="NavigationBar (centered)">
      <ActionDock position="top-center">
        <NavigationBar />
      </ActionDock>
    </Stage>
  ),
}

/** AIInputBar — chat-style with mic, camera, text, language, send. */
export const AIInputBarStory: Story = {
  name: "AIInputBar",
  render: () => {
    function Demo() {
      const [last, setLast] = useState<string>("")
      return (
        <>
          <ActionDock position="bottom-center">
            <AIInputBar minWidth={320} onSubmit={(text: string) => setLast(text)} />
          </ActionDock>
          {last && (
            <Typography
              sx={{
                position: "absolute",
                bottom: 120,
                left: "50%",
                transform: "translateX(-50%)",
                opacity: 0.7,
              }}
            >
              Submitted: “{last}”
            </Typography>
          )}
        </>
      )
    }
    return (
      <Stage title="AIInputBar">
        <Demo />
      </Stage>
    )
  },
}

/** SettingsBar — view + theme + a11y toggles, vertical right rail. */
export const SettingsBarStory: Story = {
  name: "SettingsBar",
  render: () => {
    function Demo() {
      const [view, setView] = useState<"grid" | "list">("grid")
      const [mode, setMode] = useState<"light" | "dark">("dark")
      const [pinned, setPinned] = useState(false)
      return (
        <Box sx={{ position: "fixed", right: 16, top: "30%" }}>
          <SettingsBar
            viewMode={view}
            onViewModeChange={setView}
            themeMode={mode}
            onThemeModeChange={setMode}
            showAccessibility
            showZoom
            pinned={pinned}
            onPinToggle={setPinned}
          />
        </Box>
      )
    }
    return (
      <Stage title="SettingsBar">
        <Demo />
      </Stage>
    )
  },
}

/** SettingsBar (basic layout) — only theme + a11y. */
export const SettingsBarBasic: Story = {
  name: "SettingsBar (basic)",
  render: () => {
    function Demo() {
      const [mode, setMode] = useState<"light" | "dark">("light")
      return (
        <Box sx={{ position: "fixed", right: 16, top: "30%" }}>
          <SettingsBar
            layout="basic"
            themeMode={mode}
            onThemeModeChange={setMode}
          />
        </Box>
      )
    }
    return (
      <Stage title="SettingsBar — basic layout (theme + a11y)">
        <Demo />
      </Stage>
    )
  },
}

/**
 * SettingsBar with the lidded color picker.
 *
 * The eye button is monochrome at rest (no color leak through the lid).
 * Hover the eye to lift the lid and reveal swatches inline. Click to fire
 * `onColorPickerActivate` (host opens a full picker — here we just log).
 * Side arrows cycle through the color palette.
 */
export const SettingsBarWithColors: Story = {
  name: "SettingsBar (with color picker)",
  render: () => {
    function Demo() {
      const [mode, setMode] = useState<"light" | "dark">("dark")
      const palette = [
        "#ef4444", // red
        "#f59e0b", // amber
        "#22c55e", // green
        "#3b82f6", // blue
        "#8b5cf6", // violet
        "#ec4899", // pink
      ]
      const [color, setColor] = useState(palette[3])
      return (
        <>
          <Box sx={{ position: "fixed", right: 16, top: "30%" }}>
            <SettingsBar
              themeMode={mode}
              onThemeModeChange={setMode}
              showAccessibility
              color={color}
              onColorChange={setColor}
              colorOptions={palette}
              onColorPickerActivate={() =>
                // eslint-disable-next-line no-console
                console.log("[SettingsBar] open full color picker")
              }
            />
          </Box>

          {/* Live preview swatch so reviewers can see the selection updating
              even though the lid hides it. */}
          <Box
            sx={{
              position: "fixed",
              left: 24,
              bottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontFamily: "monospace",
              fontSize: 12,
              color: "rgba(0,0,0,0.6)",
            }}
          >
            <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: color, border: "1px solid rgba(0,0,0,0.2)" }} />
            selected: {color}
          </Box>
        </>
      )
    }
    return (
      <Stage title="SettingsBar — lidded color picker (hover to peek, click for full)">
        <Demo />
      </Stage>
    )
  },
}

/** OrbBar — three context presets stacked. */
export const OrbBarContexts: Story = {
  render: () => (
    <Stage title="OrbBar contexts (hover for label)">
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <OrbBar context="default" labelMode="hover" />
        <OrbBar context="game" labelMode="hover" />
        <OrbBar context="learn" labelMode="hover" />
      </Box>
    </Stage>
  ),
}

/** OrbBar with inline labels — each orb shows its action text. */
export const OrbBarWithLabels: Story = {
  name: "OrbBar (inline labels)",
  render: () => (
    <Stage title="OrbBar — labels rendered inside each orb">
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <OrbBar context="default" showOrbLabels labelMode="none" />
        <OrbBar context="game" showOrbLabels labelMode="none" />
        <OrbBar context="learn" showOrbLabels labelMode="none" />
      </Box>
    </Stage>
  ),
}

/** ContextBar — workspace mode (Goals + Domains + Projects). */
export const ContextBarWorkspace: Story = {
  name: "ContextBar (workspace mode)",
  render: () => {
    function Demo() {
      const [ctx, setCtx] = useState<ContextBarContext>("goals")
      return (
        <Stage title="ContextBar — workspace mode">
          <ActionDock position="top-center">
            <ContextBar value={ctx} onChange={setCtx} showAdd showActiveLabel />
          </ActionDock>
        </Stage>
      )
    }
    return <Demo />
  },
}

/** ContextBar — every mode shown stacked, app-driven. */
export const ContextBarModes: Story = {
  name: "ContextBar (all modes)",
  render: () => (
    <Stage title="ContextBar — modes set by host app">
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {(["workspace", "goals", "domains", "projects", "goals-projects"] as ContextBarMode[]).map(
          (m) => (
            <Box key={m} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ width: 140, fontFamily: "monospace", fontSize: 12, opacity: 0.7 }}>
                mode="{m}"
              </Typography>
              <ContextBar mode={m} defaultValue={m === "domains" ? "domains" : m === "projects" ? "projects" : "goals"} />
            </Box>
          )
        )}
      </Box>
    </Stage>
  ),
}
