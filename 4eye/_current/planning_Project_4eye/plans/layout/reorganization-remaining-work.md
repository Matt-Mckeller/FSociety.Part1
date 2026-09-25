# @expanse/shell Reorganization - Remaining Work

**Date**: April 12, 2026  
**Branch**: `refactor/grid-to-mapgrid-rename`  
**Commit**: `bac25c6` - Major reorganization complete

---

## Status Summary

✅ **Completed:**
- Directory structure created (spatial/, core/, hud-components/)
- ~160 files moved to new locations
- ~70 import paths fixed
- Main index.ts reorganized
- Created index.ts files for major directories
- TypeScript errors: 167 → 109 (58 fixed, ~65% complete)

⚠️ **Remaining Work - ~109 TypeScript errors:**

---

## 1. Test Property Errors (~40 errors)

**Issue**: Test files using old props that don't exist in template components

**Files**:
- `__tests__/integration/MinimalLayout.test.tsx` - `autoPages` prop
- `__tests__/integration/responsive.test.tsx` - `autoPages`, `minimapSize` props

**Fix**: These are test-only issues - either update tests to remove these props or add them back to template prop types if they should exist.

---

## 2. Missing Index Files & Import Depth (~30 errors)

**Missing index.ts files:**
- `spatial/minimap/hooks/` - needs index.ts to export hooks
- `spatial/tiles/configurations/` - may need index.ts
- Possibly others

**Import depth issues (minimap → map):**
- `spatial/minimap/components/Minimap.stories.tsx` - uses `'../map'` should be `'../../map'`
- `spatial/minimap/components/MinimapOverlay.tsx` - same issue
- `spatial/minimap/hooks/useMinimap.ts` - same issue

**Fix**: 
```bash
# Create missing index files or fix relative path depths
'../map' → '../../map'  (minimap is one level deeper)
```

---

## 3. Temporary Index Files Need Merging (~8 files)

**Files to merge:**
- `core/providers/structure-index.ts` → merge into `core/providers/index.ts`
- `core/providers/structure-providers-index.ts` → merge into `core/providers/index.ts`
- `spatial/map/types/overlays-types-index.ts` → merge into `spatial/map/types/index.ts`
- `spatial/map/providers/overlays-providers-index.ts` → merge into `spatial/map/providers/index.ts`
- `spatial/map/hooks/overlays-hooks-index.ts` → merge into `spatial/map/hooks/index.ts`
- `spatial/overlays/overlays-main-index.ts` → merge into `spatial/overlays/index.ts`

**Fix**: Read each temp file, merge exports into proper index.ts, delete temp files.

---

## 4. Missing Types & Constants (~15 errors)

**Issues:**
- `core/providers/LayoutConfigProvider/types.ts` - imports `'../../../../templates/types'` (doesn't exist)
- `core/providers/LayoutProvider/LayoutProvider.tsx` - imports `'../../../../types'` (doesn't exist)
- `spatial/overlays/ScreenOverlay*.tsx` - import `'../../../constants'` (doesn't exist)

**Fix**: Create missing files or update imports to correct locations:
- `../../../../types` → check where types really are
- `../../../constants` → may be in `src/constants` or elsewhere

---

## 5. Orbs Duplicate Directory (~8 errors)

**Issue**: `hud-components/orbs/orbs/` duplicate subdirectory with incorrect exports

**Files to fix:**
- `hud-components/orbs/orbs/index.ts` - exports from parent but has wrong members
- `hud-components/orbs/orbs/hooks/index.ts` - similar issue

**Fix**: Either:
1. Delete `orbs/orbs/` subdirectory (if truly duplicate), OR
2. Fix exports in `orbs/orbs/index.ts` to correctly re-export from `orbColors` and `orbPositions`

---

## 6. MapLayoutProvider Import (~2 errors)

**Issue**: `spatial/MapLayoutProvider/MapLayoutProvider.tsx` trying to import `MapGridProvider` from `'../overlays'`

**Fix**: Should import from `'../map/providers'` instead:
```ts
import { MapGridProvider } from '../map/providers';
```

---

## 7. Map Stories Missing Exports (~2 errors)

**Issue**: `spatial/map/Map.stories.tsx` trying to import from `'./hooks'` and `'./components'`

`./hooks` exists but may not export `useMapGrid` and `useMapGridTiles` (they're in subdirectories)
`./components` doesn't exist

**Fix**: 
- Update `spatial/map/hooks/index.ts` to re-export `useMapGrid` and `useMapGridTiles`
- Either create `spatial/map/components/` or update story to import from correct location

---

## 8. Storybook Titles (Not causing TS errors - Phase 2)

**Task**: Update all `.stories.tsx` files to reflect new hierarchy

**Changes needed:**
```tsx
// Before
title: 'Layout Systems/HUD/Orbs'
title: 'Layout Systems/Spatial Layouts/Navigation/Minimap'
title: 'Layout Systems/Standard Layouts/Dashboard'

// After
title: 'Layout Systems/HUD Components/Orbs'
title: 'Layout Systems/Spatial Layouts/Minimap'
title: 'Layout Systems/Original Templates/Dashboard'
```

---

## 9. Documentation Updates (Phase 4)

**Files to update:**
- `templates/README.md` - explain Spatial vs Original paradigms
- `spatial/README.md` - NEW - explain spatial concepts
- `hud-components/README.md` - NEW - document HUD components
- Root `README.md` - update to reflect new structure

---

## Quick Fix Priority

**High Priority** (blocks TypeScript compilation):
1. Fix minimap import depths (`../map` → `../../map`)
2. Merge temporary index files
3. Fix MapLayoutProvider import
4. Create missing `spatial/map/hooks/index.ts` exports
5. Resolve orbs/orbs duplicate

**Medium Priority** (test-only):
1. Fix test prop errors (autoPages, minimapSize)

**Low Priority** (polish):
1. Update Storybook titles
2. Add documentation

---

## Recommended Next Steps

1. Run another subagent pass to fix remaining import errors
2. Merge temporary index files
3. Verify TypeScript: `pnpm exec tsc --noEmit`
4. Run tests: `pnpm test`
5. Update Storybook titles
6. Build Storybook: `pnpm build-storybook`
7. Write documentation
8. Final commit

---

## Success Metrics

- [ ] TypeScript: 0 errors
- [ ] Tests: All passing
- [ ] Storybook: Builds successfully
- [ ] Documentation: Updated
- [ ] Public API: Unchanged (no breaking changes for consumers)
