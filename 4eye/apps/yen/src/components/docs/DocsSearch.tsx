"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

/*
  The search index is fetched, not imported. At 500+ documents an imported index
  would land in the page bundle and be paid for by every visitor, including the
  ones who never search. This way the cost falls only on the first keystroke,
  and only once per session.
*/
type Row = [slug: string, title: string, summary: string, collection: string, planState: string];

interface Index {
  collections: Record<string, string>;
  rows: Row[];
}

function scoreRow(row: Row, terms: string[]): number {
  const title = row[1].toLowerCase();
  const summary = row[2].toLowerCase();
  let score = 0;
  for (const t of terms) {
    const inTitle = title.includes(t);
    const inSummary = summary.includes(t);
    if (!inTitle && !inSummary) return 0; // every term must appear somewhere
    if (title.startsWith(t)) score += 8;
    else if (inTitle) score += 4;
    if (inSummary) score += 1;
  }
  return score;
}

export function DocsSearch() {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<Index | null>(null);
  const [loading, setLoading] = useState(false);
  const requested = useRef(false);

  useEffect(() => {
    if (!query || requested.current) return;
    requested.current = true;
    setLoading(true);
    fetch("/docs-search.json")
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => setIndex({ collections: {}, rows: [] }))
      .finally(() => setLoading(false));
  }, [query]);

  const results = useMemo(() => {
    if (!index) return [];
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index.rows
      .map((row) => ({ row, score: scoreRow(row, terms) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40);
  }, [index, query]);

  const terms = query.trim();

  return (
    <div className="docs-search">
      <input
        className="docs-search-input"
        type="search"
        value={query}
        placeholder="Search every document…"
        aria-label="Search documentation"
        onChange={(e) => setQuery(e.target.value)}
      />

      {terms && (
        <div className="docs-search-results" role="status">
          {loading && !index ? (
            <p className="docs-search-empty">Loading the index…</p>
          ) : results.length === 0 ? (
            <p className="docs-search-empty">Nothing matches “{terms}”.</p>
          ) : (
            <>
              <p className="docs-search-count">
                {results.length === 40 ? "Top 40 matches" : `${results.length} match${results.length === 1 ? "" : "es"}`}
              </p>
              <ul className="docs-search-list">
                {results.map(({ row }) => (
                  <li key={row[0]}>
                    <Link href={`/docs/${row[0]}`} className="docs-search-hit">
                      <span className="docs-search-hit-title">{row[1]}</span>
                      <span className="docs-search-hit-meta">
                        {index?.collections[row[3]] ?? row[3]}
                        {row[4] ? ` · ${row[4].replace(/-/g, " ")}` : ""}
                      </span>
                      {row[2] && <span className="docs-search-hit-summary">{row[2]}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
