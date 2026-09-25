import React from "react"
import { Box, Typography } from "@mui/material"
import { DemoPageScaffold } from "./DemoPageScaffold"

interface PageMeta {
  title: string
  subtitle: string
  body: string[]
  color: string
  accent: string
}

const PAGES: Record<string, PageMeta> = {
  home: {
    title: "Home",
    subtitle: "Your dashboard. The starting tile of the demo grid.",
    color: "#6366f1",
    accent: "#4338ca",
    body: [
      "This page is rendered through the TilePageRouter, looked up by the current tile id.",
      "Click any other tile in the minimap or list view — this content swaps in place.",
      "The page is inset to clear the surrounding HUD chrome via the HudInsetsProvider.",
    ],
  },
  explore: {
    title: "Explore",
    subtitle: "Browse content. East of Home.",
    color: "#6366f1",
    accent: "#4338ca",
    body: [
      "Navigation is shared between minimap and tile list — both use useNavigation().",
      "Toggling between them never loses your position.",
    ],
  },
  learn: {
    title: "Learn",
    subtitle: "Tutorials and walkthroughs. Two cells east of Home.",
    color: "#22c55e",
    accent: "#15803d",
    body: [
      "The HUD safe-area aggregates registered insets per edge (max).",
      "Each fixed chrome component reports its claim independently.",
    ],
  },
  play: {
    title: "Play",
    subtitle: "Games and exercises. Far east of Home.",
    color: "#22c55e",
    accent: "#15803d",
    body: [
      "Try resizing the viewport — the content reflows but insets stay constant.",
      "Reducing chrome (e.g. collapsing a rail) would shrink its inset claim.",
    ],
  },
  about: {
    title: "About",
    subtitle: "Project info. South-west of Home.",
    color: "#3b82f6",
    accent: "#1d4ed8",
    body: [
      "The minimap inset is tracked separately so consumers can opt in.",
      "By default content flows under the frosted minimap panel.",
    ],
  },
  contact: {
    title: "Contact",
    subtitle: "Get in touch. South-center of Home.",
    color: "#3b82f6",
    accent: "#1d4ed8",
    body: [
      "These pages are storybook-only fixtures.",
      "Treat them as the simplest possible consumer of the HUD layout system.",
    ],
  },
}

function Body({ lines }: { lines: string[] }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, maxWidth: 720 }}>
      {lines.map((line, i) => (
        <Typography key={i} variant="body1" sx={{ color: "text.primary", lineHeight: 1.6 }}>
          {line}
        </Typography>
      ))}
    </Box>
  )
}

function buildDemoPage(id: keyof typeof PAGES) {
  const meta = PAGES[id]
  return (
    <DemoPageScaffold title={meta.title} subtitle={meta.subtitle} color={meta.color} accent={meta.accent}>
      <Body lines={meta.body} />
    </DemoPageScaffold>
  )
}

/** Pre-built map of `tile.id` -> demo page node, ready to pass to TilePageRouter. */
export const DEMO_TILE_PAGES: Record<string, React.ReactNode> = {
  home: buildDemoPage("home"),
  explore: buildDemoPage("explore"),
  learn: buildDemoPage("learn"),
  play: buildDemoPage("play"),
  about: buildDemoPage("about"),
  contact: buildDemoPage("contact"),
}
