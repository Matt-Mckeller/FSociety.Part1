# Type Organization

Complete guide to TypeScript type management in the 4eye monorepo.

> **See [REPOSITORY_STRUCTURE.md](REPOSITORY_STRUCTURE.md)** for overall project structure.

---

## Strategy

**99% centralized in `@4eye/types`, 1% component-local props.**

Types belong in `@4eye/types` if:
- Used **or may be used** in 2+ places
- Part of domain model (entities, inputs, AI responses)
- Shared across modules or packages

**Exception:** Component-local prop interfaces stay co-located with components.

---

## Directory Structure

```
packages/@4eye/types/src/
├── entities/              # Domain entities
│   ├── user.ts           # User interface
│   ├── room.ts           # Room interface
│   ├── session.ts        # Session interface
│   ├── organization.ts
│   └── ...
│
├── inputs/               # GraphQL mutation inputs
│   ├── auth.ts          # Login, Register inputs
│   ├── room.ts          # CreateRoom, UpdateRoom inputs
│   ├── session.ts       # Session operation inputs
│   └── index.ts
│
├── ai/                   # AI response types (organized by feature)
│   ├── chat/            # Chat AI responses
│   ├── recaps/          # Recap generation types
│   ├── summaries/       # Summary types
│   ├── learning/        # Learning recommendation types
│   ├── feedback/        # Speaker feedback types
│   ├── visual/          # Visual generation types
│   ├── comparison/      # Cross-source comparison types
│   └── transform/       # Positive speech transform types
│
├── enums/               # Shared enums
│   └── index.ts
│
└── index.ts             # Central export point (exports all types)
```

---

## When to Centralize

✅ **Always centralize:**
- Domain entities (User, Room, Session, Organization)
- GraphQL inputs/outputs (CreateRoomInput, UpdateUserInput)
- AI response interfaces (ChatResponse, RecapOutput)
- Shared business types used in 2+ modules
- Enums used across modules

✅ **Keep local (rare):**
- React component props (RoomCardProps, DashboardLayoutProps)
- Component-specific helper types
- Private types never used outside single file

---

## Import Patterns

### From Applications

```typescript
// apps/4eye-web or apps/api
import type { User, Room, CreateRoomInput } from '@4eye/types';
import { useAuth } from '@expanse/auth';
import { useRooms } from '@4eye/core';
```

### Module Re-exports

Feature modules can re-export relevant types for convenience:

```typescript
// packages/@4eye/core/src/rooms/index.ts
export * from './context';
export * from './hooks';
export * from './graphql';

// Re-export relevant types
export type { 
  Room, 
  CreateRoomInput, 
  UpdateRoomInput 
} from '@4eye/types';
```

### Component-Local Props

```typescript
// apps/4eye-web/dashboard/DashboardLayout.tsx
interface DashboardLayoutProps {  // ✅ Component-specific
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function DashboardLayout({ children, sidebar }: DashboardLayoutProps) {
  return (/* ... */);
}
```

---

## Examples

### ✅ Good: Centralized Types

```typescript
// packages/@4eye/types/src/entities/room.ts
export interface Room {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
}

// packages/@4eye/core/src/rooms/context/RoomsContext.tsx
import type { Room } from '@4eye/types';

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  return { rooms };
}
```

### ❌ Avoid: Local Types for Shared Entities

```typescript
// DON'T DO THIS - creates duplication
// packages/@4eye/core/src/rooms/types/room.types.ts
export interface Room {  // ❌ Duplicates @4eye/types
  id: string;
  name: string;
}
```

---

## Related Documentation

- **[GRAPHQL_CODE_FIRST.md](GRAPHQL_CODE_FIRST.md)** — How types flow through GraphQL
- **[REPOSITORY_STRUCTURE.md](REPOSITORY_STRUCTURE.md)** — Overall project structure
- **[examples/COMPONENT_PATTERNS.md](examples/COMPONENT_PATTERNS.md)** — Component prop patterns
