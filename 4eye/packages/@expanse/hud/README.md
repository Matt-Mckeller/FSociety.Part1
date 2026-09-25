# @expanse/hud

**HUD chrome, widgets, map-aware views, and HUD templates** — the floating UI
that sits on top of a map tile. Extracted from `@expanse/shell` (P5).

## Layer

`@expanse/hud` is the **top** layer. It depends on
[`@expanse/shell`](../shell) (providers, skeletons, page scaffolding) and
[`@expanse/map`](../map) (navigation engine + minimap), plus
[`@expanse/theme`](../theme) and [`@expanse/ui`](../ui).

```
theme · ui  →  map  →  shell  →  hud   (this package)
```

## Quick Start

```tsx
import { FullHud } from "@expanse/hud";

function HudShell() {
  return <FullHud navigationConfig={navConfig} pages={PAGES} />;
}
```

`FullHud` mounts the navigation provider, HUD inset/hint providers, rails,
docks, the minimap dock, and routes tile pages — pass everything as flat props.

## Source Structure

| Folder | Contents |
|--------|----------|
| `hud/` | HUD system: slot registries (insets, bottom bars, hints), rails, docks, renderers, `FullHud` composition, `TileContainer` / `TilePageRouter` |
| `hud-components/` | HUD widgets: `NavigationPad`, `ActionBar`, `Orbs`, `OrbBar`, `FloatingControls`, `ContextBar`, `CurrentLocationBar`, `NextBestAction`, … |
| `map-views/` | HUD-aware map views: `MinimapPanel`, `MinimapDock`, `MinimapFullView` |
| `templates/` | Composed full-page HUD layouts |

## Key Exports

`FullHud` (+ its prop groups: `HudContentProps`, `HudRouterProps`,
`HudThemeModeProps`, `HudMinimapProps`, `HudCenterOverrideProps`,
`HudPlayerStatusProps`, `HudRailProps`), `NavigationPad`, `ActionBar`,
`MinimapPanel`, `MinimapDock`, `MinimapFullView`, and the HUD slot registries.

Import from the package root only — never deep-import subpaths.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm storybook` | Interactive HUD docs |
| `pnpm test` | Unit tests (vitest) |

## Peer Dependencies

- react, react-dom
- @mui/material
- gsap
