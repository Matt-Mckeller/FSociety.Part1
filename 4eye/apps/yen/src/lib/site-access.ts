export type BasicCreds = { user: string; pass: string };

export function parseBasicAuthorization(
  header: string | null,
): BasicCreds | null {
  if (!header?.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6));
    const colon = decoded.indexOf(":");
    return {
      user: colon === -1 ? decoded : decoded.slice(0, colon),
      pass: colon === -1 ? "" : decoded.slice(colon + 1),
    };
  } catch {
    return null;
  }
}

export function siteGateEnabled(
  user: string | undefined,
  password: string | undefined,
): boolean {
  return Boolean(user?.trim()) && password !== undefined && password !== "";
}

export function credentialsMatch(
  creds: BasicCreds | null,
  user: string,
  password: string,
): boolean {
  return Boolean(creds && creds.user === user && creds.pass === password);
}
