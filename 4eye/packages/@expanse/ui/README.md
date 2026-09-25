# @expanse/ui

Shared, **presentation-only** UI building blocks. Generic components with **no
HUD, map, or navigation awareness** — safe to use anywhere. One of the two
**bottom** layers (with [`@expanse/theme`](../theme)).

## Quick Start

```tsx
import { CountBadge, mergeSx, renderIcon } from "@expanse/ui";

<CountBadge count={3} sx={mergeSx(base, override)} />;
```

## Source Structure

| Folder | Contents |
|--------|----------|
| `form/` | Form inputs (`Email`, `Name`, `Password`) |
| `primitives/` | `SectionSpacer`, `ExpanseLoadingSpinner`, `DemoSurface` |
| `components/` | `CountBadge`, `SkipLinks`, `LiveAnnouncer` |
| `typography/` | `TypographyResponsive` |
| `utils/` | `renderIcon`, `mergeSx`, accessibility helpers |

## Key Exports

`CountBadge`, `SkipLinks`, `LiveAnnouncer`, `SectionSpacer`,
`ExpanseLoadingSpinner`, `DemoSurface`, `TypographyResponsive`, `renderIcon`,
`mergeSx`, and the form inputs.

> `mergeSx(...styles)` returns an `SxProps<Theme>` that preserves the augmented
> MUI `Theme`, so callback-style `sx` entries keep full type safety.

Import from the package root only — never deep-import subpaths.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm storybook` | Interactive component docs |
| `pnpm test` | Unit tests (vitest) |

## Peer Dependencies

- react, react-dom
- @mui/material
