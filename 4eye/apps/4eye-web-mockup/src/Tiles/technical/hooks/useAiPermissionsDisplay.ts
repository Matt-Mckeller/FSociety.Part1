"use client";

import * as React from "react";
import {
  PRESET_AI_PERMISSIONS,
  getCategoryOrder,
  type AiPermission,
  type AiPermissionsData,
} from "../model/ai-permissions";
import {
  decryptPermissions,
  hasStoredPermissions,
} from "../utils/crypto";

export const AI_PERMISSIONS_CHANGED = "4eye:ai-permissions-changed";

const ENV_PASSPHRASE = process.env.NEXT_PUBLIC_AI_PERMISSIONS_PASSPHRASE ?? "";

export type PermissionsDisplayStatus = "loading" | "ready" | "locked";

export type PermissionsDisplay = {
  status: PermissionsDisplayStatus;
  data: AiPermissionsData;
  categories: string[];
  /** Level 2 (On) permissions. */
  on: AiPermission[];
  /** Level 1 (Ask) permissions. */
  ask: AiPermission[];
  /** Level 0 (Auto) permissions. */
  auto: AiPermission[];
  /** Aion Console section only — On. */
  aionOn: AiPermission[];
  /** Aion Console section only — Ask. */
  aionAsk: AiPermission[];
  /** Aion Console section only — Auto. */
  aionAuto: AiPermission[];
  refresh: () => void;
};

function emptyData(): AiPermissionsData {
  return { version: 1, permissions: [], categoryOrder: [] };
}

function isAionConsoleSection(section: string): boolean {
  return section === "Aion Console" || section === "God Console";
}

function partition(perms: AiPermission[]) {
  const on: AiPermission[] = [];
  const ask: AiPermission[] = [];
  const auto: AiPermission[] = [];
  const aionOn: AiPermission[] = [];
  const aionAsk: AiPermission[] = [];
  const aionAuto: AiPermission[] = [];

  for (const p of perms) {
    const isAion = isAionConsoleSection(p.section);
    if (p.level === 2) {
      on.push(p);
      if (isAion) aionOn.push(p);
    } else if (p.level === 1) {
      ask.push(p);
      if (isAion) aionAsk.push(p);
    } else if (p.level === 0) {
      auto.push(p);
      if (isAion) aionAuto.push(p);
    }
  }

  return { on, ask, auto, aionOn, aionAsk, aionAuto };
}

async function loadData(): Promise<{ status: PermissionsDisplayStatus; data: AiPermissionsData }> {
  if (typeof window === "undefined") {
    return { status: "ready", data: PRESET_AI_PERMISSIONS };
  }

  if (!hasStoredPermissions()) {
    return { status: "ready", data: PRESET_AI_PERMISSIONS };
  }

  if (!ENV_PASSPHRASE) {
    // Stored but locked — still show preset so the HUD has something to preview.
    return { status: "locked", data: PRESET_AI_PERMISSIONS };
  }

  const plaintext = await decryptPermissions(ENV_PASSPHRASE);
  if (!plaintext) {
    return { status: "locked", data: PRESET_AI_PERMISSIONS };
  }

  try {
    return { status: "ready", data: JSON.parse(plaintext) as AiPermissionsData };
  } catch {
    return { status: "locked", data: PRESET_AI_PERMISSIONS };
  }
}

/** Live AI permissions for HUD chrome — decrypts when env passphrase is set. */
export function useAiPermissionsDisplay(): PermissionsDisplay {
  const [status, setStatus] = React.useState<PermissionsDisplayStatus>("loading");
  const [data, setData] = React.useState<AiPermissionsData>(emptyData);

  const refresh = React.useCallback(() => {
    let cancelled = false;
    setStatus("loading");
    loadData().then((next) => {
      if (cancelled) return;
      setData(next.data);
      setStatus(next.status);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    const cancel = refresh();
    const onChange = () => {
      refresh();
    };
    window.addEventListener(AI_PERMISSIONS_CHANGED, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      cancel();
      window.removeEventListener(AI_PERMISSIONS_CHANGED, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);

  const parts = React.useMemo(() => partition(data.permissions), [data.permissions]);
  const categories = React.useMemo(() => getCategoryOrder(data), [data]);

  return {
    status,
    data,
    categories,
    ...parts,
    refresh,
  };
}

export function notifyAiPermissionsChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AI_PERMISSIONS_CHANGED));
}
