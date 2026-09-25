/**
 * Storybook stub for `next/navigation`.
 *
 * Storybook here runs on `@storybook/react-vite` (not `@storybook/nextjs`),
 * so the App-Router hooks must be replaced with no-ops. Aliased via
 * `.storybook/main.ts` → `resolve.alias["next/navigation"]`.
 *
 * Stories that need to assert on a router can pass their own mock router
 * via a decorator and ignore this stub.
 */

export type NextRouter = {
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
  forward: () => void;
  refresh: () => void;
  prefetch: (href: string) => void;
};

const noopRouter: NextRouter = {
  push: () => {},
  replace: () => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
  prefetch: () => {},
};

export function useRouter(): NextRouter {
  return noopRouter;
}

export function usePathname(): string | null {
  return "/";
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams();
}

export function useParams<T extends Record<string, string | string[]>>(): T {
  return {} as T;
}

export function redirect(_href: string): never {
  // In a story, treat redirect as a no-op rather than throwing.
  throw new Error(
    "[storybook-stub] next/navigation `redirect()` called — not supported in stories.",
  );
}

export function notFound(): never {
  throw new Error(
    "[storybook-stub] next/navigation `notFound()` called — not supported in stories.",
  );
}
