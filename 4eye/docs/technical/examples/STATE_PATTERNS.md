# State Management Patterns

React state management patterns using Context + useState/useReducer.

> **Architecture:** State logic lives in packages (`@4eye/core`, `@expanse/auth`), apps consume via hooks.

---

## Pattern Selection

| Pattern | Use Case | Example |
|---------|----------|---------|
| **Context + useState** | Simple state, async operations | Auth, Room list |
| **Context + useReducer** | Complex state transitions | Real-time transcripts, sessions |
| **Local useState** | Component-only state |

---

## Context + useState Pattern

For auth, data fetching, simple state.

```typescript
// packages/@expanse/auth/src/context/AuthProvider.tsx
'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '@4eye/types';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    // ... GraphQL mutation
    setUser(userData);
    setIsLoading(false);
  }, []);

  const logout = useCallback(async () => {
    // ... GraphQL mutation
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

## Context + useReducer Pattern

For complex state with many transitions.

```typescript
// packages/@4eye/core/src/sessions/context/SessionContext.tsx
'use client';

import { createContext, useContext, useReducer } from 'react';
import type { Transcript, TranscriptSegment } from '@4eye/types';

interface SessionState {
  transcript: Transcript | null;
  isLive: boolean;
  segments: TranscriptSegment[];
}

type SessionAction =
  | { type: 'SESSION_STARTED'; payload: { sessionId: string } }
  | { type: 'SEGMENT_RECEIVED'; payload: TranscriptSegment }
  | { type: 'SESSION_ENDED' };

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'SESSION_STARTED':
      return { ...state, isLive: true, segments: [] };
    case 'SEGMENT_RECEIVED':
      return { ...state, segments: [...state.segments, action.payload] };
    case 'SESSION_ENDED':
      return { ...state, isLive: false };
    default:
      return state;
  }
}

const SessionContext = createContext<{
  state: SessionState;
  dispatch: React.Dispatch<SessionAction>;
} | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, {
    transcript: null,
    isLive: false,
    segments: [],
  });

  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
}
```

---

## Provider Composition

Nest providers in correct order:

```typescript
// apps/4eye-web/app/providers.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@expanse/theme';
import { AuthProvider } from '@expanse/auth';
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

// app/layout.tsx
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

---

## State Initialization

### From localStorage

```typescript
export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(() => {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('preferences');
      return stored ? JSON.parse(stored) : defaultPreferences;
    }
    return defaultPreferences;
  });

  // Persist on change
  useEffect(() => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
  }, [preferences]);

  // ...
}
```

### From API with Loading State

```typescript
export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    isLoading: true,  // Start as loading
  });

  useEffect(() => {
    // Check for existing session
    async function initAuth() {
      try {
        const user = await fetchCurrentUser();
        setState({ user, isLoading: false });
      } catch {
        setState({ user: null, isLoading: false });
      }
    }
    initAuth();
  }, []);

  // Don't render until loaded
  if (state.isLoading) {
    return <LoadingSpinner />;
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
```

---

## Custom Hooks

Wrap context access in custom hooks:

```typescript
// Throws error if used outside provider
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Returns null if used outside provider (optional pattern)
export function useOptionalAuth() {
  return useContext(AuthContext);
}

// Selector pattern - only return subset
export function useCurrentUser() {
  const { user } = useAuth();
  return user;
}

export function useIsAuthenticated() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}
```

---

## Error Boundaries

Wrap providers in error boundaries:

```typescript
// app/providers.tsx
import { ErrorBoundary } from 'react-error-boundary';

export function Providers({ children }) {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
}
```

---

## Related Documentation

- **[COMPONENT_PATTERNS.md](COMPONENT_PATTERNS.md)** — Component organization
- **[../TECHNICAL_STANDARDS.md](../TECHNICAL_STANDARDS.md)** — State management standards
- **[../TYPE_ORGANIZATION.md](../TYPE_ORGANIZATION.md)** — Type system
