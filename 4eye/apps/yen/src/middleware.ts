import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  credentialsMatch,
  parseBasicAuthorization,
  siteGateEnabled,
} from "./lib/site-access";

/**
 * Pre-release helpers for yen:
 * 1. Optional CDN redirect for `/media/*` when NEXT_PUBLIC_MEDIA_BASE is set
 *    (GCS). Unset to serve from local `public/media`.
 * 2. Optional HTTP Basic Auth when SITE_ACCESS_USER + SITE_ACCESS_PASSWORD
 *    are both set. Unset either (or delete this file) to open the site.
 *
 * Cloud Run’s frontend rejects `Authorization: Basic` (it expects Google
 * identity tokens). Nginx therefore forwards credentials as
 * `X-Yen-Authorization` and clears `Authorization`. Direct hits to the
 * *.run.app URL can still use normal Basic auth.
 */
function readBasicCreds(request: NextRequest) {
  return parseBasicAuthorization(
    request.headers.get("x-yen-authorization") ??
      request.headers.get("authorization"),
  );
}

export function middleware(request: NextRequest) {
  const mediaBase = process.env.NEXT_PUBLIC_MEDIA_BASE?.replace(/\/+$/, "");
  const { pathname, search } = request.nextUrl;

  if (mediaBase && pathname.startsWith("/media/")) {
    return NextResponse.redirect(`${mediaBase}${pathname}${search}`, 302);
  }

  const user = process.env.SITE_ACCESS_USER?.trim();
  const password = process.env.SITE_ACCESS_PASSWORD;

  if (!siteGateEnabled(user, password)) {
    return NextResponse.next();
  }

  if (credentialsMatch(readBasicCreds(request), user as string, password as string)) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="yen", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
