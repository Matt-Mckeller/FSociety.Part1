// Authentication flow diagrams - simplified for readability

export const loginFlow = {
  title: 'Login Flow (Email/Password)',
  description: 'Standard email and password authentication',
  chart: `flowchart LR
    A[Enter credentials] --> B[Call login mutation]
    B --> C[Verify password]
    C --> D[Set httpOnly cookie]
    D --> E[Return user]

    style A fill:#e3f2fd,stroke:#1976d2
    style B fill:#e3f2fd,stroke:#1976d2
    style C fill:#f3e5f5,stroke:#9c27b0
    style D fill:#f3e5f5,stroke:#9c27b0
    style E fill:#e8f5e9,stroke:#4caf50`,
};

export const googleOAuthFlow = {
  title: 'Google OAuth Flow',
  description: 'Social login with Google',
  chart: `flowchart LR
    A[Click Google Sign In] --> B[Redirect to Google]
    B --> C[User grants permission]
    C --> D[Callback with code]
    D --> E[Exchange for user info]
    E --> F[Set cookies + redirect]

    style A fill:#e3f2fd,stroke:#1976d2
    style B fill:#e3f2fd,stroke:#4285f4
    style C fill:#e3f2fd,stroke:#4285f4
    style D fill:#f3e5f5,stroke:#9c27b0
    style E fill:#f3e5f5,stroke:#9c27b0
    style F fill:#e8f5e9,stroke:#4caf50`,
};

export const signupFlow = {
  title: 'Signup Flow (with Consent)',
  description: 'New user registration with ToS acceptance',
  chart: `flowchart TD
    A[Enter signup info] --> B{Age check}
    B -->|18+| C[Show ToS + Privacy]
    B -->|13-17| C
    B -->|Under 13| D[COPPA flow]
    C --> E[Accept consents]
    E --> F[Create account]
    F --> G[Logged in]

    style A fill:#e3f2fd,stroke:#1976d2
    style B fill:#fff3e0,stroke:#ff9800
    style C fill:#e3f2fd,stroke:#1976d2
    style D fill:#fce4ec,stroke:#e91e63
    style E fill:#e3f2fd,stroke:#1976d2
    style F fill:#f3e5f5,stroke:#9c27b0
    style G fill:#e8f5e9,stroke:#4caf50`,
};

export const coppaFlow = {
  title: 'COPPA Flow (Under 13)',
  description: 'Child account creation with parental consent',
  chart: `flowchart TD
    A[Child under 13 detected] --> B[Enter parent email]
    B --> C[Create pending account]
    C --> D[Email sent to parent]
    D --> E[Parent clicks link]
    E --> F[Parent verifies]
    F --> G[Account activated]

    style A fill:#fce4ec,stroke:#e91e63
    style B fill:#e3f2fd,stroke:#1976d2
    style C fill:#f3e5f5,stroke:#9c27b0
    style D fill:#fff3e0,stroke:#ff9800
    style E fill:#e3f2fd,stroke:#1976d2
    style F fill:#e3f2fd,stroke:#1976d2
    style G fill:#e8f5e9,stroke:#4caf50`,
};

export const guestFlow = {
  title: 'Guest Mode Flow',
  description: 'Anonymous access with upgrade prompt',
  chart: `flowchart LR
    A[Continue as Guest] --> B[Set isGuest flag]
    B --> C[Limited access]
    C --> D[Prompt to sign up]
    D --> E[Full access]

    style A fill:#e3f2fd,stroke:#1976d2
    style B fill:#e3f2fd,stroke:#1976d2
    style C fill:#fff3e0,stroke:#ff9800
    style D fill:#e3f2fd,stroke:#1976d2
    style E fill:#e8f5e9,stroke:#4caf50`,
};

export const roomPasscodeFlow = {
  title: 'Room Passcode Flow',
  description: 'Join room via invite code',
  chart: `flowchart LR
    A[Visit /join/CODE] --> B[Validate code]
    B --> C[Enter name]
    C --> D[Get guest token]
    D --> E[Enter room]

    style A fill:#e3f2fd,stroke:#1976d2
    style B fill:#f3e5f5,stroke:#9c27b0
    style C fill:#e3f2fd,stroke:#1976d2
    style D fill:#f3e5f5,stroke:#9c27b0
    style E fill:#e8f5e9,stroke:#4caf50`,
};

export const passwordResetFlow = {
  title: 'Password Reset Flow',
  description: 'Token-based password recovery',
  chart: `flowchart LR
    A[Forgot Password] --> B[Enter email]
    B --> C[Generate token]
    C --> D[Send email]
    D --> E[Click link]
    E --> F[Set new password]

    style A fill:#e3f2fd,stroke:#1976d2
    style B fill:#e3f2fd,stroke:#1976d2
    style C fill:#f3e5f5,stroke:#9c27b0
    style D fill:#fff3e0,stroke:#ff9800
    style E fill:#e3f2fd,stroke:#1976d2
    style F fill:#e8f5e9,stroke:#4caf50`,
};

export const edlinkFlow = {
  title: 'EdLink SSO Flow (Future)',
  description: 'Education platform single sign-on - extensible for Phase 3',
  chart: `flowchart LR
    A[Click EdLink] --> B[Redirect to EdLink]
    B --> C[School SSO]
    C --> D[Callback]
    D --> E[Create user]
    E --> F[No extra consent needed]

    style A fill:#e3f2fd,stroke:#1976d2
    style B fill:#ede7f6,stroke:#7c4dff
    style C fill:#fff3e0,stroke:#ff9800
    style D fill:#ede7f6,stroke:#7c4dff
    style E fill:#f3e5f5,stroke:#9c27b0
    style F fill:#e8f5e9,stroke:#4caf50`,
};

export const tokenRefreshFlow = {
  title: 'Token Refresh Flow',
  description: 'Silent token renewal via httpOnly cookie',
  chart: `flowchart TD
    A[Access token expiring] --> B[Apollo Link intercepts 401]
    B --> C[POST /auth/refresh]
    C --> D{Valid refresh token?}
    D -->|Yes| E[Server sets new cookies]
    D -->|No| F[Logout user]
    E --> G[Retry original request]

    style A fill:#fff3e0,stroke:#ff9800
    style B fill:#e3f2fd,stroke:#1976d2
    style C fill:#f3e5f5,stroke:#9c27b0
    style D fill:#fff3e0,stroke:#ff9800
    style E fill:#e8f5e9,stroke:#4caf50
    style F fill:#ffebee,stroke:#f44336
    style G fill:#e8f5e9,stroke:#4caf50`,
};

export const allFlows = [
  loginFlow,
  googleOAuthFlow,
  signupFlow,
  coppaFlow,
  guestFlow,
  roomPasscodeFlow,
  passwordResetFlow,
  tokenRefreshFlow,
  edlinkFlow,
];
