// Todo: Decide on switching to export * from './*' instead of individual or?
// I like having the components listed in the index but theres inconsistency
export {
  CenteredExpanseLoadingSpinner,
  ExpanseLoadingSpinner,
  NavLink,
  LightDarkModeToggleSwitch,
  Snackbar,
  SectionSpacer,
  NestableNavLink,
  ExpandableNavAccordion,
} from "./layout"

export { TypographyResponsive } from "./utility/typographyResponsive"

export { CloseModalButton } from "./CloseModalButton.component"

export { ExpandingBar } from "./ExpandingBar.component"
export type {
  ExpandingBarVisualState,
  ExpandingBarProps,
} from "./ExpandingBar.component"
export { ExpandingBorderBox } from "./ExpandingBorderBox.component"
export { ProgressBar } from "./ProgressBar.component"
export { TripleDash } from "./TripleDash"
export type {
  TripleDashAlign,
  TripleDashAnimation,
  TripleDashAnimationType,
  TripleDashOrder,
  TripleDashOrientation,
  TripleDashProps,
} from "./TripleDash"
// Character components moved to game package - re-export for backward compatibility
export * from "../../game/character"
export * from "./icons"
export { GameDrawer } from "./layout/GameDrawer"
