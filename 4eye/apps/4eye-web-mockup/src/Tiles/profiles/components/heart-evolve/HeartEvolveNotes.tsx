"use client";

/**
 * Heart.Evolve field notes — concise expandable rows; bodies stay verbatim.
 */

import {
  HEART_EVOLVE,
  HEART_EVOLVE_NOTES,
  type HeartEvolveNote,
} from "@yen/content/heart-evolve";

export function HeartEvolveNotes({
  notes = HEART_EVOLVE_NOTES,
  accent = HEART_EVOLVE.accent,
}: {
  notes?: HeartEvolveNote[];
  accent?: string;
}) {
  if (!notes.length) return null;

  return (
    <section
      id="heart-evolve-notes"
      aria-labelledby="heart-evolve-notes-heading"
      style={{
        marginTop: 20,
        borderRadius: 12,
        border: `1px solid ${accent}33`,
        background: "#fff",
        overflow: "hidden",
        scrollMarginTop: 96,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          padding: "12px 16px",
          borderBottom: "1px solid #e7e5e4",
          background: `${accent}0f`,
        }}
      >
        <div>
          <p
            id="heart-evolve-notes-heading"
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 750,
              letterSpacing: 1.1,
              textTransform: "uppercase",
              color: accent,
            }}
          >
            Notes
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#78716c" }}>
            Field notes · expand for full text (unchanged)
          </p>
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 12,
            fontWeight: 700,
            color: "#57534e",
          }}
        >
          {notes.length}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {notes.map((note, i) => (
          <details
            key={note.id}
            style={{
              borderTop: i === 0 ? undefined : "1px solid #e7e5e4",
              padding: "0 16px",
            }}
          >
            <summary
              style={{
                listStyle: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 0",
                fontSize: 14,
                fontWeight: 650,
                color: "#1c1917",
                userSelect: "none",
              }}
            >
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  border: `1px solid ${accent}55`,
                  background: `${accent}14`,
                  color: accent,
                  fontSize: 12,
                  fontWeight: 800,
                  display: "grid",
                  placeItems: "center",
                  lineHeight: 1,
                }}
                className="he-note-chevron"
              >
                ›
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>{note.title}</span>
            </summary>
            <pre
              style={{
                margin: "0 0 14px",
                marginLeft: 28,
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e7e5e4",
                background: "#fafaf9",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 12.5,
                lineHeight: 1.55,
                color: "#292524",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              {note.body}
            </pre>
          </details>
        ))}
      </div>

      <style>{`
        #heart-evolve-notes details > summary::-webkit-details-marker { display: none; }
        #heart-evolve-notes details[open] .he-note-chevron { transform: rotate(90deg); }
        #heart-evolve-notes .he-note-chevron { transition: transform 160ms ease; }
        #heart-evolve-notes details > summary:hover .he-note-chevron {
          border-color: ${accent};
          background: ${accent}22;
        }
      `}</style>
    </section>
  );
}
