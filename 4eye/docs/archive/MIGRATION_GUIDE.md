# Migration Guide (SUPERSEDED)

> **⚠️ This document is superseded.**
> See the updated architecture and implementation plan at:
> - [`docs/planning/expanse-packages/ARCHITECTURE.md`](../planning/expanse-packages/ARCHITECTURE.md)
> - [`docs/planning/expanse-packages/IMPLEMENTATION_PLAN.md`](../planning/expanse-packages/IMPLEMENTATION_PLAN.md)
>
> This document remains for historical reference.

---

Step-by-step guide for migrating from libs/ structure to packages/ structure and extracting ExpanseFrontend patterns.

---

## Migration Overview

### **Three Phases**

**Phase 1: Architecture Foundation** ✅ Current Phase
- Create complete documentation
- Setup directory structure
- Add placeholder package.json files
- Configure TypeScript paths
- No code migration yet

**Phase 2: Extract ExpanseFrontend Patterns**
- Extract and adapt patterns from ExpanseFrontend
- Priority: Theme → Layout → Auth → UI → User → Analytics → Application
- Create @expanse packages with extracted code
- Test each package independently

**Phase 3: Build 4eye Features**
- Create @4eye packages
- Migrate existing code from libs/
- Build AI-powered features
- Complete feature development

---

## Phase 1: Architecture Foundation

**Goal:** Establish complete structure and documentation without moving code.

### **Step 1.1: Create Documentation** ✅ COMPLETE

**Files created:**
- `docs/technical/PACKAGE_ARCHITECTURE.md` - Package organization guide
- `docs/technical/MONOREPO_STRUCTURE.md` - Complete directory tree
- `docs/planning/MIGRATION_GUIDE.md` - This file
- `docs/technical/AUTHENTICATION.md` - Auth system documentation
- `docs/technical/MUI_THEME_SYSTEM.md` - Theme system guide
- `docs/templates/package.json` - Package template
- `docs/templates/README.md` - Package README template
- Updated `docs/technical/REPOSITORY_STRUCTURE.md` - Reference updated
- Updated `.github/copilot-instructions.md` - Instructions updated

**Outcome:** Complete architectural documentation foundation.

---

### **Step 1.2: Create Directory Structure** 🚧 NEXT

**Create @expanse packages:**

```bash
# Create @expanse package directories
mkdir -p packages/@expanse/{auth,theme,ui,layout,user,analytics,application,utils}/{src,docs,__tests__}

# Create subdirectories for each package
# Auth
mkdir -p packages/@expanse/auth/src/{components,context,guards,hooks,utils,types}

# Theme
mkdir -p packages/@expanse/theme/src/{Brand/{primary,blue,green,orange},configs,context,hooks,utils}

# UI
mkdir -p packages/@expanse/ui/src/{components,form,feedback,navigation}

# Layout
mkdir -p packages/@expanse/shell/src/{components,hooks,context}

# User
mkdir -p packages/@expanse/user/src/{context,hooks,components}

# Analytics
mkdir -p packages/@expanse/analytics/src/{context,hooks,utils}

# Application
mkdir -p packages/@expanse/application/src

# Utils
mkdir -p packages/@expanse/utils/src/{array,date,string,validation}
```

**Create @4eye packages:**

```bash
# Create @4eye package directories
mkdir -p packages/@4eye/{types,core,features,ai-sdk,graphql-schema}/{src,docs,__tests__}

# Types subdirectories
mkdir -p packages/@4eye/types/src/{entities,inputs,ai,enums}

# Core subdirectories
mkdir -p packages/@4eye/core/src/{room,session,organization,user}

# Features subdirectories
mkdir -p packages/@4eye/features/src/{chat,transcription,translation,summarization,quiz}

# AI SDK subdirectories
mkdir -p packages/@4eye/ai-sdk/src/{providers,typed-responses,utils}

# GraphQL schema
mkdir -p packages/@4eye/graphql-schema/src
```

**Expected outcome:** Complete packages/ directory structure with empty subdirectories.

---

### **Step 1.3: Create Package Configuration Files** 🚧 NEXT

**For each package, create:**

**package.json** (use template from `docs/templates/package.json`):

```bash
# Example for @expanse/auth
cat > packages/@expanse/auth/package.json << 'EOF'
{
  "name": "@expanse/auth",
  "version": "0.1.0",
  "private": true,
  "main": "src/index.ts",
  "types": "src/index.ts",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc",
    "test": "jest"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "@expanse/user": "*"
  }
}
EOF

# Repeat for all 13 packages
```

**tsconfig.json:**

```bash
# Example for @expanse/auth
cat > packages/@expanse/auth/tsconfig.json << 'EOF'
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "__tests__"]
}
EOF

# Repeat for all packages
```

**src/index.ts** (placeholder):

```bash
# For each package
echo "// Placeholder - package not yet implemented" > packages/@expanse/auth/src/index.ts
# Repeat for all packages
```

**README.md** (use template from `docs/templates/README.md`):

```bash
# Copy template and customize for each package
cp docs/templates/README.md packages/@expanse/auth/
# Edit with package-specific details
```

**Expected outcome:** All 13 packages have basic configuration files.

---

### **Step 1.4: Update TypeScript Configuration** 🚧 NEXT

**Update tsconfig.base.json** to add all package path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      // @expanse packages
      "@expanse/auth": ["packages/@expanse/auth/src"],
      "@expanse/theme": ["packages/@expanse/theme/src"],
      "@expanse/ui": ["packages/@expanse/ui/src"],
      "@expanse/shell": ["packages/@expanse/shell/src"],
      "@expanse/user": ["packages/@expanse/user/src"],
      "@expanse/analytics": ["packages/@expanse/analytics/src"],
      "@expanse/application": ["packages/@expanse/application/src"],
      "@expanse/utils": ["packages/@expanse/utils/src"],
      
      // @4eye packages
      "@4eye/types": ["packages/@4eye/types/src"],
      "@4eye/core": ["packages/@4eye/core/src"],
      "@4eye/features": ["packages/@4eye/features/src"],
      "@4eye/ai-sdk": ["packages/@4eye/ai-sdk/src"],
      "@4eye/graphql-schema": ["packages/@4eye/graphql-schema/src"],
      
      // Keep existing libs/ paths temporarily
      "@4eye/core": ["libs/4eye-core/src"],
      "@4eye/state": ["libs/4eye-state/src"],
      "@4eye/types": ["libs/4eye-types/src"],
      "@4eye/graphql-schema": ["libs/graphql-schema/src"],
      "@4eye/ui": ["libs/ui/src"],
      "@4eye/utils": ["libs/utils/src"]
    }
  }
}
```

**Update root package.json workspaces:**

```json
{
  "workspaces": [
    "apps/*",
    "packages/@expanse/*",
    "packages/@4eye/*",
    "libs/*"  // Keep temporarily during migration
  ]
}
```

**Run npm install:**

```bash
npm install
```

**Expected outcome:** TypeScript recognizes all package paths, npm workspaces configured.

---

### **Step 1.5: Verify Structure** 🚧 NEXT

**Verification checklist:**

```bash
# Check directory structure exists
ls -R packages/@expanse/
ls -R packages/@4eye/

# Check all packages have package.json
find packages -name "package.json" -type f | wc -l  # Should be 13

# Check TypeScript recognizes paths
npx tsc --noEmit

# Check npm workspaces
npm list --workspaces

# Check documentation exists
ls docs/technical/PACKAGE_ARCHITECTURE.md
ls docs/technical/MONOREPO_STRUCTURE.md
ls docs/technical/AUTHENTICATION.md
ls docs/technical/MUI_THEME_SYSTEM.md
```

**Expected outcome:** All checks pass, no TypeScript errors (placeholder imports are fine).

---

### **Phase 1 Completion**

**Deliverables:**
- ✅ Complete documentation (10 files)
- 🚧 Complete packages/ directory structure
- 🚧 All package configuration files
- 🚧 TypeScript paths configured
- 🚧 npm workspaces working

**Outcome:** Solid foundation for Phase 2 code migration.

---

## Phase 2: Extract ExpanseFrontend Patterns

**Goal:** Extract and adapt infrastructure patterns from ExpanseFrontend into @expanse packages.

### **Extraction Priority**

1. **Theme** - Multi-theme system foundation
2. **Layout** - Layout primitives and utilities  
3. **Auth** - Authentication system
4. **UI** - Shared UI components
5. **User** - User context and management
6. **Analytics** - Analytics integration
7. **Application** - Provider composition

**Why this order:**
- Theme needed by all other packages
- Layout needed by Auth and UI
- Auth needed by User and Analytics
- Everything else builds on these

---

### **Step 2.1: Extract Theme Package** 🔜 NEXT IN PHASE 2

**Source files in ExpanseFrontend:**
- `packages/ui/theme/Brand/` - Theme definitions
- `packages/ui/theme/configs/common-theme.ts` - Shared config
- `packages/ui/theme/configs/light-palette.ts` - Light palette
- `packages/ui/theme/configs/dark-palette.ts` - Dark palette
- `packages/ui/theme/context/Theme.context.tsx` - ThemeProvider
- `packages/ui/theme/hooks/` - Theme hooks

**Steps:**

1. **Copy theme configurations:**
   ```bash
   # Copy brand themes
   cp -r /Users/mm/Projects/ExpanseFrontend/packages/ui/theme/Brand/ \
         packages/@expanse/theme/src/Brand/
   
   # Copy configs
   cp -r /Users/mm/Projects/ExpanseFrontend/packages/ui/theme/configs/ \
         packages/@expanse/theme/src/configs/
   ```

2. **Copy theme context and hooks:**
   ```bash
   cp -r /Users/mm/Projects/ExpanseFrontend/packages/ui/theme/context/ \
         packages/@expanse/theme/src/context/
   
   cp -r /Users/mm/Projects/ExpanseFrontend/packages/ui/theme/hooks/ \
         packages/@expanse/theme/src/hooks/
   ```

3. **Adapt imports:**
   - Update all internal imports to use @expanse scope
   - Remove ExpanseFrontend-specific dependencies
   - Update to use @4eye/types if needed

4. **Create src/index.ts:**
   ```typescript
   export * from './context';
   export * from './hooks';
   export * from './configs';
   export type * from './types';
   ```

5. **Write documentation:**
   - Create `packages/@expanse/theme/docs/README.md`
   - Document theme structure, usage, and customization

6. **Test:**
   ```bash
   # Type-check
   npx tsc --noEmit --project packages/@expanse/theme/tsconfig.json
   
   # Test in 4eye-web
   # Replace apps/4eye-web/theme/theme.ts with @expanse/theme
   ```

**Expected outcome:** Working @expanse/theme package with multi-theme support.

---

### **Step 2.2: Extract Layout Package** 🔜

**Source files in ExpanseFrontend:**
- `packages/ui/application/context/Layout.context.tsx` - LayoutProvider
- Custom layout utilities (max-width, responsive padding)

**Steps:**

1. **Extract LayoutProvider:**
   ```bash
   cp ExpanseFrontend/packages/ui/application/context/Layout.context.tsx \
      packages/@expanse/shell/src/context/LayoutProvider.tsx
   ```

2. **Create layout primitives:**
   ```typescript
   // packages/@expanse/shell/src/components/MaxWidthContainer.tsx
   export function MaxWidthContainer({ maxWidth = 1440, children }) {
     return (
       <Box sx={{ maxWidth, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
         {children}
       </Box>
     );
   }
   
   // packages/@expanse/shell/src/components/StretchLayout.tsx
   // packages/@expanse/shell/src/components/PageShell.tsx
   ```

3. **Extract hooks:**
   ```typescript
   // packages/@expanse/shell/src/hooks/useSnackbar.ts
   // packages/@expanse/shell/src/hooks/useLoadingSpinner.ts
   // packages/@expanse/shell/src/hooks/useDrawer.ts
   ```

4. **Create placeholder for SymbolGrid:**
   ```typescript
   // packages/@expanse/shell/src/components/SymbolGrid.tsx
   export function SymbolGrid({ children }: { children: React.ReactNode }) {
     // TODO: Implement symbol grid system
     return <>{children}</>;
   }
   ```

5. **Document:**
   - Create docs/README.md
   - Document layout primitives
   - Add note about SymbolGrid being placeholder

**Expected outcome:** Working @expanse/shell with primitives, hooks, and SymbolGrid placeholder.

---

### **Step 2.3: Extract Auth Package** 🔜

**Source files in ExpanseFrontend:**
- `packages/ui/auth/context/AuthSession.context.tsx` - JWT management
- Auth components (LoginForm, SignupForm, AuthModal)
- Auth guards and utilities

**Steps:**

1. **Extract AuthSession context:**
   ```bash
   cp ExpanseFrontend/packages/ui/auth/context/AuthSession.context.tsx \
      packages/@expanse/auth/src/context/AuthSessionProvider.tsx
   ```

2. **Create AuthProvider (combines AuthSession + User):**
   ```typescript
   // packages/@expanse/auth/src/context/AuthProvider.tsx
   // Compose AuthSession and User logic
   ```

3. **Extract auth components:**
   ```bash
   cp -r ExpanseFrontend/packages/ui/auth/components/ \
         packages/@expanse/auth/src/components/
   ```

4. **Create auth guards:**
   ```typescript
   // packages/@expanse/auth/src/guards/RequireAuth.tsx
   // packages/@expanse/auth/src/guards/RequireGuest.tsx
   // packages/@expanse/auth/src/guards/RequireRole.tsx
   ```

5. **Create auth hooks:**
   ```typescript
   // packages/@expanse/auth/src/hooks/useAuth.ts
   // packages/@expanse/auth/src/hooks/useAuthSession.ts
   // packages/@expanse/auth/src/hooks/useRequireAuth.ts
   ```

6. **Add guest mode support:**
   ```typescript
   // packages/@expanse/auth/src/components/GuestModeButton.tsx
   // Update AuthProvider to handle guest mode
   ```

7. **Document:**
   - Complete authentication flow
   - Session management
   - Guard usage
   - Guest mode

**Expected outcome:** Complete @expanse/auth package with session management and guest mode.

---

### **Step 2.4-2.7: Extract Remaining Packages** 🔜

**Follow similar pattern for:**
- **UI** - Extract shared components from ExpanseFrontend
- **User** - Extract UserProvider
- **Analytics** - Extract AnalyticsProvider
- **Application** - Extract ApplicationProvider composition

**For each:**
1. Identify source files in ExpanseFrontend
2. Copy to @expanse package
3. Adapt imports and dependencies
4. Create public API (src/index.ts)
5. Write documentation
6. Test integration

---

### **Phase 2 Completion**

**Deliverables:**
- 🔜 7 @expanse packages fully implemented
- 🔜 All packages documented
- 🔜 All packages tested
- 🔜 Integrated into apps/4eye-web

**Outcome:** Complete infrastructure foundation from ExpanseFrontend patterns.

---

## Phase 3: Build 4eye Features

**Goal:** Create @4eye packages and migrate existing code from libs/.

### **Step 3.1: Migrate @4eye/types** 🔜

**Current:** `libs/4eye-types/`

**Target:** `packages/@4eye/types/`

**Steps:**

1. **Copy type definitions:**
   ```bash
   cp -r libs/4eye-types/src/* packages/@4eye/types/src/
   ```

2. **Reorganize structure:**
   ```
   packages/@4eye/types/src/
   ├── entities/        # User, Room, Session, Organization
   ├── inputs/          # CreateRoomInput, UpdateUserInput, etc.
   ├── ai/              # Transcript, Translation, Summary
   └── enums/           # RoomType, UserRole, SessionStatus
   ```

3. **Update imports across codebase:**
   ```bash
   # Update apps and libs to use new path
   find apps libs -name "*.ts" -o -name "*.tsx" | \
     xargs sed -i '' 's|@4eye/types|@4eye/types|g'
   ```

4. **Remove old libs/4eye-types:**
   ```bash
   git rm -r libs/4eye-types
   ```

**Expected outcome:** Types moved to packages/@4eye/types, all imports updated.

---

### **Step 3.2: Create @4eye/core** 🔜

**Purpose:** Domain logic for Room, Session, Organization, User

**Steps:**

1. **Extract domain logic from current codebase:**
   - Room management functions
   - Session orchestration
   - Organization hierarchy
   - User domain logic

2. **Create package structure:**
   ```typescript
   // packages/@4eye/core/src/room/RoomService.ts
   // packages/@4eye/core/src/session/SessionService.ts
   // packages/@4eye/core/src/organization/OrganizationService.ts
   // packages/@4eye/core/src/user/UserService.ts
   ```

3. **Use @4eye/types:**
   ```typescript
   import type { Room, CreateRoomInput } from '@4eye/types';
   ```

4. **Document:**
   - Domain model documentation
   - Business rules
   - API reference

**Expected outcome:** Core domain logic in @4eye/core package.

---

### **Step 3.3: Create @4eye/features** 🔜

**Purpose:** AI-powered features (chat, transcription, translation, etc.)

**Steps:**

1. **Create feature modules:**
   ```typescript
   // packages/@4eye/features/src/chat/
   // packages/@4eye/features/src/transcription/
   // packages/@4eye/features/src/translation/
   // packages/@4eye/features/src/summarization/
   // packages/@4eye/features/src/quiz/
   ```

2. **Implement features using @4eye/ai-sdk:**
   ```typescript
   import { createAIProvider } from '@4eye/ai-sdk';
   import type { ChatMessage, Transcript } from '@4eye/types';
   ```

3. **Document each feature:**
   - Feature overview
   - API reference
   - Usage examples
   - Configuration options

**Expected outcome:** AI features in dedicated package with clean APIs.

---

### **Step 3.4: Create @4eye/ai-sdk** 🔜

**Purpose:** AI provider abstraction layer

**Steps:**

1. **Extract from libs/ if exists, or create new:**
   ```typescript
   // packages/@4eye/ai-sdk/src/providers/OpenAIProvider.ts
   // packages/@4eye/ai-sdk/src/providers/AnthropicProvider.ts
   // packages/@4eye/ai-sdk/src/providers/GoogleProvider.ts
   ```

2. **Implement typed responses:**
   ```typescript
   // packages/@4eye/ai-sdk/src/typed-responses/
   // Zod schemas for AI responses
   ```

3. **Create factory:**
   ```typescript
   export function createAIProvider(config: AIProviderConfig) {
     // Factory for creating provider instances
   }
   ```

**Expected outcome:** Clean AI provider abstraction used by @4eye/features.

---

### **Step 3.5: Migrate @4eye/graphql-schema** 🔜

**Current:** `libs/graphql-schema/`

**Target:** `packages/@4eye/graphql-schema/`

**Steps:**

1. **Move package:**
   ```bash
   mv libs/graphql-schema packages/@4eye/graphql-schema
   ```

2. **Update package.json:**
   ```json
   {
     "name": "@4eye/graphql-schema",
     "dependencies": {
       "@4eye/types": "*"
     }
   }
   ```

3. **Update imports in apps/api:**
   ```bash
   find apps/api -name "*.ts" | \
     xargs sed -i '' 's|@4eye/graphql-schema|@4eye/graphql-schema|g'
   ```

**Expected outcome:** GraphQL schema in packages/ with clean dependencies.

---

### **Step 3.6: Clean Up libs/** 🔜

**Remove old libs/ directory:**

```bash
# Verify nothing left in libs/
ls libs/

# Remove libs/ directory
git rm -r libs/

# Remove libs/ from workspaces in root package.json
# Remove libs/ from tsconfig.base.json paths
```

**Update documentation:**
- Remove all references to libs/
- Update examples to use packages/

**Expected outcome:** Clean monorepo with only packages/ and apps/.

---

### **Phase 3 Completion**

**Deliverables:**
- 🔜 All @4eye packages created
- 🔜 Existing code migrated from libs/
- 🔜 libs/ directory removed
- 🔜 All imports updated
- 🔜 All documentation updated

**Outcome:** Complete monorepo transformation with dual-scope packages.

---

## Testing Strategy

### **After Each Phase**

**Type-check entire monorepo:**
```bash
npx tsc --noEmit
```

**Test apps still work:**
```bash
npm run dev:web
npm run dev:api
```

**Verify imports:**
```bash
# Check for any remaining old imports
grep -r "@four-eye" apps/ packages/
grep -r "libs/" apps/ packages/
```

### **After Each Package Migration**

**Package-level tests:**
```bash
npm run test --workspace=@expanse/auth
npm run test --workspace=@4eye/core
```

**Integration tests:**
```bash
# Test package in context of app
npm run dev:web
# Manually test feature using migrated package
```

---

## Rollback Strategy

### **If Migration Fails**

**Git is your friend:**

```bash
# Rollback to before Phase 1
git reset --hard <commit-before-phase-1>

# Rollback specific package migration
git checkout HEAD -- packages/@expanse/auth
git checkout HEAD -- apps/4eye-web/lib/auth/

# Create migration branch
git checkout -b migration/phase-2-theme
# Work on branch, merge when stable
```

### **Incremental Approach**

**Migrate one package at a time:**
1. Create package
2. Test package in isolation
3. Integrate into app
4. Test app functionality
5. Commit before moving to next package

**Keep old code during transition:**
- Don't delete libs/ until all packages migrated
- Keep both old and new imports working temporarily
- Switch apps one feature at a time

---

## Success Criteria

### **Phase 1 Complete When:**
- ✅ All documentation written
- 🚧 All package directories created
- 🚧 All package.json files created
- 🚧 TypeScript paths configured
- 🚧 npm install succeeds
- 🚧 No TypeScript errors

### **Phase 2 Complete When:**
- All @expanse packages implemented
- All packages have documentation
- apps/4eye-web uses @expanse packages
- Theme system working
- Layout primitives working
- Authentication working

### **Phase 3 Complete When:**
- All @4eye packages created
- libs/ directory removed
- All imports updated
- All tests passing
- apps fully functional
- Documentation updated

---

## Timeline Estimates

### **Phase 1: Architecture Foundation**
- Documentation: ✅ COMPLETE (1 day)
- Directory structure: 🚧 2-4 hours
- Configuration files: 🚧 2-4 hours
- TypeScript setup: 🚧 1-2 hours
- Verification: 🚧 1 hour

**Total Phase 1:** ~2 days

### **Phase 2: Extract ExpanseFrontend**
- Theme package: 1-2 days
- Layout package: 1 day
- Auth package: 2-3 days
- UI package: 2-3 days
- User package: 1 day
- Analytics package: 1 day
- Application package: 1 day

**Total Phase 2:** ~2 weeks

### **Phase 3: Build 4eye Features**
- Migrate types: 1 day
- Create core: 2-3 days
- Create features: 1 week
- Create ai-sdk: 2-3 days
- Migrate graphql-schema: 1 day
- Cleanup: 1 day

**Total Phase 3:** ~2 weeks

**Overall Timeline:** ~4-5 weeks for complete migration

---

## Related Documentation

- **[PACKAGE_ARCHITECTURE.md](../technical/PACKAGE_ARCHITECTURE.md)** - Package organization principles
- **[MONOREPO_STRUCTURE.md](../technical/MONOREPO_STRUCTURE.md)** - Complete directory tree
- **[AUTHENTICATION.md](../technical/AUTHENTICATION.md)** - Auth system documentation
- **[MUI_THEME_SYSTEM.md](../technical/MUI_THEME_SYSTEM.md)** - Theme system guide
- **[TYPE_ORGANIZATION.md](../technical/TYPE_ORGANIZATION.md)** - Type organization
