import Link from "next/link";
import index from "@/generated/docs-index.json";

/**
 * Lists the documents in one docs collection.
 *
 * A server component with inline styles rather than MUI: it is passed as
 * `children` into the client `PageShell`, so keeping it free of MUI means these
 * routes stay at the lean baseline instead of paying the content-route cost.
 */

export interface CollectionPreviewProps {
  collectionId: string;
  /** Cap the list; the rest are reachable from /docs. */
  limit?: number;
}

export function CollectionPreview({ collectionId, limit = 24 }: CollectionPreviewProps) {
  const collection = index.collections.find((c) => c.id === collectionId);

  if (!collection || collection.docs.length === 0) {
    return (
      <p style={{ fontSize: 15, color: "#78716c", maxWidth: "70ch", lineHeight: 1.6 }}>
        No documents indexed for this collection yet. They are picked up from the source
        directories by <code>scripts/build-docs-index.mjs</code> at build time.
      </p>
    );
  }

  const shown = collection.docs.slice(0, limit);
  const rest = collection.docs.length - shown.length;

  return (
    <div>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: "#57534e", maxWidth: "72ch", margin: "0 0 20px" }}>
        {collection.blurb}
      </p>

      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {shown.map((doc, i) =>
          doc.slug ? (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              style={{
                display: "block",
                padding: "14px 16px",
                border: "1px solid #e7e5e4",
                borderLeft: `3px solid ${collection.accent}`,
                borderRadius: 8,
                textDecoration: "none",
                color: "inherit",
                background: "#fff",
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 650, margin: "0 0 4px" }}>{doc.title}</p>
              {doc.summary && (
                <p style={{ fontSize: 13, lineHeight: 1.5, color: "#57534e", margin: "0 0 8px" }}>
                  {doc.summary.slice(0, 130)}
                  {doc.summary.length > 130 ? "…" : ""}
                </p>
              )}
              <span style={{ fontSize: 11.5, color: "#a8a29e" }}>
                {doc.modified}
                {doc.words ? ` · ${doc.words.toLocaleString()} words` : ""}
              </span>
            </Link>
          ) : (
            <div
              key={`bin-${i}`}
              style={{
                padding: "14px 16px",
                border: "1px solid #e7e5e4",
                borderRadius: 8,
                background: "#fafaf9",
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 650, margin: "0 0 4px" }}>{doc.title}</p>
              <span style={{ fontSize: 11.5, color: "#a8a29e" }}>{doc.format} · download only</span>
            </div>
          ),
        )}
      </div>

      <p style={{ marginTop: 20, fontSize: 14 }}>
        <Link href="/docs" style={{ color: "#1d4ed8", fontWeight: 600 }}>
          {rest > 0 ? `${rest} more in the documentation index →` : "All documentation →"}
        </Link>
      </p>
    </div>
  );
}
