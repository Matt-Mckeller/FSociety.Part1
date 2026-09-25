import Link from "next/link";
import index from "@/generated/docs-index.json";

/**
 * The 4eye extension plan.
 *
 * Generated from the coded plan files under
 * `_current/planning_Project_4eye/plans` at build time, so the codes, titles and
 * statuses here are whatever those documents currently say — there is no second
 * copy of the roadmap to fall out of date.
 *
 * A server component with inline styles: it is passed as `children` into the
 * client `PageShell`, so keeping MUI out of it holds this route at the lean
 * baseline despite listing 50+ items.
 */

interface Plan {
  slug: string | null;
  code: string | null;
  title: string;
  summary: string;
  planStatus: string | null;
}

/** Code prefix → what that family of plans covers. Order is the display order. */
const GROUPS: Array<{ prefix: string; title: string; blurb: string }> = [
  {
    prefix: "C",
    title: "Core platform",
    blurb:
      "The parts everything else plugs into — the API, the realtime layer, the data model, and the AI provider abstraction.",
  },
  {
    prefix: "I",
    title: "Infrastructure",
    blurb: "Where it runs, how it ships, and how it is watched.",
  },
  {
    prefix: "X",
    title: "Cross-cutting",
    blurb: "Concerns that touch every surface rather than living in one.",
  },
  {
    prefix: "F",
    title: "Application features",
    blurb:
      "What the platform does once the core exists. Most of these consume the AI provider layer rather than integrating separately.",
  },
  {
    prefix: "W",
    title: "Product surfaces",
    blurb: "The web-facing surfaces around the application itself.",
  },
  { prefix: "V", title: "Verticals", blurb: "Industry-specific shaping of the platform." },
  { prefix: "T", title: "Testing", blurb: "How correctness is established and kept." },
  { prefix: "P", title: "Projects", blurb: "Adjacent builds that depend on the platform." },
  { prefix: "D", title: "Setup", blurb: "Repository and local development groundwork." },
];

const STATUS_STYLE: Record<string, { bg: string; fg: string; border: string }> = {
  "Partially Implemented": { bg: "#f0fdf4", fg: "#15803d", border: "#86efac" },
  Planned: { bg: "#fffbeb", fg: "#b45309", border: "#fde68a" },
  "Not yet planned": { bg: "#f5f5f4", fg: "#78716c", border: "#e7e5e4" },
  Unspecified: { bg: "#f5f5f4", fg: "#a8a29e", border: "#e7e5e4" },
};

function StatusChip({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.Unspecified;
  return (
    <span
      style={{
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: 0.3,
        textTransform: "uppercase",
        padding: "2px 7px",
        borderRadius: 4,
        whiteSpace: "nowrap",
        background: s.bg,
        color: s.fg,
        border: `1px solid ${s.border}`,
      }}
    >
      {status}
    </span>
  );
}

/** Numeric part of the code, so C10 sorts after C9 rather than after C1. */
function codeOrder(code: string | null): number {
  return Number(code?.slice(1) ?? 0);
}

export function ExtensionRoadmap() {
  const roadmap = index.collections.find((c) => c.id === "roadmap");
  const plans = ((roadmap?.docs ?? []) as Plan[]).filter((d) => d.code);

  const counts = plans.reduce<Record<string, number>>((acc, p) => {
    const key = p.planStatus ?? "Unspecified";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div
        style={{
          padding: "14px 16px",
          border: "1px solid #e7e5e4",
          borderRadius: 8,
          background: "#fafaf9",
          maxWidth: "76ch",
          marginBottom: 28,
        }}
      >
        <p style={{ margin: "0 0 10px", fontSize: 15, lineHeight: 1.6 }}>
          {plans.length} coded plans describe how 4eye extends — what it connects to, what each
          piece is responsible for, and the order it arrives in. Every item links to the plan
          document behind it.
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([status, n]) => (
              <span key={status} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <StatusChip status={status} />
                <span style={{ fontSize: 12.5, color: "#78716c" }}>{n}</span>
              </span>
            ))}
        </div>
        <p style={{ margin: "12px 0 0", fontSize: 14 }}>
          For how 4eye extends into the physical world rather than into other systems, see the{" "}
          <Link href="/integration-layer" style={{ color: "#1d4ed8", fontWeight: 600 }}>
            integration layer
          </Link>
          .
        </p>
      </div>

      {GROUPS.map((group) => {
        const items = plans
          .filter((p) => p.code?.startsWith(group.prefix))
          .sort((a, b) => codeOrder(a.code) - codeOrder(b.code));
        if (items.length === 0) return null;

        return (
          <section key={group.prefix} style={{ marginBottom: 40 }}>
            <h2
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: 1.1,
                textTransform: "uppercase",
                color: "#78716c",
                margin: "0 0 4px",
              }}
            >
              {group.title}{" "}
              <span style={{ fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>
                · {items.length}
              </span>
            </h2>
            <p style={{ fontSize: 14, color: "#57534e", margin: "0 0 14px", maxWidth: "72ch", lineHeight: 1.55 }}>
              {group.blurb}
            </p>

            <div style={{ borderTop: "1px solid #e7e5e4" }}>
              {items.map((plan) => {
                const body = (
                  <>
                    <span
                      style={{
                        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: "#7c3aed",
                        minWidth: 34,
                      }}
                    >
                      {plan.code}
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 650, minWidth: 210 }}>{plan.title}</span>
                    <span
                      style={{
                        fontSize: 13,
                        color: "#78716c",
                        flex: 1,
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {plan.summary}
                    </span>
                    <StatusChip status={plan.planStatus ?? "Unspecified"} />
                  </>
                );

                const style: React.CSSProperties = {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                  padding: "10px 4px",
                  borderBottom: "1px solid #e7e5e4",
                  textDecoration: "none",
                  color: "inherit",
                };

                return plan.slug ? (
                  <Link key={plan.code} href={`/docs/${plan.slug}`} style={style}>
                    {body}
                  </Link>
                ) : (
                  <div key={plan.code} style={style}>
                    {body}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
