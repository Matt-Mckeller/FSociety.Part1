# @expanse/theme

MUI theming foundation: theme configs, design tokens, fonts, z-index layering,
style utilities, component theme configs (factories + MUI augmentation), and the
theme context/provider. One of the two **bottom** layers (with
[`@expanse/ui`](../ui)) — depends on nothing else in the `@expanse/*` graph.

## Quick Start

```tsx
import { ThemeProvider, Z_INDEX } from "@expanse/theme";

function App({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

## Source Structure

| Folder | Contents |
|--------|----------|
| `configs/` | Theme configurations |
| `types/` | Theme + theme-context types (`ThemeMode`, etc.) |
| `constants/` | Z-index tokens (`Z_INDEX`, `getZIndex`, `relativeZIndex`) |
| `styles/` | Shared style utilities (glass, elevation, gradients, dusk-horizon surface) |
| `component-themes/` | Component theme configs: factories, types, MUI augmentation |
| `context/` | Theme context + provider |
| `hooks/` | Theme hooks |
| `utils/` | Theme utilities |
| `fonts/` · `font/` | Font metadata |
| `components/` | Theme-related UI (`LightDarkModeToggle`, `ThemeColorSelector`) |

## Key Exports

`ThemeProvider`, `LightDarkModeToggle`, `ThemeColorSelector`, `Z_INDEX`,
`getZIndex`, `relativeZIndex`, component-theme factories, and the theme types.

> **MUI augmentation:** the `Components` / palette augmentation must be imported
> by consumers for the augmented `Theme` to resolve. Importing from
> `@expanse/theme` (or `@expanse/shell`, which re-exports it) is sufficient.

Import from the package root only — never deep-import subpaths.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm storybook` | Interactive theme docs |
| `pnpm test` | Unit tests (vitest) |

## Peer Dependencies

- react, react-dom
- @mui/material
