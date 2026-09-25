---
# No applyTo — this is general context, include manually when needed
---

# File Organization

## Rules
- Apps in `apps/`, packages in `packages/`
- @expanse = infrastructure, @4eye = domain
- Barrel exports in `index.ts`
- Co-locate tests (`__tests__/` or `.test.ts`)
- Feature-based organization within apps

## Documentation
- [MONOREPO_STRUCTURE.md](docs/technical/MONOREPO_STRUCTURE.md)
- [PACKAGE_ARCHITECTURE.md](docs/technical/PACKAGE_ARCHITECTURE.md)
- [PACKAGE_README_TEMPLATE.md](docs/templates/PACKAGE_README_TEMPLATE.md)

## Reference Package Structures
- Layout package: `packages/@expanse/shell/`
- Auth package: `packages/@expanse/auth/`
- Theme package: `packages/@expanse/theme/`

## Standard Package Structure
```
package-name/
├── src/
│   ├── index.ts          # Barrel export
│   ├── components/
│   ├── hooks/
│   └── utils/
├── __tests__/
├── package.json
├── tsconfig.json
└── README.md
```

## Don't
- Put domain logic in @expanse packages
- Create deeply nested folders (prefer flat)
- Skip barrel exports
