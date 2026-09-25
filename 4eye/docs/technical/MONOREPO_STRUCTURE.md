# Monorepo Structure

Complete directory tree and organizational guide for the 4eye monorepo.

---

## Overview

The 4eye monorepo uses **npm workspaces** with **dual-scope packages**:
- **@expanse packages** - Reusable infrastructure
- **@4eye packages** - 4eye-specific domain logic and AI features
- **apps/** - Multiple applications (web, API, admin, marketing)
- **docs/** - 3-tier documentation system

---

## Complete Directory Tree

```
4eye/
├── apps/
│   ├── 4eye-web/                    # Main Next.js web app
│   │   ├── src/
│   │   │   ├── app/                 # Next.js App Router
│   │   │   │   ├── (auth)/          # Auth route group
│   │   │   │   │   ├── login/
│   │   │   │   │   └── signup/
│   │   │   │   ├── (app)/           # Authenticated app routes
│   │   │   │   │   └── dashboard/
│   │   │   │   ├── join/            # Public join route
│   │   │   │   ├── layout.tsx       # Root layout
│   │   │   │   ├── providers.tsx    # Provider composition
│   │   │   │   └── page.tsx         # Home page
│   │   │   └── modules/             # App-specific modules
│   │   │       ├── layout/          # Layout components (PageHeader, PageFooter, SideDrawer)
│   │   │       ├── dashboard/       # Dashboard-specific components
│   │   │       └── rooms/           # Room-specific UI
│   │   ├── public/                  # Static assets
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── next.config.js
│   │
│   ├── api/                         # NestJS GraphQL API
│   │   ├── src/
│   │   │   ├── modules/             # Feature modules
│   │   │   │   ├── auth/            # Authentication module
│   │   │   │   ├── users/           # User management
│   │   │   │   ├── rooms/           # Room management
│   │   │   │   ├── sessions/        # Session management
│   │   │   │   ├── organizations/   # Organization management
│   │   │   │   └── ai/              # AI modules
│   │   │   │       ├── chat/
│   │   │   │       ├── transcription/
│   │   │   │       ├── translation/
│   │   │   │       └── summarization/
│   │   │   ├── common/              # Shared utilities
│   │   │   │   ├── decorators/
│   │   │   │   ├── filters/
│   │   │   │   ├── guards/
│   │   │   │   └── interceptors/
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── admin-web/                   # Future: Admin dashboard (Next.js)
│   │   └── (to be created)
│   │
│   └── marketing-site/              # Future: Marketing website (Next.js)
│       └── (to be created)
│
├── packages/
│   ├── @expanse/                    # Infrastructure packages (reusable)
│   │   │
│   │   ├── auth/                    # Authentication system
│   │   │   ├── src/
│   │   │   │   ├── components/      # AuthModal, LoginForm, SignupForm, GuestModeButton
│   │   │   │   ├── context/         # AuthSessionProvider, AuthProvider
│   │   │   │   ├── guards/          # RequireAuth, RequireGuest, RequireRole
│   │   │   │   ├── hooks/           # useAuth, useAuthSession, useRequireAuth
│   │   │   │   ├── utils/           # JWT helpers, token storage
│   │   │   │   ├── types/           # Auth-specific types
│   │   │   │   └── index.ts         # Public API
│   │   │   ├── docs/
│   │   │   │   ├── README.md
│   │   │   │   ├── API.md
│   │   │   │   └── EXAMPLES.md
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   ├── theme/                   # MUI theme system
│   │   │   ├── src/
│   │   │   │   ├── Brand/           # Brand-specific themes
│   │   │   │   │   ├── primary/     # Primary color theme
│   │   │   │   │   ├── blue/
│   │   │   │   │   ├── green/
│   │   │   │   │   └── orange/
│   │   │   │   ├── configs/         # Theme configurations
│   │   │   │   │   ├── common-theme.ts      # Shared config (typography, breakpoints, components)
│   │   │   │   │   ├── light-palette.ts
│   │   │   │   │   └── dark-palette.ts
│   │   │   │   ├── font/            # Xpens font files (TTF)
│   │   │   │   ├── fonts/           # Font metadata exports
│   │   │   │   ├── components/      # LightDarkModeToggle, ThemeColorSelector
│   │   │   │   ├── context/         # ThemeProvider with theme switching
│   │   │   │   ├── hooks/           # useExpanseTheme, useThemeMode, useThemeSelection
│   │   │   │   ├── utils/           # Theme helpers
│   │   │   │   └── index.ts
│   │   │   ├── docs/
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   ├── ui/                      # Shared UI components
│   │   │   ├── src/
│   │   │   │   ├── components/      # Button, Card, Modal, etc.
│   │   │   │   ├── form/            # Form components (TextField, Select, Checkbox, etc.)
│   │   │   │   ├── feedback/        # Snackbar, Alert, Loading, etc.
│   │   │   │   ├── navigation/      # Tabs, Breadcrumbs, etc.
│   │   │   │   └── index.ts
│   │   │   ├── docs/
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   ├── layout/                  # Layout primitives
│   │   │   ├── src/
│   │   │   │   ├── components/
│   │   │   │   │   ├── TypographyResponsive/    # Auto-shrinking text
│   │   │   │   │   ├── SettingsPage/            # Settings page layout
│   │   │   │   │   ├── MaxWidthContainer.tsx    # Content width limiter
│   │   │   │   │   ├── StretchLayout.tsx        # Full-height flex layout
│   │   │   │   │   ├── PageShell.tsx            # Basic page wrapper
│   │   │   │   │   └── SymbolGrid.tsx           # Symbol grid system (to be designed)
│   │   │   │   ├── hooks/           # Layout-related hooks
│   │   │   │   ├── context/         # LayoutProvider (drawer, snackbar, loading)
│   │   │   │   └── index.ts
│   │   │   ├── docs/
│   │   │   │   └── SYMBOL_GRID.md   # Symbol grid design (placeholder)
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   ├── user/                    # User types and management
│   │   │   ├── src/
│   │   │   │   ├── types/           # User, UserRole, ReadingLevel
│   │   │   │   ├── context/         # UserProvider (user data, profile)
│   │   │   │   ├── hooks/           # useUser, useUserProfile
│   │   │   │   ├── components/      # ProfileMenu, UserAvatar
│   │   │   │   └── index.ts
│   │   │   ├── docs/
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   ├── types/                   # Convenience type re-exports
│   │   │   ├── src/
│   │   │   │   └── index.ts         # Re-exports from user, theme, auth, validation
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   ├── analytics/               # Analytics integration
│   │   │   ├── src/
│   │   │   │   ├── context/         # AnalyticsProvider
│   │   │   │   ├── hooks/           # useAnalytics, useTrackEvent
│   │   │   │   ├── utils/           # Event tracking
│   │   │   │   └── index.ts
│   │   │   ├── docs/
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   ├── application/             # Application orchestration
│   │   │   ├── src/
│   │   │   │   ├── ApplicationProvider.tsx  # Root provider composer
│   │   │   │   ├── types/           # Application types
│   │   │   │   └── index.ts
│   │   │   ├── docs/
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   └── utils/                   # Shared utilities
│   │       ├── src/
│   │       │   ├── array/           # Array helpers
│   │       │   ├── date/            # Date helpers
│   │       │   ├── string/          # String helpers
│   │       │   ├── validation/      # Validation helpers
│   │       │   └── index.ts
│   │       ├── docs/
│   │       ├── package.json
│   │       └── tsconfig.json
│   │
│   └── @4eye/                       # 4eye-specific packages
│       │
│       ├── types/                   # Centralized type definitions
│       │   ├── src/
│       │   │   ├── entities/        # Domain entities (User, Room, Session, Organization)
│       │   │   ├── inputs/          # GraphQL inputs (CreateRoomInput, UpdateUserInput)
│       │   │   ├── ai/              # AI-related types (Transcript, Translation, Summary)
│       │   │   ├── enums/           # Enums (RoomType, UserRole, SessionStatus)
│       │   │   └── index.ts
│       │   ├── docs/
│       │   ├── package.json
│       │   └── tsconfig.json
│       │
│       ├── core/                    # Core domain logic
│       │   ├── src/
│       │   │   ├── room/            # Room management logic
│       │   │   ├── session/         # Session management logic
│       │   │   ├── organization/    # Organization management logic
│       │   │   ├── user/            # User domain logic
│       │   │   └── index.ts
│       │   ├── docs/
│       │   ├── package.json
│       │   └── tsconfig.json
│       │
│       ├── features/                # AI-powered features
│       │   ├── src/
│       │   │   ├── chat/            # AI chat feature
│       │   │   ├── transcription/   # Audio transcription
│       │   │   ├── translation/     # Live translation
│       │   │   ├── summarization/   # Session summaries
│       │   │   ├── quiz/            # Quiz generation
│       │   │   └── index.ts
│       │   ├── docs/
│       │   ├── package.json
│       │   └── tsconfig.json
│       │
│       ├── ai-sdk/                  # AI provider abstraction layer
│       │   ├── src/
│       │   │   ├── providers/       # OpenAI, Anthropic, Google, etc.
│       │   │   ├── typed-responses/ # Typed AI response parsing
│       │   │   ├── utils/           # AI utilities
│       │   │   └── index.ts
│       │   ├── docs/
│       │   ├── package.json
│       │   └── tsconfig.json
│       │
│       └── graphql-schema/          # Generated GraphQL schema
│           ├── src/
│           │   ├── schema.gql       # Auto-generated schema
│           │   └── index.ts
│           ├── package.json
│           └── tsconfig.json
│
├── docs/                            # 3-tier documentation
│   ├── technical/                   # Shared technical documentation
│   │   ├── REPOSITORY_STRUCTURE.md
│   │   ├── PACKAGE_ARCHITECTURE.md
│   │   ├── MONOREPO_STRUCTURE.md
│   │   ├── TYPE_ORGANIZATION.md
│   │   ├── GRAPHQL_CODE_FIRST.md
│   │   ├── AUTHENTICATION.md
│   │   ├── MUI_THEME_SYSTEM.md
│   │   ├── TECHNOLOGY_STACK.md
│   │   ├── TECHNICAL_STANDARDS.md
│   │   ├── MODULE_ARCHITECTURE.md
│   │   └── examples/
│   │       ├── COMPONENT_PATTERNS.md
│   │       ├── STATE_PATTERNS.md
│   │       └── LAYOUT_PATTERNS.md
│   │
│   ├── planning/                    # Project planning documentation
│   │   ├── Plan.md
│   │   ├── MasterPlan.md
│   │   ├── plans/
│   │   │   ├── decisions.md
│   │   │   ├── core/
│   │   │   ├── app-features/
│   │   │   ├── cross-cutting/
│   │   │   ├── infrastructure/
│   │   │   ├── testing/
│   │   │   ├── verticals/
│   │   │   ├── website/
│   │   │   ├── projects/
│   │   │   └── setup/
│   │   └── MIGRATION_GUIDE.md
│   │
│   ├── workflows/                   # Development workflows
│   │   ├── GETTING_STARTED.md
│   │   ├── CODE_REVIEWS.md
│   │   ├── GIT_WORKFLOW.md
│   │   └── details/
│   │       ├── FILE_ORGANIZATION.md
│   │       └── NAMING_CONVENTIONS.md
│   │
│   └── templates/                   # Reusable templates
│       ├── package.json             # Package template
│       ├── README.md                # Package README template
│       └── component.tsx            # Component template
│
├── infrastructure-as-code/          # Terraform infrastructure
│   ├── bootstrap/
│   ├── environments/
│   │   ├── development/
│   │   ├── staging/
│   │   └── production/
│   └── modules/
│
├── .github/
│   ├── workflows/                   # CI/CD workflows
│   │   ├── test.yml
│   │   ├── build.yml
│   │   └── deploy.yml
│   └── copilot-instructions.md      # GitHub Copilot instructions
│
├── package.json                     # Root package.json (workspaces config)
├── tsconfig.base.json               # Base TypeScript config
├── .gitignore
├── .eslintrc.js
├── .prettierrc
└── README.md
```

---

## Directory Purposes

### **apps/**

**Purpose:** Deployable applications

**Contents:**
- Next.js web applications
- NestJS API servers
- Future: Admin dashboards, marketing sites

**Characteristics:**
- Each app is independently deployable
- Can depend on packages
- Have app-specific modules in src/modules/
- Own build and deployment configuration

---

### **packages/@expanse/**

**Purpose:** Reusable infrastructure (not 4eye-specific)

**Packages:**
- **auth** - Authentication (JWT, session, guards, guest mode)
- **theme** - MUI theme system (multi-theme, light/dark mode)
- **ui** - Shared UI components (buttons, cards, forms, etc.)
- **layout** - Layout primitives (containers, grids, symbol grid)
- **user** - User context and profile management
- **analytics** - Analytics integration (event tracking)
- **application** - Application orchestration (provider composition)
- **utils** - Shared utilities (array, date, string, validation)

**Why @expanse:**
- Could be extracted as standalone packages in future
- No business logic or domain knowledge
- Pure infrastructure and UI components
- Reusable across any application

---

### **packages/@4eye/**

**Purpose:** 4eye-specific domain logic and AI features

**Packages:**
- **types** - Centralized type definitions (entities, inputs, AI types)
- **core** - Domain logic (Room, Session, Organization management)
- **features** - AI features (chat, transcription, translation, summarization)
- **ai-sdk** - AI provider abstraction layer
- **graphql-schema** - Generated GraphQL schema

**Why @4eye:**
- Business logic specific to 4eye platform
- Domain models and rules
- AI integrations
- Not reusable outside 4eye context

---

### **docs/**

**Purpose:** 3-tier documentation system

**Tiers:**

**1. Package-level** (`packages/*/docs/`)
- Package-specific documentation
- API reference for that package
- Usage examples for that package
- Implementation details

**2. Shared technical** (`docs/technical/`)
- Cross-package technical guides
- Architecture documentation
- Development standards
- Pattern examples

**3. Project planning** (`docs/planning/`)
- Product planning
- Feature specifications
- Business requirements
- Strategic decisions

**Why 3 tiers:**
- Separates concerns (package vs. project vs. technical)
- Prevents duplication
- Clear ownership
- Easier to maintain

---

## npm Workspaces Configuration

### **Root package.json**

```json
{
  "name": "4eye-monorepo",
  "version": "0.1.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/@expanse/*",
    "packages/@4eye/*"
  ],
  "scripts": {
    "dev:web": "npm run dev --workspace=apps/4eye-web",
    "dev:api": "npm run dev --workspace=apps/api",
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces",
    "lint": "eslint .",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

### **TypeScript Configuration**

**tsconfig.base.json** - Shared configuration with path aliases:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@expanse/auth": ["packages/@expanse/auth/src"],
      "@expanse/theme": ["packages/@expanse/theme/src"],
      "@expanse/ui": ["packages/@expanse/ui/src"],
      "@expanse/shell": ["packages/@expanse/shell/src"],
      "@expanse/user": ["packages/@expanse/user/src"],
      "@expanse/analytics": ["packages/@expanse/analytics/src"],
      "@expanse/application": ["packages/@expanse/application/src"],
      "@expanse/utils": ["packages/@expanse/utils/src"],
      "@4eye/types": ["packages/@4eye/types/src"],
      "@4eye/core": ["packages/@4eye/core/src"],
      "@4eye/features": ["packages/@4eye/features/src"],
      "@4eye/ai-sdk": ["packages/@4eye/ai-sdk/src"],
      "@4eye/graphql-schema": ["packages/@4eye/graphql-schema/src"]
    }
  }
}
```

---

## Package Dependencies

### **Dependency Graph**

```
Apps (4eye-web, api)
├── @expanse/application
│   ├── @expanse/auth
│   │   └── @expanse/user
│   ├── @expanse/theme
│   ├── @expanse/shell
│   ├── @expanse/analytics
│   │   └── @expanse/user
│   └── @expanse/user
├── @expanse/ui
│   └── @expanse/theme
├── @4eye/features
│   ├── @4eye/types
│   ├── @4eye/core
│   └── @4eye/ai-sdk
├── @4eye/core
│   └── @4eye/types
└── @4eye/types
```

**Key relationships:**
- Apps depend on both @expanse and @4eye packages
- @4eye packages depend on @expanse packages
- @expanse packages NEVER depend on @4eye packages
- @4eye/types has no dependencies (foundation)

---

## Build and Development

### **Development Scripts**

```bash
# Start Next.js web app
npm run dev:web

# Start NestJS API
npm run dev:api

# Run both in parallel (add script later)
npm run dev

# Type-check entire monorepo
npm run type-check

# Lint all packages
npm run lint

# Test all packages
npm run test
```

### **Workspace Commands**

```bash
# Install dependency in specific workspace
npm install package-name --workspace=apps/4eye-web

# Run script in specific workspace
npm run build --workspace=@expanse/ui

# Run script in all workspaces
npm run test --workspaces
```

---

## Future Enhancements

### **When Needed**

**Turborepo** - Build orchestration
- Add when packages stabilize
- Intelligent caching
- Parallel builds
- Dependency-aware execution

**Package Builds** - Pre-compilation
- Build packages to `dist/`
- Better tree-shaking
- Production optimization
- Separate development vs. production builds

**Lerna** - Versioning and publishing
- If packages become public
- Independent versioning
- Changelog generation
- Publishing workflow

### **Current Approach**

**Keep it simple:**
- npm workspaces only
- TypeScript path aliases
- Direct source imports
- No build step for packages

**Why:**
- Fast development
- Simple setup
- Easy debugging
- Sufficient for initial development

---

## Multi-App Architecture

### **Current Apps**

**4eye-web** - Main web application
- User-facing web app
- Authentication, dashboard, rooms
- Uses all packages

**api** - NestJS GraphQL API
- Backend API server
- GraphQL endpoint
- Authentication, business logic

### **Future Apps**

**admin-web** - Admin dashboard
- Organization management
- User administration
- Analytics and reporting
- Content moderation

**marketing-site** - Marketing website
- Public-facing marketing
- Landing pages
- Blog
- Documentation

**Why multi-app:**
- Separate deployments
- Different audiences
- Independent scaling
- Shared packages

---

## Related Documentation

- **[PACKAGE_ARCHITECTURE.md](PACKAGE_ARCHITECTURE.md)** - Package organization principles
- **[MIGRATION_GUIDE.md](../planning/MIGRATION_GUIDE.md)** - Migration strategy
- **[REPOSITORY_STRUCTURE.md](REPOSITORY_STRUCTURE.md)** - Current repository structure
- **[TECHNOLOGY_STACK.md](TECHNOLOGY_STACK.md)** - Technology choices
