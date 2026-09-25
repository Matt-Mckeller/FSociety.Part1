---
# applyTo: "**/.git*"
---

# Git Branching Strategy

## Branch Types
| Prefix | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `develop` | Integration branch (if using GitFlow) |
| `feature/<name>` | New features |
| `fix/<name>` | Bug fixes |
| `refactor/<name>` | Code restructuring (same behavior) |
| `improvement/<name>` | Enhancements to existing features |
| `cleaning/<name>` | Tech debt, cleanup, formatting |

## Naming Convention
- Use kebab-case: `feature/grid-navigation`
- Be descriptive but concise
- Include ticket/issue number if applicable: `fix/123-auth-redirect`

## Workflow
<!-- TODO: Define - trunk-based vs GitFlow -->

## Commit Conventions
<!-- TODO: Define - conventional commits? -->

## Branch Protection
<!-- TODO: Define - required reviews, CI checks -->
