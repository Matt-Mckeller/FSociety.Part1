# T2 — End-to-End Testing

> Playwright E2E tests for critical user flows.

**Status:** Planned — *not MVP*
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)

---

## Overview

E2E testing will be implemented in a future phase after core features are stable. This plan documents the approach for when testing is prioritized.

## Technology Stack

| Component | Choice | Notes |
|-----------|--------|-------|
| E2E Framework | Playwright | Cross-browser support |
| Test Runner | Playwright Test | Built-in assertions |
| CI Integration | GitHub Actions | Run on PR and main |

## Critical User Flows

Priority E2E tests for:

### Authentication
- Sign up flow
- Login flow
- Guest join flow
- Password reset flow

### Room Management
- Create room
- Join room via invite link
- Room settings

### Live Session
- Start session
- Audio capture and transcription
- Live translation display
- End session

### Post-Session
- View session history
- Generate summary
- View recap

### Billing
- View pricing
- Complete checkout
- Manage subscription

## Directory Structure

```
e2e/
├── fixtures/
│   ├── auth.ts           # Auth helpers
│   └── test-data.ts      # Test users, rooms
├── pages/
│   ├── login.page.ts     # Page object
│   ├── signup.page.ts
│   └── room.page.ts
├── tests/
│   ├── auth.spec.ts
│   ├── room.spec.ts
│   └── session.spec.ts
└── playwright.config.ts
```

## Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'docker-compose up',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
```

## npm Scripts

```json
{
  "e2e": "playwright test",
  "e2e:ui": "playwright test --ui",
  "e2e:report": "playwright show-report"
}
```

## CI Integration

```yaml
# .github/workflows/e2e.yml
name: E2E Tests
on:
  pull_request:
  push:
    branches: [main]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: docker-compose up -d
      - run: npm run e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Dependencies

- All core features implemented
- Docker Compose environment stable
- Test data seeding available

## Outputs

- [ ] Playwright configured
- [ ] Page objects created
- [ ] Critical flow tests passing
- [ ] CI pipeline integrated
- [ ] Test reports available
