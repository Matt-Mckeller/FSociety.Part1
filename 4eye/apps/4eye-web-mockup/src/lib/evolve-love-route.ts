import { NextRequest, NextResponse } from "next/server";
import {
  EVOLVE_LOVE_COOKIE,
  evolveLoveCookieOptions,
  evolveLovePassword,
  evolveLoveToken,
  isEvolveLoveUnlocked,
  passwordsEqual,
} from "./evolve-love-auth";

export async function GET(request: NextRequest) {
  return NextResponse.json({ unlocked: isEvolveLoveUnlocked(request) });
}

export async function POST(request: NextRequest) {
  const password = evolveLovePassword();
  if (!password) {
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  }

  let given = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    given = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (!passwordsEqual(given, password)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, unlocked: true });
  res.cookies.set(EVOLVE_LOVE_COOKIE, evolveLoveToken(password), evolveLoveCookieOptions());
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true, unlocked: false });
  res.cookies.set(EVOLVE_LOVE_COOKIE, "", { ...evolveLoveCookieOptions(), maxAge: 0 });
  return res;
}
