---
# applyTo: "apps/api/**"
---

# Backend Patterns

## Rules
- Self-contained NestJS modules
- GraphQL code-first (TypeScript decorators)
- DTOs for input validation
- Guards for authorization
- Services for business logic

## Documentation
- [MODULE_ARCHITECTURE.md](docs/technical/MODULE_ARCHITECTURE.md)
- [GRAPHQL_CODE_FIRST.md](docs/technical/GRAPHQL_CODE_FIRST.md)
- [AUTHENTICATION.md](docs/technical/AUTHENTICATION.md)
- [TECHNICAL_STANDARDS.md](docs/technical/TECHNICAL_STANDARDS.md)

## Examples
- Module structure: `apps/api/src/modules/auth/`
- Resolver: `apps/api/src/modules/users/users.resolver.ts`
- Service: `apps/api/src/modules/users/users.service.ts`
- Guards: `apps/api/src/common/guards/`

## Don't
- Cross-module direct imports (use GraphQL field resolvers)
- Business logic in resolvers (put in services)
- Skip input validation (use DTOs)
