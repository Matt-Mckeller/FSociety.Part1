// Component diagrams

export const authComponentTree = {
  title: 'Auth Component Tree',
  description: 'Frontend authentication components',
  chart: `flowchart TB
    subgraph Providers["Providers"]
        Session["SessionProvider<br/><i>Web or Mobile</i>"]
        AuthProv["AuthProvider"]
        ConsentProv["ConsentProvider"]
    end

    subgraph Guards["Route Guards"]
        ReqAuth["RequireAuth"]
        ReqGuest["RequireGuest"]
        ReqRole["RequireRole"]
        ReqConsent["RequireConsent"]
    end

    subgraph Forms["Auth Forms"]
        Login["LoginForm"]
        Signup["SignupForm"]
        PassReset["PasswordResetForm"]
        PassChange["PasswordChangeForm"]
    end

    subgraph OAuth["OAuth Buttons"]
        GoogleBtn["GoogleLoginButton"]
        AppleBtn["AppleLoginButton"]
        EdLinkBtn["EdLinkButton<br/><i>(Future)</i>"]
    end

    subgraph Consent["Consent Components"]
        ConsentDlg["ConsentDialog"]
        AgeGate["AgeVerification"]
        ParentForm["ParentalConsentForm"]
    end

    subgraph Utility["Utility"]
        UserAvatar["UserAvatar"]
        AuthModal["AuthModal"]
        LogoutBtn["LogoutButton"]
    end

    Session --> AuthProv --> ConsentProv

    style Providers fill:#e3f2fd,stroke:#1976d2
    style Guards fill:#f3e5f5,stroke:#9c27b0
    style Forms fill:#e8f5e9,stroke:#4caf50
    style OAuth fill:#fff3e0,stroke:#ff9800
    style Consent fill:#fce4ec,stroke:#e91e63
    style Utility fill:#e0f7fa,stroke:#00bcd4`,
};

export const hooksDependency = {
  title: 'Hooks Dependency Graph',
  description: 'How auth hooks depend on each other',
  chart: `flowchart TD
    subgraph Hooks["Auth Hooks"]
        useSession["useSession()<br/><i>Session state</i>"]
        useAuth["useAuth()<br/><i>User + auth</i>"]
        useConsent["useConsent()<br/><i>Consent state</i>"]
        useHasRole["useHasRole()<br/><i>Role checking</i>"]
    end

    useSession --> useAuth
    useAuth --> useConsent
    useAuth --> useHasRole

    subgraph Usage["Component Usage"]
        LoginComp["LoginForm<br/>uses useAuth"]
        Dashboard["Dashboard<br/>uses useAuth"]
        AdminPage["AdminPage<br/>uses useHasRole"]
        Settings["Settings<br/>uses useConsent"]
    end

    useAuth --> LoginComp
    useAuth --> Dashboard
    useHasRole --> AdminPage
    useConsent --> Settings

    style Hooks fill:#e3f2fd,stroke:#1976d2
    style Usage fill:#f3e5f5,stroke:#9c27b0`,
};

export const formValidation = {
  title: 'Form Validation Flow',
  description: 'Client and server-side validation',
  chart: `flowchart TB
    subgraph Client["Client-Side Validation"]
        Email["Email Format<br/><i>regex check</i>"]
        PassLength["Password Length<br/><i>min 8 chars</i>"]
        PassMatch["Password Match<br/><i>confirm field</i>"]
        Required["Required Fields<br/><i>not empty</i>"]
    end

    subgraph Server["Server-Side Validation"]
        EmailExists["Email Exists?<br/><i>unique check</i>"]
        PassStrength["Password Strength<br/><i>complexity rules</i>"]
        RateLimit["Rate Limiting<br/><i>5 per 15 min</i>"]
        CSRF["CSRF Token<br/><i>request validation</i>"]
    end

    subgraph Feedback["User Feedback"]
        Inline["Inline Errors<br/><i>per field</i>"]
        Toast["Toast Messages<br/><i>success/error</i>"]
        Disable["Button Disable<br/><i>while invalid</i>"]
    end

    Client --> Server
    Server --> Feedback

    style Client fill:#e3f2fd,stroke:#1976d2
    style Server fill:#f3e5f5,stroke:#9c27b0
    style Feedback fill:#e8f5e9,stroke:#4caf50`,
};

export const guardDecision = {
  title: 'Route Guard Decision Flow',
  description: 'How guards decide to allow/deny access',
  chart: `flowchart TD
    Route([Protected Route]) --> Loading{Loading?}

    Loading -->|Yes| Spinner[Show Spinner]
    Loading -->|No| AuthCheck{Authenticated?}

    AuthCheck -->|No| GuestCheck{Guest Allowed?}
    AuthCheck -->|Yes| ConsentCheck{Has Consent?}

    GuestCheck -->|Yes| Allow[Allow Access]
    GuestCheck -->|No| Redirect[Redirect to Login]

    ConsentCheck -->|No| ShowConsent[Show ConsentDialog]
    ConsentCheck -->|Yes| RoleCheck{Has Required Role?}

    RoleCheck -->|No| Forbidden[Show 403 / Redirect]
    RoleCheck -->|Yes| Allow

    ShowConsent -->|Accept| Allow
    ShowConsent -->|Decline| Logout[Logout User]

    style Route fill:#e3f2fd,stroke:#1976d2
    style Allow fill:#e8f5e9,stroke:#4caf50
    style Redirect fill:#fff3e0,stroke:#ff9800
    style Forbidden fill:#ffebee,stroke:#f44336`,
};

export const stateManagement = {
  title: 'Auth State Management',
  description: 'How state flows through the system',
  chart: `flowchart LR
    subgraph Storage["Persistent Storage"]
        Cookies["httpOnly Cookies<br/><i>Web - server managed</i>"]
        SecureStore["SecureStore<br/><i>Mobile - app managed</i>"]
    end

    subgraph Context["React Context State"]
        SessionState["Session State<br/><i>isAuth, loading</i>"]
        AuthState["Auth State<br/><i>user + operations</i>"]
        ConsentState["Consent State<br/><i>pending, history</i>"]
    end

    subgraph Derived["Derived State"]
        IsAuth["isAuthenticated"]
        IsGuest["isGuest"]
        HasRole["hasRole(ADMIN)"]
        NeedsConsent["needsConsent"]
    end

    Cookies --> SessionState
    SecureStore --> SessionState
    SessionState --> AuthState
    AuthState --> ConsentState

    SessionState --> IsAuth
    AuthState --> IsGuest
    AuthState --> HasRole
    ConsentState --> NeedsConsent

    style Storage fill:#e3f2fd,stroke:#1976d2
    style Context fill:#f3e5f5,stroke:#9c27b0
    style Derived fill:#e8f5e9,stroke:#4caf50`,
};

export const allComponentDiagrams = [
  authComponentTree,
  hooksDependency,
  formValidation,
  guardDecision,
  stateManagement,
];
