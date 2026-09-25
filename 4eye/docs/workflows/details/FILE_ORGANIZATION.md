# File Organization Workflows

Guidelines for where to place files and how to organize new work in the 4eye project.

> **See [REPOSITORY_STRUCTURE.md](../../technical/REPOSITORY_STRUCTURE.md)** for current directory structure, naming conventions, and import patterns.

---

## Where to Place New Files

### Planning Documents
**Location:** `docs/planning/plans/`

**When to create:**
- New feature specifications
- Module architecture plans
- Integration designs
- Vertical-specific plans

**Subdirectories:**
- `app-features/` — User-facing features
- `core/` — Core infrastructure (auth, database, GraphQL, AI)
- `infrastructure/` — Cloud infrastructure, deployment
- `website/` — Website features (dashboards, profiles, payments)
- `verticals/` — Market-specific configurations
- `testing/` — Testing strategies

### Technical Documentation
**Location:** `docs/technical/`

**When to create:**
- API reference docs
- Architecture decision records (ADRs)
- Technical how-to guides
- System architecture diagrams

### Development Procedures
**Location:** `docs/workflows/` or `docs/workflows/details/`

**When to create:**
- New development procedures
- Team process documentation
- Tool usage guides
- Workflow improvements

### Implementation Summaries
**Location:** `docs/summaries/`

**When to create:**
- After completing plan implementation
- Major refactoring work
- Significant architecture changes

**Naming:** `[plan-code]-[feature-name]-summary.md` (e.g., `C2-authentication-summary.md`)

---

## Code Organization

### Package Module Pattern

Domain logic goes in packages, organized by feature:

```
packages/@4eye/core/src/rooms/
├── context/                    # Providers + hooks
│   └── RoomsContext.tsx
├── hooks/                      # Additional hooks
│   └── useCreateRoomForm.ts
├── graphql/                    # GraphQL operations
│   └── queries.ts
├── types/                      # Module-local types
│   └── types.ts
└── index.ts                    # Public exports
```

### App Components

App-specific UI components are feature-grouped:

```
apps/4eye-web/components/rooms/
├── RoomList.tsx
├── RoomCard.tsx
└── CreateRoomModal.tsx
```

**Key principle:** Logic in packages, UI in apps.

---

## Type Organization

**See [TYPE_ORGANIZATION.md](../../technical/TYPE_ORGANIZATION.md)** for complete type system documentation.

**Quick reference:**
- Types belong in `@4eye/types` if used/may be used in 2+ places
- Component-local props stay co-located with components
- Follow domain structure: entities/, inputs/, ai/, enums/

---

## Moving Files

### Process

**Before moving files:**
1. Search for references: `grep -r "old/path" .`
2. Update all imports and links
3. Update documentation references
4. Test builds still work (`npm run type-check`)
5. Commit with clear message

**Use git mv when possible:**
```bash
git mv old/path/file.md new/path/file.md
```

This preserves git history and shows renames, not deletes+adds.

### When Moving Affects Many Files

1. Create list of all affected files
2. Use find/replace or script for bulk updates
3. Verify no broken imports: `npm run type-check`
4. Verify no broken links in docs
5. Commit in single atomic change

---

## Archive Policy

### When to Archive

Move to `docs/archive/` when:
- Document is historical context only
- Research document no longer actively used
- Superseded by newer documentation
- Still valuable for reference but not current

### What NOT to Archive

- Current planning documents
- Active feature specifications
- Technical reference docs
- Standards and guidelines

---

## Related Documentation

- **[REPOSITORY_STRUCTURE.md](../../technical/REPOSITORY_STRUCTURE.md)** — Directory structure, naming, imports
- **[MODULE_ARCHITECTURE.md](../../technical/MODULE_ARCHITECTURE.md)** — Module patterns
- **[DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md)** — Overall development process
