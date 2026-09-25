import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import { SITE_DESCRIPTION, SITE_NAME, siteUrl } from "@/lib/site";
import "./global.css";

export const metadata: Metadata = {
  /*
    `metadataBase` is what makes the relative `opengraph-image` resolve to an
    absolute URL. Without it Next emits a relative og:image, every unfurler
    ignores it, and the card renders as a bare link — which is what the site did
    before this.
  */
  metadataBase: new URL(siteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Matthew McKeller" }],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  other: {
    /*
      Turn off the browsers' own machine translation.

      `translate="no"` on <html> is the standard signal and is what Safari and
      Firefox read; Chrome additionally wants the legacy `google/notranslate`
      meta, and Bing wants its own — so all three are declared rather than
      picking the one that covers the most browsers.

      This is not precious about the prose. The page carries product names,
      invented vocabulary and code identifiers — "4eye", "Mainline", "Swipe
      Cast", "REACH" — and an automatic pass renders those as ordinary words,
      which produces text that reads as though it means something and does not.
      The site ships a real language switcher instead; refusing the browser's
      version is only defensible *because* there is one.
    */
    google: "notranslate",
    "msapplication-TileColor": "#0f172a",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `lang` and `dir` are re-written by LocaleProvider once the visitor's
    // choice is known; these are the server-render defaults.
    <html lang="en" dir="ltr" translate="no" className="notranslate">
      <body style={{ margin: 0 }}>
        <Providers>
          {/*
            Skip link lives inside Providers so <body> has one child.
            As a sibling of the client tree it was the hydration mismatch
            Next reported as "expected a matching <div> in <body>".
          */}
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <div id="main">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
