# Module Architecture

Module design patterns for 4eye backend (NestJS) and frontend (React).

> **See [REPOSITORY_STRUCTURE.md](REPOSITORY_STRUCTURE.md)** for directory structure and package organization.

---

## Backend: NestJS Modules

### Module Structure Pattern

Each module is self-contained with resolvers, services, and entities.

```
apps/api/src/modules/auth/
├── auth.module.ts          # Module definition
├── auth.resolver.ts        # GraphQL resolvers
├── auth.service.ts         # Business logic
├── entities/
│   └── user.entity.ts      # TypeORM entity
├── dto/
│   ├── login.input.ts      # GraphQL input types
│   └── signup.input.ts
├── guards/
│   └── jwt-auth.guard.ts   # Auth guards
└── decorators/
    └── current-user.ts     # Custom decorators
```

### Module Registration

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthResolver, AuthService],
  exports: [AuthService], // Only if needed by other modules
})
export class AuthModule {}
```

### Key Principles

- **Self-contained** — Module owns its data, logic, and GraphQL surface
- **No cross-module imports** — Modules communicate via GraphQL only
- **GraphQL interface** — Queries, mutations, subscriptions are the API
- **Shared types** — Use `@4eye/types` for shared TypeScript types

---

## Frontend: Package Module Pattern

Domain logic lives in packages, apps are thin UI shells.

### Package Module Structure

```
packages/@4eye/core/src/rooms/
├── context/                    # React Context + Provider
│   └── RoomsContext.tsx        # RoomsProvider, useRooms, useRoom hooks
├── hooks/                      # Additional hooks
│   ├── useCreateRoomForm.ts    # Form handling hook
│   └── useUpdateRoomForm.ts
├── graphql/                    # GraphQL operations
│   ├── queries.ts              # GET_ROOMS, GET_ROOM, etc.
│   └── mutations.ts            # CREATE_ROOM, UPDATE_ROOM, etc.
├── types/                      # Module-specific types (if not in @4eye/types)
│   └── types.ts
└── index.ts                    # Public exports
```

### Module Index Pattern

```typescript
// packages/@4eye/core/src/rooms/index.ts

// Context and hooks
export { RoomsProvider, useRooms, useRoom, useRoomByInviteCode } from './context';
export { useCreateRoomForm, useUpdateRoomForm } from './hooks';

// GraphQL operations (for direct use if needed)
export {
  MY_ROOMS_QUERY,
  ROOM_QUERY,
  CREATE_ROOM_MUTATION,
  UPDATE_ROOM_MUTATION,
} from './graphql';

// Types (re-export from local or @4eye/types)
export type { Room, CreateRoomInput, UpdateRoomInput } from './types';
```

### App Component Usage

```typescript
// apps/4eye-web/app/rooms/page.tsx
import { useRooms } from '@4eye/core';
import { RoomCard } from '@/components/rooms/RoomCard';

export default function RoomsPage() {
  const { rooms, loading, error } = useRooms();
  
  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return (
    <div>
      {rooms.map(room => <RoomCard key={room.id} room={room} />)}
    </div>
  );
}
```

---

## Communication Patterns

### Backend ↔ Backend

**Via GraphQL field resolvers only** — No direct service imports across modules.

```typescript
// ❌ Bad: Direct import
import { UsersService } from '../users/users.service';

// ✅ Good: GraphQL field resolver
@ResolveField('owner', () => User)
async owner(@Parent() room: Room) {
  return { __typename: 'User', id: room.ownerId };
}
```

### Frontend ↔ Backend

**Via GraphQL only** — Queries, mutations, subscriptions.

```typescript
// packages/@4eye/core/src/rooms/graphql/queries.ts
import { gql } from '@apollo/client';

export const MY_ROOMS_QUERY = gql`
  query MyRooms {
    myRooms {
      id
      name
      description
      memberCount
    }
  }
`;
```

### Frontend State Sharing

**Via packages** — All state logic in packages, apps consume via hooks.

```typescript
// App wraps with providers
<AuthProvider>
  <RoomsProvider>
    <App />
  </RoomsProvider>
</AuthProvider>

// Components use hooks
const { user } = useAuth();           // from @expanse/auth
const { rooms } = useRooms();         // from @4eye/core
```

---

## Provider Composition

### Provider Hierarchy

```typescript
// apps/4eye-web/app/providers.tsx
import { AuthProvider } from '@expanse/auth';
import { ThemeProvider } from '@expanse/theme';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
```

### Route-Level Providers

```typescript
// apps/4eye-web/app/rooms/layout.tsx
import { RoomsProvider } from '@4eye/core';

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return <RoomsProvider>{children}</RoomsProvider>;
}
```

---

## Vertical-Agnostic Modules

### Core Pattern

Build modules without vertical-specific logic. Use configuration for variations.

```typescript
// ❌ Avoid vertical-specific code in modules
if (vertical === 'religion') {
  // sermon-specific logic
}

// ✅ Use configuration and prompts
const promptTemplate = config.getPrompt('summary', session.verticalType);
const summary = await aiService.generateSummary(content, promptTemplate);
```

### Vertical Configuration

- **Prompts** — Stored in database or config, injected at runtime
- **Feature flags** — Enable/disable features per vertical
- **UI terminology** — CMS-driven text changes ("Room" → "Classroom")

---

## Related Documentation

- **[REPOSITORY_STRUCTURE.md](REPOSITORY_STRUCTURE.md)** — Directory structure and packages
- **[examples/STATE_PATTERNS.md](examples/STATE_PATTERNS.md)** — Context/reducer implementation patterns
- **[examples/COMPONENT_PATTERNS.md](examples/COMPONENT_PATTERNS.md)** — Component patterns
- **[graphql-api.md](../planning/plans/core/graphql-api.md)** — GraphQL API setup
