# Architecture Overview

## Multi-Platform Authentication

Different platforms require different token storage strategies:

| Platform | Token Storage | JS Access to Tokens | Strategy |
|----------|---------------|---------------------|----------|
| **Web** | httpOnly cookies | ❌ No (server manages) | Server sets cookies |
| **Mobile (iOS/Android)** | SecureStore/Keychain | ✅ Yes (app manages) | Returned in response |
| **Desktop (Electron)** | Secure storage | ✅ Yes (app manages) | Returned in response |

### Recommended Approach: Split Session Layer

To support multiple platforms cleanly, use a **split architecture** with platform-specific session providers:

```
┌─────────────────────────────────────────────────────────────┐
│                    SPLIT LAYER ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   WEB                              MOBILE                    │
│   ───                              ──────                    │
│                                                              │
│   WebSessionProvider               MobileSessionProvider     │
│   (checks auth via /me,            (manages tokens in        │
│    doesn't see tokens)              SecureStore)             │
│          │                                │                  │
│          └──────────┬─────────────────────┘                  │
│                     │                                        │
│                     ▼                                        │
│              AuthProvider (shared)                           │
│              (user state, operations, hooks)                 │
│                     │                                        │
│                     ▼                                        │
│              ConsentProvider                                 │
│                     │                                        │
│                     ▼                                        │
│                   App                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Provider Composition

```typescript
// Web app composition
<WebSessionProvider>
  <AuthProvider>
    <ConsentProvider>
      <App />
    </ConsentProvider>
  </AuthProvider>
</WebSessionProvider>

// Mobile app composition  
<MobileSessionProvider>
  <AuthProvider>
    <ConsentProvider>
      <App />
    </ConsentProvider>
  </AuthProvider>
</MobileSessionProvider>
```

---

## Security Architecture

### httpOnly Cookies (CRITICAL)

**Tokens are NEVER exposed to JavaScript.** The server sets httpOnly cookies directly.

```
┌─────────────────────────────────────────────────────────────┐
│                    TOKEN FLOW                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Frontend                          Backend                  │
│   ────────                          ───────                  │
│                                                              │
│   login(email, password) ────────► Validate credentials     │
│                                          │                   │
│                                    Generate JWT tokens       │
│                                          │                   │
│   ◄─────────────────────────────── Set-Cookie: accessToken  │
│   (cookie set by browser,               (httpOnly, secure)  │
│    JS cannot read it)               Set-Cookie: refreshToken│
│                                         (httpOnly, secure)  │
│   ◄─────────────────────────────── Response: { user }       │
│                                    (NO tokens in body)       │
│                                                              │
│   All subsequent requests ────────► Cookie sent auto by     │
│   (cookies auto-attached)           browser                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### CSRF Protection

Since we use cookies, CSRF protection is **mandatory**.

**Strategy:** Double-submit cookie pattern with custom header.

```typescript
// Backend generates CSRF token on login
res.cookie('csrf_token', csrfToken, {
  httpOnly: false,  // JS CAN read this one
  secure: true,
  sameSite: 'strict',
});

// Frontend reads csrf_token cookie and sends in header
const csrfToken = getCookie('csrf_token');
fetch('/api/graphql', {
  headers: {
    'X-CSRF-Token': csrfToken,  // Must match cookie
  },
});

// Backend validates: header must match cookie
```

**Cookie Settings:**

| Cookie | httpOnly | secure | sameSite | maxAge |
|--------|----------|--------|----------|--------|
| `accessToken` | ✅ Yes | ✅ Yes | `lax` | 15 min |
| `refreshToken` | ✅ Yes | ✅ Yes | `strict` | 30 days |
| `csrf_token` | ❌ No | ✅ Yes | `strict` | Session |

---

## Session Layer (Platform-Specific)

The session layer handles token storage and is **different per platform**.

### SessionProvider Interface

```typescript
// packages/@expanse/auth/src/session/SessionContext.ts

interface SessionContextType {
  // State
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Token operations (platform-specific)
  setTokens: (tokens: TokenPair) => Promise<void>;
  clearTokens: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;  // Mobile only
}

// Apps use this, AuthProvider uses SessionContext internally
const { isAuthenticated, isLoading } = useSession();
```

### WebSessionProvider (Browser)

```typescript
// packages/@expanse/auth/src/session/WebSessionProvider.tsx

export function WebSessionProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if authenticated by calling /me endpoint (cookies sent automatically)
  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then(res => {
        setIsAuthenticated(res.ok);
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  // Web: tokens are httpOnly cookies, we don't manage them
  const setTokens = async () => {
    // Server already set cookies, just update state
    setIsAuthenticated(true);
  };

  const clearTokens = async () => {
    // Call logout endpoint to clear server cookies
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setIsAuthenticated(false);
  };

  const getAccessToken = async () => null; // Can't access httpOnly cookies

  return (
    <SessionContext.Provider value={{ isAuthenticated, isLoading, setTokens, clearTokens, getAccessToken }}>
      {children}
    </SessionContext.Provider>
  );
}
```

### MobileSessionProvider (React Native)

```typescript
// packages/@expanse/auth/src/session/MobileSessionProvider.tsx
import * as SecureStore from 'expo-secure-store';

export function MobileSessionProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored tokens on mount
  useEffect(() => {
    SecureStore.getItemAsync('accessToken').then(token => {
      setIsAuthenticated(!!token && !isTokenExpired(token));
      setIsLoading(false);
    });
  }, []);

  // Mobile: we manage tokens directly
  const setTokens = async (tokens: TokenPair) => {
    await SecureStore.setItemAsync('accessToken', tokens.accessToken);
    await SecureStore.setItemAsync('refreshToken', tokens.refreshToken);
    setIsAuthenticated(true);
  };

  const clearTokens = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    setIsAuthenticated(false);
  };

  const getAccessToken = async () => {
    return await SecureStore.getItemAsync('accessToken');
  };

  return (
    <SessionContext.Provider value={{ isAuthenticated, isLoading, setTokens, clearTokens, getAccessToken }}>
      {children}
    </SessionContext.Provider>
  );
}
```

---

## AuthProvider (Shared Across Platforms)

**Package:** `@expanse/auth`

**Purpose:** Manages user state and auth operations. Uses SessionProvider for token storage.

### Public API (What Apps Use)

```typescript
interface AuthContextType {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGuest: boolean;
  error: AuthError | null;
  
  // Operations (return result objects with error info)
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (input: SignupInput) => Promise<AuthResult>;
  logout: () => Promise<void>;
  loginWithGoogle: () => void;
  continueAsGuest: () => void;
  
  // MFA
  verifyMfa: (code: string) => Promise<AuthResult>;
  
  // Role helpers
  hasRole: (role: UserRole) => boolean;
  
  // Email verification
  resendVerificationEmail: () => Promise<void>;
}

// Result type for operations
interface AuthResult {
  success: boolean;
  error?: AuthError;
  requiresMfa?: boolean;
  requiresEmailVerification?: boolean;
}

interface AuthError {
  code: AuthErrorCode;
  message: string;
}

type AuthErrorCode = 
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_LOCKED'
  | 'EMAIL_NOT_VERIFIED'
  | 'MFA_REQUIRED'
  | 'MFA_INVALID'
  | 'NETWORK_ERROR'
  | 'UNKNOWN';

// Usage - simple!
const { user, isAuthenticated, login, logout, hasRole, error } = useAuth();
```

---

## Data Flow

### Web Login Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    WEB LOGIN FLOW                             │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│   useAuth().login(email, password)                           │
│     │                                                         │
│     ▼                                                         │
│   AuthProvider calls login mutation                          │
│     │                                                         │
│     ▼                                                         │
│   Backend validates, then:                                   │
│     1. Sets httpOnly cookies (secure, server-only)           │
│     2. Returns { user } (NO tokens in response)              │
│     │                                                         │
│     ▼                                                         │
│   AuthProvider:                                              │
│     1. Calls session.setTokens() (no-op for web)             │
│     2. Sets user state                                       │
│     │                                                         │
│     ▼                                                         │
│   App re-renders authenticated                               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Mobile Login Flow

```
┌──────────────────────────────────────────────────────────────┐
│                   MOBILE LOGIN FLOW                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│   useAuth().login(email, password)                           │
│     │                                                         │
│     ▼                                                         │
│   AuthProvider calls login mutation with X-Platform: mobile  │
│     │                                                         │
│     ▼                                                         │
│   Backend validates, then:                                   │
│     Returns { user, accessToken, refreshToken }              │
│     (tokens IN response for mobile)                          │
│     │                                                         │
│     ▼                                                         │
│   AuthProvider:                                              │
│     1. Calls session.setTokens(tokens) → SecureStore         │
│     2. Sets user state                                       │
│     │                                                         │
│     ▼                                                         │
│   App re-renders authenticated                               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## Token Refresh Mechanism

### Web: Silent Cookie Refresh

```
┌──────────────────────────────────────────────────────────────┐
│                    WEB TOKEN REFRESH                          │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│   1. Access token expires (15 min)                           │
│                                                               │
│   2. Next API call returns 401                               │
│                                                               │
│   3. Apollo Link intercepts 401:                             │
│      - Calls POST /auth/refresh                              │
│      - Refresh token sent automatically (cookie)             │
│                                                               │
│   4. Backend validates refresh token:                        │
│      - If valid: rotate tokens, set new cookies              │
│      - If invalid: return 401, clear cookies                 │
│                                                               │
│   5. Apollo Link retries original request                    │
│                                                               │
│   6. If refresh fails: session.clearTokens() → logout        │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Mobile: Token Refresh with SecureStore

```
┌──────────────────────────────────────────────────────────────┐
│                  MOBILE TOKEN REFRESH                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│   1. Check token expiry before API call                      │
│                                                               │
│   2. If expiring: call refresh mutation with refreshToken    │
│      (token from SecureStore, sent in header)                │
│                                                               │
│   3. Backend returns new token pair                          │
│                                                               │
│   4. session.setTokens() → save to SecureStore               │
│                                                               │
│   5. Continue with original request                          │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Apollo Client Setup

```typescript
// packages/@expanse/auth/src/apollo/authLink.ts

const refreshLink = new TokenRefreshLink({
  isTokenValidOrUndefined: () => {
    // We can't check httpOnly cookie, so we track expiry time
    const expiresAt = localStorage.getItem('tokenExpiresAt');
    if (!expiresAt) return true;
    return Date.now() < parseInt(expiresAt) - 60000; // 1 min buffer
  },
  fetchAccessToken: async () => {
    const response = await fetch('/auth/refresh', {
      method: 'POST',
      credentials: 'include', // Send cookies
    });
    if (!response.ok) throw new Error('Refresh failed');
    return response.json();
  },
  handleFetch: (response) => {
    // Server sets new cookies, we just track expiry
    localStorage.setItem('tokenExpiresAt', response.expiresAt);
  },
  handleError: (err) => {
    // Refresh failed, force logout
    window.dispatchEvent(new CustomEvent('auth:logout'));
  },
});
```

---

## AuthProvider Implementation

The AuthProvider uses the SessionProvider internally for token management.

```typescript
// packages/@expanse/auth/src/providers/AuthProvider.tsx

export function AuthProvider({ children }: Props) {
  // Get platform-specific session management
  const session = useSession();
  
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [mfaPending, setMfaPending] = useState(false);

  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);
  const { refetch: fetchMe } = useQuery(ME_QUERY, { skip: true });

  // Initialize: fetch user if session says authenticated
  useEffect(() => {
    if (session.isLoading) return;
    
    if (session.isAuthenticated) {
      fetchMe().then(({ data }) => {
        if (data?.me) setUser(data.me);
      });
    }
  }, [session.isAuthenticated, session.isLoading, fetchMe]);

  // Login with error handling
  const login = useCallback(async (
    email: string, 
    password: string
  ): Promise<AuthResult> => {
    setError(null);
    try {
      const { data } = await loginMutation({
        variables: { input: { email, password } },
      });

      // MFA required?
      if (data?.login?.requiresMfa) {
        setMfaPending(true);
        return { success: false, requiresMfa: true };
      }

      // Email not verified?
      if (data?.login?.requiresEmailVerification) {
        return { 
          success: false, 
          requiresEmailVerification: true,
          error: { code: 'EMAIL_NOT_VERIFIED', message: 'Please verify your email' },
        };
      }

      // Success! Store tokens via session provider (platform-specific)
      if (data.login.accessToken) {
        // Mobile: tokens returned in response
        await session.setTokens({
          accessToken: data.login.accessToken,
          refreshToken: data.login.refreshToken,
        });
      } else {
        // Web: server set httpOnly cookies, just mark as authenticated
        await session.setTokens({ accessToken: '', refreshToken: '' });
      }
      
      setUser(data.login.user);
      setIsGuest(false);
      return { success: true };
    } catch (err) {
      const authError = parseAuthError(err);
      setError(authError);
      return { success: false, error: authError };
    }
  }, [loginMutation, session]);

  // Logout
  const logout = useCallback(async () => {
    try {
      await logoutMutation();
    } catch {
      // Ignore errors
    }
    await session.clearTokens();
    setUser(null);
    setIsGuest(false);
  }, [logoutMutation, session]);

  const value = useMemo(() => ({
    user,
    isAuthenticated: session.isAuthenticated,
    isLoading: session.isLoading,
    isGuest,
    error,
    mfaPending,
    login,
    logout,
    // ... other methods
  }), [user, session.isAuthenticated, session.isLoading, isGuest, error, mfaPending, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Error parser helper
function parseAuthError(err: unknown): AuthError {
  if (err instanceof ApolloError) {
    const gqlError = err.graphQLErrors[0];
    const code = gqlError?.extensions?.code as AuthErrorCode;
    
    switch (code) {
      case 'INVALID_CREDENTIALS':
        return { code, message: 'Invalid email or password' };
      case 'ACCOUNT_LOCKED':
        return { code, message: 'Account locked. Try again in 15 minutes.' };
      case 'EMAIL_NOT_VERIFIED':
        return { code, message: 'Please verify your email address' };
      case 'MFA_REQUIRED':
        return { code, message: 'MFA verification required' };
      case 'MFA_INVALID':
        return { code, message: 'Invalid verification code' };
      default:
        return { code: 'UNKNOWN', message: gqlError?.message || 'An error occurred' };
    }
  }
  
  if (err instanceof Error && err.message.includes('Network')) {
    return { code: 'NETWORK_ERROR', message: 'Network error. Check your connection.' };
  }
  
  return { code: 'UNKNOWN', message: 'An unexpected error occurred' };
}
```

---

## Package Boundaries

```
@expanse/auth (Generic, Reusable)
├── session/
│   ├── SessionContext.ts        → Session interface
│   ├── WebSessionProvider.tsx   → Browser (httpOnly cookies)
│   └── MobileSessionProvider.tsx → React Native (SecureStore)
├── providers/
│   └── AuthProvider.tsx         → User state + operations (uses session)
├── hooks/
│   ├── useAuth.ts               → Main hook (user, login, logout)
│   ├── useSession.ts            → Session hook (internal)
│   └── useHasRole.ts            → Role checking helper
├── guards/
│   ├── RequireAuth.tsx          → Protected routes
│   ├── RequireGuest.tsx         → Auth pages only
│   └── RequireRole.tsx          → Role-based access
├── components/
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   └── GoogleLoginButton.tsx
└── apollo/
    └── authLink.ts              → Token refresh link

@expanse/user (Profile UI Only)
├── components/
│   ├── UserAvatar.tsx
│   ├── UserMenu.tsx
│   └── ProfileForm.tsx
└── hooks/
    └── useUpdateProfile.ts

@expanse/consent (Separate Module)
├── providers/
│   └── ConsentProvider.tsx
├── components/
│   ├── ConsentDialog.tsx
│   └── AgeVerification.tsx
├── guards/
│   └── RequireConsent.tsx
└── hooks/
    └── useConsent.ts

@4eye/auth-edlink (Future - Education SSO)
├── strategies/
│   └── edlink.strategy.ts
└── components/
    └── EdLinkButton.tsx
```

**Note:** Session layer is platform-specific; AuthProvider is shared across platforms.

---

## Backend Implementation

### Auth Resolver (Server Sets Cookies)

```typescript
// apps/api/src/modules/auth/auth.resolver.ts

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private csrfService: CsrfService,
  ) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('input') input: LoginInput,
    @Context() ctx: GqlContext,
  ): Promise<LoginResponse> {
    const result = await this.authService.validateCredentials(
      input.email,
      input.password,
    );

    // Check if MFA is required
    if (result.user.mfaEnabled) {
      // Set temporary MFA session cookie
      ctx.res.cookie('mfa_session', result.mfaSessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 5 * 60 * 1000, // 5 minutes
      });
      return { requiresMfa: true };
    }

    // Check email verification
    if (!result.user.emailVerified) {
      return { 
        requiresEmailVerification: true,
        user: result.user,
      };
    }

    // Set auth cookies (httpOnly - JS cannot read)
    this.setAuthCookies(ctx.res, result.accessToken, result.refreshToken);

    // Set CSRF token (not httpOnly - JS CAN read for header)
    const csrfToken = this.csrfService.generateToken();
    ctx.res.cookie('csrf_token', csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { 
      user: result.user,
      expiresAt: result.expiresAt, // Frontend tracks expiry, not token
    };
  }

  @Mutation(() => LoginResponse)
  async verifyMfa(
    @Args('code') code: string,
    @Context() ctx: GqlContext,
  ): Promise<LoginResponse> {
    const mfaSession = ctx.req.cookies['mfa_session'];
    if (!mfaSession) {
      throw new UnauthorizedException('MFA session expired');
    }

    const result = await this.authService.verifyMfaCode(mfaSession, code);

    // Clear MFA session, set auth cookies
    ctx.res.clearCookie('mfa_session');
    this.setAuthCookies(ctx.res, result.accessToken, result.refreshToken);

    return { user: result.user, expiresAt: result.expiresAt };
  }

  @Mutation(() => Boolean)
  async logout(@Context() ctx: GqlContext): Promise<boolean> {
    // Revoke refresh token if exists
    const refreshToken = ctx.req.cookies['refreshToken'];
    if (refreshToken) {
      await this.authService.revokeRefreshToken(refreshToken);
    }

    // Clear all auth cookies
    ctx.res.clearCookie('accessToken');
    ctx.res.clearCookie('refreshToken');
    ctx.res.clearCookie('csrf_token');
    
    return true;
  }

  private setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/auth/refresh', // Only sent to refresh endpoint
    });
  }
}
```

### CSRF Guard

```typescript
// apps/api/src/modules/auth/guards/csrf.guard.ts

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    // Skip CSRF for GET requests
    if (req.method === 'GET') return true;

    // Skip for OAuth callbacks (no cookie yet)
    if (req.path.startsWith('/auth/') && req.path.includes('callback')) {
      return true;
    }

    const cookieToken = req.cookies['csrf_token'];
    const headerToken = req.headers['x-csrf-token'];

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
      throw new ForbiddenException('Invalid CSRF token');
    }

    return true;
  }
}
```

### Token Refresh Endpoint

```typescript
// apps/api/src/modules/auth/auth.controller.ts

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    
    if (!refreshToken) {
      // Clear any stale cookies and return 401
      res.clearCookie('accessToken');
      return res.status(401).json({ error: 'No refresh token' });
    }

    try {
      const result = await this.authService.refreshTokens(refreshToken);

      // Rotate tokens (old refresh token now invalid)
      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      });

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/auth/refresh',
      });

      return res.json({ expiresAt: result.expiresAt });
    } catch (error) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
  }
}
```

---

## MFA/2FA Architecture

### Supported Methods

| Method | Priority | Use Case |
|--------|----------|----------|
| TOTP (Authenticator App) | MVP | Standard 2FA |
| SMS | Post-MVP | Fallback, accessibility |
| Email OTP | Post-MVP | Fallback |
| Hardware Key (WebAuthn) | Future | High security |

### MFA Flow

```
┌──────────────────────────────────────────────────────────────┐
│                        MFA FLOW                               │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│   1. User enters email/password                              │
│                                                               │
│   2. Backend validates credentials                           │
│      └── If MFA enabled: return { requiresMfa: true }        │
│          Set mfa_session cookie (5 min expiry)               │
│                                                               │
│   3. Frontend shows MFA input screen                         │
│                                                               │
│   4. User enters 6-digit code from authenticator             │
│                                                               │
│   5. Backend validates code against user's TOTP secret       │
│      └── If valid: clear mfa_session, set auth cookies       │
│      └── If invalid: increment attempts, lock after 5        │
│                                                               │
│   6. User authenticated                                      │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### MFA Setup Flow

```typescript
// Frontend: Enable MFA
const { data } = await setupMfaMutation();
// Returns: { secret, qrCodeUrl, backupCodes }

// Show QR code for user to scan with authenticator app
<QRCode value={data.qrCodeUrl} />

// User enters the 6-digit code to confirm setup
await confirmMfaMutation({ code: userInput });
```

### Database Schema

```typescript
// Additional fields on User entity
@Entity()
export class User {
  // ... existing fields ...

  @Column({ default: false })
  mfaEnabled: boolean;

  @Column({ nullable: true })
  mfaSecret: string; // Encrypted TOTP secret

  @Column('simple-array', { nullable: true })
  mfaBackupCodes: string[]; // One-time use backup codes

  @Column({ nullable: true })
  mfaEnabledAt: Date;
}

// MFA attempt tracking
@Entity()
export class MfaAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  success: boolean;

  @Column()
  ipAddress: string;

  @CreateDateColumn()
  attemptedAt: Date;
}
```

---

## Email Verification

### Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    EMAIL VERIFICATION                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│   1. User signs up with email                                │
│                                                               │
│   2. Backend:                                                │
│      - Creates user with emailVerified: false                │
│      - Generates verification token (24h expiry)             │
│      - Sends verification email                              │
│                                                               │
│   3. User can login but sees limited access                  │
│      - Banner: "Please verify your email"                    │
│      - Some features restricted                              │
│                                                               │
│   4. User clicks link in email: /verify?token=xxx            │
│                                                               │
│   5. Backend validates token:                                │
│      - If valid: set emailVerified: true                     │
│      - If expired: offer to resend                           │
│                                                               │
│   6. User has full access                                    │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Backend Implementation

```typescript
// apps/api/src/modules/auth/auth.service.ts

async signup(input: SignupInput): Promise<SignupResult> {
  // Create user
  const user = await this.usersService.create({
    email: input.email,
    passwordHash: await bcrypt.hash(input.password, 12),
    name: input.name,
    emailVerified: false,
  });

  // Generate verification token
  const token = crypto.randomBytes(32).toString('hex');
  await this.verificationTokensRepo.save({
    userId: user.id,
    token: await bcrypt.hash(token, 10), // Hash stored token
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  // Send email
  await this.emailService.sendVerificationEmail(user.email, {
    name: user.name,
    verifyUrl: `${process.env.FRONTEND_URL}/verify?token=${token}&email=${user.email}`,
  });

  return { user };
}

async verifyEmail(email: string, token: string): Promise<void> {
  const user = await this.usersService.findByEmail(email);
  if (!user) throw new NotFoundException('User not found');

  const verification = await this.verificationTokensRepo.findOne({
    where: { userId: user.id, used: false },
    order: { createdAt: 'DESC' },
  });

  if (!verification) {
    throw new BadRequestException('No pending verification');
  }

  if (verification.expiresAt < new Date()) {
    throw new BadRequestException('Verification link expired');
  }

  const isValid = await bcrypt.compare(token, verification.token);
  if (!isValid) {
    throw new BadRequestException('Invalid verification token');
  }

  // Mark as verified
  await this.usersService.update(user.id, { emailVerified: true });
  verification.used = true;
  await this.verificationTokensRepo.save(verification);
}

async resendVerificationEmail(userId: string): Promise<void> {
  const user = await this.usersService.findById(userId);
  if (user.emailVerified) return;

  // Rate limit: max 3 per hour
  const recentCount = await this.verificationTokensRepo.count({
    where: {
      userId,
      createdAt: MoreThan(new Date(Date.now() - 60 * 60 * 1000)),
    },
  });

  if (recentCount >= 3) {
    throw new TooManyRequestsException('Too many verification emails');
  }

  // Generate new token and send
  // ... same as signup flow
}
```

---

## Token Storage Abstraction (Multi-Platform)

For mobile apps, we can't use httpOnly cookies. Abstract storage per platform.

```typescript
// packages/@expanse/auth/src/storage/TokenStorage.ts

export interface TokenStorage {
  getAccessToken(): Promise<string | null>;
  setAccessToken(token: string, expiresAt: number): Promise<void>;
  getRefreshToken(): Promise<string | null>;
  setRefreshToken(token: string): Promise<void>;
  clearTokens(): Promise<void>;
}

// Platform-specific implementations:

// Web: Server handles cookies, we just track expiry
export class WebTokenStorage implements TokenStorage {
  async getAccessToken(): Promise<string | null> {
    return null; // httpOnly, can't read
  }
  async setAccessToken(_token: string, expiresAt: number): Promise<void> {
    localStorage.setItem('tokenExpiresAt', String(expiresAt));
  }
  // ... etc
}

// React Native: Use secure storage
export class MobileTokenStorage implements TokenStorage {
  async getAccessToken(): Promise<string | null> {
    return await SecureStore.getItemAsync('accessToken');
  }
  async setAccessToken(token: string): Promise<void> {
    await SecureStore.setItemAsync('accessToken', token);
  }
  async getRefreshToken(): Promise<string | null> {
    return await SecureStore.getItemAsync('refreshToken');
  }
  // ... etc
}
```

### Mobile Auth Flow Difference

For mobile, tokens ARE returned to the app (since no cookies):

```typescript
// Mobile login mutation returns tokens
mutation LoginMobile($input: LoginInput!) {
  loginMobile(input: $input) {
    accessToken   # Returned for mobile
    refreshToken  # Returned for mobile
    user { id email name }
  }
}

// Backend checks platform and responds differently
@Mutation(() => LoginResponse)
async login(
  @Args('input') input: LoginInput,
  @Context() ctx: GqlContext,
): Promise<LoginResponse> {
  const isMobile = ctx.req.headers['x-platform'] === 'mobile';
  
  // ... validate credentials ...

  if (isMobile) {
    // Return tokens in response body for mobile
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user,
    };
  } else {
    // Web: set httpOnly cookies, don't return tokens
    this.setAuthCookies(ctx.res, result.accessToken, result.refreshToken);
    return { user: result.user, expiresAt: result.expiresAt };
  }
}
```

---

## Architectural Boundaries

Clear separation of concerns between packages:

### @expanse/auth (Reusable Core)

Everything that's generic authentication, reusable across any Expanse-based app:

| Feature | Included |
|---------|----------|
| JWT token management | ✅ Access, refresh, guest tokens |
| Auth types | ✅ Email/password, OAuth (Google, Apple) |
| Auth guards | ✅ RequireAuth, RequireGuest, RequireRole |
| Token validation & refresh | ✅ Validation, silent refresh |
| Cookie management | ✅ httpOnly, secure, sameSite |
| Session providers | ✅ WebSessionProvider, MobileSessionProvider |
| AuthProvider | ✅ User state, login/logout operations |
| ConsentProvider | ✅ Generic consent tracking |

### @4eye/features (App-Specific)

4eye-specific features that use auth but aren't reusable:

| Feature | Included |
|---------|----------|
| Room passcode validation | ✅ Join-by-link code validation |
| Room access control | ✅ Who can join which room |
| Guest → member conversion | ✅ Upgrade prompts |
| Room-specific permissions | ✅ Participant roles |
| Token issuance | ❌ Delegates to @expanse/auth |

### @4eye/core (Domain Extensions)

Custom auth extensions for specific use cases:

| Feature | Included |
|---------|----------|
| Custom Passport strategies | ✅ Org-specific SAML |
| Organization auth config | ✅ Per-org auth settings |
| Vertical-specific auth | ✅ Religion, education flows |
| Org membership verification | ✅ Organization guards |
| Core JWT logic | ❌ Uses @expanse/auth |

### @4eye/auth-edlink (Education SSO)

Separate package for EdLink integration:

| Feature | Included |
|---------|----------|
| EdLink OAuth strategy | ✅ Passport strategy |
| Roster sync | ✅ Students, teachers, classes |
| School-as-agent consent | ✅ COPPA exception handling |
| Grade passback | ✅ LTI integration |

### Integration Pattern

```typescript
// @4eye/features: Room passcode uses @expanse/auth for tokens
export class RoomAccessService {
  constructor(
    private authService: AuthService,  // From @expanse/auth
    private roomService: RoomService,
  ) {}

  async validateRoomCode(code: string, guestName: string): Promise<GuestToken> {
    // 1. Validate room code (app-specific logic)
    const room = await this.roomService.findByAccessCode(code);
    if (!room) throw new Error('Invalid room code');
    
    // 2. Issue guest token (delegates to @expanse/auth)
    return this.authService.issueGuestToken({
      name: guestName,
      scope: { roomId: room.id },
      expiresIn: '24h',
    });
  }
}
```

---

## Summary

| Aspect | Description |
|--------|-------------|
| **Main Hook** | `useAuth()` - gives you everything |
| **Session Layer** | Platform-specific (WebSessionProvider / MobileSessionProvider) |
| **Token Storage (Web)** | httpOnly cookies (server sets, JS can't access) |
| **Token Storage (Mobile)** | SecureStore/Keychain (app manages) |
| **CSRF Protection** | Double-submit cookie pattern (web only) |
| **Token Refresh (Web)** | Apollo Link intercepts 401 → silent refresh |
| **Token Refresh (Mobile)** | Direct token mutation → update SecureStore |
| **MFA** | TOTP (authenticator app), optional |
| **Email Verification** | Required before full access |
| **User State** | Lives in AuthProvider (uses session internally) |
| **Providers** | SessionProvider (platform) → AuthProvider → ConsentProvider |

**Decision:** Split-layer architecture for multi-platform support. Web uses httpOnly cookies (XSS protected), mobile uses SecureStore. AuthProvider is shared across platforms, only the session layer differs.
