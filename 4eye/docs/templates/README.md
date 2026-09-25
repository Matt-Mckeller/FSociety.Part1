# @scope/package-name

Brief one-line description of the package purpose.

---

## Overview

[2-3 sentence overview of what this package provides]

---

## Installation

This package is part of the 4eye monorepo and is installed automatically via npm workspaces.

**Import in your code:**

```typescript
import { ExportedItem } from '@scope/package-name';
```

---

## Usage

### **Basic Example**

```typescript
import { ExportedItem } from '@scope/package-name';

// Basic usage example
const example = new ExportedItem();
```

---

## API

For complete API documentation, see **[docs/API.md](./docs/API.md)**

### **Key Exports**

**Components:**
- `ComponentName` - Brief description

**Hooks:**
- `useHookName()` - Brief description

**Types:**
- `TypeName` - Brief description

---

## Documentation

**Complete guides:**
- **[docs/README.md](./docs/README.md)** - Complete package documentation
- **[docs/API.md](./docs/API.md)** - Full API reference
- **[docs/EXAMPLES.md](./docs/EXAMPLES.md)** - Usage examples and patterns

---

## Package Structure

```
@scope/package-name/
├── src/
│   ├── components/      # React components (if applicable)
│   ├── hooks/           # React hooks (if applicable)
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types (local to this package)
│   └── index.ts         # Public API
├── docs/                # Detailed documentation
├── __tests__/           # Tests
├── package.json
└── README.md            # This file
```

---

## Dependencies

**Peer dependencies:**
- `react` ^18.0.0 (if using React)
- `react-dom` ^18.0.0 (if using React)

**Internal dependencies:**
- List any @expanse or @4eye packages this depends on

---

## Development

**Run in watch mode:**
```bash
npm run dev --workspace=@scope/package-name
```

**Build:**
```bash
npm run build --workspace=@scope/package-name
```

**Test:**
```bash
npm run test --workspace=@scope/package-name
```

**Type-check:**
```bash
npm run type-check --workspace=@scope/package-name
```

---

## Related Packages

- **[@related/package](../related-package/)** - Brief description of relationship

---

## Related Documentation

- **[PACKAGE_ARCHITECTURE.md](../../docs/technical/PACKAGE_ARCHITECTURE.md)** - Package organization principles
- **[MONOREPO_STRUCTURE.md](../../docs/technical/MONOREPO_STRUCTURE.md)** - Complete monorepo layout
- **[TYPE_ORGANIZATION.md](../../docs/technical/TYPE_ORGANIZATION.md)** - Type organization patterns
