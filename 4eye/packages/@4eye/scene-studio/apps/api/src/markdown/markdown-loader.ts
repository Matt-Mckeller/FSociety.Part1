import { readFile } from 'node:fs/promises';
import { resolve, isAbsolute } from 'node:path';

/**
 * Loaded markdown reference, ready to be embedded into a prompt as a context block.
 */
export interface LoadedMarkdownRef {
  /** Absolute path actually read. */
  absPath: string;
  /** The selector that was passed in (e.g. `00-style-bible.md` or `scenes/scene-1-classroom.md`). */
  selector: string;
  /** Heading text used as a section anchor, if one was applied. */
  section?: string;
  /** Concept ids extracted, if `concepts` filter was applied. */
  concepts?: string[];
  /** The extracted body — full file, or section slice, or concept rows. */
  body: string;
  /** Length of `body` in characters. */
  charCount: number;
}

export interface LoadMarkdownOpts {
  /** Path/selector relative to `baseDir`, or absolute. */
  selector: string;
  /** Directory to resolve `selector` against when it is relative. */
  baseDir: string;
  /**
   * Optional section anchor. Matches the first heading whose text contains this string
   * (case-insensitive). The slice runs from that heading until the next heading of
   * equal or higher level (e.g. anchoring at `## 3.1` stops at the next `##` or `#`).
   */
  section?: string;
  /**
   * Optional list of concept ids (e.g. `['C03', 'C24']`). When provided, the loader
   * scans markdown table rows for cells matching each id and returns the table header
   * + matching rows. Used for `01-data-embedding-matrix.md`.
   */
  concepts?: string[];
  /**
   * Soft cap on the returned body length. If exceeded, the body is truncated and a
   * `[truncated]` marker is appended. Default 16k chars (gpt-image-1 prompt limit is ~32k).
   */
  maxChars?: number;
}

const DEFAULT_MAX_CHARS = 16_000;

/**
 * Read a markdown file (or a slice of one) for use as prompt context.
 *
 * Resolution order applied to the body:
 *   1. If `concepts` given → extract the table header + matching rows.
 *   2. Else if `section` given → slice from that heading until the next equal-or-higher heading.
 *   3. Else → return the full file.
 * Then truncate to `maxChars` if needed.
 */
export async function loadMarkdownRef(opts: LoadMarkdownOpts): Promise<LoadedMarkdownRef> {
  // Tolerate `file:` scheme prefix (the persisted log shape uses it).
  const selector = opts.selector.startsWith('file:') ? opts.selector.slice(5) : opts.selector;
  const absPath = isAbsolute(selector) ? selector : resolve(opts.baseDir, selector);
  const raw = await readFile(absPath, 'utf8');

  let body: string;
  if (opts.concepts && opts.concepts.length > 0) {
    body = extractConceptRows(raw, opts.concepts);
  } else if (opts.section) {
    body = extractSection(raw, opts.section);
  } else {
    body = raw;
  }

  const max = opts.maxChars ?? DEFAULT_MAX_CHARS;
  if (body.length > max) {
    body = body.slice(0, max) + `\n\n[truncated — original ${body.length} chars]`;
  }

  return {
    absPath,
    selector: opts.selector,
    section: opts.section,
    concepts: opts.concepts,
    body,
    charCount: body.length,
  };
}

/**
 * Wrap a loaded markdown reference as a `[CONTEXT]` block suitable for prepending to a prompt.
 */
export function formatContextBlock(
  loaded: LoadedMarkdownRef,
  role: string,
  description?: string,
): string {
  const header = description
    ? `[CONTEXT: ${role} — ${description}]`
    : `[CONTEXT: ${role}]`;
  const sourceLine = loaded.section
    ? `# source: ${loaded.selector} § ${loaded.section}`
    : loaded.concepts
      ? `# source: ${loaded.selector} (concepts: ${loaded.concepts.join(', ')})`
      : `# source: ${loaded.selector}`;
  return `${header}\n${sourceLine}\n${loaded.body.trim()}\n[/CONTEXT]`;
}

// ── internals ──────────────────────────────────────────────────────────────

/** Heading line like `## 3.1 Character cues` → { level: 2, text: '3.1 Character cues' } */
function parseHeading(line: string): { level: number; text: string } | null {
  const m = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
  if (!m) return null;
  return { level: m[1]!.length, text: m[2]! };
}

function extractSection(raw: string, anchor: string): string {
  const lines = raw.split(/\r?\n/);
  const target = anchor.toLowerCase();
  let startIdx = -1;
  let startLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    const h = parseHeading(lines[i]!);
    if (!h) continue;
    if (h.text.toLowerCase().includes(target)) {
      startIdx = i;
      startLevel = h.level;
      break;
    }
  }

  if (startIdx === -1) {
    return `[section "${anchor}" not found]`;
  }

  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    const h = parseHeading(lines[i]!);
    if (h && h.level <= startLevel) {
      endIdx = i;
      break;
    }
  }

  return lines.slice(startIdx, endIdx).join('\n');
}

function extractConceptRows(raw: string, concepts: string[]): string {
  const lines = raw.split(/\r?\n/);
  const wanted = new Set(concepts.map((c) => c.toUpperCase()));
  const out: string[] = [];

  // Walk the file looking for markdown tables. A table is a header row, an alignment row,
  // then data rows — all lines starting with `|`. We keep the header + alignment row of every
  // table that contains at least one matching row.
  let i = 0;
  while (i < lines.length) {
    const line = lines[i]!;
    if (line.startsWith('|') && i + 1 < lines.length && /^\|[\s:|-]+\|\s*$/.test(lines[i + 1]!)) {
      const header = line;
      const align = lines[i + 1]!;
      const dataStart = i + 2;
      let dataEnd = dataStart;
      while (dataEnd < lines.length && lines[dataEnd]!.startsWith('|')) dataEnd++;

      const matches = lines.slice(dataStart, dataEnd).filter((row) => {
        const cells = row.split('|').map((c) => c.trim().toUpperCase());
        return cells.some((cell) => wanted.has(cell));
      });

      if (matches.length > 0) {
        if (out.length > 0) out.push('');
        out.push(header, align, ...matches);
      }

      i = dataEnd;
      continue;
    }
    i++;
  }

  if (out.length === 0) {
    return `[no rows matched concepts: ${concepts.join(', ')}]`;
  }
  return out.join('\n');
}
