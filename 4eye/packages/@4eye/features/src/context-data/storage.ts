import type {
  AnimationTemplate,
  Audience,
  Location,
  PipelineTemplate,
  SceneTemplate,
  SequenceTemplate,
  StoryTemplate,
  Target,
} from "@4eye/types";

/**
 * Persisted shape of all chat-input entities.
 */
export interface ContextDataStore {
  targets: Target[];
  audiences: Audience[];
  locations: Location[];
  stories: StoryTemplate[];
  animations: AnimationTemplate[];
  scenes: SceneTemplate[];
  sequences: SequenceTemplate[];
  pipelines: PipelineTemplate[];
}

export interface ContextDataAdapter {
  load(): ContextDataStore | null;
  save(data: ContextDataStore): void;
  clear(): void;
}

const STORAGE_KEY = "4eye-context-data-v1";
const isBrowser = typeof window !== "undefined";

/** localStorage-backed adapter. Swap for IndexedDB / API later. */
export const localStorageAdapter: ContextDataAdapter = {
  load() {
    if (!isBrowser) return null;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;
      const data = JSON.parse(saved) as Partial<ContextDataStore>;
      return {
        targets: data.targets ?? [],
        audiences: data.audiences ?? [],
        locations: data.locations ?? [],
        stories: data.stories ?? [],
        animations: data.animations ?? [],
        scenes: data.scenes ?? [],
        sequences: data.sequences ?? [],
        pipelines: data.pipelines ?? [],
      };
    } catch {
      return null;
    }
  },
  save(data) {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore quota / serialization failure
    }
  },
  clear() {
    if (!isBrowser) return;
    window.localStorage.removeItem(STORAGE_KEY);
  },
};
