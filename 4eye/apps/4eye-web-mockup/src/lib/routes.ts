/**
 * Where this application is mounted.
 *
 * The same source now serves two hosts: its own dev server, where it owns the
 * domain root, and the yen release, where it is nested under `/4eye`. Route
 * literals therefore cannot be written absolutely — they are relative to
 * wherever the host mounted the app.
 *
 * Hosts set `NEXT_PUBLIC_4EYE_BASE_PATH` at build time. It must be inlined as a
 * literal `process.env.NEXT_PUBLIC_4EYE_BASE_PATH` for Next to substitute it, so
 * do not destructure or index into `process.env` here.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_4EYE_BASE_PATH ?? "";

/**
 * Build an app route.
 *
 * `route("/appRealm/map")` → `/appRealm/map` standalone, `/4eye/appRealm/map`
 * inside yen. `route("/")` yields the app's own home in both.
 */
export function route(path: string): string {
  if (!BASE_PATH) return path;
  return path === "/" ? BASE_PATH : `${BASE_PATH}${path}`;
}

/**
 * Strip the base path off a pathname, so comparisons against route literals
 * work regardless of where the app is mounted.
 */
export function unroute(pathname: string): string {
  if (!BASE_PATH || !pathname.startsWith(BASE_PATH)) return pathname;
  return pathname.slice(BASE_PATH.length) || "/";
}
