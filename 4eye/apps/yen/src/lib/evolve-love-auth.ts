/**
 * Cookie gate for Heart.Evolve / evolve.love on the personal profile.
 *
 * The password lives in EVOLVE_LOVE_PASSWORD (server-only). The cookie is an
 * HMAC of a fixed payload keyed by that password — setting evolve_love=1 in
 * DevTools is not enough.
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const EVOLVE_LOVE_COOKIE = "evolve_love";
export const EVOLVE_LOVE_MAX_AGE = 60 * 60 * 24 * 30;

const TOKEN_PAYLOAD = "evolve.love.ok";

export function evolveLovePassword(): string {
  return process.env.EVOLVE_LOVE_PASSWORD?.trim() ?? "";
}

export function evolveLoveToken(password: string): string {
  return createHmac("sha256", password).update(TOKEN_PAYLOAD).digest("hex");
}

export function passwordsEqual(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    if (a.length > 0) timingSafeEqual(a, a);
    return false;
  }
  return timingSafeEqual(a, b);
}

export function tokensEqual(given: string, expected: string): boolean {
  try {
    const a = Buffer.from(given, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function isEvolveLoveUnlocked(request: NextRequest): boolean {
  const password = evolveLovePassword();
  if (!password) return false;
  const token = request.cookies.get(EVOLVE_LOVE_COOKIE)?.value;
  if (!token) return false;
  return tokensEqual(token, evolveLoveToken(password));
}

export function evolveLoveCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: EVOLVE_LOVE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  };
}
