/**
 * Dusk Horizon — shared starry twilight surface.
 *
 * A reusable background token used by AI Chat surfaces that need to
 * read as a single continuous "higher-level" / sky pane:
 *  - AiChat header ContextBar pill (active state)
 *  - ContextSelectorPanel dropdowns (Domain / Goals / Projects)
 *  - AISettingsPanel (anchored above the chat input)
 *
 * Twilight blue-violet base + faint top-light gradient + 9 pinprick
 * stars positioned at fixed coords so the texture stays stable across
 * widths. Pure CSS — no images.
 */
export const DUSK_HORIZON_BASE = "#1a2542";

export const DUSK_HORIZON_TEXTURE = [
  "linear-gradient(180deg, rgba(120,150,210,0.18) 0%, rgba(120,150,210,0) 55%)",
  "radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.55) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 28% 62%, rgba(255,255,255,0.40) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 47% 30%, rgba(255,255,255,0.50) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 63% 78%, rgba(255,255,255,0.35) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 78% 22%, rgba(255,255,255,0.55) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 88% 55%, rgba(255,255,255,0.30) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 35% 88%, rgba(255,255,255,0.40) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 8%  72%, rgba(255,255,255,0.30) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 55% 10%, rgba(255,255,255,0.40) 50%, transparent 51%)",
].join(", ");

export const DUSK_HORIZON_BACKGROUND = `${DUSK_HORIZON_TEXTURE}, ${DUSK_HORIZON_BASE}`;
