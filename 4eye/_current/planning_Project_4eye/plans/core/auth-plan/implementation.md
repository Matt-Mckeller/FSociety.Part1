# Implementation Guide

## Implementation Order

The authentication system should be implemented in this order to build on dependencies:

```mermaid
flowchart TB
    subgraph Phase1["Phase 1: Foundation"]
        DB["Database Entities<br/><i>User, ConsentLog, etc.</i>"]
        BackendAuth["Backend Auth Module<br/><i>JWT, guards, resolvers</i>"]
        DB --> BackendAuth
    end

    subgraph Phase2A["Phase 2A: Core Frontend"]
        Session["SessionProvider<br/><i>Web or Mobile</i>"]
        AuthProv["AuthProvider<br/><i>User state, uses session</i>"]
        Guards["Route Guards<br/><i>RequireAuth, etc.</i>"]
        Forms["Auth Forms<br/><i>Login, Signup</i>"]
        
        Session --> AuthProv
        AuthProv --> Guards
        AuthProv --> Forms
    end

    subgraph Phase2B["Phase 2B: OAuth + Consent"]
        GoogleStrat["Google Strategy<br/><i>Passport</i>"]
        ConsentProv["ConsentProvider"]
        ConsentComp["Consent Components<br/><i>Dialog, AgeGate</i>"]
        OAuthBtn["OAuth Buttons"]
        
        GoogleStrat --> OAuthBtn
        ConsentProv --> ConsentComp
    end

    subgraph Phase2C["Phase 2C: Compliance"]
        ParentalFlow["Parental Consent<br/><i>COPPA</i>"]
        PassReset["Password Reset"]
        DataExport["Data Export<br/><i>GDPR</i>"]
    end

    Phase1 --> Phase2A --> Phase2B --> Phase2C

    style Phase1 fill:#e3f2fd,stroke:#1976d2
    style Phase2A fill:#f3e5f5,stroke:#9c27b0
    style Phase2B fill:#e8f5e9,stroke:#4caf50
    style Phase2C fill:#fff3e0,stroke:#ff9800
```

---

## Phase 1: Foundation

### 1.1 Database Entities

Create these TypeORM entities in `apps/api/src/modules/`:

```bash
apps/api/src/modules/
├── users/
│   └── entities/
│       └── user.entity.ts
├── auth/
│   └── entities/
│       ├── refresh-token.entity.ts
│       └── password-reset-token.entity.ts
└── consent/
    └── entities/
        ├── consent-log.entity.ts
        └── parental-consent.entity.ts
```

### 1.2 Backend Auth Module

```bash
apps/api/src/modules/auth/
├── auth.module.ts
├── auth.service.ts
├── auth.resolver.ts
├── strategies/
│   └── jwt.strategy.ts
├── guards/
│   ├── jwt-auth.guard.ts
│   ├── gql-auth.guard.ts
│   └── roles.guard.ts
├── decorators/
│   ├── current-user.decorator.ts
│   ├── public.decorator.ts
│   └── roles.decorator.ts
├── dto/
│   ├── login.input.ts
│   └── signup.input.ts
└── types/
    └── auth.types.ts
```

---

## Phase 2A: Core Frontend

### 2A.1 Token Storage (Web Only)

Web uses httpOnly cookies set by the server. The frontend cannot access tokens directly.
See [architecture.md](./architecture.md) for full details.

### 2A.2 Session Layer

Platform-specific session providers handle token storage abstraction:

```typescript
// packages/@expanse/auth/src/session/SessionContext.ts

interface SessionProvider {
  isAuthenticated: boolean;
  isLoading: boolean;
  onLoginResponse: (response: { user: User }) => void;
  onLogout: () => void;
  getAuthHeaders: () => Record<string, string>; // Mobile only
}
```

**WebSessionProvider** - Uses httpOnly cookies (tokens managed by server):
```typescript
// packages/@expanse/auth/src/session/WebSessionProvider.tsx

export function WebSessionProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth status on mount (call /me endpoint)
  useEffect(() => {
    checkAuthStatus().then(result => {
      setIsAuthenticated(result.authenticated);
      setIsLoading(false);
    });
  }, []);

  const onLoginResponse = useCallback((response: { user: User }) => {
    setIsAuthenticated(true); // Server already set cookies
  }, []);

  const onLogout = useCallback(() => {
    setIsAuthenticated(false); // Server will clear cookies
  }, []);

  // Web doesn't need auth headers - cookies sent automatically
  const getAuthHeaders = useCallback(() => ({}), []);

  return (
    <SessionContext.Provider value={{ isAuthenticated, isLoading, onLoginResponse, onLogout, getAuthHeaders }}>
      {children}
    </SessionContext.Provider>
  );
}
```

**MobileSessionProvider** - Uses SecureStore (tokens managed by app):
```typescript
// packages/@expanse/auth/src/session/MobileSessionProvider.tsx

export function MobileSessionProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<TokenPair | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load tokens from SecureStore on mount
  useEffect(() => {
    SecureStore.getItemAsync('auth_tokens').then(stored => {
      if (stored) setTokens(JSON.parse(stored));
      setIsLoading(false);
    });
  }, []);

  const onLoginResponse = useCallback(async (response: { user: User; accessToken: string; refreshToken: string }) => {
    const tokenPair = { accessToken: response.accessToken, refreshToken: response.refreshToken };
    await SecureStore.setItemAsync('auth_tokens', JSON.stringify(tokenPair));
    setTokens(tokenPair);
  }, []);

  const onLogout = useCallback(async () => {
    await SecureStore.deleteItemAsync('auth_tokens');
    setTokens(null);
  }, []);

  const getAuthHeaders = useCallback(() => 
    tokens ? { 'Authorization': `Bearer ${tokens.accessToken}` } : {}, 
  [tokens]);

  return (
    <SessionContext.Provider value={{ isAuthenticated: !!tokens, isLoading, onLoginResponse, onLogout, getAuthHeaders }}>
      {children}
    </SessionContext.Provider>
  );
}
```

### 2A.3 AuthProvider

Uses session layer internally - shared across platforms:

```typescript
// packages/@expanse/auth/src/providers/AuthProvider.tsx

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [signupMutation] = useMutation(SIGNUP_MUTATION);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);

  // Fetch user when authenticated
  useEffect(() => {
    if (session.isAuthenticated) {
      fetchCurrentUser().then(setUser);
    }
  }, [session.isAuthenticated]);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await loginMutation({
      variables: { input: { email, password } },
    });
    if (data?.login) {
      session.onLoginResponse(data.login);
      setUser(data.login.user);
    }
  }, [loginMutation, session]);

  const signup = useCallback(async (input: SignupInput) => {
    const { data } = await signupMutation({ variables: { input } });
    if (data?.signup) {
      session.onLoginResponse(data.signup);
      setUser(data.signup.user);
    }
  }, [signupMutation, session]);

  const logout = useCallback(async () => {
    await logoutMutation().catch(() => {});
    session.onLogout();
    setUser(null);
    setIsGuest(false);
  }, [logoutMutation, session]);

  const value = useMemo(() => ({
    isAuthenticated: session.isAuthenticated,
    user,
    loading: session.isLoading,
    isGuest,
    login,
    signup,
    logout,
    loginWithGoogle: () => { window.location.href = `${API_URL}/auth/google`; },
    continueAsGuest: () => setIsGuest(true),
  }), [session, user, isGuest, login, signup, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

### 2A.4 Route Guards

```typescript
// packages/@expanse/auth/src/guards/RequireAuth.tsx

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, isGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated && !isGuest) {
      router.push('/login?returnUrl=' + encodeURIComponent(window.location.pathname));
    }
  }, [isAuthenticated, loading, isGuest, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated && !isGuest) {
    return null;
  }

  return <>{children}</>;
}
```

---

## Phase 2B: OAuth + Consent

### 2B.1 Google OAuth Strategy

```typescript
// apps/api/src/modules/auth/strategies/google.strategy.ts

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = await this.authService.findOrCreateOAuthUser({
      provider: 'google',
      providerId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      avatarUrl: profile.photos[0]?.value,
    });
    return user;
  }
}
```

### 2B.2 OAuth Controller

```typescript
// apps/api/src/modules/auth/auth.controller.ts

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.generateTokens(req.user);
    
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Allow redirect from Google
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.redirect(process.env.FRONTEND_URL + '/dashboard');
  }
}
```

### 2B.3 ConsentProvider

Documented in [consent-compliance.md](./consent-compliance.md).

---

## Phase 2C: Compliance

### 2C.1 Password Reset

```typescript
// Backend
async requestPasswordReset(email: string): Promise<void> {
  const user = await this.usersService.findByEmail(email);
  if (!user) return; // Don't reveal if email exists

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await this.resetTokensRepo.save({ token, userId: user.id, expiresAt });
  await this.emailService.sendPasswordReset(email, token);
}

async resetPassword(token: string, newPassword: string): Promise<void> {
  const resetToken = await this.resetTokensRepo.findOne({
    where: { token, used: false },
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    throw new BadRequestException('Invalid or expired token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await this.usersService.updatePassword(resetToken.userId, hashedPassword);
  
  resetToken.used = true;
  await this.resetTokensRepo.save(resetToken);
}
```

### 2C.2 Parental Consent (COPPA)

```typescript
// Backend
async requestParentalConsent(childUserId: string, parentEmail: string): Promise<void> {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours

  await this.parentalConsentRepo.save({
    childUserId,
    parentEmail,
    verificationToken: token,
    expiresAt,
  });

  await this.emailService.sendParentalConsentRequest(parentEmail, token);
}

async verifyParentalConsent(token: string): Promise<void> {
  const consent = await this.parentalConsentRepo.findOne({
    where: { verificationToken: token, isVerified: false },
  });

  if (!consent || consent.expiresAt < new Date()) {
    throw new BadRequestException('Invalid or expired consent token');
  }

  consent.isVerified = true;
  consent.verifiedAt = new Date();
  await this.parentalConsentRepo.save(consent);

  // Activate child's account
  await this.usersService.update(consent.childUserId, {
    hasParentalConsent: true,
  });
}
```

---

## Testing Strategy

### Unit Tests

```typescript
// packages/@expanse/auth/__tests__/AuthProvider.test.tsx

describe('AuthProvider', () => {
  it('should login successfully', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper([loginSuccessMock]),
    });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should handle login failure', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper([loginFailureMock]),
    });

    await expect(
      act(async () => {
        await result.current.login('test@example.com', 'wrong');
      })
    ).rejects.toThrow();

    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

### E2E Tests

```typescript
// apps/4eye-web/__tests__/e2e/auth.spec.ts

test('full signup flow with consent', async ({ page }) => {
  await page.goto('/signup');
  
  // Fill form
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'SecurePass123');
  await page.fill('[name="name"]', 'Test User');
  
  // Age verification
  await page.fill('[name="birthDate"]', '1990-01-01');
  await page.click('button:has-text("Continue")');
  
  // Consent
  await page.check('[name="tos"]');
  await page.check('[name="privacy"]');
  await page.click('button:has-text("Create Account")');
  
  // Verify redirect
  await expect(page).toHaveURL('/dashboard');
});
```

---

## Environment Variables

```bash
# .env.local

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

# Frontend
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/4eye
```
