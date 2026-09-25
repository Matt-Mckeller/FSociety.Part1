# ActionBar + SpatialBar Merger Plan

> Consolidate SpatialBar features into ActionBar, use unified BarSkin system

---

## Decision

**Merge SpatialBar into ActionBar** with the following approach:

1. **Naming**: Use **BarSkin** for the unified skin system (applies to ActionBar, Toolbar, SettingsBar, ActionDock)
2. **Features**: Add SpatialBar capabilities to ActionBar (centered positioning, length control, corner support)
3. **Components**: Keep ActionBar, remove SpatialBar files/stories
4. **Migration**: Update templates and examples to use ActionBar

---

## What ActionBar Needs to Support

### Current SpatialBar Features to Add

1. **Centered Positioning**
   ```tsx
   // SpatialBar: Centered on edge at 40% width
   <SpatialBar position="top" length={{ percent: 40 }} />
   
   // ActionBar: Should support this
   <ActionBar edge="top" length={{ percent: 40 }} centered />
   ```

2. **Length Control**
   ```tsx
   length?: { percent: number } | { pixels: number } | "auto"
   ```

3. **Corner Positioning**
   ```tsx
   position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
   ```

4. **Icon-Only Layouts**
   - Already supported via `children` prop
   - No title/logo required

### New ActionBar API

```typescript
interface ActionBarProps {
  // Existing
  variant?: "simple" | "rich" | "collapsible"
  edge?: "top" | "bottom" | "left" | "right"
  
  // NEW: SpatialBar features
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  length?: { percent: number } | { pixels: number } | "auto"
  centered?: boolean // Center on edge instead of full span
  
  // NEW: Unified skin system
  skin?: BarSkin
  
  // Deprecated (use skin instead)
  /** @deprecated Use skin.elevation="high" */
  elevated?: boolean
  /** @deprecated Use skin.surface="glass" */
  glassEffect?: boolean
  
  // Rest remains the same
  size?: number
  children?: ReactNode
  actions?: ReactNode
  logo?: ReactNode
  title?: string
  subtitle?: string
  // ...
}
```

---

## Implementation Steps

### Phase 1: Extend ActionBar Types ✅
- [ ] Add `position` prop for corners
- [ ] Add `length` prop for centered/compact layouts
- [ ] Add `centered` boolean flag
- [ ] Add `skin` prop using BarSkin type
- [ ] Mark `glassEffect`, `elevated` as deprecated

### Phase 2: Update ActionBar Component ✅
- [ ] Add positioning logic for corners
- [ ] Add centering logic (transform: translateX/Y)
- [ ] Add length calculation (percent, pixels, auto)
- [ ] Integrate getSkinStyles() helper
- [ ] Add deprecation warnings for old props

### Phase 3: Update Variant Components ✅
- [ ] ActionBarSimple: Add skin system support
- [ ] ActionBarRich: Add skin system support
- [ ] ActionBarCollapsible: Add skin system support
- [ ] All variants: Support centered + length props

### Phase 4: Update Templates ✅
- [ ] HudDesktopDefault: Replace SpatialBar with ActionBar
- [ ] Update all examples

### Phase 5: Remove SpatialBar ✅
- [ ] Delete `/src/hud-components/spatial-bar/` directory
  - [x] SpatialBar.tsx
  - [x] SpatialBarButton.tsx
  - [x] SpatialBarDivider.tsx
  - [x] SpatialBar.stories.tsx
  - [x] types.ts
  - [x] index.ts
- [ ] Remove exports from `/src/hud-components/index.ts`
- [ ] Remove exports from `/src/index.ts`
- [ ] Remove references in documentation

### Phase 6: Update Other Components ✅
- [ ] Toolbar: Use BarSkin
- [ ] SettingsBar: Use BarSkin
- [ ] ActionDock: Use BarSkin
- [ ] Update all stories

### Phase 7: Documentation ✅
- [ ] Update ActionBar documentation
- [ ] Add migration guide (SpatialBar → ActionBar)
- [ ] Update examples
- [ ] Remove deprecation notices

---

## Migration Examples

### Before (SpatialBar)
```tsx
<SpatialBar 
  position="top" 
  length={{ percent: 40 }}
  skin={{ variant: "glass", borderRadius: "pill" }}
>
  <SpatialBarButton icon={<HomeIcon />} label="Home" />
</SpatialBar>
```

### After (ActionBar)
```tsx
<ActionBar 
  edge="top" 
  length={{ percent: 40 }}
  centered
  skin={{ preset: "default" }} // or shape: "pill", surface: "glass"
>
  <HudButton icon={<HomeIcon />} label="Home" />
</ActionBar>
```

### Corner Positioning
```tsx
// Before
<SpatialBar position="bottom-right" offset={20}>
  <SpatialBarButton icon={<UndoIcon />} />
</SpatialBar>

// After
<ActionBar position="bottom-right" offset={20}>
  <HudButton icon={<UndoIcon />} />
</ActionBar>
```

---

## Files to Remove

### SpatialBar Component Files
- `/src/hud-components/spatial-bar/SpatialBar.tsx`
- `/src/hud-components/spatial-bar/SpatialBarButton.tsx`
- `/src/hud-components/spatial-bar/SpatialBarDivider.tsx`
- `/src/hud-components/spatial-bar/SpatialBar.stories.tsx`
- `/src/hud-components/spatial-bar/types.ts`
- `/src/hud-components/spatial-bar/index.ts`
- `/src/hud-components/spatial-bar/` (entire directory)

### Export Updates
- `/src/hud-components/index.ts` - Remove SpatialBar export
- `/src/index.ts` - Remove SpatialBar export, update comments

---

## Breaking Changes

### Imports
```tsx
// Old
import { SpatialBar, SpatialBarButton } from "@expanse/shell"

// New
import { ActionBar, HudButton } from "@expanse/shell"
```

### Props
```tsx
// Old props
<SpatialBar 
  position="top"              // Position
  length={{ percent: 40 }}    // Length
  skin={{ variant: "glass" }} // Old skin
/>

// New props
<ActionBar 
  edge="top"                  // Edge (for edge positioning)
  position="top-left"         // OR position (for corner)
  length={{ percent: 40 }}    // Same
  centered                    // NEW: center on edge
  skin={{ preset: "default" }} // New comprehensive skin
/>
```

---

## Timeline

- **Phase 1-3**: ActionBar enhancement (1-2 days)
- **Phase 4**: Template migration (1 day)
- **Phase 5**: SpatialBar removal (1 day)
- **Phase 6**: Other components (2 days)
- **Phase 7**: Documentation (1 day)

**Total**: ~1 week

---

## Benefits

1. ✅ **Single component** for all bar use cases
2. ✅ **Unified BarSkin** system (no duplication)
3. ✅ **Reduced bundle size** (one component instead of two)
4. ✅ **Easier maintenance** (one API, one impl)
5. ✅ **Better DX** (one component to learn)
6. ✅ **More powerful** (comprehensive skin customization)
