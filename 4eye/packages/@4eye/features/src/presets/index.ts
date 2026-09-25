/**
 * @4eye/features/presets
 *
 * Presets — saved snapshots of full context (entity selections, domain,
 * goals, project, AI settings) that can be applied (replace or merge)
 * back into the chat session in one tap.
 *
 * Each preset has its own "complex symbol" (PresetSymbol — outer ring
 * + inner icon + recipe-size badge) for instant visual recognition.
 */
export { PresetsProvider, usePresets } from "./PresetsContext";
export type { PresetsContextValue, PresetsState } from "./PresetsContext";
export { PresetSymbol } from "./PresetSymbol";
export type { PresetSymbolProps, PresetVariant, SatelliteSymbol } from "./PresetSymbol";
export { SavePresetDialog } from "./SavePresetDialog";
export { ApplyPresetDialog } from "./ApplyPresetDialog";
export { PresetsPanel } from "./PresetsPanel";
