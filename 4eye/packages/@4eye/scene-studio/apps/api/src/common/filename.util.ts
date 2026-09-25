/**
 * Parse a filename like "S1-A_cold_open_quiet_classroom.png" into
 *   { sceneCode: "S1-A", title: "Cold open quiet classroom" }
 *
 * Falls back gracefully when the convention doesn't match.
 */
export interface ParsedFilename {
  sceneCode: string | null;
  title: string;
}

const SCENE_RE = /^([A-Z]+\d+(?:-[A-Za-z0-9]+)*)[_\- ]/;

export function parseFilename(filename: string): ParsedFilename {
  const base = filename.replace(/\.[^.]+$/, ''); // drop extension
  const m = base.match(SCENE_RE);
  let sceneCode: string | null = null;
  let rest = base;
  if (m) {
    sceneCode = m[1];
    rest = base.slice(m[0].length);
  }
  const title = rest
    .replace(/[_\-]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/^./, (c) => c.toUpperCase());
  return { sceneCode, title: title || base };
}
