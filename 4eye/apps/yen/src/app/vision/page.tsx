import Link from "next/link";
import { getApp } from "@yen/content";
import { VISION_CHAPTERS, VISION_INTRO } from "@yen/content/vision";
import { PageShell } from "@/components/PageShell";

const app = getApp("vision");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

function ImageSlot({
  title,
  blurb,
  imageSrc,
  href,
  accent,
}: {
  title: string;
  blurb: string;
  imageSrc: string | null;
  href?: string;
  accent: string;
}) {
  const frame = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 12,
        border: "1px solid #e7e5e4",
        overflow: "hidden",
        background: "#fff",
        height: "100%",
      }}
    >
      <div
        style={{
          aspectRatio: "16 / 10",
          background: imageSrc
            ? `#0c0a09 center/cover no-repeat url(${imageSrc})`
            : `repeating-linear-gradient(-45deg, #f5f5f4, #f5f5f4 8px, #e7e5e4 8px, #e7e5e4 16px)`,
          display: "grid",
          placeItems: "center",
          color: "#78716c",
          fontSize: 13,
          fontWeight: 650,
          borderBottom: `3px solid ${accent}`,
        }}
      >
        {!imageSrc && "Vision image — to come"}
      </div>
      <div style={{ padding: "14px 16px" }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{title}</p>
        <p style={{ margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "#57534e" }}>{blurb}</p>
      </div>
    </div>
  );

  if (!href) return frame;
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
      {frame}
    </Link>
  );
}

export default function VisionPage() {
  return (
    <PageShell app={app}>
      <div style={{ maxWidth: 1100 }}>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            color: "#7c3aed",
          }}
        >
          {VISION_INTRO.eyebrow}
        </p>
        {/* h2, not h1: PageShell already renders the page's h1 from the registry. */}
        <h2 style={{ margin: "8px 0 12px", fontSize: 36, fontWeight: 750, letterSpacing: -0.8 }}>
          {VISION_INTRO.title}
        </h2>
        <p style={{ margin: "0 0 36px", fontSize: 17, lineHeight: 1.6, color: "#57534e", maxWidth: "68ch" }}>
          {VISION_INTRO.lede}
        </p>

        {VISION_CHAPTERS.map((chapter) => (
          <section key={chapter.id} style={{ marginBottom: 48 }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  borderLeft: `3px solid ${chapter.accent}`,
                  paddingLeft: 12,
                }}
              >
                {chapter.title}
              </h2>
              {chapter.href && (
                <Link href={chapter.href} style={{ fontSize: 13.5, fontWeight: 650, color: chapter.accent }}>
                  Open →
                </Link>
              )}
            </div>
            <p style={{ margin: "0 0 16px 15px", fontSize: 15, color: "#57534e", maxWidth: "70ch" }}>
              {chapter.blurb}
            </p>
            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              }}
            >
              {chapter.slots.map((slot) => (
                <ImageSlot key={slot.id} {...slot} accent={chapter.accent} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
