# Layout Package Planning

Feature planning and implementation tracking for @expanse/shell.

## Documents

| Document | Purpose |
|----------|---------|
| [hud-summary.md](./hud-summary.md) | **What to build** - Features, components, specs |
| [hud-plan.md](./hud-plan.md) | Architecture details, layer system, code examples |
| [hud-roadmap.md](./hud-roadmap.md) | **Execution order** - Phases, dependencies, validation |
| [hud-tasks.md](./hud-tasks.md) | Individual tasks with status tracking (older format) |

## Feature Specs

Detailed specifications for individual features:

| Feature | Status | Spec | Notes |
|---------|--------|------|-------|
| Types & Architecture | ✅ Done | [types-architecture.md](./features/types-architecture.md) | Phase 0 complete |
| Context System | ✅ Done | [context-system.md](./features/context-system.md) | Phase 1 complete |
| Layout Toggle | 🔴 TODO | [layout-toggle.md](./features/layout-toggle.md) | Switch Basic Web ↔ Spatial |
| Domain Switching | 🔴 TODO | [domain-switching.md](./features/domain-switching.md) | Learning/Work/Life/Religion |
| Expandable Orbs | 🔴 TODO | [expandable-orbs.md](./features/expandable-orbs.md) | Orbs with sub-actions |

## Implementation Status

| Phase | Name | Status | Location |
|-------|------|--------|----------|
| 0 | Types & Architecture | ✅ Complete | `src/hud-complete/types/`, `presets/`, `config/` |
| 1 | Context Foundation | ✅ Complete | `src/hud-complete/context/`, `components/HudShell` |
| 2 | Interactive Header | 🔴 Not started | `src/hud-complete/components/header/` |
| 3 | Orb Integration | 🔴 Not started | `src/hud-complete/components/` |
| 4 | Content Layouts | 🔴 Not started | `src/hud-complete/components/` |
| 5 | Status System | 🔴 Not started | `src/hud-complete/components/` |
| 6 | Presets & Stories | 🔴 Not started | `src/hud-complete/stories/` |
| 7-10 | Post-MVP | 🔴 Not started | AI, Navigation, Celebrations, Social |

> **MVP**: Phase 6 complete = 6 presets working in Storybook

## Related Documentation

- [Architecture](../architecture/README.md) - System design
- [Reference](../reference/DICTIONARY.md) - Terminology, navigation docs
