# Package Architecture

Complete guide to package organization, boundaries, and patterns in the 4eye monorepo.

---

## Package Organization Principles

### **Two Package Scopes**

**@expanse packages** - Infrastructure (reusable across any app)
- Authentication, theme, UI components, layout primitives
- User management, analytics, application orchestration
- Pure infrastructure with no business logic

**@4eye packages** - 4eye-specific (domain logic and AI features)
- Domain models (Room, Session, Organization)
- AI features (chat, transcription, translation, etc.)
- Business logic specific to 4eye platform

---

## Package Naming Conventions

### **Scope Naming**
```
@expanse/[package-name]  - Infrastructure packages
@4eye/[package-name]     - 4eye-specific packages
```

### **Package Name Patterns**
- **Singular nouns** - `@expanse/auth`, `@expanse/theme`, `@expanse/user`
- **Feature names** - `@4eye/chat`, `@4eye/transcription`
- **Descriptive** - Name should clearly indicate purpose
- **No prefixes** - Scope handles namespacing

### **Examples**
✅ Good:
- `@expanse/auth` - Clear, singular
- `@expanse/theme` - Purpose obvious
- `@4eye/transcription` - Feature name

❌ Avoid:
- `@expanse/expanse-auth` - Redundant scope
- `@expanse/authentication-system` - Too verbose
- `@4eye/ai-chat-feature` - Over-specified

---

## Package Overview

### **@expanse Packages**

| Package | Purpose | Key Exports |
|---------|---------|-------------|
| `@expanse/auth` | Authentication system | `AuthProvider`, `useAuth`, `LoginForm` |
| `@expanse/theme` | MUI theming, tokens, fonts, z-index | `ThemeProvider`, `LightDarkModeToggle`, `ThemeColorSelector`, `Z_INDEX` |
| `@expanse/ui` | Presentation-only UI building blocks (no HUD/map awareness) | `CountBadge`, `SkipLinks`, `mergeSx`, `renderIcon`, form inputs |
| `@expanse/map` | Map + navigation engine (grid, minimap, tiles, history) | `NavigationProvider`, `useNavigation`, `Minimap`, `MapLayoutProvider`, `TileConfig`, `TileCategory` |
| `@expanse/shell` | App shell: providers, page scaffolding, templates, skeletons | `LayoutProvider`, `LayoutConfigProvider`, `MinimalLayout`, `PageContent`, `LayoutSkeleton` |
| `@expanse/hud` | HUD chrome, widgets, map-aware views, HUD templates | `FullHud`, `NavigationPad`, `ActionBar`, `MinimapPanel`, `MinimapFullView` |
| `@expanse/user` | User types | `User`, `UserRole`, `ReadingLevel` |
| `@expanse/validation` | Input validation | `LoginInput`, `SignupInput`, validators |
| `@expanse/scoring` | Learn / Earn / Compete scoring engine (backend-ready) | `useScoring`, `computeScores`, `getScoringVariant`, `ScoringService` |
| `@expanse/types` | Convenience re-exports | All common types from other packages |
| `@expanse/analytics` | Analytics utilities | (placeholder) |
| `@expanse/utils` | Shared utilities | (placeholder) |

### **@4eye Packages**

| Package | Purpose | Key Exports |
|---------|---------|-------------|
| `@4eye/types` | Domain types | `Room`, `Session`, `Transcript` |
| `@4eye/ai-sdk` | AI integrations | (in development) |

---

## When to Create a New Package

### **Decision Tree**

**Is it reusable infrastructure?**
- YES → Create @expanse package
- NO → Continue

**Is it 4eye-specific domain logic?**
- YES → Create @4eye package or add to existing
- NO → Consider app-specific module

**Is it a complete, cohesive feature?**
- YES → Create new package
- NO → Add to existing package

**Will it have 3+ files and own API?**
- YES → Create new package
- NO → Add to existing package or app module

### **Examples**

**Create @expanse/auth** ✅
- Reusable infrastructure
- Complete authentication system
- 10+ files
- Clear public API

**Add to @4eye/core** ✅
- Room management logic
- Part of core domain
- Shares types with other core features

**Create app module** ✅
- Dashboard-specific UI
- Not reusable
- Composes packages

---

## Package Structure Requirements

### **Standard Structure**

```
packages/@scope/package-name/
├── src/                    # Source code
│   ├── index.ts            # Public API (barrel export)
│   ├── components/         # React components (if applicable)
│   ├── hooks/              # React hooks (if applicable)
│   ├── context/            # React context (if applicable)
│   ├── utils/              # Utilities
│   └── types/              # TypeScript types (local to package)
│
├── docs/                   # Package documentation
│   ├── README.md           # Package overview
│   ├── API.md              # API reference
│   └── EXAMPLES.md         # Usage examples
│
├── __tests__/              # Tests (optional initially)
│   ├── unit/
│   └── integration/
│
├── package.json            # Package metadata
├── tsconfig.json           # TypeScript config (extends base)
└── README.md               # Brief overview (links to docs/)
```

### **Required Files**

**package.json**
```json
{
  "name": "@scope/package-name",
  "version": "0.1.0",
  "private": true,
  "main": "src/index.ts",
  "types": "src/index.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "jest"
  }
}
```

**src/index.ts** - Public API
```typescript
// Export only public API
export * from './components';
export * from './hooks';
export { default as SpecificComponent } from './components/SpecificComponent';
export type { PublicType, AnotherType } from './types';
```

**docs/README.md** - Package documentation
```markdown
# @scope/package-name

[Brief description]

## Installation
## Usage
## API
## Documentation
```

---

## Package Boundaries & Dependencies

### **Dependency Rules**

**@expanse packages:**
- ✅ Can depend on other @expanse packages
- ❌ CANNOT depend on @4eye packages
- ❌ CANNOT depend on app code

**@4eye packages:**
- ✅ Can depend on @expanse packages
- ✅ Can depend on other @4eye packages
- ❌ CANNOT depend on app code

**Apps:**
- ✅ Can depend on @expanse packages
- ✅ Can depend on @4eye packages
- ✅ Can have app-specific modules

### **Import Patterns**

**Good - Clear boundaries:**
```typescript
// In @4eye/chat
import { useAuth } from '@expanse/auth';
import type { Room } from '@4eye/types';
import { RoomCard } from './components/RoomCard';
```

**Bad - Breaks boundaries:**
```typescript
// In @expanse/auth
import { Room } from '@4eye/types';  // ❌ @expanse cannot import @4eye

// In @4eye/chat
import { DashboardHeader } from '../../../apps/4eye-web/modules/layout';  // ❌ Package cannot import from app
```

### **Circular Dependencies**

**Avoid circular dependencies between packages:**

❌ **Bad:**
```
@expanse/auth -> @expanse/user -> @expanse/auth  (circular!)
```

✅ **Good:**
```
@expanse/auth -> @expanse/user
@expanse/analytics -> @expanse/auth
@expanse/analytics -> @expanse/user
```

**Solution:** Extract shared types to a common location or introduce a third package.

---

## Import/Export Patterns

### **Barrel Exports**

**Use barrel exports for public API:**

```typescript
// src/index.ts
export * from './components';
export * from './hooks';
export * from './context';
export type * from './types';
```

**Group exports by category:**

```typescript
// src/components/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Modal } from './Modal';
```

### **Named vs Default Exports**

**Prefer named exports:**
```typescript
// ✅ Good
export function useAuth() { ... }
export const AuthProvider = () => { ... };

// ❌ Avoid default exports (except Next.js pages)
export default function useAuth() { ... }
```

**Why:** Better for tree-shaking, refactoring, and IDE support.

### **Type-Only Exports**

**Separate type exports:**
```typescript
// Export types explicitly
export type { User, LoginInput, AuthContextType } from './types';

// Use type-only imports
import type { User } from '@expanse/user';
```

---

## Documentation Requirements

### **Package-Level Documentation**

**Every package MUST have:**

1. **README.md** (root) - Brief overview, links to docs/
2. **docs/README.md** - Complete package guide
3. **docs/API.md** - API reference
4. **docs/EXAMPLES.md** - Usage examples

**Optional:**
- Architecture docs for complex packages
- Migration guides for breaking changes
- Performance guides for optimization-critical packages

### **Documentation Standards**

**Include:**
- Purpose and scope
- Installation/setup
- Basic usage examples
- Complete API reference
- Common patterns
- Known limitations
- Related packages

**Keep concise:**
- Focus on practical usage
- Link to shared docs for cross-cutting concepts
- Use code examples over prose

---

## Testing Strategy

### **Test Pyramid**

**Unit Tests** (Many)
- Test individual functions/components
- Fast, isolated
- Mock dependencies

**Integration Tests** (Some)
- Test package integration
- Test with real dependencies
- Realistic scenarios

**E2E Tests** (Few)
- Test full user flows
- App-level only
- Critical paths

### **Testing Per Package Type**

**@expanse packages:**
- Unit tests for utilities
- Component tests with @testing-library/react
- Hook tests with @testing-library/react-hooks
- Integration tests for complex flows

**@4eye packages:**
- Unit tests for business logic
- Integration tests for AI integrations
- E2E tests for critical features (app-level)

**Apps:**
- E2E tests for user flows
- Integration tests for app-specific modules

### **Test Location**

```
packages/@scope/package-name/
├── src/
│   └── components/
│       └── Button.tsx
└── __tests__/
    ├── unit/
    │   └── Button.test.tsx
    └── integration/
        └── ButtonIntegration.test.tsx
```

---

## Version Management

### **Initial Development**

**All packages start at 0.1.0:**
```json
{
  "version": "0.1.0",
  "private": true
}
```

**Why:**
- Pre-1.0 signals "in development"
- `private: true` prevents accidental publishing
- Versions synchronized across monorepo

### **Future Versioning**

**When stable:**
- Individual package versions
- Semantic versioning (semver)
- Changelog per package
- Breaking change tracking

**For now:**
- Keep all at 0.1.0
- Track changes in git commits only
- No formal versioning process

---

## Adding a New Package

### **Step-by-Step**

**1. Create package structure:**
```bash
mkdir -p packages/@scope/package-name/{src,docs,__tests__}
```

**2. Create package.json:**
```bash
# Use template from docs/templates/package.json
cp docs/templates/package.json packages/@scope/package-name/
```

**3. Create tsconfig.json:**
```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

**4. Create src/index.ts:**
```typescript
export * from './components';
export * from './hooks';
// ... export public API
```

**5. Create documentation:**
```bash
# Use template from docs/templates/README.md
cp docs/templates/README.md packages/@scope/package-name/docs/
```

**6. Add to tsconfig paths:**
```json
// tsconfig.base.json
{
  "paths": {
    "@scope/package-name": ["packages/@scope/package-name/src"]
  }
}
```

**7. Document in monorepo:**
- Add to MONOREPO_STRUCTURE.md
- Add to package list in REPOSITORY_STRUCTURE.md

---

## Package Dependencies Management

### **Peer Dependencies**

**Use peer dependencies for common libs:**

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@mui/material": "^5.0.0"
  }
}
```

**Why:** Ensures single version across monorepo.

### **Internal Dependencies**

**Reference other monorepo packages:**

```json
{
  "dependencies": {
    "@expanse/auth": "*",
    "@4eye/types": "*"
  }
}
```

**Use `*` for monorepo packages** - Resolved via workspaces.

---

## Build Configuration

### **Development (Current)**

**TypeScript path aliases only:**
- No build step
- Direct TypeScript compilation
- Fast hot reload
- Simple setup

**tsconfig.base.json:**
```json
{
  "compilerOptions": {
    "paths": {
      "@expanse/auth": ["packages/@expanse/auth/src"],
      "@expanse/theme": ["packages/@expanse/theme/src"]
    }
  }
}
```

### **Production (Future)**

**Add build orchestration when needed:**
- Turborepo for intelligent caching
- Package builds for tree-shaking
- Separate build steps

**When to add:**
- Packages stabilize
- Team grows
- CI/CD optimization needed

---

## Common Patterns

### **Provider Pattern**

```typescript
// packages/@expanse/auth/src/context/AuthProvider.tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // ... context logic
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// packages/@expanse/auth/src/hooks/useAuth.ts
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// packages/@expanse/auth/src/index.ts
export { AuthProvider } from './context/AuthProvider';
export { useAuth } from './hooks/useAuth';
export type { AuthContextType } from './types';
```

### **Component Export Pattern**

```typescript
// packages/@expanse/ui/src/components/Button.tsx
export interface ButtonProps { ... }
export function Button({ ...props }: ButtonProps) { ... }

// packages/@expanse/ui/src/components/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';

// packages/@expanse/ui/src/index.ts
export * from './components';
```

---

## Related Documentation

- **[MONOREPO_STRUCTURE.md](MONOREPO_STRUCTURE.md)** - Complete monorepo layout
- **[REPOSITORY_STRUCTURE.md](REPOSITORY_STRUCTURE.md)** - Current structure
- **[MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)** - Migration strategy
- **[TYPE_ORGANIZATION.md](TYPE_ORGANIZATION.md)** - Type organization patterns
