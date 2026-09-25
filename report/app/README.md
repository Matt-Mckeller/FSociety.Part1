# Expanse 72

Detective-style data visualization app for tracking investigation data through events, people, locations, items, and multiple interpretive perspectives.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Tech Stack

- React 19 + TypeScript
- MUI 7 (Material-UI)
- D3.js (visualizations)
- Vite (bundler)
- React Router

## Project Structure

```
/report
├── src/data/           # ALL data + types (single source of truth)
├── app/                # This React application
│   └── src/
│       ├── pages/      # Route pages
│       ├── components/ # Reusable components
│       ├── utils/      # dataService.ts
│       └── theme/      # MUI theme
└── *.md                # Source documentation
```

## Key Rule

**All data lives in `/src/data/` (root level)**. The app imports from there. Never duplicate data in `/app/src/`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Documentation

- [PROJECT-SPEC.md](../PROJECT-SPEC.md) - Full specification
- [AI-USAGE.md](../AI-USAGE.md) - AI usage and law enforcement applications
- [.github/copilot-instructions.md](../.github/copilot-instructions.md) - AI context
