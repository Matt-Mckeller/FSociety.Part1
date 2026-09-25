# Authentication System Plan

> Comprehensive authentication architecture for 4eye/Expanse platforms.
> 
> **Primary documentation is in these MD files.** The visualizer app (`tools/auth-visualizer/`) is an optional bonus tool for reviewing diagrams visually.

## Quick Links

| Document | Purpose |
|----------|---------|
| [Architecture Overview](./architecture.md) | Multi-platform auth design, provider patterns |
| [Authentication Methods](./auth-methods.md) | All auth strategies (MVP + future) |
| [Consent & Compliance](./consent-compliance.md) | GDPR, CCPA, COPPA |
| [User Management](./user-management.md) | User lifecycle |
| [Implementation Guide](./implementation.md) | Code patterns |

## Visualization App (Optional)

Interactive diagrams available at: `tools/auth-visualizer/`

```bash
cd tools/auth-visualizer && npm install && npm run dev
# Open http://localhost:5173
```

> **Note:** The visualizer is for visual review only. If MD files and visualizer differ, **MD files are authoritative**.

---

## Authentication Methods Summary

| Method | Package | Priority | Notes |
|--------|---------|----------|-------|
| Email/Password | @expanse/auth | MVP | Bcrypt, secure cookies |
| Google OAuth | @expanse/auth | MVP | Required for conversion |
| Apple Sign In | @expanse/auth | Post-MVP | Required if iOS app |
| Guest Mode | @expanse/auth | MVP | Join-by-link |
| EdLink SSO | @4eye/auth-edlink | Phase 3 | Education vertical |
| SAML/Enterprise | @4eye/auth-enterprise | Future | B2B |

## Compliance Requirements

| Regulation | Scope | Implementation |
|------------|-------|----------------|
| GDPR | EU users | Consent tracking, data export, deletion |
| CCPA | California users | Consent, opt-out, data access |
| COPPA | Users under 13 | Parental consent, limited data |

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-27 | httpOnly cookies (server-set) | XSS protection - tokens never exposed to JS |
| 2026-03-27 | Combined AuthProvider | Single hook for tokens + user (simpler mental model) |
| 2026-03-27 | Split SessionProvider layer | Platform-specific token storage (web cookies vs mobile SecureStore) |
| 2026-03-27 | OAuth in initial build | Avoid refactoring |
| 2026-03-27 | Separate consent module | Reusability, complexity |
| 2026-03-27 | CSRF tokens | Required for cookie-based auth |
