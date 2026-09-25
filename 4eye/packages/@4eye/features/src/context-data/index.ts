/**
 * @4eye/features/context-data
 *
 * Owns every entity kind that can be added to a chat input as context:
 * Targets, Audiences, Locations, Stories, Animations, Scenes.
 *
 * The reducer + storage adapter are exported so non-React consumers
 * (e.g. server actions or migrations) can use them too.
 */
export {
  ContextDataProvider,
  useContextData,
  EMPTY_SELECTED_CONTEXT,
} from "./ContextDataContext";
export {
  contextDataReducer,
  initialContextDataState,
} from "./contextDataReducer";
export type {
  ContextDataState,
  ContextDataAction,
  EntityCollectionKey,
} from "./contextDataReducer";
export {
  localStorageAdapter,
  type ContextDataAdapter,
  type ContextDataStore,
} from "./storage";
export { mergeEntitiesById } from "./mergeEntities";
export {
  DEFAULT_TARGETS,
  DEFAULT_AUDIENCES,
  DEFAULT_LOCATIONS,
  DEFAULT_STORIES,
  DEFAULT_ANIMATIONS,
  DEFAULT_SCENES,
  DEFAULT_SEQUENCES,
  DEFAULT_PIPELINES,
  DEFAULT_CONTEXT_DATA,
} from "./defaults";
export {
  ENTITY_KINDS,
  ENTITY_KIND_BY_KEY,
  ENTITY_KIND_GROUPS,
  ENTITY_GROUP_BY_KIND,
  type EntityKindMeta,
  type EntityKindGroup,
} from "./entityKinds";
export { ENTITY_ICONS } from "./entityIcons";
export { ContextBar } from "./ContextBar";
export { EntityButton } from "./EntityButton";
export { EntityListView } from "./EntityListView";
export { PipelineListView } from "./PipelineListView";
