/**
 * @4eye/features/context-actions
 *
 * Toggleable directives that augment the next chat prompt.
 * The host can pass a catalog (equipped spells) so the list matches
 * the character spell book rather than a generic default set.
 */
export {
  ContextActionBarProvider,
  useContextActionBar,
  type ContextAction,
} from "./ContextActionBarContext";
export { ContextActionBar } from "./ContextActionBar";
