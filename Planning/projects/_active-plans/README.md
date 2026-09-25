# Active Plans — Index

Five concurrent work streams. Each plan is self-contained and independently executable.

**Publication target: `4eye.ai` — a public, search-indexed site.** That is the highest redaction
bar; assume anything published here is permanently public and third-party archived.

| # | Plan | Scope | Status |
|---|------|-------|--------|
| 05 | [Docs duplicate headers](./05-docs-duplicate-headers.md) | `ExpanseFrontend/apps/command-center` | ✅ done |
| 03 | Report app cleanup | `report/` | ✅ done — *plan held privately* |
| 01 | [Profile page layout](./01-4eye-profile-page-layout.md) | `4eye/apps/4eye-web-mockup` | ✅ done — browser checks open |
| 04 | [Text contrast sweep](./04-4eye-text-contrast.md) | `4eye/apps/4eye-web-mockup` | next (~2 days) |
| 02 | Public-release preparation | `~/Projects` (all) | in progress — *plan held privately* |

## Two plans are not in this repo

**02** and **03** are inventories of exactly the material they exist to remove — file paths,
addresses, client names, the locations of legal documents. Publishing the cleanup plan would
undo the cleanup. Both now live in `~/Projects/_private-redaction/plans/`, outside every git
repository, alongside the substitution maps.

This was itself a miss worth recording: plan 02 opened with a note saying *"keep this document
out of the public repo"* and it sat in the public repo for a day regardless. A warning in a file
is not a control.

## Sequencing

- **05 first** — smallest blast radius, fully isolated. Done.
- **01 before 04** — the profile page is the largest remaining contrast offender; rebuilding it
  against the surface-token system means the contrast sweep does not have to audit it twice.
- **02 is gated** — it moves and deletes across every repo, and its git-history step is
  irreversible. Blocking questions are listed in the private copy.

## Conventions these plans share

- **Nothing is deleted, only moved or relabeled.** `_archive/` plus dated status stamps, never `rm`.
- **Redaction is reversible.** Every substitution is recorded in a map that stays outside the repos.
- **Contrast is measured, not eyeballed** — verified against `@expanse/theme`'s `contrastRatio()`
  at a 4.5:1 floor.
