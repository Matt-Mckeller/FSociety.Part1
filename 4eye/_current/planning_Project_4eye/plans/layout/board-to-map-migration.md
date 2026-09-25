# Board → Map Terminology Migration

**Status**: ✅ Completed  
**Completed**: 2026-04-12
**Priority**: Medium

## Rationale

Rename "Board" to "Map" throughout the codebase:
- **Map** is more intuitive for spatial navigation
- Aligns with gaming concepts (game map, world map)
- Better describes purpose: navigating a space
- "Board" felt too abstract/game-board-like

---

## Scope

### File Renames

| Current Path | New Path |
|--------------|----------|
| `features/overlays/Board.stories.tsx` | `features/overlays/Map.stories.tsx` |
| `features/overlays/types/Board.types.ts` | `features/overlays/types/Map.types.ts` |
| `features/overlays/providers/BoardProvider.tsx` | `features/overlays/providers/MapProvider.tsx` |
| `features/overlays/hooks/useBoard.ts` | `features/overlays/hooks/useMap.ts` |
| `features/overlays/hooks/useBoardTiles.ts` | `features/overlays/hooks/useMapTiles.ts` |
| `features/structure/providers/BoardLayoutProvider/` | `features/structure/providers/MapLayoutProvider/` |

### Symbol Renames

| Current | New |
|---------|-----|
| `BoardProvider` | `MapProvider` |
| `BoardConfig` | `MapConfig` |
| `BoardContextValue` | `MapContextValue` |
| `BoardProviderProps` | `MapProviderProps` |
| `useBoardContext` | `useMapContext` |
| `useBoard` | `useMap` |
| `useBoardTiles` | `useMapTiles` |
| `BoardLayoutProvider` | `MapLayoutProvider` |
| `boardConfig` (variable) | `mapConfig` |
| `layoutType="board"` | `layoutType="map"` |

### Documentation Updates

| File | Changes |
|------|---------|
| `docs/CONCEPTS.md` | Board → Map throughout |
| `docs/planning/plans/hud/hud-iteration-plan.md` | BoardProvider references |
| `docs/planning/plans/hud/hud-implementation-roadmap.md` | Any Board references |
| `docs/planning/plans/layout-package-reorganization.md` | Import examples |

### Exports to Update

| File | Line |
|------|------|
| `features/overlays/index.ts` | All Board exports |
| `features/overlays/providers/index.ts` | BoardProvider export |
| `features/overlays/types/index.ts` | BoardConfig export |
| `features/overlays/hooks/index.ts` | useBoard exports |
| `src/index.ts` | Main package exports |

### Visual Test Snapshots

Will need regeneration after rename:
```
visual-tests/storybook.spec.ts-snapshots/boardchrome-*.png
```
→ Will become `mapchrome-*.png` or stay as-is (depends on story title)

---

## Migration Steps

### Phase 1: Prepare (5 min)
- [ ] Create git branch: `refactor/board-to-map-rename`
- [ ] Ensure all tests pass before starting

### Phase 2: Rename Files (10 min)
```bash
# In packages/@expanse/shell/src/features/overlays/
mv Board.stories.tsx Map.stories.tsx
mv types/Board.types.ts types/Map.types.ts
mv providers/BoardProvider.tsx providers/MapProvider.tsx
mv hooks/useBoard.ts hooks/useMap.ts
mv hooks/useBoardTiles.ts hooks/useMapTiles.ts

# In features/structure/providers/
mv BoardLayoutProvider MapLayoutProvider
mv MapLayoutProvider/BoardLayoutProvider.tsx MapLayoutProvider/MapLayoutProvider.tsx
```

### Phase 3: Find & Replace Symbols (20 min)
Order matters - do longer names first to avoid partial matches:

1. `BoardContextValue` → `MapContextValue`
2. `BoardProviderProps` → `MapProviderProps`
3. `BoardLayoutProvider` → `MapLayoutProvider`
4. `useBoardContext` → `useMapContext`
5. `useBoardTiles` → `useMapTiles`
6. `BoardProvider` → `MapProvider`
7. `BoardConfig` → `MapConfig`
8. `boardConfig` → `mapConfig`
9. `useBoard` → `useMap`
10. `"board"` → `"map"` (in layoutType strings)

**Exclude from rename:**
- `Dashboard` (different concept)
- `Onboarding` (different concept)
- `Blackboard` (external reference)
- `Clipboard` (different concept)

### Phase 4: Update Exports (10 min)
- [ ] `features/overlays/index.ts`
- [ ] `features/overlays/providers/index.ts`
- [ ] `features/overlays/types/index.ts`
- [ ] `features/overlays/hooks/index.ts`
- [ ] `features/structure/providers/index.ts`
- [ ] `src/index.ts`

### Phase 5: Update Documentation (15 min)
- [ ] `docs/CONCEPTS.md` - Multiple references
- [ ] `docs/planning/plans/hud/hud-iteration-plan.md`
- [ ] `docs/planning/plans/layout-package-reorganization.md`
- [ ] Any MDX files referencing Board

### Phase 6: Update Story Titles (5 min)
In `Map.stories.tsx`:
```tsx
// Change title from
title: 'Layout Systems/Spatial Layouts/Board'
// To
title: 'Layout Systems/Spatial Layouts/Map'
```

### Phase 7: Verify & Test (20 min)
- [ ] Run `pnpm typecheck`
- [ ] Run `pnpm test`
- [ ] Run Storybook, verify Map stories work
- [ ] Delete old visual snapshots
- [ ] Generate new snapshots if needed

### Phase 8: Deprecation Aliases (Optional)
If external code uses old names, add re-exports:
```ts
// Deprecated, use MapProvider
/** @deprecated Use MapProvider instead */
export { MapProvider as BoardProvider } from './MapProvider'
```

### Phase 9: Commit & PR
```bash
git add -A
git commit -m "refactor: rename Board to Map throughout @expanse/shell

BREAKING CHANGE: BoardProvider renamed to MapProvider

Migration:
- BoardProvider → MapProvider
- BoardConfig → MapConfig
- useBoard → useMap
- useBoardContext → useMapContext
- useBoardTiles → useMapTiles
- layoutType='board' → layoutType='map'
"
```

---

## Affected Files Checklist

### Source Files
- [ ] `features/overlays/Map.stories.tsx` (renamed)
- [ ] `features/overlays/types/Map.types.ts` (renamed)
- [ ] `features/overlays/types/index.ts`
- [ ] `features/overlays/providers/MapProvider.tsx` (renamed)
- [ ] `features/overlays/providers/index.ts`
- [ ] `features/overlays/hooks/useMap.ts` (renamed)
- [ ] `features/overlays/hooks/useMapTiles.ts` (renamed)
- [ ] `features/overlays/hooks/index.ts`
- [ ] `features/overlays/index.ts`
- [ ] `features/structure/providers/MapLayoutProvider/MapLayoutProvider.tsx` (renamed)
- [ ] `features/structure/providers/MapLayoutProvider/index.ts`
- [ ] `features/structure/providers/index.ts`
- [ ] `src/index.ts`

### Documentation Files
- [ ] `docs/CONCEPTS.md`
- [ ] `docs/planning/plans/hud/hud-iteration-plan.md`
- [ ] `docs/planning/plans/hud/hud-implementation-roadmap.md`
- [ ] `docs/planning/plans/layout-package-reorganization.md`
- [ ] `packages/@expanse/shell/README.md`

### Test Files
- [ ] Any test files importing Board components
- [ ] Visual test snapshot regeneration

---

## Rollback Plan

If issues arise:
```bash
git revert HEAD
# or
git checkout main -- packages/@expanse/shell/
```

---

## Notes

- **Do NOT rename**: `Dashboard`, `Onboarding`, `Blackboard` - these are unrelated
- Consider running this during low-activity time
- Coordinate with any open PRs touching these files
