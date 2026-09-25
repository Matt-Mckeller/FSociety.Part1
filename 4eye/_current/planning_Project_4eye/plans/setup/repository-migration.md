# D2 — Repository Migration

## Purpose

Migrate the 4eye project into the ExpanseFrontend monorepo, establishing the foundation for a shared codebase that will eventually become "Expanse."

## Current State

- **ExpanseFrontend repo:** Contains existing `apps/4eye/` (will be renamed)
- **4eye-planning repo:** Planning documentation (stays separate)
- **Goal:** New 4eye app in ExpanseFrontend with backend

## Migration Steps

### 1. Rename Existing App

```bash
cd /Users/mm/Projects/ExpanseFrontend
mv apps/4eye apps/4eye-old-being-updated-to-perfect
```

### 2. Create New App Structure

```
ExpanseFrontend/
├── apps/
│   ├── 4eye/                 # New Next.js 14 frontend
│   │   ├── app/              # App Router
│   │   ├── components/       # App-specific components
│   │   ├── lib/              # App utilities
│   │   └── public/
│   ├── 4eye-old-being-updated-to-perfect/  # Original app
│   ├── api/                  # NestJS backend
│   │   ├── src/
│   │   │   ├── modules/      # Feature modules
│   │   │   ├── common/       # Guards, decorators, pipes
│   │   │   └── migrations/
│   │   └── test/
│   └── storybook/            # Existing
├── libs/
│   ├── types/                # Shared TypeScript interfaces
│   ├── ui/                   # Shared MUI components (existing)
│   ├── utils/                # Shared utilities
│   └── graphql-schema/       # GraphQL schemas + codegen
└── package.json              # Workspace root
```

### 3. Initialize New Apps

**Frontend (apps/4eye):**
```bash
npx create-next-app@14 apps/4eye --typescript --app --tailwind=false --eslint
```

**Backend (apps/api):**
```bash
npx @nestjs/cli new apps/api --package-manager npm --skip-git
```

### 4. Configure npm Workspaces

Update root `package.json`:
```json
{
  "name": "expanse-frontend",
  "workspaces": [
    "apps/*",
    "libs/*"
  ]
}
```

## Planning Repo Location

Planning documentation remains at `/Users/mm/Projects/4eye/4eye-planning/` as a separate repository:
- Clear separation of concerns
- Independent version control for planning
- Easy to archive or share planning separately

## Future: Rename to Expanse

Once the product matures, rename the project:
1. Update package names
2. Update repository name
3. Update all references
4. Update branding assets

## Dependencies

- None (first step in setup)

## Outputs

- [ ] Existing `apps/4eye/` renamed to `apps/4eye-old-being-updated-to-perfect/`
- [ ] New `apps/4eye/` Next.js 14 app created
- [ ] New `apps/api/` NestJS app created
- [ ] npm workspaces configured
- [ ] All apps building and running
