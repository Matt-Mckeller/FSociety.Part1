import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "./i18n/config"

/**
 * next-intl middleware for locale handling
 *
 * Handles:
 * - Locale detection from URL path
 * - Locale prefix management (/en, /es, /zh)
 * - Default locale redirection
 */
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  // Always show locale prefix in URL for consistency
  localePrefix: "always",
})

/**
 * Next.js Middleware
 *
 * This middleware runs on every matched request before the page renders.
 * Handles: i18n routing, cache headers
 *
 * TODO: Implement authentication
 * - Verify auth token via API call or JWT validation
 * - Protect routes like /admin, /account, /dashboard
 * - Redirect unauthenticated users to login
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip i18n middleware for API routes and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // TODO: Add authentication logic here
  // Example protected routes: /admin, /account, /dashboard
  // const protectedRoutes = ["/admin", "/account", "/dashboard"]
  // const localePattern = new RegExp(`^/(${locales.join("|")})`)
  // const pathnameWithoutLocale = pathname.replace(localePattern, "") || "/"
  // if (protectedRoutes.some((route) => pathnameWithoutLocale.startsWith(route))) {
  //   const authToken = request.cookies.get("auth-token")?.value
  //   if (!authToken) {
  //     const locale = pathname.match(localePattern)?.[1] || defaultLocale
  //     return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  //   }
  //   // TODO: Validate token with API
  // }

  // Run i18n middleware
  const response = intlMiddleware(request)

  // Set headers to prevent caching during development
  // TODO: Review cache strategy for production
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  )
  response.headers.set("Pragma", "no-cache")
  response.headers.set("Expires", "0")
  response.headers.set("Surrogate-Control", "no-store")

  return response
}

/**
 * Matcher configuration
 * Define which routes the middleware should run on.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: [
    // Match all routes except static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
