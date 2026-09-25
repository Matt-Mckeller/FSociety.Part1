# AI Action Template Options

Pick your preferred style. These are examples using `frontend-patterns` as the subject.

---

## Option A: Minimal Reference List

Ultra-concise. Just links and brief context.

```markdown
---
applyTo: "apps/4eye-web/**,packages/@expanse/ui/**,packages/@expanse/auth/**,packages/@expanse/shell/**"
---

# Frontend Patterns

## Read First
- [MODULE_ARCHITECTURE.md](docs/technical/MODULE_ARCHITECTURE.md) — component/state patterns
- [AUTHENTICATION.md](docs/technical/AUTHENTICATION.md) — auth flow
- [COMPONENT_VARIANT_SYSTEM.md](docs/technical/COMPONENT_VARIANT_SYSTEM.md) — MUI variants

## Example Code
- `packages/@expanse/auth/src/providers/` — provider composition
- `packages/@expanse/shell/src/templates/` — layout patterns
- `apps/4eye-web/app/providers.tsx` — app-level providers

## Quick Rules
- Functional components + hooks only
- "use client" when using browser APIs or hooks
- Barrel exports in index.ts
- Types in @4eye/types, not inline
```

**Pros**: Fast to scan, minimal noise  
**Cons**: No context on *why* or *when*

---

## Option B: Structured Sections

Organized with clear headings. Slightly more guidance.

```markdown
---
applyTo: "apps/4eye-web/**,packages/@expanse/ui/**,packages/@expanse/auth/**,packages/@expanse/shell/**"
---

# Frontend Patterns

When building React/Next.js components in this codebase, follow these patterns.

## Documentation
| Topic | Reference |
|-------|-----------|
| Component architecture | [MODULE_ARCHITECTURE.md](docs/technical/MODULE_ARCHITECTURE.md) |
| Auth system | [AUTHENTICATION.md](docs/technical/AUTHENTICATION.md) |
| Component variants | [COMPONENT_VARIANT_SYSTEM.md](docs/technical/COMPONENT_VARIANT_SYSTEM.md) |
| Type organization | [TYPE_ORGANIZATION.md](docs/technical/TYPE_ORGANIZATION.md) |

## Reference Implementations
| Pattern | Location |
|---------|----------|
| Provider composition | `packages/@expanse/auth/src/providers/` |
| Layout templates | `packages/@expanse/shell/src/templates/` |
| Auth hooks | `packages/@expanse/auth/src/hooks/` |
| App providers | `apps/4eye-web/app/providers.tsx` |

## Do
- Use functional components with hooks
- Add "use client" for client-side code
- Follow barrel export pattern (index.ts)
- Centralize types in @4eye/types

## Don't
- Create class components
- Hardcode colors (use theme)
- Import across feature boundaries
- Define types inline in components
```

**Pros**: Clear structure, easy to add/remove sections  
**Cons**: More verbose, tables may feel heavy

---

## Option C: Narrative + Links

More conversational, embeds reasoning.

```markdown
---
applyTo: "apps/4eye-web/**,packages/@expanse/ui/**,packages/@expanse/auth/**,packages/@expanse/shell/**"
---

# Frontend Patterns

For React/Next.js work, read [MODULE_ARCHITECTURE.md](docs/technical/MODULE_ARCHITECTURE.md) first — it covers component structure, state management, and our provider hierarchy.

## Auth
Auth uses a two-layer system. See [AUTHENTICATION.md](docs/technical/AUTHENTICATION.md).  
Example: `packages/@expanse/auth/src/providers/`

## Layout
We have reusable layout templates (Dashboard, Documentation, Panel, etc.).  
Example: `packages/@expanse/shell/src/templates/`

## Component Variants
MUI-style variant system — see [COMPONENT_VARIANT_SYSTEM.md](docs/technical/COMPONENT_VARIANT_SYSTEM.md).  
Example: `ExperienceIcon.tsx` shows theme-aware variants.

## Rules
1. Functional components only
2. "use client" when needed
3. Types in @4eye/types
4. Barrel exports in index.ts
```

**Pros**: More context, reads naturally  
**Cons**: Harder to scan quickly

---

## Option D: Checklist Style

Action-oriented, works well for "before you code" mindset.

```markdown
---
applyTo: "apps/4eye-web/**,packages/@expanse/ui/**,packages/@expanse/auth/**,packages/@expanse/shell/**"
---

# Frontend Patterns Checklist

Before writing React/Next.js code:

## [ ] Read the docs
- [ ] [MODULE_ARCHITECTURE.md](docs/technical/MODULE_ARCHITECTURE.md) — structure
- [ ] [AUTHENTICATION.md](docs/technical/AUTHENTICATION.md) — if touching auth
- [ ] [COMPONENT_VARIANT_SYSTEM.md](docs/technical/COMPONENT_VARIANT_SYSTEM.md) — if adding variants

## [ ] Check existing patterns
- [ ] Look at `packages/@expanse/auth/src/providers/` for provider patterns
- [ ] Look at `packages/@expanse/shell/src/templates/` for layout patterns
- [ ] Look at `apps/4eye-web/app/providers.tsx` for app composition

## [ ] Follow conventions
- [ ] Functional component with hooks
- [ ] "use client" if using browser APIs
- [ ] Types in @4eye/types, not inline
- [ ] Export via index.ts barrel

## [ ] Avoid
- [ ] Class components
- [ ] Hardcoded colors
- [ ] Cross-feature imports
```

**Pros**: Very actionable, good for complex tasks  
**Cons**: Checkbox format may not render in all contexts

---

## Option E: Tiered (Quick → Deep)

Two levels: fast reference + deep dive.

```markdown
---
applyTo: "apps/4eye-web/**,packages/@expanse/ui/**,packages/@expanse/auth/**,packages/@expanse/shell/**"
---

# Frontend Patterns

## Quick Reference
- Components: functional + hooks, "use client" when needed
- Types: centralized in @4eye/types
- Exports: barrel pattern (index.ts)
- Colors: always from theme, never hardcoded

## Deep Dive
For full context, read these in order:

1. **Architecture**: [MODULE_ARCHITECTURE.md](docs/technical/MODULE_ARCHITECTURE.md)
2. **Auth**: [AUTHENTICATION.md](docs/technical/AUTHENTICATION.md) + `@expanse/auth/src/`
3. **Layout**: `@expanse/shell/src/templates/` and `components/`
4. **Variants**: [COMPONENT_VARIANT_SYSTEM.md](docs/technical/COMPONENT_VARIANT_SYSTEM.md)
5. **Types**: [TYPE_ORGANIZATION.md](docs/technical/TYPE_ORGANIZATION.md)
```

**Pros**: Quick access for simple tasks, depth when needed  
**Cons**: Requires knowing which tier to use

---

## Option F: Hybrid (Recommended)

Combines best of A, B, and E. Quick rules up front, references below, examples inline.

```markdown
---
applyTo: "apps/4eye-web/**,packages/@expanse/ui/**,packages/@expanse/auth/**,packages/@expanse/shell/**"
---

# Frontend Patterns

## Rules
- Functional components + hooks
- "use client" for browser APIs/hooks
- Types in @4eye/types
- Barrel exports (index.ts)
- Colors from theme only

## Documentation
- [MODULE_ARCHITECTURE.md](docs/technical/MODULE_ARCHITECTURE.md)
- [AUTHENTICATION.md](docs/technical/AUTHENTICATION.md)
- [COMPONENT_VARIANT_SYSTEM.md](docs/technical/COMPONENT_VARIANT_SYSTEM.md)
- [TYPE_ORGANIZATION.md](docs/technical/TYPE_ORGANIZATION.md)

## Examples
- Providers: `@expanse/auth/src/providers/`
- Layout: `@expanse/shell/src/templates/`
- Hooks: `@expanse/auth/src/hooks/`
- App setup: `apps/4eye-web/app/providers.tsx`

## Don't
- Class components
- Hardcoded colors
- Inline type definitions
- Cross-feature imports
```

**Pros**: Scannable, balanced, easy to maintain  
**Cons**: None significant

---

## My Recommendation

**Option F (Hybrid)** or **Option A (Minimal)** depending on your preference:

- **F** if you want slightly more guidance baked in
- **A** if you want maximum brevity and trust docs to do the heavy lifting

The key insight: rules at top (most used), references in middle, anti-patterns at bottom (least used but important).

---

## Decision Points

1. **Tables vs Lists?**
   - Tables: better for many items with metadata
   - Lists: simpler, faster to edit

2. **Do/Don't vs Rules/Examples?**
   - Do/Don't: clearer for behavioral guidance
   - Rules/Examples: more technical focus

3. **Path format?**
   - Relative: `docs/technical/FILE.md`
   - Full: `/Users/mm/Projects/4eye/docs/technical/FILE.md`
   - Short: `@expanse/auth/src/providers/` (package shorthand)

Which style resonates with you? Or want me to create a custom hybrid?
