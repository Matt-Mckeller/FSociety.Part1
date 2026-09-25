"use client";

/**
 * CharacterProfileContext — shared state for the Guest Explorer's
 * customization panel and the character figure. Avoids prop drilling
 * the 10+ "selected X" values between siblings.
 */

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { CHARACTER_PERSONAS } from "../../2d";
import {
  GLOW_COLORS,
  type CharacterMood,
  type CharacterVariant,
  type EyeDesign,
  type StrapStyle,
} from "../config";

export interface CharacterProfileState {
  // Character4eye props
  variant: CharacterVariant;
  lens: EyeDesign;
  strap: StrapStyle;
  mood: CharacterMood;
  glow: string;
  showAntenna: boolean;
  showLEDs: boolean;
  showEarSensors: boolean;
  showForeheadMark: boolean;
  showDataFlow: boolean;
  // UI state
  customizeOpen: boolean;
  /** When true, the compass shows the See Demo CTA instead of the icon. */
  showDemoCta: boolean;
}

export interface CharacterProfileActions {
  setVariant: (v: CharacterVariant) => void;
  setLens: (v: EyeDesign) => void;
  setStrap: (v: StrapStyle) => void;
  setMood: (v: CharacterMood) => void;
  setGlow: (v: string) => void;
  toggleAntenna: () => void;
  toggleLEDs: () => void;
  toggleEarSensors: () => void;
  toggleForeheadMark: () => void;
  toggleDataFlow: () => void;
  setCustomizeOpen: (open: boolean) => void;
  toggleCustomize: () => void;
  setShowDemoCta: (v: boolean) => void;
  toggleDemoCta: () => void;
}

export type CharacterProfileContextValue = CharacterProfileState & CharacterProfileActions;

const CharacterProfileContext = createContext<CharacterProfileContextValue | null>(null);

/** Initial values, sourced from the `mapExplorer` persona (mood overridden). */
function defaultState(): CharacterProfileState {
  const p = CHARACTER_PERSONAS.mapExplorer;
  return {
    variant: p.variant as CharacterVariant,
    lens: p.eyeDesign as EyeDesign,
    strap: p.strapStyle as StrapStyle,
    // Profile opens excited rather than the persona's "alert".
    mood: "excited" as CharacterMood,
    glow: GLOW_COLORS[0].color,
    showAntenna: p.showAntenna ?? false,
    showLEDs: p.showStatusLEDs ?? false,
    showEarSensors: false,
    showForeheadMark: false,
    showDataFlow: p.showDataFlow ?? false,
    customizeOpen: false,
    showDemoCta: false,
  };
}

export interface CharacterProfileProviderProps {
  children: ReactNode;
  /** Optional partial overrides — useful for Storybook stories. */
  initial?: Partial<CharacterProfileState>;
}

export function CharacterProfileProvider({ children, initial }: CharacterProfileProviderProps) {
  const [state, setState] = useState<CharacterProfileState>(() => ({
    ...defaultState(),
    ...initial,
  }));

  const value = useMemo<CharacterProfileContextValue>(() => ({
    ...state,
    setVariant:         (variant) => setState((s) => ({ ...s, variant })),
    setLens:            (lens)    => setState((s) => ({ ...s, lens })),
    setStrap:           (strap)   => setState((s) => ({ ...s, strap })),
    setMood:            (mood)    => setState((s) => ({ ...s, mood })),
    setGlow:            (glow)    => setState((s) => ({ ...s, glow })),
    toggleAntenna:      () => setState((s) => ({ ...s, showAntenna:      !s.showAntenna })),
    toggleLEDs:         () => setState((s) => ({ ...s, showLEDs:         !s.showLEDs })),
    toggleEarSensors:   () => setState((s) => ({ ...s, showEarSensors:   !s.showEarSensors })),
    toggleForeheadMark: () => setState((s) => ({ ...s, showForeheadMark: !s.showForeheadMark })),
    toggleDataFlow:     () => setState((s) => ({ ...s, showDataFlow:     !s.showDataFlow })),
    setCustomizeOpen:   (customizeOpen) => setState((s) => ({ ...s, customizeOpen })),
    toggleCustomize:    () => setState((s) => ({ ...s, customizeOpen: !s.customizeOpen })),
    setShowDemoCta:     (showDemoCta) => setState((s) => ({ ...s, showDemoCta })),
    toggleDemoCta:      () => setState((s) => ({ ...s, showDemoCta: !s.showDemoCta })),
  }), [state]);

  return (
    <CharacterProfileContext.Provider value={value}>
      {children}
    </CharacterProfileContext.Provider>
  );
}

export function useCharacterProfile(): CharacterProfileContextValue {
  const ctx = useContext(CharacterProfileContext);
  if (!ctx) {
    throw new Error(
      "useCharacterProfile must be used inside a <CharacterProfileProvider>"
    );
  }
  return ctx;
}
