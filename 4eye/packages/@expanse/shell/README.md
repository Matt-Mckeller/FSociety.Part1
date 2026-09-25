# @expanse/shell

The **app-shell layer**: layout providers, page scaffolding, page templates, and
content skeletons. Sits between the bottom primitives ([`@expanse/theme`](../theme),
[`@expanse/ui`](../ui), [`@expanse/map`](../map)) and the HUD layer
([`@expanse/hud`](../hud)).

> **Where the old pieces went:** the HUD widgets (action bars, docks, orbs,
> navigation pad) moved to [`@expanse/hud`](../hud); the map engine, minimap, and
> tiles moved to [`@expanse/map`](../map). `@expanse/shell` no longer owns map or
> HUD chrome.

## Layer

```
theme · ui  →  map  →  shell   (this package)  →  hud
```

`@expanse/shell` depends on `@expanse/theme`, `@expanse/ui`, and `@expanse/map`.
It is consumed by `@expanse/hud` and by app code.

## Quick Start

```tsx
import { LayoutProvider, MinimalLayout, PageContent } from "@expanse/shell";

function App() {
  return (
    <LayoutProvider>
      <MinimalLayout>
        <PageContent>{/* ... */}</PageContent>
      </MinimalLayout>
    </LayoutProvider>
  );
}
```

## Source Structure

| Folder | Contents |
|--------|----------|
| `core/providers/` | `LayoutProvider`, `LayoutConfigProvider` (+ `useLayoutConfig`, `useLayoutTransition`, `usePageKey`, `useDrawerState`, `useLoadingState`) |
| `templates/` | Basic web-layout templates + configurations, hooks, and template types (`ThemeMode`, `ThemePreset`, `NavControlsPosition`, `TransitionConfig`) |
| `skeletons/` | `LayoutSkeleton`, `FullbleedSkeleton`, `ChatSkeleton` — content frame building blocks |
| `views/` | `LayoutConfigurationPage`, `SettingsPage` |
| `components/` | `basic-web-layout` composition pieces |
| `utils/` · `types/` | Shared shell utilities and types |
| `docs/` | Architecture / planning / reference notes |

## Key Exports

`LayoutProvider`, `LayoutConfigProvider`, `useLayoutConfig`,
`useLayoutTransition`, `usePageKey`, `useDrawerState`, `useLoadingState`,
`MinimalLayout`, `PageContent`, `LayoutSkeleton`, `FullbleedSkeleton`,
`ChatSkeleton`, plus `DEFAULT_LAYOUT_CONFIG` and the template types
(`ThemeMode`, `ThemePreset`, `NavControlsPosition`, `TransitionConfig`).

The barrel also re-exports `@expanse/theme`. `ThemeMode` here is the shell
superset (`"light" | "dark" | "system"`); the theme `ThemeMode`
(`"light" | "dark"`) is deliberately shadowed by an explicit re-export.

Import from the package root only — never deep-import subpaths.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm storybook` | Interactive docs |
| `pnpm test` | Unit tests |
| `pnpm test:visual` | Visual regression tests |
| `pnpm test:visual:update` | Update visual baselines |

## Peer Dependencies

- react ^18.0.0
- react-dom ^18.0.0
- @mui/material
- gsap ^3.12.0
