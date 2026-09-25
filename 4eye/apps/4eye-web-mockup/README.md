# 4eye Web Mockup

Content-presentation site for the 4eye marketing plan.
Source markdown lives in `/Users/mm/Projects/4eyeWebPlan/Marketing/`.

## Stack
- Next.js 15 (App Router)
- React 19 + TypeScript (strict)
- MUI v6

## Commands
```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run start
npm run typecheck
```

## Structure
- `src/app/` — routes, one per marketing page
- `src/components/deck/` — slide primitives (Slide, SlideDeck, variants)
- `src/components/AppShell.tsx` — top-level layout
- `src/hooks/` — view hooks (keyboard nav, etc.)

Each route is a vertically scrolling deck of full-viewport, centered slides built from MUI components.
