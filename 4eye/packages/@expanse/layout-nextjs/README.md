# @expanse/layout-nextjs

Next.js integration for `@expanse/layout` - seamless grid navigation with Next.js App Router and Pages Router.

## Features

- 🔄 **File-system routing integration** - Auto-generate grid configs from Next.js routes
- 📍 **App Router support** - Works with Next.js 13+ App Router
- 📄 **Pages Router support** - Compatible with traditional Pages Router
- 🔗 **Browser history** - Automatic URL synchronization
- ⚡ **Server Components** - Optimized for React Server Components
- 🎯 **Type-safe routing** - Full TypeScript support

## Installation

```bash
pnpm add @expanse/layout-nextjs
```

## Quick Start

### App Router (Next.js 13+)

```tsx
// app/layout.tsx
import { NavigationProvider } from '@expanse/layout-nextjs';
import { createGridFromAppDir } from '@expanse/layout-nextjs/app-router';

const gridConfig = createGridFromAppDir({
  baseDir: '/app',
  dimensions: { width: 5, height: 5 },
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NavigationProvider config={gridConfig}>
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}
```

```tsx
// app/page.tsx
import { MinimalLayout } from '@expanse/layout';

export default function Page() {
  return (
    <MinimalLayout preset="floating-controls">
      <h1>Home</h1>
    </MinimalLayout>
  );
}
```

### Pages Router

```tsx
// pages/_app.tsx
import { NavigationProvider } from '@expanse/layout-nextjs';
import { createGridFromPages } from '@expanse/layout-nextjs/pages-router';

const gridConfig = createGridFromPages({
  baseDir: '/pages',
  dimensions: { width: 5, height: 5 },
});

export default function App({ Component, pageProps }) {
  return (
    <NavigationProvider config={gridConfig}>
      <Component {...pageProps} />
    </NavigationProvider>
  );
}
```

## Routing Integration

### Automatic URL Sync

Grid navigation automatically syncs with Next.js router:

```tsx
import { useNextNavigation } from '@expanse/layout-nextjs';

function MyComponent() {
  const { position, navigateTo } = useNextNavigation();
  
  // Navigate to position (2, 1) -> Updates URL to /page-at-2-1
  navigateTo({ x: 2, y: 1 });
  
  return <div>Current: {position.x}, {position.y}</div>;
}
```

### File-based Grid Configuration

Map your file structure to grid positions:

```
app/
  page.tsx           -> (0, 0) home
  about/page.tsx     -> (1, 0)
  services/page.tsx  -> (2, 0)
  contact/page.tsx   -> (3, 0)
  blog/page.tsx      -> (0, 1)
```

### Custom Route Mapping

```tsx
import { createGridConfig } from '@expanse/layout-nextjs';

const config = createGridConfig({
  routes: [
    { path: '/', position: { x: 0, y: 0 }, id: 'home' },
    { path: '/about', position: { x: 1, y: 0 }, id: 'about' },
    { path: '/services', position: { x: 2, y: 0 }, id: 'services' },
    { path: '/blog', position: { x: 0, y: 1 }, id: 'blog' },
  ],
  dimensions: { width: 5, height: 5 },
});
```

## API Reference

### `createGridFromAppDir(options)`

Generate grid config from App Router directory structure.

**Options:**
- `baseDir: string` - Base directory to scan
- `dimensions: { width: number; height: number }` - Grid dimensions
- `pattern?: string` - Custom route pattern (default: `**/page.tsx`)

### `createGridFromPages(options)`

Generate grid config from Pages Router directory structure.

### `useNextNavigation()`

Hook for Next.js-aware navigation.

**Returns:**
- `position: Position` - Current grid position
- `navigateTo: (pos: Position) => void` - Navigate with URL update
- `navigateRelative: (dir: Direction) => void` - Relative navigation
- `router: NextRouter` - Next.js router instance

## Advanced Usage

### Server Components

```tsx
// app/page.tsx
import { getGridPosition } from '@expanse/layout-nextjs/server';

export default async function Page() {
  const position = await getGridPosition();
  
  return <div>Server-rendered at {position.x}, {position.y}</div>;
}
```

### Metadata from Grid Position

```tsx
// app/page.tsx
import { generateMetadataFromPosition } from '@expanse/layout-nextjs';

export async function generateMetadata() {
  return generateMetadataFromPosition({
    title: 'Home',
    position: { x: 0, y: 0 },
  });
}
```

### Middleware Integration

```tsx
// middleware.ts
import { createNavigationMiddleware } from '@expanse/layout-nextjs/middleware';

export const middleware = createNavigationMiddleware({
  gridConfig,
  redirectHome: true,
});
```

## Examples

See [examples/nextjs-app-router](../../examples/nextjs-app-router) for complete examples.

## License

MIT
