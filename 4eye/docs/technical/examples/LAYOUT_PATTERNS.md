# Layout Patterns

Next.js layout patterns for 4eye application.

> **Framework:** Next.js 14+ App Router with nested layouts.
> **Layout Primitives:** @expanse/shell provides reusable layout components (MaxWidthContainer, StretchLayout, PageShell, SymbolGrid).

---

## Layout Primitives (@expanse/shell)

### **Purpose**

The `@expanse/shell` package provides reusable layout components that apps compose into app-specific layouts.

**Philosophy:** Layout primitives provide building blocks, not complete layouts. Apps combine primitives into their own layout components (PageHeader, PageFooter, SideDrawer, etc.).

---

### **MaxWidthContainer**

**Purpose:** Limit content width for optimal readability (UX best practice: 1440px).

```typescript
// packages/@expanse/shell/src/components/MaxWidthContainer.tsx

export interface MaxWidthContainerProps {
  maxWidth?: number;
  children: React.ReactNode;
}

export function MaxWidthContainer({ 
  maxWidth = 1440, 
  children 
}: MaxWidthContainerProps) {
  return (
    <Box
      sx={{
        maxWidth,
        marginX: 'auto',
        paddingX: { xs: 2, sm: 3, md: 4 },
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
}
```

**Usage:**
```typescript
<MaxWidthContainer>
  <Typography>Content is centered and limited to 1440px</Typography>
</MaxWidthContainer>

<MaxWidthContainer maxWidth={1200}>
  <Typography>Narrower content area</Typography>
</MaxWidthContainer>
```

---

### **StretchLayout**

**Purpose:** Full-height flex layout for page shells.

```typescript
// packages/@expanse/shell/src/components/StretchLayout.tsx

export interface StretchLayoutProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
}

export function StretchLayout({ 
  children, 
  direction = 'column' 
}: StretchLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: direction,
        minHeight: '100vh',
      }}
    >
      {children}
    </Box>
  );
}
```

**Usage:**
```typescript
<StretchLayout>
  <PageHeader />
  <Box sx={{ flexGrow: 1 }}>{content}</Box>
  <PageFooter />
</StretchLayout>
```

---

### **PageShell**

**Purpose:** Basic page wrapper with consistent padding and max-width.

```typescript
// packages/@expanse/shell/src/components/PageShell.tsx

export interface PageShellProps {
  children: React.ReactNode;
  maxWidth?: number;
  fullWidth?: boolean;
}

export function PageShell({ 
  children, 
  maxWidth = 1440, 
  fullWidth = false 
}: PageShellProps) {
  if (fullWidth) {
    return <Box sx={{ width: '100%' }}>{children}</Box>;
  }

  return (
    <MaxWidthContainer maxWidth={maxWidth}>
      <Box sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
        {children}
      </Box>
    </MaxWidthContainer>
  );
}
```

**Usage:**
```typescript
<PageShell>
  <PageContent />
</PageShell>

<PageShell fullWidth>
  <FullWidthContent />
</PageShell>
```

---

### **SymbolGrid**

**Purpose:** Custom grid system for 4eye's symbol-based layout design.

> **Status:** Placeholder - Design to be finalized.
> See [SYMBOL_GRID_SYSTEM.md](../SYMBOL_GRID_SYSTEM.md) for design documentation.

```typescript
// packages/@expanse/shell/src/components/SymbolGrid.tsx

export interface SymbolGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
}

export function SymbolGrid({ 
  children, 
  columns = 12, 
  gap = 2 
}: SymbolGridProps) {
  // TODO: Implement symbol grid system
  // Current: Basic grid wrapper
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}
    </Box>
  );
}
```

**Future usage:**
```typescript
<SymbolGrid columns={12}>
  <SymbolGridItem span={4}>Column 1</SymbolGridItem>
  <SymbolGridItem span={8}>Column 2</SymbolGridItem>
</SymbolGrid>
```

---

### **Layout Hooks**

**useSnackbar** - Global snackbar notifications:
```typescript
const { showSnackbar } = useSnackbar();
showSnackbar('Message saved', 'success');
```

**useLoadingSpinner** - Global loading overlay:
```typescript
const { startLoading, stopLoading } = useLoadingSpinner();
```

**useDrawer** - Drawer state management:
```typescript
const { isDrawerOpen, openDrawer, closeDrawer } = useDrawer();
```

See `@expanse/shell` package documentation for complete API.

---

## Layout Hierarchy

```
app/
├── layout.tsx              # Root layout (Providers, theme)
├── page.tsx                # Home page
├── (auth)/                 # Route group
│   ├── layout.tsx          # Auth pages layout
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
├── dashboard/
│   ├── layout.tsx          # Dashboard shell
│   ├── page.tsx            # Dashboard home
│   └── rooms/
│       ├── layout.tsx      # Rooms section layout
│       └── page.tsx
```

---

## Root Layout

Wraps entire app with providers and global styles.

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: '4eye - AI Learning Platform',
  description: 'Learn how to learn',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

---

## Dashboard Shell Layout

Common navigation and sidebar for authenticated pages.

```typescript
// app/dashboard/layout.tsx
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

## Route Groups

Use route groups `(folder)` for layouts without URL segments.

```typescript
// app/(auth)/layout.tsx - Applies to /login and /signup
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        {children}
      </div>
    </div>
  );
}
```

---

## Conditional Layouts

Show different layouts based on state.

```typescript
// app/dashboard/layout.tsx
'use client';

import { useAuth } from '@4eye/state';
import { redirect } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

---

## Nested Layouts

Layouts compose automatically.

```
app/
├── layout.tsx              # Root: Providers
└── dashboard/
    ├── layout.tsx          # Shell: Sidebar + Header
    └── rooms/
        ├── layout.tsx      # Rooms tabs navigation
        └── [id]/
            └── page.tsx    # Room detail page
```

**Result:**
```
Root Layout (Providers)
  └─ Dashboard Layout (Sidebar + Header)
      └─ Rooms Layout (Tabs)
          └─ Room Page
```

---

## Layout with Slots

Use parallel routes for complex layouts.

```typescript
// app/dashboard/@sidebar/page.tsx
export default function SidebarSlot() {
  return <Sidebar />;
}

// app/dashboard/@main/page.tsx
export default function MainSlot() {
  return <DashboardHome />;
}

// app/dashboard/layout.tsx
export default function Layout({
  sidebar,
  main,
}: {
  sidebar: React.ReactNode;
  main: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      {sidebar}
      {main}
    </div>
  );
}
```

---

## Metadata

Set metadata per layout/page.

```typescript
// app/dashboard/rooms/[id]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const room = await fetchRoom(params.id);
  return {
    title: `${room.name} | 4eye`,
    description: room.description,
  };
}

export default function RoomPage({ params }) {
  return <RoomDetail roomId={params.id} />;
}
```

---

## Loading States

Use loading.tsx for automatic suspense boundaries.

```typescript
// app/dashboard/rooms/loading.tsx
export default function Loading() {
  return <RoomListSkeleton />;
}

// Automatically wraps page in Suspense
// app/dashboard/rooms/page.tsx becomes:
// <Suspense fallback={<Loading />}>
//   <RoomsPage />
// </Suspense>
```

---

## Related Documentation

- **[COMPONENT_PATTERNS.md](COMPONENT_PATTERNS.md)** — Component organization
- **[STATE_PATTERNS.md](STATE_PATTERNS.md)** — State management
- **[Next.js Docs](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)** — Official layouts guide
