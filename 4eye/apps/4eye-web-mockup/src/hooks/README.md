# `src/hooks/` — shared client hooks

Reusable React hooks scoped to the `4eye-web-mockup` app. Three subfolders by
concern; each has a barrel export so call sites import from
`@/hooks/{animation,dom,ui}`.

## Conventions

- All hooks marked `"use client"` (browser-only APIs: `gsap`, `IntersectionObserver`, `ResizeObserver`).
- Effect cleanup is automatic — no caller-side `revert()`/`disconnect()` needed.
- Callbacks are stored in refs internally so latest closures are used without
  forcing the effect to re-run (avoids stale-callback bugs and unnecessary
  observer churn).
- `RefObject<HTMLElement | null>` accepted everywhere (matches React 18+ ref
  callback semantics).

## `animation/`

GSAP wrappers that own the `gsap.context()` lifecycle.

| Hook | Purpose |
| --- | --- |
| `useGsap(scope, builder, deps?)` | Generic `gsap.context()` wrapper. `builder(ctx)` may return a cleanup fn (run before context revert). Use for timelines stored in refs (e.g. `entryTlRef.current = tl`). |
| `useGsapEnter(scope, selector, vars, deps?)` | Sugar for `gsap.from(selector, vars)`. Defaults: `duration: 0.5, ease: "power2.out"`. |
| `useGsapOnEnterViewport(scope, builder, { threshold?, deps? })` | One-shot: runs `builder` inside a `gsap.context` once `scope` first crosses `threshold` (default 0.25). Combines `IntersectionObserver` + `gsap.context()`. |

## `dom/`

`ResizeObserver` / `IntersectionObserver` wrappers with built-in equality
checks to avoid re-renders on no-op resizes.

| Hook | Purpose |
| --- | --- |
| `useResizeWidth(ref) → number` | Tracks `contentRect.width`. |
| `useResizeObserver(ref) → { width, height }` | Tracks both dims. Re-renders only when either rounded value changes. |
| `useOnLeaveViewport(ref, onLeave, { threshold?, onReturn? })` | Fires `onLeave` once when `ref` first leaves the viewport; optional `onReturn` resets on re-entry so the next exit fires again. Used for hand-off animations between slides. |

## `ui/`

Stateless UI/state primitives.

| Hook | Purpose |
| --- | --- |
| `useControlled<T>(value, defaultValue, onChange?) → [current, setValue]` | Adapter for components that may be controlled or uncontrolled. Mode locked at first render (matches React's `<input>` contract). |
| `useTabbedPanel<K>(initial) → { active, setActive, isActive }` | Sugar for tab/panel pickers. |
| `useReplayToken() → readonly [token, replay]` | Monotonic counter — bump to re-trigger downstream effects keyed on the token. |

## When to add to this folder

Promote a pattern here when you find yourself:

- Wrapping `gsap.context()` more than once;
- Setting up a `ResizeObserver` / `IntersectionObserver` outside a hook;
- Re-implementing the controlled/uncontrolled adapter inline.

Avoid premature abstraction — wait until at least two call sites diverge from
trivial usage before extracting. Keep call-site code obvious.
