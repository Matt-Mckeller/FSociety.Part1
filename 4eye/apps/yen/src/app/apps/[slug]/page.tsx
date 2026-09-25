import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getApp } from "@yen/content";
import { getShowcase, showcaseIds } from "@yen/content/showcases";
import { PageShell } from "@/components/PageShell";
import { AppShowcaseBody } from "@/components/AppShowcaseBody";

/*
  One route for every app that is real but not yet ported. Adding an app to the
  grid is a registry entry plus a showcase entry — not a new page file — which
  keeps a tile and the page it opens from drifting apart.
*/
export function generateStaticParams() {
  return showcaseIds().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (!getShowcase(params.slug)) return {};
  const app = getApp(params.slug);
  return { title: `${app.title}`, description: app.summary };
}

export default function Page({ params }: { params: { slug: string } }) {
  const showcase = getShowcase(params.slug);
  if (!showcase) notFound();

  const app = getApp(params.slug);

  return (
    <PageShell app={app}>
      <AppShowcaseBody showcase={showcase} app={app} />
    </PageShell>
  );
}
