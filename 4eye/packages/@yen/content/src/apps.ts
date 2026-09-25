/**
 * The registry that drives the home grid and the site nav.
 *
 * Everything the site presents is an entry here. Routes read their own title
 * and summary from this list rather than restating them, so a tile and the page
 * it opens can never drift apart.
 *
 * Deliberately free of React and of any Node API: the docs route group and any
 * future build script both need to read it.
 */

export type AppStatus =
  /** Built and wired up. */
  | "live"
  /** Real content behind it, but not finished. */
  | "preview"
  /** Route exists, content pending. */
  | "planned";

export type AppGroup = "products" | "systems" | "workshop" | "record" | "about";

/**
 * An editorial claim about an entry, distinct from `status`.
 *
 * `status` is a fact about the build — does it run, is there content behind it.
 * A badge is a judgement about where the entry stands relative to the others,
 * and the two are genuinely independent: Expanse Services has a real site and
 * still nothing wired up, and Command Center is fully live while also being the
 * second way to look at data the Plan tile owns. One field could not say both.
 *
 *   flagship        the one to look at first, and the best of the set
 *   newest          most recently built. Decays — review it when something ships
 *   alternate-view  a second reading of data another surface owns, kept in sync
 *   documented-only the writing exists; the thing does not run
 *   superseded      deprecated as a front door; kept because the detail still holds
 */
export type AppBadge =
  | "flagship"
  | "newest"
  | "alternate-view"
  | "documented-only"
  | "superseded";

export interface AppEntry {
  id: string;
  title: string;
  href: string;
  /** One line, shown on the grid tile. Keep it under ~90 characters. */
  summary: string;
  /** Longer framing, shown as the page's own lede. */
  lede: string;
  status: AppStatus;
  group: AppGroup;
  /** Tile edge + glyph colour. */
  accent: string;
  /**
   * Visible on the grid but not launchable — grayed out, no navigation.
   * Use for workshop inventory that exists as signal, not as a product yet.
   */
  disabled?: boolean;
  /** Chip label when disabled. Defaults to "Disabled" (e.g. "WIP"). */
  disabledLabel?: string;
  /**
   * Override the status chip text while keeping the route launchable
   * (e.g. "Under construction" / "WIP" instead of Preview / Planned).
   */
  chipLabel?: string;
  /**
   * True when the app is real but still lives in its original repo, so
   * `/apps/<id>` describes it instead of running it. The detail itself lives in
   * `./showcases` — off this module on purpose, since this one is imported by
   * every page and that prose would ride along into all of them.
   */
  showcased?: boolean;
  /**
   * Suggested as a place to begin. A visitor who has never seen any of this
   * needs somewhere to land, and twenty equal choices is the same as none.
   */
  startHere?: boolean;
  /** Editorial standing. At most one per entry — two badges rank nothing. */
  badges?: AppBadge[];
  /**
   * One line qualifying the status, where the status word under-describes it.
   *
   * Only worth setting when "live" or "preview" would leave a reader with the
   * wrong impression. Most entries do not need one, and a note on every tile
   * would be the same as a note on none.
   */
  statusNote?: string;
  /**
   * Sort weight within the group, higher first. Unset sorts last, in registry
   * order, which is what every entry did before ranking existed.
   */
  rank?: number;
  /**
   * Draw the title heavier than its neighbours.
   *
   * One entry in the whole registry uses this. It is a blunt instrument and
   * stops meaning anything the moment a second tile takes it.
   */
  emphasis?: "bold";
  /**
   * Rarity, borrowed from the character's equipment model.
   *
   * The same word means the same thing in both places: the top of a scale that
   * most things on it never reach. Rendered with `RARITY_COLOR` from
   * `./character/equipment` rather than a second palette.
   */
  rarity?: "legendary";
}

/*
  Ordered by distance from the visitor's first question — "what is this?"

  Someone arriving cold gets the products first, how they are made second, the
  machinery underneath third, and the record last. That is the same organising
  question the profile page settled on: how far from the person is this? A flat
  list of twenty tiles asks the reader to rank them instead.
*/
export const APP_GROUPS: Array<{
  id: AppGroup;
  title: string;
  blurb: string;
  /** Optional motto lines under the title (systems: Vision / experience). */
  epigraph?: readonly string[];
}> = [
  {
    id: "products",
    title: "The products",
    blurb: "What is being built, and who it is for. Each one runs here.",
  },
  {
    id: "workshop",
    title: "The workshop",
    blurb:
      "How the learning product works — Learning, coins, quests, gear, and progression — plus where to open them and the docs that write them out. Grayed tiles below are inventoried, not launched yet.",
  },
  {
    id: "systems",
    title: "The systems underneath",
    epigraph: ["Vision is King", "And experience is ___"],
    blurb:
      "Web 4 is the plan. Stack and surfaces underneath. Symbol Grid is an important example of utilisation — not the final OS. Vision is King.",
  },
  {
    id: "record",
    title: "The Social Record",
    blurb: "Documentation, photos, videos and the public stream. Static, searchable, dated where it matters.",
  },
  {
    id: "about",
    title: "About",
    blurb: "Who is behind this and how to support it.",
  },
];

export const APPS: AppEntry[] = [
  {
    id: "4eye",
    title: "4eye",
    href: "/4eye",
    summary: "The running application — map, character, command center and daily loop.",
    lede: "The 4eye application itself, running here rather than described. Map, character, command center, stores, social and the technical reference are all live under this route.",
    status: "live",
    group: "products",
    accent: "#7c3aed",
    badges: ["flagship"],
    rank: 100,
  },
  {
    id: "matthew-mckeller",
    title: "Matthew McKeller",
    href: "/4eye/appRealm/profile",
    summary: "Meet Matthew — real profile, goals, and the character model.",
    lede: "Matthew McKeller modelled as a character: attributes, signature goals, and the daily loop. The sixth product is the person the rest of this is built around.",
    status: "live",
    group: "products",
    accent: "#0c4a39",
    rank: 98,
    statusNote: "Selectable users exist on the profile page; Matthew is the default.",
  },
  {
    id: "4eye-extension",
    title: "4eye Extension Plan",
    href: "/4eye-extension",
    summary: "How 4eye reaches outward — the coded plan for everything it connects to.",
    lede: "The plan for everything 4eye connects to: the core platform other systems talk through, the infrastructure beneath it, and the features that consume it — each with the status its own plan document declares.",
    status: "live",
    group: "systems",
    accent: "#0891b2",
  },
  {
    id: "integration-layer",
    title: "Integration Layer",
    href: "/integration-layer",
    summary: "The layer itself, on its own terms — not a section of the 4eye page.",
    lede: "The integration layer is infrastructure, not a feature of the app above it. It gets its own representation here because that is what it is — eight layers from the human at ground level up to full dive.",
    status: "live",
    group: "systems",
    accent: "#14b8a6",
  },
  {
    id: "4up",
    title: "4up",
    href: "/4up",
    summary: "Deprecated multi-business ops layer — kept for detail, not the current product story.",
    lede: "4up was the operational layer across several businesses at once: shared structure, separate data, one place to run them from. It is deprecated as a product label — included here because the architecture notes and screens still carry detail worth reading. Newer work folds the useful parts into 4eye and the workshop rather than shipping 4up as a front door.",
    status: "live",
    group: "workshop",
    accent: "#f59e0b",
    chipLabel: "Deprecated",
    badges: ["superseded"],
    statusNote: "Kept for detail — not the current product story.",
  },
  {
    id: "pur-meow",
    title: "Pur Meow",
    href: "/4up",
    summary: "Cat brand mark — hers. AGI Rib, Rib Clip, and this logo.",
    lede: "Pur Meow is her mark: AGI Rib + Rib Clip (video/marketing) + this logo. Not open for handoff. Name and how it sits next to the rest of the stack stay under her — not a discovery exercise for strangers.",
    status: "preview",
    group: "workshop",
    accent: "#ec4899",
    chipLabel: "Hers",
  },
  {
    id: "equipment",
    title: "Equipment",
    href: "/equipment",
    summary: "Gear rendered as actual graphics, by slot and rarity.",
    lede: "Every gear slot drawn rather than listed — grouped by slot, coloured by rarity, with what each piece actually modifies.",
    status: "live",
    group: "workshop",
    accent: "#16a34a",
  },
  {
    id: "surfaces",
    title: "Surface map",
    href: "/surfaces",
    summary: "Every surface built, and which ones nothing links to.",
    lede: "An audit of all 40 surfaces in the 4eye application: which are reachable from navigation, which have a route nothing points at, and which were built with no route at all.",
    status: "live",
    group: "workshop",
    accent: "#64748b",
  },
  {
    id: "docs",
    title: "Documentation",
    href: "/docs",
    summary: "Expanse EDU, 4up, technical docs, Lottie and the archive.",
    lede: "The written record. Current documentation up front, superseded work kept and labelled rather than deleted.",
    status: "live",
    group: "record",
    accent: "#0ea5e9",
  },
  {
    id: "videos",
    title: "Videos",
    href: "/videos",
    summary: "Phenominal shorts up front, then walkthroughs and field captures by branch.",
    lede: "Vertical Phenominal clips from the July sessions lead, then recorded walkthroughs of the systems here — website, app HUD, Web 4 plan, and straight to camera. Folders collapse so teaching stays up front.",
    status: "live",
    group: "record",
    accent: "#ef4444",
    startHere: true,
    rank: 100,
  },
  {
    id: "photos",
    title: "Photos",
    href: "/photos",
    summary: "Growth packs, personal stills, vision, and design — nests, albums, exports.",
    lede: "Browse by nest, album, or export pack. Capture and presence lead; vision and design nest underneath. Switch to Videos or Social from the tabs above.",
    status: "live",
    group: "record",
    accent: "#d97706",
  },
  {
    id: "social",
    title: "Social",
    href: "/social",
    summary: "Public stream — posts and live tracking.",
    lede: "The public-facing social surface: writing and live presence. Yen publishes; platforms redistribute. Profile is the person; this is the stream.",
    status: "preview",
    group: "record",
    accent: "#db2777",
    rank: 88,
    chipLabel: "Under construction",
    statusNote: "WIP — under construction; return to finish public stream + ingest.",
  },
  {
    id: "posts",
    title: "Posts",
    href: "/posts",
    summary: "Writing — what happened, what it cost, what it taught.",
    lede: "Longer-form writing about building this, including the parts that were a battle.",
    status: "live",
    group: "record",
    accent: "#8b5cf6",
  },
  {
    id: "donate",
    title: "Donate",
    href: "/donate",
    summary: "Where support goes, and what is being worked toward.",
    lede: "Support for the people who need food, shelter and work; for mental health; and for the students this is ultimately built for.",
    status: "live",
    group: "about",
    accent: "#ec4899",
  },
  {
    id: "vision",
    title: "Vision",
    href: "/vision",
    summary: "AION, Web 4, and the products on the path — where this is going, with image slots.",
    lede: "Vision of the future: AION as host AI / OS and creator root, Web 4 as a human OS, and the products that ship the path. Image and recording slots mark what still needs shooting.",
    status: "live",
    group: "about",
    accent: "#7c3aed",
    rank: 90,
  },
  {
    id: "command-center",
    title: "Command Center",
    href: "/apps/command-center",
    summary: "The whole Command Center, running here — dashboard, missions, insights, records, docs.",
    lede: "The Command Center itself, unmodified. It is built from its own repository with its own toolchain and served here, so what you see is the application exactly as it runs standalone — dashboard, missions, insights, records and docs. The Strategic Compass is also available on its own, rebuilt against this site's theme. Its documentation is the part worth reading first.",
    status: "live",
    group: "systems",
    accent: "#3b82f6",
    /*
      Not deprecated, and the distinction matters. It reads the same planning
      data as 4eye's Plan tile and presents it differently — a second view, not
      an older one. Labelling it superseded would tell a reader to skip the
      documentation, which is the most complete writing on the planning model
      anywhere in this repository.
    */
    badges: ["alternate-view"],
    statusNote:
      "A second view of the same planning data as 4eye's Plan tile, kept in sync — not a replacement, and not replaced.",
    rank: 70,
  },
  {
    /*
      The id stays `lottie`. It is the key for the showcase entry, the docs
      collection, the mount path and every link already written against it —
      renaming it would break all four to change a word on one tile. Lottie is
      also still the file format underneath; it is just no longer the point.
    */
    id: "lottie",
    title: "ThemedAnimationNFTs",
    href: "/apps/lottie",
    summary: "Animations as owned, themed, tradeable assets — the highest-value data class here.",
    lede: "Themed animation NFTs: animations treated as assets rather than files. A naming and validation pipeline gives each one a stable identity, theme generation makes one animation into a family, and the studio is where both happen. This is the piece of the system that produces something a person can own, display on a profile, and trade — which is why it is rated legendary rather than merely built.",
    status: "preview",
    group: "systems",
    accent: "#ef4444",
    showcased: true,
    emphasis: "bold",
    rarity: "legendary",
    rank: 80,
  },
  {
    id: "expanse-services",
    title: "Expanse Services",
    href: "/apps/expanse-services",
    summary:
      "Company services site and shop — fixed-price work, coin economy, Future-of-Work culture.",
    lede:
      "Expanse Services is the consulting and revenue front: a company-branded site (not a personal resume) that sells software development and components at fixed prices through a coin wallet, with culture and gamification as part of the offer — not just a contact form.",
    /*
      Downgraded from "preview" deliberately. Preview implies something to look
      at; this has a source tree and a description and nothing a visitor can
      open. `build-mounted-apps.mjs` records why it cannot be served here: 15 of
      its pages query GraphQL through Apollo at build time, so a static export
      prerenders them with no server to answer. That needs a running API, not a
      config change.
    */
    status: "planned",
    group: "products",
    accent: "#0ea5e9",
    showcased: true,
    badges: ["documented-only"],
    statusNote: "Documented, not running. The source and the plan exist; nothing here opens yet.",
    rank: 10,
  },
  {
    id: "expanse-edu",
    title: "Expanse EDU",
    href: "/apps/expanse-edu",
    summary: "The education product, running here — the thing all of this is ultimately for.",
    lede: "Expanse EDU itself, built from its own repository and served unchanged. Its documentation — 222 files — is published in full under Documentation.",
    status: "live",
    group: "products",
    accent: "#14b8a6",
    statusNote:
      "The product and its demo flows run here. The backend behind them was built and tested, and still needs migrating.",
    rank: 90,
  },
  {
    id: "4wing",
    title: "4wing — Counsellor Support",
    href: "/apps/4wing",
    summary: "Counsellor support, running — AI assistant with a companion robot.",
    lede: "The counsellor support product, plus the companion character, pitch deck, and brand design tool — each built from the 4wing repository and served here unchanged.",
    status: "live",
    group: "products",
    accent: "#a855f7",
    statusNote: "Product site, pitch deck, character designer, and docs all run from this page.",
  },
  {
    id: "presentation",
    title: "Presentation Wiki",
    href: "/apps/presentation",
    summary: "The learning-platform wiki — inventoried, not launched.",
    lede: "The Presentation wiki itself, built from its own repository. Disabled for now — the mount is unreliable and should not be a front door.",
    status: "planned",
    group: "workshop",
    accent: "#f59e0b",
    disabled: true,
    statusNote: "Disabled — grayed in the workshop until the mount is sorted.",
  },
  {
    id: "backup",
    title: "Backup & encrypt",
    href: "/apps/backup",
    summary: "Backup and encrypt on your machine — you run them, not Ion.",
    lede:
      "Two tools you operate: encrypted backup with a free-space gate, and password OpenPGP so a file unlocks on any computer with GPG. Not Ion, not a cloud account. Localhost only, so these are pictures — stand-in data, because a backup screenshot is a map of the machine.",
    status: "live",
    group: "workshop",
    accent: "#0f766e",
    rank: 72,
    badges: ["newest"],
    statusNote: "Localhost only. Captures use invented paths, sizes and archive names.",
  },
  {
    id: "symbol-grid",
    title: "Symbol Grid",
    href: "/apps/symbol-grid",
    summary: "Example utilisation — symbols and icons as a comprehension surface (not the final OS).",
    lede: "Symbol Grid demonstrates utilising symbols and icons for meaning without a paragraph. Important and live — an example of what can be utilised, not the final OS implementation. The plan lives in Web 4.",
    status: "live",
    group: "systems",
    accent: "#64748b",
    rank: 85,
    statusNote: "Example under The systems underneath — not labeled as final OS.",
  },
  {
    id: "communication-planner",
    title: "Communication Planner",
    href: "/apps/communication-planner",
    summary: "Clarify communications and relationship intent — the planner runs here on a public demo session.",
    lede: "A communications planning surface: intent, a reader model, and drafts in labelled blocks. The framed app is the real planner with a public demo session; named people and dark drafts stay in the local copy and never reach this site.",
    status: "live",
    group: "systems",
    accent: "#94a3b8",
    statusNote: "Running here on invented demo data. Private sessions stay local.",
  },
  {
    id: "storybook",
    title: "Storybooks",
    href: "/apps/storybook",
    summary: "Two component libraries — incomplete, needs organisation, possibly out of date.",
    lede: "The component libraries themselves — each piece of the interface on its own. Two books: 4eye and Expanse. Potentially incomplete, missing coverage, needs organisation, and possibly out of date — useful anyway, labelled honestly.",
    status: "live",
    group: "workshop",
    accent: "#db2777",
    statusNote:
      "Potentially incomplete · missing coverage · needs organisation · possibly out of date.",
  },
  {
    id: "live",
    title: "See Matt Live",
    href: "/live",
    summary: "Live stream page — Twitch player and VOD fallback.",
    lede: "Live presence: stream when on, recordings when not. The site is the publisher of record; platforms redistribute.",
    status: "live",
    group: "record",
    accent: "#ef4444",
    rank: 80,
    statusNote: "Twitch embed (4eye_humanai). Schedule and multi-platform chain still thin.",
  },
  {
    id: "sample-privacy",
    title: "Privacy & security",
    href: "/apps/sample-privacy",
    summary: "How we operate — dive-in knowledge map for privacy and security.",
    lede:
      "Security and privacy are core to who Matthew is. Dive the chip map: filtering, access, sharing, pipelines, school rules, founder depth — and we plan to teach this too.",
    status: "live",
    group: "workshop",
    accent: "#0f766e",
    rank: 70,
    statusNote: "Live knowledge map · Shield4 configurator still planned separately.",
  },
  {
    id: "shield4",
    title: "Shield4",
    href: "/apps/shield4",
    summary: "Security enclosure configurator — inventoried, not launched.",
    lede: "Shield4. Present in the workshop inventory; disabled until graphics and product path are ready.",
    status: "planned",
    group: "workshop",
    accent: "#475569",
    disabled: true,
    statusNote: "Disabled — grayed in the workshop. SVG / graphics still improving.",
  },
  {
    id: "swords-list",
    title: "Swords.List()",
    href: "/apps/swords-list",
    summary: "Swords list surface — inventoried, not launched.",
    lede: "Swords.List(). Workshop inventory only; disabled until the surface is ready.",
    status: "planned",
    group: "workshop",
    accent: "#78716c",
    disabled: true,
    statusNote: "Disabled — grayed in the workshop. SVG / graphics still improving.",
  },
];


/**
 * Entries in one group, ranked first and then in registry order.
 *
 * Sorted here rather than at each call site, because the grid, the crown and
 * the full-screen picker all read this and have to agree about what comes
 * first — the crown's spires are the products in this order, so a different
 * ordering anywhere would put a product on the wrong point.
 *
 * The header compass has its own curated list (`appsForCompass`) — it is site
 * navigation, not a mirror of the products group.
 *
 * Unranked entries keep registry order among themselves: `sort` is stable in
 * every engine this runs on, and equal keys therefore do not shuffle.
 */
export function appsInGroup(group: AppGroup): AppEntry[] {
  return APPS.filter((app) => app.group === group).sort(
    (a, b) => (b.rank ?? 0) - (a.rank ?? 0),
  );
}

/**
 * Destinations on the header compass.
 *
 * Products that run, plus Command Center, technical docs, and media. Docs and
 * media scroll to The Social Record on the home page rather than leaving it —
 * the section is the front door; the dedicated routes stay one click further.
 */
export function appsForCompass(): AppEntry[] {
  const docs = getApp("docs");
  const photos = getApp("photos");
  return [
    getApp("4eye"),
    getApp("matthew-mckeller"),
    getApp("expanse-edu"),
    getApp("4wing"),
    getApp("command-center"),
    {
      ...docs,
      title: "Technical Documentation",
      href: "/#group-record",
      summary: "Written record — scroll to The Social Record below.",
    },
    {
      ...photos,
      id: "media",
      title: "Media",
      href: "/#group-record",
      summary: "Photos and videos — scroll to The Social Record below.",
    },
  ];
}

/**
 * Look up one entry, or throw.
 *
 * Routes call this with a literal id, so a miss means the route and the
 * registry have diverged — worth failing the build over rather than rendering
 * a page with no title.
 */
export function getApp(id: string): AppEntry {
  const app = APPS.find((entry) => entry.id === id);
  if (!app) {
    throw new Error(
      `No app registered with id "${id}". Add it to APPS in @yen/content.`,
    );
  }
  return app;
}
