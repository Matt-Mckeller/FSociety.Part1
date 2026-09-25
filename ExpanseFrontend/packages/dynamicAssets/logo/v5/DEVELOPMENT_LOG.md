# ExpanseLogo V5 Development Log

## Status: ⚠️ Initial Implementation Complete - Needs Review

The initial V5 implementation is complete but the results are not fully satisfactory. This may be revisited later for improvements.

---

## Original Requirements

### Primary Goal

Create a copy of ExpanseLogo V4 and update it to V5 with improved organization, modularity, and configurability while maintaining all existing features.

### Detailed Requirements

#### 1. Component Organization & Modularity

- **Main Shape Component**: A unified shape component with options for:
  - Orbital Rings (its own component with multiple settings/types)
  - Configurable shape types (circle, square, triangle)
- **Secondary Shape**: Another instance of the main shape component (the "moon")
- **Border Arcs Component**: With options for:
  - Adjustable gap angles
  - Number of gaps
  - Shape tracing
  - Potential integration of expanding border concepts from expanding border box

#### 2. Storybook Fixes

- Fix interactive playground - hover interaction not working
- Improve layout and organization
- Keep example previews of different logo states

#### 3. Ring/Shape Positioning

- Adjustable start and end points for rings
- Adjustable angles for smaller shape and main shape positioning

#### 4. Orbital Ring Opacity

- Current max opacity is hard to see
- Need more granular control
- Keep current view as an option

#### 5. New Ring Styles

- "Comet" style rings: curved, simple, softer lines (vs current boxy path elements)

#### 6. 3D Transformations - Halo/Portal

- Transform border rings into halo shape
- Transform border rings into portal shape
- Placement options:
  - Above character's head (halo)
  - Below character's feet (ground portal)
  - In front of character (forward portal)
  - Behind character (backward portal)
  - Above character (ceiling portal)

#### 7. Preset System

- Presets for common configurations
- Variants: Halo, GroundPortal, CeilingPortal, ForwardFacingPortal, BackwardFacingPortal

#### 8. Context & Settings System

- Create context/settings system
- Eventually hook up to backend for controlling default art states

#### 9. 2D/3D Display Variants

- Toggleable 2D and 3D display modes for all components

#### 10. Animation Options

- Halo/portal spin animation
- Other animation capabilities

---

## Questions & Decisions Made

### Q1: Shape Naming Convention

**Question**: Should we call the shapes "Primary" and "Secondary" or "Main" and "Moon"?
**Decision**: Use a single `Shape` component with a `name` prop. The component is used twice by the logo - once as "primary" and once as "secondary". This provides flexibility without hardcoding "moon" terminology.

### Q2: System Naming

**Question**: Should we call the configuration system "Variant System" or "Preset System"?
**Decision**: "Variant System" - More aligned with React/component terminology.

### Q3: Ring Position Units

**Question**: Should ring positions use degrees (0-360) or percentages?
**Decision**: Degrees (0-360) - More intuitive for circular positioning, matches SVG conventions.

### Q4: 3D Transform Approach

**Question**: Should we use CSS 3D transforms or SVG path distortion for the halo/portal effects?
**Decision**: Explore both approaches. Start with CSS 3D transforms (perspective, rotateX, etc.) and also test SVG path-based distortion to see which produces better results.

### Q5: Animation Library

**Question**: CSS animations, requestAnimationFrame, or GSAP?
**Decision**: GSAP - More powerful for complex animations, already in the project.

### Q6: Default V5 Behavior

**Question**: Should V5 default to new features or match V4 exactly?
**Decision**: Match V4 exactly by default for backward compatibility. New features are opt-in via props.

### Q7: Custom Shape Support

**Question**: Should we support custom SVG paths as shapes?
**Decision**: Deferred - Only circle, square, triangle for now. Custom shapes can be added later.

### Q8: CoinIcon Integration

**Question**: Should CoinIcon share the Shape component or remain separate?
**Decision**: Keep CoinIcon entirely separate. The 3D transformation style functionality is different enough that combining them would add unnecessary complexity.

---

## Implementation Summary

### Files Created

```
packages/dynamicAssets/logo/v5/
├── index.ts                          # Barrel exports
├── ExpanseLogoV5.component.tsx      # Main logo component (~450 lines)
├── ExpanseLogoV5.types.ts           # All type definitions
├── ExpanseLogoV5.variants.ts        # Constants, defaults, variant presets
├── ExpanseLogoV5.context.tsx        # Settings context provider
├── components/
│   ├── Shape.tsx                    # Unified shape (circle/square/triangle) with pupil
│   ├── OrbitalRings.tsx             # Ring and DualOrbitalRings components
│   ├── BorderArcs.tsx               # Decorative arc segments (filled/stroke)
│   └── LogoCanvas.tsx               # SVG container with gradient definitions
└── utils/
    └── geometry.ts                  # Geometry utilities
```

### Storybook Story Created

```
apps/storybook/src/stories/Branding/Logo/ExpanseLogoV5.stories.tsx
```

### Features Implemented

- ✅ Modular component architecture (Shape, OrbitalRings, BorderArcs, LogoCanvas)
- ✅ Unified Shape component with circle/square/triangle support
- ✅ Orbital rings with opacity scale multiplier (`orbitalOpacityScale`)
- ✅ Variant system with presets (default, minimal, saturn, eye, interactive, etc.)
- ✅ Context provider for settings
- ✅ 2D/3D toggle (`is3D` prop)
- ✅ Eye/pupil mode with direction control
- ✅ Horizontal mirroring
- ✅ Border arcs with filled and stroke styles
- ✅ Interactive playground in Storybook

### Features NOT Implemented (Future Work)

- ❌ Comet-style rings (softer, curved lines)
- ❌ Halo/Portal 3D transformations
- ❌ Portal placement variants (ground, ceiling, forward, backward)
- ❌ GSAP animation integration (hooks created but not wired up)
- ❌ Backend settings integration
- ❌ Adjustable ring start/end angles
- ❌ Custom shape support

---

## V4 Playground Fix

During this work, we also fixed the V4 interactive playground:

**Problem**: Hover effects weren't working in the playground
**Cause**: `DEFAULT_STATE.interactive` was set to `false`
**Fix**: Changed to `true` in `ExpanseLogoV4.stories.tsx`

---

## Key Architectural Decisions

### 1. Component Composition Pattern

The main `ExpanseLogoV5` component composes sub-components rather than rendering inline SVG. This allows:

- Individual component testing
- Reuse of sub-components
- Cleaner separation of concerns

### 2. Props vs Context

- **Props**: Used for per-instance configuration
- **Context**: Reserved for global/default settings that apply across multiple instances

### 3. Backward Compatibility

V5 defaults match V4 behavior. The main index exports both:

```typescript
export { ExpanseLogoV5 } from "./v5"
export { ExpanseLogoV4 } from "./ExpanseLogoV4.component"
```

### 4. Geometry Utilities

Shared geometry functions moved to `utils/geometry.ts`:

- `positionFromAngle`
- `lightAngleToGradientPosition`
- `generateArcPath`
- `generateStrokeArcPath`
- `calculateTrianglePoints`
- `generateRoundedTrianglePath`
- `generateRoundedSquarePath`

---

## Known Issues / Areas for Improvement

1. **Visual parity with V4** - Not fully verified; may have subtle differences
2. **3D mode gradients** - Simplified compared to V4's more nuanced gradients
3. **Animation hooks** - Planned but not implemented
4. **Halo/Portal effects** - Major feature not yet implemented
5. **Testing** - No unit tests written

---

## Next Steps (If Revisiting)

1. Visual comparison testing between V4 and V5
2. Implement comet-style ring variant
3. Implement CSS 3D transforms for halo/portal effects
4. Add GSAP animation hooks
5. Create more comprehensive Storybook stories
6. Consider whether the modular approach is worth the added complexity

---

## Related Files

- V4 Component: `/packages/dynamicAssets/logo/ExpanseLogoV4.component.tsx`
- V4 Stories: `/apps/storybook/src/stories/Branding/Logo/ExpanseLogoV4.stories.tsx`
- V5 Stories: `/apps/storybook/src/stories/Branding/Logo/ExpanseLogoV5.stories.tsx`
- Architecture Plan: `/docs/planning/ExpanseLogoV5-Architecture-Plan.md`
