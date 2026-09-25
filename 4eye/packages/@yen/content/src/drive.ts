/**
 * Documents that live on Google Drive rather than in a repository.
 *
 * The Web 4 plan links to these inline, buried in a 6,000-word document. They
 * are the things an investor or a partner actually asks for — the business
 * plan, the financial model, the feature roadmap — so they get their own place
 * rather than being findable only by reading the plan end to end.
 *
 * Access is Matthew's to grant. Nothing here is proxied or mirrored; the site
 * only points at the document, so whatever sharing setting Drive has is what a
 * visitor gets. `access` records the intent so the page can say so plainly
 * rather than letting someone discover a permission wall by clicking.
 */

export type DriveAccess = "public" | "on-request";

export interface DriveDoc {
  id: string;
  title: string;
  description: string;
  /** Drive document kind, shown as a small label. */
  kind: "Document" | "Spreadsheet" | "Presentation";
  href: string;
  access: DriveAccess;
}

export const DRIVE_DOCS: DriveDoc[] = [
  {
    id: "edu-business-plan",
    title: "Expanse EDU business plan",
    description:
      "The education product as a business: what it sells, to whom, and on what model. The most complete written argument for the company.",
    kind: "Document",
    href: "https://docs.google.com/document/d/1mRzoBtcW6t5zyaB4olHeK7g8esqVVSrAHDJByyF7o-8/edit",
    access: "on-request",
  },
  {
    id: "features-roadmap",
    title: "Features and roadmap",
    description:
      "Every planned feature with its sequencing — the spreadsheet the roadmap documents are derived from.",
    kind: "Spreadsheet",
    href: "https://docs.google.com/spreadsheets/d/1v-uC03u4bDmY2TntOa6pMitq2vtP4Gr3dc-bzwXh2u0/edit",
    access: "on-request",
  },
  {
    id: "roadmap-business-segments",
    title: "Roadmap and business segments",
    description:
      "How the work divides into segments, and which part of the business each one serves.",
    kind: "Document",
    href: "https://docs.google.com/document/d/18SNIg5J0LI1PCgXFwSeo2m_WlEEHkGQ3NHSJPPnmuQo/edit",
    access: "on-request",
  },
  {
    id: "services-screens",
    title: "Screens and UI — services, future of work",
    description:
      "The interface work for the services side and the future-of-work product, written up screen by screen.",
    kind: "Document",
    href: "https://docs.google.com/document/d/1NliurpAN1zzsH-MTzDXseJsVo2f3Vt-gDbk6YA8qReE/edit",
    access: "on-request",
  },
  {
    id: "education-deck",
    title: "Education presentation",
    description: "The education deck as presented.",
    kind: "Presentation",
    href: "https://docs.google.com/presentation/d/13HtRrazdAvUAocjwJzX-Kc8Flz1gLV_xvU51IBjpJOk/edit",
    access: "on-request",
  },
  {
    id: "privacy-policy",
    title: "Privacy policy",
    description: "The privacy policy for Expanse EDU.",
    kind: "Document",
    href: "https://docs.google.com/document/d/1qR7asxqBD5FnMSSi0SRyruyE43j0-jvB1Ie2Sx4YjxE/edit",
    access: "on-request",
  },
];
