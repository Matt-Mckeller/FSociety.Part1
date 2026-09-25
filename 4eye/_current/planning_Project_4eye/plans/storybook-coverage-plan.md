# Storybook Coverage Expansion Plan

## Current Coverage
- ActionBar ✅
- BoardChrome ✅
- FloatingToolbar ✅
- Minimap ✅
- NavigationPad ✅
- Tile ✅
- Primitives (partial) ✅
- Theme Controls ✅
- All 7 Templates ✅

## Missing Stories to Add

### 1. Accessibility Components
| Component | Priority | Description |
|-----------|----------|-------------|
| SkipLinks | High | Keyboard skip navigation |
| LiveAnnouncer | Medium | ARIA live region for screen readers |

### 2. Board Chrome Variants
| Component | Priority | Description |
|-----------|----------|-------------|
| BoardChromeGrid | Medium | CSS Grid layout variant |
| BoardChromeSvg | Medium | SVG decorations variant |

### 3. Additional Primitives
| Component | Priority | Description |
|-----------|----------|-------------|
| BackdropContainer | Medium | Full-screen overlay backdrop |
| PageShell | Medium | Page wrapper with responsive padding |
| StretchLayout | Medium | Full-height flex layout |
| Snackbar | Low | Toast notifications (needs LayoutProvider) |

### 4. Skeletons
| Component | Priority | Description |
|-----------|----------|-------------|
| LayoutSkeleton | High | Foundation skeleton with bars/overlays |
| ChatSkeleton | Medium | Chat interface skeleton |
| FullbleedSkeleton | Medium | Edge-to-edge content skeleton |

### 5. Utilities
| Component | Priority | Description |
|-----------|----------|-------------|
| TypographyResponsive | Medium | Auto-sizing responsive text |

### 6. Views (Settings Pages)
| Component | Priority | Description |
|-----------|----------|-------------|
| SettingsPage | High | Reusable settings page layout |
| LayoutConfigurationPage | Medium | Full layout configuration UI |

### 7. Floating Controls (Expand)
| Component | Priority | Description |
|-----------|----------|-------------|
| LayoutTypeSwitcher | Medium | Layout type toggle buttons |
| MinimapToggle | Medium | Minimap show/hide toggle |
| SettingsButton | Medium | Settings icon button |

### 8. Tiles (Expand)
| Component | Priority | Description |
|-----------|----------|-------------|
| TileGrid | Medium | Grid layout of tiles |
| TileSkeleton | Low | Tile loading skeleton |

## Story Organization

```
src/
├── components/
│   └── Accessibility.stories.tsx     # SkipLinks, LiveAnnouncer
├── features/
│   ├── board/components/
│   │   └── BoardChromeVariants.stories.tsx  # Grid, SVG
│   ├── floating-controls/components/
│   │   └── FloatingControls.stories.tsx  # Individual controls
│   └── tiles/components/
│       └── TileGrid.stories.tsx
├── primitives/
│   └── Primitives.stories.tsx (extend)
├── skeletons/
│   └── Skeletons.stories.tsx
├── features/utility/
│   └── TypographyResponsive.stories.tsx
└── views/
    └── Views.stories.tsx
```

## Implementation Order
1. Extend Primitives.stories.tsx with missing primitives
2. Create Accessibility.stories.tsx
3. Create BoardChromeVariants.stories.tsx
4. Create Skeletons.stories.tsx
5. Create FloatingControls.stories.tsx
6. Create Views.stories.tsx
7. Create TypographyResponsive.stories.tsx
8. Extend TileGrid stories
