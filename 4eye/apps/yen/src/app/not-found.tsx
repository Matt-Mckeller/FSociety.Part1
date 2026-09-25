import type { Metadata } from "next";
import Link from "next/link";
import "./status.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/*
  The site has ~380 routes and an archive of documents whose slugs are generated
  from filenames, so mistyped and stale URLs are expected rather than unusual.
  The default Next 404 gives a visitor nothing to do; this gives them the four
  places worth going.
*/

const DESTINATIONS = [
  { href: "/", label: "Home", primary: true },
  { href: "/docs", label: "Documentation" },
  { href: "/videos", label: "Videos" },
  { href: "/4eye", label: "Open 4eye" },
];

export default function NotFound() {
  return (
    <main className="status-page">
      <p className="status-code">404</p>
      <h1 className="status-title">That page isn&rsquo;t here.</h1>
      <p className="status-body">
        The link may be out of date, or the page may have moved while the site was being
        put together. The documentation index has a search box, which is the fastest way
        to find a specific document.
      </p>
      <ul className="status-links">
        {DESTINATIONS.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className={`status-link${d.primary ? " status-link--primary" : ""}`}
            >
              {d.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
