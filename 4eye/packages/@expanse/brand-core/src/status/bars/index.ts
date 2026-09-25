/**
 * Status Bar Components
 *
 * Individual status bars for displaying various metrics.
 * Note: CurrencyStatusBar is not exported as it has external dependencies (WalletContext).
 * Use CurrencyStatusBarSimple for a self-contained currency display.
 */

export { CurrencyStatusBarSimple } from "./CurrencyStatusBarSimple"
export { ProfileIconStatusBarSimple } from "./ProfileIconStatusBarSimple"
export { ProgressStatusBar } from "./ProgressStatusBar"
export { GenericStatusBar, type GenericStatusBarProps } from "./GenericStatusBar"

// TripleLayer review variants
export { CurrencyStatusBarTripleLayer } from "./CurrencyStatusBarTripleLayer"
export { ProfileIconStatusBarTripleLayer } from "./ProfileIconStatusBarTripleLayer"
export { ProgressStatusBarTripleLayer } from "./ProgressStatusBarTripleLayer"
