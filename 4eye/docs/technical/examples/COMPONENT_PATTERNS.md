# Component Patterns

React component organization patterns for 4eye.

> **See [TYPE_ORGANIZATION.md](../TYPE_ORGANIZATION.md)** for type system details.

---

## Component Structure

App components are **feature-grouped**, not type-grouped. Logic lives in packages.

```
apps/4eye-web/components/rooms/
├── RoomList.tsx
├── RoomCard.tsx
└── CreateRoomModal.tsx

packages/@4eye/core/src/rooms/
├── context/                    # Providers + hooks
│   └── RoomsContext.tsx
├── hooks/
│   └── useCreateRoomForm.ts
└── graphql/
    └── queries.ts
```

---

## Prop Interfaces

**Component props stay co-located** with the component file.

```typescript
// apps/4eye-web/features/rooms/components/RoomCard.tsx
import type { Room } from '@4eye/types';

interface RoomCardProps {
  room: Room;                    // ✅ Domain type from @4eye/types
  onSelect?: (roomId: string) => void;  // ✅ Handler
}

export function RoomCard({ room, onSelect }: RoomCardProps) {
  return (
    <Card onClick={() => onSelect?.(room.id)}>
      <h3>{room.name}</h3>
      <p>{room.description}</p>
    </Card>
  );
}
```

---

## Export Patterns

### Named Exports (Preferred)

```typescript
export function RoomCard({ room }: RoomCardProps) {
  return <Card>...</Card>;
}
```

### Default Exports (for pages)

```typescript
// app/dashboard/page.tsx
export default function DashboardPage() {
  return <Dashboard />;
}
```

---

## Shared Components

Shared UI components go in `@expanse/ui`:

```typescript
// packages/@expanse/ui/src/components/Card.tsx
interface CardProps {
  children: React.ReactNode;
  variant?: 'outlined' | 'filled';
}

export function Card({ children, variant = 'outlined' }: CardProps) {
  return <div className={`card-${variant}`}>{children}</div>;
}
```

---

## Import Centralized Types

Always import domain types from `@4eye/types`:

```typescript
import type { User, Room, Session } from '@4eye/types';
```

---

## Related Documentation

- **[STATE_PATTERNS.md](STATE_PATTERNS.md)** — State management patterns
- **[LAYOUT_PATTERNS.md](LAYOUT_PATTERNS.md)** — Layout patterns
- **[TYPE_ORGANIZATION.md](../TYPE_ORGANIZATION.md)** — Type system
