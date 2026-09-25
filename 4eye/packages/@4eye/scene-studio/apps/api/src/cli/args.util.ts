export interface ParsedArgs {
  positional: string[];
  flags: Record<string, string | boolean>;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      if (eq > -1) {
        flags[a.slice(2, eq)] = a.slice(eq + 1);
      } else {
        const next = argv[i + 1];
        if (next && !next.startsWith('--')) {
          flags[a.slice(2)] = next;
          i++;
        } else {
          flags[a.slice(2)] = true;
        }
      }
    } else {
      positional.push(a);
    }
  }
  return { positional, flags };
}

export function strFlag(flags: Record<string, string | boolean>, name: string): string | undefined {
  const v = flags[name];
  return typeof v === 'string' ? v : undefined;
}

export function boolFlag(flags: Record<string, string | boolean>, name: string): boolean {
  return flags[name] === true || flags[name] === 'true';
}

export function numFlag(flags: Record<string, string | boolean>, name: string): number | undefined {
  const v = strFlag(flags, name);
  return v ? Number(v) : undefined;
}

export function pad(s: string, n: number): string {
  return s.length >= n ? s.slice(0, n) : s + ' '.repeat(n - s.length);
}
