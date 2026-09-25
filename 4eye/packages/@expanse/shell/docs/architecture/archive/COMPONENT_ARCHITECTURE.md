# HUD Component Architecture & Skin System Alignment

> Understanding the relationships between bar components and the unified skin system.

---

## Component Taxonomy

### Bar Components (Edge/Corner Positioned)

All bar components share similar positioning, sizing, and visual styling needs but serve different purposes:

#### 1. **ActionBar** (Primary, Non-Deprecated)
- **Location**: `hud-components/action-bars/`
- **Purpose**: Main application/navigation bars (traditional app bars)
- **Variants**: simple, rich, collapsible
- **Positioning**: **Full-edge** (spans entire top/bottom/left/right)
- **Content**: Logo, title, subtitle, actions, **rich navigation**
- **Current Styling**: Basic props (`glassEffect`, `elevated`)
- **Use Cases**: App navigation, headers, sidebars, footers

#### 2. **SpatialBar** (⚠️ TRANSITIONAL STATE)
- **Location**: `hud-components/spatial-bar/`
- **Purpose**: Compact, centered action bars for spatial/HUD layouts
- **Status**: ⚠️ Marked deprecated but **actively used** (merge incomplete)
- **Positioning**: **Centered** on edge or corner (30-50% typical length)
- **Content**: **Icon buttons only** (no titles, logos)
- **Current Styling**: `SpatialBarSkin` (variant, borderRadius, blur, shadow)
- **Use Cases**: HUD templates, game interfaces, tool panels

#### 3. **Toolbar** (Specialized)
- **Location**: `hud-components/toolbar/`
- **Purpose**: Tool/mode selection with radio behavior
- **Positioning**: Edge or corner
- **Content**: Icon buttons (mutually exclusive selection)
- **Behavior**: Radio button group (one active at a time)
- **Current Styling**: `ToolbarSkin` (identical structure to SpatialBarSkin)

#### 4. **SettingsBar** (Specialized)
- **Location**: `hud-components/settings-bar/`
- **Purpose**: Setting toggles with checkbox behavior
- **Positioning**: Edge or corner
- **Content**: Icon toggle buttons (independent)
- **Behavior**: Checkbox group (multiple can be active)
- **Current Styling**: `SettingsBarSkin` (identical structure to SpatialBarSkin)

#### 5. **ActionDock** (Corner Variant)
- **Location**: `hud-components/docks/`
- **Purpose**: Corner-positioned button stacks
- **Positioning**: Corners only (not edges)
- **Content**: Stacked action buttons
- **Behavior**: Independent actions
- **Current Styling**: `ActionDockSkin` (identical structure to SpatialBarSkin)

---

## Current Skin System Problems

### 1. Duplication
All five components have nearly identical but separate skin type definitions:
```typescript
// Four separate but identical definitions
interface SpatialBarSkin { variant, bgcolor, blur, borderRadius, shadow }
interface ToolbarSkin { variant, bgcolor, blur, borderRadius, shadow }
interface SettingsBarSkin { variant, bgcolor, blur, borderRadius, shadow }
interface ActionDockSkin { variant, bgcolor, blur, borderRadius, shadow }
// ActionBar has no comprehensive skin at all (just glassEffect, elevated)
```

### 2. Limited Flexibility
The old skin structure only supports:
- 3 variants (glass, solid, outline)
- Custom color override
- Single borderRadius or "pill"
- Binary shadow (on/off)
- Blur amount for glass

**Cannot customize:**
- Border styles independently (width, color, style)
- Elevation levels separately from blur
- Surface treatments (matte, polished, frosted)
- Shape presets (rounded, sharp, pill, stadium)

### 3. Inconsistent Naming
- "ActionBar" is tmarked deprecated but **actively used** and HAS a skin type
- All other bars duplicate the same structure

### 4. Incomplete Deprecation
The deprecation is **misleading**:
- SpatialBar is marked `@deprecated` in docs/comments
- **BUT** it's actively used in `HudDesktopDefault` template
- **AND** ActionBar cannot replace it (different use case)
- ActionBar is **full-edge** with titles/logos
- SpatialBar is **compact/centered** with icons onlyype
- All other bars duplicate the same structure

---

## Current Reality vs Documentation

### What the Code Says vs What It Does

**Documentation states:**
- SpatialBar is deprecated
- Merge into ActionBar in progress

**Actual situation:**
- SpatialBar is **actively used** in templates (`HudDesktopDefault.tsx`)
- ActionBar **cannot** replace SpatialBar (different positioning, different content model)
- Deprecation warnings exist but merge is **incomplete/stalled**

### Key Differences: Why They're Both Needed

| Feature | ActionBar | SpatialBar |
|---------|-----------|------------|
| **Positioning** | Full edge (100% width/height) | Centered (30-50% of edge) |
| **Content** | Logo, title, subtitle, actions | Icon buttons only |
| **Use Case** | App navigation, headers | HUD controls, tool panels |
| **Alignment** | Traditional app bar | Spatial/game interface |
| **Centering** | ❌ No (full span) | ✅ Yes (centered on edge) |

**Example positioning:**
```tsx
// ActionBar - spans full width
<ActionBar edge="top" /> // Top edge: 0px → 100vw

// SpatialBar - centered, compact
<SpatialBar position="top" length={{ percent: 40 }} /> // Top edge: 30% → 70%
```

### Current Usage in HudDesktopDefault Template

The main HUD template uses **SpatialBar** extensively:
```tsx
// Top bar - Centered at 45% width
<SpatialBar position="top" length={{ percent: 45 }}>
  <HudButton icon={<HomeIcon />} label="Home" />
  <HudButton icon={<SearchIcon />} label="Search" />
  // ...only icon buttons
</SpatialBar>

// Left bar - Full height, collapsible
<SpatialBar position="left" collapsed={leftCollapsed} collapseHandle="arrow">
  <HudButton icon={<EditIcon />} label="Edit" />
  // ...only icon buttons
</SpatialBar>
```

**Why not ActionBar?** ActionBar doesn't support:
- Centered positioning (only full-edge)
- `length` prop (always 100%)
- Compact icon-only layouts (designed for title/logo)

---

## New Unified Skin System

### Design Philosophy

**One comprehensive, modular skin system for ALL bar components.**

Instead of duplicating simple skins across five components, we create one powerful, reusable system that:
1. Separates concerns (shape, surface, border, elevation)
2. Provides preset combinations for common use cases
3. Allows full customization when needed
4. Works consistently across all bar types

### Architecture

```typescript
// Modular properties (mix and match)
type BarShape = "rounded" | "sharp" | "pill" | "stadium" | "custom"
type BarSurface = "glass" | "frosted" | "solid" | "gradient" | "outline" | "minimal"
type BarBorder = "none" | "subtle" | "strong" | "accent" | "custom"
type BarElevation = "none" | "low" | "medium" | "high" | "custom"

// Full skin configuration
interface BarSkin {
  // Preset (convenience)
  preset?: "default" | "minimal" | "solid-pro" | "frosted-float" | "outlined" | "technical"
  
  // Custom overrides (when you need full control)
  shape?: BarShape
  surface?: BarSurface
  border?: BarBorder
  elevation?: BarElevation
  
  // Fine-tuning
  customRadius?: number
  customBlur?: number
  customColor?: string
  customBorderColor?: string
  customShadow?: string
}

// Preset combinations (80% of use cases)
const PRESET_SKINS = {
  default: { shape: "rounded", surface: "glass", border: "subtle", elevation: "medium" },
  minimal: { shape: "rounded", surface: "minimal", border: "none", elevation: "none" },
  "solid-pro": { shape: "stadium", surface: "solid", border: "accent", elevation: "high" },
  // ...and more
}
```

### Naming: `BarSkin` vs `ActionBarSkin`

**Decision: Use `BarSkin` (generic) instead of `ActionBarSkin` (specific)**

**Rationale:**
1. **Reusability**: All bar components (ActionBar, Toolbar, SettingsBar, ActionDock, SpatialBar) share the same visual styling needs
2. **Simplicity**: One type name to remember, not five
3. **Consistency**: Components differ in behavior/content, not visual presentation
4. **Future-proof**: New bar types can use the same skin system
5. **Migration**: SpatialBar → ActionBar merge becomes cleaner

**Type Aliases for Backwards Compatibility:**
```typescript
// Primary types
export type BarSkin = { /* ... */ }
export type BarShape = /* ... */
export type BarSurface = /* ... */

// Backwards compatibility during migration
/** @deprecated Use BarSkin instead */
export type SpatialBarSkin = BarSkin
/** @deprecated Use BarSkin instead */
export type ToolbarSkin = BarSkin
/** @deprecated Use BarSkin instead */
export type SettingsBarSkin = BarSkin
/** @deprecated Use BarSkin instead */
export type ActionDockSkin = BarSkin
```

---

## Component Properties Alignment

### Unified Interface

All bar components will accept:
```typescript
interface CommonBarProps {
  // Positioning (component-specific types)
  position: BarPosition // varies by component
  
  // Sizing (consistent)
  length?: BarLength // { percent: 40 } | { pixels: 300 } | "auto"
  thickness?: BarThickness // "xs" | "sm" | "md" | "lg" | { pixels: 56 }
  
  // Visual (unified)
  skin?: BarSkin // NEW: comprehensive skin system
  
  // Deprecated (will be removed)
  /** @deprecated Use skin.preset="frosted-float" or skin.surface="glass" */
  glassEffect?: boolean
  /** @deprecated Use skin.elevation="high" */
  elevated?: boolean
  /** @deprecated Use skin.customColor */
  bgcolor?: string
  
  // Other props...
  offset?: number
  attached?: boolean
  children?: ReactNode
  sx?: SxProps<Theme>
}
```

### Component-Specific Variations

#### ActionBar
```typescript
interface ActionBarProps extends CommonBarProps {
  position: "top" | "bottom" | "left" | "right" // edge only
  variant: "simple" | "rich" | "collapsible" // content variants
  title?: string
  subtitle?: string
  logo?: ReactNode
  actions?: ReactNode
}
```

#### SpatialBar (Deprecated)
```typescript
interface SpatialBarProps extends CommonBarProps {
  position: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
  // ⚠️ Migrate to ActionBar with appropriate settings
}
```

#### Toolbar
```typescript
interface ToolbarProps extends CommonBarProps {
  position: ToolbarPosition // edge or corner
  items: ToolbarItem[] // tool definitions
  value: string // selected tool ID
  onChange: (value: string) => void // radio behavior
}
```

#### SettingsBar
```typescript
interface SettingsBarProps extends CommonBarProps {
  position: SettingsBarPosition // edge or corner
  items: SettingsBarItem[] // setting definitions
  state: Record<string, boolean> // toggle states
  onChange: (id: string, value: boolean) => void // checkbox behavior
}
```

#### ActionDock
```typescript
interface ActionDockProps extends CommonBarProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" // corner only
  orientation?: "vertical" | "horizontal" // stack direction
  // No length (auto-sized to content)
}
```

---

## Migration Path

### Phase 1: Add New Skin System (✅ DONE)
- [x] Create `BarSkin` type definitions
- [x] Implement helper functions (`getSkinStyles()`, `resolveSkin()`)
- [x] Create preset combinations
- [x] Build Storybook showcase

### Phase 2: Integrate into Components (IN PROGRESS)
- [ ] **Decide SpatialBar fate**: Keep as distinct component or merge into ActionBar?
  - Option A: Keep SpatialBar (different positioning model from ActionBar)
  - Option B: Add centered positioning + length support to ActionBar
- [ ] Update ActionBar to accept `skin` prop
- [ ] Update SpatialBar to use new skin system (if keeping)
- [ ] Update Toolbar to use new skin system
- [ ] Update SettingsBar to use new skin system
- [ ] Update ActionDock to use new skin system

### Phase 3: Deprecate Old APIs
- [ ] Mark old skin props as `@deprecated`
- [ ] Add console warnings for deprecated props
- [ ] Update all stories to use new system
- [ ] Update documentation

### Phase 4: Clean Up (if merging SpatialBar)
- [ ] **Decision Point**: Only if SpatialBar is being removed
- [ ] Ensure ActionBar can handle all SpatialBar use cases
- [ ] Update HudDesktopDefault template to use ActionBar
- [ ] Remove deprecated SpatialBar component
- [ ] Remove old SpatialBarSkin type definition
- [ ] Remove backwards compatibility aliases
- [ ] Final documentation review

**Alternative (if keeping SpatialBar):**
- Keep SpatialBar as distinct component with BarSkin system
- Update documentation to remove deprecation notices
- Clarify ActionBar vs SpatialBar use cases

---

## Usage Examples

### Before (Multiple Scattered Approaches)
```tsx
// SpatialBar (deprecated)
<SpatialBar skin={{ variant: "glass", borderRadius: "pill", shadow: true }} />

// Toolbar (separate type)
<Toolbar skin={{ variant: "outline", borderRadius: 8 }} />

// ActionBar (no comprehensive skin)
<ActionBar glassEffect elevated />

// SettingsBar (another separate type)
<SettingsBar skin={{ variant: "solid", bgcolor: "#1a1a1a" }} />
```

### After (Unified System)
```tsx
// Using presets (80% of cases)
<ActionBar skin={{ preset: "default" }} />
<Toolbar skin={{ preset: "minimal" }} />
<SettingsBar skin={{ preset: "solid-pro" }} />
<ActionDock skin={{ preset: "frosted-float" }} />

// Custom combinations
<ActionBar skin={{
  shape: "pill",
  surface: "frosted",
  border: "accent",
  elevation: "high"
}} />

// Fine-tuned overrides
<Toolbar skin={{
  pCurrent Reality vs Documentation

### What the Code Says vs What It Does

**Documentation states:**
- SpatialBar is deprecated
- Merge into ActionBar in progress

**Actual situation:**
- SpatialBar is **actively used** in templates (`HudDesktopDefault.tsx`)
- ActionBar **cannot** replace SpatialBar (different positioning, different content model)
- Deprecation warnings exist but merge is **incomplete/stalled**

### Key Differences: Why They're Both Needed

| Feature | ActionBar | SpatialBar |
|---------|-----------|------------|
| **Positioning** | Full edge (100% width/height) | Centered (30-50% of edge) |
| **Content** | Logo, title, subtitle, actions | Icon buttons only |
| **Use Case** | App navigation, headers | HUD controls, tool panels |
| **Alignment** | Traditional app bar | Spatial/game interface |
| **Centering** | ❌ No (full span) | ✅ Yes (centered on edge) |

**Example positioning:**
```tsx
// ActionBar - spans full width
<ActionBar edge="top" /> // Top edge: 0px → 100vw

// SpatialBar - centered, compact
<SpatialBar position="top" length={{ percent: 40 }} /> // Top edge: 30% → 70%
```

## Summary

### Final Decision: Merge Complete

**Status: ✅ ActionBar Types Updated** (Dec 2024)

1. **ActionBar** now supports all **SpatialBar** features
2. **Unified BarSkin** system implemented for all bar components  
3. New ActionBar features:
   - ✅ Corner positioning (`position="top-right"`)
   - ✅ Centered on edge (`centered` + `length`)
   - ✅ Compact layouts (via `length` prop)
   - ✅ Comprehensive BarSkin styling
4. **SpatialBar** will be removed after migration
5. **Naming**: `BarSkin` applies to ALL bars (Action, Toolbar, Settings, Dock)

### What Changed

**ActionBar New Props:**
```typescript
// Positioning
position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
centered?: boolean
length?: { percent: number } | { pixels: number } | "auto"

// Styling
skin?: BarSkin  // Unified comprehensive system
thickness?: "xs" | "sm" | "md" | "lg"
offset?: number
attached?: boolean

// Deprecated
elevated?: boolean  // Use skin.elevation="high"
glassEffect?: boolean  // Use skin.surface="glass"
```

### Migration Path

**Phase 1: Types & Core** ✅ DONE
- [x] Update ActionBar types
- [x] Add positioning logic
- [x] Add BarSkin support
- [x] Add deprecation warnings

**Phase 2: Variants** (Next)
- [ ] Update ActionBarSimple with positioning/skin
- [ ] Update ActionBarRich with positioning/skin
- [ ] Update ActionBarCollapsible with positioning/skin

**Phase 3: Templates** (Next)
- [ ] Migrate HudDesktopDefault to ActionBar
- [ ] Update examples

**Phase 4: Remove SpatialBar** (Final)
- [ ] Delete spatial-bar directory
- [ ] Remove exports
- [ ] Update documentation

### The Answer to "How Does This Align?"

1. **SpatialBar** is deprecated and merging into **ActionBar**
2. All bar components (ActionBar, Toolbar, SettingsBar, ActionDock) currently have **duplicate, basic skin systems**
3. The new **BarSkin** system provides a **unified, comprehensive** approach for ALL bar components
4. **Naming**: `BarSkin` (not `ActionBarSkin`) because it applies to ALL bars, not just ActionBar
5. **Future**: One powerful skin system replaces five separate, limited ones

### Benefits

- ✅ **Consistency**: Same visual customization across all bars
- ✅ **Power**: Modular design allows complex combinations
- ✅ **Simplicity**: Presets make common cases easy
- ✅ **Maintainability**: Single system to update and test
- ✅ **Documentation**: One skin guide instead of five
- ✅ **Bundle Size**: Shared implementation reduces code duplication
