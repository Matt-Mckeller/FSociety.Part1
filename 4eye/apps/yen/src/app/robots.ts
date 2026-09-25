import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/*
  Crawling is allowed everywhere on purpose, including the document archive.

  It is tempting to disallow `/docs/*` here to keep 520 rough planning documents
  out of search results, but that produces the opposite of the intended effect:
  Google does not support `noindex` in robots.txt, and a path it is forbidden to
  crawl is a path where it can never see the `noindex` tag. A blocked URL can
  still be indexed from inbound links, just with no idea what is on it.

  So: crawling open, indexing decided per page. The archive pages carry
  `robots: { index: false }` in their own metadata, which is the directive that
  actually works, and the sitemap below lists only the routes worth ranking.
*/

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
