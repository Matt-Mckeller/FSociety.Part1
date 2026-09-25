# Layout System Dictionary

> Canonical definitions for all terminology in @expanse/shell.  
> When in doubt, refer here for the correct term.

---

## Layout Paradigms

### Basic Web Layout
Traditional web page structure with headers, navbars, sidebars, and footers. Content flows in the normal document flow. Navigation is URL/route-based.

**Characteristics:**
- Standard page structure (header → content → footer)
- URL-based navigation (`/about`, `/dashboard`)
- Bars push content (not floating overlays)
- Scrollable pages
- SEO-friendly, crawlable

**Templates:** MinimalLayout, DashboardLayout, DocumentationLayout, PanelLayout

### Spatial Layout
Application-style, full-viewport immersive experience with floating HUD controls. Content fills the screen. Navigation is position-based on a 2D grid.

**Characteristics:**
- Full viewport (100vw × 100vh)
- Position-based navigation (x, y coordinates)
- HUD floats over content (not pushing it)
- Single-screen, no scrolling (per tile)
- Game/application-like feel

**Templates:** FullScreenLayout

---

## Navigation Systems

### MapGridNavigation
The 2D grid-based navigation system used in Spatial Layout. Users navigate between positions on a conceptual "map" using arrow keys, swipes, or minimap clicks.

**Key Concepts:**
- **Position**: An (x, y) coordinate on the grid
- **Dimensions**: Grid size (width × height)
- **Home Position**: Starting/center position
- **Wrap Around**: Whether edges connect

**Provider:** `NavigationProvider` with `MapGridNavigationConfig`

### Standard Navigation
Traditional URL-based routing used in Basic Web Layout. Uses Next.js App Router, React Router, or similar.

---

## Core Concepts

### Map
The conceptual navigation surface in Spatial Layout. Like a game map, it defines the 2D space users can navigate. The Map is NOT a visible component—it's the spatial model that Tiles exist within.

### Tile
A content unit positioned on the Map. Tiles are the "pages" in Spatial Layout, each representing a full-screen view at a specific position.

**Core Properties:**

| Property | Description |
|----------|-------------|
| `id` | Unique identifier |
| `position` | `{ x, y }` coordinates on the Map |
| `url` | URL path for SEO/deep linking |
| `seo` | Title, description, meta tags |
| `display` | Label, colors, icon for Minimap |

**Display Properties:**

| Property | Description |
|----------|-------------|
| `contentInset` | How content relates to HUD (see below) |
| `minimapPosition` | Override default minimap positioning for this tile |

### Tile as Container
Tiles serve as **responsive containers** that enforce the SPA-style single-screen paradigm:

- **Full viewport**: Each tile fills 100vw × 100vh
- **No page scroll**: Content is contained within the tile (internal scroll okay)
- **Transition boundaries**: Moving between tiles triggers transitions
- **Isolation**: Each tile manages its own content independently

```
┌─────────────────────────────────────────────┐
│                    HUD                      │ ← Fixed overlay
│  ┌───────────────────────────────────────┐  │
│  │                                       │  │
│  │            TILE CONTENT               │  │ ← Responsive container
│  │        (fills remaining space)        │  │
│  │                                       │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │  Internal scroll if needed      │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Content Inset
How the Tile content relates to the HUD overlay. Determines whether content is "pushed in" to avoid HUD overlap.

| Mode | Behavior | Use Case |
|------|----------|----------|
| `hud-aware` | Content inset to avoid HUD overlap | Most pages - content stays visible |
| `full-edge` | Content extends to viewport edges | Media, maps, immersive content |
| `custom` | Tile specifies exact insets | Fine-grained control |

```
hud-aware:                    full-edge:
┌─────────────────────┐       ┌─────────────────────┐
│▓▓▓▓▓▓▓HUD▓▓▓▓▓▓▓▓▓▓▓│       │▓▓▓▓▓▓▓HUD▓▓▓▓▓▓▓▓▓▓▓│
├─────────────────────┤       │                     │
│                     │       │      CONTENT        │
│      CONTENT        │       │    (under HUD)      │
│   (avoids HUD)      │       │                     │
│                     │       │                     │
├─────────────────────┤       │                     │
│▓▓▓▓▓▓▓HUD▓▓▓▓▓▓▓▓▓▓▓│       │▓▓▓▓▓▓▓HUD▓▓▓▓▓▓▓▓▓▓▓│
└─────────────────────┘       └─────────────────────┘
```

### HUD Exposure
Information that a HUD template/configuration exposes about how much it extends from each edge. This allows tiles and content to adapt.

```ts
interface HudExposure {
  top: number;      // Header + top action bar height
  bottom: number;   // Bottom action bar + minimap height
  left: number;     // Left sidebar/dock width
  right: number;    // Right sidebar/dock width
}

// Example: Desktop default HUD
const desktopHudExposure: HudExposure = {
  top: 64,      // Header: 48px + ActionBar: 16px padding
  bottom: 80,   // ActionBar: 56px + Minimap: 24px
  left: 0,      // No left dock
  right: 48,    // Action dock width
};
```

Content can use HUD exposure to:
- Calculate available viewport space
- Position elements relative to HUD
- Animate content when HUD shows/hides

---

## HUD Components

### HUD (Heads-Up Display)
The floating overlay layer that sits above Tile content. Contains action bars, orbs, minimap, and other always-visible controls. HUD components use `position: fixed` and do NOT push content.

### Header
The global context bar at the top of the screen. Contains branding, domain switcher, user menu, and global actions. Header is **NOT** an ActionBar—it's a separate concept because it:
- Is always present (global scope)
- Rarely changes (except domain)
- Contains identity, not actions

### ActionBar
Edge-positioned bar containing actions, navigation, or controls. Base component for all bar variants.

| Position | Values |
|----------|--------|
| Edge | `top`, `bottom`, `left`, `right` |
| Variants | `default`, `simple`, `rich`, `collapsible` |

**ActionBar Variants (specialized purposes):**

| Variant | Purpose | Behavior |
|---------|---------|----------|
| **NavBar** | Navigation links | Route-based links |
| **Toolbar** | Tool/mode selection | **Radio** - one selected at a time |
| **SettingsBar** | Toggle controls | **Checkbox** - multiple on/off |
| **StatusBar** | Display information | **Read-only** - XP, currency, progress |

### Dock
Corner-positioned container that groups ActionBars or buttons.

| Component | Purpose |
|-----------|---------|
| **ActionDock** | Groups action buttons at corners |

**Positions:** `top-left`, `top-right`, `bottom-left`, `bottom-right`

### ActionOrb
Floating action button. Can have various shapes and states.

| Property | Options |
|----------|---------|
| Shape | `circle`, `square`, `diamond`, `triangle`, `hexagon` |
| Variant | `default`, `ai`, `solid`, `ghost`, `glow` |
| Color | `primary`, `secondary`, `ai`, `success`, `warning`, `error`, `info`, `neutral` |

### OrbCluster
Groups of ActionOrbs arranged in patterns.

**Patterns:** `bottom-row`, `right-stack`, `left-stack`, `corners`, `radial`, `bottom-arc`, `diagonal-tl`, `diagonal-tr`, `center`, `custom`

### NavigationPad
D-pad style directional control for MapGridNavigation. Inspired by game controllers.

**Variants:** `default`, `hints`, `compact`, `expanded`, `hud`

### Minimap
Visual overview of the Map showing all Tiles and current position. Click-to-navigate support.

**Variants:** `grid`, `dots`, `blocks`

---

## Architecture Terms

### ScreenOverlay (Legacy → HUD)
> **Deprecated term.** Now called **HUD**.

The floating overlay layer with anchor slots for positioning components.

**Anchor Slots:** `topLeft`, `topCenter`, `topRight`, `left`, `center`, `right`, `bottomLeft`, `bottomCenter`, `bottomRight`

### ContentFrame
Structural skeleton that provides slots for bars that **push** content inward. Used in Basic Web Layout (not Spatial).

```
ContentFrame pushes:        HUD floats:
┌──────────────────┐        ┌──────────────────┐
│     Header       │        │▒▒▒▒▒HUD▒▒▒▒▒▒▒▒▒▒│
├──────────────────┤        │                  │
│                  │        │   Full Content   │
│  Pushed Content  │        │                  │
│                  │        │                  │
├──────────────────┤        │▒▒▒▒▒HUD▒▒▒▒▒▒▒▒▒▒│
│     Footer       │        └──────────────────┘
└──────────────────┘
```

### Layer
Stacking order for multiple bars at the same anchor slot. Layer 0 is closest to content, higher layers are further out (toward edge).

### Slot
Anchor position where HUD components attach (e.g., `bottomCenter`, `topRight`).

---

## File/Directory Naming

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `ActionBar.tsx` |
| Directory | kebab-case | `action-bars/` |
| Story | Component + `.stories.tsx` | `ActionBar.stories.tsx` |
| Types | Component + `.types.ts` or `types.ts` | `ActionBar.types.ts` |
| Hook | `use` + PascalCase | `useMapGrid.ts` |

---

## Storybook Organization

```
Layout Systems/
├── Introduction            # Package overview, quick start
├── Architecture            # System design, patterns
├── Dictionary              # (This document as MDX)
│
├── Basic Web Layouts/      # Traditional web templates
│   ├── MinimalLayout
│   ├── DashboardLayout
│   ├── DocumentationLayout
│   └── ...
│
├── Spatial Layouts/        # Full-viewport, MapGrid-based
│   ├── Overview
│   ├── FullScreenLayout
│   ├── MapGridNavigation
│   └── Tiles
│
└── HUD Components/         # Floating overlay components
    ├── Overview
    ├── Header/
    ├── Action Bars/        # ActionBar, NavBar, Toolbar, SettingsBar
    ├── Docks/              # ActionDock
    ├── Orbs/               # ActionOrb, OrbCluster
    └── Navigation/         # NavigationPad, Minimap
```

---

## Related Documents

- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design and patterns
- [CONCEPTS.md](./CONCEPTS.md) — Core concepts deep dive
- [MAP_GRID_NAVIGATION.md](./MAP_GRID_NAVIGATION.md) — Navigation system details
