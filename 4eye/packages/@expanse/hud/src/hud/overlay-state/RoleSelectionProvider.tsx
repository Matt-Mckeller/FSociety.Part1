"use client";

/**
 * RoleSelectionProvider — lifts a (role, goal) selection above any
 * picker so other overlay panels can render role-relevant content in
 * sync. Generic over the role key string union so apps can supply
 * their own roles.
 *
 * Selecting a new role resets the goal to `null` (same semantics as
 * the original 4eye RoleGoalSelector).
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface RoleSelection<TRole extends string = string> {
  role: TRole;
  goal: string | null;
}

interface RoleSelectionContextValue<TRole extends string = string>
  extends RoleSelection<TRole> {
  setRole: (role: TRole) => void;
  setGoal: (goal: string | null) => void;
}

const RoleSelectionContext = createContext<RoleSelectionContextValue | null>(
  null,
);

export interface RoleSelectionProviderProps<TRole extends string = string> {
  children: ReactNode;
  /** Initial role selection. */
  defaultRole: TRole;
  /** Initial goal (within the default role). @default null */
  defaultGoal?: string | null;
}

export function RoleSelectionProvider<TRole extends string = string>({
  children,
  defaultRole,
  defaultGoal = null,
}: RoleSelectionProviderProps<TRole>) {
  const [role, setRoleState] = useState<TRole>(defaultRole);
  const [goal, setGoal] = useState<string | null>(defaultGoal);

  // Reset goal whenever role changes.
  const setRole = useCallback((next: TRole) => {
    setRoleState(next);
    setGoal(null);
  }, []);

  const value = useMemo<RoleSelectionContextValue<TRole>>(
    () => ({ role, goal, setRole, setGoal }),
    [role, goal, setRole],
  );

  return (
    <RoleSelectionContext.Provider
      value={value as unknown as RoleSelectionContextValue}
    >
      {children}
    </RoleSelectionContext.Provider>
  );
}

export function useRoleSelection<
  TRole extends string = string,
>(): RoleSelectionContextValue<TRole> {
  const ctx = useContext(RoleSelectionContext);
  if (!ctx) {
    throw new Error(
      "useRoleSelection() must be used inside <RoleSelectionProvider>",
    );
  }
  return ctx as unknown as RoleSelectionContextValue<TRole>;
}
