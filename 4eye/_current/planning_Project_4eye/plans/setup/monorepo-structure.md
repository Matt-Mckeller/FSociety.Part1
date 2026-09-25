# D3 — Monorepo Structure

> **Status: ✅ Implemented** — This structure is now live. See [REPOSITORY_STRUCTURE.md](../../../technical/REPOSITORY_STRUCTURE.md) for current reference.

## Purpose

Define the npm workspaces structure and package architecture for the 4eye monorepo.

---

## Directory Structure

```
4eye/
├── apps/
│   ├── 4eye-web/                     # Web frontend (Next.js 14) — thin UI shell
│   │   ├── app/                      # App Router pages only
│   │   │   ├── (auth)/               # Auth route group
│   │   │   ├── (dashboard)/          # Dashboard route group
│   │   │   ├── rooms/                # Room pages
│   │   │   └── ...
│   │   ├── components/               # App-specific UI components
│   │   └── theme/                    # App theme overrides (if any)
│   │
│   ├── 4eye-mobile/                  # Mobile app (React Native) — thin UI shell
│   │   ├── src/
│   │   │   ├── screens/              # Mobile screens
│   │   │   ├── components/           # Mobile-specific components
│   │   │   └── navigation/           # React Navigation setup
│   │   └── ...
│   │
│   └── api/                          # Backend (NestJS)
│       ├── src/
│       │   ├── modules/              # Feature modules
│       │   ├── common/               # Guards, decorators, pipes
│       │   └── migrations/           # Database migrations
│       └── test/
│
├── packages/
│   ├── @4eye/                        # 4eye-specific packages
│   │   ├── types/                    # All TypeScript types, entities, inputs, AI types
│   │   ├── core/                     # Domain logic (rooms, sessions, users, organizations)
│   │   ├── features/                 # AI features (chat, transcription, translation)
│   │   ├── ai-sdk/                   # AI provider abstraction layer
│   │   └── graphql-schema/           # Generated GraphQL schema
│   │
│   └── @expanse/                     # Reusable platform packages
│       ├── auth/                     # Authentication (AuthProvider, guards, hooks)
│       ├── theme/                    # Multi-theme system (ThemeProvider, configs)
│       ├── layout/                   # Layout primitives (LayoutProvider, components)
│       ├── ui/                       # Shared UI components
│       ├── user/                     # User context and management
│       ├── analytics/                # Analytics integration
│       ├── application/              # Provider composition
│       └── utils/                    # Shared utilities
│
├── docs/                             # All documentation
│   ├── planning/                     # Product plans
│   └── technical/                    # Technical references
│
├── content/                          # CMS content (JSON files)
│   └── ...
│
├── infrastructure-as-code/           # Terraform, GCP
│
├── package.json                      # Workspace root
└── tsconfig.base.json                # Shared TS config
```

---

## Package Scopes

### @4eye/* — 4eye-Specific Packages

Business logic and types specific to the 4eye product.

| Package | Purpose |
|---------|---------|
| `@4eye/types` | All TypeScript types, entities, inputs, AI response types |
| `@4eye/core` | Domain logic: rooms, sessions, users, organizations |
| `@4eye/features` | AI features: chat, transcription, translation, summarization |
| `@4eye/ai-sdk` | AI provider abstraction (OpenAI, Anthropic, Google, etc.) |
| `@4eye/graphql-schema` | Auto-generated GraphQL schema |

### @expanse/* — Reusable Platform Packages

Infrastructure packages that can be reused across multiple Expanse products.

| Package | Purpose |
|---------|---------|
| `@expanse/auth` | AuthProvider, session management, guards, hooks |
| `@expanse/theme` | ThemeProvider, multi-theme configs (12+ themes) |
| `@expanse/shell` | LayoutProvider, primitives (MaxWidthContainer, etc.) |
| `@expanse/ui` | Shared UI components (buttons, cards, forms) |
| `@expanse/user` | UserProvider, user context |
| `@expanse/analytics` | AnalyticsProvider, tracking hooks |
| `@expanse/application` | ApplicationProvider (composes all providers) |
| `@expanse/utils` | Pure utilities (validation, formatting, dates) |

---

## Configuration

### Root package.json

```json
{
  "name": "4eye",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/@expanse/*",
    "packages/@4eye/*"
  ],
  "scripts": {
    "dev": "docker compose up",
    "dev:web": "npm run dev --workspace=apps/4eye-web",
    "dev:mobile": "npm run dev --workspace=apps/4eye-mobile",
    "dev:api": "npm run dev --workspace=apps/api",
    "build": "npm run build --workspaces --if-present",
    "test": "npm run test --workspaces --if-present",
    "lint": "npm run lint --workspaces --if-present"
  }
}
```

### tsconfig.base.json Paths

```json
{
  "compilerOptions": {
    "paths": {
      "@4eye/types": ["packages/@4eye/types/src"],
      "@4eye/core": ["packages/@4eye/core/src"],
      "@4eye/features": ["packages/@4eye/features/src"],
      "@4eye/ai-sdk": ["packages/@4eye/ai-sdk/src"],
      "@4eye/graphql-schema": ["packages/@4eye/graphql-schema/src"],
      
      "@expanse/auth": ["packages/@expanse/auth/src"],
      "@expanse/theme": ["packages/@expanse/theme/src"],
      "@expanse/shell": ["packages/@expanse/shell/src"],
      "@expanse/ui": ["packages/@expanse/ui/src"],
      "@expanse/user": ["packages/@expanse/user/src"],
      "@expanse/analytics": ["packages/@expanse/analytics/src"],
      "@expanse/application": ["packages/@expanse/application/src"],
      "@expanse/utils": ["packages/@expanse/utils/src"]
    }
  }
}
```

---

## Import Patterns

### In Apps (Thin UI Shells)

```typescript
// apps/4eye-web/app/page.tsx
import { useAuth } from '@expanse/auth';
import { useRooms } from '@4eye/core';
import type { Room } from '@4eye/types';
import { Button } from '@expanse/ui';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const { rooms } = useRooms();
  // ... UI only
}
```

### In Packages (Can Import Other Packages)

```typescript
// packages/@4eye/core/src/rooms/hooks/useRooms.ts
import type { Room, CreateRoomInput } from '@4eye/types';
import { useMutation, useQuery } from '@apollo/client';
// GraphQL operations, business logic
```

---

## Build Order

1. `@4eye/types` — No dependencies
2. `@expanse/utils` — No dependencies
3. `@4eye/graphql-schema` — Depends on types
4. `@expanse/theme` — No dependencies
5. `@expanse/shell` — Depends on theme
6. `@expanse/auth` — Depends on types
7. `@expanse/user` — Depends on auth
8. `@4eye/core` — Depends on types
9. `@4eye/ai-sdk` — Depends on types
10. `@4eye/features` — Depends on core, ai-sdk
11. `@expanse/analytics` — Optional
12. `@expanse/application` — Composes all
13. `@expanse/ui` — Depends on theme
14. `apps/*` — Depend on packages

---

## App vs Package Responsibility

### Apps (Thin Shells)
- **Pages/Routes**: Define what screens exist
- **Layout composition**: Arrange components on screen
- **App-specific components**: Components used only in this app
- **Navigation**: App-specific routing

### Packages (All Logic)
- **Business logic**: All domain operations
- **State management**: Contexts, reducers, providers
- **API operations**: GraphQL queries, mutations
- **Types**: All type definitions
- **Reusable components**: Shared UI components

---

## Dependencies

- Requires completion of D2 (Repository Migration)

## Outputs

- [x] All packages created in `packages/`
- [x] Root workspace configured
- [x] TypeScript paths configured
- [x] Apps import from packages only
- [x] No libs/ directory (removed after migration)
- [x] Mobile app shell created
