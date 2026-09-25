# Repository Structure

Current directory structure and naming conventions for the 4eye monorepo.

---

## Directory Structure

```
4eye/
├── apps/                    # Applications
│   ├── 4eye-web/           # Next.js web app
│   ├── 4eye-mobile/        # React Native/Expo mobile app
│   └── api/                # NestJS API server
│
├── packages/                # Shared packages (dual scope)
│   ├── @4eye/              # 4eye product-specific packages
│   │   ├── core/           # Domain logic (rooms, sessions, organizations)
│   │   ├── types/          # TypeScript types & interfaces
│   │   ├── features/       # Feature-specific logic (summaries, quizzes)
│   │   ├── ai-sdk/         # AI provider integrations
│   │   └── graphql-schema/ # GraphQL schema generation
│   │
│   └── @expanse/           # Platform-agnostic, reusable packages
│       ├── auth/           # Authentication (AuthProvider, hooks)
│       ├── theme/          # Theming system
│       ├── layout/         # Layout components
│       ├── ui/             # Shared UI components
│       ├── user/           # User preferences, profiles
│       ├── analytics/      # Event tracking
│       ├── application/    # App-level utilities
│       └── utils/          # Utility functions
│
├── docs/                    # Documentation
│   ├── planning/           # All planning documents
│   │   ├── Plan.md, MasterPlan.md, ExpandedPlan.md
│   │   └── plans/          # Detailed feature/module plans
│   ├── technical/          # Technical references & standards
│   ├── workflows/          # Development procedures
│   │   └── details/        # Detailed workflow documentation
│   ├── summaries/          # AI implementation summaries
│   └── archive/            # Historical/research docs
│
├── infrastructure-as-code/  # Terraform, GCP infrastructure
│   ├── bootstrap/
│   ├── environments/       # dev, staging, production
│   └── modules/            # Reusable Terraform modules
│
├── scripts/                 # Build & utility scripts
├── .github/                # GitHub Actions, copilot-instructions.md
├── tsconfig.base.json      # Shared TypeScript configuration
└── package.json            # npm workspaces root
```

---

## Naming Conventions

### Directories
- **Applications**: `4eye-[name]` (e.g., `4eye-web`, `4eye-mobile`)
- **Product packages**: `@4eye/[name]` (e.g., `@4eye/core`)
- **Platform packages**: `@expanse/[name]` (e.g., `@expanse/auth`)

###Files
- **Plans**: `kebab-case.md` (e.g., `audio-to-text.md`)
- **Components**: `PascalCase.tsx` (e.g., `RoomList.tsx`)
- **Hooks**: `camelCase.ts` with `use` prefix (e.g., `useAuth.ts`)
- **Utilities**: `camelCase.ts` (e.g., `formatDate.ts`)
- **Constants**: `SCREAMING_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)
- **Config**: `lowercase.json` (e.g., `tsconfig.json`)
- **Tests**: `*.test.ts` or `*.spec.ts`

---

## What Each Directory Contains

### `/apps/`
Self-contained applications with their own dependencies and build configurations.
Apps are thin UI shells — logic lives in packages.

- **4eye-web/** — Next.js frontend application
- **4eye-mobile/** — React Native/Expo mobile application
- **api/** — NestJS backend API server

### `/packages/@4eye/`
4eye product-specific packages. Contains domain logic only relevant to 4eye.

- **core/** — Domain logic (rooms, sessions, organizations), GraphQL operations, hooks
- **types/** — All TypeScript types, interfaces, entity definitions, DTOs
- **features/** — Feature-specific logic (summaries, quizzes, recaps)
- **ai-sdk/** — AI provider integrations (OpenAI, Anthropic, etc.)
- **graphql-schema/** — Auto-generated GraphQL schema output (code-first)

### `/packages/@expanse/`
Platform-agnostic, reusable packages. Will be extracted for future products.

- **auth/** — Authentication (AuthProvider, useAuth, session management)
- **theme/** — Theming system, dark/light mode, tokens
- **layout/** — Grid navigation layouts, templates, UI controls (GridNavigationProvider, MinimalLayout, ActionBar, Minimap)
- **ui/** — Shared UI components (buttons, cards, forms)
- **user/** — User preferences, profile management
- **analytics/** — Event tracking, usage analytics
- **application/** — App-level utilities, feature flags
- **utils/** — Pure utility functions (validation, formatting, dates)

### `/docs/`
All project documentation organized by purpose.

- **planning/** — Product vision, architecture plans, feature specifications
- **technical/** — Technical references, standards, architecture docs
- **workflows/** — Development processes, testing procedures, guides
- **summaries/** — AI-generated implementation summaries
- **archive/** — Historical documents no longer actively used

### `/infrastructure-as-code/`
Terraform configurations for GCP infrastructure.

- **bootstrap/** — Initial GCP project setup
- **environments/** — Environment-specific configs (dev, staging, production)
- **modules/** — Reusable Terraform modules (VPC, GKE, Cloud SQL)

---

## Type Organization

**See [TYPE_ORGANIZATION.md](TYPE_ORGANIZATION.md)** for complete type system documentation.

**Quick reference:**
- 99% centralized in `@4eye/types` (entities, inputs, AI types, enums)
- 1% component-local props
- Organized by domain: entities/, inputs/, ai/, enums/

## GraphQL Architecture

**See [GRAPHQL_CODE_FIRST.md](GRAPHQL_CODE_FIRST.md)** for complete GraphQL documentation.

**Quick reference:**
- Code-first approach (TypeScript → Schema)
- Types in `@4eye/types`, schema generated to `packages/@4eye/graphql-schema/`

---

## Import Patterns

```typescript
// From apps/4eye-web or apps/4eye-mobile:
import type { User, Room, CreateRoomInput } from '@4eye/types';
import { useRooms, useRoom, RoomsProvider } from '@4eye/core';
import { useAuth, AuthProvider } from '@expanse/auth';
import { Button, Card } from '@expanse/ui';
import { formatDate, validateEmail } from '@expanse/utils';

// Packages can re-export convenience types:
// packages/@4eye/core/src/rooms/index.ts
export type { Room, CreateRoomInput, UpdateRoomInput } from './types';
export { RoomsProvider, useRooms, useRoom } from './context';
export * from './hooks';
export * from './graphql';
```

---

## Related Documentation

- **[TECHNICAL_STANDARDS.md](TECHNICAL_STANDARDS.md)** — Code standards and practices
- **[MODULE_ARCHITECTURE.md](MODULE_ARCHITECTURE.md)** — Module patterns and communication
