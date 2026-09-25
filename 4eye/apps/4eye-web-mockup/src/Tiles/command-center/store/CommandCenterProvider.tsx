"use client";

/**
 * CommandCenterProvider — Context + useReducer for the Command Center tile.
 *
 * Owns the editable planning graph plus the tile's UI state (active view,
 * narrative/PM ViewMode, current selection/inspection, sprint-lane
 * assignments). Exposes a memoized read-only {@link PlanningStore} and
 * mutation helpers, mirroring the repo convention (no Redux/zustand).
 *
 * The work graph comes from `seed-data`; strategy/reference content is static
 * and read directly from `strategy-data` by the views that need it.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type {
  Entity,
  EntityType,
  StatusValue,
  Trait,
} from "@4eye/types";

import { PlanningStore, type PlanningData } from "../../../model";
import { COMMAND_CENTER_SEED } from "./seed-data";
import {
  CREW,
  seedAssignments,
  seedCrewGoals,
  type EntityGoal,
  type GoalType,
} from "./crew";
import type { MarketingGoal, MarketingProblem } from "./goals-data";
import type { CommandView } from "../components/planning-glyphs";

/** Rolling sprint lanes (Now / Next / Later) — keyed by entity id. */
export type SprintLane = "now" | "next" | "later";

/** Lifecycle of an offer of work to a person. */
export type AssignmentState = "offered" | "accepted" | "declined" | "done";

/**
 * A single offer of one work item to one person. The planner creates these
 * (Crew view); the assignee resolves them by swiping (My Queue). When accepted,
 * we also stamp the entity's {@link OwnerTrait} so the rest of the model can
 * read "who owns this" without knowing about assignments.
 */
export interface Assignment {
  entityId: string;
  profileId: string;
  state: AssignmentState;
  assignedAt: number;
}

/**
 * The planning perspective — who/what lens you are viewing the data through.
 *
 * - business:        All entities, all goals, objective view
 * - self:            Only goals and tasks for/from the current user
 * - self-to-others:  Goals and tasks the current user has set FOR others
 * - others-to-self:  Goals and tasks others have set for the current user
 */
export type PlanPerspective =
  | "business"
  | "self"
  | "self-to-others"
  | "others-to-self";

/** The entity whose plan is currently being viewed (null = current user / self). */
export interface EntityContext {
  id: string;
  type: EntityType;
  name: string;
}

interface CommandUiState {
  activeView: CommandView;
  viewMode: "pm" | "narrative";
  /** Entity currently open in the Inspector (undefined = closed). */
  inspectedId?: string;
  /** Goals/Problems item open in the GoalItemInspector (null = closed). */
  inspectedGoalItem: MarketingGoal | MarketingProblem | null;
  /** Manual sprint-lane assignment overrides (entityId → lane). */
  sprintLanes: Record<string, SprintLane>;
  /** Work-to-people offers and their lifecycle. */
  assignments: Assignment[];
  /** Profile currently acting in the My Queue (assignee POV). */
  activeCrewId?: string;
  /** Goals for any entity (person, location, org, etc.). */
  entityGoals: EntityGoal[];
  /** Active perspective lens for all views. */
  activePerspective: PlanPerspective;
  /** Which entity's plan is being viewed (null = self). */
  activeEntityContext: EntityContext | null;
}

export interface CommandState extends PlanningData, CommandUiState {}

export type CommandAction =
  | { kind: "set-view"; view: CommandView }
  | { kind: "set-view-mode"; mode: "pm" | "narrative" }
  | { kind: "inspect"; id?: string }
  | { kind: "inspect-goal-item"; item: MarketingGoal | MarketingProblem | null }
  | { kind: "set-status"; id: string; value: StatusValue }
  | { kind: "set-weight"; id: string; value: number }
  | { kind: "set-depth"; id: string; value: number }
  | { kind: "set-lane"; id: string; lane: SprintLane }
  | { kind: "assign"; entityId: string; profileId: string }
  | { kind: "unassign"; entityId: string; profileId: string }
  | {
      kind: "set-assignment-state";
      entityId: string;
      profileId: string;
      state: AssignmentState;
    }
  | { kind: "set-active-crew"; profileId?: string }
  | { kind: "add-entity-goal"; goal: EntityGoal }
  | { kind: "update-entity-goal-status"; id: string; status: EntityGoal["status"] }
  | { kind: "add-entity"; entity: Entity }
  | { kind: "set-perspective"; perspective: PlanPerspective }
  | { kind: "set-entity-context"; context: EntityContext | null };

function nowTs(): number {
  return Date.now();
}

/** Replace (or insert) a trait of a given kind on an entity's trait list. */
function upsertTrait(traits: Trait[], next: Trait): Trait[] {
  return traits.some((t) => t.kind === next.kind)
    ? traits.map((t) => (t.kind === next.kind ? next : t))
    : [...traits, next];
}

/** Drop every trait of a given kind. */
function removeTrait(traits: Trait[], kind: Trait["kind"]): Trait[] {
  return traits.filter((t) => t.kind !== kind);
}

/** Stamp (or clear) the denormalized owner trait from the accepted assignment. */
function withOwner(traits: Trait[], ownerId: string | null): Trait[] {
  return ownerId === null
    ? removeTrait(traits, "owner")
    : upsertTrait(traits, { kind: "owner", ownerId });
}

function mapEntity(
  state: CommandState,
  id: string,
  fn: (e: Entity) => Entity,
): Entity[] {
  return state.entities.map((e) =>
    e.id === id ? { ...fn(e), updatedAt: nowTs() } : e,
  );
}

export function commandReducer(
  state: CommandState,
  action: CommandAction,
): CommandState {
  switch (action.kind) {
    case "set-view":
      return { ...state, activeView: action.view };

    case "set-view-mode":
      return { ...state, viewMode: action.mode };

    case "inspect":
      return { ...state, inspectedId: action.id };

    case "inspect-goal-item":
      return { ...state, inspectedGoalItem: action.item };

    case "set-status":
      return {
        ...state,
        entities: mapEntity(state, action.id, (e) => ({
          ...e,
          traits: upsertTrait(e.traits, { kind: "status", value: action.value }),
        })),
      };

    case "set-weight": {
      const value = Math.max(0, Math.min(100, Math.round(action.value)));
      return {
        ...state,
        entities: mapEntity(state, action.id, (e) => ({
          ...e,
          traits: upsertTrait(e.traits, { kind: "weight", value }),
        })),
      };
    }

    case "set-depth": {
      const value = Math.max(1, Math.min(7, Math.round(action.value)));
      return {
        ...state,
        entities: mapEntity(state, action.id, (e) => ({
          ...e,
          traits: upsertTrait(e.traits, { kind: "depth", value }),
        })),
      };
    }

    case "set-lane":
      return {
        ...state,
        sprintLanes: { ...state.sprintLanes, [action.id]: action.lane },
      };

    case "assign": {
      const exists = state.assignments.some(
        (a) => a.entityId === action.entityId && a.profileId === action.profileId,
      );
      if (exists) return state;
      return {
        ...state,
        assignments: [
          ...state.assignments,
          {
            entityId: action.entityId,
            profileId: action.profileId,
            state: "offered",
            assignedAt: nowTs(),
          },
        ],
      };
    }

    case "unassign": {
      const removed = state.assignments.find(
        (a) => a.entityId === action.entityId && a.profileId === action.profileId,
      );
      const wasOwner = removed?.state === "accepted";
      return {
        ...state,
        assignments: state.assignments.filter(
          (a) =>
            !(a.entityId === action.entityId && a.profileId === action.profileId),
        ),
        entities: wasOwner
          ? mapEntity(state, action.entityId, (e) => ({
              ...e,
              traits: withOwner(e.traits, null),
            }))
          : state.entities,
      };
    }

    case "set-assignment-state": {
      const assignments = state.assignments.map((a) =>
        a.entityId === action.entityId && a.profileId === action.profileId
          ? { ...a, state: action.state }
          : a,
      );
      const ownerId =
        action.state === "accepted" ? action.profileId : null;
      return {
        ...state,
        assignments,
        entities: mapEntity(state, action.entityId, (e) => ({
          ...e,
          traits: withOwner(e.traits, ownerId),
        })),
      };
    }

    case "set-active-crew":
      return { ...state, activeCrewId: action.profileId };

    case "add-entity-goal":
      return { ...state, entityGoals: [action.goal, ...state.entityGoals] };

    case "update-entity-goal-status":
      return {
        ...state,
        entityGoals: state.entityGoals.map((g) =>
          g.id === action.id ? { ...g, status: action.status } : g,
        ),
      };

    case "add-entity":
      return { ...state, entities: [action.entity, ...state.entities] };

    case "set-perspective":
      return { ...state, activePerspective: action.perspective };

    case "set-entity-context":
      return { ...state, activeEntityContext: action.context };

    default:
      return state;
  }
}

export interface CommandContextValue {
  state: CommandState;
  store: PlanningStore;
  /** Inspected entity, resolved from `inspectedId`. */
  inspected?: Entity;
  /** Goal or problem item open in the GoalItemInspector. */
  inspectedGoalItem: MarketingGoal | MarketingProblem | null;
  setView: (view: CommandView) => void;
  setViewMode: (mode: "pm" | "narrative") => void;
  inspect: (id?: string) => void;
  /** Open the GoalItemInspector for a MarketingGoal or MarketingProblem. */
  inspectGoalItem: (item: MarketingGoal | MarketingProblem | null) => void;
  setStatus: (id: string, value: StatusValue) => void;
  setWeight: (id: string, value: number) => void;
  setDepth: (id: string, value: number) => void;
  setLane: (id: string, lane: SprintLane) => void;
  /** Offer a work item to a person (creates an "offered" assignment). */
  assign: (entityId: string, profileId: string) => void;
  /** Remove an assignment entirely. */
  unassign: (entityId: string, profileId: string) => void;
  /** Advance an assignment's lifecycle (accept / decline / done). */
  setAssignmentState: (
    entityId: string,
    profileId: string,
    state: AssignmentState,
  ) => void;
  /** Switch the profile acting in the My Queue. */
  setActiveCrew: (profileId?: string) => void;
  /** All assignments attached to an entity. */
  assignmentsFor: (entityId: string) => Assignment[];
  /** A person's assignments, optionally filtered to one state. */
  queueFor: (profileId: string, state?: AssignmentState) => Assignment[];
  /** Add a goal for any entity (id + createdAt auto-generated). */
  addEntityGoal: (goal: Omit<EntityGoal, "id" | "createdAt">) => void;
  /** Cycle an entity goal's lifecycle status. */
  updateEntityGoalStatus: (id: string, status: EntityGoal["status"]) => void;
  /** Goals for one entity, optionally filtered by type. */
  goalsFor: (targetEntityId: string, goalType?: GoalType) => EntityGoal[];
  /** Goals filtered by perspective and author. */
  goalsByPerspective: (perspective: PlanPerspective, authorId: string) => EntityGoal[];
  /** Insert a freshly-created entity into the live graph. */
  addEntity: (entity: Entity) => void;
  /** Switch the active perspective lens. */
  setPerspective: (perspective: PlanPerspective) => void;
  /** Switch which entity's plan is being viewed (null = self). */
  setEntityContext: (context: EntityContext | null) => void;
}

const CommandContext = createContext<CommandContextValue | null>(null);

export interface CommandCenterProviderProps {
  children: ReactNode;
  /** Override the seed graph (Storybook / tests). */
  initialData?: PlanningData;
  initialView?: CommandView;
}

function initState(
  data: PlanningData,
  initialView: CommandView,
): CommandState {
  const assignments = seedAssignments(data.entities);
  const ownerByEntity = new Map(
    assignments
      .filter((a) => a.state === "accepted")
      .map((a) => [a.entityId, a.profileId]),
  );
  const entities = data.entities.map((e) =>
    ownerByEntity.has(e.id)
      ? { ...e, traits: withOwner(e.traits, ownerByEntity.get(e.id)!) }
      : e,
  );

  return {
    ...data,
    entities,
    activeView: initialView,
    viewMode: "narrative",
    inspectedId: undefined,
    inspectedGoalItem: null,
    sprintLanes: {},
    assignments,
    activeCrewId: CREW[0]?.id,
    entityGoals: seedCrewGoals(CREW),
    activePerspective: "business",
    activeEntityContext: null,
  };
}

export function CommandCenterProvider({
  children,
  initialData = COMMAND_CENTER_SEED,
  initialView = "dashboard",
}: CommandCenterProviderProps) {
  const [state, dispatch] = useReducer(
    commandReducer,
    { data: initialData, initialView },
    ({ data, initialView }) => initState(data, initialView),
  );

  const store = useMemo(
    () =>
      new PlanningStore({
        entities: state.entities,
        relationships: state.relationships,
        goalLinks: state.goalLinks,
      }),
    [state.entities, state.relationships, state.goalLinks],
  );

  const inspected = useMemo(
    () =>
      state.inspectedId
        ? state.entities.find((e) => e.id === state.inspectedId)
        : undefined,
    [state.inspectedId, state.entities],
  );

  const setView = useCallback(
    (view: CommandView) => dispatch({ kind: "set-view", view }),
    [],
  );
  const setViewMode = useCallback(
    (mode: "pm" | "narrative") => dispatch({ kind: "set-view-mode", mode }),
    [],
  );
  const inspect = useCallback(
    (id?: string) => dispatch({ kind: "inspect", id }),
    [],
  );
  const inspectGoalItem = useCallback(
    (item: MarketingGoal | MarketingProblem | null) =>
      dispatch({ kind: "inspect-goal-item", item }),
    [],
  );
  const setStatus = useCallback(
    (id: string, value: StatusValue) =>
      dispatch({ kind: "set-status", id, value }),
    [],
  );
  const setWeight = useCallback(
    (id: string, value: number) => dispatch({ kind: "set-weight", id, value }),
    [],
  );
  const setDepth = useCallback(
    (id: string, value: number) => dispatch({ kind: "set-depth", id, value }),
    [],
  );
  const setLane = useCallback(
    (id: string, lane: SprintLane) => dispatch({ kind: "set-lane", id, lane }),
    [],
  );
  const assign = useCallback(
    (entityId: string, profileId: string) =>
      dispatch({ kind: "assign", entityId, profileId }),
    [],
  );
  const unassign = useCallback(
    (entityId: string, profileId: string) =>
      dispatch({ kind: "unassign", entityId, profileId }),
    [],
  );
  const setAssignmentState = useCallback(
    (entityId: string, profileId: string, s: AssignmentState) =>
      dispatch({ kind: "set-assignment-state", entityId, profileId, state: s }),
    [],
  );
  const setActiveCrew = useCallback(
    (profileId?: string) => dispatch({ kind: "set-active-crew", profileId }),
    [],
  );

  const assignmentsFor = useCallback(
    (entityId: string) =>
      state.assignments.filter((a) => a.entityId === entityId),
    [state.assignments],
  );
  const queueFor = useCallback(
    (profileId: string, s?: AssignmentState) =>
      state.assignments.filter(
        (a) => a.profileId === profileId && (!s || a.state === s),
      ),
    [state.assignments],
  );

  const addEntityGoal = useCallback(
    (partial: Omit<EntityGoal, "id" | "createdAt">) =>
      dispatch({
        kind: "add-entity-goal",
        goal: { ...partial, id: `eg-${Date.now()}`, createdAt: Date.now() },
      }),
    [],
  );

  const updateEntityGoalStatus = useCallback(
    (id: string, status: EntityGoal["status"]) =>
      dispatch({ kind: "update-entity-goal-status", id, status }),
    [],
  );

  const goalsFor = useCallback(
    (targetEntityId: string, goalType?: GoalType) =>
      state.entityGoals.filter(
        (g) =>
          g.targetEntityId === targetEntityId &&
          (goalType === undefined || g.goalType === goalType),
      ),
    [state.entityGoals],
  );

  const goalsByPerspective = useCallback(
    (perspective: PlanPerspective, authorId: string) => {
      switch (perspective) {
        case "business":
          return state.entityGoals;
        case "self":
          return state.entityGoals.filter(
            (g) => g.targetEntityId === authorId || g.authorId === authorId,
          );
        case "self-to-others":
          return state.entityGoals.filter(
            (g) => g.authorId === authorId && g.targetEntityId !== authorId,
          );
        case "others-to-self":
          return state.entityGoals.filter(
            (g) => g.targetEntityId === authorId && g.authorId !== authorId,
          );
      }
    },
    [state.entityGoals],
  );

  const addEntity = useCallback(
    (entity: Entity) => dispatch({ kind: "add-entity", entity }),
    [],
  );

  const setPerspective = useCallback(
    (perspective: PlanPerspective) =>
      dispatch({ kind: "set-perspective", perspective }),
    [],
  );

  const setEntityContext = useCallback(
    (context: EntityContext | null) =>
      dispatch({ kind: "set-entity-context", context }),
    [],
  );

  const value = useMemo<CommandContextValue>(
    () => ({
      state,
      store,
      inspected,
      inspectedGoalItem: state.inspectedGoalItem,
      setView,
      setViewMode,
      inspect,
      inspectGoalItem,
      setStatus,
      setWeight,
      setDepth,
      setLane,
      assign,
      unassign,
      setAssignmentState,
      setActiveCrew,
      assignmentsFor,
      queueFor,
      addEntityGoal,
      updateEntityGoalStatus,
      goalsFor,
      goalsByPerspective,
      addEntity,
      setPerspective,
      setEntityContext,
    }),
    [
      state,
      store,
      inspected,
      inspectGoalItem,
      setView,
      setViewMode,
      inspect,
      setStatus,
      setWeight,
      setDepth,
      setLane,
      assign,
      unassign,
      setAssignmentState,
      setActiveCrew,
      assignmentsFor,
      queueFor,
      addEntityGoal,
      updateEntityGoalStatus,
      goalsFor,
      goalsByPerspective,
      addEntity,
      setPerspective,
      setEntityContext,
    ],
  );

  return (
    <CommandContext.Provider value={value}>{children}</CommandContext.Provider>
  );
}

export function useCommandCenter(): CommandContextValue {
  const ctx = useContext(CommandContext);
  if (!ctx) {
    throw new Error(
      "useCommandCenter must be used within a CommandCenterProvider",
    );
  }
  return ctx;
}
