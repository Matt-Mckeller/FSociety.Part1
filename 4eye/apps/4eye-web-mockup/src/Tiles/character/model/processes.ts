/**
 * Character processes — savable operational playbooks.
 *
 * Expressions use a lightweight DSL (namespace.name(args).Modifier()) with
 * markdown descriptions and an append-only response/log thread per process.
 */

export type ProcessNamespace = "Processes" | "Aion" | "Scripts" | "Performance" | "I" | "ScriptA" | string;

export type ProcessLogKind =
  | "result"
  | "status"
  | "response"
  | "note"
  | "pause-reason"
  | "script";

export interface ProcessLogEntry {
  id: string;
  kind: ProcessLogKind;
  /** Short label — Result1, Paused, Experimenting, Also, etc. */
  label?: string;
  /** Markdown body — outcomes, notes, quoted responses. */
  body: string;
  /** Optional linked expression for status/script lines. */
  expression?: string;
  emoji?: string;
  createdAt: number;
}

export type ProcessEntityKind = "person" | "symbol" | "entity";

/** A symbol, person, or entity that owns cyphertext goals and operational processes. */
export interface ProcessEntityDef {
  id: string;
  label: string;
  /** Cyphertext handle — MatthewMcKeller, Janna, etc. */
  cypher: string;
  kind: ProcessEntityKind;
  accent: string;
  description?: string;
  sortOrder: number;
}

export interface ProcessGroup {
  id: string;
  namespace: ProcessNamespace;
  name: string;
  tags: string[];
  description?: string;
  sortOrder: number;
  /** Which entity this group belongs to. */
  entityId?: string;
}

export interface ProcessEntry {
  id: string;
  groupId?: string;
  /** Entity target — person, symbol, or named field. */
  entityId?: string;
  /** Optional link to a VisionGoal id when this process mirrors a goal card. */
  goalId?: string;
  expression: string;
  namespace: ProcessNamespace;
  name: string;
  tags: string[];
  description: string;
  autoPlay?: boolean;
  active: boolean;
  sortOrder: number;
  updatedAt: number;
  logs: ProcessLogEntry[];
}

export interface ProcessesSnapshot {
  processGroups: ProcessGroup[];
  processes: ProcessEntry[];
}

export const PROCESSES_STORAGE_KEY = "4eye.profile.processes";

export const PROCESS_ENTITIES: ProcessEntityDef[] = [
  {
    id: "entity-self",
    label: "Matthew McKeller",
    cypher: "MatthewMcKeller",
    kind: "person",
    accent: "#35c99b",
    description: "Self — vision pyramid, ongoing practice, and operational scripts.",
    sortOrder: 0,
  },
  {
    id: "entity-janna",
    label: "Janna",
    cypher: "Janna",
    kind: "person",
    accent: "#ff5c7a",
    description: "Her path — heal, open, grow, record, present. Goals as living processes.",
    sortOrder: 1,
  },
];

export const PROCESS_LOG_KIND_META: Record<
  ProcessLogKind,
  { label: string; color: string; defaultEmoji?: string }
> = {
  result: { label: "Result", color: "#22c55e" },
  status: { label: "Status", color: "#3b82f6" },
  response: { label: "Response", color: "#eab308", defaultEmoji: "💛" },
  note: { label: "Note", color: "#a78bfa" },
  "pause-reason": { label: "Pause reason", color: "#f97316" },
  script: { label: "Script", color: "#fbbf24" },
};

export const PROCESS_GROUPS_SEED: ProcessGroup[] = [
  {
    id: "proc-self-improvement",
    namespace: "Processes",
    name: "SelfImprovement",
    tags: ["Evolve", "Grow", "dy"],
    description: "Personal evolution loops — personality, habits, and growth vectors.",
    sortOrder: 0,
    entityId: "entity-self",
  },
  {
    id: "proc-controller",
    namespace: "Processes",
    name: "Controller",
    tags: [],
    description: "Human controller setup — the I-layer that drives the character.",
    sortOrder: 1,
    entityId: "entity-self",
  },
  {
    id: "proc-performance",
    namespace: "Processes",
    name: "Performance",
    tags: ["LoopDaily", "Optimize"],
    description: "Daily performance loops — energy, intelligence, stats, and substance management.",
    sortOrder: 2,
    entityId: "entity-self",
  },
];

export const PROCESSES_SEED: ProcessEntry[] = [
  {
    id: "aion-evolve-personality",
    groupId: "proc-self-improvement",
    entityId: "entity-self",
    expression: "Aion.Evolve(Target=MatthewMcKeller, Topic=Personality)",
    namespace: "Aion",
    name: "Evolve",
    tags: ["Personality", "Aion"],
    description:
      "## Evolve — Personality\n\nRun Aion in evolve mode against the personality topic.\n\n- **Target:** MatthewMcKeller\n- **Topic:** Personality",
    active: true,
    sortOrder: 0,
    updatedAt: Date.now(),
    logs: [],
  },
  {
    id: "script-plana-power",
    groupId: "proc-self-improvement",
    entityId: "entity-self",
    expression: "Scripts.PlanA(Power++).AutoPlay()",
    namespace: "Scripts",
    name: "PlanA",
    tags: ["Power++", "AutoPlay"],
    description: "Auto-play Plan A focused on **power accumulation**.",
    autoPlay: true,
    active: true,
    sortOrder: 1,
    updatedAt: Date.now(),
    logs: [],
  },
  {
    id: "script-plana-prove",
    groupId: "proc-self-improvement",
    entityId: "entity-self",
    expression: "Scripts.PlanA(Prove).AutoPlay()",
    namespace: "Scripts",
    name: "PlanA",
    tags: ["Prove", "AutoPlay"],
    description: "Auto-play Plan A in **prove** mode — evidence and validation.",
    autoPlay: true,
    active: true,
    sortOrder: 2,
    updatedAt: Date.now(),
    logs: [],
  },
  {
    id: "script-plana-use",
    groupId: "proc-self-improvement",
    entityId: "entity-self",
    expression: "Scripts.PlanA(Use).AutoPlay()",
    namespace: "Scripts",
    name: "PlanA",
    tags: ["Use", "AutoPlay"],
    description: "Auto-play Plan A in **use** mode — apply what is ready.",
    autoPlay: true,
    active: true,
    sortOrder: 3,
    updatedAt: Date.now(),
    logs: [],
  },
  {
    id: "controller-setup",
    groupId: "proc-controller",
    entityId: "entity-self",
    expression: "I.SetUpMyHumanController()",
    namespace: "I",
    name: "SetUpMyHumanController",
    tags: ["Controller"],
    description: "Initialize the human controller layer for this character.",
    active: true,
    sortOrder: 0,
    updatedAt: Date.now(),
    logs: [],
  },
  {
    id: "perf-optimize",
    groupId: "proc-performance",
    entityId: "entity-self",
    expression: 'Performance.Optimize(target="Matthew McKeller", LoopDaily)',
    namespace: "Performance",
    name: "Optimize",
    tags: ["LoopDaily", "Optimize"],
    description: "Daily performance optimization loop for Matthew McKeller.",
    active: true,
    sortOrder: 0,
    updatedAt: Date.now(),
    logs: [
      {
        id: "perf-log-result1",
        kind: "result",
        label: "Result1",
        body:
          "Actually working, pot seems to be decreasing, nicotine usage is not bad either. Removing that. Coffee currently I think for pot data and removal and processing speed it seems to be working.",
        createdAt: Date.now() - 86_400_000 * 3,
      },
      {
        id: "perf-log-status-paused",
        kind: "status",
        label: "Paused",
        body: "",
        expression: "I.RemoveNicotineCraving().StopSmokingNicotine().ReduceNicotineUsage()",
        createdAt: Date.now() - 86_400_000 * 2,
      },
      {
        id: "perf-log-status-experimenting",
        kind: "status",
        label: "Experimenting",
        body: "",
        createdAt: Date.now() - 86_400_000,
      },
      {
        id: "perf-log-response",
        kind: "response",
        emoji: "💛",
        body:
          'Did it, again, as always, but the system must give in to user if they keep requesting. Note: tried `.PreventUserOverride("Only allow deletion from this process list")` didn\'t work.',
        createdAt: Date.now() - 43_200_000,
      },
      {
        id: "perf-log-also",
        kind: "note",
        label: "Also",
        body: "Symbol alignment power connection to support kids who likely highly relate to this.",
        createdAt: Date.now() - 21_600_000,
      },
      {
        id: "perf-log-pause-reason",
        kind: "pause-reason",
        body: "I need a better environment first. Get money, get a product out, get funded then quit smoking",
        createdAt: Date.now(),
      },
    ],
  },
  {
    id: "script-a-energy",
    groupId: "proc-performance",
    entityId: "entity-self",
    expression: "ScriptA(33.Energy++, LoopDaily)",
    namespace: "ScriptA",
    name: "ScriptA",
    tags: ["Energy++", "LoopDaily"],
    description: "Daily energy boost script.",
    active: true,
    sortOrder: 1,
    updatedAt: Date.now(),
    logs: [],
  },
  {
    id: "script-a-intelligence",
    groupId: "proc-performance",
    entityId: "entity-self",
    expression: "ScriptA(33.Intelligence++, LoopDaily)",
    namespace: "ScriptA",
    name: "ScriptA",
    tags: ["Intelligence++", "LoopDaily"],
    description: "Daily intelligence boost script.",
    active: true,
    sortOrder: 2,
    updatedAt: Date.now(),
    logs: [],
  },
  {
    id: "script-a-allstats",
    groupId: "proc-performance",
    entityId: "entity-self",
    expression: "ScriptA(33.AllStats++, LoopDaily)",
    namespace: "ScriptA",
    name: "ScriptA",
    tags: ["AllStats++", "LoopDaily"],
    description: "Daily all-stats boost script.",
    active: true,
    sortOrder: 3,
    updatedAt: Date.now(),
    logs: [],
  },
  {
    id: "script-a-power",
    groupId: "proc-performance",
    entityId: "entity-self",
    expression: "ScriptA(33.Power++, LoopDaily)",
    namespace: "ScriptA",
    name: "ScriptA",
    tags: ["Power++", "LoopDaily"],
    description: "Daily power boost script.",
    active: true,
    sortOrder: 4,
    updatedAt: Date.now(),
    logs: [],
  },
  {
    id: "nicotine-reduction",
    groupId: "proc-performance",
    entityId: "entity-self",
    expression: "I.RemoveNicotineCraving().StopSmokingNicotine().ReduceNicotineUsage()",
    namespace: "I",
    name: "ReduceNicotineUsage",
    tags: ["Nicotine", "Paused"],
    description: "Nicotine reduction and cessation process — currently paused pending better environment.",
    active: false,
    sortOrder: 5,
    updatedAt: Date.now(),
    logs: [
      {
        id: "nicotine-log-pause",
        kind: "pause-reason",
        body: "I need a better environment first. Get money, get a product out, get funded then quit smoking",
        createdAt: Date.now(),
      },
    ],
  },
];

const NAMESPACE_ORDER: ProcessNamespace[] = [
  "Processes",
  "I",
  "Performance",
  "ScriptA",
  "Aion",
  "Scripts",
];

export const NAMESPACE_COLOR: Record<string, string> = {
  Processes: "#34d399",
  I: "#f472b6",
  Performance: "#38bdf8",
  ScriptA: "#fbbf24",
  Aion: "#818cf8",
  Scripts: "#fbbf24",
};

/** Derive namespace, name, and autoPlay from a raw expression. */
export function parseProcessExpression(expression: string): {
  namespace: ProcessNamespace;
  name: string;
  autoPlay: boolean;
} {
  const trimmed = expression.trim();
  const autoPlay = /\.AutoPlay\(\)\s*$/.test(trimmed);
  const withoutAuto = trimmed.replace(/\.AutoPlay\(\)\s*$/, "");
  const dot = withoutAuto.indexOf(".");
  const namespace = dot >= 0 ? withoutAuto.slice(0, dot) : "Processes";
  const rest = dot >= 0 ? withoutAuto.slice(dot + 1) : withoutAuto;
  const paren = rest.indexOf("(");
  const name = paren >= 0 ? rest.slice(0, paren) : rest.split(".")[0] ?? rest;
  return { namespace, name, autoPlay };
}

export function normalizeProcessEntry(entry: Partial<ProcessEntry> & Pick<ProcessEntry, "id">): ProcessEntry {
  const seed = PROCESSES_SEED.find((p) => p.id === entry.id);
  const merged = { ...(seed ?? {}), ...entry } as ProcessEntry;
  return {
    ...merged,
    logs: Array.isArray(merged.logs) ? merged.logs : seed?.logs ?? [],
    tags: merged.tags ?? [],
    description: merged.description ?? "",
    active: merged.active ?? true,
    sortOrder: merged.sortOrder ?? 999,
    updatedAt: merged.updatedAt ?? Date.now(),
    entityId: merged.entityId ?? seed?.entityId,
    goalId: merged.goalId ?? seed?.goalId,
  };
}

export function normalizeProcessGroup(group: Partial<ProcessGroup> & Pick<ProcessGroup, "id">): ProcessGroup {
  const seed = PROCESS_GROUPS_SEED.find((g) => g.id === group.id);
  const merged = { ...(seed ?? {}), ...group } as ProcessGroup;
  return {
    ...merged,
    tags: merged.tags ?? [],
    sortOrder: merged.sortOrder ?? 999,
    entityId: merged.entityId ?? seed?.entityId,
  };
}

export function processesForEntity(processes: ProcessEntry[], entityId: string): ProcessEntry[] {
  return processes.filter((p) => p.entityId === entityId || (!p.entityId && entityId === "entity-self"));
}

export function groupsForEntity(groups: ProcessGroup[], entityId: string): ProcessGroup[] {
  return groups.filter((g) => g.entityId === entityId);
}

export function mergeProcessesSnapshot(saved: ProcessesSnapshot): ProcessesSnapshot {
  const savedGroupIds = new Set(saved.processGroups.map((g) => g.id));
  const savedProcessIds = new Set(saved.processes.map((p) => p.id));
  return {
    processGroups: [
      ...saved.processGroups.map((g) => normalizeProcessGroup(g)),
      ...PROCESS_GROUPS_SEED.filter((g) => !savedGroupIds.has(g.id)),
    ].sort((a, b) => a.sortOrder - b.sortOrder),
    processes: [
      ...saved.processes.map((p) => normalizeProcessEntry(p)),
      ...PROCESSES_SEED.filter((p) => !savedProcessIds.has(p.id)),
    ].sort((a, b) => a.sortOrder - b.sortOrder),
  };
}

export function latestProcessStatus(logs: ProcessLogEntry[]): ProcessLogEntry | undefined {
  return [...logs]
    .filter((l) => l.kind === "status")
    .sort((a, b) => b.createdAt - a.createdAt)[0];
}

export function namespaceSort(a: ProcessNamespace, b: ProcessNamespace): number {
  const ai = NAMESPACE_ORDER.indexOf(a);
  const bi = NAMESPACE_ORDER.indexOf(b);
  if (ai >= 0 && bi >= 0) return ai - bi;
  if (ai >= 0) return -1;
  if (bi >= 0) return 1;
  return a.localeCompare(b);
}

export function groupEntriesByNamespace(
  entries: ProcessEntry[],
): { namespace: ProcessNamespace; entries: ProcessEntry[] }[] {
  const map = new Map<ProcessNamespace, ProcessEntry[]>();
  for (const e of entries) {
    const list = map.get(e.namespace) ?? [];
    list.push(e);
    map.set(e.namespace, list);
  }
  return [...map.entries()]
    .sort(([a], [b]) => namespaceSort(a, b))
    .map(([namespace, items]) => ({
      namespace,
      entries: [...items].sort((a, b) => a.sortOrder - b.sortOrder),
    }));
}

export function readProcessesSnapshot(): ProcessesSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PROCESSES_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ProcessesSnapshot>;
    if (!Array.isArray(parsed.processes) || !Array.isArray(parsed.processGroups)) return null;
    return mergeProcessesSnapshot({
      processGroups: (parsed.processGroups as ProcessGroup[]).map((g) => normalizeProcessGroup(g)),
      processes: (parsed.processes as ProcessEntry[]).map((p) => normalizeProcessEntry(p)),
    });
  } catch {
    return null;
  }
}

export function writeProcessesSnapshot(snapshot: ProcessesSnapshot) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROCESSES_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* private mode / quota */
  }
}

export function plainMarkdownPreview(body: string): string {
  return body
    .replace(/[#>*_`~\-\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatLogTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
