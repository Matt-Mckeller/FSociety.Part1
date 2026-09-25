# W2 — Onboarding

> Sign up, login, guest join via invite link, ToS/PP acceptance.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)

---

## Routes

| Route | Component | Auth |
|-------|-----------|------|
| `/signup` | SignupPage | Public |
| `/login` | LoginPage | Public |
| `/forgot-password` | ForgotPasswordPage | Public |
| `/reset-password/:token` | ResetPasswordPage | Public |
| `/join/:code` | GuestJoinPage | Public |
| `/accept-terms` | ConsentPage | Authenticated |

---

## User Flows

### Sign Up
```
1. User visits /signup
2. Fills: name, email, password, confirm password
3. Checks ToS + Privacy Policy boxes
4. Submits → creates User + ConsentLog entries
5. If FREE_TIER_ENABLED:
   a. Create subscription with tier=FREE
   b. Redirect to /dashboard
6. If FREE_TIER_ENABLED=false:
   a. Redirect to /pricing to select plan
   b. After payment → redirect to /dashboard
```

### Login
```
1. User visits /login
2. Fills: email, password
3. Submits → validates credentials → returns JWT
4. Check if ToS/PP needs re-acceptance (version changed)
5. If yes → redirect to /accept-terms
6. If no → redirect to /dashboard or original destination
```

### Forgot Password
```
1. User visits /forgot-password
2. Enters email address
3. If email exists → send reset link (valid 1 hour)
4. Show confirmation message (same message whether email exists or not)
```

### Reset Password
```
1. User clicks link in email → /reset-password/:token
2. Validate token (not expired, not used)
3. User enters new password + confirm
4. Update password hash, invalidate token
5. Redirect to /login with success message
```

### Guest Join
```
1. User visits /join/ABCD1234
2. If logged in → join room directly
3. If not → show GuestJoinForm (name only)
4. Generate guest token → store in cookie
5. Join session with limited features
6. After session → prompt to sign up
```

---

## Components

### SignupForm
```tsx
<Box component="form">
  <TextField label="Name" required />
  <TextField label="Email" type="email" required />
  <TextField label="Password" type="password" required />
  <TextField label="Confirm Password" type="password" required />
  <FormControlLabel
    control={<Checkbox required />}
    label={<>I agree to the <Link href="/terms">Terms of Service</Link></>}
  />
  <FormControlLabel
    control={<Checkbox required />}
    label={<>I agree to the <Link href="/privacy">Privacy Policy</Link></>}
  />
  <Button type="submit" variant="contained">Sign Up</Button>
  <Typography>Already have an account? <Link href="/login">Log in</Link></Typography>
</Box>
```

### LoginForm
```tsx
<Box component="form">
  <TextField label="Email" type="email" required />
  <TextField label="Password" type="password" required />
  <Button type="submit" variant="contained">Log In</Button>
  <Link href="/forgot-password">Forgot password?</Link>
  <Typography>Don't have an account? <Link href="/signup">Sign up</Link></Typography>
</Box>
```

### GuestJoinForm
```tsx
<Box component="form">
  <Typography variant="h5">Join as Guest</Typography>
  <TextField label="Your Name" required />
  <Button type="submit" variant="contained">Join Session</Button>
  <Divider>or</Divider>
  <Button href="/login" variant="outlined">Sign In</Button>
</Box>
```

### ForgotPasswordForm
```tsx
<Box component="form">
  <Typography variant="h5">Reset Password</Typography>
  <Typography color="text.secondary">
    Enter your email and we'll send you a reset link.
  </Typography>
  <TextField label="Email" type="email" required />
  <Button type="submit" variant="contained">Send Reset Link</Button>
  <Link href="/login">Back to login</Link>
</Box>
```

### ResetPasswordForm
```tsx
<Box component="form">
  <Typography variant="h5">Set New Password</Typography>
  <TextField label="New Password" type="password" required />
  <TextField label="Confirm Password" type="password" required />
  <Button type="submit" variant="contained">Reset Password</Button>
</Box>
```

---

## API Surface

### Mutations
- `signup(input: SignupInput!)` → AuthPayload
- `login(email: String!, password: String!)` → AuthPayload
- `logout` → Boolean
- `requestPasswordReset(email: String!)` → Boolean
- `resetPassword(token: String!, newPassword: String!)` → AuthPayload
- `acceptConsent(type: ConsentType!, version: String!)` → ConsentLog
- `createGuestToken(name: String!, roomId: ID!)` → GuestToken

### Queries
- `me` → User
- `checkConsentStatus` → ConsentStatus
- `roomByInviteCode(code: String!)` → Room

---

## Validation

| Field | Rules |
|-------|-------|
| name | 2-100 chars |
| email | Valid email, unique |
| password | Min 8 chars, 1 uppercase, 1 number |

---

## Dependencies
- C2 (Authentication)
- W8 (Privacy/Terms content for links)

## Acceptance Criteria
- [ ] User can sign up with email/password
- [ ] User can log in
- [ ] User can request password reset via email
- [ ] User can reset password with valid token
- [ ] Password reset tokens expire after 1 hour
- [ ] ToS/PP consent logged with IP, user agent, version
- [ ] Guest can join via invite code without account
- [ ] Guest prompted to upgrade after session
- [ ] Validation errors display clearly
- [ ] If FREE_TIER_ENABLED: user lands on dashboard after signup
- [ ] If FREE_TIER_ENABLED=false: user redirected to pricing after signup
- [ ] Redirect to original destination after auth
