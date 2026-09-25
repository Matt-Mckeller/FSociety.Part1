# Authentication System

Complete authentication architecture for 4eye, including session management, guards, guest mode, and security.

---

## System Overview

### **Two-Layer Authentication**

**AuthSession Layer** - JWT and token management
- JWT storage (localStorage + cookies)
- Token parsing and validation
- Session persistence
- Logout operations

**Auth Layer** - User state and authentication logic
- User data management
- Login/signup mutations
- Authentication guards
- Guest mode support

**Why separate:** Clean separation of concerns - session management vs. user data/auth logic.

---

## Architecture

### **Provider Composition**

```typescript
<ApplicationProvider>
  <AuthSessionProvider>      {/* JWT management */}
    <UserProvider>            {/* User data */}
      <AuthProvider>          {/* Auth logic + guards */}
        <App />
      </AuthProvider>
    </UserProvider>
  </AuthSessionProvider>
</ApplicationProvider>
```

**Why this order:**
1. AuthSession provides JWT to UserProvider
2. UserProvider fetches user data using JWT
3. AuthProvider combines both for auth guards
4. App has access to all auth functionality

---

## AuthSession Layer (@expanse/auth)

### **Purpose**

Manage JWT tokens and session persistence.

### **Implementation**

```typescript
// packages/@expanse/auth/src/context/AuthSessionProvider.tsx

interface AuthSessionContextType {
  jwtToken: string | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  setJwtToken: (token: string) => void;
}

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const [jwtToken, setJwtTokenState] = useState<string | null>(null);
  const [logoutMutation] = useLogoutMutation();

  // Load JWT on mount from localStorage + cookies
  useEffect(() => {
    const token = localStorage.getItem('jwtToken') || getCookie('jwtToken');
    if (token) {
      setJwtTokenState(token);
    }
  }, []);

  // Save JWT to localStorage + cookies
  const setJwtToken = useCallback((token: string) => {
    localStorage.setItem('jwtToken', token);
    setCookie('jwtToken', token, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    setJwtTokenState(token);
  }, []);

  // Logout - clear tokens and call API
  const logout = useCallback(async () => {
    await logoutMutation();
    localStorage.removeItem('jwtToken');
    deleteCookie('jwtToken');
    setJwtTokenState(null);
  }, [logoutMutation]);

  const isAuthenticated = !!jwtToken;

  return (
    <AuthSessionContext.Provider value={{ jwtToken, isAuthenticated, logout, setJwtToken }}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext);
  if (!context) {
    throw new Error('useAuthSession must be used within AuthSessionProvider');
  }
  return context;
}
```

### **Key Features**

**Dual Storage:**
- localStorage - Client-side persistence
- Cookies - Server-side access (SSR, API calls)

**Token Parsing:**
```typescript
import { jwtDecode } from 'jwt-decode';

function parseJWT(token: string) {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch {
    return null;
  }
}
```

**Security:**
- Secure cookies with httpOnly + secure flags (XSS + MITM protection)
- Token expiration checking with automatic refresh
- Automatic logout on invalid/expired tokens

---

## User Layer (@expanse/user)

### **Purpose**

Manage user data and profile.

### **Implementation**

```typescript
// packages/@expanse/user/src/context/UserProvider.tsx

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  refetchUser: () => Promise<void>;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { jwtToken, isAuthenticated } = useAuthSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data when JWT changes
  const { data, loading: queryLoading, error, refetch } = useQuery(ME_QUERY, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    } else {
      setUser(null);
    }
    setLoading(queryLoading);
  }, [data, queryLoading]);

  const refetchUser = useCallback(async () => {
    const result = await refetch();
    if (result.data?.me) {
      setUser(result.data.me);
    }
  }, [refetch]);

  return (
    <UserContext.Provider value={{ user, loading, error, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
```

### **ME_QUERY**

```typescript
const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
      role
      avatarUrl
      createdAt
    }
  }
`;
```

---

## Auth Layer (@expanse/auth)

### **Purpose**

High-level auth logic combining AuthSession + User for authentication guards and operations.

### **Implementation**

```typescript
// packages/@expanse/auth/src/context/AuthProvider.tsx

interface AuthContextType {
  // Combined state
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;

  // Operations
  login: (email: string, password: string) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
  
  // Guest mode
  continueAsGuest: () => void;
  isGuest: boolean;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { jwtToken, isAuthenticated, setJwtToken, logout: sessionLogout } = useAuthSession();
  const { user, loading, refetchUser } = useUser();
  const [isGuest, setIsGuest] = useState(false);

  const [loginMutation] = useLoginMutation();
  const [signupMutation] = useSignupMutation();

  // Login
  const login = useCallback(async (email: string, password: string) => {
    const result = await loginMutation({ variables: { email, password } });
    if (result.data?.login?.token) {
      setJwtToken(result.data.login.token);
      await refetchUser();
      setIsGuest(false);
    }
  }, [loginMutation, setJwtToken, refetchUser]);

  // Signup
  const signup = useCallback(async (input: SignupInput) => {
    const result = await signupMutation({ variables: { input } });
    if (result.data?.signup?.token) {
      setJwtToken(result.data.signup.token);
      await refetchUser();
      setIsGuest(false);
    }
  }, [signupMutation, setJwtToken, refetchUser]);

  // Logout
  const logout = useCallback(async () => {
    await sessionLogout();
    setIsGuest(false);
  }, [sessionLogout]);

  // Guest mode
  const continueAsGuest = useCallback(() => {
    setIsGuest(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        signup,
        logout,
        continueAsGuest,
        isGuest,
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

## Guest Mode

### **Purpose**

Allow users to experience app without authentication (limited features).

### **Implementation**

```typescript
// packages/@expanse/auth/src/components/GuestModeButton.tsx

export function GuestModeButton() {
  const { continueAsGuest } = useAuth();

  return (
    <Button variant="text" onClick={continueAsGuest}>
      Continue as Guest
    </Button>
  );
}
```

### **Usage in App**

```typescript
// apps/4eye-web/app/(auth)/login/page.tsx

export default function LoginPage() {
  return (
    <Box>
      <LoginForm />
      <Divider>or</Divider>
      <GuestModeButton />
    </Box>
  );
}
```

### **Guest Mode Restrictions**

**Allowed:**
- Join public rooms as guest
- View live sessions (read-only)
- Browse public content

**Not Allowed:**
- Create rooms
- Save progress
- Access dashboard
- Full AI features

**Implementation:**
```typescript
// In feature components
function CreateRoomButton() {
  const { isGuest, user } = useAuth();

  if (isGuest || !user) {
    return <Button disabled>Login to Create Rooms</Button>;
  }

  return <Button onClick={handleCreate}>Create Room</Button>;
}
```

---

## Authentication Guards

### **RequireAuth Guard**

**Purpose:** Protect authenticated-only routes.

```typescript
// packages/@expanse/auth/src/guards/RequireAuth.tsx

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, isGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated && !isGuest) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, isGuest, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated && !isGuest) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
```

**Usage:**
```typescript
// apps/4eye-web/app/(app)/dashboard/page.tsx

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  );
}
```

### **RequireGuest Guard**

**Purpose:** Redirect authenticated users away from login/signup pages.

```typescript
// packages/@expanse/auth/src/guards/RequireGuest.tsx

export function RequireGuest({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
```

**Usage:**
```typescript
// apps/4eye-web/app/(auth)/login/page.tsx

export default function LoginPage() {
  return (
    <RequireGuest>
      <LoginForm />
    </RequireGuest>
  );
}
```

### **RequireRole Guard**

**Purpose:** Protect role-specific routes (admin, host, etc.).

```typescript
// packages/@expanse/auth/src/guards/RequireRole.tsx

export function RequireRole({ 
  role, 
  children 
}: { 
  role: UserRole | UserRole[]; 
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const roles = Array.isArray(role) ? role : [role];
  const hasRole = user && roles.includes(user.role);

  useEffect(() => {
    if (!loading && !hasRole) {
      router.push('/dashboard'); // Or 403 page
    }
  }, [hasRole, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!hasRole) {
    return null;
  }

  return <>{children}</>;
}
```

**Usage:**
```typescript
// apps/4eye-web/app/(app)/admin/page.tsx

export default function AdminPage() {
  return (
    <RequireRole role={UserRole.ADMIN}>
      <AdminDashboard />
    </RequireRole>
  );
}

// Or multiple roles
export default function HostPage() {
  return (
    <RequireRole role={[UserRole.ADMIN, UserRole.HOST]}>
      <HostDashboard />
    </RequireRole>
  );
}
```

---

## Auth Components

### **LoginForm**

```typescript
// packages/@expanse/auth/src/components/LoginForm.tsx

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      // Will redirect via provider
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" variant="contained" disabled={loading} fullWidth>
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </Box>
  );
}
```

### **SignupForm**

```typescript
// packages/@expanse/auth/src/components/SignupForm.tsx

export function SignupForm() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState<SignupInput>({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signup(formData);
      // Will redirect via provider
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        fullWidth
      />
      <TextField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        fullWidth
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" variant="contained" disabled={loading} fullWidth>
        {loading ? <CircularProgress size={24} /> : 'Create Account'}
      </Button>
    </Box>
  );
}
```

### **AuthModal**

```typescript
// packages/@expanse/auth/src/components/AuthModal.tsx

export function AuthModal({ 
  open, 
  onClose, 
  defaultMode = 'login' 
}: { 
  open: boolean; 
  onClose: () => void; 
  defaultMode?: 'login' | 'signup';
}) {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === 'login' ? 'Login' : 'Create Account'}
      </DialogTitle>
      <DialogContent>
        {mode === 'login' ? <LoginForm /> : <SignupForm />}
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button 
            variant="text" 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Login'}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }}>or</Divider>

        <GuestModeButton />
      </DialogContent>
    </Dialog>
  );
}
```

---

## Backend Integration (NestJS)

### **JWT Strategy**

```typescript
// apps/api/src/modules/auth/strategies/jwt.strategy.ts

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { 
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}
```

### **Auth Guard**

```typescript
// apps/api/src/common/guards/jwt-auth.guard.ts

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

### **Role Guard**

```typescript
// apps/api/src/common/guards/roles.guard.ts

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
```

### **Resolver Usage**

```typescript
// apps/api/src/modules/rooms/rooms.resolver.ts

@Resolver()
export class RoomsResolver {
  @UseGuards(JwtAuthGuard)
  @Query(() => [Room])
  async myRooms(@CurrentUser() user: User) {
    return this.roomsService.findByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.HOST, UserRole.ADMIN)
  @Mutation(() => Room)
  async createRoom(@Args('input') input: CreateRoomInput, @CurrentUser() user: User) {
    return this.roomsService.create(input, user);
  }
}
```

---

## OAuth / Social Authentication

### **Why OAuth is Required**

**Business Requirements:**
- ✅ **Phase 2 Requirement:** Google OAuth implementation is required (not optional)
- ✅ **User Expectations:** Education and professional users expect social login
- ✅ **Conversion Optimization:** Lower friction signup increases conversion rates

**Benefits:**
- Lower friction (no password to remember)
- Higher conversion rates (one-click signup)
- Trust (users trust "Sign in with Google")
- Better data quality (verified emails, profile photos)

### **Supported Providers**

**Phase 2 (Required):**
- ✅ **Google OAuth** — Required for Phase 2, universal, trusted integration
- ✅ **Email/Password** — Always maintain fallback option

**Future Phases:**
- Apple (required if launching iOS native app)
- Microsoft (enterprise/education vertical)
- LinkedIn (professional vertical)

### **Backend: OAuth Strategies**

**Google OAuth Strategy:**

```typescript
// apps/api/src/modules/auth/strategies/google.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, displayName, photos } = profile;
    
    // Find or create user
    const user = await this.authService.findOrCreateOAuthUser({
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: displayName,
      avatarUrl: photos[0]?.value,
    });

    done(null, user);
  }
}
```

**OAuth Controller (REST endpoints for OAuth flow):**

```typescript
// apps/api/src/modules/auth/auth.controller.ts

import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Initiate Google OAuth flow
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Redirects to Google's OAuth consent screen
  }

  // Google OAuth callback
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    // Generate JWT tokens
    const { accessToken, refreshToken } = await this.authService.login(req.user);
    
    // Set secure cookies with httpOnly + secure + sameSite flags
    res.cookie('accessToken', accessToken, {
      httpOnly: true,  // XSS protection: JavaScript cannot access
      secure: process.env.NODE_ENV === 'production',  // HTTPS only
      sameSite: 'strict',  // CSRF protection
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,  // XSS protection
      secure: process.env.NODE_ENV === 'production',  // HTTPS only
      sameSite: 'strict',  // CSRF protection
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Redirect to frontend
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
}
```

**AuthService: Find or Create OAuth User:**

```typescript
// apps/api/src/modules/auth/auth.service.ts

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findOrCreateOAuthUser(data: {
    provider: string;
    providerId: string;
    email: string;
    name: string;
    avatarUrl?: string;
  }): Promise<User> {
    // Check if user exists by OAuth provider ID
    let user = await this.usersRepo.findOne({
      where: { oauthProvider: data.provider, oauthProviderId: data.providerId },
    });

    if (user) {
      // Update user data (in case name/avatar changed)
      user.name = data.name;
      user.avatarUrl = data.avatarUrl;
      return this.usersRepo.save(user);
    }

    // Check if user exists by email (link accounts)
    user = await this.usersRepo.findOne({ where: { email: data.email } });

    if (user) {
      // Link OAuth account to existing user
      user.oauthProvider = data.provider;
      user.oauthProviderId = data.providerId;
      user.emailVerified = true; // OAuth providers verify emails
      user.avatarUrl = data.avatarUrl || user.avatarUrl;
      return this.usersRepo.save(user);
    }

    // Create new user
    user = this.usersRepo.create({
      email: data.email,
      name: data.name,
      avatarUrl: data.avatarUrl,
      oauthProvider: data.provider,
      oauthProviderId: data.providerId,
      emailVerified: true,
      role: UserRole.MEMBER,
    });

    return this.usersRepo.save(user);
  }
}
```

**User Entity with OAuth Fields:**

```typescript
// apps/api/src/modules/users/entities/user.entity.ts

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  passwordHash: string; // Nullable for OAuth-only users

  @Column()
  name: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MEMBER })
  role: UserRole;

  // OAuth fields
  @Column({ nullable: true })
  oauthProvider: string; // 'google', 'apple', null for email/password

  @Column({ nullable: true })
  oauthProviderId: string; // Provider's user ID

  @Column({ default: false })
  emailVerified: boolean; // Auto-true for OAuth

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### **Frontend: OAuth Buttons**

**Google Login Button:**

```typescript
// packages/@expanse/auth/src/components/GoogleLoginButton.tsx

import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    // Redirect to backend OAuth endpoint
    // Backend will initiate OAuth flow and handle callback
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <Button
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={handleGoogleLogin}
      fullWidth
      sx={{
        textTransform: 'none',
        fontWeight: 500,
        borderColor: 'divider',
        color: 'text.primary',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'action.hover',
        },
      }}
    >
      Continue with Google
    </Button>
  );
}
```

**Updated AuthModal with OAuth:**

```typescript
// packages/@expanse/auth/src/components/AuthModal.tsx

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
      </DialogTitle>
      <DialogContent>
        {/* OAuth Buttons First (higher conversion) */}
        <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <GoogleLoginButton />
          {/* Future: <AppleLoginButton />, <MicrosoftLoginButton /> */}
        </Box>

        <Divider sx={{ my: 2 }}>or</Divider>

        {/* Email/Password Form */}
        {mode === 'login' ? <LoginForm /> : <SignupForm />}
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button 
            variant="text" 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Login'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
```

### **Environment Variables**

```bash
# .env.local (Backend)

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

# Frontend URL for redirects
FRONTEND_URL=http://localhost:3000
```

**Get Google OAuth Credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable "Google+ API"
3. Credentials → Create OAuth 2.0 Client ID
4. Authorized redirect URIs: `http://localhost:3001/auth/google/callback`, `https://yourdomain.com/auth/google/callback`

---

## Consent Tracking

### **Why Consent Tracking is Required**

**Legal Requirements (GDPR, CCPA, Privacy Laws):**
- ✅ **Required:** Users must explicitly accept Terms of Service and Privacy Policy
- ✅ **Required:** Log acceptance with timestamp, IP address, document version
- ✅ **Required:** Allow users to view consent history
- ✅ **Required:** Re-prompt when documents are updated

**Compliance Benefits:**
- Users must explicitly accept Terms of Service and Privacy Policy
- Log acceptance with timestamp, IP address, document version
- Allow users to view consent history
- Re-prompt when documents are updated

### **Consent Log Entity**

```typescript
// apps/api/src/modules/consent/entities/consent-log.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ConsentType {
  TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
}

@Entity()
export class ConsentLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'enum', enum: ConsentType })
  type: ConsentType;

  @Column()
  version: string; // e.g., "2026-03-26" or "v1.2"

  @Column()
  documentUrl: string; // Link to the accepted document

  @CreateDateColumn()
  acceptedAt: Date;

  @Column()
  ipAddress: string;

  @Column()
  userAgent: string;

  @Column({ nullable: true })
  locale: string; // e.g., "en-US"
}
```

### **Consent Service**

```typescript
// apps/api/src/modules/consent/consent.service.ts

@Injectable()
export class ConsentService {
  constructor(
    @InjectRepository(ConsentLog) private consentsRepo: Repository<ConsentLog>,
  ) {}

  async logConsent(data: {
    userId: string;
    type: ConsentType;
    version: string;
    documentUrl: string;
    ipAddress: string;
    userAgent: string;
    locale?: string;
  }): Promise<ConsentLog> {
    const consent = this.consentsRepo.create(data);
    return this.consentsRepo.save(consent);
  }

  async hasAcceptedVersion(
    userId: string,
    type: ConsentType,
    version: string,
  ): Promise<boolean> {
    const consent = await this.consentsRepo.findOne({
      where: { userId, type, version },
    });
    return !!consent;
  }

  async getUserConsents(userId: string): Promise<ConsentLog[]> {
    return this.consentsRepo.find({
      where: { userId },
      order: { acceptedAt: 'DESC' },
    });
  }
}
```

### **GraphQL Mutations**

```typescript
// apps/api/src/modules/consent/consent.resolver.ts

@Resolver()
export class ConsentResolver {
  constructor(private consentService: ConsentService) {}

  @Mutation(() => ConsentLog)
  async acceptConsent(
    @Args('type', { type: () => ConsentType }) type: ConsentType,
    @Args('version') version: string,
    @Args('documentUrl') documentUrl: string,
    @CurrentUser() user: User,
    @Context() context: any,
  ) {
    const ipAddress = context.req.ip;
    const userAgent = context.req.headers['user-agent'];

    return this.consentService.logConsent({
      userId: user.id,
      type,
      version,
      documentUrl,
      ipAddress,
      userAgent,
    });
  }

  @Query(() => [ConsentLog])
  async myConsents(@CurrentUser() user: User) {
    return this.consentService.getUserConsents(user.id);
  }
}
```

### **Frontend: Consent Tracking**

**SignupForm with Consent:**

```typescript
// packages/@expanse/auth/src/components/SignupForm.tsx

export function SignupForm() {
  const { signup } = useAuth();
  const [tosAccepted, setTosAccepted] = useState(false);
  const [ppAccepted, setPpAccepted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!tosAccepted || !ppAccepted) {
      alert('Please accept Terms of Service and Privacy Policy');
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    await signup({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
      consents: [
        { type: 'TERMS_OF_SERVICE', version: '2026-03-26' },
        { type: 'PRIVACY_POLICY', version: '2026-03-26' },
      ],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="name" label="Name" required fullWidth />
      <TextField name="email" label="Email" type="email" required fullWidth />
      <TextField name="password" label="Password" type="password" required fullWidth />

      <FormGroup sx={{ mt: 2 }}>
        <FormControlLabel
          control={<Checkbox checked={tosAccepted} onChange={(e) => setTosAccepted(e.target.checked)} />}
          label={
            <Box>
              I accept the{' '}
              <Link href="/terms" target="_blank">Terms of Service</Link>
            </Box>
          }
        />
        <FormControlLabel
          control={<Checkbox checked={ppAccepted} onChange={(e) => setPpAccepted(e.target.checked)} />}
          label={
            <Box>
              I accept the{' '}
              <Link href="/privacy" target="_blank">Privacy Policy</Link>
            </Box>
          }
        />
      </FormGroup>

      <Button type="submit" variant="contained" fullWidth disabled={!tosAccepted || !ppAccepted}>
        Sign Up
      </Button>
    </form>
  );
}
```

**RequireConsent Guard:**

```typescript
// packages/@expanse/auth/src/guards/RequireConsent.tsx

export function RequireConsent({ 
  children,
  type,
  currentVersion,
}: { 
  children: ReactNode;
  type: 'TERMS_OF_SERVICE' | 'PRIVACY_POLICY';
  currentVersion: string;
}) {
  const { user } = useUser();
  const [hasAccepted, setHasAccepted] = useState<boolean | null>(null);
  const [checkConsent] = useMutation(CHECK_CONSENT_QUERY);

  useEffect(() => {
    if (user) {
      checkConsent({ variables: { type, version: currentVersion } })
        .then(res => setHasAccepted(res.data.hasAcceptedConsent));
    }
  }, [user, type, currentVersion]);

  if (hasAccepted === null) return <div>Loading...</div>;
  if (!hasAccepted) return <ConsentPrompt type={type} version={currentVersion} />;

  return <>{children}</>;
}
```

---

## Password Reset

### **Password Reset Flow**

1. User requests password reset (enters email)
2. Backend generates one-time token (1-hour expiry)
3. Backend sends email with reset link
4. User clicks link, submits new password
5. Backend validates token, updates password, invalidates token

### **PasswordResetToken Entity**

```typescript
// apps/api/src/modules/auth/entities/password-reset-token.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class PasswordResetToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string; // Random UUID or crypto.randomBytes(32).toString('hex')

  @Column()
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  expiresAt: Date; // Current time + 1 hour

  @Column({ default: false })
  used: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
```

### **Password Reset Service**

```typescript
// apps/api/src/modules/auth/auth.service.ts

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(PasswordResetToken) private resetTokensRepo: Repository<PasswordResetToken>,
    private emailService: EmailService,
  ) {}

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      // Don't reveal if email exists (security)
      return;
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.resetTokensRepo.save({
      token,
      userId: user.id,
      expiresAt,
    });

    // Send email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.emailService.sendPasswordResetEmail(user.email, resetLink);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetToken = await this.resetTokensRepo.findOne({
      where: { token, used: false },
      relations: ['user'],
    });

    if (!resetToken) {
      throw new Error('Invalid or expired token');
    }

    if (resetToken.expiresAt < new Date()) {
      throw new Error('Token expired');
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    resetToken.user.passwordHash = hashedPassword;
    await this.usersRepo.save(resetToken.user);

    // Mark token as used
    resetToken.used = true;
    await this.resetTokensRepo.save(resetToken);
  }
}
```

### **GraphQL Mutations**

```typescript
// apps/api/src/modules/auth/auth.resolver.ts

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Boolean)
  async requestPasswordReset(@Args('email') email: string) {
    await this.authService.requestPasswordReset(email);
    return true; // Always return true (don't reveal if email exists)
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string,
  ) {
    await this.authService.resetPassword(token, newPassword);
    return true;
  }
}
```

### **Frontend: Password Reset**

**Request Reset Form:**

```typescript
// packages/@expanse/auth/src/components/RequestPasswordResetForm.tsx

export function RequestPasswordResetForm() {
  const [requestReset] = useMutation(REQUEST_PASSWORD_RESET);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;

    await requestReset({ variables: { email } });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Alert severity="success">
        If an account exists with that email, you will receive a password reset link.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        label="Email"
        type="email"
        required
        fullWidth
        helperText="Enter your email to receive a password reset link"
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Send Reset Link
      </Button>
    </form>
  );
}
```

**Reset Password Form:**

```typescript
// packages/@expanse/auth/src/components/ResetPasswordForm.tsx

export function ResetPasswordForm({ token }: { token: string }) {
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newPassword = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await resetPassword({ variables: { token, newPassword } });
      alert('Password reset successful!');
      router.push('/login');
    } catch (error) {
      alert('Failed to reset password. Token may be expired.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="password"
        label="New Password"
        type="password"
        required
        fullWidth
      />
      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        required
        fullWidth
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Reset Password
      </Button>
    </form>
  );
}
```

**Reset Password Page:**

```typescript
// apps/4eye-web/app/reset-password/page.tsx

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const token = searchParams.token;

  if (!token) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4">Invalid Reset Link</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      <ResetPasswordForm token={token} />
    </Container>
  );
}
```

---

## Security Considerations

### **Token Storage**

**Current:**
- localStorage - Client-side persistence
- Cookies - Server-side access

**Future Enhancement:**
- HttpOnly cookies only
- Separate access token (short-lived) + refresh token (long-lived)
- Refresh token rotation

### **CSRF Protection**

```typescript
// Add CSRF token to cookies
app.use(csrf({ cookie: true }));
```

### **XSS Protection**

- Sanitize user inputs
- Use Content Security Policy headers
- Escape output in React (default)

### **Token Expiration**

```typescript
// Check token expiry on each request
function isTokenExpired(token: string): boolean {
  const decoded = jwtDecode(token);
  return decoded.exp * 1000 < Date.now();
}
```

### **Rate Limiting**

```typescript
// apps/api/src/main.ts
import rateLimit from 'express-rate-limit';

app.use('/graphql', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
```

---

## Testing

### **Unit Tests**

```typescript
// packages/@expanse/auth/__tests__/unit/AuthProvider.test.tsx

describe('AuthProvider', () => {
  it('should login successfully', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={[loginMock]}>
          <AuthProvider>{children}</AuthProvider>
        </MockedProvider>
      ),
    });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toBeTruthy();
  });
});
```

### **Integration Tests**

```typescript
// apps/4eye-web/__tests__/integration/auth-flow.test.tsx

describe('Auth Flow', () => {
  it('should complete full login flow', async () => {
    render(<App />);

    // Navigate to login
    fireEvent.click(screen.getByText('Login'));

    // Fill form
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

    // Submit
    fireEvent.click(screen.getByText('Login'));

    // Wait for redirect to dashboard
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });
});
```

---

## Related Documentation

- **[authentication-comparison-2026-03-26.md](analysis/authentication-comparison-2026-03-26.md)** - Comparative analysis of authentication approaches, security assessment, and recommendations (archived 2026-03-26)
- **[PACKAGE_ARCHITECTURE.md](PACKAGE_ARCHITECTURE.md)** - Package organization
- **[STATE_PATTERNS.md](examples/STATE_PATTERNS.md)** - Context patterns
- **[COMPONENT_PATTERNS.md](examples/COMPONENT_PATTERNS.md)** - Component structure
- **[MIGRATION_GUIDE.md](../planning/MIGRATION_GUIDE.md)** - Migration steps
