# HUD Components

Floating UI components for Spatial Layout interfaces (Heads-Up Display).

> For complete terminology, see [DICTIONARY.md](../../docs/DICTIONARY.md)

## What are HUD Components?

HUD (Heads-Up Display) components are **always-visible floating controls** that overlay the main content. They provide quick access to actions, navigation, and settings without pushing or affecting the content layout.

**Key Characteristics:**
- Float above content using `position: fixed` (not in page flow)
- Always visible/accessible
- Positioned at screen edges or corners
- Work with Spatial Layout (not Basic Web Layout)
- Configurable patterns and layouts

## Component Hierarchy

```
HUD Layer
├── Header/           # Global context (branding, user, domain)
├── action-bars/      # Edge-positioned bars
│   ├── ActionBar     # Generic action bar (base)
│   ├── NavBar        # Navigation variant
│   ├── Toolbar       # Tool selection (radio behavior)
│   └── SettingsBar   # Toggle controls (checkbox behavior)
├── docks/            # Corner containers
│   └── ActionDock    # Corner button clusters
├── orbs/             # Floating action buttons
│   ├── ActionOrb     # Single orb
│   └── OrbCluster    # Grouped orbs
├── navigation-pad/   # Directional controls
│   └── NavigationPad # D-pad controls
└── shared/           # Common utilities
    └── HudCollapseHandle
```

## Component Categories

### Action Bars (`action-bars/`)

Edge-positioned bars containing actions, navigation, or controls.

#### ActionBar (Base)
Generic action bar for any edge position.

```tsx
import { ActionBar } from '@expanse/shell';

<ActionBar 
  position="bottom"
  items={[
    { type: 'button', label: 'Edit', onClick: handleEdit },
    { type: 'nav', label: 'Home', href: '/' }
  ]}
  variant="default" // 'default' | 'rich' | 'simple' | 'collapsible'
/>
```

**Positions:** `top`, `bottom`, `left`, `right`  
**Variants:** Default, Rich, Simple, Collapsible

#### Toolbar
Tool/mode selection with **radio behavior** (one active at a time).

```tsx
import { Toolbar } from '@expanse/shell';

<Toolbar 
  position="left"
  value="select"
  onChange={setMode}
  tools={[
    { id: 'select', icon: <SelectIcon />, label: 'Select' },
    { id: 'draw', icon: <DrawIcon />, label: 'Draw' },
    { id: 'erase', icon: <EraseIcon />, label: 'Erase' },
  ]}
/>
```

#### SettingsBar
Configuration toggles with **checkbox behavior** (multiple can be active).

```tsx
import { SettingsBar } from '@expanse/shell';

<SettingsBar 
  position="right"
  items={[
    { id: 'darkMode', icon: <DarkModeIcon />, value: isDark, onChange: toggleDark },
    { id: 'sound', icon: <VolumeIcon />, value: soundOn, onChange: toggleSound },
  ]}
/>
```

### Docks (`docks/`)

Corner-positioned containers for grouping buttons.

#### ActionDock
Groups action buttons at corners.

```tsx
import { ActionDock } from '@expanse/shell';

<ActionDock 
  position="bottom-right"
  buttons={[
    { icon: <NotificationIcon />, count: 3 },
    { icon: <MessageIcon />, count: 5 }
  ]}
/>
```

**Positions:** `top-left`, `top-right`, `bottom-left`, `bottom-right`

### Orbs (`orbs/`)

Floating action buttons arranged in patterns.

#### ActionOrb
Single floating action button with shape variants.

```tsx
import { ActionOrb } from '@expanse/shell';

<ActionOrb 
  icon={<ChatIcon />}
  label="AI Assistant"
  shape="circle"
  variant="ai"
  onClick={openAI}
/>
```

**Shapes:** `circle`, `square`, `diamond`, `triangle`, `hexagon`  
**Variants:** `default`, `ai`, `solid`, `ghost`, `glow`

#### OrbCluster
Groups of orbs arranged in patterns.

```tsx
import { OrbCluster } from '@expanse/shell';

<OrbCluster 
  pattern="bottom-row" 
  items={[
    { icon: <HomeIcon />, label: 'Home', onClick: goHome },
    { icon: <SearchIcon />, label: 'Search', onClick: openSearch },
    { icon: <SettingsIcon />, label: 'Settings', onClick: openSettings }
  ]}
/>
```

**Patterns:** `bottom-row`, `right-stack`, `left-stack`, `corners`, `radial`, `bottom-arc`, `center`, `custom`

### Navigation (`navigation-pad/`)

#### NavigationPad
D-pad style directional controls for MapGridNavigation.

```tsx
import { NavigationPad } from '@expanse/shell';

<NavigationPad 
  variant="default" 
  position="bottom-left"
  onNavigate={(direction) => navigate(direction)}
/>
```

**Variants:** `default`, `hints`, `compact`, `expanded`, `hud`  
**Directions:** `up`, `down`, `left`, `right`, `home`, `back`

### Shared (`shared/`)

#### HudCollapseHandle
Handle for collapsing HUD elements.

```tsx
import { HudCollapseHandle } from '@expanse/shell';

<HudCollapseHandle 
  isCollapsed={collapsed}
  onToggle={toggleCollapse}
  direction="vertical"
/>
```

## Positioning System

All HUD components support flexible positioning:

```tsx
// Edge positions (ActionBar, Toolbar, SettingsBar)
position="top" | "bottom" | "left" | "right"

// Corner positions (ActionDock, Minimap)
position="top-left" | "top-right" | "bottom-left" | "bottom-right"
```

## See Also

- [Dictionary](../../docs/DICTIONARY.md) - Terminology definitions
- [ScreenOverlay](../spatial/overlays/) - Low-level overlay component
- [Minimap](../spatial/minimap/) - Grid overview component

// Radial/fan arrangement
<OrbCluster pattern="radial" center={{ x: 50, y: 50 }} />
```

## Theming & Styling

HUD components integrate with MUI theme:

```tsx
import { ThemeProvider } from '@mui/material';

<ThemeProvider theme={customTheme}>
  <ActionBar /> {/* Automatically styled */}
  <OrbCluster shape="hexagon" color="primary" />
</ThemeProvider>
```

**Customization Options:**
- Shapes: circle, square, diamond, triangle, hexagon
- Colors: theme colors or custom hex
- Sizes: small, medium, large
- Transparency levels
- Glow/shadow effects

## Best Practices

### ✅ Do

- **Position thoughtfully** - Don't block important content
- **Keep visible** - HUD components should be always accessible
- **Consistent patterns** - Use same positions across similar screens
- **Mobile-friendly** - Use `right-stack` or `bottom-row` for thumb reach
- **Limit quantity** - Too many floating elements = clutter

### ❌ Don't

- **Overlap critical content** - Respect content area
- **Too many orbs** - 3-5 max per cluster
- **Inconsistent positioning** - Users expect controls in same place
- **Ignore touch zones** - Bottom corners hard to reach on phones
- **Hide without indication** - Collapsed HUD should show hint

## Usage with Spatial Layouts

HUD components work seamlessly with spatial templates:

```tsx
import { FullScreenLayout } from '@expanse/shell';
import { ActionBar, OrbCluster, NavigationPad, Minimap } from '@expanse/shell';

<FullScreenLayout tiles={tiles}>
  {/* HUD Components */}
  <ActionBar position="bottom" items={actions} />
  <OrbCluster pattern="bottom-row" items={orbs} />
  <NavigationPad position="bottom-left" />
  <Minimap position="bottom-right" />
</FullScreenLayout>
```

## Usage with Basic Web Layouts

HUD components can also enhance traditional layouts for specific interactions:

```tsx
import { DocumentationLayout } from '@expanse/shell';
import { FloatingToolbar, ActionDock } from '@expanse/shell';

<DocumentationLayout>
  {/* Page content */}
  <FloatingToolbar position="top-right" tools={editTools} />
  <ActionDock position="bottom-right" buttons={helpButtons} />
</DocumentationLayout>
```

## Accessibility

All HUD components support keyboard navigation and screen readers:

- **Keyboard shortcuts** - Arrow keys, Enter, Escape
- **Focus management** - Tab order, focus trapping
- **ARIA labels** - Screen reader announcements
- **Touch/mouse** - Both input types supported

```tsx
<NavigationPad 
  ariaLabel="Grid navigation controls"
  keyboardShortcuts={{
    up: 'ArrowUp',
    down: 'ArrowDown',
    home: 'h'
  }}
/>
```

## Examples

See Storybook for interactive examples:
- **Layout Systems » HUD Components » Overview** - All components together
- **Layout Systems » HUD Components » Action Bars** - Action bar variations
- **Layout Systems » HUD Components » Orbs** - Orb patterns and shapes
- **Layout Systems » HUD Components » Navigation Pad** - D-pad variants

## Related

- [../spatial/README.md](../spatial/README.md) - Spatial layout system
- [../templates/README.md](../templates/README.md) - Pre-built templates
- [../core/README.md](../core/README.md) - Shared infrastructure
