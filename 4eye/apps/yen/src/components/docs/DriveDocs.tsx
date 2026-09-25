import { DRIVE_DOCS } from "@yen/content/drive";

/*
  Rendered above the collections on /docs. These are the documents people ask
  for by name, and they are not in any repository — linking them from the plan
  alone meant reading 6,000 words to find them.
*/
export function DriveDocs() {
  return (
    <section className="docs-collection" style={{ ["--accent" as string]: "#0ea5e9" }}>
      <div className="docs-collection-head">
        <h2 className="docs-collection-title">On Google Drive</h2>
        <span className="docs-collection-count">{DRIVE_DOCS.length} documents</span>
      </div>
      <p className="docs-collection-blurb">
        Business and planning documents that live on Drive rather than in a repository.
        Access is granted per person — ask, and the link works.
      </p>

      <div className="docs-grid">
        {DRIVE_DOCS.map((doc) => (
          <a
            className="docs-card"
            key={doc.id}
            href={doc.href}
            target="_blank"
            rel="noreferrer"
          >
            <p className="docs-card-title">{doc.title}</p>
            <p className="docs-card-summary">{doc.description}</p>
            <span className="docs-card-meta">
              {doc.kind}
              {doc.access === "on-request" && (
                <>
                  {" · "}
                  <span className="docs-badge archive">access on request</span>
                </>
              )}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
