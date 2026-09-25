/**
 * Privacy & security knowledge — dive-in chip map for yen.
 *
 * Expertise first, plain language. Clusters open into deeper chips.
 * Seeded from EDU business plan, product docs, and founder direction.
 */

export type PrivacyChipWeight = 1 | 2 | 3 | 4 | 5;

export interface PrivacyChip {
  id: string;
  label: string;
  /** Short plain gloss. */
  gloss?: string;
  /** Child chip ids for dive-in. */
  kids?: string[];
  /** Relative weight for sizing in the grid (1–5). */
  weight?: PrivacyChipWeight;
  /** Internal source note — optional on public UI. */
  source?: string;
}

export const PRIVACY_CHIP_ROOT_ID = "root";

export const PRIVACY_CHIPS: Record<string, PrivacyChip> = {
  root: {
    id: "root",
    label: "Privacy & security knowledge",
    gloss: "Tap a chip to dive in. How we operate, what we build, and what Matthew knows — privacy and security as living knowledge.",
    kids: [
      "operate",
      "teach",
      "filter",
      "access",
      "data-share",
      "pipelines",
      "edu-rules",
      "roles",
      "ai-care",
      "keep-close",
      "expertise",
      "shield",
    ],
  },

  // —— Top clusters ——
  operate: {
    id: "operate",
    label: "How we operate",
    gloss:
      "We think about security and privacy all the time — it’s core to who Matthew is. He also knows information has incredible value for learning, and recommends sharing when you feel the time is right. We plan to teach privacy and security too.",
    weight: 5,
    kids: [
      "always-on-mind",
      "share-when-ready",
      "teach-privacy",
      "you-control",
      "no-sell",
      "less-kept",
      "consent-record",
      "founder-built",
    ],
    source: "yen page direction · Matthew",
  },
  teach: {
    id: "teach",
    label: "Teach privacy & security",
    gloss:
      "We plan to teach privacy and security — not only build it. Knowledge shared so people can protect themselves and choose wisely.",
    weight: 5,
    kids: [
      "teach-privacy",
      "teach-security",
      "learn-by-doing",
      "threat-sense",
    ],
    source: "Matthew direction",
  },
  filter: {
    id: "filter",
    label: "Filtering",
    gloss: "Clean before store or send. World-scale personal-data care first.",
    weight: 5,
    kids: [
      "world-pii",
      "grouping",
      "scrub-names",
      "domain-rooms",
      "private-mode",
      "url-filter",
    ],
    source: "EDU business plan · Symbol Grid · EDU PII notes",
  },
  access: {
    id: "access",
    label: "Access & identity",
    gloss: "Who gets in, how they prove it, and classroom-scale login.",
    weight: 5,
    kids: [
      "access-control",
      "authentication",
      "sso",
      "classroom-sso",
      "mfa",
      "session-keys",
    ],
    source: "auth plans · EDU classroom login",
  },
  "data-share": {
    id: "data-share",
    label: "Data sharing",
    gloss:
      "You decide how your data is handled. We plan rewards for audiences who choose to share — usually anonymized — so learning can grow without forcing exposure.",
    weight: 5,
    kids: [
      "user-decides",
      "share-rewards",
      "anon-share",
      "audience-opt-in",
    ],
    source: "Privacy Layer · Matthew direction",
  },
  pipelines: {
    id: "pipelines",
    label: "Pipelines",
    gloss: "Same path every time — prove, allow, clean, audit.",
    weight: 5,
    kids: ["protect-pipe", "input-pipe", "min-context", "review-pipe"],
    source: "yen technical pipelines · CC privacy quest",
  },
  "edu-rules": {
    id: "edu-rules",
    label: "School rules",
    gloss: "What education products must respect.",
    weight: 4,
    kids: ["coppa", "ferpa", "gdpr", "ccpa", "soc2", "parent-path", "no-extra-store"],
    source: "EDU privacy-and-security · business-plan-4expanse-ai",
  },
  roles: {
    id: "roles",
    label: "Who sees what",
    gloss: "Different people get different cuts of the same session.",
    weight: 4,
    kids: ["full-view", "filtered-recap", "anon-oversight", "usernames"],
    source: "4wing · EDU usernames",
  },
  "ai-care": {
    id: "ai-care",
    label: "AI care",
    gloss: "AI helps — without swallowing your private life.",
    weight: 5,
    kids: ["train-opt-in", "server-prompts", "strip-before-ai", "edge-ai"],
    source: "Privacy Layer · MasterPlan · EDU AI notes",
  },
  "keep-close": {
    id: "keep-close",
    label: "Keep heavy data close",
    gloss: "Raw stays near you. Only useful summaries travel.",
    weight: 4,
    kids: ["on-device", "retention", "kill-switch", "encrypt", "local-tools"],
    source: "layers · Private Mode story · EDU encryption",
  },
  expertise: {
    id: "expertise",
    label: "Founder depth",
    gloss: "Grand Master of Cyber and Informational Security · Golden Eye Experience.",
    weight: 5,
    kids: [
      "grand-master",
      "golden-eye",
      "opsec",
      "physical",
      "software-hard",
      "threat-sense",
    ],
    source: "Matthew · Planning/privacy",
  },
  shield: {
    id: "shield",
    label: "Shield / safe room",
    gloss:
      "Password entry that cameras and radio can’t read — and more. Matthew has a few of these on his purchase list and sales list.",
    weight: 4,
    kids: ["em", "thermal", "acoustic", "visual-block", "and-more", "buy-sell-list"],
    source: "Shield4 · Matthew purchase & sales lists",
  },

  // —— Operate kids ——
  "always-on-mind": {
    id: "always-on-mind",
    label: "Privacy on the mind",
    gloss:
      "Security and privacy aren’t a side project — we think about them all the time. Core to who Matthew is.",
    weight: 5,
  },
  "share-when-ready": {
    id: "share-when-ready",
    label: "Share when the time is right",
    gloss:
      "Information has incredible value for learning. We recommend sharing when you feel ready — not before.",
    weight: 5,
  },
  "teach-privacy": {
    id: "teach-privacy",
    label: "Teach privacy",
    gloss: "Plan: teach people how privacy works in real life and in products.",
    weight: 5,
  },
  "teach-security": {
    id: "teach-security",
    label: "Teach security",
    gloss: "Plan: teach security habits, threats, and how to stay safe online and offline.",
    weight: 5,
  },
  "learn-by-doing": {
    id: "learn-by-doing",
    label: "Learn by doing",
    gloss: "Teaching through builds, safe rooms, filters, and real practice — not slides alone.",
    weight: 4,
  },
  "you-control": { id: "you-control", label: "You control what leaves", weight: 4 },
  "no-sell": { id: "no-sell", label: "Don’t sell people", weight: 4 },
  "less-kept": { id: "less-kept", label: "Less kept, less risk", weight: 3 },
  "consent-record": { id: "consent-record", label: "Recording consent", weight: 3 },
  "founder-built": { id: "founder-built", label: "Built by someone who lives this", weight: 5 },

  // —— Filter kids ——
  "world-pii": {
    id: "world-pii",
    label: "World PII filtering",
    gloss:
      "Find and strip personal data at world scale — names, places, IDs, and more — before it spreads.",
    weight: 5,
    kids: ["presidio", "regex", "optional-redact", "scrub-names"],
    source: "EDU PII · Presidio/NER · Matthew direction",
  },
  grouping: {
    id: "grouping",
    label: "Grouping",
    gloss:
      "Classroom and cohort grouping — keep the learning signal, drop what doesn’t belong in the shared record.",
    weight: 4,
    source: "EDU context filtering (was classroom filter)",
  },
  "scrub-names": {
    id: "scrub-names",
    label: "Scrub names",
    gloss: "Strip names, places, personal bits before save or send.",
    weight: 4,
    source: "EDU: filter identifying content",
  },
  "domain-rooms": {
    id: "domain-rooms",
    label: "Life domains",
    gloss: "Work · learning · life · fun — separate rooms.",
    weight: 4,
    kids: ["work", "learning", "life", "entertainment"],
    source: "Symbol Grid domains",
  },
  "private-mode": {
    id: "private-mode",
    label: "Private mode",
    gloss: "Never leaks into “everything,” search, or export.",
    weight: 5,
    source: "Symbol Grid PRIVACY.md",
  },
  "url-filter": {
    id: "url-filter",
    label: "Stricter QR / URL filters",
    gloss: "Guest links get a higher filter bar.",
    weight: 2,
    source: "EDU business plan technical details",
  },
  presidio: { id: "presidio", label: "Auto find personal bits", gloss: "NER + pattern tools", weight: 3 },
  regex: { id: "regex", label: "Pattern scrub", weight: 2 },
  "optional-redact": { id: "optional-redact", label: "Optional AI redaction", gloss: "User choice on transcripts", weight: 4, source: "decisions.md" },
  work: { id: "work", label: "Work", weight: 2 },
  learning: { id: "learning", label: "Learning", weight: 2 },
  life: { id: "life", label: "Life", weight: 2 },
  entertainment: { id: "entertainment", label: "Entertainment", weight: 2 },

  // —— Access & identity ——
  "access-control": {
    id: "access-control",
    label: "Access control",
    gloss: "Policy for who can see or change what.",
    weight: 5,
  },
  authentication: {
    id: "authentication",
    label: "Authentication",
    gloss: "Prove who you are — password, key, or passcode.",
    weight: 5,
  },
  sso: {
    id: "sso",
    label: "SSO",
    gloss: "Sign in once across products and partners.",
    weight: 4,
  },
  "classroom-sso": {
    id: "classroom-sso",
    label: "Classroom SSO",
    gloss: "School / district login into the room — QR, passcode, or org SSO.",
    weight: 4,
    source: "EDU classroom login",
  },
  mfa: { id: "mfa", label: "MFA / 2FA", gloss: "Second factor — keys, apps, hardware.", weight: 4 },
  "session-keys": { id: "session-keys", label: "Session & keys", gloss: "Short-lived sessions · least privilege.", weight: 3 },

  // —— Data sharing ——
  "user-decides": {
    id: "user-decides",
    label: "You decide",
    gloss: "We generally let the user choose how their data is handled.",
    weight: 5,
  },
  "share-rewards": {
    id: "share-rewards",
    label: "Rewards for sharing",
    gloss:
      "Plan: financial incentives for audiences who can share data — still rewarded for helping learning grow.",
    weight: 5,
  },
  "anon-share": {
    id: "anon-share",
    label: "Usually anonymized",
    gloss: "Shared pools lean anonymous — value without outing the person.",
    weight: 4,
  },
  "audience-opt-in": {
    id: "audience-opt-in",
    label: "Audience opt-in",
    gloss: "Sharing is chosen per audience — not forced.",
    weight: 4,
  },

  // —— Pipelines ——
  "protect-pipe": {
    id: "protect-pipe",
    label: "Protection pipeline",
    gloss: "Authenticate → Authorize → Sanitize → Audit",
    weight: 5,
    kids: ["authenticate", "authorize", "sanitize", "audit"],
    source: "Guardian pipeline",
  },
  "input-pipe": {
    id: "input-pipe",
    label: "Input pipeline",
    gloss: "Ingest → Validate → Transform → Enrich → Route",
    weight: 3,
    kids: ["ingest", "validate", "transform", "route"],
  },
  "min-context": {
    id: "min-context",
    label: "Send less to AI",
    gloss: "Only the context you pick leaves.",
    weight: 5,
    source: "CC: minimize context to model providers",
  },
  "review-pipe": { id: "review-pipe", label: "Review pipeline", gloss: "Submit → Flag → Review → Decide", weight: 2 },
  authenticate: { id: "authenticate", label: "Authenticate", weight: 3 },
  authorize: { id: "authorize", label: "Authorize", weight: 3 },
  sanitize: { id: "sanitize", label: "Sanitize", weight: 4 },
  audit: { id: "audit", label: "Audit (no PII in logs)", weight: 4 },
  ingest: { id: "ingest", label: "Ingest", weight: 2 },
  validate: { id: "validate", label: "Validate", weight: 2 },
  transform: { id: "transform", label: "Transform", weight: 2 },
  route: { id: "route", label: "Route", weight: 2 },

  // —— EDU rules ——
  coppa: { id: "coppa", label: "COPPA", gloss: "Under 13 · parent path", weight: 4 },
  ferpa: { id: "ferpa", label: "FERPA", gloss: "Student records", weight: 4 },
  gdpr: { id: "gdpr", label: "GDPR", weight: 3 },
  ccpa: { id: "ccpa", label: "CCPA", weight: 2 },
  soc2: { id: "soc2", label: "SOC 2", gloss: "Planned after seed", weight: 3, source: "business plan mitigation" },
  "parent-path": { id: "parent-path", label: "Parent consent", weight: 3 },
  "no-extra-store": {
    id: "no-extra-store",
    label: "Don’t store what you don’t need",
    gloss: "Early mitigation: less data = less risk.",
    weight: 5,
    source: "business plan Data Privacy mitigation",
  },

  // —— Roles ——
  "full-view": { id: "full-view", label: "Full session (role)", weight: 3 },
  "filtered-recap": { id: "filtered-recap", label: "Filtered recap", weight: 4 },
  "anon-oversight": { id: "anon-oversight", label: "Anonymous oversight", weight: 3 },
  usernames: { id: "usernames", label: "Usernames over real names", weight: 3, source: "EDU social/competitive" },

  // —— AI ——
  "train-opt-in": { id: "train-opt-in", label: "Train only with opt-in", weight: 5 },
  "server-prompts": { id: "server-prompts", label: "Prompts stay server-side", weight: 4 },
  "strip-before-ai": {
    id: "strip-before-ai",
    label: "Filter layer before return",
    gloss: "No identifiable info in AI responses.",
    weight: 5,
    source: "EDU business plan technical details",
  },
  "edge-ai": { id: "edge-ai", label: "Edge AI for privacy", weight: 2, source: "EDU AI ideation" },

  // —— Keep close ——
  "on-device": { id: "on-device", label: "On-device first", weight: 4 },
  retention: { id: "retention", label: "Short retention", gloss: "Then delete or anonymize", weight: 3 },
  "kill-switch": { id: "kill-switch", label: "Kill-switch", weight: 3, source: "Private Mode story" },
  encrypt: { id: "encrypt", label: "Encrypt in transit & at rest", gloss: "TLS · AES-256", weight: 4, source: "EDU privacy-and-security" },
  "local-tools": {
    id: "local-tools",
    label: "Tools you run yourself",
    gloss:
      "Backup, encrypt, restore — GPG keys on the machine. Not Ion, not a cloud account. Public pictures use stand-in data.",
    weight: 4,
    source: "backup-ui · yen /apps/backup",
  },

  // —— Expertise ——
  "grand-master": {
    id: "grand-master",
    label: "Grand Master of Cyber and Informational Security",
    gloss: "Title-level depth — how Matthew carries security knowledge.",
    weight: 5,
  },
  "golden-eye": {
    id: "golden-eye",
    label: "Golden Eye Experience",
    gloss: "Lived, sharp security experience — see clearly, protect wisely.",
    weight: 5,
  },
  opsec: { id: "opsec", label: "Opsec habits", weight: 3 },
  physical: { id: "physical", label: "Physical security", weight: 3, kids: ["apartment", "cameras"] },
  "software-hard": { id: "software-hard", label: "Software hardening", weight: 4, kids: ["yubikey", "ubuntu", "secrets"] },
  "threat-sense": { id: "threat-sense", label: "Threat sense", gloss: "Know what can watch you type.", weight: 4 },
  apartment: { id: "apartment", label: "Apartment hardening", weight: 2 },
  cameras: { id: "cameras", label: "Local cameras", weight: 2 },
  yubikey: { id: "yubikey", label: "Hardware keys", weight: 3 },
  ubuntu: { id: "ubuntu", label: "Hardened Linux", weight: 3 },
  secrets: { id: "secrets", label: "Secret Manager", weight: 2 },

  // —— Shield ——
  em: { id: "em", label: "Block radio snooping", weight: 3 },
  thermal: { id: "thermal", label: "Block heat cameras", weight: 3 },
  acoustic: { id: "acoustic", label: "Block sound leaks", weight: 2 },
  "visual-block": { id: "visual-block", label: "Block sight lines", weight: 2 },
  "and-more": {
    id: "and-more",
    label: "And more",
    gloss: "Safe-room ideas beyond the four classic blocks — more tips and builds as they land.",
    weight: 3,
  },
  "buy-sell-list": {
    id: "buy-sell-list",
    label: "On MM’s buy & sales lists",
    gloss:
      "Matthew already has a few of these on his purchase list and sales list — personal use and product path.",
    weight: 4,
    source: "Matthew",
  },
};

export function privacyChip(id: string): PrivacyChip {
  return PRIVACY_CHIPS[id] ?? { id, label: id };
}

export function privacyChipKids(id: string): PrivacyChip[] {
  const node = privacyChip(id);
  return (node.kids ?? []).map(privacyChip);
}

export const PRIVACY_PAGE = {
  title: "Privacy & security",
  summary: "How we operate — built by someone who lives this. Dive the knowledge map.",
  lede:
    "Security and privacy are on Matthew’s mind all the time. Tap a chip to dive in — filtering, access, sharing, pipelines, school rules, and founder depth. We plan to teach this too.",
  accent: "#0f766e",
} as const;
