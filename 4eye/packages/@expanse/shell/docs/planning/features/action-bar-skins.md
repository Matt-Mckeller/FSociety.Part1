# Action Bar Background Skins & Styles

> Plan for expanding visual customization options for action bars with comprehensive skin/style system

---

## Current State

### Existing Components
- **SpatialBar**: Has basic `SpatialBarSkin` with variant (glass/solid/outline), borderRadius, shadow
- **ActionBar**: Has glassEffect and elevated props, but no comprehensive skin system
- **ActionDock**: Has `ActionDockSkin` similar to SpatialBar

### Current Limitations
- Limited shape options (only "pill" as special case)
- No separation of concerns between shape, surface treatment, and decorations
- Inconsistent APIs across components
- Limited border customization

---

## Design Goals

1. **Modular Design**: Separate shape, surface, border, and shadow concerns
2. **Consistent API**: Unified skin system across all action bar components
3. **Theme Integration**: Respect theme mode (light/dark) with sensible defaults
4. **Extensibility**: Easy to add new variants without breaking changes
5. **Performance**: CSS-in-JS optimized, no unnecessary re-renders

---

## Architecture

### Skin Type Structure

```typescript
interface ActionBarSkin {
  // Shape & Border Radius
  shape?: BarShape
  
  // Surface Treatment (background style)
  surface?: BarSurface
  
  // Border Configuration
  border?: BarBorder
  
  // Shadow/Elevation
  elevation?: BarElevation
  
  // Custom overrides
  custom?: {
    bgcolor?: string
    blur?: number
    borderRadius?: number | string
  }
}
```

### 1. Shape Options (`BarShape`)

Controls the cornerRadius and overall form factor:

| Shape | BorderRadius | Description | Use Case |
|-------|-------------|-------------|----------|
| `pill` | `28px` (full rounded ends) | Classic pill shape | Default, friendly & modern |
| `rounded` | `12px` | Medium rounded corners | Balanced, professional |
| `soft` | `6px` | Subtle rounded corners | Subtle, minimal |
| `square` | `0px` | Sharp 90° corners | Technical, precise |
| `capsule` | `16px` (asymmetric possible) | Elongated pill | Specialized layouts |

**Implementation:**
```typescript
type BarShape = 'pill' | 'rounded' | 'soft' | 'square' | 'capsule'

const SHAPE_RADIUS: Record<BarShape, number | string> = {
  pill: 28,
  rounded: 12,
  soft: 6,
  square: 0,
  capsule: 16,
}
```

### 2. Surface Treatment (`BarSurface`)

Controls the background appearance and material:

| Surface | Description | CSS Properties | Use Case |
|---------|-------------|----------------|----------|
| `glass` | Translucent frosted glass | backdrop-filter: blur(8px)<br>opacity: 0.95 | Default, floats over content |
| `frosted` | Heavy blur, less transparency | backdrop-filter: blur(12px)<br>opacity: 0.85 | Strong visual hierarchy |
| `solid` | Opaque, no blur | opacity: 1<br>no backdrop-filter | Maximum contrast |
| `tinted` | Slight transparency, no blur | opacity: 0.95<br>no backdrop-filter | Subtle overlay |
| `outline` | Transparent with border | transparent bg<br>border: 2px | Minimal, lightweight |
| `minimal` | No background | transparent<br>no border | Content-first |

**Implementation:**
```typescript
type BarSurface = 'glass' | 'frosted' | 'solid' | 'tinted' | 'outline' | 'minimal'

function getSurfaceStyles(
  surface: BarSurface,
  colorMode: 'light' | 'dark'
): SxProps<Theme> {
  const isDark = colorMode === 'dark'
  
  const baseColor = isDark 
    ? 'rgba(30, 30, 30, COLOR_ALPHA)' 
    : 'rgba(250, 250, 250, COLOR_ALPHA)'
  
  switch (surface) {
    case 'glass':
      return {
        bgcolor: baseColor.replace('COLOR_ALPHA', '0.95'),
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }
    case 'frosted':
      return {
        bgcolor: baseColor.replace('COLOR_ALPHA', '0.85'),
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }
    case 'solid':
      return {
        bgcolor: baseColor.replace('COLOR_ALPHA', '1'),
      }
    case 'tinted':
      return {
        bgcolor: baseColor.replace('COLOR_ALPHA', '0.95'),
      }
    case 'outline':
      return {
        bgcolor: 'transparent',
      }
    case 'minimal':
      return {
        bgcolor: 'transparent',
      }
  }
}
```

### 3. Border Configuration (`BarBorder`)

Controls border appearance:

| Border | Width | Opacity | Description |
|--------|-------|---------|-------------|
| `none` | 0 | - | No border |
| `subtle` | 1px | 0.08 (light) / 0.1 (dark) | Gentle separation |
| `normal` | 1px | 0.12 (light) / 0.15 (dark) | Standard border |
| `prominent` | 2px | 0.2 (light) / 0.25 (dark) | Strong definition |
| `accent` | 2px | theme.primary.main | Highlighted border |

**Implementation:**
```typescript
type BarBorder = 'none' | 'subtle' | 'normal' | 'prominent' | 'accent'

function getBorderStyles(
  border: BarBorder,
  colorMode: 'light' | 'dark',
  theme: Theme
): SxProps<Theme> {
  const isDark = colorMode === 'dark'
  
  switch (border) {
    case 'none':
      return { border: 'none' }
    case 'subtle':
      return { 
        border: '1px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
      }
    case 'normal':
      return { 
        border: '1px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'
      }
    case 'prominent':
      return { 
        border: '2px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'
      }
    case 'accent':
      return { 
        border: '2px solid',
        borderColor: theme.palette.primary.main
      }
  }
}
```

### 4. Elevation/Shadow (`BarElevation`)

Controls shadow and depth:

| Elevation | MUI Elevation | Description |
|-----------|--------------|-------------|
| `none` | 0 | Flat, no shadow |
| `low` | 2 | Subtle lift |
| `medium` | 4 | Standard depth |
| `high` | 8 | Prominent float |
| `glow` | Custom | Colored glow effect |

**Implementation:**
```typescript
type BarElevation = 'none' | 'low' | 'medium' | 'high' | 'glow'

function getElevationValue(elevation: BarElevation): number {
  switch (elevation) {
    case 'none': return 0
    case 'low': return 2
    case 'medium': return 4
    case 'high': return 8
    case 'glow': return 0 // Custom box-shadow
  }
}
```

---

## Preset Combinations

Common pre-configured skins for quick use:

```typescript
const PRESET_SKINS: Record<string, ActionBarSkin> = {
  'default': {
    shape: 'pill',
    surface: 'glass',
    border: 'subtle',
    elevation: 'medium',
  },
  'minimal': {
    shape: 'rounded',
    surface: 'minimal',
    border: 'none',
    elevation: 'none',
  },
  'solid-pro': {
    shape: 'rounded',
    surface: 'solid',
    border: 'normal',
    elevation: 'low',
  },
  'frosted-float': {
    shape: 'pill',
    surface: 'frosted',
    border: 'subtle',
    elevation: 'high',
  },
  'outlined': {
    shape: 'soft',
    surface: 'outline',
    border: 'prominent',
    elevation: 'none',
  },
  'technical': {
    shape: 'square',
    surface: 'solid',
    border: 'accent',
    elevation: 'low',
  },
}
```

---

## Implementation Plan

### Phase 1: Type System (Core)
1. ✅ Create comprehensive skin types
2. ✅ Define helper functions (getSurfaceStyles, getBorderStyles, etc.)
3. ✅ Add preset combinations

### Phase 2: Component Updates
1. **SpatialBar** - Upgrade existing skin prop
2. **ActionBar** - Add skin prop, deprecate glassEffect/elevated
3. **ActionDock** - Align with new skin system
4. **Toolbar** - Add skin prop
5. **SettingsBar** - Add skin prop

### Phase 3: Stories & Documentation
1. Create `SkinShowcase.stories.tsx` with all variations
2. Grid display showing shape × surface combinations
3. Interactive controls for live customization
4. Document migration guide for deprecated props

### Phase 4: Utilities
1. Create `resolveSkin()` helper to merge presets + overrides
2. Add theme-aware defaults
3. Performance optimization (memoization)

---

## Story Structure

```typescript
export const SkinShowcase: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Action Bar Skins</Typography>
      
      {/* Shape Variations */}
      <Section title="Shapes">
        <Grid>
          <BarExample skin={{ shape: 'pill' }} label="Pill (Default)" />
          <BarExample skin={{ shape: 'rounded' }} label="Rounded" />
          <BarExample skin={{ shape: 'soft' }} label="Soft" />
          <BarExample skin={{ shape: 'square' }} label="Square" />
          <BarExample skin={{ shape: 'capsule' }} label="Capsule" />
        </Grid>
      </Section>
      
      {/* Surface Variations */}
      <Section title="Surfaces">
        <Grid>
          <BarExample skin={{ surface: 'glass' }} label="Glass (Default)" />
          <BarExample skin={{ surface: 'frosted' }} label="Frosted" />
          <BarExample skin={{ surface: 'solid' }} label="Solid" />
          <BarExample skin={{ surface: 'tinted' }} label="Tinted" />
          <BarExample skin={{ surface: 'outline' }} label="Outline" />
          <BarExample skin={{ surface: 'minimal' }} label="Minimal" />
        </Grid>
      </Section>
      
      {/* Preset Combinations */}
      <Section title="Presets">
        <Grid>
          <BarExample skin="default" label="Default" />
          <BarExample skin="minimal" label="Minimal" />
          <BarExample skin="solid-pro" label="Solid Pro" />
          <BarExample skin="frosted-float" label="Frosted Float" />
          <BarExample skin="outlined" label="Outlined" />
          <BarExample skin="technical" label="Technical" />
        </Grid>
      </Section>
      
      {/* Matrix View: Shape × Surface */}
      <Section title="All Combinations">
        <MatrixGrid shapes={shapes} surfaces={surfaces} />
      </Section>
    </Box>
  )
}
```

---

## Migration Guide

### Before (Deprecated)
```typescript
<SpatialBar 
  position="top"
  glassEffect={true}
  elevated={true}
  borderRadius="pill"
/>
```

### After (New API)
```typescript
<SpatialBar 
  position="top"
  skin={{
    shape: 'pill',
    surface: 'glass',
    elevation: 'medium',
  }}
/>

// Or use preset
<SpatialBar 
  position="top"
  skin="default"
/>
```

---

## Benefits

1. **More Expressive**: Separate concerns allow fine-grained control
2. **Consistent**: Same API across all action bar components
3. **Theme-Aware**: Automatically adapts to light/dark mode
4. **Extensible**: Easy to add new shapes, surfaces without breaking changes
5. **Type-Safe**: Full TypeScript support with intellisense
6. **Performance**: Memoized style resolution
7. **Composable**: Mix presets with custom overrides

---

## Next Steps

1. Review and approve design
2. Implement type definitions
3. Create helper functions
4. Update SpatialBar component
5. Create comprehensive story
6. Document and test
7. Roll out to other components
