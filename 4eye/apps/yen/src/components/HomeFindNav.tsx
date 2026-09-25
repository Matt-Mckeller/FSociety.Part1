import { APP_GROUPS } from "@yen/content";

/**
 * Sticky section jumps for the long home scroll.
 *
 * Plain HTML/CSS on purpose — same reason as docs: keep the server home route
 * free of MUI. Mirrors DocsFindNav; targets home anchors rather than docs ids.
 */

/** Order mirrors the page. Walkthrough moved above Profile with the sections. */
const TOP_LINKS: Array<{ href: string; label: string }> = [
  { href: "#path", label: "Path" },
  { href: "#walkthrough", label: "Walkthrough" },
  { href: "#profile-preview", label: "Profile" },
  { href: "#vision-goals", label: "Vision & goals" },
];

const GROUP_LABEL: Record<string, string> = {
  products: "Products",
  workshop: "Workshop",
  systems: "Systems",
  record: "Social Record",
  about: "About",
};

export function HomeFindNav() {
  return (
    <nav className="home-find" aria-label="Find on this page">
      <p className="home-find-title">Find</p>
      <ul className="home-find-list">
        {TOP_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
        {APP_GROUPS.map((group) => (
          <li key={group.id}>
            <a href={`#group-${group.id}`}>{GROUP_LABEL[group.id] ?? group.title}</a>
          </li>
        ))}
        <li>
          <a href="/docs">Docs</a>
        </li>
        <li>
          <a href="/vision">Vision</a>
        </li>
      </ul>
    </nav>
  );
}
