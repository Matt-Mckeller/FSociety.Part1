# `@expanse/shell` — Spatial Minimap

Rich minimap system for spatial grid navigation. Composed of three layers:

| Component | Purpose |
|---|---|
| `MinimapTile` | Single interactive grid cell — the atomic unit |
| `MinimapPanel` | Full overlay panel composed of tiles |
| `Minimap` / `MinimapGrid` etc. | Lightweight visualization variants |

---

## MinimapTile

A single cell representing one grid position. Tiles are behavior-agnostic — the parent determines what happens on interaction.

### What a tile can represent

| Type | Props | Rendered element |
|---|---|---|
| Page navigation | `onClick` | `<button>` |
| External link | `href` + `external` | `<a target="_blank" rel="noopener noreferrer">` |
| Internal link | `href` | `<a href>` |
| Display-only | _(none)_ | `<div aria-role="img">` |
| Empty position | `isEmpty` | `<div>` — no icon, fallback color |
| Disabled | `disabled` | `<div>` — no cursor, no hover |

### Color resolution order

1. **Explicit `color` prop** — always wins
2. **`category` lookup** — theme `categoryColors` → instance `categoryColors` prop
3. **Empty tile fallback** — `theme.components.ExpanseMinimapTile.emptyTileColor` or `#455a64`

### Variants

| Variant | Style |
|---|---|
| `default` | 4px radius, subtle border |
| `circular` | 50% radius (circles) |
| `sharp` | 0px radius (hard squares) |
| `outlined` | Thicker border, tile color on non-empty |
| `minimal` | No border, semi-transparent, softer |
| `glow` | Ambient color glow on non-empty tiles |

### Example

```tsx
import { MinimapTile } from "@expanse/shell"
import HomeIcon from "@mui/icons-material/Home"

// As a page tile (most common)
<MinimapTile
  size={28}
  label="Home"
  category="Home"
  icon={HomeIcon}
  isActive
  onClick={() => navigateTo(0, 0)}
/>

// As an external link
<MinimapTile
  size={28}
  label="Docs"
  color="#00bcd4"
  href="https://example.com/docs"
  external
/>

// Empty placeholder
<MinimapTile size={28} isEmpty />
```

---

## MinimapPanel

A full-featured overlay panel that renders a complete minimap grid using `MinimapTile`.

Requires `NavigationProvider` in context.

### Features

- **Animated open/close** via MUI `Zoom`
- **Hover preview** strip (icon, title, coordinates, category)
- **Current position chip** showing active `[x, y]`
- **Row + column axis labels**
- **Auto-derived category legend**
- **Controlled or uncontrolled** open state

### Usage

```tsx
import { MinimapPanel } from "@expanse/shell"
import { NavigationProvider } from "@expanse/shell"

// Uncontrolled — built-in toggle button
<NavigationProvider config={navConfig}>
  <MinimapPanel defaultOpen title="Site Map" position="top-right" />
</NavigationProvider>

// Controlled — external toggle
const [open, setOpen] = useState(false)
<NavigationProvider config={navConfig}>
  <button onClick={() => setOpen((v) => !v)}>Toggle Map</button>
  <MinimapPanel
    open={open}
    onOpenChange={setOpen}
    showToggleButton={false}
    tileVariant="glow"
  />
</NavigationProvider>
```

---

## Theming

Add `ExpanseMinimapTile` to your MUI theme components to control all tile visuals:

```ts
import "@expanse/theme/component-themes/augmentation"
import { createMinimapTileConfig } from "@expanse/shell"
import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  components: {
    ExpanseMinimapTile: createMinimapTileConfig(palette),
  },
})
```

### `MinimapTileThemeProps` shape

```ts
interface MinimapTileThemeProps {
  variants?: {
    default?: MinimapTileVariantProps
    circular?: MinimapTileVariantProps
    sharp?: MinimapTileVariantProps
    outlined?: MinimapTileVariantProps
    minimal?: MinimapTileVariantProps
    glow?: MinimapTileVariantProps
  }
  categoryColors?: Record<string, string>
  emptyTileColor?: string
  emptyBorderColor?: string
  activeTileColor?: string
}
```

---

## Category Colors

`createMinimapTileConfig` (in `@expanse/theme`) derives four legend/category
swatches from a single accent — `palette.primary.main` — instead of
hardcoding a fixed palette or reusing unrelated palette roles like
`success`/`info` (which collide with `primary` in some hue themes, e.g.
`green`, where `primary` and `success` are both light desaturated greens).
The accent's hue is extracted and rotated 90° four times around the wheel at
a fixed pastel saturation/lightness band, so the four swatches stay mutually
distinguishable in every hue theme while still tracking whichever theme is
active:

| Swatch | Hue offset from `primary.main` |
|---|---|
| 1 — `primary` | 0° |
| 2 — `secondary` | +90° |
| 3 — `tertiary` | +180° |
| 4 — `quaternary` | +270° |

Legacy category keys resolve onto the same four swatches:

| Swatch | Semantic key | Legacy keys |
|---|---|---|
| 1 (0°) | `primary` | `Learning`, `Utility`, `Chat` |
| 2 (+90°) | `secondary` | `Social`, `Template` |
| 3 (+180°) | `tertiary` | `Home`, `Tools`, `Context` |
| 4 (+270°) | `quaternary` | `Gaming`, `Game` |

See `buildMinimapLegendColors`/`buildMinimapCategoryColors` (exported from
`@expanse/theme`) for the exact mapping — the map package's no-theme
fallback (`FALLBACK_LEGEND_COLORS`/`FALLBACK_CATEGORY_COLORS` in
`constants.ts`) computes from the same builders so the two never drift out
of sync.

Add custom categories to `TileConfig.display.category` — they auto-resolve if added to the theme's `categoryColors` map.
