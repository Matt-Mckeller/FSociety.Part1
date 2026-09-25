---
# applyTo: "apps/4eye-web/**,apps/expanse-services/**,packages/@expanse/ui/**,packages/@expanse/auth/**,packages/@expanse/shell/**"
---

# Frontend Patterns

## Rules
- Functional components + hooks only
- "use client" for browser APIs/hooks
- Types in @4eye/types (not inline)
- Barrel exports via index.ts
- Colors from theme only (never hardcode)

## Documentation
- [MODULE_ARCHITECTURE.md](docs/technical/MODULE_ARCHITECTURE.md)
- [AUTHENTICATION.md](docs/technical/AUTHENTICATION.md)
- [COMPONENT_VARIANT_SYSTEM.md](docs/technical/COMPONENT_VARIANT_SYSTEM.md)
- [TYPE_ORGANIZATION.md](docs/technical/TYPE_ORGANIZATION.md)
- [TECHNICAL_STANDARDS.md](docs/technical/TECHNICAL_STANDARDS.md)

## Examples
- Providers: `packages/@expanse/auth/src/providers/`
- Layout templates: `packages/@expanse/shell/src/templates/`
- Layout components: `packages/@expanse/shell/src/components/`
- Auth hooks: `packages/@expanse/auth/src/hooks/`
- App setup: `apps/4eye-web/app/providers.tsx`

## Don't
- Class components
- Hardcoded colors
- Inline type definitions
- Cross-feature imports (use GraphQL resolvers instead)
