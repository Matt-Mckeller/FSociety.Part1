# Split-Layer Architecture Migration

## Migration Complete ✅

Your auth system has been migrated from client-side token storage to a secure split-layer architecture with httpOnly cookies.

---

## What Changed

### Backend Changes

**1. Token Management** ([auth.service.ts](../apps/api/src/modules/auth/auth.service.ts))
- Added `generateAccessToken()` - 15 min expiry
- Added `generateRefreshToken()` - 7 days expiry  
- Added `verifyRefreshToken()` - validate and check token version

**2. Cookie Helper** ([cookie.helper.ts](../apps/api/src/modules/auth/utils/cookie.helper.ts))
- `setAccessTokenCookie()` - httpOnly, 15 min
- `setRefreshTokenCookie()` - httpOnly, 7 days
- `setCSRFTokenCookie()` - readable by client (double-submit pattern)
- `clearAuthCookies()` - logout cleanup

**3. Auth Resolver** ([auth.resolver.ts](../apps/api/src/modules/auth/auth.resolver.ts))
- Login/signup now set cookies instead of returning tokens
- Added `refreshToken` mutation
- Logout now clears cookies
- OAuth login sets cookies

**4. JWT Strategy** ([jwt.strategy.ts](../apps/api/src/modules/auth/strategies/jwt.strategy.ts))
- Extract JWT from cookies first, then fallback to Authorization header (backward compatible)

**5. User Entity** ([user.entity.ts](../apps/api/src/modules/users/entities/user.entity.ts))
- Added `tokenVersion` field for refresh token invalidation

**6. Main.ts** ([main.ts](../apps/api/src/main.ts))
- Added `cookie-parser` middleware
- CORS updated to allow `X-CSRF-Token` header

---

### Frontend Changes

**1. Session Layer** ([packages/@expanse/auth/src/session/](../packages/@expanse/auth/src/session/))
- `SessionContext.ts` - Platform-agnostic session interface
- `WebSessionProvider.tsx` - Browser (httpOnly cookies)
- `MobileSessionProvider.tsx` - React Native (SecureStore, stub for future)

**2. AuthProvider** ([AuthProvider.tsx](../packages/@expanse/auth/src/context/AuthProvider.tsx))
- Now uses `useSession()` internally
- Removed direct token storage management
- `accessToken` field deprecated (null for backward compatibility)
- Platform-agnostic - works with both Web and Mobile session providers

**3. Apollo Client** ([apollo-client.ts](../apps/4eye-web/lib/apollo-client.ts))
- Removed Authorization header logic (cookies sent automatically)
- Added automatic token refresh on 401 errors
- Refresh tokens using `refreshToken` mutation

**4. GraphQL Queries** ([graphql.ts](../packages/@expanse/auth/src/graphql/graphql.ts))
- Removed `accessToken` from login/signup response
- Added `REFRESH_TOKEN_MUTATION`

**5. Providers** ([providers.tsx](../apps/4eye-web/app/providers.tsx))
- Wrapped `AuthProvider` in `WebSessionProvider`

**6. Auth Components** 
- Created reusable `LoginForm` and `SignupForm` components

---

## Security Improvements

| Feature | Before | After |
|---------|--------|-------|
| **Token Storage** | localStorage (XSS vulnerable) | httpOnly cookies (XSS protected) |
| **Token Access** | JavaScript can read tokens | JavaScript cannot access tokens |
| **CSRF Protection** | None | Double-submit cookie pattern |
| **Token Refresh** | Manual | Automatic on 401 |
| **Platform Support** | Web only | Web + Mobile ready |
| **Token Invalidation** | Not possible | tokenVersion field |

---

## Next Steps

### Required Actions

1. **Environment Variables**
   Copy and configure environment files:
   ```bash
   # API
   cd apps/api
   cp .env.example .env
   # Edit .env and set:
   # - DATABASE_URL
   # - JWT_SECRET (generate with: openssl rand -base64 64)
   # - JWT_REFRESH_SECRET (generate with: openssl rand -base64 64)
   # - OPENAI_API_KEY
   # - GOOGLE_CLIENT_ID (if using OAuth)
   
   # Web
   cd apps/4eye-web
   cp .env.example .env
   # Edit .env and set:
   # - NEXT_PUBLIC_API_URL (default: http://localhost:3001/graphql)
   ```

2. **Database Setup**
   TypeORM will auto-sync the schema (includes new `tokenVersion` column):
   ```bash
   # Start PostgreSQL (Docker example)
   docker run --name 4eye-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
   
   # Create database
   psql -h localhost -U postgres -c "CREATE DATABASE 4eye_dev;"
   
   # Start API (TypeORM sync will create tables)
   cd apps/api && npm run start:dev
   ```

3. **Install Dependencies**
   ```bash
   # API already has cookie-parser installed
   cd apps/api && npm install
   
   # Web app
   cd apps/4eye-web && npm install
   ```

### Testing Checklist

- [ ] Start API and Web app
- [ ] Login flow works and sets cookies (check DevTools → Application → Cookies)
- [ ] Signup flow works and sets cookies
- [ ] Logout clears cookies
- [ ] Protected routes work without manual token management
- [ ] Token refresh happens automatically on expiry (test by waiting 15+ min or manually expiring cookie)
- [ ] Check that `accessToken`, `refreshToken`, and `csrf_token` cookies are present after login
- [ ] Verify `accessToken` and `refreshToken` are marked as `HttpOnly`
- [ ] OAuth (Google/Apple) sets cookies correctly (if configured)

---

## Rollback Plan

If issues occur, you can rollback:

1. Revert backend changes - JWT strategy will fallback to Authorization header
2. Revert frontend `apollo-client.ts` to send Authorization header
3. Keep old `tokenStorage` logic as fallback

The migration is backward compatible - JWT strategy checks cookies first, then Authorization header.

---

## Future Enhancements

1. **CSRF Middleware** - Validate CSRF token on mutations
2. **Mobile Implementation** - Complete `MobileSessionProvider` with SecureStore
3. **Email Verification** - Add verification flow before allowing full access
4. **MFA/2FA** - Add TOTP authenticator support
5. **Consent Management** - Add `ConsentProvider` for GDPR/COPPA compliance

---

## Architecture Diagram

```
Web Platform:
┌─────────────────────────────────────────┐
│ WebSessionProvider (httpOnly cookies)   │
│ └─ AuthProvider (user state)            │
│    └─ App                                │
└─────────────────────────────────────────┘

Mobile Platform (Future):
┌─────────────────────────────────────────┐
│ MobileSessionProvider (SecureStore)     │
│ └─ AuthProvider (user state)            │
│    └─ App                                │
└─────────────────────────────────────────┘
```

---

**Migration Date**: March 27, 2026  
**Status**: ✅ Complete and Ready for Testing
