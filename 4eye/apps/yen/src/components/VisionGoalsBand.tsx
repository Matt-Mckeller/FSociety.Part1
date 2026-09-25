import Link from "next/link";

/**
 * Signature goals on yen home — public vision trio (1–3) then ongoing (4–6).
 * Personal / Heart.Evolve goals live on the profile, not here.
 *
 * Plain HTML/CSS (no MUI) — same budget rule as SeriesHighlights.
 */

type GoalCard = {
  id: string;
  n: number;
  code: string;
  title: string;
  blurb: string;
  accent: string;
  /** Subtle background watermark. */
  mark: string;
  badge?: string;
};

const VISION: GoalCard[] = [
  {
    id: "save",
    n: 1,
    code: "🌍.Save() + 🌏.Save() + 🌎.Save();",
    title: "Transforming Our Reality",
    blurb: "Collecting and preserving its information, evermore — memory as infrastructure.",
    accent: "#6fd3ff",
    mark: "+",
  },
  {
    id: "value",
    n: 2,
    code: "→ 🪙 → /👑",
    title: "Best Future — and present",
    blurb:
      "Update what we value. Currency and tokens are a path, not the point — teach what money forgot.",
    accent: "#7cc4ff",
    mark: "🪙",
  },
  {
    id: "king",
    n: 3,
    code: "/👑",
    title: "Command King Game",
    blurb: "Win. Rise. Claim the throne. Terminal + crown — currency in, reign out.",
    accent: "#b06cff",
    mark: "👑",
  },
];

const ONGOING: GoalCard[] = [
  {
    id: "build",
    n: 4,
    code: "ship(); learn(); repeat();",
    title: "Build something real",
    blurb: "Ship something used every week. Momentum over motivation.",
    accent: "#4fe0b0",
    mark: "↻",
  },
  {
    id: "depth",
    n: 5,
    code: "focus.breadthAndDepth();",
    title: "Prioritize focus & how you learn",
    blurb: "Breadth and depth. Wide variety is fine — rank attention and learn for effectiveness.",
    accent: "#7cc4ff",
    mark: "◎",
  },
  {
    id: "carry",
    n: 6,
    code: "lift(others);",
    title: "Leave people better",
    blurb: "With, not at. Steady people further along than you found them.",
    accent: "#d8a8ff",
    mark: "↗",
  },
];

function Group({
  label,
  sub,
  goals,
}: {
  label: string;
  sub: string;
  goals: GoalCard[];
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 750,
            letterSpacing: 1.1,
            textTransform: "uppercase",
            color: "#57534e",
          }}
        >
          {label}
        </p>
        <p style={{ margin: 0, fontSize: 13, color: "#78716c" }}>{sub}</p>
      </div>
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {goals.map((g) => (
          <Link
            key={g.id}
            href="/4eye/appRealm/profile"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: 16,
              borderRadius: 10,
              border: "1px solid #e7e5e4",
              borderTop: `3px solid ${g.accent}`,
              textDecoration: "none",
              color: "inherit",
              background: "#fafaf9",
              overflow: "hidden",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                right: -2,
                bottom: -22,
                fontSize: g.mark === "+" ? 96 : 72,
                fontWeight: 800,
                lineHeight: 1,
                color: g.accent,
                opacity: 0.1,
                pointerEvents: "none",
                userSelect: "none",
                fontFamily:
                  g.mark === "+" || g.mark === "♥" ? "Georgia, 'Times New Roman', serif" : "inherit",
              }}
            >
              {g.mark}
            </span>
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  color: g.accent,
                }}
              >
                {g.code}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                {g.badge && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 0.6,
                      textTransform: "uppercase",
                      color: "#b45309",
                      background: "rgba(245, 158, 11, 0.12)",
                      border: "1px solid rgba(245, 158, 11, 0.45)",
                      borderRadius: 999,
                      padding: "2px 8px",
                    }}
                  >
                    {g.badge}
                  </span>
                )}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 750,
                    letterSpacing: 0.6,
                    color: "#a8a29e",
                  }}
                >
                  #{g.n}
                </span>
              </span>
            </div>
            <span style={{ position: "relative", fontSize: 15.5, fontWeight: 700 }}>{g.title}</span>
            <span style={{ position: "relative", fontSize: 13.5, lineHeight: 1.5, color: "#57534e" }}>
              {g.blurb}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function VisionGoalsBand() {
  return (
    <section
      id="vision-goals"
      style={{
        borderBottom: "1px solid #e7e5e4",
        background: "#fff",
        scrollMarginTop: 24,
      }}
    >
      <div style={{ maxWidth: 1536, margin: "0 auto", padding: "40px 24px" }}>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            color: "#78716c",
          }}
        >
          Signature goals
        </p>
        <p style={{ margin: "6px 0 22px", fontSize: 15, color: "#57534e", maxWidth: "68ch" }}>
          Vision at the top of the pyramid; ongoing practice underneath. Full animated showcase on{" "}
          <Link href="/4eye/appRealm/profile" style={{ color: "#0c4a39", fontWeight: 650 }}>
            Profile
          </Link>{" "}
          and{" "}
          <Link href="/integration-layer?mode=app" style={{ color: "#0f766e", fontWeight: 650 }}>
            Integration Layers
          </Link>
          .
        </p>

        <Group label="Vision · 1–3" sub="Top of pyramid — Save + · Value & currency · Command King" goals={VISION} />
        <Group label="Ongoing · 4–6" sub="Living practice — ship · focus & learning · leave people better" goals={ONGOING} />
      </div>
    </section>
  );
}
