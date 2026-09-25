import type { TargetingState } from "@4eye/types";

const STORAGE_KEY = "4eye-targeting-v1";
const isBrowser = typeof window !== "undefined";

export interface TargetingStorageAdapter {
  load(): TargetingState | null;
  save(state: TargetingState): void;
  clear(): void;
}

export const localStorageAdapter: TargetingStorageAdapter = {
  load() {
    if (!isBrowser) return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw) as Partial<TargetingState>;
      return {
        actors: Array.isArray(data.actors) ? data.actors : [],
        targets: Array.isArray(data.targets) ? data.targets : [],
      };
    } catch {
      return null;
    }
  },
  save(state) {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota / serialization failures
    }
  },
  clear() {
    if (!isBrowser) return;
    window.localStorage.removeItem(STORAGE_KEY);
  },
};
