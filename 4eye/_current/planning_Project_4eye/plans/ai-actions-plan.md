# AI Actions System Plan

## Philosophy

**Core Principle**: Actions are *routing instructions*, not *encyclopedias*.

Each action should:
- Be concise (under 50 lines)
- Point to authoritative documentation sources
- Tell the AI *what to read* and *when*
- Never duplicate content that lives in docs

**Why this works:**
1. **Single source of truth** — Update docs, not 10 action files
2. **Context efficiency** — AI loads only relevant docs per task
3. **Maintainability** — Actions stay simple, docs stay detailed
4. **Discoverability** — Actions act as a curated index

---

## Proposed Structure

```
.vscode/
├── instructions/
│   ├── frontend-patterns.instructions.md
│   ├── backend-patterns.instructions.md
│   ├── high-level-architecture.instructions.md
│   ├── theme-usage.instructions.md
│   ├── file-organization.instructions.md
│   ├── storybook.instructions.md
│   └── design/
│       ├── design-system.instructions.md      # Core design system rules
│       └── examples/
│           ├── spatial-layout.instructions.md  # Grid, navigation, panels
│           ├── brand-visuals.instructions.md   # Icons, shapes, animations
│           ├── action-bar.instructions.md      # Toolbars, quick actions
│           ├── chat-ui.instructions.md         # Messaging, conversation
│           ├── data-viz.instructions.md        # Charts, graphs, metrics
│           └── cloud-3layer.instructions.md    # Expanding borders, layered effects
```

**Design Examples System**: Rather than one monolithic design-examples file, examples are categorized by visual pattern type. Each can reference different code examples and have different style rules.

---

## Action Definitions

### 1. Frontend Patterns (`frontend-patterns.instructions.md`)

**Purpose**: Guide AI on React/Next.js patterns specific to this codebase.

**Scope (applyTo)**: `apps/4eye-web/**`, `apps/expanse-services/**`, `packages/@expanse/ui/**`

**References**:
| Topic | Documentation |
|-------|---------------|
| Component architecture | [docs/technical/MODULE_ARCHITECTURE.md#frontend-architecture](../technical/MODULE_ARCHITECTURE.md) |
| State management | [docs/technical/TECHNICAL_STANDARDS.md#state-management](../technical/TECHNICAL_STANDARDS.md) |
| Auth patterns | [docs/technical/AUTHENTICATION.md](../technical/AUTHENTICATION.md) |
| Next.js App Router | [docs/technical/TECHNICAL_STANDARDS.md#nextjs-patterns](../technical/TECHNICAL_STANDARDS.md) |
| Type patterns | [docs/technical/TYPE_ORGANIZATION.md](../technical/TYPE_ORGANIZATION.md) |
| Component variants | [docs/technical/COMPONENT_VARIANT_SYSTEM.md](../technical/COMPONENT_VARIANT_SYSTEM.md) |
| Layout system | [packages/@expanse/shell/](../../packages/@expanse/shell/) |
| Auth system | [packages/@expanse/auth/](../../packages/@expanse/auth/) |

**Example code to reference**:
- `apps/4eye-web/app/providers.tsx` — Provider composition
- `apps/4eye-web/app/(auth)/login/page.tsx` — Auth page patterns
- `packages/@expanse/auth/src/providers/` — Auth provider patterns
- `packages/@expanse/shell/src/templates/` — Layout templates
- `packages/@expanse/shell/src/components/` — Layout components
- `packages/@expanse/auth/src/hooks/` — Auth hooks

**Key behaviors to instruct**:
- Use functional components with hooks
- Prefer composition over inheritance
- Use `"use client"` directive when needed
- Follow barrel export patterns
- Check provider hierarchy before adding new contexts

---

### 2. Backend Patterns (`backend-patterns.instructions.md`)

**Purpose**: Guide AI on NestJS/GraphQL patterns.

**Scope (applyTo)**: `apps/api/**`

**References**:
| Topic | Documentation |
|-------|---------------|
| Module structure | [docs/technical/MODULE_ARCHITECTURE.md#backend-architecture](../technical/MODULE_ARCHITECTURE.md) |
| GraphQL approach | [docs/technical/GRAPHQL_CODE_FIRST.md](../technical/GRAPHQL_CODE_FIRST.md) |
| Auth implementation | [docs/technical/AUTHENTICATION.md#backend](../technical/AUTHENTICATION.md) |
| Technical standards | [docs/technical/TECHNICAL_STANDARDS.md#backend](../technical/TECHNICAL_STANDARDS.md) |

**Example code to reference**:
- `apps/api/src/modules/auth/` — Auth module structure
- `apps/api/src/modules/users/users.resolver.ts` — Resolver patterns
- `apps/api/src/modules/users/users.service.ts` — Service patterns
- `apps/api/src/common/guards/` — Guard implementations

**Key behaviors to instruct**:
- Self-contained modules (no cross-module imports except via GraphQL)
- Code-first GraphQL with TypeScript decorators
- DTOs for input validation
- Guards for authorization
- Services for business logic

---

### 3. High-Level Architecture (`high-level-architecture.instructions.md`)

**Purpose**: Big-picture context for cross-cutting decisions.

**Scope (applyTo)**: `**/*` (global)

**References**:
| Topic | Documentation |
|-------|---------------|
| Tech stack | [docs/technical/TECHNOLOGY_STACK.md](../technical/TECHNOLOGY_STACK.md) |
| Monorepo structure | [docs/technical/MONOREPO_STRUCTURE.md](../technical/MONOREPO_STRUCTURE.md) |
| Package architecture | [docs/technical/PACKAGE_ARCHITECTURE.md](../technical/PACKAGE_ARCHITECTURE.md) |
| Overall plan | [docs/planning/MasterPlan.md](../planning/MasterPlan.md) |
| Key decisions | [docs/planning/plans/decisions.md](../planning/plans/decisions.md) |

**Key behaviors to instruct**:
- Understand @expanse vs @4eye package distinction
- Know when to create new packages vs add to existing
- Understand multi-app architecture
- Know about shared infrastructure patterns

---

### 4. Theme Usage (`theme-usage.instructions.md`)

**Purpose**: Guide AI on the multi-theme system.

**Scope (applyTo)**: `packages/@expanse/theme/**`, `**/theme/**`, `**/*.stories.tsx`

**References**:
| Topic | Documentation |
|-------|---------------|
| Theme system overview | [docs/technical/MUI_THEME_SYSTEM.md](../technical/MUI_THEME_SYSTEM.md) |
| Component variants | [docs/technical/COMPONENT_VARIANT_SYSTEM.md](../technical/COMPONENT_VARIANT_SYSTEM.md) |

**Example code to reference**:
- `packages/@expanse/theme/src/configs/` — Theme configuration files
- `packages/@expanse/theme/src/hooks/` — Theme hooks (useTheme, useThemeMode)
- `packages/@expanse/brand-core/src/display/icons/ExperienceIcon.tsx` — Component using theme variants

**Key behaviors to instruct**:
- Always use theme tokens, never hardcode colors
- Understand variant system for components
- Know the theme color palette options
- Use MUI's `sx` prop or `styled()` utility
- Reference theme via `useTheme()` hook

---

### 5. File Organization (`file-organization.instructions.md`)

**Purpose**: Guide AI on where to create/move files.

**Scope (applyTo)**: `**/*` (global)

**References**:
| Topic | Documentation |
|-------|---------------|
| Monorepo structure | [docs/technical/MONOREPO_STRUCTURE.md](../technical/MONOREPO_STRUCTURE.md) |
| Package architecture | [docs/technical/PACKAGE_ARCHITECTURE.md](../technical/PACKAGE_ARCHITECTURE.md) |
| Package README template | [docs/templates/PACKAGE_README_TEMPLATE.md](../templates/PACKAGE_README_TEMPLATE.md) |
| Layout package structure | [packages/@expanse/shell/](../../packages/@expanse/shell/) |
| Auth package structure | [packages/@expanse/auth/](../../packages/@expanse/auth/) |

**Key behaviors to instruct**:
- Apps in `apps/`, packages in `packages/`
- @expanse = infrastructure, @4eye = domain-specific
- Barrel exports in `index.ts`
- Co-locate tests with source (`__tests__/` or `.test.ts`)
- Feature-based organization within apps
- Reference @expanse/shell and @expanse/auth as canonical package structures

---

### 6. Storybook (`storybook.instructions.md`)

**Purpose**: Guide AI on writing stories.

**Scope (applyTo)**: `**/*.stories.tsx`, `**/*.stories.mdx`, `**/.storybook/**`

**References**:
| Topic | Location |
|-------|----------|
| Storybook config | `packages/@expanse/shell/.storybook/` |
| Example stories | `packages/@expanse/shell/src/**/*.stories.tsx` |
| User preferences | User memory: "Storybook Preferences" |

**Key behaviors to instruct**:
- White background default (per user preference)
- Use ThemeProvider with toolbar controls
- Include a11y addon testing
- Write args-based stories
- Document component props

---

### 7. Design System (`design/design-system.instructions.md`)

**Purpose**: Core design system rules that apply to all visual work.

**Scope (applyTo)**: `packages/@expanse/brand-core/**`, `packages/@expanse/ui/**`, `packages/@expanse/theme/**`, `**/*.css`

**References**:
| Topic | Location |
|-------|----------|
| Brand guidelines | User memory: "4ear Brand Guidelines" |
| Theme system | [docs/technical/MUI_THEME_SYSTEM.md](../technical/MUI_THEME_SYSTEM.md) |
| Theme code | `packages/@expanse/theme/src/` |
| Brand primitives | `packages/@expanse/brand-core/src/` |
| Component variants | [docs/technical/COMPONENT_VARIANT_SYSTEM.md](../technical/COMPONENT_VARIANT_SYSTEM.md) |

**Key behaviors to instruct**:
- Use brand themes (improve, innovate, win, heal, protect)
- Prefer semantic color tokens from theme
- Follow spacing scale
- Support light/dark modes
- Read existing implementations before creating new ones

---

### 8. Design Examples (Categorized System)

**Purpose**: Pattern-specific guidance for different visual styles.

**Structure**: `design/examples/{category}.instructions.md`

#### Categories:

| Category | Description | Key Examples |
|----------|-------------|-------------|
| `spatial-layout` | Grid navigation, panels, templates | `@expanse/shell/src/templates/`, `GridNavigation/` |
| `brand-visuals` | Icons, shapes, SVG, Lottie | `@expanse/brand-core/src/display/icons/`, `primitives/`, `composites/` |
| `action-bar` | Toolbars, quick actions, command palettes | TBD |
| `chat-ui` | Messaging, conversation, bubbles | TBD |
| `data-viz` | Charts, graphs, metrics, dashboards | TBD |
| `cloud-3layer` | Expanding borders, layered effects, 3-line dash | `@expanse/brand-core/src/composites/` |

**Why categorize?**
- Different patterns have different rules
- Easy to add new categories as styles emerge
- AI can reference specific category for targeted guidance
- Keeps each file focused and scannable

---

## Documentation Gaps to Fill

Before implementing actions, these docs need to be created or expanded:

### Missing Documentation
| Doc | Needed For | Priority |
|-----|------------|----------|
| `FRONTEND_PATTERNS.md` | frontend-patterns action | High |
| `DESIGN_SYSTEM.md` | design-styles action | Medium |
| `STORYBOOK_GUIDE.md` | storybook action | Medium |

### Docs Needing Expansion
| Doc | Section Needed | Priority |
|-----|----------------|----------|
| `TECHNICAL_STANDARDS.md` | Next.js App Router patterns section | High |
| `MODULE_ARCHITECTURE.md` | Add more frontend pattern details | Medium |
| `AUTHENTICATION.md` | Add frontend hook usage examples | Medium |

---

## Implementation Order

### Phase 1: Foundation (Do First)
1. ✅ Create documentation folder structure
2. Fill documentation gaps (FRONTEND_PATTERNS.md)
3. Create `high-level-architecture.instructions.md` (most general)
4. Create `file-organization.instructions.md` (foundational)

### Phase 2: Core Development
5. Create `frontend-patterns.instructions.md`
6. Create `backend-patterns.instructions.md`
7. Create `theme-usage.instructions.md`

### Phase 3: Design & Quality
8. Create `storybook.instructions.md`
9. Create `design-styles.instructions.md`
10. Create `design-examples.instructions.md`

---

## Action Template

Each action file follows this structure:

```markdown
---
applyTo: "glob/pattern/**"
---

# [Topic] Instructions

When working on [topic], read these documentation files:

## Core References
- [Doc 1 Title](relative/path/to/doc1.md) — Brief description
- [Doc 2 Title](relative/path/to/doc2.md#specific-section) — Brief description

## Example Code
Look at these files for patterns:
- `path/to/example1.ts` — What it demonstrates
- `path/to/example2.ts` — What it demonstrates

## Quick Rules
1. Rule 1 (brief)
2. Rule 2 (brief)
3. Rule 3 (brief)

## Anti-patterns
- Don't do X (brief reason)
- Don't do Y (brief reason)
```

---

## Questions to Decide

1. **Location**: `.github/copilot/instructions/` vs `.vscode/`?
   - `.github/` = shared with team, versioned
   - `.vscode/` = personal preferences

2. **Granularity**: Single `frontend-patterns` or split into `react-patterns`, `nextjs-patterns`, `auth-patterns`?
   - Recommend: Start broad, split if files get too long

3. **Cross-repo**: Copy actions to ExpanseFrontend or keep only in 4eye?
   - Recommend: Keep in 4eye, add symlinks or reference from ExpanseFrontend

4. **Documentation updates**: Create missing docs first, or create skeleton actions that reference future docs?
   - Recommend: Create minimal docs first, then actions

---

## Success Criteria

- [ ] Each action is under 50 lines
- [ ] No duplicated content between actions and docs
- [ ] Actions are scoped with `applyTo` patterns
- [ ] Example code references are validated (files exist)
- [ ] Documentation links are validated (sections exist)
- [ ] AI can successfully use actions to find relevant patterns

---

## Next Steps

1. **Review this plan** — Any missing categories? Different organization?
2. **Decide questions above** — Location, granularity, cross-repo strategy
3. **Audit existing docs** — What needs updating before actions reference them?
4. **Create Phase 1 actions** — Start with foundation, validate approach
5. **Iterate** — Refine based on usage
