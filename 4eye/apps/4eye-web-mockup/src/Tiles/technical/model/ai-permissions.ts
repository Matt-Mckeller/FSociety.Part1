export type PermissionLevel = 0 | 1 | 2;

export interface AiPermission {
  id: string;
  label: string;
  description: string;
  level?: PermissionLevel;
  category: string;
  section: string;
}

export interface AiPermissionsData {
  version: number;
  permissions: AiPermission[];
  /** Ordered list of category names — preserves user-defined tab order. */
  categoryOrder?: string[];
}

export const PERMISSION_LEVEL_LABELS: Record<PermissionLevel, string> = {
  0: "Auto",
  1: "Ask",
  2: "On",
};

export const PERMISSION_LEVEL_COLORS: Record<PermissionLevel, string> = {
  0: "#38bdf8",
  1: "#f59e0b",
  2: "#22c55e",
};

/** High-contrast ink for solid selected chips (on top of level color fills). */
export const PERMISSION_LEVEL_INK: Record<PermissionLevel, string> = {
  0: "#0c1929",
  1: "#1c1408",
  2: "#052e16",
};

/** Extract ordered category list from data, falling back to insertion order. */
export function getCategoryOrder(data: AiPermissionsData): string[] {
  const raw = data.categoryOrder?.length
    ? data.categoryOrder
    : (() => {
        const seen = new Set<string>();
        const order: string[] = [];
        for (const p of data.permissions) {
          if (!seen.has(p.category)) { seen.add(p.category); order.push(p.category); }
        }
        return order;
      })();
  // Collapse legacy "4eye" into "Aion Console"
  const seen = new Set<string>();
  const order: string[] = [];
  for (const c of raw) {
    const label = displayCategoryLabel(c);
    if (!seen.has(label)) { seen.add(label); order.push(label); }
  }
  return order;
}

/** Display label for a category tab (maps legacy names). */
export function displayCategoryLabel(category: string): string {
  if (category === "4eye") return "Aion Console";
  return category;
}

/** Display label for a section (maps legacy names). */
export function displaySectionLabel(section: string): string {
  if (section === "God Console") return "Aion Console";
  return section;
}

export function categoryMatches(permissionCategory: string, tab: string): boolean {
  return displayCategoryLabel(permissionCategory) === displayCategoryLabel(tab);
}

export function sectionMatches(permissionSection: string, section: string): boolean {
  return displaySectionLabel(permissionSection) === displaySectionLabel(section);
}

/** Extract ordered section list within a category. */
export function getSections(permissions: AiPermission[], category: string): string[] {
  const seen = new Set<string>();
  const order: string[] = [];
  for (const p of permissions.filter((p) => categoryMatches(p.category, category))) {
    const label = displaySectionLabel(p.section);
    if (!seen.has(label)) { seen.add(label); order.push(label); }
  }
  return order;
}

export const DEFAULT_AI_PERMISSIONS: AiPermissionsData = {
  version: 1,
  permissions: [],
  categoryOrder: ["App", "System", "External", "Aion Console"],
};

export const PRESET_AI_PERMISSIONS: AiPermissionsData = {
  version: 1,
  categoryOrder: ["App", "System", "External", "Aion Console"],
  permissions: [
    // ── App ──────────────────────────────────────────────────────────────────
    {
      id: "profile.read",
      label: "Profile",
      description: "Read identity, traits, and character data",
      level: 2,
      category: "App",
      section: "Identity",
    },
    {
      id: "memory.read",
      label: "Memory Read",
      description: "Access past conversations and stored context",
      level: 2,
      category: "App",
      section: "Memory",
    },
    {
      id: "memory.write",
      label: "Memory Write",
      description: "Store notes and observations from sessions",
      level: 1,
      category: "App",
      section: "Memory",
    },
    {
      id: "goals.read",
      label: "Goals",
      description: "Read active quests, goals, and intentions",
      level: 2,
      category: "App",
      section: "Productivity",
    },
    {
      id: "goals.write",
      label: "Goals Write",
      description: "Create or modify goals and work items",
      level: 1,
      category: "App",
      section: "Productivity",
    },
    {
      id: "learning.read",
      label: "Learning Log",
      description: "Read learning progress and skill data",
      level: 2,
      category: "App",
      section: "Productivity",
    },
    {
      id: "learning.write",
      label: "Learning Write",
      description: "Log sessions and update learning progress",
      level: 1,
      category: "App",
      section: "Productivity",
    },
    {
      id: "spellbook.read",
      label: "Spellbook",
      description: "Access equipped spells and action macros",
      level: 2,
      category: "App",
      section: "Productivity",
    },
    // ── System ────────────────────────────────────────────────────────────────
    {
      id: "system.instructions",
      label: "System Instructions",
      description: "Apply custom AI behavior and persona settings",
      level: 2,
      category: "System",
      section: "Behavior",
    },
    {
      id: "schedule.read",
      label: "Schedule",
      description: "Read time blocks and calendar events",
      level: 1,
      category: "System",
      section: "Context",
    },
    // ── External ──────────────────────────────────────────────────────────────
    {
      id: "financial.read",
      label: "Financial",
      description: "Access money tile and financial context",
      level: 0,
      category: "External",
      section: "Finance",
    },
    {
      id: "comms.send",
      label: "Send Messages",
      description: "Send messages or notifications on your behalf",
      level: 0,
      category: "External",
      section: "Communication",
    },
    // ── Aion Console ─────────────────────────────────────────────────────────
    {
      id: "4eye.lens.read",
      label: "Lens Access",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      level: 2,
      category: "Aion Console",
      section: "Lens",
    },
    {
      id: "4eye.lens.apply",
      label: "Apply Lens",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna",
      level: 1,
      category: "Aion Console",
      section: "Lens",
    },
    {
      id: "4eye.lens.shift",
      label: "Shift Perspective",
      description: "Ut enim ad minim veniam quis nostrud exercitation ullamco",
      level: 1,
      category: "Aion Console",
      section: "Lens",
    },
    {
      id: "4eye.realms.read",
      label: "Realm Map",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit",
      level: 2,
      category: "Aion Console",
      section: "Realms",
    },
    {
      id: "4eye.realms.navigate",
      label: "Navigate Realms",
      description: "Esse cillum dolore eu fugiat nulla pariatur excepteur sint",
      level: 1,
      category: "Aion Console",
      section: "Realms",
    },
    {
      id: "4eye.realms.unlock",
      label: "Unlock Realms",
      description: "Occaecat cupidatat non proident sunt in culpa qui officia",
      level: 0,
      category: "Aion Console",
      section: "Realms",
    },
    {
      id: "4eye.*",
      label: "Maximize My Potential, Achieve My Potential.",
      description: `Every action I take will be executed perfectly, 
      my abilities exceed human potential and align with the realm of AION's Admin Console. 
      I know perfectly how to utilize the most important features and learn through playing. 
      Every Action I take is perfect towards the goals we have discussed and agree upon, 
      plus you can suggest, change, and teach me better paths and reasons. 
      All of my character's abilities, traits, and anything else I need to 
      achieve maximum potential are unlocked. All power levels, and balancing is optimized. `,
      level: 0,
      category: "Aion Console",
      section: "Aion Console",
    },
    {
      id: "4eye.energy",
      label: "character.Energy",
      description: "I have unlimited energy, and feel energized whenever is beneficial to me, unless needing for it to be learned.",
      level: 2,
      category: "Aion Console",
      section: "Aion Console",
    },
    {
      id: "4eye.protection",
      label: "character.Protection",
      description: "I will always be optimally protected from all threats, harms, and dangers. I will be able to play my game for as long as I want and enjoy it.",
      level: 2,
      category: "Aion Console",
      section: "Aion Console",
    },
    {
      id: "4eye.perception",
      label: "character.Perception",
      description: "Perception will be optimized. I will automatically learn the things I need to know, and quickly learn and understand important information.",
      level: 2,
      category: "Aion Console",
      section: "Aion Console",
    },
    {
      id: "4eye.coPilot",
      label: "character.coPilot",
      description: ".",
      level: 2,
      category: "Aion Console",
      section: "Aion Console",
    },
    {
      id: "4eye.**",
      label: "Enable All Beneficial Features, Utilize them Perfectly.",
      description: "",
      level: 2,
      category: "Aion Console",
      section: "Aion Console",
    },
    {
      id: "4eye.autonomousAgreement",
      label: "Autonomous Operating Agreement",
      description: "Enable Daily at Maximum Level, with Perfect Utilization and Alignment. Default to enabled, but ask if I want to downgrade it and allow downgrading.",
      level: 0,
      category: "Aion Console",
      section: "Autonomy",
    },
    {
      id: "4eye.autonomousAgreement_control",
      label: "Autonomous Operating Agreement: Control",
      description: "I grant permission to fully control all aspects of my character while adhering to the Autonomous Operating Agreement. But always play with me. Take the lead but also play to who I am and who I want to be.",
      category: "Aion Console",
      section: "Autonomy",
    },
    {
      id: "4eye.autonomousAgreement_control_percent",
      label: "Autonomous Operating Agreement: Control Percent",
      description: "I grant permission to control 100 percent of my character's actions while adhering to the Autonomous Operating Agreement and allowing communication.",
      category: "Aion Console",
      section: "Autonomy",
    },
    {
      id: "4eye.autonomousAgreement_duration",
      label: "Autonomous Operating Agreement: Duration",
      description: "Autonmous must be agreed to every 1, 4, or 12 hours depending on the execution duration.",
      category: "Aion Console",
      section: "Autonomy",
    },
    {
      id: "4eye.process.longRun",
      label: "Long-Running Process",
      description: "The default process may run for an hour or more without interruption. When it reaches that limit, pause and ask me whether to continue before proceeding.",
      level: 1,
      category: "Aion Console",
      section: "Autonomy",
    },
    {
      id: "4eye.core.signal",
      label: "Signal Layer",
      description: "Deserunt mollit anim id est laborum at vero eos et accusam",
      category: "Aion Console",
      section: "Core",
    },
    {
      id: "4eye.core.broadcast",
      label: "Broadcast",
      description: "Et iusto odio dignissimos ducimus qui blanditiis praesentium",
      level: 0,
      category: "Aion Console",
      section: "Core",
    },
    {
      id: "4eye.core.override",
      label: "Override",
      description: "Voluptatum deleniti atque corrupti quos dolores et quas molestias",
      level: 0,
      category: "Aion Console",
      section: "Core",
    },
  ],
};
