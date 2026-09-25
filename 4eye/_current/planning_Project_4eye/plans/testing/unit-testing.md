# T1 — Unit Testing

> Jest setup for API and frontend unit tests.

**Status:** Planned — *not MVP*
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)

---

## Overview

Unit testing will be implemented in a future phase after core features are stable. This plan documents the approach for when testing is prioritized.

## Technology Stack

| Component | Choice | Notes |
|-----------|--------|-------|
| Test Runner | Jest | Standard for Node.js/React |
| React Testing | React Testing Library | Component testing |
| Mocking | Jest mocks | Service/module mocking |
| Coverage | Jest coverage | Target: 80% for critical paths |

## Scope

### Backend (apps/api)
- Service unit tests
- Resolver unit tests
- Guard/decorator tests
- Utility function tests

### Frontend (apps/4eye)
- Component unit tests
- Hook unit tests
- Utility function tests
- Provider/context tests

### Shared Libraries (libs/)
- Type validation tests
- Utility function tests
- UI component tests

## Directory Structure

```
apps/
├── api/
│   └── src/
│       └── modules/
│           └── auth/
│               ├── auth.service.ts
│               └── auth.service.spec.ts
├── 4eye/
│   └── components/
│       └── auth/
│           ├── LoginForm.tsx
│           └── LoginForm.test.tsx
```

## npm Scripts

```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:api": "npm run test --workspace=apps/api",
  "test:web": "npm run test --workspace=apps/4eye"
}
```

## Priority Areas

When implementing tests, focus on:
1. Authentication flows
2. AI provider adapters
3. GraphQL resolvers
4. Critical business logic
5. Utility functions

## Dependencies

- All core modules implemented
- Stable API surface

## Outputs

- [ ] Jest configured in root and each workspace
- [ ] Test utilities and mocks created
- [ ] CI pipeline runs tests on PR
- [ ] Coverage reports generated
