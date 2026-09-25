# Technical Standards

> **Single source of truth** for 4eye development standards and practices.
>
> **Referenced by:**
> - [Plan.md](4eye-planning/Plan.md) - Project planning and product definition
> - [copilot-instructions.md](copilot-instructions.md) - AI coding assistant configuration

---

## Code Architecture

- **TypeScript strict mode** — Explicit types for all public APIs
- **Logic separate from views** — Business logic in hooks/services, components are presentation only
- **Modular by feature** — Each feature is self-contained (components, hooks, types, tests)
- **Good OO practices** — Composition, inheritance, interfaces as appropriate per situation

## Shared Code (Web + Mobile)

- **@4eye/core** — Domain logic, hooks, GraphQL operations
- **@4eye/types** — All TypeScript interfaces and types
- **@expanse/auth** — Authentication providers, hooks
- **@expanse/ui** — Shared UI components

## State Management

- **React Context** in packages (`@4eye/core`, `@expanse/auth`)
- **Server state** via GraphQL hooks (Apollo)
- **Local component state** for UI-only concerns
- **Persisted preferences** in localStorage, hydrated into Context

## Modularity

- NestJS backend: each module is self-contained (resolvers, services, entities)
- React frontend: each feature is a folder (components, hooks, types)
- Terraform: modular by resource type
- Build for change — types will evolve, extensions are planned

## Typed AI Responses

See [plans/core/typed-ai-responses.md](4eye-planning/plans/core/typed-ai-responses.md) for full details.

- TypeScript interfaces + JSDoc = source of truth (tells AI how to respond)
- Types read at runtime from actual `.ts` files (no regeneration)
- Three parts to every prompt: instructions + type definitions + examples
- Zod validates AI responses at runtime
- Single source of truth: change the type, AI automatically gets updated instructions

## Security & Privacy

- Data privacy considered in every feature design
- Compliance requirements noted in relevant plan files
- No PII in logs or analytics events
- Prompt templates kept private (not exposed to client)

## Secrets Management

- Environment variables for local dev (`.env`)
- Ready for secrets provider (GCP Secret Manager, Vault)
- Secrets accessed via config service abstraction
- Never committed to version control

## Events & Tracking

- Key user actions tracked via analytics system ([X4](4eye-planning/plans/cross-cutting/analytics-events.md))
- Learning-specific metrics for personalization
- Events defined alongside feature requirements

## Reusability

- Prefer composition over inheritance
- Shared components in `@expanse/ui`
- Shared hooks/logic in `@4eye/core`
