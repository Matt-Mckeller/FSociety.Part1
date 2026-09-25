---
# No applyTo — this is general context, include manually when needed
---

# High-Level Architecture

## Rules
- @expanse = infrastructure packages (reusable across products)
- @4eye = domain-specific packages (this product only)
- Apps in `apps/`, packages in `packages/`
- Shared types in @4eye/types

## Documentation
- [TECHNOLOGY_STACK.md](docs/technical/TECHNOLOGY_STACK.md)
- [MONOREPO_STRUCTURE.md](docs/technical/MONOREPO_STRUCTURE.md)
- [PACKAGE_ARCHITECTURE.md](docs/technical/PACKAGE_ARCHITECTURE.md)
- [MasterPlan.md](docs/planning/MasterPlan.md)
- [decisions.md](docs/planning/plans/decisions.md)

## Package Overview
| Scope | Purpose | Examples |
|-------|---------|----------|
| @expanse | Infrastructure | auth, theme, layout, i18n, brand-core, ui |
| @4eye | Domain | types, core, features, ai-sdk, graphql-schema |

## Apps
- `4eye-web` — Main Next.js web app
- `4eye-mobile` — React Native mobile app
- `api` — NestJS GraphQL backend
- `expanse-services` — Shared services app
