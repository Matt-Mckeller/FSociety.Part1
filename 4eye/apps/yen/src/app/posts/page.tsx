import { getApp } from "@yen/content";
import { PageShell } from "@/components/PageShell";
import { PostList } from "@/components/posts/PostList";

const app = getApp("posts");

export const metadata = {
  title: `${app.title}`,
  description: app.summary,
};

export default function Page() {
  return (
    <PageShell app={app}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          role="status"
          style={{
            padding: "14px 16px",
            borderRadius: 10,
            border: "1px solid #d6d3d1",
            background: "#f5f5f4",
            color: "#57534e",
            fontSize: 14,
            lineHeight: 1.55,
            maxWidth: "72ch",
          }}
        >
          <strong style={{ color: "#1c1917" }}>Work in progress.</strong> This page is visit-able but
          unfinished.
        </div>
        <PostList />
      </div>
    </PageShell>
  );
}
