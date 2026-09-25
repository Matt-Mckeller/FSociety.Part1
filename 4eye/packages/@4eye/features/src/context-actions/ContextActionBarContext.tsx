"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * A toggleable directive the user can attach to the chat input.
 * The list can be a host catalog (equipped spells); only the enabled
 * ids are persisted.
 */
export interface ContextAction {
  id: string;
  label: string;
  description?: string;
  enabled: boolean;
}

const ENABLED_KEY = "4eye-context-actions-enabled-v2";
const isBrowser = typeof window !== "undefined";

const DEFAULT_ACTIONS: ContextAction[] = [
  { id: "cite-sources", label: "Cite sources", description: "Reference what informed the answer", enabled: false },
  { id: "be-concise", label: "Be concise", description: "Prefer brevity over thoroughness", enabled: false },
  { id: "show-steps", label: "Show steps", description: "Walk through reasoning", enabled: false },
  { id: "use-domain-voice", label: "Use domain voice", description: "Match the active domain's tone", enabled: true },
  { id: "text-a-target", label: "Text a Target", description: "Draft a message to a selected target", enabled: false },
  { id: "text-a-group", label: "Text a Group", description: "Draft a message to a group", enabled: false },
  { id: "create-content", label: "Create Content", description: "Generate content for the active context", enabled: false },
  { id: "status-update", label: "Status Update", description: "Write a status update for selected context", enabled: false },
  { id: "shop", label: "Shop", description: "Browse or recommend items from the store", enabled: false },
];

function defaultEnabledIds(source: ContextAction[]): string[] {
  return source.filter((a) => a.enabled).map((a) => a.id);
}

interface ContextActionBarValue {
  actions: ContextAction[];
  enabledActions: ContextAction[];
  toggleAction: (id: string) => void;
  setEnabled: (id: string, enabled: boolean) => void;
  addAction: (action: Omit<ContextAction, "id">) => string;
  removeAction: (id: string) => void;
  resetActions: () => void;
}

const ContextActionBarContext = createContext<ContextActionBarValue | undefined>(
  undefined,
);

const generateId = () => Math.random().toString(36).slice(2, 9);

export function ContextActionBarProvider({
  children,
  catalog,
}: {
  children: ReactNode;
  /** Host catalog (e.g. equipped spells). Replaces the generic defaults. */
  catalog?: ContextAction[];
}) {
  const source = catalog ?? DEFAULT_ACTIONS;
  const sourceIds = source.map((a) => a.id).join("\0");
  const [extras, setExtras] = useState<ContextAction[]>([]);
  const [enabledIds, setEnabledIds] = useState<string[]>(() =>
    defaultEnabledIds(source),
  );
  const [ready, setReady] = useState(false);

  // Hydrate which actions ride on the next prompt. The catalog itself is
  // owned by the host so a stale localStorage list cannot resurrect old chips.
  useEffect(() => {
    if (!isBrowser) {
      setReady(true);
      return;
    }
    try {
      const saved = window.localStorage.getItem(ENABLED_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as unknown;
        if (Array.isArray(parsed)) {
          setEnabledIds(parsed.filter((id): id is string => typeof id === "string"));
        }
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!isBrowser || !ready) return;
    try {
      window.localStorage.setItem(ENABLED_KEY, JSON.stringify(enabledIds));
    } catch {
      // ignore
    }
  }, [ready, enabledIds]);

  const prevSourceIds = useRef(sourceIds);
  useEffect(() => {
    const next = new Set(sourceIds.split("\0").filter(Boolean));
    const prev = new Set(prevSourceIds.current.split("\0").filter(Boolean));
    prevSourceIds.current = sourceIds;
    setEnabledIds((ids) => ids.filter((id) => next.has(id) || !prev.has(id)));
    setExtras((items) => items.filter((a) => !next.has(a.id)));
  }, [sourceIds]);

  const actions = useMemo<ContextAction[]>(() => {
    const enabled = new Set(enabledIds);
    return [...source, ...extras].map((a) => ({
      ...a,
      enabled: enabled.has(a.id),
    }));
  }, [source, extras, enabledIds]);

  const toggleAction = useCallback((id: string) => {
    setEnabledIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const setEnabled = useCallback((id: string, enabled: boolean) => {
    setEnabledIds((prev) => {
      const has = prev.includes(id);
      if (enabled === has) return prev;
      return enabled ? [...prev, id] : prev.filter((x) => x !== id);
    });
  }, []);

  const addAction = useCallback((action: Omit<ContextAction, "id">) => {
    const id = generateId();
    setExtras((prev) => [...prev, { ...action, id }]);
    if (action.enabled) setEnabledIds((prev) => [...prev, id]);
    return id;
  }, []);

  const removeAction = useCallback((id: string) => {
    setExtras((prev) => prev.filter((a) => a.id !== id));
    setEnabledIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const resetActions = useCallback(() => {
    setExtras([]);
    setEnabledIds(defaultEnabledIds(source));
  }, [source]);

  const value = useMemo<ContextActionBarValue>(
    () => ({
      actions,
      enabledActions: actions.filter((a) => a.enabled),
      toggleAction,
      setEnabled,
      addAction,
      removeAction,
      resetActions,
    }),
    [actions, toggleAction, setEnabled, addAction, removeAction, resetActions],
  );

  return (
    <ContextActionBarContext.Provider value={value}>
      {children}
    </ContextActionBarContext.Provider>
  );
}

export function useContextActionBar(): ContextActionBarValue {
  const ctx = useContext(ContextActionBarContext);
  if (!ctx)
    throw new Error(
      "useContextActionBar must be used within ContextActionBarProvider",
    );
  return ctx;
}
