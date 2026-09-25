import {
  getCategoryOrder,
  type AiPermission,
  type AiPermissionsData,
  type PermissionLevel,
} from "../model/ai-permissions";

export type SpokenLine = {
  text: string;
  level: PermissionLevel;
};

export type SpokenStanza = {
  category: string;
  lines: SpokenLine[];
};

export type Covenant = {
  mantra: string[];
  stanzas: SpokenStanza[];
  counts: Record<PermissionLevel, number>;
  unset: number;
};

function joinNames(names: string[]): string {
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

function labelsAt(perms: AiPermission[], level: PermissionLevel): string[] {
  return perms.filter((p) => p.level === level && p.label.trim()).map((p) => p.label.trim());
}

/** Spoken covenant for the selected permission levels. */
export function buildCovenant(data: Pick<AiPermissionsData, "permissions" | "categoryOrder">): Covenant {
  const categories = getCategoryOrder({ version: 1, ...data });
  const stanzas: SpokenStanza[] = [];
  const counts: Record<PermissionLevel, number> = { 0: 0, 1: 0, 2: 0 };
  let unset = 0;

  for (const p of data.permissions) {
    if (p.level === undefined) unset += 1;
    else counts[p.level] += 1;
  }

  for (const category of categories) {
    const group = data.permissions.filter((p) => p.category === category);
    const lines: SpokenLine[] = [];
    const on = labelsAt(group, 2);
    const asked = labelsAt(group, 1);
    const auto = labelsAt(group, 0);
    if (on.length) lines.push({ text: `I turn on ${joinNames(on)}.`, level: 2 });
    if (asked.length) lines.push({ text: `I ask before ${joinNames(asked)}.`, level: 1 });
    if (auto.length) lines.push({ text: `I leave ${joinNames(auto)} on auto.`, level: 0 });
    if (lines.length) stanzas.push({ category, lines });
  }

  return {
    mantra: ["I am here.", "I see with four eyes.", "I log in to 4eye with these settings."],
    stanzas,
    counts,
    unset,
  };
}
