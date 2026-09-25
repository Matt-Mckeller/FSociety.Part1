# Shared Libraries Quick Reference

Quick reference guide for using 4eye shared libraries.

## Package Overview

| Package | Purpose | Import From |
|---------|---------|-------------|
| `@4eye/types` | TypeScript interfaces, AI response types | Types |
| `@4eye/core` | GraphQL operations, API logic, utilities | API calls |
| `@4eye/state` | React Context providers, hooks | State management |
| `@4eye/ui` | Shared UI components | Components (future) |

## Common Import Patterns

### Types

```typescript
// Entities
import type { User, Room, Session, Transcript, Organization } from '@4eye/types';

// Inputs
import type { 
  LoginInput, 
  SignupInput, 
  CreateRoomInput,
  CreateTranscriptInput 
} from '@4eye/types';

// AI Response Types
import type { ChatResponseData, SummaryResponseData } from '@4eye/types';
```

### State Management

```typescript
// Import providers
import { AuthProvider, RoomsProvider } from '@4eye/state';

// Use hooks
import { useAuth, useRooms } from '@4eye/state';

function MyComponent() {
  const { user, login, logout } = useAuth();
  const { rooms, createRoom } = useRooms();
  // ...
}
```

### API Operations

```typescript
// Import API namespaces
import { auth, rooms, sessions } from '@4eye/core';

// Use GraphQL operations
const { data } = useQuery(auth.ME_QUERY);
const [login] = useMutation(auth.LOGIN_MUTATION);
const { data: roomData } = useQuery(rooms.MY_ROOMS_QUERY);
```

### Storage Utilities

```typescript
import { auth } from '@4eye/core';
const { tokenStorage, isTokenExpired } = auth;

// Store token
tokenStorage.setToken(accessToken);

// Retrieve token
const token = tokenStorage.getToken();

// Check expiration
if (isTokenExpired(token)) {
  // refresh or logout
}
```

## Provider Setup

### App Root

```typescript
// apps/web/app/providers.tsx
import { AuthProvider, RoomsProvider } from '@4eye/state';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <RoomsProvider>
          {children}
        </RoomsProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
```

### Page/Layout

```typescript
// apps/web/app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

## Hook Usage Examples

### Authentication

```typescript
import { useAuth } from '@4eye/state';
import type { LoginInput } from '@4eye/types';

function LoginForm() {
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (input: LoginInput) => {
    try {
      await login(input);
      router.push('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### Rooms Management

```typescript
import { useRooms } from '@4eye/state';
import type { CreateRoomInput } from '@4eye/types';

function CreateRoomPage() {
  const { createRoom, isSubmitting, error } = useRooms();

  const handleCreate = async (input: CreateRoomInput) => {
    const room = await createRoom(input);
    router.push(`/rooms/${room.id}`);
  };

  return (
    <form onSubmit={handleCreate}>
      {/* form fields */}
    </form>
  );
}
```

### Single Room Query (Standalone)

```typescript
import { useRoom } from '@4eye/state';

function RoomPage({ params }: { params: { id: string } }) {
  const { room, isLoading, error } = useRoom(params.id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!room) return <div>Room not found</div>;

  return <div>{room.name}</div>;
}
```

### Join by Invite Code (Standalone)

```typescript
import { useRoomByInviteCode } from '@4eye/state';

function JoinPage({ params }: { params: { code: string } }) {
  const { room, isLoading, error } = useRoomByInviteCode(params.code);

  // ...
}
```

## GraphQL Operations

### Queries

```typescript
import { useQuery } from '@apollo/client';
import { auth, rooms, sessions } from '@4eye/core';

// Current user
const { data } = useQuery(auth.ME_QUERY);

// User's rooms
const { data } = useQuery(rooms.MY_ROOMS_QUERY);

// Room by ID
const { data } = useQuery(rooms.ROOM_QUERY, {
  variables: { id: roomId }
});

// Transcript by session
const { data } = useQuery(sessions.TRANSCRIPT_BY_SESSION_QUERY, {
  variables: { sessionId }
});
```

### Mutations

```typescript
import { useMutation } from '@apollo/client';
import { auth, rooms } from '@4eye/core';
import type { LoginInput, CreateRoomInput } from '@4eye/types';

// Login
const [login] = useMutation(auth.LOGIN_MUTATION);
await login({ variables: { input: loginData } });

// Create room
const [createRoom] = useMutation(rooms.CREATE_ROOM_MUTATION);
const { data } = await createRoom({ 
  variables: { input: roomData } 
});

// Update room
const [updateRoom] = useMutation(rooms.UPDATE_ROOM_MUTATION);
await updateRoom({ 
  variables: { id: roomId, input: updates } 
});
```

### Subscriptions

```typescript
import { useSubscription } from '@apollo/client';
import { sessions } from '@4eye/core';

// Subscribe to new transcript segments
const { data } = useSubscription(
  sessions.TRANSCRIPT_SEGMENT_ADDED_SUBSCRIPTION,
  {
    variables: { sessionId }
  }
);

// Subscribe to transcript completion
const { data } = useSubscription(
  sessions.TRANSCRIPT_COMPLETED_SUBSCRIPTION,
  {
    variables: { sessionId }
  }
);
```

## Type Safety

### Function Signatures

```typescript
import type { User, LoginInput, Room } from '@4eye/types';

async function authenticateUser(input: LoginInput): Promise<User> {
  const { data } = await login({ variables: { input } });
  return data.login.user;
}

function formatRoomName(room: Room): string {
  return `${room.name} (${room.isActive ? 'Active' : 'Inactive'})`;
}
```

### Component Props

```typescript
import type { Room, Transcript } from '@4eye/types';

interface RoomCardProps {
  room: Room;
  onSelect: (room: Room) => void;
}

export function RoomCard({ room, onSelect }: RoomCardProps) {
  // ...
}
```

## C8 Typed AI Responses

### Using AI Response Types

```typescript
import type { ChatResponseData, SummaryResponseData } from '@4eye/types';
import { ChatResponseSchema, SummaryResponseSchema } from '@4eye/types';

// Parse and validate AI response
const chatResponse: ChatResponseData = ChatResponseSchema.parse(aiOutput);

// Type-safe access
console.log(chatResponse.message);
console.log(chatResponse.suggestions[0].text);
console.log(chatResponse.citations[0].source);
```

### Creating Custom AI Types (Backend)

1. Add type to `libs/types/src/ai/{feature}/`
2. Include JSDoc (serves as prompt)
3. Create Zod schema
4. Register in `TypeReaderService`
5. Use in prompt generation

## Common Patterns

### Protected Route

```typescript
'use client';

import { useAuth } from '@4eye/state';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect('/login');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
```

### Role-Based Access

```typescript
import { useHasRole } from '@4eye/state';

export function AdminPanel() {
  const isAdmin = useHasRole('ADMIN');

  if (!isAdmin) {
    return <div>Access denied</div>;
  }

  return <div>Admin content</div>;
}
```

### Form with Type Safety

```typescript
import { useForm } from 'react-hook-form';
import { useRooms } from '@4eye/state';
import type { CreateRoomInput } from '@4eye/types';

export function CreateRoomForm() {
  const { createRoom } = useRooms();
  const { register, handleSubmit } = useForm<CreateRoomInput>();

  const onSubmit = async (data: CreateRoomInput) => {
    await createRoom(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} />
      <textarea {...register('description')} />
      <button type="submit">Create</button>
    </form>
  );
}
```

## Migration from Legacy Imports

### Before (Legacy)

```typescript
import { useAuth } from '@/lib/auth';
import { useRooms } from '@/lib/rooms';
import { User, Room } from '@/lib/auth/types';
```

### After (Recommended)

```typescript
import { useAuth, useRooms } from '@4eye/state';
import type { User, Room } from '@4eye/types';
```

## Best Practices

1. **Import types with `type` keyword**
   ```typescript
   import type { User } from '@4eye/types'; // ✅ Type-only import
   import { User } from '@4eye/types';      // ❌ Runtime import (unnecessary)
   ```

2. **Use namespace pattern for API operations**
   ```typescript
   import { auth } from '@4eye/core';       // ✅ Clean namespace
   const { LOGIN_MUTATION } = auth;
   
   import { LOGIN_MUTATION } from '@4eye/core/api/auth'; // ❌ Deep import
   ```

3. **Prefer hooks over direct GraphQL**
   ```typescript
   const { user, login } = useAuth();           // ✅ Uses hook
   
   const [loginMutation] = useMutation(LOGIN);  // ❌ Direct GraphQL (when hook exists)
   ```

4. **Handle loading and error states**
   ```typescript
   const { room, isLoading, error } = useRoom(id);
   
   if (isLoading) return <Spinner />;           // ✅ Handle loading
   if (error) return <Error message={error} />; // ✅ Handle error
   if (!room) return <NotFound />;              // ✅ Handle null
   ```

5. **Use TypeScript strict mode**
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true
     }
   }
   ```

## Troubleshooting

### Module Not Found

**Problem**: `Module not found: Can't resolve '@4eye/state'`

**Solution**: Update `tsconfig.json` paths:
```json
{
  "compilerOptions": {
    "paths": {
      "@4eye/core": ["../../libs/core/src"],
      "@4eye/state": ["../../libs/state/src"],
      "@4eye/types": ["../../libs/types/src"]
    }
  }
}
```

### Type Errors

**Problem**: Type mismatches between libs

**Solution**: Ensure all libs use same TypeScript version:
```bash
npm install typescript@^5.0.0 --save-dev --workspace=libs/core
npm install typescript@^5.0.0 --save-dev --workspace=libs/state
npm install typescript@^5.0.0 --save-dev --workspace=libs/types
```

### Apollo Client Context

**Problem**: Hooks fail because Apollo Context missing

**Solution**: Wrap app in `ApolloProvider`:
```typescript
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo-client';

<ApolloProvider client={apolloClient}>
  <AuthProvider>
    {children}
  </AuthProvider>
</ApolloProvider>
```

## Additional Resources

- [Architecture Refactor Summary](./architecture-refactor-summary.md)
- [Plan.md](../4eye-planning/Plan.md)
- [C8 Typed AI Response System](../apps/api/src/modules/ai/README.md)
- [GraphQL Schema](../libs/graphql-schema/src/)
