import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

import type { MapGridNavigationConfig } from "@expanse/map"
import { FullHud } from "../FullHud"
import { DEMO_TILE_PAGES } from "../../../hud-components/_demo"

const sampleConfig: MapGridNavigationConfig = {
  dimensions: {
    width: 4,
    height: 3,
    homePosition: { x: 0, y: 0 },
    wrapAround: false,
  },
  tiles: [
    { id: "home", position: { x: 0, y: 0 }, seo: { title: "Home" }, display: { label: "Home", category: "primary", colors: { inactive: "rgba(99,102,241,0.4)", active: "#6366f1" } } },
    { id: "explore", position: { x: 1, y: 0 }, seo: { title: "Explore" }, display: { label: "Explore", category: "primary", colors: { inactive: "rgba(99,102,241,0.4)", active: "#6366f1" } } },
    { id: "learn", position: { x: 2, y: 0 }, seo: { title: "Learn" }, display: { label: "Learn", category: "secondary", colors: { inactive: "rgba(34,197,94,0.4)", active: "#22c55e" } } },
    { id: "play", position: { x: 3, y: 0 }, seo: { title: "Play" }, display: { label: "Play", category: "secondary", colors: { inactive: "rgba(34,197,94,0.4)", active: "#22c55e" } } },
    { id: "about", position: { x: 0, y: 1 }, seo: { title: "About" }, display: { label: "About", category: "info", colors: { inactive: "rgba(59,130,246,0.4)", active: "#3b82f6" } } },
    { id: "contact", position: { x: 1, y: 1 }, seo: { title: "Contact" }, display: { label: "Contact", category: "info", colors: { inactive: "rgba(59,130,246,0.4)", active: "#3b82f6" } } },
  ],
}

const meta: Meta = {
  title: "Layout Systems/HUD/Full Hud",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
}
export default meta

type Story = StoryObj

export const Default: Story = {
  name: "Full Hud",
  render: () => (
    <FullHud navigationConfig={sampleConfig} pages={DEMO_TILE_PAGES} />
  ),
}

export const DebugInsets: Story = {
  name: "Full Hud — Debug Insets",
  render: () => (
    <FullHud navigationConfig={sampleConfig} pages={DEMO_TILE_PAGES} debugInsets />
  ),
}
