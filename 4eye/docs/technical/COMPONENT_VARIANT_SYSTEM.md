# Component Variant System

## Overview
MUI-style variant system for @expanse/shell components. Each component supports multiple visual and behavioral variants via props, with shared logic through hooks and context.

## Architecture

### Hybrid Approach
- **Shared Logic**: Hooks and context manage state, navigation, and behavior
- **Variant Rendering**: Component-specific rendering based on `variant` prop
- **Type Safety**: TypeScript unions for variants with proper type narrowing

### Component Structure
```
components/
  Minimap/
    index.ts              # Public exports
    types.ts              # Component-specific types and variants
    Minimap.tsx           # Base component with variant switching
    useMinimap.tsx        # Shared hook for minimap logic
    variants/
      MinimapGrid.tsx     # Grid-style rendering
      MinimapDots.tsx     # Dots-style rendering
      MinimapBlocks.tsx   # Blocks-style rendering
```

## Variant System Specification

### 1. Minimap Variants

#### Visual Styles
- **`grid`**: Connected grid lines showing spatial relationships
- **`dots`**: Individual dots for each tile, minimal visual
- **`blocks`**: Solid filled rectangles with spacing

#### Sizes
- **`small`**: 80x80px compact (tileSize: 12px, gap: 2px)
- **`medium`**: 120x120px default (tileSize: 20px, gap: 3px)
- **`large`**: 160x160px detailed (tileSize: 32px, gap: 4px)

#### Color Schemes
- **`default`**: Primary/success/warning palette
- **`monochrome`**: Grayscale-only
- **`vibrant`**: High-contrast bright colors
- **`custom`**: User-defined color mapping

#### Props Interface
```typescript
export type MinimapVariant = 'grid' | 'dots' | 'blocks'
export type MinimapSize = 'small' | 'medium' | 'large'
export type MinimapColorScheme = 'default' | 'monochrome' | 'vibrant' | 'custom'

interface MinimapProps {
  variant?: MinimapVariant
  size?: MinimapSize
  colorScheme?: MinimapColorScheme
  customColors?: ColorMapping
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline'
  showLabels?: boolean
  showIndicator?: boolean
  disabled?: boolean
  onClick?: (position: Position) => void
  sx?: SxProps<Theme>
}
```

### 2. NavigationPad Variants

#### Styles
- **`default`**: Clean arrow icons only
- **`hints`**: Shows WASD/arrow key labels
- **`compact`**: Reduced size, minimal spacing
- **`expanded`**: Larger touch targets with labels

#### Props Interface
```typescript
export type NavigationPadVariant = 'default' | 'hints' | 'compact' | 'expanded'

interface NavigationPadProps {
  variant?: NavigationPadVariant
  showKeyboardHints?: boolean
  size?: 'small' | 'medium' | 'large'
  position?: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'inline'
  disabled?: boolean
  sx?: SxProps<Theme>
}
```

### 3. ActionBar Variants

#### Types
- **`simple`**: Icon-only, minimal width (56px)
- **`rich`**: Icons + labels + metadata
- **`collapsible`**: Can expand/collapse, contains panels

#### Edges
- **`top`**: 56px height, full width
- **`bottom`**: 56px height, full width
- **`left`**: 56px width, full height
- **`right`**: 56px width, full height

#### Props Interface
```typescript
export type ActionBarVariant = 'simple' | 'rich' | 'collapsible'
export type ActionBarEdge = 'top' | 'bottom' | 'left' | 'right'

interface ActionBarProps {
  variant?: ActionBarVariant
  edge: ActionBarEdge
  actions: ActionBarAction[]
  collapsible?: boolean
  defaultExpanded?: boolean
  sx?: SxProps<Theme>
}
```

## Implementation Pattern

### Example: Minimap with Variants

```typescript
// types.ts
export type MinimapVariant = 'grid' | 'dots' | 'blocks'

export interface MinimapProps {
  variant?: MinimapVariant
  // ... other props
}

// useMinimap.tsx - Shared logic
export function useMinimap(props: MinimapProps) {
  const { gridSize, position, navigateTo } = useGridNavigation()
  
  // Shared state and calculations
  const gridArray = useMemo(() => {
    // Build grid representation
  }, [gridSize])
  
  const handleTileClick = useCallback((pos: Position) => {
    if (!props.disabled) {
      navigateTo(pos)
    }
  }, [navigateTo, props.disabled])
  
  return {
    gridArray,
    currentPosition: position,
    handleTileClick,
    // ... other shared logic
  }
}

// Minimap.tsx - Base component
export function Minimap(props: MinimapProps) {
  const { variant = 'grid', ...otherProps } = props
  const minimapState = useMinimap(props)
  
  switch (variant) {
    case 'grid':
      return <MinimapGrid {...otherProps} state={minimapState} />
    case 'dots':
      return <MinimapDots {...otherProps} state={minimapState} />
    case 'blocks':
      return <MinimapBlocks {...otherProps} state={minimapState} />
  }
}

// variants/MinimapGrid.tsx - Variant implementation
export function MinimapGrid({ state, ...props }: MinimapVariantProps) {
  return (
    <Box sx={...}>
      {state.gridArray.map((row, y) =>
        row.map((tile, x) => (
          <MinimapTileGrid
            key={`${x}-${y}`}
            tile={tile}
            isActive={state.currentPosition.x === x && state.currentPosition.y === y}
            onClick={() => state.handleTileClick({ x, y })}
          />
        ))
      )}
    </Box>
  )
}
```

## FullScreenLayout Specification

### Layout: "Symbol Grid" Full-Screen Layout

#### Purpose
Primary layout for immersive, game-like applications with fixed UI chrome and scrollable content.

#### Structure
```
┌─────────────────────────────────────────────────┐
│              TOP ACTION BAR (56px)              │
├──┬───────────────────────────────────────────┬──┤
│L │                                           │R │
│E │                                           │I │
│F │         SCROLLABLE CONTENT AREA           │G │
│T │           (fills remaining)               │H │
│  │                                           │T │
│5 │                                           │  │
│6 │                                           │5 │
│p │                                           │6 │
│x │                                           │p │
│  │                                           │x │
│  ├───────────────────────────────────────────┤  │
│  │   Bottom Zone (adaptive, ~200-300px)     │  │
│  │  ┌────────┐  Chat Input  ┌────────┐     │  │
│  │  │ Target │    (350px)   │ Target │     │  │
│  │  │  Left  │   24px gap   │ Right  │     │  │
│  │  └────────┘              └────────┘     │  │
└──┴───────────────────────────────────────────┴──┘
    Minimap (top-right overlay, ~120x120px)
    Navigation Arrows (overlay, bottom-left)
```

#### Dimensions & Spacing

**Fixed Bars:**
- Top bar: 56px height
- Left bar: 56px width
- Right bar: 56px width
- Bottom bar: Not present (adaptive chat zone instead)

**Content Padding:**
- Top: 56px (action bar height)
- Left: 56px (action bar width)
- Right: 56px (action bar width)
- Bottom: 24px + chat height (adaptive)

**Standard Spacing:**
- Action bar size: 56px
- Bottom gap: 24px
- Standard padding: 16px
- Element gap: 8px

**Chat Zone:**
- Chat input: 350px width, centered
- Targeting panels: ~200px width each
- Panel gap from chat: 16px
- Bottom clearance: 24px

**Overlays:**
- Minimap: 120x120px (medium), top-right with 16px inset
- Navigation arrows: bottom-left with 16px inset

#### CSS Implementation
```css
.fullscreen-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  z-index: 1100;
}

.left-bar {
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 56px;
  z-index: 1100;
}

.right-bar {
  position: fixed;
  top: 56px;
  right: 0;
  bottom: 0;
  width: 56px;
  z-index: 1100;
}

.content-area {
  position: absolute;
  top: 56px;
  left: 56px;
  right: 56px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: calc(24px + var(--chat-zone-height, 200px));
}

.chat-zone {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1050;
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.minimap-overlay {
  position: fixed;
  top: calc(56px + 16px);
  right: calc(56px + 16px);
  z-index: 1200;
}

.navigation-overlay {
  position: fixed;
  bottom: 16px;
  left: calc(56px + 16px);
  z-index: 1200;
}
```

#### Component Requirements

**Must Support:**
- ✓ Content scrolls vertically without cutting off
- ✓ Chat zone stays accessible at bottom (adaptive height)
- ✓ Action bars always visible (fixed positioning)
- ✓ Consistent spacing throughout
- ✓ Clear component layering (z-index management)
- ✓ Responsive to content height changes
- ✓ Overlay components don't block content
- ✓ Keyboard navigation support

**Layout Props:**
```typescript
interface FullScreenLayoutProps {
  // Action bars
  topBar?: ReactNode
  leftBar?: ReactNode
  rightBar?: ReactNode
  
  // Main content
  children: ReactNode
  
  // Bottom zone
  chatInput?: ReactNode
  targetingLeft?: ReactNode
  targetingRight?: ReactNode
  chatZoneHeight?: number
  
  // Overlays
  minimap?: ReactNode
  navigationControls?: ReactNode
  
  // Customization
  actionBarSize?: number
  bottomGap?: number
  backgroundColor?: string
  sx?: SxProps<Theme>
}
```

## Migration Path

### Phase 1: Component Variants (Current)
1. ✅ Create variant types and interfaces
2. Refactor Minimap into variant structure
3. Refactor NavigationPad into variant structure
4. Refactor ActionBars into variant structure

### Phase 2: FullScreenLayout
1. Create FullScreenLayout component
2. Implement spacing system
3. Add to preset configs
4. Test with symbol-grid-like content

### Phase 3: Documentation & Examples
1. Add variant examples to showcase
2. Create Storybook stories
3. Add migration guide for existing layouts
4. Performance testing

## Testing Requirements

### Visual Regression
- Each variant rendered in isolation
- All size combinations
- All color schemes
- Light/dark mode compatibility

### Functional Testing
- Navigation works in all variants
- Click handlers fire correctly
- Keyboard navigation functions
- Responsive behavior on resize

### Performance
- No layout thrashing
- Smooth 60fps animations
- Efficient re-renders on position change
- Memory usage remains constant

## Documentation Standards

### Component Documentation
Each variant component should include:
- Purpose and use cases
- Props interface with examples
- Visual preview/screenshot
- Accessibility notes
- Performance considerations

### Example Usage
```tsx
// Basic usage
<Minimap variant="grid" size="medium" />

// With custom colors
<Minimap 
  variant="blocks"
  colorScheme="custom"
  customColors={{
    active: '#ff0000',
    inactive: '#333333',
    hover: '#ff6666'
  }}
/>

// FullScreenLayout
<FullScreenLayout
  topBar={<TopActionBar actions={topActions} />}
  leftBar={<LeftActionBar variant="rich" actions={leftActions} />}
  rightBar={<RightActionBar variant="simple" actions={rightActions} />}
  chatInput={<ChatInput />}
  targetingLeft={<TargetingPanel type="actor" />}
  targetingRight={<TargetingPanel type="receiver" />}
  minimap={<Minimap variant="grid" size="medium" />}
  navigationControls={<NavigationPad variant="hints" />}
>
  <PageContent />
</FullScreenLayout>
```

## Version

- **Document Version**: 1.0.0
- **Last Updated**: 2026-04-02
- **Status**: In Development
