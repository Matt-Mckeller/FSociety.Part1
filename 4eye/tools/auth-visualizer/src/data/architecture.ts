// Architecture diagrams

export const providerHierarchy = {
  title: 'Provider Hierarchy',
  description: 'Simple 2-provider composition - AuthProvider owns user state, server owns tokens',
  chart: `flowchart TB
    subgraph Application["Application Layer"]
        App["ApplicationProvider"]
        App --> Auth["AuthProvider<br/><i>@expanse/auth</i><br/>user state + operations"]
        Auth --> Consent["ConsentProvider<br/><i>@expanse/consent</i>"]
        Consent --> AppContent["App Content"]
    end

    style App fill:#e3f2fd,stroke:#1976d2
    style Auth fill:#e8f5e9,stroke:#4caf50
    style Consent fill:#f3e5f5,stroke:#9c27b0
    style AppContent fill:#fff,stroke:#1976d2`,
};

export const combinedArchitecture = {
  title: 'Combined AuthProvider',
  description: 'Single provider handles user state; server manages tokens via httpOnly cookies',
  chart: `flowchart TB
    subgraph AuthProvider["AuthProvider (User State)"]
        subgraph State["Internal State"]
            UserData["user: User | null"]
            Loading["isLoading"]
            Guest["isGuest"]
            Error["error: AuthError"]
        end
        
        subgraph Operations["Operations"]
            Login["login()"]
            Signup["signup()"]
            Logout["logout()"]
            Google["loginWithGoogle()"]
            MFA["verifyMfa()"]
        end
    end

    subgraph PublicAPI["useAuth() Returns"]
        PUser["user, isAuthenticated"]
        PLoad["isLoading, isGuest"]
        POps["login, logout, etc."]
    end

    AuthProvider --> PublicAPI

    style AuthProvider fill:#e8f5e9,stroke:#4caf50
    style State fill:#e3f2fd,stroke:#1976d2
    style Operations fill:#f3e5f5,stroke:#9c27b0
    style PublicAPI fill:#fff3e0,stroke:#ff9800`,
};

export const packageArchitecture = {
  title: 'Package Architecture',
  description: '@expanse (generic) vs @4eye (app-specific) packages',
  chart: `flowchart LR
    subgraph Expanse["@expanse/* (Generic, Reusable)"]
        ExpAuth["@expanse/auth<br/>• AuthProvider<br/>• useAuth hook<br/>• LoginForm<br/>• Route guards"]
        ExpUser["@expanse/user<br/>• Profile UI only<br/>• UserAvatar"]
        ExpConsent["@expanse/consent<br/>• ConsentProvider<br/>• Age verification"]
    end

    subgraph FourEye["@4eye/* (App-Specific, Future)"]
        Features["@4eye/features<br/>• RoomPasscode<br/>• GuestUpgrade"]
        EdLink["@4eye/auth-edlink<br/>• EdLink SSO"]
    end

    subgraph Apps["Applications"]
        Web["4eye-web"]
        Mobile["4eye-mobile"]
    end

    ExpAuth --> Web
    ExpAuth --> Mobile
    ExpUser --> Web
    ExpConsent --> Web

    style Expanse fill:#e3f2fd,stroke:#1976d2
    style FourEye fill:#f3e5f5,stroke:#9c27b0
    style Apps fill:#e8f5e9,stroke:#4caf50`,
};

export const backendArchitecture = {
  title: 'Backend Auth Module',
  description: 'NestJS authentication module structure',
  chart: `flowchart TB
    subgraph AuthModule["Auth Module (NestJS)"]
        Resolver["auth.resolver.ts<br/><i>GraphQL mutations</i>"]
        Service["auth.service.ts<br/><i>Business logic</i>"]
        
        subgraph Strategies["Passport Strategies"]
            JWT["jwt.strategy.ts"]
            Google["google.strategy.ts"]
        end
        
        subgraph Guards["Guards"]
            JWTGuard["JwtAuthGuard"]
            CsrfGuard["CsrfGuard"]
            RolesGuard["RolesGuard"]
        end
    end

    Resolver --> Service
    Service --> Strategies
    Guards --> Resolver

    style AuthModule fill:#e3f2fd,stroke:#1976d2
    style Strategies fill:#f3e5f5,stroke:#9c27b0
    style Guards fill:#e8f5e9,stroke:#4caf50`,
};

export const dataFlow = {
  title: 'Authentication Data Flow',
  description: 'How data flows through the auth system',
  chart: `flowchart LR
    subgraph Client["Frontend"]
        UI["UI Component"]
        Hook["useAuth()"]
        AP["AuthProvider"]
    end

    subgraph Server["Backend"]
        GQL["GraphQL API"]
        AuthServ["AuthService"]
        DB[(Database)]
    end

    UI -->|"login()"| Hook
    Hook -->|"mutation"| AP
    AP -->|"credentials"| GQL
    GQL -->|"validate"| AuthServ
    AuthServ -->|"query"| DB
    DB -->|"user"| AuthServ
    AuthServ -->|"Set-Cookie + user"| GQL
    GQL -->|"user only"| AP

    style Client fill:#e3f2fd,stroke:#1976d2
    style Server fill:#f3e5f5,stroke:#9c27b0`,
};

export const databaseSchema = {
  title: 'Auth Database Schema',
  description: 'Core entities for authentication',
  chart: `erDiagram
    User {
        uuid id PK
        string email UK
        string passwordHash
        string name
        string avatarUrl
        enum role
        string oauthProvider
        string oauthProviderId
        boolean emailVerified
        date createdAt
        date updatedAt
    }

    ConsentLog {
        uuid id PK
        uuid userId FK
        enum type
        string version
        string documentUrl
        string documentHash
        datetime acceptedAt
        string ipAddress
        string userAgent
        string locale
    }

    PasswordResetToken {
        uuid id PK
        uuid userId FK
        string token
        datetime expiresAt
        boolean used
        datetime createdAt
    }

    RefreshToken {
        uuid id PK
        uuid userId FK
        string token
        datetime expiresAt
        boolean revoked
        datetime createdAt
    }

    ParentalConsent {
        uuid id PK
        uuid childUserId FK
        string parentEmail
        string verificationToken
        datetime verifiedAt
        boolean isVerified
        datetime expiresAt
    }

    User ||--o{ ConsentLog : "has"
    User ||--o{ PasswordResetToken : "has"
    User ||--o{ RefreshToken : "has"
    User ||--o| ParentalConsent : "requires"`,
};

export const allArchitectureDiagrams = [
  providerHierarchy,
  combinedArchitecture,
  packageArchitecture,
  backendArchitecture,
  dataFlow,
  databaseSchema,
];
